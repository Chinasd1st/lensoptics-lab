
import React, { useState } from 'react';
import { Toggle } from './Controls';
import { Aperture, XCircle, CheckCircle, Scan, Info } from 'lucide-react';

export const AsphericalView: React.FC = () => {
  const [isAspherical, setIsAspherical] = useState(false);

  // Constants
  const FOCAL_LENGTH = 300;
  const LENS_HEIGHT = 180;
  const CENTER_X = 150;
  const CENTER_Y = 250;
  const OPTICAL_AXIS_Y = 250;
  const SENSOR_X = CENTER_X + FOCAL_LENGTH; // 450

  // Ray Calculation
  const numRays = 11; // More rays for better density
  const rays = [];
  const spotDiagramPoints = []; // For the micro focus view

  for (let i = 0; i < numRays; i++) {
    const t = i / (numRays - 1); // 0 to 1
    const yOffset = (t - 0.5) * LENS_HEIGHT * 0.9;
    
    // Normalized height from center (0 to 1)
    const hNorm = Math.abs(yOffset) / (LENS_HEIGHT / 2);
    
    const isMarginal = hNorm > 0.6;
    const isAxial = hNorm < 0.1;

    // Calculate Focus Point X
    // Spherical Lens: Marginal rays focus closer (Undercorrected Spherical Aberration)
    // Aspherical Lens: All rays focus at FOCAL_LENGTH
    let focusX = SENSOR_X;
    
    if (!isAspherical) {
       // Aberration increases with h^2 approx
       const aberrationAmount = Math.pow(hNorm, 2) * 80; // 80px shift at max height
       focusX -= aberrationAmount;
    }

    // Ray path: Start -> Lens -> Focus Point -> Sensor Plane
    // At Sensor X, we need to calculate the Y height of the ray.
    // Slope = (0 - yOffset) / (focusX - CENTER_X)
    // y = yOffset + slope * (x - CENTER_X)
    // At x = SENSOR_X:
    const slope = -yOffset / (focusX - CENTER_X);
    const yAtSensor = yOffset + slope * (SENSOR_X - CENTER_X);

    rays.push({
       yStart: CENTER_Y + yOffset,
       yLens: CENTER_Y + yOffset,
       focusX: focusX,
       ySensor: CENTER_Y + yAtSensor,
       isMarginal,
       color: isAspherical ? '#10b981' : (isMarginal ? '#ef4444' : (isAxial ? '#10b981' : '#3b82f6')) 
    });

    spotDiagramPoints.push({
        y: yAtSensor, // Relative to center
        color: isAspherical ? '#10b981' : (isMarginal ? '#ef4444' : '#3b82f6')
    });
  }

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Canvas */}
      <div className="flex-1 bg-slate-950 relative border-b lg:border-r border-slate-800 overflow-hidden flex flex-col">
        
        {/* Top HUD */}
        <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-none">
           <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-md shadow-xl ${isAspherical ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-400' : 'bg-red-900/40 border-red-500/50 text-red-400'}`}>
              {isAspherical ? <CheckCircle size={18}/> : <XCircle size={18}/>}
              <span className="font-bold text-sm">{isAspherical ? '非球面 (Aspherical)' : '球面 (Spherical)'}</span>
           </div>
        </div>

        {/* Spot Diagram HUD (Replacing the bottom panel) */}
        <div className="absolute bottom-4 right-4 z-10 bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-2xl w-48 backdrop-blur-md">
            <div className="text-[10px] font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Scan size={12} className="text-cyan-400"/> 焦点成像模拟 (Spot)
            </div>
            <div className="w-full aspect-square bg-black border border-slate-800 rounded-lg relative flex items-center justify-center overflow-hidden">
                {/* Crosshair */}
                <div className="absolute w-full h-px bg-slate-800"></div>
                <div className="absolute h-full w-px bg-slate-800"></div>
                
                {/* Airy Disk Reference (faint) */}
                <div className="w-2 h-2 bg-white/5 rounded-full absolute"></div>

                {/* Spots */}
                {spotDiagramPoints.map((pt, i) => (
                    <div 
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_4px_currentColor]"
                        style={{
                            backgroundColor: pt.color,
                            transform: `translate(0px, ${pt.y}px)`, // 1D distribution since it's a 2D ray trace
                            opacity: 0.8
                        }}
                    ></div>
                ))}
            </div>
            <div className="text-[10px] text-center mt-2 text-slate-500">
                {isAspherical ? <span className="text-emerald-400">锐利实点 (Sharp)</span> : <span className="text-red-400">弥散圆 (Blurry)</span>}
            </div>
        </div>

        {/* Main SVG */}
        <div className="flex-1 relative">
           <svg className="w-full h-full" viewBox="0 0 800 500">
              <defs>
                 {/* XA Pattern (Orange Hatched) */}
                 <pattern id="pattern-xa" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                   <line x1="0" y1="0" x2="0" y2="6" stroke="#ea580c" strokeWidth="2" />
                 </pattern>
                 {/* Standard Glass Pattern (Blueish) */}
                 <pattern id="pattern-glass" patternUnits="userSpaceOnUse" width="6" height="6">
                   <rect width="6" height="6" fill="#1e293b" fillOpacity="0.5"/>
                   <circle cx="3" cy="3" r="1" fill="#3b82f6" fillOpacity="0.2"/>
                 </pattern>
                 <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                 </filter>
              </defs>

              {/* Optical Axis */}
              <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#334155" strokeDasharray="5,5" />

              {/* Sensor Plane */}
              <g transform={`translate(${SENSOR_X}, ${CENTER_Y})`}>
                 <line x1="0" y1="-80" x2="0" y2="80" stroke="#94a3b8" strokeWidth="3" />
                 <text x="10" y="0" fill="#64748b" fontSize="10" style={{writingMode: 'vertical-rl'}}>CMOS Sensor</text>
              </g>

              {/* Lens Element */}
              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                 {/* Lens Shape */}
                 {isAspherical ? (
                    // XA Lens
                    <path 
                       d={`M -15,-${LENS_HEIGHT/2} 
                           C 25,-${LENS_HEIGHT/4} 25,${LENS_HEIGHT/4} -15,${LENS_HEIGHT/2} 
                           C -45,${LENS_HEIGHT/4} -45,-${LENS_HEIGHT/4} -15,-${LENS_HEIGHT/2}`}
                       fill="url(#pattern-xa)" 
                       stroke="#ea580c" 
                       strokeWidth="2"
                    />
                 ) : (
                    // Spherical Lens
                    <path 
                       d={`M -15,-${LENS_HEIGHT/2} 
                           Q 35,0 -15,${LENS_HEIGHT/2} 
                           Q -65,0 -15,-${LENS_HEIGHT/2}`}
                       fill="url(#pattern-glass)" 
                       stroke="#3b82f6" 
                       strokeWidth="2"
                    />
                 )}
                 {/* Label */}
                 <text x="-15" y={-LENS_HEIGHT/2 - 15} fill={isAspherical ? "#ea580c" : "#3b82f6"} fontSize="12" fontWeight="bold">
                    {isAspherical ? 'XA Element (Extreme Aspherical)' : 'Spherical Element'}
                 </text>
              </g>

              {/* Light Rays */}
              {rays.map((ray, i) => (
                 <g key={i}>
                    {/* Incoming */}
                    <line 
                       x1="0" y1={ray.yStart} 
                       x2={CENTER_X - 10} y2={ray.yLens} 
                       stroke={ray.color} 
                       strokeWidth={1} 
                       opacity="0.5"
                    />
                    {/* Outgoing to Focus Point then to Sensor */}
                    <polyline
                       points={`${CENTER_X + 10},${ray.yLens} ${ray.focusX},${OPTICAL_AXIS_Y} ${SENSOR_X},${ray.ySensor}`}
                       stroke={ray.color}
                       strokeWidth={1.5}
                       opacity="0.8"
                       fill="none"
                    />
                    {/* Convergence Dot at Crossover */}
                    <circle cx={ray.focusX} cy={OPTICAL_AXIS_Y} r="1.5" fill={ray.color} opacity="0.6" />
                 </g>
              ))}

           </svg>
        </div>
      </div>

      {/* Right Control Panel */}
      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
           <Aperture size={20} className="text-orange-400"/> 球差原理
        </h3>
        
        <Toggle 
          label="启用非球面镜片 (ASP)" 
          checked={isAspherical} 
          onChange={setIsAspherical} 
        />

        <div className="mt-8 space-y-6">
           <div className={`p-4 rounded-lg border transition-colors ${!isAspherical ? 'bg-red-900/20 border-red-500/50' : 'bg-slate-900 border-slate-700 opacity-50'}`}>
              <h4 className="text-sm font-bold text-red-300 mb-2 flex items-center gap-2"><XCircle size={14}/> 球面透镜 (Spherical)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                 光线通过透镜边缘时，折射角度过大，导致边缘光线比中心光线<strong className="text-white">汇聚得更早</strong>。
                 <br/><br/>
                 焦点无法重合，在传感器上形成弥散圆（雾状光晕）。这就是为什么大光圈镜头容易“肉”（锐度低）。
              </p>
           </div>

           <div className={`p-4 rounded-lg border transition-colors ${isAspherical ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-900 border-slate-700 opacity-50'}`}>
              <h4 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2"><CheckCircle size={14}/> 非球面透镜 (Aspherical)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                 通过改变镜片表面的曲率（边缘变平），强行修正边缘光线的折射角度。
                 <br/><br/>
                 所有光线汇聚于同一点。全开光圈也能获得极高的锐度。
              </p>
           </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-700 text-[10px] text-slate-500">
           <div className="flex items-center gap-2 mb-2">
              <Info size={12} className="text-orange-400"/>
              <strong className="text-slate-400">Sony GM 技术注记：</strong>
           </div>
           索尼的 <span className="text-orange-400">XA (Extreme Aspherical)</span> 镜片表面研磨精度高达 0.01 微米。不仅修正球差，还消除了传统非球面镜片研磨痕迹导致的“洋葱圈”焦外，实现了锐度与柔美散景的统一。
        </div>
      </div>
    </div>
  );
};
