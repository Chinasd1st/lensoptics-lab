
import React, { useState, useEffect, useRef } from 'react';
import { MotorType } from '../types';
import { Select, Slider } from './Controls';
import { Cpu, Zap, Activity, Vibrate, Scaling, Move, BicepsFlexed, Hand } from 'lucide-react';

type Tab = 'FOCUS' | 'STABILIZATION';

export const MechanicsView: React.FC = () => {
   const [activeTab, setActiveTab] = useState<Tab>('FOCUS');

   return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Tab Bar */}
        <div className="flex border-b border-slate-800 bg-slate-900">
           <TabButton active={activeTab === 'FOCUS'} onClick={() => setActiveTab('FOCUS')} icon={<Zap size={16}/>} label="对焦马达" />
           <TabButton active={activeTab === 'STABILIZATION'} onClick={() => setActiveTab('STABILIZATION')} icon={<Vibrate size={16}/>} label="相机防抖 (OIS/IBIS/EIS)" />
        </div>
        <div className="flex-1 relative overflow-hidden">
           {activeTab === 'FOCUS' && <FocusMotorModule />}
           {activeTab === 'STABILIZATION' && <StabilizationModule />}
        </div>
      </div>
    </div>
   );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

// --- 1. Focus Motor Module ---
const FocusMotorModule: React.FC = () => {
   const [motorType, setMotorType] = useState<MotorType>(MotorType.STM);
   const [targetFocus, setTargetFocus] = useState(50);
   const [currentFocus, setCurrentFocus] = useState(50);
   const animationRef = useRef<number | null>(null);

   const getMotorStats = (type: MotorType) => {
      switch (type) {
         case MotorType.STM: return { speed: 0.5, noise: '中', smoothness: '高', step: true };
         case MotorType.USM: return { speed: 2.0, noise: '低', smoothness: '中', step: false };
         case MotorType.LINEAR: return { speed: 5.0, noise: '静音', smoothness: '极高', step: false };
      }
   };

   useEffect(() => {
      const updatePosition = () => {
         const stats = getMotorStats(motorType);
         setCurrentFocus(prev => {
            const diff = targetFocus - prev;
            if (Math.abs(diff) < 0.5) return targetFocus;
            let move = 0;
            if (stats.step) move = Math.sign(diff) * stats.speed; 
            else {
               move = diff * (stats.speed * 0.05);
               if (Math.abs(move) < stats.speed * 0.1) move = Math.sign(diff) * stats.speed * 0.1;
            }
            return prev + move;
         });
         animationRef.current = requestAnimationFrame(updatePosition);
      };
      animationRef.current = requestAnimationFrame(updatePosition);
      return () => cancelAnimationFrame(animationRef.current!);
   }, [targetFocus, motorType]);

   const stats = getMotorStats(motorType);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 relative flex items-center justify-center">
            <div className="relative w-[600px] h-[400px] bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-600">
               <div className="absolute top-4 left-4 text-white z-10">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                     {motorType === MotorType.STM && <Cpu className="text-blue-400" />}
                     {motorType === MotorType.USM && <Activity className="text-yellow-400" />}
                     {motorType === MotorType.LINEAR && <Zap className="text-purple-400" />}
                     {motorType}
                  </h2>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-24 h-48 bg-cyan-900/50 border-2 border-cyan-500 rounded-lg flex items-center justify-center backdrop-blur-sm transition-transform will-change-transform z-20"
                       style={{ transform: `translateX(${(currentFocus - 50) * 4}px)` }}>
                     <div className="text-cyan-200 font-mono text-xs">Lens Group</div>
                  </div>
                  {/* Motor Graphics */}
                  {motorType === MotorType.STM && <div className="absolute w-[400px] h-4 bg-slate-600 rounded" style={{backgroundImage: 'linear-gradient(90deg, transparent 50%, #94a3b8 50%)', backgroundSize: '20px 100%', animation: currentFocus !== targetFocus ? 'screw-spin 0.5s linear infinite' : 'none'}}></div>}
                  {motorType === MotorType.USM && <div className="absolute w-64 h-64 rounded-full border-[12px] border-yellow-700/50 flex items-center justify-center"><div className={`w-full h-full rounded-full border-[4px] border-dashed border-yellow-500/80 absolute ${currentFocus !== targetFocus ? 'animate-spin' : ''}`}></div></div>}
                  {motorType === MotorType.LINEAR && <div className="absolute top-20 w-[400px] h-4 bg-purple-900/50 rounded flex justify-between px-2"></div>}
               </div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">对焦系统</h3>
            <Select label="马达类型" value={motorType} options={[{ label: 'STM 步进', value: MotorType.STM }, { label: 'USM 超声波', value: MotorType.USM }, { label: 'Linear 线性', value: MotorType.LINEAR }]} onChange={(v) => setMotorType(v as MotorType)} />
            <Slider label="目标位置" value={targetFocus} min={0} max={100} onChange={setTargetFocus} />
            <div className="bg-slate-900 p-4 rounded text-xs space-y-2 mt-4">
               <div className="flex justify-between"><span>速度</span><span className="text-white">{stats.speed > 2 ? '极快 (指哪打哪)' : '普通'}</span></div>
               <div className="flex justify-between"><span>噪音</span><span className="text-white">{stats.noise}</span></div>
               <div className="flex justify-between"><span>平滑度</span><span className="text-white">{stats.smoothness}</span></div>
            </div>
            {motorType === MotorType.LINEAR && (
               <div className="mt-4 p-3 bg-slate-700/50 rounded border border-purple-500/30 text-[10px] text-slate-300 italic">
                  * 索尼的实时追踪对焦配合线性马达，被戏称为"追得比债主还紧"。
               </div>
            )}
         </div>
         <style>{`@keyframes screw-spin { from { background-position: 0 0; } to { background-position: 20px 0; } }`}</style>
      </div>
   );
};

// --- 2. Stabilization Module ---
const StabilizationModule: React.FC = () => {
   const [mode, setMode] = useState<'OFF' | 'OIS' | 'IBIS' | 'EIS'>('OFF');
   const [shakeAmount, setShakeAmount] = useState(1);
   
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Viewfinder simulation */}
            <div className="relative w-[480px] h-[320px] bg-black border-4 border-slate-700 rounded-lg overflow-hidden shadow-2xl">
               <div className="absolute top-2 right-2 text-red-500 animate-pulse text-xs font-mono z-20">REC</div>
               <div className="absolute bottom-2 left-2 text-white text-xs font-mono z-20">STAB: {mode}</div>

               {/* EIS Crop Box (Visualizing the loss of FOV) */}
               {mode === 'EIS' && (
                  <div className="absolute inset-8 border-2 border-red-500/50 z-10 pointer-events-none">
                     <span className="absolute -top-5 left-0 text-[10px] text-red-500">EIS Crop Area (10-20%)</span>
                  </div>
               )}

               {/* Scene Layer - Shakes with hand */}
               <div 
                  className="absolute inset-[-50px] bg-cover bg-center origin-center"
                  style={{
                     backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop)',
                     animation: `shake 0.5s infinite linear`,
                     transform: mode === 'EIS' ? 'scale(1.2)' : 'scale(1)', // EIS zooms in
                  }}
               ></div>
               
               <style>{`
                  @keyframes shake {
                     0% { transform: translate(0,0) rotate(0) ${mode === 'EIS' ? 'scale(1.2)' : ''}; }
                     25% { transform: translate(${shakeAmount * (mode === 'OFF' ? 10 : 2)}px, ${shakeAmount * (mode === 'OFF' ? 10 : 2)}px) rotate(${mode === 'OFF' ? 1 : 0}deg) ${mode === 'EIS' ? 'scale(1.2)' : ''}; }
                     50% { transform: translate(-${shakeAmount * (mode === 'OFF' ? 8 : 1)}px, ${shakeAmount * (mode === 'OFF' ? 12 : 2)}px) rotate(-${mode === 'OFF' ? 1 : 0}deg) ${mode === 'EIS' ? 'scale(1.2)' : ''}; }
                     75% { transform: translate(${shakeAmount * (mode === 'OFF' ? 5 : 1)}px, -${shakeAmount * (mode === 'OFF' ? 5 : 1)}px) rotate(0) ${mode === 'EIS' ? 'scale(1.2)' : ''}; }
                     100% { transform: translate(0,0) rotate(0) ${mode === 'EIS' ? 'scale(1.2)' : ''}; }
                  }
               `}</style>

               {/* Crosshair */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <div className="w-8 h-8 border border-white"></div>
                  <div className="w-1 h-1 bg-white"></div>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">机内防抖系统</h3>
            
            <div className="space-y-4">
               <Slider label="手抖幅度" value={shakeAmount} min={0} max={3} step={0.5} onChange={setShakeAmount} />

               <div className="space-y-2">
                  <button onClick={() => setMode('OFF')} className={`w-full p-3 rounded border text-left ${mode === 'OFF' ? 'bg-red-900/50 border-red-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-red-400 flex items-center gap-2"><BicepsFlexed size={14}/> 纯铁手 (Human Gimbal)</div>
                     <div className="text-[10px] text-slate-400">无补偿。俗称"麒麟臂"模式。适合 BMPCC 用户。</div>
                  </button>

                  <button onClick={() => setMode('OIS')} className={`w-full p-3 rounded border text-left ${mode === 'OIS' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-cyan-400 flex items-center gap-2"><Move size={12}/> OIS (镜片位移)</div>
                     <div className="text-[10px] text-slate-400">
                        Lens Shift. 浮动镜组反向补偿。适合长焦。
                        <br/><span className="text-emerald-500">优点：</span>取景器画面稳定。
                     </div>
                  </button>

                  <button onClick={() => setMode('IBIS')} className={`w-full p-3 rounded border text-left ${mode === 'IBIS' ? 'bg-emerald-900/50 border-emerald-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-emerald-400 flex items-center gap-2"><Vibrate size={12}/> IBIS (传感器位移)</div>
                     <div className="text-[10px] text-slate-400">
                        Sensor Shift. 传感器物理移动。
                        <br/><span className="text-emerald-500">优点：</span>五轴防抖，随便什么破镜头都能抖。
                     </div>
                  </button>

                  <button onClick={() => setMode('EIS')} className={`w-full p-3 rounded border text-left ${mode === 'EIS' ? 'bg-purple-900/50 border-purple-500' : 'border-slate-700'}`}>
                     <div className="font-bold text-sm text-purple-400 flex items-center gap-2"><Scaling size={12}/> EIS (电子防抖)</div>
                     <div className="text-[10px] text-slate-400">
                        Electronic. 裁切画面边缘并实时对齐。
                        <br/><span className="text-red-400">缺点：</span>画面被裁切，画质有损失，晚上会有鬼影拖尾。
                     </div>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
