'use client';

import { useEffect, useState } from 'react';
import { GachaResult } from '@/utils/gacha';

interface GachaAnimationProps {
  spinning: boolean;
  result: GachaResult | null;
  onComplete: () => void;
}

export default function GachaAnimation({ spinning, result, onComplete }: GachaAnimationProps) {
  const [showCapsules, setShowCapsules] = useState(false);
  const [capsulesRevealed, setCapsulesRevealed] = useState<boolean[]>([]);

  useEffect(() => {
    if (spinning && result) {
      setShowCapsules(false);
      setCapsulesRevealed([]);

      const t1 = setTimeout(() => setShowCapsules(true), 1200);

      const totalItems = result.items.length;
      const revealDelays: NodeJS.Timeout[] = [];
      for (let i = 0; i < totalItems; i++) {
        const delay = 1200 + i * 400;
        const t = setTimeout(() => {
          setCapsulesRevealed((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, delay);
        revealDelays.push(t);
      }

      const doneDelay = 1200 + (totalItems || 1) * 400 + 600;
      const tDone = setTimeout(() => onComplete(), doneDelay);

      return () => {
        clearTimeout(t1);
        revealDelays.forEach(clearTimeout);
        clearTimeout(tDone);
      };
    }
  }, [spinning, result, onComplete]);

  if (!spinning || !result) return null;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Gacha Machine */}
      <div className={`relative mb-8 ${spinning ? 'animate-gacha-shake' : ''}`}>
        <div className="relative mx-auto w-72 h-80">
          {/* Machine body - Saizeriya red */}
          <div className="absolute inset-0 rounded-t-[40px] rounded-b-[120px] bg-gradient-to-b from-red-600 via-red-500 to-red-700 border-2 border-red-400 overflow-hidden shadow-xl">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)'
              }} />
            </div>

            {/* Glass dome */}
            <div className="absolute top-3 left-3 right-3 bottom-24 rounded-t-[32px] rounded-b-2xl bg-gradient-to-b from-white/95 via-white/90 to-white/85 border border-white/30 shadow-inner overflow-hidden">
              {/* Dome inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-red-50/30" />

              {/* Decorative rim around dome */}
              <div className="absolute -top-0.5 left-0 right-0 h-2 bg-gradient-to-r from-red-300 via-yellow-200 to-red-300 rounded-t-full" />

              {/* Spinning food icons */}
              {spinning && (
                <div className="absolute inset-2 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2 animate-gacha-spin">
                    {['🍕', '🍝', '🥩', '🍚', '🥗', '🍰', '🥤', '🐌'].map((e, i) => (
                      <span
                        key={i}
                        className="text-xl animate-bounce drop-shadow-sm"
                        style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.5s' }}
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dome reflection */}
              <div className="absolute top-2 left-6 w-16 h-2.5 bg-white/60 rounded-full blur-[2px]" />
              <div className="absolute top-6 left-8 w-8 h-1.5 bg-white/40 rounded-full blur-[1px]" />
            </div>

            {/* Brand stripe */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 bg-red-800/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-black text-white tracking-[0.3em] drop-shadow-md" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  SALERIYA
                </div>
                <div className="text-[10px] text-red-200 tracking-[0.2em] font-medium">
                  ★ 广东限定 ★
                </div>
              </div>
            </div>

            {/* Lever */}
            <div className="absolute -right-2 top-20 z-10">
              <div className="w-7 h-20 bg-gradient-to-b from-stone-300 to-stone-400 rounded-full border border-stone-400 shadow-md">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-9 bg-red-500 rounded-full border-2 border-red-300 shadow-lg shadow-red-500/40 animate-gacha-lever" />
              </div>
            </div>

            {/* Coin slot label */}
            <div className="absolute right-3 bottom-32">
              <div className="w-10 h-7 bg-stone-800/80 border border-stone-600 rounded-sm flex items-center justify-center">
                <span className="text-xs text-yellow-400 font-bold">¥</span>
              </div>
            </div>

            {/* Exit slot */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-36 h-6 bg-stone-800/90 rounded-full border border-stone-600 shadow-inner" />

            {/* Machine base */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-80 h-8 bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-full shadow-lg" />
          </div>
        </div>
      </div>

      {/* Falling Capsules */}
      {showCapsules && (
        <div className="relative min-h-[160px] flex flex-wrap justify-center gap-4 px-4">
          {result.items.map((item, i) => (
            <div
              key={item.id}
              className={`
                w-28 h-28 rounded-full
                bg-gradient-to-br from-amber-300 via-red-400 to-rose-500
                shadow-lg shadow-red-400/30 border-2 border-white/50
                flex flex-col items-center justify-center gap-1
                transition-all duration-500
                animate-gacha-drop
                ${capsulesRevealed[i] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '0.6s',
              }}
            >
              {/* Capsule highlight */}
              <div className="absolute top-2 left-3 w-6 h-2 bg-white/40 rounded-full blur-[1px]" />
              <span className="text-2xl drop-shadow-sm">{item.emoji}</span>
              <span className="text-[10px] font-bold text-white text-center leading-tight px-2 line-clamp-2 drop-shadow-sm">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
