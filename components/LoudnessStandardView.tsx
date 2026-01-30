
import React, { useState, useEffect } from 'react';
import { BarChart3, Globe, Activity, Info, Settings, Workflow, Sigma, CheckCircle, FileAudio, Eye, Mic, ArrowDownToLine } from 'lucide-react';
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
import { ProCGuideModule } from './loudness/ProCGuideModule';
import { TabNavigation, TabItem } from './TabNavigation';

type Tab = 'UNITS' | 'STANDARDS' | 'LAB' | 'FLOW' | 'MATH' | 'WORKFLOW' | 'QUALITY' | 'CHEAT_SHEET' | 'ANALYZER' | 'INSIGHT_GUIDE' | 'PROG_GUIDE' | 'PROC_GUIDE';

interface LoudnessStandardViewProps {
  initialTab?: string;
}

export const LoudnessStandardView: React.FC<LoudnessStandardViewProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('UNITS');

  useEffect(() => {
     if (initialTab && ['UNITS', 'STANDARDS', 'LAB', 'FLOW', 'MATH', 'WORKFLOW', 'QUALITY', 'CHEAT_SHEET', 'ANALYZER', 'INSIGHT_GUIDE', 'PROG_GUIDE', 'PROC_GUIDE'].includes(initialTab)) {
        setActiveTab(initialTab as Tab);
     }
  }, [initialTab]);

  const tabs: TabItem[] = [
    { id: 'ANALYZER', label: '在线分析工具 (Tool)', icon: <FileAudio size={16}/> },
    { id: 'INSIGHT_GUIDE', label: '读图指南 (Insight)', icon: <Eye size={16}/> },
    { id: 'PROG_GUIDE', label: '噪声门 (Pro-G)', icon: <Mic size={16}/> },
    { id: 'PROC_GUIDE', label: '压缩器 (Pro-C)', icon: <ArrowDownToLine size={16}/> },
    { id: 'UNITS', label: '核心概念', icon: <BarChart3 size={16}/> },
    { id: 'MATH', label: '算法原理', icon: <Sigma size={16}/> },
    { id: 'LAB', label: '实验室', icon: <Activity size={16}/> },
    { id: 'FLOW', label: '流程图', icon: <Workflow size={16}/> },
    { id: 'STANDARDS', label: '交付标准', icon: <Globe size={16}/> },
    { id: 'WORKFLOW', label: '混音工作流', icon: <Settings size={16}/> },
    { id: 'QUALITY', label: '质量指标', icon: <CheckCircle size={16}/> },
    { id: 'CHEAT_SHEET', label: '速查表', icon: <Info size={16}/> },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      <div className="flex-1 bg-slate-950 relative overflow-hidden border-b lg:border-r border-slate-800 flex flex-col">
        
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={(id) => setActiveTab(id as Tab)} 
        />
        
        {/* Content Area */}
        <div className="flex-1 relative overflow-y-auto bg-slate-950 p-6 lg:p-8">
           {activeTab === 'ANALYZER' && <LoudnessAnalyzerModule />}
           {activeTab === 'INSIGHT_GUIDE' && <InsightGuideModule />}
           {activeTab === 'PROG_GUIDE' && <ProGGuideModule />}
           {activeTab === 'PROC_GUIDE' && <ProCGuideModule />}
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
