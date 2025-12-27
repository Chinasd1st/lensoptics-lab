
import React from 'react';
import { BookOpen, AlertTriangle, Star } from 'lucide-react';

export const CheatSheetModule: React.FC = () => {
   return (
      <div className="h-full flex flex-col items-center justify-center p-4">
         <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Header with Golden Rule */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2"><BookOpen size={20} className="text-cyan-400"/> 响度速查手册</h3>
                  <div className="text-[10px] text-slate-500">Based on GY/T 377 & 262</div>
               </div>
               <div className="bg-slate-800/50 p-4 rounded-xl border border-indigo-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10"><Star size={64}/></div>
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">GOLDEN RULE</div>
                  <p className="text-sm font-medium text-slate-200 italic leading-relaxed">
                     "对白定地基，音乐做气氛。<br/>不顶峰值，不凑数字，最后一次看 LUFS。"
                  </p>
               </div>
            </div>

            <div className="divide-y divide-slate-800">
               <SheetRow 
                  q="会不会炸麦/爆音?" 
                  a="dBTP (真峰值)" 
                  val="≤ -1.0 dBTP" 
                  color="text-red-400"
                  desc="最后一道防线，防止DAC转换时削波。"
               />
               <SheetRow 
                  q="网络视频 (B站/油管)" 
                  a="Web Standard" 
                  val="-14 LUFS" 
                  color="text-blue-400"
                  desc="超过 -14 会被强制拉低。低于不拉高。"
               />
               <SheetRow 
                  q="影视/广播 (最严)" 
                  a="EBU R128" 
                  val="-23 LUFS" 
                  color="text-green-400"
                  desc="动态范围大。如果不达标会被电视台拒收。"
               />
               <SheetRow 
                  q="手机短视频 (抖音)" 
                  a="Mobile" 
                  val="-13 ~ -15 LUFS" 
                  color="text-purple-400"
                  desc="稍微响一点，但不要太满。"
               />
               <SheetRow 
                  q="还差多少达标?" 
                  a="LU (相对单位)" 
                  val="+/- 0" 
                  color="text-yellow-400"
                  desc="1 LU = 1 dB。用于描述与目标的差值。"
               />
            </div>
         </div>
      </div>
   );
};

const SheetRow: React.FC<{ q: string; a: string; val: string; color: string; desc?: string }> = ({ q, a, val, color, desc }) => (
   <div className="flex items-center p-5 hover:bg-slate-800/50 transition-colors group">
      <div className="w-1/4 text-sm text-slate-400 font-medium">{q}</div>
      <div className={`w-1/4 text-sm font-bold font-mono ${color}`}>{a}</div>
      <div className="w-1/4 text-right text-xs font-mono text-slate-200 bg-slate-800/80 py-1 px-2 rounded inline-block border border-slate-700">
         {val}
      </div>
      <div className="w-1/4 pl-4 text-[10px] text-slate-500 leading-tight opacity-50 group-hover:opacity-100 transition-opacity">
         {desc}
      </div>
   </div>
);
