
import React, { useState } from 'react';
import { Anchor, Camera, MoveHorizontal } from 'lucide-react';

export const RiggingModule: React.FC = () => {
   const [rigType, setRigType] = useState<'HANDHELD' | 'SHOULDER' | 'GIMBAL' | 'SLIDER'>('GIMBAL');
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center relative p-8 border-b lg:border-b-0 border-slate-800 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center max-w-2xl">
               <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
               
               {/* Camera Box */}
               <div className={`w-40 h-28 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl flex items-center justify-center relative transition-transform z-10
                  ${rigType === 'HANDHELD' ? 'animate-[handheld_0.5s_infinite_linear]' : 
                    rigType === 'SHOULDER' ? 'animate-[shoulder_2s_infinite_ease-in-out]' : 
                    rigType === 'GIMBAL' ? 'animate-[gimbal_3s_infinite_ease-in-out]' : 
                    'animate-[slider_4s_infinite_linear]'}
               `}>
                  <Camera size={48} className="text-white/20" />
                  <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  
                  {rigType === 'GIMBAL' && (
                     <div className="absolute inset-[-40px] border-2 border-cyan-500/30 rounded-full animate-[spin_6s_linear_infinite] flex items-center justify-center pointer-events-none">
                         <div className="absolute top-0 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_cyan]"></div>
                         <div className="absolute inset-[-20px] border border-cyan-500/10 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                     </div>
                  )}

                  {rigType === 'SLIDER' && (
                     <div className="absolute -bottom-10 w-[150%] h-2 bg-slate-700 rounded-full">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-50"></div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <style>{`
            @keyframes handheld { 0%, 100% { transform: translate(0,0) rotate(0); } 25% { transform: translate(-2px, 3px) rotate(-1deg); } 50% { transform: translate(3px, -2px) rotate(1deg); } 75% { transform: translate(-3px, 1px) rotate(0deg); } }
            @keyframes shoulder { 0%, 100% { transform: translate(0,0) rotate(0); } 50% { transform: translate(10px, 5px) rotate(2deg); } }
            @keyframes gimbal { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(20px, -5px); } }
            @keyframes slider { 0% { transform: translateX(-150px); } 50% { transform: translateX(150px); } 100% { transform: translateX(-150px); } }
         `}</style>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-6">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Anchor className="text-cyan-400" size={20}/> 承托与稳定</h3>
               <div className="space-y-4 mb-8">
                  <button onClick={() => setRigType('HANDHELD')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'HANDHELD' ? 'bg-red-900/20 border-red-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-red-400 mb-1">Handheld (手持)</div>
                     <div className="text-[10px] text-slate-400">高频抖动。用于表现不安、真实感、纪录片风格（如《谍影重重》）。</div>
                  </button>
                  <button onClick={() => setRigType('SHOULDER')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'SHOULDER' ? 'bg-yellow-900/20 border-yellow-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-yellow-400 mb-1">Shoulder Rig (肩扛)</div>
                     <div className="text-[10px] text-slate-400">利用身体作为阻尼，消除高频抖动，保留低频呼吸感。物理本质是增加接触点和质量惯性。</div>
                  </button>
                  <button onClick={() => setRigType('GIMBAL')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'GIMBAL' ? 'bg-cyan-900/20 border-cyan-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-cyan-400 mb-1">Gimbal (三轴稳定器)</div>
                     <div className="text-[10px] text-slate-400">电机抵消所有抖动。画面如漂浮般顺滑。常用于长镜头或复杂运动。</div>
                  </button>
                  <button onClick={() => setRigType('SLIDER')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'SLIDER' ? 'bg-purple-900/20 border-purple-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-purple-400 mb-1 flex items-center gap-2"><MoveHorizontal size={14}/> Slider (滑轨)</div>
                     <div className="text-[10px] text-slate-400">机械约束的单向运动。绝对的直线平移，用于展示产品细节或空间关系（Parallax）。</div>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
