import React from 'react';
import { CVCustomization } from '../../../types/cv';
import { CV_TEMPLATES, COLOR_PRESETS } from '../../../data/cvPresets';
import { Check, Palette, Type, Layout } from 'lucide-react';

interface Props {
  selectedTemplate: string;
  customization: CVCustomization;
  onSelectTemplate: (templateId: any) => void;
  onChangeCustomization: (customization: CVCustomization) => void;
}

export const CustomizationPanel: React.FC<Props> = ({
  selectedTemplate,
  customization,
  onSelectTemplate,
  onChangeCustomization
}) => {
  const currentAccent = customization?.accentColor || '#4F6B85';
  const currentFont = customization?.fontFamily || 'Inter';

  const handleUpdate = (field: keyof CVCustomization, value: any) => {
    onChangeCustomization({
      ...customization,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 font-sans text-xs">
      {/* 1. Template Picker */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#111111] uppercase tracking-wider">
          <Layout className="size-4 text-[#4F6B85]" />
          <span>CV Template</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CV_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => onSelectTemplate(tmpl.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-white border-[#4F6B85] ring-2 ring-[#4F6B85]/20 shadow-md'
                    : 'bg-white/60 border-black/10 hover:border-black/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-xs text-[#111111] truncate">{tmpl.name}</span>
                  {isSelected && <Check className="size-3.5 text-[#4F6B85] shrink-0" />}
                </div>
                <p className="text-[10px] text-[#666666] line-clamp-2 leading-tight">{tmpl.description}</p>
                {tmpl.popular && (
                  <span className="inline-block mt-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#4F6B85]/10 text-[#4F6B85]">
                    Popular
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Palette */}
      <div className="border-t border-black/10 pt-5">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#111111] uppercase tracking-wider">
          <Palette className="size-4 text-[#4F6B85]" />
          <span>Accent Color</span>
        </div>

        {/* Color Presets */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = currentAccent.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.hex}
                type="button"
                onClick={() => handleUpdate('accentColor', preset.hex)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                  isSelected ? 'border-black/40 bg-white shadow-xs ring-1 ring-black/20' : 'border-transparent hover:bg-black/5'
                }`}
              >
                <span
                  className="size-5 rounded-full border border-black/10 shadow-xs"
                  style={{ backgroundColor: preset.hex }}
                />
                <span className="text-[9px] font-semibold text-[#555555] truncate max-w-full">{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Color Input */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-black/10">
          <input
            type="color"
            value={currentAccent}
            onChange={(e) => handleUpdate('accentColor', e.target.value)}
            className="size-7 rounded border-0 cursor-pointer bg-transparent"
          />
          <div className="flex-1">
            <span className="block text-[10px] font-semibold text-[#777777] uppercase tracking-wider">Custom Hex Color</span>
            <input
              type="text"
              value={currentAccent}
              onChange={(e) => handleUpdate('accentColor', e.target.value)}
              className="text-xs font-mono font-bold text-[#111111] focus:outline-none uppercase"
            />
          </div>
        </div>
      </div>

      {/* 3. Typography & Styling */}
      <div className="border-t border-black/10 pt-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-wider">
          <Type className="size-4 text-[#4F6B85]" />
          <span>Typography & Spacing</span>
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Font Family
          </label>
          <select
            value={currentFont}
            onChange={(e) => handleUpdate('fontFamily', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:outline-none"
          >
            <option value="Inter">Inter (Sans-Serif - Clean Modern)</option>
            <option value="Plus Jakarta Sans">Plus Jakarta Sans (Sans-Serif - Elegant)</option>
            <option value="Roboto">Roboto (Sans-Serif - Crisp Standard)</option>
            <option value="Georgia">Georgia (Serif - Executive Academic)</option>
            <option value="Merriweather">Merriweather (Serif - Formal Editorial)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
