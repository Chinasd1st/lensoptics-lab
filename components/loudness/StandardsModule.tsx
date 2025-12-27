
import React from 'react';
import { Globe, Smartphone, Tv as TvIcon, Info, Radio } from 'lucide-react';

export const StandardsModule: React.FC = () => {
   return (
      <div className="max-w-5xl mx-auto space-y-10 pb-12">
         <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">交付标准速查表</h2>
            <p className="text-slate-400 text-sm">选择错误的响度标准会导致平台强制压缩音量（惩罚性衰减），或因电平过低导致用户听不清。</p>
         </div>

         {/* 1. Broadcast & Film (Strict) */}
         <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
               <Radio className="text-green-400"/> 
               <h3 className="font-bold text-white">1. 影视 / 广播 (最严格)</h3>
            </div>
            <div className="p-0">
               <table className="w-full text-left text-xs text-slate-400">
                  <thead className="bg-slate-800 text-slate-200">
                     <tr>
                        <th className="p-4">平台/规范</th>
                        <th className="p-4">目标响度</th>
                        <th className="p-4">真峰值 (dBTP)</th>
                        <th className="p-4">备注</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">EBU R128 (欧洲)</td>
                        <td className="p-4 font-mono text-green-400 font-bold">-23 LUFS</td>
                        <td className="p-4 font-mono">-1.0 dBTP</td>
                        <td className="p-4">绝对红线，误差通常只允许 ±0.5 LU</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">中国广电 (GY/T 262)</td>
                        <td className="p-4 font-mono text-green-400 font-bold">-23 LUFS</td>
                        <td className="p-4 font-mono">-1.0 dBTP</td>
                        <td className="p-4">源自 ITU-R BS.1770</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">日本电视 (TR-B32)</td>
                        <td className="p-4 font-mono text-green-400 font-bold">-24 LUFS</td>
                        <td className="p-4 font-mono">-1.0 dBTP</td>
                        <td className="p-4">比欧洲标准略低</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">Netflix / Disney+</td>
                        <td className="p-4 font-mono text-green-400 font-bold">-27 LUFS</td>
                        <td className="p-4 font-mono">-2.0 dBTP</td>
                        <td className="p-4">基于对话门限 (Dialogue-gated) 测量</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         {/* 2. Web Streaming (Common) */}
         <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
               <Globe className="text-cyan-400"/> 
               <h3 className="font-bold text-white">2. 网络视频 (最常用)</h3>
            </div>
            <div className="p-0">
               <table className="w-full text-left text-xs text-slate-400">
                  <thead className="bg-slate-800 text-slate-200">
                     <tr>
                        <th className="p-4">平台</th>
                        <th className="p-4">推荐目标</th>
                        <th className="p-4">真峰值 (dBTP)</th>
                        <th className="p-4">处理机制</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">YouTube</td>
                        <td className="p-4 font-mono text-cyan-400 font-bold">-14 LUFS</td>
                        <td className="p-4 font-mono">-1.0 dBTP</td>
                        <td className="p-4 text-orange-400">超过 -14 会被强制拉低，低于不拉高</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">Bilibili (B站)</td>
                        <td className="p-4 font-mono text-cyan-400 font-bold">-16 ~ -14 LUFS</td>
                        <td className="p-4 font-mono">-1.0 dBTP</td>
                        <td className="p-4">近期标准趋向于 -14 LUFS</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                        <td className="p-4 font-bold text-white">Spotify / Apple Music</td>
                        <td className="p-4 font-mono text-cyan-400 font-bold">-14 LUFS</td>
                        <td className="p-4 font-mono">-1.0 dBTP</td>
                        <td className="p-4">开启“音量标准化”时生效</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         {/* 3. Mobile / Short Video */}
         <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
               <Smartphone className="text-purple-400"/> 
               <h3 className="font-bold text-white">3. 短视频 / 手机端</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <div className="text-4xl font-black text-purple-400 mb-2 font-mono">-13 ~ -15 <span className="text-base text-slate-500 font-bold">LUFS</span></div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     抖音、快手、Instagram Reels 等竖屏平台。
                     <br/>由于主要在手机外放或嘈杂环境下观看，音量通常做得比较“满”。
                  </p>
               </div>
               <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <h4 className="text-xs font-bold text-white mb-2">混音建议：</h4>
                  <ul className="list-disc pl-4 text-[10px] text-slate-400 space-y-1">
                     <li>不要保留太大的动态范围（Dynamic Range），稍微压得平一点。</li>
                     <li>切除 80Hz 以下的超低频（手机喇叭放不出来，不仅浪费能量还会导致破音）。</li>
                     <li>人声频率（1kHz - 4kHz）要稍微突出。</li>
                  </ul>
               </div>
            </div>
         </div>

      </div>
   );
};
