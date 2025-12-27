
import React, { useState } from 'react';
import { Slider } from './Controls';
import { Lightbulb, Sun, User, Camera } from 'lucide-react';

export const LightingModule: React.FC = () => {
   const [keyIntensity, setKeyIntensity] = useState(80);
   const [fillIntensity, setFillIntensity] = useState(30);
   const [backIntensity, setBackIntensity] = useState(60);
   const [angle, setAngle] = useState(45); 

   const ratioMain = Math.round((keyIntensity + fillIntensity) / (fillIntensity || 1));

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center relative p-8">
            <div className="relative w-64 h-80 lg:w-80 lg:h-96 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125" alt="Portrait Subject"/>
               <div className="absolute inset-0 mix-blend-overlay transition-all duration-300" style={{background: `linear-gradient(${90 + angle}deg, rgba(255,240,220,${keyIntensity/100}) 0%, transparent 70%)`, opacity: keyIntensity / 100}}></div>
               {keyIntensity > 20 && <div className="absolute top-[42%] left-[45%] w-1 h-1 bg-white rounded-full blur-[1px] shadow-[0_0_5px_white]"></div>}
               <div className="absolute inset-0 mix-blend-screen transition-all duration-300" style={{backgroundColor: `rgba(50,60,80, ${fillIntensity/400})`}}></div>
               <div className="absolute inset-0 transition-all duration-300 pointer-events-none" style={{boxShadow: `inset 0 0 20px rgba(0,0,0,0.8), inset ${backIntensity/5}px -${backIntensity/10}px ${backIntensity/3}px rgba(200,220,255,${backIntensity/100})`, mixBlendMode: 'screen'}}></div>
               <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="bg-black/50 text-[10px] text-white px-2 py-1 rounded backdrop-blur-sm border border-white/10">光比 {ratioMain}:1</span>
               </div>
            </div>
            <div className="absolute bottom-8 right-8 w-40 h-40 bg-slate-900/90 rounded-full border border-slate-700 flex items-center justify-center shadow-xl">
               <User size={24} className="text-slate-500" />
               <Camera size={16} className="text-white absolute bottom-2" />
               <div className="absolute w-full h-full" style={{ transform: `rotate(${-angle}deg)` }}><Sun size={20} className="text-orange-400 absolute top-2 left-1/2 -translate-x-1/2" /></div>
               <div className="absolute w-full h-full opacity-50 pointer-events-none"><Sun size={16} className="text-blue-400 absolute top-10 left-2" /></div>
               <div className="absolute w-full h-full opacity-80 pointer-events-none" style={{ transform: 'rotate(180deg)' }}><Sun size={16} className="text-white absolute top-2 left-1/2 -translate-x-1/2" /></div>
            </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-6">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Lightbulb className="text-yellow-400" size={20}/> 三点布光</h3>
               <div className="space-y-6">
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                     <Slider label="主光 (Key)" value={keyIntensity} min={0} max={100} onChange={setKeyIntensity} />
                     <Slider label="角度" value={angle} min={-60} max={60} onChange={setAngle} />
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700"><Slider label="辅光 (Fill)" value={fillIntensity} min={0} max={80} onChange={setFillIntensity} /></div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700"><Slider label="轮廓光 (Rim)" value={backIntensity} min={0} max={100} onChange={setBackIntensity} /></div>
               </div>
            </div>
         </div>
      </div>
   );
};
