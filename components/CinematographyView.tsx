
import React, { useState, useEffect } from 'react';
import { Lightbulb, Monitor, Maximize2, Aperture, Anchor, Move, Crosshair, LayoutTemplate, Grid3X3, Split, Minimize, Zap, Film, Settings } from 'lucide-react';
import { LightingModule } from './LightingModule';
import { MonitoringModule } from './MonitoringModule';
import { FocalLengthModule } from './FocalLengthModule';
import { AnamorphicModule } from './AnamorphicModule';
import { RiggingModule } from './RiggingModule';
import { MovementModule } from './MovementModule';
import { FocusControlModule } from './FocusControlModule';
import { CineLensMechanicsModule } from './CineLensMechanicsModule';
import { Slider } from './Controls';

type Tab = 'COMPOSITION' | 'LIGHTING' | 'INVERSE_SQUARE' | 'CINE_LENS' | 'LENS_CHOICE' | 'ANAMORPHIC' | 'STABILIZER' | 'MOVEMENT' | 'FOCUS_CONTROL' | 'MONITORING';

interface CinematographyViewProps {
  initialTab?: string;
}

export const CinematographyView: React.FC<CinematographyViewProps> = ({ initialTab }) => {
   const [activeTab, setActiveTab] = useState<Tab>('LIGHTING');

   useEffect(() => {
     if (initialTab && ['COMPOSITION', 'LIGHTING', 'INVERSE_SQUARE', 'CINE_LENS', 'LENS_CHOICE', 'ANAMORPHIC', 'STABILIZER', 'MOVEMENT', 'FOCUS_CONTROL', 'MONITORING'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
   }, [initialTab]);

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
         <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
            {/* Navigation - Unified Style */}
            <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
               <TabButton active={activeTab === 'COMPOSITION'} onClick={() => setActiveTab('COMPOSITION')} icon={<LayoutTemplate size={16}/>} label="构图艺术 (Art)" />
               <TabButton active={activeTab === 'LIGHTING'} onClick={() => setActiveTab('LIGHTING')} icon={<Lightbulb size={16}/>} label="布光 (Lighting)" />
               <TabButton active={activeTab === 'INVERSE_SQUARE'} onClick={() => setActiveTab('INVERSE_SQUARE')} icon={<Zap size={16}/>} label="平方反比定律" />
               <TabButton active={activeTab === 'CINE_LENS'} onClick={() => setActiveTab('CINE_LENS')} icon={<Film size={16}/>} label="电影镜头特性" />
               <TabButton active={activeTab === 'FOCUS_CONTROL'} onClick={() => setActiveTab('FOCUS_CONTROL')} icon={<Crosshair size={16}/>} label="跟焦与运镜" />
               <TabButton active={activeTab === 'STABILIZER'} onClick={() => setActiveTab('STABILIZER')} icon={<Anchor size={16}/>} label="承托设备" />
               <TabButton active={activeTab === 'MOVEMENT'} onClick={() => setActiveTab('MOVEMENT')} icon={<Move size={16}/>} label="运镜术语" />
               <TabButton active={activeTab === 'MONITORING'} onClick={() => setActiveTab('MONITORING')} icon={<Monitor size={16}/>} label="监看辅助" />
               <TabButton active={activeTab === 'LENS_CHOICE'} onClick={() => setActiveTab('LENS_CHOICE')} icon={<Maximize2 size={16}/>} label="焦段透视" />
               <TabButton active={activeTab === 'ANAMORPHIC'} onClick={() => setActiveTab('ANAMORPHIC')} icon={<Aperture size={16}/>} label="变形宽银幕" />
            </div>
            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden bg-slate-950">
               {activeTab === 'COMPOSITION' && <CompositionModule />}
               {activeTab === 'LIGHTING' && <LightingModule />}
               {activeTab === 'INVERSE_SQUARE' && <InverseSquareModule />}
               {activeTab === 'CINE_LENS' && <CineLensMechanicsModule />}
               {activeTab === 'MONITORING' && <MonitoringModule />}
               {activeTab === 'LENS_CHOICE' && <FocalLengthModule />}
               {activeTab === 'ANAMORPHIC' && <AnamorphicModule />}
               {activeTab === 'STABILIZER' && <RiggingModule />}
               {activeTab === 'MOVEMENT' && <MovementModule />}
               {activeTab === 'FOCUS_CONTROL' && <FocusControlModule />}
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

const CompositionModule: React.FC = () => {
   const [rule, setRule] = useState<'THIRDS' | 'LINES' | 'SYMMETRY' | 'SPACE'>('THIRDS');
   const [overlay, setOverlay] = useState(true);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
            <div className="relative w-full max-w-3xl aspect-[4/3] lg:aspect-video bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl rounded-lg group">
               {rule === 'THIRDS' && <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000)'}}></div>}
               {rule === 'LINES' && <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000)'}}></div>}
               {/* Updated Symmetry Image */}
               {rule === 'SYMMETRY' && <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=2000)'}}></div>}
               {rule === 'SPACE' && <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=2000)'}}></div>}

               {overlay && (
                  <div className="absolute inset-0 pointer-events-none transition-opacity duration-500">
                     {rule === 'THIRDS' && (
                        <>
                           <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_2px_black]"></div>
                           <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_2px_black]"></div>
                           <div className="absolute top-1/3 left-0 right-0 h-px bg-white/50 shadow-[0_0_2px_black]"></div>
                           <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/50 shadow-[0_0_2px_black]"></div>
                           <div className="absolute top-1/3 right-1/3 w-4 h-4 -translate-y-1/2 translate-x-1/2 border-2 border-red-500 rounded-full animate-pulse"></div>
                        </>
                     )}
                     {rule === 'LINES' && (
                        <svg className="absolute inset-0 w-full h-full opacity-60">
                           <line x1="0" y1="100%" x2="50%" y2="50%" stroke="cyan" strokeWidth="2" strokeDasharray="10,5" />
                           <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="cyan" strokeWidth="2" strokeDasharray="10,5" />
                           <circle cx="50%" cy="50%" r="5" fill="cyan" />
                        </svg>
                     )}
                     {rule === 'SYMMETRY' && (
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400/60 shadow-[0_0_5px_yellow] border-l border-dashed border-black"></div>
                     )}
                     {rule === 'SPACE' && (
                        <div className="absolute inset-0">
                           <div className="absolute inset-0 bg-black/30"></div>
                           <div className="absolute bottom-[20%] right-[30%] w-[10%] h-[20%] bg-white/10 rounded-full blur-xl border border-white/20"></div>
                           <div className="absolute top-10 left-10 text-white font-mono text-xs opacity-70">SPACE &gt; SUBJECT</div>
                        </div>
                     )}
                  </div>
               )}
               <div className="absolute bottom-4 right-4">
                  <button onClick={() => setOverlay(!overlay)} className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm ${overlay ? 'bg-cyan-600/80 border-cyan-400 text-white' : 'bg-black/40 border-white/30 text-white/50'}`}>
                     {overlay ? 'HIDE GUIDE' : 'SHOW GUIDE'}
                  </button>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <LayoutTemplate size={20} className="text-cyan-400"/> 构图法则
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
               <button onClick={() => setRule('THIRDS')} className={`p-4 rounded-lg border text-left flex flex-col gap-2 transition-all ${rule === 'THIRDS' ? 'bg-slate-800 border-cyan-500 shadow-md' : 'border-slate-700 hover:bg-slate-800'}`}>
                  <Grid3X3 size={20} className={rule === 'THIRDS' ? 'text-cyan-400' : 'text-slate-500'} />
                  <span className="text-xs font-bold text-slate-200">三分法</span>
               </button>
               <button onClick={() => setRule('LINES')} className={`p-4 rounded-lg border text-left flex flex-col gap-2 transition-all ${rule === 'LINES' ? 'bg-slate-800 border-cyan-500 shadow-md' : 'border-slate-700 hover:bg-slate-800'}`}>
                  <Move size={20} className={rule === 'LINES' ? 'text-cyan-400' : 'text-slate-500'} />
                  <span className="text-xs font-bold text-slate-200">引导线</span>
               </button>
               <button onClick={() => setRule('SYMMETRY')} className={`p-4 rounded-lg border text-left flex flex-col gap-2 transition-all ${rule === 'SYMMETRY' ? 'bg-slate-800 border-cyan-500 shadow-md' : 'border-slate-700 hover:bg-slate-800'}`}>
                  <Split size={20} className={rule === 'SYMMETRY' ? 'text-cyan-400' : 'text-slate-500'} />
                  <span className="text-xs font-bold text-slate-200">对称构图</span>
               </button>
               <button onClick={() => setRule('SPACE')} className={`p-4 rounded-lg border text-left flex flex-col gap-2 transition-all ${rule === 'SPACE' ? 'bg-slate-800 border-cyan-500 shadow-md' : 'border-slate-700 hover:bg-slate-800'}`}>
                  <Minimize size={20} className={rule === 'SPACE' ? 'text-cyan-400' : 'text-slate-500'} />
                  <span className="text-xs font-bold text-slate-200">留白</span>
               </button>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 min-h-[150px]">
               {rule === 'THIRDS' && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h4 className="text-sm font-bold text-white mb-2">九宫格 (Rule of Thirds)</h4>
                     <p className="text-xs text-slate-400 leading-relaxed">
                        将画面分为九宫格。将主体（如人眼、地平线）放置在 <strong>线条交叉点</strong> 或 <strong>分割线</strong> 上，而非死板地放在正中间。这能让画面更具活力和平衡感。
                     </p>
                  </div>
               )}
               {rule === 'LINES' && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h4 className="text-sm font-bold text-white mb-2">引导线 (Leading Lines)</h4>
                     <p className="text-xs text-slate-400 leading-relaxed">
                        利用环境中的线条（道路、栏杆、墙壁、光影）将观众的视线 <strong>强行引导</strong> 至主体。这是创造画面纵深感（Depth）最有效的方法。
                     </p>
                  </div>
               )}
               {rule === 'SYMMETRY' && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h4 className="text-sm font-bold text-white mb-2">对称构图 (Symmetry)</h4>
                     <p className="text-xs text-slate-400 leading-relaxed">
                        追求画面的绝对平衡。常用于表现建筑的宏伟、水面倒影的静谧或韦斯·安德森式的强迫症美学。注意保持相机绝对水平。
                     </p>
                  </div>
               )}
               {rule === 'SPACE' && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h4 className="text-sm font-bold text-white mb-2">留白 (Negative Space)</h4>
                     <p className="text-xs text-slate-400 leading-relaxed">
                        "少即是多"。大面积的空白（天空、纯色背景）给主体以呼吸空间。通过极简的画面元素，强化孤独感或高级感，迫使观众聚焦于微小的主体。
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const InverseSquareModule: React.FC = () => {
   const [distance, setDistance] = useState(1); // 1m to 4m

   // Intensity drops as 1 / d^2
   const intensity = 100 / (distance * distance);
   const radius = distance * 20; // Visual spreading

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
            
            {/* Light Source */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
               <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-[0_0_50px_orange]"></div>
               <div className="absolute top-10 left-0 text-white text-xs font-mono w-20">Source</div>
            </div>

            {/* Light Rays / Cone */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <path d={`M 60 ${300} L ${60 + distance*150} ${300 - radius} L ${60 + distance*150} ${300 + radius} Z`} fill="url(#lightGrad)" opacity="0.3" />
               <defs>
                  <linearGradient id="lightGrad" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="yellow" stopOpacity="0.8"/>
                     <stop offset="100%" stopColor="yellow" stopOpacity="0"/>
                  </linearGradient>
               </defs>
            </svg>

            {/* Target Surface */}
            <div 
               className="absolute top-1/2 -translate-y-1/2 w-4 bg-white shadow-[0_0_20px_white] transition-all duration-300 z-20"
               style={{ 
                  left: `${60 + distance * 150}px`,
                  height: `${radius * 2}px` 
               }}
            >
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-mono text-xs whitespace-nowrap">{distance}m</div>
               <div className="absolute top-1/2 left-4 text-cyan-400 font-bold text-lg whitespace-nowrap">{intensity.toFixed(0)}%</div>
            </div>

            {/* Reference Markers */}
            <div className="absolute bottom-10 left-10 right-10 h-1 bg-slate-700 flex justify-between items-center text-[10px] text-slate-500">
               {[1,2,3,4].map(m => <div key={m} className="relative"><div className="absolute -top-2 w-0.5 h-4 bg-slate-500"></div><span className="mt-4 block">{m}m</span></div>)}
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Zap size={20} className="text-yellow-400"/> 平方反比定律
            </h3>
            
            <Slider label="光源距离 (Distance)" value={distance} min={1} max={4} step={0.1} onChange={setDistance} unit="m" />

            <div className="mt-8 bg-slate-800 p-5 rounded-xl border border-slate-700">
               <div className="flex justify-between items-end mb-4">
                  <span className="text-xs text-slate-400">光照强度 (Intensity)</span>
                  <span className="text-2xl font-mono text-yellow-400 font-bold">{intensity.toFixed(1)}%</span>
               </div>
               <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 transition-all duration-300" style={{ width: `${intensity}%` }}></div>
               </div>
               
               <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
                  "Inverse Square Law": 光照强度与距离的平方成反比。
                  <br/><br/>
                  距离从 1m 增加到 2m (2倍)，光线强度变为 1/4 (25%)，而非 1/2。
                  <br/>
                  这意味着灯光稍微远离主体，亮度会急剧下降。
               </p>
            </div>
         </div>
      </div>
   );
};
