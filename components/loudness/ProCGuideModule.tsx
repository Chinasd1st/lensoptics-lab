
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Info, Activity, Box, Mic, Settings2, Image as ImageIcon, AlertTriangle, Upload, Play, Pause } from 'lucide-react';

type ParamKey = 'VISUALIZER' | 'THRESHOLD' | 'RATIO' | 'ATTACK' | 'RELEASE' | 'MAKEUP' | 'KNEE';

// Reusing RingBuffer Logic
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

   getAll(): Float32Array {
      const res = new Float32Array(this.size);
      const part1 = this.buffer.subarray(this.head);
      const part2 = this.buffer.subarray(0, this.head);
      res.set(part1, 0);
      res.set(part2, part1.length);
      return res;
   }
   
   clear(val = -90) {
      this.buffer.fill(val);
      this.head = 0;
   }
}

export const ProCGuideModule: React.FC = () => {
   const [activeParam, setActiveParam] = useState<ParamKey>('VISUALIZER');
   const [showRealImage, setShowRealImage] = useState(false);
   const [imgError, setImgError] = useState(false);

   // Real Image URL
   const procImgUrl = new URL('../../img/loudness/3_proc.png', import.meta.url).href;
   
   // UI State
   const [threshold, setThreshold] = useState(-20);
   const [ratio, setRatio] = useState(4); // 4:1
   const [attack, setAttack] = useState(15);
   const [release, setRelease] = useState(150);
   const [makeup, setMakeup] = useState(0);
   const [knee, setKnee] = useState(0); // 0dB soft knee
   const [signalType, setSignalType] = useState<'DRUMS' | 'VOCAL'>('DRUMS');

   // Audio State
   const [audioMode, setAudioMode] = useState<'SYNTH' | 'FILE'>('SYNTH');
   const [isPlaying, setIsPlaying] = useState(false);
   const [fileName, setFileName] = useState<string>('');
   const fileInputRef = useRef<HTMLInputElement>(null);
   const audioCtxRef = useRef<AudioContext | null>(null);
   const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
   const processorRef = useRef<ScriptProcessorNode | null>(null);
   const audioBufferRef = useRef<AudioBuffer | null>(null);
   const startTimeRef = useRef<number>(0);

   // Refs for Render Loop
   const paramsRef = useRef({ threshold, ratio, attack, release, makeup, knee, signalType });
   useEffect(() => { paramsRef.current = { threshold, ratio, attack, release, makeup, knee, signalType }; }, [threshold, ratio, attack, release, makeup, knee, signalType]);

   const canvasRef = useRef<HTMLCanvasElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const animationRef = useRef<number | null>(null);
   
   // DSP State
   const BUFFER_SIZE = 512;
   const dsp = useRef({
      inputRb: new RingBuffer(BUFFER_SIZE),
      outputRb: new RingBuffer(BUFFER_SIZE),
      grRb: new RingBuffer(BUFFER_SIZE),
      currentGR: 0, // Current Gain Reduction in dB (should be <= 0)
      lastTime: 0,
      totalTime: 0
   });

   const definitions: Record<ParamKey, { title: string; subtitle: string; desc: string; tip: string; color: string }> = {
      VISUALIZER: {
         title: "Compressor View",
         subtitle: "压缩可视化",
         desc: "深色波形为 Input，绿色细线为 Output。红色区域向下延伸代表压缩量 (Gain Reduction)。",
         tip: "观察红线的跳动节奏。如果红线一直沉底不回弹，说明压缩过度或 Release 太慢；如果红线只削掉一点点峰值，说明控制得当。",
         color: "text-blue-300"
      },
      THRESHOLD: {
         title: "Threshold",
         subtitle: "阈值 / 起跑线",
         desc: "压缩器开始工作的电平点。只有超过这个音量的声音才会被“压”下来。",
         tip: "调节技巧：慢慢拉低阈值，直到 Gain Reduction 表头开始跳动。人声一般压 3-6dB，鼓组可以压更多。",
         color: "text-cyan-400"
      },
      RATIO: {
         title: "Ratio",
         subtitle: "压缩比",
         desc: "超标部分要被压多少？4:1 表示超标 4dB 只输出 1dB。∞:1 就是 Limiter (限制器)。",
         tip: "人声/吉他常用 2:1 ~ 4:1 (温和)；鼓组/贝斯常用 4:1 ~ 8:1 (有力)；限制峰值用 10:1 以上。",
         color: "text-indigo-400"
      },
      ATTACK: {
         title: "Attack",
         subtitle: "启动时间",
         desc: "发现超标后，多快开始压缩？快 Attack 会切掉瞬态（声音变远/变软），慢 Attack 保留瞬态（更有冲击力）。",
         tip: "想让鼓声更猛？调慢 Attack (30ms+)。想让声音更稳更靠后？调快 Attack (<10ms)。",
         color: "text-emerald-400"
      },
      RELEASE: {
         title: "Release",
         subtitle: "释放时间",
         desc: "信号回到阈值下后，多快停止压缩？",
         tip: "根据音乐 BPM 调整。太快会由失真(Distortion)，太慢会产生“抽吸感”(Pumping)——即下一个音头被上一个音的压缩给吞掉了。",
         color: "text-yellow-400"
      },
      MAKEUP: {
         title: "Makeup / Gain",
         subtitle: "补偿增益",
         desc: "压缩会让整体音量变小，需要在这里补回来。",
         tip: "口诀：压多少，补多少。如果 GR 表最大跳到 -6dB，这里就提升 +6dB，让响度更有竞争力。",
         color: "text-orange-400"
      },
      KNEE: {
         title: "Knee",
         subtitle: "拐点软硬",
         desc: "Soft Knee 会在阈值附近提前缓慢开始压缩，过渡更自然。Hard Knee 则是严格执行。",
         tip: "人声/总线压缩建议 Soft Knee (12dB+)，鼓组/打击乐建议 Hard Knee (0dB)。",
         color: "text-purple-400"
      }
   };

   const current = definitions[activeParam];

   // --- Audio Engine ---
   const initAudio = () => {
      if (!audioCtxRef.current) {
         audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      return audioCtxRef.current;
   };

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      stopAudio();
      
      try {
         const ctx = initAudio();
         const arrayBuffer = await file.arrayBuffer();
         const buffer = await ctx.decodeAudioData(arrayBuffer);
         audioBufferRef.current = buffer;
         setFileName(file.name);
         setAudioMode('FILE');
         dsp.current.inputRb.clear();
         dsp.current.outputRb.clear();
         dsp.current.grRb.clear();
      } catch (err) {
         console.error('Error loading audio:', err);
         alert('无法加载音频文件');
      }
   };

   const toggleAudioPlayback = () => {
      const ctx = initAudio();
      
      if (isPlaying) {
         stopAudio();
      } else {
         if (!audioBufferRef.current) return;
         if (ctx.state === 'suspended') ctx.resume();

         const source = ctx.createBufferSource();
         source.buffer = audioBufferRef.current;
         source.loop = true;

         // DSP Processor
         const processor = ctx.createScriptProcessor(2048, 1, 1);
         
         processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const outputData = e.outputBuffer.getChannelData(0);
            const p = paramsRef.current;
            const state = dsp.current;
            const sampleRate = ctx.sampleRate;
            
            // Compressor DSP Logic per sample
            for (let i = 0; i < inputData.length; i++) {
               const sample = inputData[i];
               const absSample = Math.abs(sample);
               const inputDb = absSample > 0.000001 ? 20 * Math.log10(absSample) : -90;

               // Gain Computer
               let targetGR = 0;
               const overshoot = inputDb - p.threshold;
               
               if (overshoot > 0) {
                  // Basic Hard Knee
                  targetGR = -overshoot * (1 - 1 / p.ratio);
               }

               const attT = Math.max(0.001, p.attack / 1000);
               const relT = Math.max(0.001, p.release / 1000);
               const attCoeff = 1 - Math.exp(-1 / (sampleRate * attT));
               const relCoeff = 1 - Math.exp(-1 / (sampleRate * relT));

               if (targetGR < state.currentGR) {
                  // Attack Phase (Gain Reduction Increasing, becoming more negative)
                  state.currentGR += (targetGR - state.currentGR) * attCoeff;
               } else {
                  // Release Phase
                  state.currentGR += (targetGR - state.currentGR) * relCoeff;
               }

               // Apply
               const totalGainDb = state.currentGR + p.makeup;
               const gainLinear = Math.pow(10, totalGainDb / 20);
               outputData[i] = sample * gainLinear;

               // Viz Downsample
               // Slow down the scroll speed by increasing modulus (e.g. 600)
               if (i % 600 === 0) {
                  state.inputRb.push(inputDb);
                  state.outputRb.push(20 * Math.log10(Math.abs(outputData[i]) + 0.000001));
                  state.grRb.push(state.currentGR);
               }
            }
         };

         source.connect(processor);
         processor.connect(ctx.destination);
         source.start();
         startTimeRef.current = ctx.currentTime;

         sourceNodeRef.current = source;
         processorRef.current = processor;
         setIsPlaying(true);
      }
   };

   const stopAudio = () => {
      if (sourceNodeRef.current) {
         try { sourceNodeRef.current.stop(); } catch(e) {}
         sourceNodeRef.current.disconnect();
      }
      if (processorRef.current) {
         processorRef.current.disconnect();
      }
      setIsPlaying(false);
   };

   useEffect(() => {
      return () => {
         stopAudio();
         if (audioCtxRef.current) audioCtxRef.current.close();
      };
   }, []);

   // --- Signal Generator (Reused) ---
   const getSample = (tSec: number, type: 'DRUMS' | 'VOCAL') => {
      let noise = -60 + (Math.random() * 6);
      let signal = -90;

      if (type === 'DRUMS') {
         const loop = tSec % 2.0;
         if ((loop >= 0 && loop < 0.2) || (loop >= 1.0 && loop < 1.2)) {
            const localT = (loop % 1.0) * 5;
            signal = -6 + (Math.log10(1 - localT) * 20);
         }
         else if ((loop >= 0.5 && loop < 0.8) || (loop >= 1.5 && loop < 1.8)) {
            const localT = ((loop - 0.5) % 1.0) * 3.33; 
            signal = -8 + (Math.log10(1 - localT) * 20);
            noise += (Math.random() * 12) * (1 - localT);
         }
      } else {
         const loop = tSec % 3.0;
         if ((loop > 0.2 && loop < 0.6) || (loop > 1.2 && loop < 1.5) || (loop > 2.0 && loop < 2.5)) {
            const mod = Math.sin(tSec * 20) * 3;
            signal = -12 + mod;
         } else if (loop > 1.8 && loop < 1.9) {
            signal = -45;
         }
      }
      return Math.max(noise, signal);
   };

   // --- Main Loop ---
   useEffect(() => {
      if (showRealImage) return;

      const canvas = canvasRef.current;
      const container = wrapperRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

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

         const w = canvas.width;
         const h = canvas.height;
         const dpr = window.devicePixelRatio || 1;

         // Only run synth logic if in synth mode
         if (audioMode === 'SYNTH') {
             if (state.lastTime === 0) state.lastTime = timestamp;
             let dt = (timestamp - state.lastTime) / 1000;
             if (dt > 0.1) dt = 0.016;
             state.lastTime = timestamp;
             state.totalTime += dt;

             // 1. Process Audio Sample
             const inputDb = getSample(state.totalTime, p.signalType);
             
             // 2. Compressor Logic (Duplicated for visualizer speed)
             let targetGR = 0;
             const overshoot = inputDb - p.threshold;
             
             if (overshoot > 0) {
                targetGR = -overshoot * (1 - 1 / p.ratio);
             }

             const attT = Math.max(0.001, p.attack / 1000);
             const relT = Math.max(0.001, p.release / 1000);
             const attCoeff = 1 - Math.exp(-dt / attT);
             const relCoeff = 1 - Math.exp(-dt / relT);

             if (targetGR < state.currentGR) {
                state.currentGR += (targetGR - state.currentGR) * attCoeff;
             } else {
                state.currentGR += (targetGR - state.currentGR) * relCoeff;
             }

             const outputDb = inputDb + state.currentGR + p.makeup;

             // 3. Store Data
             state.inputRb.push(inputDb);
             state.outputRb.push(outputDb);
             state.grRb.push(state.currentGR); 
         }

         // 4. Render
         ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
         ctx.fillStyle = '#0f172a'; // Slate 900
         ctx.fillRect(0, 0, w, h);
         
         ctx.scale(dpr, dpr);
         const logicalW = w / dpr;
         const logicalH = h / dpr;

         const dbToY = (db: number) => (logicalH * 0.1) + ((db) / -90) * (logicalH * 0.8);

         // Grid
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

         const inputData = state.inputRb.getAll();
         const outputData = state.outputRb.getAll();
         const grData = state.grRb.getAll();
         const len = inputData.length;
         const stepX = logicalW / len;

         // Input (Grey)
         ctx.fillStyle = '#1e293b';
         ctx.beginPath();
         ctx.moveTo(0, logicalH);
         for(let i=0; i<len; i++) ctx.lineTo(i * stepX, dbToY(inputData[i]));
         ctx.lineTo(logicalW, logicalH);
         ctx.fill();

         // Threshold Line (Draw AFTER input fill to be visible)
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

         // Output (Green Line)
         ctx.strokeStyle = '#4ade80';
         ctx.lineWidth = 2;
         ctx.beginPath();
         for(let i=0; i<len; i++) {
            const x = i * stepX;
            const y = dbToY(outputData[i]);
            if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         ctx.stroke();

         // GR (Red Overlay)
         const topLimit = logicalH * 0.1; // 0dB line
         ctx.fillStyle = 'rgba(239, 68, 68, 0.3)'; // Red transparent
         ctx.beginPath();
         ctx.moveTo(0, topLimit);
         for(let i=0; i<len; i++) {
            const gr = grData[i]; 
            const grHeight = Math.abs(gr) * ((logicalH * 0.8) / 90);
            ctx.lineTo(i * stepX, topLimit + grHeight);
         }
         ctx.lineTo(logicalW, topLimit);
         ctx.fill();

         // Progress Bar (Only for File Playback)
         if (audioMode === 'FILE' && isPlaying && audioBufferRef.current) {
             const ctxAudio = audioCtxRef.current;
             if (ctxAudio) {
                 const duration = audioBufferRef.current.duration;
                 const elapsed = ctxAudio.currentTime - startTimeRef.current;
                 const progress = (elapsed % duration) / duration;
                 
                 // Draw Progress Bar at bottom
                 ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                 ctx.fillRect(0, logicalH - 4, logicalW, 4); // Track
                 
                 ctx.fillStyle = '#22d3ee';
                 ctx.fillRect(0, logicalH - 4, logicalW * progress, 4); // Fill
             }
         }

         animationRef.current = requestAnimationFrame(loop);
      };

      animationRef.current = requestAnimationFrame(loop);
      return () => {
         resizeObserver.disconnect();
         if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
   }, [showRealImage, audioMode, isPlaying]);

   return (
      <div className="h-full flex flex-col lg:flex-row gap-6 p-4">
         {/* Left */}
         <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-6 select-none relative overflow-hidden">
            
            <div className="absolute top-4 right-4 z-20 flex gap-2">
               <button 
                  onClick={() => setShowRealImage(!showRealImage)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 text-xs font-bold transition-all shadow-lg"
               >
                  {showRealImage ? <Box size={14}/> : <ImageIcon size={14}/>}
                  {showRealImage ? '返回交互模式' : '查看真实截图'}
               </button>
            </div>

            {showRealImage ? (
               <div className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  {!imgError ? (
                     <img 
                        src={procImgUrl} 
                        alt="FabFilter Pro-C 2 Screenshot" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-slate-700"
                        onError={() => setImgError(true)}
                     />
                  ) : (
                     <div className="flex flex-col items-center justify-center text-slate-500 p-8 border-2 border-dashed border-slate-700 rounded-lg bg-black/20 max-w-md text-center">
                        <AlertTriangle size={32} className="text-red-500 mb-3"/>
                        <p className="font-bold text-red-400 mb-2">Image Not Found (404)</p>
                        <div className="text-xs space-y-1 bg-black/40 p-4 rounded border border-slate-800 text-left font-mono text-slate-400">
                           <p>Expected path:</p>
                           <p className="text-white">../../img/loudness/3_proc.png</p>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <>
                  {/* Added padding-right to avoid overlap with absolute button */}
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-4 pr-36">
                     <div className="flex items-center gap-4">
                        <div className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">Pro-C 2 Simulator (Compressor)</div>
                     </div>
                     
                     <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1">
                        {/* Audio Source Toggle */}
                        <div className="flex bg-slate-800 rounded p-0.5 mr-2">
                           <button onClick={() => { setAudioMode('SYNTH'); stopAudio(); }} className={`px-2 py-1 text-[10px] rounded font-bold transition-colors ${audioMode==='SYNTH' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}>Synth</button>
                           <button onClick={() => fileInputRef.current?.click()} className={`px-2 py-1 text-[10px] rounded font-bold transition-colors flex items-center gap-1 ${audioMode==='FILE' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                              <Upload size={10}/> File
                           </button>
                           <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileUpload} />
                        </div>

                        {audioMode === 'SYNTH' ? (
                           <div className="flex bg-slate-800 rounded p-0.5">
                              <button onClick={() => setSignalType('DRUMS')} className={`px-2 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${signalType==='DRUMS' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                                 <Settings2 size={10}/> Drums
                              </button>
                              <button onClick={() => setSignalType('VOCAL')} className={`px-2 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${signalType==='VOCAL' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                                 <Mic size={10}/> Vocal
                              </button>
                           </div>
                        ) : (
                           <div className="flex items-center gap-2 px-2">
                              <span className="text-[10px] text-slate-400 max-w-[100px] truncate">{fileName || 'No File'}</span>
                              <button onClick={toggleAudioPlayback} disabled={!fileName} className={`p-1 rounded-full ${isPlaying ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'} disabled:opacity-50`}>
                                 {isPlaying ? <Pause size={12}/> : <Play size={12}/>}
                              </button>
                           </div>
                        )}
                     </div>
                  </div>

                  <div 
                     ref={wrapperRef}
                     className="flex-1 w-full bg-[#111] rounded-lg border border-slate-700 relative overflow-hidden shadow-inner"
                     onMouseEnter={() => setActiveParam('VISUALIZER')}
                  >
                     <canvas ref={canvasRef} className="block w-full h-full" />
                     {audioMode === 'FILE' && !isPlaying && fileName && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
                           <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2">
                              <Play size={12} className="fill-white"/> Click Play to Start DSP
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="mt-6 h-32 bg-[#1a1a1a] rounded-xl border border-[#333] px-6 py-4 flex items-center justify-between gap-2 lg:gap-6">
                     <ProKnob label="Threshold" value={threshold} min={-60} max={0} step={0.5} unit="dB" onChange={setThreshold} color="#22d3ee" onFocus={() => setActiveParam('THRESHOLD')} />
                     <ProKnob label="Ratio" value={ratio} min={1} max={10} step={0.1} unit=":1" onChange={setRatio} color="#818cf8" onFocus={() => setActiveParam('RATIO')} />
                     <div className="w-px h-12 bg-[#333]"></div>
                     <ProKnob label="Attack" value={attack} min={0} max={100} step={1} unit="ms" onChange={setAttack} color="#34d399" onFocus={() => setActiveParam('ATTACK')} />
                     <ProKnob label="Release" value={release} min={10} max={1000} step={10} unit="ms" onChange={setRelease} color="#facc15" onFocus={() => setActiveParam('RELEASE')} />
                     <div className="w-px h-12 bg-[#333]"></div>
                     <ProKnob label="Makeup" value={makeup} min={0} max={24} step={0.5} unit="dB" onChange={setMakeup} color="#fb923c" onFocus={() => setActiveParam('MAKEUP')} />
                  </div>
               </>
            )}
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

// Reusing ProKnob UI Component
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
      const pixelRange = 200;
      const speed = e.shiftKey ? 0.1 : 1.0;
      const deltaVal = (deltaY / pixelRange) * range * speed;
      let newVal = startValRef.current + deltaVal;
      if (step > 0) newVal = Math.round(newVal / step) * step;
      newVal = Math.max(min, Math.min(max, newVal));
      onChange(Number(newVal.toFixed(step < 1 ? 2 : 0)));
   }, [min, max, step, onChange]);

   const handleMouseUp = useCallback(() => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
   }, [handleMouseMove]);

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
      if (label === 'Threshold') def = -20;
      if (label === 'Ratio') def = 4;
      if (label === 'Makeup') def = 0;
      onChange(def);
   };

   const pct = (value - min) / (max - min);
   const rotation = -135 + pct * 270;
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
            <svg width="100%" height="100%" viewBox="0 0 64 64" className="overflow-visible">
               <defs>
                  <linearGradient id={`grad-${label}`} x1="0%" y1="100%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                     <stop offset="100%" stopColor={color} stopOpacity="1" />
                  </linearGradient>
               </defs>
               <g transform="rotate(135, 32, 32)">
                  <circle cx="32" cy="32" r={radius} fill="none" stroke="#333" strokeWidth="4" strokeDasharray={`${arcLength} ${circumference}`} strokeLinecap="round" />
                  <circle cx="32" cy="32" r={radius} fill="none" stroke={color} strokeWidth="4" strokeDasharray={dashArray} strokeLinecap="round" className="transition-all duration-75 ease-out" />
               </g>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#444] shadow-lg flex items-center justify-center transform transition-transform duration-75 ${isDragging ? 'scale-95 border-white' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
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
