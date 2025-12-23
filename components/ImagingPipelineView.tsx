
import React, { useState } from 'react';
import { Sun, Cpu, Palette, ScanLine, MonitorPlay, BoxSelect, Layers, Disc, Binary } from 'lucide-react';
import { OpticalFilterSimulator } from './PipelineOptics';
import { ExposureSimulator, SensorSizeSimulator, ShutterAngleSimulator, RollingShutterSimulator } from './PipelineSensor';
import { SamplingSimulator, ChromaSubsamplingSimulator, BitDepthSimulator } from './PipelineSignal';
import { ColorScienceSimulator } from './PipelineColor';

type Tab = 'FILTERS' | 'EXPOSURE' | 'SENSOR_SIZE' | 'SHUTTER_ANGLE' | 'ROLLING_SHUTTER' | 'SAMPLING' | 'BIT_DEPTH' | 'CHROMA' | 'COLOR';

export const ImagingPipelineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('FILTERS');

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Main Visualization Area */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        
        {/* Tab Navigation - Scrollable & Categorized */}
        <div className="border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar">
          <div className="flex w-max divide-x divide-slate-800/50">
            {/* Stage 1: Optics */}
            <div className="flex">
               <TabButton active={activeTab === 'FILTERS'} onClick={() => setActiveTab('FILTERS')} icon={<Disc size={16}/>} label="光学滤镜" />
            </div>
            {/* Stage 2: Exposure & Sensor */}
            <div className="flex">
               <TabButton active={activeTab === 'EXPOSURE'} onClick={() => setActiveTab('EXPOSURE')} icon={<Sun size={16}/>} label="曝光三角" />
               <TabButton active={activeTab === 'SENSOR_SIZE'} onClick={() => setActiveTab('SENSOR_SIZE')} icon={<BoxSelect size={16}/>} label="画幅" />
               <TabButton active={activeTab === 'ROLLING_SHUTTER'} onClick={() => setActiveTab('ROLLING_SHUTTER')} icon={<ScanLine size={16}/>} label="果冻效应" />
               <TabButton active={activeTab === 'SHUTTER_ANGLE'} onClick={() => setActiveTab('SHUTTER_ANGLE')} icon={<MonitorPlay size={16}/>} label="快门角度" />
            </div>
            {/* Stage 3: Digital Signal */}
            <div className="flex">
               <TabButton active={activeTab === 'SAMPLING'} onClick={() => setActiveTab('SAMPLING')} icon={<Cpu size={16}/>} label="分辨率采样" />
               <TabButton active={activeTab === 'CHROMA'} onClick={() => setActiveTab('CHROMA')} icon={<Layers size={16}/>} label="色彩采样" />
               <TabButton active={activeTab === 'BIT_DEPTH'} onClick={() => setActiveTab('BIT_DEPTH')} icon={<Binary size={16}/>} label="色深" />
            </div>
            {/* Stage 4: Post Processing */}
            <div className="flex">
               <TabButton active={activeTab === 'COLOR'} onClick={() => setActiveTab('COLOR')} icon={<Palette size={16}/>} label="Log与LUT" />
            </div>
          </div>
        </div>

        {/* Content Render */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          {activeTab === 'FILTERS' && <OpticalFilterSimulator />}
          {activeTab === 'EXPOSURE' && <ExposureSimulator />}
          {activeTab === 'SENSOR_SIZE' && <SensorSizeSimulator />}
          {activeTab === 'SHUTTER_ANGLE' && <ShutterAngleSimulator />}
          {activeTab === 'ROLLING_SHUTTER' && <RollingShutterSimulator />}
          {activeTab === 'SAMPLING' && <SamplingSimulator />}
          {activeTab === 'CHROMA' && <ChromaSubsamplingSimulator />}
          {activeTab === 'BIT_DEPTH' && <BitDepthSimulator />}
          {activeTab === 'COLOR' && <ColorScienceSimulator />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap
      ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
    `}
  >
    {icon} {label}
  </button>
);
