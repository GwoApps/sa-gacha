'use client';

interface BudgetButtonsProps {
  budget: number;
  onChange: (budget: number) => void;
}

export default function BudgetButtons({ budget, onChange }: BudgetButtonsProps) {
  const addAmounts = [10, 20, 50];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="text-sm font-medium text-zinc-400">预算</label>

      <div className="flex items-center gap-1.5">
        {addAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onChange(budget + amount)}
            className={`
              relative overflow-hidden px-4 py-2 rounded-xl text-sm font-bold
              transition-all duration-150 active:scale-90
              hover:brightness-110
              ${amount === 10
                ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
                : amount === 20
                  ? 'bg-red-600/20 text-red-200 border border-red-600/30 hover:bg-red-600/30'
                  : 'bg-red-700/20 text-red-100 border border-red-700/30 hover:bg-red-700/30'
              }
            `}
          >
            +{amount}
          </button>
        ))}

        <button
          onClick={() => onChange(0)}
          className="px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-zinc-300 transition-all duration-150"
        >
          重置
        </button>
      </div>

      <div className="flex items-center gap-2 ml-1">
        <span className="text-2xl font-bold tabular-nums text-white">{budget}</span>
        <span className="text-sm text-zinc-400">元</span>
      </div>
    </div>
  );
}
