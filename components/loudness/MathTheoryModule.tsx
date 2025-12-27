
import React, { useEffect, useRef } from 'react';
import { Sigma, Lightbulb } from 'lucide-react';

// Declare window.katex to avoid TS errors
declare global {
  interface Window {
    katex: any;
  }
}

export const MathTheoryModule: React.FC = () => {
   return (
      <div className="max-w-5xl mx-auto space-y-12 pb-12">
         {/* Introduction */}
         <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-2xl border border-indigo-500/30 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
               <Sigma size={32} className="text-indigo-400"/> 为什么 LUFS ≠ RMS？
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
               LUFS = <strong>加权能量</strong> + <strong>时间积分</strong> + <strong>门限筛选</strong>。
               <br/>
               它解决了传统 RMS 电平无法反应人耳真实听感（对中频敏感、对低频迟钝）以及静音段拉低平均值的问题。
            </p>
         </div>

         {/* Section 1: The Core Formula */}
         <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
               <h3 className="font-bold text-white flex items-center gap-2">ITU-R BS.1770 总纲公式</h3>
            </div>
            <div className="p-10 flex flex-col items-center justify-center bg-slate-900">
               {/* Formula Render */}
               <KaTeXBlock 
                  expression="\text{LUFS} = 10\log_{10}\left( \frac{1}{T} \int_0^T [K(x(t))]^2 \cdot G(t) \,dt \right)" 
                  className="text-xl md:text-3xl mb-8" 
               />
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400 w-full max-w-3xl">
                  <div className="flex items-start gap-3 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                     <div className="mt-1"><KaTeXInline expression="K(\cdot)" /></div>
                     <div>
                        <strong className="text-cyan-400 block mb-1">K-weighting 滤波</strong>
                        <span>模拟人头声学效应。提升高频，衰减低频。让电信号能量接近听觉响度。</span>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                     <div className="mt-1"><KaTeXInline expression="G(t)" /></div>
                     <div>
                        <strong className="text-emerald-400 block mb-1">Gating 门限函数</strong>
                        <span>非线性筛选。剔除低于阈值（如 -70 LUFS）的静音片段，防止平均值被稀释。</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Practical Interpretation Section (NEW) */}
         <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-900/30 to-slate-900 p-6 border-b border-slate-800">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lightbulb size={24} className="text-orange-400"/> 后期实操视角：这公式意味着什么？
               </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
               
               <div className="p-6 space-y-4">
                  <h4 className="text-lg font-bold text-cyan-400">关于 K-Weighting</h4>
                  <div className="text-sm text-slate-300 space-y-3">
                     <p>你不需要自己设置 K-weighting，但你需要知道它的脾气：</p>
                     <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li><strong>低频很多 ≠ 响度大：</strong> 轰鸣的低音（Bass/Sub）在 LUFS 算法里会被大幅衰减。</li>
                        <li><strong>对白决定响度：</strong> 人声所在的中高频（1k-4kHz）在算法里权重最高。</li>
                        <li><strong>结论：</strong> 如果觉得 LUFS 读数上不去，不要盲目加低频，试着提升中频清晰度。</li>
                     </ul>
                  </div>
               </div>

               <div className="p-6 space-y-4">
                  <h4 className="text-lg font-bold text-emerald-400">关于 Gating (门限)</h4>
                  <div className="text-sm text-slate-300 space-y-3">
                     <p>Gating 对后期来说意味着 <strong className="text-white">“安静不算数”</strong>。</p>
                     <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li>黑场、空镜、环境静音段、片头前的空白，统统会被算法忽略。</li>
                        <li><strong>误区：</strong> “我片子里有很多安静的留白，所以响度做不到 -14？”</li>
                        <li><strong>正解：</strong> 错。Integrated LUFS 会自动剔除这些安静段，只计算有“有效声音”的部分。</li>
                     </ul>
                  </div>
               </div>

            </div>
         </div>

         {/* Summary Table */}
         <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-800">
               <h3 className="font-bold text-white">RMS vs LUFS 核心差异</h3>
            </div>
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-900 text-slate-400">
                  <tr>
                     <th className="p-4">维度</th>
                     <th className="p-4">RMS (电平)</th>
                     <th className="p-4 text-cyan-400">LUFS (响度)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700 text-slate-300">
                  <tr>
                     <td className="p-4 font-bold">频率感知</td>
                     <td className="p-4 text-red-400">❌ 无 (低频占优)</td>
                     <td className="p-4 text-emerald-400">✅ K-weighting (人耳曲线)</td>
                  </tr>
                  <tr>
                     <td className="p-4 font-bold">安静段处理</td>
                     <td className="p-4 text-red-400">❌ 平均值被拉低</td>
                     <td className="p-4 text-emerald-400">✅ Gating (自动剔除)</td>
                  </tr>
                  <tr>
                     <td className="p-4 font-bold">主观听感</td>
                     <td className="p-4">差</td>
                     <td className="p-4 text-emerald-400">高度一致</td>
                  </tr>
               </tbody>
            </table>
         </div>

      </div>
   );
};

// --- Helper Components for KaTeX ---

const KaTeXBlock: React.FC<{ expression: string; className?: string }> = ({ expression, className }) => {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (containerRef.current && window.katex) {
         try {
            window.katex.render(expression, containerRef.current, {
               displayMode: true,
               throwOnError: false
            });
         } catch (e) {
            console.error("KaTeX Error:", e);
            containerRef.current.innerText = expression; // Fallback
         }
      }
   }, [expression]);

   return <div ref={containerRef} className={className} />;
};

const KaTeXInline: React.FC<{ expression: string; className?: string }> = ({ expression, className }) => {
   const containerRef = useRef<HTMLSpanElement>(null);

   useEffect(() => {
      if (containerRef.current && window.katex) {
         try {
            window.katex.render(expression, containerRef.current, {
               displayMode: false,
               throwOnError: false
            });
         } catch (e) {
            console.error("KaTeX Error:", e);
            containerRef.current.innerText = expression;
         }
      }
   }, [expression]);

   return <span ref={containerRef} className={className} />;
};
