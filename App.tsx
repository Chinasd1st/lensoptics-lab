
import React, { useState } from 'react';
import { ModuleType } from './types';
import { GeometricView } from './components/GeometricView';
import { ZoomSystemView } from './components/ZoomSystemView';
import { LensAdvancedView } from './components/LensAdvancedView';
import { MechanicsView } from './components/MechanicsView';
import { SensorExposureView } from './components/SensorExposureView';
import { DigitalISPView } from './components/DigitalISPView';
import { VideoEngineeringView } from './components/VideoEngineeringView';
import { CinematographyView } from './components/CinematographyView';
import { OpticalFiltersView } from './components/OpticalFiltersView';
import { PostProductionView } from './components/PostProductionView';
import { Camera, Ruler, Aperture, Zap, Microscope, Cpu, Layers, Film, ScanLine, Video, Disc, Settings2, Palette, Workflow, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DIGITAL_ISP);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.GEOMETRIC_OPTICS: return <GeometricView />;
      case ModuleType.ZOOM_SYSTEM: return <ZoomSystemView />;
      case ModuleType.OPTICAL_FILTERS: return <OpticalFiltersView />;
      case ModuleType.LENS_ADVANCED: return <LensAdvancedView />;
      case ModuleType.MECHANICS: return <MechanicsView />;
      case ModuleType.CINEMATOGRAPHY: return <CinematographyView />;
      case ModuleType.SENSOR_EXPOSURE: return <SensorExposureView />;
      case ModuleType.DIGITAL_ISP: return <DigitalISPView />;
      case ModuleType.VIDEO_ENGINEERING: return <VideoEngineeringView />;
      case ModuleType.POST_PRODUCTION: return <PostProductionView />;
      default: return <LensAdvancedView />;
    }
  };

  const selectModule = (m: ModuleType) => {
    setActiveModule(m);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-900 shrink-0 z-40 shadow-xl">
        <div className="flex items-center gap-3 text-cyan-400">
          <Workflow size={24} />
          <h1 className="text-base lg:text-lg font-bold tracking-tight text-white">
            Cine<span className="text-cyan-400">Tech</span> Architecture
            <span className="hidden sm:inline-block text-[10px] ml-2 font-normal text-slate-500 border border-slate-700 px-2 py-0.5 rounded">MASTERCLASS v6.0</span>
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
          fixed lg:relative z-30 h-full bg-slate-900 border-r border-slate-800 transition-transform duration-300 w-64
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shrink-0 overflow-y-auto no-scrollbar pb-10
        `}>
          <div className="p-4 space-y-8">
            
            {/* 1. 物理光学层 */}
            <NavGroup title="Step 1: 物理光学 (Optics)">
              <NavButton active={activeModule === ModuleType.GEOMETRIC_OPTICS} onClick={() => selectModule(ModuleType.GEOMETRIC_OPTICS)} icon={<Ruler size={18}/>} label="几何光学基础" />
              <NavButton active={activeModule === ModuleType.ZOOM_SYSTEM} onClick={() => selectModule(ModuleType.ZOOM_SYSTEM)} icon={<Microscope size={18}/>} label="变焦系统结构" />
              <NavButton active={activeModule === ModuleType.LENS_ADVANCED} onClick={() => selectModule(ModuleType.LENS_ADVANCED)} icon={<Aperture size={18}/>} label="镜头工程学" subLabel="像差 / 镀膜 / 电影头" />
              <NavButton active={activeModule === ModuleType.OPTICAL_FILTERS} onClick={() => selectModule(ModuleType.OPTICAL_FILTERS)} icon={<Disc size={18}/>} label="前置物理滤镜" subLabel="ND / CPL / Mist" />
            </NavGroup>

            {/* 2. 机械与操作层 */}
            <NavGroup title="Step 2: 摄影机硬件 (Hardware)">
              <NavButton active={activeModule === ModuleType.MECHANICS} onClick={() => selectModule(ModuleType.MECHANICS)} icon={<Zap size={18}/>} label="电子机械系统" subLabel="马达 / OIS / IBIS" />
              <NavButton active={activeModule === ModuleType.CINEMATOGRAPHY} onClick={() => selectModule(ModuleType.CINEMATOGRAPHY)} icon={<Video size={18}/>} label="电影运动装置" subLabel="Gimbal / Slider / Focus" />
            </NavGroup>

            {/* 3. 信号采集层 */}
            <NavGroup title="Step 3: 传感器与信号 (Signal)">
              <NavButton active={activeModule === ModuleType.SENSOR_EXPOSURE} onClick={() => selectModule(ModuleType.SENSOR_EXPOSURE)} icon={<ScanLine size={18}/>} label="传感器与曝光" subLabel="18%灰 / 双原生ISO" />
              <NavButton active={activeModule === ModuleType.DIGITAL_ISP} onClick={() => selectModule(ModuleType.DIGITAL_ISP)} icon={<Cpu size={18}/>} label="ISP 信号处理" subLabel="白平衡 / 拜耳阵列" />
            </NavGroup>

            {/* 4. 后期交付层 */}
            <NavGroup title="Step 4: 编码与调色 (Post)">
              <NavButton active={activeModule === ModuleType.VIDEO_ENGINEERING} onClick={() => selectModule(ModuleType.VIDEO_ENGINEERING)} icon={<Film size={18}/>} label="视频编码工程" subLabel="GOP / Codecs" />
              <NavButton active={activeModule === ModuleType.POST_PRODUCTION} onClick={() => selectModule(ModuleType.POST_PRODUCTION)} icon={<Palette size={18}/>} label="DI 数字中间片" subLabel="DaVinci 调色流程" />
            </NavGroup>

          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 relative overflow-hidden bg-slate-950">
          {renderModule()}
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
