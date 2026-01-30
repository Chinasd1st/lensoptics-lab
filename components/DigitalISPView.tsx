
import React, { useState, useEffect } from 'react';
import { Cpu, Binary, Sun, ImagePlus, Sparkles, Grid3X3, Palette, FileImage } from 'lucide-react';
import { RawFormatModule, ColorSpaceModule, BayerMoireModule, WBModule, SamplingModule, AIModule } from './digital-isp/ISPModules';
import { HDRModule } from './digital-isp/HDRModule';
import { BitDepthModule } from './digital-isp/BitDepthModule';
import { TabNavigation, TabItem } from './TabNavigation';

type Tab = 'WHITE_BALANCE' | 'SAMPLING' | 'BIT_DEPTH' | 'HDR' | 'AI_COMP' | 'BAYER_DEMO' | 'COLOR_MANAGE' | 'RAW_FORMAT';

interface DigitalISPViewProps {
  initialTab?: string;
}

export const DigitalISPView: React.FC<DigitalISPViewProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('COLOR_MANAGE');

  useEffect(() => {
     if (initialTab && ['WHITE_BALANCE', 'SAMPLING', 'BIT_DEPTH', 'HDR', 'AI_COMP', 'BAYER_DEMO', 'COLOR_MANAGE', 'RAW_FORMAT'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
  }, [initialTab]);

  const tabs: TabItem[] = [
    { id: 'COLOR_MANAGE', label: '色彩空间与 Log', icon: <Palette size={14}/> },
    { id: 'RAW_FORMAT', label: 'RAW 格式详解', icon: <FileImage size={14}/> },
    { id: 'WHITE_BALANCE', label: '白平衡与色温', icon: <Sun size={14}/> },
    { id: 'BAYER_DEMO', label: '拜耳与摩尔纹', icon: <Grid3X3 size={14}/> },
    { id: 'SAMPLING', label: '去马赛克与采样', icon: <Cpu size={14}/> },
    { id: 'BIT_DEPTH', label: '量化色深', icon: <Binary size={14}/> },
    { id: 'HDR', label: '宽容度与 HDR', icon: <ImagePlus size={14}/> },
    { id: 'AI_COMP', label: 'AI 计算摄影', icon: <Sparkles size={14}/> },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={(id) => setActiveTab(id as Tab)} 
        />

        <div className="flex-1 relative overflow-hidden bg-slate-950">
           {activeTab === 'COLOR_MANAGE' && <ColorSpaceModule />}
           {activeTab === 'RAW_FORMAT' && <RawFormatModule />}
           {activeTab === 'WHITE_BALANCE' && <WBModule />}
           {activeTab === 'BAYER_DEMO' && <BayerMoireModule />}
           {activeTab === 'HDR' && <HDRModule />}
           {activeTab === 'SAMPLING' && <SamplingModule />}
           {activeTab === 'BIT_DEPTH' && <BitDepthModule />}
           {activeTab === 'AI_COMP' && <AIModule />}
        </div>
      </div>
    </div>
  );
};
