
import React, { useState } from 'react';
import { Palette } from 'lucide-react';

// --- 8. Color Science Simulator (Existing) ---
export const ColorScienceSimulator: React.FC = () => {
  const [profile, setProfile] = useState<'REC709' | 'LOG' | 'LUT'>('LOG');
  
  const getCurvePath = () => {
    if (profile === 'REC709') return "M 0,100 C 40,100 40,80 50,50 C 60,20 60,0 100,0";
    if (profile === 'LOG') return "M 0,90 Q 20,40 100,20";
    if (profile === 'LUT') return "M 0,100 C 30,100 30,70 50,50 C 70,30 70,0 100,0"; 
    return "";
  };

  return (
     <div className="flex flex-col lg:flex-row h-full">
        <div className="flex-1 bg-slate-950 flex flex-col">
           <div className="flex-1 relative overflow-hidden bg-black">
              <div 
                 className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                 style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop)',
                    filter: profile === 'LOG' 
                      ? 'contrast(0.6) brightness(1.2) saturate(0.5) sepia(0.2)' 
                      : profile === 'REC709' 
                        ? 'contrast(1.1) saturate(1.1)' 
                        : 'contrast(1.2) saturate(1.3)' 
                 }}
              />
              <div className="absolute top-4 left-4 bg-black/50 p-2 rounded text-white text-xs font-mono backdrop-blur">
                 Monitor: {profile === 'LOG' ? 'S-Log3 (Simulated)' : profile === 'LUT' ? 'S-Log3 + Official LUT' : 'Standard Rec.709'}
              </div>
           </div>

           <div className="h-48 bg-slate-900 border-t border-slate-800 p-4 flex gap-8">
              <div className="w-48 h-full relative border border-slate-700 bg-slate-950">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeDasharray="2" vectorEffect="non-scaling-stroke"/>
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeDasharray="2" vectorEffect="non-scaling-stroke"/>
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#334155" strokeDasharray="2" vectorEffect="non-scaling-stroke"/>
                    
                    <path d={getCurvePath()} fill="none" stroke={profile === 'LOG' ? '#94a3b8' : '#22d3ee'} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                 </svg>
                 <div className="absolute bottom-1 right-2 text-[9px] text-slate-500">Input (Light)</div>
                 <div className="absolute top-1 left-1 text-[9px] text-slate-500">Output (Value)</div>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-2">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-xs text-slate-400">暗部细节 (Shadows)</span>
                    <div className="h-1 flex-1 bg-slate-800 rounded overflow-hidden">
                       <div className="h-full bg-slate-600" style={{width: profile === 'LOG' ? '90%' : '40%'}}></div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <span className="text-xs text-slate-400">高光保留 (Highlights)</span>
                    <div className="h-1 flex-1 bg-slate-800 rounded overflow-hidden">
                       <div className="h-full bg-white" style={{width: profile === 'LOG' ? '95%' : '60%'}}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Palette size={18}/> 色彩流程</h3>

          <div className="space-y-2">
             <button 
                onClick={() => setProfile('REC709')}
                className={`w-full p-3 rounded border text-left text-xs ${profile === 'REC709' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-400'}`}
             >
                直出 (Standard / Rec.709)
                <div className="text-[9px] opacity-60 mt-1">对比度高，但高光易过曝，暗部易死黑。</div>
             </button>
             <button 
                onClick={() => setProfile('LOG')}
                className={`w-full p-3 rounded border text-left text-xs ${profile === 'LOG' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-400'}`}
             >
                Log 灰片 (Logarithmic)
                <div className="text-[9px] opacity-60 mt-1">画面发灰，通过对数曲线压缩光线，保留最大动态范围。必须后期调色。</div>
             </button>
             <button 
                onClick={() => setProfile('LUT')}
                className={`w-full p-3 rounded border text-left text-xs ${profile === 'LUT' ? 'bg-cyan-900 border-cyan-400 text-cyan-300' : 'border-slate-700 text-slate-400'}`}
             >
                加载 LUT (还原 709)
                <div className="text-[9px] opacity-60 mt-1">Look-Up Table。将 Log 的平坦数据映射回正确的颜色和对比度，同时保留了宽容度。</div>
             </button>
          </div>
        </div>
     </div>
  );
};
