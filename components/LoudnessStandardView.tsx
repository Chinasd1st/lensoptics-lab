
import React, { useState, useEffect } from 'react';
import { BarChart3, Globe, Activity, Info, Settings, Workflow, Sigma, CheckCircle, FileAudio, Eye, Mic } from 'lucide-react';
import { UnitsModule } from './loudness/UnitsModule';
import { StandardsModule } from './loudness/StandardsModule';
import { AlgorithmLabModule } from './loudness/AlgorithmLabModule';
import { AlgorithmFlowModule } from './loudness/AlgorithmFlowModule';
import { WorkflowModule } from './loudness/WorkflowModule';
import { CheatSheetModule } from './loudness/CheatSheetModule';
import { MathTheoryModule } from './loudness/MathTheoryModule';
import { QualityIndicatorsModule } from './loudness/QualityIndicatorsModule';
import { LoudnessAnalyzerModule } from './loudness/LoudnessAnalyzerModule';
import { InsightGuideModule } from './loudness/InsightGuideModule';
import { ProGGuideModule } from './loudness/ProGGuideModule';

type Tab = 'UNITS' | 'STANDARDS' | 'LAB' | 'FLOW' | 'MATH' | 'WORKFLOW' | 'QUALITY' | 'CHEAT_SHEET' | 'ANALYZER' | 'INSIGHT_GUIDE' | 'PROG_GUIDE';

interface LoudnessStandardViewProps {
  initialTab?: string;
}

export const LoudnessStandardView: React.FC<LoudnessStandardViewProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('UNITS');

  useEffect(() => {
     if (initialTab && ['UNITS', 'STANDARDS', 'LAB', 'FLOW', 'MATH', 'WORKFLOW', 'QUALITY', 'CHEAT_SHEET', 'ANALYZER', 'INSIGHT_GUIDE', 'PROG_GUIDE'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
  }, [initialTab]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar shrink-0">
           <TabButton active={activeTab === 'ANALYZER'} onClick={() => setActiveTab('ANALYZER')} icon={<FileAudio size={16}/>} label="在线分析工具 (Tool)" />
           <TabButton active={activeTab === 'INSIGHT_GUIDE'} onClick={() => setActiveTab('INSIGHT_GUIDE')} icon={<Eye size={16}/>} label="读图指南 (Insight)" />
           <TabButton active={activeTab === 'PROG_GUIDE'} onClick={() => setActiveTab('PROG_GUIDE')} icon={<Mic size={16}/>} label="噪声门指南 (Pro-G)" />
           <TabButton active={activeTab === 'UNITS'} onClick={() => setActiveTab('UNITS')} icon={<BarChart3 size={16}/>} label="核心概念" />
           <TabButton active={activeTab === 'MATH'} onClick={() => setActiveTab('MATH')} icon={<Sigma size={16}/>} label="算法原理" />
           <TabButton active={activeTab === 'LAB'} onClick={() => setActiveTab('LAB')} icon={<Activity size={16}/>} label="实验室" />
           <TabButton active={activeTab === 'FLOW'} onClick={() => setActiveTab('FLOW')} icon={<Workflow size={16}/>} label="流程图" />
           <TabButton active={activeTab === 'STANDARDS'} onClick={() => setActiveTab('STANDARDS')} icon={<Globe size={16}/>} label="交付标准" />
           <TabButton active={activeTab === 'WORKFLOW'} onClick={() => setActiveTab('WORKFLOW')} icon={<Settings size={16}/>} label="混音工作流" />
           <TabButton active={activeTab === 'QUALITY'} onClick={() => setActiveTab('QUALITY')} icon={<CheckCircle size={16}/>} label="质量指标" />
           <TabButton active={activeTab === 'CHEAT_SHEET'} onClick={() => setActiveTab('CHEAT_SHEET')} icon={<Info size={16}/>} label="速查表" />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 relative overflow-y-auto bg-slate-950 p-6 lg:p-8">
           {activeTab === 'ANALYZER' && <LoudnessAnalyzerModule />}
           {activeTab === 'INSIGHT_GUIDE' && <InsightGuideModule />}
           {activeTab === 'PROG_GUIDE' && <ProGGuideModule />}
           {activeTab === 'UNITS' && <UnitsModule />}
           {activeTab === 'STANDARDS' && <StandardsModule />}
           {activeTab === 'LAB' && <AlgorithmLabModule />}
           {activeTab === 'FLOW' && <AlgorithmFlowModule />}
           {activeTab === 'MATH' && <MathTheoryModule />}
           {activeTab === 'WORKFLOW' && <WorkflowModule />}
           {activeTab === 'QUALITY' && <QualityIndicatorsModule />}
           {activeTab === 'CHEAT_SHEET' && <CheatSheetModule />}
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
