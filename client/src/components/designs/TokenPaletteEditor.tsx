import React from 'react';
import { useTokens, COLOR_PALETTE_PRESETS } from '../../context/TokenContext';
import { Palette, RotateCcw, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ColorTokens } from '../../types/design';

export const TokenPaletteEditor: React.FC = () => {
  const { tokens, activePreset, updateToken, applyPreset, resetToDefaults, getContrastScore } = useTokens();

  const contrast = getContrastScore();

  const tokenList: { key: keyof ColorTokens; label: string; desc: string }[] = [
    { key: 'primary', label: 'Primary Brand', desc: 'Main brand & primary CTAs' },
    { key: 'secondary', label: 'Secondary / Slate', desc: 'Supporting accents & icons' },
    { key: 'background', label: 'Background Canvas', desc: 'Section & page backdrop' },
    { key: 'foreground', label: 'Foreground Text', desc: 'Headlines & high contrast text' },
    { key: 'muted', label: 'Muted Text', desc: 'Subtitles & metadata text' },
    { key: 'accent', label: 'Accent Highlight', desc: 'Interactive focus & badges' },
    { key: 'border', label: 'Border Stroke', desc: 'Dividers & container borders' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-black text-white">
            <Palette size={16} />
          </div>
          <div>
            <h4 className="font-bold text-xs text-black uppercase tracking-wider">
              Token Palette Studio
            </h4>
            <p className="text-[11px] text-gray-500">
              Live variable injection with non-destructive temporary preview state.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Contrast Status Badge */}
          <div
            className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
              contrast.isCompliant
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
            }`}
          >
            {contrast.isCompliant ? (
              <ShieldCheck size={13} className="text-emerald-600" />
            ) : (
              <AlertTriangle size={13} className="text-amber-600" />
            )}
            <span>{contrast.label}</span>
            <span className="font-mono text-[10px] opacity-75">({contrast.ratio.toFixed(1)}:1)</span>
          </div>

          <button
            onClick={resetToDefaults}
            className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors border border-gray-200"
            title="Restore original design colors"
          >
            <RotateCcw size={12} /> Reset to Defaults
          </button>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Curated Palette Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PALETTE_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.name;
            return (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div
                  className="size-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: preset.tokens.accent }}
                />
                <span>{preset.name}</span>
                {isSelected && <Check size={12} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Tokens Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-2">
        {tokenList.map(({ key, label, desc }) => (
          <div
            key={key}
            className="p-3 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-gray-300 transition-all flex items-center justify-between shadow-2xs"
          >
            <div>
              <p className="text-xs font-bold text-black">{label}</p>
              <p className="text-[10px] text-gray-500">{desc}</p>
              <span className="text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                {tokens[key]}
              </span>
            </div>

            <div className="relative flex items-center">
              <input
                type="color"
                value={tokens[key]}
                onChange={(e) => updateToken(key, e.target.value)}
                className="size-8 rounded-xl cursor-pointer border border-gray-300 bg-transparent p-0 overflow-hidden shadow-2xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
