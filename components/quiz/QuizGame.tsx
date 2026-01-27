
import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion } from '../../utils/quizData';
import { Timer, HelpCircle, Keyboard, ChevronRight } from 'lucide-react';
import { QuizQuestionCard } from './QuizQuestionCard';

interface QuizGameProps {
  questions: QuizQuestion[];
  onFinish: (score: number, history: ('CORRECT' | 'PARTIAL' | 'WRONG')[]) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<('CORRECT' | 'PARTIAL' | 'WRONG')[]>([]); 
  const [timeLeft, setTimeLeft] = useState(45);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const timerRef = useRef<number | null>(null);

  const currentQ = questions[currentIndex];

  useEffect(() => {
     // Reset for new question
     setIsAnswerRevealed(false);
     setEarnedPoints(0);
     setTimeLeft(45);
  }, [currentIndex]);

  // Timer Logic
  useEffect(() => {
     if (!isAnswerRevealed && timeLeft > 0) {
        timerRef.current = window.setInterval(() => {
           setTimeLeft(prev => {
              if (prev <= 1) {
                 handleAnswer(0, 'WRONG'); // Auto submit as wrong
                 return 0;
              }
              return prev - 1;
           });
        }, 1000);
     }
     return () => {
        if (timerRef.current) clearInterval(timerRef.current);
     };
  }, [isAnswerRevealed, timeLeft]);

  // Keyboard shortcut for Next
  useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
        // Only handle Enter if the answer is already revealed (moving to next question)
        if (e.key === 'Enter' && isAnswerRevealed) {
           e.preventDefault();
           nextQuestion();
        }
     };
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerRevealed, currentIndex]);

  const handleAnswer = (pts: number, status: 'CORRECT' | 'PARTIAL' | 'WRONG') => {
     setIsAnswerRevealed(true);
     setEarnedPoints(pts);
     setScore(s => s + pts);
     setHistory(prev => [...prev, status]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(score, history);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {/* Top Bar (Fixed) */}
      <div className="w-full max-w-3xl mx-auto pt-4 pb-4 px-4 shrink-0 z-10 bg-slate-950/80 backdrop-blur-sm sticky top-0">
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
               const status = history[i]; 
               let color = 'bg-slate-800'; 
               if (i === currentIndex) color = 'bg-white animate-pulse'; 
               else if (status === 'CORRECT') color = 'bg-emerald-500';
               else if (status === 'PARTIAL') color = 'bg-yellow-500';
               else if (status === 'WRONG') color = 'bg-red-500';
               return <div key={i} className={`flex-1 transition-all duration-300 rounded-sm ${color}`} />;
            })}
         </div>
      </div>

      {/* Scrollable Question Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full">
         <div className="min-h-full flex flex-col justify-center items-center p-4 pb-20">
            <div className="w-full max-w-3xl animate-in slide-in-from-right-8 duration-300" key={currentIndex}>
               
               <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                     <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-900/20 rounded-full border border-cyan-900/50">{currentQ.category}</span>
                     <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border ${currentQ.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-900/20 border-emerald-900/50' : currentQ.difficulty === 'MEDIUM' ? 'text-cyan-400 bg-cyan-900/20 border-cyan-900/50' : 'text-red-400 bg-red-900/20 border-red-900/50'}`}>{currentQ.difficulty}</span>
                     <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-900/20 rounded-full border border-purple-900/50">{currentQ.type}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{currentQ.question}</h2>
               </div>

               {/* Interaction Component */}
               <div className="mb-6">
                  <QuizQuestionCard 
                     question={currentQ} 
                     isRevealed={isAnswerRevealed} 
                     onSubmit={handleAnswer} 
                  />
               </div>

               {/* Explanation (Appears below) */}
               {isAnswerRevealed && (
                  <div className="bg-slate-800/80 border border-slate-600 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-4 backdrop-blur-md">
                     <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
                        <div className="flex items-center gap-2">
                           <span className={`text-lg font-bold ${earnedPoints === 10 ? 'text-emerald-400' : earnedPoints > 0 ? 'text-yellow-400' : 'text-red-400'}`}>{earnedPoints > 0 ? `+${earnedPoints}` : '0'} 分</span>
                           {earnedPoints > 0 && earnedPoints < 10 && <span className="text-[10px] bg-yellow-900/30 text-yellow-200 px-1.5 py-0.5 rounded border border-yellow-500/20">部分得分</span>}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1"><Keyboard size={12}/> Press Enter for Next</div>
                     </div>
                     <div className="flex items-start gap-3">
                        <HelpCircle className="text-cyan-400 shrink-0 mt-0.5" size={16}/>
                        <div>
                           <h4 className="font-bold text-white text-xs mb-1">技术解析</h4>
                           <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                        </div>
                     </div>
                     <button onClick={nextQuestion} className="w-full mt-4 py-3 bg-white hover:bg-slate-200 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg text-sm">
                        {currentIndex === questions.length - 1 ? '查看成绩' : '下一题'} <ChevronRight size={16}/>
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
