
import React, { useState } from 'react';
import { Slider } from './Controls';
import { Maximize2 } from 'lucide-react';

export const FocalLengthModule: React.FC = () => {
   const [focalLength, setFocalLength] = useState(50);
   const bgScale = 1 + (focalLength - 24) * 0.05; 
   const fov = 180 / Math.PI * 2 * Math.atan(36 / (2 * focalLength)); 

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
             <div className="relative w-full h-full max-w-4xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center rounded-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out origin-center"
                  style={{ 
                     backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000)',
                     transform: `scale(${bgScale})`,
                     filter: 'brightness(0.6)'
                  }}
                ></div>
                <div 
                  className="absolute inset-0 flex items-center justify-between px-20 pointer-events-none transition-transform duration-100 ease-out"
                  style={{ transform: `scale(${1 + (bgScale-1)*0.5})` }}
                >
                   <div className="w-10 h-40 bg-emerald-900/50 backdrop-blur-sm rounded-full blur-[2px]"></div>
                   <div className="w-10 h-40 bg-emerald-900/50 backdrop-blur-sm rounded-full blur-[2px]"></div>
                </div>
                <div className="relative z-10 w-48 h-64 bg-slate-800 rounded-xl shadow-2xl flex flex-col items-center justify-end overflow-hidden border border-slate-700">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1 rounded font-mono">SUBJ</div>
                </div>
                <div className="absolute top-4 left-4 bg-black/60 p-2 rounded text-white font-mono border border-slate-600">
                   <div className="text-xl font-bold text-cyan-400">{focalLength}mm</div>
                   <div className="text-xs text-slate-400">FOV: {fov.toFixed(1)}°</div>
                </div>
             </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Maximize2 size={18} className="text-cyan-400"/> 焦段与空间压缩
            </h3>
            <Slider label="焦距 (Focal Length)" value={focalLength} min={16} max={200} step={1} onChange={setFocalLength} />
            <div className="flex gap-2 mb-6">
               <button onClick={()=>setFocalLength(24)} className="flex-1 py-2 bg-slate-800 border border-slate-600 rounded text-xs hover:bg-slate-700">24mm</button>
               <button onClick={()=>setFocalLength(50)} className="flex-1 py-2 bg-slate-800 border border-slate-600 rounded text-xs hover:bg-slate-700">50mm</button>
               <button onClick={()=>setFocalLength(85)} className="flex-1 py-2 bg-slate-800 border border-slate-600 rounded text-xs hover:bg-slate-700">85mm</button>
            </div>
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
               <h4 className="text-xs font-bold text-cyan-400 mb-2">空间压缩 (Compression)</h4>
               <p className="text-[10px] text-slate-400 leading-relaxed">
                  长焦镜头（如85mm+）会把背景“拉近”，让背景物体看起来比实际更大，与主体的距离更近。
                  <br/>广角镜头（如24mm-）会夸大距离感，让背景显得很远。
               </p>
            </div>
         </div>
      </div>
   );
};
