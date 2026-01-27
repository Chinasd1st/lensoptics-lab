
import React, { useState, useEffect } from 'react';
import { Database, XCircle, Check, Copy } from 'lucide-react';
import { QUIZ_DATABASE, QuizQuestion } from '../../utils/quizData';

interface QuizEditorProps {
  onClose: () => void;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ onClose }) => {
  const [editorCsv, setEditorCsv] = useState('');
  const [editorTs, setEditorTs] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize with current DB
  useEffect(() => {
     const csv = generateCsv();
     setEditorCsv(csv);
     setEditorTs(convertCsvToTs(csv));
  }, []);

  const generateCsv = () => {
     const headers = ["ID", "Category", "Type", "Difficulty", "Question", "Options (Split by |)", "CorrectAnswer (Split by |)", "Explanation"];
     const rows = QUIZ_DATABASE.map(q => {
        const safeText = (txt: string) => `"${txt.replace(/"/g, '""')}"`;
        const opts = q.options.join("|");
        const ans = Array.isArray(q.correctAnswer) ? q.correctAnswer.join("|") : q.correctAnswer;
        
        return [
           q.id,
           safeText(q.category),
           q.type,
           q.difficulty,
           safeText(q.question),
           safeText(opts),
           safeText(String(ans)),
           safeText(q.explanation)
        ].join(",");
     });
     return [headers.join(","), ...rows].join("\n");
  };

  // Robust CSV Line Parser (Manual parsing instead of Regex to avoid Safari/V8 incompatibility with conditional groups)
  const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuote = false;
      
      for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
              if (inQuote && line[i + 1] === '"') {
                  current += '"';
                  i++; // Skip next quote (escaped quote)
              } else {
                  inQuote = !inQuote;
              }
          } else if (char === ',' && !inQuote) {
              result.push(current);
              current = '';
          } else {
              current += char;
          }
      }
      result.push(current);
      return result;
  };

  const convertCsvToTs = (csvInput: string) => {
     const lines = csvInput.trim().split('\n');
     if (lines.length < 2) return "// Invalid CSV";

     const outputLines = lines.slice(1).map(line => {
        if (!line.trim()) return '';
        const cols = parseCSVLine(line);

        if (cols.length < 8) return `// Error parsing line: ${line.substring(0, 20)}...`;

        const [id, cat, type, diff, ques, optsRaw, ansRaw, exp] = cols;
        
        // Reconstruct Helper Calls
        const optsStr = `[${optsRaw.split('|').map(s => `"${s}"`).join(', ')}]`;
        
        if (type === 'SINGLE') {
           return `  q(${id}, "${cat}", "${diff}", "${ques}", ${optsStr}, "${ansRaw}", "${exp}"),`;
        } else if (type === 'TRUE_FALSE') {
           const boolAns = ansRaw.includes("True") || ansRaw.includes("正确") ? "true" : "false";
           return `  tf(${id}, "${cat}", "${diff}", "${ques}", ${boolAns}, "${exp}"),`;
        } else if (type === 'MULTI') {
           const ansStr = `[${ansRaw.split('|').map(s => `"${s}"`).join(', ')}]`;
           return `  mq(${id}, "${cat}", "${diff}", "${ques}", ${optsStr}, ${ansStr}, "${exp}"),`;
        } else if (type === 'ORDER') {
           const ansStr = `[${ansRaw.split('|').map(s => `"${s}"`).join(', ')}]`;
           return `  oq(${id}, "${cat}", "${diff}", "${ques}", ${optsStr}, ${ansStr}, "${exp}"),`;
        } else if (type === 'FILL_BLANK') {
           const accepted = `[${ansRaw.split('|').map(s => `"${s}"`).join(', ')}]`;
           return `  fb(${id}, "${cat}", "${diff}", "${ques}", ${accepted}, "${ansRaw.split('|')[0]}", "${exp}"),`;
        } else if (type === 'MATCHING') {
           const lefts = optsRaw.split('|');
           const rights = ansRaw.split('|');
           const pairsStr = lefts.map((l, i) => `["${l}", "${rights[i] || ''}"]`).join(',\n    ');
           return `  matchQ(${id}, "${cat}", "${diff}", "${ques}", [\n    ${pairsStr}\n  ], "${exp}"),`;
        } else if (type === 'INTERACTIVE') {
            return `// Interactive questions need manual config reconstruction. ID: ${id}`;
        }
        
        return `// Unsupported type in converter: ${type}`;
     });

     return `export const QUIZ_DATABASE: QuizQuestion[] = [\n${outputLines.filter(l=>l).join('\n')}\n];`;
  };

  const handleCsvChange = (val: string) => {
     setEditorCsv(val);
     setEditorTs(convertCsvToTs(val));
  };

  const copyToClipboard = () => {
     navigator.clipboard.writeText(editorTs);
     setCopySuccess(true);
     setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
     <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-5xl h-[80vh] bg-slate-900 rounded-2xl border border-slate-700 flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
           <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                 <Database className="text-cyan-400" size={20} />
                 <h3 className="font-bold text-white">题库数据编辑器 (Database Editor)</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
                 <XCircle size={24} />
              </button>
           </div>
           
           <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* CSV Input Side */}
              <div className="flex-1 flex flex-col p-4 border-b lg:border-b-0 lg:border-r border-slate-800">
                 <div className="mb-2 text-xs font-bold text-slate-400 flex justify-between">
                    <span>CSV Source (Excel Compatible)</span>
                    <span className="text-[10px] text-slate-600">Delimiter: Comma | Arrays: Pipe (|)</span>
                 </div>
                 <textarea 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 focus:border-cyan-500 outline-none resize-none"
                    value={editorCsv}
                    onChange={(e) => handleCsvChange(e.target.value)}
                    placeholder="Paste CSV here..."
                 />
              </div>

              {/* TS Output Side */}
              <div className="flex-1 flex flex-col p-4 bg-slate-900/50">
                 <div className="mb-2 text-xs font-bold text-slate-400 flex justify-between items-center">
                    <span>TypeScript Code (Copy to Source)</span>
                    {copySuccess && <span className="text-emerald-400 text-[10px] flex items-center gap-1"><Check size={12}/> Copied!</span>}
                 </div>
                 <div className="flex-1 relative">
                    <textarea 
                       readOnly
                       className="w-full h-full bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-green-400 focus:border-emerald-500 outline-none resize-none"
                       value={editorTs}
                    />
                    <button 
                       onClick={copyToClipboard}
                       className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2 transition-all"
                    >
                       <Copy size={14}/> Copy Code
                    </button>
                 </div>
              </div>
           </div>
        </div>
     </div>
  );
};
