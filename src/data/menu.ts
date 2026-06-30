export type Region = 'japan' | 'china';

export interface MenuItem {
  id: string;
  name: string;
  price: number; // JPY for japan, CNY for china
  category: string;
  emoji: string;
}

export interface MenuCategory {
  name: string;
  key: string;
  items: MenuItem[];
}

const japanMenu: MenuCategory[] = [
  {
    name: '前菜・サラダ',
    key: 'appetizer',
    items: [
      { id: 'jp-app-1', name: 'エスカルゴのガーリックバター焼き', price: 400, category: 'appetizer', emoji: '🐌' },
      { id: 'jp-app-2', name: '辛味チキン', price: 300, category: 'appetizer', emoji: '🍗' },
      { id: 'jp-app-3', name: '海老のチリソース', price: 400, category: 'appetizer', emoji: '🦐' },
      { id: 'jp-app-4', name: 'ほうれん草のソテー', price: 150, category: 'appetizer', emoji: '🥬' },
      { id: 'jp-app-5', name: 'グリーンサラダ', price: 250, category: 'appetizer', emoji: '🥗' },
      { id: 'jp-app-6', name: 'ミラノ風サラダ', price: 300, category: 'appetizer', emoji: '🥗' },
      { id: 'jp-app-7', name: 'ポテトフライ', price: 200, category: 'appetizer', emoji: '🍟' },
    ],
  },
  {
    name: 'スープ',
    key: 'soup',
    items: [
      { id: 'jp-soup-1', name: 'コーンスープ', price: 150, category: 'soup', emoji: '🥣' },
      { id: 'jp-soup-2', name: 'ミネストローネ', price: 200, category: 'soup', emoji: '🥣' },
      { id: 'jp-soup-3', name: 'セロリのスープ', price: 150, category: 'soup', emoji: '🥣' },
    ],
  },
  {
    name: 'ピザ',
    key: 'pizza',
    items: [
      { id: 'jp-piz-1', name: 'マルゲリータピザ', price: 400, category: 'pizza', emoji: '🍕' },
      { id: 'jp-piz-2', name: 'ミラノ風ピザ', price: 400, category: 'pizza', emoji: '🍕' },
      { id: 'jp-piz-3', name: 'ベーコンとほうれん草のピザ', price: 500, category: 'pizza', emoji: '🍕' },
      { id: 'jp-piz-4', name: 'ハーフ&ハーフピザ', price: 500, category: 'pizza', emoji: '🍕' },
    ],
  },
  {
    name: 'パスタ',
    key: 'pasta',
    items: [
      { id: 'jp-pas-1', name: 'ペペロンチーノ', price: 300, category: 'pasta', emoji: '🍝' },
      { id: 'jp-pas-2', name: 'ミラノ風スパゲッティ', price: 300, category: 'pasta', emoji: '🍝' },
      { id: 'jp-pas-3', name: 'タラコソースのパスタ', price: 400, category: 'pasta', emoji: '🍝' },
      { id: 'jp-pas-4', name: 'イカ墨入りスパゲッティ', price: 400, category: 'pasta', emoji: '🦑' },
      { id: 'jp-pas-5', name: 'バジルソースのパスタ', price: 350, category: 'pasta', emoji: '🌿' },
      { id: 'jp-pas-6', name: 'カルボナーラ', price: 400, category: 'pasta', emoji: '🍝' },
    ],
  },
  {
    name: 'ドリア・リゾット',
    key: 'doria',
    items: [
      { id: 'jp-dor-1', name: 'ミラノ風ドリア', price: 300, category: 'doria', emoji: '🍚' },
      { id: 'jp-dor-2', name: 'ほうれん草とコーンのドリア', price: 350, category: 'doria', emoji: '🍚' },
      { id: 'jp-dor-3', name: 'シーフードドリア', price: 400, category: 'doria', emoji: '🦐' },
      { id: 'jp-dor-4', name: 'ライス（小）', price: 150, category: 'doria', emoji: '🍚' },
    ],
  },
  {
    name: 'グリル',
    key: 'grill',
    items: [
      { id: 'jp-gri-1', name: 'ハンバーグステーキ', price: 400, category: 'grill', emoji: '🥩' },
      { id: 'jp-gri-2', name: 'チキングリル', price: 400, category: 'grill', emoji: '🍗' },
      { id: 'jp-gri-3', name: 'サーモングリル', price: 500, category: 'grill', emoji: '🐟' },
      { id: 'jp-gri-4', name: 'リブアイステーキ', price: 600, category: 'grill', emoji: '🥩' },
      { id: 'jp-gri-5', name: 'フォッカチオ', price: 200, category: 'grill', emoji: '🥖' },
    ],
  },
  {
    name: 'デザート',
    key: 'dessert',
    items: [
      { id: 'jp-des-1', name: 'ガトーショコラ', price: 300, category: 'dessert', emoji: '🍰' },
      { id: 'jp-des-2', name: 'プリン', price: 200, category: 'dessert', emoji: '🍮' },
      { id: 'jp-des-3', name: 'ジェラート（ミルク）', price: 200, category: 'dessert', emoji: '🍦' },
      { id: 'jp-des-4', name: 'アフォガード', price: 300, category: 'dessert', emoji: '☕' },
      { id: 'jp-des-5', name: 'イタリアンジェラート', price: 200, category: 'dessert', emoji: '🍨' },
    ],
  },
  {
    name: 'ドリンク',
    key: 'drink',
    items: [
      { id: 'jp-drk-1', name: 'ドリンクバー', price: 200, category: 'drink', emoji: '🥤' },
      { id: 'jp-drk-2', name: 'コーラ', price: 200, category: 'drink', emoji: '🥤' },
      { id: 'jp-drk-3', name: 'ワイン（グラス）', price: 200, category: 'drink', emoji: '🍷' },
      { id: 'jp-drk-4', name: 'ビール', price: 300, category: 'drink', emoji: '🍺' },
      { id: 'jp-drk-5', name: 'ウーロン茶', price: 200, category: 'drink', emoji: '🍵' },
      { id: 'jp-drk-6', name: 'オレンジジュース', price: 200, category: 'drink', emoji: '🧃' },
    ],
  },
];

const chinaMenu: MenuCategory[] = [
  {
    name: '前菜・沙拉',
    key: 'appetizer',
    items: [
      { id: 'cn-app-1', name: '蒜香蜗牛', price: 18, category: 'appetizer', emoji: '🐌' },
      { id: 'cn-app-2', name: '烤鸡翅（5只）', price: 18, category: 'appetizer', emoji: '🍗' },
      { id: 'cn-app-3', name: '蒜香烤面包', price: 8, category: 'appetizer', emoji: '🥖' },
      { id: 'cn-app-4', name: '蔬菜沙拉', price: 11, category: 'appetizer', emoji: '🥗' },
      { id: 'cn-app-5', name: '金枪鱼沙拉', price: 14, category: 'appetizer', emoji: '🥗' },
      { id: 'cn-app-6', name: '麻辣烤肠', price: 12, category: 'appetizer', emoji: '🌭' },
      { id: 'cn-app-7', name: '炸薯条', price: 10, category: 'appetizer', emoji: '🍟' },
    ],
  },
  {
    name: '汤品',
    key: 'soup',
    items: [
      { id: 'cn-soup-1', name: '玉米浓汤', price: 9, category: 'soup', emoji: '🥣' },
      { id: 'cn-soup-2', name: '罗宋汤', price: 10, category: 'soup', emoji: '🥣' },
      { id: 'cn-soup-3', name: '奶油蘑菇汤', price: 10, category: 'soup', emoji: '🥣' },
    ],
  },
  {
    name: '披萨',
    key: 'pizza',
    items: [
      { id: 'cn-piz-1', name: '玛格丽特披萨', price: 22, category: 'pizza', emoji: '🍕' },
      { id: 'cn-piz-2', name: '培根披萨', price: 24, category: 'pizza', emoji: '🍕' },
      { id: 'cn-piz-3', name: '榴莲披萨', price: 28, category: 'pizza', emoji: '🍕' },
      { id: 'cn-piz-4', name: '海鲜披萨', price: 26, category: 'pizza', emoji: '🍕' },
    ],
  },
  {
    name: '意面',
    key: 'pasta',
    items: [
      { id: 'cn-pas-1', name: '番茄海鲜意面', price: 18, category: 'pasta', emoji: '🍝' },
      { id: 'cn-pas-2', name: '蒜香辣意面', price: 14, category: 'pasta', emoji: '🍝' },
      { id: 'cn-pas-3', name: '培根奶油意面', price: 16, category: 'pasta', emoji: '🍝' },
      { id: 'cn-pas-4', name: '墨鱼汁意面', price: 18, category: 'pasta', emoji: '🦑' },
      { id: 'cn-pas-5', name: '罗勒青酱意面', price: 16, category: 'pasta', emoji: '🌿' },
    ],
  },
  {
    name: '焗饭・烩饭',
    key: 'doria',
    items: [
      { id: 'cn-dor-1', name: '米兰风味肉酱焗饭', price: 18, category: 'doria', emoji: '🍚' },
      { id: 'cn-dor-2', name: '鸡排焗饭', price: 22, category: 'doria', emoji: '🍚' },
      { id: 'cn-dor-3', name: '海鲜焗饭', price: 24, category: 'doria', emoji: '🦐' },
      { id: 'cn-dor-4', name: '白米饭', price: 5, category: 'doria', emoji: '🍚' },
    ],
  },
  {
    name: '扒类',
    key: 'grill',
    items: [
      { id: 'cn-gri-1', name: '黑椒牛排（150g）', price: 46, category: 'grill', emoji: '🥩' },
      { id: 'cn-gri-2', name: '烤牛肉汉堡', price: 26, category: 'grill', emoji: '🥩' },
      { id: 'cn-gri-3', name: '烤鸡排', price: 22, category: 'grill', emoji: '🍗' },
      { id: 'cn-gri-4', name: '烤三文鱼', price: 32, category: 'grill', emoji: '🐟' },
    ],
  },
  {
    name: '甜品',
    key: 'dessert',
    items: [
      { id: 'cn-des-1', name: '提拉米苏', price: 16, category: 'dessert', emoji: '🍰' },
      { id: 'cn-des-2', name: '焦糖布丁', price: 12, category: 'dessert', emoji: '🍮' },
      { id: 'cn-des-3', name: '抹茶冰淇淋', price: 10, category: 'dessert', emoji: '🍦' },
      { id: 'cn-des-4', name: '巧克力蛋糕', price: 14, category: 'dessert', emoji: '🍰' },
    ],
  },
  {
    name: '饮品',
    key: 'drink',
    items: [
      { id: 'cn-drk-1', name: '畅饮吧', price: 9, category: 'drink', emoji: '🥤' },
      { id: 'cn-drk-2', name: '可乐', price: 8, category: 'drink', emoji: '🥤' },
      { id: 'cn-drk-3', name: '柠檬茶', price: 9, category: 'drink', emoji: '🍋' },
      { id: 'cn-drk-4', name: '热咖啡', price: 10, category: 'drink', emoji: '☕' },
      { id: 'cn-drk-5', name: '雪顶咖啡', price: 12, category: 'drink', emoji: '☕' },
      { id: 'cn-drk-6', name: '葡萄汁', price: 9, category: 'drink', emoji: '🧃' },
      { id: 'cn-drk-7', name: '啤酒', price: 12, category: 'drink', emoji: '🍺' },
    ],
  },
];

export const regions: Record<Region, { name: string; currency: string; currencySymbol: string; categories: MenuCategory[] }> = {
  japan: {
    name: '日本 🇯🇵',
    currency: 'JPY',
    currencySymbol: '¥',
    categories: japanMenu,
  },
  china: {
    name: '中国 🇨🇳',
    currency: 'CNY',
    currencySymbol: '¥',
    categories: chinaMenu,
  },
};

export function getItems(region: Region): MenuItem[] {
  return regions[region].categories.flatMap((c) => c.items);
}

export function getAllCategories(region: Region): string[] {
  return regions[region].categories.map((c) => c.key);
}
