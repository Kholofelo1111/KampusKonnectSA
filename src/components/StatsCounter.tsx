"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
  suffix?: string;
};

export function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-premium backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-kk-blue/5 to-kk-green/5" />
      <div className="relative grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Counter key={s.label} stat={s} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

function Counter({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const target = parseInt(stat.value.replace(/[^\d]/g, ""), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now() + delay;
            const duration = 1400;
            function tick(now: number) {
              const elapsed = now - start;
              if (elapsed < 0) {
                requestAnimationFrame(tick);
                return;
              }
              const p = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.floor(target * eased));
              if (p < 1) requestAnimationFrame(tick);
              else setValue(target);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-bold text-kk-navy sm:text-4xl lg:text-5xl">
        {value.toLocaleString()}
        <span className="text-kk-blue">{stat.suffix || ""}</span>
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-kk-navy/50 sm:text-sm">
        {stat.label}
      </div>
    </div>
  );
}
