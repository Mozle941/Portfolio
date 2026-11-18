"use client";

import { useEffect, useRef, type ReactNode } from "react";

const MAX_PUPIL_TRAVEL = 7.5;
const POINTER_SENSITIVITY = 1.3;

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
        const d = Math.min(MAX_PUPIL_TRAVEL, Math.hypot(dx, dy) * POINTER_SENSITIVITY);
        pupil.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <a href={href} className="eye-button">
      <span aria-hidden="true" className="eye-pair">
        {[0, 1].map((i) => (
          <span
            key={i}
            ref={(el) => {
              eyes.current[i] = el;
            }}
            className="eye-shell"
          >
            <span data-testid="pupil" className="eye-pupil" />
          </span>
        ))}
      </span>
      {children}
    </a>
  );
}
