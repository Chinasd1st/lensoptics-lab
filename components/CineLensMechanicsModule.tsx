
import React, { useState } from 'react';
import { Toggle } from './Controls';
import { Film, Camera, Repeat, Aperture } from 'lucide-react';

export const CineLensMechanicsModule: React.FC = () => {
   const [lensType, setLensType] = useState<'PHOTO' | 'CINE'>('CINE');
   const [focusPos, setFocusPos] = useState(0); // 0 to 1

   // Simulation parameters
   const breathingAmount = lensType === 'PHOTO' ? 0.15 : 0.01; // Photo lenses breathe more
   const focusThrow = lensType === 'PHOTO' ? 90 : 270; // Degrees of rotation
   const currentRotation = focusPos * focusThrow;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-zinc-50 dark:bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
            
            {/* --- Lens Visualizer --- */}
            <div className="relative flex gap-12 items-center">
               
               {/* 1. The Image (Simulating Breathing) */}
               <div className="relative w-80 h-48 bg-zinc-50 dark:bg-zinc-800 rounded-lg overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-lg">
                  <div 
                     className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
                     style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000)',
                        transform: `scale(${1 + (focusPos * breathingAmount)})`, // Breathing effect
                        filter: `blur(${Math.abs(focusPos - 0.5) * 4}px)` // Focus blurring simulation
                     }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-full h-full border border-white/20"></div>
                     <div className="absolute top-2 left-2 text-xs font-mono text-zinc-900 dark:text-zinc-100/70 dark:text-white/70">REC</div>
                  </div>
                  {/* Framing Guides to show breathing */}
                  <div className="absolute top-0 bottom-0 left-10 w-px bg-red-500/30"></div>
                  <div className="absolute top-0 bottom-0 right-10 w-px bg-red-500/30"></div>
               </div>

               {/* 2. The Lens Barrel (Simulating Focus Throw) */}
               <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-8 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-lg relative flex items-center justify-center">
                     {/* Scale Ring */}
                     <div 
                        className="absolute inset-0 rounded-full transition-transform duration-75 ease-out"
                        style={{ transform: `rotate(${-currentRotation}deg)` }}
                     >
                        {[...Array(12)].map((_, i) => (
                           <div key={i} className="absolute top-0 left-1/2 w-0.5 h-3 bg-zinc-500 origin-bottom" style={{transform: `translateX(-50%) rotate(${i * (360/12)}deg) translateY(5px)`}}></div>
                        ))}
                        {/* Numbers */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] text-zinc-900 dark:text-white">∞</div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-zinc-900 dark:text-white">1m</div>
                     </div>
                     
                     {/* Indicator */}
                     <div className="absolute top-[-15px] text-red-600 dark:text-red-500">▼</div>
                     
                     <div className="text-center">
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">{currentRotation.toFixed(0)}°</div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Rotation</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-12 text-center">
               <div className={`text-sm font-bold mb-2 ${lensType === 'CINE' ? 'text-cyan-400' : 'text-primary-400'}`}>
                  {lensType === 'CINE' ? '无呼吸效应 (Zero Breathing)' : '明显呼吸效应 (Focus Breathing)'}
               </div>
               <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  {lensType === 'CINE' 
                     ? '电影镜头通过浮动镜组设计，抵消了对焦时的视角变化，保持构图稳定。' 
                     : '普通摄影镜头在对焦时，视角会像变焦一样缩放，影响电影叙事的沉浸感。'}
               </p>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
               <Film size={20} className="text-cyan-400"/> 电影镜头 vs 摄影镜头
            </h3>

            <div className="flex gap-2 mb-8">
               <button onClick={() => setLensType('PHOTO')} className={`flex-1 py-4 rounded-lg border font-bold flex flex-col items-center gap-2 transition-colors ${lensType === 'PHOTO' ? 'bg-zinc-700 border-white text-white' : 'border-zinc-700 text-zinc-500 dark:text-zinc-400'}`}>
                  <Camera size={20}/> 摄影镜头
               </button>
               <button onClick={() => setLensType('CINE')} className={`flex-1 py-4 rounded-lg border font-bold flex flex-col items-center gap-2 transition-colors ${lensType === 'CINE' ? 'bg-cyan-900 border-cyan-500 text-primary-500 dark:text-cyan-400' : 'border-zinc-700 text-zinc-500 dark:text-zinc-400'}`}>
                  <Film size={20}/> 电影镜头
               </button>
            </div>

            <div className="space-y-6">
               <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Repeat size={14}/> 对焦行程 (Focus Throw)</h4>
                  <div className="relative h-2 bg-zinc-50 dark:bg-zinc-900 rounded-full mt-2">
                     <div className="absolute top-0 left-0 h-full bg-cyan-500 transition-all" style={{width: `${(focusPos * 100)}%`}}></div>
                  </div>
                  <input 
                     type="range" min="0" max="1" step="0.01" 
                     value={focusPos} onChange={e => setFocusPos(parseFloat(e.target.value))} 
                     className="w-full opacity-0 absolute left-0 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                     <span>Macro</span>
                     <span>Infinity</span>
                  </div>
                  <p className="text-[10px] text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed">
                     {lensType === 'CINE' ? '270° 长行程。允许跟焦员进行极高精度的焦点控制，刻度分布均匀。' : '90° 短行程。为了配合自动对焦马达的极速响应，手动对焦极其灵敏，难以精确控制。'}
                  </p>
               </div>

               <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Aperture size={14}/> T值 vs F值</h4>
                  <p className="text-[10px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                     {lensType === 'CINE' ? 
                        <span className="text-cyan-400">T-Stop (Transmission Stop): 实际透光率。确保换镜头后曝光绝对一致。</span> : 
                        <span className="text-primary-400">F-Stop (Focal Ratio): 几何光圈值。只计算孔径，忽略镜片吃光，不同镜头亮度可能不同。</span>
                     }
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};
