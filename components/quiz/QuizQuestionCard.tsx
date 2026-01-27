
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../utils/quizData';
import { CheckCircle, XCircle, CheckSquare, ArrowUp, ArrowDown, Link, Timer, AlertCircle } from 'lucide-react';

const MATCHING_COLORS = [
  { border: 'border-cyan-500', bg: 'bg-cyan-950/60', text: 'text-cyan-200', badge: 'bg-cyan-500 text-black' },
  { border: 'border-purple-500', bg: 'bg-purple-950/60', text: 'text-purple-200', badge: 'bg-purple-500 text-white' },
  { border: 'border-emerald-500', bg: 'bg-emerald-950/60', text: 'text-emerald-200', badge: 'bg-emerald-500 text-black' },
  { border: 'border-orange-500', bg: 'bg-orange-950/60', text: 'text-orange-200', badge: 'bg-orange-500 text-black' },
  { border: 'border-pink-500', bg: 'bg-pink-950/60', text: 'text-pink-200', badge: 'bg-pink-500 text-white' },
];

// Helper: Shuffle Array
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

interface QuizQuestionCardProps {
  question: QuizQuestion;
  isRevealed: boolean;
  onSubmit: (score: number, status: 'CORRECT' | 'PARTIAL' | 'WRONG', userAnswer?: any) => void;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({ question, isRevealed, onSubmit }) => {
  // Local State for interactions
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [tempSelection, setTempSelection] = useState<string | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [orderedOptions, setOrderedOptions] = useState<string[]>([]);
  const [matchingPairs, setMatchingPairs] = useState<Record<number, number>>({});
  const [activeLeftIndex, setActiveLeftIndex] = useState<number | null>(null);
  const [textInput, setTextInput] = useState('');
  const [interactiveValue, setInteractiveValue] = useState(0);

  // Initialize per question
  useEffect(() => {
    if (question.type === 'SINGLE' || question.type === 'MULTI' || question.type === 'TRUE_FALSE') {
        setShuffledOptions(shuffleArray([...question.options]));
    } else if (question.type === 'MATCHING') {
        setShuffledOptions(shuffleArray([...(question.correctAnswer as string[])]));
    } else if (question.type === 'ORDER') {
        setOrderedOptions(shuffleArray([...question.options]));
    } else if (question.type === 'INTERACTIVE' && question.interactive) {
        const { min, max } = question.interactive;
        let startVal = min + (max - min) / 2;
        // Ensure start value is not already the correct answer to force interaction
        if (Math.abs(startVal - question.interactive.correctValue) < (max-min)*0.1) {
           startVal = min; 
        }
        setInteractiveValue(Math.floor(startVal));
    }
    
    // Reset selections
    setTempSelection(null);
    setSelectedIndices([]);
    setMatchingPairs({});
    setActiveLeftIndex(null);
    setTextInput('');
  }, [question]);

  // Submit Handler Wrapper
  const handleSubmit = () => {
     if (isRevealed) return;

     let points = 0;
     let status: 'CORRECT' | 'PARTIAL' | 'WRONG' = 'WRONG';
     const POINTS_PER_QUESTION = 10;
     let canSubmit = false;

     if (question.type === 'SINGLE' || question.type === 'TRUE_FALSE') {
        if (tempSelection) canSubmit = true;
        if (canSubmit) {
            const isCorrect = tempSelection === question.correctAnswer;
            points = isCorrect ? POINTS_PER_QUESTION : 0;
            status = isCorrect ? 'CORRECT' : 'WRONG';
        }
     } 
     else if (question.type === 'MULTI') {
        if (selectedIndices.length > 0) canSubmit = true;
        if (canSubmit) {
            const selectedOptions = selectedIndices.map(i => shuffledOptions[i]);
            const correctOptions = question.correctAnswer as string[];
            const wrongPicks = selectedOptions.filter(o => !correctOptions.includes(o));
            const correctPicks = selectedOptions.filter(o => correctOptions.includes(o));

            if (wrongPicks.length > 0) { points = 0; status = 'WRONG'; } 
            else if (correctPicks.length === correctOptions.length) { points = POINTS_PER_QUESTION; status = 'CORRECT'; } 
            else if (correctPicks.length > 0) { points = Math.floor((correctPicks.length / correctOptions.length) * POINTS_PER_QUESTION); status = 'PARTIAL'; }
        }
     } 
     else if (question.type === 'ORDER') {
        canSubmit = true;
        const correctOrder = question.correctAnswer as string[];
        const isCorrect = JSON.stringify(orderedOptions) === JSON.stringify(correctOrder);
        points = isCorrect ? POINTS_PER_QUESTION : 0;
        status = isCorrect ? 'CORRECT' : 'WRONG';
     } 
     else if (question.type === 'MATCHING') {
        if (Object.keys(matchingPairs).length === question.options.length) canSubmit = true;
        if (canSubmit) {
            let correctCount = 0;
            const total = question.options.length;
            const correctAnswers = question.correctAnswer as string[]; 
            Object.keys(matchingPairs).forEach(leftIdxStr => {
               const leftIdx = Number(leftIdxStr);
               const rightIdx = matchingPairs[leftIdx];
               if (shuffledOptions[rightIdx] === correctAnswers[leftIdx]) correctCount++;
            });
            if (correctCount === total) { points = POINTS_PER_QUESTION; status = 'CORRECT'; } 
            else if (correctCount > 0) { points = Math.floor((correctCount / total) * POINTS_PER_QUESTION); status = 'PARTIAL'; }
        }
     }
     else if (question.type === 'FILL_BLANK') {
        if (textInput.trim().length > 0) canSubmit = true;
        if (canSubmit) {
            const input = textInput.trim().toLowerCase();
            const accepted = question.acceptedAnswers?.map(a => a.toLowerCase()) || [];
            const isCorrect = accepted.includes(input);
            points = isCorrect ? POINTS_PER_QUESTION : 0;
            status = isCorrect ? 'CORRECT' : 'WRONG';
        }
     } 
     else if (question.type === 'INTERACTIVE' && question.interactive) {
        canSubmit = true;
        const diff = Math.abs(interactiveValue - question.interactive.correctValue);
        const isCorrect = diff <= question.interactive.tolerance;
        points = isCorrect ? POINTS_PER_QUESTION : 0;
        status = isCorrect ? 'CORRECT' : 'WRONG';
     }

     if (canSubmit) {
        onSubmit(points, status);
     }
  };

  // --- Keyboard Shortcuts (Re-implemented) ---
  useEffect(() => {
     if (isRevealed) return;

     const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key;
        
        // 1. Enter Key -> Submit
        if (key === 'Enter') {
           e.preventDefault();
           handleSubmit();
        }

        // 2. Number Keys (1-9) -> Select Options
        if (/^[1-9]$/.test(key)) {
           const idx = parseInt(key) - 1;
           
           if (question.type === 'SINGLE' || question.type === 'TRUE_FALSE') {
              if (idx < shuffledOptions.length) {
                 setTempSelection(shuffledOptions[idx]);
              }
           } else if (question.type === 'MULTI') {
              if (idx < shuffledOptions.length) {
                 // Toggle selection
                 setSelectedIndices(prev => {
                    if (prev.includes(idx)) return prev.filter(i => i !== idx);
                    return [...prev, idx];
                 });
              }
           }
        }
     };

     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed, question, shuffledOptions, tempSelection, selectedIndices, matchingPairs, orderedOptions, textInput, interactiveValue]);


  // Interaction Handlers
  const handleMatchingClick = (side: 'LEFT' | 'RIGHT', index: number) => {
     if (isRevealed) return;
     if (side === 'LEFT') {
        if (matchingPairs[index] !== undefined) {
           const newPairs = {...matchingPairs}; delete newPairs[index]; setMatchingPairs(newPairs); setActiveLeftIndex(index);
        } else { setActiveLeftIndex(index); }
     } else {
        if (activeLeftIndex !== null) {
           const existingOwner = Object.keys(matchingPairs).find(key => matchingPairs[Number(key)] === index);
           const newPairs = {...matchingPairs};
           if (existingOwner) delete newPairs[Number(existingOwner)];
           newPairs[activeLeftIndex] = index;
           setMatchingPairs(newPairs);
           setActiveLeftIndex(null);
        }
     }
  };

  const handleOrderMove = (idx: number, direction: -1 | 1) => {
     if (isRevealed) return;
     const newOrder = [...orderedOptions];
     const swapIdx = idx + direction;
     if (swapIdx < 0 || swapIdx >= newOrder.length) return;
     [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
     setOrderedOptions(newOrder);
  };

  // --- Renderers ---

  if (question.type === 'SINGLE' || question.type === 'TRUE_FALSE') {
     return (
        <div className="space-y-4">
           <div className={`grid gap-3 ${question.type === 'TRUE_FALSE' ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
              {shuffledOptions.map((opt, idx) => {
                 const isCorrect = opt === question.correctAnswer;
                 const isSelected = tempSelection === opt;
                 let style = "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300";
                 if (!isRevealed) {
                    if (isSelected) style = "bg-cyan-900/40 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]";
                 } else {
                    if (isCorrect) style = "bg-emerald-900/40 border-emerald-500 text-white";
                    else if (isSelected && !isCorrect) style = "bg-red-900/40 border-red-500 text-red-200 opacity-80";
                    else style = "bg-slate-900 border-slate-800 text-slate-600 opacity-40";
                 }
                 return (
                    <button key={idx} onClick={() => !isRevealed && setTempSelection(opt)} disabled={isRevealed} className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between group relative overflow-hidden ${style}`}>
                       <div className="flex items-center gap-3 relative z-10"><span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono border ${isSelected ? 'border-cyan-400 text-cyan-400' : 'border-slate-600 text-slate-500'}`}>{idx + 1}</span><span>{opt}</span></div>
                       {isRevealed && isCorrect && <CheckCircle className="text-emerald-500 relative z-10" size={20}/>}
                       {isRevealed && isSelected && !isCorrect && <XCircle className="text-red-500 relative z-10" size={20}/>}
                    </button>
                 );
              })}
           </div>
           {!isRevealed && tempSelection && (
              <button onClick={handleSubmit} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                 确认提交 (Confirm) <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>
              </button>
           )}
        </div>
     );
  }

  if (question.type === 'MULTI') {
     return (
        <div className="space-y-4">
           <div className="text-xs text-slate-400 font-bold mb-2 flex items-center gap-2"><CheckSquare size={14} className="text-cyan-400"/> 选择所有正确选项 (错选不得分)</div>
           <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
              {shuffledOptions.map((opt, idx) => {
                 const isSelected = selectedIndices.includes(idx);
                 const isCorrectOpt = (question.correctAnswer as string[]).includes(opt);
                 let style = "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700";
                 if (isSelected && !isRevealed) style = "bg-cyan-900/30 border-cyan-500 text-white";
                 if (isRevealed) {
                    if (isSelected && isCorrectOpt) style = "bg-emerald-900/40 border-emerald-500 text-white";
                    else if (isSelected && !isCorrectOpt) style = "bg-red-900/40 border-red-500 text-red-200";
                    else if (!isSelected && isCorrectOpt) style = "bg-yellow-900/30 border-yellow-500 text-yellow-200";
                    else style = "bg-slate-900 border-slate-800 opacity-30";
                 }
                 return (
                    <button key={idx} onClick={() => !isRevealed && setSelectedIndices(prev => prev.includes(idx) ? prev.filter(i=>i!==idx) : [...prev, idx])} disabled={isRevealed} className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center gap-3 ${style}`}>
                       <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono border shrink-0 ${isSelected ? 'border-cyan-400 text-cyan-400' : 'border-slate-600 text-slate-500'}`}>{idx + 1}</div>
                       <div className="flex-1 leading-tight">{opt}</div>
                       {isRevealed && isCorrectOpt && !isSelected && <AlertCircle size={16} className="text-yellow-500"/>}
                       {isRevealed && isCorrectOpt && isSelected && <CheckCircle size={16} className="text-emerald-500"/>}
                       {isRevealed && isSelected && !isCorrectOpt && <XCircle size={16} className="text-red-500"/>}
                    </button>
                 );
              })}
           </div>
           <button onClick={handleSubmit} disabled={isRevealed || selectedIndices.length === 0} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              提交答案 (Submit) {!isRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
           </button>
        </div>
     );
  }

  if (question.type === 'MATCHING') {
     return (
        <div className="space-y-6">
           <div className="text-xs text-slate-400 font-bold flex items-center gap-2"><Link size={14} className="text-cyan-400"/> 配对模式：点击左侧选中，再点击右侧目标。</div>
           <div className="flex flex-row gap-2 md:gap-8">
              <div className="flex-1 space-y-2">
                 {question.options.map((opt, idx) => {
                    const isMatched = matchingPairs[idx] !== undefined;
                    const isActive = activeLeftIndex === idx;
                    const style = isMatched ? MATCHING_COLORS[idx % MATCHING_COLORS.length] : null;
                    return (
                       <button key={idx} onClick={() => handleMatchingClick('LEFT', idx)} disabled={isRevealed} className={`w-full p-2 md:p-3 rounded-xl border-2 text-left text-xs transition-all relative flex items-center gap-2 ${isActive ? 'border-white bg-slate-700 text-white shadow-lg scale-105 z-10' : isMatched ? `${style?.border} ${style?.bg} ${style?.text}` : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                          <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${isMatched ? style?.badge : 'bg-slate-600 text-slate-300'}`}>{String.fromCharCode(65 + idx)}</div><span className="leading-tight">{opt}</span>
                       </button>
                    )
                 })}
              </div>
              <div className="flex-1 space-y-2">
                 {shuffledOptions.map((opt, idx) => {
                    const linkerIdx = Object.keys(matchingPairs).find(key => matchingPairs[Number(key)] === idx);
                    const isMatched = linkerIdx !== undefined;
                    const style = isMatched ? MATCHING_COLORS[Number(linkerIdx) % MATCHING_COLORS.length] : null;
                    let revealClass = '';
                    if (isRevealed && isMatched) {
                       const correctRightValue = (question.correctAnswer as string[])[Number(linkerIdx)];
                       revealClass = opt === correctRightValue ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-900' : 'ring-2 ring-red-500 ring-offset-2 ring-offset-slate-900 opacity-50 grayscale';
                    }
                    return (
                       <button key={idx} onClick={() => handleMatchingClick('RIGHT', idx)} disabled={isRevealed} className={`w-full p-2 md:p-3 rounded-xl border-2 text-left text-xs transition-all flex items-center gap-2 justify-between ${isRevealed ? revealClass : ''} ${isMatched ? `${style?.border} ${style?.bg} ${style?.text}` : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                          <span className="leading-tight flex-1">{opt}</span>
                          {isMatched ? <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${style?.badge}`}>{String.fromCharCode(65 + Number(linkerIdx))}</div> : <div className="w-5 h-5 rounded border border-slate-600 bg-slate-900/50"></div>}
                       </button>
                    )
                 })}
              </div>
           </div>
           <button onClick={handleSubmit} disabled={isRevealed || Object.keys(matchingPairs).length !== question.options.length} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">提交连线 (Submit)</button>
           {isRevealed && <div className="text-xs p-3 bg-slate-900 rounded border border-slate-800 grid gap-2"><strong className="text-emerald-400 border-b border-slate-700 pb-1 block">正确配对：</strong>{question.options.map((opt, i) => (<div key={i} className="flex justify-between"><span className="text-slate-400 font-bold mr-2">{String.fromCharCode(65 + i)}. {opt}</span><span className="text-slate-600">→</span><span className="text-white text-right">{(question.correctAnswer as string[])[i]}</span></div>))}</div>}
        </div>
     );
  }

  if (question.type === 'ORDER') {
     return (
        <div className="space-y-4">
           <div className="space-y-2">
              {orderedOptions.map((opt, idx) => (
                 <div key={opt} className={`p-3 rounded-xl border-2 bg-slate-800 border-slate-700 flex items-center gap-4 transition-all ${isRevealed ? (JSON.stringify(orderedOptions) === JSON.stringify(question.correctAnswer) ? 'border-emerald-500' : 'border-red-500') : ''}`}>
                    <div className="text-slate-500 font-mono font-bold w-6">#{idx+1}</div>
                    <div className="flex-1 font-bold text-white text-sm">{opt}</div>
                    {!isRevealed && (<div className="flex flex-col gap-1"><button onClick={() => handleOrderMove(idx, -1)} disabled={idx === 0} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white disabled:opacity-20"><ArrowUp size={16}/></button><button onClick={() => handleOrderMove(idx, 1)} disabled={idx === orderedOptions.length - 1} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white disabled:opacity-20"><ArrowDown size={16}/></button></div>)}
                 </div>
              ))}
           </div>
           <button onClick={handleSubmit} disabled={isRevealed} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              确认顺序 (Confirm) {!isRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
           </button>
           {isRevealed && <div className="text-xs text-slate-400 p-2 bg-slate-900 rounded border border-slate-800"><strong className="text-emerald-400">正确顺序：</strong> {(question.correctAnswer as string[]).join(' → ')}</div>}
        </div>
     );
  }

  if (question.type === 'FILL_BLANK') {
     return (
        <div className="space-y-4">
           <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} disabled={isRevealed} placeholder="输入答案..." className={`w-full bg-slate-900 border-2 rounded-xl p-4 text-lg text-white outline-none transition-all placeholder-slate-600 ${isRevealed ? 'border-slate-700' : 'border-slate-700 focus:border-cyan-500'}`} autoFocus />
           <button onClick={handleSubmit} disabled={isRevealed || !textInput.trim()} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              提交 (Submit) {!isRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
           </button>
           {isRevealed && <div className="p-3 bg-slate-800 border border-slate-700 rounded text-sm"><span className="font-bold text-slate-400">参考答案：</span> <span className="text-white">{question.correctAnswer}</span></div>}
        </div>
     );
  }

  if (question.type === 'INTERACTIVE' && question.interactive) {
     const conf = question.interactive;
     const diff = Math.abs(interactiveValue - conf.correctValue);
     const isClose = diff <= conf.tolerance;
     let vizColor = 'bg-slate-700';
     if (conf.visual === 'COLOR_TEMP') {
        if (interactiveValue < 4000) vizColor = 'bg-orange-500';
        else if (interactiveValue > 7000) vizColor = 'bg-blue-500';
        else vizColor = 'bg-white';
     }
     return (
        <div className="space-y-4">
           <div className="flex items-center gap-6 bg-slate-900 rounded-xl border border-slate-800 p-4">
              <div className={`w-20 h-20 rounded-full shadow-[0_0_30px_currentColor] transition-colors duration-300 ${vizColor} ${conf.visual === 'COLOR_TEMP' ? 'text-transparent' : 'text-slate-900'} flex items-center justify-center shrink-0`}>
                 {conf.visual === 'SHUTTER' && <Timer size={24} className="text-white"/>}
                 {conf.visual === 'FOCAL_LENGTH' && <div className="text-white font-bold text-xs">{interactiveValue}mm</div>}
                 {conf.visual === 'ISO' && <div className="text-white font-bold text-xs">ISO</div>}
                 {conf.visual === 'AUDIO_HZ' && <div className="text-white font-bold text-[10px]">AUDIO</div>}
              </div>
              <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-end">
                      <div>
                          <span className="text-xs font-bold text-slate-400 block">调整数值</span>
                          {/* SHOW TOLERANCE HERE */}
                          <span className="text-[10px] text-slate-500">允许误差: ±{conf.tolerance} {conf.unit}</span>
                      </div>
                      <span className={`text-xl font-mono font-bold ${isRevealed ? (isClose ? 'text-emerald-400' : 'text-red-400') : 'text-cyan-400'}`}>{interactiveValue} <span className="text-sm text-slate-500">{conf.unit}</span></span>
                  </div>
                  <input type="range" min={conf.min} max={conf.max} step={conf.step} value={interactiveValue} onChange={(e) => setInteractiveValue(Number(e.target.value))} disabled={isRevealed} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"/>
                  <div className="flex justify-between text-[9px] text-slate-600 font-mono"><span>{conf.min}</span><span>{conf.max}</span></div>
              </div>
           </div>
           <button onClick={handleSubmit} disabled={isRevealed} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              确认数值 (Confirm) {!isRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
           </button>
           {isRevealed && <div className="space-y-2"><div className="p-3 bg-slate-800 border border-slate-700 rounded text-sm flex justify-between items-center"><span className="text-slate-400">正确数值：</span><span className="font-mono font-bold text-emerald-400">{conf.correctValue} {conf.unit}</span></div>{!isClose && (<div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-200"><strong>提示：</strong> 您的选择偏{interactiveValue > conf.correctValue ? '高' : '低'}了 {Math.abs(interactiveValue - conf.correctValue)} {conf.unit}。</div>)}</div>}
        </div>
     );
  }

  return null;
};
