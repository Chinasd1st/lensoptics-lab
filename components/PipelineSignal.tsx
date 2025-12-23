
import React, { useState } from 'react';
import { Cpu, Layers, Binary, Scissors } from 'lucide-react';

// --- 5. Sampling Simulator ---
export const SamplingSimulator: React.FC = () => {
  const [mode, setMode] = useState<'BINNING' | 'OVERSAMPLING'>('OVERSAMPLING');
  
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8">
        
        {/* Visualization of Mapping */}
        <div className="flex gap-8 items-center flex-wrap justify-center">
          {/* Source Sensor */}
          <div className="flex flex-col items-center gap-2">
             <div className="text-xs text-slate-400">8K 传感器 (33MP)</div>
             <div className="grid grid-cols-4 gap-0.5 bg-slate-800 p-1 border border-slate-700">
                {[...Array(16)].map((_, i) => (
                   <div key={i} className={`w-8 h-8 flex items-center justify-center text-[10px] ${
                      mode === 'BINNING' && [0, 2, 8, 10].includes(i) ? 'bg-emerald-500 text-white' : 
                      mode === 'BINNING' ? 'bg-slate-700 text-slate-600 opacity-30' : 
                      'bg-cyan-600 text-white'
                   }`}>
                      {mode === 'BINNING' && ![0, 2, 8, 10].includes(i) ? 'X' : 'Dat'}
                   </div>
                ))}
             </div>
          </div>

          {/* Process Arrow */}
          <div className="flex flex-col items-center gap-1">
             <div className="text-[10px] text-slate-500 font-mono">Process</div>
             <div className={`h-1 w-20 rounded ${mode === 'OVERSAMPLING' ? 'bg-gradient-to-r from-cyan-600 to-emerald-400' : 'bg-slate-600'}`}></div>
          </div>

          {/* Output Video */}
          <div className="flex flex-col items-center gap-2">
             <div className="text-xs text-slate-400">4K 视频 (8MP)</div>
             <div className="grid grid-cols-2 gap-0.5 bg-slate-800 p-1 border border-slate-700">
                {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-16 h-16 bg-emerald-500 flex items-center justify-center text-white text-xs font-bold border border-emerald-400/50">
                      Pixel
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Quality Comparison Visual */}
        <div className="mt-12 flex gap-8">
           <div className="text-center">
              <div className="w-48 h-32 bg-slate-800 relative overflow-hidden rounded border border-slate-600 mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className={`w-32 h-32 border-[10px] border-white rounded-full ${mode === 'BINNING' ? 'aliased-circle' : ''}`}></div>
                  </div>
                  {mode === 'BINNING' && (
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCA0TDQgMFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30"></div>
                  )}
              </div>
              <div className="text-sm font-bold text-slate-300">细节表现</div>
           </div>
        </div>
        <style>{`.aliased-circle { box-shadow: 0 0 0 2px black; image-rendering: pixelated; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 10% 10%, 90% 10%, 90% 90%, 10% 90%, 10% 10%); }`}</style>
      </div>

      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Cpu size={18}/> 信号采样</h3>

         <div className="space-y-4">
            <button 
               onClick={() => setMode('BINNING')}
               className={`w-full p-3 rounded-lg border text-left transition-all ${mode === 'BINNING' ? 'bg-slate-800 border-emerald-500 shadow-md' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}
            >
               <div className="font-bold text-sm mb-1">跳行采样 (Binning)</div>
               <div className="text-[10px] opacity-80">
                  只读取部分像素。速度快，发热低，但有锯齿和摩尔纹。
               </div>
            </button>

            <button 
               onClick={() => setMode('OVERSAMPLING')}
               className={`w-full p-3 rounded-lg border text-left transition-all ${mode === 'OVERSAMPLING' ? 'bg-slate-800 border-cyan-500 shadow-md' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}
            >
               <div className="font-bold text-sm mb-1">超采样 (Oversampling)</div>
               <div className="text-[10px] opacity-80">
                  读取传感器全部像素缩图。细节极致锐利，噪点更少，但处理器负载高。
               </div>
            </button>
         </div>
      </div>
    </div>
  );
};

// --- 6. Chroma Subsampling Simulator ---
export const ChromaSubsamplingSimulator: React.FC = () => {
   const [subsampling, setSubsampling] = useState<'444' | '422' | '420'>('444');

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-4">
            
            <div className="relative border-4 border-slate-700 bg-black w-[400px] h-[300px] flex items-center justify-center overflow-hidden">
               {/* Base Text */}
               <div className="absolute top-10 left-10 text-6xl font-bold text-red-600 z-10 mix-blend-screen" style={{
                  // Simulate chroma blockiness for 4:2:0
                  filter: subsampling === '420' ? 'url(#pixelate-chroma)' : 'none'
               }}>
                  RED
               </div>
               <div className="absolute bottom-10 right-10 text-6xl font-bold text-blue-600 z-10 mix-blend-screen" style={{
                  filter: subsampling === '420' ? 'url(#pixelate-chroma)' : subsampling === '422' ? 'url(#pixelate-chroma-h)' : 'none'
               }}>
                  BLUE
               </div>
               
               {/* Luma Layer (Always sharp) */}
               <div className="absolute inset-0 bg-[linear-gradient(45deg,black,transparent)] opacity-50 z-20 pointer-events-none"></div>

               {/* SVG Filters for simulation */}
               <svg className="absolute w-0 h-0">
                  <filter id="pixelate-chroma">
                     <feFlood x="0" y="0" width="2" height="2" />
                     <feComposite width="10" height="10" />
                     <feTile result="a" />
                     <feComposite in="SourceGraphic" in2="a" operator="in" />
                     <feMorphology operator="dilate" radius="4" />
                  </filter>
                  <filter id="pixelate-chroma-h">
                     <feMorphology operator="dilate" radius="2 0" />
                  </filter>
               </svg>

               <div className="absolute inset-0 grid grid-cols-2">
                  <div className="bg-white/5 border-r border-white/10"></div>
                  <div className="bg-white/5"></div>
               </div>
            </div>

            {/* Pixel Grid Visualization */}
            <div className="mt-8 flex gap-4">
               <div className="flex flex-col items-center">
                  <div className="text-xs text-slate-500 mb-2">Luma (Y)</div>
                  <div className="grid grid-cols-4 w-16 h-16 border border-slate-600">
                     {[...Array(16)].map((_,i) => <div key={i} className="bg-gray-200 border border-gray-400/50"></div>)}
                  </div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-xs text-slate-500 mb-2">Chroma (UV)</div>
                  <div className="grid grid-cols-4 w-16 h-16 border border-slate-600">
                     {subsampling === '444' && [...Array(16)].map((_,i) => <div key={i} className="bg-blue-500 border border-blue-600/50"></div>)}
                     {subsampling === '422' && [...Array(8)].map((_,i) => <div key={i} className="bg-blue-500 col-span-2 border border-blue-600/50"></div>)}
                     {subsampling === '420' && [...Array(4)].map((_,i) => <div key={i} className="bg-blue-500 col-span-2 row-span-2 border border-blue-600/50"></div>)}
                  </div>
               </div>
            </div>

         </div>

         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Layers size={18}/> 色彩采样</h3>
            
            <div className="space-y-4">
               <button onClick={() => setSubsampling('444')} className={`w-full p-3 rounded border text-left ${subsampling === '444' ? 'bg-cyan-900 border-cyan-500 text-white' : 'border-slate-700 text-slate-400'}`}>
                  <div className="font-bold text-sm">4:4:4 (全采样)</div>
                  <div className="text-[10px] opacity-70">每个像素都有独立的亮度和色彩信息。电影级画质，文件极大。</div>
               </button>
               <button onClick={() => setSubsampling('422')} className={`w-full p-3 rounded border text-left ${subsampling === '422' ? 'bg-slate-800 border-white text-white' : 'border-slate-700 text-slate-400'}`}>
                  <div className="font-bold text-sm">4:2:2 (广播级)</div>
                  <div className="text-[10px] opacity-70">水平方向每两个像素共享一个色彩。适合绿幕抠像。Sony A7S3/FX3 规格。</div>
               </button>
               <button onClick={() => setSubsampling('420')} className={`w-full p-3 rounded border text-left ${subsampling === '420' ? 'bg-slate-800 border-slate-500 text-white' : 'border-slate-700 text-slate-400'}`}>
                  <div className="font-bold text-sm">4:2:0 (消费级)</div>
                  <div className="text-[10px] opacity-70">4个像素共享一个色彩信息。流媒体、JPG图片的标准。红/蓝边缘容易出现锯齿。</div>
               </button>
            </div>
         </div>
      </div>
   );
};

// --- 7. Bit Depth Simulator (New) ---
export const BitDepthSimulator: React.FC = () => {
   const [bitDepth, setBitDepth] = useState<'8bit' | '10bit'>('10bit');

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8">
            {/* Display Visualizer */}
            <div className="w-full max-w-2xl aspect-video bg-slate-900 relative border border-slate-700 overflow-hidden">
               {/* Gradient Sky */}
               <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(to bottom, #0f172a, #1e3a8a, #c026d3, #f59e0b)',
               }}></div>
               
               {/* Banding Simulation via SVG Filter */}
               {/* We simulate banding by quantizing the color space strongly so it is visible on standard monitors */}
               <div className="absolute inset-0" style={{ filter: bitDepth === '8bit' ? 'url(#banding-sim)' : 'contrast(1.05) url(#noise-sim)' }}></div>
               
               <svg className="absolute w-0 h-0">
                  <filter id="banding-sim">
                     <feComponentTransfer>
                        <feFuncR type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1"/>
                        <feFuncG type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1"/>
                        <feFuncB type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1"/>
                     </feComponentTransfer>
                  </filter>
                  <filter id="noise-sim">
                     <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" stitchTiles="stitch" result="noise"/>
                     <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise"/>
                     <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite"/>
                     <feBlend mode="overlay" in="composite" in2="SourceGraphic"/>
                  </filter>
               </svg>

               <div className="absolute bottom-4 left-4 text-white text-xs font-mono drop-shadow-md">
                  Scene: Sunset Gradient
               </div>
            </div>
         </div>

         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Binary size={18}/> 色彩深度 (Bit Depth)</h3>

            <div className="space-y-4">
               <button onClick={() => setBitDepth('8bit')} className={`w-full p-3 rounded border text-left transition-all ${bitDepth === '8bit' ? 'bg-slate-800 border-orange-500 shadow' : 'border-slate-700 text-slate-400'}`}>
                  <div className="font-bold text-sm text-orange-400 mb-1">8-bit (1670万色)</div>
                  <div className="text-[10px] text-slate-400">
                     每通道 256 级灰度。容易出现色彩断层（Banding）。
                     <br/><span className="text-red-400 font-bold">厂家刀法：</span>为了保护高端机型，入门机往往被强制锁定在 8-bit。
                  </div>
               </button>
               
               <button onClick={() => setBitDepth('10bit')} className={`w-full p-3 rounded border text-left transition-all ${bitDepth === '10bit' ? 'bg-slate-800 border-cyan-500 shadow' : 'border-slate-700 text-slate-400'}`}>
                  <div className="font-bold text-sm text-cyan-400 mb-1">10-bit (10.7亿色)</div>
                  <div className="text-[10px] text-slate-400">
                     每通道 1024 级灰度。色彩过渡极其平滑。是 Log 拍摄和 HDR 制作的基础要求。
                  </div>
               </button>

               <div className="bg-gradient-to-r from-red-900/20 to-transparent p-3 rounded border-l-2 border-red-500 mt-4">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs mb-1">
                     <Scissors size={12} /> 索尼刀法 (Precision Cut)
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                     "这台相机各方面都很完美，就是没有 10-bit。" —— 典型刀法。
                     厂商会精准地阉割掉某个关键参数（如10bit、4K60、果冻效应），让你不得不加钱上旗舰。
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};
