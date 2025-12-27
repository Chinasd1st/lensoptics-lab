
import React, { useState, useEffect } from 'react';
import { Slider, Select } from './Controls';
import { MonitorPlay, FileVideo, Film, Layers, HardDrive, Cpu, Scissors } from 'lucide-react';

type Tab = 'SHUTTER_ANGLE' | 'CODECS' | 'FORMATS';

interface VideoEngineeringViewProps {
  initialTab?: string;
}

export const VideoEngineeringView: React.FC<VideoEngineeringViewProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('CODECS');

  useEffect(() => {
     if (initialTab && ['SHUTTER_ANGLE', 'CODECS', 'FORMATS'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
  }, [initialTab]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'CODECS'} onClick={() => setActiveTab('CODECS')} icon={<FileVideo size={16}/>} label="视频压缩架构 (GOP)" />
           <TabButton active={activeTab === 'FORMATS'} onClick={() => setActiveTab('FORMATS')} icon={<Film size={16}/>} label="常用编码 (ProRes/H.265)" />
           <TabButton active={activeTab === 'SHUTTER_ANGLE'} onClick={() => setActiveTab('SHUTTER_ANGLE')} icon={<MonitorPlay size={16}/>} label="电影快门角度" />
        </div>
        <div className="flex-1 relative overflow-hidden bg-slate-950">
           {activeTab === 'CODECS' && <CodecModule />}
           {activeTab === 'FORMATS' && <FormatsModule />}
           {activeTab === 'SHUTTER_ANGLE' && <ShutterAngleModule />}
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

const FormatsModule: React.FC = () => {
   const [format, setFormat] = useState<'PRORES' | 'H265' | 'H264'>('PRORES');

   const stats = {
      'PRORES': { bitrate: 100, cpu: 10, size: 100, color: 'bg-pink-500', label: 'ProRes 422 HQ', intra: true },
      'H265': { bitrate: 20, cpu: 90, size: 20, color: 'bg-emerald-500', label: 'H.265 (HEVC)', intra: false },
      'H264': { bitrate: 35, cpu: 50, size: 35, color: 'bg-blue-500', label: 'H.264 (AVC)', intra: false },
   }[format];

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8">
            <div className="grid grid-cols-3 gap-8 w-full max-w-4xl items-end h-64">
               {/* Bitrate Bar */}
               <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className={`w-16 rounded-t transition-all duration-500 ${stats.color}`} style={{height: `${stats.bitrate}%`}}></div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><HardDrive size={16}/> 文件体积</div>
               </div>
               
               {/* CPU Load Bar */}
               <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className={`w-16 bg-red-500 rounded-t transition-all duration-500`} style={{height: `${stats.cpu}%`}}></div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Cpu size={16}/> 剪辑卡顿 (CPU)</div>
               </div>

               {/* Quality/Intra Visual */}
               <div className="flex flex-col items-center gap-2 h-full justify-end pb-8">
                  {stats.intra ? (
                     <div className="flex gap-1">
                        {[...Array(3)].map((_,i) => <div key={i} className="w-6 h-8 bg-white border border-slate-400"></div>)}
                     </div>
                  ) : (
                     <div className="flex gap-1 opacity-50">
                        <div className="w-6 h-8 bg-white border border-slate-400"></div>
                        <div className="w-6 h-8 bg-slate-600 border border-slate-500 scale-75"></div>
                        <div className="w-6 h-8 bg-slate-600 border border-slate-500 scale-75"></div>
                     </div>
                  )}
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Scissors size={16}/> 帧结构</div>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Film size={20} className="text-cyan-400"/> 常见编码对比</h3>
            
            <div className="space-y-3">
               <button onClick={()=>setFormat('PRORES')} className={`w-full p-4 rounded-lg border text-left transition-all ${format==='PRORES' ? 'bg-pink-900/30 border-pink-500' : 'border-slate-700'}`}>
                  <div className="font-bold text-sm text-pink-400 mb-1">Apple ProRes</div>
                  <div className="text-[10px] text-slate-400">帧内编码 (All-Intra)。每一帧都是完整的图片。剪辑极其流畅，像切黄油一样，但文件体积巨大。行业标准中间流。</div>
               </button>
               <button onClick={()=>setFormat('H265')} className={`w-full p-4 rounded-lg border text-left transition-all ${format==='H265' ? 'bg-emerald-900/30 border-emerald-500' : 'border-slate-700'}`}>
                  <div className="font-bold text-sm text-emerald-400 mb-1">H.265 (HEVC)</div>
                  <div className="text-[10px] text-slate-400">帧间预测。压缩率极高，同画质下体积最小。但解码极其消耗算力，老电脑剪辑会卡成PPT。适合最终交付。</div>
               </button>
               <button onClick={()=>setFormat('H264')} className={`w-full p-4 rounded-lg border text-left transition-all ${format==='H264' ? 'bg-blue-900/30 border-blue-500' : 'border-slate-700'}`}>
                  <div className="font-bold text-sm text-blue-400 mb-1">H.264 (AVC)</div>
                  <div className="text-[10px] text-slate-400">兼容性之王。几乎所有设备都能播放。体积和性能介于前两者之间。</div>
               </button>
            </div>
         </div>
      </div>
   );
};

const CodecModule: React.FC = () => {
   const [gopSize, setGopSize] = useState(12);
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8">
            <div className="flex gap-1 overflow-x-auto max-w-full p-6 bg-black/40 rounded-xl border border-slate-700 shadow-2xl no-scrollbar">
               {[...Array(gopSize)].map((_, i) => {
                  const type = i === 0 ? 'I' : (i % 3 === 0 ? 'P' : 'B');
                  return (
                     <div key={i} className="flex flex-col items-center gap-2 min-w-[40px]">
                        <div className={`w-10 h-16 rounded shadow-lg border-2 flex items-center justify-center text-sm font-black transition-all transform hover:scale-110
                           ${type === 'I' ? 'bg-red-900/40 border-red-500 text-red-100' : 
                             type === 'P' ? 'bg-blue-900/40 border-blue-500 text-blue-100' : 
                             'bg-green-900/40 border-green-500 text-green-100'}
                        `}>{type}</div>
                        <div className="w-0.5 h-3 bg-slate-700"></div>
                        {type !== 'I' && <div className="text-[8px] text-slate-500 animate-pulse">Ref →</div>}
                     </div>
                  );
               })}
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-2xl px-4">
               <div className="bg-slate-800 p-3 rounded-lg border-t-2 border-red-500">
                  <span className="text-red-400 font-black text-[10px] block mb-1">INTRA (I-Frame)</span>
                  <p className="text-[9px] text-slate-400">完整自洽帧。体积最大，无需参考。编辑性能最强。</p>
               </div>
               <div className="bg-slate-800 p-3 rounded-lg border-t-2 border-blue-500">
                  <span className="text-blue-400 font-black text-[10px] block mb-1">PREDICTED (P-Frame)</span>
                  <p className="text-[9px] text-slate-400">前向预测帧。仅记录与上一帧的运动矢量差异。</p>
               </div>
               <div className="bg-slate-800 p-3 rounded-lg border-t-2 border-green-500">
                  <span className="text-green-400 font-black text-[10px] block mb-1">BI-DIR (B-Frame)</span>
                  <p className="text-[9px] text-slate-400 text-justify leading-tight">
                     双向预测帧。同时参考前一帧和后一帧。压缩率极高，体积最小。
                     <br/><br/>
                     <span className="text-red-400 font-bold">缺点：</span>解码器必须先“预读”后面的帧才能解开当前的 B 帧（乱序解码），这会导致剪辑时间轴极其卡顿。
                  </p>
               </div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto">
            <h3 className="text-lg font-bold mb-6">视频编码架构 (GOP)</h3>
            <Slider label="GOP 长度 (Frames)" value={gopSize} min={2} max={24} onChange={setGopSize} />
            <div className="mt-6 space-y-4">
               <div className="text-[10px] text-slate-400 leading-relaxed bg-slate-800 p-4 rounded-lg border border-slate-700 italic">
                  <span className="text-white font-bold block mb-1">Long-GOP vs All-I:</span>
                  网络视频和流媒体通常使用 Long-GOP (含大量 B 帧) 以节省带宽。
                  <br/><br/>
                  专业录制（如 ProRes 422）通常采用 All-I (全 I 帧)，虽然文件体积大，但每帧独立，拖动时间轴丝般顺滑，对 CPU 压力极小。
               </div>
            </div>
         </div>
      </div>
   );
};

const ShutterAngleModule: React.FC = () => {
   const [fps, setFps] = useState(24);
   const [angle, setAngle] = useState(180);
   const shutterSpeed = Math.round(fps * 360 / angle);
   const blurAmount = (angle / 180) * 15;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl h-48 bg-black border-y border-slate-800 relative flex items-center justify-center overflow-hidden">
               <div 
                  className="w-16 h-16 bg-cyan-500 rounded-full shadow-[0_0_20px_cyan]"
                  style={{
                     animation: `horizontal-move 0.8s infinite alternate ease-in-out`,
                     filter: `blur(${blurAmount}px)`,
                     transform: `scaleX(${1 + blurAmount/10})`
                  }}
               ></div>
            </div>
            <style>{`@keyframes horizontal-move { from { transform: translateX(-150px); } to { transform: translateX(150px); } }`}</style>
            <div className="mt-10 flex gap-10">
               <div className="text-center">
                  <div className="text-4xl font-black text-white font-mono">1/{shutterSpeed}s</div>
                  <div className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Effective Shutter</div>
               </div>
               <div className="text-center">
                  <div className="text-4xl font-black text-cyan-400 font-mono">{angle}°</div>
                  <div className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Cinema Angle</div>
               </div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">电影快门角度</h3>
            <Select 
               label="基准帧率 (FPS)"
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
      </div>
   );
};
