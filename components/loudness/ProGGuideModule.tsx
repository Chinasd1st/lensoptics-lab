
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Info, Activity, Box, Mic, Settings2 } from 'lucide-react';

type ParamKey = 'VISUALIZER' | 'THRESHOLD' | 'RANGE' | 'ATTACK' | 'RELEASE' | 'HOLD';

// High-performance Ring Buffer
class RingBuffer {
   buffer: Float32Array;
   head: number;
   size: number;

   constructor(size: number) {
      this.size = size;
      this.buffer = new Float32Array(size).fill(-90);
      this.head = 0;
   }

   push(val: number) {
      this.buffer[this.head] = val;
      this.head = (this.head + 1) % this.size;
   }

   // Get values from newest to oldest
   getAll(): Float32Array {
      // For visualization, we might want a linear array. 
      // Efficiently constructing it:
      const res = new Float32Array(this.size);
      // Copy from head to end -> res start
      // Copy from 0 to head -> res end
      // Actually for a scrolling view (left=old, right=new), we want:
      // [oldest ... newest]
      // The oldest item is at `head` (since we just overwrote it, head is now pointing to the next slot to write, which contains the oldest data)
      
      const part1 = this.buffer.subarray(this.head); // head to end
      const part2 = this.buffer.subarray(0, this.head); // 0 to head
      
      res.set(part1, 0);
      res.set(part2, part1.length);
      return res;
   }
}

export const ProGGuideModule: React.FC = () => {
   const [activeParam, setActiveParam] = useState<ParamKey>('VISUALIZER');
   
   // UI State
   const [threshold, setThreshold] = useState(-30);
   const [range, setRange] = useState(-60);
   const [attack, setAttack] = useState(5);
   const [release, setRelease] = useState(300);
   const [hold, setHold] = useState(50);
   const [signalType, setSignalType] = useState<'DRUMS' | 'VOCAL'>('DRUMS');

   // Refs for Render Loop (Avoid React State in loop)
   const paramsRef = useRef({ threshold, range, attack, release, hold, signalType });
   useEffect(() => { paramsRef.current = { threshold, range, attack, release, hold, signalType }; }, [threshold, range, attack, release, hold, signalType]);

   const canvasRef = useRef<HTMLCanvasElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const animationRef = useRef<number | null>(null);
   
   // DSP State (Persistent across renders)
   const BUFFER_SIZE = 512;
   const dsp = useRef({
      inputRb: new RingBuffer(BUFFER_SIZE),
      outputRb: new RingBuffer(BUFFER_SIZE),
      grRb: new RingBuffer(BUFFER_SIZE),
      gateState: 'CLOSED' as 'OPEN' | 'HOLD' | 'RELEASE' | 'CLOSED',
      currentGain: -60, // Start fully attenuated
      holdCounterTime: 0, // In seconds
      lastTime: 0,
      totalTime: 0
   });

   const definitions: Record<ParamKey, { title: string; subtitle: string; desc: string; tip: string; color: string }> = {
      VISUALIZER: {
         title: "Real-time Display",
         subtitle: "可视化面板",
         desc: "深色实心波形为输入信号(Input)，绿色线条为输出信号(Output)。顶部的红色曲线代表增益衰减(Gain Reduction)。",
         tip: "红线向下掉落表示门正在关闭（压低底噪）；红线回到顶部表示门完全打开（信号通过）。",
         color: "text-blue-300"
      },
      THRESHOLD: {
         title: "Threshold",
         subtitle: "阈值 / 门限",
         desc: "噪声门工作的“及格线”。信号必须超过此线才能把门“撞开”。",
         tip: "调节技巧：找到底噪的最高点，将阈值设在底噪之上约 3-6dB 处。设太高会吃掉有用信号，设太低关不住噪音。",
         color: "text-cyan-400"
      },
      RANGE: {
         title: "Range / Floor",
         subtitle: "衰减深度",
         desc: "门关上时，要把声音压低多少？-80dB 是完全静音（硬闸门），-10dB 只是让背景音变轻（软扩展）。",
         tip: "人声处理建议设为 -15dB ~ -25dB，保留一点环境声会听起来更自然，不会有那种真空般的窒息感。",
         color: "text-indigo-400"
      },
      ATTACK: {
         title: "Attack",
         subtitle: "启动时间 (开门)",
         desc: "当信号超过阈值，门完全打开需要多久？",
         tip: "打击乐和人声字头需要极快 Attack (<10ms)，否则瞬态会被切掉，声音变软。环境音效可以稍慢。",
         color: "text-emerald-400"
      },
      RELEASE: {
         title: "Release",
         subtitle: "释放时间 (关门)",
         desc: "信号低于阈值后，门完全关闭需要多久？",
         tip: "最关键参数。太快会造成声音“抽搐”(Chatter)，太慢会将尾音后的底噪放进来。通常在 100ms - 500ms。",
         color: "text-yellow-400"
      },
      HOLD: {
         title: "Hold",
         subtitle: "保持时间",
         desc: "信号跌落阈值后，强行保持开门状态的时间。",
         tip: "防抽搐神器。对于军鼓或句间呼吸，加 50-100ms Hold 可以防止门误判关闭，保证尾音完整。",
         color: "text-orange-400"
      }
   };

   const current = definitions[activeParam];

   // --- Signal Generator ---
   const getSample = (tSec: number, type: 'DRUMS' | 'VOCAL') => {
      let noise = -60 + (Math.random() * 6); // Noise floor around -60dB to -54dB
      let signal = -90;

      if (type === 'DRUMS') {
         // 120 BPM = 0.5s per beat
         const loop = tSec % 2.0; // 2 second loop
         // Kick at 0.0, 1.0
         if ((loop >= 0 && loop < 0.2) || (loop >= 1.0 && loop < 1.2)) {
            const localT = (loop % 1.0) * 5; // 0..1 in 0.2s
            signal = -6 + (Math.log10(1 - localT) * 20);
         }
         // Snare at 0.5, 1.5
         else if ((loop >= 0.5 && loop < 0.8) || (loop >= 1.5 && loop < 1.8)) {
            const localT = ((loop - 0.5) % 1.0) * 3.33; 
            signal = -8 + (Math.log10(1 - localT) * 20);
            noise += (Math.random() * 12) * (1 - localT); // Snare wire noise
         }
      } else {
         // Vocal: "Check... One... Two..."
         const loop = tSec % 3.0;
         if ((loop > 0.2 && loop < 0.6) || (loop > 1.2 && loop < 1.5) || (loop > 2.0 && loop < 2.5)) {
            const mod = Math.sin(tSec * 20) * 3; // Voice modulation
            signal = -12 + mod;
         } else if (loop > 1.8 && loop < 1.9) {
            signal = -45; // Breath
         }
      }
      return Math.max(noise, signal);
   };

   // --- Main Loop ---
   useEffect(() => {
      const canvas = canvasRef.current;
      const container = wrapperRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext('2d', { alpha: false }); // Optimize
      if (!ctx) return;

      // Handle Resize with ResizeObserver
      const resizeObserver = new ResizeObserver(() => {
         const dpr = window.devicePixelRatio || 1;
         const rect = container.getBoundingClientRect();
         canvas.width = rect.width * dpr;
         canvas.height = rect.height * dpr;
      });
      resizeObserver.observe(container);

      const loop = (timestamp: number) => {
         const state = dsp.current;
         const p = paramsRef.current;

         // Time management
         if (state.lastTime === 0) state.lastTime = timestamp;
         let dt = (timestamp - state.lastTime) / 1000;
         if (dt > 0.1) dt = 0.016; // Cap dt to prevent huge jumps on tab switch
         state.lastTime = timestamp;
         state.totalTime += dt;

         const w = canvas.width;
         const h = canvas.height;
         const dpr = window.devicePixelRatio || 1;

         // 1. Process Audio Sample
         const inputDb = getSample(state.totalTime, p.signalType);
         
         // 2. Gate DSP (Time-based, not frame-based)
         // Hysteresis: Open at Threshold, Close at Threshold - 2dB
         const hysteresis = 2; 
         const openThresh = p.threshold;
         const closeThresh = p.threshold - hysteresis;

         if (inputDb > openThresh) {
            state.gateState = 'OPEN';
            state.holdCounterTime = p.hold / 1000; // Reset hold time
         } else if (inputDb < closeThresh && state.gateState === 'OPEN') {
            state.gateState = 'HOLD';
         }

         // State transitions
         if (state.gateState === 'HOLD') {
            state.holdCounterTime -= dt;
            if (state.holdCounterTime <= 0) {
               state.gateState = 'RELEASE';
            }
         }

         // Target Gain Calculation
         let targetGain = 0; // 0dB attenuation
         if (state.gateState === 'RELEASE' || state.gateState === 'CLOSED') {
            targetGain = p.range;
         }

         // Envelope Follower (Ballistics)
         // alpha = 1 - exp( -dt / (time_ms / 1000) )
         // Using a very small epsilon to avoid division by zero
         const attT = Math.max(0.001, p.attack / 1000);
         const relT = Math.max(0.001, p.release / 1000);
         
         const attCoeff = 1 - Math.exp(-dt / attT);
         const relCoeff = 1 - Math.exp(-dt / relT);

         if (targetGain < state.currentGain) {
            // Closing (Gain going down) -> Release phase logic
            // Note: Gate "Attack" usually means opening (Gain goes UP to 0). Gate "Release" means closing (Gain goes DOWN to range).
            // Logic: Current -60, Target 0 -> Gain Increasing -> Opening -> Attack Time.
            // Logic: Current 0, Target -60 -> Gain Decreasing -> Closing -> Release Time.
            state.currentGain += (targetGain - state.currentGain) * relCoeff;
         } else {
            // Opening
            state.currentGain += (targetGain - state.currentGain) * attCoeff;
         }

         // Clamp
         if (state.currentGain < p.range) state.currentGain = p.range;
         if (state.currentGain > 0) state.currentGain = 0;

         const outputDb = inputDb + state.currentGain;

         // 3. Store Data
         state.inputRb.push(inputDb);
         state.outputRb.push(outputDb);
         state.grRb.push(state.currentGain);

         // 4. Render
         ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
         ctx.fillStyle = '#0f172a'; // Slate 900 bg
         ctx.fillRect(0, 0, w, h);
         
         // Setup Scale
         ctx.scale(dpr, dpr);
         const logicalW = w / dpr;
         const logicalH = h / dpr;

         // Helpers
         const dbToY = (db: number) => {
            // 0dB -> 10% from top
            // -90dB -> 90% from top
            return (logicalH * 0.1) + ((db) / -90) * (logicalH * 0.8);
         };

         // Draw Grid
         ctx.lineWidth = 1;
         ctx.strokeStyle = '#334155';
         ctx.beginPath();
         [-20, -40, -60, -80].forEach(db => {
            const y = dbToY(db);
            ctx.moveTo(0, y);
            ctx.lineTo(logicalW, y);
            ctx.fillStyle = '#64748b';
            ctx.font = '10px monospace';
            ctx.fillText(`${db}`, 4, y - 2);
         });
         ctx.stroke();

         // Draw Threshold Line
         const thY = dbToY(p.threshold);
         ctx.strokeStyle = '#22d3ee';
         ctx.lineWidth = 1.5;
         ctx.setLineDash([4, 4]);
         ctx.beginPath();
         ctx.moveTo(0, thY);
         ctx.lineTo(logicalW, thY);
         ctx.stroke();
         ctx.setLineDash([]);
         ctx.fillStyle = '#22d3ee';
         ctx.fillText('THR', logicalW - 25, thY - 4);

         const inputData = state.inputRb.getAll();
         const outputData = state.outputRb.getAll();
         const grData = state.grRb.getAll();
         const len = inputData.length;
         const stepX = logicalW / len;

         // Draw Input (Filled)
         ctx.fillStyle = '#1e293b'; // Slate 800
         ctx.beginPath();
         ctx.moveTo(0, logicalH);
         for(let i=0; i<len; i++) {
            ctx.lineTo(i * stepX, dbToY(inputData[i]));
         }
         ctx.lineTo(logicalW, logicalH);
         ctx.fill();

         // Draw Output (Line)
         ctx.strokeStyle = '#4ade80'; // Green
         ctx.lineWidth = 2;
         ctx.beginPath();
         for(let i=0; i<len; i++) {
            const x = i * stepX;
            const y = dbToY(outputData[i]);
            if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         ctx.stroke();

         // Draw Gain Reduction (Red Overlay from Top)
         // GR 0dB -> Top edge. GR -10dB -> Drop down.
         // Mapping: 0dB GR = logicalH * 0.1 (Top of graph area)
         const topLimit = logicalH * 0.1;
         ctx.strokeStyle = '#ef4444';
         ctx.lineWidth = 2;
         ctx.beginPath();
         for(let i=0; i<len; i++) {
            const gr = grData[i]; // 0 to -inf
            // visual scale: drop 1px per dB (exaggerated for visibility) or map to graph
            const y = topLimit + Math.abs(gr) * ((logicalH * 0.8) / 90);
            const x = i * stepX;
            if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         ctx.stroke();

         animationRef.current = requestAnimationFrame(loop);
      };

      animationRef.current = requestAnimationFrame(loop);
      return () => {
         resizeObserver.disconnect();
         if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
   }, []); // Ref dependency handled internally

   return (
      <div className="h-full flex flex-col lg:flex-row gap-6 p-4">
         {/* Left: Interactive Visualizer */}
         <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-6 select-none relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-4">
                  <div className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">Pro-G Simulator (Time-based DSP)</div>
                  <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
                     <button onClick={() => setSignalType('DRUMS')} className={`px-2 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${signalType==='DRUMS' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                        <Settings2 size={10}/> Drums
                     </button>
                     <button onClick={() => setSignalType('VOCAL')} className={`px-2 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${signalType==='VOCAL' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                        <Mic size={10}/> Vocal
                     </button>
                  </div>
               </div>
               
               <div className="flex gap-4 text-[9px]">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-700 rounded-full"></div><span className="text-slate-500">Input</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-400 rounded-full"></div><span className="text-slate-500">Output</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-slate-500">Reduction</span></div>
               </div>
            </div>

            {/* Canvas Container */}
            <div 
               ref={wrapperRef}
               className="flex-1 w-full bg-[#111] rounded-lg border border-slate-700 relative overflow-hidden shadow-inner"
               onMouseEnter={() => setActiveParam('VISUALIZER')}
            >
               <canvas ref={canvasRef} className="block w-full h-full" />
            </div>

            {/* Pro Knobs */}
            <div className="mt-6 h-32 bg-[#1a1a1a] rounded-xl border border-[#333] px-6 py-4 flex items-center justify-between gap-2 lg:gap-6">
               <ProKnob label="Threshold" value={threshold} min={-60} max={0} step={0.5} unit="dB" onChange={setThreshold} color="#22d3ee" onFocus={() => setActiveParam('THRESHOLD')} />
               <ProKnob label="Range" value={range} min={-80} max={0} step={1} unit="dB" onChange={setRange} color="#818cf8" onFocus={() => setActiveParam('RANGE')} />
               
               <div className="w-px h-12 bg-[#333]"></div>
               
               <ProKnob label="Attack" value={attack} min={0} max={100} step={1} unit="ms" onChange={setAttack} color="#34d399" onFocus={() => setActiveParam('ATTACK')} />
               <ProKnob label="Release" value={release} min={10} max={1000} step={10} unit="ms" onChange={setRelease} color="#facc15" onFocus={() => setActiveParam('RELEASE')} />
               <ProKnob label="Hold" value={hold} min={0} max={500} step={10} unit="ms" onChange={setHold} color="#fb923c" onFocus={() => setActiveParam('HOLD')} />
            </div>
         </div>

         {/* Right: Info Panel */}
         <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col p-6 lg:p-8 rounded-2xl shadow-xl transition-colors duration-300 border-t lg:border-t-0">
            <div className="flex-1 flex flex-col justify-center">
               <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold w-fit mb-6 bg-slate-800 border ${current.color.replace('text-', 'border-')}`}>
                  {activeParam === 'VISUALIZER' ? <Box size={14} className={current.color} /> : <Activity size={14} className={current.color} />}
                  <span className={current.color}>{current.subtitle}</span>
               </div>
               
               <h2 className="text-3xl font-bold text-white mb-2">{current.title}</h2>
               <div className={`h-1 w-20 rounded mb-6 ${current.color.replace('text-', 'bg-')}`}></div>
               
               <p className="text-sm text-slate-300 leading-7 mb-8 text-justify">
                  {current.desc}
               </p>

               <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                     <Info size={14} className="text-yellow-400"/> 混音师笔记
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     {current.tip}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Improved Pro Audio Knob (SVG) ---
interface ProKnobProps {
   label: string;
   value: number;
   min: number;
   max: number;
   step: number;
   unit: string;
   color: string;
   onChange: (val: number) => void;
   onFocus: () => void;
}

const ProKnob: React.FC<ProKnobProps> = ({ label, value, min, max, step, unit, color, onChange, onFocus }) => {
   const [isDragging, setIsDragging] = useState(false);
   const startYRef = useRef(0);
   const startValRef = useRef(0);

   // Mouse interactions
   const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      startYRef.current = e.clientY;
      startValRef.current = value;
      onFocus();
      document.body.style.cursor = 'ns-resize';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
   };

   const handleMouseMove = useCallback((e: MouseEvent) => {
      const deltaY = startYRef.current - e.clientY;
      const range = max - min;
      const pixelRange = 200; // Sensitivity: 200px drag = full range
      
      // Shift for fine tuning
      const speed = e.shiftKey ? 0.1 : 1.0;
      
      const deltaVal = (deltaY / pixelRange) * range * speed;
      
      let newVal = startValRef.current + deltaVal;
      // Snap
      if (step > 0) {
         newVal = Math.round(newVal / step) * step;
      }
      newVal = Math.max(min, Math.min(max, newVal));
      
      // Fix float precision
      onChange(Number(newVal.toFixed(step < 1 ? 2 : 0)));
   }, [min, max, step, onChange]);

   const handleMouseUp = useCallback(() => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
   }, [handleMouseMove]);

   // Keyboard interactions (A11y)
   const handleKeyDown = (e: React.KeyboardEvent) => {
      let change = 0;
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') change = step;
      if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') change = -step;
      
      if (change !== 0) {
         e.preventDefault();
         const newVal = Math.max(min, Math.min(max, value + change));
         onChange(Number(newVal.toFixed(step < 1 ? 2 : 0)));
      }
   };

   const resetValue = () => {
      let def = min + (max-min)/2;
      if (label === 'Threshold') def = -30;
      if (label === 'Range') def = -60;
      onChange(def);
   };

   // Visual Math
   // Total angle: 270 degrees. 
   // Start: -135 deg (7:30 o'clock)
   // End: +135 deg (4:30 o'clock)
   const pct = (value - min) / (max - min);
   const rotation = -135 + pct * 270;

   // SVG Arc Calculation
   // Center (32,32), Radius 24
   // Circumference = 2 * PI * 24 ≈ 150.8
   // Arc Length = 270/360 * C ≈ 113.1
   const radius = 24;
   const circumference = 2 * Math.PI * radius;
   const arcLength = circumference * 0.75; 
   const dashArray = `${pct * arcLength} ${circumference}`;

   return (
      <div 
         className="flex flex-col items-center gap-2 group cursor-ns-resize select-none outline-none"
         onMouseDown={handleMouseDown}
         onDoubleClick={resetValue}
         onKeyDown={handleKeyDown}
         tabIndex={0}
         role="slider"
         aria-label={label}
         aria-valuenow={value}
         aria-valuemin={min}
         aria-valuemax={max}
         onFocus={onFocus}
      >
         <div className="relative w-14 h-14">
            {/* SVG Ring */}
            <svg width="100%" height="100%" viewBox="0 0 64 64" className="overflow-visible">
               <defs>
                  <linearGradient id={`grad-${label}`} x1="0%" y1="100%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                     <stop offset="100%" stopColor={color} stopOpacity="1" />
                  </linearGradient>
               </defs>
               {/* Rotate whole group so the gap is at bottom */}
               <g transform="rotate(135, 32, 32)">
                  {/* Background Track (Dark Grey) */}
                  <circle 
                     cx="32" cy="32" r={radius} 
                     fill="none" stroke="#333" strokeWidth="4" 
                     strokeDasharray={`${arcLength} ${circumference}`} 
                     strokeLinecap="round"
                  />
                  {/* Active Value Track (Colored) */}
                  <circle 
                     cx="32" cy="32" r={radius} 
                     fill="none" stroke={color} strokeWidth="4" 
                     strokeDasharray={dashArray} 
                     strokeLinecap="round"
                     className="transition-all duration-75 ease-out"
                  />
               </g>
            </svg>
            
            {/* Center Pointer / Cap */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className={`w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#444] shadow-lg flex items-center justify-center transform transition-transform duration-75 ${isDragging ? 'scale-95 border-white' : ''}`}
                  style={{ transform: `rotate(${rotation}deg)` }}
               >
                   <div className="w-1 h-3 bg-white mb-5 rounded-full shadow-[0_0_5px_white]"></div>
                </div>
            </div>
         </div>
         
         <div className="text-center">
            <div className={`text-[10px] font-bold uppercase transition-colors ${isDragging ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{label}</div>
            <div className="text-[9px] font-mono" style={{color: isDragging ? color : '#64748b'}}>{value.toFixed(step < 1 ? 1 : 0)}{unit}</div>
         </div>
      </div>
   );
};
