import GachaMachine from '@/components/GachaMachine';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-medium mb-4">
          🍝 广东萨莉亚限定
        </div>
        <h1 className="text-4xl font-black tracking-tight text-stone-800">
          扭蛋机
        </h1>
        <p className="text-stone-500 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
          基于广东萨莉亚真实菜单<br />
          扭出你的今日点单方案
        </p>
      </div>

      {/* Gacha Machine */}
      <GachaMachine />

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-6 text-center">
        <p className="text-xs text-stone-400">
          菜品价格仅供参考 · 实际以门店为准
        </p>
        <p className="text-[10px] text-stone-300 mt-1">
          数据来源 广东萨莉亚菜单
        </p>
      </footer>
    </main>
  );
}
