
import React, { useState, useEffect, useRef } from 'react';
import { Slider, Select } from './Controls';
import { Sun, BoxSelect, ScanLine, MonitorPlay } from 'lucide-react';

// --- 1. Exposure Triangle Simulator ---
export const ExposureSimulator: React.FC = () => {
  const [iso, setIso] = useState(800);
  const [shutterDenominator, setShutterDenominator] = useState(50); // Represents 1/50
  const [aperture, setAperture] = useState(2.8);

  const baseFactor = 100 / (50 * 2.8 * 2.8);
  const currentFactor = iso / (shutterDenominator * aperture * aperture);
  const evDiff = Math.log2(currentFactor / baseFactor);

  const brightness = Math.min(2.5, Math.max(0.0, 1 * Math.pow(2, evDiff))); 
  const noiseOpacity = Math.max(0, (iso - 400) / 25600); 
  const blurAmount = Math.max(0, (200 / shutterDenominator) - 0.2); 

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
         {/* Scene Simulation */}
         <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-100"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop)',
                filter: `brightness(${brightness})`
              }}
            />
            
            {/* Motion Blur Layer */}
            <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 overflow-hidden flex items-center">
               <div 
                 className="w-40 h-20 bg-red-600 rounded-lg shadow-lg relative animate-drive"
                 style={{ 
                   animation: 'drive 2s linear infinite',
                   filter: `blur(${blurAmount}px) brightness(${brightness})`
                 }}
               >
                 <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-300 rounded-full blur-[2px]"></div>
                 <div className="text-white text-xs font-bold absolute center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">RACING</div>
               </div>
               <style>{`@keyframes drive { from { transform: translateX(-100%); } to { transform: translateX(500%); } }`}</style>
            </div>

            {/* Noise Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${noiseOpacity}'/%3E%3C/svg%3E")`,
                opacity: noiseOpacity
              }}
            ></div>
         </div>

         {/* Histogram HUD */}
         <div className="absolute top-4 right-4 bg-black/60 backdrop-blur p-2 rounded text-xs font-mono text-white">
            <div className={`${Math.abs(evDiff) > 3 ? 'text-red-500' : 'text-emerald-400'}`}>
               MM: {evDiff > 0 ? '+' : ''}{evDiff.toFixed(1)} EV
            </div>
            <div className="flex gap-1 items-end h-8 mt-1 opacity-80">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="w-1 bg-white" style={{height: `${Math.min(100, Math.max(5, Math.random() * 80 * brightness))}%`}}></div>
               ))}
            </div>
         </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Sun size={18}/> 曝光控制台</h3>
        
        <div className="space-y-6">
          <Slider label="ISO 感光度" value={iso} min={100} max={25600} step={100} onChange={setIso} />
          
          <Slider label="快门分母 (1/x 秒)" value={shutterDenominator} min={10} max={2000} step={10} onChange={setShutterDenominator} />
          <p className="text-[10px] text-slate-500 -mt-3 mb-2">
             当前快门速度: <span className="text-cyan-400 font-mono">1/{shutterDenominator}s</span> ({shutterDenominator >= 500 ? '高速凝固' : '慢门模糊'})
          </p>

          <Slider label="光圈 (f/x)" value={aperture} min={1.4} max={16} step={0.1} onChange={setAperture} />
        </div>

        <div className="mt-8 bg-slate-800 p-3 rounded border border-slate-700">
           <div className="text-xs text-cyan-400 font-bold mb-1">物理原理</div>
           <ul className="text-[10px] text-slate-400 leading-relaxed space-y-1 list-disc pl-3">
             <li><strong>快门:</strong> 控制时间。分母越大(1/1000s)，时间越短，进光越少，运动越清晰。</li>
             <li><strong>光圈:</strong> 控制通光孔径。f值越小(f/1.4)，孔径越大，进光越多。</li>
             <li><strong>ISO:</strong> 信号增益。硬提升亮度，副作用是引入电子噪点。</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

// --- 2. Sensor Size Simulator ---
export const SensorSizeSimulator: React.FC = () => {
  const [format, setFormat] = useState<'FF' | 'APSC' | 'M43'>('FF');
  const focalLength = 50; // Base lens

  const specs = {
    'FF': { crop: 1.0, name: '全画幅 (Full Frame)', nickname: '底大一级压死人', color: 'border-white', w: 100, h: 66 },
    'APSC': { crop: 1.5, name: 'APS-C (半画幅)', nickname: '残幅 (C幅)', color: 'border-yellow-400', w: 66, h: 44 },
    'M43': { crop: 2.0, name: 'Micro 4/3', nickname: 'M43 (适合打鸟)', color: 'border-red-400', w: 50, h: 33 },
  };

  const current = specs[format];
  const equivFocal = focalLength * current.crop;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex flex-col items-center justify-center relative p-8">
          {/* Lens Circle */}
          <div className="w-[500px] h-[500px] rounded-full border border-slate-700 flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-2 text-slate-600 text-xs">Lens Image Circle (Full Frame coverage)</div>
             <div 
               className="absolute inset-0 opacity-50 bg-cover bg-center"
               style={{backgroundImage: 'url(https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop)'}}
             ></div>

             {/* Sensor Rectangles */}
             {/* FF */}
             <div className={`absolute border-2 border-white/30 w-[360px] h-[240px] flex items-end justify-end p-1`}>
                <span className="text-[10px] text-white/50">Full Frame</span>
             </div>
             {/* APS-C */}
             <div className={`absolute border-2 border-yellow-400/30 w-[240px] h-[160px] flex items-end justify-end p-1`}>
                <span className="text-[10px] text-yellow-400/50">APS-C</span>
             </div>
             {/* M43 */}
             <div className={`absolute border-2 border-red-400/30 w-[180px] h-[135px] flex items-end justify-end p-1`}>
                <span className="text-[10px] text-red-400/50">M43</span>
             </div>

             {/* Active Sensor Highlight */}
             <div 
               className={`absolute border-4 ${current.color} shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 z-10 bg-white/5`}
               style={{ width: `${360 / current.crop}px`, height: `${240 / current.crop}px` }} // Simplified ratio for demo
             >
                <div className="absolute top-0 left-0 bg-black/70 text-white text-xs px-1 py-0.5">Active Area</div>
             </div>
          </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BoxSelect size={18}/> 画幅与裁切系数</h3>
         
         <div className="space-y-2">
            {(Object.keys(specs) as Array<keyof typeof specs>).map((key) => (
              <button
                key={key}
                onClick={() => setFormat(key)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  format === key ? `bg-slate-800 ${specs[key].color.replace('border', 'border')}` : 'border-slate-700 hover:bg-slate-800'
                } border-l-4`}
              >
                <div className="font-bold text-sm text-slate-200">{specs[key].name}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                   {specs[key].nickname} | Crop Factor: {specs[key].crop}x
                </div>
              </button>
            ))}
         </div>

         <div className="mt-8 bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-xs text-slate-400 mb-2">物理 50mm 镜头在当前画幅下的等效视角：</div>
            <div className="text-2xl font-mono text-cyan-400 font-bold">{equivFocal.toFixed(0)}mm</div>
            <div className="text-[10px] text-slate-500 mt-2 leading-relaxed">
               传感器越小，裁切掉的边缘越多，视角显得越“窄”，相当于镜头焦距变长了（赚了长焦，亏了广角）。
            </div>
         </div>
      </div>
    </div>
  );
};

// --- 3. Shutter Angle Simulator ---
export const ShutterAngleSimulator: React.FC = () => {
  const [fps, setFps] = useState(24);
  const [angle, setAngle] = useState(180);

  const shutterSpeedInv = fps * (360 / angle); 
  const blurWidth = Math.min(100, 2000 / shutterSpeedInv); 

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
         
         {/* Animation Container */}
         <div className="relative w-full h-64 flex items-center justify-center bg-slate-950 border-y border-slate-800">
            {/* Background Grid for reference */}
            <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '100px 100%'}}></div>

            {/* Moving Ball */}
            <div 
               className="w-16 h-16 rounded-full bg-cyan-500 shadow-[0_0_20px_cyan]"
               style={{
                  animation: `bounce 1s infinite alternate ease-in-out`,
                  // Simulate motion blur using scaleX and opacity gradient? CSS blur is easier.
                  filter: `blur(${blurWidth/4}px)`,
                  transform: `scaleX(${1 + blurWidth/50})`
               }}
            ></div>
            <style>{`@keyframes bounce { from { transform: translateX(-200px); } to { transform: translateX(200px); } }`}</style>
         </div>

         <div className="mt-8 flex gap-8">
            <div className="text-center">
               <div className="text-4xl font-mono text-white mb-1">1/{Math.round(shutterSpeedInv)}</div>
               <div className="text-xs text-slate-500">实际快门速度 (秒)</div>
            </div>
         </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><MonitorPlay size={18}/> 视频快门角度</h3>

         <div className="space-y-6">
            <Select 
               label="帧率 (FPS)"
               value={fps.toString()}
               options={[
                  {label: '24 fps (电影感)', value: '24'},
                  {label: '30 fps (电视/网络)', value: '30'},
                  {label: '60 fps (高流畅)', value: '60'},
               ]}
               onChange={(v) => setFps(Number(v))}
            />

            <Slider 
               label="快门角度 (Shutter Angle)" 
               value={angle} 
               min={11.25} max={360} step={11.25}
               onChange={setAngle} 
            />
            
            <div className="flex gap-2 mb-4">
               <button onClick={() => setAngle(90)} className="flex-1 py-1 bg-slate-800 text-[10px] rounded hover:bg-slate-700 text-slate-400">90° (动作片)</button>
               <button onClick={() => setAngle(180)} className="flex-1 py-1 bg-slate-800 text-[10px] rounded hover:bg-slate-700 text-emerald-400 font-bold">180° (标准)</button>
               <button onClick={() => setAngle(360)} className="flex-1 py-1 bg-slate-800 text-[10px] rounded hover:bg-slate-700 text-slate-400">360° (梦幻)</button>
            </div>
         </div>

         <div className="mt-4 bg-slate-800 p-4 rounded border border-slate-700">
            <div className="text-xs font-bold text-emerald-400 mb-2">180° 规则 (The 180° Rule)</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
               为了获得自然的、符合人眼感受的动态模糊，快门速度应为帧率倒数的两倍。
               <br/><br/>
               公式: <code className="bg-slate-900 px-1 rounded">Angle / 360 = ShutterTime * FPS</code>
               <br/><br/>
               例如 24fps 拍摄，使用 1/48s 快门 (即180°)，模糊程度最接近人眼感受。
            </p>
         </div>
      </div>
    </div>
  );
};

// --- 4. Rolling Shutter Simulator ---
export const RollingShutterSimulator: React.FC = () => {
  const [readoutSpeed, setReadoutSpeed] = useState(30); // ms
  const [rpm, setRpm] = useState(600);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const bladeLength = 150;
      
      const rotationSpeed = (rpm / 60) * 2 * Math.PI; 
      const scanlines = 100; // Increased resolution
      const scanTimePerLine = readoutSpeed / scanlines / 1000; 

      const currentTime = (time - startTime) / 1000;

      for (let i = 0; i < scanlines; i++) {
        const y = (i / scanlines) * canvas.height;
        const h = canvas.height / scanlines;
        
        const rowTime = currentTime + (i * scanTimePerLine); 
        const currentAngle = rowTime * rotationSpeed;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y, canvas.width, h + 1); // +1 to prevent gaps
        ctx.clip(); 

        ctx.translate(centerX, centerY);
        ctx.rotate(currentAngle);
        
        ctx.fillStyle = '#ef4444'; 
        ctx.fillRect(-8, -bladeLength, 16, bladeLength * 2);
        
        ctx.restore();
      }

      const scanProgress = (currentTime % (readoutSpeed/1000)) / (readoutSpeed/1000);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.5)'; 
      ctx.fillRect(0, scanProgress * canvas.height, canvas.width, 2);

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [readoutSpeed, rpm]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-black flex items-center justify-center relative">
         <canvas ref={canvasRef} width={600} height={400} className="max-w-full" />
         <div className="absolute top-4 left-4 text-xs text-slate-500 font-mono">
            Sensor Readout Simulation
         </div>
      </div>
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><ScanLine size={18}/> 果冻效应 (Rolling Shutter)</h3>
        
        <div className="space-y-6">
          <Slider label="传感器读出速度 (ms)" value={readoutSpeed} min={1} max={100} step={1} onChange={setReadoutSpeed} />
          <div className="flex justify-between text-[10px] text-slate-500 -mt-2">
             <span>Global (1ms)</span>
             <span>Slow (100ms)</span>
          </div>

          <Slider label="物体转速 (RPM)" value={rpm} min={60} max={2000} step={10} onChange={setRpm} />
        </div>

        <div className="mt-8 space-y-4">
           <div className="bg-slate-800 p-3 rounded border-l-2 border-emerald-400">
              <div className="text-xs text-white font-bold">全局快门 (Global Shutter)</div>
              <p className="text-[10px] text-slate-400 mt-1">所有像素同时曝光。无果冻效应。常见于 RED Komodo, Sony a9 III (不差钱首选)。</p>
           </div>
           <div className="bg-slate-800 p-3 rounded border-l-2 border-pink-400">
              <div className="text-xs text-white font-bold">卷帘快门 (Rolling Shutter)</div>
              <p className="text-[10px] text-slate-400 mt-1">
                 逐行读取。读到底部时物体已移动，造成倾斜/扭曲。
                 <br/><span className="text-pink-500 font-bold">小知识：</span> 高像素机型如果不采用堆栈式底，果冻通常很严重（读得慢）。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
