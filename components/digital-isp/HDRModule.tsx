
import React, { useState } from 'react';
import { RefreshCcw, ImagePlus, Layers, Zap } from 'lucide-react';

export const HDRModule: React.FC = () => {
   // Removed ISO_DR mode as it duplicates NativeISOModule functionality
   // Now focused on Computational HDR (Multi-frame merging)
   
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 overflow-hidden relative">
            <MultiFrameVisual />
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><ImagePlus size={20} className="text-cyan-400"/> 多帧合成 HDR</h3>
            
            <div className="space-y-6">
               <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                     <Layers size={14} className="text-emerald-400"/> 算法原理
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify mb-4">
                     当光比超过传感器物理极限（如逆光剪影）时，ISP 会瞬间拍摄多张不同曝光的照片并合成。
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                     <li className="flex gap-2">
                        <span className="font-bold text-cyan-400 shrink-0">短曝光帧:</span> 
                        <span>保护高光细节（天空、灯光），防止死白。</span>
                     </li>
                     <li className="flex gap-2">
                        <span className="font-bold text-orange-400 shrink-0">长曝光帧:</span> 
                        <span>提亮暗部细节（阴影、人脸），防止死黑。</span>
                     </li>
                  </ul>
               </div>

               <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                     <Zap size={14} className="text-yellow-400"/> 鬼影问题 (Ghosting)
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify">
                     如果拍摄时物体在移动（如行人、树叶），多帧合成会导致物体出现半透明重影。
                     <br/><br/>
                     <strong className="text-white">现代 ISP 对策：</strong> 利用运动矢量检测，在合成时“对齐”移动物体，或者仅取某一帧的物体像素。
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

const MultiFrameVisual: React.FC = () => {
   const [merge, setMerge] = useState(false);
   
   return (
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl select-none">
         <div className="relative w-full h-64 flex items-center justify-center">
            
            {/* Frame 1: Underexposed (Highlights) */}
            <div className={`absolute transition-all duration-700 ease-in-out border-2 border-slate-600 rounded-lg overflow-hidden bg-black shadow-xl
               ${merge ? 'left-1/2 -translate-x-1/2 top-0 w-[400px] h-[250px] opacity-0 z-0' : 'left-[10%] top-0 w-64 h-40 opacity-100 rotate-[-6deg] z-10 hover:z-30 hover:scale-110'}
            `}>
               <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600" className="w-full h-full object-cover brightness-[0.4] contrast-125" draggable={false}/>
               <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-2 py-1 rounded text-cyan-400 font-bold border border-cyan-500/30">Short Exp (Highlight)</div>
            </div>

            {/* Frame 2: Overexposed (Shadows) */}
            <div className={`absolute transition-all duration-700 ease-in-out border-2 border-slate-600 rounded-lg overflow-hidden bg-black shadow-xl
               ${merge ? 'left-1/2 -translate-x-1/2 top-0 w-[400px] h-[250px] opacity-0 z-0' : 'right-[10%] top-0 w-64 h-40 opacity-100 rotate-[6deg] z-10 hover:z-30 hover:scale-110'}
            `}>
               <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600" className="w-full h-full object-cover brightness-[1.8] contrast-75" draggable={false}/>
               <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-2 py-1 rounded text-orange-400 font-bold border border-orange-500/30">Long Exp (Shadow)</div>
            </div>

            {/* Result Frame */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[270px] bg-black border-2 border-emerald-500 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all duration-700 z-20
               ${merge ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
            `}>
               <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800" className="w-full h-full object-cover saturate-125 contrast-110" draggable={false}/>
               <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg flex items-center gap-2">
                  <CheckCircle size={14}/> HDR COMPOSITE
               </div>
            </div>

         </div>

         <div className="h-16 flex items-center justify-center">
            <button 
               onClick={() => setMerge(!merge)} 
               className={`px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl flex items-center gap-3 active:scale-95
                  ${merge ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'}
               `}
            >
               {merge ? <RefreshCcw size={18}/> : <ImagePlus size={18}/>}
               {merge ? '重置演示 (RESET)' : '执行多帧合成 (MERGE)'}
            </button>
         </div>
      </div>
   );
};

const CheckCircle: React.FC<{size?: number}> = ({size=16}) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
