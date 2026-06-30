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
      {/* Receipt header */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900/40 to-amber-900/30 px-6 py-4 border-b border-zinc-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-red-300 tracking-widest">
              🎉 扭蛋结果
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              广东萨莉亚 · 共 {items.length} 品
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="px-4 py-3 space-y-1">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <span className="text-2xl w-10 h-10 flex items-center justify-center bg-zinc-800/80 rounded-xl shrink-0">
                {item.emoji}
              </span>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-200 truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  {getCategoryLabel(item.category)}
                </div>
              </div>

              <div className="text-sm font-bold tabular-nums text-zinc-300 shrink-0">
                ¥{item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-zinc-700/50 mx-4" />

        {/* Summary */}
        <div className="px-6 py-4 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">合计</span>
            <span className="font-bold text-white tabular-nums">
              ¥{total}
            </span>
          </div>
          {budget > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">预算</span>
              <span className={`font-bold tabular-nums ${total <= budget ? 'text-green-400' : 'text-orange-400'}`}>
                ¥{budget}
                {total > budget && <span className="text-xs ml-1">(超¥{total - budget})</span>}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Regenerate hint */}
      <div className="text-center mt-6">
        <p className="text-xs text-zinc-600">
          不满意？再扭一次试试 🎰
        </p>
      </div>
    </div>
  );
}
