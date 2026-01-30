
import React, { useEffect, useRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: any) => void; // Using any to allow specific string union types
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll to active tab when it changes
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
       const container = scrollContainerRef.current;
       const tab = activeTabRef.current;
       
       // Calculate center position
       const tabLeft = tab.offsetLeft;
       const tabWidth = tab.offsetWidth;
       const containerWidth = container.offsetWidth;
       const scrollPos = tabLeft - (containerWidth / 2) + (tabWidth / 2);

       container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      onTabChange(tabs[nextIndex].id);
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      onTabChange(tabs[prevIndex].id);
      buttonRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="w-full border-b border-slate-800 bg-slate-950 shrink-0 relative z-10 shadow-sm">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar items-center px-2 h-14 mask-linear-fade focus:outline-none"
        style={{ scrollBehavior: 'smooth' }}
        role="tablist"
        aria-label="Module Navigation"
      >
        <div className="flex gap-1 mx-auto lg:mx-0 min-w-max px-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
                if (tab.id === activeTab) activeTabRef.current = el;
              }}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border outline-none
                focus:ring-2 focus:ring-cyan-500/50
                ${activeTab === tab.id
                  ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-105'
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900'}
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
