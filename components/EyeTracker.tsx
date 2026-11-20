"use client";

import { useEffect, useRef } from "react";
import BrandMark from "./BrandMark";

type EyeTrackerProps = { size?: number };
type Turn = { x: number; y: number; vx: number; vy: number; tx: number; ty: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/* ══ Eye tracker ═══════════════════════════════════════════
   The portfolio mascot watches the cursor wherever it is on the page.
   The eyes live on the mascot's dark face, not on a second sticker:
   one shared turn moves both pupils, so they always agree about
   where they are looking.

   Written straight to the DOM each frame, never through state:
   a pointer move is not a render. The loop parks itself when its
   spring settles, and starts again on the next pointer movement. */
export default function EyeTracker({ size = 64 }: EyeTrackerProps) {
  const box = useRef<HTMLSpanElement>(null);
  const pupils = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    /* Read once, the way the reference component does: a preference,
       not a live input. Reduced motion leaves the eyes facing forward. */
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (still) return;

    const turn: Turn = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    let raf = 0;
    let previous = 0;
    let blinkTimer = 0;
    let blinkEndTimer = 0;

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = (now: number) => {
      raf = 0;
      const dt = previous ? Math.min(2.5, (now - previous) / 16.67) : 1;
      previous = now;
      /* One spring settles both axes; a dropped frame decays by the
         same number of frame-steps instead of changing the spring feel. */
      const stiffness = 0.06;
      const damping = 0.34;
      turn.vx += ((turn.tx - turn.x) * stiffness - turn.vx * damping) * dt;
      turn.vy += ((turn.ty - turn.y) * stiffness - turn.vy * damping) * dt;
      turn.x += turn.vx * dt;
      turn.y += turn.vy * dt;

      /* Treat each pupil as a point on the face's curved surface.
         Foreshortening toward the rim is what makes the logo feel round. */
      const yaw = Math.asin(clamp(turn.x, -0.8, 0.8));
      const pitch = -Math.asin(clamp(turn.y, -0.8, 0.8));
      const movement = size * 0.16;
      [-0.085, 0.085].forEach((side, index) => {
        const pupil = pupils.current[index];
        if (!pupil) return;
        const depth = Math.sqrt(1 - side * side);
        const x = side * Math.cos(yaw) + depth * Math.sin(yaw);
        const z = -side * Math.sin(yaw) + depth * Math.cos(yaw);
        const y = -z * Math.sin(pitch);
        const faceDepth = z * Math.cos(pitch);
        const px = (x - side) * movement;
        const py = y * movement;
        const narrow = 0.7 + 0.3 * clamp(faceDepth, 0, 1);
        pupil.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) scaleX(${narrow.toFixed(2)})`;
        pupil.style.opacity = faceDepth < 0.05 ? "0" : "1";
      });

      const settled = Math.abs(turn.tx - turn.x) < 0.002 && Math.abs(turn.ty - turn.y) < 0.002 && Math.abs(turn.vx) < 0.002 && Math.abs(turn.vy) < 0.002;
      if (settled) {
        turn.x = turn.tx;
        turn.y = turn.ty;
        previous = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const aim = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const reach = Math.max(80, Math.min(window.innerWidth, window.innerHeight) * 0.24);
      turn.tx = Math.tanh(dx / reach) * 0.72;
      turn.ty = Math.tanh(dy / reach) * 0.72;
      schedule();
    };
    const rest = () => {
      turn.tx = 0;
      turn.ty = 0;
      schedule();
    };

    /* Blinks are occasional and short, rather than a constant loop. */
    const blink = () => {
      el.dataset.blink = "true";
      blinkEndTimer = window.setTimeout(() => { delete el.dataset.blink; }, 130);
      blinkTimer = window.setTimeout(blink, 2600 + Math.random() * 3200);
    };
    blinkTimer = window.setTimeout(blink, 2200);
    window.addEventListener("pointermove", aim, { passive: true });
    document.documentElement.addEventListener("pointerleave", rest);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(blinkEndTimer);
      window.removeEventListener("pointermove", aim);
      document.documentElement.removeEventListener("pointerleave", rest);
    };
  }, [size]);

  return (
    <span
      className="eye-tracker"
      ref={box}
      style={{ "--eye-size": `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <BrandMark className="eye-tracker-mascot" size={size} />
      <span className="eye-tracker-pupil" data-eye="left" ref={(node) => { pupils.current[0] = node; }} />
      <span className="eye-tracker-pupil" data-eye="right" ref={(node) => { pupils.current[1] = node; }} />
    </span>
  );
}
