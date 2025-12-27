
import React, { useState, useEffect } from 'react';
import { A7M5Page, FX2Page, Lens400800GPage, Lens50150GMPage, Lens100GMPage, TeleconverterPage, A1M2Page, A9M3Page } from './GearPages';

interface GearShowcaseViewProps {
  initialTab?: string;
}

export const GearShowcaseView: React.FC<GearShowcaseViewProps> = ({ initialTab }) => {
  const [activeProduct, setActiveProduct] = useState<'A1M2' | 'A9M3' | 'A7M5' | 'FX2' | '100GM' | '50150GM' | '400800G' | 'TC'>('A1M2');

  useEffect(() => {
     if (initialTab && ['A1M2', 'A9M3', 'A7M5', 'FX2', '100GM', '50150GM', '400800G', 'TC'].includes(initialTab)) {
        setActiveProduct(initialTab as any);
     }
  }, [initialTab]);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-black text-slate-200">
      {/* Product Navigation */}
      <div className="w-full lg:w-80 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
           <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Sony Press Release</div>
           <h2 className="text-xl font-bold text-white">新品发布回顾</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
           {/* A1 II */}
           <NavButton 
              id="A1M2" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="α1 II (2024)" 
              badge="NEW" 
              badgeColor="bg-yellow-600"
              desc="11月19日发布 · 50MP 堆栈"
              gradient="from-slate-800 to-slate-900 border-yellow-500/50"
              accent="bg-yellow-500"
           />

           {/* A9 III */}
           <NavButton 
              id="A9M3" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="α9 III" 
              badge="GLOBAL" 
              badgeColor="bg-red-600"
              desc="全域快门速度旗舰 · 2023发布"
              gradient="from-slate-800 to-slate-900 border-red-500/50"
              accent="bg-red-500"
           />

           {/* A7M5 */}
           <NavButton 
              id="A7M5" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="α7 V" 
              badge="FUTURE" 
              badgeColor="bg-orange-600"
              desc="全画幅新基准 · 33MP 部分堆栈"
              gradient="from-slate-800 to-slate-900 border-orange-500/50"
              accent="bg-orange-500"
           />

           {/* FX2 */}
           <NavButton 
              id="FX2" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="Cinema Line FX2" 
              badge="CINE" 
              badgeColor="bg-slate-600"
              desc="轻量化全画幅电影机 · 5月发布"
              gradient="from-slate-800 to-slate-900 border-slate-400/50"
              accent="bg-slate-400"
           />

           {/* 400-800 G - NEW */}
           <NavButton 
              id="400800G" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="FE 400-800mm G" 
              badge="G" 
              badgeColor="bg-black border border-white/20"
              desc="原生800mm · 内变焦设计"
              gradient="from-slate-800 to-slate-900 border-slate-500/50"
              accent="bg-slate-300"
           />

           {/* 50-150 F2 */}
           <NavButton 
              id="50150GM" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="FE 50-150mm F2 GM" 
              badge="GM" 
              badgeColor="bg-red-600"
              desc="恒定F2变焦 · 人像神镜"
              gradient="from-slate-800 to-slate-900 border-red-500/50"
              accent="bg-red-600"
           />

           {/* 100 Macro */}
           <NavButton 
              id="100GM" 
              active={activeProduct} 
              setActive={setActiveProduct}
              title="FE 100mm F2.8 GM" 
              badge="MACRO" 
              badgeColor="bg-emerald-600"
              desc="1.4x 超微距 · 零呼吸效应"
              gradient="from-slate-800 to-slate-900 border-emerald-500/50"
              accent="bg-emerald-600"
           />

           {/* Teleconverter Guide */}
           <div className="pt-4 border-t border-slate-800 mt-2">
             <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Knowledge Base</div>
             <NavButton 
                id="TC" 
                active={activeProduct} 
                setActive={setActiveProduct}
                title="增距镜指南" 
                badge="INFO" 
                badgeColor="bg-blue-600"
                desc="SEL14TC / SEL20TC 详解"
                gradient="from-slate-800 to-slate-900 border-blue-500/50"
                accent="bg-blue-400"
             />
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-y-auto no-scrollbar">
         {activeProduct === 'A1M2' && <A1M2Page />}
         {activeProduct === 'A9M3' && <A9M3Page />}
         {activeProduct === 'A7M5' && <A7M5Page />}
         {activeProduct === 'FX2' && <FX2Page />}
         {activeProduct === '400800G' && <Lens400800GPage />}
         {activeProduct === '50150GM' && <Lens50150GMPage />}
         {activeProduct === '100GM' && <Lens100GMPage />}
         {activeProduct === 'TC' && <TeleconverterPage />}
      </div>
    </div>
  );
};

const NavButton: React.FC<any> = ({ id, active, setActive, title, badge, badgeColor, desc, gradient, accent }) => (
   <button 
      onClick={() => setActive(id)}
      className={`w-full p-4 rounded-lg text-left transition-all border group relative overflow-hidden select-none ${active === id ? `bg-gradient-to-r ${gradient}` : 'bg-transparent border-transparent hover:bg-slate-800'}`}
   >
      <div className="relative z-10">
         <div className="flex justify-between items-center mb-1">
            <span className={`font-bold font-mono text-lg ${active === id ? 'text-white' : 'text-slate-400'}`}>{title}</span>
            {active === id && <span className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded font-bold`}>{badge}</span>}
         </div>
         <div className="text-xs text-slate-500 group-hover:text-slate-400">{desc}</div>
      </div>
      {active === id && <div className={`absolute right-0 top-0 bottom-0 w-1 ${accent}`}></div>}
   </button>
);
