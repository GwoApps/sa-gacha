'use client';

import { useState, useCallback, useRef } from 'react';
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
  const gachaRef = useRef<HTMLDivElement>(null);

  const scrollToGacha = useCallback(() => {
    // Wait for DOM update then scroll to center the animation
    requestAnimationFrame(() => {
      gachaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  const handleGacha = useCallback(() => {
    if (spinning) return;

    setShowResult(false);
    setResult(null);

    const order = generateOrder(budget, filters);
    setResult(order);
    setSpinning(true);
    scrollToGacha();
  }, [budget, filters, spinning, scrollToGacha]);

  const handleAnimationComplete = useCallback(() => {
    setSpinning(false);
    setShowResult(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 max-w-md mx-auto w-full">
      {/* Controls Panel */}
      <div className="w-full sa-card p-5 space-y-5">
        <RegionBadge />
        <BudgetButtons budget={budget} onChange={setBudget} />
        <FilterToggle filters={filters} onChange={setFilters} />
      </div>

      {/* Gacha Animation Area */}
      <div ref={gachaRef} className="scroll-mt-8 w-full flex flex-col items-center gap-8">
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
          relative px-14 py-4 rounded-2xl text-lg font-bold tracking-wider
          transition-all duration-200 shadow-lg
          ${
            spinning
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed scale-95 shadow-none'
              : 'bg-red-600 text-white shadow-red-500/25 hover:bg-red-700 hover:shadow-red-500/40 hover:scale-105 active:scale-95'
          }
        `}
      >
        {spinning ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
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
      </div>{/* end gachaRef */}
    </div>
  );
}
