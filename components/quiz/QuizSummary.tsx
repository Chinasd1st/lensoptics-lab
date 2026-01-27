
import React, { useMemo } from 'react';
import { Trophy, RefreshCw, BarChart2 } from 'lucide-react';
import { QuizQuestion } from '../../utils/quizData';

interface QuizSummaryProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  maxScore: number;
  onRestart: () => void;
  questions: QuizQuestion[];
  history: ('CORRECT' | 'PARTIAL' | 'WRONG')[];
}

const getRank = (percentage: number) => {
   if (percentage === 100) return { title: "光影宗师 (Legend)", color: "text-yellow-400", desc: "无懈可击！您就是行走的摄影百科全书。" };
   if (percentage >= 90) return { title: "资深专家 (Master)", color: "text-red-400", desc: "极其扎实的理论功底，距离封神仅一步之遥。" };
   if (percentage >= 80) return { title: "职业摄影师 (Pro)", color: "text-purple-400", desc: "非常专业，这些知识对您来说已经是肌肉记忆。" };
   if (percentage >= 60) return { title: "摄影发烧友 (Enthusiast)", color: "text-emerald-400", desc: "基础不错！继续积累经验，进阶指日可待。" };
   if (percentage >= 40) return { title: "入门学徒 (Apprentice)", color: "text-blue-400", desc: "还在学习路上。建议多复习基础光学和曝光原理。" };
   return { title: "摄影萌新 (Newbie)", color: "text-slate-400", desc: "万丈高楼平地起，建议先从核心概念学起。" };
};

export const QuizSummary: React.FC<QuizSummaryProps> = ({ score, totalQuestions, correctCount, maxScore, onRestart, questions, history }) => {
   const percentage = Math.round((score / maxScore) * 100);
   const rank = getRank(percentage);

   // Calculate difficulty stats
   const stats = useMemo(() => {
      const data = {
         EASY: { total: 0, correct: 0 },
         MEDIUM: { total: 0, correct: 0 },
         HARD: { total: 0, correct: 0 }
      };

      questions.forEach((q, i) => {
         const diff = q.difficulty;
         data[diff].total++;
         if (history[i] === 'CORRECT') {
            data[diff].correct++;
         }
      });

      return data;
   }, [questions, history]);

   return (
     <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
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

        {/* Difficulty Breakdown */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
           <div className="flex items-center gap-2 mb-4 justify-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              <BarChart2 size={14}/> 能力雷达 (Accuracy by Difficulty)
           </div>
           <div className="grid grid-cols-3 gap-4">
              {(['EASY', 'MEDIUM', 'HARD'] as const).map(diff => {
                 const s = stats[diff];
                 const rate = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                 const color = diff === 'EASY' ? 'text-emerald-400' : diff === 'MEDIUM' ? 'text-cyan-400' : 'text-red-400';
                 const barColor = diff === 'EASY' ? 'bg-emerald-500' : diff === 'MEDIUM' ? 'bg-cyan-500' : 'bg-red-500';
                 
                 return (
                    <div key={diff} className="flex flex-col gap-2">
                       <div className={`text-[10px] font-bold ${color}`}>{diff}</div>
                       <div className="h-24 w-full bg-slate-800 rounded-lg relative flex flex-col justify-end overflow-hidden">
                          <div 
                             className={`w-full transition-all duration-1000 ${barColor}`} 
                             style={{ height: `${rate}%`, opacity: 0.6 }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white shadow-black drop-shadow-md">
                             {rate}%
                          </div>
                       </div>
                       <div className="text-[10px] text-slate-500">{s.correct}/{s.total}</div>
                    </div>
                 )
              })}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xl font-bold text-white">{score} <span className="text-xs text-slate-500 font-normal">/ {maxScore}</span></div>
              <div className="text-[10px] text-slate-500 uppercase">总得分</div>
           </div>
           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xl font-bold text-white">{correctCount} <span className="text-xs text-slate-500 font-normal">/ {totalQuestions}</span></div>
              <div className="text-[10px] text-slate-500 uppercase">全对题数</div>
           </div>
        </div>

        <button 
           onClick={onRestart}
           className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group border border-slate-600 hover:border-slate-500"
        >
           <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500"/> 重新挑战
        </button>
     </div>
   );
};
