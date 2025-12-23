
import React, { useState } from 'react';
import { Slider, Toggle } from './Controls';
import { Cpu, Layers, Binary, Sun, ImagePlus, Sparkles, Thermometer, RefreshCcw } from 'lucide-react';

type Tab = 'WHITE_BALANCE' | 'SAMPLING' | 'BIT_DEPTH' | 'HDR' | 'AI_COMP';

export const DigitalISPView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('WHITE_BALANCE');

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Responsive Scrollable Tab Bar */}
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'WHITE_BALANCE'} onClick={() => setActiveTab('WHITE_BALANCE')} icon={<Sun size={14}/>} label="白平衡与色温" />
           <TabButton active={activeTab === 'SAMPLING'} onClick={() => setActiveTab('SAMPLING')} icon={<Cpu size={14}/>} label="去马赛克与采样" />
           <TabButton active={activeTab === 'BIT_DEPTH'} onClick={() => setActiveTab('BIT_DEPTH')} icon={<Binary size={14}/>} label="量化色深" />
           <TabButton active={activeTab === 'HDR'} onClick={() => setActiveTab('HDR')} icon={<ImagePlus size={14}/>} label="多帧 HDR" />
           <TabButton active={activeTab === 'AI_COMP'} onClick={() => setActiveTab('AI_COMP')} icon={<Sparkles size={14}/>} label="AI 计算摄影" />
        </div>
        <div className="flex-1 relative overflow-hidden">
           {activeTab === 'WHITE_BALANCE' && <WBModule />}
           {activeTab === 'HDR' && <HDRModule />}
           {activeTab === 'SAMPLING' && <SamplingModule />}
           {activeTab === 'BIT_DEPTH' && <BitDepthModule />}
           {activeTab === 'AI_COMP' && <AIModule />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold whitespace-nowrap transition-colors ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

const WBModule: React.FC = () => {
   const [kelvin, setKelvin] = useState(5600);
   const [tint, setTint] = useState(0); // -50 (Green) to +50 (Magenta)

   // --- PHYSICS CORRECTION ---
   // Previous logic had cross-talk between Temp and Tint.
   // New Logic: Independent channel gain simulation.
   
   // 1. Temperature Axis (Blue <-> Amber)
   // 5600K is neutral.
   // Lower K (e.g. 3000K) -> Scene is Warm -> Camera adds Blue gain to compensate (Cooling)
   // Higher K (e.g. 8000K) -> Scene is Cool -> Camera adds Red gain to compensate (Warming)
   
   // Wait, UI behavior in cameras:
   // Setting "3200K" means "I am in 3200K light". Camera applies Blue filter. Result on daylight image: BLUE.
   // Setting "8000K" means "I am in 8000K light". Camera applies Orange filter. Result on daylight image: ORANGE.
   
   const tempFactor = (kelvin - 5600) / 4400; // -1 (Cool Setting/Blue Img) to +1 (Warm Setting/Orange Img)
   
   // Matrix gains for Temperature
   // Increasing Kelvin -> Increases Red, Decreases Blue
   const rTemp = 1 + (tempFactor > 0 ? tempFactor * 0.8 : 0);
   const bTemp = 1 + (tempFactor < 0 ? -tempFactor * 0.8 : 0);
   // Green is minimally affected by pure Temp shift (Planckian locus)
   
   // 2. Tint Axis (Green <-> Magenta)
   // Tint > 0 (Magenta): Boost R & B, reduce G
   // Tint < 0 (Green): Boost G, reduce R & B
   const tVal = tint / 50; // -1 to 1
   
   const gTint = 1 + (tVal < 0 ? -tVal * 0.5 : 0); // Boost Green if tint negative
   const rbTint = 1 + (tVal > 0 ? tVal * 0.3 : 0); // Boost R/B if tint positive (Magenta)

   // Final Matrix Composition
   const rFinal = rTemp * rbTint;
   const gFinal = 1 * gTint; // Green is primarily controlled by Tint axis
   const bFinal = bTemp * rbTint;

   const matrixValues = `
      ${rFinal} 0 0 0 0
      0 ${gFinal} 0 0 0
      0 0 ${bFinal} 0 0
      0 0 0 1 0
   `;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
            {/* Source Image */}
            <div className="relative w-full h-full max-w-4xl flex items-center justify-center bg-[#1a1a1a]">
               <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'url(#wb-filter)' }} 
                  alt="Workbench"
               />
               
               {/* Color Checker Chart Simulation */}
               <div className="absolute bottom-8 right-8 w-40 h-28 bg-white p-1 rounded shadow-xl flex flex-wrap content-start" style={{ filter: 'url(#wb-filter)' }}>
                  {['#735244', '#c29682', '#627a9d', '#576c43', '#8580b1', '#67bdaa', 
                    '#d67e2c', '#505ba6', '#c15a63', '#5e3c6c', '#9dbc40', '#e0a32e',
                    '#383d96', '#469449', '#af363c', '#e7c71f', '#bb5695', '#0885a1',
                    '#f3f3f2', '#c8c8c8', '#a0a0a0', '#7a7a7a', '#555555', '#343434'].map((c,i) => (
                     <div key={i} className="w-[16.66%] h-[25%]" style={{backgroundColor: c}}></div>
                  ))}
               </div>

               {/* SVG Filter Definition */}
               <svg className="absolute w-0 h-0">
                  <filter id="wb-filter">
                     <feColorMatrix type="matrix" values={matrixValues} />
                  </filter>
               </svg>
            </div>

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur p-3 rounded border border-slate-600">
               <div className="text-xs text-slate-400 font-mono mb-1">CAMERA SETTING</div>
               <div className={`text-xl font-bold font-mono ${kelvin > 6000 ? 'text-orange-400' : kelvin < 4000 ? 'text-blue-400' : 'text-white'}`}>
                  {kelvin}K
               </div>
               <div className={`text-xs mt-1 font-mono ${tint > 0 ? 'text-fuchsia-400' : tint < 0 ? 'text-green-400' : 'text-slate-500'}`}>
                  Tint: {tint > 0 ? `+${tint} CC` : tint < 0 ? `${tint} CC` : '0'}
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                  <Thermometer className="text-orange-400" size={20}/> 
                  白平衡 (White Balance)
               </h3>
               <button onClick={()=>{setKelvin(5600); setTint(0)}} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400" title="Reset">
                  <RefreshCcw size={14}/>
               </button>
            </div>
            
            <div className="space-y-8">
               {/* Temp Slider */}
               <div>
                  <div className="flex justify-between mb-2 text-xs font-bold">
                     <span className="text-blue-500">2000K</span>
                     <span className="text-slate-300">Temperature (蓝/琥珀轴)</span>
                     <span className="text-orange-500">10000K</span>
                  </div>
                  <input 
                     type="range" min="2000" max="10000" step="100" 
                     value={kelvin} 
                     onChange={(e) => setKelvin(Number(e.target.value))}
                     className="w-full h-2 bg-gradient-to-r from-blue-600 via-white to-orange-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                     修正光源的冷暖。数字越高画面越暖(黄)，数字越低画面越冷(蓝)。
                  </div>
               </div>

               {/* Tint Slider */}
               <div>
                  <div className="flex justify-between mb-2 text-xs font-bold">
                     <span className="text-green-500">-50 (Green)</span>
                     <span className="text-slate-300">Tint (绿/品红轴)</span>
                     <span className="text-fuchsia-500">+50 (Magenta)</span>
                  </div>
                  <input 
                     type="range" min="-50" max="50" step="1" 
                     value={tint} 
                     onChange={(e) => setTint(Number(e.target.value))}
                     className="w-full h-2 bg-gradient-to-r from-green-600 via-white to-fuchsia-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                     <strong className="text-red-400">修正关键点：</strong> 很多LED灯具或廉价日光灯管会存在严重的色偏（CRI指数低）。如画面发绿，需向右(品红)调整 Tint 来中和。
                  </div>
               </div>

               {/* Preset Buttons */}
               <div className="grid grid-cols-2 gap-2">
                  <button onClick={()=>{setKelvin(3200);setTint(0)}} className="p-2 bg-slate-800 border border-slate-700 rounded text-xs text-orange-200 hover:bg-slate-700 flex flex-col items-center">
                     <span className="font-bold">钨丝灯</span>
                     <span className="opacity-50">3200K</span>
                  </button>
                  <button onClick={()=>{setKelvin(5600);setTint(0)}} className="p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white hover:bg-slate-700 flex flex-col items-center">
                     <span className="font-bold">日光</span>
                     <span className="opacity-50">5600K</span>
                  </button>
                  <button onClick={()=>{setKelvin(4200);setTint(-20)}} className="p-2 bg-slate-800 border border-slate-700 rounded text-xs text-emerald-200 hover:bg-slate-700 flex flex-col items-center">
                     <span className="font-bold">老式荧光灯</span>
                     <span className="opacity-50">4200K + Green</span>
                  </button>
                  <button onClick={()=>{setKelvin(6500);setTint(10)}} className="p-2 bg-slate-800 border border-slate-700 rounded text-xs text-blue-200 hover:bg-slate-700 flex flex-col items-center">
                     <span className="font-bold">阴天</span>
                     <span className="opacity-50">6500K + Mag</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

const SamplingModule: React.FC = () => {
   const [mode, setMode] = useState<'BINNING' | 'OVERSAMPLING'>('OVERSAMPLING');
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8">
            <div className="grid grid-cols-2 gap-8">
               <div className="flex flex-col items-center gap-2">
                  <div className="text-xs text-slate-500 mb-2">传感器原始数据 (RAW Bayer)</div>
                  <div className="grid grid-cols-4 gap-1 p-2 bg-slate-800 border border-slate-700">
                     {[...Array(16)].map((_, i) => <div key={i} className={`w-6 h-6 lg:w-8 lg:h-8 rounded-sm ${mode === 'BINNING' && i % 2 !== 0 ? 'bg-slate-700 opacity-20' : i % 2 === 0 ? 'bg-green-500/80' : i % 3 === 0 ? 'bg-red-500/80' : 'bg-blue-500/80'}`}></div>)}
                  </div>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="text-xs text-slate-500 mb-2">最终视频像素 (RGB)</div>
                  <div className="grid grid-cols-2 gap-1 p-2 bg-slate-800 border border-slate-700">
                     {[...Array(4)].map((_, i) => <div key={i} className="w-12 h-12 lg:w-16 lg:h-16 bg-white flex items-center justify-center text-black text-xs font-bold border border-slate-400">
                        RGB
                     </div>)}
                  </div>
               </div>
            </div>
            <div className="mt-10 p-4 border border-dashed border-slate-600 rounded bg-black/30">
               {mode === 'BINNING' ? 
                  <span className="text-xs text-orange-400 font-mono flex items-center gap-2"><Cpu size={14}/> Line Skipping Active: Moire Risk High</span> : 
                  <span className="text-xs text-cyan-400 font-mono flex items-center gap-2"><Cpu size={14}/> Full Readout: High SNR / Detail</span>
               }
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">去马赛克 (Demosaicing)</h3>
            <div className="space-y-3">
               <button onClick={() => setMode('BINNING')} className={`w-full p-4 rounded-lg border text-left transition-all ${mode === 'BINNING' ? 'bg-slate-800 border-orange-500' : 'border-slate-700'}`}>
                  <div className="text-sm font-bold text-orange-400 mb-1">跳行采样 (Binning)</div>
                  <div className="text-[10px] text-slate-400">传感器每隔一行读取一行。虽然数据量减少使读出速度变快（减少果冻效应），但由于丢失了空间信息，斜线边缘会出现锯齿，细密纹理会出现摩尔纹。</div>
               </button>
               <button onClick={() => setMode('OVERSAMPLING')} className={`w-full p-4 rounded-lg border text-left transition-all ${mode === 'OVERSAMPLING' ? 'bg-slate-800 border-cyan-500' : 'border-slate-700'}`}>
                  <div className="text-sm font-bold text-cyan-400 mb-1">超采样 (Oversampling)</div>
                  <div className="text-[10px] text-slate-400">例如用 6K 分辨率拍摄，但输出 4K 文件。实际上是把 6K 的信息量“浓缩”进 4K。这不仅增加了锐度，还因为四个物理像素合并为一个逻辑像素，大幅抵消了随机噪点。</div>
               </button>
            </div>
         </div>
      </div>
   );
};

const BitDepthModule: React.FC = () => {
   const [bit, setBit] = useState(8);
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-lg aspect-video relative rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-600" style={{
                  filter: bit === 8 ? 'contrast(1.1) brightness(1.1) grayscale(0.2)' : 'none'
               }}></div>
               {bit === 8 && <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMTUpIi8+PC9zdmc+')] opacity-20"></div>}
               <div className="absolute bottom-4 left-4 text-xs font-mono bg-black/60 p-2 rounded">{bit === 8 ? '8-bit (256 steps/ch)' : '10-bit (1024 steps/ch)'}</div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">数字量化色深</h3>
            <div className="flex gap-2 mb-8">
               <button onClick={() => setBit(8)} className={`flex-1 py-4 rounded border font-bold ${bit === 8 ? 'bg-orange-900/40 border-orange-500 text-orange-200' : 'border-slate-700 text-slate-500'}`}>8-bit</button>
               <button onClick={() => setBit(10)} className={`flex-1 py-4 rounded border font-bold ${bit === 10 ? 'bg-cyan-900/40 border-cyan-500 text-cyan-200' : 'border-slate-700 text-slate-500'}`}>10-bit</button>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-4">
               <p className="text-xs text-slate-400 leading-relaxed italic">
                  {bit === 8 ? '8-bit 共有 1670 万色。在蓝天、日落等大面积渐变场景中，由于灰阶不足，会出现明显的“色彩断层”（Banding）。' : '10-bit 共有 10.7 亿色。灰阶数量是 8-bit 的 4 倍。它是 Log 伽马曲线拍摄的硬性门槛，否则后期拉伸对比度时画面会瞬间破碎。'}
               </p>
               <div className="h-px bg-slate-700"></div>
               <p className="text-[10px] text-slate-500">注：很多相机标称 10-bit，但如果是 4:2:0 采样，其实色度分辨率依然较低。最佳画质是 10-bit 4:2:2。</p>
            </div>
         </div>
      </div>
   );
};

const HDRModule: React.FC = () => {
   const [merge, setMerge] = useState(false);
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-4">
            {!merge ? (
               <div className="flex gap-2">
                  <div className="w-32 h-20 bg-slate-950 border border-slate-700 flex items-end p-2"><span className="text-[10px] text-white">Short Exp (Highlighs)</span></div>
                  <div className="w-32 h-20 bg-slate-500 border border-slate-700 flex items-end p-2"><span className="text-[10px] text-white">Mid Exp (Base)</span></div>
                  <div className="w-32 h-20 bg-white border border-slate-700 flex items-end p-2"><span className="text-[10px] text-black font-bold">Long Exp (Shadows)</span></div>
               </div>
            ) : (
               <div className="w-96 h-60 bg-gradient-to-tr from-slate-950 via-slate-700 to-white border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  <span className="text-cyan-400 font-bold text-xl tracking-widest">32-bit FLOAT MERGE</span>
               </div>
            )}
            <button onClick={() => setMerge(!merge)} className="mt-8 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-full font-bold transition-all transform active:scale-95 shadow-lg">
               {merge ? 'RESET BUFFER' : 'PROCESS MERGE'}
            </button>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">计算摄影 HDR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
               现代手机和部分电影机（如 RED 的 HDRX）会在按下快门的瞬间，同时捕捉欠曝（保护高光）和过曝（提亮暗部）的帧，ISP 实时将它们对齐并合成。这突破了单帧物理动态范围（Dynamic Range）的限制。
            </p>
         </div>
      </div>
   );
};

const AIModule: React.FC = () => {
   const [enabled, setEnabled] = useState(false);
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center relative">
            <div className={`w-80 h-80 rounded overflow-hidden relative border-2 border-slate-700 transition-all ${enabled ? 'scale-110 shadow-[0_0_50px_rgba(168,85,247,0.3)]' : ''}`}>
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" className={`w-full h-full object-cover transition-all ${enabled ? 'contrast-125 saturate-125 sharpen' : 'grayscale brightness-75 blur-[1px]'}`} />
               {enabled && <div className="absolute inset-0 bg-purple-500/5 mix-blend-overlay"></div>}
               <div className="absolute top-2 right-2 bg-purple-600 text-white text-[9px] px-2 py-1 rounded font-bold">{enabled ? 'NPU: NEURAL ENGINE' : 'RAW INPUT'}</div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">AI 计算摄影 (DLSS/Upscaling)</h3>
            <Toggle label="启用 AI 画质增强" checked={enabled} onChange={setEnabled} />
            <div className="mt-6 space-y-4">
               <div className="text-[10px] text-slate-400 p-3 bg-slate-800 rounded border-l-2 border-purple-500">
                  <span className="text-purple-400 font-bold block mb-1">伪影警告 (Artifacts)</span>
                  NPU 不是在“恢复”细节，而是在“猜”细节。在处理重复纹理（如草地、砖墙）或极细线条时，AI 可能会产生物理上不存在的图案，或将噪点误判为细节并锐化，导致画面出现“油画感”。
               </div>
            </div>
         </div>
      </div>
   );
};
