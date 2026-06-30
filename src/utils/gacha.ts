import { MenuItem, Region, getItems } from '@/data/menu';

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
 * Budget-filling gacha algorithm
 *
 * Core strategy: run many randomized greedy-fill attempts and pick the one
 * whose total lands closest to the target budget.
 *
 * Each attempt:
 *   1. Shuffle items (gives natural randomness & variety)
 *   2. Greedy walk: take each item if its price fits within remaining budget
 *   3. Budget-fill phase: after greedy walk, add cheap items one-by-one to
 *      soak up remaining budget and get as close to target as possible
 *   4. Score the combination by deviation from budget + variety bonus
 *
 * Target deviation range: total should land within [88%, 112%] of budget.
 * The algorithm naturally undershoots more often than overshoots (greedy fill
 * stops when no single item fits), so the budget-fill phase is critical.
 */
export function generateOrder(
  region: Region,
  budget: number,
  filters: GachaFilters
): GachaResult {
  let items = getItems(region);

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
  // Acceptable deviation window: [88%, 112%]
  // Items can individually overshoot remaining budget by at most 15%
  const ITEM_OVERSHOOT_RATIO = 1.15;
  const TARGET_MIN_RATIO = 0.88;
  const TARGET_MAX_RATIO = 1.12;

  // Sort items by price ascending once — used for the budget-fill phase
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

    // ── Phase 2: Budget-fill — soak up remaining budget with cheap items ──
    // After the greedy pass, there's typically some leftover budget too small
    // for any single remaining item. We try adding the cheapest available items
    // one-by-one to get as close to budget as possible.
    const usedIds = new Set(selected.map((i) => i.id));

    while (remaining >= cheapestPrice && selected.length < MAX_ITEMS) {
      // Find the cheapest item that fits within the overshoot allowance
      const filler = itemsByPrice.find(
        (i) => !usedIds.has(i.id) && i.price <= remaining * ITEM_OVERSHOOT_RATIO
      );
      if (!filler) break;
      selected.push(filler);
      usedIds.add(filler.id);
      remaining -= filler.price;
    }

    // ── Phase 3: Ensure minimum items ──
    // If we have fewer than MIN_ITEMS, fill with cheapest items regardless
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

    // Penalties for being outside the target window
    const underPenalty =
      total < budget * TARGET_MIN_RATIO
        ? ((budget * TARGET_MIN_RATIO - total) / budget) * 50
        : 0;
    const overPenalty =
      total > budget * TARGET_MAX_RATIO
        ? ((total - budget * TARGET_MAX_RATIO) / budget) * 30
        : 0;

    // Bonus for category variety (encourages well-rounded meals)
    const uniqueCats = new Set(selected.map((i) => i.category)).size;
    const varietyBonus = uniqueCats * 1.5;

    // Soft penalty for too few items
    const countPenalty = selected.length < MIN_ITEMS ? 30 : 0;

    const score = deviationPct + underPenalty + overPenalty - varietyBonus + countPenalty;

    if (score < bestScore) {
      bestScore = score;
      bestSelection = selected.map((i) => ({ ...i, quantity: 1 }));
    }
  }

  // Fallback: if somehow nothing was selected (shouldn't happen)
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
