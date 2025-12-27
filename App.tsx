
import React, { useState, Suspense } from 'react';
import { ModuleType } from './types';
import { Camera, Ruler, Aperture, Zap, Microscope, Cpu, Layers, Film, ScanLine, Video, Disc, Settings2, Palette, Workflow, Eye, Newspaper, Search, ArrowRight, Book, Volume2, Tv, Loader2 } from 'lucide-react';

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

// --- Search Index Definition ---
interface SearchItem {
  key: string;
  terms: string[];
  module: ModuleType;
  tab?: string;
  label: string;
  desc: string;
}

const SEARCH_INDEX: SearchItem[] = [
  // --- Sony Specific ---
  { key: 'sony_mount', terms: ['e-mount', 'fe', 'aps-c', 'super35', '卡口'], module: ModuleType.SONY_SYSTEM, tab: 'CORE', label: 'E 卡口体系', desc: '全画幅 FE 与 APS-C E 镜头的关系' },
  { key: 'sony_af', terms: ['hybrid af', 'phase detection', 'tracking', 'eye af', '对焦'], module: ModuleType.SONY_SYSTEM, tab: 'AF_AI', label: '快速混合对焦', desc: '相位+反差与实时追踪' },
  { key: 'sony_ai', terms: ['ai', 'subject', 'recognition', 'insect', 'car', '识别'], module: ModuleType.SONY_SYSTEM, tab: 'AF_AI', label: 'AI 主体识别', desc: '人体/动物/鸟/昆虫/交通工具' },
  { key: 'sony_log', terms: ['s-log3', 's-log2', 's-cinetone', 'cine', 'log'], module: ModuleType.SONY_SYSTEM, tab: 'VIDEO', label: 'S-Log & S-Cinetone', desc: '索尼视频色彩曲线' },
  { key: 'sony_menu', terms: ['menu', 'setup', 'format', 'fn', '菜单'], module: ModuleType.SONY_SYSTEM, tab: 'MENU', label: '索尼新菜单', desc: '垂直层级菜单结构模拟' },
  { key: 'sony_exmor', terms: ['exmor', 'stacked', 'bsi', 'global shutter', 'sensor'], module: ModuleType.SONY_SYSTEM, tab: 'CORE', label: 'Exmor 传感器', desc: '背照式 R 与 堆栈式 RS' },

  // ... (Other search items remain same)
];

const LoadingFallback = () => (
   <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500">
      <Loader2 size={32} className="animate-spin mb-4 text-cyan-500"/>
      <div className="text-xs font-mono">LOADING MODULE...</div>
   </div>
);

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.GEAR_SHOWCASE);
  const [activeTabOverride, setActiveTabOverride] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleModuleChange = (m: ModuleType, tab?: string) => {
    setActiveModule(m);
    setActiveTabOverride(tab); // Set the target tab
    setIsSidebarOpen(false);
    setSearchQuery(''); // Clear search on select
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

  const filteredResults = searchQuery.length > 1 
    ? SEARCH_INDEX.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.terms.some(t => t.includes(searchQuery.toLowerCase()))
      ) 
    : [];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-900 shrink-0 z-40 shadow-xl">
        <div className="flex items-center gap-3 text-cyan-400">
          <Workflow size={24} />
          <h1 className="text-base lg:text-lg font-bold tracking-tight text-white">
            Cine<span className="text-cyan-400">Tech</span> Architecture
            <span className="hidden sm:inline-block text-[10px] ml-2 font-normal text-slate-500 border border-slate-700 px-2 py-0.5 rounded">MASTERCLASS v7.1</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Settings2 size={24} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <nav className={`
          fixed lg:relative z-30 h-full bg-slate-900 border-r border-slate-800 transition-transform duration-300 w-72 flex flex-col shrink-0
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Search Box */}
          <div className="p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                <input 
                  type="text" 
                  placeholder="全站搜索 (e.g. 伪色, 法兰距, ProRes)" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-cyan-500 outline-none text-slate-200 placeholder-slate-600"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8">
            
            {/* Search Results Mode */}
            {searchQuery.length > 1 ? (
               <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2">Search Results ({filteredResults.length})</div>
                  {filteredResults.length > 0 ? (
                     filteredResults.map((item) => (
                        <button 
                           key={item.key}
                           onClick={() => handleModuleChange(item.module, item.tab)}
                           className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-lg group transition-all"
                        >
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400">{item.label}</span>
                              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-cyan-500 transition-opacity"/>
                           </div>
                           <div className="text-[10px] text-slate-500">{item.desc}</div>
                        </button>
                     ))
                  ) : (
                     <div className="text-center py-8 text-slate-600 text-xs">未找到相关内容</div>
                  )}
               </div>
            ) : (
               /* Standard Navigation Mode */
               <>
                  <div className="mb-6 space-y-1">
                     <NavButton active={activeModule === ModuleType.GEAR_SHOWCASE} onClick={() => handleModuleChange(ModuleType.GEAR_SHOWCASE)} icon={<Newspaper size={18}/>} label="器材陈列室 (Showcase)" subLabel="2025 新品 / 镜头图谱" />
                     <NavButton active={activeModule === ModuleType.SONY_SYSTEM} onClick={() => handleModuleChange(ModuleType.SONY_SYSTEM)} icon={<Book size={18}/>} label="索尼系统百科 (Sony Wiki)" subLabel="E卡口 / 菜单 / 专有名词" />
                  </div>

                  <NavGroup title="Step 1: 物理光学 (Optics)">
                    <NavButton active={activeModule === ModuleType.GEOMETRIC_OPTICS} onClick={() => handleModuleChange(ModuleType.GEOMETRIC_OPTICS)} icon={<Ruler size={18}/>} label="几何光学基础" />
                    <NavButton active={activeModule === ModuleType.ZOOM_SYSTEM} onClick={() => handleModuleChange(ModuleType.ZOOM_SYSTEM)} icon={<Microscope size={18}/>} label="变焦系统结构" />
                    <NavButton active={activeModule === ModuleType.LENS_ADVANCED} onClick={() => handleModuleChange(ModuleType.LENS_ADVANCED)} icon={<Aperture size={18}/>} label="镜头工程学" subLabel="像差 / 镀膜 / 电影头" />
                    <NavButton active={activeModule === ModuleType.OPTICAL_FILTERS} onClick={() => handleModuleChange(ModuleType.OPTICAL_FILTERS)} icon={<Disc size={18}/>} label="前置物理滤镜" subLabel="ND / CPL / Mist" />
                  </NavGroup>

                  <NavGroup title="Step 2: 摄影机硬件 (Hardware)">
                    <NavButton active={activeModule === ModuleType.MECHANICS} onClick={() => handleModuleChange(ModuleType.MECHANICS)} icon={<Zap size={18}/>} label="电子机械系统" subLabel="马达 / PDAF / 法兰距" />
                    <NavButton active={activeModule === ModuleType.CINEMATOGRAPHY} onClick={() => handleModuleChange(ModuleType.CINEMATOGRAPHY)} icon={<Video size={18}/>} label="电影运动与监看" subLabel="伪色 / 稳定器 / 运镜" />
                  </NavGroup>

                  <NavGroup title="Step 3: 传感器与信号 (Signal)">
                    <NavButton active={activeModule === ModuleType.SENSOR_EXPOSURE} onClick={() => handleModuleChange(ModuleType.SENSOR_EXPOSURE)} icon={<ScanLine size={18}/>} label="传感器与曝光" subLabel="18%灰 / 双原生ISO" />
                    <NavButton active={activeModule === ModuleType.DIGITAL_ISP} onClick={() => handleModuleChange(ModuleType.DIGITAL_ISP)} icon={<Cpu size={18}/>} label="ISP 信号处理" subLabel="拜耳 / 摩尔纹 / Log" />
                  </NavGroup>

                  <NavGroup title="Step 4: 后期交付 (Post)">
                    <NavButton active={activeModule === ModuleType.VIDEO_ENGINEERING} onClick={() => handleModuleChange(ModuleType.VIDEO_ENGINEERING)} icon={<Film size={18}/>} label="视频编码工程" subLabel="ProRes / H.265 / GOP" />
                    <NavButton active={activeModule === ModuleType.POST_PRODUCTION} onClick={() => handleModuleChange(ModuleType.POST_PRODUCTION)} icon={<Palette size={18}/>} label="DI 数字中间片" subLabel="DaVinci 调色流程" />
                    <NavButton active={activeModule === ModuleType.LOUDNESS_STANDARD} onClick={() => handleModuleChange(ModuleType.LOUDNESS_STANDARD)} icon={<Volume2 size={18}/>} label="音频响度标准" subLabel="LUFS / dBTP / Demo" />
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

const NavGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-[10px] font-extrabold text-cyan-500/80 uppercase tracking-widest mb-2 px-3 border-b border-slate-800/50 pb-2">{title}</h3>
    {children}
  </div>
);

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; subLabel?: string }> = ({ active, onClick, icon, label, subLabel }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group text-left relative overflow-hidden
      ${active ? 'bg-gradient-to-r from-cyan-900/60 to-transparent border-l-2 border-cyan-400 text-cyan-100' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent'}
    `}
  >
    <div className={`${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{icon}</div>
    <div className="flex flex-col leading-tight overflow-hidden z-10">
      <span className="font-medium text-sm truncate">{label}</span>
      {subLabel && <span className="text-[9px] opacity-50 font-normal truncate mt-0.5">{subLabel}</span>}
    </div>
  </button>
);

export default App;
