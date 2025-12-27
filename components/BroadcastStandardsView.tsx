
import React from 'react';
import { Tv, Activity, Globe, Clock } from 'lucide-react';

export const BroadcastStandardsView: React.FC<{ initialTab?: string }> = () => {
   return (
      <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950">
         <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8">
               
               {/* Header */}
               <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-2xl border border-indigo-500/30 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                     <Tv size={32} className="text-indigo-400"/> 广播电视制式 (Broadcast Standards)
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                     PAL 和 NTSC 源于模拟电视时代的电力频率差异（50Hz vs 60Hz）。
                     虽然现在是全数字高清时代，但这两个标准依然深刻影响着<span className="text-indigo-400 font-bold">帧率选择</span>、<span className="text-indigo-400 font-bold">快门速度</span>以及<span className="text-indigo-400 font-bold">防闪烁设置</span>。
                  </p>
               </div>

               {/* Comparison Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PAL Card */}
                  <div className="bg-slate-900 p-6 rounded-2xl border-t-4 border-blue-500 shadow-lg relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-blue-500 select-none group-hover:scale-110 transition-transform">PAL</div>
                     <h3 className="text-2xl font-bold text-blue-400 mb-6">PAL 制式</h3>
                     
                     <ul className="space-y-4 text-sm text-slate-300">
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">主要地区</span>
                           <span className="text-right">欧洲、中国大陆、澳洲</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">电力频率</span>
                           <span className="font-mono text-white font-bold">50 Hz</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">基准帧率</span>
                           <span className="font-mono text-white font-bold">25 fps / 50 fps</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">安全快门</span>
                           <span className="font-mono text-cyan-400">1/50s, 1/100s</span>
                        </li>
                     </ul>
                     <div className="mt-6 p-3 bg-blue-900/20 rounded-lg text-xs text-blue-200 border border-blue-500/20">
                        <strong>💡 拍摄提示：</strong> 在中国大陆拍摄视频，如果你设置了 30fps 或 60fps，室内的日光灯管很可能会产生频闪。请务必使用 25/50fps 或调整快门为 1/50s 的倍数。
                     </div>
                  </div>

                  {/* NTSC Card */}
                  <div className="bg-slate-900 p-6 rounded-2xl border-t-4 border-orange-500 shadow-lg relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-orange-500 select-none group-hover:scale-110 transition-transform">NTSC</div>
                     <h3 className="text-2xl font-bold text-orange-400 mb-6">NTSC 制式</h3>
                     
                     <ul className="space-y-4 text-sm text-slate-300">
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">主要地区</span>
                           <span className="text-right">美国、日本</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">电力频率</span>
                           <span className="font-mono text-white font-bold">60 Hz</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">基准帧率</span>
                           <span className="font-mono text-white font-bold">29.97 / 59.94 fps</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-2">
                           <span className="text-slate-500">安全快门</span>
                           <span className="font-mono text-orange-300">1/60s, 1/120s</span>
                        </li>
                     </ul>
                     <div className="mt-6 p-3 bg-orange-900/20 rounded-lg text-xs text-orange-200 border border-orange-500/20">
                        <strong>💡 互联网标准：</strong> 大多数网络视频（YouTube/Bilibili）和电脑显示器（60Hz）更倾向于 NTSC 帧率。如果没有灯光频闪问题，30/60fps 在电脑上看起来更流畅。
                     </div>
                  </div>
               </div>

               {/* Advanced Impact Section */}
               <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                     <Activity size={20} className="text-cyan-400"/> 进阶影响
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="flex gap-4">
                        <div className="bg-slate-900 p-3 rounded-lg h-min text-slate-400"><Clock size={20}/></div>
                        <div>
                           <div className="text-sm font-bold text-white mb-1">时间码偏移 (Drop Frame)</div>
                           <p className="text-xs text-slate-400 leading-relaxed text-justify">
                              NTSC 的帧率实际上是 <span className="font-mono text-orange-400">29.97 fps</span> 而非 30 fps。这导致每小时会有 3.6 秒的时间码误差。
                              <br/>
                              广播级 NTSC 流程必须使用 <strong>Drop Frame (DF)</strong> 时间码来跳过特定帧号以修正时间，而 PAL 是完美的整数帧，无需此操作。
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="bg-slate-900 p-3 rounded-lg h-min text-slate-400"><Globe size={20}/></div>
                        <div>
                           <div className="text-sm font-bold text-white mb-1">24p 电影的转换 (Pull-down)</div>
                           <p className="text-xs text-slate-400 leading-relaxed text-justify">
                              电影标准是 24fps。
                              <br/>
                              • 转 PAL (25fps): 直接加速播放 (+4% 速度)，导致音频变调（需 Pitch Correction）。
                              <br/>
                              • 转 NTSC (30fps): 使用 <strong>3:2 Pull-down</strong> 技术，通过重复场来凑帧，保持原始速度和音调。
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};
