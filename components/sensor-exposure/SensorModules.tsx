
import React, { useState, useEffect, useRef } from 'react';
import { Slider, Select } from '../Controls';
import { Sun, BoxSelect, ScanLine, Target, Camera, Aperture, Timer, Activity, Lock } from 'lucide-react';

// --- Exposure Triangle Simulator ---
export const ExposureModule: React.FC = () => {
  const [iso, setIso] = useState(800);
  const [shutter, setShutter] = useState(50);
  const [aperture, setAperture] = useState(2.8);

  const evDiff = Math.log2( (iso / 100) * ( (1/shutter) / (1/50) ) / Math.pow(aperture/2.8, 2) );
  const brightness = Math.min(2.0, Math.pow(2, evDiff));

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black relative overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center transition-all duration-100" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)', filter: `brightness(${brightness})` }}></div>
         <div className="absolute top-4 right-4 bg-black/60 p-2 rounded text-[10px] font-mono border border-slate-700 text-white">Exposure: {evDiff > 0 ? '+' : ''}{evDiff.toFixed(1)} EV</div>
      </div>
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
        <h3 className="text-lg font-bold mb-6 text-white">曝光三要素 (Manual)</h3>
        <Slider label="ISO 感光度" value={iso} min={100} max={12800} step={100} onChange={setIso} />
        <Slider label="快门 (1/X)" value={shutter} min={1} max={2000} step={10} onChange={setShutter} />
        <Slider label="光圈 (f/X)" value={aperture} min={1.2} max={22} step={0.1} onChange={setAperture} />
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
  const autoExposureFactor = 0.18 / reflectance;
  const userCompensation = Math.pow(2, comp);
  const finalLinearValue = reflectance * autoExposureFactor * userCompensation;
  const displayVal = Math.min(255, Math.max(0, Math.pow(finalLinearValue, 1/2.2) * 255));
  const histPos = Math.min(100, Math.max(0, (displayVal / 255) * 100));

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
         <div className="w-full max-w-sm aspect-square border-8 border-slate-700 bg-black flex flex-col items-center justify-center relative shadow-2xl overflow-hidden">
            {/* Background Color */}
            <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: `rgb(${displayVal},${displayVal},${displayVal})` }}></div>
            
            {/* Metering Zone Visualization */}
            <div className="absolute inset-0 pointer-events-none">
               {meteringMode === 'MULTI' && <div className="w-full h-full grid grid-cols-6 grid-rows-4 opacity-30">{[...Array(24)].map((_,i) => <div key={i} className="border border-green-500/50 bg-green-500/10"></div>)}</div>}
               {meteringMode === 'CENTER' && <div className="w-full h-full flex items-center justify-center"><div className="w-2/3 h-2/3 rounded-full bg-green-500/20 border-2 border-green-500/50 blur-xl"></div></div>}
               {meteringMode === 'SPOT' && <div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-green-500/80 bg-transparent flex items-center justify-center"><div className="w-1 h-1 bg-green-500"></div></div></div>}
               {meteringMode === 'HIGHLIGHT' && <div className="w-full h-full flex items-center justify-center"><div className="absolute top-4 right-4 text-[10px] text-red-500 font-bold bg-black/50 px-2 py-1 rounded">Highlight Priority</div><div className="w-10 h-10 rounded-full bg-red-500/30 blur-md absolute top-10 right-10"></div></div>}
            </div>

            {/* Histogram */}
            <div className="absolute bottom-4 left-4 right-4 h-16 bg-black/60 border border-slate-600 rounded p-2 flex flex-col justify-end backdrop-blur-sm">
               <div className="w-full h-full relative">
                  <div className="absolute bottom-0 w-2 bg-white rounded-t transition-all duration-300" style={{ left: `${histPos}%`, height: '80%' }}></div>
                  <div className="absolute bottom-0 left-[46%] w-0.5 h-full bg-green-500 opacity-80 border-l border-dashed border-green-300"></div>
                  <div className="absolute top-0 right-0 text-[8px] text-slate-400">18% Gray</div>
               </div>
            </div>
         </div>
      </div>

      <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Target size={18} className="text-cyan-400"/> 测光模式</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-6">
           {['MULTI', 'CENTER', 'SPOT', 'HIGHLIGHT'].map(m => (
              <button key={m} onClick={()=>setMeteringMode(m as any)} className={`p-3 rounded border text-xs text-left transition-all ${meteringMode===m ? 'bg-slate-800 border-cyan-500 text-white' : 'border-slate-700 text-slate-400'}`}>
                 <div className="font-bold mb-1">{m}</div>
              </button>
           ))}
        </div>

        <div className="mb-6">
           <div className="text-xs text-slate-400 mb-2 font-bold">模拟场景</div>
           <div className="flex gap-2">
              {['SNOW', 'GRAY', 'COAL'].map(s => (
                 <button key={s} onClick={() => setScene(s as any)} className={`flex-1 py-3 text-[10px] rounded border font-bold flex flex-col items-center justify-center gap-1 transition-all ${scene === s ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-500'}`}>
                    {s}
                 </button>
              ))}
           </div>
        </div>

        <Slider label="曝光补偿 (EV)" value={comp} min={-3} max={3} step={0.5} onChange={setComp} />
        
        <div className="space-y-4 mt-4">
           <div className="bg-slate-800 p-4 rounded border border-slate-700">
              <h4 className="text-xs font-bold text-cyan-400 mb-1">18% 灰原理</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                 相机假设世界平均反射率为 18%。拍白雪会欠曝（变灰），需 +EV；拍煤炭会过曝（变灰），需 -EV。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Sensor Size ---
export const SensorSizeModule: React.FC = () => {
  const [format, setFormat] = useState<'FF' | 'APSC' | 'M43'>('FF');
  const specs = { 'FF': { crop: 1.0, name: 'Full Frame', color: 'border-white', w: 100, h: 66 }, 'APSC': { crop: 1.5, name: 'APS-C', color: 'border-yellow-400', w: 66, h: 44 }, 'M43': { crop: 2.0, name: 'M4/3', color: 'border-red-400', w: 50, h: 33 } };
  const current = specs[format];
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex items-center justify-center p-8">
         <div className="w-[500px] h-[500px] rounded-full border border-slate-800 relative overflow-hidden flex items-center justify-center bg-slate-900/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')] bg-cover bg-center opacity-30"></div>
            <div className={`border-4 ${current.color} shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10 transition-all duration-500`} style={{ width: `${360 / current.crop}px`, height: `${240 / current.crop}px` }}>
               <div className="absolute top-0 left-0 bg-black/70 text-white text-xs px-1 py-0.5">Active Area</div>
            </div>
         </div>
      </div>
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BoxSelect size={18}/> 画幅与裁切</h3>
         {Object.entries(specs).map(([k, v]) => (
            <button key={k} onClick={() => setFormat(k as any)} className={`w-full p-4 mb-2 rounded border text-left transition-all ${format === k ? `bg-slate-800 ${v.color}` : 'border-slate-700 text-slate-500 hover:border-slate-500'} border-l-4`}>
               <div className="font-bold text-sm text-slate-200">{v.name}</div>
               <div className="text-[10px] text-slate-500 mt-1">Crop: {v.crop}x</div>
            </button>
         ))}
      </div>
    </div>
  );
};

// --- Rolling Shutter ---
export const RollingShutterModule: React.FC = () => {
  const [readout, setReadout] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
     const ctx = canvasRef.current?.getContext('2d');
     if(!ctx) return;
     let frame = 0;
     const loop = () => {
        frame++;
        ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,600,400);
        const scanlines = 50;
        for(let i=0; i<scanlines; i++) {
           const timeShift = (i/scanlines) * (readout/1000) * 12;
           const angle = (frame * 0.1) + timeShift;
           ctx.save();
           ctx.beginPath(); ctx.rect(0, i*(400/scanlines), 600, 400/scanlines + 1); ctx.clip();
           ctx.translate(300, 200); ctx.rotate(angle);
           ctx.fillStyle = '#ef4444'; ctx.fillRect(-4, -120, 8, 240);
           ctx.restore();
        }
        requestAnimationFrame(loop);
     };
     loop();
  }, [readout]);
  return (
     <div className="flex flex-col lg:flex-row h-full">
        <div className="flex-1 bg-black flex items-center justify-center p-4">
           <canvas ref={canvasRef} width={600} height={400} className="max-w-full rounded shadow-2xl border border-slate-700" />
        </div>
        <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
           <h3 className="text-lg font-bold mb-6 text-white">卷帘快门畸变</h3>
           <Slider label="传感器读出耗时 (ms)" value={readout} min={1} max={100} onChange={setReadout} />
           <div className="text-[10px] text-slate-400 mt-6 leading-relaxed bg-slate-800 p-4 rounded border border-slate-700">
              <span className="text-white font-bold block mb-1">物理本质：</span>
              传感器逐行扫描。读到底部时，高速运动物体已发生位移，导致倾斜。
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

  const targetEV = 13; 

  useEffect(() => {
    // Simple Auto Exposure Simulation
    if (mode === 'P') {
       setAperture(4.0);
       const lightValue = (targetEV + evComp) - Math.log2(iso/100);
       setShutter(Math.round(Math.pow(2, lightValue) / 16));
    } else if (mode === 'A') {
       const lightValue = (targetEV + evComp) - Math.log2(iso/100);
       setShutter(Math.max(1, Math.round(Math.pow(2, lightValue) / (aperture * aperture))));
    } else if (mode === 'S') {
       const sv = Math.log2(iso/100);
       const tv = Math.log2(shutter);
       const av = (targetEV + evComp) + sv - tv;
       setAperture(Math.min(22, Math.max(1.2, parseFloat(Math.sqrt(Math.pow(2, av)).toFixed(1)))));
    }
  }, [mode, aperture, shutter, iso, evComp]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative">
         <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-800 shadow-2xl flex items-center justify-center">
            <div className="text-3xl font-black text-white">{mode}</div>
         </div>
         <div className="relative w-full max-w-xl aspect-video bg-black rounded-lg overflow-hidden border-8 border-slate-800 shadow-inner">
            <div className="absolute inset-0 bg-cover bg-center" style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2000)',
               filter: `brightness(${Math.pow(2, -(Math.log2(aperture*aperture) + Math.log2(shutter) - Math.log2(iso/100) - targetEV))}) blur(${mode==='A'||mode==='M' ? Math.max(0, 2.8-aperture)*2 : 0}px)`
            }}></div>
         </div>
         <div className="mt-6 text-center max-w-md">
            <h2 className="text-xl font-bold text-white mb-2">{mode} 模式</h2>
            <p className="text-xs text-slate-400">
               {mode === 'P' ? "程序自动" : mode === 'A' ? "光圈优先 (控制景深)" : mode === 'S' ? "快门优先 (控制运动)" : "全手动"}
            </p>
         </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col border-l border-slate-700 select-none">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Camera size={18}/> 模式转盘</h3>
         <div className="grid grid-cols-4 gap-2 mb-8">
            {['P', 'A', 'S', 'M'].map((m) => (
               <button key={m} onClick={() => setMode(m as any)} className={`aspect-square rounded-full font-black text-lg border-2 flex items-center justify-center ${mode === m ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-700 border-slate-600 text-slate-400'}`}>{m}</button>
            ))}
         </div>
         <div className="space-y-6">
            <div className={`${mode === 'S' || mode === 'P' ? 'opacity-50 pointer-events-none' : ''}`}>
               <div className="flex justify-between mb-1"><span className="text-xs font-bold text-slate-300">光圈</span>{(mode==='S'||mode==='P') && <Lock size={10} className="text-yellow-500"/>}</div>
               <input type="range" min="1.4" max="22" step="0.1" value={aperture} onChange={e => setAperture(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>
            <div className={`${mode === 'A' || mode === 'P' ? 'opacity-50 pointer-events-none' : ''}`}>
               <div className="flex justify-between mb-1"><span className="text-xs font-bold text-slate-300">快门</span>{(mode==='A'||mode==='P') && <Lock size={10} className="text-yellow-500"/>}</div>
               <input type="range" min="10" max="2000" step="10" value={shutter} onChange={e => setShutter(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>
            <div>
               <div className="flex justify-between mb-1"><span className="text-xs font-bold text-slate-300">ISO</span></div>
               <input type="range" min="100" max="12800" step="100" value={iso} onChange={e => setIso(parseFloat(e.target.value))} className="w-full accent-emerald-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>
            {mode !== 'M' && (
               <div className="pt-4 border-t border-slate-700">
                  <Slider label="曝光补偿" value={evComp} min={-3} max={3} step={0.3} onChange={setEvComp} unit=" EV" />
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
