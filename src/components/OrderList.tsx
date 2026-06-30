'use client';

import { GachaResult } from '@/utils/gacha';

interface OrderListProps {
  result: GachaResult;
  visible: boolean;
}

const categoryLabels: Record<string, string> = {
  appetizer: '前菜·沙拉',
  soup: '汤品',
  pizza: '披萨',
  pasta: '意面',
  doria: '烩饭·焗饭',
  grill: '主菜·铁板',
  snack: '小吃·拼盘',
  dessert: '甜品',
  drink: '酒水',
};

function getCategoryLabel(cat: string): string {
  return categoryLabels[cat] || cat;
}

export default function OrderList({ result, visible }: OrderListProps) {
  if (!visible) return null;

  const { items, total, budget } = result;

  return (
    <div className="w-full max-w-md mx-auto animate-gacha-fadeIn">
      {/* Receipt card */}
      <div className="sa-card overflow-hidden">
        {/* Receipt header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5 text-center relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 9px)'
          }} />
          <div className="relative">
            <div className="text-2xl mb-1">🎉</div>
            <div className="text-lg font-black text-white tracking-wider">
              今日点单
            </div>
            <div className="text-[11px] text-red-100 mt-1 font-medium">
              广东萨莉亚 · 共 {items.length} 品
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="px-4 py-3 divide-y divide-stone-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3"
            >
              {/* Emoji circle */}
              <span className="text-xl w-9 h-9 flex items-center justify-center bg-red-50 rounded-xl shrink-0">
                {item.emoji}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-stone-800 truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  {getCategoryLabel(item.category)}
                </div>
              </div>

              {/* Price */}
              <div className="text-sm font-bold tabular-nums text-stone-700 shrink-0">
                ¥{item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Divider with Saizeriya branding */}
        <div className="flex items-center gap-2 px-6">
          <div className="flex-1 border-t border-dashed border-red-100" />
          <span className="text-[10px] text-red-300 tracking-widest font-medium">SALERIYA</span>
          <div className="flex-1 border-t border-dashed border-red-100" />
        </div>

        {/* Summary */}
        <div className="px-6 py-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-stone-500">合计</span>
            <span className="text-xl font-black text-stone-800 tabular-nums">
              ¥{total}
            </span>
          </div>
          {budget > 0 && (
            <div className="flex justify-between items-center pt-1 border-t border-stone-100">
              <span className="text-sm text-stone-500">预算</span>
              <span className={`text-sm font-bold tabular-nums ${total <= budget ? 'text-green-600' : 'text-orange-600'}`}>
                ¥{budget}
                {total > budget && (
                  <span className="text-xs ml-1 text-orange-400">
                    (超¥{total - budget})
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Regenerate hint */}
      <div className="text-center mt-5">
        <p className="text-xs text-stone-400">
          不满意？再扭一次试试 🎰
        </p>
      </div>
    </div>
  );
}
