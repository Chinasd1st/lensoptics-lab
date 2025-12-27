
import React, { useState, Suspense, useMemo, useRef, useEffect } from 'react';
import { ModuleType } from './types';
import { Camera, Ruler, Aperture, Zap, Microscope, Cpu, Layers, Film, ScanLine, Video, Disc, Settings2, Palette, Workflow, Eye, Newspaper, Search, ArrowRight, Book, Volume2, Tv, Loader2, AlertTriangle, CheckCircle, MousePointer2, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import Fuse from 'fuse.js';
import { FULL_SEARCH_INDEX, SearchItem } from './utils/searchIndex';

// Lazy Load Components
const GeometricView = React.lazy(() => import('./components/GeometricView').then(m => ({ default: m.GeometricView })));
const ZoomSystemView = React.lazy(() => import('./components/ZoomSystemView').then(m => ({ default: m.ZoomSystemView })));
const LensAdvancedView = React.lazy(() => import('./components/LensAdvancedView').then(m => ({ default: m.LensAdvancedView })));
const MechanicsView = React.lazy(() => import('./components/MechanicsView').then(m => ({ default: m.MechanicsView })));
const SensorExposureView = React.lazy(() => import('./components/SensorExposureView').then(m => ({ default: m.SensorExposureView })));
const DigitalISPView = React.lazy(() => import('./components/DigitalISPView').then(m => ({ default: m.DigitalISPView })));
const VideoEngineeringView = React.lazy(() => import('./components/VideoEngineeringView').then(m => ({ default: m.VideoEngineeringView })));
const CinematographyView = React.lazy(() => import('./components/CinematographyView').then(m => ({ default: m.CinematographyView })));
const OpticalFiltersView = React.lazy(() => import('./components/OpticalFiltersView').then(m => ({ default: m.OpticalFiltersView })));
const PostProductionView = React.lazy(() => import('./components/PostProductionView').then(m => ({ default: m.PostProductionView })));
const GearShowcaseView = React.lazy(() => import('./components/GearShowcaseView').then(m => ({ default: m.GearShowcaseView })));
const SonySystemView = React.lazy(() => import('./components/SonySystemView').then(m => ({ default: m.SonySystemView })));
const LoudnessStandardView = React.lazy(() => import('./components/LoudnessStandardView').then(m => ({ default: m.LoudnessStandardView })));
const BroadcastStandardsView = React.lazy(() => import('./components/BroadcastStandardsView').then(m => ({ default: m.BroadcastStandardsView })));

const LoadingFallback = () => (
   <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500">
      <Loader2 size={32} className="animate-spin mb-4 text-cyan-500"/>
      <div className="text-xs font-mono">LOADING MODULE...</div>
   </div>
);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.GEAR_SHOWCASE);
  const [activeTabOverride, setActiveTabOverride] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize Fuse.js
  const fuse = useMemo(() => new Fuse(FULL_SEARCH_INDEX, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'keywords', weight: 0.3 },
      { name: 'desc', weight: 0.2 }
    ],
    threshold: 0.4, // Fuzzy threshold (0.0 = perfect match, 1.0 = match anything)
    includeScore: true
  }), []);

  const handleModuleChange = (m: ModuleType, tab?: string) => {
    setActiveModule(m);
    setActiveTabOverride(tab); // Set the target tab
    setIsSidebarOpen(false);
    setSearchQuery(''); // Clear search on select
    setShowIntro(false); // Ensure we leave intro
  };

  const renderModule = () => {
    const commonProps = { initialTab: activeTabOverride };

    switch (activeModule) {
      case ModuleType.GEOMETRIC_OPTICS: return <GeometricView {...commonProps} />;
      case ModuleType.ZOOM_SYSTEM: return <ZoomSystemView {...commonProps} />;
      case ModuleType.OPTICAL_FILTERS: return <OpticalFiltersView {...commonProps} />;
      case ModuleType.LENS_ADVANCED: return <LensAdvancedView {...commonProps} />;
      case ModuleType.MECHANICS: return <MechanicsView {...commonProps} />;
      case ModuleType.CINEMATOGRAPHY: return <CinematographyView {...commonProps} />;
      case ModuleType.SENSOR_EXPOSURE: return <SensorExposureView {...commonProps} />;
      case ModuleType.DIGITAL_ISP: return <DigitalISPView {...commonProps} />;
      case ModuleType.VIDEO_ENGINEERING: return <VideoEngineeringView {...commonProps} />;
      case ModuleType.POST_PRODUCTION: return <PostProductionView {...commonProps} />;
      case ModuleType.GEAR_SHOWCASE: return <GearShowcaseView {...commonProps} />;
      case ModuleType.SONY_SYSTEM: return <SonySystemView {...commonProps} />;
      case ModuleType.LOUDNESS_STANDARD: return <LoudnessStandardView {...commonProps} />;
      case ModuleType.BROADCAST_STANDARDS: return <BroadcastStandardsView {...commonProps} />;
      default: return <GearShowcaseView />;
    }
  };

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, fuse]);

  if (showIntro) {
     return <IntroView onEnter={(m) => handleModuleChange(m || ModuleType.GEAR_SHOWCASE)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-900 shrink-0 z-40 shadow-xl">
        <div className="flex items-center gap-3 text-cyan-400 cursor-pointer" onClick={() => setShowIntro(true)}>
          <Workflow size={24} />
          <h1 className="text-base lg:text-lg font-bold tracking-tight text-white">
            Cine<span className="text-cyan-400">Tech</span> Architecture
            <span className="hidden sm:inline-block text-[10px] ml-2 font-normal text-slate-500 border border-slate-700 px-2 py-0.5 rounded">MASTERCLASS v7.5</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Enhanced Accordion Style */}
        <nav className={`
          fixed lg:relative z-30 h-full bg-slate-900 border-r border-slate-800 transition-transform duration-300 w-80 flex flex-col shrink-0
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Search Box */}
          <div className="p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                <input 
                  type="text" 
                  placeholder="搜索模块 / 知识点 (e.g. Log, ISO)" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-cyan-500 outline-none text-slate-200 placeholder-slate-600"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1">
            
            {/* Search Results Mode */}
            {searchQuery.length > 1 ? (
               <div className="space-y-2 animate-in fade-in slide-in-from-top-2 p-1">
                  <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2 px-2">
                     Results ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                     searchResults.map((item, idx) => (
                        <button 
                           key={idx}
                           onClick={() => handleModuleChange(item.module, item.tab)}
                           className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-lg group transition-all"
                        >
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400">{item.title}</span>
                              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-cyan-500 transition-opacity"/>
                           </div>
                           <div className="text-[10px] text-slate-500 line-clamp-2">{item.desc}</div>
                        </button>
                     ))
                  ) : (
                     <div className="text-center py-8 text-slate-600 text-xs">
                        未找到相关内容
                        <br/>
                        <span className="opacity-50">Try: "球差", "10bit", "Sony"</span>
                     </div>
                  )}
               </div>
            ) : (
               /* Standard Accordion Navigation Mode */
               <>
                  <div className="mb-4">
                     <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Featured</div>
                     <NavButton active={activeModule === ModuleType.GEAR_SHOWCASE} onClick={() => handleModuleChange(ModuleType.GEAR_SHOWCASE)} icon={<Newspaper size={18}/>} label="器材陈列室 (Showcase)" subLabel="2025 新品 / α9 III" />
                     <NavButton active={activeModule === ModuleType.SONY_SYSTEM} onClick={() => handleModuleChange(ModuleType.SONY_SYSTEM)} icon={<Book size={18}/>} label="索尼系统百科 (Sony Wiki)" subLabel="E卡口 / 菜单 / 专有名词" />
                  </div>

                  <NavGroup title="1. 物理光学 (Optics)" defaultOpen={true}>
                    <NavButton active={activeModule === ModuleType.GEOMETRIC_OPTICS} onClick={() => handleModuleChange(ModuleType.GEOMETRIC_OPTICS)} icon={<Ruler size={18}/>} label="几何光学基础" />
                    <NavButton active={activeModule === ModuleType.LENS_ADVANCED} onClick={() => handleModuleChange(ModuleType.LENS_ADVANCED)} icon={<Aperture size={18}/>} label="镜头工程与像差" subLabel="非球面 / MTF / 镀膜" />
                    <NavButton active={activeModule === ModuleType.ZOOM_SYSTEM} onClick={() => handleModuleChange(ModuleType.ZOOM_SYSTEM)} icon={<Microscope size={18}/>} label="变焦系统结构" />
                    <NavButton active={activeModule === ModuleType.OPTICAL_FILTERS} onClick={() => handleModuleChange(ModuleType.OPTICAL_FILTERS)} icon={<Disc size={18}/>} label="前置物理滤镜" subLabel="ND / CPL / Mist" />
                  </NavGroup>

                  <NavGroup title="2. 摄影机硬件 (Hardware)">
                    <NavButton active={activeModule === ModuleType.SENSOR_EXPOSURE} onClick={() => handleModuleChange(ModuleType.SENSOR_EXPOSURE)} icon={<ScanLine size={18}/>} label="传感器与曝光" subLabel="18%灰 / 双原生ISO" />
                    <NavButton active={activeModule === ModuleType.MECHANICS} onClick={() => handleModuleChange(ModuleType.MECHANICS)} icon={<Zap size={18}/>} label="机身机械系统" subLabel="马达 / 防抖 / 法兰距" />
                    <NavButton active={activeModule === ModuleType.CINEMATOGRAPHY} onClick={() => handleModuleChange(ModuleType.CINEMATOGRAPHY)} icon={<Video size={18}/>} label="电影摄影技术" subLabel="布光 / 运镜 / 变形镜头" />
                  </NavGroup>

                  <NavGroup title="3. 信号与流程 (Pipeline)">
                    <NavButton active={activeModule === ModuleType.DIGITAL_ISP} onClick={() => handleModuleChange(ModuleType.DIGITAL_ISP)} icon={<Cpu size={18}/>} label="ISP 信号处理" subLabel="拜耳 / 色深 / Log" />
                    <NavButton active={activeModule === ModuleType.VIDEO_ENGINEERING} onClick={() => handleModuleChange(ModuleType.VIDEO_ENGINEERING)} icon={<Film size={18}/>} label="视频编码工程" subLabel="ProRes / H.265 / GOP" />
                  </NavGroup>

                  <NavGroup title="4. 后期交付 (Post & Deliver)">
                    <NavButton active={activeModule === ModuleType.POST_PRODUCTION} onClick={() => handleModuleChange(ModuleType.POST_PRODUCTION)} icon={<Palette size={18}/>} label="DI 数字中间片" subLabel="DaVinci 调色流程" />
                    <NavButton active={activeModule === ModuleType.LOUDNESS_STANDARD} onClick={() => handleModuleChange(ModuleType.LOUDNESS_STANDARD)} icon={<Volume2 size={18}/>} label="音频响度标准" subLabel="LUFS / 混音工作流" />
                    <NavButton active={activeModule === ModuleType.BROADCAST_STANDARDS} onClick={() => handleModuleChange(ModuleType.BROADCAST_STANDARDS)} icon={<Tv size={18}/>} label="广播电视制式" subLabel="PAL / NTSC" />
                  </NavGroup>
               </>
            )}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 relative overflow-hidden bg-slate-950">
          <Suspense fallback={<LoadingFallback />}>
             <React.Fragment key={activeModule}>
                {renderModule()}
             </React.Fragment>
          </Suspense>
        </main>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/80 z-20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        )}
      </div>
    </div>
  );
};

const IntroView: React.FC<{ onEnter: (m?: ModuleType) => void }> = ({ onEnter }) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const heroRef = useRef<HTMLDivElement>(null);
   const isScrollingRef = useRef(false);

   // Nonlinear Easing Function: Ease Out Expo
   // Starts fast, ends very slowly. "Future Tech" feel.
   const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
   };

   const scrollToContent = () => {
      if (isScrollingRef.current || !containerRef.current || !contentRef.current) return;
      
      const container = containerRef.current;
      const targetPos = contentRef.current.offsetTop;
      const startPos = container.scrollTop;
      const distance = targetPos - startPos;
      const duration = 800; // Reduced from 1200ms for snappier feel
      let startTime: number | null = null;

      isScrollingRef.current = true;

      const animation = (currentTime: number) => {
         if (!startTime) startTime = currentTime;
         const timeElapsed = currentTime - startTime;
         const progress = Math.min(timeElapsed / duration, 1);
         
         const ease = easeOutExpo(progress);
         
         if (container) {
            container.scrollTop = startPos + (distance * ease);
         }

         if (timeElapsed < duration) {
            requestAnimationFrame(animation);
         } else {
            isScrollingRef.current = false;
         }
      };

      requestAnimationFrame(animation);
   };

   // Listen for wheel events on the Hero section to trigger the smooth scroll
   useEffect(() => {
      const hero = heroRef.current;
      if (!hero) return;

      const handleWheel = (e: WheelEvent) => {
         // Only trigger if scrolling down and not already scrolling
         if (e.deltaY > 0 && !isScrollingRef.current) {
            e.preventDefault();
            scrollToContent();
         }
      };

      hero.addEventListener('wheel', handleWheel, { passive: false });
      return () => hero.removeEventListener('wheel', handleWheel);
   }, []);

   return (
      <div ref={containerRef} className="h-screen bg-slate-950 text-slate-200 font-sans overflow-y-auto no-scrollbar">
         {/* Hero Section */}
         <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
               <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.05}}></div>
            </div>
            
            <div className="text-center relative z-10 max-w-3xl space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-cyan-400 font-mono mb-4 animate-in fade-in zoom-in duration-500">
                  <Workflow size={12} />
                  <span>MASTERCLASS VISUALIZER v7.5</span>
               </div>
               
               <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2 animate-in slide-in-from-bottom-4 duration-700">
                  Cine<span className="text-cyan-400">Tech</span> Architecture
               </h1>
               
               <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-1000 delay-100">
                  一个互动的、可视化的影视技术原理实验室。
                  <br/>从光学成像到信号处理，拆解每一个技术细节。
               </p>

               <div className="flex gap-4 justify-center pt-4 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                  <button onClick={() => onEnter()} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex items-center gap-2 group">
                     进入实验室 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </div>
            </div>

            {/* Scroll Indicator - Clickable & Animated */}
            <button 
               onClick={scrollToContent}
               className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer z-20 group"
            >
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest pl-[0.1em] group-hover:tracking-[0.2em] transition-all">Scroll to Explore</span>
                  <ChevronDown size={24} />
               </div>
            </button>
         </div>

         {/* Disclaimer & Nav Grid */}
         <div ref={contentRef} className="max-w-7xl mx-auto p-8 lg:p-12 space-y-12 min-h-screen">
            
            {/* Disclaimer */}
            <div className="bg-yellow-900/10 border border-yellow-600/20 rounded-xl p-6 flex gap-4 items-start animate-in fade-in duration-700 delay-300">
               <div className="p-2 bg-yellow-900/30 rounded-lg shrink-0">
                  <AlertTriangle className="text-yellow-500" size={24} />
               </div>
               <div>
                  <h3 className="text-yellow-500 font-bold text-lg mb-1">免责声明 (Disclaimer)</h3>
                  <p className="text-sm text-yellow-200/70 leading-relaxed text-justify">
                     本平台提供的所有演示、模拟及数据（包括但不限于光学光路、ISP 流程、响度计算、菜单结构）均为<strong>教学目的的近似模拟</strong>。
                     它们旨在帮助理解抽象的技术原理，而非精确的物理仿真或工程级参考。
                     <br className="mb-2"/>
                     实际的摄影机性能、色彩科学及后期流程可能因硬件版本、固件更新及环境因素而显著不同。请以厂商官方技术手册及实际测试结果为准。
                  </p>
               </div>
            </div>

            {/* Modules Grid */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
               <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Search size={24} className="text-slate-500"/> 模块索引
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <IntroCard onClick={() => onEnter(ModuleType.GEAR_SHOWCASE)} icon={<Newspaper/>} title="器材陈列室" desc="2025 新品发布、A1 II / A9 III" color="text-yellow-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.SONY_SYSTEM)} icon={<Book/>} title="Sony 百科" desc="E卡口生态、菜单逻辑、术语表" color="text-slate-200" />
                  
                  <IntroCard onClick={() => onEnter(ModuleType.GEOMETRIC_OPTICS)} icon={<Ruler/>} title="几何光学" desc="透镜成像、焦距与物距关系" color="text-blue-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.ZOOM_SYSTEM)} icon={<Microscope/>} title="变焦系统" desc="内/外变焦结构、呼吸效应" color="text-cyan-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.LENS_ADVANCED)} icon={<Aperture/>} title="镜头工程" desc="MTF曲线、镀膜、像差分析" color="text-purple-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.OPTICAL_FILTERS)} icon={<Disc/>} title="光学滤镜" desc="ND、CPL、柔光镜原理" color="text-indigo-400" />
                  
                  <IntroCard onClick={() => onEnter(ModuleType.MECHANICS)} icon={<Zap/>} title="机械系统" desc="马达、防抖、法兰距" color="text-yellow-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.CINEMATOGRAPHY)} icon={<Video/>} title="电影摄影" desc="布光、运镜、变形宽银幕" color="text-orange-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.SENSOR_EXPOSURE)} icon={<ScanLine/>} title="传感器" desc="曝光三要素、双原生ISO" color="text-emerald-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.DIGITAL_ISP)} icon={<Cpu/>} title="ISP 信号" desc="RAW、拜耳阵列、色彩深度" color="text-red-400" />
                  
                  <IntroCard onClick={() => onEnter(ModuleType.VIDEO_ENGINEERING)} icon={<Film/>} title="视频工程" desc="编码格式、GOP、快门角度" color="text-pink-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.POST_PRODUCTION)} icon={<Palette/>} title="后期调色" desc="一级校色、节点、示波器" color="text-fuchsia-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.LOUDNESS_STANDARD)} icon={<Volume2/>} title="音频响度" desc="LUFS 标准、混音工作流" color="text-green-400" />
                  <IntroCard onClick={() => onEnter(ModuleType.BROADCAST_STANDARDS)} icon={<Tv/>} title="广播制式" desc="PAL vs NTSC、帧率选择" color="text-indigo-300" />
               </div>
            </div>

            <div className="text-center pt-12 text-slate-600 text-xs font-mono">
               &copy; 2025 CineTech Architecture Lab. Designed for Educational Use.
            </div>
         </div>
      </div>
   );
};

const IntroCard: React.FC<{ onClick: () => void; icon: React.ReactNode; title: string; desc: string; color: string }> = ({ onClick, icon, title, desc, color }) => (
   <button onClick={onClick} className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-left hover:border-slate-600 hover:bg-slate-800 transition-all group flex flex-col h-full">
      <div className={`mb-3 ${color} group-hover:scale-110 transition-transform origin-left`}>{icon}</div>
      <h3 className="font-bold text-slate-200 mb-1 group-hover:text-white">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400">{desc}</p>
   </button>
);

const NavGroup: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      
      <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; subLabel?: string }> = ({ active, onClick, icon, label, subLabel }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-left relative overflow-hidden mx-1
      ${active ? 'bg-cyan-900/30 text-cyan-100 shadow-sm border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}
    `}
    style={{width: 'calc(100% - 8px)'}}
  >
    <div className={`${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{icon}</div>
    <div className="flex flex-col leading-tight overflow-hidden z-10">
      <span className="font-bold text-xs truncate">{label}</span>
      {subLabel && <span className="text-[9px] opacity-60 font-normal truncate mt-0.5">{subLabel}</span>}
    </div>
    {active && <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-r"></div>}
  </button>
);

export default App;
