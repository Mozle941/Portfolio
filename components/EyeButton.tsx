"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function EyeButton({ href, children }: { href: string; children: ReactNode }) {
  const eyes = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      for (const eye of eyes.current) {
        const pupil = eye?.firstElementChild as HTMLElement | null;
        if (!eye || !pupil) continue;
        const r = eye.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const a = Math.atan2(dy, dx);
        const d = Math.min(5, Math.hypot(dx, dy));
        pupil.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <a
      href={href}
      className="inline-flex items-center gap-4 rounded-full bg-accent py-3 pl-4 pr-7 font-medium text-bg transition-transform hover:scale-[1.03]"
    >
      <span aria-hidden="true" className="flex gap-1.5">
        {[0, 1].map((i) => (
          <span
            key={i}
            ref={(el) => {
              eyes.current[i] = el;
            }}
            className="flex size-7 items-center justify-center rounded-full bg-bg"
          >
            <span data-testid="pupil" className="block size-3 rounded-full bg-accent" />
          </span>
        ))}
      </span>
      {children}
    </a>
  );
}
