'use client';

interface BudgetButtonsProps {
  budget: number;
  onChange: (budget: number) => void;
}

export default function BudgetButtons({ budget, onChange }: BudgetButtonsProps) {
  const addAmounts = [10, 20, 50];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="text-xs font-medium text-stone-400 tracking-wider">预算</label>

      <div className="flex items-center gap-1.5">
        {addAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onChange(budget + amount)}
            className={`
              relative overflow-hidden px-4 py-2 rounded-xl text-sm font-bold
              transition-all duration-150 active:scale-90 shadow-sm
              ${amount === 10
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300'
                : amount === 20
                  ? 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 hover:border-red-400'
                  : 'bg-red-200 text-red-800 border border-red-400 hover:bg-red-300 hover:border-red-500'
              }
            `}
          >
            +{amount}
          </button>
        ))}

        <button
          onClick={() => onChange(0)}
          className="px-3 py-2 rounded-xl text-xs font-medium bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-200 hover:text-stone-600 transition-all duration-150"
        >
          重置
        </button>
      </div>

      <div className="flex items-center gap-1.5 ml-1">
        <span className="text-2xl font-black tabular-nums text-stone-800">
          {budget}
        </span>
        <span className="text-sm text-stone-400 font-medium">元</span>
      </div>
    </div>
  );
}
