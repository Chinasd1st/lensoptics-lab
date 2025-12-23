import React, { useState, useEffect, useRef } from 'react';
import { MotorType } from '../types';
import { Select, Slider } from './Controls';
import { Cpu, Zap, Activity } from 'lucide-react';

export const MotorView: React.FC = () => {
  const [motorType, setMotorType] = useState<MotorType>(MotorType.STM);
  const [targetFocus, setTargetFocus] = useState(50); // 0 to 100
  const [currentFocus, setCurrentFocus] = useState(50);
  const animationRef = useRef<number | null>(null);

  // Physics simulation constants based on motor type
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
        if (stats.step) {
          // STM moves in steps
          move = Math.sign(diff) * stats.speed; 
        } else {
          // USM/Linear approximate ease-out or linear speed
          move = diff * (stats.speed * 0.05);
          // Minimum movement to prevent Zeno's paradox stall
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
      {/* Visualization Area */}
      <div className="flex-1 bg-slate-900 relative flex items-center justify-center border-b lg:border-r border-slate-700">
        
        <div className="relative w-[600px] h-[400px] bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-600">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

          {/* Motor Description Overlay */}
          <div className="absolute top-4 left-4 text-white z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {motorType === MotorType.STM && <Cpu className="text-blue-400" />}
              {motorType === MotorType.USM && <Activity className="text-yellow-400" />}
              {motorType === MotorType.LINEAR && <Zap className="text-purple-400" />}
              {motorType === MotorType.STM && 'STM 步进马达'}
              {motorType === MotorType.USM && 'USM 超声波马达'}
              {motorType === MotorType.LINEAR && 'Linear 线性马达'}
            </h2>
          </div>

          {/* Mechanics Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* The Lens Group being moved */}
            <div 
              className="absolute w-24 h-48 bg-cyan-900/50 border-2 border-cyan-500 rounded-lg flex items-center justify-center backdrop-blur-sm transition-transform will-change-transform z-20"
              style={{ transform: `translateX(${(currentFocus - 50) * 4}px)` }}
            >
              <div className="text-cyan-200 font-mono text-xs">Focus Group</div>
              {/* Glass elements inside */}
              <div className="absolute w-4 h-40 bg-cyan-400/20 rounded-full blur-[1px]"></div>
            </div>

            {/* Motor Mechanics Graphics */}
            {motorType === MotorType.STM && (
              <>
                 {/* Lead Screw */}
                 <div className="absolute w-[400px] h-4 bg-slate-600 rounded flex items-center overflow-hidden">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(90deg, transparent 50%, #94a3b8 50%)',
                      backgroundSize: '20px 100%',
                      animation: currentFocus !== targetFocus ? 'screw-spin 0.5s linear infinite' : 'none'
                    }}></div>
                 </div>
                 <style>{`@keyframes screw-spin { from { background-position: 0 0; } to { background-position: 20px 0; } }`}</style>
                 {/* Stepper Motor Block */}
                 <div className="absolute right-10 w-24 h-24 bg-slate-700 border border-slate-500 rounded flex flex-col items-center justify-center">
                    <div className="text-xs text-slate-400">Stepper</div>
                    <div className={`w-12 h-12 border-4 border-dashed border-slate-400 rounded-full ${currentFocus !== targetFocus ? 'animate-spin' : ''}`}></div>
                 </div>
              </>
            )}

            {motorType === MotorType.USM && (
              <>
                 {/* Ring USM */}
                 <div className="absolute w-64 h-64 rounded-full border-[12px] border-yellow-700/50 flex items-center justify-center">
                    {/* Rotor */}
                    <div className={`w-full h-full rounded-full border-[4px] border-dashed border-yellow-500/80 absolute ${currentFocus !== targetFocus ? 'animate-spin' : ''}`} style={{animationDuration: '0.2s'}}></div>
                    {/* Stator Waves */}
                    <div className="absolute bottom-[-20px] text-xs text-yellow-500 font-mono">Piezo Vibration</div>
                 </div>
                 {/* Drive linkage */}
                 <div className="absolute w-32 h-2 bg-yellow-600/50" style={{ transform: `translateX(${(currentFocus - 50) * 2}px)` }}></div>
              </>
            )}

            {motorType === MotorType.LINEAR && (
              <>
                 {/* Magnetic Rails */}
                 <div className="absolute top-20 w-[400px] h-4 bg-purple-900/50 rounded flex justify-between px-2">
                    {[...Array(10)].map((_,i) => <div key={i} className="w-2 h-full bg-purple-500/50"></div>)}
                 </div>
                 <div className="absolute bottom-20 w-[400px] h-4 bg-purple-900/50 rounded flex justify-between px-2">
                    {[...Array(10)].map((_,i) => <div key={i} className="w-2 h-full bg-purple-500/50"></div>)}
                 </div>
                 {/* Magnetic Field Visualization */}
                 <div className="absolute w-[400px] h-32 border-y border-purple-500/20">
                    <div className={`w-full h-full transition-opacity duration-100 ${currentFocus !== targetFocus ? 'opacity-100' : 'opacity-0'}`} style={{
                       backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(168, 85, 247, 0.2) 20px)'
                    }}></div>
                 </div>
              </>
            )}

          </div>
          
          {/* Ruler */}
          <div className="absolute bottom-0 w-full h-8 bg-slate-900 flex justify-between px-12 pt-2 text-[10px] text-slate-500 font-mono">
             <span>Macro</span>
             <span>1m</span>
             <span>Infinity</span>
          </div>

        </div>

      </div>

      {/* Controls */}
      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6">对焦系统 (Focus Mechanics)</h3>

        <Select 
          label="马达类型 (Motor Type)"
          value={motorType}
          options={[
            { label: 'STM 步进马达 (入门/视频)', value: MotorType.STM },
            { label: 'USM 超声波马达 (单反时代主力)', value: MotorType.USM },
            { label: 'Linear 线性马达 (无反时代旗舰)', value: MotorType.LINEAR },
          ]}
          onChange={(v) => setMotorType(v as MotorType)}
        />

        <div className="my-6">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">对焦目标位置</label>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTargetFocus(10)} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-xs">最近 (Macro)</button>
            <button onClick={() => setTargetFocus(50)} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-xs">中距</button>
            <button onClick={() => setTargetFocus(90)} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-xs">无穷远</button>
          </div>
          <div className="mt-4">
            <Slider 
               label="手动对焦环" 
               value={targetFocus} 
               min={0} max={100} 
               onChange={setTargetFocus} 
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded p-4 border border-slate-700">
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div>
               <span className="text-slate-500 block text-xs">响应速度</span>
               <span className="text-white font-mono">{stats.speed > 2 ? '极快' : stats.speed > 1 ? '快' : '普通'}</span>
             </div>
             <div>
               <span className="text-slate-500 block text-xs">噪音控制</span>
               <span className="text-white font-mono">{stats.noise}</span>
             </div>
             <div>
               <span className="text-slate-500 block text-xs">运动特性</span>
               <span className="text-white font-mono">{stats.step ? '步进式 (适合视频)' : '模拟量'}</span>
             </div>
             <div>
               <span className="text-slate-500 block text-xs">平滑度</span>
               <span className="text-white font-mono">{stats.smoothness}</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};