
import React, { useState, useEffect } from 'react';
import { Sun, BoxSelect, ScanLine, Lightbulb, TrendingUp, Camera } from 'lucide-react';
import { ExposureModule, GrayCardModule, SensorSizeModule, RollingShutterModule, ExposureModesModule } from './sensor-exposure/SensorModules';
import { NativeISOModule } from './sensor-exposure/NativeISOModule';
import { TabNavigation, TabItem } from './TabNavigation';

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

  const tabs: TabItem[] = [
    { id: 'PASM_MODES', label: 'PASM 拍摄模式', icon: <Camera size={14}/> },
    { id: 'EXPOSURE', label: '曝光三角', icon: <Sun size={14}/> },
    { id: 'GRAY_CARD', label: '测光与灰卡', icon: <Lightbulb size={14}/> },
    { id: 'NATIVE_ISO', label: '双原生 ISO', icon: <TrendingUp size={14}/> },
    { id: 'SENSOR_SIZE', label: '传感器画幅', icon: <BoxSelect size={14}/> },
    { id: 'ROLLING_SHUTTER', label: '卷帘快门', icon: <ScanLine size={14}/> },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={(id) => setActiveTab(id as Tab)} 
        />

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
