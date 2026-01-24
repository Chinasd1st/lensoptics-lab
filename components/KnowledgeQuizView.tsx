
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QUIZ_DATABASE, QuizQuestion, Difficulty } from '../utils/quizData';
import { Brain, Trophy, AlertCircle, CheckCircle, XCircle, RefreshCw, ChevronRight, Play, Award, Timer, Shuffle, Zap, Check, X } from 'lucide-react';

export const KnowledgeQuizView: React.FC = () => {
  const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  
  const [currentShuffledOptions, setCurrentShuffledOptions] = useState<string[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]); 
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<number | null>(null);

  // Constants
  const QUESTION_COUNT = 20;
  
  // Scoring Weights
  const SCORE_MAP: Record<Difficulty, number> = {
     'Easy': 10,
     'Medium': 20,
     'Hard': 30
  };

  // Helper: Shuffle Array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Start Game
  const startGame = () => {
    const shuffled = shuffleArray(QUIZ_DATABASE).slice(0, QUESTION_COUNT);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setHistory([]);
    setTotalPossibleScore(shuffled.reduce((acc, q) => acc + SCORE_MAP[q.difficulty], 0));
    
    // Init first question
    prepareQuestion(shuffled[0]);
    
    setGameState('PLAYING');
  };

  const prepareQuestion = (q: QuizQuestion) => {
     // Don't shuffle True/False options to keep order logical usually (True left, False right or vice versa)
     // But user asked for shuffle options. For T/F usually Fixed order is better UX, but let's shuffle for chaos mode if requested.
     // Let's shuffle SINGLE, keep T/F fixed for UX sanity unless specified.
     if (q.type === 'TRUE_FALSE') {
        setCurrentShuffledOptions(q.options);
     } else {
        setCurrentShuffledOptions(shuffleArray(q.options));
     }
     
     setSelectedOptionIndex(null);
     setIsAnswerRevealed(false);
     // Set timer based on difficulty
     setTimeLeft(q.difficulty === 'Hard' ? 45 : 30);
  };

  // Timer Effect
  useEffect(() => {
     if (gameState === 'PLAYING' && !isAnswerRevealed && timeLeft > 0) {
        timerRef.current = window.setInterval(() => {
           setTimeLeft(prev => {
              if (prev <= 1) {
                 handleTimeOut();
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

  const handleTimeOut = () => {
     setIsAnswerRevealed(true);
     setHistory(prev => [...prev, false]); // Count as wrong
  };

  const handleAnswer = (optionStr: string, index: number) => {
    if (isAnswerRevealed) return;
    
    setSelectedOptionIndex(index);
    setIsAnswerRevealed(true);
    
    const currentQ = questions[currentIndex];
    const isCorrect = optionStr === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + SCORE_MAP[currentQ.difficulty]);
    }
    setHistory(prev => [...prev, isCorrect]);
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

  const getRank = (s: number, total: number) => {
    const percentage = (s / total) * 100;
    if (percentage >= 95) return { title: "光影之神 (God of Light)", color: "text-yellow-400", desc: "不仅全对，还挑战了高难度！索尼应该请你去开发相机。" };
    if (percentage >= 80) return { title: "传奇大师 (Legend)", color: "text-orange-400", desc: "理论知识无懈可击，请受我一拜。" };
    if (percentage >= 60) return { title: "资深老法师 (Pro)", color: "text-emerald-400", desc: "基本功扎实，器材与技术皆通。" };
    if (percentage >= 40) return { title: "进阶发烧友 (Enthusiast)", color: "text-blue-400", desc: "及格了，但还有提升空间。多看说明书！" };
    return { title: "快门练习生 (Novice)", color: "text-slate-400", desc: "多拍多练，建议重读一遍本应用的教学模块。" };
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="h-full bg-slate-950 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
      
      {/* INTRO */}
      {gameState === 'INTRO' && (
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto border-4 border-slate-800 shadow-2xl relative">
             <Brain size={64} className="text-cyan-400" />
             <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-900">
                200+ Qs
             </div>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              全能摄影知识挑战
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
              随机抽取 <span className="text-cyan-400 font-bold">20</span> 道题目。
              <br/>含 <span className="text-emerald-400">简单</span> / <span className="text-yellow-400">中等</span> / <span className="text-red-400">困难</span> 及 <span className="text-purple-400">判断题</span>。
              <br/>限时答题，挑战你的理论极限。
            </p>
          </div>

          <button 
            onClick={startGame}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full focus:outline-none hover:scale-105 shadow-[0_0_30px_rgba(8,145,178,0.4)]"
          >
            <Play className="mr-2 fill-current" /> 开始挑战
          </button>
        </div>
      )}

      {/* GAME */}
      {gameState === 'PLAYING' && currentQ && (
        <div className="max-w-3xl w-full h-full flex flex-col relative">
          
          {/* Top Bar: Progress & Timer */}
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-4">
                <div className="text-sm font-bold text-slate-400">
                   Q <span className="text-white text-xl">{currentIndex + 1}</span><span className="text-slate-600">/{QUESTION_COUNT}</span>
                </div>
                {/* History Dots */}
                <div className="hidden sm:flex gap-1">
                   {history.map((res, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${res ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                   ))}
                </div>
             </div>

             <div className="flex items-center gap-3">
                <div className={`text-xs font-bold px-2 py-1 rounded border ${
                   currentQ.difficulty === 'Easy' ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400' :
                   currentQ.difficulty === 'Medium' ? 'bg-yellow-900/30 border-yellow-500 text-yellow-400' :
                   'bg-red-900/30 border-red-500 text-red-400'
                }`}>
                   {currentQ.difficulty} (+{SCORE_MAP[currentQ.difficulty]})
                </div>
                
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
                   <Timer size={20} /> {timeLeft}s
                </div>
             </div>
          </div>

          {/* Question Card */}
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 duration-300" key={currentIndex}>
             <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                   <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-900/20 rounded-full border border-cyan-900/50">
                      {currentQ.category}
                   </span>
                   {currentQ.type === 'TRUE_FALSE' && (
                      <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-900/20 rounded-full border border-purple-900/50">
                         判断题
                      </span>
                   )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                   {currentQ.question}
                </h2>
             </div>

             {/* Options */}
             {currentQ.type === 'TRUE_FALSE' ? (
                // True/False Layout
                <div className="flex gap-4 h-32">
                   {currentShuffledOptions.map((opt, idx) => {
                      const isSelected = idx === selectedOptionIndex;
                      const isCorrectOpt = opt === currentQ.correctAnswer;
                      const isTrue = opt.includes('True') || opt.includes('正确');
                      
                      let stateStyle = "bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300";
                      
                      if (isAnswerRevealed) {
                         if (isCorrectOpt) {
                            stateStyle = "bg-emerald-900/40 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                         } else if (isSelected) {
                            stateStyle = "bg-red-900/40 border-red-500 text-slate-400 opacity-60";
                         } else {
                            stateStyle = "bg-slate-900 border-slate-800 text-slate-600 opacity-30";
                         }
                      } else if (isSelected) {
                         stateStyle = "bg-slate-800 border-cyan-500 text-white";
                      }

                      return (
                         <button
                            key={idx}
                            onClick={() => handleAnswer(opt, idx)}
                            disabled={isAnswerRevealed}
                            className={`flex-1 rounded-2xl border-4 text-center font-bold text-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 group ${stateStyle} ${!isAnswerRevealed && 'hover:scale-[1.02]'}`}
                         >
                            {isTrue ? <CheckCircle size={32} className="mb-2"/> : <XCircle size={32} className="mb-2"/>}
                            {opt}
                         </button>
                      );
                   })}
                </div>
             ) : (
                // Standard Options Layout
                <div className="grid gap-3">
                   {currentShuffledOptions.map((opt, idx) => {
                      const isSelected = idx === selectedOptionIndex;
                      const isCorrectOpt = opt === currentQ.correctAnswer;
                      
                      let stateStyle = "bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300";
                      
                      if (isAnswerRevealed) {
                         if (isCorrectOpt) {
                            stateStyle = "bg-emerald-900/40 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                         } else if (isSelected) {
                            stateStyle = "bg-red-900/40 border-red-500 text-slate-400 opacity-60";
                         } else {
                            stateStyle = "bg-slate-900 border-slate-800 text-slate-600 opacity-30";
                         }
                      } else if (isSelected) {
                         stateStyle = "bg-slate-800 border-cyan-500 text-white";
                      }

                      return (
                         <button
                            key={idx}
                            onClick={() => handleAnswer(opt, idx)}
                            disabled={isAnswerRevealed}
                            className={`w-full p-5 rounded-xl border-2 text-left font-bold transition-all duration-200 flex items-center justify-between group ${stateStyle} ${!isAnswerRevealed && 'hover:scale-[1.01]'}`}
                         >
                            <span>{opt}</span>
                            {isAnswerRevealed && isCorrectOpt && <CheckCircle className="text-emerald-500"/>}
                            {isAnswerRevealed && isSelected && !isCorrectOpt && <XCircle className="text-red-500"/>}
                         </button>
                      );
                   })}
                </div>
             )}

             {/* Timeout Message */}
             {timeLeft === 0 && !selectedOptionIndex && isAnswerRevealed && (
                <div className="mt-4 text-center text-red-500 font-bold flex items-center justify-center gap-2">
                   <Timer size={16}/> TIME'S UP!
                </div>
             )}

             {/* Explanation & Next */}
             {isAnswerRevealed && (
                <div className="mt-6 bg-slate-800/80 border border-slate-600 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4 backdrop-blur-md">
                   <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="text-cyan-400 shrink-0 mt-1" size={20}/>
                      <div>
                         <h4 className="font-bold text-white text-sm mb-1">解析</h4>
                         <p className="text-sm text-slate-300 leading-relaxed">
                            {currentQ.explanation}
                         </p>
                      </div>
                   </div>
                   <button 
                      onClick={nextQuestion}
                      className="w-full py-4 bg-white hover:bg-slate-200 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                   >
                      {currentIndex === QUESTION_COUNT - 1 ? '查看成绩' : '下一题'} <ChevronRight size={18}/>
                   </button>
                </div>
             )}
          </div>
        </div>
      )}

      {/* SUMMARY */}
      {gameState === 'SUMMARY' && (
         <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Background Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none ${getRank(score, totalPossibleScore).color.replace('text-', 'bg-')}`}></div>

            <div className="relative">
               <Trophy size={80} className={`mx-auto ${getRank(score, totalPossibleScore).color}`} />
               <div className="mt-4 text-5xl font-black text-white tracking-tighter">
                  {score} <span className="text-lg text-slate-500 font-medium">/ {totalPossibleScore}</span>
               </div>
               <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Total Score</div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
               <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-2">获得称号</div>
               <h2 className={`text-2xl md:text-3xl font-black ${getRank(score, totalPossibleScore).color} mb-2`}>
                  {getRank(score, totalPossibleScore).title}
               </h2>
               <p className="text-slate-400 text-xs leading-relaxed">
                  {getRank(score, totalPossibleScore).desc}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xl font-bold text-white">{(score / totalPossibleScore * 100).toFixed(0)}%</div>
                  <div className="text-[10px] text-slate-500 uppercase">得分率</div>
               </div>
               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xl font-bold text-white">{history.filter(Boolean).length} / {QUESTION_COUNT}</div>
                  <div className="text-[10px] text-slate-500 uppercase">正确题数</div>
               </div>
            </div>

            <button 
               onClick={startGame}
               className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group border border-slate-600 hover:border-slate-500"
            >
               <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500"/> 再次挑战
            </button>
         </div>
      )}

    </div>
  );
};
