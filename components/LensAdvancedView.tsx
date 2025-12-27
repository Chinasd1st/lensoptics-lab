
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CENTER_X, CENTER_Y, OPTICAL_AXIS_Y, calculateSphericalAberration } from '../utils/optics';
import { Toggle, Slider } from './Controls';
import { Aperture, Sparkles, AlertTriangle, Hammer, Film, Camera as CameraIcon, Info, LineChart, BookOpen, SunDim } from 'lucide-react';
import { AsphericalView } from './AsphericalView';

type Tab = 'ASPHERICAL' | 'COATING' | 'ABERRATIONS' | 'CINE_VS_PHOTO' | 'MTF_LAB' | 'DIFFRACTION';

interface LensAdvancedViewProps {
  initialTab?: string;
}

export const LensAdvancedView: React.FC<LensAdvancedViewProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('MTF_LAB');

  useEffect(() => {
     if (initialTab && ['ASPHERICAL', 'COATING', 'ABERRATIONS', 'CINE_VS_PHOTO', 'MTF_LAB', 'DIFFRACTION'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
  }, [initialTab]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Tab Bar - Unified Style */}
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'MTF_LAB'} onClick={() => setActiveTab('MTF_LAB')} icon={<LineChart size={16}/>} label="MTF 曲线实验室" />
           <TabButton active={activeTab === 'ASPHERICAL'} onClick={() => setActiveTab('ASPHERICAL')} icon={<Aperture size={16}/>} label="非球面与球差" />
           <TabButton active={activeTab === 'DIFFRACTION'} onClick={() => setActiveTab('DIFFRACTION')} icon={<SunDim size={16}/>} label="衍射极限 (Diffraction)" />
           <TabButton active={activeTab === 'CINE_VS_PHOTO'} onClick={() => setActiveTab('CINE_VS_PHOTO')} icon={<Film size={16}/>} label="电影镜 vs 摄影镜" />
           <TabButton active={activeTab === 'COATING'} onClick={() => setActiveTab('COATING')} icon={<Sparkles size={16}/>} label="镀膜技术" />
           <TabButton active={activeTab === 'ABERRATIONS'} onClick={() => setActiveTab('ABERRATIONS')} icon={<AlertTriangle size={16}/>} label="边缘像差" />
        </div>

        <div className="flex-1 relative overflow-hidden bg-slate-950">
           {activeTab === 'CINE_VS_PHOTO' && <CineVsPhotoModule />}
           {activeTab === 'ASPHERICAL' && <AsphericalView />} 
           {activeTab === 'COATING' && <CoatingModule />}
           {activeTab === 'ABERRATIONS' && <AberrationsModule />}
           {activeTab === 'MTF_LAB' && <MTFModule />}
           {activeTab === 'DIFFRACTION' && <DiffractionModule />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

// --- Diffraction Module (New) ---
const DiffractionModule: React.FC = () => {
   const [fStop, setFStop] = useState(8);
   
   // Airy Disk size approximation ~ 1.22 * wavelength * f-number
   // We exaggerate for visual
   const airyDiskSize = fStop * 2.5; 
   const sharpness = Math.max(0, 100 - (fStop - 8) * 5); // Peak at f/8

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
            <div className="relative w-64 h-64 bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden rounded-lg shadow-2xl">
               {/* Airy Disk Pattern */}
               <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer Rings */}
                  <div className="rounded-full border-2 border-white/20" style={{ width: airyDiskSize * 3, height: airyDiskSize * 3, opacity: 0.3 }}></div>
                  <div className="rounded-full border-2 border-white/40" style={{ width: airyDiskSize * 2, height: airyDiskSize * 2, opacity: 0.5 }}></div>
                  {/* Central Spot */}
                  <div className="rounded-full bg-white blur-sm shadow-[0_0_20px_white]" style={{ width: airyDiskSize, height: airyDiskSize }}></div>
               </div>
               
               <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono">Simulated Point Source</div>
            </div>

            <div className="mt-8 flex gap-12 text-center">
               <div>
                  <div className="text-3xl font-bold text-white mb-1">f/{fStop}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Aperture</div>
               </div>
               <div>
                  <div className={`text-3xl font-bold mb-1 ${fStop > 11 ? 'text-red-500' : 'text-emerald-400'}`}>
                     {fStop > 11 ? 'SOFT' : 'SHARP'}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Result</div>
               </div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <SunDim size={20} className="text-orange-400"/> 衍射极限 (Diffraction)
            </h3>
            
            <Slider label="光圈值 (f-stop)" value={fStop} min={1.4} max={32} step={0.1} onChange={setFStop} />

            <div className="mt-6 bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">艾里斑 (Airy Disk) 大小</span>
                  <span className="text-xs font-mono text-cyan-400">{airyDiskSize.toFixed(1)} µm</span>
               </div>
               
               <div className="h-32 relative border-l border-b border-slate-600 mt-4">
                  <div className="absolute bottom-0 left-0 right-0 h-full flex items-end">
                     {/* Sweet Spot Curve */}
                     {/* Scale viewBox X: 0-300 matches roughly the visual width, Y: 0-100 */}
                     <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                        {/* Curve peaks at f/8. 
                            f/1.4 (x~10) low sharpness due to aberrations (simulated)
                            f/8 (x~75) max sharpness
                            f/32 (x~300) low sharpness due to diffraction
                        */}
                        <path d="M 10,50 Q 75,95 85,95 Q 150,90 300,20" fill="none" stroke="#22d3ee" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                        
                        {/* Current Position Marker */}
                        {/* fStop 1.4 -> 32. Map to 0 -> 300 */}
                        <circle 
                           cx={(fStop / 32) * 300} 
                           cy={100 - (fStop < 8 ? 50 + (fStop/8)*45 : Math.max(20, 95 - ((fStop-8)/24)*75))} 
                           r="6" fill="white" stroke="#22d3ee" strokeWidth="2"
                        />
                     </svg>
                  </div>
                  <div className="absolute -bottom-4 left-0 text-[9px] text-slate-500">f/1.4</div>
                  <div className="absolute -bottom-4 left-[25%] text-[9px] text-emerald-500 font-bold">f/8 (最佳)</div>
                  <div className="absolute -bottom-4 right-0 text-[9px] text-slate-500">f/32</div>
                  <div className="absolute top-0 -left-6 text-[9px] text-slate-500 -rotate-90">Sharpness</div>
               </div>

               <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
                  <strong className="text-white">误区：</strong> 光圈越小画质越好？
                  <br/>
                  错！当光孔极小时（如 f/22），光波发生显著衍射干扰，形成巨大的"艾里斑"，导致图像整体发糊。全画幅相机的最佳光圈通常在 f/5.6 - f/8。
               </p>
            </div>
         </div>
      </div>
   );
};

// --- MTF Module ---
const MTFModule: React.FC = () => {
   const [aperture, setAperture] = useState(2.8);
   const [correction, setCorrection] = useState(false);
   const [showTheory, setShowTheory] = useState(false);
   const [hoverX, setHoverX] = useState<number | null>(null); // 0 to 21.6 mm
   const svgRef = useRef<SVGSVGElement>(null);

   // --- Calculation Logic ---
   const centerQuality = Math.max(0.6, 1 - Math.pow(Math.abs(aperture - 5.6) / 20, 2) * 0.5);
   
   // Helper for curve calculation at specific X
   const getMTFValue = (x: number, freq: 10 | 30, type: 'S' | 'M') => {
      const normalizedX = x / 21.6; // 0 to 1
      const start = freq === 10 ? centerQuality : centerQuality * 0.85;
      
      let end = start;
      if (freq === 10) {
         end = correction ? start * 0.9 : Math.max(0.4, start - (1/aperture) * 0.5);
      } else {
         end = correction ? start * 0.8 : Math.max(0.1, start - (1/aperture) * 0.8);
      }

      if (type === 'M') {
         end = correction ? end * 0.95 : end * 0.6; // Meridional drops more
      }

      // Bezier-like curve approximation: y = start + (end - start) * ease(x)
      // Ease In Out Cubic
      const ease = normalizedX < 0.5 ? 2 * normalizedX * normalizedX : 1 - Math.pow(-2 * normalizedX + 2, 2) / 2;
      return start + (end - start) * ease;
   };

   // Generate Path Data string
   const genPath = (freq: 10 | 30, type: 'S' | 'M') => {
      let d = `M 0,${(1 - getMTFValue(0, freq, type)) * 300}`;
      for(let i=1; i<=216; i+=1) { // 21.6mm * 10
         const x = i/10;
         const y = getMTFValue(x, freq, type);
         const svgY = (1 - y) * 300;
         const svgX = (x / 21.6) * 600;
         d += ` L ${svgX},${svgY}`;
      }
      return d;
   };

   const pS10 = genPath(10, 'S');
   const pM10 = genPath(10, 'M');
   const pS30 = genPath(30, 'S');
   const pM30 = genPath(30, 'M');

   // Hover Logic
   const handleMouseMove = (e: React.MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const mm = Math.max(0, Math.min(21.6, (x / rect.width) * 21.6));
      setHoverX(mm);
   };

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-slate-900 flex flex-col p-6 overflow-hidden">
            {/* Chart Container */}
            <div className="relative flex-1 bg-white rounded-lg p-6 shadow-xl flex flex-col select-none">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h2 className="text-2xl font-black text-slate-800">MTF Chart</h2>
                     <p className="text-xs text-slate-500 font-mono">Modulation Transfer Function @ f/{aperture}</p>
                  </div>
                  {/* Values Readout */}
                  {hoverX !== null ? (
                     <div className="bg-slate-100 p-2 rounded border border-slate-200 text-[10px] font-mono w-40 shadow-inner">
                        <div className="font-bold text-slate-600 border-b border-slate-300 mb-1 pb-1">POS: {hoverX.toFixed(1)}mm</div>
                        <div className="flex justify-between text-emerald-600"><span>10-S: {(getMTFValue(hoverX, 10, 'S')*100).toFixed(0)}</span><span>10-M: {(getMTFValue(hoverX, 10, 'M')*100).toFixed(0)}</span></div>
                        <div className="flex justify-between text-purple-600"><span>30-S: {(getMTFValue(hoverX, 30, 'S')*100).toFixed(0)}</span><span>30-M: {(getMTFValue(hoverX, 30, 'M')*100).toFixed(0)}</span></div>
                     </div>
                  ) : (
                     <div className="text-[10px] text-slate-400 italic mt-2">Hover chart to inspect</div>
                  )}
               </div>

               {/* Legend Bar */}
               <div className="flex gap-4 mb-4 text-[10px] font-bold bg-slate-50 p-2 rounded-md border border-slate-100">
                  <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-emerald-600"></div> <span className="text-slate-600">10 lp/mm (反差)</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-purple-600"></div> <span className="text-slate-600">30 lp/mm (分辨率)</span></div>
                  <div className="w-px h-4 bg-slate-300 mx-2"></div>
                  <div className="flex items-center gap-2"><span className="w-4 border-b-2 border-slate-400"></span> <span className="text-slate-600">实线: 径向 (S)</span></div>
                  <div className="flex items-center gap-2"><span className="w-4 border-b-2 border-dashed border-slate-400"></span> <span className="text-slate-600">虚线: 切向 (M)</span></div>
               </div>

               {/* SVG Graph */}
               <div className="relative flex-1 border-l border-b border-slate-300 cursor-crosshair group" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverX(null)}>
                  {/* Y-Axis Labels */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none -left-8 h-full py-[0px]">
                     {[100, 80, 60, 40, 20, 0].map((v, i) => (
                        <span key={v} className="text-[9px] text-slate-400 text-right w-6" style={{top: `${i*20}%`, position: 'absolute'}}>{v}</span>
                     ))}
                  </div>

                  {/* X-Axis Grid & Labels */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none pl-[2px]">
                     {[0, 5, 10, 15, 21.6].map(v => (
                        <div key={v} className="h-full border-r border-slate-100 relative" style={{left: `calc(${(v/21.6)*100}% - 1px)`, position: 'absolute'}}>
                           <span className="absolute -bottom-6 -left-2 text-[10px] text-slate-400">{v}</span>
                        </div>
                     ))}
                  </div>
                  
                  {/* Horizontal Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                     {[0, 20, 40, 60, 80].map(v => (
                        <div key={v} className="w-full border-t border-slate-100 h-0" style={{top: `${v}%`, position: 'absolute'}}></div>
                     ))}
                  </div>

                  <svg ref={svgRef} className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 300">
                     {/* 10 lp/mm Lines (Contrast) */}
                     <path d={pS10} fill="none" stroke="#059669" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                     <path d={pM10} fill="none" stroke="#059669" strokeWidth="2.5" strokeDasharray="6,4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />

                     {/* 30 lp/mm Lines (Resolution) */}
                     <path d={pS30} fill="none" stroke="#7c3aed" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                     <path d={pM30} fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" vectorEffect="non-scaling-stroke" strokeLinecap="round" />

                     {/* Hover Indicator */}
                     {hoverX !== null && (
                        <g>
                           <line x1={(hoverX/21.6)*600} y1="0" x2={(hoverX/21.6)*600} y2="300" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2" vectorEffect="non-scaling-stroke"/>
                           <circle cx={(hoverX/21.6)*600} cy={(1 - getMTFValue(hoverX, 10, 'S')) * 300} r="3" fill="#059669" />
                           <circle cx={(hoverX/21.6)*600} cy={(1 - getMTFValue(hoverX, 10, 'M')) * 300} r="3" fill="white" stroke="#059669" strokeWidth="2" />
                        </g>
                     )}
                  </svg>
               </div>
               <div className="text-center text-[10px] text-slate-400 mt-6 font-bold">Distance from Image Center (mm)</div>
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-800 border-l border-slate-700 p-6 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2"><LineChart size={20} className="text-cyan-400" /> 控制台</h3>
               <button onClick={() => setShowTheory(!showTheory)} className={`p-2 rounded-full transition-colors ${showTheory ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400'}`} title="Theory Guide">
                  <BookOpen size={18} />
               </button>
            </div>

            {showTheory ? (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="p-4 bg-slate-900 rounded border border-slate-600">
                     <h4 className="text-sm font-bold text-cyan-400 mb-2">什么是 MTF?</h4>
                     <p className="text-[11px] text-slate-300 leading-relaxed">
                        MTF (Modulation Transfer Function) 描述了镜头还原反差的能力。
                        <br/>Y轴越高(接近1)，代表还原度越好。
                        <br/>X轴代表从画面中心(0)到边缘(21.6mm)的位置。
                     </p>
                  </div>

                  <div className="space-y-4">
                     <InfoItem title="10线 (10 lp/mm) - 反差 (Contrast)" color="text-emerald-400" content="代表粗线条的还原能力。这条线越高，照片看起来越通透、立体感越强。如果不高，照片会像蒙了一层雾（球差影响）。"/>
                     <InfoItem title="30线 (30 lp/mm) - 分辨率 (Resolution)" color="text-purple-400" content="代表细微纹理的还原能力。这条线越高，数毛越清晰。主要受衍射和像差影响。"/>
                     <InfoItem title="实线 vs 虚线 (S vs M)" content="实线是径向(Sagittal)，虚线是切向(Meridional)。两条线贴得越近，焦外光斑越圆。如果两条线分叉很大（像散），焦外会变得旋转或杂乱（二线性）。"/>
                  </div>
                  
                  <button onClick={() => setShowTheory(false)} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-xs text-white rounded">返回控制</button>
               </div>
            ) : (
               <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                  <div>
                     <Slider label="光圈 (Aperture)" value={aperture} min={1.4} max={22} step={0.1} onChange={setAperture} />
                     <div className="text-[10px] text-slate-400 mt-2 bg-slate-900 p-2 rounded border border-slate-700">
                        {aperture < 2.8 ? '大光圈下，边缘画质通常会因球差和彗差而下降。曲线末端(边缘)掉落明显。' : 
                         aperture > 16 ? '小光圈下，整体画质会因衍射效应(Diffraction)而下降。全图反差降低。' : 
                         '黄金光圈 (f/5.6-f/8) 通常拥有最佳的中心和边缘画质。曲线最为平直。'}
                     </div>
                  </div>

                  <Toggle label="启用像差修正 (ED/ASP镜片)" checked={correction} onChange={setCorrection} />
                  
                  <div className="bg-slate-900 p-4 rounded border border-slate-700">
                     <h4 className="text-xs font-bold text-slate-300 mb-2">曲线解读</h4>
                     <ul className="text-[10px] text-slate-400 space-y-2 list-disc pl-3">
                        <li><span className="text-emerald-400">绿色线</span> 决定画面是否"通透"。</li>
                        <li><span className="text-purple-400">紫色线</span> 决定画面是否"锐利"。</li>
                        <li>实虚线分离越严重，像散(Astigmatism)越严重，焦外越难看。</li>
                     </ul>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

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

const CoatingModule: React.FC = () => {
   const [coating, setCoating] = useState<'NONE' | 'NANO'>('NONE');

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Light Source */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-[20px] z-10 opacity-80"></div>
            
            {/* Lens Elements Stack (Simulated) */}
            <div className="relative w-64 h-64 flex items-center justify-center">
               {[...Array(5)].map((_,i) => (
                  <div key={i} className="absolute border border-slate-600 rounded-full" 
                       style={{
                          width: `${200 - i*30}px`, 
                          height: `${200 - i*30}px`,
                          background: 'rgba(255,255,255,0.05)',
                          // Ghosting Reflection
                          boxShadow: coating === 'NONE' ? `inset 10px 10px 20px rgba(255,255,255,0.2), 0 0 10px rgba(255,200,100,0.2)` : 'none'
                       }}>
                  </div>
               ))}
               
               {/* Flare Ghosts */}
               {coating === 'NONE' && (
                  <>
                     <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-xl -translate-x-[120%] -translate-y-[120%]"></div>
                     <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500/20 rounded-full blur-lg -translate-x-[60%] -translate-y-[60%]"></div>
                     <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-2xl translate-x-[20%] translate-y-[20%]"></div>
                     {/* Veiling Glare (Low Contrast) */}
                     <div className="absolute inset-[-100px] bg-white/10 mix-blend-screen pointer-events-none"></div>
                  </>
               )}
            </div>

            {/* Subject Image (Low contrast if no coating) */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
               <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000" className={`w-full h-full object-cover transition-all duration-500 ${coating === 'NONE' ? 'opacity-50 contrast-50' : 'opacity-80 contrast-100'}`} />
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Sparkles size={20} className="text-yellow-400" /> 镀膜技术</h3>
            
            <div className="flex bg-slate-800 p-1 rounded-lg mb-8 border border-slate-700">
               <button onClick={() => setCoating('NONE')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${coating === 'NONE' ? 'bg-slate-600 text-white shadow' : 'text-slate-500'}`}>无镀膜 (Uncoated)</button>
               <button onClick={() => setCoating('NANO')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${coating === 'NANO' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500'}`}>纳米镀膜 (Nano AR)</button>
            </div>

            <div className="space-y-4">
               <InfoItem title="鬼影 (Ghosting)" content="光线在镜片之间多次反射形成的虚像。通常表现为成串的光斑。" color={coating === 'NONE' ? "text-red-400" : "text-slate-500"}/>
               <InfoItem title="眩光 (Flare)" content="非成像光线进入镜头导致的雾化现象。会严重降低画面对比度（黑位发灰）。" color={coating === 'NONE' ? "text-red-400" : "text-slate-500"}/>
               <div className="bg-slate-800 p-4 rounded border border-slate-700 mt-4">
                  <h4 className="text-xs font-bold text-indigo-400 mb-2">Nano AR Coating II</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                     现代镜头采用纳米级多孔结构，使空气到玻璃的折射率平滑过渡，将反射率从 4% 降低到 0.1% 以下，确保在逆光下也能获得"黑得下去"的通透画质。
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

const AberrationsModule: React.FC = () => {
   const [type, setType] = useState<'CA' | 'COMA' | 'VIGNETTE'>('CA');
   const [correction, setCorrection] = useState(false);

   return (
      <div className="flex flex-col lg:flex-row h-full">
         <div className="flex-1 bg-black flex items-center justify-center p-8 relative overflow-hidden">
            <div className="relative w-full max-w-lg aspect-square bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl group">
               {/* Image Source */}
               <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000)'}}></div>
               
               {/* Overlay Effects */}
               {/* 1. Chromatic Aberration (CA) */}
               {type === 'CA' && !correction && (
                  <>
                     <div className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-50" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000)', transform: 'scale(1.02) translate(-2px, -2px)', filter: 'hue-rotate(90deg)'}}></div>
                     <div className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-50" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000)', transform: 'scale(1.02) translate(2px, 2px)', filter: 'hue-rotate(-90deg)'}}></div>
                     <div className="absolute top-4 left-4 text-xs text-red-400 font-mono bg-black/60 px-2 py-1">⚠️ PURPLE FRINGING</div>
                  </>
               )}

               {/* 2. Vignetting */}
               {type === 'VIGNETTE' && !correction && (
                  <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 120%)'}}></div>
               )}

               {/* 3. Coma (Simulated with SVG) */}
               {type === 'COMA' && !correction && (
                  <div className="absolute inset-0">
                     {[...Array(20)].map((_, i) => {
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        if (x > 20 && x < 80 && y > 20 && y < 80) return null; // Only edges
                        return (
                           <div key={i} className="absolute w-2 h-2 bg-white rounded-full blur-[1px]" style={{left: `${x}%`, top: `${y}%`, boxShadow: '2px 2px 10px white, 4px 4px 0px rgba(255,255,255,0.5)'}}></div>
                        )
                     })}
                     <div className="absolute top-4 left-4 text-xs text-yellow-400 font-mono bg-black/60 px-2 py-1">⚠️ COMA (ASTIGMATISM)</div>
                  </div>
               )}
               {type === 'COMA' && correction && (
                  <div className="absolute inset-0">
                     {[...Array(20)].map((_, i) => {
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        if (x > 20 && x < 80 && y > 20 && y < 80) return null;
                        return (
                           <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{left: `${x}%`, top: `${y}%`}}></div>
                        )
                     })}
                  </div>
               )}
            </div>
         </div>

         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><AlertTriangle size={20} className="text-red-400" /> 像差分析</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
               <button onClick={() => setType('CA')} className={`p-2 text-[10px] font-bold rounded border ${type === 'CA' ? 'bg-red-900/50 border-red-500 text-white' : 'border-slate-700 text-slate-400'}`}>色散 (CA)</button>
               <button onClick={() => setType('VIGNETTE')} className={`p-2 text-[10px] font-bold rounded border ${type === 'VIGNETTE' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-400'}`}>暗角</button>
               <button onClick={() => setType('COMA')} className={`p-2 text-[10px] font-bold rounded border ${type === 'COMA' ? 'bg-yellow-900/50 border-yellow-500 text-white' : 'border-slate-700 text-slate-400'}`}>彗差 (Coma)</button>
            </div>

            <Toggle label="启用光学修正 (ED/APO)" checked={correction} onChange={setCorrection} />

            <div className="mt-6 bg-slate-800 p-4 rounded border border-slate-700 min-h-[120px]">
               {type === 'CA' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                     <strong className="text-red-400">色差 (Chromatic Aberration):</strong> 不同波长的光（红绿蓝）折射率不同，无法汇聚在同一点。
                     <br/>表现为高反差边缘出现紫边或绿边。需使用 ED (低色散) 镜片修正。
                  </p>
               )}
               {type === 'VIGNETTE' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                     <strong className="text-white">暗角 (Vignetting):</strong> 镜筒物理遮挡（口径蚀）或光线入射角度过大导致。
                     <br/>收缩光圈通常能改善。
                  </p>
               )}
               {type === 'COMA' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                     <strong className="text-yellow-400">彗差 (Coma):</strong> 边缘点光源成像变成彗星状拖尾。
                     <br/>这对星空摄影是致命的。高级镜头（如 24GM）即使光圈全开也能保持边缘星星圆润。
                  </p>
               )}
            </div>
         </div>
      </div>
   );
};
