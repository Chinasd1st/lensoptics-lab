
import React, { useState } from 'react';
import { Slider } from './Controls';
import { Palette, Layers, Box, Maximize, Play, Grid, Activity } from 'lucide-react';

type Tab = 'GRADING' | 'NODES' | 'SCOPES';

export const PostProductionView: React.FC = () => {
   const [activeTab, setActiveTab] = useState<Tab>('GRADING');

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
         <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
            <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
               <TabButton active={activeTab === 'GRADING'} onClick={() => setActiveTab('GRADING')} icon={<Palette size={16}/>} label="调色板 (Color Wheels)" />
               <TabButton active={activeTab === 'NODES'} onClick={() => setActiveTab('NODES')} icon={<Grid size={16}/>} label="节点架构 (Node Graph)" />
               <TabButton active={activeTab === 'SCOPES'} onClick={() => setActiveTab('SCOPES')} icon={<Activity size={16}/>} label="示波器 (Scopes)" />
            </div>
            <div className="flex-1 relative overflow-hidden">
               {activeTab === 'GRADING' && <GradingModule />}
               {activeTab === 'NODES' && <NodesModule />}
               {activeTab === 'SCOPES' && <ScopesModule />}
            </div>
         </div>
      </div>
   );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition-all whitespace-nowrap shrink-0 ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

const GradingModule: React.FC = () => {
   const [lift, setLift] = useState(0); // Shadows
   const [gamma, setGamma] = useState(0); // Midtones
   const [gain, setGain] = useState(1); // Highlights
   const [lutEnabled, setLutEnabled] = useState(false);

   const brightness = 1 + lift + (gamma * 0.5);
   const contrast = gain;

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center relative p-4 lg:p-10">
            <div className="w-full max-w-3xl aspect-video relative rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000')] bg-cover bg-center transition-all duration-300" style={{
                  filter: lutEnabled 
                     ? `contrast(${contrast * 1.2}) brightness(${brightness}) saturate(1.3) sepia(0.1)` 
                     : `contrast(${contrast}) brightness(${brightness}) saturate(0.6) grayscale(0.2) opacity(0.8)`
               }}></div>
               <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white border border-slate-600">
                  MONITOR: {lutEnabled ? 'REC.709 GRADE' : 'LOG RAW'}
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-800 border-l border-slate-700 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6">DaVinci 一级调色</h3>
            
            <div className="space-y-6">
               <div className="p-3 bg-slate-900 rounded border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-xs font-bold text-cyan-400">色彩空间转换 (CST)</span>
                     <button onClick={() => setLutEnabled(!lutEnabled)} className={`px-4 py-1 rounded-full text-[10px] font-bold transition-all ${lutEnabled ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        {lutEnabled ? 'ENABLE LUT' : 'BYPASS'}
                     </button>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">调色的第一步：将拍摄时的 Log 曲线还原为标准显示设备能识别的 Rec.709 线性画面。</p>
               </div>

               <Slider label="Lift (暗部/阴影)" value={lift} min={-0.5} max={0.5} step={0.01} onChange={setLift} />
               <Slider label="Gamma (灰部/中间调)" value={gamma} min={-1} max={1} step={0.01} onChange={setGamma} />
               <Slider label="Gain (亮部/高光)" value={gain} min={0.5} max={2} step={0.01} onChange={setGain} />

               <div className="grid grid-cols-3 gap-2 mt-4">
                  <ColorWheel label="Lift" color="#1e40af" active={lift !== 0} />
                  <ColorWheel label="Gamma" color="#15803d" active={gamma !== 0} />
                  <ColorWheel label="Gain" color="#b45309" active={gain !== 1} />
               </div>
            </div>
         </div>
      </div>
   );
};

const ColorWheel: React.FC<{ label: string; color: string; active: boolean }> = ({ label, color, active }) => (
   <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 relative flex items-center justify-center ${active ? 'border-white' : 'border-slate-700'}`} style={{background: `radial-gradient(circle, ${color}33, transparent 70%)`}}>
         <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_white] transition-all bg-white`} style={{transform: active ? 'translate(5px, -5px)' : 'translate(0,0)'}}></div>
      </div>
      <span className="text-[10px] text-slate-500 font-bold uppercase">{label}</span>
   </div>
);

const NodesModule: React.FC = () => {
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

            {/* Node Flow Visualization */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 z-10 scale-90 lg:scale-100">
               <Node icon={<Box size={24}/>} title="Exposure" color="border-emerald-500" />
               <Arrow />
               <div className="flex flex-col gap-6 relative">
                  <div className="absolute -left-8 top-1/2 w-8 h-[2px] bg-slate-700"></div>
                  <Node icon={<Palette size={24}/>} title="W.Balance" color="border-cyan-500" />
                  <Node icon={<Maximize size={24}/>} title="Contrast" color="border-cyan-500" />
                  <div className="absolute -right-8 top-1/2 w-8 h-[2px] bg-slate-700"></div>
               </div>
               <Arrow />
               <Node icon={<Play size={24}/>} title="Look / Film" color="border-purple-500" />
            </div>

            <div className="mt-12 p-4 bg-slate-800 border border-slate-700 rounded-lg max-w-lg text-center">
               <h4 className="text-sm font-bold text-white mb-2">节点级联架构 (Serial Nodes)</h4>
               <p className="text-xs text-slate-400 leading-relaxed italic">
                  与 Photoshop 的图层（Layer）不同，DaVinci 的节点（Node）是数据的流向。前一个节点的输出是后一个节点的输入。串联节点用于一级基础校色，并联节点（Parallel）用于复杂的局部遮罩。
               </p>
            </div>
         </div>
      </div>
   );
};

const ScopesModule: React.FC = () => {
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex items-center justify-center p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl">
               <ScopeBox title="Waveform (亮度分布)">
                  <svg className="w-full h-40" viewBox="0 0 200 100">
                     <polyline points="0,50 20,40 40,60 60,30 80,70 100,20 120,50 140,10 160,80 180,40 200,50" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
                     <polyline points="0,48 30,35 60,55 90,25 120,65 150,15 180,45 200,48" fill="none" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.8" />
                  </svg>
               </ScopeBox>
               <ScopeBox title="Parade (RGB 分量)">
                  <div className="flex gap-2 h-40">
                     <div className="flex-1 border-r border-slate-700 relative overflow-hidden"><div className="absolute inset-x-0 bottom-10 h-20 bg-red-500/20"></div></div>
                     <div className="flex-1 border-r border-slate-700 relative overflow-hidden"><div className="absolute inset-x-0 bottom-8 h-20 bg-green-500/20"></div></div>
                     <div className="flex-1 relative overflow-hidden"><div className="absolute inset-x-0 bottom-12 h-20 bg-blue-500/20"></div></div>
                  </div>
               </ScopeBox>
            </div>
         </div>
      </div>
   );
};

const Node: React.FC<{ icon: React.ReactNode; title: string; color: string }> = ({ icon, title, color }) => (
   <div className={`w-32 h-20 bg-slate-800 rounded-lg border-2 flex flex-col items-center justify-center gap-1 shadow-2xl relative ${color}`}>
      <div className="text-white/40">{icon}</div>
      <div className="text-[10px] font-bold text-white uppercase">{title}</div>
      {/* Node connectors */}
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-700 rounded-sm"></div>
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-sm"></div>
   </div>
);

const Arrow = () => (
   <div className="hidden lg:block w-16 h-[2px] bg-slate-700 relative">
      <div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-slate-700"></div>
   </div>
);

const ScopeBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
   <div className="bg-black rounded-lg p-4 border border-slate-700">
      <div className="text-[10px] font-bold text-slate-500 mb-4 flex justify-between">
         <span>{title}</span>
         <span className="text-cyan-500 font-mono">LIVE FEED</span>
      </div>
      <div className="border-t border-slate-800 pt-4 flex items-center justify-center">
         {children}
      </div>
   </div>
);
