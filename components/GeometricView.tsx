import React, { useMemo, useState } from 'react';
import { CENTER_X, CENTER_Y, OPTICAL_AXIS_Y, generatePrincipalRays, calculateImageDistance } from '../utils/optics';
import { Slider, Toggle } from './Controls';
import { Settings, Info } from 'lucide-react';

export const GeometricView: React.FC = () => {
  const [focalLength, setFocalLength] = useState(100);
  const [objectDist, setObjectDist] = useState(250); // Positive UI value, converted to negative in math
  const [objectHeight, setObjectHeight] = useState(60);
  const [showVirtual, setShowVirtual] = useState(true);

  // u is negative in our convention
  const u = -objectDist;
  const v = calculateImageDistance(focalLength, u);
  const magnification = v / u;
  const imageHeight = objectHeight * Math.abs(magnification);
  const isVirtual = v < 0;

  const rays = useMemo(() => 
    generatePrincipalRays(focalLength, u, objectHeight), 
  [focalLength, u, objectHeight]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Canvas Area */}
      <div className="flex-1 bg-slate-900 relative border-b lg:border-r border-slate-700 overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur p-2 rounded border border-slate-600">
          <h2 className="text-cyan-400 font-bold flex items-center gap-2">
            <Info size={16} /> 几何光学基础 (Geometric Optics)
          </h2>
          <div className="text-xs text-slate-400 mt-1 space-y-1">
             <p>物距 (u): {objectDist}mm</p>
             <p>像距 (v): {Math.abs(v).toFixed(1)}mm {isVirtual ? '(虚像)' : '(实像)'}</p>
             <p>放大倍率 (m): {magnification.toFixed(2)}x</p>
          </div>
        </div>

        <svg className="w-full h-full" viewBox="0 0 800 500">
          {/* Grid */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Optical Axis */}
          <line x1="0" y1={OPTICAL_AXIS_Y} x2="800" y2={OPTICAL_AXIS_Y} stroke="#475569" strokeDasharray="5,5" />

          {/* Lens */}
          <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
             <path d={`M0,-90 Q20,0 0,90 Q-20,0 0,-90`} fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2" />
             <text x="-5" y="-100" fill="#06b6d4" fontSize="12">L1</text>
             <circle cx="0" cy="0" r="2" fill="#06b6d4" />
          </g>

          {/* Focal Points */}
          <g>
            <circle cx={CENTER_X - focalLength} cy={CENTER_Y} r="3" fill="#F87171" />
            <text x={CENTER_X - focalLength - 5} y={CENTER_Y + 15} fill="#F87171" fontSize="10">F</text>
            <circle cx={CENTER_X + focalLength} cy={CENTER_Y} r="3" fill="#F87171" />
            <text x={CENTER_X + focalLength - 5} y={CENTER_Y + 15} fill="#F87171" fontSize="10">F'</text>
          </g>

          {/* Object */}
          <g>
            <line x1={CENTER_X + u} y1={CENTER_Y} x2={CENTER_X + u} y2={CENTER_Y - objectHeight} stroke="white" strokeWidth="3" />
            <polygon points={`${CENTER_X + u},${CENTER_Y - objectHeight - 5} ${CENTER_X + u - 5},${CENTER_Y - objectHeight + 5} ${CENTER_X + u + 5},${CENTER_Y - objectHeight + 5}`} fill="white" />
            <text x={CENTER_X + u - 10} y={CENTER_Y + 20} fill="white" fontSize="12">物 (Object)</text>
          </g>

          {/* Image */}
          <g opacity={isVirtual && !showVirtual ? 0.2 : 1}>
            <line 
              x1={CENTER_X + v} 
              y1={CENTER_Y} 
              x2={CENTER_X + v} 
              y2={CENTER_Y - (isVirtual ? objectHeight * Math.abs(magnification) : -imageHeight)} 
              stroke={isVirtual ? "#94a3b8" : "#4ade80"} 
              strokeWidth="3" 
              strokeDasharray={isVirtual ? "5,5" : ""}
            />
             {/* Arrowhead */}
            {isVirtual ? (
                 <polygon points={`${CENTER_X + v},${CENTER_Y - imageHeight - 5} ${CENTER_X + v - 5},${CENTER_Y - imageHeight + 5} ${CENTER_X + v + 5},${CENTER_Y - imageHeight + 5}`} fill="#94a3b8" />
            ) : (
                 <polygon points={`${CENTER_X + v},${CENTER_Y + imageHeight + 5} ${CENTER_X + v - 5},${CENTER_Y + imageHeight - 5} ${CENTER_X + v + 5},${CENTER_Y + imageHeight - 5}`} fill="#4ade80" />
            )}
            <text x={CENTER_X + v - 10} y={CENTER_Y + 20} fill={isVirtual ? "#94a3b8" : "#4ade80"} fontSize="12">
               {isVirtual ? "虚像 (Virtual Image)" : "实像 (Real Image)"}
            </text>
          </g>

          {/* Rays */}
          {rays.map((ray, i) => (
             <React.Fragment key={i}>
                <line 
                  x1={ray.x1} y1={ray.y1} 
                  x2={ray.x2} y2={ray.y2} 
                  stroke={ray.color} 
                  strokeWidth="1.5" 
                  opacity="0.8" 
                />
                {/* Virtual Ray Extensions if needed for virtual image */}
                {isVirtual && ray.x2 > CENTER_X && (
                   <line 
                    x1={CENTER_X} 
                    y1={ray.x1 === CENTER_X ? ray.y1 : CENTER_Y - objectHeight} // simplified back tracing visual
                    x2={CENTER_X + v} 
                    y2={CENTER_Y - imageHeight}
                    stroke={ray.color}
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.4"
                   />
                )}
             </React.Fragment>
          ))}

        </svg>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Settings className="text-cyan-400" /> 参数控制
        </h3>
        
        <Slider 
          label="焦距 (Focal Length)" 
          value={focalLength} 
          min={50} max={200} 
          onChange={setFocalLength} 
          unit="mm"
        />
        
        <Slider 
          label="物距 (Object Dist)" 
          value={objectDist} 
          min={50} max={400} 
          onChange={setObjectDist} 
          unit="mm"
        />

        <Slider 
          label="物体高度 (Height)" 
          value={objectHeight} 
          min={20} max={100} 
          onChange={setObjectHeight} 
          unit="mm"
        />

        <Toggle 
          label="显示虚像辅助线" 
          checked={showVirtual} 
          onChange={setShowVirtual} 
        />

        <div className="mt-8 p-4 bg-slate-700/50 rounded-lg text-sm text-slate-300">
          <h4 className="font-bold text-cyan-400 mb-2">教学提示</h4>
          <ul className="list-disc pl-4 space-y-1">
            <li>当 <strong>物距 &lt; 焦距</strong> 时，形成正立放大的虚像（放大镜原理）。</li>
            <li>当 <strong>物距 &gt; 2倍焦距</strong> 时，形成倒立缩小的实像（照相机原理）。</li>
            <li>三条特殊光线帮助定位像的位置。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};