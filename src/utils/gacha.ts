import { MenuItem, getAllItems, getAllCategories } from '@/data/menu';

export interface GachaFilters {
  excludeDrinks: boolean;
  excludeDesserts: boolean;
}

export interface GachaItem extends MenuItem {
  quantity: number;
}

export interface GachaResult {
  items: GachaItem[];
  total: number;
  budget: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 广东萨莉亚扭蛋机 — 预算填充算法
 *
 * 核心策略：运行 30 次随机贪心填充，选取总额最贴近预算的结果。
 *
 * 每轮尝试：
 *   1. 随机打乱菜品（自然随机 + 品种多样性）
 *   2. 贪心遍历：单品不超过剩余预算 × 1.15 就加入
 *   3. 预算填充：贪心结束后用最便宜的单品逐项填充剩余预算
 *   4. 评分：偏差率 + 过低惩罚 + 过高惩罚 + 品种奖励
 *
 * 目标窗口：总价落在预算的 [88%, 112%] 之间
 */
export function generateOrder(
  budget: number,
  filters: GachaFilters
): GachaResult {
  let items = getAllItems();

  // Apply filters
  if (filters.excludeDrinks) {
    items = items.filter((i) => i.category !== 'drink');
  }
  if (filters.excludeDesserts) {
    items = items.filter((i) => i.category !== 'dessert');
  }

  if (items.length === 0) {
    return { items: [], total: 0, budget };
  }

  // ── Unlimited budget: 2-5 random items ──
  if (budget <= 0) {
    const itemCount = Math.floor(Math.random() * 4) + 2;
    const picked = shuffleArray(items).slice(0, itemCount);
    return {
      items: picked.map((i) => ({ ...i, quantity: 1 })),
      total: picked.reduce((sum, i) => sum + i.price, 0),
      budget: 0,
    };
  }

  // ── Budget-constrained generation ──
  const MAX_ATTEMPTS = 30;
  const MIN_ITEMS = 2;
  const MAX_ITEMS = 7;
  const ITEM_OVERSHOOT_RATIO = 1.15;
  const TARGET_MIN_RATIO = 0.88;
  const TARGET_MAX_RATIO = 1.12;

  const itemsByPrice = [...items].sort((a, b) => a.price - b.price);
  const cheapestPrice = itemsByPrice[0]?.price ?? Infinity;

  let bestSelection: GachaItem[] = [];
  let bestScore = Infinity;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const shuffled = shuffleArray(items);
    const selected: MenuItem[] = [];
    let remaining = budget;

    // ── Phase 1: Greedy fill ──
    for (const item of shuffled) {
      if (selected.length >= MAX_ITEMS) break;
      if (item.price <= remaining * ITEM_OVERSHOOT_RATIO) {
        selected.push(item);
        remaining -= item.price;
      }
    }

    // ── Phase 2: Budget-fill with cheapest items ──
    const usedIds = new Set(selected.map((i) => i.id));

    while (remaining >= cheapestPrice && selected.length < MAX_ITEMS) {
      const filler = itemsByPrice.find(
        (i) => !usedIds.has(i.id) && i.price <= remaining * ITEM_OVERSHOOT_RATIO
      );
      if (!filler) break;
      selected.push(filler);
      usedIds.add(filler.id);
      remaining -= filler.price;
    }

    // ── Phase 3: Ensure minimum items ──
    if (selected.length < MIN_ITEMS) {
      for (const cheap of itemsByPrice) {
        if (selected.length >= MIN_ITEMS) break;
        if (usedIds.has(cheap.id)) continue;
        selected.push(cheap);
        usedIds.add(cheap.id);
        remaining -= cheap.price;
      }
    }

    // ── Scoring ──
    const total = selected.reduce((s, i) => s + i.price, 0);
    const deviationPct = (Math.abs(total - budget) / budget) * 100;

    const underPenalty =
      total < budget * TARGET_MIN_RATIO
        ? ((budget * TARGET_MIN_RATIO - total) / budget) * 50
        : 0;
    const overPenalty =
      total > budget * TARGET_MAX_RATIO
        ? ((total - budget * TARGET_MAX_RATIO) / budget) * 30
        : 0;

    const uniqueCats = new Set(selected.map((i) => i.category)).size;
    const varietyBonus = uniqueCats * 1.5;
    const countPenalty = selected.length < MIN_ITEMS ? 30 : 0;

    const score = deviationPct + underPenalty + overPenalty - varietyBonus + countPenalty;

    if (score < bestScore) {
      bestScore = score;
      bestSelection = selected.map((i) => ({ ...i, quantity: 1 }));
    }
  }

  if (bestSelection.length === 0) {
    const cheapest = itemsByPrice[0];
    bestSelection = [{ ...cheapest, quantity: 1 }];
  }

  const finalTotal = bestSelection.reduce((s, i) => s + i.price, 0);

  return {
    items: bestSelection,
    total: finalTotal,
    budget,
  };
}
