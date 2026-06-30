'use client';

import { GachaFilters } from '@/utils/gacha';

interface FilterToggleProps {
  filters: GachaFilters;
  onChange: (filters: GachaFilters) => void;
}

export default function FilterToggle({ filters, onChange }: FilterToggleProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="text-sm font-medium text-zinc-400">过滤</label>

      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={filters.excludeDrinks}
            onChange={(e) =>
              onChange({ ...filters, excludeDrinks: e.target.checked })
            }
            className="sr-only peer"
          />
          <div className="w-9 h-5 rounded-full bg-zinc-800 border border-zinc-700 peer-checked:bg-red-900/50 peer-checked:border-red-700/50 transition-colors duration-200" />
          <div
            className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-zinc-500 transition-all duration-200 shadow-sm ${
              filters.excludeDrinks ? 'translate-x-4 bg-red-400' : ''
            }`}
          />
        </div>
        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
          🥤 不含饮品
        </span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={filters.excludeDesserts}
            onChange={(e) =>
              onChange({ ...filters, excludeDesserts: e.target.checked })
            }
            className="sr-only peer"
          />
          <div className="w-9 h-5 rounded-full bg-zinc-800 border border-zinc-700 peer-checked:bg-red-900/50 peer-checked:border-red-700/50 transition-colors duration-200" />
          <div
            className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-zinc-500 transition-all duration-200 shadow-sm ${
              filters.excludeDesserts ? 'translate-x-4 bg-red-400' : ''
            }`}
          />
        </div>
        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
          🍰 不含甜品
        </span>
      </label>
    </div>
  );
}
