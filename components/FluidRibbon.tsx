"use client";

import { useRef, type PointerEvent } from "react";

const contours = [
  "M 209 39 C 272 50 332 76 345 135 C 358 194 292 189 322 241 C 356 302 315 356 256 332 C 204 311 191 382 128 350 C 68 319 94 274 56 232 C 18 190 58 144 119 151 C 175 157 148 84 209 39 Z",
  "M 177 42 C 245 64 280 42 317 102 C 353 161 297 182 348 218 C 399 254 346 319 278 290 C 217 264 190 365 125 331 C 61 298 112 256 68 202 C 24 148 93 120 78 86 C 67 59 132 28 177 42 Z",
  "M 245 55 C 307 78 346 111 327 157 C 305 208 262 201 291 250 C 324 305 281 347 222 322 C 165 298 135 355 95 306 C 54 256 130 222 93 177 C 55 131 109 100 144 111 C 181 122 189 41 245 55 Z",
];

const POINTER_SENSITIVITY = 12;

export default function FluidRibbon() {
  const ref = useRef<SVGSVGElement>(null);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * POINTER_SENSITIVITY;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * POINTER_SENSITIVITY;
    node.classList.remove("is-returning");
    node.style.setProperty("--fluid-x", `${x.toFixed(1)}px`);
    node.style.setProperty("--fluid-y", `${y.toFixed(1)}px`);
  }

  function handlePointerLeave() {
    const node = ref.current;
    if (!node) return;
    node.classList.add("is-returning");
    node.style.setProperty("--fluid-x", "0px");
    node.style.setProperty("--fluid-y", "0px");
  }

  return (
    <svg
      ref={ref}
      className="fluid-ribbon"
      viewBox="0 0 420 420"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "auto", zIndex: 0, transform: "translate3d(var(--fluid-x, 0px), var(--fluid-y, 0px), 0)" }}
      aria-hidden="true"
      focusable="false"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {contours.map((path, index) => (
        <g className={`fluid-ribbon__loop fluid-ribbon__loop--${index + 1}`} key={path} fill="none">
          <path className="fluid-ribbon__halo" d={path} fill="none" style={{ stroke: "var(--accent-dot)", strokeWidth: 4, strokeOpacity: 0.1, filter: "drop-shadow(0 0 7px var(--accent-dot))" }} />
          <path className="fluid-ribbon__line" d={path} fill="none" style={{ stroke: "var(--ink)", strokeWidth: 1.2, strokeOpacity: 0.31, strokeLinecap: "round", strokeLinejoin: "round" }} />
        </g>
      ))}
    </svg>
  );
}
