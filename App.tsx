
import React, { useState, Suspense, useMemo, useRef, useEffect, useCallback } from 'react';
import { ModuleType } from './types';
import { Camera, Ruler, Aperture, Zap, Microscope, Cpu, Layers, Film, ScanLine, Video, Disc, Palette, Workflow, Eye, Newspaper, Search, ArrowRight, Book, Volume2, Tv, Loader2, AlertTriangle, CheckCircle, ChevronDown, ChevronRight, Menu, Calculator, GraduationCap, PanelLeftClose, PanelLeftOpen, MonitorPlay, Sun, Moon } from 'lucide-react';
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
const UtilityToolsView = React.lazy(() => import('./components/UtilityToolsView').then(m => ({ default: m.UtilityToolsView })));
const KnowledgeQuizView = React.lazy(() => import('./components/KnowledgeQuizView').then(m => ({ default: m.KnowledgeQuizView })));

const LoadingFallback = () => (
   <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
      <Loader2 size={32} className="animate-spin mb-4 text-primary-500"/>
      <div className="text-xs font-mono tracking-widest uppercase">Initializing Module...</div>
   </div>
);

const MobileGuidance = ({ dismissed, onDismiss }: { dismissed: boolean; onDismiss: () => void }) => {
  if (dismissed) return null;
  return (
    <div role="dialog" aria-label="Display recommendation" className="lg:hidden fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
       <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg shadow-2xl max-w-sm text-center">
          <MonitorPlay size={48} className="mx-auto text-primary-500 mb-4" />
          <h3 className="text-xl font-bold text-zinc-100 mb-2">建议使用大屏访问</h3>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
             为了获得最佳的交互体验和视觉效果，建议您使用 PC 或平板电脑访问本实验室。
             <br/><br/>
             手机端可能无法完整显示复杂的仪表盘、图表和模拟器。
          </p>
          <button onClick={onDismiss} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-md transition-colors">
             继续尝试 (Continue)
          </button>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.GEAR_SHOWCASE);
  const [activeTabOverride, setActiveTabOverride] = useState<string | undefined>(undefined);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false); 
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('cinetech-theme');
    return saved ? saved === 'dark' : true;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDismissed, setMobileDismissed] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cinetech-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const fuse = useMemo(() => new Fuse(FULL_SEARCH_INDEX, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'keywords', weight: 0.3 },
      { name: 'desc', weight: 0.2 }
    ],
    threshold: 0.4, 
    includeScore: true
  }), []);

  const handleModuleChange = useCallback((m: ModuleType, tab?: string) => {
    setActiveModule(m);
    setActiveTabOverride(tab); 
    setIsSidebarOpen(false); 
    setSearchQuery(''); 
    setShowIntro(false); 
  }, []);

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
      case ModuleType.UTILITY_TOOLS: return <UtilityToolsView {...commonProps} />;
      case ModuleType.KNOWLEDGE_QUIZ: return <KnowledgeQuizView />;
      default: return <GearShowcaseView />;
    }
  };

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, fuse]);

  if (showIntro) {
     return <IntroView onEnter={(m) => handleModuleChange(m || ModuleType.GEAR_SHOWCASE)} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300 font-sans overflow-hidden transition-colors duration-300">
      <MobileGuidance dismissed={mobileDismissed} onDismiss={() => setMobileDismissed(true)} />
      
      {/* Header */}
      <header className="h-12 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between px-4 lg:px-6 bg-zinc-50 dark:bg-zinc-900 shrink-0 z-50 shadow-sm relative transition-colors duration-300">
        <div className="flex items-center gap-3 text-primary-600 dark:text-primary-500 cursor-pointer" onClick={() => setShowIntro(true)}>
          <Workflow size={20} />
          <h1 className="text-sm lg:text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            Cine<span className="text-primary-600 dark:text-primary-500">Tech</span> Architecture
            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Masterclass v8.0</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Toggle Theme"
            aria-label="Toggle dark/light theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label="Toggle sidebar navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 dark:bg-black z-30 backdrop-blur-sm" 
            onClick={() => setIsSidebarOpen(false)} 
            aria-hidden="true"
          />
        )}

        {/* Desktop collapsed trigger */}
        {isDesktopCollapsed && (
           <div 
              className="hidden lg:flex fixed left-0 top-12 bottom-0 w-4 z-50 hover:w-6 transition-all group items-center justify-center cursor-pointer border-r border-white/5 bg-zinc-900/50"
              onClick={() => setIsDesktopCollapsed(false)}
              role="button"
              aria-label="Expand sidebar"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setIsDesktopCollapsed(false)}
           >
              <div className="text-zinc-500 group-hover:text-primary-500 transition-colors">
                 <ChevronRight size={14} />
              </div>
           </div>
        )}

        {/* Sidebar */}
        <nav className={`
          absolute lg:relative z-40 h-full bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 flex flex-col shrink-0
          ${isSidebarOpen ? 'translate-x-0 w-80 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          ${isDesktopCollapsed ? 'lg:w-0 lg:border-r-0 overflow-hidden' : 'lg:w-72'}
        `}>
          {/* Search Box */}
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 sticky top-0 z-10 flex gap-2 transition-colors duration-300">
             <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2 text-zinc-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search modules..." 
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-600 rounded-md py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 font-mono"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Search modules"
                />
             </div>
             <button 
                onClick={() => setIsDesktopCollapsed(true)}
                className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-700 focus:outline-none"
                title="Collapse Sidebar"
                aria-label="Collapse sidebar"
             >
                <PanelLeftClose size={14} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1">
            {searchQuery.length > 1 ? (
               <div className="space-y-2 animate-fade-in p-1">
                  <div className="text-[10px] font-bold text-primary-600 dark:text-primary-500 uppercase tracking-widest mb-2 px-2">
                     Results ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                     searchResults.map((item, idx) => (
                        <button 
                           key={idx}
                           onClick={() => handleModuleChange(item.module, item.tab)}
                           className="w-full text-left p-3 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-primary-500/50 rounded-lg group transition-all"
                        >
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200 group-hover:text-primary-600 dark:group-hover:text-primary-400">{item.title}</span>
                              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-primary-500 transition-opacity"/>
                           </div>
                           <div className="text-[10px] text-zinc-500 line-clamp-2">{item.desc}</div>
                        </button>
                     ))
                  ) : (
                     <div className="text-center py-8 text-zinc-500 text-xs">
                        未找到相关内容
                        <br/>
                        <span className="opacity-50">Try: "球差", "10bit", "Sony"</span>
                     </div>
                  )}
               </div>
            ) : (
               <>
                  <div className="mb-4">
                     <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Featured</div>
                     <NavButton isDark={isDark} active={activeModule === ModuleType.GEAR_SHOWCASE} onClick={() => handleModuleChange(ModuleType.GEAR_SHOWCASE)} icon={<Newspaper size={18}/>} label="器材陈列室 (Showcase)" subLabel="2025 新品 / α9 III" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.SONY_SYSTEM} onClick={() => handleModuleChange(ModuleType.SONY_SYSTEM)} icon={<Book size={18}/>} label="索尼系统百科 (Sony Wiki)" subLabel="E卡口 / 菜单 / 专有名词" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.UTILITY_TOOLS} onClick={() => handleModuleChange(ModuleType.UTILITY_TOOLS)} icon={<Calculator size={18}/>} label="实用工具箱 (Tools)" subLabel="景深 / 延时 / 响度" />
                  </div>

                  <NavGroup isDark={isDark} title="1. 物理光学 (Optics)" defaultOpen={true} activeModule={activeModule} triggers={[ModuleType.GEOMETRIC_OPTICS, ModuleType.LENS_ADVANCED, ModuleType.ZOOM_SYSTEM, ModuleType.OPTICAL_FILTERS]}>
                     <NavButton isDark={isDark} active={activeModule === ModuleType.GEOMETRIC_OPTICS} onClick={() => handleModuleChange(ModuleType.GEOMETRIC_OPTICS)} icon={<Ruler size={18}/>} label="几何光学基础" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.LENS_ADVANCED} onClick={() => handleModuleChange(ModuleType.LENS_ADVANCED)} icon={<Aperture size={18}/>} label="镜头工程与像差" subLabel="非球面 / MTF / 镀膜" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.ZOOM_SYSTEM} onClick={() => handleModuleChange(ModuleType.ZOOM_SYSTEM)} icon={<Microscope size={18}/>} label="变焦系统结构" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.OPTICAL_FILTERS} onClick={() => handleModuleChange(ModuleType.OPTICAL_FILTERS)} icon={<Disc size={18}/>} label="前置物理滤镜" subLabel="ND / CPL / Mist" />
                  </NavGroup>

                  <NavGroup isDark={isDark} title="2. 摄影机硬件 (Hardware)" activeModule={activeModule} triggers={[ModuleType.SENSOR_EXPOSURE, ModuleType.MECHANICS, ModuleType.CINEMATOGRAPHY]}>
                     <NavButton isDark={isDark} active={activeModule === ModuleType.SENSOR_EXPOSURE} onClick={() => handleModuleChange(ModuleType.SENSOR_EXPOSURE)} icon={<ScanLine size={18}/>} label="传感器与曝光" subLabel="18%灰 / 双原生ISO" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.MECHANICS} onClick={() => handleModuleChange(ModuleType.MECHANICS)} icon={<Zap size={18}/>} label="机身机械系统" subLabel="马达 / 防抖 / 法兰距" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.CINEMATOGRAPHY} onClick={() => handleModuleChange(ModuleType.CINEMATOGRAPHY)} icon={<Video size={18}/>} label="电影摄影技术" subLabel="布光 / 运镜 / 变形镜头" />
                  </NavGroup>

                  <NavGroup isDark={isDark} title="3. 信号与流程 (Pipeline)" activeModule={activeModule} triggers={[ModuleType.DIGITAL_ISP, ModuleType.VIDEO_ENGINEERING]}>
                     <NavButton isDark={isDark} active={activeModule === ModuleType.DIGITAL_ISP} onClick={() => handleModuleChange(ModuleType.DIGITAL_ISP)} icon={<Cpu size={18}/>} label="ISP 信号处理" subLabel="拜耳 / 色深 / Log" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.VIDEO_ENGINEERING} onClick={() => handleModuleChange(ModuleType.VIDEO_ENGINEERING)} icon={<Film size={18}/>} label="视频编码工程" subLabel="ProRes / H.265 / GOP" />
                  </NavGroup>

                  <NavGroup isDark={isDark} title="4. 后期交付 (Post & Deliver)" activeModule={activeModule} triggers={[ModuleType.POST_PRODUCTION, ModuleType.LOUDNESS_STANDARD, ModuleType.BROADCAST_STANDARDS]}>
                     <NavButton isDark={isDark} active={activeModule === ModuleType.POST_PRODUCTION} onClick={() => handleModuleChange(ModuleType.POST_PRODUCTION)} icon={<Palette size={18}/>} label="DI 数字中间片" subLabel="DaVinci 调色流程" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.LOUDNESS_STANDARD} onClick={() => handleModuleChange(ModuleType.LOUDNESS_STANDARD)} icon={<Volume2 size={18}/>} label="音频响度标准" subLabel="LUFS / 混音工作流" />
                     <NavButton isDark={isDark} active={activeModule === ModuleType.BROADCAST_STANDARDS} onClick={() => handleModuleChange(ModuleType.BROADCAST_STANDARDS)} icon={<Tv size={18}/>} label="广播制式" subLabel="PAL / NTSC" />
                  </NavGroup>

                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                     <NavButton isDark={isDark} active={activeModule === ModuleType.KNOWLEDGE_QUIZ} onClick={() => handleModuleChange(ModuleType.KNOWLEDGE_QUIZ)} icon={<GraduationCap size={18}/>} label="终极考核 (Quiz)" subLabel="随机20题挑战" />
                  </div>
               </>
            )}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 w-full transition-colors duration-300">
          <Suspense fallback={<LoadingFallback />}>
             <React.Fragment key={activeModule}>
                {renderModule()}
             </React.Fragment>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const IntroView: React.FC<{ onEnter: (m?: ModuleType) => void, isDark: boolean, toggleTheme: () => void }> = ({ onEnter, isDark, toggleTheme }) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const heroRef = useRef<HTMLDivElement>(null);
   const isScrollingRef = useRef(false);

   const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
   };

   const scrollToContent = () => {
      if (isScrollingRef.current || !containerRef.current || !contentRef.current) return;
      
      const container = containerRef.current;
      const targetPos = contentRef.current.offsetTop;
      const startPos = container.scrollTop;
      const distance = targetPos - startPos;
      const duration = 800;
      let startTime: number | null = null;

      isScrollingRef.current = true;

      const animation = (currentTime: number) => {
         if (!startTime) startTime = currentTime;
         const timeElapsed = currentTime - startTime;
         const progress = Math.min(timeElapsed / duration, 1);
         
         const ease = easeOutExpo(progress);
         
         container.scrollTop = startPos + (distance * ease);

         if (timeElapsed < duration) {
            requestAnimationFrame(animation);
         } else {
            isScrollingRef.current = false;
         }
      };

      requestAnimationFrame(animation);
   };

   useEffect(() => {
      const hero = heroRef.current;
      if (!hero) return;

      const handleWheel = (e: WheelEvent) => {
         if (e.deltaY > 0 && !isScrollingRef.current) {
            e.preventDefault();
            scrollToContent();
         }
      };

      hero.addEventListener('wheel', handleWheel, { passive: false });
      return () => hero.removeEventListener('wheel', handleWheel);
   }, []);

   return (
      <div ref={containerRef} className="h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-sans overflow-y-auto no-scrollbar transition-colors duration-300">
         <div className="fixed top-4 right-4 z-50">
            <button 
               onClick={toggleTheme}
               className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-lg"
               aria-label="Toggle theme"
            >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
         </div>

         {/* Hero Section — Clean technical aesthetic, NO colored blur orbs */}
         <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            {/* Subtle grid pattern only */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] dark:opacity-[0.06]" aria-hidden="true">
               <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>
            
            <div className="text-center relative z-10 max-w-3xl space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-primary-600 dark:text-primary-400 font-mono mb-4 animate-zoom-in">
                  <Workflow size={12} />
                  <span>MASTERCLASS VISUALIZER v8.0</span>
               </div>
               
               <h1 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter mb-2 animate-slide-in-bottom">
                  Cine<span className="text-primary-600 dark:text-primary-500">Tech</span> Architecture
               </h1>
               
               <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-pretty animate-slide-in-bottom" style={{ animationDelay: '100ms' }}>
                  一个互动的、可视化的影视技术原理实验室。
                  <br/>从光学成像到信号处理，拆解每一个技术细节。
               </p>

               <div className="flex gap-4 justify-center pt-4 animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
                  <button onClick={() => onEnter()} className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 group hover:-translate-y-0.5">
                     进入实验室 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </div>
            </div>

            <button 
               onClick={scrollToContent}
               className="absolute bottom-8 left-0 right-0 flex justify-center text-zinc-400 hover:text-primary-500 transition-colors cursor-pointer z-20 group bg-transparent border-none"
               aria-label="Scroll to explore modules"
            >
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest pl-[0.1em] group-hover:tracking-[0.2em] transition-all">Scroll to Explore</span>
                  <ChevronDown size={24} />
               </div>
            </button>
         </div>

         <div ref={contentRef} className="max-w-7xl mx-auto p-8 lg:p-12 space-y-12 min-h-screen animate-fade-in" style={{ animationDelay: '500ms' }}>
            {/* Disclaimer — Clean, no yellow AI card style */}
            <div className="bg-amber-400/5 dark:bg-amber-400/10 border border-amber-400/20 rounded-xl p-6 flex gap-4 items-start animate-fade-in" style={{ animationDelay: '300ms' }}>
               <div className="p-2 bg-amber-400/10 rounded-lg shrink-0">
                  <AlertTriangle className="text-amber-500" size={24} />
               </div>
               <div>
                  <h3 className="text-amber-600 dark:text-amber-400 font-bold text-lg mb-1">免责声明 (Disclaimer)</h3>
                  <p className="text-sm text-amber-600/80 dark:text-amber-300 leading-relaxed text-pretty text-justify">
                     本平台提供的所有演示、模拟及数据（包括但不限于光学光路、ISP 流程、响度计算、菜单结构）均为<strong>教学目的的近似模拟</strong>。
                     它们旨在帮助理解抽象的技术原理，而非精确的物理仿真或工程级参考。
                     <br className="mb-2"/>
                     实际的摄影机性能、色彩科学及后期流程可能因硬件版本、固件更新及环境因素而显著不同。请以厂商官方技术手册及实际测试结果为准。
                  </p>
               </div>
            </div>

            <div className="space-y-8">
               <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Search size={24} className="text-zinc-400"/> 模块索引
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.GEAR_SHOWCASE)} icon={<Newspaper/>} title="器材陈列室" desc="2025 新品发布、A1 II / A9 III" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.UTILITY_TOOLS)} icon={<Calculator/>} title="实用工具箱" desc="景深、延时、ND计算器" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.SONY_SYSTEM)} icon={<Book/>} title="Sony 百科" desc="E卡口生态、菜单逻辑、术语表" />
                  
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.GEOMETRIC_OPTICS)} icon={<Ruler/>} title="几何光学" desc="透镜成像、焦距与物距关系" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.ZOOM_SYSTEM)} icon={<Microscope/>} title="变焦系统" desc="内/外变焦结构、呼吸效应" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.LENS_ADVANCED)} icon={<Aperture/>} title="镜头工程" desc="MTF曲线、镀膜、像差分析" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.OPTICAL_FILTERS)} icon={<Disc/>} title="光学滤镜" desc="ND、CPL、柔光镜原理" />
                  
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.MECHANICS)} icon={<Zap/>} title="机械系统" desc="马达、防抖、法兰距" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.CINEMATOGRAPHY)} icon={<Video/>} title="电影摄影" desc="布光、运镜、变形宽银幕" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.SENSOR_EXPOSURE)} icon={<ScanLine/>} title="传感器" desc="曝光三要素、双原生ISO" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.DIGITAL_ISP)} icon={<Cpu/>} title="ISP 信号" desc="RAW、拜耳阵列、色彩深度" />
                  
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.VIDEO_ENGINEERING)} icon={<Film/>} title="视频工程" desc="编码格式、GOP、快门角度" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.POST_PRODUCTION)} icon={<Palette/>} title="后期调色" desc="一级校色、节点、示波器" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.LOUDNESS_STANDARD)} icon={<Volume2/>} title="音频响度" desc="LUFS 标准、混音工作流" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.BROADCAST_STANDARDS)} icon={<Tv/>} title="广播制式" desc="PAL vs NTSC、帧率选择" />
                  <IntroCard isDark={isDark} onClick={() => onEnter(ModuleType.KNOWLEDGE_QUIZ)} icon={<GraduationCap/>} title="知识挑战" desc="随机20题，测试理论水平" />
               </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 p-4 shrink-0 z-20">
            <div className="text-center text-zinc-500 text-xs font-mono space-y-1">
               <div>&copy; 2025 - {new Date().getFullYear()} CineTech Architecture Lab. Designed for Educational Use.</div>
            </div>
         </div>
         </div>
      </div>
   );
};

const IntroCard: React.FC<{ onClick: () => void; icon: React.ReactNode; title: string; desc: string; isDark: boolean }> = ({ onClick, icon, title, desc, isDark }) => (
   <button onClick={onClick} className={`p-5 rounded-xl text-left transition-all group flex flex-col h-full border shadow-sm hover:shadow-md hover:-translate-y-0.5 ${isDark ? 'bg-zinc-900 border-white/5 hover:border-white/15' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>
      <div className="mb-3 text-primary-500 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className={`font-bold mb-1 ${isDark ? 'text-zinc-200 group-hover:text-white' : 'text-zinc-800 group-hover:text-zinc-900'}`}>{title}</h3>
      <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-600'}`}>{desc}</p>
   </button>
);

const NavGroup: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  activeModule?: ModuleType;
  triggers?: ModuleType[];
  isDark: boolean;
}> = ({ title, children, defaultOpen = false, activeModule, triggers = [], isDark }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  useEffect(() => {
    if (activeModule && triggers.includes(activeModule)) {
      setIsOpen(true);
    }
  }, [activeModule, triggers]);
  
  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors bg-transparent border-none cursor-pointer focus:outline-none ${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-800'}`}
        aria-expanded={isOpen}
      >
        <span className="truncate">{title}</span>
        {isOpen ? <ChevronDown size={12} className="shrink-0" /> : <ChevronRight size={12} className="shrink-0" />}
      </button>
      
      <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; subLabel?: string; isDark: boolean }> = ({ active, onClick, icon, label, subLabel, isDark }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-left relative overflow-hidden mx-1 border focus:outline-none
      ${active 
        ? (isDark ? 'bg-primary-900/30 text-primary-200 border-l-2 border-l-primary-500 border-y-transparent border-r-transparent' : 'bg-primary-50 text-primary-700 border-l-2 border-l-primary-400 border-y-transparent border-r-transparent') 
        : (isDark ? 'text-zinc-300 hover:bg-zinc-50/5 hover:text-zinc-100 border-transparent' : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 border-transparent')
      }
    `}
    style={{ width: 'calc(100% - 8px)' }}
    title={label}
  >
    <div className={`shrink-0 ${active ? 'text-primary-400' : (isDark ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-700')}`}>{icon}</div>
    <div className="flex flex-col leading-tight overflow-hidden z-10 min-w-0">
      <span className="font-bold text-xs truncate">{label}</span>
      {subLabel && <span className="text-[9px] opacity-70 font-normal truncate mt-0.5">{subLabel}</span>}
    </div>

  </button>
);

export default App;
