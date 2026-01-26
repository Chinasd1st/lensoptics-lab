
import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_DATABASE, QuizQuestion } from '../utils/quizData';
import { Brain, Trophy, AlertCircle, CheckCircle, XCircle, RefreshCw, ChevronRight, Play, Timer, ArrowUp, ArrowDown, CheckSquare, Square, HelpCircle, Settings2, Keyboard, MousePointerClick, Link, Shuffle } from 'lucide-react';

// Rank System
const getRank = (percentage: number) => {
   if (percentage === 100) return { title: "光影宗师 (Legend)", color: "text-yellow-400", desc: "无懈可击！您就是行走的摄影百科全书。" };
   if (percentage >= 90) return { title: "资深专家 (Master)", color: "text-red-400", desc: "极其扎实的理论功底，距离封神仅一步之遥。" };
   if (percentage >= 80) return { title: "职业摄影师 (Pro)", color: "text-purple-400", desc: "非常专业，这些知识对您来说已经是肌肉记忆。" };
   if (percentage >= 60) return { title: "摄影发烧友 (Enthusiast)", color: "text-emerald-400", desc: "基础不错！继续积累经验，进阶指日可待。" };
   if (percentage >= 40) return { title: "入门学徒 (Apprentice)", color: "text-blue-400", desc: "还在学习路上。建议多复习基础光学和曝光原理。" };
   return { title: "摄影萌新 (Newbie)", color: "text-slate-400", desc: "万丈高楼平地起，建议先从核心概念学起。" };
};

// Colors palette for matching questions
const MATCHING_COLORS = [
  { border: 'border-cyan-500', bg: 'bg-cyan-950/60', text: 'text-cyan-200', badge: 'bg-cyan-500 text-black' },
  { border: 'border-purple-500', bg: 'bg-purple-950/60', text: 'text-purple-200', badge: 'bg-purple-500 text-white' },
  { border: 'border-emerald-500', bg: 'bg-emerald-950/60', text: 'text-emerald-200', badge: 'bg-emerald-500 text-black' },
  { border: 'border-orange-500', bg: 'bg-orange-950/60', text: 'text-orange-200', badge: 'bg-orange-500 text-black' },
  { border: 'border-pink-500', bg: 'bg-pink-950/60', text: 'text-pink-200', badge: 'bg-pink-500 text-white' },
];

export const KnowledgeQuizView: React.FC = () => {
  const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0); 
  
  // Settings
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('10');
  
  // Interaction States
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]); // Current shuffled options (Rights for Matching)
  const [tempSelection, setTempSelection] = useState<string | null>(null); // For Single/TF
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // For Multi (Indices into SHUFFLED options)
  const [orderedOptions, setOrderedOptions] = useState<string[]>([]); // For Order
  const [textInput, setTextInput] = useState(''); // For Fill Blank
  const [interactiveValue, setInteractiveValue] = useState(0); // For Interactive
  
  // Matching State: Map Left Index -> Right (Shuffled) Index
  const [matchingPairs, setMatchingPairs] = useState<Record<number, number>>({});
  const [activeLeftIndex, setActiveLeftIndex] = useState<number | null>(null);

  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [history, setHistory] = useState<('CORRECT' | 'PARTIAL' | 'WRONG')[]>([]); 
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<number | null>(null);

  // Constants
  const POINTS_PER_QUESTION = 10;
  const TOTAL_AVAILABLE = QUIZ_DATABASE.length; // Dynamic Count Source

  // Helper: Shuffle Array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Sync preset buttons
  const handlePresetSelect = (count: number) => {
     const validCount = Math.min(count, TOTAL_AVAILABLE);
     setSelectedQuestionCount(validCount);
     setCustomCountInput(validCount.toString());
  };

  const handleCustomInputChange = (val: string) => {
     setCustomCountInput(val);
     const num = parseInt(val);
     if (!isNaN(num) && num > 0) {
        setSelectedQuestionCount(Math.min(num, TOTAL_AVAILABLE));
     }
  };

  const handleInputBlur = () => {
     let num = parseInt(customCountInput);
     if (isNaN(num) || num < 1) num = 5;
     if (num > TOTAL_AVAILABLE) num = TOTAL_AVAILABLE;
     setCustomCountInput(num.toString());
     setSelectedQuestionCount(num);
  }

  // Start Game
  const startGame = () => {
    let count = Math.min(selectedQuestionCount, TOTAL_AVAILABLE);
    
    // Reduce Interactive frequency: Max 1 per session, and only if we have enough questions
    const interactiveQs = shuffleArray(QUIZ_DATABASE.filter(q => q.type === 'INTERACTIVE'));
    const standardQs = shuffleArray(QUIZ_DATABASE.filter(q => q.type !== 'INTERACTIVE'));

    // Limit interactive to max 1 to reduce frequency
    const interactiveCount = count >= 5 ? Math.min(1, interactiveQs.length) : 0;
    
    const selectedInteractive = interactiveQs.slice(0, interactiveCount);
    const neededStandard = count - selectedInteractive.length;
    const selectedStandard = standardQs.slice(0, neededStandard);

    const finalQuestions = shuffleArray([...selectedInteractive, ...selectedStandard]);

    setQuestions(finalQuestions);
    setCurrentIndex(0);
    setScore(0);
    setHistory([]);
    
    prepareQuestion(finalQuestions[0]);
    setGameState('PLAYING');
  };

  const prepareQuestion = (q: QuizQuestion) => {
     setIsAnswerRevealed(false);
     setTempSelection(null);
     setSelectedIndices([]);
     setTextInput('');
     setEarnedPoints(0);
     setMatchingPairs({});
     setActiveLeftIndex(null);
     
     // Shuffle Options Logic
     if (q.type === 'SINGLE' || q.type === 'MULTI' || q.type === 'TRUE_FALSE') {
        setShuffledOptions(shuffleArray([...q.options]));
     } else if (q.type === 'MATCHING') {
        // For matching, we shuffle the "correctAnswer" array (Right side items) to display
        // We keep "options" (Left side) as is.
        // The correctAnswer array contains the values matching the Left side in order.
        setShuffledOptions(shuffleArray([...(q.correctAnswer as string[])]));
     } else {
        setShuffledOptions([]);
     }

     if (q.type === 'INTERACTIVE' && q.interactive) {
        const { min, max } = q.interactive;
        let startVal = min + (max - min) / 2;
        if (Math.abs(startVal - q.interactive.correctValue) < (max-min)*0.1) {
           startVal = min; 
        }
        setInteractiveValue(Math.floor(startVal));
     }

     setTimeLeft(45); 

     if (q.type === 'ORDER') {
        // Shuffle options for ordering task
        setOrderedOptions(shuffleArray([...q.options]));
     } 
  };

  // Timer Effect
  useEffect(() => {
     if (gameState === 'PLAYING' && !isAnswerRevealed && timeLeft > 0) {
        timerRef.current = window.setInterval(() => {
           setTimeLeft(prev => {
              if (prev <= 1) {
                 handleSubmit(); 
                 return 0;
              }
              return prev - 1;
           });
        }, 1000);
     }
     return () => {
        if (timerRef.current) clearInterval(timerRef.current);
     };
  }, [gameState, isAnswerRevealed, timeLeft]);

  // Keyboard Listener
  useEffect(() => {
     if (gameState !== 'PLAYING') return;

     const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key;
        
        // Number Keys Selection (1-9)
        if (!isAnswerRevealed && /^[1-9]$/.test(key)) {
           const idx = parseInt(key) - 1;
           const currentQ = questions[currentIndex];
           
           if (currentQ.type === 'SINGLE' || currentQ.type === 'TRUE_FALSE') {
              if (idx < shuffledOptions.length) {
                 setTempSelection(shuffledOptions[idx]);
              }
           } else if (currentQ.type === 'MULTI') {
              if (idx < shuffledOptions.length) {
                 // Toggle selection
                 setSelectedIndices(prev => {
                    if (prev.includes(idx)) return prev.filter(i => i !== idx);
                    return [...prev, idx];
                 });
              }
           }
        }

        // Enter Key
        if (key === 'Enter') {
           e.preventDefault();
           if (isAnswerRevealed) {
              nextQuestion();
           } else {
              // Submit validation
              const q = questions[currentIndex];
              let canSubmit = false;
              if ((q.type === 'SINGLE' || q.type === 'TRUE_FALSE') && tempSelection) canSubmit = true;
              if (q.type === 'MULTI' && selectedIndices.length > 0) canSubmit = true;
              if (q.type === 'FILL_BLANK' && textInput.trim().length > 0) canSubmit = true;
              if (q.type === 'ORDER' || q.type === 'INTERACTIVE') canSubmit = true;
              if (q.type === 'MATCHING' && Object.keys(matchingPairs).length === q.options.length) canSubmit = true;

              if (canSubmit) handleSubmit();
           }
        }
     };

     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAnswerRevealed, tempSelection, selectedIndices, textInput, currentIndex, shuffledOptions, matchingPairs]);


  // --- Interaction Handlers ---

  const handleSingleSelect = (opt: string) => {
     if (isAnswerRevealed) return;
     setTempSelection(opt);
  };

  const handleMultiToggle = (idx: number) => {
     if (isAnswerRevealed) return;
     if (selectedIndices.includes(idx)) {
        setSelectedIndices(prev => prev.filter(i => i !== idx));
     } else {
        setSelectedIndices(prev => [...prev, idx]);
     }
  };

  const handleOrderMove = (idx: number, direction: -1 | 1) => {
     if (isAnswerRevealed) return;
     const newOrder = [...orderedOptions];
     const swapIdx = idx + direction;
     if (swapIdx < 0 || swapIdx >= newOrder.length) return;
     
     [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
     setOrderedOptions(newOrder);
  };

  const handleMatchingClick = (side: 'LEFT' | 'RIGHT', index: number) => {
     if (isAnswerRevealed) return;

     if (side === 'LEFT') {
        // If clicking already matched left item, remove match
        if (matchingPairs[index] !== undefined) {
           const newPairs = {...matchingPairs};
           delete newPairs[index];
           setMatchingPairs(newPairs);
           setActiveLeftIndex(index); // Re-activate for new match
        } else {
           setActiveLeftIndex(index);
        }
     } else {
        // Right side click
        if (activeLeftIndex !== null) {
           // Remove existing match for this Right item if it exists (steal it)
           const existingOwner = Object.keys(matchingPairs).find(key => matchingPairs[Number(key)] === index);
           const newPairs = {...matchingPairs};
           if (existingOwner) delete newPairs[Number(existingOwner)];
           
           newPairs[activeLeftIndex] = index;
           setMatchingPairs(newPairs);
           setActiveLeftIndex(null);
        }
     }
  };

  const handleSubmit = () => {
     if (isAnswerRevealed) return;
     const currentQ = questions[currentIndex];
     let points = 0;
     let status: 'CORRECT' | 'PARTIAL' | 'WRONG' = 'WRONG';

     if (currentQ.type === 'SINGLE' || currentQ.type === 'TRUE_FALSE') {
        const isCorrect = tempSelection === currentQ.correctAnswer;
        points = isCorrect ? POINTS_PER_QUESTION : 0;
        status = isCorrect ? 'CORRECT' : 'WRONG';
     } 
     else if (currentQ.type === 'MULTI') {
        const selectedOptions = selectedIndices.map(i => shuffledOptions[i]);
        const correctOptions = currentQ.correctAnswer as string[];
        
        const wrongPicks = selectedOptions.filter(o => !correctOptions.includes(o));
        const correctPicks = selectedOptions.filter(o => correctOptions.includes(o));

        if (wrongPicks.length > 0) {
           points = 0;
           status = 'WRONG';
        } else {
           if (correctPicks.length === correctOptions.length) {
              points = POINTS_PER_QUESTION;
              status = 'CORRECT';
           } else if (correctPicks.length > 0) {
              const ratio = correctPicks.length / correctOptions.length;
              points = Math.floor(ratio * POINTS_PER_QUESTION);
              status = 'PARTIAL';
           } else {
              points = 0;
              status = 'WRONG';
           }
        }
     } 
     else if (currentQ.type === 'ORDER') {
        const correctOrder = currentQ.correctAnswer as string[];
        const isCorrect = JSON.stringify(orderedOptions) === JSON.stringify(correctOrder);
        points = isCorrect ? POINTS_PER_QUESTION : 0;
        status = isCorrect ? 'CORRECT' : 'WRONG';
     } 
     else if (currentQ.type === 'MATCHING') {
        // Validate pairs
        let correctCount = 0;
        const total = currentQ.options.length;
        const correctAnswers = currentQ.correctAnswer as string[]; // Array of correct values corresponding to options

        Object.keys(matchingPairs).forEach(leftIdxStr => {
           const leftIdx = Number(leftIdxStr);
           const rightIdx = matchingPairs[leftIdx];
           const userValue = shuffledOptions[rightIdx];
           const correctValue = correctAnswers[leftIdx];
           if (userValue === correctValue) correctCount++;
        });

        if (correctCount === total) {
           points = POINTS_PER_QUESTION;
           status = 'CORRECT';
        } else if (correctCount > 0) {
           points = Math.floor((correctCount / total) * POINTS_PER_QUESTION);
           status = 'PARTIAL';
        } else {
           points = 0;
           status = 'WRONG';
        }
     }
     else if (currentQ.type === 'FILL_BLANK') {
        const input = textInput.trim().toLowerCase();
        const accepted = currentQ.acceptedAnswers?.map(a => a.toLowerCase()) || [];
        const isCorrect = accepted.includes(input);
        points = isCorrect ? POINTS_PER_QUESTION : 0;
        status = isCorrect ? 'CORRECT' : 'WRONG';
     } 
     else if (currentQ.type === 'INTERACTIVE' && currentQ.interactive) {
        const diff = Math.abs(interactiveValue - currentQ.interactive.correctValue);
        const isCorrect = diff <= currentQ.interactive.tolerance;
        points = isCorrect ? POINTS_PER_QUESTION : 0;
        status = isCorrect ? 'CORRECT' : 'WRONG';
     }

     finalizeAnswer(points, status);
  };

  const finalizeAnswer = (pts: number, status: 'CORRECT' | 'PARTIAL' | 'WRONG') => {
     setIsAnswerRevealed(true);
     setEarnedPoints(pts);
     setScore(s => s + pts);
     setHistory(prev => [...prev, status]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      prepareQuestion(questions[nextIdx]);
    } else {
      setGameState('SUMMARY');
    }
  };

  const currentQ = questions[currentIndex];

  // Helper to render question specific UI
  const renderInteractionArea = () => {
     if (!currentQ) return null;

     switch (currentQ.type) {
        case 'SINGLE':
        case 'TRUE_FALSE':
           return (
              <div className="space-y-4">
                 <div className={`grid gap-3 ${currentQ.type === 'TRUE_FALSE' ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {shuffledOptions.map((opt, idx) => {
                       const isCorrect = opt === currentQ.correctAnswer;
                       const isSelected = tempSelection === opt;
                       
                       let style = "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300";
                       if (!isAnswerRevealed) {
                          if (isSelected) style = "bg-cyan-900/40 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]";
                       } else {
                          if (isCorrect) style = "bg-emerald-900/40 border-emerald-500 text-white";
                          else if (isSelected && !isCorrect) style = "bg-red-900/40 border-red-500 text-red-200 opacity-80";
                          else style = "bg-slate-900 border-slate-800 text-slate-600 opacity-40";
                       }

                       return (
                          <button
                             key={idx}
                             onClick={() => handleSingleSelect(opt)}
                             disabled={isAnswerRevealed}
                             className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between group relative overflow-hidden ${style}`}
                          >
                             <div className="flex items-center gap-3 relative z-10">
                                <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono border ${isSelected ? 'border-cyan-400 text-cyan-400' : 'border-slate-600 text-slate-500'}`}>
                                   {idx + 1}
                                </span>
                                <span>{opt}</span>
                             </div>
                             {isAnswerRevealed && isCorrect && <CheckCircle className="text-emerald-500 relative z-10" size={20}/>}
                             {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="text-red-500 relative z-10" size={20}/>}
                          </button>
                       );
                    })}
                 </div>
                 {!isAnswerRevealed && tempSelection && (
                    <button 
                       onClick={handleSubmit} 
                       className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2"
                    >
                       确认提交 (Confirm) <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>
                    </button>
                 )}
              </div>
           );

        case 'MULTI':
           return (
              <div className="space-y-4">
                 <div className="text-xs text-slate-400 font-bold mb-2 flex items-center gap-2">
                    <CheckSquare size={14} className="text-cyan-400"/> 选择所有正确选项 (错选不得分)
                 </div>
                 <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    {shuffledOptions.map((opt, idx) => {
                       const isSelected = selectedIndices.includes(idx);
                       const isCorrectOpt = (currentQ.correctAnswer as string[]).includes(opt);
                       
                       let style = "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700";
                       if (isSelected && !isAnswerRevealed) style = "bg-cyan-900/30 border-cyan-500 text-white";
                       
                       if (isAnswerRevealed) {
                          if (isSelected && isCorrectOpt) style = "bg-emerald-900/40 border-emerald-500 text-white";
                          else if (isSelected && !isCorrectOpt) style = "bg-red-900/40 border-red-500 text-red-200";
                          else if (!isSelected && isCorrectOpt) style = "bg-yellow-900/30 border-yellow-500 text-yellow-200";
                          else style = "bg-slate-900 border-slate-800 opacity-30";
                       }

                       return (
                          <button
                             key={idx}
                             onClick={() => handleMultiToggle(idx)}
                             disabled={isAnswerRevealed}
                             className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center gap-3 ${style}`}
                          >
                             <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono border shrink-0 ${isSelected ? 'border-cyan-400 text-cyan-400' : 'border-slate-600 text-slate-500'}`}>
                                {idx + 1}
                             </div>
                             <div className="flex-1 leading-tight">{opt}</div>
                             {isAnswerRevealed && isCorrectOpt && !isSelected && <AlertCircle size={16} className="text-yellow-500"/>}
                             {isAnswerRevealed && isCorrectOpt && isSelected && <CheckCircle size={16} className="text-emerald-500"/>}
                             {isAnswerRevealed && isSelected && !isCorrectOpt && <XCircle size={16} className="text-red-500"/>}
                          </button>
                       );
                    })}
                 </div>
                 <button 
                    onClick={handleSubmit} 
                    disabled={isAnswerRevealed || selectedIndices.length === 0}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                 >
                    提交答案 (Submit) {!isAnswerRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
                 </button>
              </div>
           );

        case 'ORDER':
           return (
              <div className="space-y-4">
                 <div className="space-y-2">
                    {orderedOptions.map((opt, idx) => (
                       <div key={opt} className={`p-3 rounded-xl border-2 bg-slate-800 border-slate-700 flex items-center gap-4 transition-all ${isAnswerRevealed ? (JSON.stringify(orderedOptions) === JSON.stringify(currentQ.correctAnswer) ? 'border-emerald-500' : 'border-red-500') : ''}`}>
                          <div className="text-slate-500 font-mono font-bold w-6">#{idx+1}</div>
                          <div className="flex-1 font-bold text-white text-sm">{opt}</div>
                          {!isAnswerRevealed && (
                             <div className="flex flex-col gap-1">
                                <button onClick={() => handleOrderMove(idx, -1)} disabled={idx === 0} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white disabled:opacity-20"><ArrowUp size={16}/></button>
                                <button onClick={() => handleOrderMove(idx, 1)} disabled={idx === orderedOptions.length - 1} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white disabled:opacity-20"><ArrowDown size={16}/></button>
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
                 <button 
                    onClick={handleSubmit} 
                    disabled={isAnswerRevealed}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                 >
                    确认顺序 (Confirm) {!isAnswerRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
                 </button>
                 {isAnswerRevealed && (
                    <div className="text-xs text-slate-400 p-2 bg-slate-900 rounded border border-slate-800">
                       <strong className="text-emerald-400">正确顺序：</strong> {(currentQ.correctAnswer as string[]).join(' → ')}
                    </div>
                 )}
              </div>
           );

        case 'MATCHING':
           return (
              <div className="space-y-6">
                 <div className="text-xs text-slate-400 font-bold flex items-center gap-2">
                    <Link size={14} className="text-cyan-400"/> 配对模式：点击左侧选中，再点击右侧目标。
                 </div>
                 
                 <div className="flex flex-row gap-2 md:gap-8">
                    {/* Left Column */}
                    <div className="flex-1 space-y-2">
                       {currentQ.options.map((opt, idx) => {
                          const isMatched = matchingPairs[idx] !== undefined;
                          const isActive = activeLeftIndex === idx;
                          const style = isMatched ? MATCHING_COLORS[idx % MATCHING_COLORS.length] : null;
                          
                          return (
                             <button
                                key={idx}
                                onClick={() => handleMatchingClick('LEFT', idx)}
                                disabled={isAnswerRevealed}
                                className={`w-full p-2 md:p-3 rounded-xl border-2 text-left text-xs transition-all relative flex items-center gap-2
                                   ${isActive 
                                      ? 'border-white bg-slate-700 text-white shadow-lg scale-105 z-10' 
                                      : isMatched 
                                         ? `${style?.border} ${style?.bg} ${style?.text}` 
                                         : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}
                                `}
                             >
                                {/* Badge A, B, C... */}
                                <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0
                                   ${isMatched ? style?.badge : 'bg-slate-600 text-slate-300'}
                                `}>
                                   {String.fromCharCode(65 + idx)}
                                </div>
                                <span className="leading-tight">{opt}</span>
                             </button>
                          )
                       })}
                    </div>

                    {/* Right Column (Shuffled) */}
                    <div className="flex-1 space-y-2">
                       {shuffledOptions.map((opt, idx) => {
                          // Find who linked to this index
                          const linkerIdx = Object.keys(matchingPairs).find(key => matchingPairs[Number(key)] === idx);
                          const isMatched = linkerIdx !== undefined;
                          const style = isMatched ? MATCHING_COLORS[Number(linkerIdx) % MATCHING_COLORS.length] : null;
                          
                          let revealClass = '';
                          if (isAnswerRevealed) {
                             // Check correctness
                             if (isMatched) {
                                const leftIdx = Number(linkerIdx);
                                const correctRightValue = (currentQ.correctAnswer as string[])[leftIdx];
                                const isCorrect = opt === correctRightValue;
                                revealClass = isCorrect ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-900' : 'ring-2 ring-red-500 ring-offset-2 ring-offset-slate-900 opacity-50 grayscale';
                             }
                          }

                          return (
                             <button
                                key={idx}
                                onClick={() => handleMatchingClick('RIGHT', idx)}
                                disabled={isAnswerRevealed}
                                className={`w-full p-2 md:p-3 rounded-xl border-2 text-left text-xs transition-all flex items-center gap-2 justify-between
                                   ${isAnswerRevealed ? revealClass : ''}
                                   ${isMatched 
                                      ? `${style?.border} ${style?.bg} ${style?.text}` 
                                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}
                                `}
                             >
                                <span className="leading-tight flex-1">{opt}</span>
                                {/* Badge Slot */}
                                {isMatched ? (
                                   <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${style?.badge}`}>
                                      {String.fromCharCode(65 + Number(linkerIdx))}
                                   </div>
                                ) : (
                                   <div className="w-5 h-5 rounded border border-slate-600 bg-slate-900/50"></div>
                                )}
                             </button>
                          )
                       })}
                    </div>
                 </div>

                 <button 
                    onClick={handleSubmit} 
                    disabled={isAnswerRevealed || Object.keys(matchingPairs).length !== currentQ.options.length}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                 >
                    提交连线 (Submit)
                 </button>
                 
                 {isAnswerRevealed && (
                    <div className="text-xs p-3 bg-slate-900 rounded border border-slate-800 grid gap-2">
                       <strong className="text-emerald-400 border-b border-slate-700 pb-1 block">正确配对：</strong>
                       {currentQ.options.map((opt, i) => (
                          <div key={i} className="flex justify-between">
                             <span className="text-slate-400 font-bold mr-2">{String.fromCharCode(65 + i)}. {opt}</span>
                             <span className="text-slate-600">→</span>
                             <span className="text-white text-right">{(currentQ.correctAnswer as string[])[i]}</span>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           );

        case 'FILL_BLANK':
           return (
              <div className="space-y-4">
                 <div className="relative">
                    <input 
                       type="text" 
                       value={textInput}
                       onChange={e => setTextInput(e.target.value)}
                       disabled={isAnswerRevealed}
                       placeholder="输入答案..."
                       className={`w-full bg-slate-900 border-2 rounded-xl p-4 text-lg text-white outline-none transition-all placeholder-slate-600 ${isAnswerRevealed ? (history[history.length-1] === 'CORRECT' ? 'border-emerald-500' : 'border-red-500') : 'border-slate-700 focus:border-cyan-500'}`}
                       autoFocus
                    />
                 </div>
                 <button 
                    onClick={handleSubmit} 
                    disabled={isAnswerRevealed || !textInput.trim()}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                 >
                    提交 (Submit) {!isAnswerRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
                 </button>
                 {isAnswerRevealed && history[history.length-1] !== 'CORRECT' && (
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200 text-sm">
                       <span className="font-bold">参考答案：</span> {currentQ.correctAnswer}
                    </div>
                 )}
              </div>
           );

        case 'INTERACTIVE':
           const conf = currentQ.interactive!;
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
                           <span className="text-xs font-bold text-slate-400">调整数值</span>
                           <span className={`text-xl font-mono font-bold ${isAnswerRevealed ? (isClose ? 'text-emerald-400' : 'text-red-400') : 'text-cyan-400'}`}>
                              {interactiveValue} <span className="text-sm text-slate-500">{conf.unit}</span>
                           </span>
                        </div>
                        <input 
                           type="range" 
                           min={conf.min} 
                           max={conf.max} 
                           step={conf.step} 
                           value={interactiveValue}
                           onChange={(e) => setInteractiveValue(Number(e.target.value))}
                           disabled={isAnswerRevealed}
                           className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <div className="flex justify-between text-[9px] text-slate-600 font-mono">
                           <span>{conf.min}</span>
                           <span>{conf.max}</span>
                        </div>
                    </div>
                 </div>

                 <button 
                    onClick={handleSubmit} 
                    disabled={isAnswerRevealed}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                 >
                    确认数值 (Confirm) {!isAnswerRevealed && <span className="text-[10px] bg-black/20 px-1.5 rounded opacity-70">Enter</span>}
                 </button>

                 {isAnswerRevealed && (
                    <div className="space-y-2">
                       <div className="p-3 bg-slate-800 border border-slate-700 rounded text-sm flex justify-between items-center">
                          <span className="text-slate-400">正确数值：</span>
                          <span className="font-mono font-bold text-emerald-400">{conf.correctValue} {conf.unit}</span>
                       </div>
                       {!isClose && (
                          <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-200">
                             <strong>提示：</strong> 您的选择偏{interactiveValue > conf.correctValue ? '高' : '低'}了 {Math.abs(interactiveValue - conf.correctValue)} {conf.unit}。
                          </div>
                       )}
                    </div>
                 )}
              </div>
           );
     }
  };

  return (
    <div className="h-full bg-slate-950 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
      
      {/* INTRO */}
      {gameState === 'INTRO' && (
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto border-4 border-slate-800 shadow-2xl relative">
             <Brain size={64} className="text-cyan-400" />
             <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-900">
                PRO
             </div>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              全能摄影知识挑战
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
              当前题库共有 <span className="text-white font-bold">{TOTAL_AVAILABLE}</span> 道精选题。
              <br/>包含单选、多选、排序、填空及<span className="text-yellow-400 font-bold">全新连线题</span>。
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                <Settings2 size={12}/> 选择题目数量
             </div>
             
             <div className="space-y-4">
               <div className="flex gap-2">
                  {[5, 10, 20].map(count => (
                     <button 
                        key={count}
                        onClick={() => handlePresetSelect(count)}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${selectedQuestionCount === count ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                     >
                        {count}
                     </button>
                  ))}
               </div>

               <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-bold uppercase">Custom</div>
                  <input 
                     type="number" 
                     min="1" 
                     max={TOTAL_AVAILABLE}
                     value={customCountInput}
                     onChange={(e) => handleCustomInputChange(e.target.value)}
                     onBlur={handleInputBlur}
                     className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-20 pr-16 text-white font-mono font-bold focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">
                     / {TOTAL_AVAILABLE}
                  </div>
               </div>
            </div>
          </div>

          <button 
            onClick={startGame}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full focus:outline-none hover:scale-105 shadow-[0_0_30px_rgba(8,145,178,0.4)] text-xl"
          >
            <Play className="mr-2 fill-current" /> 开始挑战 ({selectedQuestionCount}题)
          </button>
        </div>
      )}

      {/* GAME */}
      {gameState === 'PLAYING' && currentQ && (
        <div className="max-w-3xl w-full h-full flex flex-col relative pb-4 justify-center">
          
          {/* Top Bar with Segmented Progress */}
          <div className="mb-4 shrink-0">
             <div className="flex justify-between items-end mb-2">
                <div className="text-sm font-bold text-slate-400">
                   Question <span className="text-white text-xl">{currentIndex + 1}</span><span className="text-slate-600">/{questions.length}</span>
                </div>
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
                   <Timer size={20} /> {timeLeft}s
                </div>
             </div>
             
             {/* Segmented Progress Bar */}
             <div className="flex w-full gap-[2px] h-1.5 rounded-full overflow-hidden">
                {questions.map((_, i) => {
                   const status = history[i]; // 'CORRECT' | 'PARTIAL' | 'WRONG' | undefined
                   let color = 'bg-slate-800'; 
                   if (i === currentIndex) color = 'bg-white animate-pulse'; 
                   else if (status === 'CORRECT') color = 'bg-emerald-500';
                   else if (status === 'PARTIAL') color = 'bg-yellow-500';
                   else if (status === 'WRONG') color = 'bg-red-500';
                   
                   return (
                      <div key={i} className={`flex-1 transition-all duration-300 rounded-sm ${color}`} />
                   );
                })}
             </div>
          </div>

          {/* Question Card */}
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 duration-300 overflow-y-auto" key={currentIndex}>
             <div className="mb-6 shrink-0">
                <div className="flex items-center gap-2 mb-3">
                   <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-900/20 rounded-full border border-cyan-900/50">
                      {currentQ.category}
                   </span>
                   <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-900/20 rounded-full border border-purple-900/50">
                      {currentQ.type === 'MULTI' ? '多选题' : 
                       currentQ.type === 'ORDER' ? '排序题' : 
                       currentQ.type === 'FILL_BLANK' ? '填空题' : 
                       currentQ.type === 'TRUE_FALSE' ? '判断题' : 
                       currentQ.type === 'MATCHING' ? '连线题' : 
                       currentQ.type === 'INTERACTIVE' ? '互动操作' : '单选题'}
                   </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                   {currentQ.question}
                </h2>
             </div>

             {/* Dynamic Options Area */}
             <div className="shrink-0">
                {renderInteractionArea()}
             </div>

             {/* Explanation - Always visible after answer, compact design */}
             {isAnswerRevealed && (
                <div className="mt-4 bg-slate-800/80 border border-slate-600 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-4 backdrop-blur-md shrink-0">
                   <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
                      <div className="flex items-center gap-2">
                         <span className={`text-lg font-bold ${earnedPoints === 10 ? 'text-emerald-400' : earnedPoints > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {earnedPoints > 0 ? `+${earnedPoints}` : '0'} 分
                         </span>
                         {earnedPoints > 0 && earnedPoints < 10 && <span className="text-[10px] bg-yellow-900/30 text-yellow-200 px-1.5 py-0.5 rounded border border-yellow-500/20">部分得分</span>}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                         <Keyboard size={12}/> Press Enter for Next
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <HelpCircle className="text-cyan-400 shrink-0 mt-0.5" size={16}/>
                      <div>
                         <h4 className="font-bold text-white text-xs mb-1">技术解析</h4>
                         <p className="text-xs text-slate-300 leading-relaxed">
                            {currentQ.explanation}
                         </p>
                      </div>
                   </div>
                   <button 
                      onClick={nextQuestion}
                      className="w-full mt-4 py-3 bg-white hover:bg-slate-200 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
                   >
                      {currentIndex === questions.length - 1 ? '查看成绩' : '下一题'} <ChevronRight size={16}/>
                   </button>
                </div>
             )}
          </div>
        </div>
      )}

      {/* SUMMARY */}
      {gameState === 'SUMMARY' && (
         <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            {(() => {
               const maxScore = questions.length * POINTS_PER_QUESTION;
               const percentage = Math.round((score / maxScore) * 100);
               const rank = getRank(percentage);

               return (
                  <>
                     <div className="relative">
                        <Trophy size={80} className={`mx-auto ${rank.color}`} />
                        <div className="mt-4">
                           <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${rank.color}`}>{rank.title}</div>
                           <div className="text-6xl font-black text-white tracking-tighter">
                              {percentage}<span className="text-2xl">%</span>
                           </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-4 italic">"{rank.desc}"</p>
                     </div>

                     <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                           <div className="text-xl font-bold text-white">{score} <span className="text-xs text-slate-500 font-normal">/ {maxScore}</span></div>
                           <div className="text-[10px] text-slate-500 uppercase">总得分</div>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                           <div className="text-xl font-bold text-white">{history.filter(h => h === 'CORRECT').length} <span className="text-xs text-slate-500 font-normal">/ {questions.length}</span></div>
                           <div className="text-[10px] text-slate-500 uppercase">全对题数</div>
                        </div>
                     </div>
                  </>
               );
            })()}

            <button 
               onClick={() => setGameState('INTRO')}
               className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group border border-slate-600 hover:border-slate-500"
            >
               <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500"/> 重新挑战
            </button>
         </div>
      )}

    </div>
  );
};
