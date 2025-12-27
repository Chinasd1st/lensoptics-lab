import React, { useState, useEffect, useRef } from 'react';
import { Waves, Mic, Activity, MoveHorizontal, Sliders, BoxSelect, Ear, CheckSquare, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export const QualityIndicatorsModule: React.FC = () => {
   const [activeSection, setActiveSection] = useState<number>(0);

   const sections = [
      { id: 0, title: '相位 (Phase)', icon: <Waves size={18}/>, color: 'text-red-400' },
      { id: 1, title: '声场 (Soundstage)', icon: <MoveHorizontal size={18}/>, color: 'text-blue-400' },
      { id: 2, title: '影视 EQ', icon: <Sliders size={18}/>, color: 'text-yellow-400' },
      { id: 3, title: '动态控制', icon: <Activity size={18}/>, color: 'text-emerald-400' },
      { id: 4, title: '空间感', icon: <BoxSelect size={18}/>, color: 'text-purple-400' },
      { id: 5, title: '底噪管理', icon: <Mic size={18}/>, color: 'text-slate-400' },
      { id: 6, title: '监听与交付', icon: <Ear size={18}/>, color: 'text-cyan-400' }
   ];

   return (
      <div className="max-w-6xl mx-auto h-full flex flex-col lg:flex-row gap-6">
         {/* Navigation Sidebar */}
         <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
            <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-slate-700 mb-4">
               <h3 className="font-bold text-white text-lg leading-tight">第二层<br/>质量指标</h3>
               <p className="text-[10px] text-slate-400 mt-2">
                  响度只是及格线。<br/>这些决定是否“专业”。
               </p>
            </div>
            
            <div className="flex flex-col gap-1 overflow-y-auto">
               {sections.map((s, idx) => (
                  <button
                     key={idx}
                     onClick={() => setActiveSection(idx)}
                     className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                        activeSection === idx 
                           ? 'bg-slate-800 border-cyan-500 shadow-md' 
                           : 'bg-transparent border-transparent hover:bg-slate-800 hover:border-slate-700'
                     }`}
                  >
                     <div className={`${activeSection === idx ? s.color : 'text-slate-500'}`}>{s.icon}</div>
                     <span className={`text-xs font-bold ${activeSection === idx ? 'text-white' : 'text-slate-400'}`}>{s.title}</span>
                     {activeSection === idx && <ArrowRight size={12} className="ml-auto text-cyan-500"/>}
                  </button>
               ))}
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 lg:p-8 relative overflow-hidden flex flex-col">
            {activeSection === 0 && <PhaseSection />}
            {activeSection === 1 && <StereoSection />}
            {activeSection === 2 && <EqSection />}
            {activeSection === 3 && <DynamicsSection />}
            {activeSection === 4 && <SpaceSection />}
            {activeSection === 5 && <NoiseSection />}
            {activeSection === 6 && <ChecklistSection />}
         </div>
      </div>
   );
};

// --- 1. Phase Section ---
const PhaseSection: React.FC = () => {
   const [phaseState, setPhaseState] = useState<'GOOD' | 'BAD'>('GOOD');
   const [offset, setOffset] = useState(0);
   const animationRef = useRef<number | null>(null);

   useEffect(() => {
      const animate = () => {
         setOffset(prev => (prev + 0.1) % (Math.PI * 2));
         animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => {
         if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
   }, []);

   // Waveform Generation
   const width = 300;
   const height = 80;
   const points = 100;
   
   const generatePath = (phaseOffset: number, amplitude: number, color: string) => {
      let d = `M 0 ${height/2}`;
      for (let i = 0; i <= points; i++) {
         const x = (i / points) * width;
         const angle = (i / points) * Math.PI * 4; // 2 cycles
         // Moving wave: add 'offset' state to angle
         const y = height/2 - Math.sin(angle + phaseOffset - offset) * amplitude;
         d += ` L ${x} ${y}`;
      }
      return <path d={d} fill="none" stroke={color} strokeWidth="2" opacity="0.6" />;
   };

   // Wave B shift: 0 if good, PI if bad
   const shiftB = phaseState === 'GOOD' ? 0 : Math.PI;

   // Sum Wave
   const generateSumPath = () => {
      let d = `M 0 ${height/2}`;
      for (let i = 0; i <= points; i++) {
         const x = (i / points) * width;
         const angle = (i / points) * Math.PI * 4;
         const valA = Math.sin(angle - offset);
         const valB = Math.sin(angle + shiftB - offset);
         const sum = valA + valB;
         const y = height/2 - sum * 15; // Scale
         d += ` L ${x} ${y}`;
      }
      return <path d={d} fill="none" stroke={phaseState === 'GOOD' ? '#10b981' : '#ef4444'} strokeWidth="3" />;
   };
   
   return (
      <div className="h-full flex flex-col">
         <div className="mb-6 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <Waves className="text-red-400"/> 相位 (Phase)
            </h2>
            <p className="text-sm text-slate-400">最容易毁片的隐形杀手。相位抵消会导致声音变薄、低频消失。</p>
         </div>

         <div className="flex-1 flex flex-col lg:flex-row gap-8">
            {/* Visualizer Column */}
            <div className="flex-1 flex flex-col gap-4">
               {/* 1. Correlation Meter */}
               <div className="flex-1 bg-black/40 rounded-xl p-4 border border-slate-700 flex flex-col items-center justify-center relative min-h-[160px]">
                  <div className="relative w-64 h-32 overflow-hidden">
                     {/* Meter Scale */}
                     <div className="absolute bottom-0 w-full h-full border-t-[20px] border-slate-700 rounded-t-full"></div>
                     <div className="absolute bottom-0 w-full h-full border-t-[20px] border-emerald-500 rounded-t-full clip-safe"></div>
                     <div className="absolute bottom-0 w-full h-full border-t-[20px] border-red-500 rounded-t-full clip-danger"></div>
                     
                     {/* Needle */}
                     <div 
                        className="absolute bottom-0 left-1/2 w-1 h-[90%] bg-white origin-bottom transition-transform duration-500 ease-out shadow-[0_0_10px_white]"
                        style={{ transform: `translateX(-50%) rotate(${phaseState === 'GOOD' ? '45deg' : '-45deg'})` }}
                     ></div>
                     
                     {/* Labels */}
                     <div className="absolute bottom-2 left-4 text-xs font-bold text-red-500">-1 (反相)</div>
                     <div className="absolute bottom-2 right-4 text-xs font-bold text-emerald-500">+1 (同相)</div>
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">0 (90°)</div>
                  </div>
                  <style>{`.clip-safe { clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); } .clip-danger { clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%); }`}</style>
               </div>

               {/* 2. Waveform Cancelation Demo */}
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative h-32 flex flex-col justify-center">
                  <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono uppercase tracking-wider">Mono Sum Check (L+R)</div>
                  <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                     <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#334155" strokeDasharray="4,4" />
                     {generatePath(0, 15, '#60a5fa')} {/* Left Blue */}
                     {generatePath(shiftB, 15, '#f472b6')} {/* Right Pink */}
                     {generateSumPath()} {/* Sum Green/Red */}
                  </svg>
                  <div className="absolute bottom-2 right-2 text-[10px] font-bold">
                     {phaseState === 'GOOD' 
                        ? <span className="text-emerald-400">叠加增强 (Constructive)</span> 
                        : <span className="text-red-500">完全抵消 (Destructive)</span>}
                  </div>
               </div>
            </div>

            {/* Controls & Explainer */}
            <div className="lg:w-80 space-y-6">
               <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-4">信号测试</h4>
                  <div className="flex gap-2">
                     <button onClick={() => setPhaseState('GOOD')} className={`flex-1 px-4 py-3 rounded text-xs font-bold border transition-all ${phaseState === 'GOOD' ? 'bg-emerald-900/50 border-emerald-500 text-white' : 'border-slate-600 text-slate-400 hover:bg-slate-700'}`}>正常信号</button>
                     <button onClick={() => setPhaseState('BAD')} className={`flex-1 px-4 py-3 rounded text-xs font-bold border transition-all ${phaseState === 'BAD' ? 'bg-red-900/50 border-red-500 text-white' : 'border-slate-600 text-slate-400 hover:bg-slate-700'}`}>反相信号</button>
                  </div>
               </div>

               <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-bold text-cyan-400 mb-2">后果演示</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                     观察左侧下方的波形图：
                     <br/><br/>
                     <span className="text-blue-400">蓝色 (L)</span> 和 <span className="text-pink-400">粉色 (R)</span> 是原始声道。
                     <br/>
                     <span className={phaseState === 'GOOD' ? 'text-emerald-400' : 'text-red-500'}>粗线</span> 是单声道叠加后的结果。
                  </p>
                  {phaseState === 'BAD' && (
                     <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300">
                        <strong>⚠️ 灾难现场：</strong><br/>
                        当波峰遇到波谷，能量互相抵消为 0。在手机或蓝牙音箱（单声道）播放时，声音会完全消失或变得极空。
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 2. Stereo Section ---
const StereoSection: React.FC = () => {
   return (
      <div className="h-full flex flex-col">
         <div className="mb-6 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <MoveHorizontal className="text-blue-400"/> 声像与声场 (Soundstage)
            </h2>
            <p className="text-sm text-slate-400">原则：对白居中，音乐左右，环境包围。</p>
         </div>

         <div className="flex-1 flex flex-col justify-center items-center relative">
            {/* The Stage Visualizer */}
            <div className="relative w-full max-w-lg aspect-video bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
               
               {/* Grid */}
               <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

               {/* Listener Head */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                  <div className="w-12 h-12 bg-slate-700 rounded-full border-4 border-slate-600"></div>
                  <span className="text-[9px] text-slate-500 mt-1">Audience</span>
               </div>

               {/* Elements */}
               {/* Dialogue: Center */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-pulse z-30">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_yellow]"></div>
                  <span className="text-[9px] font-bold text-yellow-400 mt-1 bg-black/50 px-1 rounded">对白 (C)</span>
               </div>

               {/* Music: Wide */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 border-x-4 border-blue-500/30 rounded-full opacity-50"></div>
               <div className="absolute top-[40%] left-[15%] text-[9px] text-blue-400 font-bold">Music L</div>
               <div className="absolute top-[40%] right-[15%] text-[9px] text-blue-400 font-bold">Music R</div>

               {/* Ambience: Surround */}
               <div className="absolute inset-4 border-2 border-dashed border-emerald-500/20 rounded-full"></div>
               <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-emerald-600 font-bold">Ambience (环境声)</div>

            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-slate-300">对白: 必须 Center</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-300">音乐: 铺满左右</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-dashed border-emerald-500 rounded-full"></div>
                  <span className="text-xs text-slate-300">环境: 包围感</span>
               </div>
            </div>

            <div className="mt-6 bg-red-900/20 border border-red-500/50 p-3 rounded text-center w-full max-w-lg">
               <span className="text-red-400 font-bold text-xs">❌ 常见错误:</span>
               <span className="text-slate-400 text-xs ml-2">千万不要给对白加 Stereo Widener (立体声扩展) 插件，这会导致对白发虚且相位混乱。</span>
            </div>
         </div>
      </div>
   );
};

// --- 3. EQ Section ---
const EqSection: React.FC = () => {
   const [mode, setMode] = useState<'DIALOGUE' | 'MUSIC'>('DIALOGUE');

   return (
      <div className="h-full flex flex-col">
         <div className="mb-6 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <Sliders className="text-yellow-400"/> 影视 EQ 策略
            </h2>
            <p className="text-sm text-slate-400">核心逻辑：影视 EQ 是为了“让人听懂”，不是为了“还原真实”。</p>
         </div>

         <div className="flex gap-4 mb-6">
            <button onClick={()=>setMode('DIALOGUE')} className={`flex-1 py-2 rounded text-xs font-bold border ${mode==='DIALOGUE'?'bg-yellow-900/40 border-yellow-500 text-white':'border-slate-700 text-slate-500'}`}>对白 (Dialogue)</button>
            <button onClick={()=>setMode('MUSIC')} className={`flex-1 py-2 rounded text-xs font-bold border ${mode==='MUSIC'?'bg-blue-900/40 border-blue-500 text-white':'border-slate-700 text-slate-500'}`}>背景音乐 (BGM)</button>
         </div>

         <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-6 relative flex flex-col justify-center">
            {/* EQ Graph Visualization */}
            <div className="relative w-full h-48 bg-slate-900 border border-slate-700 rounded overflow-hidden">
               {/* Grid */}
               <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-20">
                  <div className="border-r border-slate-500"></div>
                  <div className="border-r border-slate-500"></div>
                  <div className="border-r border-slate-500"></div>
               </div>
               <div className="absolute bottom-0 w-full flex justify-between px-2 text-[9px] text-slate-600 font-mono">
                  <span>20Hz</span>
                  <span>100Hz</span>
                  <span>1kHz</span>
                  <span>10kHz</span>
                  <span>20kHz</span>
               </div>

               {/* Curves */}
               <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                  
                  {mode === 'DIALOGUE' ? (
                     <path 
                        d="M0,100 L20,100 C40,100 60,50 80,50 L120,50 C140,50 160,60 180,60 C200,60 220,50 240,50 L280,50 C300,50 320,40 340,40 L400,40"
                        fill="none" stroke="#eab308" strokeWidth="3"
                        className="drop-shadow-lg"
                     />
                  ) : (
                     <path 
                        d="M0,50 L150,50 C180,50 200,70 240,70 C280,70 300,50 320,50 L400,50"
                        fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4,4"
                        className="drop-shadow-lg"
                     />
                  )}
               </svg>

               {/* Labels */}
               {mode === 'DIALOGUE' && (
                  <>
                     <div className="absolute bottom-10 left-10 text-[9px] text-red-400 font-bold">HPF (切低频)</div>
                     <div className="absolute bottom-8 left-[40%] text-[9px] text-orange-400 font-bold">Cut 浑浊 (300Hz)</div>
                     <div className="absolute top-8 right-[20%] text-[9px] text-yellow-400 font-bold">Boost 清晰 (3kHz)</div>
                  </>
               )}
               {mode === 'MUSIC' && (
                  <div className="absolute bottom-6 left-[60%] text-[9px] text-blue-400 font-bold bg-slate-900 px-1">Dip 让路 (2kHz-4kHz)</div>
               )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
               {mode === 'DIALOGUE' ? (
                  <>
                     <div className="bg-slate-800 p-3 rounded">
                        <strong className="text-yellow-400 block mb-1">HPF: 70-100Hz</strong>
                        切除低频隆隆声和空调声，这些频率对人声理解无帮助。
                     </div>
                     <div className="bg-slate-800 p-3 rounded">
                        <strong className="text-yellow-400 block mb-1">Boost: 2kHz-4kHz</strong>
                        人耳对该频段最敏感，提升它可以显著增加对白的清晰度（Presence）。
                     </div>
                  </>
               ) : (
                  <>
                     <div className="bg-slate-800 p-3 rounded">
                        <strong className="text-blue-400 block mb-1">避让法则 (Carving)</strong>
                        音乐不必追求全频段饱满。必须在 2k-4k 频段做衰减（Dip），把这块宝贵的空间留给对白。
                     </div>
                     <div className="bg-slate-800 p-3 rounded">
                        <strong className="text-white block mb-1">Result:</strong>
                        这样即使音乐音量较大，观众依然能清晰听清每一句台词。
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

// --- 4. Dynamics Section ---
const DynamicsSection: React.FC = () => {
   return (
      <div className="h-full flex flex-col">
         <div className="mb-6 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <Activity className="text-emerald-400"/> 动态与压缩 (Dynamics)
            </h2>
            <p className="text-sm text-slate-400">哲学：有控制 (Controlled)，而不是无起伏 (Flattened)。</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
               <h3 className="text-sm font-bold text-white mb-4">对白压缩推荐参数</h3>
               <div className="space-y-4">
                  <ParamRow label="Ratio" val="2:1 ~ 3:1" desc="温和压缩，不要超过 4:1"/>
                  <ParamRow label="Attack" val="10 ~ 30 ms" desc="保留一点瞬态，太快会吃掉字头"/>
                  <ParamRow label="Release" val="80 ~ 150 ms" desc="自然回复，太慢会产生抽吸感"/>
                  <ParamRow label="Gain Reduction" val="3 ~ 6 dB" desc="表头指针只需轻微跳动"/>
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-center items-center">
               <div className="relative w-full h-32 flex items-end gap-1 mb-4">
                  {[40, 90, 50, 80, 20, 60, 100, 30].map((h, i) => (
                     <div key={i} className="flex-1 bg-slate-700 rounded-t relative group">
                        <div className="absolute bottom-0 w-full bg-emerald-500/80 rounded-t transition-all duration-500" style={{ height: `${h > 60 ? 60 + (h-60)/3 : h}%` }}></div>
                        <div className="absolute top-0 w-full bg-red-500/30 h-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                  ))}
                  <div className="absolute top-[40%] left-0 w-full border-t border-dashed border-white/50 text-[9px] text-white">Threshold</div>
               </div>
               <p className="text-xs text-slate-400 text-center">
                  压缩器的作用是把过大的音量（红色部分）压下来，然后整体提升音量（Makeup Gain），从而让小声的细节（如耳语）也能被听见。
               </p>
            </div>
         </div>
      </div>
   );
};

const ParamRow: React.FC<{ label: string; val: string; desc: string }> = ({ label, val, desc }) => (
   <div className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0">
      <div>
         <div className="text-xs font-bold text-emerald-400">{label}</div>
         <div className="text-[10px] text-slate-500">{desc}</div>
      </div>
      <div className="text-sm font-mono text-white bg-slate-800 px-2 py-1 rounded border border-slate-700">{val}</div>
   </div>
);

// --- 5. Space Section (Reverb) ---
const SpaceSection: React.FC = () => {
   return (
      <div className="h-full flex flex-col justify-center items-center text-center p-8">
         <div className="w-24 h-24 bg-purple-900/20 rounded-full border-4 border-purple-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
            <BoxSelect size={40} className="text-purple-400"/>
         </div>
         <h2 className="text-2xl font-bold text-white mb-4">空间感原则：隐形</h2>
         <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-8">
            “好的影视混响是看不见的。”
            <br/>
            它的作用是让对白“站在画面中的空间里”，而不是为了好听。
         </p>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-left">
            <div className="bg-slate-800 p-4 rounded border-l-4 border-emerald-500">
               <h4 className="text-sm font-bold text-white mb-1">✅ 正确做法</h4>
               <p className="text-xs text-slate-400">使用短混响 (Short Plate / Room)。只需极少量 (Wet &lt; 10%)，刚好能感觉到“不干”即可。</p>
            </div>
            <div className="bg-slate-800 p-4 rounded border-l-4 border-red-500">
               <h4 className="text-sm font-bold text-white mb-1">❌ 常见错误</h4>
               <p className="text-xs text-slate-400">使用唱歌用的大混响 (Hall / Church)。会导致对白含糊不清，且与画面（如小卧室场景）严重违和。</p>
            </div>
         </div>
      </div>
   );
};

// --- 6. Noise Section ---
const NoiseSection: React.FC = () => {
   return (
      <div className="h-full flex flex-col">
         <div className="mb-6 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <Mic className="text-slate-400"/> 噪声与底噪
            </h2>
            <p className="text-sm text-slate-400">目标：安静 ≠ 死寂。干净 ≠ 消毒。</p>
         </div>

         <div className="space-y-4">
            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
               <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center text-red-400 font-bold shrink-0">必修</div>
               <div>
                  <h4 className="text-sm font-bold text-white">电流声 / 风噪</h4>
                  <p className="text-xs text-slate-400">这些是技术失误，必须使用 RX De-noise 或类似工具彻底去除。</p>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
               <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-bold shrink-0">保留</div>
               <div>
                  <h4 className="text-sm font-bold text-white">房间底噪 (Room Tone) / 环境声</h4>
                  <p className="text-xs text-slate-400">
                     不要把对白间隙的底噪剪成“绝对静音”，那会让声音听起来像断气一样难受。
                     <br/>专业的做法是录一段空环境声，铺在整个轨道最底层，作为“粘合剂”。
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 7. Checklist Section ---
const ChecklistSection: React.FC = () => {
   const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));
   
   const items = [
      "Integrated LUFS 合规 (如 -14)",
      "True Peak ≤ -1 dBTP",
      "Mono (单声道) 播放无明显相位抵消",
      "对白始终清晰，不被音乐掩盖",
      "环境声有包围感但不抢戏",
      "无明显技术噪声 (电流/爆音)",
      "片头片尾留白正常",
      "在手机/耳机/音箱上试听均正常"
   ];

   const toggle = (i: number) => {
      const newChecked = [...checked];
      newChecked[i] = !newChecked[i];
      setChecked(newChecked);
   };

   const allChecked = checked.every(Boolean);

   return (
      <div className="h-full flex flex-col">
         <div className="bg-gradient-to-r from-cyan-900/30 to-slate-900 p-6 rounded-xl border border-cyan-500/30 mb-6 flex justify-between items-center">
            <div>
               <h2 className="text-xl font-bold text-white mb-1">交付前质量检查清单</h2>
               <p className="text-xs text-cyan-400">Quality Control (QC) Checklist</p>
            </div>
            {allChecked && (
               <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-bounce">
                  READY TO DELIVER! 🚀
               </div>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
               <button 
                  key={i}
                  onClick={() => toggle(i)}
                  className={`p-4 rounded-lg border text-left flex items-center gap-3 transition-all ${checked[i] ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
               >
                  {checked[i] ? <CheckSquare className="text-emerald-400 shrink-0"/> : <CheckSquare className="text-slate-600 shrink-0"/>}
                  <span className={`text-sm ${checked[i] ? 'text-white line-through decoration-slate-500 opacity-50' : 'text-slate-200'}`}>{item}</span>
               </button>
            ))}
         </div>

         <div className="mt-auto pt-8 text-center">
            <div className="inline-block bg-slate-800 px-6 py-3 rounded-full border border-slate-700">
               <span className="text-xs text-slate-400 italic">
                  "业余在凑指标，专业在为播放环境负责。"
               </span>
            </div>
         </div>
      </div>
   );
};