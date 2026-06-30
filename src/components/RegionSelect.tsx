'use client';

import { Region } from '@/data/menu';

interface RegionSelectProps {
  region: Region;
  onChange: (region: Region) => void;
}

export default function RegionSelect({ region, onChange }: RegionSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-zinc-400">地区</label>
      <div className="flex rounded-xl overflow-hidden border border-zinc-700/50">
        <button
          onClick={() => onChange('japan')}
          className={`px-5 py-2 text-sm font-medium transition-all duration-200 ${
            region === 'japan'
              ? 'bg-white/10 text-white shadow-inner'
              : 'bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
          }`}
        >
          🇯🇵 日本
        </button>
        <button
          onClick={() => onChange('china')}
          className={`px-5 py-2 text-sm font-medium transition-all duration-200 ${
            region === 'china'
              ? 'bg-white/10 text-white shadow-inner'
              : 'bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
          }`}
        >
          🇨🇳 中国
        </button>
      </div>
    </div>
  );
}
