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

      const t1 = setTimeout(() => {
        setShowCapsules(true);
      }, 1200);

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
      const tDone = setTimeout(() => {
        onComplete();
      }, doneDelay);

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
          {/* Glass dome */}
          <div className="absolute inset-0 rounded-t-[40px] rounded-b-[120px] bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-2 border-zinc-600/50 overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/5" />

            {spinning && (
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-2 animate-gacha-spin">
                  {['🍕', '🍝', '🥩', '🍚', '🥗', '🍰', '🥤', '🐌'].map((e, i) => (
                    <span
                      key={i}
                      className="text-xl animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.5s' }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="absolute top-4 left-8 w-20 h-3 bg-white/5 rounded-full blur-sm" />
          </div>

          {/* Lever */}
          <div className="absolute -right-3 top-20">
            <div className="w-6 h-16 bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-full border border-zinc-500">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full border-2 border-red-300 shadow-lg shadow-red-500/30 animate-gacha-lever" />
            </div>
          </div>

          {/* Coin slot */}
          <div className="absolute right-4 top-10 w-10 h-6 bg-zinc-900 border-2 border-zinc-600 rounded-sm">
            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-700">◎</div>
          </div>

          {/* Brand text */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center">
            <div className="text-xs font-bold text-red-400 tracking-widest">SALERIYA</div>
            <div className="text-[10px] text-zinc-500 tracking-wider">广东限定</div>
          </div>

          {/* Exit slot */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-full border border-zinc-700" />

          {/* Base */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-80 h-8 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-full" />
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
                bg-gradient-to-br from-red-400 via-amber-300 to-red-500
                shadow-lg shadow-red-500/20
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
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-[10px] font-bold text-white text-center leading-tight px-1 line-clamp-2">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
