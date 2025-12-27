
import React from 'react';
import { Layers, Cpu, MonitorPlay, Zap, Film, Scan, Anchor, Maximize, Dumbbell, Aperture, Info, ZoomIn, Star, BookOpen, Shield, Move, Video, Palette, Sparkles, Scale, Eye, Timer, Brain } from 'lucide-react';

// --- Shared Components ---
export const SpecCard: React.FC<{ icon: React.ReactNode; label: string; value: string; sub: string }> = ({ icon, label, value, sub }) => (
   <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 flex flex-col items-start hover:bg-slate-700/50 transition-colors select-none group min-w-[140px]">
      <div className="mb-3 p-2 bg-slate-900/80 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">{icon}</div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</div>
      <div className="text-lg font-black text-white leading-tight break-words w-full">{value}</div>
      <div className="text-[10px] text-cyan-400/80 mt-1 font-mono">{sub}</div>
   </div>
);

export const FeatureRow: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
   <div className="relative pl-6 py-2 select-none group">
      <div className="absolute left-0 top-3 bottom-1 w-1 bg-slate-700 group-hover:bg-cyan-500 transition-colors rounded-full"></div>
      <h3 className="text-lg font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed text-justify">{desc}</p>
   </div>
);

export const TechDeepDive: React.FC<{ items: { term: string; icon: React.ReactNode; def: string; why: string }[] }> = ({ items }) => (
   <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
         <BookOpen size={18} className="text-cyan-400" />
         <h3 className="text-sm font-bold text-white uppercase tracking-widest">技术深度解析 (Tech Glossary)</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {items.map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-all group">
               <div className="flex items-center gap-2 mb-3">
                  <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">{item.icon}</span>
                  <span className="text-sm font-bold text-slate-200">{item.term}</span>
               </div>
               <div className="space-y-2">
                  <p className="text-xs text-slate-400 leading-relaxed text-justify border-l-2 border-slate-700 pl-3">
                     <strong className="text-slate-500 block text-[10px] uppercase mb-0.5">定义</strong>
                     {item.def}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify border-l-2 border-cyan-900/50 pl-3">
                     <strong className="text-cyan-600 block text-[10px] uppercase mb-0.5">核心优势</strong>
                     {item.why}
                  </p>
               </div>
            </div>
         ))}
      </div>
   </div>
);

// --- NEW 0. A1M2 Page (8K) ---
export const A1M2Page: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Image & Title */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-500/30">
               <Star size={12} className="text-yellow-500 fill-yellow-500"/>
               <span className="text-[10px] font-bold text-yellow-100 tracking-wide">RELEASED NOV 2024</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 via-neutral-900 to-black flex flex-col items-center justify-center relative overflow-hidden p-8">
            <div className="text-center z-10 w-full">
               <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-2 italic">
                  α1 <span className="text-yellow-500">II</span>
               </h1>
               <p className="text-lg text-slate-400 font-light tracking-[0.3em] uppercase mt-4">The One. Reborn.</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
               <div>
                  <h2 className="text-2xl font-bold text-white mb-1">全画幅微单™旗舰 · AI 进化</h2>
                  <div className="text-xs text-slate-500 bg-slate-800 px-2 py-1 inline-block rounded">
                     发布时间: 2024年11月19日 (非2025新品)
                  </div>
               </div>
               <span className="text-2xl font-black text-yellow-500">$6,499</span>
            </div>
            <p className="text-sm text-slate-300 leading-7 text-justify max-w-3xl">
               索尼正式发布新一代旗舰 Alpha 1 II (ILCE-1M2)。配备约 5010 万有效像素 Exmor RS™ 堆栈式传感器与内置 AI 智能芯片。
               支持 AF/AE 追踪的约 30 张/秒无黑屏高速连拍，具备防畸变快门，并大幅提升了高感光画质与防抖性能（中心 8.5 级）。
               机身重量仅约 743 克，专为专业生态、新闻、体育及航空航天摄影师打造。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <SpecCard icon={<Layers className="text-yellow-400"/>} label="Sensor" value="50.1MP" sub="Exmor RS 堆栈式" />
         <SpecCard icon={<Brain className="text-purple-400"/>} label="AI Processing" value="Subject Auto" sub="自动识别主体类型" />
         <SpecCard icon={<Timer className="text-blue-400"/>} label="Pre-Capture" value="1.0 Sec" sub="预拍摄功能" />
         <SpecCard icon={<Shield className="text-emerald-400"/>} label="IBIS" value="8.5 Stops" sub="中心 8.5级 / 周边 7.0级" />
      </div>

      <TechDeepDive items={[
         {
            term: "预拍摄 (Pre-Capture)",
            icon: <Timer size={16}/>,
            def: "在半按快门时就开始缓存图像，按下快门瞬间可记录此前最多 1 秒的画面。",
            why: "对于拍摄鸟类起飞、运动员起跑等不可预测的瞬间至关重要，彻底解决了“反应慢半拍”的问题。"
         },
         {
            term: "8.5级 协同防抖",
            icon: <Shield size={16}/>,
            def: "中心最高 8.5 级，周边 7.0 级。配合动态防抖增强模式 (Active Mode) 进一步提升视频稳定性。",
            why: "在高像素下，微小的抖动都会被放大。极致的防抖让 5000 万像素手持慢门拍摄成为可能。"
         },
         {
            term: "AI 智能主体识别 (Auto)",
            icon: <Scan size={16}/>,
            def: "新增“自动”模式，无需手动切换鸟/车/人。AI 芯片可自动判断画面中的主体类型。",
            why: "在生态摄影或复杂活动现场，摄影师无需分心切换菜单，相机能瞬间识别并锁定人、动物、鸟类、昆虫、交通工具等。"
         },
         {
            term: "8K 30p / 4K 120p",
            icon: <Video size={16}/>,
            def: "支持 8.6K 超采样的 8K 视频录制，以及 4K 120p 高帧率录制。",
            why: "提供了极高的后期裁切空间和慢动作创作能力。8K 视频每一帧都可截取为 3300 万像素的高质量照片。"
         }
      ]}/>
   </div>
);

// --- 1. A7M5 Page ---
export const A7M5Page: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 shadow-lg">
               <Star size={12} className="text-orange-500 fill-orange-500"/>
               <span className="text-[10px] font-bold text-orange-100 tracking-wide">2025.12.02 RELEASE</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden p-8">
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(234, 88, 12, 0.15) 0%, transparent 60%)'}}></div>
            <div className="text-center z-10 max-w-3xl w-full px-4">
               {/* Fixed Overflow: Responsive text sizing */}
               <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-2 italic drop-shadow-2xl break-words whitespace-normal leading-none">
                  α7 <span className="text-orange-500">V</span>
               </h1>
               <p className="text-sm lg:text-lg text-slate-400 font-light tracking-[0.2em] uppercase border-t border-slate-700/50 pt-4 mt-4">The Hybrid Master</p>
            </div>
         </div>
         <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
               <h2 className="text-2xl font-bold text-white leading-tight">五代全能 · 堆栈普及</h2>
               <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">MSRP</div>
                  <span className="text-2xl font-black text-orange-500">$2,899</span>
               </div>
            </div>
            <p className="text-sm text-slate-300 leading-7 text-justify max-w-3xl">
               索尼正式发布 Alpha 7 V (ILCE-7M5)。作为微单市场的“守门员”，五代机并未采用传闻中的 42MP，而是搭载了一块全新的 <strong className="text-orange-200 bg-orange-900/30 px-1 rounded">3300万像素部分堆栈式 (Partially Stacked) CMOS</strong>。这使得它拥有了接近 A9 系列的读出速度，彻底解决了电子快门的果冻效应问题，并实现了 30fps 的无黑屏连拍。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <SpecCard icon={<Layers className="text-orange-400"/>} label="Sensor" value="33MP" sub="部分堆栈 Exmor RS" />
         <SpecCard icon={<Cpu className="text-blue-400"/>} label="Processor" value="BIONZ XR2" sub="双芯片 + AI 单元" />
         <SpecCard icon={<MonitorPlay className="text-purple-400"/>} label="Video" value="4K 60p FF" sub="4K 120p (S35)" />
         <SpecCard icon={<Zap className="text-yellow-400"/>} label="Burst" value="30 fps" sub="无黑屏连拍" />
      </div>

      <TechDeepDive items={[
         {
            term: "部分堆栈 CMOS (Partially Stacked)",
            icon: <Layers size={16}/>,
            def: "介于传统背照式（BSI）和全堆栈式（Stacked）之间。它只在传感器边缘集成了高速缓存电路，而非整个像素区域。",
            why: "大幅降低了制造成本，同时提供了接近全堆栈传感器的读出速度。这让电子快门在拍摄运动物体时不再产生明显的变形（果冻效应）。"
         },
         {
            term: "AI 智能芯片 (AI Processing Unit)",
            icon: <Cpu size={16}/>,
            def: "独立于图像处理器（BIONZ XR）之外的专用 AI 芯片，专门负责处理大量的主体识别算法。",
            why: "实现了人体姿态估算。即使人物背对相机、戴着头盔或被树木遮挡，相机依然能通过骨架模型锁定焦点，而不仅仅依赖面部识别。"
         },
         {
            term: "7.5级 防抖 (7.5-Stop IBIS)",
            icon: <Shield size={16}/>,
            def: "通过更灵敏的陀螺仪传感器和算法，让传感器在机身内进行更大范围的位移补偿。",
            why: "手持拍摄视频时，可以获得类似使用独脚架的稳定性。对于长曝光摄影，手持 1 秒不糊片成为可能。"
         },
         {
            term: "4K 60p 超采样",
            icon: <MonitorPlay size={16}/>,
            def: "使用传感器上的 7K 像素信息生成 4K 视频，而非跳过部分像素（Binning）。",
            why: "画面锐度极高，噪点更少。虽然 A7M5 的 4K60p 仍有 1.1x 的轻微裁切，但画质远超同级竞品。"
         }
      ]}/>
   </div>
);

// --- 2. FX2 Page ---
export const FX2Page: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-500/30">
               <Film size={12} className="text-slate-300"/>
               <span className="text-[10px] font-bold text-slate-200">AVAILABLE MAY 2025</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center relative overflow-hidden p-8">
            <div className="text-center z-10 w-full">
               <div className="inline-block border border-slate-600 bg-slate-800/50 text-slate-300 px-3 py-1 text-[10px] font-bold rounded mb-4 tracking-wider">CINEMA LINE</div>
               <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-2">FX2</h1>
               <p className="text-lg lg:text-xl text-slate-500 font-light tracking-[0.2em] uppercase">Compact Cine Full-Frame</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
               <h2 className="text-2xl font-bold text-white">轻量化电影机 · 个人创作者利器</h2>
               <span className="text-2xl font-black text-slate-400">$2,699</span>
            </div>
            <p className="text-sm text-slate-300 leading-7 text-justify max-w-3xl">
               索尼 Cinema Line 家族迎来新成员 FX2。定位介于 FX30 与 FX3 之间，它是一台搭载 33MP 全画幅传感器的轻型电影机。配备了专业的可倾斜 OLED 取景器，并支持完整的 S-Log3 电影工作流。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <SpecCard icon={<Layers className="text-slate-400"/>} label="Sensor" value="33MP BSI" sub="全画幅 Exmor R" />
         <SpecCard icon={<MonitorPlay className="text-slate-400"/>} label="Video" value="4K 30p FF" sub="7K 超采样" />
         <SpecCard icon={<Scan className="text-slate-400"/>} label="Log" value="S-Log3" sub="15+ 档动态范围" />
         <SpecCard icon={<Anchor className="text-slate-400"/>} label="Body" value="Compact" sub="带 EVF / 笼式设计" />
      </div>

      <TechDeepDive items={[
         {
            term: "S-Cinetone",
            icon: <Palette size={16}/>,
            def: "源自威尼斯（Venice）高端电影机的色彩科学，专门针对数码传感器的人像肤色进行了优化。",
            why: "直出画面即可拥有电影质感，肤色红润通透，高光滚落（Roll-off）柔和。适合不进行复杂后期调色的快速交付项目。"
         },
         {
            term: "双原生 ISO (Dual Base ISO)",
            icon: <Zap size={16}/>,
            def: "传感器拥有两套独立的模拟放大电路（例如 ISO 800 和 ISO 12800）。",
            why: "在极暗环境下切换到第二档原生 ISO，底噪会突然消失，画质洁净度几乎等同于低感光度。这是夜景拍摄的神器。"
         },
         {
            term: "Cine EI 模式",
            icon: <Film size={16}/>,
            def: "一种锁死传感器增益，只改变元数据（Metadata）监看亮度的曝光模式。",
            why: "强制摄影师始终使用传感器动态范围最大的档位（Base ISO）进行拍摄，确保每一帧素材都拥有最佳的宽容度，是好莱坞工业标准流程。"
         },
         {
            term: "变形反挤压 (De-squeeze)",
            icon: <Maximize size={16}/>,
            def: "机内实时将变形宽银幕镜头拍摄的压缩画面还原为正常的宽幅比例。",
            why: "让摄影师在监视器上看到正常的构图，而不是被压扁的画面，极大方便了现场构图和监看。"
         }
      ]}/>
   </div>
);

// --- 3. 400-800 G Page ---
export const Lens400800GPage: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-500/30">
               <Anchor size={12} className="text-slate-300"/>
               <span className="text-[10px] font-bold text-slate-200">2025.02.26</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden p-8">
             <div className="text-center z-10 w-full">
               <div className="inline-block bg-black border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded mb-4 shadow-lg">SONY G</div>
               <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 leading-tight break-words">
                  FE 400-800mm <br className="hidden md:inline"/><span className="text-slate-500 font-light">F6.3-8</span> G OSS
               </h1>
               <p className="text-lg text-slate-400 font-light tracking-[0.2em] uppercase mt-4">Super Telephoto Zoom</p>
            </div>
         </div>
         <div className="p-8 flex flex-col md:flex-row justify-between items-end gap-6 bg-slate-900">
            <p className="text-sm text-slate-300 leading-7 max-w-2xl text-justify">
               Sony α 系统首支达到 800mm 的超远摄变焦镜头。专为野生动物、航空航天和体育摄影师设计，采用内变焦设计，重心极致稳定。支持 2x 增倍镜扩展至 1600mm。
            </p>
            <div className="text-right shrink-0">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">MSRP</div>
                <div className="text-3xl font-black text-white">$2,899</div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
         <SpecCard icon={<Maximize className="text-blue-400"/>} label="Focal Length" value="400-800mm" sub="支持 2x 增倍镜" />
         <SpecCard icon={<Anchor className="text-yellow-400"/>} label="Mechanics" value="Internal Zoom" sub="内变焦设计" />
         <SpecCard icon={<Dumbbell className="text-slate-400"/>} label="Weight" value="2,475g" sub="轻量化设计" />
      </div>

      <TechDeepDive items={[
         {
            term: "内变焦 (Internal Zoom)",
            icon: <Scale size={16}/>,
            def: "变焦时，镜头前端不会伸出，镜筒总长度保持不变。",
            why: "对于超长焦镜头至关重要。它保证了整套设备的重心不会随焦距改变而大幅移动，这对于使用悬臂云台（Gimbal）或液压云台拍摄视频非常重要。"
         },
         {
            term: "XD 线性马达 (Extreme Dynamic)",
            icon: <Zap size={16}/>,
            def: "索尼专利的电磁驱动系统，无齿轮、无摩擦。",
            why: "能推动 400-800mm 这种沉重的镜片组进行极高频率的微调（每秒数百次），是实现体育摄影中“咬住”高速移动物体的关键。"
         },
         {
            term: "OSS 光学防抖 (Optical SteadyShot)",
            icon: <Anchor size={16}/>,
            def: "镜头内部的浮动镜组会根据陀螺仪数据反向移动，抵消手部抖动。",
            why: "在 800mm 端，极微小的抖动都会被放大几十倍。OSS 与机身防抖协同工作，能让摄影师在没有三脚架的情况下也能手持拍摄清晰的画面。"
         }
      ]}/>
   </div>
);

// --- 4. 50-150mm F2 GM Page ---
export const Lens50150GMPage: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="aspect-[21/9] bg-gradient-to-br from-zinc-900 via-black to-red-950 flex flex-col items-center justify-center relative p-8">
             <div className="text-center z-10 w-full">
               <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded mb-4 shadow-lg">G MASTER</div>
               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-2 leading-tight break-words">
                  FE 50-150mm <span className="text-red-500">F2</span> GM
               </h1>
               <p className="text-lg text-slate-400 font-light tracking-[0.2em] uppercase mt-4">The Portrait Zoom</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900">
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
               继 28-70mm F2 之后，索尼再次打破物理极限。这是一支覆盖了 50mm, 85mm, 135mm 三大人像黄金焦段，且全程保持 <strong className="text-white">F2 超大光圈</strong> 的变焦镜头。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
         <SpecCard icon={<Aperture className="text-red-400"/>} label="Aperture" value="F2.0 Constant" sub="超越大三元" />
         <SpecCard icon={<Zap className="text-yellow-400"/>} label="Autofocus" value="4x XD" sub="极速对焦" />
         <SpecCard icon={<Maximize className="text-blue-400"/>} label="Range" value="50-150mm" sub="人像黄金焦段" />
      </div>

      <TechDeepDive items={[
         {
            term: "XA 镜片 (Extreme Aspherical)",
            icon: <Aperture size={16}/>,
            def: "表面研磨精度达到 0.01 微米级别的非球面镜片。",
            why: "消除了传统非球面镜片常见的“洋葱圈”焦外光斑。让 F2 光圈下的背景虚化如奶油般顺滑，这对于人像镜头至关重要。"
         },
         {
            term: "浮动对焦 (Floating Focus)",
            icon: <Move size={16}/>,
            def: "镜头内有两组独立的对焦镜组，分别由独立的马达驱动，在不同对焦距离下改变相对位置。",
            why: "确保镜头在“最近对焦距离”和“无限远”都能保持极高的锐度。传统镜头通常只针对无限远优化，近摄画质会下降，而浮动对焦解决了这个问题。"
         },
         {
            term: "纳米 AR 镀膜 II",
            icon: <Sparkles size={16}/>,
            def: "一种纳米级的多孔涂层，能极大地降低镜片表面的折射率。",
            why: "在逆光拍摄人像时（如夕阳下的发丝光），能彻底消除鬼影和眩光，保持画面的纯净度和对比度。"
         }
      ]}/>
   </div>
);

// --- 5. 100mm Macro GM Page ---
export const Lens100GMPage: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="aspect-[21/9] bg-gradient-to-br from-zinc-900 via-black to-emerald-950 flex flex-col items-center justify-center relative p-8">
             <div className="text-center z-10 w-full">
               <div className="inline-block bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded mb-4 shadow-lg">G MASTER</div>
               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-2 leading-tight break-words">
                  FE 100mm F2.8 <span className="text-emerald-500">GM</span>
               </h1>
               <p className="text-lg text-slate-400 font-light tracking-[0.2em] uppercase mt-4">OSS Macro</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900">
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
               2025年10月11日发布。这是索尼首款 GM 级微距镜头，取代了经典的 90mm G。它拥有 1.4x 的原生放大倍率，是拍摄珠宝、昆虫和精密产品的工业级工具。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
         <SpecCard icon={<Scan className="text-emerald-400"/>} label="Magnification" value="1.4x" sub="原生超微距" />
         <SpecCard icon={<Anchor className="text-yellow-400"/>} label="Stabilization" value="Hybrid OSS" sub="Z轴位移补偿" />
         <SpecCard icon={<Zap className="text-blue-400"/>} label="Focus" value="XD Linear" sub="内对焦设计" />
      </div>

      <TechDeepDive items={[
         {
            term: "放大倍率 1.4:1",
            icon: <ZoomIn size={16}/>,
            def: "物体在传感器上成的像，比物体本身还要大 1.4 倍。",
            why: "突破了传统微距 1:1 的限制。拍摄昆虫复眼、芯片电路或珠宝瑕疵时，能展现肉眼完全无法看见的微观细节。"
         },
         {
            term: "球差控制环 (SA Control)",
            icon: <Aperture size={16}/>,
            def: "允许用户手动调整球差的程度（Negative 或 Positive）。",
            why: "不仅仅是微距镜，它还是一支柔焦人像镜。向左拧可以获得类似“老镜头”的梦幻柔光效果，向右拧则获得极度锐利的现代画质。一镜两用。"
         },
         {
            term: "呼吸效应抑制 (Breathing Compensation)",
            icon: <Video size={16}/>,
            def: "光学设计上极力减小对焦时的视角变化。",
            why: "对于视频拍摄至关重要。进行焦点堆栈（Focus Stacking）拍摄时，视角的稳定保证了后期合成的完美对齐。"
         }
      ]}/>
   </div>
);

// --- 6. Teleconverter Guide Page ---
export const TeleconverterPage: React.FC = () => (
   <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
         <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-500/30">
               <Info size={12} className="text-blue-400"/>
               <span className="text-[10px] font-bold text-blue-100">KNOWLEDGE BASE</span>
            </div>
         </div>
         <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 via-blue-950 to-black flex flex-col items-center justify-center relative overflow-hidden p-8">
             <div className="text-center z-10 w-full">
               <div className="inline-block border border-blue-500/50 bg-blue-900/20 text-blue-300 px-3 py-1 text-[10px] font-bold rounded mb-4 tracking-wider">E-MOUNT SYSTEM</div>
               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-2 break-words">Teleconverters</h1>
               <p className="text-lg text-slate-400 font-light tracking-[0.2em] uppercase mt-2">1.4x & 2.0x 增距镜详解</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900">
            <h2 className="text-2xl font-bold text-white mb-2">以光圈换取射程的艺术</h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl text-justify">
               增距镜（Teleconverter）是安装在机身与镜头之间的精密光学元件。它通过光学放大原理，以牺牲进光量（光圈值）为代价，将镜头的物理焦距延长 1.4倍 或 2.0倍。是野生动物、航空和体育摄影师的必备工具。
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* 1.4x Card */}
         <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="p-6 border-b border-slate-800 bg-slate-800/50">
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className="text-xl font-bold text-white">SEL14TC (1.4x)</h3>
                     <p className="text-xs text-slate-400">平衡之选</p>
                  </div>
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold">主流推荐</span>
               </div>
            </div>
            <div className="p-6 space-y-4">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">焦距倍率</span>
                  <span className="text-white font-mono font-bold">1.4x</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">光圈损失</span>
                  <span className="text-red-400 font-mono font-bold">-1 Stop</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">画质影响</span>
                  <span className="text-emerald-400 font-mono font-bold">极小</span>
               </div>
               <div className="bg-black/20 p-3 rounded text-xs text-slate-300 mt-4 leading-relaxed">
                  <strong className="text-blue-400 block mb-1">最佳用途：</strong> 几乎不影响对焦速度和画质，是 70-200GM 和 100-400GM 的常驻挂机附件。
               </div>
            </div>
         </div>

         {/* 2.0x Card */}
         <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="p-6 border-b border-slate-800 bg-slate-800/50">
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className="text-xl font-bold text-white">SEL20TC (2.0x)</h3>
                     <p className="text-xs text-slate-400">极致射程</p>
                  </div>
                  <span className="bg-purple-600 text-white text-[10px] px-2 py-1 rounded font-bold">特定用途</span>
               </div>
            </div>
            <div className="p-6 space-y-4">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">焦距倍率</span>
                  <span className="text-white font-mono font-bold">2.0x</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">光圈损失</span>
                  <span className="text-red-400 font-mono font-bold">-2 Stops</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">画质影响</span>
                  <span className="text-yellow-400 font-mono font-bold">轻微可见</span>
               </div>
               <div className="bg-black/20 p-3 rounded text-xs text-slate-300 mt-4 leading-relaxed">
                  <strong className="text-purple-400 block mb-1">最佳用途：</strong> 配合最新的 FE 400-800mm 镜头，可获得惊人的 1600mm 焦距。但在弱光下对焦会变慢。
               </div>
            </div>
         </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><ZoomIn size={18} className="text-cyan-400"/> 典型搭配效果预览</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-400 border-collapse min-w-[600px]">
               <thead>
                  <tr className="border-b border-slate-700 text-slate-200">
                     <th className="py-3 pl-2 w-1/3">原镜头</th>
                     <th className="py-3 text-blue-300 w-1/3">+ 1.4x (SEL14TC)</th>
                     <th className="py-3 text-purple-300 w-1/3">+ 2.0x (SEL20TC)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/50 transition-colors">
                     <td className="py-4 pl-2 font-bold text-white">70-200mm F2.8 GM II</td>
                     <td className="py-4 font-mono text-slate-300">98-280mm F4</td>
                     <td className="py-4 font-mono text-slate-300">140-400mm F5.6</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                     <td className="py-4 pl-2 font-bold text-white">200-600mm F5.6-6.3 G</td>
                     <td className="py-4 font-mono text-slate-300">280-840mm F8-9</td>
                     <td className="py-4 font-mono text-yellow-500">400-1200mm F11-13 *</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 bg-slate-800/20 transition-colors border-l-2 border-cyan-500">
                     <td className="py-4 pl-2 font-bold text-cyan-400">400-800mm F6.3-8 G (NEW)</td>
                     <td className="py-4 font-mono text-white">560-1120mm F9-11</td>
                     <td className="py-4 font-mono text-white">800-1600mm F13-16</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <p className="mt-4 text-[10px] text-slate-500 italic bg-black/20 p-2 rounded">
            * 标注黄色部分：光圈过小 (F11+)，仅 A1/A9/A7RV 等高性能机身支持相位对焦，普通机身可能仅支持反差对焦或无法自动对焦。
         </p>
      </div>
   </div>
);
