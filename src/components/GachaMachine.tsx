'use client';

import { useState, useCallback } from 'react';
import { generateOrder, GachaResult, GachaFilters } from '@/utils/gacha';
import RegionBadge from './RegionBadge';
import BudgetButtons from './BudgetButtons';
import FilterToggle from './FilterToggle';
import GachaAnimation from './GachaAnimation';
import OrderList from './OrderList';

export default function GachaMachine() {
  const [budget, setBudget] = useState(0);
  const [filters, setFilters] = useState<GachaFilters>({
    excludeDrinks: false,
    excludeDesserts: false,
  });
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<GachaResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleGacha = useCallback(() => {
    if (spinning) return;

    setShowResult(false);
    setResult(null);

    const order = generateOrder(budget, filters);
    setResult(order);
    setSpinning(true);
  }, [budget, filters, spinning]);

  const handleAnimationComplete = useCallback(() => {
    setSpinning(false);
    setShowResult(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Controls */}
      <div className="w-full max-w-md space-y-5">
        <RegionBadge />
        <BudgetButtons budget={budget} onChange={setBudget} />
        <FilterToggle filters={filters} onChange={setFilters} />
      </div>

      {/* Gacha Animation Area */}
      <GachaAnimation
        spinning={spinning}
        result={result}
        onComplete={handleAnimationComplete}
      />

      {/* Trigger Button */}
      <button
        onClick={handleGacha}
        disabled={spinning}
        className={`
          relative px-12 py-4 rounded-2xl text-lg font-bold tracking-wider
          transition-all duration-200
          ${
            spinning
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed scale-95'
              : 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 active:scale-95'
          }
        `}
      >
        {spinning ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
            扭动中...
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <span className="text-2xl">🎰</span>
            扭一下！
          </span>
        )}
      </button>

      {/* Result Display */}
      {result && (
        <OrderList result={result} visible={showResult} />
      )}
    </div>
  );
}
