
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, AlertTriangle, Activity, BarChart3, Target, ArrowUpToLine, MoveVertical } from 'lucide-react';

export const UnitsModule: React.FC = () => {
   const [activeConcept, setActiveConcept] = useState<'LUFS' | 'DBTP' | 'LU'>('LUFS');

   return (
      <div className="h-full flex flex-col lg:flex-row gap-6 p-2 lg:p-4 overflow-hidden">
         
         {/* Left Panel: Visuals & Controls */}
         <div className="w-full lg:w-[380px] flex flex-col gap-4 shrink-0 lg:h-full overflow-y-auto no-scrollbar">
            
            {/* Visualizer - Fixed Aspect Ratio, smaller footprint */}
            <div className="w-full aspect-[16/10] bg-black rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl shrink-0">
               <Visualizer mode={activeConcept} />
            </div>

            {/* Controls / Menu */}
            <div className="flex flex-col gap-2 bg-slate-900 rounded-xl p-3 border border-slate-800 shrink-0">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 px-2">Select Concept</div>
               
               <ConceptButton 
                  isActive={activeConcept === 'LUFS'} 
                  onClick={() => setActiveConcept('LUFS')}
                  icon={<Target size={18}/>}
                  label="LUFS"
                  sub="目标响度 (Target)"
                  color="text-cyan-400"
               />
               <ConceptButton 
                  isActive={activeConcept === 'DBTP'} 
                  onClick={() => setActiveConcept('DBTP')}
                  icon={<ArrowUpToLine size={18}/>}
                  label="dBTP"
                  sub="真峰值 (Ceiling)"
                  color="text-red-400"
               />
               <ConceptButton 
                  isActive={activeConcept === 'LU'} 
                  onClick={() => setActiveConcept('LU')}
                  icon={<MoveVertical size={18}/>}
                  label="LU"
                  sub="相对差值 (Distance)"
                  color="text-yellow-400"
               />
            </div>

            {/* Quick Tip Box - Bottom Aligned */}
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed italic mt-auto hidden lg:block">
               "响度不是音量旋钮，而是对声音能量的积分。它更像是在测量‘水流量’而不是‘水位高度’。"
            </div>
         </div>

         {/* Right Panel: Detailed Explanations (Scrollable Area) */}
         <div className="flex-1 h-full min-h-0 overflow-y-auto bg-slate-900/30 rounded-2xl border border-slate-800/50 p-4 lg:p-6 custom-scrollbar">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
               
               {/* LUFS Detail */}
               <UnitCard 
                  title="LUFS" 
                  sub="Loudness Units Full Scale"
                  icon={<Volume2 size={20} className="text-cyan-400"/>}
                  desc="视频音频的核心标准。加入了 K-weighting 加权（模拟人耳对高频更敏感）和门限控制（自动忽略静音段，防止平均值被拉低）。"
                  highlight="源自 ITU-R BS.1770 / GY/T 262-2012"
                  source="[GY/T 262-2012]"
                  details={[
                     { label: "Integrated", val: "全片平均响度 (最重要)" },
                     { label: "Short-term", val: "3秒滑动窗口" },
                     { label: "Momentary", val: "400毫秒瞬时" },
                  ]}
                  active={activeConcept === 'LUFS'}
               />

               {/* dBTP Detail */}
               <UnitCard 
                  title="dBTP (真峰值)" 
                  sub="True Peak"
                  icon={<AlertTriangle size={20} className="text-red-400"/>}
                  desc="通过 4倍过采样 (Oversampling) 预测采样点之间的模拟波形峰值。普通 Peak 表可能会漏掉采样点间的‘隐形’峰值，导致数模转换时爆音。"
                  highlight="它是最后的“保险丝”"
                  source="[GY/T 262-2012 附录B]"
                  details={[
                     { label: "Sample Peak", val: "仅测量数字采样点" },
                     { label: "True Peak", val: "模拟还原后的真实电平" },
                     { label: "安全限制", val: "≤ -1.0 dBTP" },
                  ]}
                  active={activeConcept === 'DBTP'}
               />

               {/* LU Detail */}
               <UnitCard 
                  title="LU (响度单位)" 
                  sub="Loudness Unit"
                  icon={<Activity size={20} className="text-yellow-400"/>}
                  desc="相对变化的单位。数值上 1 LU = 1 dB。它用于描述“距离达标还需要调大多少”。例如：目标 -14，当前 -16，则差值为 +2 LU。"
                  highlight="LU 是“相对差值”，LUFS 是“绝对刻度”"
                  details={[
                     { label: "目标", val: "-23 LUFS" },
                     { label: "当前", val: "-21 LUFS" },
                     { label: "差值 (LU)", val: "+2 LU" },
                  ]}
                  active={activeConcept === 'LU'}
               />

               <UnitCard 
                  title="dB (分贝)" 
                  sub="Decibel"
                  icon={<BarChart3 size={20} className="text-slate-400"/>}
                  desc="基础物理单位，表示对数比率。本身没有绝对意义，必须指定参考值（如 dBFS, dBSPL, dBu）才有物理意义。"
                  details={[
                     { label: "dBFS", val: "相对于数字满刻度 (Full Scale)" },
                     { label: "dBSPL", val: "相对于空气声压 (Sound Pressure)" },
                  ]}
                  active={false}
               />

            </div>
         </div>
      </div>
   );
};

// --- Sub-components ---

const ConceptButton: React.FC<{ isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string; color: string }> = ({ isActive, onClick, icon, label, sub, color }) => (
   <button 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left group
         ${isActive ? `bg-slate-700 border-slate-500 shadow-md ring-1 ring-white/10` : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700'}
      `}
   >
      <div className={`${isActive ? color : 'text-slate-500 group-hover:text-slate-300'}`}>{icon}</div>
      <div>
         <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{label}</div>
         <div className="text-[10px] text-slate-500 font-mono">{sub}</div>
      </div>
   </button>
);

const UnitCard: React.FC<{ title: string; sub: string; icon: React.ReactNode; desc: string; highlight?: string; limitations?: string; details?: {label:string, val:string}[]; source?: string; active: boolean }> = ({ title, sub, icon, desc, highlight, limitations, details, source, active }) => (
   <div className={`bg-slate-900 border rounded-xl p-5 transition-all flex flex-col shadow-sm
      ${active ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)] ring-1 ring-cyan-500/20' : 'border-slate-800 hover:border-slate-600'}
   `}>
      <div className="flex justify-between items-start mb-3">
         <div>
            <h3 className={`text-lg font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
            <div className="text-[10px] font-mono text-slate-500 uppercase">{sub}</div>
         </div>
         <div className="p-2 bg-slate-800 rounded-lg shadow-inner">{icon}</div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[40px]">{desc}</p>
      
      {source && <div className="text-[9px] text-slate-600 font-mono mb-2 text-right">{source}</div>}

      {highlight && (
         <div className="bg-cyan-900/20 border-l-2 border-cyan-500 px-3 py-2 rounded-r text-[10px] text-cyan-300 mb-3">
            {highlight}
         </div>
      )}
      
      {limitations && (
         <div className="bg-red-900/20 border-l-2 border-red-500 px-3 py-2 rounded-r text-[10px] text-red-300 mb-3">
            ❌ {limitations}
         </div>
      )}

      {details && (
         <div className="space-y-1 mt-auto pt-3 border-t border-slate-800/50">
            {details.map((d, i) => (
               <div key={i} className="flex justify-between text-[10px]">
                  <span className="text-slate-500">{d.label}</span>
                  <span className="text-slate-300 font-medium text-right">{d.val}</span>
               </div>
            ))}
         </div>
      )}
   </div>
);

// --- Visualizer Component ---
const Visualizer: React.FC<{ mode: 'LUFS' | 'DBTP' | 'LU' }> = ({ mode }) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animationId: number;
      
      // Use logic width/height for drawing commands
      let logicalWidth = 0;
      let logicalHeight = 0;

      // Handle Resize with ResizeObserver for accurate DPI
      const handleResize = () => {
         const dpr = window.devicePixelRatio || 1;
         const rect = container.getBoundingClientRect();
         
         logicalWidth = rect.width;
         logicalHeight = rect.height;
         
         // Set actual physical pixels
         canvas.width = logicalWidth * dpr;
         canvas.height = logicalHeight * dpr;
         
         // Force CSS to match container to prevent layout shift
         canvas.style.width = `${logicalWidth}px`;
         canvas.style.height = `${logicalHeight}px`;
         
         // Scale context to use logical pixels
         ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
         ctx.scale(dpr, dpr);
      };

      // Initial sizing
      handleResize();
      
      const observer = new ResizeObserver(handleResize);
      observer.observe(container);

      const render = () => {
         const time = performance.now() / 1000;
         const w = logicalWidth;
         const h = logicalHeight;

         // Safe guard against 0 dimensions
         if (w === 0 || h === 0) {
            animationId = requestAnimationFrame(render);
            return;
         }

         ctx.clearRect(0, 0, w, h);

         // --- Common Grid ---
         ctx.strokeStyle = '#334155';
         ctx.lineWidth = 1;
         ctx.setLineDash([4, 4]);
         
         const targetY = mode === 'DBTP' ? h * 0.3 : h * 0.5; 
         
         if (mode === 'LUFS') {
            // Draw Target Line
            ctx.beginPath();
            ctx.moveTo(0, targetY);
            ctx.lineTo(w, targetY);
            ctx.stroke();
            
            ctx.fillStyle = '#22d3ee';
            ctx.font = "bold 12px monospace";
            ctx.fillText("TARGET (-14 LUFS)", 10, targetY - 10);

            // Draw "Water" Waveform
            ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            
            ctx.beginPath();
            ctx.moveTo(0, h);
            
            // Reduced speed factor for smoother look
            const speed = time * 1.5; 
            
            for(let x=0; x<=w; x+=2) {
               // Smoother composite sine waves
               const noise = Math.sin(x*0.015 + speed) * 12 
                           + Math.sin(x*0.03 - speed*1.2) * 6
                           + Math.sin(x*0.005 + speed*0.5) * 15;
                           
               const y = targetY + 35 + noise; 
               ctx.lineTo(x, y);
            }
            ctx.lineTo(w, h);
            ctx.fill();
            ctx.stroke();

            // Metaphor Text
            ctx.fillStyle = '#94a3b8';
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("比喻: 河流的水位 (平均能量)", w/2, h - 20);
            ctx.textAlign = "left"; 
         }

         if (mode === 'DBTP') {
            // Draw Ceiling
            ctx.strokeStyle = '#f87171';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(0, targetY);
            ctx.lineTo(w, targetY);
            ctx.stroke();
            
            ctx.fillStyle = '#f87171';
            ctx.font = "bold 12px monospace";
            ctx.fillText("CEILING (-1.0 dBTP)", 10, targetY - 10);

            // Draw Samples (Dots) and True Peak (Curve)
            const centerY = h * 0.65;
            const waveSpeed = time * 120; // Pixels per second
            
            // Draw analog reconstruction curve (True Peak)
            ctx.strokeStyle = '#f87171'; 
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            // Limit loop for performance
            for(let x=0; x<=w; x++) {
               const spikeX = (waveSpeed) % (w + 300) - 150;
               const dist = Math.abs(x - spikeX);
               // Sinc-like shape approximation
               // Clamp small values to 0 to avoid drawing infinite lines
               let val = 0;
               if (dist < 100) {
                  val = Math.max(0, 1 - dist/40) * Math.cos(dist*0.12);
               }
               const y = centerY - val * (h*0.4); 
               
               if (x===0) ctx.moveTo(x, y);
               else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Draw discrete samples (Digital)
            const sampleSpacing = 30;
            for(let x=0; x<=w; x+=sampleSpacing) {
               const spikeX = (waveSpeed) % (w + 300) - 150;
               const dist = Math.abs(x - spikeX);
               let val = 0;
               if (dist < 100) {
                  val = Math.max(0, 1 - dist/40) * Math.cos(dist*0.12);
               }
               const y = centerY - val * (h*0.4);
               
               // Sample Line
               ctx.beginPath();
               ctx.moveTo(x, h);
               ctx.lineTo(x, y);
               ctx.strokeStyle = '#334155';
               ctx.lineWidth = 1;
               ctx.stroke();

               // Sample Dot
               ctx.beginPath();
               ctx.arc(x, y, 3, 0, Math.PI*2);
               ctx.fillStyle = 'white';
               ctx.fill();
            }

            ctx.fillStyle = '#94a3b8';
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("比喻: 触碰天花板 (防削波)", w/2, h - 20);
            ctx.textAlign = "left";
         }

         if (mode === 'LU') {
            const gap = 60;
            const barW = 40;
            const targetH = h * 0.5; // Target Level
            // Smoother fluctuation
            const currentH = h * 0.5 + Math.sin(time * 2.5) * (h * 0.15); 

            // Target Bar
            ctx.fillStyle = '#334155';
            ctx.fillRect(w/2 - gap - barW, targetY, barW, h - targetY);
            
            // Target Line
            ctx.fillStyle = '#22d3ee'; 
            ctx.fillRect(w/2 - gap - barW - 10, targetY, barW + 20, 2);
            ctx.font = "bold 12px monospace";
            ctx.fillText("Target", w/2 - gap - barW, targetY - 10);

            // Current Bar
            ctx.fillStyle = '#eab308';
            ctx.fillRect(w/2 + gap, currentH, barW, h - currentH);
            ctx.fillText("Current", w/2 + gap, currentH - 10);

            // Measurement Line
            const diff = (currentH - targetY);
            const midX = w/2;
            
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.setLineDash([2,2]);
            
            // Dashed extensions
            ctx.beginPath();
            ctx.moveTo(w/2 - gap, targetY);
            ctx.lineTo(w/2 + gap, targetY);
            ctx.moveTo(w/2 + gap, currentH);
            ctx.lineTo(w/2 + gap + barW, currentH); 
            ctx.stroke();

            // Vertical Measurement Arrow
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(midX, targetY);
            ctx.lineTo(midX, currentH);
            ctx.stroke();

            // Text
            const luDiff = -(diff / 5).toFixed(1); // Approx scale
            ctx.fillStyle = 'white';
            ctx.font = "bold 16px monospace";
            ctx.textAlign = "left";
            ctx.fillText(`${luDiff > 0 ? '+' : ''}${luDiff} LU`, midX + 10, (targetY + currentH)/2 + 5);

            ctx.fillStyle = '#94a3b8';
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("比喻: 两个高度的差值 (相对距离)", w/2, h - 20);
            ctx.textAlign = "left";
         }

         animationId = requestAnimationFrame(render);
      };
      
      render();
      
      return () => {
         cancelAnimationFrame(animationId);
         observer.disconnect();
      };
   }, [mode]);

   return (
      <div ref={containerRef} className="w-full h-full bg-black relative">
         <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
   );
};

export default UnitsModule;
