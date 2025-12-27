
import React, { useState, useEffect, useRef } from 'react';
import { MotorType } from '../types';
import { Select, Slider } from './Controls';
import { Cpu, Zap, Activity, Vibrate, Scaling, Move, BicepsFlexed, Hand, Scan, Focus, LineChart, AlignVerticalSpaceAround, Ruler } from 'lucide-react';

type Tab = 'FOCUS' | 'ALGORITHM' | 'STABILIZATION' | 'FLANGE';

interface MechanicsViewProps {
  initialTab?: string;
}

export const MechanicsView: React.FC<MechanicsViewProps> = ({ initialTab }) => {
   const [activeTab, setActiveTab] = useState<Tab>('FOCUS');

   // Handle Deep Linking
   useEffect(() => {
      if (initialTab && ['FOCUS', 'ALGORITHM', 'STABILIZATION', 'FLANGE'].includes(initialTab)) {
         setActiveTab(initialTab as Tab);
      }
   }, [initialTab]);

   return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Tab Bar - Unified Style */}
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'FOCUS'} onClick={() => setActiveTab('FOCUS')} icon={<Zap size={16}/>} label="对焦马达硬件" />
           <TabButton active={activeTab === 'ALGORITHM'} onClick={() => setActiveTab('ALGORITHM')} icon={<Scan size={16}/>} label="对焦算法 (PDAF/CDAF)" />
           <TabButton active={activeTab === 'STABILIZATION'} onClick={() => setActiveTab('STABILIZATION')} icon={<Vibrate size={16}/>} label="防抖系统" />
           <TabButton active={activeTab === 'FLANGE'} onClick={() => setActiveTab('FLANGE')} icon={<Ruler size={16}/>} label="法兰距与卡口" />
        </div>
        <div className="flex-1 relative overflow-hidden">
           {activeTab === 'FOCUS' && <FocusMotorModule />}
           {activeTab === 'ALGORITHM' && <FocusAlgoModule />}
           {activeTab === 'STABILIZATION' && <StabilizationModule />}
           {activeTab === 'FLANGE' && <FlangeDistanceModule />}
        </div>
      </div>
    </div>
   );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

// --- 1. Focus Motor Module (Existing) ---
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
            <h3 className="text-xl font-bold text-white mb-6">对焦驱动硬件</h3>
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

// --- 2. Focus Algorithm Module (Existing) ---
const FocusAlgoModule: React.FC = () => {
   const [algo, setAlgo] = useState<'CDAF' | 'PDAF'>('CDAF');
   const [lensPos, setLensPos] = useState(20); 
   const [isFocusing, setIsFocusing] = useState(false);
   const [contrastHistory, setContrastHistory] = useState<{p:number, c:number}[]>([]);
   const [locked, setLocked] = useState(false);
   const animationRef = useRef<number | null>(null);
   const posRef = useRef(20);
   const algoRef = useRef(algo);
   const historyRef = useRef<{p:number, c:number}[]>([]);
   const PERFECT_FOCUS = 65; 
   const CDAF_STEP = 1.2;
   const CDAF_OVERSHOOT = 15;

   useEffect(() => { algoRef.current = algo; }, [algo]);
   const getContrast = (p: number) => Math.max(0, 100 - Math.pow(p - PERFECT_FOCUS, 2) * 0.15);
   const getPhaseOffset = (p: number) => (p - PERFECT_FOCUS) * 1.5;

   const startFocusing = () => {
      if (isFocusing) return;
      setIsFocusing(true);
      setLocked(false);
      posRef.current = 10; 
      setLensPos(10);
      historyRef.current = [];
      setContrastHistory([]);
      let cdafState: 'APPROACH' | 'OVERSHOOT' | 'RETURN' = 'APPROACH';

      const loop = () => {
         const p = posRef.current;
         const currentAlgo = algoRef.current;
         if (currentAlgo === 'CDAF') {
            const c = getContrast(p);
            historyRef.current.push({ p, c });
            setContrastHistory([...historyRef.current]);
            if (cdafState === 'APPROACH') {
               if (p < PERFECT_FOCUS + CDAF_OVERSHOOT) posRef.current += CDAF_STEP;
               else cdafState = 'RETURN'; 
            } else if (cdafState === 'RETURN') {
               if (p > PERFECT_FOCUS) posRef.current -= CDAF_STEP * 0.5; 
               else { posRef.current = PERFECT_FOCUS; endFocus(true); return; }
            }
         } else {
            const dist = PERFECT_FOCUS - p;
            if (Math.abs(dist) < 0.5) { posRef.current = PERFECT_FOCUS; endFocus(true); return; }
            const speed = dist * 0.25; 
            const move = Math.abs(speed) < 0.5 ? 0.5 * Math.sign(dist) : speed;
            posRef.current += move;
         }
         setLensPos(posRef.current);
         animationRef.current = requestAnimationFrame(loop);
      };
      animationRef.current = requestAnimationFrame(loop);
   };

   const endFocus = (success: boolean) => {
      setIsFocusing(false);
      if (success) setLocked(true);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
   };

   useEffect(() => { return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); }; }, []);
   const contrast = getContrast(lensPos);
   const phaseShift = getPhaseOffset(lensPos);
   const blurAmount = Math.abs(lensPos - PERFECT_FOCUS) * 0.15;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative">
            <div className="relative w-full max-w-3xl aspect-[16/9] bg-black border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex">
               <div className="w-1/2 h-full border-r border-slate-800 relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?q=80&w=600" className="w-full h-full object-cover transition-all duration-75 origin-center scale-110" style={{ filter: `blur(${blurAmount}px)` }} />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                     <span className="text-[10px] font-mono text-white bg-black/50 px-1 rounded">AF-S</span>
                     {locked && <span className="text-[10px] font-mono text-white bg-green-600 px-1 rounded animate-pulse">LOCKED</span>}
                  </div>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 transition-all duration-200 ${locked ? 'border-green-500 scale-100' : 'border-white/80 scale-110'}`}>
                     <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-inherit"></div>
                     <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-inherit"></div>
                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-inherit"></div>
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-inherit"></div>
                  </div>
               </div>
               <div className="w-1/2 h-full bg-slate-900 p-4 relative flex flex-col">
                  {algo === 'CDAF' ? (
                     <>
                        <div className="flex items-center gap-2 mb-4"><LineChart size={16} className="text-orange-400"/><span className="text-xs font-bold text-orange-400">Contrast Analysis (CDAF)</span></div>
                        <div className="flex-1 bg-black/50 border border-slate-700 relative rounded overflow-hidden">
                           <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2}}></div>
                           <div className="absolute inset-0 flex items-end px-2 pb-2">
                              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                 <line x1="0" y1="0" x2="100" y2="0" stroke="#334155" strokeDasharray="4,4" strokeWidth="1" />
                                 <polyline points={contrastHistory.map((pt, i) => `${(i / 120) * 100},${100 - pt.c}`).join(' ')} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                 {contrastHistory.length > 0 && <circle cx={(contrastHistory.length / 120) * 100} cy={100 - contrast} r="3" fill="white" />}
                              </svg>
                           </div>
                           <div className="absolute top-2 right-2 text-xl font-black text-slate-600 font-mono">{Math.round(contrast)}</div>
                        </div>
                        <div className="mt-2 text-[10px] text-slate-500 leading-tight">系统必须推过峰值 (Overshoot) 才能确认最大对比度，随后回退。这就造成了可见的“呼吸”现象。</div>
                     </>
                  ) : (
                     <>
                        <div className="flex items-center gap-2 mb-4"><AlignVerticalSpaceAround size={16} className="text-emerald-400"/><span className="text-xs font-bold text-emerald-400">Phase Detection (PDAF)</span></div>
                        <div className="flex-1 flex flex-col justify-center items-center gap-4 py-4">
                           <div className="relative w-full">
                              <div className="flex justify-between text-[9px] text-slate-500 mb-1 px-1"><span>Sensor Left</span><span>Phase Δ: <span className="text-white font-mono">{phaseShift.toFixed(1)}</span></span><span>Sensor Right</span></div>
                              <div className="w-full h-16 bg-slate-950 border border-slate-700 relative overflow-hidden rounded">
                                 <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500/50 z-10"></div>
                                 <div className="absolute top-0 left-0 w-full h-1/2 border-b border-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className="flex gap-4 opacity-70" style={{ transform: `translateX(${phaseShift}px)` }}>{[...Array(10)].map((_,i) => <div key={i} className="w-2 h-8 bg-emerald-500 rounded-full blur-[1px]"></div>)}</div>
                                 </div>
                                 <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-center justify-center overflow-hidden">
                                    <div className="flex gap-4 opacity-70" style={{ transform: `translateX(${-phaseShift}px)` }}>{[...Array(10)].map((_,i) => <div key={i} className="w-2 h-8 bg-emerald-500 rounded-full blur-[1px]"></div>)}</div>
                                 </div>
                              </div>
                           </div>
                           <div className="text-center w-full">
                              <div className={`text-sm font-bold transition-colors ${Math.abs(phaseShift) < 2 ? 'text-green-400' : 'text-slate-600'}`}>{Math.abs(phaseShift) < 2 ? 'PHASE ALIGNED' : 'PHASE MISMATCH'}</div>
                              <div className="w-full h-1 bg-slate-800 mt-2 rounded overflow-hidden"><div className={`h-full transition-all duration-75 ${Math.abs(phaseShift) < 2 ? 'bg-green-500' : 'bg-slate-600'}`} style={{ width: `${Math.max(0, 100 - Math.abs(phaseShift)*3)}%`, margin: '0 auto' }}></div></div>
                           </div>
                        </div>
                        <div className="mt-auto text-[10px] text-slate-500 leading-tight">通过比较左右相位差，系统直接算出焦点的<strong>方向</strong>和<strong>距离</strong>。一步到位，无需犹豫。</div>
                     </>
                  )}
               </div>
            </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Scan size={20} className="text-cyan-400"/> 对焦算法实验室</h3>
            <div className="flex gap-2 mb-6">
               <button onClick={() => { setAlgo('CDAF'); setLocked(false); }} className={`flex-1 py-3 rounded border font-bold text-xs transition-all ${algo === 'CDAF' ? 'bg-orange-900/30 border-orange-500 text-orange-200' : 'border-slate-700 text-slate-500 hover:bg-slate-800'}`}>反差对焦 (CDAF)</button>
               <button onClick={() => { setAlgo('PDAF'); setLocked(false); }} className={`flex-1 py-3 rounded border font-bold text-xs transition-all ${algo === 'PDAF' ? 'bg-emerald-900/30 border-emerald-500 text-emerald-200' : 'border-slate-700 text-slate-500 hover:bg-slate-800'}`}>相位对焦 (PDAF)</button>
            </div>
            <div className="mb-6 bg-slate-800 p-4 rounded border border-slate-700">
               <div className="flex justify-between mb-2 text-xs text-slate-400"><span>Manual Override</span><span>{lensPos.toFixed(0)}%</span></div>
               <input type="range" min="0" max="100" step="0.1" value={lensPos} onChange={(e) => { setLensPos(Number(e.target.value)); setLocked(false); }} className="w-full accent-cyan-500 h-1 bg-slate-600 appearance-none rounded" />
            </div>
            <button onClick={startFocusing} disabled={isFocusing || locked} className={`w-full py-4 rounded font-bold mb-6 flex items-center justify-center gap-2 shadow-lg transition-all ${locked ? 'bg-green-600 text-white' : isFocusing ? 'bg-slate-700 text-slate-400 cursor-wait' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}>
               {locked ? <><Focus size={16}/> FOCUS LOCKED</> : isFocusing ? 'FOCUSING...' : 'AF-ON (半按快门)'}
            </button>
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700 space-y-4">
               {algo === 'CDAF' ? <div className="text-xs text-slate-300 leading-relaxed"><strong className="text-orange-400 block mb-1 text-sm">Contrast Detection (CDAF)</strong>原理：处理器移动镜片，寻找图像对比度最高的点。<br/><br/><span className="text-slate-500">缺点：它不知道焦点在前还是在后，必须“试错”。到达峰值后，它必须继续往前走一点（确认对比度下降了），然后再退回来。这就是肉眼可见的“拉风箱”。</span></div> : <div className="text-xs text-slate-300 leading-relaxed"><strong className="text-emerald-400 block mb-1 text-sm">Phase Detection (PDAF)</strong>原理：利用传感器上成对的遮蔽像素，模拟人眼视差。<br/><br/><span className="text-slate-500">优点：通过相位偏移量，处理器能瞬间算出焦点偏离了多少、往哪个方向偏。镜片可以直接极速运动到目标位置，无需来回确认。</span></div>}
            </div>
         </div>
      </div>
   );
}

// --- 3. Stabilization Module (Existing) ---
const StabilizationModule: React.FC = () => {
   const [mode, setMode] = useState<'OFF' | 'OIS' | 'IBIS' | 'EIS'>('OFF');
   const [shakeAmount, setShakeAmount] = useState(1);
   
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex items-center justify-center relative overflow-hidden">
            <div className="relative w-[480px] h-[320px] bg-black border-4 border-slate-700 rounded-lg overflow-hidden shadow-2xl">
               <div className="absolute top-2 right-2 text-red-500 animate-pulse text-xs font-mono z-20">REC</div>
               <div className="absolute bottom-2 left-2 text-white text-xs font-mono z-20">STAB: {mode}</div>
               {mode === 'EIS' && <div className="absolute inset-8 border-2 border-red-500/50 z-10 pointer-events-none"><span className="absolute -top-5 left-0 text-[10px] text-red-500">EIS Crop Area (10-20%)</span></div>}
               <div className="absolute inset-[-50px] bg-cover bg-center origin-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop)', animation: `shake 0.5s infinite linear`, transform: mode === 'EIS' ? 'scale(1.2)' : 'scale(1)' }}></div>
               <style>{`@keyframes shake { 0% { transform: translate(0,0) rotate(0) ${mode === 'EIS' ? 'scale(1.2)' : ''}; } 25% { transform: translate(${shakeAmount * (mode === 'OFF' ? 10 : 2)}px, ${shakeAmount * (mode === 'OFF' ? 10 : 2)}px) rotate(${mode === 'OFF' ? 1 : 0}deg) ${mode === 'EIS' ? 'scale(1.2)' : ''}; } 50% { transform: translate(-${shakeAmount * (mode === 'OFF' ? 8 : 1)}px, ${shakeAmount * (mode === 'OFF' ? 12 : 2)}px) rotate(-${mode === 'OFF' ? 1 : 0}deg) ${mode === 'EIS' ? 'scale(1.2)' : ''}; } 75% { transform: translate(${shakeAmount * (mode === 'OFF' ? 5 : 1)}px, -${shakeAmount * (mode === 'OFF' ? 5 : 1)}px) rotate(0) ${mode === 'EIS' ? 'scale(1.2)' : ''}; } 100% { transform: translate(0,0) rotate(0) ${mode === 'EIS' ? 'scale(1.2)' : ''}; } }`}</style>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50"><div className="w-8 h-8 border border-white"></div><div className="w-1 h-1 bg-white"></div></div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">机内防抖系统</h3>
            <div className="space-y-4">
               <Slider label="手抖幅度" value={shakeAmount} min={0} max={3} step={0.5} onChange={setShakeAmount} />
               <div className="space-y-2">
                  <button onClick={() => setMode('OFF')} className={`w-full p-3 rounded border text-left ${mode === 'OFF' ? 'bg-red-900/50 border-red-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-red-400 flex items-center gap-2"><BicepsFlexed size={14}/> 纯铁手 (Human Gimbal)</div><div className="text-[10px] text-slate-400">无补偿。俗称"麒麟臂"模式。适合 BMPCC 用户。</div></button>
                  <button onClick={() => setMode('OIS')} className={`w-full p-3 rounded border text-left ${mode === 'OIS' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-cyan-400 flex items-center gap-2"><Move size={12}/> OIS (镜片位移)</div><div className="text-[10px] text-slate-400">Lens Shift. 浮动镜组反向补偿。适合长焦。<br/><span className="text-emerald-500">优点：</span>取景器画面稳定。</div></button>
                  <button onClick={() => setMode('IBIS')} className={`w-full p-3 rounded border text-left ${mode === 'IBIS' ? 'bg-emerald-900/50 border-emerald-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-emerald-400 flex items-center gap-2"><Vibrate size={12}/> IBIS (传感器位移)</div><div className="text-[10px] text-slate-400">Sensor Shift. 传感器物理移动。<br/><span className="text-emerald-500">优点：</span>五轴防抖，随便什么破镜头都能抖。</div></button>
                  <button onClick={() => setMode('EIS')} className={`w-full p-3 rounded border text-left ${mode === 'EIS' ? 'bg-purple-900/50 border-purple-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-purple-400 flex items-center gap-2"><Scaling size={12}/> EIS (电子防抖)</div><div className="text-[10px] text-slate-400">Electronic. 裁切画面边缘并实时对齐。<br/><span className="text-red-400">缺点：</span>画面被裁切，画质有损失，晚上会有鬼影拖尾。</div></button>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 4. Flange Distance Module (NEW) ---
const FlangeDistanceModule: React.FC = () => {
   const [system, setSystem] = useState<'SLR' | 'MIRRORLESS'>('MIRRORLESS');
   const [lensType, setLensType] = useState<'NATIVE' | 'ADAPTED'>('NATIVE');
   
   // Constants
   const FLANGE_SLR = 44; // mm (e.g. Canon EF)
   const FLANGE_MIRRORLESS = 18; // mm (e.g. Sony E)
   
   // Logic
   // If we put an SLR lens on Mirrorless, we need an adapter (Spacer) to fill the gap.
   // If we put a Mirrorless lens on SLR, it sits too far away, cannot focus infinity (Macro only).
   
   const currentFlange = system === 'SLR' ? FLANGE_SLR : FLANGE_MIRRORLESS;
   const adapterNeeded = system === 'MIRRORLESS' && lensType === 'ADAPTED';
   const gap = adapterNeeded ? FLANGE_SLR - FLANGE_MIRRORLESS : 0;
   
   // Visual Calculation
   const sensorX = 600;
   const mountX = sensorX - currentFlange * 4; 
   const lensMountX = mountX - gap * 4;
   const lensElementX = lensMountX - 40;
   
   // Rays
   // If NATIVE on CORRECT BODY: Focus on Sensor
   // If ADAPTED on MIRRORLESS + ADAPTER: Focus on Sensor (Correct)
   // If MIRRORLESS LENS on SLR: Lens is designed for 18mm, but mount is at 44mm. Focus plane is 44-18=26mm IN FRONT of sensor. (Blurry)
   // BUT here 'ADAPTED' usually implies "SLR Lens on Mirrorless".
   // Let's simplify: 
   // Case 1: Mirrorless Body + Native Lens (18mm gap). OK.
   // Case 2: Mirrorless Body + SLR Lens (44mm design). Needs 26mm Adapter. OK.
   // Case 3: SLR Body + SLR Lens. OK.
   // Case 4: SLR Body + Mirrorless Lens. (Impossible physically usually, but if handheld). Lens is 44mm away, wants to be 18mm. Image focuses 26mm in front of sensor. Macro only.
   
   // In UI we force valid combinations mostly, or show the adapter.
   
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative">
            <div className="w-full max-w-3xl h-64 border-b border-slate-700 relative">
               {/* Sensor */}
               <div className="absolute top-10 bottom-0 w-2 bg-emerald-500 right-[100px] z-10">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-emerald-400 font-bold whitespace-nowrap">Sensor Plane</div>
               </div>
               
               {/* Camera Body Box */}
               <div className="absolute top-20 bottom-0 right-[100px] bg-slate-800 border-l border-t border-b border-slate-600"
                    style={{ width: `${currentFlange * 4}px` }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs text-center">
                     {system === 'SLR' ? 'Mirror Box' : 'Empty Air'}
                     <br/>
                     {currentFlange}mm
                  </div>
               </div>

               {/* Mount Line */}
               <div className="absolute top-16 bottom-0 w-1 bg-white" style={{ right: `${100 + currentFlange * 4}px` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap">Mount</div>
               </div>

               {/* Adapter (If needed) */}
               {adapterNeeded && (
                  <div className="absolute top-24 bottom-24 bg-zinc-700 border border-zinc-500 flex items-center justify-center"
                       style={{ right: `${100 + currentFlange * 4}px`, width: `${gap * 4}px` }}>
                     <div className="text-[10px] text-white rotate-90 whitespace-nowrap">Adapter ({gap}mm)</div>
                  </div>
               )}

               {/* Lens */}
               <div className="absolute top-10 bottom-10 bg-black border border-slate-500 rounded-l-lg flex items-center justify-center"
                    style={{ right: `${100 + currentFlange * 4 + gap * 4}px`, width: '120px' }}>
                  <div className="text-xs text-slate-300 text-center">
                     {lensType === 'NATIVE' && system === 'MIRRORLESS' ? 'E-Mount Lens' : 'EF-Mount Lens'}
                     <br/>
                     (Design: {lensType === 'NATIVE' && system === 'MIRRORLESS' ? '18mm' : '44mm'})
                  </div>
                  {/* Glass element */}
                  <div className="absolute w-4 h-32 bg-blue-500/30 rounded-full blur-[2px]"></div>
               </div>

               {/* Light Rays */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 5}}>
                  {/* Rays converge from lens to sensor */}
                  <path d={`M ${sensorX - (currentFlange + gap + 30)*4} 80 L ${sensorX} 128`} stroke="yellow" strokeWidth="2" opacity="0.5" />
                  <path d={`M ${sensorX - (currentFlange + gap + 30)*4} 176 L ${sensorX} 128`} stroke="yellow" strokeWidth="2" opacity="0.5" />
               </svg>

            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Ruler size={20} className="text-cyan-400"/> 法兰距 (Flange Distance)
            </h3>

            <div className="space-y-6">
               <div>
                  <label className="text-xs text-slate-400 mb-2 block">机身类型 (Body System)</label>
                  <div className="flex gap-2">
                     <button onClick={() => {setSystem('MIRRORLESS'); setLensType('NATIVE')}} className={`flex-1 p-3 rounded border text-xs font-bold ${system === 'MIRRORLESS' ? 'bg-slate-700 border-cyan-500 text-white' : 'border-slate-700 text-slate-500'}`}>无反 (Sony E)</button>
                     <button onClick={() => {setSystem('SLR'); setLensType('ADAPTED')}} className={`flex-1 p-3 rounded border text-xs font-bold ${system === 'SLR' ? 'bg-slate-700 border-cyan-500 text-white' : 'border-slate-700 text-slate-500'}`}>单反 (Canon EF)</button>
                  </div>
               </div>

               <div>
                  <label className="text-xs text-slate-400 mb-2 block">镜头选择 (Lens)</label>
                  <div className="flex gap-2">
                     <button 
                        onClick={() => setLensType('NATIVE')} 
                        disabled={system === 'SLR'} // Can't put E lens on EF body easily in reality without optics
                        className={`flex-1 p-3 rounded border text-xs font-bold ${lensType === 'NATIVE' ? 'bg-slate-700 border-emerald-500 text-white' : 'border-slate-700 text-slate-500'} ${system === 'SLR' ? 'opacity-30 cursor-not-allowed' : ''}`}
                     >
                        原生短法兰镜头
                     </button>
                     <button 
                        onClick={() => setLensType('ADAPTED')} 
                        className={`flex-1 p-3 rounded border text-xs font-bold ${lensType === 'ADAPTED' ? 'bg-slate-700 border-emerald-500 text-white' : 'border-slate-700 text-slate-500'}`}
                     >
                        单反长法兰镜头
                     </button>
                  </div>
               </div>

               <div className="bg-slate-800 p-4 rounded border border-slate-700 text-[10px] leading-relaxed text-slate-300">
                  <span className="font-bold text-white block mb-2">万能数码后背原理：</span>
                  无反相机法兰距极短（如 Sony E 口仅 18mm）。
                  <br/><br/>
                  单反镜头设计法兰距较长（如 Canon EF 为 44mm）。
                  <br/><br/>
                  两者差值：44 - 18 = 26mm。
                  <br/>
                  这就是为什么无反相机可以通过一个 26mm 厚的“空心管子”（转接环）完美转接单反镜头。
                  <br/><br/>
                  <span className="text-red-400">反之不行：</span> 单反机身无法直接转接无反镜头，因为镜头插不进机身内部（会打板），或者像场无法覆盖传感器。
               </div>
            </div>
         </div>
      </div>
   );
};
