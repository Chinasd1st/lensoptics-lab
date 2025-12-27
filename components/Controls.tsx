
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, unit = '', onChange, disabled }) => {
  return (
    <div className={`mb-5 ${disabled ? 'opacity-30 pointer-events-none' : ''} select-none`}>
      <div className="flex justify-between mb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm text-cyan-400 font-mono font-bold bg-cyan-900/20 px-2 rounded">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 focus:outline-none"
      />
    </div>
  );
};

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between mb-5 cursor-pointer select-none group" onClick={() => onChange(!checked)}>
    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-wider">{label}</span>
    <div className={`w-12 h-6 flex items-center bg-slate-700 rounded-full p-1 transition-all duration-300 ${checked ? 'bg-cyan-600' : 'bg-slate-700'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

interface SelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: any) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, options, onChange }) => (
  <div className="mb-5 select-none">
    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800 border-2 border-slate-700 text-white text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 appearance-none cursor-pointer transition-colors hover:border-slate-600"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);
