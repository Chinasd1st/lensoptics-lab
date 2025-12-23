
import React, { useState, useEffect, useRef } from 'react';
import { Slider, Toggle } from './Controls';
import { FocusControlModule } from './FocusControlModule'; // Imported Module
import { Video, Crosshair, Move, Camera, Disc, Activity, Zap, Layers, Anchor, Smartphone, Eye, Lightbulb, Sun, User, Monitor, Maximize2, Aperture, Dumbbell } from 'lucide-react';

type Tab = 'LIGHTING' | 'LENS_CHOICE' | 'ANAMORPHIC' | 'STABILIZER' | 'MOVEMENT' | 'FOCUS_CONTROL';

export const CinematographyView: React.FC = () => {
   const [activeTab, setActiveTab] = useState<Tab>('LIGHTING');

   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
         <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
            {/* Navigation */}
            <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
               <TabButton active={activeTab === 'LIGHTING'} onClick={() => setActiveTab('LIGHTING')} icon={<Lightbulb size={16}/>} label="布光 (Lighting)" />
               <TabButton active={activeTab === 'LENS_CHOICE'} onClick={() => setActiveTab('LENS_CHOICE')} icon={<Maximize2 size={16}/>} label="焦段与透视" />
               <TabButton active={activeTab === 'ANAMORPHIC'} onClick={() => setActiveTab('ANAMORPHIC')} icon={<Aperture size={16}/>} label="变形宽银幕" />
               <TabButton active={activeTab === 'STABILIZER'} onClick={() => setActiveTab('STABILIZER')} icon={<Anchor size={16}/>} label="稳定器" />
               <TabButton active={activeTab === 'MOVEMENT'} onClick={() => setActiveTab('MOVEMENT')} icon={<Move size={16}/>} label="运镜" />
               <TabButton active={activeTab === 'FOCUS_CONTROL'} onClick={() => setActiveTab('FOCUS_CONTROL')} icon={<Crosshair size={16}/>} label="无线跟焦" />
            </div>
            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden bg-slate-950">
               {activeTab === 'LIGHTING' && <LightingModule />}
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
  <button onClick={onClick} className={`flex items-center gap-2 px-6 py-4 text-xs font-bold transition-colors whitespace-nowrap ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

// --- Sub Modules ---

const FocalLengthModule: React.FC = () => {
   const [focalLength, setFocalLength] = useState(50);
   const bgScale = 1 + (focalLength - 24) * 0.05; 
   const fov = 180 / Math.PI * 2 * Math.atan(36 / (2 * focalLength)); 

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
             <div className="relative w-full h-full max-w-4xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center rounded-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out origin-center"
                  style={{ 
                     backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000)',
                     transform: `scale(${bgScale})`,
                     filter: 'brightness(0.6)'
                  }}
                ></div>
                <div 
                  className="absolute inset-0 flex items-center justify-between px-20 pointer-events-none transition-transform duration-100 ease-out"
                  style={{ transform: `scale(${1 + (bgScale-1)*0.5})` }}
                >
                   <div className="w-10 h-40 bg-emerald-900/50 backdrop-blur-sm rounded-full blur-[2px]"></div>
                   <div className="w-10 h-40 bg-emerald-900/50 backdrop-blur-sm rounded-full blur-[2px]"></div>
                </div>
                <div className="relative z-10 w-48 h-64 bg-slate-800 rounded-xl shadow-2xl flex flex-col items-center justify-end overflow-hidden border border-slate-700">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1 rounded font-mono">SUBJ</div>
                </div>
                <div className="absolute top-4 left-4 bg-black/60 p-2 rounded text-white font-mono border border-slate-600">
                   <div className="text-xl font-bold text-cyan-400">{focalLength}mm</div>
                   <div className="text-xs text-slate-400">FOV: {fov.toFixed(1)}°</div>
                </div>
             </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Maximize2 size={18} className="text-cyan-400"/> 焦段与空间压缩
            </h3>
            <Slider label="焦距 (Focal Length)" value={focalLength} min={16} max={200} step={1} onChange={setFocalLength} />
            <div className="flex gap-2 mb-6">
               <button onClick={()=>setFocalLength(24)} className="flex-1 py-2 bg-slate-800 border border-slate-600 rounded text-xs hover:bg-slate-700">24mm</button>
               <button onClick={()=>setFocalLength(50)} className="flex-1 py-2 bg-slate-800 border border-slate-600 rounded text-xs hover:bg-slate-700">50mm</button>
               <button onClick={()=>setFocalLength(85)} className="flex-1 py-2 bg-slate-800 border border-slate-600 rounded text-xs hover:bg-slate-700">85mm</button>
            </div>
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
               <h4 className="text-xs font-bold text-cyan-400 mb-2">空间压缩 (Compression)</h4>
               <p className="text-[10px] text-slate-400 leading-relaxed">
                  长焦镜头（如85mm+）会把背景“拉近”，让背景物体看起来比实际更大，与主体的距离更近。
                  <br/>广角镜头（如24mm-）会夸大距离感，让背景显得很远。
               </p>
            </div>
         </div>
      </div>
   );
};

const AnamorphicModule: React.FC = () => {
   const [isAnamorphic, setIsAnamorphic] = useState(false);
   const [squeeze, setSqueeze] = useState(1.33);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl transition-all duration-500" 
                 style={{ aspectRatio: isAnamorphic ? '2.39/1' : '16/9' }}>
               <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000)'}}></div>
               <div className="absolute inset-0 flex items-center justify-center gap-20">
                  {[...Array(5)].map((_, i) => (
                     <div key={i} className="bg-cyan-400/30 backdrop-blur-sm border border-cyan-200/20"
                          style={{
                             width: isAnamorphic ? '60px' : '40px',
                             height: '40px',
                             borderRadius: isAnamorphic ? '40%' : '50%',
                             filter: 'blur(2px)',
                             transform: `translate(${Math.sin(i)*100}px, ${Math.cos(i)*50}px)`
                          }}></div>
                  ))}
               </div>
               {isAnamorphic && (
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500/50 blur-[4px] mix-blend-screen animate-pulse">
                     <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-2 bg-blue-400 blur-[8px]"></div>
                  </div>
               )}
               {isAnamorphic && (
                  <>
                     <div className="absolute top-0 left-0 w-full h-[10%] bg-black z-20"></div>
                     <div className="absolute bottom-0 left-0 w-full h-[10%] bg-black z-20"></div>
                  </>
               )}
               <div className="absolute top-4 left-4 text-white text-xs font-mono drop-shadow-md z-30">
                  {isAnamorphic ? 'ANAMORPHIC LENS' : 'SPHERICAL LENS'}
               </div>
            </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Aperture size={18} className="text-purple-400"/> 变形宽银幕镜头</h3>
            <Toggle label="启用变形镜头" checked={isAnamorphic} onChange={setIsAnamorphic} />
            {isAnamorphic && (
               <div className="mb-6">
                  <Slider label="挤压倍率" value={squeeze} min={1.33} max={2.0} step={0.01} onChange={setSqueeze} />
               </div>
            )}
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
               <h4 className="text-xs font-bold text-purple-400 mb-2">三大视觉特征</h4>
               <ul className="text-[10px] text-slate-400 list-disc pl-4 space-y-2">
                  <li><strong>椭圆焦外:</strong> 光圈被水平挤压。</li>
                  <li><strong>横向拉丝:</strong> 强光源产生水平炫光（JJ Abrams 风格）。</li>
                  <li><strong>宽银幕画幅:</strong> 2.39:1 电影感。</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

const LightingModule: React.FC = () => {
   const [keyIntensity, setKeyIntensity] = useState(80);
   const [fillIntensity, setFillIntensity] = useState(30);
   const [backIntensity, setBackIntensity] = useState(60);
   const [angle, setAngle] = useState(45); 

   const ratioMain = Math.round((keyIntensity + fillIntensity) / (fillIntensity || 1));

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center relative p-8">
            <div className="relative w-64 h-80 lg:w-80 lg:h-96 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125" alt="Portrait Subject"/>
               <div className="absolute inset-0 mix-blend-overlay transition-all duration-300" style={{background: `linear-gradient(${90 + angle}deg, rgba(255,240,220,${keyIntensity/100}) 0%, transparent 70%)`, opacity: keyIntensity / 100}}></div>
               {keyIntensity > 20 && <div className="absolute top-[42%] left-[45%] w-1 h-1 bg-white rounded-full blur-[1px] shadow-[0_0_5px_white]"></div>}
               <div className="absolute inset-0 mix-blend-screen transition-all duration-300" style={{backgroundColor: `rgba(50,60,80, ${fillIntensity/400})`}}></div>
               <div className="absolute inset-0 transition-all duration-300 pointer-events-none" style={{boxShadow: `inset 0 0 20px rgba(0,0,0,0.8), inset ${backIntensity/5}px -${backIntensity/10}px ${backIntensity/3}px rgba(200,220,255,${backIntensity/100})`, mixBlendMode: 'screen'}}></div>
               <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="bg-black/50 text-[10px] text-white px-2 py-1 rounded backdrop-blur-sm border border-white/10">光比 {ratioMain}:1</span>
               </div>
            </div>
            <div className="absolute bottom-8 right-8 w-40 h-40 bg-slate-900/90 rounded-full border border-slate-700 flex items-center justify-center shadow-xl">
               <User size={24} className="text-slate-500" />
               <Camera size={16} className="text-white absolute bottom-2" />
               <div className="absolute w-full h-full" style={{ transform: `rotate(${-angle}deg)` }}><Sun size={20} className="text-orange-400 absolute top-2 left-1/2 -translate-x-1/2" /></div>
               <div className="absolute w-full h-full opacity-50 pointer-events-none"><Sun size={16} className="text-blue-400 absolute top-10 left-2" /></div>
               <div className="absolute w-full h-full opacity-80 pointer-events-none" style={{ transform: 'rotate(180deg)' }}><Sun size={16} className="text-white absolute top-2 left-1/2 -translate-x-1/2" /></div>
            </div>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-6">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Lightbulb className="text-yellow-400" size={20}/> 三点布光</h3>
               <div className="space-y-6">
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                     <Slider label="主光 (Key)" value={keyIntensity} min={0} max={100} onChange={setKeyIntensity} />
                     <Slider label="角度" value={angle} min={-60} max={60} onChange={setAngle} />
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700"><Slider label="辅光 (Fill)" value={fillIntensity} min={0} max={80} onChange={setFillIntensity} /></div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700"><Slider label="轮廓光 (Rim)" value={backIntensity} min={0} max={100} onChange={setBackIntensity} /></div>
               </div>
            </div>
         </div>
      </div>
   );
};

const RiggingModule: React.FC = () => {
   const [rigType, setRigType] = useState<'HANDHELD' | 'SHOULDER' | 'GIMBAL'>('GIMBAL');
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center relative p-8 border-b lg:border-b-0 border-slate-800">
            <div className="relative w-full h-full flex items-center justify-center max-w-2xl">
               <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
               <div className={`w-40 h-28 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl flex items-center justify-center relative transition-transform z-10
                  ${rigType === 'HANDHELD' ? 'animate-handheld-shake' : rigType === 'SHOULDER' ? 'animate-shoulder-sway' : 'animate-gimbal-float'}
               `}>
                  <Camera size={48} className="text-white/20" />
                  <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {rigType === 'GIMBAL' && (
                     <div className="absolute inset-[-40px] border-2 border-cyan-500/30 rounded-full animate-spin-slow flex items-center justify-center pointer-events-none">
                         <div className="absolute top-0 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_cyan]"></div>
                         <div className="absolute inset-[-20px] border border-cyan-500/10 rounded-full animate-reverse-spin"></div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <style>{`
            @keyframes handheld-shake { 0%, 100% { transform: translate(0,0) rotate(0); } 10% { transform: translate(-2px, -3px) rotate(-1deg); } 20% { transform: translate(3px, 2px) rotate(1deg); } 30% { transform: translate(-3px, 1px) rotate(0deg); } 40% { transform: translate(1px, -2px) rotate(-1deg); } 50% { transform: translate(-1px, 2px) rotate(0.5deg); } 60% { transform: translate(2px, 1px) rotate(-0.5deg); } 70% { transform: translate(-2px, -1px) rotate(0deg); } 80% { transform: translate(1px, 1px) rotate(-1deg); } 90% { transform: translate(2px, -2px) rotate(1deg); } }
            @keyframes shoulder-sway { 0%, 100% { transform: translate(0,0) rotate(0); } 50% { transform: translate(5px, 2px) rotate(0.5deg); } }
            @keyframes gimbal-float { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(10px, 1px); } }
            .animate-spin-slow { animation: spin 6s linear infinite; }
            .animate-reverse-spin { animation: spin 8s linear infinite reverse; }
         `}</style>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-6">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Anchor className="text-cyan-400" size={20}/> 承托与稳定</h3>
               <div className="space-y-3 mb-8">
                  <button onClick={() => setRigType('HANDHELD')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'HANDHELD' ? 'bg-red-900/20 border-red-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-red-400">Handheld (帕金森)</div></button>
                  <button onClick={() => setRigType('SHOULDER')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'SHOULDER' ? 'bg-yellow-900/20 border-yellow-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-yellow-400">Shoulder Rig (老法师)</div></button>
                  <button onClick={() => setRigType('GIMBAL')} className={`w-full p-4 rounded-lg border text-left transition-all ${rigType === 'GIMBAL' ? 'bg-cyan-900/20 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-sm text-cyan-400">Gimbal (麒麟臂)</div></button>
               </div>
            </div>
         </div>
      </div>
   );
};

const MovementModule: React.FC = () => {
   const [moveType, setMoveType] = useState<'DOLLY' | 'TRUCK' | 'PAN' | 'TILT'>('DOLLY');
   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8">
            <div className="relative w-full h-64 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center perspective-1000">
               <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px', transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'}}></div>
               <div className={`w-20 h-20 bg-cyan-600 rounded-lg shadow-[0_0_30px_cyan] flex items-center justify-center relative z-10 ${moveType === 'DOLLY' ? 'animate-dolly' : moveType === 'TRUCK' ? 'animate-truck' : moveType === 'PAN' ? 'animate-pan' : 'animate-tilt'}`}>
                  <Camera size={40} className="text-white" />
               </div>
               <div className="absolute bottom-4 left-0 w-full text-center"><span className="text-4xl font-black text-white/10 uppercase tracking-[1em]">{moveType}</span></div>
            </div>
            <style>{`
               @keyframes dolly { 0%, 100% { transform: scale(0.5); opacity: 0.5; } 50% { transform: scale(1.5); opacity: 1; } }
               @keyframes truck { 0%, 100% { transform: translateX(-100px); } 50% { transform: translateX(100px); } }
               @keyframes pan { 0%, 100% { transform: rotateY(-45deg); } 50% { transform: rotateY(45deg); } }
               @keyframes tilt { 0%, 100% { transform: rotateX(-45deg); } 50% { transform: rotateX(45deg); } }
            `}</style>
         </div>
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Move size={20} className="text-cyan-400"/> 运镜术语</h3>
            <div className="grid grid-cols-2 gap-3">
               <button onClick={()=>setMoveType('DOLLY')} className={`p-4 rounded border text-left ${moveType==='DOLLY' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Dolly (推拉)</div></button>
               <button onClick={()=>setMoveType('TRUCK')} className={`p-4 rounded border text-left ${moveType==='TRUCK' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Truck (横移)</div></button>
               <button onClick={()=>setMoveType('PAN')} className={`p-4 rounded border text-left ${moveType==='PAN' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Pan (摇摄)</div></button>
               <button onClick={()=>setMoveType('TILT')} className={`p-4 rounded border text-left ${moveType==='TILT' ? 'bg-cyan-900/50 border-cyan-500' : 'border-slate-700'}`}><div className="font-bold text-xs mb-1">Tilt (俯仰)</div></button>
            </div>
         </div>
      </div>
   );
};
