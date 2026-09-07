
import React, { useState } from 'react';
import { Slider } from './Controls';
import { Disc } from 'lucide-react';

export const OpticalFilterSimulator: React.FC = () => {
   const [filterType, setFilterType] = useState<'NONE' | 'CPL' | 'ND' | 'MIST'>('NONE');
   const [rotation, setRotation] = useState(0); // For CPL
   const [ndStop, setNdStop] = useState(0); // For ND (0 to 6 stops)
   const [mistStrength, setMistStrength] = useState(0); // For Mist

   // CPL Logic
   const reflectionOpacity = filterType === 'CPL' ? Math.abs(Math.cos(rotation * Math.PI / 180)) : 1;
   const skySaturation = filterType === 'CPL' ? 1 + Math.sin(rotation * Math.PI / 180) * 0.5 : 1;
   
   // ND Logic
   const brightness = filterType === 'ND' ? 1 / Math.pow(2, ndStop) : 1;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-zinc-50 dark:bg-black relative overflow-hidden flex items-center justify-center">
            
            {/* Base Scene: Lake Landscape */}
            <div className="relative w-full h-full">
               {/* 1. Sky Layer */}
               <div 
                  className="absolute inset-0 bg-cover bg-top transition-colors duration-300"
                  style={{
                     backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop)',
                     filter: `saturate(${skySaturation}) brightness(${brightness})`
                  }}
               ></div>

               {/* 2. Reflection Layer (Water Glare) */}
               {/* Using a gradient overlay to simulate surface reflection/glare on the water part of the image */}
               <div 
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/30 to-transparent transition-opacity duration-300 mix-blend-screen pointer-events-none"
                  style={{ opacity: reflectionOpacity * 0.6 }} // Base glare
               ></div>
               <div 
                  className="absolute bottom-10 right-20 w-40 h-20 bg-zinc-50/20 blur-xl rotate-12 transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: reflectionOpacity }} // Specific bright spot reflection
               ></div>

               {/* 3. Mist/Diffusion Layer (Bloom) */}
               {filterType === 'MIST' && (
                  <div 
                     className="absolute inset-0 bg-cover bg-top mix-blend-screen blur-xl opacity-0 transition-opacity duration-500"
                     style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop)',
                        opacity: mistStrength * 0.8,
                        filter: 'contrast(1.5) brightness(1.2)'
                     }}
                  ></div>
               )}

               {/* ND Darkening Overlay (Simplistic) */}
               {filterType === 'ND' && (
                  <div className="absolute inset-0 bg-zinc-50 dark:bg-black pointer-events-none transition-opacity duration-300" style={{ opacity: 1 - brightness }}></div>
               )}
            </div>

            {/* Filter Physical Visualization */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
               <div className={`w-16 h-16 rounded-full border-4 shadow-md flex items-center justify-center backdrop-blur-sm
                  ${filterType === 'CPL' ? 'border-blue-400 bg-primary-900/30' : 
                    filterType === 'ND' ? 'border-zinc-600 bg-zinc-950/60' : 
                    filterType === 'MIST' ? 'border-white/50 bg-zinc-50/[0.1]' : 'border-zinc-700 bg-transparent'}
               `}>
                  <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100/80 dark:text-white/80">
                     {filterType === 'NONE' ? 'No Filter' : filterType}
                  </span>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-80 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Disc size={18}/> 光学滤镜系统</h3>

            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setFilterType('NONE')} className={`p-3 rounded border text-center text-xs ${filterType === 'NONE' ? 'bg-zinc-700 border-white text-white' : 'border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}>无滤镜</button>
                  <button onClick={() => setFilterType('CPL')} className={`p-3 rounded border text-center text-xs ${filterType === 'CPL' ? 'bg-primary-900/50 border-blue-400 text-blue-700 dark:text-blue-300 dark:text-blue-200' : 'border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}>CPL 偏振镜</button>
                  <button onClick={() => setFilterType('ND')} className={`p-3 rounded border text-center text-xs ${filterType === 'ND' ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-400 text-zinc-200' : 'border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}>ND 减光镜</button>
                  <button onClick={() => setFilterType('MIST')} className={`p-3 rounded border text-center text-xs ${filterType === 'MIST' ? 'bg-zinc-50/[0.1] border-white/60 text-white' : 'border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}>柔光镜 (Mist)</button>
               </div>

               <div className="min-h-[120px] bg-zinc-50 dark:bg-zinc-800 rounded p-4 border border-zinc-200 dark:border-zinc-800">
                  {filterType === 'NONE' && (
                     <p className="text-xs text-zinc-600 dark:text-zinc-400">选择一种滤镜以查看其对画面的物理影响。所有滤镜效果均在光线进入传感器前发生。</p>
                  )}
                  {filterType === 'CPL' && (
                     <>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-primary-600 dark:text-primary-400">旋转前镜组</span>
                           <span className="text-xs font-mono">{rotation}°</span>
                        </div>
                        <input type="range" min="0" max="90" value={rotation} onChange={e => setRotation(Number(e.target.value))} className="w-full accent-blue-400 h-1 bg-zinc-600 appearance-none rounded" />
                        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-3">
                           Circular Polarizer. 通过旋转过滤特定角度的偏振光。
                           <br/>用途：消除非金属表面(水面、玻璃、树叶)反光；压暗蓝天增加反差。
                        </p>
                     </>
                  )}
                  {filterType === 'ND' && (
                     <>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">减光档位 (Stops)</span>
                           <span className="text-xs font-mono">ND {Math.pow(2, ndStop).toFixed(0)}</span>
                        </div>
                        <input type="range" min="0" max="6" step="1" value={ndStop} onChange={e => setNdStop(Number(e.target.value))} className="w-full accent-zinc-400 h-1 bg-zinc-600 appearance-none rounded" />
                        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-3">
                           Neutral Density. 相当于镜头的墨镜。
                           <br/>用途：在强光下使用大光圈(虚化)；或降低快门速度拍摄丝滑流水。
                        </p>
                     </>
                  )}
                  {filterType === 'MIST' && (
                     <>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-zinc-900 dark:text-white">柔化强度</span>
                           <span className="text-xs font-mono">{(mistStrength * 100).toFixed(0)}%</span>
                        </div>
                        <input type="range" min="0" max="1" step="0.1" value={mistStrength} onChange={e => setMistStrength(Number(e.target.value))} className="w-full accent-white h-1 bg-zinc-600 appearance-none rounded" />
                        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-3">
                           Black Mist / Diffusion. 
                           <br/>用途：柔化数码锐度；使高光产生光晕(Bloom)；降低反差，营造电影梦幻感。
                        </p>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};
