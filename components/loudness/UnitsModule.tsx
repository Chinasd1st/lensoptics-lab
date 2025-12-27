
import React from 'react';
import { Volume2, AlertTriangle, Activity, BarChart3 } from 'lucide-react';

export const UnitsModule: React.FC = () => {
   return (
      <div className="max-w-4xl mx-auto space-y-12">
         {/* Introduction */}
         <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <Volume2 className="text-cyan-400"/> 视频响度核心单位
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
               在数字音频时代，Peak（峰值）已不足以描述“听起来有多响”。
               行业标准采用 <span className="text-white font-bold">K-Weighting (K加权)</span> 滤波来模拟人耳对头部声学效应的感知（高频更敏感）。
            </p>
         </div>

         {/* Grid of Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LUFS */}
            <UnitCard 
               title="LUFS" 
               sub="Loudness Units Full Scale"
               icon={<Volume2 size={20} className="text-cyan-400"/>}
               desc="视频音频的核心标准。加入了 K-weighting 加权（模拟人耳对高频更敏感）和门限控制（忽略静音段）。"
               highlight="源自 ITU-R BS.1770 / GY/T 262-2012"
               source="[GY/T 262-2012]"
               details={[
                  { label: "Integrated", val: "全片平均响度 (最重要)" },
                  { label: "Short-term", val: "3秒窗口" },
                  { label: "Momentary", val: "400毫秒瞬时" },
               ]}
            />

            {/* dBTP */}
            <UnitCard 
               title="dBTP (真峰值)" 
               sub="True Peak"
               icon={<AlertTriangle size={20} className="text-red-400"/>}
               desc="通过 4倍过采样 检测采样点之间的峰值。用于防止数模转换 (DAC) 后产生的隐性削波。"
               highlight="它是最后的“保险丝”"
               source="[GY/T 262-2012 附录B]"
               details={[
                  { label: "普通 Peak", val: "可能漏掉采样点间的波峰" },
                  { label: "True Peak", val: "捕捉真实的模拟信号峰值" },
                  { label: "限制", val: "通常控制在 -1.0 dBTP 以下" },
               ]}
            />

            {/* LU */}
            <UnitCard 
               title="LU (响度单位)" 
               sub="Loudness Unit"
               icon={<Activity size={20} className="text-blue-400"/>}
               desc="相对变化的单位。数值上 1 LU = 1 dB。"
               highlight="LU 是“相对差值”，LUFS 是“绝对目标”"
               details={[
                  { label: "目标", val: "-23 LUFS" },
                  { label: "当前", val: "-21 LUFS" },
                  { label: "差值", val: "+2 LU" },
               ]}
            />

            <UnitCard 
               title="dB (分贝)" 
               sub="Decibel"
               icon={<BarChart3 size={20} className="text-slate-400"/>}
               desc="本身没有绝对意义，是比率单位。必须指定参考值才有物理意义。"
               details={[
                  { label: "dBFS", val: "相对于数字满刻度 (Full Scale)" },
                  { label: "dBSPL", val: "相对于空气声压 (Sound Pressure)" },
               ]}
            />

         </div>
      </div>
   );
};

const UnitCard: React.FC<{ title: string; sub: string; icon: React.ReactNode; desc: string; highlight?: string; limitations?: string; details?: {label:string, val:string}[]; source?: string }> = ({ title, sub, icon, desc, highlight, limitations, details, source }) => (
   <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-colors flex flex-col">
      <div className="flex justify-between items-start mb-3">
         <div>
            <h3 className="text-lg font-bold text-slate-200">{title}</h3>
            <div className="text-[10px] font-mono text-slate-500 uppercase">{sub}</div>
         </div>
         <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-3 min-h-[40px]">{desc}</p>
      
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
