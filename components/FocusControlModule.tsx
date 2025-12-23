
import React, { useState, useEffect, useRef } from 'react';
import { Slider } from './Controls';
import { Crosshair, Play, RotateCcw, MousePointerClick } from 'lucide-react';

export const FocusControlModule: React.FC = () => {
   const [focus, setFocus] = useState(0); // 0 (Close) to 100 (Infinity)
   const [marks, setMarks] = useState<number[]>([]);
   const [isRacking, setIsRacking] = useState(false);
   const animationRef = useRef<number | null>(null);

   // Logic to handle marking A/B points
   const toggleMark = () => {
      if (marks.length >= 2) {
         setMarks([]); // Reset if full
      } else {
         setMarks([...marks, focus]);
      }
   };

   // Logic to Rack Focus (animate between Mark A and Mark B)
   const startRack = () => {
      if (marks.length < 2) return;
      if (isRacking) {
         if (animationRef.current) cancelAnimationFrame(animationRef.current);
         setIsRacking(false);
         return;
      }

      setIsRacking(true);
      const start = focus;
      // Determine target: if closer to A, go to B. If closer to B, go to A.
      const distA = Math.abs(focus - marks[0]);
      const distB = Math.abs(focus - marks[1]);
      const target = distA < distB ? marks[1] : marks[0];
      
      const duration = 1000; // 1 second rack
      const startTime = performance.now();

      const animate = (time: number) => {
         const elapsed = time - startTime;
         const progress = Math.min(elapsed / duration, 1);
         // Ease in-out cubic
         const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
         
         const currentVal = start + (target - start) * ease;
         setFocus(currentVal);

         if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
         } else {
            setIsRacking(false);
         }
      };
      animationRef.current = requestAnimationFrame(animate);
   };

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
            {/* Simulated Lens View - Depth of Field changes */}
            <div className="relative w-full h-full max-w-3xl bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
               {/* Background Layer (Far) */}
               <div className="absolute inset-0 bg-cover bg-center" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000)',
                  filter: `blur(${Math.abs(focus - 90) * 0.15}px) brightness(0.6)` // Focus at 90 is clear
               }}></div>
               
               {/* Midground Layer */}
               <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2">
                  <div className="text-9xl font-black text-white/10 select-none">MID</div>
               </div>
               <img 
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop"
                  className="absolute bottom-20 left-20 w-48 rounded shadow-xl object-cover aspect-[3/4]"
                  style={{ filter: `blur(${Math.abs(focus - 50) * 0.2}px)` }} // Focus at 50 is clear
               />

               {/* Foreground Layer (Close) */}
               <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"
                  className="absolute bottom-0 right-10 w-64 h-80 object-cover object-top rounded-t-xl shadow-2xl"
                  style={{ filter: `blur(${Math.abs(focus - 10) * 0.3}px)` }} // Focus at 10 is clear
               />

               {/* Focus Peaking Simulation (Green Lines) */}
               {/* Simplified visual aid */}
               <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-green-400 font-mono text-xs border border-green-500/30">
                  PEAKING: ON
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Crosshair size={20} className="text-emerald-400"/> 跟焦系统 (Follow Focus)
            </h3>

            {/* Electronic Handwheel Simulator */}
            <div className="flex justify-center mb-8 relative">
               {/* The Indicator Triangle */}
               <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-emerald-500 z-20">▼</div>

               {/* The Wheel Container */}
               <div className="w-56 h-56 rounded-full border-8 border-slate-800 bg-slate-900 shadow-[inset_0_0_20px_black] relative overflow-hidden flex items-center justify-center">
                  
                  {/* Rotating Marking Ring */}
                  <div 
                     className="absolute inset-0 rounded-full transition-transform duration-75 ease-out"
                     style={{ transform: `rotate(${-focus * 3}deg)` }} // Rotate opposite to simulate moving past index
                  >
                     {/* Scale Ticks */}
                     {[...Array(12)].map((_, i) => (
                        <div key={i} className="absolute top-0 left-1/2 w-0.5 h-3 bg-slate-600 origin-bottom" style={{transform: `translateX(-50%) rotate(${i * 30}deg) translateY(10px)`}}></div>
                     ))}
                     
                     {/* User Marks (A/B) */}
                     {marks.map((m, i) => (
                        <div key={i} className="absolute top-0 left-1/2 origin-center" style={{ transform: `translateX(-50%) rotate(${m * 3}deg)` }}>
                           <div className="w-0.5 h-6 bg-white mx-auto mt-1"></div>
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900 -mt-1 mx-auto shadow-lg border border-white
                              ${i === 0 ? 'bg-cyan-400' : 'bg-pink-500'}
                           `}>
                              {i === 0 ? 'A' : 'B'}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Physical Knob Center */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 shadow-2xl flex items-center justify-center border border-slate-600">
                     <div className="text-3xl font-mono text-white font-bold">{focus.toFixed(0)}</div>
                  </div>
               </div>
            </div>

            <Slider label="电子对焦 (Focus)" value={focus} min={0} max={100} onChange={setFocus} />

            <div className="grid grid-cols-2 gap-2 mt-2">
               <button onClick={toggleMark} className={`p-4 rounded-lg border flex flex-col items-center gap-1 transition-all ${marks.length === 2 ? 'border-red-500 bg-red-900/20 text-red-400' : 'border-slate-600 bg-slate-800 hover:bg-slate-700'}`}>
                  <MousePointerClick size={20} />
                  <span className="text-xs font-bold">
                     {marks.length === 0 ? '打点 A' : marks.length === 1 ? '打点 B' : '清除标记'}
                  </span>
               </button>

               <button 
                  onClick={startRack} 
                  disabled={marks.length < 2}
                  className={`p-4 rounded-lg border flex flex-col items-center gap-1 transition-all
                     ${marks.length < 2 ? 'opacity-50 cursor-not-allowed border-slate-700' : isRacking ? 'bg-emerald-900/40 border-emerald-500 text-emerald-400 animate-pulse' : 'bg-slate-800 border-emerald-600 hover:bg-slate-700 text-white'}
                  `}
               >
                  {isRacking ? <RotateCcw size={20}/> : <Play size={20}/>}
                  <span className="text-xs font-bold">{isRacking ? '停止' : '自动移焦 (Rack)'}</span>
               </button>
            </div>

            {/* Distance Chart */}
            <div className="mt-6 bg-slate-800 rounded p-4 border border-slate-700">
               <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold mb-2">
                  <span>Close (0)</span>
                  <span>Infinity (100)</span>
               </div>
               <div className="h-2 bg-slate-900 rounded-full relative">
                  <div className="absolute top-0 left-0 h-full bg-cyan-500 w-1 transition-all" style={{left: `${focus}%`}}></div>
                  {marks.map((m, i) => (
                     <div key={i} className={`absolute top-[-4px] w-2 h-4 rounded-sm ${i===0?'bg-cyan-400':'bg-pink-500'}`} style={{left: `${m}%`, transform: 'translateX(-50%)'}}></div>
                  ))}
               </div>
               <p className="text-[10px] text-slate-500 mt-3 italic">
                  * 第一摄助 (1st AC) 会在跟焦轮的白色标记环上用干擦笔标记演员的走位点。优秀的跟焦员能仅凭肌肉记忆在 A/B 点之间精确切换，无需看监视器。
               </p>
            </div>
         </div>
      </div>
   );
};
