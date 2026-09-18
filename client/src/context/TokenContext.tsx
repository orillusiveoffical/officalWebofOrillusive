import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTokens } from '../types/design';

export const DEFAULT_COLOR_TOKENS: ColorTokens = {
  primary: '#111111',
  secondary: '#4F6B85',
  background: '#FFFFFF',
  foreground: '#111111',
  muted: '#6B7280',
  border: '#E5E7EB',
  accent: '#4F6B85',
  card: '#FFFFFF'
};

export const COLOR_PALETTE_PRESETS: { name: string; tokens: ColorTokens }[] = [
  {
    name: 'Default Light',
    tokens: {
      primary: '#111111',
      secondary: '#4F6B85',
      background: '#FFFFFF',
      foreground: '#111111',
      muted: '#6B7280',
      border: '#E5E7EB',
      accent: '#4F6B85',
      card: '#FFFFFF'
    }
  },
  {
    name: 'Slate Luxe',
    tokens: {
      primary: '#0F172A',
      secondary: '#3B82F6',
      background: '#F8FAFC',
      foreground: '#0F172A',
      muted: '#64748B',
      border: '#CBD5E1',
      accent: '#2563EB',
      card: '#FFFFFF'
    }
  },
  {
    name: 'Nordic Forest',
    tokens: {
      primary: '#1C2E24',
      secondary: '#2E6F52',
      background: '#F6F9F7',
      foreground: '#1C2E24',
      muted: '#5C7468',
      border: '#D2E0D8',
      accent: '#1B8A5A',
      card: '#FFFFFF'
    }
  },
  {
    name: 'Warm Editorial',
    tokens: {
      primary: '#2C1810',
      secondary: '#C2592E',
      background: '#FAF7F2',
      foreground: '#2C1810',
      muted: '#857368',
      border: '#EADFD5',
      accent: '#D95C27',
      card: '#FFFFFF'
    }
  },
  {
    name: 'Deep Obsidian',
    tokens: {
      primary: '#F8FAFC',
      secondary: '#38BDF8',
      background: '#090D16',
      foreground: '#F1F5F9',
      muted: '#94A3B8',
      border: '#1E293B',
      accent: '#0EA5E9',
      card: '#0F172A'
    }
  }
];

// Helper to convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

// Relative luminance according to WCAG 2.1
const getLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Calculate contrast ratio between two hex colors
export const getContrastRatio = (hex1: string, hex2: string): number => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 21;
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export interface ContrastScore {
  ratio: number;
  isCompliant: boolean;
  rating: 'AAA' | 'AA' | 'Low Contrast';
  label: string;
}

interface TokenContextType {
  tokens: ColorTokens;
  activePreset: string;
  updateToken: (key: keyof ColorTokens, value: string) => void;
  setTokens: (tokens: ColorTokens) => void;
  applyPreset: (presetName: string) => void;
  resetToDefaults: () => void;
  getCustomProperties: () => React.CSSProperties;
  getContrastScore: () => ContrastScore;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokensState] = useState<ColorTokens>(DEFAULT_COLOR_TOKENS);
  const [activePreset, setActivePreset] = useState<string>('Default Light');

  const updateToken = (key: keyof ColorTokens, value: string) => {
    setActivePreset('Custom');
    setTokensState((prev) => ({ ...prev, [key]: value }));
  };

  const setTokens = (newTokens: ColorTokens) => {
    setTokensState(newTokens);
  };

  const applyPreset = (presetName: string) => {
    const preset = COLOR_PALETTE_PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setActivePreset(preset.name);
      setTokensState(preset.tokens);
    }
  };

  const resetToDefaults = () => {
    setActivePreset('Default Light');
    setTokensState(DEFAULT_COLOR_TOKENS);
  };

  const getCustomProperties = (): React.CSSProperties => {
    return {
      '--ui-primary': tokens.primary,
      '--ui-secondary': tokens.secondary,
      '--ui-bg': tokens.background,
      '--ui-fg': tokens.foreground,
      '--ui-muted': tokens.muted,
      '--ui-border': tokens.border,
      '--ui-accent': tokens.accent,
      '--ui-card': tokens.card
    } as React.CSSProperties;
  };

  const getContrastScore = (): ContrastScore => {
    const ratio = getContrastRatio(tokens.background, tokens.foreground);
    if (ratio >= 7) {
      return { ratio, isCompliant: true, rating: 'AAA', label: 'AAA Enhanced Contrast' };
    }
    if (ratio >= 4.5) {
      return { ratio, isCompliant: true, rating: 'AA', label: 'AA Standard Contrast' };
    }
    return { ratio, isCompliant: false, rating: 'Low Contrast', label: '⚠️ Low Contrast Warning' };
  };

  return (
    <TokenContext.Provider
      value={{
        tokens,
        activePreset,
        updateToken,
        setTokens,
        applyPreset,
        resetToDefaults,
        getCustomProperties,
        getContrastScore
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};
