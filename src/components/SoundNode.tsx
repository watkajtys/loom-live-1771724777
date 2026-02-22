import React from 'react';
import type { SoundNode as SoundNodeType } from '../context/SoundContext';

interface SoundNodeProps {
  node: SoundNodeType;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}

// Safelist for dynamic classes used below
// bg-blue-500 bg-emerald-500 bg-amber-500 bg-slate-400
// border-blue-500/30 border-emerald-500/30 border-amber-500/30 border-slate-400/30
// bg-blue-500/5 bg-emerald-500/5 bg-amber-500/5 bg-slate-400/5
// hover:bg-blue-500/10 hover:bg-emerald-500/10 hover:bg-amber-500/10 hover:bg-slate-400/10
// text-blue-400 text-emerald-400 text-amber-400 text-slate-400
// text-blue-400/70 text-emerald-400/70 text-amber-400/70 text-slate-400/70

export const SoundNode: React.FC<SoundNodeProps> = ({ node, onMouseDown }) => {
  // Volume is 0-1.
  const scale = 1 + node.volume * 0.5;
  const baseColorName = node.color.split('-')[0]; // e.g. "blue" from "blue-500"

  // We need to construct class names. To be safe, we rely on the safelist comment above or explicit map.
  // Assuming standard tailwind palette, we can try to construct them.
  // Tailwind 4 compiles on demand, but it needs to see the full string.
  // Interpolation `bg-${color}` usually doesn't work.
  // So I'll use inline styles for the color-specific parts where possible, or map them.
  
  const colorMap: {[key: string]: {
    bg: string;
    border: string;
    bgSoft: string;
    bgHover: string;
    text: string;
    textSoft: string;
  }} = {
    'blue-500': {
        bg: 'bg-blue-500',
        border: 'border-blue-500/30',
        bgSoft: 'bg-blue-500/5',
        bgHover: 'group-hover:bg-blue-500/10',
        text: 'text-blue-400',
        textSoft: 'text-blue-400/70'
    },
    'emerald-500': {
        bg: 'bg-emerald-500',
        border: 'border-emerald-500/30',
        bgSoft: 'bg-emerald-500/5',
        bgHover: 'group-hover:bg-emerald-500/10',
        text: 'text-emerald-400',
        textSoft: 'text-emerald-400/70'
    },
    'amber-500': {
        bg: 'bg-amber-500',
        border: 'border-amber-500/30',
        bgSoft: 'bg-amber-500/5',
        bgHover: 'group-hover:bg-amber-500/10',
        text: 'text-amber-400',
        textSoft: 'text-amber-400/70'
    },
    'slate-400': {
        bg: 'bg-slate-400',
        border: 'border-slate-400/30',
        bgSoft: 'bg-slate-400/5',
        bgHover: 'group-hover:bg-slate-400/10',
        text: 'text-slate-300',
        textSoft: 'text-slate-400/70'
    }
  };

  const colors = colorMap[node.color] || colorMap['slate-400'];

  return (
    <div 
        className="absolute group cursor-grab active:cursor-grabbing"
        style={{ 
            top: `${node.y}%`, 
            left: `${node.x}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 30 
        }}
        onMouseDown={(e) => onMouseDown(e, node.id)}
    >
        <div className="relative flex flex-col items-center">
            {/* Core Orb */}
            <div 
                className={`size-3 rounded-full z-20 transition-transform duration-75 ${colors.bg}`}
                style={{ 
                    transform: `scale(${scale})`,
                    boxShadow: `0 0 ${10 + node.volume * 20}px currentColor`
                }}
            ></div>
            
            {/* Outer Ring */}
            <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-full transition-all duration-300 pointer-events-none ${colors.border} ${colors.bgSoft} ${colors.bgHover}`}
                style={{
                    width: `${3 + node.volume * 4}rem`, 
                    height: `${3 + node.volume * 4}rem`,
                }}
            ></div>

            {/* Tooltip/Label */}
            <div className="absolute -top-8 bg-obsidian border border-grid-border px-2 py-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                <span className={`${colors.text}`}>
                    VOL: {Math.round(node.volume * 100)}%
                </span>
            </div>
            
            <span className={`absolute top-8 text-[10px] uppercase tracking-widest font-bold mt-1 pointer-events-none ${colors.textSoft}`}>
                {node.label}
            </span>
        </div>
    </div>
  );
};