
import React, { useState } from 'react';
import { Sun, Cpu, Palette, ScanLine, MonitorPlay, BoxSelect, Layers, Disc, Binary } from 'lucide-react';
import { OpticalFilterSimulator } from './PipelineOptics';
import { ExposureSimulator, SensorSizeSimulator, ShutterAngleSimulator, RollingShutterSimulator } from './PipelineSensor';
import { SamplingSimulator, ChromaSubsamplingSimulator, BitDepthSimulator } from './PipelineSignal';
import { ColorScienceSimulator } from './PipelineColor';
import { TabNavigation, TabItem } from './TabNavigation';

type Tab = 'FILTERS' | 'EXPOSURE' | 'SENSOR_SIZE' | 'SHUTTER_ANGLE' | 'ROLLING_SHUTTER' | 'SAMPLING' | 'BIT_DEPTH' | 'CHROMA' | 'COLOR';

export const ImagingPipelineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('FILTERS');

  const tabs: TabItem[] = [
    { id: 'FILTERS', label: '光学滤镜', icon: <Disc size={16}/> },
    { id: 'EXPOSURE', label: '曝光三角', icon: <Sun size={16}/> },
    { id: 'SENSOR_SIZE', label: '画幅', icon: <BoxSelect size={16}/> },
    { id: 'ROLLING_SHUTTER', label: '果冻效应', icon: <ScanLine size={16}/> },
    { id: 'SHUTTER_ANGLE', label: '快门角度', icon: <MonitorPlay size={16}/> },
    { id: 'SAMPLING', label: '分辨率采样', icon: <Cpu size={16}/> },
    { id: 'CHROMA', label: '色彩采样', icon: <Layers size={16}/> },
    { id: 'BIT_DEPTH', label: '色深', icon: <Binary size={16}/> },
    { id: 'COLOR', label: 'Log与LUT', icon: <Palette size={16}/> },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Main Visualization Area */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={(id) => setActiveTab(id as Tab)} 
        />

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
