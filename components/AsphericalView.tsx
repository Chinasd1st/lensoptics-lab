import React, { useMemo, useState } from 'react';
import { CENTER_X, CENTER_Y, OPTICAL_AXIS_Y, calculateSphericalAberration } from '../utils/optics';
import { Toggle, Slider } from './Controls';
import { Aperture } from 'lucide-react';

export const AsphericalView: React.FC = () => {
  const [isAspherical, setIsAspherical] = useState(false);
  const [lensRadius, setLensRadius] = useState(100);

  const focalLength = 180;
  const { rays, focalPoints } = useMemo(() => 
    calculateSphericalAberration(isAspherical, lensRadius, focalLength), 
  [isAspherical, lensRadius, focalLength]);

  // Calculate confusion circle (simplistic metric)
  const spread = Math.max(...focalPoints) - Math.min(...focalPoints);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 bg-slate-900 relative border-b lg:border-r border-slate-700 overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur p-2 rounded border border-slate-600">
          <h2 className={`font-bold flex items-center gap-2 ${isAspherical ? 'text-emerald-400' : 'text-pink-400'}`}>
            <Aperture size={16} /> 
            {isAspherical ? '非球面镜片 (Aspherical)' : '球面镜片 (Spherical)'}
          </h2>
          <div className="text-xs text-slate-400 mt-1">
             球差扩散范围: <span className="font-mono text-white">{isAspherical ? '0.0 (完美汇聚)' : spread.toFixed(1) + ' (模糊)'}</span>
          </div>
        </div>

        <svg className="w-full h-full" viewBox="0 0 800 500">
           {/* Axis */}
          <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#475569" strokeDasharray="5,5" />

          {/* Lens Body */}
          <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
            {/* Draw exaggerated spherical vs aspherical shape */}
            <path 
              d={`M0,-${lensRadius} 
                  Q${isAspherical ? 25 : 40},0 0,${lensRadius} 
                  Q${isAspherical ? -25 : -40},0 0,-${lensRadius}`} 
              fill={isAspherical ? "rgba(52, 211, 153, 0.1)" : "rgba(244, 114, 182, 0.1)"} 
              stroke={isAspherical ? "#34D399" : "#F472B6"} 
              strokeWidth="2" 
            />
            {isAspherical && (
               <path d="M15,-90 L25,-80 M-15,-90 L-25,-80" stroke="#34D399" strokeWidth="1" opacity="0.5" />
            )}
          </g>

          {/* Rays */}
          {rays.map((ray, i) => (
             <path
                key={i}
                d={`M${ray.x1},${ray.y1} L${ray.x2},${ray.y2}`}
                stroke={ray.color}
                strokeWidth={1}
                fill="none"
                opacity={0.6}
             />
          ))}

          {/* Focal Plane Indicator */}
          <line 
            x1={CENTER_X + focalLength} y1={CENTER_Y - 50} 
            x2={CENTER_X + focalLength} y2={CENTER_Y + 50}
            stroke="white"
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity="0.3"
          />
          <text x={CENTER_X + focalLength} y={CENTER_Y + 65} fill="white" fontSize="10" textAnchor="middle">理想焦平面</text>
          
          {/* Zoom view for focus point */}
          {!isAspherical && (
             <circle cx={CENTER_X + focalLength} cy={CENTER_Y} r={spread/2} fill="none" stroke="red" strokeWidth="1" opacity="0.3">
               <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
             </circle>
          )}

        </svg>
      </div>

      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6">球差校正原理</h3>
        
        <Toggle 
          label="启用非球面 (Aspherical)" 
          checked={isAspherical} 
          onChange={setIsAspherical} 
        />

        <Slider 
          label="镜片口径 (Aperture)" 
          value={lensRadius} 
          min={50} max={140} 
          onChange={setLensRadius} 
        />

        <div className="mt-8 space-y-4">
           <div className="bg-slate-900 p-3 rounded border border-slate-700">
              <h4 className="text-pink-400 font-bold text-sm mb-1">球面镜片 (Spherical)</h4>
              <p className="text-xs text-slate-400">
                边缘光线折射过强，汇聚点比中心光线更靠前。导致大光圈拍摄时画面柔光、锐度下降（球差）。
              </p>
           </div>
           <div className="bg-slate-900 p-3 rounded border border-slate-700">
              <h4 className="text-emerald-400 font-bold text-sm mb-1">非球面镜片 (Aspherical)</h4>
              <p className="text-xs text-slate-400">
                通过改变镜片边缘曲率（使其更平坦），让边缘光线与中心光线汇聚于同一点。现代高素质镜头的核心技术。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};