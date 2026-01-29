
import React, { useState, useEffect, useRef } from 'react';
import { Slider, Select } from '../Controls';
import { Sun, BoxSelect, ScanLine, Target, Camera, Aperture, Timer, Activity, Lock } from 'lucide-react';

// --- Constants (Magic Numbers Extraction) ---
const CONSTANTS = {
   BASE_ISO: 100,
   MAX_ISO: 12800,
   BASE_SHUTTER: 50, // 1/50s
   BASE_APERTURE: 2.8,
   TARGET_EV: 13,
   ROLLING_SHUTTER_SCANLINES: 50,
   SENSOR_ASPECT_RATIO: 3/2,
   FULL_FRAME_DIAGONAL: 43.2, // mm
};

// --- Exposure Triangle Simulator ---
export const ExposureModule: React.FC = () => {
  const [iso, setIso] = useState(800);
  const [shutter, setShutter] = useState(CONSTANTS.BASE_SHUTTER);
  const [aperture, setAperture] = useState(CONSTANTS.BASE_APERTURE);

  // EV Calculation: EV = log2(N^2 / t) - log2(ISO/100)
  // Simplified relative brightness calculation
  const baseEv = Math.log2((CONSTANTS.BASE_APERTURE**2) / (1/CONSTANTS.BASE_SHUTTER));
  const currentEv = Math.log2((aperture**2) / (1/shutter));
  const isoGain = Math.log2(iso / CONSTANTS.BASE_ISO);
  
  // Total EV difference relative to a "Standard Scene"
  const evDiff = (baseEv - currentEv) + isoGain; // Inverted logic for intuitive "Brighter" result
  
  // Clamp brightness for visual display
  const brightness = Math.min(2.5, Math.max(0.1, 1 * Math.pow(2, evDiff - 3))); // -3 to center the visual at reasonable exposure

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center">
         <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-200 ease-out" 
            style={{ 
               backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)', 
               filter: `brightness(${brightness})` 
            }}
         ></div>
         
         {/* HUD Overlay */}
         <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-lg border border-slate-700 text-white shadow-xl">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Exposure Value</div>
            <div className={`text-xl font-mono font-bold ${Math.abs(evDiff - 3) > 2 ? 'text-red-400' : 'text-emerald-400'}`}>
               {evDiff > 3 ? '+' : ''}{(evDiff - 3).toFixed(1)} EV
            </div>
         </div>
      </div>
      
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2"><Sun size={18} className="text-orange-400"/> 曝光三要素</h3>
        <div className="space-y-6">
           <Slider label="ISO 感光度" value={iso} min={100} max={12800} step={100} onChange={setIso} />
           <Slider label="快门 (1/X)" value={shutter} min={1} max={2000} step={10} onChange={setShutter} />
           <Slider label="光圈 (f/X)" value={aperture} min={1.2} max={22} step={0.1} onChange={setAperture} />
        </div>
        <div className="mt-auto pt-6 text-[10px] text-slate-500 leading-relaxed">
           <p><strong>互易律：</strong> 增加一档 ISO (x2) 等同于 减慢一档快门 (x2) 或 开大一档光圈 (f值 ÷ 1.4)。</p>
        </div>
      </div>
    </div>
  );
};

// --- Metering / Gray Card ---
export const GrayCardModule: React.FC = () => {
  const [scene, setScene] = useState<'SNOW' | 'GRAY' | 'COAL'>('GRAY');
  const [meteringMode, setMeteringMode] = useState<'MULTI' | 'CENTER' | 'SPOT' | 'HIGHLIGHT'>('MULTI');
  const [comp, setComp] = useState(0);
  
  const reflectance = scene === 'SNOW' ? 0.9 : scene === 'COAL' ? 0.05 : 0.18;
  const autoExposureFactor = 0.18 / reflectance; // Camera tries to make everything 18% gray
  const userCompensation = Math.pow(2, comp);
  const finalLinearValue = reflectance * autoExposureFactor * userCompensation;
  
  // Gamma correction for display (Linear -> sRGB approx 2.2)
  const displayVal = Math.min(255, Math.max(0, Math.pow(finalLinearValue, 1/2.2) * 255));
  const histPos = Math.min(100, Math.max(0, (displayVal / 255) * 100));

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex flex-col items-center justify-center p-4 lg:p-8 relative overflow-hidden">
         <div className="w-full max-w-sm aspect-square border-8 border-slate-800 bg-[#111] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden rounded-lg">
            {/* Main Render Area */}
            <div className="absolute inset-0 transition-colors duration-500 ease-out" style={{ backgroundColor: `rgb(${displayVal},${displayVal},${displayVal})` }}></div>
            
            {/* Metering Overlays */}
            <div className="absolute inset-0 pointer-events-none">
               {meteringMode === 'MULTI' && (
                  <div className="w-full h-full grid grid-cols-6 grid-rows-4">
                     {[...Array(24)].map((_,i) => <div key={i} className="border border-green-500/20 bg-green-500/5"></div>)}
                  </div>
               )}
               {meteringMode === 'CENTER' && (
                  <div className="w-full h-full flex items-center justify-center">
                     <div className="w-2/3 h-2/3 rounded-full border-2 border-green-500/50 bg-green-500/10 blur-xl"></div>
                  </div>
               )}
               {meteringMode === 'SPOT' && (
                  <div className="w-full h-full flex items-center justify-center">
                     <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center">
                        <div className="w-1 h-1 bg-green-500"></div>
                     </div>
                  </div>
               )}
               {meteringMode === 'HIGHLIGHT' && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-900/80 px-2 py-1 rounded text-[10px] text-red-200 border border-red-500/50">
                     <Lock size={10}/> Highlight Priority
                  </div>
               )}
            </div>

            {/* Histogram Mini-HUD */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-sm border-t border-slate-700 flex flex-col justify-center px-4">
               <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] transition-all duration-300" style={{ left: `${histPos}%` }}></div>
                  <div className="absolute top-0 bottom-0 left-[46%] w-0.5 bg-green-500/50"></div> {/* 18% Mark */}
               </div>
               <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-mono">
                  <span>0 (Black)</span>
                  <span className="text-green-500">18% (Middle)</span>
                  <span>100 (White)</span>
               </div>
            </div>
         </div>
      </div>

      <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Target size={18} className="text-cyan-400"/> 测光与灰卡</h3>
        
        <div className="space-y-6">
           <div>
              <div className="text-xs font-bold text-slate-400 mb-2">测光模式</div>
              <div className="grid grid-cols-2 gap-2">
                 {['MULTI', 'CENTER', 'SPOT', 'HIGHLIGHT'].map(m => (
                    <button key={m} onClick={()=>setMeteringMode(m as any)} className={`p-2 rounded border text-[10px] font-bold transition-all ${meteringMode===m ? 'bg-cyan-900/50 border-cyan-500 text-white' : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>
                       {m}
                    </button>
                 ))}
              </div>
           </div>

           <div>
              <div className="text-xs font-bold text-slate-400 mb-2">拍摄对象材质</div>
              <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
                 {['SNOW', 'GRAY', 'COAL'].map(s => (
                    <button key={s} onClick={() => setScene(s as any)} className={`flex-1 py-2 text-[10px] rounded font-bold transition-all ${scene === s ? 'bg-slate-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>
                       {s === 'SNOW' ? '白雪 (90%)' : s === 'COAL' ? '煤炭 (5%)' : '灰卡 (18%)'}
                    </button>
                 ))}
              </div>
           </div>

           <Slider label="曝光补偿 (EV)" value={comp} min={-3} max={3} step={0.5} onChange={setComp} unit=" EV" />
        </div>
        
        <div className="mt-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
           <h4 className="text-xs font-bold text-cyan-400 mb-2">为什么拍雪会变灰？</h4>
           <p className="text-[10px] text-slate-400 leading-relaxed">
              相机的测光表是“傻”的，它默认把看到的一切都还原为 <span className="text-white">18% 中性灰</span>。
              <br/>看到白雪（太亮），它以为过曝了，就压暗（欠曝）。
              <br/>看到煤炭（太暗），它以为欠曝了，就提亮（过曝）。
              <br/><br/>
              <strong>口诀：</strong> 白加黑减。
           </p>
        </div>
      </div>
    </div>
  );
};

// --- Sensor Size (Fixed Layout Overflow) ---
export const SensorSizeModule: React.FC = () => {
  const [format, setFormat] = useState<'FF' | 'APSC' | 'M43'>('FF');
  const specs = { 
     'FF': { crop: 1.0, name: '全画幅 (Full Frame)', dim: '36x24mm', color: 'stroke-white', fill: 'fill-white/10' }, 
     'APSC': { crop: 1.5, name: 'APS-C (Super 35)', dim: '23.5x15.6mm', color: 'stroke-yellow-400', fill: 'fill-yellow-400/10' }, 
     'M43': { crop: 2.0, name: 'Micro 4/3', dim: '17.3x13mm', color: 'stroke-red-400', fill: 'fill-red-400/10' } 
  };
  const current = specs[format];

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex items-center justify-center p-8 relative overflow-hidden">
         {/* Responsive Container using SVG instead of Fixed Divs */}
         <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
               {/* Lens Circle (Image Circle) */}
               <circle cx="50" cy="50" r="48" fill="#111" stroke="#334155" strokeWidth="0.5" />
               <text x="50" y="8" textAnchor="middle" fontSize="3" fill="#475569">Lens Image Circle</text>

               {/* Full Frame Ref (Faint) */}
               <rect x="14" y="26" width="72" height="48" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="2,2" />

               {/* Active Sensor Area */}
               {/* Width = 72 / crop. Height = 48 / crop. Centered. */}
               <rect 
                  x={50 - (72 / current.crop) / 2} 
                  y={50 - (48 / current.crop) / 2} 
                  width={72 / current.crop} 
                  height={48 / current.crop} 
                  className={`transition-all duration-500 ${current.color} ${current.fill}`}
                  strokeWidth="1"
               />
               
               {/* Diagonal Line (visualizing crop factor) */}
               <line 
                  x1="50" y1="50" 
                  x2={50 + (72 / current.crop) / 2} y2={50 - (48 / current.crop) / 2} 
                  stroke="white" strokeWidth="0.2" opacity="0.5"
               />
               <text x="50" y="50" dy="55" textAnchor="middle" fontSize="4" fill="white" className="font-mono">
                  Active Area: {current.dim}
               </text>
            </svg>
         </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BoxSelect size={18} className="text-cyan-400"/> 画幅对比</h3>
         <div className="space-y-3">
            {Object.entries(specs).map(([k, v]) => (
               <button key={k} onClick={() => setFormat(k as any)} className={`w-full p-4 rounded-lg border text-left transition-all group ${format === k ? 'bg-slate-800 border-slate-500' : 'border-slate-800 hover:border-slate-700'}`}>
                  <div className="flex justify-between items-center mb-1">
                     <span className={`font-bold text-sm ${format === k ? 'text-white' : 'text-slate-400'}`}>{v.name}</span>
                     <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-slate-500">{v.crop}x</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2">
                     <div className={`h-full transition-all ${k==='FF'?'bg-white':k==='APSC'?'bg-yellow-400':'bg-red-400'}`} style={{width: `${(1/v.crop)*100}%`}}></div>
                  </div>
               </button>
            ))}
         </div>
         <div className="mt-auto bg-slate-800 p-4 rounded-lg border border-slate-700 text-[10px] text-slate-400 leading-relaxed">
            <strong className="text-white block mb-1">等效系数原理：</strong>
            <br/>
            如果在 M43 (2.0x) 上使用 50mm 镜头，其视角等效于全画幅的 100mm。<br/>
            赚了长焦（拍得更远），亏了广角（视角变窄）。
         </div>
      </div>
    </div>
  );
};

// --- Rolling Shutter ---
export const RollingShutterModule: React.FC = () => {
  const [readout, setReadout] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     const canvas = canvasRef.current;
     const container = containerRef.current;
     if(!canvas || !container) return;
     const ctx = canvas.getContext('2d');
     if(!ctx) return;

     let frameId: number;
     let frame = 0;

     const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
     };
     const observer = new ResizeObserver(handleResize);
     observer.observe(container);
     handleResize();

     const loop = () => {
        const w = canvas.width;
        const h = canvas.height;
        const dpr = window.devicePixelRatio || 1;

        frame++;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#020617'; // slate-950
        ctx.fillRect(0,0,w,h);
        
        ctx.scale(dpr, dpr);
        const logicalW = w / dpr;
        const logicalH = h / dpr;

        // Use constant for scanlines to avoid magic number
        const scanHeight = logicalH / CONSTANTS.ROLLING_SHUTTER_SCANLINES;

        for(let i=0; i<CONSTANTS.ROLLING_SHUTTER_SCANLINES; i++) {
           // Time shift creates the skew. 
           // Lower readout (faster speed) = less shift.
           const timeShift = (i/CONSTANTS.ROLLING_SHUTTER_SCANLINES) * (readout/1000) * 10; 
           const angle = (frame * 0.05) + timeShift;
           
           ctx.save();
           ctx.beginPath(); 
           ctx.rect(0, i * scanHeight, logicalW, scanHeight + 0.5); // +0.5 overlap to fix gaps
           ctx.clip();
           
           ctx.translate(logicalW / 2, logicalH / 2); 
           ctx.rotate(angle);
           
           ctx.fillStyle = '#ef4444'; 
           // Propeller blade
           ctx.fillRect(-6, -logicalH * 0.35, 12, logicalH * 0.7);
           
           ctx.restore();
        }
        frameId = requestAnimationFrame(loop);
     };
     loop();

     return () => {
        cancelAnimationFrame(frameId);
        observer.disconnect();
     }
  }, [readout]);

  return (
     <div className="flex flex-col lg:flex-row h-full">
        <div ref={containerRef} className="flex-1 bg-black flex items-center justify-center p-4 relative overflow-hidden">
           <canvas ref={canvasRef} className="block w-full h-full rounded-xl shadow-2xl border border-slate-800" />
           <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-black/50 px-2 rounded">
              Sensor Readout: {readout}ms
           </div>
        </div>
        <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
           <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2"><ScanLine size={18} className="text-red-400"/> 卷帘快门畸变</h3>
           <Slider label="传感器读出耗时 (ms)" value={readout} min={1} max={100} onChange={setReadout} />
           <div className="flex justify-between text-[10px] text-slate-500 mb-6 font-mono">
              <span>Fast (Global-like)</span>
              <span>Slow (Jello)</span>
           </div>
           
           <div className="space-y-3">
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                 <div className="text-xs font-bold text-white mb-1">什么是果冻效应？</div>
                 <p className="text-[10px] text-slate-400 leading-relaxed">
                    CMOS 传感器不是一次性曝光的，而是像百叶窗一样逐行扫描。
                    <br/>当物体运动速度快于扫描速度时，物体上半部分和下半部分被记录在不同时间点，导致直线变斜。
                 </p>
              </div>
           </div>
        </div>
     </div>
  );
};

// --- Exposure Modes ---
export const ExposureModesModule: React.FC = () => {
  const [mode, setMode] = useState<'P' | 'A' | 'S' | 'M'>('M');
  const [aperture, setAperture] = useState(2.8);
  const [shutter, setShutter] = useState(60);
  const [iso, setIso] = useState(800);
  const [evComp, setEvComp] = useState(0);

  useEffect(() => {
    // Simple Auto Exposure Simulation Logic
    const target = CONSTANTS.TARGET_EV + evComp;
    
    if (mode === 'P') {
       setAperture(4.0);
       const lightValue = target - Math.log2(iso/100);
       setShutter(Math.round(Math.pow(2, lightValue) / 16));
    } else if (mode === 'A') {
       const lightValue = target - Math.log2(iso/100);
       setShutter(Math.max(1, Math.round(Math.pow(2, lightValue) / (aperture * aperture))));
    } else if (mode === 'S') {
       const sv = Math.log2(iso/100);
       const tv = Math.log2(shutter);
       const av = target + sv - tv;
       setAperture(Math.min(22, Math.max(1.2, parseFloat(Math.sqrt(Math.pow(2, av)).toFixed(1)))));
    }
  }, [mode, aperture, shutter, iso, evComp]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative">
         <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-4 border-slate-700 bg-slate-800 shadow-2xl flex items-center justify-center z-10">
            <div className="text-3xl font-black text-white">{mode}</div>
            <div className="absolute -bottom-2 text-[8px] text-slate-500 uppercase tracking-widest bg-slate-900 px-1">Mode</div>
         </div>
         
         <div className="relative w-full max-w-xl aspect-video bg-black rounded-xl overflow-hidden border-4 border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2000)',
               // Simulate exposure brightness
               filter: `brightness(${Math.pow(2, -(Math.log2(aperture**2) + Math.log2(shutter) - Math.log2(iso/100) - CONSTANTS.TARGET_EV))}) blur(${mode==='A'||mode==='M' ? Math.max(0, 2.8-aperture)*2 : 0}px)`
            }}></div>
            
            {/* Viewfinder Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
               <div className="flex justify-between text-green-400 font-mono text-xs drop-shadow-md">
                  <span>AF-C</span>
                  <span>[ ● ]</span>
                  <span>RAW</span>
               </div>
               <div className="flex justify-between items-end text-white font-mono text-sm drop-shadow-md bg-black/20 p-2 rounded">
                  <span className={mode==='S'||mode==='M'?'text-yellow-400 font-bold':''}>1/{shutter}</span>
                  <span className={mode==='A'||mode==='M'?'text-yellow-400 font-bold':''}>F{aperture}</span>
                  <span className={mode!=='P'?'text-yellow-400 font-bold':''}>ISO {iso}</span>
                  <span className="text-slate-300">{evComp > 0 ? '+' : ''}{evComp} EV</span>
               </div>
            </div>
         </div>
         
         <div className="mt-8 text-center max-w-md bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-1">
               {mode === 'P' ? "程序自动 (Program)" : mode === 'A' ? "光圈优先 (Aperture Priority)" : mode === 'S' ? "快门优先 (Shutter Priority)" : "手动曝光 (Manual)"}
            </h2>
            <p className="text-xs text-slate-400">
               {mode === 'P' ? "相机的“傻瓜模式”，自动平衡光圈快门。" : mode === 'A' ? "人像摄影首选。锁定光圈控制景深，相机自动配快门。" : mode === 'S' ? "体育摄影首选。锁定快门凝固瞬间，相机自动配光圈。" : "完全掌控。适合影棚闪光灯或极端光线环境。"}
            </p>
         </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col border-l border-slate-700 select-none overflow-y-auto">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Camera size={18} className="text-purple-400"/> 拍摄模式</h3>
         <div className="grid grid-cols-4 gap-2 mb-8">
            {['P', 'A', 'S', 'M'].map((m) => (
               <button key={m} onClick={() => setMode(m as any)} className={`aspect-square rounded-xl font-black text-lg border-2 flex items-center justify-center transition-all ${mode === m ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg scale-105' : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'}`}>{m}</button>
            ))}
         </div>
         <div className="space-y-6">
            <div className={`transition-opacity ${mode === 'S' || mode === 'P' ? 'opacity-50 pointer-events-none' : ''}`}>
               <div className="flex justify-between mb-1"><span className="text-xs font-bold text-slate-300">光圈 (F-Stop)</span>{(mode==='S'||mode==='P') && <Lock size={10} className="text-yellow-500"/>}</div>
               <input type="range" min="1.4" max="22" step="0.1" value={aperture} onChange={e => setAperture(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>
            <div className={`transition-opacity ${mode === 'A' || mode === 'P' ? 'opacity-50 pointer-events-none' : ''}`}>
               <div className="flex justify-between mb-1"><span className="text-xs font-bold text-slate-300">快门 (Shutter)</span>{(mode==='A'||mode==='P') && <Lock size={10} className="text-yellow-500"/>}</div>
               <input type="range" min="10" max="2000" step="10" value={shutter} onChange={e => setShutter(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>
            <div>
               <div className="flex justify-between mb-1"><span className="text-xs font-bold text-slate-300">ISO 感光度</span></div>
               <input type="range" min="100" max="12800" step="100" value={iso} onChange={e => setIso(parseFloat(e.target.value))} className="w-full accent-emerald-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>
            {mode !== 'M' && (
               <div className="pt-4 border-t border-slate-700">
                  <Slider label="曝光补偿 (EV)" value={evComp} min={-3} max={3} step={0.3} onChange={setEvComp} unit=" EV" />
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
