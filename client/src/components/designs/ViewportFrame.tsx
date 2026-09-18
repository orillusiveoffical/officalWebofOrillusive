import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, Laptop, Tablet, Smartphone, RotateCcw, Sliders, LucideIcon, Maximize2 } from 'lucide-react';
import { RenderComponentByKey } from './ComponentRegistry';
import { useTokens } from '../../context/TokenContext';

interface ViewportFrameProps {
  componentKey: string;
  title: string;
}

export type ViewportDevice = 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'custom';

interface DevicePreset {
  id: ViewportDevice;
  label: string;
  width: number;
  widthCss: string;
  pixelLabel: string;
  icon: LucideIcon;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'desktop', label: 'Desktop', width: 1440, widthCss: '100%', pixelLabel: '1440px (Fluid 100%)', icon: Monitor },
  { id: 'laptop', label: 'Laptop', width: 1024, widthCss: '1024px', pixelLabel: '1024px (Laptop)', icon: Laptop },
  { id: 'tablet', label: 'Tablet', width: 768, widthCss: '768px', pixelLabel: '768px (Tablet)', icon: Tablet },
  { id: 'mobile', label: 'Mobile', width: 390, widthCss: '390px', pixelLabel: '390px (Mobile)', icon: Smartphone }
];

/**
 * Isolated Iframe Sandbox for authentic CSS media query & Tailwind responsive breakpoint evaluation
 */
const IframeSandbox: React.FC<{
  children: React.ReactNode;
  customTokens: React.CSSProperties;
  resetKey: number;
}> = ({ children, customTokens, resetKey }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const syncStylesAndTokens = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) return;

    const doc = iframe.contentDocument;
    const head = doc.head;

    // 1. Clear previous dynamic styles to avoid duplicates
    head.innerHTML = '';

    // 2. Add Google Fonts (Poppins) and default meta tags
    const fontLink = doc.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap';
    head.appendChild(fontLink);

    const meta = doc.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    head.appendChild(meta);

    // 3. Clone all stylesheets from the parent host document into the iframe head
    const parentStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
    parentStyles.forEach((styleNode) => {
      head.appendChild(styleNode.cloneNode(true));
    });

    // 4. Inject base reset & styling
    const baseStyle = doc.createElement('style');
    baseStyle.textContent = `
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: transparent;
        color: #111111;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      /* Custom isolated scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.03);
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 9999px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.25);
      }
    `;
    head.appendChild(baseStyle);

    // 5. Apply Token Custom Properties to iframe root
    const root = doc.documentElement;
    Object.entries(customTokens).forEach(([key, val]) => {
      if (val != null) {
        root.style.setProperty(key, String(val));
      }
    });

    // Set body mount node
    setMountNode(doc.body);
  }, [customTokens]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (iframe.contentDocument?.readyState === 'complete') {
      syncStylesAndTokens();
    } else {
      iframe.onload = syncStylesAndTokens;
    }
  }, [syncStylesAndTokens, resetKey]);

  return (
    <iframe
      ref={iframeRef}
      title="Component Sandbox Preview"
      className="w-full h-full min-h-[580px] border-0 block bg-white"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export const ViewportFrame: React.FC<ViewportFrameProps> = ({ componentKey, title }) => {
  const [activeDevice, setActiveDevice] = useState<ViewportDevice>('desktop');
  const [customWidth, setCustomWidth] = useState<number>(1440);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);
  const { getCustomProperties } = useTokens();

  const handlePresetSelect = (preset: DevicePreset) => {
    setActiveDevice(preset.id);
    setCustomWidth(preset.width);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);
    setCustomWidth(newWidth);
    // Determine closest preset or custom
    if (newWidth === 1440) setActiveDevice('desktop');
    else if (newWidth === 1024) setActiveDevice('laptop');
    else if (newWidth === 768) setActiveDevice('tablet');
    else if (newWidth === 390) setActiveDevice('mobile');
    else setActiveDevice('custom');
  };

  const currentPreset = DEVICE_PRESETS.find((p) => p.id === activeDevice);
  const widthDisplayLabel = currentPreset ? currentPreset.pixelLabel : `${customWidth}px (Custom)`;

  const containerWidthStyle = activeDevice === 'desktop' ? '100%' : `${customWidth}px`;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col transition-all font-sans">
      {/* Viewport Top Bar */}
      <div className="bg-[#FAF9F7] border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1 shadow-2xs">
          {DEVICE_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = activeDevice === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-black text-white shadow-xs'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                title={`Switch to ${preset.label} view (${preset.pixelLabel})`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{preset.label}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Controls: Resolution Tag, Slider Toggle & Reset */}
        <div className="flex items-center gap-2">
          {/* Custom Width Slider Toggle */}
          <button
            onClick={() => setShowSlider(!showSlider)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 ${
              showSlider
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-200 hover:text-black hover:bg-gray-50'
            }`}
            title="Toggle responsive width slider"
          >
            <Sliders size={13} />
            <span className="hidden md:inline">Adjust Width</span>
          </button>

          {/* Current Resolution Meta Tag */}
          <div className="text-[11px] font-mono font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs">
            {widthDisplayLabel}
          </div>

          {/* Reset Interaction State Button */}
          <button
            onClick={() => setResetKey((k) => k + 1)}
            className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-black hover:bg-gray-50 transition-colors shadow-2xs"
            title="Reset component sandbox state"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Interactive Width Slider Drawer */}
      {showSlider && (
        <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap">320px (Mobile)</span>
            <input
              type="range"
              min="320"
              max="1440"
              step="10"
              value={customWidth}
              onChange={handleSliderChange}
              className="w-full accent-black cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
            />
            <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap">1440px (Desktop)</span>
          </div>
          <span className="font-mono font-bold text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
            {customWidth}px
          </span>
        </div>
      )}

      {/* Realistic Reflow Preview Container with Isolated Iframe */}
      <div className="bg-[#F0EFEB] p-4 sm:p-8 min-h-[620px] flex items-start justify-center overflow-x-auto">
        <div
          style={{
            width: containerWidthStyle,
            maxWidth: '100%',
            transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className={`bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden flex flex-col ${
            activeDevice !== 'desktop' ? 'mx-auto' : 'w-full'
          }`}
        >
          {/* Simulated Mobile/Tablet Device Frame Header */}
          {activeDevice !== 'desktop' && (
            <div className="bg-[#1E2024] text-gray-300 px-4 py-2 flex items-center justify-between text-[11px] font-mono border-b border-gray-800 shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-[#FF5F56]" />
                <div className="size-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="size-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                {activeDevice === 'custom' ? 'Custom Responsive Width' : currentPreset?.label} — {containerWidthStyle}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">100% Native Media Queries</span>
            </div>
          )}

          {/* Iframe Sandbox Body */}
          <div className="w-full h-[600px] overflow-hidden bg-white">
            <IframeSandbox
              customTokens={getCustomProperties()}
              resetKey={resetKey}
            >
              <div className="w-full min-h-full p-4 sm:p-6 bg-white font-sans">
                <RenderComponentByKey componentKey={componentKey} />
              </div>
            </IframeSandbox>
          </div>
        </div>
      </div>
    </div>
  );
};
