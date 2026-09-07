# WCAG Contrast Accessibility Report

**Scanned directory:** `C:\Users\omen\Desktop\Documents\Projects\lensoptics-lab`
**Files scanned:** 60
**Total className occurrences:** 3689
**Total color classes analyzed:** 7954

## Summary

| Metric | Count |
|--------|-------|
| Total issues | 605 |
| Fails AA (4.5:1) | 553 |
| Passes AA, fails AAA (7:1) | 52 |

## Issues

### Critical — Fails WCAG AA (4.5:1)

#### [FAIL] `components\quiz\QuizBuilder.tsx`:78

- **Element:** `<span>`
- **Foreground:** `dark:text-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-700` → `#404045`
- **Contrast ratio:** `1.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[11px] px-1.5 py-0.5 rounded font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300">{question.type}</span>
```

> Fails AA (needs 4.5:1, got 1.00:1). Fix: adjust `dark:text-zinc-700` (currently #404045) or `dark:bg-zinc-700` (#404045).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:229

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button key={k} onClick={() => setFormat(k as any)} className={`w-full p-4 rounded-lg border text-left transition-colors group ${format === k ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-500' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}>
```

> Fails AA (needs 3.0:1, got 1.00:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `App.tsx`:207

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md bg-zinc-100 dark:bg-[oklch(15%_0.01_286)] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-50/10 transition-colors border border-zinc-200 dark:border-white/5"
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `App.tsx`:373

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-xs text-primary-600 dark:text-primary-400 font-mono mb-4 animate-zoom-in">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\LensAdvancedView.tsx`:218

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700 text-xs font-mono w-40 shadow-inner">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:120

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 px-3 py-1 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\loudness\MathTheoryModule.tsx`:16

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\loudness\WorkflowModule.tsx`:12

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col md:flex-row items-center gap-6">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:152

- **Element:** `<span>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[10px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 rounded border border-zinc-200 dark:border-zinc-700">{item.question.type}</span>
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:476

- **Element:** `<button>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:479

- **Element:** `<button>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.15:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={handleExportJSON} className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors">
```

> Fails AA (needs 3.0:1, got 1.15:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\UtilityToolsView.tsx`:290

- **Element:** `<div>`
- **Foreground:** `text-zinc-900` → `#17171a`
- **Background:** `bg-black` → `#000000`
- **Contrast ratio:** `1.17:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-black text-zinc-900 dark:text-white border-2 border-zinc-200 dark:border-zinc-700 w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
```

> Fails AA (needs 4.5:1, got 1.17:1). Fix: adjust `text-zinc-900` (currently #17171a) or `bg-black` (#000000).

#### [FAIL] `components\AnamorphicModule.tsx`:13

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg transition-colors duration-500"
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\AnamorphicModule.tsx`:44

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\CineLensMechanicsModule.tsx`:43

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-32 h-32 rounded-full border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg relative flex items-center justify-center">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\CineLensMechanicsModule.tsx`:80

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\CinematographyView.tsx`:78

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-3xl aspect-[4/3] lg:aspect-video bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg rounded-lg group">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\CinematographyView.tsx`:123

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\CinematographyView.tsx`:234

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:89

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\HDRModule.tsx`:15

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:107

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:208

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:296

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:371

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:446

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:476

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\FocalLengthModule.tsx`:14

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-full max-w-4xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center rounded-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\FocalLengthModule.tsx`:40

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\FocusControlModule.tsx`:98

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-full max-w-3xl bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\FocusControlModule.tsx`:140

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\FocusControlModule.tsx`:160

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-56 h-56 rounded-full border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-[inset_0_0_20px_black] relative overflow-hidden flex items-center justify-center">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:56

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:128

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:199

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:268

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:332

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:391

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:440

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:489

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:513

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:border-primary-500/50 transition-all">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:543

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:border-primary-500/50 transition-all">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearPages.tsx`:573

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GearShowcaseView.tsx`:21

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:95

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:458

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:488

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-lg aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg group">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:536

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LightingModule.tsx`:17

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-64 h-80 lg:w-80 lg:h-96 bg-zinc-50 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LightingModule.tsx`:35

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:30

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 lg:p-8 relative overflow-hidden flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:29

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:231

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-md transition-colors duration-300 border-t lg:border-t-0">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:573

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col animate-in fade-in slide-in-from-bottom-8">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:667

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-10 w-32 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:697

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-10 w-32 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:583

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-md transition-colors duration-300 border-t lg:border-t-0">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:625

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-md transition-colors duration-300 border-t lg:border-t-0">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:48

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 relative overflow-hidden flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\UnitsModule.tsx`:20

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 shrink-0">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\WorkflowModule.tsx`:75

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 min-h-[200px] relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\MechanicsView.tsx`:262

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\MechanicsView.tsx`:406

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\MonitoringModule.tsx`:134

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\MovementModule.tsx`:24

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\OpticalFiltersView.tsx`:70

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto no-scrollbar">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineColor.tsx`:36

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-48 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 flex gap-8">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineColor.tsx`:68

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineOptics.tsx`:77

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSensor.tsx`:71

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSensor.tsx`:147

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSensor.tsx`:217

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSensor.tsx`:331

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSignal.tsx`:67

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSignal.tsx`:161

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSignal.tsx`:223

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PostProductionView.tsx`:183

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-[480px] bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto select-none shadow-md z-10">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:458

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:493

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 sticky top-0 z-10">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:506

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex justify-between items-center shadow-sm z-10">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizIntro.tsx`:142

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto border-4 border-zinc-200 dark:border-zinc-800 shadow-lg relative">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:314

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="text-xs p-3 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 grid gap-2"><strong className="text-emerald-400 border-b border-zinc-200 dark:border-zinc-700 pb-1 block">正确配对：</strong>{question.options.map((opt, i) => (<div key={i} className="flex justify-between"><span className="text-zinc-600 dark:text-zinc-400 font-bold mr-2">{String.fromCharCode(65 + i)}. {opt}</span><span className="text-zinc-600">→</span><span className="text-white text-right">{(question.correctAnswer as string[])[i]}</span></div>))}</div>}
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:334

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800"><strong className="text-emerald-400">正确顺序：</strong> {(question.correctAnswer as string[]).join(' → ')}</div>}
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:363

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizSummary.tsx`:49

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\RiggingModule.tsx`:44

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\NativeISOModule.tsx`:151

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:56

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:89

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-sm aspect-square border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center relative shadow-lg overflow-hidden rounded-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:134

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:225

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:332

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\SonySystemView.tsx`:185

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\SonySystemView.tsx`:335

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\SonySystemView.tsx`:482

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-4xl aspect-[3/2] bg-zinc-50 dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800 rounded-lg relative flex overflow-hidden font-sans select-none shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\SonySystemView.tsx`:526

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\UtilityToolsView.tsx`:25

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-72 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\VideoEngineeringView.tsx`:92

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\VideoEngineeringView.tsx`:154

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\VideoEngineeringView.tsx`:201

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\ZoomSystemView.tsx`:388

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.19:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto select-none">
```

> Fails AA (needs 3.0:1, got 1.19:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `App.tsx`:133

- **Element:** `<header>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<header className="h-12 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between px-4 lg:px-6 bg-zinc-50 dark:bg-zinc-900 shrink-0 z-50 shadow-sm relative transition-colors duration-300">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `App.tsx`:138

- **Element:** `<span>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[oklch(15%_0.01_286)] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Masterclass v8.0</span>
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `App.tsx`:193

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-3 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 sticky top-0 z-10 flex gap-2 transition-colors duration-300">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `App.tsx`:226

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full text-left p-3 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-primary-500/50 rounded-lg group transition-all"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\AnamorphicModule.tsx`:13

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg transition-colors duration-500"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\AnamorphicModule.tsx`:44

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\AsphericalView.tsx`:69

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative border-b lg:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\AsphericalView.tsx`:84

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full aspect-square bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg relative flex items-center justify-center overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CineLensMechanicsModule.tsx`:23

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-80 h-48 bg-zinc-50 dark:bg-zinc-800 rounded-lg overflow-hidden border-4 border-zinc-200 dark:border-zinc-700 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CineLensMechanicsModule.tsx`:43

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-32 h-32 rounded-full border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg relative flex items-center justify-center">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CineLensMechanicsModule.tsx`:80

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CinematographyView.tsx`:45

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CinematographyView.tsx`:78

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-3xl aspect-[4/3] lg:aspect-video bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg rounded-lg group">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CinematographyView.tsx`:123

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CinematographyView.tsx`:234

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\CinematographyView.tsx`:241

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-8 bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\Controls.tsx`:47

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-0.5 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500/50 transition-all">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\Controls.tsx`:117

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 block p-3 appearance-none cursor-pointer transition-colors hover:border-zinc-600"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:12

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-2xl aspect-video bg-zinc-50 dark:bg-zinc-900 relative border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg rounded-lg group">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:89

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\HDRModule.tsx`:15

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\HDRModule.tsx`:19

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\HDRModule.tsx`:38

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:59

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:60

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs font-bold text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:107

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:111

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:120

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:194

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute bottom-4 left-4 w-48 h-32 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded p-2">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:208

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:267

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-zinc-50 dark:bg-black border-4 border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:296

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:371

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:424

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-4 gap-1 p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:430

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-2 gap-1 p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:446

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:476

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\DigitalISPView.tsx`:37

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\ExposureModesModule.tsx`:88

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shadow-lg flex items-center justify-center transform rotate-12 transition-all">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\ExposureModesModule.tsx`:94

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-xl aspect-video bg-zinc-50 dark:bg-black rounded-lg overflow-hidden border-8 border-zinc-200 dark:border-zinc-800 shadow-inner">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\ExposureModesModule.tsx`:160

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-800 p-6 flex flex-col border-l border-zinc-200 dark:border-zinc-700 select-none">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocalLengthModule.tsx`:14

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-full max-w-4xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center rounded-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocalLengthModule.tsx`:30

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative z-10 w-48 h-64 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocalLengthModule.tsx`:40

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocusControlModule.tsx`:98

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-full max-w-3xl bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocusControlModule.tsx`:140

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocusControlModule.tsx`:160

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-56 h-56 rounded-full border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-[inset_0_0_20px_black] relative overflow-hidden flex items-center justify-center">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:7

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 flex flex-col items-start hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors select-none group min-w-[140px]">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:31

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={idx} className="bg-zinc-50 dark:bg-zinc-900/80 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:56

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:128

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:199

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:268

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:332

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:391

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:440

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:489

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:513

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:border-primary-500/50 transition-all">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:543

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:border-primary-500/50 transition-all">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:573

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearShowcaseView.tsx`:21

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GeometricView.tsx`:29

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 relative border-b lg:border-r border-zinc-200 dark:border-zinc-700 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\ImagingPipelineView.tsx`:30

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:35

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:68

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-64 h-64 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:95

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:102

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-4">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:210

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 shadow-md flex flex-col select-none border border-zinc-200 dark:border-zinc-700 transition-colors duration-300">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:285

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:316

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 mt-2 bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:347

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-lg aspect-square lg:aspect-video bg-zinc-50 dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden group">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:376

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:458

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:461

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg mb-8 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:488

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-lg aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg group">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:536

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LensAdvancedView.tsx`:547

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700 min-h-[120px]">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LightingModule.tsx`:17

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-64 h-80 lg:w-80 lg:h-96 bg-zinc-50 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LightingModule.tsx`:35

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:30

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 lg:p-8 relative overflow-hidden flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:29

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:119

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg flex-1 text-center border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:133

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-72 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-col justify-center">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:205

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\CheatSheetModule.tsx`:8

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:117

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden flex flex-col font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:132

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`col-span-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 p-4 flex justify-between items-end rounded hover:border-emerald-500 cursor-help transition-colors group ${activeParam === 'INTEGRATED' ? 'border-emerald-500 bg-emerald-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:177

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`col-span-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded p-2 flex flex-col justify-between hover:border-primary-500 cursor-help transition-colors group ${activeParam === 'LEVELS' ? 'border-primary-500 bg-primary-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:192

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`col-span-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded p-2 flex flex-col justify-center items-center hover:border-red-500 cursor-help transition-colors group ${activeParam === 'TRUE_PEAK' ? 'border-red-500 bg-red-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:203

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`h-32 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-700 relative flex items-center justify-center hover:border-green-500 cursor-help transition-colors group ${activeParam === 'SOUND_FIELD' ? 'bg-green-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:231

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-md transition-colors duration-300 border-t lg:border-t-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:245

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:546

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 border-2 border-dashed border-zinc-200 dark:border-zinc-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer bg-zinc-50 dark:bg-zinc-900/20 group"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:573

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col animate-in fade-in slide-in-from-bottom-8">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:584

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:609

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`mb-8 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group transition-shadow duration-300 ${isPlaying ? 'ring-1 ring-cyan-500/50 shadow-[0_0_30px_oklch(72%_0.15_200_/_0.1)]' : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:667

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-10 w-32 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:697

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-10 w-32 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:775

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-col items-center text-center relative overflow-hidden transition-colors ${highlight ? 'ring-1 ring-primary-500/30 bg-zinc-50 dark:bg-zinc-800 shadow-md' : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\MathTheoryModule.tsx`:60

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 border-b border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:484

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 select-none relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:524

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:556

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 relative overflow-hidden shadow-inner"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:569

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between gap-2 lg:gap-6">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:583

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-md transition-colors duration-300 border-t lg:border-t-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:597

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:526

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 select-none relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:567

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:599

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 relative overflow-hidden shadow-inner"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:612

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between gap-2 lg:gap-6">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:625

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-md transition-colors duration-300 border-t lg:border-t-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:48

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 relative overflow-hidden flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:166

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:174

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:209

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-lg aspect-video bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:281

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 relative flex flex-col justify-center">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:283

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-48 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:407

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-sm font-mono text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">{val}</div>
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:451

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:459

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:525

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-block bg-zinc-50 dark:bg-zinc-800 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\UnitsModule.tsx`:15

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full aspect-[16/10] bg-zinc-50 dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative shadow-lg shrink-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\UnitsModule.tsx`:20

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 shrink-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\WorkflowModule.tsx`:75

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 min-h-[200px] relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\LoudnessStandardView.tsx`:50

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:33

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:204

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-3xl aspect-[16/9] bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-lg flex">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:241

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full h-16 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 relative overflow-hidden rounded">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:262

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:268

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mb-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:291

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-[480px] h-[320px] bg-zinc-50 dark:bg-black border-4 border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MechanicsView.tsx`:406

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MonitoringModule.tsx`:16

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-3xl aspect-video bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg rounded-lg group">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MonitoringModule.tsx`:134

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MotorView.tsx`:56

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 relative flex items-center justify-center border-b lg:border-r border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MovementModule.tsx`:10

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-64 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-lg flex items-center justify-center perspective-1000">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\MovementModule.tsx`:24

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\OpticalFiltersView.tsx`:70

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto no-scrollbar">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\OpticalFiltersView.tsx`:81

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="min-h-[160px] bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineColor.tsx`:36

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-48 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 flex gap-8">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineColor.tsx`:68

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineOptics.tsx`:77

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineOptics.tsx`:88

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="min-h-[120px] bg-zinc-50 dark:bg-zinc-800 rounded p-4 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:71

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:85

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-8 bg-zinc-50 dark:bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:147

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:167

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-8 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:192

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:217

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:246

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSensor.tsx`:331

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:18

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-4 gap-0.5 bg-zinc-50 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:40

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-2 gap-0.5 bg-zinc-50 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:67

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:104

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative border-4 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black w-[400px] h-[300px] flex items-center justify-center overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:161

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:191

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-2xl aspect-video bg-zinc-50 dark:bg-zinc-900 relative border border-zinc-200 dark:border-zinc-700 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:223

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:29

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:139

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-5xl aspect-video relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg bg-zinc-50 dark:bg-zinc-950 mt-4">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:183

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-[480px] bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto select-none shadow-md z-10">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:230

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 mt-auto border-t border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:386

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-zinc-200 dark:border-zinc-700 shadow-[inset_0_0_10px_black] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 cursor-crosshair group overflow-hidden"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:458

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-12 p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg max-w-lg text-center shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:161

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={optIdx} className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 font-mono truncate">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:446

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-20 right-8 z-[100] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-4 animate-in slide-in-from-right-10 fade-in duration-300">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:458

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:492

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-1/3 min-w-[320px] border-r border-zinc-200 dark:border-zinc-800 flex flex-col bg-zinc-50 dark:bg-zinc-900/50">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:493

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 sticky top-0 z-10">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:506

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex justify-between items-center shadow-sm z-10">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizEditor.tsx`:126

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-5xl h-[80vh] bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col shadow-lg animate-in fade-in zoom-in duration-300">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizEditor.tsx`:145

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 focus:border-cyan-500 outline-none resize-none"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizEditor.tsx`:161

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full h-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-xs text-green-400 focus:border-emerald-500 outline-none resize-none"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:110

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:119

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700 animate-in fade-in"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:128

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:135

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-primary-500 dark:text-cyan-400 hover:text-primary-600 dark:hover:text-cyan-300 rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:142

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto border-4 border-zinc-200 dark:border-zinc-800 shadow-lg relative">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:188

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg py-3 pl-20 pr-16 text-zinc-900 dark:text-white font-mono font-bold focus:border-cyan-500 focus:outline-none transition-colors"
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:314

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="text-xs p-3 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 grid gap-2"><strong className="text-emerald-400 border-b border-zinc-200 dark:border-zinc-700 pb-1 block">正确配对：</strong>{question.options.map((opt, i) => (<div key={i} className="flex justify-between"><span className="text-zinc-600 dark:text-zinc-400 font-bold mr-2">{String.fromCharCode(65 + i)}. {opt}</span><span className="text-zinc-600">→</span><span className="text-white text-right">{(question.correctAnswer as string[])[i]}</span></div>))}</div>}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:324

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={opt} className={`p-3 rounded-xl border-2 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 flex items-center gap-4 transition-colors ${isRevealed ? (JSON.stringify(orderedOptions) === JSON.stringify(question.correctAnswer) ? 'border-emerald-500' : 'border-red-500') : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:334

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800"><strong className="text-emerald-400">正确顺序：</strong> {(question.correctAnswer as string[]).join(' → ')}</div>}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:346

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-sm"><span className="font-bold text-zinc-600 dark:text-zinc-400">参考答案：</span> <span className="text-zinc-900 dark:text-white">{question.correctAnswer}</span></div>}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:363

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:386

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="space-y-2"><div className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-sm flex justify-between items-center"><span className="text-zinc-600 dark:text-zinc-400">正确数值：</span><span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{conf.correctValue} {conf.unit}</span></div>{!isClose && (<div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-700 dark:text-yellow-200"><strong>提示：</strong> 您的选择偏{interactiveValue > conf.correctValue ? '高' : '低'}了 {Math.abs(interactiveValue - conf.correctValue)} {conf.unit}。</div>)}</div>}
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizSummary.tsx`:49

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\RiggingModule.tsx`:9

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center relative p-8 border-b lg:border-b-0 border-zinc-200 dark:border-zinc-800 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\RiggingModule.tsx`:44

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\NativeISOModule.tsx`:139

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\NativeISOModule.tsx`:143

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\NativeISOModule.tsx`:151

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:56

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:89

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-sm aspect-square border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center relative shadow-lg overflow-hidden rounded-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:134

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:163

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:225

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:240

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-auto bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:332

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:341

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:384

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-8 right-8 w-20 h-20 rounded-full border-4 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shadow-lg flex items-center justify-center z-10">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:389

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-xl aspect-video bg-zinc-50 dark:bg-black rounded-xl overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:422

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-800 p-6 flex flex-col border-l border-zinc-200 dark:border-zinc-700 select-none overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SensorExposureView.tsx`:34

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:33

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:104

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:108

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-blue-500">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:112

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-orange-500">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:185

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:203

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:234

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative aspect-video bg-zinc-50 dark:bg-black rounded overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:335

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:482

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-4xl aspect-[3/2] bg-zinc-50 dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800 rounded-lg relative flex overflow-hidden font-sans select-none shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:485

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-[10%] min-w-[50px] bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center py-4 gap-4 border-r border-zinc-200 dark:border-zinc-700 shrink-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:492

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-[30%] bg-zinc-50 dark:bg-zinc-900 flex flex-col py-2 border-r border-zinc-200 dark:border-zinc-700 shrink-0 overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:526

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\TabNavigation.tsx`:50

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shrink-0 relative z-10 shadow-sm">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\UtilityToolsView.tsx`:25

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-72 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:30

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:92

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:154

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:158

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 italic">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:179

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-xl h-48 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-zinc-800 relative flex items-center justify-center overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:201

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\ZoomSystemView.tsx`:250

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\ZoomSystemView.tsx`:388

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.20:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto select-none">
```

> Fails AA (needs 3.0:1, got 1.20:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\GearPages.tsx`:341

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-200` → `#e6e6e8`
- **Contrast ratio:** `1.21:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-block bg-zinc-200 dark:bg-black border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white text-xs font-bold px-2 py-1 rounded mb-4 shadow-lg">SONY G</div>
```

> Fails AA (needs 3.0:1, got 1.21:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-200` (#e6e6e8).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:230

- **Element:** `<button>`
- **Foreground:** `dark:border-white` → `#ffffff`
- **Background:** `dark:bg-zinc-200` → `#e6e6e8`
- **Contrast ratio:** `1.25:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setCurve('LINEAR')} className={`flex-1 p-2 rounded text-xs font-bold border ${curve === 'LINEAR' ? 'bg-zinc-700 dark:bg-zinc-200 border-zinc-600 dark:border-white text-white dark:text-zinc-900' : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-600 dark:text-zinc-400'}`}>Linear</button>
```

> Fails AA (needs 3.0:1, got 1.25:1). Fix: adjust `dark:border-white` (currently #ffffff) or `dark:bg-zinc-200` (#e6e6e8).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:775

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-white` → `#ffffff`
- **Contrast ratio:** `1.25:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-col items-center text-center relative overflow-hidden transition-colors ${highlight ? 'ring-1 ring-primary-500/30 bg-zinc-50 dark:bg-zinc-800 shadow-md' : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.25:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-white` (#ffffff).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:562

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-white` → `#ffffff`
- **Contrast ratio:** `1.25:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
```

> Fails AA (needs 3.0:1, got 1.25:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-white` (#ffffff).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:605

- **Element:** `<div>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-white` → `#ffffff`
- **Contrast ratio:** `1.25:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
```

> Fails AA (needs 3.0:1, got 1.25:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-white` (#ffffff).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:131

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-200` → `#e6e6e8`
- **Background:** `bg-white` → `#ffffff`
- **Contrast ratio:** `1.25:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 flex gap-3 items-start group shadow-sm hover:shadow-md transition-colors relative ${isInsertionTarget ? 'mt-6' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.25:1). Fix: adjust `border-zinc-200` (currently #e6e6e8) or `bg-white` (#ffffff).

#### [FAIL] `App.tsx`:450

- **Element:** `<div>`
- **Foreground:** `border-zinc-800` → `#262629`
- **Background:** `bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-950 border-t border-zinc-800 p-4 shrink-0 z-20">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `border-zinc-800` (currently #262629) or `bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\AsphericalView.tsx`:69

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative border-b lg:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\CinematographyView.tsx`:45

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\DigitalISPView.tsx`:37

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\ImagingPipelineView.tsx`:30

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\LensAdvancedView.tsx`:35

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:584

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:609

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`mb-8 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group transition-shadow duration-300 ${isPlaying ? 'ring-1 ring-cyan-500/50 shadow-[0_0_30px_oklch(72%_0.15_200_/_0.1)]' : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:484

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 select-none relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:526

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 select-none relative overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:209

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-lg aspect-video bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:281

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 relative flex flex-col justify-center">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\LoudnessStandardView.tsx`:50

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\MechanicsView.tsx`:33

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\PipelineSensor.tsx`:192

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\PostProductionView.tsx`:29

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\quiz\QuizEditor.tsx`:145

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 focus:border-cyan-500 outline-none resize-none"
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\quiz\QuizEditor.tsx`:161

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full h-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-xs text-green-400 focus:border-emerald-500 outline-none resize-none"
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\RiggingModule.tsx`:9

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center relative p-8 border-b lg:border-b-0 border-zinc-200 dark:border-zinc-800 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\SensorExposureView.tsx`:34

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\SonySystemView.tsx`:33

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\TabNavigation.tsx`:50

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shrink-0 relative z-10 shadow-sm">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\VideoEngineeringView.tsx`:30

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\ZoomSystemView.tsx`:250

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.31:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800">
```

> Fails AA (needs 3.0:1, got 1.31:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\PostProductionView.tsx`:525

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-700` → `#404045`
- **Contrast ratio:** `1.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{badge && <div className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 px-1.5 rounded border border-zinc-300 dark:border-zinc-600 font-mono">{badge}</div>}
```

> Fails AA (needs 4.5:1, got 1.38:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-700` (#404045).

#### [FAIL] `components\PostProductionView.tsx`:525

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-700` → `#404045`
- **Contrast ratio:** `1.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{badge && <div className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 px-1.5 rounded border border-zinc-300 dark:border-zinc-600 font-mono">{badge}</div>}
```

> Fails AA (needs 3.0:1, got 1.38:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-700` (#404045).

#### [FAIL] `App.tsx`:199

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.39:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full bg-zinc-100 dark:bg-[oklch(15%_0.01_286)] border border-zinc-300 dark:border-white/10 rounded-md py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 font-mono"
```

> Fails AA (needs 3.0:1, got 1.39:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\PostProductionView.tsx`:525

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `1.39:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{badge && <div className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 px-1.5 rounded border border-zinc-300 dark:border-zinc-600 font-mono">{badge}</div>}
```

> Fails AA (needs 3.0:1, got 1.39:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\AsphericalView.tsx`:84

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `1.40:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full aspect-square bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg relative flex items-center justify-center overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.40:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-black` (#000000).

#### [FAIL] `components\ExposureModesModule.tsx`:94

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `1.40:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-xl aspect-video bg-zinc-50 dark:bg-black rounded-lg overflow-hidden border-8 border-zinc-200 dark:border-zinc-800 shadow-inner">
```

> Fails AA (needs 3.0:1, got 1.40:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-black` (#000000).

#### [FAIL] `components\loudness\UnitsModule.tsx`:15

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `1.40:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full aspect-[16/10] bg-zinc-50 dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative shadow-lg shrink-0">
```

> Fails AA (needs 3.0:1, got 1.40:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-black` (#000000).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:389

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `1.40:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-xl aspect-video bg-zinc-50 dark:bg-black rounded-xl overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.40:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-black` (#000000).

#### [FAIL] `components\VideoEngineeringView.tsx`:179

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-800` → `#262629`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `1.40:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-xl h-48 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-zinc-800 relative flex items-center justify-center overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.40:1). Fix: adjust `dark:border-zinc-800` (currently #262629) or `dark:bg-black` (#000000).

#### [FAIL] `components\CineLensMechanicsModule.tsx`:23

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-80 h-48 bg-zinc-50 dark:bg-zinc-800 rounded-lg overflow-hidden border-4 border-zinc-200 dark:border-zinc-700 shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\CinematographyView.tsx`:241

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-8 bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\Controls.tsx`:117

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 block p-3 appearance-none cursor-pointer transition-colors hover:border-zinc-600"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:93

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setBitDepth('8bit')} className={`w-full p-4 rounded-lg border text-left transition-colors ${bitDepth === '8bit' ? 'bg-zinc-100 dark:bg-zinc-800 border-red-500 shadow ring-1 ring-red-500/20' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:104

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setBitDepth('10bit')} className={`w-full p-4 rounded-lg border text-left transition-colors ${bitDepth === '10bit' ? 'bg-zinc-100 dark:bg-zinc-800 border-cyan-500 shadow ring-1 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\HDRModule.tsx`:19

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\HDRModule.tsx`:38

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:59

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:111

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:120

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:194

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute bottom-4 left-4 w-48 h-32 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded p-2">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:233

- **Element:** `<div>`
- **Foreground:** `text-zinc-700` → `#404045`
- **Background:** `bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 leading-relaxed">
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `text-zinc-700` (currently #404045) or `bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:424

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-4 gap-1 p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:430

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-2 gap-1 p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\ExposureModesModule.tsx`:88

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shadow-lg flex items-center justify-center transform rotate-12 transition-all">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\ExposureModesModule.tsx`:160

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-800 p-6 flex flex-col border-l border-zinc-200 dark:border-zinc-700 select-none">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\FocalLengthModule.tsx`:30

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative z-10 w-48 h-64 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\LensAdvancedView.tsx`:102

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-4">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\LensAdvancedView.tsx`:210

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 shadow-md flex flex-col select-none border border-zinc-200 dark:border-zinc-700 transition-colors duration-300">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\LensAdvancedView.tsx`:285

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\LensAdvancedView.tsx`:376

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 p-6 flex flex-col overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\LensAdvancedView.tsx`:461

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg mb-8 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\LensAdvancedView.tsx`:547

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700 min-h-[120px]">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:61

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-12 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 shadow-sm">
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `dark:text-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:119

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg flex-1 text-center border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:133

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-72 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-col justify-center">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:205

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\LoudnessAnalyzerModule.tsx`:775

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-col items-center text-center relative overflow-hidden transition-colors ${highlight ? 'ring-1 ring-primary-500/30 bg-zinc-50 dark:bg-zinc-800 shadow-md' : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:166

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:174

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:407

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-sm font-mono text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">{val}</div>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:451

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:459

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:525

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-block bg-zinc-50 dark:bg-zinc-800 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\StandardsModule.tsx`:21

- **Element:** `<thead>`
- **Foreground:** `dark:text-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-700 dark:text-zinc-200">
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `dark:text-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\StandardsModule.tsx`:67

- **Element:** `<thead>`
- **Foreground:** `dark:text-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-700 dark:text-zinc-200">
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `dark:text-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\MechanicsView.tsx`:268

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mb-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\MechanicsView.tsx`:439

- **Element:** `<div>`
- **Foreground:** `text-zinc-700` → `#404045`
- **Background:** `bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `text-zinc-700` (currently #404045) or `bg-zinc-800` (#262629).

#### [FAIL] `components\MovementModule.tsx`:10

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-64 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-lg flex items-center justify-center perspective-1000">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\OpticalFiltersView.tsx`:81

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="min-h-[160px] bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineOptics.tsx`:88

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="min-h-[120px] bg-zinc-50 dark:bg-zinc-800 rounded p-4 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineSensor.tsx`:85

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-8 bg-zinc-50 dark:bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineSensor.tsx`:167

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-8 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineSensor.tsx`:246

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineSignal.tsx`:18

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-4 gap-0.5 bg-zinc-50 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineSignal.tsx`:40

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-2 gap-0.5 bg-zinc-50 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PostProductionView.tsx`:458

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-12 p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg max-w-lg text-center shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:152

- **Element:** `<span>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[10px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 rounded border border-zinc-200 dark:border-zinc-700">{item.question.type}</span>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:161

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={optIdx} className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 font-mono truncate">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:476

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors">
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `dark:text-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:476

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:479

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={handleExportJSON} className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizIntro.tsx`:110

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizIntro.tsx`:119

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700 animate-in fade-in"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizIntro.tsx`:128

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizIntro.tsx`:135

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-primary-500 dark:text-cyan-400 hover:text-primary-600 dark:hover:text-cyan-300 rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:324

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={opt} className={`p-3 rounded-xl border-2 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 flex items-center gap-4 transition-colors ${isRevealed ? (JSON.stringify(orderedOptions) === JSON.stringify(question.correctAnswer) ? 'border-emerald-500' : 'border-red-500') : ''}`}>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:346

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-sm"><span className="font-bold text-zinc-600 dark:text-zinc-400">参考答案：</span> <span className="text-zinc-900 dark:text-white">{question.correctAnswer}</span></div>}
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:386

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="space-y-2"><div className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-sm flex justify-between items-center"><span className="text-zinc-600 dark:text-zinc-400">正确数值：</span><span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{conf.correctValue} {conf.unit}</span></div>{!isClose && (<div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-700 dark:text-yellow-200"><strong>提示：</strong> 您的选择偏{interactiveValue > conf.correctValue ? '高' : '低'}了 {Math.abs(interactiveValue - conf.correctValue)} {conf.unit}。</div>)}</div>}
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\NativeISOModule.tsx`:139

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\NativeISOModule.tsx`:143

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:163

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:240

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-auto bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:341

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:384

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-8 right-8 w-20 h-20 rounded-full border-4 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shadow-lg flex items-center justify-center z-10">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:422

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-800 p-6 flex flex-col border-l border-zinc-200 dark:border-zinc-700 select-none overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:104

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:108

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-blue-500">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:112

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-orange-500">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:203

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:271

- **Element:** `<thead>`
- **Foreground:** `text-zinc-700` → `#404045`
- **Background:** `bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-800 text-zinc-700 dark:text-zinc-700 dark:text-zinc-200 uppercase"><tr><th className="p-3">名称</th><th className="p-3">特点</th><th className="p-3">应用场景</th></tr></thead>
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `text-zinc-700` (currently #404045) or `bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:298

- **Element:** `<thead>`
- **Foreground:** `text-zinc-700` → `#404045`
- **Background:** `bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-800 text-zinc-700 dark:text-zinc-700 dark:text-zinc-200 font-bold uppercase tracking-wider"><tr><th className="p-3 border-b border-zinc-200 dark:border-zinc-700">分辨率</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-700">编码格式</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-700">采样 / 位深</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-700">帧率</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-700 text-right">预计码率 (Mbps)</th></tr></thead>
```

> Fails AA (needs 4.5:1, got 1.45:1). Fix: adjust `text-zinc-700` (currently #404045) or `bg-zinc-800` (#262629).

#### [FAIL] `components\VideoEngineeringView.tsx`:158

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 italic">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:16

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:27

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center shadow-lg relative">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocalLengthModule.tsx`:46

- **Element:** `<button>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>setFocalLength(24)} className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs hover:bg-zinc-700">24mm</button>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocalLengthModule.tsx`:47

- **Element:** `<button>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>setFocalLength(50)} className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs hover:bg-zinc-700">50mm</button>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\FocalLengthModule.tsx`:48

- **Element:** `<button>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>setFocalLength(85)} className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs hover:bg-zinc-700">85mm</button>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:61

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-12 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 shadow-sm">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:179

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-48 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs text-zinc-900 dark:text-white shadow-sm">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:208

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-48 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs text-zinc-700 dark:text-zinc-300">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:78

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-bold transition-colors shadow-lg"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:489

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-bold transition-colors shadow-lg"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:713

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 shadow-lg flex items-center justify-center transform transition-transform duration-75 ${isDragging ? 'scale-95 border-white' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:532

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-bold transition-colors shadow-lg"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:757

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 shadow-lg flex items-center justify-center transform transition-transform duration-75 ${isDragging ? 'scale-95 border-white' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PipelineSignal.tsx`:53

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-48 h-32 bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden rounded border border-zinc-300 dark:border-zinc-600 mb-2">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizSummary.tsx`:105

- **Element:** `<unknown>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full py-4 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group border border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\SonySystemView.tsx`:87

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `1.45:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-0 right-0 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300">
```

> Fails AA (needs 3.0:1, got 1.45:1). Fix: adjust `border-zinc-300` (currently #d1d1d6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\PostProductionView.tsx`:403

- **Element:** `<unknown>`
- **Foreground:** `border-white` → `#ffffff`
- **Background:** `bg-zinc-300` → `#d1d1d6`
- **Contrast ratio:** `1.52:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`w-3 h-3 bg-zinc-300 rounded-full shadow-[0_0_5px_black] border border-white z-10 transition-transform duration-75 ${isDraggingPuck ? 'scale-125 bg-white' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.52:1). Fix: adjust `border-white` (currently #ffffff) or `bg-zinc-300` (#d1d1d6).

#### [FAIL] `components\VideoEngineeringView.tsx`:83

- **Element:** `<div>`
- **Foreground:** `border-zinc-500` → `#707075`
- **Background:** `bg-zinc-600` → `#545459`
- **Contrast ratio:** `1.53:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-6 h-8 bg-zinc-600 border border-zinc-500 scale-75"></div>
```

> Fails AA (needs 3.0:1, got 1.53:1). Fix: adjust `border-zinc-500` (currently #707075) or `bg-zinc-600` (#545459).

#### [FAIL] `components\VideoEngineeringView.tsx`:84

- **Element:** `<div>`
- **Foreground:** `border-zinc-500` → `#707075`
- **Background:** `bg-zinc-600` → `#545459`
- **Contrast ratio:** `1.53:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-6 h-8 bg-zinc-600 border border-zinc-500 scale-75"></div>
```

> Fails AA (needs 3.0:1, got 1.53:1). Fix: adjust `border-zinc-500` (currently #707075) or `bg-zinc-600` (#545459).

#### [FAIL] `components\GearPages.tsx`:498

- **Element:** `<div>`
- **Foreground:** `border-primary-300` → `#3dded4`
- **Background:** `bg-primary-50` → `#e8fcfc`
- **Contrast ratio:** `1.58:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-block border border-primary-300 dark:border-primary-500/50 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-blue-300 px-3 py-1 text-xs font-bold rounded mb-4 tracking-wider">E-MOUNT SYSTEM</div>
```

> Fails AA (needs 3.0:1, got 1.58:1). Fix: adjust `border-primary-300` (currently #3dded4) or `bg-primary-50` (#e8fcfc).

#### [FAIL] `components\Controls.tsx`:47

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-0.5 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500/50 transition-all">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:12

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-2xl aspect-video bg-zinc-50 dark:bg-zinc-900 relative border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg rounded-lg group">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:60

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs font-bold text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\GeometricView.tsx`:29

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 relative border-b lg:border-r border-zinc-200 dark:border-zinc-700 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:68

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-64 h-64 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:218

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700 text-xs font-mono w-40 shadow-inner">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:316

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 mt-2 bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\CheatSheetModule.tsx`:8

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-lg">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:117

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden flex flex-col font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:120

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 px-3 py-1 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\MathTheoryModule.tsx`:16

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:524

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:556

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 relative overflow-hidden shadow-inner"
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:562

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:569

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between gap-2 lg:gap-6">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:567

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:599

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 relative overflow-hidden shadow-inner"
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:605

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:612

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-6 h-32 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between gap-2 lg:gap-6">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\QualityIndicatorsModule.tsx`:283

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full h-48 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\WorkflowModule.tsx`:12

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col md:flex-row items-center gap-6">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\MonitoringModule.tsx`:16

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-3xl aspect-video bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg rounded-lg group">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\MotorView.tsx`:56

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="flex-1 bg-zinc-50 dark:bg-zinc-900 relative flex items-center justify-center border-b lg:border-r border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PipelineSignal.tsx`:191

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-2xl aspect-video bg-zinc-50 dark:bg-zinc-900 relative border border-zinc-200 dark:border-zinc-700 overflow-hidden">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PostProductionView.tsx`:230

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 mt-auto border-t border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PostProductionView.tsx`:386

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-zinc-200 dark:border-zinc-700 shadow-[inset_0_0_10px_black] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 cursor-crosshair group overflow-hidden"
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:131

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 flex gap-3 items-start group shadow-sm hover:shadow-md transition-colors relative ${isInsertionTarget ? 'mt-6' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:446

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-20 right-8 z-[100] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-4 animate-in slide-in-from-right-10 fade-in duration-300">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizEditor.tsx`:126

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-5xl h-[80vh] bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col shadow-lg animate-in fade-in zoom-in duration-300">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\SonySystemView.tsx`:485

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-[10%] min-w-[50px] bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center py-4 gap-4 border-r border-zinc-200 dark:border-zinc-700 shrink-0">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\SonySystemView.tsx`:492

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `1.73:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-[30%] bg-zinc-50 dark:bg-zinc-900 flex flex-col py-2 border-r border-zinc-200 dark:border-zinc-700 shrink-0 overflow-y-auto">
```

> Fails AA (needs 3.0:1, got 1.73:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:132

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`col-span-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 p-4 flex justify-between items-end rounded hover:border-emerald-500 cursor-help transition-colors group ${activeParam === 'INTEGRATED' ? 'border-emerald-500 bg-emerald-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:177

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`col-span-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded p-2 flex flex-col justify-between hover:border-primary-500 cursor-help transition-colors group ${activeParam === 'LEVELS' ? 'border-primary-500 bg-primary-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:192

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`col-span-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded p-2 flex flex-col justify-center items-center hover:border-red-500 cursor-help transition-colors group ${activeParam === 'TRUE_PEAK' ? 'border-red-500 bg-red-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:203

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`h-32 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-700 relative flex items-center justify-center hover:border-green-500 cursor-help transition-colors group ${activeParam === 'SOUND_FIELD' ? 'bg-green-900/10' : ''}`}
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\MechanicsView.tsx`:241

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full h-16 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 relative overflow-hidden rounded">
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\PostProductionView.tsx`:139

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full max-w-5xl aspect-video relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg bg-zinc-50 dark:bg-zinc-950 mt-4">
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\quiz\QuizEditor.tsx`:145

- **Element:** `<unknown>`
- **Foreground:** `dark:text-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 focus:border-cyan-500 outline-none resize-none"
```

> Fails AA (needs 4.5:1, got 1.91:1). Fix: adjust `dark:text-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\quiz\QuizIntro.tsx`:188

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-zinc-950` → `#0a0a0a`
- **Contrast ratio:** `1.91:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg py-3 pl-20 pr-16 text-zinc-900 dark:text-white font-mono font-bold focus:border-cyan-500 focus:outline-none transition-colors"
```

> Fails AA (needs 3.0:1, got 1.91:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-zinc-950` (#0a0a0a).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:93

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setBitDepth('8bit')} className={`w-full p-4 rounded-lg border text-left transition-colors ${bitDepth === '8bit' ? 'bg-zinc-100 dark:bg-zinc-800 border-red-500 shadow ring-1 ring-red-500/20' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\BitDepthModule.tsx`:104

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setBitDepth('10bit')} className={`w-full p-4 rounded-lg border text-left transition-colors ${bitDepth === '10bit' ? 'bg-zinc-100 dark:bg-zinc-800 border-cyan-500 shadow ring-1 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:16

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center shadow-lg">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:27

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center shadow-lg relative">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:480

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-3 bg-zinc-50 dark:bg-zinc-800 rounded border-l-2 border-primary-500">
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\FocalLengthModule.tsx`:46

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>setFocalLength(24)} className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs hover:bg-zinc-700">24mm</button>
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\FocalLengthModule.tsx`:47

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>setFocalLength(50)} className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs hover:bg-zinc-700">50mm</button>
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\FocalLengthModule.tsx`:48

- **Element:** `<button>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>setFocalLength(85)} className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs hover:bg-zinc-700">85mm</button>
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:61

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-12 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 shadow-sm">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:179

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-48 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs text-zinc-900 dark:text-white shadow-sm">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:208

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-48 h-10 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center text-xs text-zinc-700 dark:text-zinc-300">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\InsightGuideModule.tsx`:78

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-bold transition-colors shadow-lg"
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:489

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-bold transition-colors shadow-lg"
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\ProCGuideModule.tsx`:713

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 shadow-lg flex items-center justify-center transform transition-transform duration-75 ${isDragging ? 'scale-95 border-white' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:532

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-bold transition-colors shadow-lg"
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\ProGGuideModule.tsx`:757

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className={`w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 shadow-lg flex items-center justify-center transform transition-transform duration-75 ${isDragging ? 'scale-95 border-white' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\PipelineSignal.tsx`:53

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-48 h-32 bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden rounded border border-zinc-300 dark:border-zinc-600 mb-2">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:161

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={optIdx} className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 font-mono truncate">
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizIntro.tsx`:128

- **Element:** `<unknown>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizIntro.tsx`:172

- **Element:** `<unknown>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className={`flex-1 py-3 rounded-lg font-bold transition-colors ${selectedQuestionCount === count ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\quiz\QuizSummary.tsx`:105

- **Element:** `<unknown>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full py-4 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group border border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:240

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-auto bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed">
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\SonySystemView.tsx`:87

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-0 right-0 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300">
```

> Fails AA (needs 3.0:1, got 2.00:1). Fix: adjust `dark:border-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\VideoEngineeringView.tsx`:158

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `2.00:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 italic">
```

> Fails AA (needs 4.5:1, got 2.00:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:267

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `2.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-zinc-50 dark:bg-black border-4 border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg">
```

> Fails AA (needs 3.0:1, got 2.03:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-black` (#000000).

#### [FAIL] `components\LensAdvancedView.tsx`:347

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `2.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-lg aspect-square lg:aspect-video bg-zinc-50 dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden group">
```

> Fails AA (needs 3.0:1, got 2.03:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-black` (#000000).

#### [FAIL] `components\MechanicsView.tsx`:204

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `2.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-full max-w-3xl aspect-[16/9] bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-lg flex">
```

> Fails AA (needs 3.0:1, got 2.03:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-black` (#000000).

#### [FAIL] `components\MechanicsView.tsx`:291

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `2.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative w-[480px] h-[320px] bg-zinc-50 dark:bg-black border-4 border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow-lg">
```

> Fails AA (needs 3.0:1, got 2.03:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-black` (#000000).

#### [FAIL] `components\PipelineSignal.tsx`:104

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `2.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative border-4 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black w-[400px] h-[300px] flex items-center justify-center overflow-hidden">
```

> Fails AA (needs 3.0:1, got 2.03:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-black` (#000000).

#### [FAIL] `components\SonySystemView.tsx`:234

- **Element:** `<div>`
- **Foreground:** `dark:border-zinc-700` → `#404045`
- **Background:** `dark:bg-black` → `#000000`
- **Contrast ratio:** `2.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="relative aspect-video bg-zinc-50 dark:bg-black rounded overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 3.0:1, got 2.03:1). Fix: adjust `dark:border-zinc-700` (currently #404045) or `dark:bg-black` (#000000).

#### [FAIL] `components\BroadcastStandardsView.tsx`:88

- **Element:** `<div>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-900 p-3 rounded-lg h-min text-zinc-600 dark:text-zinc-400"><Clock size={20}/></div>
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `text-zinc-600` (currently #545459) or `bg-zinc-900` (#17171a).

#### [FAIL] `components\BroadcastStandardsView.tsx`:100

- **Element:** `<div>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-900 p-3 rounded-lg h-min text-zinc-600 dark:text-zinc-400"><Globe size={20}/></div>
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `text-zinc-600` (currently #545459) or `bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:60

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs font-bold text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\LensAdvancedView.tsx`:316

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 mt-2 bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\AlgorithmLabModule.tsx`:137

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 mb-6 italic bg-zinc-50 dark:bg-zinc-900 p-3 rounded">
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\loudness\MathTheoryModule.tsx`:100

- **Element:** `<thead>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400">
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:334

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `2.38:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800"><strong className="text-emerald-400">正确顺序：</strong> {(question.correctAnswer as string[]).join(' → ')}</div>}
```

> Fails AA (needs 4.5:1, got 2.38:1). Fix: adjust `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\digital-isp\ISPModules.tsx`:432

- **Element:** `<div>`
- **Foreground:** `border-zinc-400` → `#a1a1a6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `2.47:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={i} className="w-12 h-12 lg:w-16 lg:h-16 bg-zinc-50 flex items-center justify-center text-black text-xs font-bold border border-zinc-400">
```

> Fails AA (needs 3.0:1, got 2.47:1). Fix: adjust `border-zinc-400` (currently #a1a1a6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:342

- **Element:** `<input>`
- **Foreground:** `placeholder-zinc-400` → `#a1a1a6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `2.47:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} disabled={isRevealed} placeholder="输入答案..." className={`w-full bg-zinc-50 dark:bg-zinc-900 border-2 rounded-xl p-4 text-lg text-zinc-900 dark:text-white outline-none transition-colors placeholder-zinc-400 dark:placeholder-zinc-500 ${isRevealed ? 'border-zinc-700' : 'border-zinc-700 focus:border-cyan-500'}`} autoFocus />
```

> Fails AA (needs 4.5:1, got 2.47:1). Fix: adjust `placeholder-zinc-400` (currently #a1a1a6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:78

- **Element:** `<div>`
- **Foreground:** `border-zinc-400` → `#a1a1a6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `2.47:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{[...Array(3)].map((_,i) => <div key={i} className="w-6 h-8 bg-zinc-50 border border-zinc-400"></div>)}
```

> Fails AA (needs 3.0:1, got 2.47:1). Fix: adjust `border-zinc-400` (currently #a1a1a6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\VideoEngineeringView.tsx`:82

- **Element:** `<div>`
- **Foreground:** `border-zinc-400` → `#a1a1a6`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `2.47:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-6 h-8 bg-zinc-50 border border-zinc-400"></div>
```

> Fails AA (needs 3.0:1, got 2.47:1). Fix: adjust `border-zinc-400` (currently #a1a1a6) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\Controls.tsx`:70

- **Element:** `<unknown>`
- **Foreground:** `accent-primary-500` → `#00998a`
- **Background:** `bg-zinc-700` → `#404045`
- **Contrast ratio:** `2.92:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-primary-500 hover:accent-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
```

> Fails AA (needs 3.0:1, got 2.92:1). Fix: adjust `accent-primary-500` (currently #00998a) or `bg-zinc-700` (#404045).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:152

- **Element:** `<span>`
- **Foreground:** `dark:text-zinc-500` → `#707075`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `3.06:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[10px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 rounded border border-zinc-200 dark:border-zinc-700">{item.question.type}</span>
```

> Fails AA (needs 4.5:1, got 3.06:1). Fix: adjust `dark:text-zinc-500` (currently #707075) or `dark:bg-zinc-800` (#262629).

#### [FAIL] `components\loudness\AlgorithmFlowModule.tsx`:71

- **Element:** `<div>`
- **Foreground:** `text-primary-500` → `#00998a`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `3.39:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute -top-3 left-4 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-primary-500 dark:text-cyan-500 font-bold whitespace-nowrap">K-Weighting (预滤波)</div>
```

> Fails AA (needs 4.5:1, got 3.39:1). Fix: adjust `text-primary-500` (currently #00998a) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:135

- **Element:** `<unknown>`
- **Foreground:** `text-primary-500` → `#00998a`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `3.39:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-primary-500 dark:text-cyan-400 hover:text-primary-600 dark:hover:text-cyan-300 rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Fails AA (needs 4.5:1, got 3.39:1). Fix: adjust `text-primary-500` (currently #00998a) or `bg-zinc-50` (#fafafa).

#### [FAIL] `components\quiz\QuizIntro.tsx`:227

- **Element:** `<unknown>`
- **Foreground:** `text-zinc-900` → `#17171a`
- **Background:** `bg-primary-600` → `#007a6e`
- **Contrast ratio:** `3.43:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-zinc-900 dark:text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-500 rounded-full focus:outline-none hover:scale-105 shadow-lg text-xl mt-4"
```

> Fails AA (needs 4.5:1, got 3.43:1). Fix: adjust `text-zinc-900` (currently #17171a) or `bg-primary-600` (#007a6e).

#### [FAIL] `components\MotorView.tsx`:142

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-500` → `#707075`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `3.65:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute bottom-0 w-full h-8 bg-zinc-50 dark:bg-zinc-900 flex justify-between px-12 pt-2 text-xs text-zinc-500 dark:text-zinc-500 font-mono">
```

> Fails AA (needs 4.5:1, got 3.65:1). Fix: adjust `dark:text-zinc-500` (currently #707075) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\quiz\QuizQuestionCard.tsx`:342

- **Element:** `<input>`
- **Foreground:** `dark:placeholder-zinc-500` → `#707075`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `3.65:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} disabled={isRevealed} placeholder="输入答案..." className={`w-full bg-zinc-50 dark:bg-zinc-900 border-2 rounded-xl p-4 text-lg text-zinc-900 dark:text-white outline-none transition-colors placeholder-zinc-400 dark:placeholder-zinc-500 ${isRevealed ? 'border-zinc-700' : 'border-zinc-700 focus:border-cyan-500'}`} autoFocus />
```

> Fails AA (needs 4.5:1, got 3.65:1). Fix: adjust `dark:placeholder-zinc-500` (currently #707075) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\sensor-exposure\SensorModules.tsx`:386

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-500` → `#707075`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `3.65:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute -bottom-2 text-[11px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-900 px-1">Mode</div>
```

> Fails AA (needs 4.5:1, got 3.65:1). Fix: adjust `dark:text-zinc-500` (currently #707075) or `dark:bg-zinc-900` (#17171a).

#### [FAIL] `components\PostProductionView.tsx`:525

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-700` → `#404045`
- **Contrast ratio:** `4.01:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
{badge && <div className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 px-1.5 rounded border border-zinc-300 dark:border-zinc-600 font-mono">{badge}</div>}
```

> Fails AA (needs 4.5:1, got 4.01:1). Fix: adjust `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-700` (#404045).

#### [FAIL] `components\Controls.tsx`:56

- **Element:** `<unknown>`
- **Foreground:** `text-primary-600` → `#007a6e`
- **Background:** `bg-transparent` → `#000000`
- **Contrast ratio:** `4.03:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-12 bg-transparent text-right text-xs font-mono font-bold text-primary-600 dark:text-primary-400 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
```

> Fails AA (needs 4.5:1, got 4.03:1). Fix: adjust `text-primary-600` (currently #007a6e) or `bg-transparent` (#000000).

#### [FAIL] `components\UtilityToolsView.tsx`:286

- **Element:** `<div>`
- **Foreground:** `text-primary-500` → `#00998a`
- **Background:** `bg-zinc-800` → `#262629`
- **Contrast ratio:** `4.24:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-800 px-4 py-2 rounded border border-zinc-300 dark:border-zinc-600 font-mono text-primary-500 dark:text-cyan-400 font-bold">2^{ndStop}</div>
```

> Fails AA (needs 4.5:1, got 4.24:1). Fix: adjust `text-primary-500` (currently #00998a) or `bg-zinc-800` (#262629).

#### [FAIL] `App.tsx`:199

- **Element:** `<unknown>`
- **Foreground:** `placeholder-zinc-500` → `#707075`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.50:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full bg-zinc-100 dark:bg-[oklch(15%_0.01_286)] border border-zinc-300 dark:border-white/10 rounded-md py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 font-mono"
```

> Fails AA (needs 4.5:1, got 4.50:1). Fix: adjust `placeholder-zinc-500` (currently #707075) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `App.tsx`:207

- **Element:** `<unknown>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.50:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md bg-zinc-100 dark:bg-[oklch(15%_0.01_286)] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-50/10 transition-colors border border-zinc-200 dark:border-white/5"
```

> Fails AA (needs 4.5:1, got 4.50:1). Fix: adjust `text-zinc-500` (currently #707075) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\CinematographyView.tsx`:229

- **Element:** `<div>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.50:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute bottom-10 left-10 right-10 h-1 bg-zinc-100 dark:bg-zinc-700 flex justify-between items-center text-xs text-zinc-500">
```

> Fails AA (needs 4.5:1, got 4.50:1). Fix: adjust `text-zinc-500` (currently #707075) or `bg-zinc-100` (#f5f5f5).

#### [FAIL] `components\quiz\QuizBuilder.tsx`:152

- **Element:** `<span>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.50:1`
- **WCAG AA (4.5:1):** FAIL
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[10px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 rounded border border-zinc-200 dark:border-zinc-700">{item.question.type}</span>
```

> Fails AA (needs 4.5:1, got 4.50:1). Fix: adjust `text-zinc-500` (currently #707075) or `bg-zinc-100` (#f5f5f5).

### Warning — Passes AA, Fails AAA (7:1)

#### [WARN] `components\PostProductionView.tsx`:420

- **Element:** `<unknown>`
- **Foreground:** `accent-[#888]` → `#888888`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `3.25:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
className="w-full h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full appearance-none accent-[#888] group-hover:accent-white cursor-pointer"
```

> Passes AA (3.25:1 >= 3.0:1) but fails AAA. Consider adjusting `accent-[#888]` (currently #888888) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\digital-isp\ISPModules.tsx`:480

- **Element:** `<div>`
- **Foreground:** `border-primary-500` → `#00998a`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `3.39:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-3 bg-zinc-50 dark:bg-zinc-800 rounded border-l-2 border-primary-500">
```

> Passes AA (3.39:1 >= 3.0:1) but fails AAA. Consider adjusting `border-primary-500` (currently #00998a) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\loudness\AlgorithmFlowModule.tsx`:194

- **Element:** `<div>`
- **Foreground:** `border-primary-500` → `#00998a`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `3.39:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute w-20 h-20 bg-zinc-50 dark:bg-zinc-900 border-2 border-primary-500 transform rotate-45 z-0"></div>
```

> Passes AA (3.39:1 >= 3.0:1) but fails AAA. Consider adjusting `border-primary-500` (currently #00998a) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\VideoEngineeringView.tsx`:140

- **Element:** `<div>`
- **Foreground:** `border-primary-500` → `#00998a`
- **Background:** `bg-zinc-800` → `#262629`
- **Contrast ratio:** `4.24:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-800 p-3 rounded-lg border-t-2 border-primary-500">
```

> Passes AA (4.24:1 >= 3.0:1) but fails AAA. Consider adjusting `border-primary-500` (currently #00998a) or `bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\MechanicsView.tsx`:378

- **Element:** `<div>`
- **Foreground:** `border-zinc-500` → `#707075`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.50:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-24 bottom-24 bg-zinc-100 dark:bg-zinc-700 border border-zinc-500 flex items-center justify-center"
```

> Passes AA (4.50:1 >= 3.0:1) but fails AAA. Consider adjusting `border-zinc-500` (currently #707075) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\MotorView.tsx`:100

- **Element:** `<div>`
- **Foreground:** `border-zinc-500` → `#707075`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.50:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute right-10 w-24 h-24 bg-zinc-100 dark:bg-zinc-700 border border-zinc-500 rounded flex flex-col items-center justify-center">
```

> Passes AA (4.50:1 >= 3.0:1) but fails AAA. Consider adjusting `border-zinc-500` (currently #707075) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `App.tsx`:27

- **Element:** `<div>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.70:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-[oklch(15%_0.01_286)] text-zinc-500">
```

> Passes AA (4.70:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-500` (currently #707075) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `App.tsx`:138

- **Element:** `<span>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.70:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[oklch(15%_0.01_286)] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Masterclass v8.0</span>
```

> Passes AA (4.70:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-500` (currently #707075) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\loudness\AlgorithmFlowModule.tsx`:110

- **Element:** `<div>`
- **Foreground:** `border-zinc-500` → `#707075`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.70:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-16 h-64 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-500 rounded-full flex items-center justify-center relative">
```

> Passes AA (4.70:1 >= 3.0:1) but fails AAA. Consider adjusting `border-zinc-500` (currently #707075) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\MechanicsView.tsx`:385

- **Element:** `<div>`
- **Foreground:** `border-zinc-500` → `#707075`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.70:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute top-10 bottom-10 bg-zinc-50 dark:bg-black border border-zinc-500 rounded-l-lg flex items-center justify-center"
```

> Passes AA (4.70:1 >= 3.0:1) but fails AAA. Consider adjusting `border-zinc-500` (currently #707075) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\MotorView.tsx`:142

- **Element:** `<div>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.70:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute bottom-0 w-full h-8 bg-zinc-50 dark:bg-zinc-900 flex justify-between px-12 pt-2 text-xs text-zinc-500 dark:text-zinc-500 font-mono">
```

> Passes AA (4.70:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-500` (currently #707075) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\sensor-exposure\SensorModules.tsx`:386

- **Element:** `<div>`
- **Foreground:** `text-zinc-500` → `#707075`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.70:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute -bottom-2 text-[11px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-900 px-1">Mode</div>
```

> Passes AA (4.70:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-500` (currently #707075) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `App.tsx`:373

- **Element:** `<div>`
- **Foreground:** `text-primary-600` → `#007a6e`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `4.77:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-xs text-primary-600 dark:text-primary-400 font-mono mb-4 animate-zoom-in">
```

> Passes AA (4.77:1 >= 4.5:1) but fails AAA. Consider adjusting `text-primary-600` (currently #007a6e) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\PostProductionView.tsx`:523

- **Element:** `<div>`
- **Foreground:** `border-zinc-300` → `#d1d1d6`
- **Background:** `bg-zinc-600` → `#545459`
- **Contrast ratio:** `4.94:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-600 border border-zinc-300 dark:border-zinc-600 rounded-full"></div>
```

> Passes AA (4.94:1 >= 3.0:1) but fails AAA. Consider adjusting `border-zinc-300` (currently #d1d1d6) or `bg-zinc-600` (#545459) for AAA compliance.

#### [WARN] `components\loudness\QualityIndicatorsModule.tsx`:326

- **Element:** `<div>`
- **Foreground:** `text-primary-600` → `#007a6e`
- **Background:** `bg-zinc-50` → `#fafafa`
- **Contrast ratio:** `4.99:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="absolute bottom-6 left-[60%] text-[11px] text-primary-600 dark:text-primary-400 font-bold bg-zinc-50 dark:bg-zinc-900 px-1">Dip 让路 (2kHz-4kHz)</div>
```

> Passes AA (4.99:1 >= 4.5:1) but fails AAA. Consider adjusting `text-primary-600` (currently #007a6e) or `bg-zinc-50` (#fafafa) for AAA compliance.

#### [WARN] `components\BroadcastStandardsView.tsx`:25

- **Element:** `<div>`
- **Foreground:** `border-primary-500` → `#00998a`
- **Background:** `bg-zinc-900` → `#17171a`
- **Contrast ratio:** `5.05:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-900 p-6 rounded-2xl border-t-4 border-primary-500 shadow-lg relative overflow-hidden group">
```

> Passes AA (5.05:1 >= 3.0:1) but fails AAA. Consider adjusting `border-primary-500` (currently #00998a) or `bg-zinc-900` (#17171a) for AAA compliance.

#### [WARN] `components\BroadcastStandardsView.tsx`:53

- **Element:** `<div>`
- **Foreground:** `border-primary-500` → `#00998a`
- **Background:** `bg-zinc-900` → `#17171a`
- **Contrast ratio:** `5.05:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="bg-zinc-900 p-6 rounded-2xl border-t-4 border-primary-500 shadow-lg relative overflow-hidden group">
```

> Passes AA (5.05:1 >= 3.0:1) but fails AAA. Consider adjusting `border-primary-500` (currently #00998a) or `bg-zinc-900` (#17171a) for AAA compliance.

#### [WARN] `App.tsx`:45

- **Element:** `<button>`
- **Foreground:** `text-white` → `#ffffff`
- **Background:** `bg-primary-600` → `#007a6e`
- **Contrast ratio:** `5.21:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={onDismiss} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-md transition-colors">
```

> Passes AA (5.21:1 >= 4.5:1) but fails AAA. Consider adjusting `text-white` (currently #ffffff) or `bg-primary-600` (#007a6e) for AAA compliance.

#### [WARN] `App.tsx`:388

- **Element:** `<button>`
- **Foreground:** `text-white` → `#ffffff`
- **Background:** `bg-primary-600` → `#007a6e`
- **Contrast ratio:** `5.21:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => onEnter()} className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 group hover:-translate-y-0.5">
```

> Passes AA (5.21:1 >= 4.5:1) but fails AAA. Consider adjusting `text-white` (currently #ffffff) or `bg-primary-600` (#007a6e) for AAA compliance.

#### [WARN] `components\GearPages.tsx`:520

- **Element:** `<span>`
- **Foreground:** `text-white` → `#ffffff`
- **Background:** `bg-primary-600` → `#007a6e`
- **Contrast ratio:** `5.21:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="bg-primary-600 text-white text-xs px-2 py-1 rounded font-bold">主流推荐</span>
```

> Passes AA (5.21:1 >= 4.5:1) but fails AAA. Consider adjusting `text-white` (currently #ffffff) or `bg-primary-600` (#007a6e) for AAA compliance.

#### [WARN] `App.tsx`:358

- **Element:** `<unknown>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-lg"
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\digital-isp\BitDepthModule.tsx`:93

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setBitDepth('8bit')} className={`w-full p-4 rounded-lg border text-left transition-colors ${bitDepth === '8bit' ? 'bg-zinc-100 dark:bg-zinc-800 border-red-500 shadow ring-1 ring-red-500/20' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\digital-isp\BitDepthModule.tsx`:104

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setBitDepth('10bit')} className={`w-full p-4 rounded-lg border text-left transition-colors ${bitDepth === '10bit' ? 'bg-zinc-100 dark:bg-zinc-800 border-cyan-500 shadow ring-1 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\digital-isp\ISPModules.tsx`:376

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={()=>{setKelvin(5600); setTint(0)}} className="p-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full text-zinc-600 dark:text-zinc-400" title="Reset">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\digital-isp\ISPModules.tsx`:480

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-3 bg-zinc-50 dark:bg-zinc-800 rounded border-l-2 border-primary-500">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\GearPages.tsx`:75

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 inline-block rounded">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\GearPages.tsx`:147

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 inline-block rounded">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\PipelineSensor.tsx`:240

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setAngle(90)} className="flex-1 py-1 bg-zinc-50 dark:bg-zinc-800 text-xs rounded hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400">90° (动作片)</button>
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\PipelineSensor.tsx`:242

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setAngle(360)} className="flex-1 py-1 bg-zinc-50 dark:bg-zinc-800 text-xs rounded hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400">360° (梦幻)</button>
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\quiz\QuizBuilder.tsx`:161

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div key={optIdx} className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 font-mono truncate">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\quiz\QuizIntro.tsx`:128

- **Element:** `<unknown>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\quiz\QuizIntro.tsx`:172

- **Element:** `<unknown>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
className={`flex-1 py-3 rounded-lg font-bold transition-colors ${selectedQuestionCount === count ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\sensor-exposure\SensorModules.tsx`:240

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="mt-auto bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\VideoEngineeringView.tsx`:158

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 italic">
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\VideoEngineeringView.tsx`:222

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setAngle(90)} className="flex-1 py-1 bg-zinc-50 dark:bg-zinc-800 text-xs rounded hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400">90° (动作片)</button>
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\VideoEngineeringView.tsx`:224

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-800` → `#262629`
- **Contrast ratio:** `5.83:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setAngle(360)} className="flex-1 py-1 bg-zinc-50 dark:bg-zinc-800 text-xs rounded hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400">360° (梦幻)</button>
```

> Passes AA (5.83:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-800` (#262629) for AAA compliance.

#### [WARN] `components\digital-isp\ISPModules.tsx`:230

- **Element:** `<button>`
- **Foreground:** `dark:text-zinc-600` → `#545459`
- **Background:** `dark:bg-zinc-200` → `#e6e6e8`
- **Contrast ratio:** `6.00:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => setCurve('LINEAR')} className={`flex-1 p-2 rounded text-xs font-bold border ${curve === 'LINEAR' ? 'bg-zinc-700 dark:bg-zinc-200 border-zinc-600 dark:border-white text-white dark:text-zinc-900' : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-600 dark:text-zinc-400'}`}>Linear</button>
```

> Passes AA (6.00:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-600` (currently #545459) or `dark:bg-zinc-200` (#e6e6e8) for AAA compliance.

#### [WARN] `components\quiz\QuizBuilder.tsx`:78

- **Element:** `<span>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-200` → `#e6e6e8`
- **Contrast ratio:** `6.00:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[11px] px-1.5 py-0.5 rounded font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300">{question.type}</span>
```

> Passes AA (6.00:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-200` (#e6e6e8) for AAA compliance.

#### [WARN] `components\GearPages.tsx`:498

- **Element:** `<div>`
- **Foreground:** `text-primary-700` → `#006359`
- **Background:** `bg-primary-50` → `#e8fcfc`
- **Contrast ratio:** `6.73:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="inline-block border border-primary-300 dark:border-primary-500/50 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-blue-300 px-3 py-1 text-xs font-bold rounded mb-4 tracking-wider">E-MOUNT SYSTEM</div>
```

> Passes AA (6.73:1 >= 4.5:1) but fails AAA. Consider adjusting `text-primary-700` (currently #006359) or `bg-primary-50` (#e8fcfc) for AAA compliance.

#### [WARN] `components\quiz\QuizBuilder.tsx`:78

- **Element:** `<span>`
- **Foreground:** `dark:text-zinc-300` → `#d1d1d6`
- **Background:** `dark:bg-zinc-700` → `#404045`
- **Contrast ratio:** `6.81:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<span className="text-[11px] px-1.5 py-0.5 rounded font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300">{question.type}</span>
```

> Passes AA (6.81:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-300` (currently #d1d1d6) or `dark:bg-zinc-700` (#404045) for AAA compliance.

#### [WARN] `App.tsx`:358

- **Element:** `<unknown>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-lg"
```

> Passes AA (6.88:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\GearPages.tsx`:75

- **Element:** `<div>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 inline-block rounded">
```

> Passes AA (6.88:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\GearPages.tsx`:147

- **Element:** `<div>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 inline-block rounded">
```

> Passes AA (6.88:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\loudness\MathTheoryModule.tsx`:100

- **Element:** `<thead>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400">
```

> Passes AA (6.88:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\loudness\QualityIndicatorsModule.tsx`:216

- **Element:** `<div>`
- **Foreground:** `border-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-700 rounded-full border-4 border-zinc-600"></div>
```

> Passes AA (6.88:1 >= 3.0:1) but fails AAA. Consider adjusting `border-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\PostProductionView.tsx`:525

- **Element:** `<div>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
{badge && <div className="absolute -top-2 -left-2 bg-zinc-100 dark:bg-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 px-1.5 rounded border border-zinc-300 dark:border-zinc-600 font-mono">{badge}</div>}
```

> Passes AA (6.88:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\quiz\QuizBuilder.tsx`:476

- **Element:** `<button>`
- **Foreground:** `text-zinc-600` → `#545459`
- **Background:** `bg-zinc-100` → `#f5f5f5`
- **Contrast ratio:** `6.88:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors">
```

> Passes AA (6.88:1 >= 4.5:1) but fails AAA. Consider adjusting `text-zinc-600` (currently #545459) or `bg-zinc-100` (#f5f5f5) for AAA compliance.

#### [WARN] `components\digital-isp\ISPModules.tsx`:60

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `6.93:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs font-bold text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
```

> Passes AA (6.93:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-900` (#17171a) for AAA compliance.

#### [WARN] `components\LensAdvancedView.tsx`:316

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `6.93:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 mt-2 bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
```

> Passes AA (6.93:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-900` (#17171a) for AAA compliance.

#### [WARN] `components\loudness\AlgorithmLabModule.tsx`:137

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `6.93:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<div className="text-[10px] text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 mb-6 italic bg-zinc-50 dark:bg-zinc-900 p-3 rounded">
```

> Passes AA (6.93:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-900` (#17171a) for AAA compliance.

#### [WARN] `components\loudness\MathTheoryModule.tsx`:100

- **Element:** `<thead>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `6.93:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
<thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-600 dark:text-zinc-400">
```

> Passes AA (6.93:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-900` (#17171a) for AAA compliance.

#### [WARN] `components\quiz\QuizQuestionCard.tsx`:334

- **Element:** `<div>`
- **Foreground:** `dark:text-zinc-400` → `#a1a1a6`
- **Background:** `dark:bg-zinc-900` → `#17171a`
- **Contrast ratio:** `6.93:1`
- **WCAG AA (4.5:1):** Pass
- **WCAG AAA (7:1):** FAIL

```tsx
{isRevealed && <div className="text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800"><strong className="text-emerald-400">正确顺序：</strong> {(question.correctAnswer as string[]).join(' → ')}</div>}
```

> Passes AA (6.93:1 >= 4.5:1) but fails AAA. Consider adjusting `dark:text-zinc-400` (currently #a1a1a6) or `dark:bg-zinc-900` (#17171a) for AAA compliance.

## Color Reference

| Class | Resolved Color | Hex |
|-------|---------------|-----|
| `dark:text-zinc-700` | <span style="display:inline-block;width:12px;height:12px;background:#404045;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#404045` |
| `dark:bg-zinc-700` | <span style="display:inline-block;width:12px;height:12px;background:#404045;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#404045` |
| `dark:border-zinc-800` | <span style="display:inline-block;width:12px;height:12px;background:#262629;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#262629` |
| `dark:bg-zinc-800` | <span style="display:inline-block;width:12px;height:12px;background:#262629;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#262629` |
| `border-zinc-200` | <span style="display:inline-block;width:12px;height:12px;background:#e6e6e8;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#e6e6e8` |
| `bg-zinc-100` | <span style="display:inline-block;width:12px;height:12px;background:#f5f5f5;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#f5f5f5` |
| `text-zinc-900` | <span style="display:inline-block;width:12px;height:12px;background:#17171a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#17171a` |
| `bg-black` | <span style="display:inline-block;width:12px;height:12px;background:#000000;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#000000` |
| `dark:bg-zinc-900` | <span style="display:inline-block;width:12px;height:12px;background:#17171a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#17171a` |
| `bg-zinc-50` | <span style="display:inline-block;width:12px;height:12px;background:#fafafa;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#fafafa` |
| `border-zinc-300` | <span style="display:inline-block;width:12px;height:12px;background:#d1d1d6;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#d1d1d6` |
| `bg-zinc-200` | <span style="display:inline-block;width:12px;height:12px;background:#e6e6e8;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#e6e6e8` |
| `dark:border-white` | <span style="display:inline-block;width:12px;height:12px;background:#ffffff;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#ffffff` |
| `dark:bg-zinc-200` | <span style="display:inline-block;width:12px;height:12px;background:#e6e6e8;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#e6e6e8` |
| `bg-white` | <span style="display:inline-block;width:12px;height:12px;background:#ffffff;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#ffffff` |
| `border-zinc-800` | <span style="display:inline-block;width:12px;height:12px;background:#262629;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#262629` |
| `bg-zinc-950` | <span style="display:inline-block;width:12px;height:12px;background:#0a0a0a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#0a0a0a` |
| `dark:bg-zinc-950` | <span style="display:inline-block;width:12px;height:12px;background:#0a0a0a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#0a0a0a` |
| `dark:text-zinc-600` | <span style="display:inline-block;width:12px;height:12px;background:#545459;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#545459` |
| `dark:border-zinc-600` | <span style="display:inline-block;width:12px;height:12px;background:#545459;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#545459` |
| `dark:bg-black` | <span style="display:inline-block;width:12px;height:12px;background:#000000;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#000000` |
| `dark:border-zinc-700` | <span style="display:inline-block;width:12px;height:12px;background:#404045;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#404045` |
| `text-zinc-700` | <span style="display:inline-block;width:12px;height:12px;background:#404045;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#404045` |
| `bg-zinc-800` | <span style="display:inline-block;width:12px;height:12px;background:#262629;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#262629` |
| `border-white` | <span style="display:inline-block;width:12px;height:12px;background:#ffffff;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#ffffff` |
| `bg-zinc-300` | <span style="display:inline-block;width:12px;height:12px;background:#d1d1d6;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#d1d1d6` |
| `border-zinc-500` | <span style="display:inline-block;width:12px;height:12px;background:#707075;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#707075` |
| `bg-zinc-600` | <span style="display:inline-block;width:12px;height:12px;background:#545459;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#545459` |
| `border-primary-300` | <span style="display:inline-block;width:12px;height:12px;background:#3dded4;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#3dded4` |
| `bg-primary-50` | <span style="display:inline-block;width:12px;height:12px;background:#e8fcfc;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#e8fcfc` |
| `text-zinc-600` | <span style="display:inline-block;width:12px;height:12px;background:#545459;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#545459` |
| `bg-zinc-900` | <span style="display:inline-block;width:12px;height:12px;background:#17171a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#17171a` |
| `border-zinc-400` | <span style="display:inline-block;width:12px;height:12px;background:#a1a1a6;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#a1a1a6` |
| `placeholder-zinc-400` | <span style="display:inline-block;width:12px;height:12px;background:#a1a1a6;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#a1a1a6` |
| `accent-primary-500` | <span style="display:inline-block;width:12px;height:12px;background:#00998a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#00998a` |
| `bg-zinc-700` | <span style="display:inline-block;width:12px;height:12px;background:#404045;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#404045` |
| `dark:text-zinc-500` | <span style="display:inline-block;width:12px;height:12px;background:#707075;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#707075` |
| `text-primary-500` | <span style="display:inline-block;width:12px;height:12px;background:#00998a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#00998a` |
| `bg-primary-600` | <span style="display:inline-block;width:12px;height:12px;background:#007a6e;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#007a6e` |
| `dark:placeholder-zinc-500` | <span style="display:inline-block;width:12px;height:12px;background:#707075;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#707075` |
| `dark:text-zinc-400` | <span style="display:inline-block;width:12px;height:12px;background:#a1a1a6;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#a1a1a6` |
| `text-primary-600` | <span style="display:inline-block;width:12px;height:12px;background:#007a6e;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#007a6e` |
| `bg-transparent` | <span style="display:inline-block;width:12px;height:12px;background:#000000;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#000000` |
| `placeholder-zinc-500` | <span style="display:inline-block;width:12px;height:12px;background:#707075;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#707075` |
| `text-zinc-500` | <span style="display:inline-block;width:12px;height:12px;background:#707075;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#707075` |
| `accent-[#888]` | <span style="display:inline-block;width:12px;height:12px;background:#888888;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#888888` |
| `border-primary-500` | <span style="display:inline-block;width:12px;height:12px;background:#00998a;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#00998a` |
| `text-white` | <span style="display:inline-block;width:12px;height:12px;background:#ffffff;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#ffffff` |
| `text-primary-700` | <span style="display:inline-block;width:12px;height:12px;background:#006359;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#006359` |
| `dark:text-zinc-300` | <span style="display:inline-block;width:12px;height:12px;background:#d1d1d6;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#d1d1d6` |
| `border-zinc-600` | <span style="display:inline-block;width:12px;height:12px;background:#545459;border:1px solid #ccc;border-radius:2px;vertical-align:middle;"></span> | `#545459` |
