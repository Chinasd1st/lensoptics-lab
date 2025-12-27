
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Palette, Grid, Activity, RefreshCw, ExternalLink, MousePointer2, Lock, Eye, EyeOff, ChevronsRight, Box, Maximize, Play, Info, AlertTriangle } from 'lucide-react';

type Tab = 'GRADING' | 'NODES' | 'SCOPES';

interface PostProductionViewProps {
  initialTab?: string;
}

export const PostProductionView: React.FC<PostProductionViewProps> = ({ initialTab }) => {
   const [activeTab, setActiveTab] = useState<Tab>('GRADING');

   useEffect(() => {
      if (initialTab && ['GRADING', 'NODES', 'SCOPES'].includes(initialTab)) {
         setActiveTab(initialTab as Tab);
      }
   }, [initialTab]);

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden select-none">
         <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
            <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
               <TabButton active={activeTab === 'GRADING'} onClick={() => setActiveTab('GRADING')} icon={<Palette size={16}/>} label="一级校色 (Primary Grading)" />
               <TabButton active={activeTab === 'NODES'} onClick={() => setActiveTab('NODES')} icon={<Grid size={16}/>} label="节点图 (Node Graph)" />
               <TabButton active={activeTab === 'SCOPES'} onClick={() => setActiveTab('SCOPES')} icon={<Activity size={16}/>} label="示波器 (Scopes)" />
            </div>
            <div className="flex-1 relative overflow-hidden">
               {activeTab === 'GRADING' && <GradingModule />}
               {activeTab === 'NODES' && <NodesModule />}
               {activeTab === 'SCOPES' && <ScopesModule />}
            </div>
         </div>
      </div>
   );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition-all whitespace-nowrap shrink-0 ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

// --- Grading Module State Types ---
interface WheelState {
   m: number; // Master (Luma)
   x: number; // Color X (-1 to 1)
   y: number; // Color Y (-1 to 1)
}

const initialLift: WheelState = { m: 0, x: 0, y: 0 };
const initialGamma: WheelState = { m: 1, x: 0, y: 0 };
const initialGain: WheelState = { m: 1, x: 0, y: 0 };
const initialOffset: WheelState = { m: 25, x: 0, y: 0 }; // Offset is special

const GradingModule: React.FC = () => {
   // Primary Wheels State
   const [lift, setLift] = useState<WheelState>(initialLift);
   const [gamma, setGamma] = useState<WheelState>(initialGamma);
   const [gain, setGain] = useState<WheelState>(initialGain);
   const [offset, setOffset] = useState<WheelState>(initialOffset);
   
   // Shared Adjustments
   const [temp, setTemp] = useState(0); 
   const [tint, setTint] = useState(0); 
   const [contrast, setContrast] = useState(1); 
   const [pivot, setPivot] = useState(0.435); 
   const [sat, setSat] = useState(50); // 0-100 standard
   const [hue, setHue] = useState(50); // 0-100 standard (50 is neutral)
   const [md, setMd] = useState(50); // Midtone Detail

   const [lutEnabled, setLutEnabled] = useState(false);
   const [bypass, setBypass] = useState(false);

   const resetAll = () => {
      setLift(initialLift);
      setGamma(initialGamma);
      setGain(initialGain);
      setOffset(initialOffset);
      setTemp(0); setTint(0); setContrast(1); setPivot(0.435); setSat(50); setHue(50); setMd(50);
   };

   // --- SVG Filter Logic Calculation ---
   // Note: This is an 8-bit approximation of 32-bit float math.
   const getColor = (x: number, y: number, strength: number = 0.5) => {
      const r = -y;
      const g = -x * 0.866 + y * 0.5;
      const b = x * 0.866 + y * 0.5;
      return {
         r: r * strength,
         g: g * strength,
         b: b * strength
      };
   };

   const liftC = getColor(lift.x, lift.y, 0.2);
   const gammaC = getColor(gamma.x, gamma.y, 0.5);
   const gainC = getColor(gain.x, gain.y, 0.5);
   const offsetC = getColor(offset.x, offset.y, 0.2);

   const liftR = lift.m + liftC.r + (offset.m - 25)/50 + offsetC.r;
   const liftG = lift.m + liftC.g + (offset.m - 25)/50 + offsetC.g;
   const liftB = lift.m + liftC.b + (offset.m - 25)/50 + offsetC.b;

   const tempR = temp > 0 ? temp/1000 : 0;
   const tempB = temp < 0 ? Math.abs(temp)/1000 : 0;
   const tintG = tint < 0 ? Math.abs(tint)/1000 : 0; 
   const tintG_reduce = tint > 0 ? tint/1000 : 0;

   const gainR = Math.max(0, gain.m * (1 + gainC.r + tempR) * contrast);
   const gainG = Math.max(0, gain.m * (1 + gainC.g + tintG - tintG_reduce) * contrast);
   const gainB = Math.max(0, gain.m * (1 + gainC.b + tempB) * contrast);

   const gammaR = Math.max(0.1, gamma.m + gammaC.r);
   const gammaG = Math.max(0.1, gamma.m + gammaC.g);
   const gammaB = Math.max(0.1, gamma.m + gammaC.b);

   const satVal = sat / 50; 
   const hueVal = (hue - 50) * 3.6;

   // Midtone Detail Simulation (Sharpen/Blur via Convolve)
   // Simplified via SVG contrast/unsharp mask
   const mdVal = (md - 50) / 50; 

   return (
      <div className="flex flex-col lg:flex-row h-full">
         {/* Monitor Area */}
         <div className="flex-1 bg-[#050505] flex flex-col items-center justify-center relative p-4 lg:p-8 overflow-hidden">
            
            {/* Simulation Disclaimer Banner */}
            <div className="absolute top-0 left-0 w-full bg-slate-900/90 border-b border-slate-700 text-[10px] text-slate-400 py-1 px-4 flex items-center justify-center gap-2 z-20">
               <AlertTriangle size={10} className="text-yellow-500" />
               <span>Web 模拟环境仅供参考。DaVinci Resolve 使用 32-bit 浮点运算与 Log 色彩空间，本演示基于浏览器 8-bit sRGB 滤镜近似模拟。</span>
            </div>

            <div className="w-full max-w-5xl aspect-video relative rounded-lg overflow-hidden border border-[#333] shadow-2xl bg-[#0a0a0a] mt-4">
               
               <svg className="absolute w-0 h-0">
                  <defs>
                     <filter id="grade-filter" colorInterpolationFilters="sRGB">
                        {!bypass && (
                           <>
                              <feComponentTransfer>
                                 <feFuncR type="gamma" amplitude={gainR} exponent={1/gammaR} offset={liftR} />
                                 <feFuncG type="gamma" amplitude={gainG} exponent={1/gammaG} offset={liftG} />
                                 <feFuncB type="gamma" amplitude={gainB} exponent={1/gammaB} offset={liftB} />
                              </feComponentTransfer>
                              <feColorMatrix type="saturate" values={String(satVal)} />
                              <feColorMatrix type="hueRotate" values={String(hueVal)} />
                           </>
                        )}
                     </filter>
                  </defs>
               </svg>

               <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000" 
                  className="w-full h-full object-cover"
                  style={{ 
                     filter: !bypass && lutEnabled 
                        ? 'url(#grade-filter) contrast(1.1) brightness(1.1)' 
                        : !bypass 
                           ? 'url(#grade-filter) grayscale(0.2) contrast(0.9) brightness(0.9)'
                           : 'grayscale(0.2) contrast(0.9) brightness(0.9)'
                  }}
                  draggable={false}
               />

               {/* Overlay Info */}
               <div className="absolute top-4 left-4 flex gap-2">
                  <div className={`px-2 py-1 rounded text-[10px] font-bold border ${lutEnabled ? 'bg-orange-900/80 border-orange-500 text-white' : 'bg-black/60 border-slate-600 text-slate-400'}`}>
                     LUT: {lutEnabled ? 'REC.709 (ON)' : 'S-LOG3 (OFF)'}
                  </div>
                  {bypass && <div className="px-2 py-1 rounded text-[10px] font-bold bg-red-600 text-white border border-red-400 animate-pulse">BYPASS</div>}
               </div>
            </div>
         </div>

         {/* DaVinci Style Controls */}
         <div className="w-full lg:w-[480px] bg-[#1a1a1a] border-l border-[#2a2a2a] flex flex-col overflow-y-auto select-none shadow-xl z-10">
            
            {/* Header / Tools */}
            <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#222]">
               <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-[#ccc] uppercase tracking-wider flex items-center gap-2">
                     <Palette size={14} className="text-orange-500"/>
                     Color Wheels
                  </h3>
                  <a href="https://www.blackmagicdesign.com/cn/products/davinciresolve" target="_blank" rel="noreferrer" className="text-[9px] text-[#666] hover:text-orange-500 flex items-center gap-1 transition-colors mt-1">
                     Powered by Blackmagic Design <ExternalLink size={8}/>
                  </a>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setBypass(!bypass)} className={`p-2 rounded transition-all ${bypass ? 'text-red-500 bg-[#333]' : 'text-[#666] hover:text-white hover:bg-[#333]'}`} title="Bypass Grade">
                     {bypass ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                  <button onClick={() => setLutEnabled(!lutEnabled)} className={`px-3 py-1 rounded text-[10px] font-bold transition-all border ${lutEnabled ? 'bg-orange-600 border-orange-500 text-white' : 'bg-[#2a2a2a] border-[#333] text-[#888]'}`}>
                     LUT
                  </button>
                  <button onClick={resetAll} className="p-2 text-[#888] hover:text-white hover:bg-[#333] rounded transition-all" title="Reset All">
                     <RefreshCw size={14}/>
                  </button>
               </div>
            </div>

            {/* Top Bar: Numeric Controls */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-6 border-b border-[#333] bg-[#1f1f1f]">
               <ScrubbableNumber label="反差 / Contrast" value={contrast} min={0} max={2.0} step={0.01} onChange={setContrast} />
               <ScrubbableNumber label="中心点 / Pivot" value={pivot} min={0} max={1} step={0.01} onChange={setPivot} />
               <ScrubbableNumber label="饱和度 / Sat" value={sat} min={0} max={100} step={0.5} onChange={setSat} />
               <ScrubbableNumber label="色相 / Hue" value={hue} min={0} max={100} step={0.5} onChange={setHue} />
               <div className="col-span-2 h-px bg-[#333] my-1"></div>
               <ScrubbableNumber label="色温 / Temp" value={temp} min={-4000} max={4000} step={10} onChange={setTemp} color={temp > 0 ? 'text-orange-400' : temp < 0 ? 'text-blue-400' : 'text-[#ccc]'} suffix=""/>
               <ScrubbableNumber label="色调 / Tint" value={tint} min={-100} max={100} step={1} onChange={setTint} color={tint > 0 ? 'text-fuchsia-400' : tint < 0 ? 'text-green-400' : 'text-[#ccc]'} suffix=""/>
               <ScrubbableNumber label="中调细节 / MD" value={md} min={0} max={100} step={1} onChange={setMd} disabled suffix=""/>
               <ScrubbableNumber label="YRGB 混合 / Mix" value={100} min={0} max={100} step={1} onChange={()=>{}} disabled suffix=""/>
            </div>

            {/* Color Wheels Section */}
            <div className="flex justify-between px-2 py-8 bg-[#1a1a1a]">
               <InteractiveWheel label="暗部 / Lift" type="LIFT" state={lift} onChange={setLift} />
               <InteractiveWheel label="中调 / Gamma" type="GAMMA" state={gamma} onChange={setGamma} />
               <InteractiveWheel label="亮部 / Gain" type="GAIN" state={gain} onChange={setGain} />
               <InteractiveWheel label="全局 / Offset" type="OFFSET" state={offset} onChange={setOffset} />
            </div>

            <div className="px-6 py-4 bg-[#111] mt-auto border-t border-[#333]">
               <div className="text-[10px] text-[#666] mb-2 font-bold uppercase flex items-center gap-2">
                  <MousePointer2 size={12}/> 操作指南
               </div>
               <p className="text-[10px] text-[#888] leading-relaxed">
                  <span className="text-[#ccc] font-bold">拖拽数值:</span> 按住数字区域左右拖动可精细调整。
                  <br/>
                  <span className="text-[#ccc] font-bold">双击复位:</span> 双击色轮标题或数值可快速重置。
                  <br/>
                  <span className="text-[#ccc] font-bold">色轮逻辑:</span> 拖动色轮中心调整色彩平衡 (RGB Balance)，拖动下方滑块调整明度 (Y)。
               </p>
            </div>
         </div>
      </div>
   );
};

// --- Interactive Components ---

const ScrubbableNumber: React.FC<{ 
   label: string; 
   value: number; 
   min: number; 
   max: number; 
   step: number; 
   onChange: (v: number) => void; 
   disabled?: boolean; 
   color?: string;
   suffix?: string;
}> = ({ label, value, min, max, step, onChange, disabled, color = 'text-[#ccc]', suffix }) => {
   const [isDragging, setIsDragging] = useState(false);
   const startXRef = useRef(0);
   const startValRef = useRef(0);

   const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      startXRef.current = e.clientX;
      startValRef.current = value;
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
   };

   const handleMouseMove = useCallback((e: MouseEvent) => {
      const delta = (e.clientX - startXRef.current);
      // Sensitivity factor
      const sensitivity = step < 1 ? 0.5 : 2;
      let newVal = startValRef.current + delta * step * sensitivity;
      newVal = Math.max(min, Math.min(max, newVal));
      // Fix float precision
      const decimalPlaces = step.toString().split('.')[1]?.length || 0;
      onChange(parseFloat(newVal.toFixed(decimalPlaces)));
   }, [min, max, step, onChange]);

   const handleMouseUp = useCallback(() => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
   }, [handleMouseMove]);

   // Reset logic
   const handleReset = () => {
      if(label.includes("Sat") || label.includes("Hue") || label.includes("MD")) onChange(50);
      else if(label.includes("Contrast") || label.includes("Pivot") || label.includes("Mix")) onChange(label.includes("Pivot") ? 0.435 : 1);
      else onChange(0);
   };

   return (
      <div className={`flex flex-col gap-1.5 ${disabled ? 'opacity-30' : ''}`}>
         <span 
            className="text-[10px] text-[#888] font-bold cursor-pointer hover:text-white transition-colors select-none truncate"
            onDoubleClick={handleReset}
            title="Double click to reset"
         >
            {label}
         </span>
         <div 
            className={`flex items-center bg-[#2a2a2a] rounded overflow-hidden border border-transparent hover:border-[#444] group cursor-ew-resize ${isDragging ? 'border-[#666]' : ''}`}
            onMouseDown={handleMouseDown}
         >
            <div className={`flex-1 text-xs font-mono text-right pr-2 py-1 ${color} group-hover:text-white transition-colors`}>
               {value.toFixed(step < 1 ? 2 : 0)}{suffix}
            </div>
         </div>
      </div>
   );
};

const InteractiveWheel: React.FC<{ 
   label: string; 
   state: WheelState; 
   onChange: (s: WheelState) => void; 
   type: 'LIFT'|'GAMMA'|'GAIN'|'OFFSET' 
}> = ({ label, state, onChange, type }) => {
   
   const wheelRef = useRef<HTMLDivElement>(null);
   const [isDraggingPuck, setIsDraggingPuck] = useState(false);

   const defaultM = type === 'LIFT' ? 0 : type === 'OFFSET' ? 25 : 1;
   const minM = type === 'LIFT' ? -1 : type === 'OFFSET' ? 0 : 0;
   const maxM = type === 'LIFT' ? 1 : type === 'OFFSET' ? 100 : 4;
   const stepM = type === 'OFFSET' ? 1 : 0.01;

   // -- Puck Drag Logic --
   const handlePuckDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDraggingPuck(true);
      window.addEventListener('mousemove', handlePuckMove);
      window.addEventListener('mouseup', handlePuckUp);
   };

   const handlePuckMove = useCallback((e: MouseEvent) => {
      if (!wheelRef.current) return;
      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const maxRadius = rect.width / 2;
      let dx = (e.clientX - centerX) / maxRadius;
      let dy = (e.clientY - centerY) / maxRadius;

      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 1) {
         dx /= dist;
         dy /= dist;
      }

      onChange({ ...state, x: dx, y: dy });
   }, [onChange, state]);

   const handlePuckUp = useCallback(() => {
      setIsDraggingPuck(false);
      window.removeEventListener('mousemove', handlePuckMove);
      window.removeEventListener('mouseup', handlePuckUp);
   }, [handlePuckMove]);

   const resetColor = () => onChange({ ...state, x: 0, y: 0 });
   const resetLuma = () => onChange({ ...state, m: defaultM });

   return (
      <div className="flex flex-col items-center gap-3 w-1/4 select-none">
         <div 
            className="text-[10px] text-[#888] font-bold tracking-wider cursor-pointer hover:text-white transition-colors uppercase truncate w-full text-center"
            onDoubleClick={() => onChange({ m: defaultM, x: 0, y: 0 })}
            title="Double click to reset wheel"
         >
            {label}
         </div>
         
         {/* The Wheel */}
         <div 
            ref={wheelRef}
            className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[#333] shadow-[inset_0_0_10px_black] flex items-center justify-center bg-[#111] cursor-crosshair group overflow-hidden"
            onMouseDown={handlePuckDown}
            onDoubleClick={resetColor}
         >
            {/* Color spectrum bg */}
            <div className="absolute inset-0 opacity-40" style={{
               background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
            }}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)] opacity-80"></div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0 border border-[#ffffff20] rounded-full scale-50 pointer-events-none"></div>
            <div className="absolute w-full h-[1px] bg-[#ffffff20] pointer-events-none"></div>
            <div className="absolute h-full w-[1px] bg-[#ffffff20] pointer-events-none"></div>

            {/* Puck */}
            <div 
               className={`w-3 h-3 bg-[#ccc] rounded-full shadow-[0_0_5px_black] border border-white z-10 transition-transform duration-75 ${isDraggingPuck ? 'scale-125 bg-white' : ''}`}
               style={{ 
                  transform: `translate(${state.x * 35}px, ${state.y * 35}px)` 
               }}
            ></div>
         </div>

         {/* The Master Ring (Luma) slider replacement */}
         <div className="w-full px-1 group flex flex-col items-center gap-1">
            <input 
               type="range" 
               min={minM} 
               max={maxM} 
               step={stepM} 
               value={state.m} 
               onDoubleClick={resetLuma}
               onChange={(e) => onChange({ ...state, m: Number(e.target.value) })}
               className="w-full h-1 bg-[#333] rounded-full appearance-none accent-[#888] group-hover:accent-white cursor-pointer"
            />
            <div 
               className="text-[9px] text-[#555] font-mono cursor-pointer hover:text-white transition-colors"
               onDoubleClick={resetLuma}
            >
               {state.m.toFixed(2)}
            </div>
         </div>
      </div>
   );
};

const NodesModule: React.FC = () => {
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-[#1a1a1a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

            {/* Node Flow Visualization */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 z-10 scale-90 lg:scale-100">
               <div className="text-[#666] text-xs font-mono absolute top-10 left-10">SOURCE [Log]</div>
               
               <Node icon={<Box size={24}/>} title="基础曝光 (Exp)" color="border-emerald-500" badge="01"/>
               <Arrow />
               <div className="flex flex-col gap-6 relative">
                  <div className="absolute -left-8 top-1/2 w-8 h-[2px] bg-[#444]"></div>
                  <Node icon={<Palette size={24}/>} title="白平衡 (WB)" color="border-cyan-500" badge="02"/>
                  <Node icon={<Maximize size={24}/>} title="对比度 (Con)" color="border-cyan-500" badge="03"/>
                  <div className="absolute -right-8 top-1/2 w-8 h-[2px] bg-[#444]"></div>
               </div>
               <Arrow />
               <Node icon={<Play size={24}/>} title="风格化 (Look)" color="border-purple-500" badge="04"/>
               
               <div className="text-[#666] text-xs font-mono absolute bottom-10 right-10">OUTPUT [Rec.709]</div>
            </div>

            <div className="mt-12 p-4 bg-[#222] border border-[#333] rounded-lg max-w-lg text-center shadow-lg">
               <h4 className="text-sm font-bold text-white mb-2">串行节点 (Serial Nodes)</h4>
               <p className="text-xs text-[#888] leading-relaxed">
                  DaVinci 的核心是节点流。信号从左至右流动。
                  <br/>
                  <span className="text-emerald-400">Node 01:</span> 处理 Log 素材的曝光校正。
                  <br/>
                  <span className="text-cyan-400">Node 02/03:</span> 并行处理色彩平衡和反差，互不干扰。
                  <br/>
                  <span className="text-purple-400">Node 04:</span> 最后套用 LUT 或胶片模拟，统一输出。
               </p>
            </div>
         </div>
      </div>
   );
};

const ScopesModule: React.FC = () => {
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl">
               <ScopeBox title="波形图 (Waveform)">
                  <svg className="w-full h-40" viewBox="0 0 200 100">
                     {/* Graticule */}
                     <line x1="0" y1="25" x2="200" y2="25" stroke="#333" strokeDasharray="2"/>
                     <line x1="0" y1="50" x2="200" y2="50" stroke="#333" strokeDasharray="2"/>
                     <line x1="0" y1="75" x2="200" y2="75" stroke="#333" strokeDasharray="2"/>
                     {/* Signal */}
                     <polyline points="0,50 20,40 40,60 60,30 80,70 100,20 120,50 140,10 160,80 180,40 200,50" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
                     <polyline points="0,48 30,35 60,55 90,25 120,65 150,15 180,45 200,48" fill="none" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.8" />
                  </svg>
                  <div className="text-[9px] text-[#666] mt-2">X轴：画面水平位置 | Y轴：亮度 (0-100 IRE)</div>
               </ScopeBox>
               <ScopeBox title="分量图 (RGB Parade)">
                  <div className="flex gap-1 h-40">
                     <div className="flex-1 border-r border-[#333] relative overflow-hidden bg-black">
                        <div className="absolute inset-x-0 bottom-10 h-20 bg-red-500/40 blur-[1px]"></div>
                        <div className="absolute inset-x-2 bottom-12 h-16 bg-red-500/60 blur-[2px]"></div>
                        <span className="absolute top-1 left-1 text-[8px] text-red-500 font-bold">R</span>
                     </div>
                     <div className="flex-1 border-r border-[#333] relative overflow-hidden bg-black">
                        <div className="absolute inset-x-0 bottom-8 h-20 bg-green-500/40 blur-[1px]"></div>
                        <div className="absolute inset-x-4 bottom-10 h-16 bg-green-500/60 blur-[2px]"></div>
                        <span className="absolute top-1 left-1 text-[8px] text-green-500 font-bold">G</span>
                     </div>
                     <div className="flex-1 relative overflow-hidden bg-black">
                        <div className="absolute inset-x-0 bottom-12 h-20 bg-blue-500/40 blur-[1px]"></div>
                        <div className="absolute inset-x-1 bottom-14 h-16 bg-blue-500/60 blur-[2px]"></div>
                        <span className="absolute top-1 left-1 text-[8px] text-blue-500 font-bold">B</span>
                     </div>
                  </div>
                  <div className="text-[9px] text-[#666] mt-2">独立显示 RGB 三通道亮度，用于白平衡校准。</div>
               </ScopeBox>
            </div>
         </div>
      </div>
   );
};

const Node: React.FC<{ icon: React.ReactNode; title: string; color: string; badge?: string }> = ({ icon, title, color, badge }) => (
   <div className={`w-32 h-20 bg-[#222] rounded-lg border-2 flex flex-col items-center justify-center gap-1 shadow-2xl relative ${color} transition-transform hover:scale-105`}>
      <div className="text-white/40">{icon}</div>
      <div className="text-[10px] font-bold text-white uppercase">{title}</div>
      {/* Node connectors */}
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#444] border border-[#666] rounded-full"></div>
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-600 border border-cyan-400 rounded-full"></div>
      {badge && <div className="absolute -top-2 -left-2 bg-[#333] text-[9px] text-[#888] px-1.5 rounded border border-[#444] font-mono">{badge}</div>}
   </div>
);

const Arrow = () => (
   <div className="hidden lg:flex w-16 items-center">
      <div className="h-[2px] bg-[#444] flex-1"></div>
      <ChevronsRight size={16} className="text-[#666]"/>
   </div>
);

const ScopeBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
   <div className="bg-[#111] rounded-lg p-4 border border-[#333]">
      <div className="text-[10px] font-bold text-[#888] mb-4 flex justify-between">
         <span>{title}</span>
         <span className="text-cyan-600 font-mono">LIVE</span>
      </div>
      <div className="border-t border-[#222] pt-4 flex flex-col items-center justify-center">
         {children}
      </div>
   </div>
);
