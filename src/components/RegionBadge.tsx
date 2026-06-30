'use client';

export default function RegionBadge() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-stone-400 tracking-wider">地区</span>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200">
        <span className="text-sm">🇨🇳</span>
        <span className="text-sm font-semibold text-red-700">广东</span>
      </div>
      <div className="h-4 w-px bg-red-100 mx-0.5" />
      <div className="flex items-center gap-1 text-xs text-stone-400">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
        已载入 {179} 道菜品
      </div>
    </div>
  );
}
