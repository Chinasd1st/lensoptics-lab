
import React, { useState, useEffect } from 'react';

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
  const [localVal, setLocalVal] = useState(value.toString());

  // Sync local state when prop changes externally
  useEffect(() => {
    setLocalVal(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalVal(e.target.value);
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      // Allow typing freely, but clamp only valid numbers that are within reasonable bounds for instant feedback
      if (num >= min && num <= max) {
         onChange(num);
      }
    }
  };

  const handleBlur = () => {
    let num = parseFloat(localVal);
    if (isNaN(num)) num = min;
    // Defensive clamping on blur
    const clamped = Math.min(Math.max(num, min), max);
    setLocalVal(clamped.toString());
    onChange(clamped);
  };

  return (
    <div className={`mb-5 ${disabled ? 'opacity-50 pointer-events-none' : ''} group`}>
      <div className="flex justify-between mb-2 items-center">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-200 transition-colors">
          {label}
        </label>
        
        {/* Defensive UI: Direct Input for Precision */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded px-2 py-0.5 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={localVal}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-12 bg-transparent text-right text-xs font-mono font-bold text-cyan-400 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-[10px] text-slate-500 ml-1 select-none">{unit}</span>
        </div>
      </div>
      
      <div className="relative h-4 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
    </div>
  );
};

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => (
  <button 
    className="w-full flex items-center justify-between mb-5 cursor-pointer select-none group focus:outline-none"
    onClick={() => onChange(!checked)}
    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(!checked); }}}
    role="switch"
    aria-checked={checked}
    aria-label={label}
  >
    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-wider text-left">{label}</span>
    <div className={`w-12 h-6 flex items-center bg-slate-700 rounded-full p-1 transition-all duration-300 border border-transparent group-focus:ring-2 group-focus:ring-cyan-500/50 ${checked ? 'bg-cyan-600' : 'bg-slate-700'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </button>
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
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border-2 border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 block p-3 appearance-none cursor-pointer transition-colors hover:border-slate-600"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);
