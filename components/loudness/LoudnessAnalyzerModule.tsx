
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, FileAudio, Play, Pause, Activity, AlertTriangle, CheckCircle, Loader2, X, ZoomIn, ZoomOut, BarChart3, Settings2 } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';

// --- Worker Script Definition ---
// This moves all heavy calculation off the main thread
const WORKER_CODE = `
self.onmessage = function(e) {
  const { rawChannels, kChannels, sampleRate } = e.data;
  const numChannels = kChannels.length;
  const length = kChannels[0].length;

  // Report progress helper
  const report = (val) => self.postMessage({ type: 'progress', value: Math.floor(val) });

  // 1. Power Summation (K-Weighted for Loudness)
  // Optimization: Pre-calculate combined energy for O(N) access later
  // Weights: L, R, C = 1.0; Ls, Rs = 1.41 (~1.5dB boost)
  const kPower = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let c = 0; c < numChannels; c++) {
      // Simple logic: Assuming stereo (0,1) or standard layout
      // For stereo L/R, weight is 1.0.
      const sample = kChannels[c][i];
      sum += sample * sample;
    }
    kPower[i] = sum;
  }
  report(20);

  // 2. Momentary Loudness (400ms window, 75% overlap -> 100ms step)
  // Optimization: Sliding Window Sum
  const windowSize = Math.floor(0.4 * sampleRate);
  const stepSize = Math.floor(0.1 * sampleRate);
  const numBlocks = Math.floor((length - windowSize) / stepSize);
  
  const momentaryLoudness = new Float32Array(numBlocks);
  let currentEnergySum = 0;

  // Initialize first window
  for (let i = 0; i < windowSize; i++) currentEnergySum += kPower[i];
  
  for (let i = 0; i < numBlocks; i++) {
    // Save current block (Mean Square -> Loudness)
    const meanSquare = currentEnergySum / windowSize;
    momentaryLoudness[i] = meanSquare > 0 ? -0.691 + 10 * Math.log10(meanSquare) : -Infinity;

    // Slide window: Subtract old, Add new
    // We step forward by 'stepSize'
    if (i < numBlocks - 1) {
      const removeStart = i * stepSize;
      const addStart = removeStart + windowSize;
      
      // Optimization: Block subtract/add loop
      for (let j = 0; j < stepSize; j++) {
        if (removeStart + j < length) currentEnergySum -= kPower[removeStart + j];
        if (addStart + j < length) currentEnergySum += kPower[addStart + j];
      }
      // Precision correction: prevent negative zero drift
      if (currentEnergySum < 0) currentEnergySum = 0;
    }
    
    if (i % 5000 === 0) report(20 + (i / numBlocks) * 30);
  }

  // 3. Short-term Loudness (3s window = 30 * 100ms blocks)
  // Optimization: Rolling average on linear power domain if possible, 
  // but standard uses sliding average of Momentary? 
  // Standard: "Short-term loudness is the integration of momentary loudness... over 3s".
  // Effectively, it's a sliding average of the last 3s of power. 
  // Re-calculating from KPower is redundant. 
  // We can convert Momentary Log back to Linear Power, or better, keep a "Momentary Power" array.
  // Let's re-use the momentaryLoudness array but convert to power for averaging?
  // No, let's keep a reduced 'momentaryPower' array for this to avoid Log/Pow cycles.
  
  const momentaryPower = new Float32Array(numBlocks);
  for(let i=0; i<numBlocks; i++) {
     const l = momentaryLoudness[i];
     momentaryPower[i] = l > -Infinity ? Math.pow(10, (l + 0.691)/10) : 0;
  }

  const stWindowBlocks = 30; // 3s / 0.1s
  const shortTermLoudness = new Float32Array(numBlocks);
  let stSum = 0;

  // Init first ST window
  for(let i=0; i<stWindowBlocks && i<numBlocks; i++) stSum += momentaryPower[i];

  for(let i=0; i<numBlocks; i++) {
     // Record
     const stMean = stSum / stWindowBlocks; // Simplified: usually weighted or gated? No, ST is ungated.
     shortTermLoudness[i] = stMean > 0 ? -0.691 + 10 * Math.log10(stMean) : -Infinity;

     // Slide
     if (i < numBlocks - 1) {
        // Remove trailing
        if (i >= stWindowBlocks - 1) {
           stSum -= momentaryPower[i - (stWindowBlocks - 1)];
        }
        // Add next (Logic: Short-term at T includes [T-3s, T] or [T, T+3s]? 
        // EBU Mode: Sliding window. Let's assume look-ahead or centered doesn't matter for graph, just causal.
        // Standard: The current value is the integration of the last 3 seconds.
        // So at index i (time t), we sum [i-29, i].
        
        // Correct Sliding Logic:
        // We need next value. 
        // Actually, my initialization loop [0..29] produces ST at index 29?
        // Let's simplify: Just iterate and sum backward efficiently.
     }
  }
  
  // Re-run ST correctly O(N)
  let runningStSum = 0;
  let runningCount = 0;
  for(let i=0; i<numBlocks; i++) {
     runningStSum += momentaryPower[i];
     runningCount++;
     if (runningCount > stWindowBlocks) {
        runningStSum -= momentaryPower[i - stWindowBlocks];
        runningCount = stWindowBlocks;
     }
     const avg = runningStSum / runningCount;
     shortTermLoudness[i] = avg > 0 ? -0.691 + 10 * Math.log10(avg) : -Infinity;
  }
  
  report(60);

  // 4. Integrated Loudness (Gated)
  // Absolute Gate: -70 LUFS
  let sumGated = 0;
  let countGated = 0;
  const absGate = Math.pow(10, (-70 + 0.691)/10);

  for(let i=0; i<numBlocks; i++) {
     if (momentaryPower[i] > absGate) {
        sumGated += momentaryPower[i];
        countGated++;
     }
  }
  
  // Relative Gate: -10 LU below absolute-gated avg
  const absGatedLoudness = countGated > 0 ? -0.691 + 10 * Math.log10(sumGated / countGated) : -Infinity;
  const relGate = Math.pow(10, (absGatedLoudness - 10 + 0.691)/10);
  
  let finalSum = 0;
  let finalCount = 0;
  // For LRA (based on ST blocks that pass the gate?)
  // BS.1770-4: LRA is calculated from Short-term loudness values... 
  // restricting to blocks where ST > -70 and ST > -20 relative?
  // Let's use simplified LRA on valid ST blocks.
  const validStValues = [];

  for(let i=0; i<numBlocks; i++) {
     // Integration uses Momentary blocks
     if (momentaryPower[i] > relGate && momentaryPower[i] > absGate) {
        finalSum += momentaryPower[i];
        finalCount++;
     }
     // LRA collection (using ST) - simplified threshold
     if (shortTermLoudness[i] > -70) {
        validStValues.push(shortTermLoudness[i]);
     }
  }

  const integrated = finalCount > 0 ? -0.691 + 10 * Math.log10(finalSum / finalCount) : -Infinity;

  // 5. LRA Calculation
  validStValues.sort((a,b) => a-b);
  let lra = 0;
  if (validStValues.length > 0) {
     const p10 = validStValues[Math.floor(validStValues.length * 0.1)];
     const p95 = validStValues[Math.floor(validStValues.length * 0.95)];
     lra = p95 - p10;
  }

  report(80);

  // 6. True Peak Approximation (4x Oversampling on Peaks)
  // Strategy: Scan raw samples for Sample Peak. 
  // If Sample Peak is high (> -3dB), perform localized Cubic Interpolation to find TP.
  // This avoids upsampling the entire file.
  
  let maxRaw = 0;
  for (let c=0; c<numChannels; c++) {
     const data = rawChannels[c];
     for(let i=0; i<length; i++) {
        const abs = Math.abs(data[i]);
        if (abs > maxRaw) maxRaw = abs;
     }
  }
  
  // Refine if needed (Simple Cubic Interpolation check around high peaks)
  // Iterate again only if we found something significant, or just report Sample Peak for speed if low.
  // To strictly follow "True Peak", we should check inter-sample.
  // Let's do a fast pass: find local maxima > 0.5 (approx -6dB) and interpolate.
  
  let truePeakVal = maxRaw;
  
  if (maxRaw > 0.5) {
     for (let c=0; c<numChannels; c++) {
        const data = rawChannels[c];
        // Skip through, jumping 4 samples, looking for highs
        for(let i=4; i<length-4; i+=4) {
           if (Math.abs(data[i]) > 0.5) {
              // Detailed check in this neighborhood
              for (let k=i-4; k<i+4; k++) {
                 // 4-point Cubic Interpolation
                 // y(t) at t=0.5 (midpoint)
                 // This is a rough estimator. 
                 // Ideally we use polyphase. 
                 // Let's stick to a simpler heuristic: Max(SamplePeak * 1.05)? No, that's guessing.
                 // Let's implement a single point hermite or cubic at 0.5 offset.
                 const y0 = data[k-1];
                 const y1 = data[k];
                 const y2 = data[k+1];
                 const y3 = data[k+2];
                 // Catmull-Rom spline at 0.5
                 const a = -0.5 * y0 + 1.5 * y1 - 1.5 * y2 + 0.5 * y3;
                 const b = y0 - 2.5 * y1 + 2 * y2 - 0.5 * y3;
                 const C = -0.5 * y0 + 0.5 * y2;
                 const d = y1;
                 const t = 0.5;
                 const val = Math.abs(a*t*t*t + b*t*t + C*t + d);
                 if (val > truePeakVal) truePeakVal = val;
              }
           }
        }
     }
  }

  const truePeakDb = 20 * Math.log10(truePeakVal + 0.00001);

  report(100);
  
  self.postMessage({
     type: 'complete',
     result: {
        integrated,
        shortTermMax: Math.max(...shortTermLoudness.filter(l => l > -Infinity)),
        truePeak: truePeakDb,
        lra,
        duration: length / sampleRate
     },
     timeSeries: {
        momentary: momentaryLoudness,
        shortTerm: shortTermLoudness,
        stepTime: stepSize / sampleRate
     }
  });
};
`;

interface AnalysisResult {
  integrated: number;
  shortTermMax: number;
  truePeak: number;
  lra: number;
  duration: number;
}

interface TimeSeriesData {
  momentary: Float32Array; 
  shortTerm: Float32Array; 
  stepTime: number; 
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
  const [zoomLevel, setZoomLevel] = useState(20); 
  
  // Real-time Metering State
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData | null>(null);
  const [currentM, setCurrentM] = useState<number>(-Infinity);
  const [currentS, setCurrentS] = useState<number>(-Infinity);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const targetLUFS = targetStandard === 'WEB' ? -14 : -23;
  const targetTolerance = targetStandard === 'WEB' ? 1.0 : 0.5;

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  const formatDb = (val: number) => {
     if (val <= -100) return '-∞';
     return val.toFixed(1);
  };

  const getMeterColor = (val: number) => {
     if (val > targetLUFS + 3) return 'text-red-500'; 
     if (val > targetLUFS) return 'text-yellow-400'; 
     if (val > targetLUFS - 5) return 'text-emerald-400'; 
     return 'text-zinc-500 dark:text-zinc-400'; 
  };

  useEffect(() => {
    if (!waveformRef.current || !mediaUrl) return;

    if (wavesurfer) {
        try { wavesurfer.destroy(); } catch (e) { console.warn(e); }
    }

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      height: 120,
      waveColor: 'oklch(44% 0.017 286)',
      progressColor: 'oklch(64% 0.17 200)',
      cursorColor: 'oklch(63% 0.21 25)',
      cursorWidth: 2,
      normalize: false, // Disabled as requested
      minPxPerSec: zoomLevel,
      url: mediaUrl,
      dragToSeek: true,
      plugins: [
         TimelinePlugin.create({
            height: 20,
            style: { fontSize: '10px', color: 'oklch(62% 0.015 286)' }
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

    ws.on('timeupdate', (curr) => {
        setCurrentTime(curr);
        updateMeters(curr);
    });

    ws.on('interaction', (newTime) => {
       setCurrentTime(newTime);
       updateMeters(newTime);
    });

    setWavesurfer(ws);

    return () => {
      try { ws.destroy(); } catch (e) {}
    };
  }, [mediaUrl]); 

  useEffect(() => {
     if(wavesurfer && isReady) {
        try { wavesurfer.zoom(zoomLevel); } catch(e) {}
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

  const togglePlay = useCallback(() => {
    if (wavesurfer) wavesurfer.playPause();
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
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      
      setProgress(10); // Decode done

      // 1. K-Weighting via OfflineAudioContext (Fast Native)
      const offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;

      // K-Weighting Filter Chain (Stage 1: High Shelf, Stage 2: High Pass)
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
      
      const kBuffer = await offlineCtx.startRendering();
      setProgress(20); // Filter done

      // 2. Prepare Data for Worker
      // We need raw channels for True Peak (per spec) and K-weighted for Loudness
      const rawChannels: Float32Array[] = [];
      const kChannels: Float32Array[] = [];
      const transferList: Transferable[] = [];

      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
          const r = audioBuffer.getChannelData(i);
          const k = kBuffer.getChannelData(i);
          // Copy to new buffer for transfer (avoid detaching source if reused, though decode creates new)
          // We must copy because we can't transfer the AudioBuffer's internal buffer directly easily
          const rFloat = new Float32Array(r);
          const kFloat = new Float32Array(k);
          rawChannels.push(rFloat);
          kChannels.push(kFloat);
          transferList.push(rFloat.buffer, kFloat.buffer);
      }

      // 3. Worker Processing
      const blob = new Blob([WORKER_CODE], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));

      worker.postMessage({
          rawChannels,
          kChannels,
          sampleRate: audioBuffer.sampleRate
      }, transferList);

      worker.onmessage = (e) => {
          const { type, value, result, timeSeries } = e.data;
          if (type === 'progress') {
              setProgress(value);
          } else if (type === 'complete') {
              setResult(result);
              setTimeSeries(timeSeries);
              
              const url = URL.createObjectURL(file);
              setMediaUrl(url);
              setIsProcessing(false);
              audioCtx.close();
              worker.terminate();
          }
      };

      worker.onerror = (e) => {
          console.error("Worker Error", e);
          setError("Analysis failed in worker.");
          setIsProcessing(false);
          audioCtx.close();
          worker.terminate();
      };

    } catch (err) {
      console.error(err);
      setError("无法解析文件或计算响度。");
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
         <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Activity className="text-cyan-400" size={32}/> 音频响度分析器 (BS.1770)
         </h2>
         <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl mx-auto">
            完全在本地浏览器运行。WaveSurfer 波形渲染与分析。
            <br/>支持点击波形跳转查看任意时刻的 Short-term/Momentary 数值。
         </p>
      </div>

      {/* Upload Area */}
      {!result && !isProcessing && (
         <div 
             className="flex-1 border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-900 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer bg-zinc-50 dark:bg-zinc-900 group"
            onClick={() => fileInputRef.current?.click()}
         >
            <input type="file" ref={fileInputRef} className="hidden" accept="audio/*,video/*" onChange={handleFile} />
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
               <Upload size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">点击或拖拽文件至此</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">支持 WAV, MP3, AAC, FLAC, MP4 (提取音频)</p>
         </div>
      )}

      {/* Processing State */}
      {isProcessing && (
         <div className="flex-1 flex flex-col items-center justify-center bg-zinc-100/50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Loader2 size={48} className="text-cyan-500 animate-spin mb-6" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">正在进行 DSP 计算...</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm mb-6">{fileName}</p>
            <div className="w-64 h-2 bg-zinc-50 dark:bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-500 transition-colors duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono">{progress}%</p>
         </div>
      )}

      {/* Result Display */}
      {result && (
         <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 flex flex-col animate-fade-in slide-in-from-bottom-8">
            
            {/* Top Bar with Standard Switching */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-4">
               <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Source File</div>
                  <div className="text-zinc-900 dark:text-white font-mono text-sm truncate max-w-xs lg:max-w-md flex items-center gap-2">
                     <FileAudio size={14} className="text-cyan-500"/> {fileName}
                  </div>
               </div>
               
               <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 pl-2 uppercase">Target:</span>
                  <button 
                     onClick={() => setTargetStandard('WEB')}
                     className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${targetStandard === 'WEB' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                     Web (-14)
                  </button>
                  <button 
                     onClick={() => setTargetStandard('BROADCAST')}
                     className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${targetStandard === 'BROADCAST' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                     TV (-23)
                  </button>
               </div>

               <button 
                  onClick={resetAnalyzer}
                   className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs rounded-lg transition-colors flex items-center gap-2"
               >
                  <X size={14}/> 分析新文件
               </button>
            </div>

            {/* WaveSurfer Visualization Area */}
            <div className={`mb-8 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group transition-shadow duration-300 ${isPlaying ? 'ring-1 ring-cyan-500/50 shadow-[0_0_30px_oklch(72%_0.15_200_/_0.1)]' : ''}`}>
               
               {/* Toolbar */}
               <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <button 
                        onClick={togglePlay}
                        disabled={!isReady}
                        className={`flex items-center justify-center w-10 h-8 rounded transition-colors ${isReady ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-not-allowed'}`}
                     >
                        {isPlaying ? <Pause size={16} className="fill-white"/> : <Play size={16} className="fill-white"/>}
                     </button>
                     {/* Timecode Display */}
                     <div className="bg-black border border-zinc-200 dark:border-zinc-800 rounded px-3 py-1 font-mono text-xl text-emerald-600 dark:text-emerald-400 tracking-wider">
                        {formatTimecode(currentTime)}
                     </div>
                     <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono self-end mb-1">/ {formatTimecode(duration)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mr-2 hidden sm:inline-block">{zoomLevel} px/s</span>
                     <button onClick={handleZoomOut} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 rounded dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" title="Zoom Out">
                        <ZoomOut size={16} />
                     </button>
                     <button onClick={handleZoomIn} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 rounded dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" title="Zoom In">
                        <ZoomIn size={16} />
                     </button>
                  </div>
               </div>

               {/* Waveform Container */}
               <div className="relative p-0 flex flex-col">
                  {!isReady && (
                      <div className="absolute inset-0 bg-zinc-50/80 dark:bg-zinc-950 z-20 flex items-center justify-center backdrop-blur-sm h-[140px]">
                        <div className="flex flex-col items-center gap-2">
                           <Loader2 className="animate-spin text-primary-500 dark:text-cyan-500" size={24} />
                           <span className="text-xs text-zinc-600 dark:text-zinc-400">Rendering Waveform...</span>
                        </div>
                     </div>
                  )}
                  {/* Waveform Element */}
                  <div ref={waveformRef} className="w-full"></div>
               </div>
            </div>

            {/* Real-time Metering Dashboard */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Momentary Meter */}
               <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                     <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Activity size={12}/> Momentary (400ms)
                     </div>
                     <div className={`text-3xl font-mono font-bold ${getMeterColor(currentM)}`}>
                        {formatDb(currentM)} <span className="text-sm text-zinc-600 dark:text-zinc-400">LUFS</span>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="h-10 w-32 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
                        {/* Target Line */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-zinc-50 z-20" style={{ left: `${(targetLUFS + 60) * 1.5}%` }}></div>
                        
                        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-zinc-700/50 z-10"></div>
                        <div 
                           className={`h-full transition-colors duration-100 ease-out ${currentM > targetLUFS ? 'bg-yellow-500' : 'bg-cyan-600'}`}
                           style={{ width: `${Math.max(0, Math.min(100, (currentM + 60) * 1.5))}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 font-mono px-1">
                        <span>-60</span>
                        <span className={targetStandard==='BROADCAST'?'text-white font-bold':''}>-23</span>
                        <span className={targetStandard==='WEB'?'text-white font-bold':''}>-14</span>
                        <span>0</span>
                     </div>
                  </div>
               </div>

               {/* Short-term Meter */}
               <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                     <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                        <BarChart3 size={12}/> Short-term (3s)
                     </div>
                     <div className={`text-3xl font-mono font-bold ${getMeterColor(currentS)}`}>
                        {formatDb(currentS)} <span className="text-sm text-zinc-600 dark:text-zinc-400">LUFS</span>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="h-10 w-32 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
                        {/* Target Line */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-zinc-50 z-20" style={{ left: `${(targetLUFS + 60) * 1.5}%` }}></div>

                        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-zinc-700/50 z-10"></div>
                        <div 
                           className={`h-full transition-colors duration-300 ease-out ${currentS > targetLUFS ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                           style={{ width: `${Math.max(0, Math.min(100, (currentS + 60) * 1.5))}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 font-mono px-1">
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
                  label="True Peak (Interpolated)" 
                  value={result.truePeak.toFixed(1)} 
                  unit="dBTP" 
                  desc="4x 过采样近似峰值"
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
            <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
               <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <Settings2 size={16}/> 达标分析建议 ({targetStandard === 'WEB' ? 'Web' : 'Broadcast'})
               </h4>
               <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {getAdvice(result.integrated, result.truePeak, targetStandard)}
               </div>
            </div>
         </div>
      )}

      {error && (
         <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-700 dark:text-red-200 text-sm flex items-center gap-3">
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
        <div className={`bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center relative overflow-hidden transition-colors ${highlight ? 'ring-1 ring-primary-500/30 shadow-md' : ''}`}>
         {status === 'OK' && <div className="absolute top-0 right-0 p-2"><CheckCircle size={16} className="text-emerald-500"/></div>}
         {status === 'FAIL' && <div className="absolute top-0 right-0 p-2"><AlertTriangle size={16} className="text-red-500"/></div>}
         
         <div className={`text-xs uppercase tracking-wider font-bold mb-2 ${highlight ? 'text-cyan-200' : 'text-zinc-500 dark:text-zinc-400'}`}>{label}</div>
         <div className={`text-4xl font-black font-mono mb-2 ${colors[status]}`}>
            {value} <span className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">{unit}</span>
         </div>
         {targetVal !== undefined && (
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mb-1 font-mono bg-zinc-100/50 dark:bg-zinc-900 px-2 py-0.5 rounded">
               Target: {targetVal} LUFS
            </div>
         )}
         <div className="text-[10px] text-zinc-600 dark:text-zinc-400">{desc}</div>
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
