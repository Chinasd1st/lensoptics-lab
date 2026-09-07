
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

  useEffect(() => {
    setLocalVal(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalVal(e.target.value);
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      if (num >= min && num <= max) {
         onChange(num);
      }
    }
  };

  const handleBlur = () => {
    let num = parseFloat(localVal);
    if (isNaN(num)) num = min;
    const clamped = Math.min(Math.max(num, min), max);
    setLocalVal(clamped.toString());
    onChange(clamped);
  };

  return (
    <div className={`mb-5 ${disabled ? 'opacity-50 pointer-events-none' : ''} group`}>
      <div className="flex justify-between mb-2 items-center">
        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
          {label}
        </label>
        
        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-0.5 focus-within:border-primary-500 transition-all">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={localVal}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-12 bg-transparent text-right text-xs font-mono font-bold text-primary-600 dark:text-primary-400 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 ml-1 select-none">{unit}</span>
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
          className="w-full h-2 bg-zinc-300 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-primary-500 hover:accent-primary-400 focus:outline-none transition-all"
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
    className="w-full flex items-center justify-between mb-5 cursor-pointer select-none group focus:outline-none bg-transparent border-none p-0"
    onClick={() => onChange(!checked)}
    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(!checked); }}}
    role="switch"
    aria-checked={checked}
    aria-label={label}
  >
    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors uppercase tracking-wider text-left">{label}</span>
    <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 border border-transparent ${checked ? 'bg-primary-600' : 'bg-zinc-300 dark:bg-zinc-800'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </button>
);

interface SelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, options, onChange }) => (
  <div className="mb-5 select-none">
    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-2 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-xl focus:border-primary-500 block p-3 appearance-none cursor-pointer transition-colors hover:border-zinc-400 dark:hover:border-zinc-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-600 dark:text-zinc-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);
