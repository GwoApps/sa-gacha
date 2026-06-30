import { MenuItem, Region, getItems, getAllCategories } from '@/data/menu';

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

  // If budget is 0 (unlimited), generate 2-5 random items
  if (budget <= 0) {
    const itemCount = Math.floor(Math.random() * 4) + 2; // 2-5 items
    const shuffled = shuffleArray(items).slice(0, itemCount);
    const total = shuffled.reduce((sum, i) => sum + i.price, 0);
    return {
      items: shuffled.map((i) => ({ ...i, quantity: 1 })),
      total,
      budget: 0,
    };
  }

  // Budget-constrained generation
  // Algorithm: randomly pick items, accept if total stays within budget
  // Allow slight overshoot (up to 20%) for a realistic feel
  const overshootBudget = Math.floor(budget * 1.2);
  let remainingBudget = budget;
  const selected: GachaItem[] = [];

  // Categorize items by price for smarter selection
  const affordableItems = items.filter((i) => i.price <= overshootBudget && i.price > 0);

  if (affordableItems.length === 0) {
    // Everything is over budget — pick the cheapest item
    const cheapest = items.reduce((a, b) => (a.price < b.price ? a : b));
    return {
      items: [{ ...cheapest, quantity: 1 }],
      total: cheapest.price,
      budget,
    };
  }

  // First pick: always from a random category for variety
  const categories = getAllCategories(region);
  const validCategories = categories.filter((cat) => {
    if (filters.excludeDrinks && cat === 'drink') return false;
    if (filters.excludeDesserts && cat === 'dessert') return false;
    return true;
  });

  // Pick a random category for the first item
  const randomCat = validCategories[Math.floor(Math.random() * validCategories.length)];
  const catItems = affordableItems.filter((i) => i.category === randomCat);
  const firstItem = catItems.length > 0
    ? catItems[Math.floor(Math.random() * catItems.length)]
    : affordableItems[Math.floor(Math.random() * affordableItems.length)];

  selected.push({ ...firstItem, quantity: 1 });
  remainingBudget -= firstItem.price;

  // Try to add more items greedily with some randomness
  // max iterations to avoid infinite loops
  let attempts = 0;
  const maxAttempts = 100;

  while (remainingBudget > 0 && attempts < maxAttempts) {
    attempts++;

    // Find items that can fit in remaining budget (with overshoot)
    const possibleItems = affordableItems.filter((i) => i.price <= remainingBudget + Math.floor(remainingBudget * 0.2));

    if (possibleItems.length === 0) break;

    // Randomly decide to stop (more items = higher chance of stopping)
    if (selected.length >= 2 && Math.random() < 0.15 + selected.length * 0.05) {
      break;
    }

    // Pick a random item, preferring different categories
    const pickedCategories = new Set(selected.map((i) => i.category));
    const differentCatItems = possibleItems.filter((i) => !pickedCategories.has(i.category));

    const pickPool = differentCatItems.length > 0 && Math.random() < 0.6
      ? differentCatItems
      : possibleItems;

    const chosen = pickPool[Math.floor(Math.random() * pickPool.length)];
    selected.push({ ...chosen, quantity: 1 });
    remainingBudget -= chosen.price;

    // Don't add more than 8 items
    if (selected.length >= 8) break;
  }

  const total = selected.reduce((sum, i) => sum + i.price, 0);

  return {
    items: selected,
    total,
    budget,
  };
}
