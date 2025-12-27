
import React, { useState } from 'react';
import { Slider } from '../Controls';
import { TrendingUp, Info, Zap } from 'lucide-react';

export const NativeISOModule: React.FC = () => {
   const [isoIndex, setIsoIndex] = useState(3); // Default to ISO 800 (Index 3)
   
   // Typical Sony Dual Gain Steps
   const isoSteps = [100, 200, 400, 800, 1600, 3200, 6400, 10000, 12800, 25600, 51200, 102400];
   const iso = isoSteps[isoIndex];

   // Dual Base ISO Logic (e.g. FX3/A7S3 S-Log3)
   // Base 1: 800 (~14.5 stops)
   // Base 2: 12800 (~13.5 stops, recovers from the drop)
   
   const getDR = (val: number) => {
      // Simulation of DR curve
      // Zone 1: Below Base 1 (Software pull or analog ramp)
      if (val < 800) return 13 + (Math.log2(val/100) * 0.5); 
      
      // Zone 2: Base 1 to Pre-Base 2 (Linear Drop)
      // ISO 800 = 14.5
      // ISO 10000 = ~10.5
      if (val < 12800) {
         const stopsFromBase = Math.log2(val/800);
         return 14.5 - stopsFromBase; 
      }
      
      // Zone 3: Base 2 (Recovery)
      // ISO 12800 = 13.5 (Jumps up!)
      if (val >= 12800) {
         const stopsFromBase2 = Math.log2(val/12800);
         return 13.5 - stopsFromBase2;
      }
      return 0;
   };

   const currentDR = getDR(iso);
   const isHighBase = iso >= 12800;
   const isLowBase = iso >= 800 && iso < 12800;

   // Chart Dimensions
   const width = 600;
   const height = 200;
   const padding = 20;
   
   // Generate Polyline
   const points = isoSteps.map((step, i) => {
      const x = (i / (isoSteps.length - 1)) * width;
      // Map DR 8-15 to Y axis. 15 stops = top (0), 8 stops = bottom (height)
      const dr = getDR(step);
      const y = height - ((dr - 8) / 7) * height; 
      return `${x},${y}`;
   }).join(' ');

   // Active Point Position
   const activeX = (isoIndex / (isoSteps.length - 1)) * width;
   const activeY = height - ((currentDR - 8) / 7) * height;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         {/* Visualizer Column */}
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            
            {/* Dynamic Range Chart */}
            <div className="w-full max-w-2xl bg-slate-800/50 rounded-xl border border-slate-700 p-6 relative">
               <div className="absolute top-4 left-6 text-xs font-bold text-slate-400 flex items-center gap-2">
                  <TrendingUp size={14} className="text-cyan-400"/> 动态范围 (Dynamic Range)
               </div>
               
               <div className="h-64 relative mt-6">
                  {/* Y-Axis Labels */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] text-slate-500 font-mono pointer-events-none">
                     <span>15 Stops</span>
                     <span>11.5 Stops</span>
                     <span>8 Stops</span>
                  </div>

                  {/* Graph Area */}
                  <div className="ml-12 h-full relative">
                     {/* Horizontal Grid */}
                     <div className="absolute top-0 w-full border-t border-slate-600/30"></div>
                     <div className="absolute top-1/2 w-full border-t border-slate-600/30"></div>
                     <div className="absolute bottom-0 w-full border-t border-slate-600/30"></div>

                     {/* The Curve */}
                     <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                        <defs>
                           <linearGradient id="gradCurve" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5"/>
                              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                           </linearGradient>
                        </defs>
                        <polyline points={points} fill="none" stroke="#fbbf24" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
                        
                        {/* Area under curve */}
                        <polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#gradCurve)" opacity="0.2"/>

                        {/* Active Indicator */}
                        <circle cx={activeX} cy={activeY} r="6" fill="#fbbf24" stroke="white" strokeWidth="2" className="shadow-lg transition-all duration-300"/>
                        <line x1={activeX} y1={activeY} x2={activeX} y2={height} stroke="white" strokeDasharray="3,3" opacity="0.5"/>
                     </svg>

                     {/* X-Axis Labels */}
                     <div className="absolute top-[105%] w-full flex justify-between text-[9px] text-slate-500 font-mono">
                        {isoSteps.map((s, i) => (
                           // Show only some labels to avoid crowding
                           (i === 0 || i === 3 || i === 8 || i === 11) && 
                           <div key={s} className="absolute -translate-x-1/2" style={{ left: `${(i / (isoSteps.length - 1)) * 100}%` }}>
                              {s}
                           </div>
                        ))}
                     </div>
                     
                     {/* Key ISO Markers */}
                     <div className="absolute top-0 left-[27.2%] -translate-x-1/2 -translate-y-6 text-[9px] text-emerald-400 font-bold bg-emerald-900/30 px-1 rounded border border-emerald-500/30">Base 800</div>
                     <div className="absolute top-0 left-[72.7%] -translate-x-1/2 -translate-y-6 text-[9px] text-yellow-400 font-bold bg-yellow-900/30 px-1 rounded border border-yellow-500/30">Base 12800</div>
                  </div>
               </div>
            </div>

            {/* Current Stats */}
            <div className="flex gap-4 mt-8 w-full max-w-2xl">
               <div className="flex-1 bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400">当前 ISO</span>
                  <span className={`text-xl font-mono font-bold ${iso >= 12800 ? 'text-yellow-400' : 'text-white'}`}>{iso}</span>
               </div>
               <div className="flex-1 bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400">动态范围</span>
                  <span className="text-xl font-mono font-bold text-cyan-400">{currentDR.toFixed(1)} Stops</span>
               </div>
            </div>
         </div>

         {/* Controls & Info Column */}
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Zap size={20} className="text-yellow-500"/> 双原生 ISO 原理</h3>
            
            <div className="mb-8">
               <Slider 
                  label="ISO 感光度调节" 
                  value={isoIndex} 
                  min={0} 
                  max={isoSteps.length - 1} 
                  step={1} 
                  onChange={setIsoIndex} 
                  unit=""
               />
               <div className="flex justify-between text-[9px] text-slate-500 font-mono px-1">
                  <span>100</span>
                  <span>800</span>
                  <span>12800</span>
                  <span>102400</span>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                     <Info size={14} className="text-cyan-400"/> 什么是 Dual Base ISO?
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify mb-3">
                     传统相机的底噪随 ISO 升高而线性增加，导致动态范围（宽容度）线性下降。
                     <br/><br/>
                     索尼 Cinema Line (及 A7S3/A1) 传感器拥有<strong>两套模拟放大电路</strong>。当 ISO 达到第二基准（如 12800）时，系统会切换到高增益低噪电路。
                  </p>
                  <div className="bg-yellow-900/20 border-l-2 border-yellow-500 p-3 text-xs text-yellow-100 italic">
                     "这就像汽车换挡。到了高转速（高ISO）换入高档位，引擎反而更安静了。"
                  </div>
               </div>

               <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-3">实战建议 (Pro Tips)</h4>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                     <li>
                        <strong className="text-white">锁定基准：</strong> 尽量只使用 <span className="text-emerald-400">ISO 800</span> 和 <span className="text-yellow-400">ISO 12800</span> 这两档拍摄 S-Log3。
                     </li>
                     <li>
                        <strong className="text-white">避免中间值：</strong> ISO 10000 是最差的档位（第一电路的极限），噪点最多。往上拨一档到 12800，画质反而瞬间变好。
                     </li>
                     <li>
                        <strong className="text-white">ND 滤镜：</strong> 12800 太亮怎么办？不要降 ISO，请使用 ND 滤镜压暗光线，以保留珍贵的动态范围。
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};
