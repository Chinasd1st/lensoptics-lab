
import React, { useState } from 'react';
import { Workflow, Filter, Layers, ArrowDown, ArrowRight, MoveRight } from 'lucide-react';

export const AlgorithmFlowModule: React.FC = () => {
   const [view, setView] = useState<'CHAIN' | 'GATING'>('CHAIN');

   return (
      <div className="max-w-6xl mx-auto h-full flex flex-col">
         {/* Defensive Mobile View: Stack buttons on small screens */}
         <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button onClick={() => setView('CHAIN')} className={`flex-1 p-4 rounded-xl border text-left transition-all ${view === 'CHAIN' ? 'bg-blue-900/20 border-blue-500 ring-1 ring-blue-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-600'}`}>
               <div className="flex items-center gap-2 mb-2">
                  <Workflow size={20} className={view === 'CHAIN' ? 'text-blue-400' : 'text-slate-500'} />
                  <span className={`font-bold ${view === 'CHAIN' ? 'text-white' : 'text-slate-400'}`}>1. 信号处理链路</span>
               </div>
               <p className="text-[10px] text-slate-500">GY/T 262 图1：多声道响度客观测量算法方框图可视化。</p>
            </button>
            
            <button onClick={() => setView('GATING')} className={`flex-1 p-4 rounded-xl border text-left transition-all ${view === 'GATING' ? 'bg-emerald-900/20 border-emerald-500 ring-1 ring-emerald-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-600'}`}>
               <div className="flex items-center gap-2 mb-2">
                  <Filter size={20} className={view === 'GATING' ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className={`font-bold ${view === 'GATING' ? 'text-white' : 'text-slate-400'}`}>2. 门限与积分逻辑</span>
               </div>
               <p className="text-[10px] text-slate-500">GY/T 262 核心：如何剔除静音段以计算 Integrated Loudness。</p>
            </button>
         </div>

         {/* Defensive Scroll Container */}
         <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-4 lg:p-8 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 text-[10px] text-slate-600 font-mono text-right z-10 bg-slate-900/80 backdrop-blur-sm px-2 rounded">
               ITU-R BS.1770-4
            </div>
            
            {/* Scroll Area with Shadow Hints */}
            <div className="flex-1 overflow-x-auto custom-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
               <div className="min-w-max h-full flex flex-col justify-center">
                  {view === 'CHAIN' ? <SignalChainDiagram /> : <GatingLogicDiagram />}
               </div>
            </div>
            
            {/* Mobile Scroll Hint */}
            <div className="lg:hidden text-center mt-2 text-[10px] text-slate-500 flex items-center justify-center gap-1 animate-pulse">
               <MoveRight size={10} /> 滑动查看完整流程
            </div>
         </div>
      </div>
   );
};

const SignalChainDiagram: React.FC = () => {
   return (
      <div className="flex flex-col items-center justify-center gap-8 py-8">
         {/* Main Flow Container */}
         <div className="flex gap-4 items-center">
            
            {/* Stage 1: Inputs */}
            <div className="flex flex-col gap-2">
               {['L', 'R', 'C', 'Ls', 'Rs'].map((ch, i) => (
                  <div key={ch} className="flex items-center gap-2">
                     <div className="w-12 h-10 bg-slate-800 border border-slate-600 rounded flex items-center justify-center text-xs font-bold text-slate-300 shadow-sm">
                        {ch}
                     </div>
                     <ArrowRight size={14} className="text-slate-600"/>
                  </div>
               ))}
            </div>

            {/* Stage 2: K-Filter (Grouped) */}
            <div className="flex flex-col gap-2 relative p-4 border-2 border-dashed border-cyan-500/30 rounded-xl bg-cyan-900/5">
               <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] text-cyan-500 font-bold whitespace-nowrap">K-Weighting (预滤波)</div>
               {['L', 'R', 'C', 'Ls', 'Rs'].map((ch, i) => (
                  <div key={i} className="flex items-center gap-2">
                     <div className="w-24 h-10 bg-cyan-900/40 border border-cyan-600 rounded flex flex-col items-center justify-center text-[9px] text-cyan-200 shadow-sm">
                        <span>Pre-Filter</span>
                        <span className="opacity-50 text-[8px]">+ RLB</span>
                     </div>
                     <ArrowRight size={14} className="text-slate-600"/>
                  </div>
               ))}
            </div>

            {/* Stage 3: Mean Square */}
            <div className="flex flex-col gap-2">
               {['L', 'R', 'C', 'Ls', 'Rs'].map((ch, i) => (
                  <div key={i} className="flex items-center gap-2">
                     <div className="w-20 h-10 bg-indigo-900/40 border border-indigo-500 rounded flex items-center justify-center text-[10px] text-indigo-200 font-mono">
                        Mean Sq
                     </div>
                     <ArrowRight size={14} className="text-slate-600"/>
                  </div>
               ))}
            </div>

            {/* Stage 4: Channel Weighting */}
            <div className="flex flex-col gap-2">
               {['L', 'R', 'C', 'Ls', 'Rs'].map((ch, i) => (
                  <div key={i} className="flex items-center gap-2">
                     <div className={`w-16 h-10 border rounded flex items-center justify-center text-[10px] font-bold 
                        ${ch.includes('s') ? 'bg-orange-900/40 border-orange-500 text-orange-200' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>
                        {ch.includes('s') ? '+1.5dB' : '0dB'}
                     </div>
                     <ArrowRight size={14} className="text-slate-600"/>
                  </div>
               ))}
            </div>

            {/* Stage 5: Summation */}
            <div className="flex items-center">
               <div className="w-16 h-64 bg-slate-800 border-2 border-slate-500 rounded-full flex items-center justify-center relative">
                  <span className="text-4xl text-white font-serif">Σ</span>
                  
                  {/* Inputs connecting visually */}
                  <div className="absolute -left-4 top-[10%] w-4 h-px bg-slate-600"></div>
                  <div className="absolute -left-4 top-[30%] w-4 h-px bg-slate-600"></div>
                  <div className="absolute -left-4 top-[50%] w-4 h-px bg-slate-600"></div>
                  <div className="absolute -left-4 top-[70%] w-4 h-px bg-slate-600"></div>
                  <div className="absolute -left-4 top-[90%] w-4 h-px bg-slate-600"></div>
               </div>
               <ArrowRight size={14} className="text-slate-600 mx-2"/>
            </div>

            {/* Stage 6: Gating & Output */}
            <div className="flex flex-col items-center gap-4">
               <div className="w-32 h-16 bg-emerald-900/40 border-2 border-emerald-500 rounded-lg flex flex-col items-center justify-center relative">
                  <div className="text-xs font-bold text-emerald-400">Gating Block</div>
                  <div className="text-[9px] text-emerald-300">-70LKFS / -10LU</div>
                  <div className="absolute -bottom-8"><ArrowDown size={14} className="text-emerald-500"/></div>
               </div>
               <div className="mt-4 w-32 h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  LKFS Output
               </div>
            </div>

         </div>
         
         <div className="text-[10px] text-slate-500 bg-slate-900/50 p-2 rounded border border-slate-800 text-center max-w-2xl mt-8">
            * LFE (低频效果声道) 不参与响度计算。环绕声道 (Ls, Rs) 需要增加 1.5dB (~1.41倍) 的权重以模拟包围感对响度感知的影响。
         </div>
      </div>
   );
};

const GatingLogicDiagram: React.FC = () => {
   return (
      <div className="flex gap-12 justify-center py-8 px-4">
         {/* Left: Concept Visualization */}
         <div className="w-64 flex flex-col justify-center shrink-0">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Layers size={16} className="text-purple-400"/> 滑动窗口 (Windowing)</h4>
            <div className="relative h-48 border-l border-slate-700 ml-4">
               {/* Time Axis */}
               <div className="absolute -left-1 top-0 w-2 h-2 bg-slate-500 rounded-full"></div>
               <div className="absolute -left-1 bottom-0 w-2 h-2 bg-slate-500 rounded-full"></div>
               
               {/* Blocks */}
               <div className="absolute top-0 left-4 w-40 h-12 bg-purple-900/40 border border-purple-500 rounded flex items-center justify-center text-[10px] text-purple-200 shadow-lg">
                  Block N (400ms)
               </div>
               <div className="absolute top-4 left-8 w-40 h-12 bg-purple-900/40 border border-purple-500 rounded flex items-center justify-center text-[10px] text-purple-200 opacity-80 shadow-lg">
                  Block N+1
               </div>
               <div className="absolute top-8 left-12 w-40 h-12 bg-purple-900/40 border border-purple-500 rounded flex items-center justify-center text-[10px] text-purple-200 opacity-60 shadow-lg">
                  Block N+2
               </div>
               
               <div className="absolute bottom-0 left-4 text-[10px] text-slate-500 w-48 leading-relaxed">
                  每个测量块长度 400ms，重叠 75% (即每 100ms 移动一次)。这确保了对瞬态声音的捕捉。
               </div>
            </div>
         </div>

         <div className="w-px bg-slate-800 shrink-0"></div>

         {/* Right: Logic Flowchart */}
         <div className="flex-1 flex flex-col items-center max-w-lg min-w-[200px]">
            <div className="text-[10px] text-slate-500 mb-4 font-mono">FLOWCHART: 2-STAGE GATING</div>
            
            {/* Step 1 */}
            <div className="w-48 h-10 bg-slate-800 border border-slate-600 rounded flex items-center justify-center text-xs text-white shadow-sm">
               输入信号 (经过K加权)
            </div>
            <ArrowDown size={16} className="text-slate-600 my-1"/>
            
            {/* Step 2 */}
            <div className="w-48 h-12 bg-purple-900/20 border border-purple-500 rounded flex flex-col items-center justify-center text-xs text-purple-200">
               <span className="font-bold">分割为 400ms 块</span>
               <span className="text-[9px]">75% 重叠</span>
            </div>
            <ArrowDown size={16} className="text-slate-600 my-1"/>

            {/* Gate 1: Absolute (Diamond Shape) */}
            <div className="relative w-48 h-24 flex items-center justify-center my-2">
                {/* The Diamond Shape */}
               <div className="absolute w-20 h-20 bg-slate-900 border-2 border-orange-500 transform rotate-45 z-0"></div>
               {/* Content - Not Rotated */}
               <div className="relative z-10 text-center flex flex-col items-center justify-center gap-1 pointer-events-none">
                  <div className="text-[9px] text-orange-400 font-bold bg-slate-900/80 px-1">绝对门限</div>
                  <div className="text-[10px] text-white font-mono bg-slate-900/80 px-1">&gt; -70 LKFS?</div>
               </div>
               {/* Labels for Yes/No */}
               <div className="absolute -right-8 top-1/2 text-[10px] text-red-500 font-bold">No</div>
               <div className="absolute bottom-[-20px] text-[10px] text-green-500 font-bold">Yes</div>
            </div>
            
            <ArrowDown size={16} className="text-slate-600 my-1"/>

            {/* Step 3: Temp Avg */}
            <div className="w-48 h-10 bg-slate-800 border border-slate-600 rounded flex items-center justify-center text-xs text-slate-300">
               计算临时平均响度 (L_rel)
            </div>
            <ArrowDown size={16} className="text-slate-600 my-1"/>

            {/* Gate 2: Relative (Diamond Shape) */}
            <div className="relative w-48 h-24 flex items-center justify-center my-2">
                {/* The Diamond Shape */}
               <div className="absolute w-20 h-20 bg-slate-900 border-2 border-cyan-500 transform rotate-45 z-0"></div>
               {/* Content - Not Rotated */}
               <div className="relative z-10 text-center flex flex-col items-center justify-center gap-1 pointer-events-none">
                  <div className="text-[9px] text-cyan-400 font-bold bg-slate-900/80 px-1">相对门限</div>
                  <div className="text-[10px] text-white font-mono bg-slate-900/80 px-1">&gt; (L_rel - 10) ?</div>
               </div>
               {/* Labels for Yes/No */}
               <div className="absolute -right-8 top-1/2 text-[10px] text-red-500 font-bold">No</div>
               <div className="absolute bottom-[-20px] text-[10px] text-green-500 font-bold">Yes</div>
            </div>

            <ArrowDown size={16} className="text-slate-600 my-1"/>

            {/* Final Output */}
            <div className="w-48 h-12 bg-emerald-600 text-white font-bold rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
               Integrated Loudness
            </div>

         </div>
      </div>
   );
};
