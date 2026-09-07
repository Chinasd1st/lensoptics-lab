
import React, { useState, useEffect } from 'react';
import { Calculator, Clock, Aperture, Activity, FileAudio, Timer, ArrowRight, Sun, Moon } from 'lucide-react';
import { LoudnessAnalyzerModule } from './loudness/LoudnessAnalyzerModule';
import { Slider, Select } from './Controls';

type ToolType = 'LOUDNESS' | 'DOF' | 'TIMELAPSE' | 'ND_CALC';

interface UtilityToolsViewProps {
  initialTab?: string;
}

export const UtilityToolsView: React.FC<UtilityToolsViewProps> = ({ initialTab }) => {
  const [activeTool, setActiveTool] = useState<ToolType>('DOF');

  useEffect(() => {
     if (initialTab && ['LOUDNESS', 'DOF', 'TIMELAPSE', 'ND_CALC'].includes(initialTab)) {
        setActiveTool(initialTab as ToolType);
     }
  }, [initialTab]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
           <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Calculator size={24} className="text-primary-400"/> 实用工具箱
           </h2>
           <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">纯前端计算，无数据上传。</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
           <NavButton active={activeTool === 'DOF'} onClick={() => setActiveTool('DOF')} icon={<Aperture size={18}/>} label="景深计算器" sub="Depth of Field" />
           <NavButton active={activeTool === 'TIMELAPSE'} onClick={() => setActiveTool('TIMELAPSE')} icon={<Clock size={18}/>} label="延时摄影计算" sub="Time-Lapse" />
           <NavButton active={activeTool === 'ND_CALC'} onClick={() => setActiveTool('ND_CALC')} icon={<Sun size={18}/>} label="长曝光/ND换算" sub="Exposure & ND" />
           <NavButton active={activeTool === 'LOUDNESS'} onClick={() => setActiveTool('LOUDNESS')} icon={<Activity size={18}/>} label="响度分析仪" sub="Loudness Analyzer" />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 relative overflow-y-auto no-scrollbar">
         {activeTool === 'DOF' && <DoFCalculator />}
         {activeTool === 'TIMELAPSE' && <TimeLapseCalculator />}
         {activeTool === 'ND_CALC' && <NDCalculator />}
         {activeTool === 'LOUDNESS' && <LoudnessAnalyzerModule />}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string }> = ({ active, onClick, icon, label, sub }) => (
   <button 
      onClick={onClick}
      className={`w-full p-3 rounded-lg text-left transition-colors flex items-center gap-3 focus:outline-none ${active ? 'bg-primary-100 border border-primary-300 dark:bg-primary-900/30 dark:border-primary-500/50' : 'hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-transparent'}`}
   >
      <div className={`${active ? 'text-primary-600 dark:text-primary-400' : 'text-zinc-600 dark:text-zinc-400'}`}>{icon}</div>
      <div>
         <div className={`text-sm font-bold ${active ? 'text-primary-900 dark:text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>{label}</div>
         <div className="text-[10px] text-zinc-600 dark:text-zinc-400">{sub}</div>
      </div>
   </button>
);

// --- 1. DoF Calculator ---
const DoFCalculator: React.FC = () => {
   const [focalLength, setFocalLength] = useState(50);
   const [aperture, setAperture] = useState(2.8);
   const [distance, setDistance] = useState(200); // cm
   const [sensor, setSensor] = useState(0.03); // CoC: FF=0.03, APSC=0.02

   // Calculation
   // Hyperfocal Distance H = f^2 / (N * c) + f
   // Near Limit = H * d / (H + (d - f))
   // Far Limit = H * d / (H - (d - f))
   
   const f = focalLength;
   const N = aperture;
   const c = sensor;
   const d = distance * 10; // Convert to mm

   const H = (f * f) / (N * c) + f;
   const near = (H * d) / (H + (d - f));
   const far = (H * d) / (H - (d - f));
   
   const totalDoF = far > 0 ? far - near : Infinity;
   const hyperfocalM = H / 1000;

   // Visual Scaling
   const visualScale = 100 / (d * 2); // Scale based on focus distance

   return (
      <div className="p-6 lg:p-12 h-full flex flex-col items-center">
         <div className="max-w-4xl w-full space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3"><Aperture className="text-cyan-400"/> 景深计算器</h3>

            {/* Visualizer */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 relative overflow-hidden h-64 flex flex-col justify-center">
               {/* Ground Plane */}
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-800/50 to-transparent"></div>
               
               {/* Camera */}
               <div className="absolute left-4 bottom-1/2 transform translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="w-4 h-12 bg-zinc-500 rounded"></div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">Camera</div>
               </div>

               {/* Axis Line */}
               <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-zinc-600"></div>

               {/* Focus Point */}
               <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center transition-colors duration-300" style={{ left: '50%' }}>
                  <div className="w-1 h-4 bg-white"></div>
                  <div className="w-3 h-3 bg-zinc-50 rounded-full -mt-1.5"></div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white mt-2 bg-zinc-100/80 dark:bg-zinc-900 px-2 rounded">{(d/1000).toFixed(2)}m (焦点)</div>
               </div>

               {/* DoF Zone */}
               <div className="absolute top-1/2 transform -translate-y-1/2 h-16 bg-emerald-500/20 border-x-2 border-emerald-500/50 flex items-center justify-center transition-colors duration-300"
                  style={{
                     left: `${(near / (d * 2)) * 100}%`,
                     right: `${100 - (far > d * 2 || far < 0 ? 100 : (far / (d * 2)) * 100)}%`
                  }}
               >
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap px-2">清晰范围</span>
               </div>

               {/* Hyperfocal Hint */}
               {d > H && <div className="absolute top-4 right-4 text-xs text-yellow-600 dark:text-yellow-500 font-bold border border-yellow-500/30 px-2 py-1 rounded bg-yellow-900/20">已超焦距 (无限远清晰)</div>}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">最近清晰距离</div>
                  <div className="text-xl font-mono font-bold text-zinc-900 dark:text-white">{(near/1000).toFixed(2)}m</div>
               </div>
               <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">最远清晰距离</div>
                  <div className="text-xl font-mono font-bold text-zinc-900 dark:text-white">{far < 0 ? '∞' : (far/1000).toFixed(2) + 'm'}</div>
               </div>
               <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">总景深</div>
                  <div className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{totalDoF === Infinity ? '∞' : (totalDoF/1000).toFixed(2) + 'm'}</div>
               </div>
               <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">超焦距距离</div>
                  <div className="text-xl font-mono font-bold text-yellow-600 dark:text-yellow-400">{hyperfocalM.toFixed(2)}m</div>
               </div>
            </div>

            {/* Controls */}
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <Select 
                     label="传感器画幅" 
                     value={sensor.toString()} 
                     options={[
                        { label: '全画幅 (Full Frame)', value: '0.03' },
                        { label: 'APS-C (Sony/Nikon)', value: '0.02' },
                        { label: 'APS-C (Canon)', value: '0.019' },
                        { label: 'Micro 4/3', value: '0.015' },
                     ]}
                     onChange={(v) => setSensor(parseFloat(v))}
                  />
                  <Slider label="焦距 (mm)" value={focalLength} min={14} max={200} step={1} onChange={setFocalLength} />
               </div>
               <div>
                  <Slider label="光圈 (f/x)" value={aperture} min={1.0} max={22} step={0.1} onChange={setAperture} />
                  <Slider label="对焦距离 (cm)" value={distance} min={30} max={1000} step={10} onChange={setDistance} />
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 2. Time-Lapse Calculator ---
const TimeLapseCalculator: React.FC = () => {
   const [clipDuration, setClipDuration] = useState(10); // seconds
   const [fps, setFps] = useState(24);
   const [interval, setInterval] = useState(5); // seconds
   const [fileSizeMB, setFileSizeMB] = useState(50); // Raw size per photo

   const totalFrames = clipDuration * fps;
   const shootingDurationSecs = totalFrames * interval;
   const totalStorageMB = totalFrames * fileSizeMB;

   const formatTime = (secs: number) => {
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = Math.floor(secs % 60);
      if (h > 0) return `${h}小时 ${m}分`;
      return `${m}分 ${s}秒`;
   };

   return (
      <div className="p-6 lg:p-12 h-full flex flex-col items-center">
         <div className="max-w-4xl w-full space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3"><Clock className="text-cyan-400"/> 延时摄影计算器</h3>

            {/* Results Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="text-sm text-zinc-200 mb-2 font-bold uppercase tracking-wider">拍摄时长</div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-white">{formatTime(shootingDurationSecs)}</div>
                  <div className="text-xs text-primary-500 dark:text-cyan-400 mt-2 font-mono">你需要在这里守这么久</div>
               </div>
               <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 font-bold uppercase tracking-wider">快门次数</div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-white font-mono">{totalFrames}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">Shots</div>
               </div>
               <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 font-bold uppercase tracking-wider">存储需求</div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-white font-mono">{(totalStorageMB / 1024).toFixed(1)} GB</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">Based on {fileSizeMB}MB/Raw</div>
               </div>
            </div>

            {/* Controls */}
            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h4 className="font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">输出目标 (Target)</h4>
                  <Slider label="成片时长 (秒)" value={clipDuration} min={1} max={60} step={1} onChange={setClipDuration} />
                  <Slider label="视频帧率 (FPS)" value={fps} min={24} max={60} step={1} onChange={setFps} />
               </div>
               
               <div className="space-y-6">
                  <h4 className="font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">拍摄设置 (Shooting)</h4>
                  <Slider label="拍摄间隔 (秒)" value={interval} min={1} max={60} step={1} onChange={setInterval} />
                  <Slider label="单张照片大小 (MB)" value={fileSizeMB} min={20} max={100} step={5} onChange={setFileSizeMB} />
               </div>
            </div>

            {/* Advice Box */}
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 flex gap-4">
               <div className="p-3 bg-yellow-900/20 rounded-full h-min text-yellow-600 dark:text-yellow-500"><Sun size={20}/></div>
               <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">拍摄建议</h4>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 list-disc pl-4">
                     <li><strong>间隔选择：</strong> 云流/车流 (1-2秒)，日落 (3-5秒)，星空 (15-30秒)，植物生长 (5-10分钟)。</li>
                     <li><strong>快门速度：</strong> 建议使用慢门（拖影）以获得流畅的动态模糊。快门速度最好是间隔时间的 1/2 (180度规则)。</li>
                     <li>例如间隔 2秒，快门设为 1秒。</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 3. ND / Long Exposure Calculator ---
const NDCalculator: React.FC = () => {
   const [baseShutter, setBaseShutter] = useState(100); // 1/x
   const [ndStop, setNdStop] = useState(10); // ND1000

   const shutterSec = 1 / baseShutter;
   const factor = Math.pow(2, ndStop);
   const newShutterSec = shutterSec * factor;

   const formatShutter = (sec: number) => {
      if (sec < 1) return `1/${Math.round(1/sec)}s`;
      if (sec < 60) return `${sec.toFixed(1)}s`;
      const m = Math.floor(sec / 60);
      const s = Math.round(sec % 60);
      return `${m}m ${s}s`;
   };

   return (
      <div className="p-6 lg:p-12 h-full flex flex-col items-center">
         <div className="max-w-4xl w-full space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3"><Sun className="text-primary-400"/> 长曝光计算器</h3>

            {/* Visual Transformation */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 py-8">
               
               <div className="bg-white text-black w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_white]">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">Base Shutter</div>
                  <div className="text-3xl font-black font-mono">1/{baseShutter}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">正常曝光</div>
               </div>

               <div className="flex flex-col items-center">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">MULTIPLY BY</div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded border border-zinc-300 dark:border-zinc-600 font-mono text-primary-500 dark:text-cyan-400 font-bold">2^{ndStop}</div>
                  <ArrowRight className="text-zinc-600 dark:text-zinc-400 mt-2" size={24}/>
               </div>

               <div className="bg-black text-zinc-900 dark:text-white border-2 border-zinc-200 dark:border-zinc-800 w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-900/50"></div>
                  <div className="relative z-10 text-center">
                     <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-1">Target Shutter</div>
                     <div className="text-3xl font-black font-mono text-primary-500 dark:text-cyan-400">{formatShutter(newShutterSec)}</div>
                     <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{newShutterSec.toFixed(1)} Seconds</div>
                  </div>
                  {/* Timer Animation ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                     <circle cx="96" cy="96" r="90" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="565" strokeDashoffset="400" opacity="0.3"/>
                  </svg>
               </div>

            </div>

            {/* Controls */}
            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 gap-8">
               <Slider label="未加滤镜时的正常快门 (1/x 秒)" value={baseShutter} min={10} max={4000} step={10} onChange={setBaseShutter} />
               
               <div>
                  <div className="flex justify-between mb-2">
                     <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">ND 滤镜档位</label>
                     <span className="text-sm text-primary-600 dark:text-primary-400 font-mono font-bold bg-primary-100 dark:bg-primary-900/20 px-2 rounded">ND {Math.pow(2, ndStop)} ({ndStop} Stops)</span>
                  </div>
                  <input type="range" min="1" max="16" step={1} value={ndStop} onChange={(e) => setNdStop(Number(e.target.value))} className="w-full h-3 bg-zinc-100 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-cyan-500" />
                  <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono">
                     <span>ND2 (1)</span>
                     <span>ND64 (6)</span>
                     <span>ND1000 (10)</span>
                     <span>ND65000 (16)</span>
                  </div>
               </div>
            </div>

            {/* Usage Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Sun size={14}/> 白天拍流水 (ND64 / ND1000)</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                     如果正常快门是 1/100s，加上 ND1000 (10档) 后，快门变成 10秒。足以把瀑布拍成丝绸，把水面拍平。
                  </p>
               </div>
               <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Moon size={14}/> 消除路人 (ND32k+)</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                     如果在白天需要 2分钟以上的曝光来消除广场上的行人，你需要 13-16 档的减光。
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};
