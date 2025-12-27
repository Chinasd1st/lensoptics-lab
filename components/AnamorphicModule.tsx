
import React, { useState } from 'react';
import { Slider, Toggle } from './Controls';
import { Aperture } from 'lucide-react';

export const AnamorphicModule: React.FC = () => {
   const [isAnamorphic, setIsAnamorphic] = useState(false);
   const [squeeze, setSqueeze] = useState(1.33);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl transition-all duration-500" 
                 style={{ aspectRatio: isAnamorphic ? '2.39/1' : '16/9' }}>
               <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000)'}}></div>
               <div className="absolute inset-0 flex items-center justify-center gap-20">
                  {[...Array(5)].map((_, i) => (
                     <div key={i} className="bg-cyan-400/30 backdrop-blur-sm border border-cyan-200/20"
                          style={{
                             width: isAnamorphic ? '60px' : '40px',
                             height: '40px',
                             borderRadius: isAnamorphic ? '40%' : '50%',
                             filter: 'blur(2px)',
                             transform: `translate(${Math.sin(i)*100}px, ${Math.cos(i)*50}px)`
                          }}></div>
                  ))}
               </div>
               {isAnamorphic && (
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500/50 blur-[4px] mix-blend-screen animate-pulse">
                     <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-2 bg-blue-400 blur-[8px]"></div>
                  </div>
               )}
               {isAnamorphic && (
                  <>
                     <div className="absolute top-0 left-0 w-full h-[10%] bg-black z-20"></div>
                     <div className="absolute bottom-0 left-0 w-full h-[10%] bg-black z-20"></div>
                  </>
               )}
               <div className="absolute top-4 left-4 text-white text-xs font-mono drop-shadow-md z-30">
                  {isAnamorphic ? 'ANAMORPHIC LENS' : 'SPHERICAL LENS'}
               </div>
            </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Aperture size={18} className="text-purple-400"/> 变形宽银幕镜头</h3>
            <Toggle label="启用变形镜头" checked={isAnamorphic} onChange={setIsAnamorphic} />
            {isAnamorphic && (
               <div className="mb-6">
                  <Slider label="挤压倍率" value={squeeze} min={1.33} max={2.0} step={0.01} onChange={setSqueeze} />
               </div>
            )}
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
               <h4 className="text-xs font-bold text-purple-400 mb-2">三大视觉特征</h4>
               <ul className="text-[10px] text-slate-400 list-disc pl-4 space-y-2">
                  <li><strong>椭圆焦外:</strong> 光圈被水平挤压。</li>
                  <li><strong>横向拉丝:</strong> 强光源产生水平炫光（JJ Abrams 风格）。</li>
                  <li><strong>宽银幕画幅:</strong> 2.39:1 电影感。</li>
               </ul>
            </div>
         </div>
      </div>
   );
};
