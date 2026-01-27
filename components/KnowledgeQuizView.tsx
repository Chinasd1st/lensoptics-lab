
import React, { useState } from 'react';
import { QUIZ_DATABASE, QuizQuestion } from '../utils/quizData';
import { QuizIntro } from './quiz/QuizIntro';
import { QuizGame } from './quiz/QuizGame';
import { QuizSummary } from './quiz/QuizSummary';
import { QuizEditor } from './quiz/QuizEditor';

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
  const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');
  const [showEditor, setShowEditor] = useState(false);
  
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
        alert("错误：题库为空，无法开始游戏。请检查数据源。");
        return;
    }

    // Shuffle the final mix so difficulty isn't clustered
    const finalQuestions = shuffleArray(selected).slice(0, count);

    setQuestions(finalQuestions);
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

  return (
    <div className="h-full bg-slate-950 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
      
      {showEditor && <QuizEditor onClose={() => setShowEditor(false)} />}

      {gameState === 'INTRO' && (
         <QuizIntro 
            totalQuestions={TOTAL_AVAILABLE} 
            onStart={handleStartGame}
            onOpenEditor={() => setShowEditor(true)}
            onDownloadCsv={handleDownloadCSV}
         />
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
