
import React, { useState } from 'react';
import { ArrowRight, Grid3X3, Cpu, FileImage, Globe, FileJson, Sun, Thermometer, RefreshCcw, Sparkles } from 'lucide-react';
import { Slider, Toggle } from '../Controls';

// --- Raw Format Module ---
export const RawFormatModule: React.FC = () => {
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-2xl space-y-8">
               
               {/* Visualization of Data Flow */}
               <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded flex items-center justify-center shadow-lg">
                        <Grid3X3 size={32} className="text-emerald-500" />
                     </div>
                     <div className="text-xs font-bold text-slate-300">CMOS 传感器</div>
                     <div className="text-[9px] text-slate-500">模拟电信号</div>
                  </div>

                  <ArrowRight size={20} className="text-slate-600 hidden md:block" />
                  <div className="w-0.5 h-8 bg-slate-700 md:hidden"></div>

                  <div className="flex flex-col items-center gap-2">
                     <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded flex items-center justify-center shadow-lg relative">
                        <Cpu size={32} className="text-blue-500" />
                        <span className="absolute -bottom-2 bg-blue-900 text-blue-200 text-[8px] px-1 rounded">ADC</span>
                     </div>
                     <div className="text-xs font-bold text-slate-300">模数转换</div>
                     <div className="text-[9px] text-slate-500">12/14-bit 线性</div>
                  </div>

                  <ArrowRight size={20} className="text-slate-600 hidden md:block" />
                  <div className="w-0.5 h-8 bg-slate-700 md:hidden"></div>

                  {/* RAW File Box */}
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-20 h-24 bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-orange-500 rounded-lg flex flex-col items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <FileImage size={32} className="text-orange-400 mb-2" />
                        <span className="text-xs font-black text-white">RAW</span>
                        <span className="text-[8px] text-orange-200">.ARW / .CR3</span>
                     </div>
                     <div className="text-xs font-bold text-orange-400">原始数据包</div>
                     <div className="text-[9px] text-slate-500">未处理/无损</div>
                  </div>

                  <div className="flex flex-col gap-1 md:w-32 border-l-2 border-dashed border-slate-700 pl-4 md:ml-4 text-left">
                     <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest">VS JPEG</div>
                     <div className="text-xs text-red-400 line-through decoration-slate-500">白平衡固化</div>
                     <div className="text-xs text-red-400 line-through decoration-slate-500">色域压缩</div>
                     <div className="text-xs text-red-400 line-through decoration-slate-500">8-bit 丢弃</div>
                     <div className="text-xs text-red-400 line-through decoration-slate-500">锐化/降噪</div>
                  </div>
               </div>

               {/* Comparison Table */}
               <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="grid grid-cols-3 bg-slate-900 p-3 text-xs font-bold text-slate-400 border-b border-slate-700">
                     <div>特性</div>
                     <div>RAW (原始)</div>
                     <div>JPEG (直出)</div>
                  </div>
                  <div className="divide-y divide-slate-700/50 text-xs">
                     <div className="grid grid-cols-3 p-3 hover:bg-slate-700/30">
                        <div className="text-slate-400">数据本质</div>
                        <div className="text-orange-400 font-bold">光电数值 (单色)</div>
                        <div className="text-slate-300">成品图像 (彩色)</div>
                     </div>
                     <div className="grid grid-cols-3 p-3 hover:bg-slate-700/30">
                        <div className="text-slate-400">色彩深度</div>
                        <div className="text-orange-400 font-bold">12bit ~ 16bit</div>
                        <div className="text-slate-300">8bit</div>
                     </div>
                     <div className="grid grid-cols-3 p-3 hover:bg-slate-700/30">
                        <div className="text-slate-400">白平衡</div>
                        <div className="text-orange-400 font-bold">后期任意调整</div>
                        <div className="text-slate-300">拍摄时“烘焙”定死</div>
                     </div>
                     <div className="grid grid-cols-3 p-3 hover:bg-slate-700/30">
                        <div className="text-slate-400">宽容度</div>
                        <div className="text-orange-400 font-bold">保留全部高光/暗部</div>
                        <div className="text-slate-300">两端截断丢失</div>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FileImage size={20} className="text-orange-400"/> RAW 格式详解</h3>
            
            <div className="space-y-6">
               <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-2">什么是 RAW?</h4>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify">
                     RAW 不是“图片”，它是传感器上每个像素点感光亮度的<strong>原始数据记录</strong>。它像未经冲洗的胶卷（数字底片）。
                     <br/><br/>
                     在 RAW 文件中，图像甚至还没有颜色（只是拜耳阵列的亮度值），必须经过“去马赛克 (Demosaicing)”过程才能变成可见的图像。
                  </p>
               </div>

               <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-bold text-cyan-400 mb-2">核心优势</h4>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-3">
                     <li>
                        <strong>白平衡重塑：</strong> 拍摄时设置错误（如在室内用了日光模式）？没关系，RAW 记录的是原始光线，后期可以无损修改色温。
                     </li>
                     <li>
                        <strong>极致宽容度：</strong> 找回过曝的天空层次，或提亮死黑的阴影，RAW 包含比显示器能显示的多得多的信息。
                     </li>
                     <li>
                        <strong>无损画质：</strong> 没有机内锐化、降噪涂抹的干扰，保留最真实的细节纹理。
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Color Space Module ---
export const ColorSpaceModule: React.FC = () => {
   const [gamut, setGamut] = useState<'REC709' | 'P3' | 'REC2020'>('REC709');
   const [curve, setCurve] = useState<'LINEAR' | 'LOG'>('LOG');
   
   const gamuts = {
      'REC709': { points: "150,50 80,220 220,220", area: "33.5%", label: "HDTV / Web (sRGB)", color: "#22d3ee" },
      'P3':     { points: "150,30 60,230 240,230", area: "45.5%", label: "Digital Cinema (DCI)", color: "#fbbf24" },
      'REC2020':{ points: "150,10 30,250 270,250", area: "75.8%", label: "UHD HDR / Reality", color: "#a855f7" }
   };

   const currentGamut = gamuts[gamut];

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative">
            {/* CIE 1931 Diagram Simulation */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
               <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
                  <path d="M 30,250 C 30,250 50,10 150,10 C 250,10 270,250 270,250 Z" fill="url(#spectralGradient)" stroke="none" opacity="0.2" />
                  <defs>
                     <radialGradient id="spectralGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                     </radialGradient>
                  </defs>
                  
                  <line x1="30" y1="250" x2="270" y2="250" stroke="#475569" strokeWidth="1" />
                  <line x1="30" y1="250" x2="150" y2="10" stroke="#475569" strokeWidth="1" />
                  <line x1="270" y1="250" x2="150" y2="10" stroke="#475569" strokeWidth="1" />

                  <polygon points={gamuts['REC709'].points} fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />

                  <polygon 
                     points={currentGamut.points} 
                     fill={currentGamut.color} 
                     fillOpacity="0.2" 
                     stroke={currentGamut.color} 
                     strokeWidth="2" 
                     className="transition-all duration-500 ease-out"
                  />
                  
                  <text x="150" y="40" fill="white" fontSize="10" textAnchor="middle">Green</text>
                  <text x="60" y="240" fill="white" fontSize="10" textAnchor="middle">Blue</text>
                  <text x="240" y="240" fill="white" fontSize="10" textAnchor="middle">Red</text>
               </svg>

               <div className="absolute top-0 right-0 bg-slate-800/80 backdrop-blur p-3 rounded border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">CIE 1931 Coverage</div>
                  <div className="text-2xl font-bold" style={{color: currentGamut.color}}>{currentGamut.area}</div>
                  <div className="text-[10px] text-slate-300">{currentGamut.label}</div>
               </div>
            </div>

            <div className="absolute bottom-4 left-4 w-48 h-32 bg-slate-800 border border-slate-700 rounded p-2">
               <div className="text-[10px] text-slate-400 mb-1 flex justify-between">
                  <span>OETF Curve</span>
                  <span className={curve === 'LOG' ? 'text-orange-400' : 'text-white'}>{curve}</span>
               </div>
               <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#475569" strokeWidth="1" />
                  <line x1="0" y1="50" x2="0" y2="0" stroke="#475569" strokeWidth="1" />
                  <path d="M 0,50 L 100,0" fill="none" stroke="white" strokeWidth="2" opacity={curve === 'LINEAR' ? 1 : 0.2} />
                  <path d="M 0,50 C 10,40 20,25 100,15" fill="none" stroke="#fb923c" strokeWidth="2" opacity={curve === 'LOG' ? 1 : 0.2} />
               </svg>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Globe size={18} className="text-purple-400"/> 色彩科学 (Color Science)</h3>
            
            <div className="space-y-8">
               <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">色域标准 (Color Gamut)</h4>
                  <div className="space-y-2">
                     {Object.keys(gamuts).map(k => (
                        <button key={k} onClick={() => setGamut(k as any)} className={`w-full p-3 rounded border text-left text-xs transition-all ${gamut === k ? `bg-${gamuts[k as keyof typeof gamuts].color.replace('#','').replace('22d3ee','cyan-900/30').replace('fbbf24','yellow-900/30').replace('a855f7','purple-900/30')} border-current text-white` : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
                           <span className="font-bold block">{k}</span>
                           <span className="opacity-70">{gamuts[k as keyof typeof gamuts].label}</span>
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">光电转换 (OETF / Gamma)</h4>
                  <div className="flex gap-2 mb-4">
                     <button onClick={() => setCurve('LINEAR')} className={`flex-1 p-2 rounded text-xs font-bold border ${curve === 'LINEAR' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-500'}`}>Linear</button>
                     <button onClick={() => setCurve('LOG')} className={`flex-1 p-2 rounded text-xs font-bold border ${curve === 'LOG' ? 'bg-orange-900/30 border-orange-500 text-orange-400' : 'border-slate-700 text-slate-500'}`}>Log</button>
                  </div>
                  <div className="bg-slate-800 p-3 rounded border border-slate-700 text-[10px] text-slate-300 leading-relaxed">
                     <span className="font-bold text-orange-400 block mb-1">Log 曲线原理:</span>
                     传感器是线性的，但人眼对亮度是对数感知的。Log 曲线通过压缩高光和提亮暗部，将 15+ 档动态范围“塞进”有限的容器中。画面看起来发灰，必须通过 LUT 还原。
                  </div>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2"><FileJson size={12}/> LUT 应用场景</h4>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <span className="text-[10px] font-bold text-cyan-400 block">Monitoring LUT</span>
                        <span className="text-[9px] text-slate-500">仅用于监视器预览。录制的素材依然是 Log 灰片。</span>
                     </div>
                     <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <span className="text-[10px] font-bold text-red-400 block">Baking LUT</span>
                        <span className="text-[9px] text-slate-500">直接烧录进视频。所见即所得，但丢失了宽容度。</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Bayer Moire Module ---
export const BayerMoireModule: React.FC = () => {
   const [olpf, setOlpf] = useState(false);
   const [patternDensity, setPatternDensity] = useState(50);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
            
            <div className="relative w-80 h-80 bg-black border-4 border-slate-700 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 z-10 mix-blend-multiply opacity-80 pointer-events-none">
                  {[...Array(400)].map((_, i) => {
                     const row = Math.floor(i / 20);
                     const col = i % 20;
                     let color = '';
                     if (row % 2 === 0) color = col % 2 === 0 ? 'bg-red-500' : 'bg-green-500';
                     else color = col % 2 === 0 ? 'bg-green-500' : 'bg-blue-500';
                     return <div key={i} className={`w-full h-full ${color} border-[0.5px] border-black/20`}></div>
                  })}
               </div>

               <div className="absolute inset-0 bg-white z-0 flex flex-col justify-center">
                  <div className="w-full h-full" style={{
                     backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent ${patternDensity/5}px, black ${patternDensity/5}px, black ${patternDensity/2.5}px)`,
                     filter: olpf ? 'blur(4px)' : 'none',
                     transform: 'rotate(5deg) scale(1.5)'
                  }}></div>
               </div>
            </div>

            <div className="mt-8 flex gap-8 text-center">
               <div>
                  <div className="text-4xl font-bold text-white mb-1">{olpf ? 'Clean' : 'Artifacts'}</div>
                  <div className="text-xs text-slate-500">Signal Status</div>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Grid3X3 size={18} className="text-emerald-400"/> 拜耳阵列与摩尔纹</h3>
            
            <div className="mb-8">
               <Slider label="被摄物体纹理密度 (Frequency)" value={patternDensity} min={10} max={100} step={1} onChange={setPatternDensity} />
               <p className="text-[10px] text-slate-500 mt-2">
                  当衣服或建筑的纹理密度接近传感器的像素密度时，会发生采样频率不足（奈奎斯特极限），产生彩色的干涉条纹，即摩尔纹。
               </p>
            </div>

            <Toggle label="启用 OLPF 低通滤镜" checked={olpf} onChange={setOlpf} />
            
            <div className="bg-slate-800 p-4 rounded border border-slate-700 space-y-4 mt-4">
               <div className="text-xs text-slate-300">
                  <strong className="text-cyan-400 block mb-1">OLPF (Optical Low Pass Filter)</strong>
                  物理模糊滤镜。安装在传感器前，微微模糊进光，消除极高频细节。
               </div>
            </div>
         </div>
      </div>
   );
};

// --- White Balance Module ---
export const WBModule: React.FC = () => {
   const [kelvin, setKelvin] = useState(5600);
   const [tint, setTint] = useState(0);

   const tempFactor = (kelvin - 5600) / 4400;
   const rTemp = 1 + (tempFactor > 0 ? tempFactor * 0.8 : 0);
   const bTemp = 1 + (tempFactor < 0 ? -tempFactor * 0.8 : 0);
   
   const tVal = tint / 50; 
   const gTint = 1 + (tVal < 0 ? -tVal * 0.5 : 0); 
   const rbTint = 1 + (tVal > 0 ? tVal * 0.3 : 0); 

   const rFinal = rTemp * rbTint;
   const gFinal = 1 * gTint; 
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
            <div className="relative w-full h-full max-w-4xl flex items-center justify-center bg-[#1a1a1a]">
               <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'url(#wb-filter)' }} 
                  alt="Workbench"
               />
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
                  <Thermometer className="text-orange-400" size={20}/> 白平衡
               </h3>
               <button onClick={()=>{setKelvin(5600); setTint(0)}} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400" title="Reset">
                  <RefreshCcw size={14}/>
               </button>
            </div>
            
            <div className="space-y-8">
               <div>
                  <div className="flex justify-between mb-2 text-xs font-bold">
                     <span className="text-blue-500">2000K</span>
                     <span className="text-slate-300">Temp</span>
                     <span className="text-orange-500">10000K</span>
                  </div>
                  <input 
                     type="range" min="2000" max="10000" step="100" 
                     value={kelvin} 
                     onChange={(e) => setKelvin(Number(e.target.value))}
                     className="w-full h-2 bg-gradient-to-r from-blue-600 via-white to-orange-500 rounded-lg appearance-none cursor-pointer"
                  />
               </div>

               <div>
                  <div className="flex justify-between mb-2 text-xs font-bold">
                     <span className="text-green-500">-50</span>
                     <span className="text-slate-300">Tint</span>
                     <span className="text-fuchsia-500">+50</span>
                  </div>
                  <input 
                     type="range" min="-50" max="50" step="1" 
                     value={tint} 
                     onChange={(e) => setTint(Number(e.target.value))}
                     className="w-full h-2 bg-gradient-to-r from-green-600 via-white to-fuchsia-600 rounded-lg appearance-none cursor-pointer"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Sampling Module ---
export const SamplingModule: React.FC = () => {
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
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-12 h-12 lg:w-16 lg:h-16 bg-white flex items-center justify-center text-black text-xs font-bold border border-slate-400">
                           RGB
                        </div>
                     ))}
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
         <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Cpu size={18}/> 信号采样</h3>

            <div className="space-y-3">
               <button onClick={() => setMode('BINNING')} className={`w-full p-4 rounded-lg border text-left transition-all ${mode === 'BINNING' ? 'bg-slate-800 border-orange-500' : 'border-slate-700'}`}>
                  <div className="text-sm font-bold text-orange-400 mb-1">跳行采样 (Binning)</div>
                  <div className="text-[10px] text-slate-400">传感器每隔一行读取一行。虽然数据量减少使读出速度变快，但会丢失空间信息，导致摩尔纹和锯齿。</div>
               </button>
               <button onClick={() => setMode('OVERSAMPLING')} className={`w-full p-4 rounded-lg border text-left transition-all ${mode === 'OVERSAMPLING' ? 'bg-slate-800 border-cyan-500' : 'border-slate-700'}`}>
                  <div className="text-sm font-bold text-cyan-400 mb-1">超采样 (Oversampling)</div>
                  <div className="text-[10px] text-slate-400">例如用 6K 分辨率拍摄，输出 4K。把 6K 信息量“浓缩”进 4K。画质极佳，噪点更少。</div>
               </button>
            </div>
         </div>
      </div>
   );
};

// --- AI Module ---
export const AIModule: React.FC = () => {
   const [enabled, setEnabled] = useState(false);
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center relative">
            <div className={`w-80 h-80 rounded overflow-hidden relative border-2 border-slate-700 transition-all ${enabled ? 'scale-110 shadow-[0_0_50px_rgba(168,85,247,0.3)]' : ''}`}>
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" className={`w-full h-full object-cover transition-all ${enabled ? 'contrast-125 saturate-125 sharpen' : 'grayscale brightness-75 blur-[1px]'}`} alt="AI Demo" />
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
                  NPU 不是在“恢复”细节，而是在“猜”细节。在处理重复纹理或极细线条时，AI 可能会产生不存在的图案。
               </div>
            </div>
         </div>
      </div>
   );
};
