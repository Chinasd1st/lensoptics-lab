
import React, { useMemo, useState } from 'react';
import { CENTER_X, CENTER_Y, OPTICAL_AXIS_Y, calculateSphericalAberration } from '../utils/optics';
import { Toggle, Slider } from './Controls';
import { Aperture, Sparkles, AlertTriangle, Hammer, Film, Camera as CameraIcon, Info } from 'lucide-react';

type Tab = 'ASPHERICAL' | 'COATING' | 'ABERRATIONS' | 'CINE_VS_PHOTO';

export const LensAdvancedView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('CINE_VS_PHOTO');

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Tab Bar - Scrollable on Mobile */}
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'CINE_VS_PHOTO'} onClick={() => setActiveTab('CINE_VS_PHOTO')} icon={<Film size={16}/>} label="电影镜 vs 摄影镜" />
           <TabButton active={activeTab === 'ASPHERICAL'} onClick={() => setActiveTab('ASPHERICAL')} icon={<Aperture size={16}/>} label="非球面校正" />
           <TabButton active={activeTab === 'COATING'} onClick={() => setActiveTab('COATING')} icon={<Sparkles size={16}/>} label="镀膜技术" />
           <TabButton active={activeTab === 'ABERRATIONS'} onClick={() => setActiveTab('ABERRATIONS')} icon={<AlertTriangle size={16}/>} label="边缘像差" />
        </div>

        <div className="flex-1 relative overflow-hidden">
           {activeTab === 'CINE_VS_PHOTO' && <CineVsPhotoModule />}
           {activeTab === 'ASPHERICAL' && <AsphericalModule />}
           {activeTab === 'COATING' && <CoatingModule />}
           {activeTab === 'ABERRATIONS' && <AberrationsModule />}
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

const CineVsPhotoModule: React.FC = () => {
   const [type, setType] = useState<'PHOTO' | 'CINE'>('CINE');

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
            {/* Visual Comparison */}
            <div className="relative w-full max-w-lg aspect-square lg:aspect-video bg-black rounded-xl border border-slate-700 shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=1000')] bg-cover bg-center transition-all duration-700 group-hover:scale-105"></div>
               
               {/* Lens Overlay Visuals */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-3/4 h-3/4 border-4 border-dashed rounded-full transition-all duration-500 flex items-center justify-center ${type === 'CINE' ? 'border-cyan-500 animate-spin-slow' : 'border-slate-500 opacity-20'}`}>
                     {type === 'CINE' && (
                        <div className="absolute inset-4 border border-cyan-400/20 rounded-full flex items-center justify-center">
                           <span className="text-[10px] text-cyan-400 font-mono tracking-widest">T2.1 TRANSMISSION</span>
                        </div>
                     )}
                  </div>
               </div>

               {/* Gear Rings visualization for Cine */}
               {type === 'CINE' && (
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                     <div className="w-full flex justify-between">
                        <div className="bg-cyan-600/80 p-1 rounded text-[10px] font-bold text-white">0.8 MOD GEAR</div>
                        <div className="bg-cyan-600/80 p-1 rounded text-[10px] font-bold text-white">DE-CLICKED</div>
                     </div>
                     <div className="w-full flex justify-center pb-10">
                        <div className="text-white bg-black/60 px-2 py-1 rounded text-xs animate-pulse">NO BREATHING</div>
                     </div>
                  </div>
               )}
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-800 border-l border-slate-700 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Film size={20} className="text-cyan-400" /> 工业差异</h3>
            
            <div className="flex gap-2 mb-8">
               <button onClick={() => setType('PHOTO')} className={`flex-1 py-4 rounded-lg border font-bold flex flex-col items-center gap-2 transition-all ${type === 'PHOTO' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-500'}`}>
                  <CameraIcon size={20}/> 摄影镜头
               </button>
               <button onClick={() => setType('CINE')} className={`flex-1 py-4 rounded-lg border font-bold flex flex-col items-center gap-2 transition-all ${type === 'CINE' ? 'bg-cyan-900 border-cyan-500 text-cyan-400' : 'border-slate-700 text-slate-500'}`}>
                  <Film size={20}/> 电影镜头
               </button>
            </div>

            <div className="space-y-4">
               {type === 'PHOTO' ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                     <InfoItem title="F档 (F-Stop)" content="几何光圈比。仅表示物理直径比值，不考虑镜片透光率损失。不同F2.8镜头实际亮度可能不同。"/>
                     <InfoItem title="有级光圈" content="调整时有刻度感和咔哒声，会导致画面亮度瞬间跳变，不可在录制中调整。"/>
                     <InfoItem title="呼吸效应 (Breathing)" content="对焦时视角会产生像变焦一样的伸缩，影响电影感叙事。"/>
                     <InfoItem title="非齐焦 (Varifocal)" content="变焦后焦点会偏移，必须重新对焦。"/>
                  </div>
               ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                     <InfoItem title="T档 (T-Stop)" color="text-cyan-400" content="曝光量化。实测透光率，确保更换不同镜头时曝光完全一致。"/>
                     <InfoItem title="无级光圈 (De-clicked)" content="丝滑顺畅的转动手感，允许在拍摄中实时、无感地补偿光线变化。"/>
                     <InfoItem title="齐焦设计 (Parfocal)" color="text-cyan-400" content="变焦过程中焦点保持不变。允许推拉变焦镜头的推轨镜头拍摄。"/>
                     <InfoItem title="超长对焦行程" content="对焦环旋转角度可达270度以上，方便跟焦员进行极精细的焦点控制。"/>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const InfoItem: React.FC<{ title: string; content: string; color?: string }> = ({ title, content, color = "text-white" }) => (
   <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
      <div className={`text-xs font-bold mb-1 ${color}`}>{title}</div>
      <div className="text-[10px] text-slate-400 leading-relaxed">{content}</div>
   </div>
);

// (Existing AsphericalModule, CoatingModule, AberrationsModule remain, but ensure they handle responsive layouts better)
const AsphericalModule: React.FC = () => {
  const [isAspherical, setIsAspherical] = useState(false);
  const [lensRadius, setLensRadius] = useState(100);
  const focalLength = 180;
  const { rays, focalPoints } = useMemo(() => calculateSphericalAberration(isAspherical, lensRadius, focalLength), [isAspherical, lensRadius]);
  const spread = Math.max(...focalPoints) - Math.min(...focalPoints);

  return (
    <div className="flex flex-col lg:flex-row h-full">
       <div className="flex-1 bg-slate-900 relative">
         <svg className="w-full h-full" viewBox="0 0 800 500">
           <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#475569" strokeDasharray="5,5" />
           <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
             <path d={`M0,-${lensRadius} Q${isAspherical ? 25 : 40},0 0,${lensRadius} Q${isAspherical ? -25 : -40},0 0,-${lensRadius}`} fill={isAspherical ? "rgba(52, 211, 153, 0.1)" : "rgba(244, 114, 182, 0.1)"} stroke={isAspherical ? "#34D399" : "#F472B6"} strokeWidth="2" />
           </g>
           {rays.map((ray, i) => (
              <path key={i} d={`M${ray.x1},${ray.y1} L${ray.x2},${ray.y2}`} stroke={ray.color} strokeWidth={1} fill="none" opacity={0.6} />
           ))}
           <line x1={CENTER_X + focalLength} y1={CENTER_Y - 50} x2={CENTER_X + focalLength} y2={CENTER_Y + 50} stroke="white" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
         </svg>
         <div className="absolute bottom-4 left-4 bg-slate-900/80 p-2 rounded text-xs text-slate-300 border border-slate-700">
            焦点扩散: <span className="font-mono text-cyan-400">{spread.toFixed(1)}</span> (球差)
         </div>
       </div>
       <div className="w-full lg:w-80 bg-slate-800 border-l border-slate-700 p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-6">球差校正工程</h3>
          <Toggle label="启用非球面镜片 (ASP)" checked={isAspherical} onChange={setIsAspherical} />
          <Slider label="镜片有效口径" value={lensRadius} min={50} max={140} onChange={setLensRadius} />
          <div className="mt-8 space-y-4">
            <InfoItem title="为何需要非球面?" content="大光圈镜头边缘光线折射过于强烈。非球面镜片通过精密的曲率变化，强制让所有光线汇聚于同一点，提升画面锐度和对比度。"/>
          </div>
       </div>
    </div>
  );
};

// ... Rest of modules follow same pattern: InfoItem, lg:w-80/96 sidebar, bg-slate-900 visuals ...
const CoatingModule: React.FC = () => {
   const [coatingType, setCoatingType] = useState<'NONE' | 'SINGLE' | 'MULTI' | 'NANO'>('MULTI');
   const coatingSpecs = {
      'NONE': { reflect: 0.8, ghost: 1.0, color: 'transparent', label: '无镀膜' },
      'SINGLE': { reflect: 0.4, ghost: 0.6, color: 'rgba(250, 204, 21, 0.2)', label: '单层镀膜' },
      'MULTI': { reflect: 0.1, ghost: 0.2, color: 'rgba(34, 197, 94, 0.2)', label: '多层镀膜' },
      'NANO': { reflect: 0.02, ghost: 0.05, color: 'rgba(147, 51, 234, 0.2)', label: '纳米结晶' },
   };
   const current = coatingSpecs[coatingType];

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000)'}}></div>
            <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full blur-[20px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full border-2 border-green-500/30 blur-[2px]" style={{ opacity: current.ghost, transform: 'translate(-50px, -50px)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-white/10 relative overflow-hidden backdrop-blur-[2px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" style={{opacity: current.reflect}}></div>
                  <div className="absolute inset-0" style={{backgroundColor: current.color, mixBlendMode: 'overlay'}}></div>
               </div>
            </div>
         </div>
         <div className="w-full lg:w-80 bg-slate-800 border-l border-slate-700 p-6 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6">镜片镀膜技术</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 mb-6">
               {Object.keys(coatingSpecs).map((key) => (
                  <button key={key} onClick={() => setCoatingType(key as any)} className={`p-3 rounded border text-left transition-all ${coatingType === key ? 'bg-slate-700 border-cyan-500 text-white' : 'border-slate-700 text-slate-500'}`}>
                     <div className="font-bold text-xs">{coatingSpecs[key as keyof typeof coatingSpecs].label}</div>
                  </button>
               ))}
            </div>
            <InfoItem title="减反射原理" content="利用薄膜干涉。当反射光线与薄膜反射光相位差 180 度时，光波相互抵消，从而大幅提升透光率，减少鬼影。"/>
         </div>
      </div>
   );
};

const AberrationsModule: React.FC = () => {
   const [type, setType] = useState<'COMA' | 'FIELD_CURVATURE'>('COMA');
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex items-center justify-center p-6">
            {type === 'COMA' ? (
               <div className="w-64 h-64 bg-black border border-slate-700 relative overflow-hidden mx-auto shadow-2xl rounded-lg">
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute top-8 right-8 w-12 h-16 bg-gradient-to-bl from-white/30 to-transparent blur-[2px] rounded-full transform -rotate-45 origin-top-right"></div>
               </div>
            ) : (
               <svg className="w-full max-w-lg h-64" viewBox="0 0 500 300">
                  <path d="M50,100 Q250,160 450,100" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="50" y1="130" x2="450" y2="130" stroke="#22d3ee" strokeWidth="2" />
                  <circle cx="250" cy="130" r="4" fill="#22d3ee" /> 
                  <circle cx="50" cy="130" r="8" fill="none" stroke="#f472b6" />
                  <circle cx="450" cy="130" r="8" fill="none" stroke="#f472b6" />
                  <text x="250" y="180" textAnchor="middle" fill="white" fontSize="12">场曲: 中心清晰 边缘模糊</text>
               </svg>
            )}
         </div>
         <div className="w-full lg:w-80 bg-slate-800 border-l border-slate-700 p-6 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6">边缘画质分析</h3>
            <div className="flex gap-2 lg:flex-col">
               <button onClick={() => setType('COMA')} className={`flex-1 p-3 rounded border text-left text-xs ${type === 'COMA' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-500'}`}>彗差 (Coma)</button>
               <button onClick={() => setType('FIELD_CURVATURE')} className={`flex-1 p-3 rounded border text-left text-xs ${type === 'FIELD_CURVATURE' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-500'}`}>场曲 (Field Curvature)</button>
            </div>
            <div className="mt-8 space-y-4">
               <InfoItem title="为何边缘总是模糊?" content="由于光路经过透镜边缘时曲率更剧烈，光线汇聚点不再是平直的面。高端镜头使用非球面和ED低色散镜片来压制这些边缘瑕疵。"/>
            </div>
         </div>
      </div>
   );
};
