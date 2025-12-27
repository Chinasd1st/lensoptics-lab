
import React, { useState } from 'react';
import { Ear, Scissors, Settings2, MoveRight } from 'lucide-react';
import { Slider, Toggle } from '../Controls';

export const AlgorithmLabModule: React.FC = () => {
   const [subTab, setSubTab] = useState<'K_WEIGHT' | 'GATING'>('K_WEIGHT');

   return (
      <div className="max-w-5xl mx-auto h-full flex flex-col">
         <div className="flex gap-4 mb-6">
            <button onClick={() => setSubTab('K_WEIGHT')} className={`flex-1 p-4 rounded-xl border text-left transition-all ${subTab === 'K_WEIGHT' ? 'bg-cyan-900/20 border-cyan-500 ring-1 ring-cyan-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-600'}`}>
               <div className="flex items-center gap-2 mb-2">
                  <Ear size={20} className={subTab === 'K_WEIGHT' ? 'text-cyan-400' : 'text-slate-500'} />
                  <span className={`font-bold ${subTab === 'K_WEIGHT' ? 'text-white' : 'text-slate-400'}`}>K-加权 (K-Weighting)</span>
               </div>
               <p className="text-[10px] text-slate-500">模拟人头声学效应。为什么低频很响但读数却很低？</p>
            </button>
            
            <button onClick={() => setSubTab('GATING')} className={`flex-1 p-4 rounded-xl border text-left transition-all ${subTab === 'GATING' ? 'bg-emerald-900/20 border-emerald-500 ring-1 ring-emerald-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-600'}`}>
               <div className="flex items-center gap-2 mb-2">
                  <Scissors size={20} className={subTab === 'GATING' ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className={`font-bold ${subTab === 'GATING' ? 'text-white' : 'text-slate-400'}`}>门限模拟 (Gating Sim)</span>
               </div>
               <p className="text-[10px] text-slate-500">实时演示静音片段如何影响平均读数。</p>
            </button>
         </div>

         <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
            {subTab === 'K_WEIGHT' ? <KWeightingDemo /> : <GatingDemo />}
         </div>
      </div>
   );
};

const KWeightingDemo: React.FC = () => {
   const [freq, setFreq] = useState(100); // Hz
   const [rawDb, setRawDb] = useState(-20); // dBFS

   // More accurate Curve representation for visualization
   // RLB (High Pass) + High Shelf
   const getKGain = (f: number) => {
      // Rough approximation of BS.1770 curve
      // Low cut below 100Hz
      // High shelf boost approx +4dB above 2kHz
      let gain = 0;
      if (f < 100) gain -= (100 - f) * 0.15; // Roll off
      if (f > 1000) {
         // High shelf
         gain += Math.min(4, (Math.log10(f/1000) * 4)); 
      }
      return gain;
   };

   const kGain = getKGain(freq);
   const perceivedLoudness = rawDb + kGain;

   // Generate SVG Path for the curve
   // X Axis: Logarithmic 20Hz - 20kHz
   // Y Axis: +10dB to -20dB
   const width = 600;
   const height = 200;
   
   // Helper to map freq to x
   const mapFtoX = (f: number) => (Math.log10(f / 20) / Math.log10(20000 / 20)) * width;
   // Helper to map gain to y
   const mapGtoY = (g: number) => height/2 - (g * 5); // scale 5px per dB

   let pathD = `M ${mapFtoX(20)} ${mapGtoY(getKGain(20))}`;
   for(let i=20; i<=20000; i+= (i<100?10:i<1000?100:1000)) {
      pathD += ` L ${mapFtoX(i)} ${mapGtoY(getKGain(i))}`;
   }

   return (
      <div className="flex flex-col lg:flex-row gap-8 h-full">
         <div className="flex-1 relative flex flex-col">
            <div className="absolute top-0 right-0 text-[10px] text-slate-500 font-mono text-right">
               Standard Source:<br/>ITU-R BS.1770-4 Annex 1<br/>GY/T 262-2012
            </div>
            
            {/* Visual Curve Chart - REFACTORED for Better Aspect Ratio */}
            <div className="relative border border-slate-700 bg-slate-950/50 rounded-lg h-64 mt-8 overflow-hidden">
               {/* Grid Lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-20">
                  <div className="border-b border-slate-500 h-1/4"></div>
                  <div className="border-b border-slate-500 h-1/4"></div>
                  <div className="border-b border-slate-500 h-1/4"></div>
                  <div className="border-b border-slate-500 h-1/4"></div>
               </div>
               
               <svg className="w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
                  {/* Zero Line */}
                  <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#475569" strokeDasharray="4,4" />
                  <text x="5" y={height/2 - 5} fontSize="10" fill="#64748b">0 dB</text>

                  {/* Curve */}
                  <path d={pathD} fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  
                  {/* Active Point */}
                  <circle 
                     cx={mapFtoX(freq)} 
                     cy={mapGtoY(kGain)} 
                     r="6" fill="white" stroke="#22d3ee" strokeWidth="2"
                     className="transition-all duration-75 shadow-lg"
                  />
                  <line x1={mapFtoX(freq)} y1={height} x2={mapFtoX(freq)} y2={mapGtoY(kGain)} stroke="#22d3ee" strokeDasharray="2,2" opacity="0.5"/>
               </svg>

               {/* X Axis Labels */}
               <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>20Hz</span>
                  <span>100Hz</span>
                  <span>1kHz</span>
                  <span>10kHz</span>
               </div>
            </div>

            <div className="mt-8 flex gap-8">
               <div className="bg-slate-800 p-4 rounded-lg flex-1 text-center border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">物理电平 (RMS)</div>
                  <div className="text-2xl font-mono font-bold text-slate-200">{rawDb.toFixed(1)} <span className="text-xs">dBFS</span></div>
               </div>
               <div className="flex items-center text-slate-500"><MoveRight /></div>
               <div className="bg-slate-800 p-4 rounded-lg flex-1 text-center border border-cyan-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-900/20"></div>
                  <div className="text-xs text-cyan-400 mb-1 font-bold relative z-10">感知响度 (LKFS)</div>
                  <div className="text-2xl font-mono font-bold text-cyan-300 relative z-10">{perceivedLoudness.toFixed(1)}</div>
                  <div className="text-[10px] text-cyan-500/70 mt-1 relative z-10">K-Weighting Gain: {kGain > 0 ? '+' : ''}{kGain.toFixed(1)} dB</div>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-72 bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2"><Settings2 size={16}/> 信号发生器</h4>
            
            <Slider label="频率 (Frequency)" value={freq} min={20} max={20000} step={10} onChange={setFreq} unit=" Hz" />
            <div className="text-[10px] text-slate-400 mb-6 italic bg-slate-900 p-3 rounded">
               {freq < 100 ? "低频区域：人耳不敏感。K-加权会大幅衰减低频，防止低频能量（如隆隆声）导致响度读数虚高。" : freq > 2000 ? "高频区域：模拟头部声学效应（Head Transfer Function）。人耳对 2k-5kHz 最敏感，K-加权给予正增益。" : "中频区域：接近线性。"}
            </div>

            <Slider label="输入电平 (Level)" value={rawDb} min={-60} max={0} step={1} onChange={setRawDb} unit=" dB" />
         </div>
      </div>
   );
};

const GatingDemo: React.FC = () => {
   const [enableGating, setEnableGating] = useState(true);
   
   // Simulated segments: [Level, Duration_Ratio]
   // -20dB (Dialogue), -80dB (Silence), -18dB (Action), -75dB (Pause)
   const segments = [
      { id: 1, val: -20, width: 30, type: 'Dialogue' },
      { id: 2, val: -80, width: 20, type: 'Silence' },
      { id: 3, val: -18, width: 40, type: 'Action' },
      { id: 4, val: -75, width: 10, type: 'Breath' },
   ];

   // Calculation Logic (Simplified BS.1770 Gating)
   // Absolute Threshold: -70 LKFS
   // Relative Threshold: -10 dB below Ungated Loudness (We'll simplify to just abs threshold for demo clarity)
   
   const validSegments = enableGating 
      ? segments.filter(s => s.val > -70) 
      : segments;
   
   const totalLoudness = validSegments.reduce((acc, s) => acc + s.val * s.width, 0) / validSegments.reduce((acc, s) => acc + s.width, 0);

   return (
      <div className="flex flex-col h-full justify-center">
         <div className="absolute top-4 right-4 text-[10px] text-slate-500 font-mono text-right">
            Standard Source:<br/>ITU-R BS.1770-2 (Gating added)<br/>GY/T 262-2012
         </div>

         <div className="flex items-end h-40 gap-1 mb-8 relative border-b border-slate-600">
            {segments.map((s) => (
               <div key={s.id} className="relative h-full flex items-end group" style={{width: `${s.width}%`}}>
                  {/* Waveform Bar */}
                  <div 
                     className={`w-full transition-all duration-300 ${s.val <= -70 ? 'bg-slate-700' : 'bg-emerald-500'}`} 
                     style={{
                        height: `${(s.val + 80) * 1.5}%`, // Visual scale
                        opacity: enableGating && s.val <= -70 ? 0.2 : 1
                     }}
                  ></div>
                  {/* Label */}
                  <div className="absolute bottom-2 left-1 text-[9px] text-white font-bold bg-black/50 px-1 rounded backdrop-blur-sm truncate max-w-full">
                     {s.type} ({s.val}dB)
                  </div>
                  {/* Gating Cross */}
                  {enableGating && s.val <= -70 && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Scissors className="text-red-500 w-6 h-6 opacity-80" />
                     </div>
                  )}
               </div>
            ))}
            
            {/* Threshold Line */}
            <div className="absolute w-full border-t border-dashed border-red-500/50 flex items-center" style={{bottom: `${(-70 + 80) * 1.5}%`}}>
               <span className="text-[9px] text-red-400 bg-slate-900 px-1 ml-auto">-70 LKFS (Abs Threshold)</span>
            </div>
         </div>

         <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex-1">
               <h4 className="text-sm font-bold text-white mb-2">算法控制</h4>
               <div className="flex items-center gap-4">
                  <Toggle label="启用门限 (Gating)" checked={enableGating} onChange={setEnableGating} />
                  <div className="text-[10px] text-slate-400 leading-tight flex-1">
                     {enableGating 
                        ? "算法会忽略低于 -70 LKFS 的片段。这防止了有人通过加入大量静音段来作弊（拉低平均数值），从而在有声部分做得极响。" 
                        : "计算所有片段的平均值。大量的静音段会严重拉低整体读数，导致最终结果不准确。"}
                  </div>
               </div>
            </div>

            <div className="w-px h-16 bg-slate-700 hidden md:block"></div>

            <div className="text-center w-full md:w-auto">
               <div className="text-xs text-slate-400 mb-1">Integrated Loudness (全片平均)</div>
               <div className={`text-4xl font-mono font-bold transition-all ${enableGating ? 'text-emerald-400' : 'text-yellow-500'}`}>
                  {totalLoudness.toFixed(1)} <span className="text-sm font-normal text-slate-500">LKFS</span>
               </div>
               {!enableGating && <div className="text-[9px] text-yellow-500 mt-1">⚠️ 读数虚低 (被静音拉低)</div>}
            </div>
         </div>
      </div>
   );
};
