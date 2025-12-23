
import React, { useState, useEffect, useRef } from 'react';
import { Slider } from './Controls';
import { ExposureModesModule } from './ExposureModesModule'; // New Module
import { Sun, BoxSelect, ScanLine, Lightbulb, TrendingUp, Camera, Aperture } from 'lucide-react';

type Tab = 'EXPOSURE' | 'PASM_MODES' | 'GRAY_CARD' | 'NATIVE_ISO' | 'SENSOR_SIZE' | 'ROLLING_SHUTTER';

export const SensorExposureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('PASM_MODES');

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar">
           <TabButton active={activeTab === 'PASM_MODES'} onClick={() => setActiveTab('PASM_MODES')} icon={<Camera size={14}/>} label="PASM 拍摄模式" />
           <TabButton active={activeTab === 'EXPOSURE'} onClick={() => setActiveTab('EXPOSURE')} icon={<Sun size={14}/>} label="曝光三角" />
           <TabButton active={activeTab === 'GRAY_CARD'} onClick={() => setActiveTab('GRAY_CARD')} icon={<Lightbulb size={14}/>} label="18% 灰 / 测光" />
           <TabButton active={activeTab === 'NATIVE_ISO'} onClick={() => setActiveTab('NATIVE_ISO')} icon={<TrendingUp size={14}/>} label="双原生 ISO" />
           <TabButton active={activeTab === 'SENSOR_SIZE'} onClick={() => setActiveTab('SENSOR_SIZE')} icon={<BoxSelect size={14}/>} label="传感器画幅" />
           <TabButton active={activeTab === 'ROLLING_SHUTTER'} onClick={() => setActiveTab('ROLLING_SHUTTER')} icon={<ScanLine size={14}/>} label="卷帘快门" />
        </div>
        <div className="flex-1 relative overflow-hidden">
           {activeTab === 'PASM_MODES' && <ExposureModesModule />}
           {activeTab === 'EXPOSURE' && <ExposureModule />}
           {activeTab === 'GRAY_CARD' && <GrayCardModule />}
           {activeTab === 'NATIVE_ISO' && <NativeISOModule />}
           {activeTab === 'SENSOR_SIZE' && <SensorSizeModule />}
           {activeTab === 'ROLLING_SHUTTER' && <RollingShutterModule />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-3 text-[10px] lg:text-xs font-bold whitespace-nowrap transition-colors ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

const ExposureModule: React.FC = () => {
  const [iso, setIso] = useState(800);
  const [shutter, setShutter] = useState(50);
  const [aperture, setAperture] = useState(2.8);

  const evDiff = Math.log2( (iso / 100) * ( (1/shutter) / (1/50) ) / Math.pow(aperture/2.8, 2) );
  const brightness = Math.min(2.0, Math.pow(2, evDiff));

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black relative overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center transition-all duration-100" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)', filter: `brightness(${brightness})` }}></div>
         <div className="absolute top-4 right-4 bg-black/60 p-2 rounded text-[10px] font-mono border border-slate-700">Exposure: {evDiff > 0 ? '+' : ''}{evDiff.toFixed(1)} EV</div>
      </div>
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
        <h3 className="text-lg font-bold mb-6">曝光三要素 (Manual)</h3>
        <Slider label="ISO 感光度" value={iso} min={100} max={12800} step={100} onChange={setIso} />
        <Slider label="快门 (1/X)" value={shutter} min={1} max={2000} step={10} onChange={setShutter} />
        <Slider label="光圈 (f/X)" value={aperture} min={1.2} max={22} step={0.1} onChange={setAperture} />
      </div>
    </div>
  );
};

const GrayCardModule: React.FC = () => {
  const [scene, setScene] = useState<'SNOW' | 'GRAY' | 'COAL'>('GRAY');
  const [comp, setComp] = useState(0);
  
  const reflectance = scene === 'SNOW' ? 0.9 : scene === 'COAL' ? 0.05 : 0.18;
  const autoExposureFactor = 0.18 / reflectance;
  const userCompensation = Math.pow(2, comp);
  const finalLinearValue = reflectance * autoExposureFactor * userCompensation;
  const displayVal = Math.min(255, Math.max(0, Math.pow(finalLinearValue, 1/2.2) * 255));
  const histPos = Math.min(100, Math.max(0, (displayVal / 255) * 100));

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
         <div className="w-full max-w-sm aspect-square border-8 border-slate-700 bg-black flex flex-col items-center justify-center relative shadow-2xl">
            <div className="absolute inset-0" style={{ backgroundColor: `rgb(${displayVal},${displayVal},${displayVal})` }}></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-8 h-8 border-2 border-green-500 rounded-full opacity-50"></div>
               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
            <div className="absolute top-2 left-2 bg-black/50 p-1 rounded text-[10px] font-mono text-white">Luma: {(displayVal/255*100).toFixed(1)} IRE</div>
            <div className="absolute bottom-4 left-4 right-4 h-16 bg-black/50 border border-slate-600 rounded p-2 flex flex-col justify-end">
               <div className="w-full h-full relative">
                  <div className="absolute bottom-0 w-2 bg-white rounded-t transition-all duration-300" style={{ left: `${histPos}%`, height: '80%' }}></div>
                  <div className="absolute bottom-0 left-[46%] w-0.5 h-full bg-green-500 opacity-80 border-l border-dashed border-green-300"></div>
               </div>
            </div>
         </div>
      </div>
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Lightbulb size={18} className="text-yellow-400"/> 18% 灰与测光原理</h3>
        <div className="flex gap-2 mb-6">
           {['SNOW', 'GRAY', 'COAL'].map(s => (
              <button key={s} onClick={() => setScene(s as any)} className={`flex-1 py-4 text-[10px] lg:text-xs rounded border font-bold flex flex-col items-center justify-center gap-1 transition-all ${scene === s ? 'bg-slate-700 border-cyan-500 text-white' : 'border-slate-700 text-slate-500'}`}>
                 {s === 'SNOW' && <span className="block w-4 h-4 rounded-full bg-white border border-slate-300"></span>}
                 {s === 'GRAY' && <span className="block w-4 h-4 rounded-full bg-[#777] border border-slate-500"></span>}
                 {s === 'COAL' && <span className="block w-4 h-4 rounded-full bg-[#1a1a1a] border border-slate-600"></span>}
                 {s === 'SNOW' ? '白雪 (90%)' : s === 'GRAY' ? '灰卡 (18%)' : '黑炭 (5%)'}
              </button>
           ))}
        </div>
        <Slider label="曝光补偿 (EV)" value={comp} min={-3} max={3} step={0.5} onChange={setComp} />
        <div className="space-y-4 mt-4">
           <div className="bg-slate-800 p-4 rounded border border-slate-700">
              <h4 className="text-xs font-bold text-cyan-400 mb-1">“白加黑减”原理</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">相机测光系统假设一切物体都是18%灰。白雪会被压暗成灰色（需+EV），黑炭会被提亮成灰色（需-EV）。</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const NativeISOModule: React.FC = () => {
   const [iso, setIso] = useState(800);
   const isHighNative = iso >= 3200;
   const noise = iso < 3200 ? (iso - 800) / 2400 : (iso - 3200) / 9600;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-6">
            <div className="relative w-full h-48 border-l border-b border-slate-600 mb-8 overflow-hidden">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0,90 L 30,50 M 30,90 L 100,20" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
                  <circle cx={iso < 3200 ? (iso/3200)*30 : 30 + ((iso-3200)/9600)*70} cy={100 - (noise * 80 + 10)} r="4" fill="#22d3ee" className="animate-pulse" />
               </svg>
               <div className="absolute bottom-1 left-[30%] text-[8px] text-cyan-400 font-bold">BASE 3200</div>
               <div className="absolute top-2 left-2 text-[10px] text-slate-500">Signal-to-Noise Ratio (SNR)</div>
            </div>
            <div className={`w-64 h-40 bg-black relative border border-slate-700 overflow-hidden`}>
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-white/5 pointer-events-none" style={{ filter: `blur(1px) contrast(1.5) opacity(${noise * 0.4})` }}></div>
               <div className="absolute bottom-2 right-2 text-[9px] bg-black/50 p-1 rounded">Noise simulated @ ISO {iso}</div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">双原生 ISO</h3>
            <Slider label="当前 ISO" value={iso} min={400} max={12800} step={400} onChange={setIso} />
            <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700 space-y-2">
               <div className={`text-xs font-bold ${isHighNative ? 'text-cyan-400' : 'text-emerald-400'}`}>
                  {isHighNative ? '活跃电路：高增益基准 (ISO 3200)' : '活跃电路：低增益基准 (ISO 800)'}
               </div>
               <p className="text-[10px] text-slate-400">切换到第二档原生ISO时，使用另一套模拟放大电路，底噪会瞬间降低。</p>
            </div>
         </div>
      </div>
   );
};

const SensorSizeModule: React.FC = () => {
  const [format, setFormat] = useState<'FF' | 'APSC' | 'M43'>('FF');
  const specs = { 'FF': { crop: 1.0, w: 360, h: 240, color: 'border-white' }, 'APSC': { crop: 1.5, w: 240, h: 160, color: 'border-yellow-400' }, 'M43': { crop: 2.0, w: 180, h: 135, color: 'border-red-400' } };
  const current = specs[format];
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex items-center justify-center p-8">
         <div className="w-[500px] h-[500px] rounded-full border border-slate-800 relative overflow-hidden flex items-center justify-center bg-slate-900/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')] bg-cover bg-center opacity-30"></div>
            <div className={`border-4 ${current.color} shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10 transition-all duration-500`} style={{ width: current.w, height: current.h }}>
               <span className="absolute top-2 left-2 text-[10px] font-mono bg-black/60 p-1">ACTIVE SENSOR AREA</span>
            </div>
         </div>
      </div>
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
         <h3 className="text-lg font-bold mb-6">传感器规格对比</h3>
         {Object.entries(specs).map(([k, v]) => (
            <button key={k} onClick={() => setFormat(k as any)} className={`w-full p-4 mb-2 rounded border text-left transition-all ${format === k ? 'bg-slate-800 border-cyan-500 ring-1 ring-cyan-500/50' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>
               <div className="font-bold text-sm text-slate-200">{k === 'FF' ? 'Full Frame' : k === 'APSC' ? 'APS-C (S35)' : 'Micro 4/3'}</div>
               <div className="text-[10px] mt-1">Crop Factor: {v.crop}x</div>
            </button>
         ))}
      </div>
    </div>
  );
};

const RollingShutterModule: React.FC = () => {
  const [readout, setReadout] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
     const ctx = canvasRef.current?.getContext('2d');
     if(!ctx) return;
     let frame = 0;
     const loop = () => {
        frame++;
        ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,600,400);
        const scanlines = 100;
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
           <h3 className="text-lg font-bold mb-6">卷帘快门畸变</h3>
           <Slider label="传感器读出耗时 (ms)" value={readout} min={1} max={100} onChange={setReadout} />
           <div className="text-[10px] text-slate-400 mt-6 leading-relaxed bg-slate-800 p-4 rounded border border-slate-700">
              <span className="text-white font-bold block mb-1">物理本质：</span>
              传感器逐行扫描读取。当扫描到画面底部时，高速运动的物体已经发生了位移，导致画面倾斜（果冻效应）。
           </div>
        </div>
     </div>
  );
};
