
import React, { useState } from 'react';
import { Move, Camera } from 'lucide-react';

export const MovementModule: React.FC = () => {
   const [moveType, setMoveType] = useState<'DOLLY' | 'TRUCK' | 'PAN' | 'TILT'>('DOLLY');
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8">
            <div className="relative w-full h-64 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center perspective-1000">
               <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px', transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'}}></div>
               <div className={`w-20 h-20 bg-cyan-600 rounded-lg shadow-[0_0_30px_cyan] flex items-center justify-center relative z-10 ${moveType === 'DOLLY' ? 'animate-dolly' : moveType === 'TRUCK' ? 'animate-truck' : moveType === 'PAN' ? 'animate-pan' : 'animate-tilt'}`}>
                  <Camera size={40} className="text-white" />
               </div>
               <div className="absolute bottom-4 left-0 w-full text-center"><span className="text-4xl font-black text-white/10 uppercase tracking-[1em]">{moveType}</span></div>
            </div>
            <style>{`
               @keyframes dolly { 0%, 100% { transform: scale(0.5); opacity: 0.5; } 50% { transform: scale(1.5); opacity: 1; } }
               @keyframes truck { 0%, 100% { transform: translateX(-100px); } 50% { transform: translateX(100px); } }
               @keyframes pan { 0%, 100% { transform: rotateY(-45deg); } 50% { transform: rotateY(45deg); } }
               @keyframes tilt { 0%, 100% { transform: rotateX(-45deg); } 50% { transform: rotateX(45deg); } }
            `}</style>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Move size={20} className="text-cyan-400"/> 运镜术语</h3>
            <div className="grid grid-cols-2 gap-3">
               <button onClick={()=>setMoveType('DOLLY')} className={`p-4 rounded border text-left ${moveType==='DOLLY' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Dolly (推拉)</div></button>
               <button onClick={()=>setMoveType('TRUCK')} className={`p-4 rounded border text-left ${moveType==='TRUCK' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Truck (横移)</div></button>
               <button onClick={()=>setMoveType('PAN')} className={`p-4 rounded border text-left ${moveType==='PAN' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Pan (摇摄)</div></button>
               <button onClick={()=>setMoveType('TILT')} className={`p-4 rounded border text-left ${moveType==='TILT' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Tilt (俯仰)</div></button>
            </div>
         </div>
      </div>
   );
};
