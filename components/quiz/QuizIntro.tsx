
import React, { useState, useRef } from 'react';
import { Brain, Settings2, Play, Shuffle, Download, Database, FilePlus, Upload } from 'lucide-react';
import { QUIZ_DATABASE, QuizQuestion } from '../../utils/quizData';

interface QuizIntroProps {
  totalQuestions: number;
  onStart: (count: number, distribution: { easy: number, medium: number, hard: number }) => void;
  onImport: (questions: QuizQuestion[]) => void;
  onOpenEditor: () => void;
  onDownloadCsv: () => void;
  onOpenBuilder: () => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ totalQuestions, onStart, onImport, onOpenEditor, onDownloadCsv, onOpenBuilder }) => {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('10');
  const [diffDist, setDiffDist] = useState({ easy: 30, medium: 50, hard: 20 });
  
  // Hidden builder trigger state
  const [secretCount, setSecretCount] = useState(0);
  const [showBuilder, setShowBuilder] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePresetSelect = (count: number) => {
     const validCount = Math.min(count, totalQuestions);
     setSelectedQuestionCount(validCount);
     setCustomCountInput(validCount.toString());
     
     // Secret Trigger Logic: 5 consecutive clicks reveals Builder
     setSecretCount(prev => {
        const next = prev + 1;
        if (next >= 5) setShowBuilder(true);
        return next;
     });
  };

  const handleCustomInputChange = (val: string) => {
     setCustomCountInput(val);
     const num = parseInt(val);
     if (!isNaN(num) && num > 0) {
        setSelectedQuestionCount(Math.min(num, totalQuestions));
     }
  };

  const handleInputBlur = () => {
     let num = parseInt(customCountInput);
     if (isNaN(num) || num < 1) num = 5;
     if (num > totalQuestions) num = totalQuestions;
     setCustomCountInput(num.toString());
     setSelectedQuestionCount(num);
  }

  const handleDistChange = (type: 'easy' | 'medium' | 'hard', val: number) => {
     setDiffDist(prev => ({ ...prev, [type]: val }));
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.questionIds || !Array.isArray(json.questionIds)) {
          alert("无效的试卷配置文件 (Missing questionIds)");
          return;
        }
        const loadedQuestions: QuizQuestion[] = [];
        let missingCount = 0;
        json.questionIds.forEach((id: number) => {
          const originalQuestion = QUIZ_DATABASE.find(q => q.id === id);
          if (originalQuestion) {
            loadedQuestions.push(originalQuestion);
          } else {
            missingCount++;
          }
        });
        
        if (loadedQuestions.length === 0) {
           alert("导入失败：未找到有效题目。");
           return;
        }
        
        if (missingCount > 0) alert(`导入成功，但有 ${missingCount} 道题目在当前版本题库中未找到，已自动忽略。`);
        
        // Start game with imported questions
        onImport(loadedQuestions);
        
      } catch (err) {
        console.error(err);
        alert("JSON 解析失败，请检查文件格式。");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500 relative">
      {/* Header Buttons */}
      <div className="absolute top-0 right-0 flex gap-2">
         {/* Hidden Import Input */}
         <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
         
         <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all border border-slate-700"
            title="导入 JSON 试卷"
         >
            <Upload size={14} /> Import JSON
         </button>

         {showBuilder && (
            <button 
               onClick={onOpenBuilder}
               className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 rounded-lg text-xs font-bold transition-all border border-slate-700 animate-in fade-in"
               title="手动组卷"
            >
               <FilePlus size={14} /> Builder
            </button>
         )}
         
         <button 
            onClick={onDownloadCsv}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs font-bold transition-all border border-slate-700"
            title="导出题库 CSV"
         >
            <Download size={14} /> Export CSV
         </button>
         <button 
            onClick={onOpenEditor}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 rounded-lg text-xs font-bold transition-all border border-slate-700"
            title="打开编辑器"
         >
            <Database size={14} /> Editor
         </button>
      </div>

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
          当前题库共有 <span className="text-white font-bold">{totalQuestions}</span> 道精选题。
          <br/>包含单选、多选、排序、填空及<span className="text-yellow-400 font-bold">全新连线题</span>。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
         {/* Question Count */}
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
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
                    max={totalQuestions}
                    value={customCountInput}
                    onChange={(e) => handleCustomInputChange(e.target.value)}
                    onBlur={handleInputBlur}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-20 pr-16 text-white font-mono font-bold focus:border-cyan-500 focus:outline-none transition-colors"
                 />
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">
                    / {totalQuestions}
                 </div>
              </div>
           </div>
         </div>

         {/* Difficulty Distribution */}
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
               <Shuffle size={12}/> 难度分布 (%)
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 w-12 text-right">EASY</span>
                  <input type="range" min="0" max="100" step="10" value={diffDist.easy} onChange={(e)=>handleDistChange('easy', parseInt(e.target.value))} className="flex-1 accent-emerald-500 h-1.5 bg-slate-700 rounded-full appearance-none"/>
                  <span className="text-xs font-mono w-8 text-right">{diffDist.easy}%</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 w-12 text-right">MED</span>
                  <input type="range" min="0" max="100" step="10" value={diffDist.medium} onChange={(e)=>handleDistChange('medium', parseInt(e.target.value))} className="flex-1 accent-cyan-500 h-1.5 bg-slate-700 rounded-full appearance-none"/>
                  <span className="text-xs font-mono w-8 text-right">{diffDist.medium}%</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-red-400 w-12 text-right">HARD</span>
                  <input type="range" min="0" max="100" step="10" value={diffDist.hard} onChange={(e)=>handleDistChange('hard', parseInt(e.target.value))} className="flex-1 accent-red-500 h-1.5 bg-slate-700 rounded-full appearance-none"/>
                  <span className="text-xs font-mono w-8 text-right">{diffDist.hard}%</span>
               </div>
               <div className="text-[10px] text-slate-500 text-right italic">
                  *系统会尽量接近所选比例
               </div>
            </div>
         </div>
      </div>

      <button 
        onClick={() => onStart(selectedQuestionCount, diffDist)}
        className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full focus:outline-none hover:scale-105 shadow-[0_0_30px_rgba(8,145,178,0.4)] text-xl mt-4"
      >
        <Play className="mr-2 fill-current" /> 开始挑战
      </button>
    </div>
  );
};
