
import React, { useState, useEffect } from 'react';
import { Camera, Circle, Scan, Brain, Zap, Layers, Film, Video, Aperture, Menu, Table, Triangle, Sparkles, Hand, HardDrive, Settings } from 'lucide-react';
import { calculateSphericalAberration, CENTER_X, CENTER_Y, OPTICAL_AXIS_Y } from '../utils/optics';
import { TabNavigation, TabItem } from './TabNavigation';

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

   const tabs: TabItem[] = [
      { id: 'CORE', label: '核心架构 (System)', icon: <Camera size={16}/> },
      { id: 'LENS', label: 'GM 光学 (Optics)', icon: <Aperture size={16}/> },
      { id: 'AF_AI', label: '对焦与 AI (AF)', icon: <Scan size={16}/> },
      { id: 'VIDEO', label: '视频与色彩 (Video)', icon: <Film size={16}/> },
      { id: 'MECH', label: '机械与防抖 (Mech)', icon: <Zap size={16}/> },
      { id: 'MENU', label: '菜单模拟 (Menu)', icon: <Menu size={16}/> },
   ];

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
         <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
            
            <TabNavigation 
               tabs={tabs} 
               activeTab={activeTab} 
               onTabChange={(id) => setActiveTab(id as Tab)} 
            />

            <div className="flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
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

// ... (Rest of the file remains unchanged: CoreModule, LensModule, AFModule, VideoModule, MechModule, MenuModule, InfoRow, AiBadge)
// --- 1. Core Module (Mount & Sensor) ---
const CoreModule: React.FC = () => {
   return (
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-y-auto">
         {/* Mount Section */}
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Circle size={20} className="text-primary-500"/> E 卡口体系 (E-mount)</h3>
            
            <div className="flex flex-col items-center mb-6">
               <div className="relative w-64 h-64">
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                     <circle cx="100" cy="100" r="95" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
                     <circle cx="100" cy="100" r="80" fill="none" stroke="#ccc" strokeWidth="12" />
                     <path d="M 100 20 L 100 30" stroke="black" strokeWidth="2" /> 
                     <circle cx="100" cy="100" r="74" fill="#000" />
                     <path d="M 60 160 Q 100 175 140 160" stroke="none" fill="none" id="contactCurve" />
                     <g fill="#eab308">
                        {[...Array(10)].map((_, i) => (
                           <rect key={i} x={65 + i * 8} y={155 - Math.abs(i-4.5)*1.5} width="5" height="8" rx="1" transform={`rotate(${(i-4.5)*-2} ${65 + i * 8 + 2.5} 160)`} />
                        ))}
                     </g>
                     <rect x="55" y="70" width="90" height="60" fill="#222" stroke="#444" strokeWidth="1" />
                     <rect x="55" y="70" width="90" height="60" fill="url(#sensorGrid)" opacity="0.3" />
                     <rect x="70" y="80" width="60" height="40" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
                     <line x1="20" y1="100" x2="180" y2="100" stroke="#666" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                     <text x="100" y="95" fill="#666" fontSize="8" textAnchor="middle">Throat: 46.1mm</text>
                     <defs>
                        <pattern id="sensorGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                           <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#333" strokeWidth="0.5"/>
                        </pattern>
                     </defs>
                  </svg>
                  <div className="absolute top-0 right-0 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300">
                     Flange: <span className="text-zinc-900 dark:text-white font-bold">18mm</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
               <InfoRow label="FE 镜头" value="全画幅专用 (Full Frame)。成像圈覆盖整个灰色传感器区域。" />
               <InfoRow label="E 镜头" value="APS-C 专用。成像圈仅覆盖黄色虚线框区域。插在全画幅机身上会自动开启裁切模式 (10MP~26MP)。" />
               <InfoRow label="Super 35" value="视频术语，等同于 APS-C 画幅。拍摄 4K 60p/120p 时常需使用此裁切区域。" />
            </div>
         </div>

         {/* Sensor Section */}
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Layers size={20} className="text-cyan-500"/> Exmor 传感器进化论</h3>
            <div className="space-y-4">
               <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-800">
                  <div className="font-bold text-zinc-900 dark:text-white mb-1">Exmor (前照式)</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">传统结构。配线层在光电二极管上方，会阻挡部分光线。</div>
               </div>
               <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-blue-500">
                  <div className="font-bold text-zinc-900 dark:text-white mb-1">Exmor R (背照式 / BSI)</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">配线层移至下方。进光量大增，高感画质极其纯净。A7M4, FX3 标配。</div>
               </div>
               <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-orange-500">
                  <div className="font-bold text-zinc-900 dark:text-white mb-1">Exmor RS (堆栈式 / Stacked)</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">在背照式基础上，后方堆叠了高速 DRAM 缓存。读出速度极快，实现无果冻、30fps 连拍。A1, A9, A7V 核心技术。</div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Lens Module ---
const LensModule: React.FC = () => {
   const [techType, setTechType] = useState<'XA' | 'ED'>('XA');
   const [enabled, setEnabled] = useState(true);
   const focalLength = 180;
   const lensRadius = 110;
   const { rays: xaRays, focalPoints } = React.useMemo(() => calculateSphericalAberration(enabled, lensRadius, focalLength), [enabled]);
   const spread = Math.max(...focalPoints) - Math.min(...focalPoints);
   const edRays = React.useMemo(() => {
      const result = [];
      const colors = ['#ef4444', '#22c55e', '#3b82f6'];
      const offsets = enabled ? [0, 0, 0] : [20, 0, -20];
      for(let i=0; i<3; i++) {
         const yOffset = -40 + i * 40;
         for(let c=0; c<3; c++) {
            const focusX = CENTER_X + focalLength + offsets[c];
            result.push({ d: `M50,${CENTER_Y + yOffset} L${CENTER_X},${CENTER_Y + yOffset} L${focusX},${CENTER_Y}`, color: colors[c], opacity: 0.6 });
         }
      }
      return result;
   }, [enabled]);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-zinc-50 dark:bg-black relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            <svg viewBox="0 0 800 500" className="w-full h-full relative z-10">
               <defs>
                  <pattern id="pattern-xa-demo" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#ea580c" strokeWidth="2" /></pattern>
                  <pattern id="pattern-ed-demo" patternUnits="userSpaceOnUse" width="6" height="6"><line x1="0" y1="0" x2="6" y2="0" stroke="#16a34a" strokeWidth="2" /></pattern>
               </defs>
               <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#334155" strokeDasharray="5,5" />
               <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                  {techType === 'XA' ? (
                     <path d={enabled ? `M0,-${lensRadius} C 35,-${lensRadius/2} 35,${lensRadius/2} 0,${lensRadius} C -35,${lensRadius/2} -35,-${lensRadius/2} 0,-${lensRadius}` : `M0,-${lensRadius} Q 45,0 0,${lensRadius} Q -45,0 0,-${lensRadius}`} fill={enabled ? "url(#pattern-xa-demo)" : "rgba(34, 211, 238, 0.1)"} stroke={enabled ? "#ea580c" : "#22d3ee"} strokeWidth="3" />
                  ) : (
                     <path d={`M0,-${lensRadius} Q 45,0 0,${lensRadius} Q -45,0 0,-${lensRadius}`} fill={enabled ? "url(#pattern-ed-demo)" : "rgba(34, 211, 238, 0.1)"} stroke={enabled ? "#16a34a" : "#22d3ee"} strokeWidth="3" />
                  )}
                  <text x="-30" y={-lensRadius - 20} fill={techType === 'XA' && enabled ? "#ea580c" : techType === 'ED' && enabled ? "#16a34a" : "#22d3ee"} fontSize="12" fontWeight="bold">{enabled ? (techType === 'XA' ? '[1] XA Element' : '[2] ED Element') : 'Standard Glass'}</text>
               </g>
               <line x1={CENTER_X + focalLength} y1={CENTER_Y - 80} x2={CENTER_X + focalLength} y2={CENTER_Y + 80} stroke="white" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
               <text x={CENTER_X + focalLength} y={CENTER_Y + 100} fill="white" fontSize="10" textAnchor="middle">Sensor Plane</text>
               {techType === 'XA' ? (
                  xaRays.map((ray, i) => (
                     <g key={i}>
                        <path d={`M${ray.x1},${ray.y1} L${ray.x2},${ray.y2}`} stroke={ray.color} strokeWidth="1.5" fill="none" opacity="0.8"><animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></path>
                        <line x1={ray.x2} y1={ray.y2} x2={ray.x2 + (ray.x2 - ray.x1)*0.2} y2={ray.y2 + (ray.y2 - ray.y1)*0.2} stroke={ray.color} strokeWidth="1" opacity="0.3"/>
                     </g>
                  ))
               ) : (
                  edRays.map((ray, i) => <path key={i} d={ray.d} stroke={ray.color} strokeWidth="2" fill="none" opacity={ray.opacity} style={{mixBlendMode: 'screen'}} />)
               )}
               {techType === 'XA' && !enabled && <circle cx={CENTER_X + focalLength - spread/2} cy={CENTER_Y} r={spread/2} fill="rgba(255,0,0,0.1)" stroke="red" strokeWidth="1" strokeDasharray="2,2"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" /></circle>}
               {techType === 'ED' && !enabled && <g><circle cx={CENTER_X + focalLength - 20} cy={CENTER_Y} r={4} fill="none" stroke="blue" strokeWidth="1" /><circle cx={CENTER_X + focalLength + 20} cy={CENTER_Y} r={4} fill="none" stroke="red" strokeWidth="1" /><text x={CENTER_X + focalLength} y={CENTER_Y + 40} fill="white" fontSize="10" textAnchor="middle">色散 (Dispersion)</text></g>}
            </svg>
            <div className="absolute bottom-8 left-8 bg-zinc-900/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg shadow-md backdrop-blur-md">
               <div className="flex items-center gap-4 mb-2">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Correction Status</div>
                  <div className={`text-sm font-bold font-mono ${enabled ? 'text-emerald-400' : 'text-red-400'}`}>{enabled ? 'OPTIMIZED' : 'ABERRATION DETECTED'}</div>
               </div>
               <div className="w-48 h-1 bg-zinc-50 dark:bg-zinc-800 rounded-full overflow-hidden"><div className={`h-full transition-colors duration-500 ${enabled ? 'bg-emerald-500 w-full' : 'bg-red-500 w-1/4'}`}></div></div>
            </div>
         </div>
         <div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Sparkles size={20} className="text-primary-500"/> GM 光学技术</h3>
            <div className="space-y-6">
               <div>
                  <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 block font-bold uppercase tracking-wider">Select Element Type</label>
                  <div className="flex gap-2">
                     <button onClick={() => {setTechType('XA'); setEnabled(true)}} className={`flex-1 p-3 rounded border text-left transition-colors relative overflow-hidden ${techType === 'XA' ? 'bg-zinc-200 dark:bg-zinc-800 border-primary-500' : 'border-zinc-300 dark:border-zinc-800 opacity-50 hover:opacity-100'}`}>
                        <div className="absolute top-0 right-0 p-1 opacity-20"><Aperture size={24} className="text-primary-500"/></div>
                        <div className="text-[10px] text-primary-600 dark:text-primary-400 font-bold mb-1">[1] XA 镜片</div>
                        <div className="text-[11px] text-zinc-600 dark:text-zinc-300">Extreme Aspherical</div>
                     </button>
                     <button onClick={() => {setTechType('ED'); setEnabled(true)}} className={`flex-1 p-3 rounded border text-left transition-colors relative overflow-hidden ${techType === 'ED' ? 'bg-zinc-200 dark:bg-zinc-800 border-green-500' : 'border-zinc-300 dark:border-zinc-800 opacity-50 hover:opacity-100'}`}>
                        <div className="absolute top-0 right-0 p-1 opacity-20"><Triangle size={24} className="text-green-500"/></div>
                        <div className="text-[10px] text-green-400 font-bold mb-1">[2] ED 镜片</div>
                        <div className="text-[11px] text-zinc-600 dark:text-zinc-300">Extra-low Dispersion</div>
                     </button>
                  </div>
               </div>
               <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-900 dark:text-white font-bold">启用特殊镜片 (Enable Tech)</span>
                  <button onClick={() => setEnabled(!enabled)} className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-cyan-600' : 'bg-zinc-600'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${enabled ? 'left-7' : 'left-1'}`}></div></button>
               </div>
               <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  {techType === 'XA' ? (
                     <div className="animate-fade-in slide-in-from-right-4">
                        <h4 className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2 flex items-center gap-2"><Aperture size={14}/> 极值非球面 (XA)</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify mb-2"><strong className="text-zinc-900 dark:text-white">作用：</strong> 修正球差（Spherical Aberration）。</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">普通非球面镜片表面研磨精度较低，会导致焦外光斑出现同心圆纹路（洋葱圈）。Sony XA 镜片精度高达 <strong>0.01微米</strong>，不仅让光线完美汇聚（高锐度），还确保了焦外如奶油般顺滑。</p>
                     </div>
                  ) : (
                     <div className="animate-fade-in slide-in-from-right-4">
                        <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2"><Triangle size={14}/> 低色散 (ED)</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify mb-2"><strong className="text-zinc-900 dark:text-white">作用：</strong> 修正色差（Chromatic Aberration）。</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">不同颜色的光波长不同，通过玻璃时的折射率也不同（像三棱镜一样散开）。普通玻璃会导致高反差边缘出现紫边/绿边。ED 镜片具有反常色散特性，能强行将红绿蓝三色光拉回到同一个焦点。</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

// --- AF Module ---
const AFModule: React.FC = () => (
   <div className="p-8 h-full overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Scan size={20} className="text-emerald-500"/> 4D Focus (快速混合对焦)</h3>
            <div className="relative aspect-video bg-zinc-50 dark:bg-black rounded overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-800">
               <img src="https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=800" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1 p-4">
                  {[...Array(96)].map((_, i) => <div key={i} className={`w-1 h-1 rounded-full ${i % 3 === 0 || i > 20 && i < 70 ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-transparent'}`}></div>)}
               </div>
               <div className="absolute top-1/3 left-1/2 w-16 h-16 border-2 border-white translate-x-[-50%]">
                  <div className="absolute -top-4 left-0 text-[11px] bg-zinc-50 text-black px-1 font-bold">TRACKING</div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
               </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed"><span className="text-emerald-400 font-bold">相位检测 (PDAF)</span> 覆盖画面 90% 以上区域。结合反差检测，既快又准。<br/>“实时追踪”功能会利用颜色、距离（深度）、图案（亮度）来死死咬住被摄体。</p>
         </div>
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Brain size={20} className="text-primary-500"/> AI 智能芯片 (AI Unit)</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
               <AiBadge icon={<span className="text-xl">👤</span>} label="人类 (姿态估算)" desc="即便背身也能识别" />
               <AiBadge icon={<span className="text-xl">🐱</span>} label="动物 / 鸟类" desc="猫眼、鸟眼优先" />
               <AiBadge icon={<span className="text-xl">🐞</span>} label="昆虫" desc="极小目标识别" />
               <AiBadge icon={<span className="text-xl">✈️</span>} label="交通工具" desc="汽车/火车/飞机" />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">自 A7R V 开始搭载独立 AI 芯片。不再仅仅识别“眼睛”，而是构建了人体/物体的骨架模型，理解物体的形态。</p>
         </div>
      </div>
   </div>
);

// --- Video Module ---
const VideoModule: React.FC = () => {
   const [format, setFormat] = useState<'HS' | 'S' | 'SI'>('S');
   return (
      <div className="p-8 h-full overflow-y-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
               <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Film size={20} className="text-red-500"/> Log 与色彩科学</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400">
                     <thead className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 uppercase"><tr><th className="p-3">名称</th><th className="p-3">特点</th><th className="p-3">应用场景</th></tr></thead>
                     <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        <tr><td className="p-3 font-bold text-zinc-900 dark:text-white">S-Log3</td><td className="p-3">14+ 档动态范围，暗部噪点略多，需向右曝光 (+1.7 EV)。</td><td className="p-3">电影制作，需后期加载 LUT。</td></tr>
                        <tr><td className="p-3 font-bold text-zinc-900 dark:text-white">S-Cinetone</td><td className="p-3">源自 Venice 电影机，肤色红润，高光柔和。</td><td className="p-3">直出片，Vlog，快速交付项目。</td></tr>
                        <tr><td className="p-3 font-bold text-zinc-900 dark:text-white">HLG</td><td className="p-3">即时 HDR，高动态范围，无需复杂调色。</td><td className="p-3">电视广播，HDR 内容制作。</td></tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col">
               <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Video size={20} className="text-primary-500"/> XAVC 编码体系详解</h3>
               <div className="flex gap-2 mb-4 bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg">
                  <button onClick={() => setFormat('HS')} className={`flex-1 py-2 text-xs font-bold rounded ${format === 'HS' ? 'bg-green-600 text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-white'}`}>XAVC HS (H.265)</button>
                  <button onClick={() => setFormat('S')} className={`flex-1 py-2 text-xs font-bold rounded ${format === 'S' ? 'bg-primary-600 text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-white'}`}>XAVC S (H.264)</button>
                  <button onClick={() => setFormat('SI')} className={`flex-1 py-2 text-xs font-bold rounded ${format === 'SI' ? 'bg-primary-600 text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-white'}`}>XAVC S-I (Intra)</button>
               </div>
               <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                  {format === 'HS' && <div className="animate-fade-in slide-in-from-right-4"><div className="flex items-center gap-2 mb-2"><span className="bg-green-100 dark:bg-green-900 text-green-400 border border-green-500/30 px-2 py-0.5 rounded text-xs font-bold">High Efficiency</span><span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Long GOP</span></div><ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400"><li><strong className="text-zinc-900 dark:text-white">XAVC HS 8K:</strong> 记录 8K 影像。利用 HEVC 的高压缩率，在较小码率下实现 8K 录制。</li><li><strong className="text-zinc-900 dark:text-white">XAVC HS 4K:</strong> 记录 4K 影像。相同画质下，文件体积比 XAVC S 小很多。</li><li className="bg-zinc-100 dark:bg-zinc-950 p-2 rounded text-xs border-l-2 border-green-500"><strong className="text-green-400 block mb-1">特点:</strong> 采用 H.265 (HEVC) 编码。计算量巨大，对电脑剪辑性能要求极高（建议使用代理）。但在相同数据量下画质更好。</li></ul></div>}
                  {format === 'S' && <div className="animate-fade-in slide-in-from-right-4"><div className="flex items-center gap-2 mb-2"><span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border border-primary-500/30 px-2 py-0.5 rounded text-xs font-bold">Standard</span><span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Long GOP</span></div><ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400"><li><strong className="text-zinc-900 dark:text-white">XAVC S 4K:</strong> 以 3840×2160 分辨率记录。兼容性最好的格式。</li><li><strong className="text-zinc-900 dark:text-white">XAVC S HD:</strong> 以 1920×1080 分辨率记录。</li><li className="bg-zinc-100 dark:bg-zinc-950 p-2 rounded text-xs border-l-2 border-primary-500"><strong className="text-primary-400 block mb-1">特点:</strong> 采用 H.264 (AVC) 编码。所有播放器都能播，剪辑压力适中。文件体积和画质的平衡点。</li></ul></div>}
                  {format === 'SI' && <div className="animate-fade-in slide-in-from-right-4"><div className="flex items-center gap-2 mb-2"><span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border border-primary-500/30 px-2 py-0.5 rounded text-xs font-bold">Intra-frame</span><span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">All-I</span></div><ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400"><li><strong className="text-zinc-900 dark:text-white">XAVC S-I 4K / HD:</strong> 每一帧都是独立压缩，不依赖前后帧（Intra）。</li><li className="bg-zinc-100 dark:bg-zinc-950 p-2 rounded text-xs border-l-2 border-primary-500"><strong className="text-primary-400 block mb-1">特点:</strong> 码率最高（可达 600Mbps+），文件巨大（需 V90 或 CFA 卡）。但剪辑极其流畅，不需要电脑进行复杂的解码运算。画质最佳，运动画面无伪影。</li></ul></div>}
               </div>
            </div>
         </div>
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Table size={18} className="text-zinc-600 dark:text-zinc-400"/> Alpha 1 / A7M5 级录制规格参考</h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
               <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold uppercase tracking-wider"><tr><th className="p-3 border-b border-zinc-200 dark:border-zinc-800">分辨率</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-800">编码格式</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-800">采样 / 位深</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-800">帧率</th><th className="p-3 border-b border-zinc-200 dark:border-zinc-800 text-right">预计码率 (Mbps)</th></tr></thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-primary-400 font-bold">XAVC S-I</span></td><td className="p-3 text-primary-500 dark:text-cyan-400">4:2:2 10-bit</td><td className="p-3">60p</td><td className="p-3 text-right font-mono">600</td></tr>
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-primary-400 font-bold">XAVC S</span></td><td className="p-3 text-primary-500 dark:text-cyan-400">4:2:2 10-bit</td><td className="p-3">120p (100p)</td><td className="p-3 text-right font-mono">280</td></tr>
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-primary-400 font-bold">XAVC S</span></td><td className="p-3 text-primary-500 dark:text-cyan-400">4:2:2 10-bit</td><td className="p-3">60p (50p)</td><td className="p-3 text-right font-mono">200</td></tr>
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-green-400 font-bold">XAVC HS</span></td><td className="p-3 text-zinc-500 dark:text-zinc-400">4:2:0 10-bit</td><td className="p-3">120p (100p)</td><td className="p-3 text-right font-mono">200</td></tr>
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-primary-400 font-bold">XAVC S</span></td><td className="p-3 text-primary-500 dark:text-cyan-400">4:2:2 10-bit</td><td className="p-3">30p / 24p</td><td className="p-3 text-right font-mono">140 / 100</td></tr>
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-primary-400 font-bold">XAVC S</span></td><td className="p-3 text-zinc-500 dark:text-zinc-400">4:2:0 8-bit</td><td className="p-3">120p</td><td className="p-3 text-right font-mono">200</td></tr>
                     <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors"><td className="p-3 font-mono text-zinc-900 dark:text-white">4K UHD</td><td className="p-3"><span className="text-primary-400 font-bold">XAVC S</span></td><td className="p-3 text-zinc-500 dark:text-zinc-400">4:2:0 8-bit</td><td className="p-3">30p / 24p</td><td className="p-3 text-right font-mono">100 / 60</td></tr>
                  </tbody>
               </table>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 italic">* 具体码率取决于设置（例如是否开启代理录制），上表为典型最高码率参考。</p>
         </div>
      </div>
   );
};

// --- Mech Module ---
const MechModule: React.FC = () => (
   <div className="p-8 h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Hand size={18} className="text-yellow-500"/> 防抖术语</h3>
            <ul className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400">
               <li className="border-l-2 border-yellow-500 pl-3"><strong className="text-zinc-900 dark:text-white block mb-1">IBIS (五轴防抖)</strong>机身传感器物理位移。Sony 标称 5.5级 或 8.0级。</li>
               <li className="border-l-2 border-yellow-500 pl-3"><strong className="text-zinc-900 dark:text-white block mb-1">Active Mode (增强防抖)</strong>数码裁切防抖。利用陀螺仪数据裁切画面边缘（约 1.1x），实现类似云台的稳定性。</li>
            </ul>
         </div>
         <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Zap size={18} className="text-cyan-500"/> 快门与马达</h3>
            <ul className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400">
               <li className="border-l-2 border-cyan-500 pl-3"><strong className="text-zinc-900 dark:text-white block mb-1">XD Linear Motor</strong>极高推力的线性马达。专为现代微单设计，静音、极速，能跟上 30fps 连拍。</li>
               <li className="border-l-2 border-cyan-500 pl-3"><strong className="text-zinc-900 dark:text-white block mb-1">Global Shutter (a9 III)</strong>全域快门。所有像素同一时刻曝光。彻底消灭果冻效应，闪光灯同步无限制。</li>
            </ul>
         </div>
      </div>
      <div className="mt-6 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><HardDrive size={18} className="text-primary-500"/> 存储革命：CFexpress Type A</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Speed Comparison Visual */}
             <div className="flex flex-col gap-4">
                <div className="space-y-3">
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-zinc-600 dark:text-zinc-400 font-bold">CFexpress 4.0 Type A</span>
                         <span className="text-primary-400 font-mono">1,800 MB/s</span>
                      </div>
                      <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-full h-4 overflow-hidden">
                         <div className="h-full bg-primary-500 rounded-full transition-colors duration-500" style={{ width: '100%' }}></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-zinc-600 dark:text-zinc-400 font-bold">CFexpress 2.0 Type A</span>
                         <span className="text-zinc-500 dark:text-zinc-400 font-mono">800 MB/s</span>
                      </div>
                      <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-full h-4 overflow-hidden">
                         <div className="h-full bg-zinc-600 rounded-full transition-colors duration-500" style={{ width: '44%' }}></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-zinc-600 dark:text-zinc-400 font-bold">UHS-II SD Card</span>
                         <span className="text-zinc-500 dark:text-zinc-400 font-mono">300 MB/s</span>
                      </div>
                      <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-full h-4 overflow-hidden">
                         <div className="h-full bg-zinc-100 dark:bg-zinc-700 rounded-full transition-colors duration-500" style={{ width: '17%' }}></div>
                      </div>
                   </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                   <h4 className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-3">CFexpress 4.0 vs 2.0 关键差异</h4>
                   <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li className="flex gap-2"><span className="text-primary-400 font-bold shrink-0">▸</span> 双通道 PCIe 总线，理论带宽翻倍</li>
                      <li className="flex gap-2"><span className="text-primary-400 font-bold shrink-0">▸</span> 卡内访问延迟降低，实际写入更稳定</li>
                      <li className="flex gap-2"><span className="text-primary-400 font-bold shrink-0">▸</span> 兼容现有相机（向下兼容 2.0）</li>
                      <li className="flex gap-2"><span className="text-primary-400 font-bold shrink-0">▸</span> 需搭配 USB 40Gbps 读卡器才能跑满速度</li>
                   </ul>
                </div>
             </div>

             {/* Specs & Card Info */}
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
                      <div className="text-2xl font-black text-primary-600 dark:text-primary-400 font-mono">1,800</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Read MB/s</div>
                   </div>
                   <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
                      <div className="text-2xl font-black text-primary-600 dark:text-primary-400 font-mono">1,700</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Write MB/s</div>
                   </div>
                   <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">VPG400</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">持续写入保证</div>
                   </div>
                   <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
                      <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">TOUGH</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">IP57 防护</div>
                   </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                   <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-3">容量与定价参考 (2025)</h4>
                   <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                         <span>CEA-G240T (240GB)</span>
                         <span className="font-mono text-zinc-600 dark:text-zinc-300">$260</span>
                      </div>
                      <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                         <span>CEA-G480T (480GB)</span>
                         <span className="font-mono text-zinc-600 dark:text-zinc-300">$360</span>
                      </div>
                      <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                         <span>CEA-G960T (960GB)</span>
                         <span className="font-mono text-zinc-600 dark:text-zinc-300">$585</span>
                      </div>
                      <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                         <span>CEA-G1920T (1920GB)</span>
                         <span className="font-mono text-zinc-600 dark:text-zinc-300">$950</span>
                      </div>
                   </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                   <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-2">兼容机型</h4>
                   <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      A1 II · A9 III · A7R V · A7 IV · A7S III · FX3 · FX30 · FX6 · FX2
                   </p>
                </div>
             </div>
          </div>
       </div>
   </div>
);

// --- 5. Menu Simulator Module (Fixed Layout) ---
const MenuModule: React.FC = () => {
   const [mainTab, setMainTab] = useState(0);
   const [subTab, setSubTab] = useState(0);
   
   const menuStructure = [
      { 
         icon: <Camera size={16} />, color: 'bg-red-500', name: 'Shooting', 
         subs: [
            { title: 'Image Quality', items: [{n:'File Format', v:'RAW'}, {n:'JPEG/HEIF Switch', v:'HEIF'}] },
            { title: 'Media', items: [{n:'Format', v:'>'}, {n:'Rec. Media Settings', v:'>'}] },
            { title: 'Image Stabilization', items: [{n:'SteadyShot', v:'On'}, {n:'SteadyShot Mode', v:'Active'}, {n:'SteadyShot Adjust.', v:'Auto'}, {n:'Focal Length', v:'50mm'}] },
            { title: 'Shooting Mode', items: [{n:'Exposure Mode', v:'Manual'}] },
         ] 
      },
      { 
         icon: <Aperture size={16} />, color: 'bg-primary-500', name: 'Exposure/Color', 
         subs: [
            { title: 'Exposure', items: [{n:'ISO', v:'800'}, {n:'ISO Range Limit', v:'>'}] },
            { title: 'White Balance', items: [{n:'White Balance', v:'Auto'}] },
            { title: 'Color/Tone', items: [{n:'D-Range Optimizer', v:'Off'}, {n:'Creative Look', v:'ST'}] },
         ]
      },
      { 
         icon: <Scan size={16} />, color: 'bg-primary-600', name: 'Focus', 
         subs: [
            { title: 'AF/MF', items: [{n:'Focus Mode', v:'Continuous AF'}, {n:'Priority Set in AF-C', v:'Balanced'}] },
            { title: 'Subject Recognition', items: [{n:'Recognition Target', v:'Human'}, {n:'Right/Left Eye Select', v:'Auto'}] },
         ]
      },
      { 
         icon: <Menu size={16} />, color: 'bg-amber-500', name: 'Setup', 
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
         <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-8 relative">
            {/* Camera Screen Simulator: Use aspect-ratio instead of fixed width */}
            <div className="w-full max-w-4xl aspect-[3/2] bg-zinc-50 dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800 rounded-lg relative flex overflow-hidden font-sans select-none shadow-lg">
               
               {/* Level 1: Main Categories */}
               <div className="w-[10%] min-w-[50px] bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center py-4 gap-4 border-r border-zinc-200 dark:border-zinc-800 shrink-0">
                  {menuStructure.map((m, i) => (
                     <div key={i} onClick={() => { setMainTab(i); setSubTab(0); }} className={`w-8 h-8 lg:w-10 lg:h-10 rounded flex items-center justify-center transition-colors cursor-pointer ${mainTab === i ? m.color + ' text-zinc-900 dark:text-white shadow-lg scale-110' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800'}`}>{m.icon}</div>
                  ))}
               </div>

               {/* Level 2: Sub Categories */}
               <div className="w-[30%] bg-zinc-50 dark:bg-zinc-900 flex flex-col py-2 border-r border-zinc-200 dark:border-zinc-800 shrink-0 overflow-y-auto">
                  <div className="px-4 py-2 text-xs lg:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 border-b border-zinc-200 dark:border-zinc-800 truncate">{currentMenu.name}</div>
                  {currentMenu.subs.map((sub, i) => (
                     <div key={i} onClick={() => setSubTab(i)} className={`px-4 py-3 text-xs lg:text-xs font-bold flex justify-between items-center cursor-pointer transition-colors ${subTab === i ? 'bg-amber-300 text-black' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}>
                        <span className="truncate mr-2">{i + 1}. {sub.title}</span>
                        {/* ChevronRight is not imported, replacing with simple > for now or adding import if I missed it. Actually ChevronRight IS imported */}
                        {subTab === i && <Triangle size={8} className="shrink-0 rotate-90 fill-current"/>} 
                     </div>
                  ))}
               </div>

               {/* Level 3: Items */}
               <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-4 flex flex-col min-w-0">
                  <div className="text-lg lg:text-xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-300 dark:border-zinc-600 pb-2 flex items-center gap-2 truncate">
                     {currentSub.title}
                  </div>
                  <div className="space-y-2 overflow-y-auto">
                     {currentSub.items.length > 0 ? (
                        currentSub.items.map((item, i) => (
                           <div key={i} className="flex justify-between items-center p-3 bg-zinc-100 dark:bg-zinc-700 rounded hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer group transition-colors">
                              <span className="text-xs lg:text-sm text-zinc-700 dark:text-zinc-200 font-medium truncate mr-2">{item.n}</span>
                               <span className="text-[10px] lg:text-xs font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white px-2 py-1 rounded bg-zinc-50 dark:bg-black shrink-0">{item.v}</span>
                           </div>
                        ))
                     ) : <div className="text-zinc-500 dark:text-zinc-400 text-xs italic p-4">No settings available.</div>}
                  </div>
                  <div className="mt-auto pt-4 flex justify-between items-end">
                     <div className="text-[10px] text-zinc-500 dark:text-zinc-400">* Interactive Mockup</div>
                     <Settings size={16} className="text-zinc-600 dark:text-zinc-400"/>
                  </div>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Menu size={20} className="text-yellow-500"/> 菜单逻辑解析</h3>
            <div className="space-y-6">
               <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-800">
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mb-2">垂直层级结构</div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">索尼旧菜单（水平Tab）被诟病多年。新菜单（a7S3起）采用了垂直三级结构：<br/><br/>1. <span className="text-red-400">主分类</span> (左侧图标)<br/>2. <span className="text-yellow-400">子分类</span> (中间列表)<br/>3. <span className="text-zinc-900 dark:text-white">具体设置</span> (右侧详情)<br/><br/>这大大减少了翻页寻找功能的痛苦。</p>
               </div>
               <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded border border-zinc-200 dark:border-zinc-800">
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mb-2">防抖设置 (Stabilization)</div>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2"><li><strong className="text-red-400">Shooting &gt; Image Stabilization</strong></li><li className="pl-2 border-l-2 border-zinc-600"><span className="text-zinc-900 dark:text-white">SteadyShot:</span> 开启/关闭</li><li className="pl-2 border-l-2 border-zinc-600"><span className="text-zinc-900 dark:text-white">SteadyShot Mode:</span> <br/> - <span className="text-yellow-400">Standard (标准):</span> 纯物理防抖<br/> - <span className="text-yellow-400">Active (增强):</span> 物理+电子裁切 (适合手持走动)</li><li className="pl-2 border-l-2 border-zinc-600"><span className="text-zinc-900 dark:text-white">Adjust. (手动焦距):</span> <br/>使用老镜头时必须手动输入焦距，否则防抖会失效或产生果冻。</li></ul>
               </div>
            </div>
         </div>
      </div>
   );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
   <div className="flex border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
      <span className="w-32 font-bold text-zinc-900 dark:text-white shrink-0 truncate mr-2" title={label}>{label}</span>
      <span className="text-zinc-600 dark:text-zinc-400 text-sm truncate">{value}</span>
   </div>
);

const AiBadge: React.FC<{ icon: React.ReactNode; label: string; desc: string }> = ({ icon, label, desc }) => (
   <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center border border-primary-300 dark:border-primary-500 shrink-0">{icon}</div>
      <div className="overflow-hidden">
         <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">{label}</div>
         <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{desc}</div>
      </div>
   </div>
);
