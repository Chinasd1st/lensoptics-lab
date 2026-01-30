
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Info, Activity, Box, Mic, Settings2, Image as ImageIcon, AlertTriangle, Upload, Play, Pause, X } from 'lucide-react';

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

export const ProGGuideModule: React.FC = () => {
   const [activeParam, setActiveParam] = useState<ParamKey>('VISUALIZER');
   const [showRealImage, setShowRealImage] = useState(false);
   const [imgError, setImgError] = useState(false);

   // Real Image URL
   const progImgUrl = new URL('../../img/loudness/2_prog.png', import.meta.url).href;
   
   // UI State
   const [threshold, setThreshold] = useState(-30);
   const [range, setRange] = useState(-60);
   const [attack, setAttack] = useState(5);
   const [release, setRelease] = useState(300);
   const [hold, setHold] = useState(50);
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

   // Refs for Render Loop (Avoid React State in loop)
   const paramsRef = useRef({ threshold, range, attack, release, hold, signalType });
   useEffect(() => { paramsRef.current = { threshold, range, attack, release, hold, signalType }; }, [threshold, range, attack, release, hold, signalType]);

   const canvasRef = useRef<HTMLCanvasElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const animationRef = useRef<number | null>(null);
   
   // DSP State
   const BUFFER_SIZE = 512;
   const dsp = useRef({
      inputRb: new RingBuffer(BUFFER_SIZE),
      outputRb: new RingBuffer(BUFFER_SIZE),
      grRb: new RingBuffer(BUFFER_SIZE),
      
      // Gate internal state
      gateState: 'CLOSED' as 'OPEN' | 'HOLD' | 'RELEASE' | 'CLOSED',
      currentGain: -60, // dB
      holdCounterTime: 0,
      
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
      
      // Stop previous
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
         alert('无法加载音频文件，请重试');
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
         // Buffer size 2048 gives decent latency/performance balance
         const numChannels = source.buffer.numberOfChannels;
         // Create script processor with same channel count as source (or 2 for stereo max here)
         const procChannels = Math.min(2, numChannels); 
         const processor = ctx.createScriptProcessor(2048, procChannels, procChannels);
         
         processor.onaudioprocess = (e) => {
            const inputBuffer = e.inputBuffer;
            const outputBuffer = e.outputBuffer;
            const numCh = inputBuffer.numberOfChannels;
            
            const p = paramsRef.current;
            const state = dsp.current;
            const sampleRate = ctx.sampleRate;
            const bufferLen = inputBuffer.length;

            // Get channel data pointers
            const inputChannels = [];
            const outputChannels = [];
            for(let c=0; c<numCh; c++) {
               inputChannels.push(inputBuffer.getChannelData(c));
               outputChannels.push(outputBuffer.getChannelData(c));
            }
            
            // Per-sample Processing
            for (let i = 0; i < bufferLen; i++) {
               // 1. Sidechain Detection (Max of channels)
               let maxAbsSample = 0;
               for (let c=0; c<numCh; c++) {
                  const val = Math.abs(inputChannels[c][i]);
                  if (val > maxAbsSample) maxAbsSample = val;
               }
               
               const inputDb = maxAbsSample > 0.000001 ? 20 * Math.log10(maxAbsSample) : -90;

               // Gate Logic
               const hysteresis = 2; 
               const openThresh = p.threshold;
               const closeThresh = p.threshold - hysteresis;

               // State Machine
               if (inputDb > openThresh) {
                  state.gateState = 'OPEN';
                  state.holdCounterTime = p.hold / 1000;
               } else if (inputDb < closeThresh && state.gateState === 'OPEN') {
                  state.gateState = 'HOLD';
               }

               if (state.gateState === 'HOLD') {
                  state.holdCounterTime -= 1/sampleRate;
                  if (state.holdCounterTime <= 0) {
                     state.gateState = 'RELEASE';
                  }
               }

               let targetGainDb = 0; // 0dB reduction (Unity gain)
               if (state.gateState === 'RELEASE' || state.gateState === 'CLOSED') {
                  targetGainDb = p.range; // e.g. -60dB reduction
               }

               const attT = Math.max(0.001, p.attack / 1000);
               const relT = Math.max(0.001, p.release / 1000);
               
               // Alpha coefficients for 1-pole filter
               const attCoeff = 1 - Math.exp(-1 / (sampleRate * attT));
               const relCoeff = 1 - Math.exp(-1 / (sampleRate * relT));

               // Smooth Gain Transition
               if (targetGainDb < state.currentGain) {
                  // Closing
                  state.currentGain += (targetGainDb - state.currentGain) * relCoeff;
               } else {
                  // Opening
                  state.currentGain += (targetGainDb - state.currentGain) * attCoeff;
               }

               // Clamp
               if (state.currentGain < p.range) state.currentGain = p.range;
               if (state.currentGain > 0) state.currentGain = 0;

               // Apply Gain to ALL channels
               const gainLinear = Math.pow(10, state.currentGain / 20);
               
               for (let c=0; c<numCh; c++) {
                  outputChannels[c][i] = inputChannels[c][i] * gainLinear;
               }

               // Downsample for Visualization (Visualizing mono sum/max)
               if (i % 600 === 0) {
                  state.inputRb.push(inputDb);
                  state.outputRb.push(20 * Math.log10(maxAbsSample * gainLinear + 0.000001));
                  state.grRb.push(state.currentGain);
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

   // Cleanup
   useEffect(() => {
      return () => {
         stopAudio();
         if (audioCtxRef.current) audioCtxRef.current.close();
      };
   }, []);


   // --- Signal Generator (Synth Mode) ---
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

   // --- Main Render Loop ---
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

         // Only generate synthetic data if NOT in file mode OR file not playing
         if (audioMode === 'SYNTH') {
             if (state.lastTime === 0) state.lastTime = timestamp;
             let dt = (timestamp - state.lastTime) / 1000;
             if (dt > 0.1) dt = 0.016;
             state.lastTime = timestamp;
             state.totalTime += dt;

             // Process Synth
             const inputDb = getSample(state.totalTime, p.signalType);
             
             // Same Gate Logic as Audio Processor (Duplicated for Synth Visualization speed)
             const hysteresis = 2; 
             const openThresh = p.threshold;
             const closeThresh = p.threshold - hysteresis;

             if (inputDb > openThresh) {
                state.gateState = 'OPEN';
                state.holdCounterTime = p.hold / 1000;
             } else if (inputDb < closeThresh && state.gateState === 'OPEN') {
                state.gateState = 'HOLD';
             }

             if (state.gateState === 'HOLD') {
                state.holdCounterTime -= dt;
                if (state.holdCounterTime <= 0) {
                   state.gateState = 'RELEASE';
                }
             }

             let targetGain = 0;
             if (state.gateState === 'RELEASE' || state.gateState === 'CLOSED') {
                targetGain = p.range;
             }

             const attT = Math.max(0.001, p.attack / 1000);
             const relT = Math.max(0.001, p.release / 1000);
             const attCoeff = 1 - Math.exp(-dt / attT);
             const relCoeff = 1 - Math.exp(-dt / relT);

             if (targetGain < state.currentGain) {
                state.currentGain += (targetGain - state.currentGain) * relCoeff;
             } else {
                state.currentGain += (targetGain - state.currentGain) * attCoeff;
             }

             if (state.currentGain < p.range) state.currentGain = p.range;
             if (state.currentGain > 0) state.currentGain = 0;

             const outputDb = inputDb + state.currentGain;

             state.inputRb.push(inputDb);
             state.outputRb.push(outputDb);
             state.grRb.push(state.currentGain);
         }

         // 4. Render (Always Draw)
         ctx.setTransform(1, 0, 0, 1, 0, 0);
         ctx.fillStyle = '#0f172a';
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

         // Input (Draw first)
         ctx.fillStyle = '#1e293b';
         ctx.beginPath();
         ctx.moveTo(0, logicalH);
         for(let i=0; i<len; i++) ctx.lineTo(i * stepX, dbToY(inputData[i]));
         ctx.lineTo(logicalW, logicalH);
         ctx.fill();

         // Threshold (Draw AFTER Input to be visible on top)
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

         // Output
         ctx.strokeStyle = '#4ade80';
         ctx.lineWidth = 2;
         ctx.beginPath();
         for(let i=0; i<len; i++) {
            const x = i * stepX;
            const y = dbToY(outputData[i]);
            if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         ctx.stroke();

         // GR
         const topLimit = logicalH * 0.1;
         ctx.strokeStyle = '#ef4444';
         ctx.lineWidth = 2;
         ctx.beginPath();
         for(let i=0; i<len; i++) {
            const gr = grData[i];
            const y = topLimit + Math.abs(gr) * ((logicalH * 0.8) / 90);
            const x = i * stepX;
            if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         ctx.stroke();

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
         {/* Left: Interactive Visualizer or Real Image */}
         <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-6 select-none relative overflow-hidden">
            
            {/* View Toggle Button */}
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
                        src={progImgUrl} 
                        alt="FabFilter Pro-G Screenshot" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-slate-700"
                        onError={() => setImgError(true)}
                     />
                  ) : (
                     <div className="flex flex-col items-center justify-center text-slate-500 p-8 border-2 border-dashed border-slate-700 rounded-lg bg-black/20 max-w-md text-center">
                        <AlertTriangle size={32} className="text-red-500 mb-3"/>
                        <p className="font-bold text-red-400 mb-2">Image Not Found (404)</p>
                        <div className="text-xs space-y-1 bg-black/40 p-4 rounded border border-slate-800 text-left font-mono text-slate-400">
                           <p>Expected path:</p>
                           <p className="text-white">../../img/loudness/2_prog.png</p>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <>
                  {/* Added padding-right to avoid overlap with absolute button */}
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-4 pr-36">
                     <div className="flex items-center gap-4">
                        <div className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">Pro-G Simulator (Gate)</div>
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
                     <ProKnob label="Range" value={range} min={-80} max={0} step={1} unit="dB" onChange={setRange} color="#818cf8" onFocus={() => setActiveParam('RANGE')} />
                     <div className="w-px h-12 bg-[#333]"></div>
                     <ProKnob label="Attack" value={attack} min={0} max={100} step={1} unit="ms" onChange={setAttack} color="#34d399" onFocus={() => setActiveParam('ATTACK')} />
                     <ProKnob label="Release" value={release} min={10} max={1000} step={10} unit="ms" onChange={setRelease} color="#facc15" onFocus={() => setActiveParam('RELEASE')} />
                     <ProKnob label="Hold" value={hold} min={0} max={500} step={10} unit="ms" onChange={setHold} color="#fb923c" onFocus={() => setActiveParam('HOLD')} />
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
      const speed = e.shiftKey ? 0.1 : 1.0;
      const deltaVal = (deltaY / pixelRange) * range * speed;
      let newVal = startValRef.current + deltaVal;
      if (step > 0) {
         newVal = Math.round(newVal / step) * step;
      }
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
      if (label === 'Threshold') def = -30;
      if (label === 'Range') def = -60;
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
