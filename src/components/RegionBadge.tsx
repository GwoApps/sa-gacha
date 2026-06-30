'use client';

export default function RegionBadge() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-zinc-400">地区</span>
      <div className="flex rounded-xl overflow-hidden border border-zinc-700/50 bg-white/10 px-4 py-2">
        <span className="text-sm font-medium text-white">
          广东 🇨🇳
        </span>
      </div>
    </div>
  );
}
