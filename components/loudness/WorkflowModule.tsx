
import React, { useState } from 'react';
import { Settings, Sliders, Activity, ArrowDown, ArrowRight, Calculator, Layers, Workflow, AlertTriangle, CheckCircle, XCircle, Volume2 } from 'lucide-react';

export const WorkflowModule: React.FC = () => {
   const [step, setStep] = useState(1);

   return (
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
         
         {/* Part 1: The Golden Rule */}
         <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-indigo-600 rounded-full shadow-lg shrink-0">
               <Volume2 size={32} className="text-white"/>
            </div>
            <div>
               <h2 className="text-xl font-bold text-white mb-2">后期响度一句话口诀</h2>
               <div className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic">
                  "对白定地基，音乐做气氛。不顶峰值，不凑数字，最后一次看 LUFS。"
               </div>
            </div>
         </div>

         {/* Part 2: 5-Step Practical Workflow */}
         <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
               <Workflow className="text-orange-400"/> 标准后期响度工作流 (实操版)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
               {/* Step 1 */}
               <WorkflowStep 
                  number="01" 
                  title="声音设计" 
                  icon={<Layers size={20}/>}
                  isActive={step === 1}
                  onClick={() => setStep(1)}
                  summary="先别开响度表"
               />
               <WorkflowStep 
                  number="02" 
                  title="对白定基准" 
                  icon={<Sliders size={20}/>}
                  isActive={step === 2}
                  onClick={() => setStep(2)}
                  summary="确定全片地基"
               />
               <WorkflowStep 
                  number="03" 
                  title="音乐平衡" 
                  icon={<Activity size={20}/>}
                  isActive={step === 3}
                  onClick={() => setStep(3)}
                  summary="不抢中频"
               />
               <WorkflowStep 
                  number="04" 
                  title="整体测量" 
                  icon={<Calculator size={20}/>}
                  isActive={step === 4}
                  onClick={() => setStep(4)}
                  summary="看 Integrated"
               />
               <WorkflowStep 
                  number="05" 
                  title="统一交付" 
                  icon={<ArrowDown size={20}/>}
                  isActive={step === 5}
                  onClick={() => setStep(5)}
                  summary="Limiter 收尾"
               />
            </div>

            {/* Step Details */}
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-8 min-h-[200px] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="text-9xl font-black text-white">{step}</span>
               </div>
               
               {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-white mb-4">Step 1: 声音设计与编辑</h3>
                     <div className="text-slate-300 space-y-4">
                        <p>在这一步，<span className="text-red-400 font-bold">不要打开响度表</span>。忘掉参数，用耳朵去听。</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                           <li>关注对白是否自然清楚。</li>
                           <li>关注音乐的情绪起伏是否到位。</li>
                           <li>关注音效（SFX）是否突兀。</li>
                        </ul>
                        <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30 text-xs text-yellow-200 inline-block mt-2">
                           ⚠️ 警告：过早关注数据会破坏艺术判断。
                        </div>
                     </div>
                  </div>
               )}

               {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-white mb-4">Step 2: 对白定基准 (最关键)</h3>
                     <div className="text-slate-300 space-y-4">
                        <p>调整对白音量，使其成为整个片子的“锚点”。此时主要看 <span className="font-mono text-cyan-400">Short-term LUFS</span>。</p>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                           <h4 className="text-sm font-bold text-white mb-2">网络视频推荐目标 (Short-term)</h4>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-900 p-3 rounded text-center">
                                 <div className="text-xs text-slate-500 mb-1">普通对白</div>
                                 <div className="text-lg font-mono font-bold text-emerald-400">-18 ~ -20 LUFS</div>
                              </div>
                              <div className="bg-slate-900 p-3 rounded text-center">
                                 <div className="text-xs text-slate-500 mb-1">情绪爆发/争吵</div>
                                 <div className="text-lg font-mono font-bold text-yellow-400">-16 LUFS 左右</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-white mb-4">Step 3: 音乐压在对白下面</h3>
                     <div className="text-slate-300 space-y-4">
                        <p>根据对白基准，调整背景音乐 (BGM) 的电平。确保音乐不抢占人声频段（中频）。</p>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                           <h4 className="text-sm font-bold text-white mb-2">经验法则 (非死规矩)</h4>
                           <ul className="space-y-2 text-sm">
                              <li className="flex justify-between border-b border-slate-700 pb-2">
                                 <span className="text-slate-400">有人说话时</span>
                                 <span className="text-white">音乐比对白低 <span className="text-cyan-400 font-bold">6 ~ 10 LU</span></span>
                              </li>
                              <li className="flex justify-between pt-2">
                                 <span className="text-slate-400">无对白/转场时</span>
                                 <span className="text-white">音乐可拉高接近对白响度</span>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               )}

               {step === 4 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-white mb-4">Step 4: 开表测量</h3>
                     <div className="text-slate-300 space-y-4">
                        <p>现在才需要从头到尾播放一遍，查看 <span className="font-mono text-emerald-400">Integrated LUFS</span> (全片平均) 和 <span className="font-mono text-red-400">True Peak</span>。</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                           <div className="bg-slate-800 p-3 rounded">
                              <span className="block text-slate-500 text-xs mb-1">目标 (Web)</span>
                              <span className="font-mono font-bold text-white">-14 LUFS</span>
                           </div>
                           <div className="bg-slate-800 p-3 rounded">
                              <span className="block text-slate-500 text-xs mb-1">目标 (Broadcast)</span>
                              <span className="font-mono font-bold text-white">-23 LUFS</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {step === 5 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-white mb-4">Step 5: 统一响度 (收尾)</h3>
                     <div className="text-slate-300 space-y-4">
                        <p>如果读数不达标，请按以下优先级进行调整：</p>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-400">
                           <li><strong className="text-white">Clip Gain / Track Gain:</strong> 最推荐。整体推拉音量推子。</li>
                           <li><strong className="text-white">轻度压缩 (Compression):</strong> 压低动态过大的部分。</li>
                           <li><strong className="text-white">限制器 (Limiter):</strong> 挂在总线 (Master) 上的最后一道防线。</li>
                        </ol>
                        <div className="bg-slate-800 p-3 rounded border border-slate-600 mt-2">
                           <div className="text-xs font-bold text-cyan-400 mb-1">推荐 Limiter 设置：</div>
                           <div className="font-mono text-xs text-slate-300">
                              Ceiling: <span className="text-white">-1.0 dBTP</span><br/>
                              Lookahead: <span className="text-white">ON (开启)</span><br/>
                              Release: <span className="text-white">Auto / 100ms+</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Part 3: Common Mistakes */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertTriangle className="text-red-500"/> 典型错误 (避坑指南)
               </h3>
               <div className="space-y-4">
                  <MistakeCard 
                     title="用 Limiter 硬顶响度"
                     desc="试图只靠压低阈值 (Threshold) 把 LUFS 从 -20 顶到 -14。"
                     result="声音变得干硬、甚至破音。就像把一张大照片硬塞进小相框。"
                  />
                  <MistakeCard 
                     title="盯着 Momentary 做混音"
                     desc="时刻看着瞬时响度表跳动，试图让它保持在 -14。"
                     result="完全错误。Momentary 只是给你看瞬态防爆的，不是用来做平衡的。"
                  />
                  <MistakeCard 
                     title="用 RMS 判断响度"
                     desc="还在用老式的 RMS 表头。"
                     result="RMS 反应不出人耳对中频的敏感度。可能 RMS 读数很高（低频多），但人耳听起来依然很轻。"
                  />
               </div>
            </div>

            <div>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Settings className="text-cyan-500"/> 推荐工具箱
               </h3>
               <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                     <div className="text-sm font-bold text-white mb-2">免费 / 内置</div>
                     <ul className="text-xs text-slate-400 space-y-2">
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500"/> DaVinci Resolve Fairlight (自带 Loudness Meter)</li>
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500"/> Premiere Pro (Loudness Radar)</li>
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500"/> Youlean Loudness Meter (Free Version)</li>
                     </ul>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                     <div className="text-sm font-bold text-white mb-2">行业标准 (付费)</div>
                     <ul className="text-xs text-slate-400 space-y-2">
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-purple-500"/> iZotope Insight 2</li>
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-purple-500"/> Nugen VisLM (广电首选)</li>
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-purple-500"/> Waves WLM Plus</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>

      </div>
   );
};

const WorkflowStep: React.FC<{ number: string; title: string; icon: React.ReactNode; isActive: boolean; onClick: () => void; summary: string }> = ({ number, title, icon, isActive, onClick, summary }) => (
   <button 
      onClick={onClick}
      className={`relative p-4 rounded-xl border text-left transition-all duration-300 group ${isActive ? 'bg-cyan-900/30 border-cyan-500 ring-1 ring-cyan-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-600'}`}
   >
      <div className={`text-4xl font-black absolute top-2 right-2 opacity-10 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>{number}</div>
      <div className={`mb-3 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{icon}</div>
      <div className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>{title}</div>
      <div className="text-[10px] text-slate-500">{summary}</div>
   </button>
);

const MistakeCard: React.FC<{ title: string; desc: string; result: string }> = ({ title, desc, result }) => (
   <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-red-900/50 transition-colors group">
      <div className="flex items-center gap-2 mb-2">
         <XCircle size={16} className="text-red-500"/>
         <span className="font-bold text-slate-200 text-sm">{title}</span>
      </div>
      <p className="text-xs text-slate-400 mb-2 pl-6">{desc}</p>
      <div className="pl-6 text-[10px] text-red-400 flex gap-2">
         <span className="font-bold shrink-0">后果:</span>
         <span>{result}</span>
      </div>
   </div>
);
