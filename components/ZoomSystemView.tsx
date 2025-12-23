
import React, { useState, useMemo, useEffect } from 'react';
import { Slider, Toggle, Select } from './Controls';
import { CENTER_X, CENTER_Y, OPTICAL_AXIS_Y, traceRayThroughSystem } from '../utils/optics';
import { OpticalSurface } from '../types';
import { Microscope, Activity, Aperture as ApertureIcon, Maximize2, Scan, Eye, Layers, Calculator, AlertTriangle, Scale, Sparkles } from 'lucide-react';

// Lens Preset Definitions with "Meme" descriptions
const LENS_PRESETS = {
  'ZOOM_STD': {
    name: '24-70mm GM II (索尼大法好)',
    nickname: '明日之镜',
    type: 'Zoom',
    minF: 24,
    maxF: 70,
    minAp: 2.8,
    maxAp: 22,
    elements: '20 elements (堆料狂魔)',
    weight: '695g (健身器材轻量化)',
    lengthFactor: 1.0, 
    minFocus: 210, 
    meme: '索尼罪大滔天，百姓无不怀念。买G大师不仅是买镜头，更是充值信仰。'
  },
  'PRIME_FAST': {
    name: '50mm f/1.2 L (感动牌牙膏厂)',
    nickname: '人像镜皇',
    type: 'Prime',
    minF: 50,
    maxF: 50,
    minAp: 1.2,
    maxAp: 16,
    elements: '14 elements (挤爆牙膏)',
    weight: '998g (练臂力)',
    lengthFactor: 0.8,
    minFocus: 400,
    meme: '光圈全开锐度爆表，焦外如奶油般化开，这就是"德味"（虽然是日产）。'
  },
  'ZOOM_TELE': {
    name: '70-200mm (老法师之剑)',
    nickname: '公园打鸟神器',
    type: 'Zoom',
    minF: 70,
    maxF: 200,
    minAp: 4.0,
    maxAp: 32,
    elements: '21 elements',
    weight: '1200g',
    lengthFactor: 1.4,
    minFocus: 1000,
    meme: '公园大爷的最爱。荷花、翠鸟、还有漫展。只要够长，不仅能拍鸟，还能用来防身。'
  },
  'MACRO_100': {
    name: '100mm F2.8 GM (2025新品)',
    nickname: '百微 GM II',
    type: 'Prime',
    minF: 100,
    maxF: 100,
    minAp: 2.8,
    maxAp: 32,
    elements: '16 elements (双浮动对焦)',
    weight: '650g',
    lengthFactor: 1.2,
    minFocus: 240,
    meme: '1.4倍放大倍率，数毛党的终极兵器。连螨虫的腿毛都能拍清楚，密集恐惧症慎入。'
  }
};

type PresetKey = keyof typeof LENS_PRESETS;

export const ZoomSystemView: React.FC = () => {
  // State
  const [selectedLensId, setSelectedLensId] = useState<PresetKey>('ZOOM_STD');
  const [zoomPos, setZoomPos] = useState(0.5); // 0.0 to 1.0
  const [apertureStop, setApertureStop] = useState(5.6);
  const [showRays, setShowRays] = useState(true);
  const [focusDistance, setFocusDistance] = useState(1200); // mm

  const currentLens = LENS_PRESETS[selectedLensId];

  // Reset/Clamp values when lens changes
  useEffect(() => {
    // Clamp aperture
    if (apertureStop < currentLens.minAp) setApertureStop(currentLens.minAp);
    if (apertureStop > currentLens.maxAp) setApertureStop(currentLens.maxAp);
    
    // Reset zoom if Prime
    if (currentLens.type === 'Prime') setZoomPos(0);

    // Clamp Focus
    if (focusDistance < currentLens.minFocus) setFocusDistance(currentLens.minFocus);
  }, [selectedLensId]);

  // Derived Values
  const focalLengthEquiv = currentLens.minF + zoomPos * (currentLens.maxF - currentLens.minF);
  
  // System Configuration & Geometry
  const SENSOR_X = 750;
  // Adjust spacing based on lens type (Telephoto is longer)
  const FRONT_LENS_X = 200 - (currentLens.lengthFactor - 1) * 50; 
  
  // Calculate element positions based on zoom (cam simulation)
  const zoomTravel = currentLens.type === 'Prime' ? 0 : 100;
  const g2Pos = FRONT_LENS_X + 50 + zoomPos * zoomTravel; 
  const g3Pos = FRONT_LENS_X + 250 + zoomPos * (zoomTravel * 0.5);
  const apertureX = g3Pos - 20;

  // Focus Breathing Simulation
  const maxBreathing = 0.15; 
  const breathingFactor = 1.0 + (1 - Math.min(focusDistance, 5000) / 5000) * (maxBreathing * (600 / Math.max(focusDistance, 600)));
  
  // Optical Surfaces Generation
  const surfaces: OpticalSurface[] = useMemo(() => [
    { x: FRONT_LENS_X, f: 120 * currentLens.lengthFactor, h: 45, name: '前玉 (G1)' },
    { x: g2Pos, f: -60, h: 35, name: '变焦组' },
    { x: apertureX, f: Infinity, h: (50 / apertureStop) * 10, name: '光圈' }, 
    { x: g3Pos, f: 110 * currentLens.lengthFactor, h: 40, name: '对焦组' },
  ], [g2Pos, g3Pos, apertureX, apertureStop, currentLens.lengthFactor, FRONT_LENS_X]);

  // Object Source Position
  const objectX = SENSOR_X - focusDistance;
  
  // Ray Tracing Logic
  const rays = useMemo(() => {
    const result = [];
    const sourcePoints = [
      { y: OPTICAL_AXIS_Y, color: '#10b981' }, // On-axis (Green)
      { y: OPTICAL_AXIS_Y - 40, color: '#3b82f6' }, // Off-axis (Blue)
      { y: OPTICAL_AXIS_Y + 40, color: '#ef4444' }  // Off-axis (Red)
    ];

    for (const pt of sourcePoints) {
      const angles = [-0.15, -0.07, 0, 0.07, 0.15];
      for (const angle of angles) {
         const dx = FRONT_LENS_X - objectX;
         const dy = OPTICAL_AXIS_Y - pt.y;
         const baseAngle = Math.atan2(dy, dx);
         // Narrower spread for telephoto to keep rays hitting lens
         const spreadFactor = 1000 / (focusDistance * currentLens.lengthFactor);
         
         const trace = traceRayThroughSystem(
           { x: objectX, y: pt.y },
           baseAngle + angle * spreadFactor, 
           surfaces,
           SENSOR_X
         );
         if (!trace.blocked) {
           result.push({ path: trace.path, color: pt.color });
         }
      }
    }
    return result;
  }, [objectX, surfaces, focusDistance, currentLens.lengthFactor, FRONT_LENS_X]);

  // MTF / Performance Simulation
  const mtfCurve = useMemo(() => {
    const width = 180;
    const height = 80;
    let performance = 1.0;
    // Fast lenses are softer wide open
    if (apertureStop < 2.8) performance -= (2.8 - apertureStop) * 0.15;
    if (apertureStop > 16) performance -= (apertureStop - 16) * 0.05; // Diffraction
    // Zooms are softer at extremes
    if (currentLens.type === 'Zoom') performance -= Math.abs(zoomPos - 0.5) * 0.1;

    performance = Math.max(0.3, performance);

    const peakY = height - (height * performance);
    const endY = height - (height * (performance * 0.5)); 
    
    return `M 0,${peakY} Q ${width/2},${peakY} ${width},${endY}`;
  }, [apertureStop, zoomPos, currentLens.type]);

  // DoF Calculator Logic (Simplified)
  const calculateDoF = () => {
    // CoC for Full Frame approx 0.03mm
    const coc = 0.03; 
    const f = focalLengthEquiv;
    const N = apertureStop;
    const d = focusDistance; // mm

    // Hyperfocal distance H = f^2 / (N * c) + f
    const H = (f * f) / (N * coc) + f;
    
    const near = (H * d) / (H + (d - f));
    const far = (H * d) / (H - (d - f));
    
    return {
      near: near,
      far: far > 0 ? far : Infinity, // if d > H, far is infinity
      depth: far > 0 ? far - near : Infinity
    };
  };

  const dofData = calculateDoF();

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Viewport */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800">
        
        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 z-10 font-mono text-xs text-cyan-500 space-y-2 pointer-events-none">
          <div className="flex items-center gap-2">
            <Maximize2 size={14} /> 
            <span>EFL: {focalLengthEquiv.toFixed(1)}mm</span>
          </div>
          <div className="flex items-center gap-2">
             <ApertureIcon size={14} />
             <span>IRIS: f/{apertureStop.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
             <Activity size={14} />
             <span>MTF: {(100 - (apertureStop > 8 ? (apertureStop-8)*5 : (4-apertureStop)*8)).toFixed(0)}%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-4 text-[10px] text-slate-500">
           <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 轴上光线</div>
           <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 边缘光场</div>
        </div>

        <svg className="w-full h-full" viewBox="0 0 800 500">
          <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#334155" strokeDasharray="4,4" />

          {/* Sensor Plane */}
          <g transform={`translate(${SENSOR_X}, ${OPTICAL_AXIS_Y})`}>
             <line x1="0" y1="-60" x2="0" y2="60" stroke="#94a3b8" strokeWidth="4" />
             <text x="10" y="0" fill="#64748b" fontSize="10" style={{writingMode: 'vertical-rl'}}>CMOS</text>
          </g>

          {/* Lenses */}
          {surfaces.map((surf, i) => (
             surf.name === '光圈' ? (
                <g key={i} transform={`translate(${surf.x}, ${OPTICAL_AXIS_Y})`}>
                   <line x1="0" y1={-surf.h - 20} x2="0" y2={-surf.h} stroke="#eab308" strokeWidth="3" />
                   <line x1="0" y1={surf.h + 20} x2="0" y2={surf.h} stroke="#eab308" strokeWidth="3" />
                </g>
             ) : (
                <g key={i} transform={`translate(${surf.x}, ${OPTICAL_AXIS_Y})`}>
                   <path 
                     d={surf.f > 0 
                        ? `M-5,-${surf.h} Q15,0 -5,${surf.h} L5,${surf.h} Q-15,0 5,-${surf.h} Z`
                        : `M-5,-${surf.h} Q-15,0 -5,${surf.h} L5,${surf.h} Q15,0 5,-${surf.h} Z`
                     }
                     fill="rgba(34, 211, 238, 0.15)"
                     stroke={surf.f > 0 ? "#22d3ee" : "#a8a29e"}
                     strokeWidth="1.5"
                   />
                   <text x="-10" y={-surf.h - 10} fill="#475569" fontSize="9">{surf.name}</text>
                   <path d="M-2,-10 L2,0" stroke="white" strokeWidth="1" opacity="0.3" />
                </g>
             )
          ))}

          {showRays && rays.map((ray, i) => (
             <polyline
               key={i}
               points={ray.path.map(p => `${p.x},${p.y}`).join(' ')}
               fill="none"
               stroke={ray.color}
               strokeWidth="1"
               opacity="0.4"
             />
          ))}

          {/* Object - Only visible if within canvas somewhat */}
          {objectX > -50 && (
             <g transform={`translate(${objectX}, ${OPTICAL_AXIS_Y})`}>
               <line x1="0" y1="-40" x2="0" y2="40" stroke="white" strokeWidth="2" />
               <text x="-10" y="-50" fill="white" fontSize="10">Subject</text>
             </g>
          )}

          {/* Focus Distance Visualization */}
          <g className="transition-opacity duration-300">
            {(() => {
               const measureY = OPTICAL_AXIS_Y + 120;
               const isOffScreen = objectX < 20;
               const startX = isOffScreen ? 20 : objectX;
               const endX = SENSOR_X;
               const textX = Math.min(Math.max((startX + endX) / 2, 100), 700);

               return (
                 <g>
                    <line x1={startX} y1={measureY} x2={endX} y2={measureY} stroke="#10b981" strokeWidth="1" />
                    {isOffScreen && (
                       <path d={`M${startX},${measureY} L${startX+10},${measureY-4} L${startX+10},${measureY+4} Z`} fill="#10b981" />
                    )}
                    <line x1={endX} y1={measureY - 5} x2={endX} y2={measureY + 5} stroke="#10b981" strokeWidth="2" />
                    {!isOffScreen && (
                       <line x1={startX} y1={measureY - 5} x2={startX} y2={measureY + 5} stroke="#10b981" strokeWidth="2" />
                    )}
                    <line x1={endX} y1={OPTICAL_AXIS_Y + 70} x2={endX} y2={measureY} stroke="#10b981" strokeDasharray="2,2" opacity="0.3" />
                    <rect x={textX - 40} y={measureY - 10} width="80" height="20" fill="#020617" rx="4" stroke="#10b981" strokeWidth="1" />
                    <text x={textX} y={measureY + 4} fill="#10b981" fontSize="11" textAnchor="middle" fontFamily="monospace">
                       {focusDistance < 10000 ? `${(focusDistance/1000).toFixed(2)}m` : '∞'}
                    </text>
                 </g>
               );
            })()}
          </g>
        </svg>
      </div>

      {/* Engineering Controls - ENHANCED PANELS */}
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
         
         {/* Main Header */}
         <div className="p-6 pb-2 border-b border-slate-800">
           <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Microscope className="text-cyan-400" size={20}/> 
              实验室 (Lab)
           </h3>
           <div className="mt-4">
              <Select 
                 label="镜头预设 (Lens Preset)"
                 value={selectedLensId}
                 options={Object.keys(LENS_PRESETS).map(k => ({ label: LENS_PRESETS[k as PresetKey].name, value: k }))}
                 onChange={v => setSelectedLensId(v as PresetKey)}
              />
           </div>
           
           {/* MEME Box */}
           <div className="mt-4 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-3 rounded-lg relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-slate-700 opacity-20 transform rotate-12">
                 <Sparkles size={80} />
              </div>
              <div className="text-[10px] font-bold text-cyan-400 mb-1 flex items-center gap-1">
                 <Sparkles size={10} /> 圈内黑话 (Community Insight)
              </div>
              <div className="text-[10px] text-slate-300 leading-relaxed italic">
                 "{currentLens.meme}"
              </div>
           </div>
         </div>

         <div className="p-6 space-y-6">

            {/* Panel 1: Viewfinder */}
            <div className="bg-black rounded-lg border-2 border-slate-700 p-2 relative overflow-hidden aspect-video flex items-center justify-center group shadow-lg">
               <div className="absolute top-2 left-2 text-[10px] text-green-500 font-mono z-10 flex items-center gap-1">
                 <Eye size={10} /> REC [STANDBY]
               </div>
               <div className="absolute bottom-2 right-2 text-[10px] text-white font-mono z-10">
                 {focalLengthEquiv.toFixed(0)}mm
               </div>
               
               {/* Scene */}
               <div 
                  className="w-full h-full relative transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `scale(${1 + zoomPos * 1.5}) scale(${breathingFactor})`, 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
               >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border border-white/50 rounded-full flex items-center justify-center">
                       <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="absolute top-1/4 left-1/4 w-8 h-20 bg-slate-700/50"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-slate-600/50 rounded-full"></div>
               </div>
               
               {/* Aperture Blades Overlay */}
               <div className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-300" style={{opacity: 0.8 - (22 - apertureStop)/22 * 0.8 }}></div>

               <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
            </div>

            {/* Panel 2: Controls */}
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs mb-2">
                     <span className="text-slate-400">变焦 (Zoom)</span>
                     <span className="text-cyan-400 font-mono">{focalLengthEquiv.toFixed(0)}mm</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={zoomPos} 
                    disabled={currentLens.type === 'Prime'}
                    onChange={e => setZoomPos(parseFloat(e.target.value))}
                    className={`w-full h-1 rounded appearance-none ${currentLens.type === 'Prime' ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-700 accent-cyan-500'}`}
                  />
               </div>

               <div>
                  <div className="flex justify-between text-xs mb-2">
                     <span className="text-slate-400">对焦 (Distance)</span>
                     <span className="text-emerald-400 font-mono">{(focusDistance/1000).toFixed(2)}m</span>
                  </div>
                  <input 
                    type="range" min={currentLens.minFocus} max="5000" step="10" 
                    value={focusDistance} 
                    onChange={e => setFocusDistance(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 h-1 bg-slate-700 appearance-none rounded dir-rtl"
                  />
               </div>

               <div>
                  <div className="flex justify-between text-xs mb-2">
                     <span className="text-slate-400">光圈 (Aperture)</span>
                     <span className="text-yellow-500 font-mono">f/{apertureStop.toFixed(1)}</span>
                  </div>
                  <input 
                     type="range" 
                     min={currentLens.minAp} 
                     max={currentLens.maxAp} 
                     step="0.1" 
                     value={apertureStop} 
                     onChange={e => setApertureStop(parseFloat(e.target.value))}
                     className="w-full accent-yellow-500 h-1 bg-slate-700 appearance-none rounded"
                  />
                  {/* Aperture Warning Labels */}
                  <div className="flex justify-between h-4 mt-1">
                     {apertureStop < 2.0 && (
                        <span className="text-[10px] text-pink-400 flex items-center gap-1"><AlertTriangle size={8}/> 刀锐奶化 (Creamy)</span>
                     )}
                     {apertureStop > 16 && (
                        <span className="text-[10px] text-orange-400 flex items-center gap-1 ml-auto"><AlertTriangle size={8}/> 衍射画质崩坏</span>
                     )}
                  </div>
               </div>
            </div>

            {/* Panel 3: DoF Calculator */}
            <div className="bg-slate-800 rounded p-3 border border-slate-700">
               <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2 mb-2">
                  <Calculator size={12} className="text-emerald-400"/> 景深计算器 (DoF Calc)
               </h4>
               <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-900 p-1 rounded">
                     <div className="text-[9px] text-slate-500">前界限</div>
                     <div className="text-[10px] font-mono text-emerald-300">{(dofData.near/1000).toFixed(2)}m</div>
                  </div>
                  <div className="bg-slate-900 p-1 rounded">
                     <div className="text-[9px] text-slate-500">后界限</div>
                     <div className="text-[10px] font-mono text-emerald-300">{dofData.far === Infinity ? '∞' : (dofData.far/1000).toFixed(2) + 'm'}</div>
                  </div>
                  <div className="bg-slate-900 p-1 rounded border border-emerald-900/50">
                     <div className="text-[9px] text-slate-500">总景深</div>
                     <div className="text-[10px] font-mono text-emerald-400 font-bold">{dofData.depth === Infinity ? '∞' : (dofData.depth/1000).toFixed(2) + 'm'}</div>
                  </div>
               </div>
            </div>

            {/* Panel 4: Lens Specs */}
            <div className="bg-slate-800 rounded p-3 border border-slate-700">
               <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2 mb-2">
                  <Layers size={12} className="text-blue-400"/> 镜头参数 (Specs)
               </h4>
               <ul className="text-[10px] space-y-1 text-slate-400">
                  <li className="flex justify-between">
                     <span>别名:</span> <span className="text-cyan-200">{currentLens.nickname}</span>
                  </li>
                  <li className="flex justify-between">
                     <span>结构:</span> <span className="text-slate-200">{currentLens.elements}</span>
                  </li>
                  <li className="flex justify-between">
                     <span>重量:</span> <span className="text-slate-200">{currentLens.weight}</span>
                  </li>
               </ul>
            </div>

            {/* Panel 5: MTF Chart */}
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300">MTF 模拟 (玄学曲线)</span>
                  <span className="text-[9px] text-cyan-400">@ 30 lp/mm</span>
               </div>
               <div className="relative h-12 w-full bg-slate-900 border border-slate-700/50 rounded overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 180 80" preserveAspectRatio="none">
                     <path d={mtfCurve} stroke="#22d3ee" strokeWidth="2" fill="none" />
                     <line x1="0" y1="20" x2="180" y2="20" stroke="#334155" strokeDasharray="2,2" />
                     <line x1="0" y1="40" x2="180" y2="40" stroke="#334155" strokeDasharray="2,2" />
                     <line x1="0" y1="60" x2="180" y2="60" stroke="#334155" strokeDasharray="2,2" />
                  </svg>
               </div>
            </div>

            <Toggle label="显示光路 (Ray Tracing)" checked={showRays} onChange={setShowRays} />
         </div>
      </div>
    </div>
  );
};
