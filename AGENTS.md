# CineTech Architecture — Agent Development Guide

> **Purpose:** This file provides LLM agents and human developers with complete context for working on this codebase. Read this first before making any changes.

---

## Project Identity

| Attribute | Value |
|-----------|-------|
| **Name** | CineTech Architecture — 影视技术原理互动实验室 |
| **Type** | Interactive visual teaching platform for film/camera technology |
| **Target** | Desktop-first (PC/tablet), responsive but optimized for large screens |
| **Deploy Path** | `/lensoptics-lab/` (see `package.json#homepage`, `vite.config.ts#base`) |

---

## Tech Stack

```
React 19.2        TypeScript 5.8       Vite 6.2
Tailwind CSS v4   Lucide React         Fuse.js (search)
@dnd-kit          wavesurfer.js        peaks.js
```

**No external state management** — uses React `useState`/`useMemo`/`useRef`/`useCallback`.
**No router library** — module switching is state-based in `App.tsx`.

---

## Directory Map

```
lensoptics-lab/
├── App.tsx                          # Root: theme, sidebar, search, intro, module router
├── types.ts                         # ModuleType enum, optics interfaces
├── index.tsx                        # ReactDOM entry
├── index.css                        # Design tokens (OKLCH), reset, utilities
├── vite.config.ts                   # Vite config, base path, GEMINI_API_KEY injection
├── package.json                     # Dependencies, homepage field
│
├── components/                      # 58 components total
│   ├── TabNavigation.tsx            # Reusable tab bar (keyboard accessible)
│   ├── Controls.tsx                 # Reusable control panel wrapper
│   │
│   ├── GeometricView.tsx            # 几何光学基础
│   ├── ZoomSystemView.tsx           # 变焦系统结构
│   ├── LensAdvancedView.tsx         # 镜头工程与像差
│   ├── OpticalFiltersView.tsx       # 前置物理滤镜
│   ├── MechanicsView.tsx            # 机身机械系统
│   ├── SensorExposureView.tsx       # 传感器与曝光
│   ├── CinematographyView.tsx       # 电影摄影技术
│   ├── DigitalISPView.tsx           # ISP 信号处理
│   ├── VideoEngineeringView.tsx     # 视频编码工程
│   ├── PostProductionView.tsx       # DI 数字中间片
│   ├── LoudnessStandardView.tsx     # 音频响度标准
│   ├── BroadcastStandardsView.tsx   # 广播制式
│   ├── GearShowcaseView.tsx         # 器材陈列室 (default module)
│   ├── SonySystemView.tsx           # 索尼系统百科
│   ├── UtilityToolsView.tsx         # 实用工具箱
│   ├── KnowledgeQuizView.tsx        # 知识挑战
│   │
│   ├── sensor-exposure/             # SensorExposureView sub-modules
│   │   ├── SensorModules.tsx
│   │   └── NativeISOModule.tsx
│   ├── digital-isp/                 # DigitalISPView sub-modules
│   │   ├── ISPModules.tsx
│   │   ├── BitDepthModule.tsx
│   │   └── HDRModule.tsx
│   ├── loudness/                    # LoudnessStandardView sub-modules (12 files)
│   │   ├── AlgorithmLabModule.tsx
│   │   ├── AlgorithmFlowModule.tsx
│   │   ├── CheatSheetModule.tsx
│   │   ├── InsightGuideModule.tsx
│   │   ├── LoudnessAnalyzerModule.tsx
│   │   ├── MathTheoryModule.tsx
│   │   ├── ProCGuideModule.tsx
│   │   ├── ProGGuideModule.tsx
│   │   ├── QualityIndicatorsModule.tsx
│   │   ├── StandardsModule.tsx
│   │   ├── UnitsModule.tsx
│   │   └── WorkflowModule.tsx
│   └── quiz/                        # KnowledgeQuizView sub-modules
│       ├── QuizBuilder.tsx
│       ├── QuizEditor.tsx
│       ├── QuizGame.tsx
│       ├── QuizIntro.tsx
│       ├── QuizQuestionCard.tsx
│       └── QuizSummary.tsx
│
├── utils/
│   ├── optics.ts                    # Optical calculations (ray tracing, lens formulas)
│   ├── quizData.ts                  # Quiz question bank
│   └── searchIndex.ts               # Full-text search index (Fuse.js data)
│
├── img/                             # Static images
├── dist/                            # Build output (gitignored)
└── node_modules/                    # Dependencies (gitignored)
```

---

## Module Registration Protocol

To add a new module, follow these steps **in order**:

### 1. Add enum variant → `types.ts`

```typescript
export enum ModuleType {
  // ... existing entries ...
  MY_NEW_MODULE = 'MY_NEW_MODULE',
}
```

### 2. Create component → `components/MyNewView.tsx`

```typescript
import React from 'react';

interface MyNewViewProps {
  initialTab?: string;
}

export const MyNewView: React.FC<MyNewViewProps> = ({ initialTab }) => {
  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-[oklch(15%_0.01_286)]">
      {/* Module content */}
    </div>
  );
};
```

**Naming convention:** `{Topic}View.tsx` for top-level modules, `{Topic}Module.tsx` for sub-modules.

### 3. Register lazy import + route → `App.tsx`

Add lazy import near line ~24:
```typescript
const MyNewView = React.lazy(() => import('./components/MyNewView').then(m => ({ default: m.MyNewView })));
```

Add case in `renderModule()` switch (~line 98):
```typescript
case ModuleType.MY_NEW_MODULE: return <MyNewView {...commonProps} />;
```

### 4. Add sidebar nav → `App.tsx` JSX (~line 244)

Use `NavButton` or `NavGroup`:
```typescript
<NavButton
  isDark={isDark}
  active={activeModule === ModuleType.MY_NEW_MODULE}
  onClick={() => handleModuleChange(ModuleType.MY_NEW_MODULE)}
  icon={<SomeLucideIcon size={18}/>}
  label="模块名称 (English)"
  subLabel="Brief description"
/>
```

### 5. Add search index → `utils/searchIndex.ts`

Add entry to `FULL_SEARCH_INDEX` array:
```typescript
{
  title: '模块名称',
  desc: 'Description for search',
  keywords: 'keyword1, keyword2, keyword3',
  module: ModuleType.MY_NEW_MODULE,
  tab: undefined,
}
```

### 6. Add intro card → `App.tsx` `IntroView` grid (~line 427)

```typescript
<IntroCard
  isDark={isDark}
  onClick={() => onEnter(ModuleType.MY_NEW_MODULE)}
  icon={<SomeLucideIcon/>}
  title="模块名称"
  desc="Short description"
/>
```

---

## Code Conventions

### Imports

```typescript
// 1. React + hooks
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// 2. External libraries
import { Camera, Aperture, Zap } from 'lucide-react';

// 3. Internal modules (relative paths)
import { TabNavigation, TabItem } from './TabNavigation';
import { calculateDOF } from '../utils/optics';
import { ModuleType } from '../types';
```

### Component Pattern

```typescript
// Props interface (not type alias)
interface MyComponentProps {
  value: number;
  onChange: (v: number) => void;
  label?: string;
}

// Named export with React.FC
export const MyComponent: React.FC<MyComponentProps> = ({ value, onChange, label }) => {
  // hooks first
  const [local, setLocal] = useState(0);

  // derived state
  const computed = useMemo(() => value * 2, [value]);

  // effects
  useEffect(() => { /* ... */ }, [value]);

  // handlers
  const handleClick = useCallback(() => { /* ... */ }, []);

  return <div>...</div>;
};
```

### Styling Rules

| Rule | Example |
|------|---------|
| Dark mode | Always pair: `bg-white dark:bg-zinc-900` |
| Text colors | Always pair: `text-zinc-900 dark:text-zinc-100` |
| Border colors | Always pair: `border-zinc-200 dark:border-white/5` |
| Primary accent | `text-primary-600 dark:text-primary-400` |
| Arbitrary OKLCH | `bg-[oklch(15%_0.01_286)]` |
| Spacing | Use Tailwind spacing (4px base): `p-4`, `gap-2`, `mb-6` |
| Font sizes | `text-xs` (12px), `text-sm` (14px), `text-base` (16px) |
| Font weights | `font-normal`, `font-bold`, `font-black` |
| Mono font | `font-mono` (JetBrains Mono) |

### Color Palette Reference

**Primary (Cyan/Teal):**
```
primary-50  → oklch(98% 0.015 200)  // lightest
primary-500 → oklch(64% 0.17 200)   // base
primary-600 → oklch(55% 0.16 200)   // light mode text/buttons
primary-400 → oklch(72% 0.15 200)   // dark mode text/buttons
primary-900 → oklch(28% 0.08 200)   // dark mode backgrounds
```

**Neutral (Zinc):**
```
zinc-50  → oklch(98.5% 0.002 286)  // light bg
zinc-100 → oklch(96.7% 0.003 286)  // light surface
zinc-200 → oklch(92.8% 0.006 286)  // light borders
zinc-500 → oklch(55.4% 0.018 286)  // muted text
zinc-700 → oklch(37.1% 0.013 286)  // dark borders
zinc-800 → oklch(27.4% 0.006 286)  // dark surface
zinc-900 → oklch(20.9% 0.004 286)  // dark bg
zinc-950 → oklch(14.1% 0.003 286)  // darkest bg
```

**Semantic:**
```
success-400/500 → green (OKLCH 155)
warning-400/500 → amber (OKLCH 85)
danger-400/500  → red (OKLCH 25)
accent-400/500  → amber (for highlights)
```

---

## Common Tasks

### Add a new tab to an existing module

1. Module must use `TabNavigation` component
2. Add tab id to the tabs array
3. Use `initialTab` prop to set default tab
4. Render content based on active tab state

### Add interactive SVG visualization

```typescript
<svg viewBox="0 0 800 400" className="w-full h-auto">
  {/* Grid */}
  <rect width="800" height="400" fill="transparent" />
  {/* Axis */}
  <line x1="50" y1="350" x2="750" y2="350" stroke="currentColor" className="text-zinc-400" />
  {/* Data */}
  <circle cx="400" cy="200" r="4" className="fill-primary-500" />
</svg>
```

### Add drag-and-drop (quiz builder pattern)

```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, useSortable, arrayMove } from '@dnd-kit/sortable';

// See components/quiz/QuizBuilder.tsx for full implementation
```

### Add audio visualization

```typescript
import WaveSurfer from 'wavesurfer.js';

// See components/loudness/LoudnessAnalyzerModule.tsx for pattern
```

---

## Design Tokens (index.css)

All tokens are CSS custom properties in `:root`. Key ones:

```css
--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-full: 9999px;
```

**Animation classes** (defined in Tailwind):
- `animate-fade-in`
- `animate-slide-in-bottom`
- `animate-zoom-in`
- `animate-spin` (Lucide loader)

---

## Accessibility

### Built-in features
- `:focus-visible` outline (2px primary-500, 2px offset)
- `prefers-reduced-motion` support (disables animations)
- `aria-label` on navigation elements
- `role="tab"` / `role="tablist"` on TabNavigation
- Keyboard navigation in TabNavigation (ArrowLeft/ArrowRight)
- Dark/light theme toggle with `aria-label`

### WCAG Audit Tool

Run the bundled auditor to check contrast:

```bash
python audit_wcag.py . --output wcag_report.md
python audit_wcag.py ./components --threshold aaa
python audit_wcag.py . --check-implicit   # includes implicit bg checks
```

**Current status:** 553 AA failures, 52 AAA warnings (see `wcag_report.md`).

**Key patterns that fail:**
- `text-white` on elements without explicit dark bg (assumes white bg)
- `dark:text-zinc-700` + `dark:bg-zinc-700` (same color = 1:1 ratio)
- `border-zinc-200` on `bg-zinc-100` (low contrast border)

---

## Build & Deploy

```bash
# Development
npm run dev          # → http://localhost:3000

# Production build
npm run build        # → dist/

# Preview production build
npm run preview
```

**Deploy notes:**
- `base: '/lensoptics-lab/'` in vite.config.ts — change if deploying to different path
- `homepage: '/lensoptics-lab/'` in package.json — sync with base
- Output is fully static — deploy `dist/` to any CDN/static host

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `GEMINI_API_KEY` | AI features (if any) | No |

Defined in `.env.local` (not committed). Injected via `vite.config.ts` `define` block.

---

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Mixed language: English type + Chinese description acceptable
- Example: `feat: 添加几何光学交互演示`

---

## Anti-Patterns (DO NOT)

1. **Do NOT** add `node_modules`, `dist`, `.env.local` to git
2. **Do NOT** use `any` type — use `unknown` or proper types
3. **Do NOT** create `.css` files per component — use Tailwind classes inline
4. **Do NOT** add new dependencies without checking existing ones first
5. **Do NOT** hardcode colors — use Tailwind palette or CSS variables
6. **Do NOT** skip `dark:` variant when adding light mode classes
7. **Do NOT** use `import * as React` — use named imports
8. **Do NOT** create files in root — use `components/` or `utils/`

---

## Quick Reference: Lucide Icons Used

```
Camera, Ruler, Aperture, Zap, Microscope, Cpu, Layers, Film,
ScanLine, Video, Disc, Palette, Workflow, Eye, Newspaper, Search,
ArrowRight, Book, Volume2, Tv, Loader2, AlertTriangle, CheckCircle,
ChevronDown, ChevronRight, Menu, Calculator, GraduationCap,
PanelLeftClose, PanelLeftOpen, MonitorPlay, Sun, Moon
```

Add new icons from `lucide-react` — all icons support `size` and `className` props.

---

## File Size Guidelines

| File Type | Target | Max |
|-----------|--------|-----|
| View component | 200-400 lines | 600 lines |
| Sub-module | 100-200 lines | 300 lines |
| Utility module | 50-150 lines | 200 lines |

If a file exceeds max, split into sub-modules in a subdirectory.

---

*Last updated: 2026-05-16*
