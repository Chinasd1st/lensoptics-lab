
import React, { useState, useEffect } from 'react';
import { Slider } from './Controls';
import { Camera, Aperture, Timer, Activity, Lock } from 'lucide-react';

export const ExposureModesModule: React.FC = () => {
  const [mode, setMode] = useState<'P' | 'A' | 'S' | 'M'>('M');
  const [aperture, setAperture] = useState(2.8);
  const [shutter, setShutter] = useState(60); // 1/x
  const [iso, setIso] = useState(800);
  const [evComp, setEvComp] = useState(0);

  // Target EV for simulation (auto exposure target)
  const targetEV = 13; 

  // Auto Exposure Logic
  useEffect(() => {
    // Basic EV formula approximation: EV = log2(N^2 / t) - log2(ISO/100)
    // We reverse it to solve for missing variables.
    
    // Calculate current EV based on settings
    const calculateCurrentEV = (n: number, t: number, i: number) => {
       return Math.log2((n * n) / (1/t)) - Math.log2(i / 100);
    };

    if (mode === 'P') {
       // P mode: Camera sets Aperture and Shutter based on EV and ISO
       // Simplistic curve: Try to keep shutter > 60 and aperture balanced
       const requiredEV = targetEV + evComp; 
       // If ISO 100, EV 13 ~ f/8 + 1/125 roughly
       // Let's simplified algorithm
       const isoGain = Math.log2(iso/100);
       const lightValue = requiredEV - isoGain; // Total light needed needed from lens/shutter
       
       // Heuristic: Set Aperture to f/4 or f/5.6 and calculate shutter
       const newAp = 4.0;
       const newShutter = Math.pow(2, lightValue) / (newAp * newAp);
       
       setAperture(newAp);
       setShutter(Math.round(newShutter));
    }
    else if (mode === 'A') {
       // Aperture Priority: User sets Aperture, Camera sets Shutter
       const requiredEV = targetEV + evComp;
       const isoGain = Math.log2(iso/100);
       // EV = log2(N^2 * shutter) - isoGain
       // shutter = 2^(EV + isoGain) / N^2
       const val = Math.pow(2, requiredEV - isoGain);
       const neededShutter = val / (aperture * aperture);
       setShutter(Math.max(1, Math.round(neededShutter)));
    }
    else if (mode === 'S') {
       // Shutter Priority: User sets Shutter, Camera sets Aperture
       const requiredEV = targetEV + evComp;
       const isoGain = Math.log2(iso/100);
       // EV = log2(N^2 * shutter) - isoGain
       // N^2 = 2^(EV + isoGain) / shutter
       const val = Math.pow(2, requiredEV - isoGain);
       const neededApSq = val / shutter; // wait, equation check. 
       // EV = log2(N^2) + log2(shutter) ... 
       // Correct: 2^EV = (N^2 / t) / (S/100)
       // Let's use simple exposure value: Light entering = N^2 / t
       // N = sqrt( t * 2^(EV + log2(ISO/100)) ) ? No.
       
       // Re-derive: N = sqrt( (1/t) * ISO/100 / 2^EV ) ? No.
       
       // Let's stick to standard AV+TV = EV + SV
       // AV (Aperture Value) = log2(N^2)
       // TV (Time Value) = log2(1/t)
       // SV (Speed Value) = log2(ISO/100)
       // EV (Scene) = AV + TV - SV
       
       // Solve for AV: AV = EV + SV - TV
       const sv = Math.log2(iso/100);
       const tv = Math.log2(shutter);
       const av = (targetEV + evComp) + sv - tv;
       const neededAp = Math.sqrt(Math.pow(2, av));
       
       setAperture(Math.min(22, Math.max(1.2, parseFloat(neededAp.toFixed(1)))));
    }
  }, [mode, aperture, shutter, iso, evComp]); // Dependencies depend on mode

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Visual Representation */}
      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 relative">
         {/* Mode Dial Visual */}
         <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-800 shadow-2xl flex items-center justify-center transform rotate-12 transition-all">
            <div className="absolute inset-0 rounded-full border border-slate-600 border-dashed opacity-20"></div>
            <div className="text-3xl font-black text-white">{mode}</div>
            <div className="absolute -top-3 w-1 h-3 bg-red-500 rounded"></div>
         </div>

         <div className="relative w-full max-w-xl aspect-video bg-black rounded-lg overflow-hidden border-8 border-slate-800 shadow-inner">
            {/* Simulated Scene brightness based on settings vs target */}
            {(() => {
               // Calculate exposure deviation for M mode visualization
               const sv = Math.log2(iso/100);
               const tv = Math.log2(shutter);
               const av = Math.log2(aperture * aperture);
               const exposureVal = av + tv - sv;
               const diff = exposureVal - targetEV; // If exposureVal > targetEV, image is darker (higher EV requirement). Wait.
               // EV = AV + TV - SV. 
               // High EV = Bright Scene. 
               // Camera settings EV (EV_s) should match Scene EV (EV_scene).
               // If EV_s < EV_scene, overexposed. If EV_s > EV_scene, underexposed.
               
               const brightness = Math.pow(2, -(diff)); // Invert logic for brightness
               
               return (
                  <>
                     <div className="absolute inset-0 bg-cover bg-center transition-all duration-200" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2000)',
                        filter: `brightness(${brightness}) blur(${mode === 'A' || mode === 'M' ? Math.max(0, 2.8 - aperture) * 2 : 0}px)`
                     }}></div>
                     
                     {/* HUD */}
                     <div className="absolute bottom-0 w-full h-12 bg-black/80 flex items-center justify-around text-cyan-400 font-mono text-xs px-4">
                        <div className={`flex flex-col items-center ${mode === 'S' || mode === 'P' ? 'text-yellow-400' : ''}`}>
                           <span className="text-[9px] text-slate-500">IRIS</span>
                           <span className="font-bold">f/{aperture.toFixed(1)}</span>
                        </div>
                        <div className={`flex flex-col items-center ${mode === 'A' || mode === 'P' ? 'text-yellow-400' : ''}`}>
                           <span className="text-[9px] text-slate-500">SHUTTER</span>
                           <span className="font-bold">1/{Math.round(shutter)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                           <span className="text-[9px] text-slate-500">ISO</span>
                           <span className="font-bold">{iso}</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-slate-700 pl-4">
                           <span className="text-[9px] text-slate-500">M.M.</span>
                           <span className={`font-bold ${Math.abs(diff) > 2 ? 'text-red-500' : 'text-white'}`}>
                              {diff > 0 ? '-' : '+'}{Math.abs(diff).toFixed(1)}
                           </span>
                        </div>
                     </div>
                  </>
               );
            })()}
         </div>
         
         <div className="mt-6 text-center max-w-md">
            <h2 className="text-xl font-bold text-white mb-2">
               {mode === 'P' && "P档：程序自动 (Program)"}
               {mode === 'A' && "A/Av档：光圈优先 (Aperture Priority)"}
               {mode === 'S' && "S/Tv档：快门优先 (Shutter Priority)"}
               {mode === 'M' && "M档：全手动 (Manual)"}
            </h2>
            <p className="text-xs text-slate-400">
               {mode === 'P' && "相机决定一切。适合“把脑子忘在家里”的随手拍。但你仍可调整 ISO 和曝光补偿。"}
               {mode === 'A' && "控制景深（虚化）的首选。你定光圈，相机定快门。适合人像、静物。"}
               {mode === 'S' && "控制运动感的首选。你定快门速度（凝固或拖影），相机定光圈。适合体育、流水。"}
               {mode === 'M' && "完全掌控。适合影棚闪光灯拍摄、长曝光星空，或光线极其复杂的环境。"}
            </p>
         </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 bg-slate-800 p-6 flex flex-col border-l border-slate-700">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Camera size={18}/> 模式转盘</h3>
         
         <div className="grid grid-cols-4 gap-2 mb-8">
            {['P', 'A', 'S', 'M'].map((m) => (
               <button 
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`aspect-square rounded-full font-black text-lg border-2 transition-all hover:scale-110 flex items-center justify-center
                     ${mode === m ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]' : 'bg-slate-700 border-slate-600 text-slate-400'}
                  `}
               >
                  {m}
               </button>
            ))}
         </div>

         <div className="space-y-6">
            <div className={`transition-opacity ${mode === 'S' || mode === 'P' ? 'opacity-50 pointer-events-none' : ''}`}>
               <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                     <Aperture size={12}/> 光圈 (Aperture)
                  </span>
                  { (mode === 'S' || mode === 'P') && <Lock size={10} className="text-yellow-500"/> }
               </div>
               <input type="range" min="1.4" max="22" step="0.1" value={aperture} onChange={e => setAperture(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>

            <div className={`transition-opacity ${mode === 'A' || mode === 'P' ? 'opacity-50 pointer-events-none' : ''}`}>
               <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                     <Timer size={12}/> 快门 (Shutter)
                  </span>
                  { (mode === 'A' || mode === 'P') && <Lock size={10} className="text-yellow-500"/> }
               </div>
               <input type="range" min="10" max="2000" step="10" value={shutter} onChange={e => setShutter(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>

            <div>
               <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                     <Activity size={12}/> ISO 感光度
                  </span>
               </div>
               <input type="range" min="100" max="12800" step="100" value={iso} onChange={e => setIso(parseFloat(e.target.value))} className="w-full accent-emerald-500 h-1 bg-slate-600 rounded appearance-none" />
            </div>

            {mode !== 'M' && (
               <div className="pt-4 border-t border-slate-700">
                  <Slider label="曝光补偿 (Exp. Comp)" value={evComp} min={-3} max={3} step={0.3} onChange={setEvComp} unit=" EV" />
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
