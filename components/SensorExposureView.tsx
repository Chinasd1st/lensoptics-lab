
import React, { useState, useEffect } from 'react';
import { Sun, BoxSelect, ScanLine, Lightbulb, TrendingUp, Camera } from 'lucide-react';
import { ExposureModule, GrayCardModule, SensorSizeModule, RollingShutterModule, ExposureModesModule } from './sensor-exposure/SensorModules';
import { NativeISOModule } from './sensor-exposure/NativeISOModule';

type Tab = 'EXPOSURE' | 'PASM_MODES' | 'GRAY_CARD' | 'NATIVE_ISO' | 'SENSOR_SIZE' | 'ROLLING_SHUTTER';

interface SensorExposureViewProps {
  initialTab?: string;
}

export const SensorExposureView: React.FC<SensorExposureViewProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('PASM_MODES');

  useEffect(() => {
     if (initialTab && ['EXPOSURE', 'PASM_MODES', 'GRAY_CARD', 'NATIVE_ISO', 'SENSOR_SIZE', 'ROLLING_SHUTTER'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
  }, [initialTab]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'PASM_MODES'} onClick={() => setActiveTab('PASM_MODES')} icon={<Camera size={14}/>} label="PASM 拍摄模式" />
           <TabButton active={activeTab === 'EXPOSURE'} onClick={() => setActiveTab('EXPOSURE')} icon={<Sun size={14}/>} label="曝光三角" />
           <TabButton active={activeTab === 'GRAY_CARD'} onClick={() => setActiveTab('GRAY_CARD')} icon={<Lightbulb size={14}/>} label="测光与灰卡" />
           <TabButton active={activeTab === 'NATIVE_ISO'} onClick={() => setActiveTab('NATIVE_ISO')} icon={<TrendingUp size={14}/>} label="双原生 ISO" />
           <TabButton active={activeTab === 'SENSOR_SIZE'} onClick={() => setActiveTab('SENSOR_SIZE')} icon={<BoxSelect size={14}/>} label="传感器画幅" />
           <TabButton active={activeTab === 'ROLLING_SHUTTER'} onClick={() => setActiveTab('ROLLING_SHUTTER')} icon={<ScanLine size={14}/>} label="卷帘快门" />
        </div>
        <div className="flex-1 relative overflow-hidden">
           {activeTab === 'PASM_MODES' && <ExposureModesModule />}
           {activeTab === 'EXPOSURE' && <ExposureModule />}
           {activeTab === 'GRAY_CARD' && <GrayCardModule />}
           {activeTab === 'NATIVE_ISO' && <NativeISOModule />}
           {activeTab === 'SENSOR_SIZE' && <SensorSizeModule />}
           {activeTab === 'ROLLING_SHUTTER' && <RollingShutterModule />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);
