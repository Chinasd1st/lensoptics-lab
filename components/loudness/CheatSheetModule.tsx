
import React from 'react';
import { BookOpen, AlertTriangle, Star } from 'lucide-react';

export const CheatSheetModule: React.FC = () => {
   return (
      <div className="h-full flex flex-col items-center justify-center p-4">
         <div className="w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Header with Golden Rule */}
            <div className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 p-6 border-b border-zinc-200 dark:border-zinc-800">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2"><BookOpen size={20} className="text-cyan-400"/> 响度速查手册</h3>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Based on GY/T 377 & 262</div>
               </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl border border-primary-500/30 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10"><Star size={64}/></div>
                   <div className="text-xs font-bold text-primary-600 dark:text-indigo-300 uppercase tracking-widest mb-2">GOLDEN RULE</div>
                   <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 italic leading-relaxed">
                     "对白定地基，音乐做气氛。<br/>不顶峰值，不凑数字，最后一次看 LUFS。"
                  </p>
               </div>
            </div>

            <div className="divide-y divide-zinc-800">
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
                  color="text-primary-400"
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
                  color="text-primary-400"
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
   <div className="flex items-center p-5 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-colors group">
      <div className="w-1/4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">{q}</div>
      <div className={`w-1/4 text-sm font-bold font-mono ${color}`}>{a}</div>
      <div className="w-1/4 text-right text-xs font-mono text-zinc-700 dark:text-zinc-200 bg-zinc-100/ dark:bg-zinc-800 py-1 px-2 rounded inline-block border border-zinc-200 dark:border-zinc-800">
         {val}
      </div>
      <div className="w-1/4 pl-4 text-xs text-zinc-500 dark:text-zinc-400 leading-tight opacity-50 group-hover:opacity-100 transition-opacity">
         {desc}
      </div>
   </div>
);
