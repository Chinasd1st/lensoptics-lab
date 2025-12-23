import React, { useState } from 'react';
import { Slider, Select } from './Controls';
import { MonitorPlay, FileVideo, Film, Layers } from 'lucide-react';

type Tab = 'SHUTTER_ANGLE' | 'CODECS';

export const VideoEngineeringView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('CODECS');

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar">
           <TabButton active={activeTab === 'CODECS'} onClick={() => setActiveTab('CODECS')} icon={<FileVideo size={14}/>} label="视频压缩编码 (GOP)" />
           <TabButton active={activeTab === 'SHUTTER_ANGLE'} onClick={() => setActiveTab('SHUTTER_ANGLE')} icon={<MonitorPlay size={14}/>} label="电影快门角度" />
        </div>
        <div className="flex-1 relative overflow-hidden bg-slate-950">
           {activeTab === 'CODECS' && <CodecModule />}
           {activeTab === 'SHUTTER_ANGLE' && <ShutterAngleModule />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-6 py-4 text-xs font-bold transition-colors whitespace-nowrap ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

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
                  <p className="text-[9px] text-slate-400">双向参考帧。压缩率极高，但导致高延迟。</p>
               </div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto">
            <h3 className="text-lg font-bold mb-6">视频编码架构 (GOP)</h3>
            <Slider label="GOP 长度 (Frames)" value={gopSize} min={2} max={24} onChange={setGopSize} />
            <div className="mt-6 space-y-4">
               <div className="text-[10px] text-slate-400 leading-relaxed bg-slate-800 p-4 rounded-lg border border-slate-700 italic">
                  <span className="text-white font-bold block mb-1">Long-GOP vs All-I:</span>
                  网络视频和流媒体通常使用 Long-GOP 以节省带宽。专业录制（如 ProRes All-I）每帧都是 I 帧，确保后期调色时数据完全原始，剪辑极其流畅。
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
            <Select label="基准帧率 (FPS)" value={fps.toString()} options={[{label:'24fps', value:'24'}, {label:'60fps', value:'60'}]} onChange={(v)=>setFps(parseInt(v))} />
            <Slider label="快门角度" value={angle} min={11.25} max={360} step={11.25} onChange={setAngle} />
            <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700">
               <span className="text-emerald-400 font-bold block mb-2">180度快门规则:</span>
               <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  为了获得自然的、符合人眼感受的动态模糊，快门速度应设定为帧率倒数的2倍。24fps 时快门应为 1/48s (180°)。
                  <br/><br/>
                  角度越小，运动越“跳动”（如战争片）；角度越大，运动越“拖沓”（如幻觉效果）。
               </p>
            </div>
         </div>
      </div>
   );
};
