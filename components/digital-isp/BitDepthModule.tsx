
import React, { useState } from 'react';
import { Binary, Scissors, Layers, Monitor, AlertTriangle, CheckCircle } from 'lucide-react';

export const BitDepthModule: React.FC = () => {
   const [bitDepth, setBitDepth] = useState<'8bit' | '10bit'>('10bit');

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8">
            {/* Display Visualizer */}
            <div className="w-full max-w-2xl aspect-video bg-slate-900 relative border border-slate-700 overflow-hidden shadow-2xl rounded-lg group">
               
               {/* 1. Base Gradient - The Sky */}
               <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(to bottom, #0f172a, #1e3a8a, #c026d3, #f59e0b)',
               }}></div>
               
               {/* 2. Banding Simulation Layer (8-bit) */}
               {/* We use a separate div with the filter applied to ensure it renders correctly on top */}
               <div className="absolute inset-0 transition-opacity duration-300" style={{ 
                  opacity: bitDepth === '8bit' ? 1 : 0,
                  filter: 'url(#banding-sim-isp)' 
               }}>
                  {/* Clone the background to filter it */}
                  <div className="w-full h-full" style={{
                     backgroundImage: 'linear-gradient(to bottom, #0f172a, #1e3a8a, #c026d3, #f59e0b)',
                  }}></div>
               </div>

               {/* 3. Dithering Layer (10-bit) */}
               {/* 10-bit often uses dithering to appear smooth on 8-bit screens */}
               <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none" style={{
                  opacity: bitDepth === '10bit' ? 0.4 : 0,
                  filter: 'url(#noise-sim-isp)',
                  mixBlendMode: 'overlay'
               }}></div>

               {/* SVG Filters Definition */}
               <svg className="absolute w-0 h-0" aria-hidden="true">
                  <defs>
                     {/* 
                        Banding Filter: Quantizes color into fewer steps.
                        We use 16 steps here to exaggerate the "banding" effect visually for educational purposes.
                        Real 8-bit has 256 steps, which is subtle on small screens but visible on large gradients.
                        Here we simulate "bad" 8-bit processing (like S-Log stretch).
                     */}
                     <filter id="banding-sim-isp" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                        <feComponentTransfer>
                           <feFuncR type="discrete" tableValues="0 0.07 0.14 0.21 0.28 0.35 0.42 0.49 0.56 0.63 0.7 0.77 0.84 0.91 1"/>
                           <feFuncG type="discrete" tableValues="0 0.07 0.14 0.21 0.28 0.35 0.42 0.49 0.56 0.63 0.7 0.77 0.84 0.91 1"/>
                           <feFuncB type="discrete" tableValues="0 0.07 0.14 0.21 0.28 0.35 0.42 0.49 0.56 0.63 0.7 0.77 0.84 0.91 1"/>
                        </feComponentTransfer>
                     </filter>
                     
                     {/* Noise Filter for Dithering */}
                     <filter id="noise-sim-isp" x="0" y="0" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
                        <feColorMatrix type="saturate" values="0"/>
                     </filter>
                  </defs>
               </svg>

               {/* HUD / Indicators */}
               <div className="absolute top-4 left-4 flex gap-2">
                  <div className={`px-2 py-1 rounded text-[10px] font-bold border backdrop-blur-sm ${bitDepth === '8bit' ? 'bg-red-900/80 border-red-500 text-white' : 'bg-slate-900/50 border-slate-600 text-slate-400'}`}>
                     8-bit Rec.709
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold border backdrop-blur-sm ${bitDepth === '10bit' ? 'bg-cyan-900/80 border-cyan-500 text-white' : 'bg-slate-900/50 border-slate-600 text-slate-400'}`}>
                     10-bit HEVC
                  </div>
               </div>

               {bitDepth === '8bit' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-black/60 backdrop-blur-md border border-red-500/50 text-red-200 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                        <AlertTriangle size={16} className="text-red-500"/>
                        <span className="text-xs font-bold">BANDING DETECTED (色彩断层)</span>
                     </div>
                  </div>
               )}

               <div className="absolute bottom-4 left-4 text-white text-[10px] font-mono drop-shadow-md opacity-70">
                  Scene: Sunset Gradient (High Contrast)
               </div>
            </div>
         </div>

         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Binary size={18} className="text-blue-400"/> 色彩深度 (Bit Depth)</h3>

            <div className="space-y-4">
               <button onClick={() => setBitDepth('8bit')} className={`w-full p-4 rounded-lg border text-left transition-all ${bitDepth === '8bit' ? 'bg-slate-800 border-red-500 shadow ring-1 ring-red-500/20' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                  <div className="flex justify-between items-start mb-1">
                     <div className="font-bold text-sm text-red-400">8-bit (1670万色)</div>
                     {bitDepth === '8bit' && <AlertTriangle size={14} className="text-red-500"/>}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-relaxed">
                     每通道 256 级灰度。在拍摄天空、白墙等大面积渐变时，极易出现<strong>色彩断层 (Banding)</strong>。
                     <br/><span className="text-red-400 font-bold mt-1 block">后期噩梦：</span> 一旦对 8-bit Log 素材进行调色拉伸，断层会瞬间显现。
                  </div>
               </button>
               
               <button onClick={() => setBitDepth('10bit')} className={`w-full p-4 rounded-lg border text-left transition-all ${bitDepth === '10bit' ? 'bg-slate-800 border-cyan-500 shadow ring-1 ring-cyan-500/20' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                  <div className="flex justify-between items-start mb-1">
                     <div className="font-bold text-sm text-cyan-400">10-bit (10.7亿色)</div>
                     {bitDepth === '10bit' && <CheckCircle size={14} className="text-cyan-500"/>}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-relaxed">
                     每通道 1024 级灰度。色彩过渡极其平滑。
                     <br/><span className="text-cyan-400 font-bold mt-1 block">专业标准：</span> 拍摄 Log 或 HDR 视频的最低要求。数据量虽大，但换来了后期空间的质变。
                  </div>
               </button>

               <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700 mt-4">
                  <div className="flex items-center gap-2 text-white font-bold text-xs mb-2">
                     <Scissors size={14} className="text-slate-400" /> 厂商"刀法"解析
                  </div>
                  <p className="text-[10px] text-slate-400 italic leading-relaxed">
                     为什么入门机只有 8-bit？
                     <br/>
                     不仅仅是传感器能力，更因为 10-bit 视频编码对相机处理器的算力要求呈指数级上升。厂商通过锁定 8-bit 来强行划分产品等级（如 A7M3 vs A7S3）。
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};
