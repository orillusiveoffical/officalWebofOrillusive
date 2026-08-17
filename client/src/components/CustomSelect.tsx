import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  icon: HeaderIcon,
  className = '',
  disabled = false,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const SelectedOptionIcon = selectedOption?.icon;

  return (
    <div className={`relative w-full font-sans ${className}`} ref={containerRef} id={id}>
      {label && (
        <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white border text-left transition-all duration-200 shadow-xs focus:outline-none ${
          isOpen
            ? 'border-[#4F6B85] ring-2 ring-[#4F6B85]/20 shadow-md bg-white'
            : 'border-black/10 hover:border-black/20 hover:bg-[#FAF9F7]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {SelectedOptionIcon ? (
            <SelectedOptionIcon className="size-4 text-[#4F6B85] shrink-0" />
          ) : HeaderIcon ? (
            <HeaderIcon className="size-4 text-[#4F6B85] shrink-0" />
          ) : null}
          
          <span className={`text-xs font-semibold truncate ${selectedOption ? 'text-[#111111]' : 'text-[#888888]'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`size-4 text-[#4F6B85] shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#111111]' : ''
          }`}
        />
      </button>

      {/* Animated Dropdown Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 p-1.5 shadow-2xl shadow-black/15 ring-1 ring-black/5"
            role="listbox"
          >
            <div className="max-h-60 overflow-y-auto space-y-1 p-0.5 custom-scrollbar">
              {options.map((option) => {
                const isSelected = option.value === value || option.label === value;
                const OptionIcon = option.icon;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 group ${
                      isSelected
                        ? 'bg-[#4F6B85]/10 text-[#4F6B85] font-bold border border-[#4F6B85]/20'
                        : 'text-[#333333] hover:bg-[#F4F4F2] hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      {OptionIcon && (
                        <div
                          className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#4F6B85] text-white'
                              : 'bg-black/5 text-[#4F6B85] group-hover:bg-[#111111] group-hover:text-white'
                          }`}
                        >
                          <OptionIcon className="size-3.5" />
                        </div>
                      )}
                      <div className="truncate">
                        <div className="text-xs font-semibold truncate">{option.label}</div>
                        {option.description && (
                          <div className="text-[10px] text-[#777777] font-normal truncate mt-0.5">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="size-4 text-[#4F6B85] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
