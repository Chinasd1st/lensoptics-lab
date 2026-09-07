import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patterns to detect
const DARK_BGS = ['bg-zinc-800', 'bg-zinc-900', 'bg-zinc-950', 'bg-black', 'bg-slate-800', 'bg-slate-900', 'bg-slate-950'];
const LIGHT_TEXTS = ['text-white', 'text-zinc-100', 'text-zinc-200', 'text-zinc-300'];
const DARK_TEXTS = ['text-zinc-600', 'text-zinc-700', 'text-zinc-800', 'text-zinc-900'];

function extractClassStrings(line) {
  const results = [];
  // className="..."
  const strMatches = [...line.matchAll(/className=["']([^"']+)["']/g)];
  strMatches.forEach(m => results.push({ str: m[1], type: 'string', start: m.index }));
  // className={`...`}
  const tplMatches = [...line.matchAll(/className=\{`([^`]+)`\}/g)];
  tplMatches.forEach(m => results.push({ str: m[1], type: 'template', start: m.index }));
  return results;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, lineNum) => {
    const lineNum1 = lineNum + 1;
    const trimmed = line.trim();
    if (!trimmed.includes('className') && !trimmed.includes('class=')) return;
    // Skip comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

    const classEntries = extractClassStrings(line);

    for (const { str } of classEntries) {
      // 1. Check dark:bg-X without light bg-X
      for (const darkBg of DARK_BGS) {
        const darkPattern = `dark:${darkBg}`;
        if (str.includes(darkPattern)) {
          const lightBg = darkBg.replace('dark:', '');
          // Check if there's a light mode bg for this color
          const hasLightBg = new RegExp(`(?<!dark:)${lightBg.replace('-', '\\-')}(?!\\d)`).test(str);
          if (!hasLightBg) {
            issues.push({
              file: filePath, line: lineNum1, type: 'DARK_BG_NO_LIGHT',
              detail: `${darkPattern} without light mode variant (${lightBg})`,
              code: trimmed.substring(0, 150)
            });
          }
        }
      }

      // 2. Check text-white without dark:text-white
      if (/\btext-white\b/.test(str) && !/dark:\S*text-white/.test(str)) {
        const onColoredBg = /bg-(primary|red|green|emerald|blue|purple|amber|yellow|cyan|orange|pink)-(500|600|700|800|900)/.test(str);
        const inConditional = str.includes('?') && str.includes('text-white');
        if (!onColoredBg && !inConditional) {
          issues.push({
            file: filePath, line: lineNum1, type: 'TEXT_WHITE_NO_DARK',
            detail: 'text-white without dark:text-white',
            code: trimmed.substring(0, 150)
          });
        }
      }

      // 3. Check duplicate dark: classes
      const darkClasses = str.match(/dark:\S+/g) || [];
      const uniqueDark = new Set(darkClasses);
      if (darkClasses.length > uniqueDark.size) {
        const dupes = [...darkClasses].filter((item, index) => darkClasses.indexOf(item) !== index);
        issues.push({
          file: filePath, line: lineNum1, type: 'DUPLICATE_DARK',
          detail: `Duplicate: ${[...new Set(dupes)].join(', ')}`,
          code: trimmed.substring(0, 150)
        });
      }

      // 4. Check hover: without both light and dark variants
      const hoverBgs = str.match(/hover:bg-[\w-]+/g) || [];
      for (const hoverBg of hoverBgs) {
        const isDarkHover = hoverBg.includes('dark:hover:');
        if (!isDarkHover) {
          const hasDarkHover = str.includes(`dark:${hoverBg}`);
          if (!hasDarkHover) {
            // Only flag if there's also a dark:bg on the same element
            const hasDarkBg = /dark:bg-[\w-]+/.test(str);
            if (hasDarkBg) {
              issues.push({
                file: filePath, line: lineNum1, type: 'HOVER_NO_DARK',
                detail: `${hoverBg} without dark:hover: variant`,
                code: trimmed.substring(0, 150)
              });
            }
          }
        }
      }

      // 5. Check group-hover:text-white without dark variant
      if (/group-hover:text-white/.test(str) && !/dark:group-hover:text-white/.test(str)) {
        issues.push({
          file: filePath, line: lineNum1, type: 'GROUP_HOVER_WHITE_NO_DARK',
          detail: 'group-hover:text-white without dark:group-hover:text-white',
          code: trimmed.substring(0, 150)
        });
      }

      // 6. Check bg-zinc-800/900/950 without dark: prefix (pure dark bg, no light variant at all)
      for (const darkBg of DARK_BGS) {
        const hasDarkPrefix = str.includes(`dark:${darkBg}`);
        const hasLightVariant = new RegExp(`(?<!dark:)${darkBg.replace('-', '\\-')}(?!\\d)`).test(str);
        if (!hasDarkPrefix && hasLightVariant) {
          // This element uses dark bg but has no dark: prefix = broken in light mode
          // Skip if it's already been caught above
          const alreadyCaught = issues.some(i => i.line === lineNum1 && i.file === filePath && i.detail.includes(darkBg));
          if (!alreadyCaught) {
            issues.push({
              file: filePath, line: lineNum1, type: 'DARK_BG_NO_LIGHT',
              detail: `${darkBg} without light mode variant`,
              code: trimmed.substring(0, 150)
            });
          }
        }
      }
    }
  });

  return issues;
}

function scanDir(dir) {
  let allIssues = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) {
      allIssues = allIssues.concat(scanDir(fullPath));
    } else if (/\.(tsx|jsx)$/.test(entry.name)) {
      allIssues = allIssues.concat(scanFile(fullPath));
    }
  }
  return allIssues;
}

const targetDir = path.join(__dirname, 'components');
const issues = scanDir(targetDir);

// Group by type
const byType = {};
issues.forEach(issue => {
  if (!byType[issue.type]) byType[issue.type] = [];
  byType[issue.type].push(issue);
});

console.log(`\n🔍 Found ${issues.length} issues across all components\n`);

for (const [type, typeIssues] of Object.entries(byType)) {
  console.log(`\n📌 ${type} (${typeIssues.length} issues)`);
  console.log('─'.repeat(70));
  // Group by file
  const byFile = {};
  typeIssues.forEach(issue => {
    const relPath = path.relative(process.cwd(), issue.file);
    if (!byFile[relPath]) byFile[relPath] = [];
    byFile[relPath].push(issue);
  });
  for (const [file, fileIssues] of Object.entries(byFile)) {
    console.log(`\n  📁 ${file}`);
    fileIssues.forEach(issue => {
      console.log(`    L${issue.line}: ${issue.detail}`);
      console.log(`      ${issue.code.substring(0, 130)}...`);
    });
  }
}

fs.writeFileSync('dark-mode-audit.json', JSON.stringify(issues, null, 2));
console.log(`\n📄 Full report saved to dark-mode-audit.json`);
