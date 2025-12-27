
import React, { useState, useEffect } from 'react';
import { Cpu, Layers, Binary, Sun, ImagePlus, Sparkles, Grid3X3, Palette, FileImage } from 'lucide-react';
import { RawFormatModule, ColorSpaceModule, BayerMoireModule, WBModule, SamplingModule, AIModule } from './digital-isp/ISPModules';
import { HDRModule } from './digital-isp/HDRModule';
import { BitDepthModule } from './digital-isp/BitDepthModule';

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

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Responsive Scrollable Tab Bar */}
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'COLOR_MANAGE'} onClick={() => setActiveTab('COLOR_MANAGE')} icon={<Palette size={14}/>} label="色彩空间与 Log" />
           <TabButton active={activeTab === 'RAW_FORMAT'} onClick={() => setActiveTab('RAW_FORMAT')} icon={<FileImage size={14}/>} label="RAW 格式详解" />
           <TabButton active={activeTab === 'WHITE_BALANCE'} onClick={() => setActiveTab('WHITE_BALANCE')} icon={<Sun size={14}/>} label="白平衡与色温" />
           <TabButton active={activeTab === 'BAYER_DEMO'} onClick={() => setActiveTab('BAYER_DEMO')} icon={<Grid3X3 size={14}/>} label="拜耳与摩尔纹" />
           <TabButton active={activeTab === 'SAMPLING'} onClick={() => setActiveTab('SAMPLING')} icon={<Cpu size={14}/>} label="去马赛克与采样" />
           <TabButton active={activeTab === 'BIT_DEPTH'} onClick={() => setActiveTab('BIT_DEPTH')} icon={<Binary size={14}/>} label="量化色深" />
           <TabButton active={activeTab === 'HDR'} onClick={() => setActiveTab('HDR')} icon={<ImagePlus size={14}/>} label="宽容度与 HDR" />
           <TabButton active={activeTab === 'AI_COMP'} onClick={() => setActiveTab('AI_COMP')} icon={<Sparkles size={14}/>} label="AI 计算摄影" />
        </div>
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

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-4 text-xs font-bold whitespace-nowrap transition-colors ${active ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);
