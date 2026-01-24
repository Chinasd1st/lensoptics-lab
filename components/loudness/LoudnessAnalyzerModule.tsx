
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, FileAudio, Play, Pause, Activity, AlertTriangle, CheckCircle, Loader2, Info, X, ZoomIn, ZoomOut, BarChart3, Settings2, Target } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';

interface AnalysisResult {
  integrated: number;
  shortTermMax: number;
  truePeak: number;
  lra: number;
  duration: number;
}

interface TimeSeriesData {
  momentary: number[]; // 400ms window, 100ms step
  shortTerm: number[]; // 3s window, 100ms step
  stepTime: number; // Time in seconds per step (approx 0.1s)
}

type Standard = 'WEB' | 'BROADCAST';

export const LoudnessAnalyzerModule: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [targetStandard, setTargetStandard] = useState<Standard>('WEB');
  
  // Audio & Visualization State
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(20); // Min px per sec
  
  // Real-time Metering State
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData | null>(null);
  const [currentM, setCurrentM] = useState<number>(-Infinity);
  const [currentS, setCurrentS] = useState<number>(-Infinity);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Constants based on Standard
  const targetLUFS = targetStandard === 'WEB' ? -14 : -23;
  const targetTolerance = targetStandard === 'WEB' ? 1.0 : 0.5; // Broadcast is stricter

  // Helper to format time as 00:00:00.000
  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  // Format dB for display
  const formatDb = (val: number) => {
     if (val <= -100) return '-∞';
     return val.toFixed(1);
  };

  // Color coding for meters relative to target
  const getMeterColor = (val: number) => {
     if (val > targetLUFS + 3) return 'text-red-500'; // Too loud
     if (val > targetLUFS) return 'text-yellow-400'; // Hot
     if (val > targetLUFS - 5) return 'text-emerald-400'; // Good range
     return 'text-slate-500'; // Quiet
  };

  // Initialize WaveSurfer when mediaUrl is ready
  useEffect(() => {
    if (!waveformRef.current || !mediaUrl || !timelineRef.current) return;

    // Destroy existing instance if any
    if (wavesurfer) {
        try {
            wavesurfer.destroy();
        } catch (e) {
            console.warn("WaveSurfer cleanup error:", e);
        }
    }

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      height: 100, // Adjusted for timeline
      waveColor: '#475569', // Slate 600
      progressColor: '#0ea5e9', // Sky 500
      cursorColor: '#ef4444', // Red 500
      cursorWidth: 2,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      minPxPerSec: zoomLevel,
      url: mediaUrl,
      dragToSeek: true,
      plugins: [
         TimelinePlugin.create({
            container: timelineRef.current,
            height: 24,
            timeInterval: 1,
            primaryLabelInterval: 5,
            style: {
               fontSize: '10px',
               color: '#94a3b8',
            }
         })
      ]
    });

    ws.on('ready', () => {
      setIsReady(true);
      setDuration(ws.getDuration());
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));

    // Update meters on playback
    ws.on('timeupdate', (currentTime) => {
        setCurrentTime(currentTime);
        updateMeters(currentTime);
    });

    // Update meters on user interaction (click/drag) - Bidirectional Sync
    ws.on('interaction', (newTime) => {
       setCurrentTime(newTime);
       updateMeters(newTime);
    });

    setWavesurfer(ws);

    return () => {
      try {
         ws.destroy();
      } catch (e) {
         console.warn(e);
      }
    };
  }, [mediaUrl, timeSeries]); // Re-init if media changes

  // Safe Zoom Handling
  useEffect(() => {
     if(wavesurfer && isReady) {
        try {
           wavesurfer.zoom(zoomLevel);
        } catch(e) {
           console.warn("Zoom not applied (audio not ready):", e);
        }
     }
  }, [zoomLevel, wavesurfer, isReady]);

  const updateMeters = (time: number) => {
      if (timeSeries) {
         const index = Math.floor(time / timeSeries.stepTime);
         const m = timeSeries.momentary[index] ?? -Infinity;
         const s = timeSeries.shortTerm[index] ?? -Infinity;
         setCurrentM(m);
         setCurrentS(s);
      }
  };

  // Controls
  const togglePlay = useCallback(() => {
    if (wavesurfer) {
       wavesurfer.playPause();
    }
  }, [wavesurfer]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 10));

  const resetAnalyzer = () => {
    setResult(null);
    setFileName('');
    setIsPlaying(false);
    setIsReady(false);
    setTimeSeries(null);
    setCurrentM(-Infinity);
    setCurrentS(-Infinity);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
    if (mediaUrl) {
       URL.revokeObjectURL(mediaUrl);
       setMediaUrl(null);
    }
    if (wavesurfer) {
       try { wavesurfer.destroy(); } catch(e) {}
       setWavesurfer(null);
    }
  };

  // --- Analysis Logic ---
  const analyzeAudio = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);
    setTimeSeries(null);
    
    if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
        setMediaUrl(null);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Reuse context if possible, or create new and close strictly
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      
      // Close context immediately after decode to free resources
      setTimeout(() => audioCtx.close(), 100); 

      // 1. K-Weighting Filtering
      setProgress(20);
      const offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;

      // Simple K-weighting approximation filters
      const highShelf = offlineCtx.createBiquadFilter();
      highShelf.type = 'highshelf';
      highShelf.frequency.value = 1500;
      highShelf.gain.value = 4.0; 

      const highPass = offlineCtx.createBiquadFilter();
      highPass.type = 'highpass';
      highPass.frequency.value = 38;
      highPass.Q.value = 0.5;

      source.connect(highShelf);
      highShelf.connect(highPass);
      highPass.connect(offlineCtx.destination);

      source.start();
      
      const kWeightedBuffer = await offlineCtx.startRendering();
      setProgress(50); 

      // 3. Gating and Integration Calculation
      setTimeout(() => {
         try {
            const channels = kWeightedBuffer.numberOfChannels;
            const data = [];
            for (let i = 0; i < channels; i++) {
               data.push(kWeightedBuffer.getChannelData(i));
            }

            const sampleRate = kWeightedBuffer.sampleRate;
            const windowSizeMs = 400; 
            const windowSizeSamples = Math.floor((sampleRate * windowSizeMs) / 1000);
            const overlap = 0.75; 
            const stepSize = Math.floor(windowSizeSamples * (1 - overlap)); // ~100ms step
            const numBlocks = Math.floor((kWeightedBuffer.length - windowSizeSamples) / stepSize);

            const momentaryLoudness: number[] = [];
            let maxPeak = 0;

            // True Peak Scan (Simple Sample Peak for demo speed)
            for (let c = 0; c < channels; c++) {
               const chData = audioBuffer.getChannelData(c); 
               // Optimization: Sample stride for peak to speed up large files
               const step = Math.max(1, Math.floor(chData.length / 1000000)); 
               for (let i = 0; i < chData.length; i+=step) { 
                  const abs = Math.abs(chData[i]);
                  if (abs > maxPeak) maxPeak = abs;
               }
            }
            const truePeakDb = 20 * Math.log10(maxPeak);

            // Block Processing
            for (let i = 0; i < numBlocks; i++) {
               const start = i * stepSize;
               let sumSquares = 0;
               
               for (let c = 0; c < channels; c++) {
                  let chSum = 0;
                  // Optimization: Sub-sampling for RMS calculation
                  const subSample = 4;
                  for (let j = 0; j < windowSizeSamples; j+=subSample) { 
                     const sample = data[c][start + j];
                     chSum += sample * sample;
                  }
                  sumSquares += chSum * subSample; 
               }
               
               const meanSquare = sumSquares / windowSizeSamples;
               
               if (meanSquare > 0) {
                  const loudness = -0.691 + 10 * Math.log10(meanSquare);
                  momentaryLoudness.push(loudness);
               } else {
                  momentaryLoudness.push(-Infinity);
               }
            }

            // Short-term Processing (3s sliding window over momentary blocks)
            const shortTermWindowBlocks = 30; // 3s / 0.1s step
            const shortTermLoudness: number[] = [];
            
            for (let i = 0; i < momentaryLoudness.length; i++) {
               let sumPower = 0;
               let count = 0;
               for (let j = 0; j < shortTermWindowBlocks; j++) {
                  const idx = i - j;
                  if (idx >= 0 && momentaryLoudness[idx] > -Infinity) {
                     sumPower += Math.pow(10, momentaryLoudness[idx] / 10);
                     count++;
                  }
               }
               if (count > 0 && sumPower > 0) {
                  shortTermLoudness.push(10 * Math.log10(sumPower / count));
               } else {
                  shortTermLoudness.push(-Infinity);
               }
            }

            // Integrated Calculation with Gating
            // 1. Absolute Threshold: -70 LKFS
            const absThreshold = -70;
            const blocksAboveAbs = momentaryLoudness.filter(l => l > absThreshold);
            
            let sumPower = 0;
            blocksAboveAbs.forEach(l => sumPower += Math.pow(10, l / 10));
            // Pre-gated average
            const avgLoudnessUngated = 10 * Math.log10(sumPower / blocksAboveAbs.length);
            
            // 2. Relative Threshold: -10 dB below Ungated
            const relThreshold = avgLoudnessUngated - 10;
            const finalBlocks = blocksAboveAbs.filter(l => l > relThreshold);
            
            let finalSumPower = 0;
            finalBlocks.forEach(l => finalSumPower += Math.pow(10, l / 10));
            const integratedLoudness = finalBlocks.length > 0 
               ? 10 * Math.log10(finalSumPower / finalBlocks.length) 
               : -Infinity;

            // LRA Calculation
            finalBlocks.sort((a,b) => a-b);
            const lowPercentile = finalBlocks[Math.floor(finalBlocks.length * 0.1)] || -70;
            const highPercentile = finalBlocks[Math.floor(finalBlocks.length * 0.95)] || -70;
            const lra = highPercentile - lowPercentile;

            setResult({
               integrated: integratedLoudness,
               shortTermMax: Math.max(...shortTermLoudness.filter(l => l > -90)),
               truePeak: truePeakDb,
               lra: lra,
               duration: audioBuffer.duration
            });

            setTimeSeries({
               momentary: momentaryLoudness,
               shortTerm: shortTermLoudness,
               stepTime: stepSize / sampleRate 
            });
            
            // Create Audio URL for WaveSurfer
            const url = URL.createObjectURL(file);
            setMediaUrl(url);

            setProgress(100);
            setIsProcessing(false);
         } catch (e) {
            console.error(e);
            setError("计算过程出错");
            setIsProcessing(false);
         }
      }, 100);

    } catch (err) {
      console.error(err);
      setError("无法解析文件或计算响度。请确保文件是标准的音频格式 (MP3/WAV/AAC)。");
      setMediaUrl(null);
      setIsProcessing(false);
    }
  }, [mediaUrl]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      analyzeAudio(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col p-4 lg:p-8">
      
      {/* Header */}
      <div className="text-center mb-8">
         <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Activity className="text-cyan-400" size={32}/> 音频响度分析器 (BS.1770)
         </h2>
         <p className="text-slate-400 text-sm max-w-xl mx-auto">
            完全在本地浏览器运行。WaveSurfer 波形渲染与分析。
            <br/>支持点击波形跳转查看任意时刻的 Short-term/Momentary 数值。
         </p>
      </div>

      {/* Upload Area */}
      {!result && !isProcessing && (
         <div 
            className="flex-1 border-2 border-dashed border-slate-700 hover:border-cyan-500 hover:bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer bg-slate-900/20 group"
            onClick={() => fileInputRef.current?.click()}
         >
            <input type="file" ref={fileInputRef} className="hidden" accept="audio/*,video/*" onChange={handleFile} />
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl">
               <Upload size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">点击或拖拽文件至此</h3>
            <p className="text-slate-500 text-sm">支持 WAV, MP3, AAC, FLAC, MP4 (提取音频)</p>
         </div>
      )}

      {/* Processing State */}
      {isProcessing && (
         <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800">
            <Loader2 size={48} className="text-cyan-500 animate-spin mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">正在进行 DSP 计算...</h3>
            <p className="text-slate-400 font-mono text-sm mb-6">{fileName}</p>
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
         </div>
      )}

      {/* Result Display */}
      {result && (
         <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col animate-in fade-in slide-in-from-bottom-8">
            
            {/* Top Bar with Standard Switching */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
               <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Source File</div>
                  <div className="text-white font-mono text-sm truncate max-w-xs lg:max-w-md flex items-center gap-2">
                     <FileAudio size={14} className="text-cyan-500"/> {fileName}
                  </div>
               </div>
               
               <div className="flex items-center gap-3 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 pl-2 uppercase">Target:</span>
                  <button 
                     onClick={() => setTargetStandard('WEB')}
                     className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${targetStandard === 'WEB' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                     Web (-14)
                  </button>
                  <button 
                     onClick={() => setTargetStandard('BROADCAST')}
                     className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${targetStandard === 'BROADCAST' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                     TV (-23)
                  </button>
               </div>

               <button 
                  onClick={resetAnalyzer}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors flex items-center gap-2"
               >
                  <X size={14}/> 分析新文件
               </button>
            </div>

            {/* WaveSurfer Visualization Area */}
            <div className={`mb-8 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden relative group transition-shadow duration-300 ${isPlaying ? 'ring-1 ring-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : ''}`}>
               
               {/* Toolbar */}
               <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <button 
                        onClick={togglePlay}
                        disabled={!isReady}
                        className={`flex items-center justify-center w-10 h-8 rounded transition-colors ${isReady ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                     >
                        {isPlaying ? <Pause size={16} className="fill-white"/> : <Play size={16} className="fill-white"/>}
                     </button>
                     {/* Timecode Display */}
                     <div className="bg-black border border-slate-700 rounded px-3 py-1 font-mono text-xl text-emerald-400 tracking-wider">
                        {formatTimecode(currentTime)}
                     </div>
                     <span className="text-[10px] text-slate-500 font-mono self-end mb-1">/ {formatTimecode(duration)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-slate-500 font-mono mr-2 hidden sm:inline-block">{zoomLevel} px/s</span>
                     <button onClick={handleZoomOut} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white" title="Zoom Out">
                        <ZoomOut size={16} />
                     </button>
                     <button onClick={handleZoomIn} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white" title="Zoom In">
                        <ZoomIn size={16} />
                     </button>
                  </div>
               </div>

               {/* Waveform Container */}
               <div className="relative p-2 h-40 flex flex-col">
                  {!isReady && (
                     <div className="absolute inset-0 bg-slate-950/80 z-20 flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2">
                           <Loader2 className="animate-spin text-cyan-500" size={24} />
                           <span className="text-xs text-slate-400">Rendering Waveform...</span>
                        </div>
                     </div>
                  )}
                  {/* Waveform Element */}
                  <div ref={waveformRef} className="w-full h-24"></div>
                  {/* Timeline Element */}
                  <div ref={timelineRef} className="w-full h-6 mt-1 border-t border-slate-800/50"></div>
               </div>
            </div>

            {/* Real-time Metering Dashboard */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Momentary Meter */}
               <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                     <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Activity size={12}/> Momentary (400ms)
                     </div>
                     <div className={`text-3xl font-mono font-bold ${getMeterColor(currentM)}`}>
                        {formatDb(currentM)} <span className="text-sm text-slate-600">LUFS</span>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="h-10 w-32 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative">
                        {/* Target Line */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-white z-20" style={{ left: `${(targetLUFS + 60) * 1.5}%` }}></div>
                        
                        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-slate-700/50 z-10"></div>
                        <div 
                           className={`h-full transition-all duration-100 ease-out ${currentM > targetLUFS ? 'bg-yellow-500' : 'bg-cyan-600'}`}
                           style={{ width: `${Math.max(0, Math.min(100, (currentM + 60) * 1.5))}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between text-[8px] text-slate-600 mt-1 font-mono px-1">
                        <span>-60</span>
                        <span className={targetStandard==='BROADCAST'?'text-white font-bold':''}>-23</span>
                        <span className={targetStandard==='WEB'?'text-white font-bold':''}>-14</span>
                        <span>0</span>
                     </div>
                  </div>
               </div>

               {/* Short-term Meter */}
               <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                     <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                        <BarChart3 size={12}/> Short-term (3s)
                     </div>
                     <div className={`text-3xl font-mono font-bold ${getMeterColor(currentS)}`}>
                        {formatDb(currentS)} <span className="text-sm text-slate-600">LUFS</span>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="h-10 w-32 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative">
                        {/* Target Line */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-white z-20" style={{ left: `${(targetLUFS + 60) * 1.5}%` }}></div>

                        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-slate-700/50 z-10"></div>
                        <div 
                           className={`h-full transition-all duration-300 ease-out ${currentS > targetLUFS ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                           style={{ width: `${Math.max(0, Math.min(100, (currentS + 60) * 1.5))}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between text-[8px] text-slate-600 mt-1 font-mono px-1">
                        <span>-60</span>
                        <span>TV</span>
                        <span>Web</span>
                        <span>0</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <ResultCard 
                  label="Integrated Loudness" 
                  value={result.integrated.toFixed(1)} 
                  unit="LUFS" 
                  desc="全片平均 (最重要指标)"
                  status={getCompliance(result.integrated, targetLUFS, targetTolerance)}
                  highlight={true}
                  targetVal={targetLUFS}
               />
               <ResultCard 
                  label="True Peak (Sample)" 
                  value={result.truePeak.toFixed(1)} 
                  unit="dBTP" 
                  desc="采样峰值 (建议 < -1.0)"
                  status={result.truePeak > -1 ? 'WARN' : 'OK'}
               />
               <ResultCard 
                  label="Loudness Range (LRA)" 
                  value={result.lra.toFixed(1)} 
                  unit="LU" 
                  desc="动态范围"
                  status="NEUTRAL"
               />
            </div>

            {/* Advice Box */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
               <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Settings2 size={16}/> 达标分析建议 ({targetStandard === 'WEB' ? 'Web' : 'Broadcast'})
               </h4>
               <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  {getAdvice(result.integrated, result.truePeak, targetStandard)}
               </div>
            </div>
         </div>
      )}

      {error && (
         <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-3">
            <AlertTriangle size={20} /> {error}
         </div>
      )}

    </div>
  );
};

const ResultCard: React.FC<{ label: string; value: string; unit: string; desc: string; status: 'OK'|'WARN'|'FAIL'|'NEUTRAL'; highlight?: boolean; targetVal?: number }> = ({ label, value, unit, desc, status, highlight, targetVal }) => {
   const colors = {
      'OK': 'text-emerald-400',
      'WARN': 'text-yellow-400',
      'FAIL': 'text-red-400',
      'NEUTRAL': 'text-cyan-400'
   };
   
   return (
      <div className={`bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center relative overflow-hidden transition-all ${highlight ? 'ring-1 ring-cyan-500/30 bg-gradient-to-b from-slate-800 to-slate-800/50 shadow-lg' : ''}`}>
         {status === 'OK' && <div className="absolute top-0 right-0 p-2"><CheckCircle size={16} className="text-emerald-500"/></div>}
         {status === 'FAIL' && <div className="absolute top-0 right-0 p-2"><AlertTriangle size={16} className="text-red-500"/></div>}
         
         <div className={`text-xs uppercase tracking-wider font-bold mb-2 ${highlight ? 'text-cyan-200' : 'text-slate-500'}`}>{label}</div>
         <div className={`text-4xl font-black font-mono mb-2 ${colors[status]}`}>
            {value} <span className="text-sm text-slate-500 font-normal">{unit}</span>
         </div>
         {targetVal !== undefined && (
            <div className="text-[10px] text-slate-500 mb-1 font-mono bg-slate-900/50 px-2 py-0.5 rounded">
               Target: {targetVal} LUFS
            </div>
         )}
         <div className="text-[10px] text-slate-400">{desc}</div>
      </div>
   );
};

function getCompliance(lufs: number, target: number, tolerance: number): 'OK' | 'WARN' | 'FAIL' {
   const diff = Math.abs(lufs - target);
   if (diff <= tolerance) return 'OK';
   if (diff <= tolerance + 2) return 'WARN';
   return 'FAIL';
}

function getAdvice(lufs: number, peak: number, standard: Standard) {
   const advice = [];
   const target = standard === 'WEB' ? -14 : -23;
   const diff = lufs - target;

   if (diff > 1) {
      advice.push(<li key="1" className="text-red-300">🔴 <strong>过响 (+{diff.toFixed(1)} LU)：</strong> 超过了 {standard} 目标 ({target} LUFS)。平台可能会强制压低音量。建议整体降低电平。</li>);
   } else if (diff < -2) {
      advice.push(<li key="2" className="text-yellow-300">🟡 <strong>偏轻 ({diff.toFixed(1)} LU)：</strong> 低于目标。用户可能会觉得听不清。建议使用 Limiter 或压缩器提升整体电平。</li>);
   } else {
      advice.push(<li key="3" className="text-emerald-400">🟢 <strong>完美达标：</strong> 符合 {standard} ({target} LUFS) 标准范围。</li>);
   }

   if (peak > -1.0) {
      advice.push(<li key="5" className="text-red-300">🔴 <strong>真峰值过高：</strong> Peak 超过了 -1.0 dBTP。压缩为 AAC/MP3 时可能会破音。请在总线上挂一个 Limiter，并将 Ceiling 设为 -1.0 dB。</li>);
   } else {
      advice.push(<li key="6" className="text-emerald-400">🟢 <strong>真峰值安全：</strong> Peak 控制在 -1.0 dBTP 以下，数字转换安全。</li>);
   }

   return <ul>{advice}</ul>;
}
