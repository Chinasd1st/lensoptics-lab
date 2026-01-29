
import React, { useState } from 'react';
import { Info, MousePointer2, Activity, Waves, MoveHorizontal, AlertTriangle, Image as ImageIcon, Box } from 'lucide-react';

type ParamKey = 'INTEGRATED' | 'SHORT_TERM' | 'MOMENTARY' | 'LRA' | 'TRUE_PEAK' | 'LEVELS' | 'SOUND_FIELD';

export const InsightGuideModule: React.FC = () => {
   const [activeParam, setActiveParam] = useState<ParamKey>('INTEGRATED');
   const [showRealImage, setShowRealImage] = useState(false);
   const [imgError, setImgError] = useState(false);

   const definitions: Record<ParamKey, { title: string; subtitle: string; desc: string; tip: string; color: string }> = {
      INTEGRATED: {
         title: "Integrated Loudness",
         subtitle: "全片平均响度 (I)",
         desc: "这是最重要的交付指标。它计算了从开始播放到结束的整体平均响度（自动剔除了静音段）。",
         tip: "流媒体平台（如B站、YouTube）主要根据这个数值进行音量标准化。目标通常是 -14 LUFS (Web) 或 -23 LUFS (TV)。",
         color: "text-emerald-400"
      },
      SHORT_TERM: {
         title: "Short-term Loudness",
         subtitle: "短期响度 (S)",
         desc: "过去 3 秒的滑动平均值。它反应了当前的“听感”音量。",
         tip: "做混音时主要看它。用来平衡对白（通常控制在 -18 ~ -20 LUFS）和音乐的比例。",
         color: "text-cyan-400"
      },
      MOMENTARY: {
         title: "Momentary Loudness",
         subtitle: "瞬时响度 (M)",
         desc: "过去 400ms 的瞬时电平。反应极快，指针跳动剧烈。",
         tip: "主要用于检查突发的大动态声音（如爆炸、枪声）是否过响。不适合作为整体平衡的参考。",
         color: "text-yellow-400"
      },
      LRA: {
         title: "Loudness Range",
         subtitle: "响度范围 (LRA)",
         desc: "统计学指标，描述了最响部分和最轻部分之间的差距（以 LU 为单位）。",
         tip: "LRA 越大，动态越大（如电影）；LRA 越小，声音越平（如电视广告）。网络视频建议 LRA < 6 LU，以便在嘈杂环境也能听清。",
         color: "text-purple-400"
      },
      TRUE_PEAK: {
         title: "True Peak",
         subtitle: "真峰值 (dBTP)",
         desc: "通过 4 倍过采样预测的模拟波形峰值。它能检测到普通数字 Peak 表检测不到的“采样间峰值”。",
         tip: "这是最后的防线。必须控制在 -1.0 dBTP (Web) 或 -2.0 dBTP (TV) 以下，否则转码成 MP3/AAC 时会产生削波失真。",
         color: "text-red-400"
      },
      LEVELS: {
         title: "Levels / True Peak Meters",
         subtitle: "实时电平表",
         desc: "显示当前左右声道的瞬时电平和保持峰值。",
         tip: "如果红灯亮起（Clip），说明信号已经爆音。Insight 的表头通常结合了 True Peak 检测，比传统 DAW 的推子更灵敏。",
         color: "text-blue-400"
      },
      SOUND_FIELD: {
         title: "Sound Field / Phase",
         subtitle: "声场与相位 (Lissajous)",
         desc: "显示立体声的宽度和相位相关性。垂直线代表单声道(Mono)，水平线代表反相，圆形/椭圆代表良好的立体声。",
         tip: "必须保持图形主要在垂直方向延伸（+1 相关性）。如果图形变得扁平甚至水平（-1），说明出现了严重的相位抵消，单声道播放时声音会消失。",
         color: "text-green-400"
      }
   };

   const current = definitions[activeParam];

   return (
      <div className="h-full flex flex-col lg:flex-row gap-6 p-4">
         {/* Left: Interactive UI Simulation or Real Image */}
         <div className="flex-1 flex flex-col items-center justify-center bg-black/50 rounded-2xl border border-slate-800 p-8 select-none relative overflow-hidden">
            
            {/* View Toggle Button */}
            <div className="absolute top-4 right-4 z-20">
               <button 
                  onClick={() => setShowRealImage(!showRealImage)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 text-xs font-bold transition-all shadow-lg"
               >
                  {showRealImage ? <Box size={14}/> : <ImageIcon size={14}/>}
                  {showRealImage ? '返回交互模式' : '查看真实截图'}
               </button>
            </div>

            {showRealImage ? (
               <div className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  {!imgError ? (
                     // Using relative path 'img/...' assumes the img folder is served from the same root as index.html
                     <img 
                        src="img/loudness/1_insight2.png" 
                        alt="iZotope Insight 2 Screenshot" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-slate-700"
                        onError={() => setImgError(true)}
                     />
                  ) : (
                     <div className="flex flex-col items-center justify-center text-slate-500 p-8 border-2 border-dashed border-slate-700 rounded-lg bg-black/20 max-w-md text-center">
                        <AlertTriangle size={32} className="text-red-500 mb-3"/>
                        <p className="font-bold text-red-400 mb-2">Image Not Found (404)</p>
                        <div className="text-xs space-y-1 bg-black/40 p-4 rounded border border-slate-800 text-left font-mono text-slate-400">
                           <p>Expected path:</p>
                           <p className="text-white">/img/loudness/1_insight2.png</p>
                           <p className="mt-2 text-[10px] text-slate-500">Troubleshooting:</p>
                           <ul className="list-disc pl-4 space-y-1">
                              <li>Ensure <code>img</code> folder is in the project root (next to index.html).</li>
                              <li>Check file name case (1_insight2.png).</li>
                              <li>Check if your server is serving static files correctly.</li>
                           </ul>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <>
                  <div className="text-[10px] text-slate-500 mb-4 flex items-center gap-2">
                     <MousePointer2 size={12}/> 鼠标悬停查看参数含义
                  </div>

                  {/* Insight 2 Style Interface Layout */}
                  <div className="w-full max-w-lg bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl overflow-hidden flex flex-col font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
                     
                     {/* Top Bar (Header) */}
                     <div className="bg-[#111] px-3 py-1 flex justify-between items-center border-b border-[#333]">
                        <span className="text-[10px] text-slate-400 font-bold tracking-widest">Insight 2 (Simulation)</span>
                        <div className="flex gap-2">
                           <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                           <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        </div>
                     </div>

                     {/* Section 1: Loudness Data */}
                     <div className="p-4 grid grid-cols-3 gap-1 border-b border-[#333]">
                        {/* Integrated (Big) */}
                        <div 
                           className={`col-span-3 bg-[#0a0a0a] border border-[#333] p-4 flex justify-between items-end rounded hover:border-emerald-500 cursor-help transition-colors group ${activeParam === 'INTEGRATED' ? 'border-emerald-500 bg-emerald-900/10' : ''}`}
                           onMouseEnter={() => setActiveParam('INTEGRATED')}
                        >
                           <div className="flex flex-col">
                              <span className="text-[10px] text-slate-500 font-bold uppercase mb-1 group-hover:text-emerald-400">Integrated</span>
                              <span className="text-5xl font-black text-emerald-400 font-mono leading-none">-14.1</span>
                           </div>
                           <span className="text-xs text-slate-600 font-mono mb-1">LUFS</span>
                        </div>

                        {/* Short Term */}
                        <div 
                           className={`bg-[#0a0a0a] border border-[#333] p-2 rounded hover:border-cyan-500 cursor-help transition-colors group ${activeParam === 'SHORT_TERM' ? 'border-cyan-500 bg-cyan-900/10' : ''}`}
                           onMouseEnter={() => setActiveParam('SHORT_TERM')}
                        >
                           <span className="text-[9px] text-slate-500 block mb-1 group-hover:text-cyan-400">Short Term</span>
                           <span className="text-xl font-bold text-cyan-400 font-mono">-13.8</span>
                           <span className="text-[8px] text-slate-600 ml-1">LUFS</span>
                        </div>

                        {/* Momentary */}
                        <div 
                           className={`bg-[#0a0a0a] border border-[#333] p-2 rounded hover:border-yellow-500 cursor-help transition-colors group ${activeParam === 'MOMENTARY' ? 'border-yellow-500 bg-yellow-900/10' : ''}`}
                           onMouseEnter={() => setActiveParam('MOMENTARY')}
                        >
                           <span className="text-[9px] text-slate-500 block mb-1 group-hover:text-yellow-400">Momentary</span>
                           <span className="text-xl font-bold text-yellow-400 font-mono">-10.2</span>
                           <span className="text-[8px] text-slate-600 ml-1">LUFS</span>
                        </div>

                        {/* LRA */}
                        <div 
                           className={`bg-[#0a0a0a] border border-[#333] p-2 rounded hover:border-purple-500 cursor-help transition-colors group ${activeParam === 'LRA' ? 'border-purple-500 bg-purple-900/10' : ''}`}
                           onMouseEnter={() => setActiveParam('LRA')}
                        >
                           <span className="text-[9px] text-slate-500 block mb-1 group-hover:text-purple-400">LRA</span>
                           <span className="text-xl font-bold text-purple-400 font-mono">5.4</span>
                           <span className="text-[8px] text-slate-600 ml-1">LU</span>
                        </div>
                     </div>

                     {/* Section 2: Levels & True Peak */}
                     <div className="p-4 grid grid-cols-4 gap-4 border-b border-[#333] h-40">
                        {/* Left Meters */}
                        <div 
                           className={`col-span-3 bg-[#0a0a0a] border border-[#333] rounded p-2 flex flex-col justify-between hover:border-blue-500 cursor-help transition-colors group ${activeParam === 'LEVELS' ? 'border-blue-500 bg-blue-900/10' : ''}`}
                           onMouseEnter={() => setActiveParam('LEVELS')}
                        >
                           <span className="text-[9px] text-slate-500 font-bold group-hover:text-blue-400">Levels</span>
                           <div className="flex-1 flex gap-2 justify-center items-end py-2">
                              <div className="w-4 h-[80%] bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 rounded-t-sm opacity-80"></div>
                              <div className="w-4 h-[75%] bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 rounded-t-sm opacity-80"></div>
                           </div>
                           <div className="flex justify-around text-[9px] text-slate-600 font-mono">
                              <span>L</span><span>R</span>
                           </div>
                        </div>

                        {/* True Peak Value */}
                        <div 
                           className={`col-span-1 bg-[#0a0a0a] border border-[#333] rounded p-2 flex flex-col justify-center items-center hover:border-red-500 cursor-help transition-colors group ${activeParam === 'TRUE_PEAK' ? 'border-red-500 bg-red-900/10' : ''}`}
                           onMouseEnter={() => setActiveParam('TRUE_PEAK')}
                        >
                           <span className="text-[9px] text-slate-500 font-bold mb-2 text-center group-hover:text-red-400">True Peak<br/>Max</span>
                           <span className="text-xl font-bold text-red-400 font-mono">-1.2</span>
                           <span className="text-[8px] text-slate-600">dBTP</span>
                        </div>
                     </div>

                     {/* Section 3: Sound Field */}
                     <div 
                        className={`h-32 bg-[#0a0a0a] border-t border-[#333] relative flex items-center justify-center hover:border-green-500 cursor-help transition-colors group ${activeParam === 'SOUND_FIELD' ? 'bg-green-900/10' : ''}`}
                        onMouseEnter={() => setActiveParam('SOUND_FIELD')}
                     >
                        <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-bold group-hover:text-green-400">Sound Field (Lissajous)</div>
                        
                        {/* Lissajous Figure Simulation */}
                        <svg className="w-24 h-24 opacity-80" viewBox="0 0 100 100">
                           <path d="M50,10 Q80,50 50,90 Q20,50 50,10" fill="none" stroke="#22c55e" strokeWidth="1" />
                           <path d="M50,20 Q70,50 50,80 Q30,50 50,20" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
                           <line x1="50" y1="0" x2="50" y2="100" stroke="#333" strokeWidth="1" strokeDasharray="2" />
                           <line x1="0" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="2" />
                        </svg>
                        
                        <div className="absolute right-4 bottom-4 flex flex-col items-end">
                           <span className="text-[9px] text-slate-500">Correlation</span>
                           <div className="w-20 h-1 bg-slate-800 rounded mt-1 overflow-hidden">
                              <div className="w-[80%] h-full bg-green-500 ml-[10%]"></div>
                           </div>
                           <span className="text-[9px] text-green-400 font-mono">+0.8</span>
                        </div>
                     </div>

                  </div>
               </>
            )}
         </div>

         {/* Right: Explanation Panel */}
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-xl transition-colors duration-300 border-t lg:border-t-0">
            <div className="flex-1 flex flex-col justify-center">
               <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold w-fit mb-6 bg-slate-800 border ${current.color.replace('text-', 'border-')}`}>
                  <Activity size={14} className={current.color} />
                  <span className={current.color}>{current.subtitle}</span>
               </div>
               
               <h2 className="text-3xl font-bold text-white mb-2">{current.title}</h2>
               <div className={`h-1 w-20 rounded mb-6 ${current.color.replace('text-', 'bg-')}`}></div>
               
               <p className="text-sm text-slate-300 leading-7 mb-8 text-justify">
                  {current.desc}
               </p>

               <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                     <Info size={14} className="text-yellow-400"/> 实战应用
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     {current.tip}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};
