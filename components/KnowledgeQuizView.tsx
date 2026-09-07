
import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, GraduationCap, ArrowRight } from 'lucide-react';
import { QUIZ_DATABASE, QuizQuestion } from '../utils/quizData';
import { QuizIntro } from './quiz/QuizIntro';
import { QuizGame } from './quiz/QuizGame';
import { QuizSummary } from './quiz/QuizSummary';
import { QuizEditor } from './quiz/QuizEditor';
import { QuizBuilder } from './quiz/QuizBuilder';

// Helper: Shuffle Array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const KnowledgeQuizView: React.FC = () => {
  const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY' | 'BUILDER'>('INTRO');
  const [showEditor, setShowEditor] = useState(false);
  const [showMigrated, setShowMigrated] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Session State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameHistory, setGameHistory] = useState<('CORRECT' | 'PARTIAL' | 'WRONG')[]>([]);
  
  const POINTS_PER_QUESTION = 10;
  const TOTAL_AVAILABLE = QUIZ_DATABASE.length;

  const handleStartGame = (count: number, diffDist: { easy: number, medium: number, hard: number }) => {
    // 1. Determine target counts
    const totalDist = diffDist.easy + diffDist.medium + diffDist.hard;
    
    // Normalize targets
    const normEasy = diffDist.easy / totalDist;
    const normMed = diffDist.medium / totalDist;
    
    let targetEasy = Math.round(count * normEasy);
    let targetMed = Math.round(count * normMed);
    let targetHard = count - targetEasy - targetMed;

    // 2. Fetch pools
    const easyPool = shuffleArray(QUIZ_DATABASE.filter(q => q.difficulty === 'EASY'));
    const medPool = shuffleArray(QUIZ_DATABASE.filter(q => q.difficulty === 'MEDIUM'));
    const hardPool = shuffleArray(QUIZ_DATABASE.filter(q => q.difficulty === 'HARD'));

    // 3. Selection Logic with Auto-fill (Fallback)
    // If we request 5 Hard questions but only have 2, we take 2 and ask for 3 more from Medium pool, etc.
    let selected: QuizQuestion[] = [];

    // Helper to safely take questions and return needed amount
    const take = (pool: QuizQuestion[], amount: number) => {
        const taken = pool.slice(0, amount);
        selected = [...selected, ...taken];
        return Math.max(0, amount - taken.length); // Returns missing count
    };

    // Try to satisfy Hard first (usually scarcest)
    let missing = take(hardPool, targetHard);
    
    // Pass missing to Medium
    targetMed += missing;
    missing = take(medPool, targetMed);

    // Pass missing to Easy
    targetEasy += missing;
    missing = take(easyPool, targetEasy);

    // If still missing (ran out of Easy too), try to fill from any remaining pool
    if (missing > 0) {
        // Collect everything not yet selected
        const remainingAll = shuffleArray(QUIZ_DATABASE.filter(q => !selected.includes(q)));
        selected = [...selected, ...remainingAll.slice(0, missing)];
    }

    // Final safety check
    if (selected.length === 0) {
        setError("题库为空，无法开始游戏。请检查数据源。");
        return;
    }

    // Shuffle the final mix so difficulty isn't clustered
    const finalQuestions = shuffleArray(selected).slice(0, count);

    setQuestions(finalQuestions);
    setScore(0);
    setCorrectCount(0);
    setGameHistory([]);
    setError(null);
    setGameState('PLAYING');
  };

  const handleImportGame = (importedQuestions: QuizQuestion[]) => {
    setQuestions(importedQuestions);
    setScore(0);
    setCorrectCount(0);
    setGameHistory([]);
    setGameState('PLAYING');
  };

  const handleGameFinish = (finalScore: number, history: ('CORRECT' | 'PARTIAL' | 'WRONG')[]) => {
     setScore(finalScore);
     setCorrectCount(history.filter(h => h === 'CORRECT').length);
     setGameHistory(history);
     setGameState('SUMMARY');
  };

  // CSV Export Logic
  const handleDownloadCSV = () => {
     const headers = ["ID", "Category", "Type", "Difficulty", "Question", "Options", "Correct Answer", "Explanation"];
     const rows = QUIZ_DATABASE.map(q => {
        const safeText = (txt: string) => `"${txt.replace(/"/g, '""')}"`;
        const opts = q.options.join(" | ");
        const ans = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(" | ") : q.correctAnswer;
        return [
           q.id,
           q.category,
           q.type,
           q.difficulty,
           safeText(q.question),
           safeText(opts),
           safeText(ans as string),
           safeText(q.explanation)
        ].join(",");
     });

     const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = url;
     link.setAttribute("download", "quiz_database_export.csv");
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  if (gameState === 'BUILDER') {
     return <QuizBuilder onBack={() => setGameState('INTRO')} />;
  }

  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
      
      {showMigrated && <MigrationModal onContinue={() => setShowMigrated(false)} />}

      {showEditor && <QuizEditor onClose={() => setShowEditor(false)} />}

      {gameState === 'INTRO' && (
         <>
           {error && (
             <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4 py-3 bg-red-500/90 backdrop-blur text-white text-sm font-bold rounded-xl shadow-lg text-center">
               {error}
               <button onClick={() => setError(null)} className="ml-2 underline text-red-200">关闭</button>
             </div>
           )}
           <QuizIntro 
            totalQuestions={TOTAL_AVAILABLE} 
            onStart={handleStartGame}
            onImport={handleImportGame}
            onOpenEditor={() => setShowEditor(true)}
            onDownloadCsv={handleDownloadCSV}
            onOpenBuilder={() => setGameState('BUILDER')}
         />
         </>
      )}

      {gameState === 'PLAYING' && (
         <QuizGame 
            questions={questions} 
            onFinish={handleGameFinish} 
         />
      )}

      {gameState === 'SUMMARY' && (
         <QuizSummary 
            score={score} 
            totalQuestions={questions.length} 
            correctCount={correctCount} 
            maxScore={questions.length * POINTS_PER_QUESTION} 
            onRestart={() => setGameState('INTRO')} 
            questions={questions}
            history={gameHistory}
         />
      )}

    </div>
  );
};

const MigrationModal: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onContinue();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onContinue]);

  return (
    <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in duration-300" role="dialog" aria-modal="true" aria-label="模块迁移公告">
      <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mb-4">
            <GraduationCap size={32} className="text-primary-500" />
          </div>
           <div className="inline-block px-3 py-1 text-xs font-bold text-primary-400 uppercase tracking-widest bg-primary-900/30 border border-primary-500/30 rounded-full mb-3">
            For TGTV · Module Migration
          </div>
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
            问答模块已迁移至新站
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed text-pretty">
            知识挑战 (Quiz) 已独立为全新应用 <span className="text-white font-bold">CineTech Quiz · 光影考场</span>：
            更现代的界面、六种题型、独立题库运营与持续更新。
          </p>
          <div className="mt-4 p-3 bg-zinc-800/60 border border-zinc-700 rounded-xl text-xs text-zinc-400 leading-relaxed">
            原站旧版仍可继续使用，但题库将优先在新站维护。
          </div>
          <a
            href="/cinetech-quiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            前往新站 <ExternalLink size={16} />
          </a>
          <button
            ref={closeRef}
            onClick={onContinue}
            className="mt-3 w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-700"
          >
            仍留在本站继续答题 <ArrowRight size={16} />
          </button>
        </div>
        <div className="py-2 border-t border-zinc-800 text-center text-xs text-zinc-600 dark:text-zinc-400 font-mono">
          CineTech Architecture · For TGTV
        </div>
      </div>
    </div>
  );
};
