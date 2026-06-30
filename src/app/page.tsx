import GachaMachine from '@/components/GachaMachine';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-red-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
            广东萨莉亚扭蛋机
          </span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          基于广东萨莉亚真实菜单 · 随机生成你的点单方案
        </p>
      </div>

      {/* Gacha Machine */}
      <GachaMachine />

      {/* Footer */}
      <footer className="mt-auto pt-12 pb-4 text-center">
        <p className="text-xs text-zinc-700">
          菜品价格仅供参考 · 实际以门店为准 · 数据来源 广东萨莉亚菜单
        </p>
      </footer>
    </main>
  );
}
