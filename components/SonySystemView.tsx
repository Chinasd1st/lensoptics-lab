import React, { useState, useEffect } from 'react';
import { Camera, Circle, Scan, Brain, Sparkles, Hand, Zap, Cpu, Layers, Film, Video, Aperture, ZoomIn, Save, Clapperboard, ChevronRight, Menu, Settings, HardDrive, ArrowDown, FileVideo, List, Table, Eye, Component, Triangle } from 'lucide-react';
import { calculateSphericalAberration, CENTER_X, CENTER_Y, OPTICAL_AXIS_Y } from '../utils/optics';

type Tab = 'CORE' | 'LENS' | 'AF_AI' | 'VIDEO' | 'MECH' | 'MENU';

interface SonySystemViewProps {
  initialTab?: string;
}

export const SonySystemView: React.FC<SonySystemViewProps> = ({ initialTab }) => {
   const [activeTab, setActiveTab] = useState<Tab>('CORE');

   useEffect(() => {
      if (initialTab && ['CORE', 'LENS', 'AF_AI', 'VIDEO', 'MECH', 'MENU'].includes(initialTab)) {
         setActiveTab(initialTab as Tab);
      }
   }, [initialTab]);

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
         <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
            <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
               <TabButton active={activeTab === 'CORE'} onClick={() => setActiveTab('CORE')} icon={<Camera size={16}/>} label="核心架构 (System)" />
               <TabButton active={activeTab === 'LENS'} onClick={() => setActiveTab('LENS')} icon={<Aperture size={16}/>} label="GM 光学 (Optics)" />
               <TabButton active={activeTab === 'AF_AI'} onClick={() => setActiveTab('AF_AI')} icon={<Scan size={16}/>} label="对焦与 AI (AF)" />
               <TabButton active={activeTab === 'VIDEO'} onClick={() => setActiveTab('VIDEO')} icon={<Film size={16}/>} label="视频与色彩 (Video)" />
               <TabButton active={activeTab === 'MECH'} onClick={() => setActiveTab('MECH')} icon={<Zap size={16}/>} label="机械与防抖 (Mech)" />
               <TabButton active={activeTab === 'MENU'} onClick={() => setActiveTab('MENU')} icon={<Menu size={16}/>} label="菜单模拟 (Menu)" />
            </div>
            <div className="flex-1 relative overflow-hidden bg-slate-950">
               {activeTab === 'CORE' && <CoreModule />}
               {activeTab === 'LENS' && <LensModule />}
               {activeTab === 'AF_AI' && <AFModule />}
               {activeTab === 'VIDEO' && <VideoModule />}
               {activeTab === 'MECH' && <MechModule />}
               {activeTab === 'MENU' && <MenuModule />}
            </div>
         </div>
      </div>
   );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold whitespace-nowrap transition-colors ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

// --- 1. Core Module (Mount & Sensor) ---
const CoreModule: React.FC = () => {
   return (
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-y-auto">
         {/* Mount Section */}
         <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Circle size={20} className="text-orange-500"/> E 卡口体系 (E-mount)</h3>
            
            <div className="flex flex-col items-center mb-6">
               {/* Technical Diagram of E-Mount */}
               <div className="relative w-64 h-64">
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                     {/* Mount Body (Outer) */}
                     <circle cx="100" cy="100" r="95" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
                     {/* Mount Flange (Metal Ring) */}
                     <circle cx="100" cy="100" r="80" fill="none" stroke="#ccc" strokeWidth="12" />
                     <path d="M 100 20 L 100 30" stroke="black" strokeWidth="2" /> {/* Lock pin hole hint */}
                     
                     {/* Inner Throat */}
                     <circle cx="100" cy="100" r="74" fill="#000" />

                     {/* Contacts (10 pins typical for E-mount) */}
                     <path d="M 60 160 Q 100 175 140 160" stroke="none" fill="none" id="contactCurve" />
                     <g fill="#eab308">
                        {[...Array(10)].map((_, i) => (
                           <rect key={i} x={65 + i * 8} y={155 - Math.abs(i-4.5)*1.5} width="5" height="8" rx="1" transform={`rotate(${(i-4.5)*-2} ${65 + i * 8 + 2.5} 160)`} />
                        ))}
                     </g>

                     {/* Full Frame Sensor (36x24mm ratio approx) */}
                     <rect x="55" y="70" width="90" height="60" fill="#222" stroke="#444" strokeWidth="1" />
                     <rect x="55" y="70" width="90" height="60" fill="url(#sensorGrid)" opacity="0.3" />
                     
                     {/* APS-C Crop Line (Approx 1.5x crop) */}
                     <rect x="70" y="80" width="60" height="40" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
                     
                     {/* Measurements */}
                     <line x1="20" y1="100" x2="180" y2="100" stroke="#666" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                     <text x="100" y="95" fill="#666" fontSize="8" textAnchor="middle">Throat: 46.1mm</text>
                     
                     <defs>
                        <pattern id="sensorGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                           <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#333" strokeWidth="0.5"/>
                        </pattern>
                     </defs>
                  </svg>
                  
                  {/* Flange Distance Indicator */}
                  <div className="absolute top-0 right-0 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[10px] text-slate-300">
                     Flange: <span className="text-white font-bold">18mm</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4 text-sm text-slate-400">
               <InfoRow label="FE 镜头" value="全画幅专用 (Full Frame)。成像圈覆盖整个灰色传感器区域。" />
               <InfoRow label="E 镜头" value="APS-C 专用。成像圈仅覆盖黄色虚线框区域。插在全画幅机身上会自动开启裁切模式 (10MP~26MP)。" />
               <InfoRow label="Super 35" value="视频术语，等同于 APS-C 画幅。拍摄 4K 60p/120p 时常需使用此裁切区域。" />
            </div>
         </div>

         {/* Sensor Section */}
         <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Layers size={20} className="text-cyan-500"/> Exmor 传感器进化论</h3>
            <div className="space-y-4">
               <div className="p-4 bg-slate-800 rounded border border-slate-700">
                  <div className="font-bold text-white mb-1">Exmor (前照式)</div>
                  <div className="text-xs text-slate-400">传统结构。配线层在光电二极管上方，会阻挡部分光线。</div>
               </div>
               <div className="p-4 bg-slate-800 rounded border border-slate-700 border-l-4 border-l-blue-500">
                  <div className="font-bold text-white mb-1">Exmor R (背照式 / BSI)</div>
                  <div className="text-xs text-slate-400">配线层移至下方。进光量大增，高感画质极其纯净。A7M4, FX3 标配。</div>
               </div>
               <div className="p-4 bg-slate-800 rounded border border-slate-700 border-l-4 border-l-orange-500">
                  <div className="font-bold text-white mb-1">Exmor RS (堆栈式 / Stacked)</div>
                  <div className="text-xs text-slate-400">在背照式基础上，后方堆叠了高速 DRAM 缓存。读出速度极快，实现无果冻、30fps 连拍。A1, A9, A7V 核心技术。</div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- UPDATED: Lens & Optics Module with XA/ED ---
const LensModule: React.FC = () => {
   const [techType, setTechType] = useState<'XA' | 'ED'>('XA');
   const [enabled, setEnabled] = useState(true);
   
   const focalLength = 180;
   const lensRadius = 110;
   
   // --- XA Logic (Spherical Aberration) ---
   const { rays: xaRays, focalPoints } = React.useMemo(() => 
      calculateSphericalAberration(enabled, lensRadius, focalLength), 
   [enabled]);
   const spread = Math.max(...focalPoints) - Math.min(...focalPoints);

   // --- ED Logic (Chromatic Aberration) ---
   // Simplified simulation for visual purposes
   const edRays = React.useMemo(() => {
      const result = [];
      const colors = ['#ef4444', '#22c55e', '#3b82f6']; // R G B
      const offsets = enabled ? [0, 0, 0] : [20, 0, -20]; // Dispersion
      
      for(let i=0; i<3; i++) {
         const yOffset = -40 + i * 40; // 3 beam positions
         // Each position has RGB sub-beams
         for(let c=0; c<3; c++) {
            const focusX = CENTER_X + focalLength + offsets[c];
            result.push({
               d: `M50,${CENTER_Y + yOffset} L${CENTER_X},${CENTER_Y + yOffset} L${focusX},${CENTER_Y}`,
               color: colors[c],
               opacity: 0.6
            });
         }
      }
      return result;
   }, [enabled]);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         {/* Visual Demonstration */}
         <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
            
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

            <svg viewBox="0 0 800 500" className="w-full h-full relative z-10">
               {/* Pattern Definitions */}
               <defs>
                  <pattern id="pattern-xa-demo" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                     <line x1="0" y1="0" x2="0" y2="6" stroke="#ea580c" strokeWidth="2" />
                  </pattern>
                  <pattern id="pattern-ed-demo" patternUnits="userSpaceOnUse" width="6" height="6">
                     <line x1="0" y1="0" x2="6" y2="0" stroke="#16a34a" strokeWidth="2" />
                  </pattern>
               </defs>

               {/* Optical Axis */}
               <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#334155" strokeDasharray="5,5" />

               {/* Lens Element */}
               <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                  {/* Lens Shape */}
                  {techType === 'XA' ? (
                     // XA Shape (Complex Curve if enabled)
                     <path 
                        d={enabled 
                           ? `M0,-${lensRadius} C 35,-${lensRadius/2} 35,${lensRadius/2} 0,${lensRadius} C -35,${lensRadius/2} -35,-${lensRadius/2} 0,-${lensRadius}`
                           : `M0,-${lensRadius} Q 45,0 0,${lensRadius} Q -45,0 0,-${lensRadius}`
                        }
                        fill={enabled ? "url(#pattern-xa-demo)" : "rgba(34, 211, 238, 0.1)"} 
                        stroke={enabled ? "#ea580c" : "#22d3ee"} 
                        strokeWidth="3" 
                     />
                  ) : (
                     // ED Shape (Standard shape, but different material)
                     <path 
                        d={`M0,-${lensRadius} Q 45,0 0,${lensRadius} Q -45,0 0,-${lensRadius}`} 
                        fill={enabled ? "url(#pattern-ed-demo)" : "rgba(34, 211, 238, 0.1)"} 
                        stroke={enabled ? "#16a34a" : "#22d3ee"} 
                        strokeWidth="3" 
                     />
                  )}
                  
                  <text x="-30" y={-lensRadius - 20} fill={techType === 'XA' && enabled ? "#ea580c" : techType === 'ED' && enabled ? "#16a34a" : "#22d3ee"} fontSize="12" fontWeight="bold">
                     {enabled ? (techType === 'XA' ? '[1] XA Element' : '[2] ED Element') : 'Standard Glass'}
                  </text>
               </g>

               {/* Focal Plane Line */}
               <line 
                  x1={CENTER_X + focalLength} y1={CENTER_Y - 80} 
                  x2={CENTER_X + focalLength} y2={CENTER_Y + 80} 
                  stroke="white" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" 
               />
               <text x={CENTER_X + focalLength} y={CENTER_Y + 100} fill="white" fontSize="10" textAnchor="middle">Sensor Plane</text>

               {/* Rays Animation */}
               {techType === 'XA' ? (
                  // XA Rays (Spherical Aberration)
                  xaRays.map((ray, i) => (
                     <g key={i}>
                        <path d={`M${ray.x1},${ray.y1} L${ray.x2},${ray.y2}`} stroke={ray.color} strokeWidth="1.5" fill="none" opacity="0.8">
                           <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
                        </path>
                        <line x1={ray.x2} y1={ray.y2} x2={ray.x2 + (ray.x2 - ray.x1)*0.2} y2={ray.y2 + (ray.y2 - ray.y1)*0.2} stroke={ray.color} strokeWidth="1" opacity="0.3"/>
                     </g>
                  ))
               ) : (
                  // ED Rays (Chromatic Aberration)
                  edRays.map((ray, i) => (
                     <path key={i} d={ray.d} stroke={ray.color} strokeWidth="2" fill="none" opacity={ray.opacity} style={{mixBlendMode: 'screen'}} />
                  ))
               )}

               {/* Confusion Indicators */}
               {techType === 'XA' && !enabled && (
                  <circle cx={CENTER_X + focalLength - spread/2} cy={CENTER_Y} r={spread/2} fill="rgba(255,0,0,0.1)" stroke="red" strokeWidth="1" strokeDasharray="2,2">
                     <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
               )}
               {techType === 'ED' && !enabled && (
                  <g>
                     <circle cx={CENTER_X + focalLength - 20} cy={CENTER_Y} r="4" fill="none" stroke="blue" strokeWidth="1" />
                     <circle cx={CENTER_X + focalLength + 20} cy={CENTER_Y} r="4" fill="none" stroke="red" strokeWidth="1" />
                     <text x={CENTER_X + focalLength} y={CENTER_Y + 40} fill="white" fontSize="10" textAnchor="middle">色散 (Dispersion)</text>
                  </g>
               )}
            </svg>

            {/* Live Stats */}
            <div className="absolute bottom-8 left-8 bg-slate-900/90 border border-slate-700 p-4 rounded-lg shadow-xl backdrop-blur-md">
               <div className="flex items-center gap-4 mb-2">
                  <div className="text-xs text-slate-400">Correction Status</div>
                  <div className={`text-sm font-bold font-mono ${enabled ? 'text-emerald-400' : 'text-red-400'}`}>
                     {enabled ? 'OPTIMIZED' : 'ABERRATION DETECTED'}
                  </div>
               </div>
               <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${enabled ? 'bg-emerald-500 w-full' : 'bg-red-500 w-1/4'}`}></div>
               </div>
            </div>
         </div>

         {/* Information Panel */}
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Sparkles size={20} className="text-orange-500"/> GM 光学技术
            </h3>

            {/* Technology Selector */}
            <div className="space-y-6">
               <div>
                  <label className="text-xs text-slate-400 mb-2 block font-bold uppercase tracking-wider">Select Element Type</label>
                  <div className="flex gap-2">
                     <button onClick={() => {setTechType('XA'); setEnabled(true)}} className={`flex-1 p-3 rounded border text-left transition-all relative overflow-hidden ${techType === 'XA' ? 'bg-slate-800 border-orange-500' : 'border-slate-700 opacity-50 hover:opacity-100'}`}>
                        <div className="absolute top-0 right-0 p-1 opacity-20"><Aperture size={24} className="text-orange-500"/></div>
                        <div className="text-[10px] text-orange-400 font-bold mb-1">[1] XA 镜片</div>
                        <div className="text-[9px] text-slate-300">Extreme Aspherical</div>
                     </button>
                     <button onClick={() => {setTechType('ED'); setEnabled(true)}} className={`flex-1 p-3 rounded border text-left transition-all relative overflow-hidden ${techType === 'ED' ? 'bg-slate-800 border-green-500' : 'border-slate-700 opacity-50 hover:opacity-100'}`}>
                        <div className="absolute top-0 right-0 p-1 opacity-20"><Triangle size={24} className="text-green-500"/></div>
                        <div className="text-[10px] text-green-400 font-bold mb-1">[2] ED 镜片</div>
                        <div className="text-[9px] text-slate-300">Extra-low Dispersion</div>
                     </button>
                  </div>
               </div>

               {/* Comparison Toggle */}
               <div className="flex items-center justify-between bg-slate-800 p-3 rounded border border-slate-700">
                  <span className="text-xs text-white font-bold">启用特殊镜片 (Enable Tech)</span>
                  <button 
                     onClick={() => setEnabled(!enabled)}
                     className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-cyan-600' : 'bg-slate-600'}`}
                  >
                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${enabled ? 'left-7' : 'left-1'}`}></div>
                  </button>
               </div>

               {/* Info Box */}
               <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  {techType === 'XA' ? (
                     <div className="animate-in fade-in slide-in-from-right-4">
                        <h4 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2"><Aperture size={14}/> 极值非球面 (XA)</h4>
                        <p className="text-xs text-slate-400 leading-relaxed text-justify mb-2">
                           <strong className="text-white">作用：</strong> 修正球差（Spherical Aberration）。
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed text-justify">
                           普通非球面镜片表面研磨精度较低，会导致焦外光斑出现同心圆纹路（洋葱圈）。Sony XA 镜片精度高达 <strong>0.01微米</strong>，不仅让光线完美汇聚（高锐度），还确保了焦外如奶油般顺滑。
                        </p>
                     </div>
                  ) : (
                     <div className="animate-in fade-in slide-in-from-right-4">
                        <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2"><Triangle size={14}/> 低色散 (ED)</h4>
                        <p className="text-xs text-slate-400 leading-relaxed text-justify mb-2">
                           <strong className="text-white">作用：</strong> 修正色差（Chromatic Aberration）。
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed text-justify">
                           不同颜色的光波长不同，通过玻璃时的折射率也不同（像三棱镜一样散开）。普通玻璃会导致高反差边缘出现紫边/绿边。ED 镜片具有反常色散特性，能强行将红绿蓝三色光拉回到同一个焦点。
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 2. AF & AI Module ---
const AFModule: React.FC = () => {
   return (
      <div className="p-8 h-full overflow-y-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Scan size={20} className="text-emerald-500"/> 4D Focus (快速混合对焦)</h3>
               <div className="relative aspect-video bg-black rounded overflow-hidden mb-4 border border-slate-700">
                  <img src="https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=800" className="w-full h-full object-cover opacity-60" />
                  {/* AF Points Overlay */}
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1 p-4">
                     {[...Array(96)].map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${i % 3 === 0 || i > 20 && i < 70 ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-transparent'}`}></div>
                     ))}
                  </div>
                  {/* Tracking Box */}
                  <div className="absolute top-1/3 left-1/2 w-16 h-16 border-2 border-white translate-x-[-50%]">
                     <div className="absolute -top-4 left-0 text-[9px] bg-white text-black px-1 font-bold">TRACKING</div>
                     <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
                     <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
                  </div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-emerald-400 font-bold">相位检测 (PDAF)</span> 覆盖画面 90% 以上区域。结合反差检测，既快又准。
                  <br/>“实时追踪”功能会利用颜色、距离（深度）、图案（亮度）来死死咬住被摄体。
               </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Brain size={20} className="text-purple-500"/> AI 智能芯片 (AI Unit)</h3>
               <div className="grid grid-cols-2 gap-3 mb-4">
                  <AiBadge icon={<span className="text-xl">👤</span>} label="人类 (姿态估算)" desc="即便背身也能识别" />
                  <AiBadge icon={<span className="text-xl">🐱</span>} label="动物 / 鸟类" desc="猫眼、鸟眼优先" />
                  <AiBadge icon={<span className="text-xl">🐞</span>} label="昆虫" desc="极小目标识别" />
                  <AiBadge icon={<span className="text-xl">✈️</span>} label="交通工具" desc="汽车/火车/飞机" />
               </div>
               <p className="text-xs text-slate-400">
                  自 A7R V 开始搭载独立 AI 芯片。不再仅仅识别“眼睛”，而是构建了人体/物体的骨架模型，理解物体的形态。
               </p>
            </div>
         </div>
      </div>
   );
};

// --- 3. Video & Color Module ---
const VideoModule: React.FC = () => {
   const [format, setFormat] = useState<'HS' | 'S' | 'SI'>('S');

   return (
      <div className="p-8 h-full overflow-y-auto">
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Color Science */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Film size={20} className="text-red-500"/> Log 与色彩科学</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-400">
                     <thead className="bg-slate-800 text-slate-200 uppercase">
                        <tr>
                           <th className="p-3">名称</th>
                           <th className="p-3">特点</th>
                           <th className="p-3">应用场景</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800">
                        <tr>
                           <td className="p-3 font-bold text-white">S-Log3</td>
                           <td className="p-3">14+ 档动态范围，暗部噪点略多，需向右曝光 (+1.7 EV)。</td>
                           <td className="p-3">电影制作，需后期加载 LUT。</td>
                        </tr>
                        <tr>
                           <td className="p-3 font-bold text-white">S-Cinetone</td>
                           <td className="p-3">源自 Venice 电影机，肤色红润，高光柔和。</td>
                           <td className="p-3">直出片，Vlog，快速交付项目。</td>
                        </tr>
                        <tr>
                           <td className="p-3 font-bold text-white">HLG</td>
                           <td className="p-3">即时 HDR，高动态范围，无需复杂调色。</td>
                           <td className="p-3">电视广播，HDR 内容制作。</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* XAVC Format Selector */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Video size={20} className="text-blue-500"/> XAVC 编码体系详解</h3>
               
               <div className="flex gap-2 mb-4 bg-slate-800 p-1 rounded-lg">
                  <button onClick={() => setFormat('HS')} className={`flex-1 py-2 text-xs font-bold rounded ${format === 'HS' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}>XAVC HS (H.265)</button>
                  <button onClick={() => setFormat('S')} className={`flex-1 py-2 text-xs font-bold rounded ${format === 'S' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>XAVC S (H.264)</button>
                  <button onClick={() => setFormat('SI')} className={`flex-1 py-2 text-xs font-bold rounded ${format === 'SI' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'}`}>XAVC S-I (Intra)</button>
               </div>

               <div className="flex-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  {format === 'HS' && (
                     <div className="animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-green-900/50 text-green-400 border border-green-500/30 px-2 py-0.5 rounded text-[10px] font-bold">High Efficiency</span>
                           <span className="text-xs font-bold text-slate-300">Long GOP</span>
                        </div>
                        <ul className="space-y-3 text-xs text-slate-400">
                           <li><strong className="text-white">XAVC HS 8K:</strong> 记录 8K 影像。利用 HEVC 的高压缩率，在较小码率下实现 8K 录制。</li>
                           <li><strong className="text-white">XAVC HS 4K:</strong> 记录 4K 影像。相同画质下，文件体积比 XAVC S 小很多。</li>
                           <li className="bg-black/20 p-2 rounded text-[10px] border-l-2 border-green-500">
                              <strong className="text-green-400 block mb-1">特点:</strong> 
                              采用 H.265 (HEVC) 编码。计算量巨大，对电脑剪辑性能要求极高（建议使用代理）。但在相同数据量下画质更好。
                           </li>
                        </ul>
                     </div>
                  )}
                  {format === 'S' && (
                     <div className="animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-blue-900/50 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold">Standard</span>
                           <span className="text-xs font-bold text-slate-300">Long GOP</span>
                        </div>
                        <ul className="space-y-3 text-xs text-slate-400">
                           <li><strong className="text-white">XAVC S 4K:</strong> 以 3840×2160 分辨率记录。兼容性最好的格式。</li>
                           <li><strong className="text-white">XAVC S HD:</strong> 以 1920×1080 分辨率记录。</li>
                           <li className="bg-black/20 p-2 rounded text-[10px] border-l-2 border-blue-500">
                              <strong className="text-blue-400 block mb-1">特点:</strong> 
                              采用 H.264 (AVC) 编码。所有播放器都能播，剪辑压力适中。文件体积和画质的平衡点。
                           </li>
                        </ul>
                     </div>
                  )}
                  {format === 'SI' && (
                     <div className="animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-orange-900/50 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded text-[10px] font-bold">Intra-frame</span>
                           <span className="text-xs font-bold text-slate-300">All-I</span>
                        </div>
                        <ul className="space-y-3 text-xs text-slate-400">
                           <li><strong className="text-white">XAVC S-I 4K / HD:</strong> 每一帧都是独立压缩，不依赖前后帧（Intra）。</li>
                           <li className="bg-black/20 p-2 rounded text-[10px] border-l-2 border-orange-500">
                              <strong className="text-orange-400 block mb-1">特点:</strong> 
                              码率最高（可达 600Mbps+），文件巨大（需 V90 或 CFA 卡）。但剪辑极其流畅，不需要电脑进行复杂的解码运算。画质最佳，运动画面无伪影。
                           </li>
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Bitrate Table */}
         <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Table size={18} className="text-slate-400"/> Alpha 1 / A7M5 级录制规格参考</h3>
            <div className="overflow-x-auto rounded-lg border border-slate-700">
               <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800 text-slate-200 font-bold uppercase tracking-wider">
                     <tr>
                        <th className="p-3 border-b border-slate-700">分辨率</th>
                        <th className="p-3 border-b border-slate-700">编码格式</th>
                        <th className="p-3 border-b border-slate-700">采样 / 位深</th>
                        <th className="p-3 border-b border-slate-700">帧率</th>
                        <th className="p-3 border-b border-slate-700 text-right">预计码率 (Mbps)</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-slate-300">
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-orange-400 font-bold">XAVC S-I</span></td>
                        <td className="p-3 text-cyan-400">4:2:2 10-bit</td>
                        <td className="p-3">60p</td>
                        <td className="p-3 text-right font-mono">600</td>
                     </tr>
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-blue-400 font-bold">XAVC S</span></td>
                        <td className="p-3 text-cyan-400">4:2:2 10-bit</td>
                        <td className="p-3">120p (100p)</td>
                        <td className="p-3 text-right font-mono">280</td>
                     </tr>
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-blue-400 font-bold">XAVC S</span></td>
                        <td className="p-3 text-cyan-400">4:2:2 10-bit</td>
                        <td className="p-3">60p (50p)</td>
                        <td className="p-3 text-right font-mono">200</td>
                     </tr>
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-green-400 font-bold">XAVC HS</span></td>
                        <td className="p-3 text-slate-500">4:2:0 10-bit</td>
                        <td className="p-3">120p (100p)</td>
                        <td className="p-3 text-right font-mono">200</td>
                     </tr>
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-blue-400 font-bold">XAVC S</span></td>
                        <td className="p-3 text-cyan-400">4:2:2 10-bit</td>
                        <td className="p-3">30p / 24p</td>
                        <td className="p-3 text-right font-mono">140 / 100</td>
                     </tr>
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-blue-400 font-bold">XAVC S</span></td>
                        <td className="p-3 text-slate-500">4:2:0 8-bit</td>
                        <td className="p-3">120p</td>
                        <td className="p-3 text-right font-mono">200</td>
                     </tr>
                     <tr className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono text-white">4K UHD</td>
                        <td className="p-3"><span className="text-blue-400 font-bold">XAVC S</span></td>
                        <td className="p-3 text-slate-500">4:2:0 8-bit</td>
                        <td className="p-3">30p / 24p</td>
                        <td className="p-3 text-right font-mono">100 / 60</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 italic">* 具体码率取决于设置（例如是否开启代理录制），上表为典型最高码率参考。</p>
         </div>

      </div>
   );
};

// --- 4. Mechanics Module ---
const MechModule: React.FC = () => {
   return (
      <div className="p-8 h-full overflow-y-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Hand size={18} className="text-yellow-500"/> 防抖术语</h3>
               <ul className="space-y-4 text-xs text-slate-400">
                  <li className="border-l-2 border-yellow-500 pl-3">
                     <strong className="text-white block mb-1">IBIS (五轴防抖)</strong>
                     机身传感器物理位移。Sony 标称 5.5级 或 8.0级。
                  </li>
                  <li className="border-l-2 border-yellow-500 pl-3">
                     <strong className="text-white block mb-1">Active Mode (增强防抖)</strong>
                     数码裁切防抖。利用陀螺仪数据裁切画面边缘（约 1.1x），实现类似云台的稳定性。
                  </li>
               </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap size={18} className="text-cyan-500"/> 快门与马达</h3>
               <ul className="space-y-4 text-xs text-slate-400">
                  <li className="border-l-2 border-cyan-500 pl-3">
                     <strong className="text-white block mb-1">XD Linear Motor</strong>
                     极高推力的线性马达。专为现代微单设计，静音、极速，能跟上 30fps 连拍。
                  </li>
                  <li className="border-l-2 border-cyan-500 pl-3">
                     <strong className="text-white block mb-1">Global Shutter (a9 III)</strong>
                     全域快门。所有像素同一时刻曝光。彻底消灭果冻效应，闪光灯同步无限制。
                  </li>
               </ul>
            </div>
         </div>
         
         <div className="mt-6 bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Save size={18} className="text-blue-500"/> 存储革命：CFexpress Type A</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Comparison Visual */}
               <div className="flex flex-col gap-4 items-center justify-center bg-black/30 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-end gap-6">
                     {/* SD Card */}
                     <div className="flex flex-col items-center gap-2 group">
                        <div className="w-10 h-14 bg-slate-700 rounded-sm relative border border-slate-500 flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform">
                           <div className="absolute top-2 right-1 w-2 h-4 bg-slate-800"></div> {/* Lock switch */}
                           <span className="text-[8px] font-bold text-slate-300">SD</span>
                        </div>
                        <div className="text-center">
                           <div className="text-[10px] text-slate-400">SDXC V90</div>
                           <div className="text-xs font-bold text-white">~300 MB/s</div>
                        </div>
                     </div>

                     {/* CFA Card */}
                     <div className="flex flex-col items-center gap-2 group">
                        <div className="w-9 h-12 bg-black rounded-sm relative border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 group-hover:-translate-y-2 transition-transform">
                           <div className="absolute top-0 w-full h-2 bg-slate-800"></div>
                           <span className="text-[8px] font-bold text-blue-400">Type A</span>
                        </div>
                        <div className="text-center">
                           <div className="text-[10px] text-blue-400 font-bold">CFexpress A</div>
                           <div className="text-xs font-bold text-white">~800 MB/s</div>
                        </div>
                     </div>

                     {/* CFB Card (Reference) */}
                     <div className="flex flex-col items-center gap-2 opacity-50 grayscale">
                        <div className="w-14 h-16 bg-slate-800 rounded-sm relative border border-slate-500 flex items-center justify-center">
                           <span className="text-[8px] font-bold text-slate-400">Type B</span>
                        </div>
                        <div className="text-center">
                           <div className="text-[10px] text-slate-500">CFexpress B</div>
                           <div className="text-xs font-bold text-slate-500">Too Big</div>
                        </div>
                     </div>
                  </div>

                  {/* Slot Logic Visualization - FIXED LAYOUT */}
                  <div className="w-full bg-slate-800/50 p-4 rounded text-center border border-slate-700 mt-4">
                     <div className="text-[10px] text-slate-400 mb-3 uppercase tracking-widest font-bold">Sony Dual Slot Design</div>
                     {/* Increased height and padding to prevent text cutoff */}
                     <div className="relative w-48 h-8 mx-auto bg-black rounded border border-slate-600 flex items-center justify-center overflow-hidden mb-2">
                        <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-blue-500/20 border-r border-blue-500/50"></div>
                        <span className="text-[9px] text-slate-200 relative z-20 font-mono shadow-black drop-shadow-md">Shared Slot (SD / CFA)</span>
                     </div>
                     <div className="text-[9px] text-slate-500">
                        同一个物理卡槽可插入 SD 卡 <span className="text-white">或</span> CFexpress A 卡
                     </div>
                  </div>
               </div>

               {/* Detailed Explanation */}
               <div className="space-y-4">
                  <div className="flex gap-3">
                     <HardDrive size={18} className="text-blue-400 shrink-0 mt-1"/>
                     <div>
                        <h4 className="text-sm font-bold text-white">为什么不选更快的 Type B?</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed text-justify">
                           虽然 Type B 速度更快（1700MB/s），但体积过大，无法与 SD 卡共用卡槽。
                           <br/>Sony 选择 Type A 是为了实现<strong>双卡槽兼容性</strong>。用户在不需要极致速度时，依然可以使用廉价的 SD 卡作为备用，而无需像 Canon/Nikon 那样被迫使用不对称卡槽（一个Type B + 一个SD）。
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-3">
                     <ArrowDown size={18} className="text-emerald-400 shrink-0 mt-1"/>
                     <div>
                        <h4 className="text-sm font-bold text-white">何时必须用 Type A?</h4>
                        <ul className="text-xs text-slate-400 mt-1 space-y-1 list-disc pl-3">
                           <li>录制 <strong>XAVC S-I 4K 120p</strong> (码率高达 600-1200Mbps，超过 V90 SD卡极限)。</li>
                           <li><strong>高速连拍清缓存</strong> (如 A1 的 30fps 连拍，CFA 卡能瞬间清空缓存，SD 卡会卡顿)。</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 5. Menu Simulator Module ---
const MenuModule: React.FC = () => {
   // State for simple menu navigation simulation
   const [mainTab, setMainTab] = useState(0); // Shooting, Exposure, Focus...
   const [subTab, setSubTab] = useState(0);
   
   // Enhanced structure to support detailed items
   const menuStructure = [
      { 
         icon: <Camera size={16} />, color: 'bg-red-500', name: 'Shooting', 
         subs: [
            { title: 'Image Quality', items: [{n:'File Format', v:'RAW'}, {n:'JPEG/HEIF Switch', v:'HEIF'}] },
            { title: 'Media', items: [{n:'Format', v:'>'}, {n:'Rec. Media Settings', v:'>'}] },
            { title: 'Image Stabilization', items: [
               {n:'SteadyShot', v:'On'}, 
               {n:'SteadyShot Mode', v:'Active'}, // Simulating Active Mode
               {n:'SteadyShot Adjust.', v:'Auto'},
               {n:'Focal Length', v:'50mm'},
            ]},
            { title: 'Shooting Mode', items: [{n:'Exposure Mode', v:'Manual'}] },
         ] 
      },
      { 
         icon: <Aperture size={16} />, color: 'bg-purple-500', name: 'Exposure/Color', 
         subs: [
            { title: 'Exposure', items: [{n:'ISO', v:'800'}, {n:'ISO Range Limit', v:'>'}] },
            { title: 'White Balance', items: [{n:'White Balance', v:'Auto'}] },
            { title: 'Color/Tone', items: [{n:'D-Range Optimizer', v:'Off'}, {n:'Creative Look', v:'ST'}] },
         ]
      },
      { 
         icon: <Scan size={16} />, color: 'bg-purple-600', name: 'Focus', 
         subs: [
            { title: 'AF/MF', items: [{n:'Focus Mode', v:'Continuous AF'}, {n:'Priority Set in AF-C', v:'Balanced'}] },
            { title: 'Subject Recognition', items: [{n:'Recognition Target', v:'Human'}, {n:'Right/Left Eye Select', v:'Auto'}] },
         ]
      },
      { 
         icon: <Menu size={16} />, color: 'bg-yellow-500', name: 'Setup', 
         subs: [
            { title: 'Area/Date', items: [{n:'Language', v:'Simplified Chinese'}, {n:'Area/Date/Time Setting', v:'>'}] },
            { title: 'Reset/Save Settings', items: [{n:'Setting Reset', v:'>'}] },
         ]
      }
   ];

   const currentMenu = menuStructure[mainTab];
   const currentSub = currentMenu.subs[subTab] || { title: 'Empty', items: [] };

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center p-8 relative">
            {/* Camera Screen Simulator */}
            <div className="w-[720px] h-[480px] bg-[#1a1a1a] border-4 border-slate-800 rounded-lg relative flex overflow-hidden font-sans select-none shadow-2xl">
               
               {/* Level 1: Main Categories (Vertical Bar) */}
               <div className="w-16 bg-[#111] flex flex-col items-center py-4 gap-4 border-r border-[#333] shrink-0">
                  {menuStructure.map((m, i) => (
                     <div 
                        key={i} 
                        onClick={() => { setMainTab(i); setSubTab(0); }}
                        className={`w-10 h-10 rounded flex items-center justify-center transition-all cursor-pointer ${mainTab === i ? m.color + ' text-white shadow-lg scale-110' : 'text-slate-500 hover:bg-slate-800'}`}
                     >
                        {m.icon}
                     </div>
                  ))}
               </div>

               {/* Level 2: Sub Categories */}
               <div className="w-56 bg-[#1a1a1a] flex flex-col py-2 border-r border-[#333] shrink-0 overflow-y-auto">
                  <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-[#333] truncate">{currentMenu.name}</div>
                  {currentMenu.subs.map((sub, i) => (
                     <div 
                        key={i}
                        onClick={() => setSubTab(i)}
                        className={`px-4 py-3 text-xs font-bold flex justify-between items-center cursor-pointer transition-colors ${subTab === i ? 'bg-[#fcd34d] text-black' : 'text-slate-300 hover:bg-slate-800'}`}
                     >
                        <span className="truncate mr-2">{i + 1}. {sub.title}</span>
                        {subTab === i && <ChevronRight size={12} className="shrink-0"/>}
                     </div>
                  ))}
               </div>

               {/* Level 3: Items (Detail View) */}
               <div className="flex-1 bg-[#222] p-4 flex flex-col">
                  <div className="text-xl font-bold text-white mb-6 border-b border-slate-600 pb-2 flex items-center gap-2">
                     {currentSub.title}
                  </div>
                  
                  <div className="space-y-2 overflow-y-auto">
                     {currentSub.items.length > 0 ? (
                        currentSub.items.map((item, i) => (
                           <div key={i} className="flex justify-between items-center p-3 bg-[#333] rounded hover:bg-[#444] cursor-pointer group transition-colors">
                              <span className="text-sm text-slate-200 font-medium">{item.n}</span>
                              <span className="text-xs font-bold text-[#fcd34d] group-hover:text-white px-2 py-1 rounded bg-[#000]/20">{item.v}</span>
                           </div>
                        ))
                     ) : (
                        <div className="text-slate-500 text-xs italic p-4">No settings in this simulation.</div>
                     )}
                  </div>
                  
                  <div className="mt-auto pt-4 flex justify-between items-end">
                     <div className="text-[10px] text-slate-500">
                        * Interactive Mockup of 2024+ New Menu
                     </div>
                     <Settings size={16} className="text-slate-600"/>
                  </div>
               </div>

            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Menu size={20} className="text-yellow-500"/> 菜单逻辑解析</h3>
            
            <div className="space-y-6">
               <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <div className="font-bold text-white text-sm mb-2">垂直层级结构</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     索尼旧菜单（水平Tab）被诟病多年。新菜单（a7S3起）采用了垂直三级结构：
                     <br/><br/>
                     1. <span className="text-red-400">主分类</span> (左侧图标)<br/>
                     2. <span className="text-yellow-400">子分类</span> (中间列表)<br/>
                     3. <span className="text-white">具体设置</span> (右侧详情)
                     <br/><br/>
                     这大大减少了翻页寻找功能的痛苦。
                  </p>
               </div>

               <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <div className="font-bold text-white text-sm mb-2">防抖设置 (Stabilization)</div>
                  <ul className="text-xs text-slate-400 space-y-2">
                     <li>
                        <strong className="text-red-400">Shooting &gt; Image Stabilization</strong>
                     </li>
                     <li className="pl-2 border-l-2 border-slate-600">
                        <span className="text-white">SteadyShot:</span> 开启/关闭
                     </li>
                     <li className="pl-2 border-l-2 border-slate-600">
                        <span className="text-white">SteadyShot Mode:</span> 
                        <br/> - <span className="text-yellow-400">Standard (标准):</span> 纯物理防抖
                        <br/> - <span className="text-yellow-400">Active (增强):</span> 物理+电子裁切 (适合手持走动)
                     </li>
                     <li className="pl-2 border-l-2 border-slate-600">
                        <span className="text-white">Adjust. (手动焦距):</span> 
                        <br/>使用老镜头时必须手动输入焦距，否则防抖会失效或产生果冻。
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Helper Components ---
const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
   <div className="flex border-b border-slate-800 pb-2 last:border-0 last:pb-0">
      <span className="w-32 font-bold text-white shrink-0 truncate mr-2" title={label}>{label}</span>
      <span className="text-slate-400 text-sm truncate">{value}</span>
   </div>
);

const AiBadge: React.FC<{ icon: React.ReactNode; label: string; desc: string }> = ({ icon, label, desc }) => (
   <div className="bg-slate-800 p-3 rounded border border-slate-700 flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center border border-purple-500/50 shrink-0">{icon}</div>
      <div className="overflow-hidden">
         <div className="text-xs font-bold text-white truncate">{label}</div>
         <div className="text-[10px] text-slate-500 truncate">{desc}</div>
      </div>
   </div>
);