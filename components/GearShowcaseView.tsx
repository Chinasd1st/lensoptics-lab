
import React, { useState } from 'react';
import { Camera, Aperture, Cpu, Zap, Scan, Layers, Star, TrendingUp, MonitorPlay, Film, Anchor, Maximize, AlertTriangle } from 'lucide-react';

export const GearShowcaseView: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<'A7M5' | 'FX2' | '100GM' | '50150GM'>('A7M5');

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-black text-slate-200">
      {/* Product Navigation */}
      <div className="w-full lg:w-80 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
           <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Sony Press Release</div>
           <h2 className="text-xl font-bold text-white">2025 年度新品回顾</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
           {/* A7M5 */}
           <NavButton 
              id="A7M5" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="α7 V" 
              badge="NEW" 
              badgeColor="bg-orange-600"
              desc="全画幅新基准 · 33MP 部分堆栈"
              gradient="from-slate-800 to-slate-900 border-orange-500/50"
              accent="bg-orange-500"
           />

           {/* FX2 */}
           <NavButton 
              id="FX2" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="Cinema Line FX2" 
              badge="CINE" 
              badgeColor="bg-slate-600"
              desc="轻量化全画幅电影机 · 5月发布"
              gradient="from-slate-800 to-slate-900 border-slate-400/50"
              accent="bg-slate-400"
           />

           {/* 50-150 F2 */}
           <NavButton 
              id="50150GM" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="FE 50-150mm F2 GM" 
              badge="GM" 
              badgeColor="bg-red-600"
              desc="恒定F2变焦 · 人像神镜"
              gradient="from-slate-800 to-slate-900 border-red-500/50"
              accent="bg-red-600"
           />

           {/* 100 Macro */}
           <NavButton 
              id="100GM" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="FE 100mm F2.8 GM" 
              badge="MACRO" 
              badgeColor="bg-emerald-600"
              desc="1.4x 超微距 · 零呼吸效应"
              gradient="from-slate-800 to-slate-900 border-emerald-500/50"
              accent="bg-emerald-600"
           />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-y-auto no-scrollbar">
         {activeProduct === 'A7M5' && <A7M5Page />}
         {activeProduct === 'FX2' && <FX2Page />}
         {activeProduct === '50150GM' && <Lens50150GMPage />}
         {activeProduct === '100GM' && <Lens100GMPage />}
      </div>
    </div>
  );
};

const NavButton: React.FC<any> = ({ id, active, setActive, title, badge, badgeColor, desc, gradient, accent }) => (
   <button 
      onClick={() => setActive(id)}
      className={`w-full p-4 rounded-lg text-left transition-all border group relative overflow-hidden ${active === id ? `bg-gradient-to-r ${gradient}` : 'bg-transparent border-transparent hover:bg-slate-800'}`}
   >
      <div className="relative z-10">
         <div className="flex justify-between items-center mb-1">
            <span className={`font-bold font-mono text-lg ${active === id ? 'text-white' : 'text-slate-400'}`}>{title}</span>
            {active === id && <span className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded font-bold`}>{badge}</span>}
         </div>
         <div className="text-xs text-slate-500 group-hover:text-slate-400">{desc}</div>
      </div>
      {active === id && <div className={`absolute right-0 top-0 bottom-0 w-1 ${accent}`}></div>}
   </button>
);

// --- 1. A7M5 Page ---
const A7M5Page: React.FC = () => (
   <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-0 right-0 p-4 z-10">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-orange-500/30">
               <Star size={12} className="text-orange-500 fill-orange-500"/>
               <span className="text-xs font-bold text-orange-100">2025.12.02 发布</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #ea580c 0%, transparent 50%)'}}></div>
            <div className="text-center z-10">
               <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-2 italic">α7 <span className="text-orange-500">V</span></h1>
               <p className="text-xl text-slate-400 font-light tracking-widest uppercase">The Hybrid Master</p>
            </div>
         </div>
         <div className="p-8">
            <div className="flex justify-between items-end mb-4">
               <h2 className="text-2xl font-bold text-white">五代全能 · 堆栈普及</h2>
               <span className="text-xl font-bold text-orange-500">$2,899</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
               索尼正式发布 Alpha 7 V (ILCE-7M5)。作为微单市场的“守门员”，五代机并未采用传闻中的 42MP，而是搭载了一块全新的 <strong className="text-white">3300万像素部分堆栈式 (Partially Stacked) CMOS</strong>。这使得它拥有了接近 A9 系列的读出速度，一定程度上解决了电子快门的果冻效应问题，并实现了 30fps 的无黑屏连拍。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <SpecCard icon={<Layers className="text-orange-400"/>} label="Sensor" value="33MP" sub="部分堆栈 Exmor RS" />
         <SpecCard icon={<Cpu className="text-blue-400"/>} label="Processor" value="BIONZ XR2" sub="双芯片 + AI 单元" />
         <SpecCard icon={<MonitorPlay className="text-purple-400"/>} label="Video" value="4K 60p FF" sub="4K 120p (S35)" />
         <SpecCard icon={<Zap className="text-yellow-400"/>} label="Burst" value="30 fps" sub="无黑屏连拍" />
      </div>

      <div className="space-y-8">
         <FeatureRow 
            title="部分堆栈技术 (Partially Stacked)"
            desc="与 A9III 的全域快门不同，A7M5 采用了性价比更高的部分堆栈技术。将高速缓存电路直接集成在传感器后方，大幅提升了读出速度。果冻效应显著降低，电子快门终于可以在运动摄影和人造光源下放心使用了。"
         />
         <FeatureRow 
            title="AI 对焦 2.0"
            desc="搭载独立的 AI 处理单元，支持‘人体姿态预判’。即使人物背对相机或被遮挡，也能牢牢锁死。新增了对车辆、昆虫、飞机的实时识别。"
         />
         <FeatureRow 
            title="7.5级 防抖"
            desc="全新的防抖算法配合高精度陀螺仪，实现了最高 7.5 级的安全快门补偿。手持拍摄视频如上稳定器般平滑。"
         />
      </div>
   </div>
);

// --- 2. FX2 Page ---
const FX2Page: React.FC = () => (
   <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-0 right-0 p-4 z-10">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-slate-500/30">
               <Film size={12} className="text-slate-300"/>
               <span className="text-xs font-bold text-slate-100">2025.05 上市</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
               <div className="inline-block border border-slate-500 text-slate-300 px-2 py-0.5 text-[10px] rounded mb-2">CINEMA LINE</div>
               <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-2">FX2</h1>
               <p className="text-xl text-slate-400 font-light tracking-widest uppercase">Compact Cine Full-Frame</p>
            </div>
         </div>
         <div className="p-8">
            <div className="flex justify-between items-end mb-4">
               <h2 className="text-2xl font-bold text-white">轻量化电影机 · 个人创作者利器</h2>
               <span className="text-xl font-bold text-slate-400">$2,699</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
               索尼 Cinema Line 家族迎来新成员 FX2。定位介于 FX30 与 FX3 之间，它是一台搭载 33MP 全画幅传感器的轻型电影机。配备了专业的可倾斜 OLED 取景器，并支持完整的 S-Log3 电影工作流。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <SpecCard icon={<Layers className="text-slate-400"/>} label="Sensor" value="33MP BSI" sub="全画幅 Exmor R" />
         <SpecCard icon={<MonitorPlay className="text-slate-400"/>} label="Video" value="4K 30p FF" sub="7K 超采样" />
         <SpecCard icon={<Scan className="text-slate-400"/>} label="Log" value="S-Log3" sub="15+ 档动态范围" />
         <SpecCard icon={<Anchor className="text-slate-400"/>} label="Body" value="Compact" sub="带 EVF / 笼式设计" />
      </div>

      <div className="space-y-8">
         <FeatureRow 
            title="7K 超采样画质"
            desc="FX2 利用 3300 万像素传感器进行 7K 超采样输出 4K 30p 视频，画质锐度惊人。在 Super35 模式下支持 4K 60p 升格拍摄。"
         />
         <FeatureRow 
            title="专业 EVF 回归"
            desc="不同于 FX3 的无取景器设计，FX2 配备了 368 万点可倾斜 OLED 电子取景器，更适合户外强光下的单兵作战。"
         />
      </div>
   </div>
);

// --- 3. 50-150mm F2 GM Page ---
const Lens50150GMPage: React.FC = () => (
   <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="aspect-[21/9] bg-gradient-to-br from-zinc-900 via-black to-red-950 flex items-center justify-center relative">
             <div className="text-center z-10">
               <div className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-4">G MASTER</div>
               <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-2">FE 50-150mm <span className="text-red-500">F2</span> GM</h1>
               <p className="text-lg text-slate-400 font-light tracking-widest uppercase">The Portrait Zoom</p>
            </div>
         </div>
         <div className="p-8">
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
               继 28-70mm F2 之后，索尼再次打破物理极限。这是一支覆盖了 50mm, 85mm, 135mm 三大人像黄金焦段，且全程保持 F2 超大光圈的变焦镜头。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <SpecCard icon={<Aperture className="text-red-400"/>} label="Aperture" value="F2.0 Constant" sub="超越大三元" />
         <SpecCard icon={<Zap className="text-yellow-400"/>} label="Autofocus" value="4x XD" sub="极速对焦" />
         <SpecCard icon={<Maximize className="text-blue-400"/>} label="Range" value="50-150mm" sub="人像黄金焦段" />
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
         <h3 className="text-xl font-bold text-white mb-4">为何被称为“人像神镜”？</h3>
         <p className="text-sm text-slate-400 leading-7">
            它一支镜头就替代了 50mm F1.4, 85mm F1.4 和 135mm F1.8 三支定焦的大部分功能。虽然光圈略小一档，但 F2 在 150mm 端的虚化能力已经足以让背景完全奶油化。它是婚礼摄影师和活动摄影师的终极梦想。
         </p>
      </div>
   </div>
);

// --- 4. 100mm Macro GM Page ---
const Lens100GMPage: React.FC = () => (
   <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="aspect-[21/9] bg-gradient-to-br from-zinc-900 via-black to-emerald-950 flex items-center justify-center relative">
             <div className="text-center z-10">
               <div className="inline-block bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded mb-4">G MASTER</div>
               <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-2">FE 100mm F2.8 <span className="text-emerald-500">GM</span></h1>
               <p className="text-lg text-slate-400 font-light tracking-widest uppercase">OSS Macro</p>
            </div>
         </div>
         <div className="p-8">
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
               2025年10月11日发布。这是索尼首款 GM 级微距镜头，取代了经典的 90mm G。它拥有 1.4x 的原生放大倍率，是拍摄珠宝、昆虫和精密产品的工业级工具。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <SpecCard icon={<Scan className="text-emerald-400"/>} label="Magnification" value="1.4x" sub="原生超微距" />
         <SpecCard icon={<Anchor className="text-yellow-400"/>} label="Stabilization" value="Hybrid OSS" sub="Z轴位移补偿" />
         <SpecCard icon={<Zap className="text-blue-400"/>} label="Focus" value="XD Linear" sub="内对焦设计" />
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
         <h3 className="text-xl font-bold text-white mb-4">1.4x 放大倍率</h3>
         <p className="text-sm text-slate-400 leading-7">
            传统微距镜头只能做到 1:1。而这支 100GM 做到了 1.4:1，意味着拍摄物体在传感器上的成像比实物还要大 40%。配合 2x 增倍镜，甚至可以达到 2.8x 的显微摄影效果。
         </p>
      </div>
   </div>
);

const SpecCard: React.FC<{ icon: React.ReactNode; label: string; value: string; sub: string }> = ({ icon, label, value, sub }) => (
   <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 transition-colors">
      <div className="mb-3 p-2 bg-slate-900 rounded-full">{icon}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">{label}</div>
      <div className="text-lg font-black text-white">{value}</div>
      <div className="text-[10px] text-cyan-400 mt-1">{sub}</div>
   </div>
);

const FeatureRow: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
   <div className="border-l-2 border-slate-700 pl-6 py-2">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
   </div>
);
