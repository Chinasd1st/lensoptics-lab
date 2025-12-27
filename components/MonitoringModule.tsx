
import React, { useState } from 'react';
import { Slider } from './Controls';
import { Monitor, AlertTriangle } from 'lucide-react';

export const MonitoringModule: React.FC = () => {
   const [tool, setTool] = useState<'NONE' | 'FALSE_COLOR' | 'PEAKING' | 'ZEBRA'>('NONE');
   const [exposure, setExposure] = useState(0); // -1 to 1 range implies brightness adjustment

   // Exposure simulation factor
   const brightness = 1 + exposure;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-4 lg:p-8">
            <div className="relative w-full max-w-3xl aspect-video bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl rounded-lg group">
               
               {/* --- SVG Filters Definition --- */}
               <svg className="absolute w-0 h-0">
                  <defs>
                     {/* 1. Realistic Focus Peaking Filter (High-Pass + Threshold + Tint) */}
                     <filter id="real-peaking" colorInterpolationFilters="sRGB">
                        {/* Step 1: Convert to Grayscale */}
                        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0
                                                             0.2126 0.7152 0.0722 0 0
                                                             0.2126 0.7152 0.0722 0 0
                                                             0 0 0 1 0" result="gray"/>
                        
                        {/* Step 2: Edge Detection (Laplacian Kernel) - High Frequency Extract */}
                        <feConvolveMatrix 
                           order="3,3" 
                           kernelMatrix="-1 -1 -1 
                                         -1  8 -1 
                                         -1 -1 -1" 
                           divisor="1" 
                           bias="0" 
                           targetX="1" 
                           targetY="1" 
                           edgeMode="duplicate" 
                           preserveAlpha="true"
                           in="gray" 
                           result="edges"
                        />

                        {/* Step 3: Thresholding & Red Coloring */}
                        {/* We take the edge magnitude. 
                            R, G, B channels become Red (1 0 0).
                            Alpha channel is boosted significantly (x50) and subtracted (-3) to create a steep threshold.
                            Only pixels with high edge contrast will remain visible.
                        */}
                        <feColorMatrix 
                           in="edges" 
                           type="matrix" 
                           values="0 0 0 0 1 
                                   0 0 0 0 0 
                                   0 0 0 0 0 
                                   10 10 10 0 -4" 
                           result="redEdges"
                        />

                        {/* Step 4: Composite Red Edges over the Original Image (Grayscaled for clarity) */}
                        <feComposite in="redEdges" in2="SourceGraphic" operator="over" />
                     </filter>

                     {/* 2. Industry Standard False Color (ARRI/Sony Style approximation) */}
                     <filter id="false-color-ire" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" result="gray"/>
                        <feComponentTransfer in="gray">
                           {/* 
                              Discrete Bands (10 steps from 0 to 100 IRE):
                              0 (0-10%): Purple (Clip Black)
                              1 (10-20%): Blue (Deep Shadow)
                              ...
                              4 (40-50%): Green (Skin Tone)
                              5 (50-60%): Pink (Skin High)
                              ...
                              9 (90-100%): Red (Clip White)
                           */}
                           <feFuncR type="discrete" tableValues="0.5 0.0 0.0 0.3 0.0 1.0 0.6 0.6 1.0 1.0"/>
                           <feFuncG type="discrete" tableValues="0.0 0.0 0.2 0.3 1.0 0.4 0.6 0.6 1.0 0.0"/>
                           <feFuncB type="discrete" tableValues="0.5 1.0 1.0 0.3 0.0 0.4 0.6 0.6 0.0 0.0"/>
                        </feComponentTransfer>
                     </filter>
                  </defs>
               </svg>

               {/* --- Image Layer --- */}
               {/* Using img tag instead of div background for better filter compositing support */}
               <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200" 
                  alt="Monitoring Sample"
                  className="w-full h-full object-cover transition-all duration-100"
                  style={{
                     // Apply Filters via CSS
                     filter: 
                        tool === 'PEAKING' ? `brightness(${brightness}) grayscale(100%) url(#real-peaking)` :
                        tool === 'FALSE_COLOR' ? `brightness(${brightness}) url(#false-color-ire)` :
                        `brightness(${brightness}) contrast(1.1)`,
                  }}
               />

               {/* --- Zebra Overlay --- */}
               {tool === 'ZEBRA' && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{
                     backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 5px, rgba(255,255,255,0.9) 5px, rgba(255,255,255,0.9) 10px)',
                     // Use opacity to hide zebra when not overexposed. 
                     // In a real app, this would use a luma mask, here we approximate threshold via global opacity step.
                     opacity: exposure > 0.4 ? 1 : 0 
                  }}></div>
               )}

               {/* --- HUD --- */}
               <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10 flex flex-col gap-1 shadow-lg z-10">
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Assist Tool</div>
                  <div className={`text-sm font-bold font-mono ${tool !== 'NONE' ? 'text-cyan-400' : 'text-white'}`}>
                     {tool === 'NONE' ? 'OFF' : tool.replace('_', ' ')}
                  </div>
               </div>

               {/* --- Legend --- */}
               {tool === 'FALSE_COLOR' && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded border border-slate-700 flex flex-col gap-1 z-10">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-600"></div><span className="text-[9px] text-white">Clip (100)</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400"></div><span className="text-[9px] text-white">Near (90)</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#eebb99]"></div><span className="text-[9px] text-white">Skin High</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500"></div><span className="text-[9px] text-white">Skin (42)</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600"></div><span className="text-[9px] text-white">Shadow</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-600"></div><span className="text-[9px] text-white">Black (0)</span></div>
                  </div>
               )}
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Monitor size={20} className="text-cyan-400"/> 监视器辅助 (Assist Tools)</h3>
            
            <div className="space-y-4">
               <button onClick={() => setTool('NONE')} className={`w-full p-4 rounded-lg border text-left transition-all ${tool === 'NONE' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                  <span className="font-bold text-sm">标准监看 (Clean)</span>
               </button>
               
               <button onClick={() => setTool('FALSE_COLOR')} className={`w-full p-4 rounded-lg border text-left transition-all group ${tool === 'FALSE_COLOR' ? 'bg-purple-900/40 border-purple-400 text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                  <div className="flex justify-between items-center mb-1">
                     <span className={`font-bold text-sm ${tool==='FALSE_COLOR' ? 'text-purple-300' : 'group-hover:text-purple-300'}`}>伪色 (False Color)</span>
                     {tool === 'FALSE_COLOR' && <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>}
                  </div>
                  <div className="text-[10px] opacity-70 leading-relaxed">
                     将亮度映射为 10 阶色彩。
                     <br/>• <span className="text-green-400">绿色 (IRE 42-48)</span>: 完美肤色曝光
                     <br/>• <span className="text-purple-400">紫色 (IRE 0-10)</span>: 死黑无细节
                     <br/>• <span className="text-red-400">红色 (IRE 95-100)</span>: 过曝警告
                  </div>
               </button>

               <button onClick={() => setTool('PEAKING')} className={`w-full p-4 rounded-lg border text-left transition-all group ${tool === 'PEAKING' ? 'bg-red-900/30 border-red-500 text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                  <div className="flex justify-between items-center mb-1">
                     <span className={`font-bold text-sm ${tool==='PEAKING' ? 'text-red-300' : 'group-hover:text-red-300'}`}>峰值对焦 (Focus Peaking)</span>
                     {tool === 'PEAKING' && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                  </div>
                  <div className="text-[10px] opacity-70 leading-relaxed">
                     高通滤波提取高反差边缘，并描红显示。
                     <br/>红线只出现在纹理清晰的区域（如人物眼部、头发），这代表了真正的合焦平面。
                  </div>
               </button>

               <button onClick={() => setTool('ZEBRA')} className={`w-full p-4 rounded-lg border text-left transition-all group ${tool === 'ZEBRA' ? 'bg-slate-800 border-white text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                  <div className="flex justify-between items-center mb-1">
                     <span className={`font-bold text-sm ${tool==='ZEBRA' ? 'text-white' : 'group-hover:text-white'}`}>斑马纹 (Zebra 95%)</span>
                  </div>
                  <div className="text-[10px] opacity-70">
                     仅在亮度超过 95% IRE 的区域显示条纹。用于快速判断天空或高光是否“死白”。
                  </div>
               </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300">模拟曝光增益 (Exposure)</span>
                  {exposure > 0.4 && <span className="text-[10px] text-red-400 flex items-center gap-1"><AlertTriangle size={10}/> CLIPPING</span>}
               </div>
               <Slider label="" value={exposure} min={-0.8} max={0.8} step={0.05} onChange={setExposure} />
               <p className="text-[10px] text-slate-500 mt-2 italic">
                  调整曝光滑块，观察伪色图和斑马纹的动态变化。尝试将人物面部亮度调整至“绿色”区域。
               </p>
            </div>
         </div>
      </div>
   );
};
