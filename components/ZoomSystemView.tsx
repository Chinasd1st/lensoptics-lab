
import React, { useState, useMemo, useEffect } from 'react';
import { Slider, Toggle, Select } from './Controls';
import { CENTER_X, CENTER_Y, OPTICAL_AXIS_Y, traceRayThroughSystem } from '../utils/optics';
import { OpticalSurface } from '../types';
import { Microscope, Activity, Aperture as ApertureIcon, Maximize2, Scan, Eye, Layers, Calculator, AlertTriangle, Scale, Sparkles, MonitorPlay, Info } from 'lucide-react';

// Lens Preset Definitions (Updated with 2025 New Lenses & Accurate Specs)
const LENS_PRESETS = {
  'ZOOM_F2_STD': {
    name: 'FE 28-70mm F2 GM',
    nickname: '夜之光 (F2标变)',
    type: 'Zoom',
    minF: 28, maxF: 70,
    minAp: 2.0, maxAp: 22,
    elements: '20片/14组 (3XA, 3Super ED)',
    weight: '918g',
    lengthFactor: 1.2, // ~140mm
    minFocus: 380, 
    meme: '恒定光圈 F2.0。婚礼摄影师的终极梦想，暗光环境下无需闪光灯也能获得纯净画质。'
  },
  'ZOOM_STD': {
    name: 'FE 24-70mm F2.8 GM II',
    nickname: '明日之镜 II',
    type: 'Zoom',
    minF: 24, maxF: 70,
    minAp: 2.8, maxAp: 22,
    elements: '15组20枚 (2XA, 3ED)',
    weight: '695g',
    lengthFactor: 1.0, // ~120mm
    minFocus: 210, // 0.21m(W)
    meme: '只有G大师才能打败G大师。画质、体积、对焦的完美平衡。日常/旅游/视频全能王。'
  },
  'ZOOM_WIDE': {
    name: 'FE 16-35mm F2.8 GM II',
    nickname: '广角大三元 II',
    type: 'Zoom',
    minF: 16, maxF: 35,
    minAp: 2.8, maxAp: 22,
    elements: '12组15枚 (3XA, 1ED非)',
    weight: '547g (轻量化)',
    lengthFactor: 0.9, // ~112mm
    minFocus: 220, 
    meme: '风光摄影师的毕业装备。既轻便画质又顶，星空慧差控制极佳。'
  },
  'ZOOM_TELE': {
    name: 'FE 70-200mm F2.8 GM OSS II',
    nickname: '空气切割机 II',
    type: 'Zoom',
    minF: 70, maxF: 200,
    minAp: 2.8, maxAp: 22,
    elements: '14组17枚 (1XA, 1ED非)',
    weight: '1045g',
    lengthFactor: 1.6, // ~200mm
    minFocus: 400, 
    meme: '以前是健身器材，现在是精密仪器。对焦速度快到能抓拍蜂鸟翅膀。'
  },
  'ZOOM_F2_TELE': {
    name: 'FE 50-150mm F2 GM',
    nickname: '人像变焦神镜',
    type: 'Zoom',
    minF: 50, maxF: 150,
    minAp: 2.0, maxAp: 22,
    elements: '旗舰级堆料 (XA/ED)',
    weight: '约1250g',
    lengthFactor: 1.5, // ~180mm
    minFocus: 500,
    meme: '一支镜头干掉 50/85/135 三支定焦。全程 F2 虚化，糖水片制造机。'
  },
  'PRIME_50': {
    name: 'FE 50mm F1.2 GM',
    nickname: '50GM (定焦镜皇)',
    type: 'Prime',
    minF: 50, maxF: 50,
    minAp: 1.2, maxAp: 16,
    elements: '10组14枚 (3XA)',
    weight: '778g',
    lengthFactor: 0.9, // ~108mm
    minFocus: 400, 
    meme: 'F1.2 全开即锐度爆表。梦幻散景与极致解析力的物理极限，这就是"德味"。'
  },
  'MACRO_100': {
    name: 'FE 100mm F2.8 Macro GM',
    nickname: '百微 GM (1.4x)',
    type: 'Prime',
    minF: 100, maxF: 100,
    minAp: 2.8, maxAp: 32,
    elements: '双浮动对焦 (XA/ED)',
    weight: '约730g',
    lengthFactor: 1.1, // ~130mm
    minFocus: 260,
    meme: '1.4x 原生放大倍率。连昆虫复眼的六边形结构都能数得清清楚楚，微观世界的显微镜。'
  }
};

type PresetKey = keyof typeof LENS_PRESETS;

interface ZoomSystemViewProps {
  initialTab?: string;
}

interface VisualOpticalSurface extends OpticalSurface {
   type?: 'XA' | 'ED' | 'APERTURE' | 'STD';
}

export const ZoomSystemView: React.FC<ZoomSystemViewProps> = ({ initialTab }) => {
  // State
  const [selectedLensId, setSelectedLensId] = useState<PresetKey>('ZOOM_F2_STD');
  const [zoomPos, setZoomPos] = useState(0.5); // 0.0 to 1.0
  const [apertureStop, setApertureStop] = useState(2.8);
  const [showRays, setShowRays] = useState(true);
  const [focusDistance, setFocusDistance] = useState(1000); // mm
  const [breathingComp, setBreathingComp] = useState(false);

  const currentLens = LENS_PRESETS[selectedLensId];

  // Visual Scaling Constants
  const PIXELS_PER_MM = 0.6; // Scale factor for visualization
  const SENSOR_X = 750;
  
  // Calculate Front Lens Position based on physical length approximation
  // lengthFactor 1.0 ~= 120mm physical
  const lensPhysicalLength = currentLens.lengthFactor * 120;
  const lensVisualLength = lensPhysicalLength * PIXELS_PER_MM * 3; // Exaggerate slightly for element spacing visibility
  const FRONT_LENS_X = SENSOR_X - lensVisualLength;

  // Reset/Clamp values when lens changes
  useEffect(() => {
    if (apertureStop < currentLens.minAp) setApertureStop(currentLens.minAp);
    if (apertureStop > currentLens.maxAp) setApertureStop(currentLens.maxAp);
    
    if (currentLens.type === 'Prime') setZoomPos(0);

    if (focusDistance < currentLens.minFocus) setFocusDistance(currentLens.minFocus);
  }, [selectedLensId]);

  // Derived Values
  const focalLengthEquiv = currentLens.minF + zoomPos * (currentLens.maxF - currentLens.minF);
  
  // Lens Internal Movement (Cam Simulation)
  const zoomTravel = currentLens.type === 'Prime' ? 0 : 60;
  const g2Pos = FRONT_LENS_X + 40 + zoomPos * zoomTravel; 
  const g3Pos = FRONT_LENS_X + 120 + zoomPos * (zoomTravel * 0.5);
  const apertureX = g3Pos - 15;

  // Focus Breathing Simulation
  const maxBreathing = 0.15; 
  const rawBreathing = (1 - Math.min(focusDistance, 5000) / 5000) * (maxBreathing * (600 / Math.max(focusDistance, 600)));
  const breathingFactor = 1.0 + (breathingComp ? rawBreathing * 0.05 : rawBreathing); 
  
  // Optical Surfaces Generation
  const surfaces: VisualOpticalSurface[] = useMemo(() => {
     return [
        { x: FRONT_LENS_X, f: 150 * currentLens.lengthFactor, h: 45, name: 'XA 前玉', type: 'XA' },
        { x: g2Pos, f: -80, h: 35, name: 'ED 变焦组', type: 'ED' },
        { x: apertureX, f: Infinity, h: (50 / apertureStop) * 10, name: '光圈', type: 'APERTURE' }, 
        { x: g3Pos, f: 120 * currentLens.lengthFactor, h: 40, name: 'XA 对焦组', type: 'XA' },
     ];
  }, [g2Pos, g3Pos, apertureX, apertureStop, currentLens.lengthFactor, FRONT_LENS_X, selectedLensId]);

  // Object Source Position (Scaled)
  // Distance from Sensor in mm
  const objectVisualDist = focusDistance * PIXELS_PER_MM;
  const objectX = SENSOR_X - objectVisualDist;
  
  // Ray Tracing Logic
  const rays = useMemo(() => {
    const result = [];
    const sourcePoints = [
      { y: OPTICAL_AXIS_Y, color: '#10b981' }, // On-axis (Green)
      { y: OPTICAL_AXIS_Y - 40, color: '#3b82f6' }, // Off-axis (Blue)
      { y: OPTICAL_AXIS_Y + 40, color: '#ef4444' }  // Off-axis (Red)
    ];

    for (const pt of sourcePoints) {
      const angles = [-0.12, -0.06, 0, 0.06, 0.12];
      for (const angle of angles) {
         const dx = FRONT_LENS_X - objectX;
         const dy = OPTICAL_AXIS_Y - pt.y;
         const baseAngle = Math.atan2(dy, dx);
         
         // Spread rays to fill aperture
         const spreadFactor = 800 / (focusDistance * currentLens.lengthFactor);
         
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
    // F2.0 is slightly softer than F2.8, but GM is good
    if (apertureStop < 2.8) performance -= (2.8 - apertureStop) * 0.03; 
    if (apertureStop > 16) performance -= (apertureStop - 16) * 0.05; 
    if (currentLens.type === 'Zoom') performance -= Math.abs(zoomPos - 0.5) * 0.02;

    performance = Math.max(0.4, performance);

    const peakY = height - (height * performance);
    const endY = height - (height * (performance * 0.8)); 
    
    return `M 0,${peakY} Q ${width/2},${peakY} ${width},${endY}`;
  }, [apertureStop, zoomPos, currentLens.type]);

  // DoF Calculator Logic
  const calculateDoF = () => {
    const coc = 0.03; 
    const f = focalLengthEquiv;
    const N = apertureStop;
    const d = focusDistance; // mm

    const H = (f * f) / (N * coc) + f;
    const near = (H * d) / (H + (d - f));
    const far = (H * d) / (H - (d - f));
    
    return {
      near: near,
      far: far > 0 ? far : Infinity,
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
             <span>MTF: {(100 - (apertureStop > 8 ? (apertureStop-8)*5 : (4-apertureStop)*5)).toFixed(0)}%</span>
          </div>
          {breathingComp && (
             <div className="flex items-center gap-2 text-purple-400 animate-pulse">
                <MonitorPlay size={14} />
                <span>BREATHING COMP: ON</span>
             </div>
          )}
        </div>

        {/* Ray Legend */}
        <div className="absolute top-24 left-4 z-10 space-y-2 pointer-events-none bg-black/60 p-3 rounded-lg border border-white/10 backdrop-blur-sm shadow-xl">
           <div className="text-[10px] font-bold text-slate-300 mb-1 flex items-center gap-1"><Info size={12}/> 光路图例</div>
           <div className="flex items-center gap-2"><div className="w-8 h-0.5 bg-green-500 shadow-[0_0_5px_lime]"></div><span className="text-[9px] text-green-400">中心成像 (Axial)</span></div>
           <div className="flex items-center gap-2"><div className="w-8 h-0.5 bg-blue-500 shadow-[0_0_5px_blue]"></div><span className="text-[9px] text-blue-400">上边缘 (Upper Marginal)</span></div>
           <div className="flex items-center gap-2"><div className="w-8 h-0.5 bg-red-500 shadow-[0_0_5px_red]"></div><span className="text-[9px] text-red-400">下边缘 (Lower Marginal)</span></div>
           <div className="mt-2 text-[8px] text-slate-500 leading-tight w-32">
              观察红蓝光线在 CMOS 处的汇聚情况可判断边缘画质。
           </div>
        </div>

        {/* Element Legend */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1 items-end pointer-events-none">
           <div className="flex gap-4 text-[10px] text-slate-500 bg-black/50 p-2 rounded border border-slate-800">
              <div className="flex items-center gap-1"><span className="w-3 h-3 border border-orange-500 bg-[url(#pattern-xa)]"></span> XA 极值非球面</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 border border-green-500 bg-[url(#pattern-ed)]"></span> ED 低色散</div>
           </div>
        </div>

        <svg className="w-full h-full" viewBox="0 0 800 500">
          <defs>
             <pattern id="pattern-xa" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
               <line x1="0" y1="0" x2="0" y2="6" stroke="#ea580c" strokeWidth="2" />
             </pattern>
             <pattern id="pattern-ed" patternUnits="userSpaceOnUse" width="6" height="6">
               <line x1="0" y1="0" x2="6" y2="0" stroke="#16a34a" strokeWidth="2" />
             </pattern>
          </defs>

          <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#334155" strokeDasharray="4,4" />

          {/* Sensor Plane */}
          <g transform={`translate(${SENSOR_X}, ${OPTICAL_AXIS_Y})`}>
             <line x1="0" y1="-60" x2="0" y2="60" stroke="#94a3b8" strokeWidth="4" />
             <text x="10" y="0" fill="#64748b" fontSize="10" style={{writingMode: 'vertical-rl'}}>CMOS Full Frame</text>
          </g>

          {/* Lenses */}
          {surfaces.map((surf, i) => (
             surf.type === 'APERTURE' ? (
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
                     fill={surf.type === 'XA' ? 'url(#pattern-xa)' : surf.type === 'ED' ? 'url(#pattern-ed)' : 'rgba(34, 211, 238, 0.15)'}
                     stroke={surf.type === 'XA' ? '#ea580c' : surf.type === 'ED' ? '#16a34a' : (surf.f > 0 ? "#22d3ee" : "#a8a29e")}
                     strokeWidth="1.5"
                   />
                   <text x="-10" y={-surf.h - 10} fill={surf.type === 'XA' ? '#ea580c' : surf.type === 'ED' ? '#16a34a' : '#475569'} fontSize="9" fontWeight="bold">{surf.name}</text>
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

          {/* Object - With visibility check to prevent it being drawn inside lens */}
          {objectX < FRONT_LENS_X - 10 && (
             <g transform={`translate(${objectX}, ${OPTICAL_AXIS_Y})`}>
               <line x1="0" y1="-40" x2="0" y2="40" stroke="white" strokeWidth="2" />
               <text x="-10" y="-50" fill="white" fontSize="10">Subject</text>
               {/* Arrow head */}
               <path d="M0,-40 L-5,-30 L5,-30 Z" fill="white" />
             </g>
          )}

          {/* Focus Distance Visualization */}
          <g className="transition-opacity duration-300">
            {(() => {
               const measureY = OPTICAL_AXIS_Y + 120;
               const startX = objectX < 20 ? 20 : objectX;
               const endX = SENSOR_X;
               const textX = Math.min(Math.max((startX + endX) / 2, 100), 700);

               return (
                 <g>
                    <line x1={startX} y1={measureY} x2={endX} y2={measureY} stroke="#10b981" strokeWidth="1" />
                    <line x1={endX} y1={measureY - 5} x2={endX} y2={measureY + 5} stroke="#10b981" strokeWidth="2" />
                    <line x1={startX} y1={measureY - 5} x2={startX} y2={measureY + 5} stroke="#10b981" strokeWidth="2" />
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

      {/* Engineering Controls */}
      <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto select-none">
         
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
               <div className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-300" style={{opacity: 0.8 - (32 - apertureStop)/32 * 0.8 }}></div>

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
                  <div className="mt-4">
                     <Toggle label="呼吸补偿 (Breathing Comp.)" checked={breathingComp} onChange={setBreathingComp} />
                     <div className="text-[10px] text-slate-500 leading-tight">
                        {breathingComp ? "启用补偿：视角锁定。通过裁切画面边缘，抵消对焦时的物理焦距变化。" : "原生光学：视角随对焦距离改变（呼吸效应）。"}
                     </div>
                  </div>
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
                     step={0.1} 
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
