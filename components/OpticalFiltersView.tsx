
import React, { useState, useEffect } from 'react';
import { Slider } from './Controls';
import { Disc, Sun, CloudFog } from 'lucide-react';

interface OpticalFiltersViewProps {
   initialTab?: string;
}

export const OpticalFiltersView: React.FC<OpticalFiltersViewProps> = ({ initialTab }) => {
   const [filterType, setFilterType] = useState<'NONE' | 'CPL' | 'ND' | 'MIST'>('NONE');
   const [rotation, setRotation] = useState(0); 
   const [ndStop, setNdStop] = useState(3); 
   const [mistStrength, setMistStrength] = useState(0.5); 

   useEffect(() => {
      if (initialTab && ['NONE', 'CPL', 'ND', 'MIST'].includes(initialTab)) {
         setFilterType(initialTab as any);
      }
   }, [initialTab]);

   const reflectionOpacity = filterType === 'CPL' ? Math.abs(Math.cos(rotation * Math.PI / 180)) : 1;
   const skySaturation = filterType === 'CPL' ? 1 + Math.sin(rotation * Math.PI / 180) * 0.5 : 1;
   const brightness = filterType === 'ND' ? 1 / Math.pow(2, ndStop) : 1;

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
         <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
               {/* Scene: Landscape */}
               <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                  style={{
                     backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000)',
                     filter: `saturate(${skySaturation}) brightness(${brightness})`
                  }}
               ></div>

               {/* Water Reflection (Simulated Surface Glare) */}
               <div 
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/30 to-transparent mix-blend-screen pointer-events-none transition-opacity duration-300"
                  style={{ opacity: reflectionOpacity * 0.8 }}
               ></div>

               {/* Mist Diffusion Layer */}
               {filterType === 'MIST' && (
                  <div 
                     className="absolute inset-0 bg-cover bg-center mix-blend-screen blur-xl transition-opacity duration-500"
                     style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000)',
                        opacity: mistStrength * 0.7,
                        filter: 'contrast(1.5) brightness(1.2)'
                     }}
                  ></div>
               )}
            </div>

            {/* Filter Frame UI Overlay */}
            <div className="absolute top-4 right-4 pointer-events-none">
               <div className={`w-24 h-24 rounded-full border-4 shadow-2xl flex items-center justify-center backdrop-blur-sm transition-all
                  ${filterType === 'CPL' ? 'border-blue-400 bg-blue-900/20' : 
                    filterType === 'ND' ? 'border-slate-600 bg-black/60' : 
                    filterType === 'MIST' ? 'border-white/40 bg-white/5' : 'border-slate-800 bg-transparent'}
               `}>
                  <Disc size={32} className={filterType === 'NONE' ? 'text-slate-800' : 'text-white/20'} />
               </div>
            </div>
         </div>

         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto no-scrollbar">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Disc size={18}/> 光学滤镜系统</h3>

            <div className="grid grid-cols-2 gap-2 mb-6">
               {(['NONE', 'CPL', 'ND', 'MIST'] as const).map(t => (
                  <button key={t} onClick={() => setFilterType(t)} className={`p-3 rounded border text-xs font-bold transition-all ${filterType === t ? 'bg-cyan-900/50 border-cyan-400 text-cyan-100 shadow-inner' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>
                     {t === 'NONE' ? '无滤镜' : t}
                  </button>
               ))}
            </div>

            <div className="min-h-[160px] bg-slate-800 rounded-lg p-4 border border-slate-700">
               {filterType === 'NONE' && <p className="text-xs text-slate-400">物理滤镜安装在镜头前端。它们在光线接触传感器之前改变光的物理性质，这是后期数字处理无法完美替代的。</p>}
               {filterType === 'CPL' && (
                  <>
                     <Slider label="偏振旋转" value={rotation} min={0} max={90} unit="°" onChange={setRotation} />
                     <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">原理：选择性吸收非金属表面的偏振反射光。可消除水面反光、增加蓝天饱和度。</p>
                  </>
               )}
               {filterType === 'ND' && (
                  <>
                     <Slider label="减光档位" value={ndStop} min={1} max={10} unit=" Stops" onChange={setNdStop} />
                     <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">原理：中性密度玻璃，均匀减少进光量。用于在强光下使用大光圈（虚化）或慢速快门（流水）。</p>
                  </>
               )}
               {filterType === 'MIST' && (
                  <>
                     <Slider label="柔光强度" value={mistStrength} min={0} max={1} step={0.1} onChange={setMistStrength} />
                     <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">原理：分散的高光在阴影处溢出。用于软化数码锐度，营造电影感梦幻光晕。</p>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};
