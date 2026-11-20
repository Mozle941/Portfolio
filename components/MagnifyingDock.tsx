"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent, RefObject } from "react";
import { BriefcaseBusiness, House, MessageCircle, Send, Wrench } from "lucide-react";
import BrandMark from "./BrandMark";

type DockLink = { key: string; label: string; href: string; Icon: typeof House };

/* The dock keeps the portfolio's existing destinations, rather than
   replacing them with generic app tabs. The mascot remains the home mark. */
const LINKS: DockLink[] = [
  { key: "projects", label: "Projects", href: "#projects", Icon: BriefcaseBusiness },
  { key: "reviews", label: "Reviews", href: "#testimonials", Icon: MessageCircle },
  { key: "skills", label: "Skills", href: "#skills", Icon: Wrench },
  { key: "contact", label: "Contact", href: "#contact", Icon: Send },
];

/* ══ dock, distance based magnification ═══════════════════
   Scale falls off with distance from the cursor rather than
   applying only to the hovered item, which is what stops it
   reading as a row of buttons that happen to grow. */
export default function MagnifyingDock({
  magnify = 1.32,
  spread = 2,
  lift = 8,
  labels = true,
}: {
  magnify?: number;
  spread?: number;
  lift?: number;
  labels?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [lastHover, setLastHover] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);
  const down = useRef(false);
  const touchGesture = useRef(false);
  const chose = useRef(false);

  const at = (clientX: number) => {
    const items = bar.current?.querySelectorAll<HTMLElement>(".gdock-item");
    if (!items?.length) return null;
    let best = 0;
    let gap = Infinity;
    items.forEach((el, i) => {
      const b = el.getBoundingClientRect();
      const d = Math.abs(clientX - (b.left + b.width / 2));
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  };

  const moveTo = (index: number | null) => {
    setHover(index);
    if (index !== null) setLastHover(index);
  };

  const track = (e: PointerEvent<HTMLDivElement>) => {
    /* A mouse magnifies on hover; a finger has to be down, or the
       bar would answer a scroll passing over it. */
    if (e.pointerType !== "mouse" && !down.current) return;
    moveTo(at(e.clientX));
  };

  return (
    <nav
      className="site-nav gdock"
      aria-label="Main"
      onPointerDownCapture={(e) => {
        down.current = true;
        touchGesture.current = e.pointerType !== "mouse";
        /* The click after a touch can still point to the item where
           the finger started; clear this at the next gesture instead. */
        chose.current = false;
        moveTo(at(e.clientX));
      }}
      onPointerMoveCapture={track}
      onPointerUpCapture={(e) => {
        if (down.current && e.pointerType !== "mouse") {
          const i = at(e.clientX);
          if (i !== null) {
            const link = LINKS[i];
            setActive(link.key);
            /* The finger chooses by where it lifts, not where it lands.
               Prevent the browser's stale start-target click on a sweep. */
            const started = (e.target as HTMLElement).closest<HTMLElement>(".gdock-item");
            if (started && started.dataset.key !== link.key) {
              chose.current = true;
              e.preventDefault();
              window.location.hash = link.href;
            }
          }
        }
        down.current = false;
        if (touchGesture.current) moveTo(null);
        touchGesture.current = false;
      }}
      onPointerCancelCapture={() => {
        down.current = false;
        touchGesture.current = false;
        moveTo(null);
      }}
      onPointerLeave={() => { if (!down.current) moveTo(null); }}
      onFocusCapture={(e) => {
        const item = (e.target as HTMLElement).closest<HTMLElement>(".gdock-item");
        const items = bar.current?.querySelectorAll(".gdock-item");
        const index = item && items ? Array.from(items).indexOf(item) : -1;
        if (index >= 0) moveTo(index);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) moveTo(null);
      }}
    >
      <a href="#top" className="wordmark" aria-label="Mos_dev, back to top">
        <BrandMark className="wordmark-mark" size={32} />
        <span>Mos_dev</span>
      </a>
      <div className="gdock-items" ref={bar}>
        {LINKS.map(({ key, label, href, Icon }, i) => {
          const d = hover === null ? 99 : Math.abs(i - hover);
          /* A raised cosine eases from the hovered icon to zero at the
             edge of the reach; beyond it, neighbours stay still. */
          const f = d > spread ? 0 : (1 + Math.cos((Math.PI * d) / (spread + 1))) / 2;
          const scale = 1 + (magnify - 1) * f;
          return (
            <a
              key={key}
              className="gdock-item"
              href={href}
              aria-label={label}
              aria-current={active === key ? "location" : undefined}
              data-key={key}
              data-near={d <= 1 ? d : undefined}
              data-active={active === key}
              onClick={(e) => {
                /* A lift across the bar already chose its destination. */
                if (chose.current) {
                  e.preventDefault();
                  chose.current = false;
                  return;
                }
                setActive(key);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {/* The glyph magnifies, not the button, so the dot and tip
                  keep their own size and their own distance from the bar. */}
              <span className="gdock-glyph" style={{ transform: `translateY(${-lift * f}px) scale(${scale})` }}>
                <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="gdock-dot" data-on={active === key} />
            </a>
          );
        })}
        {labels && <DockTip bar={bar} at={hover} last={lastHover} />}
      </div>
    </nav>
  );
}

/* ── ONE TIP THAT TRAVELS ─────────────────────────────────
   One pill slides to whichever icon is under the pointer and
   changes width to fit its word on the same short curve. It keeps
   the last word while fading, rather than emptying mid-transition. */
function DockTip({ bar, at, last }: { bar: RefObject<HTMLDivElement | null>; at: number | null; last: number }) {
  const [place, setPlace] = useState<{ x: number; w: number } | null>(null);
  const [ready, setReady] = useState(false);
  const word = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const nav = bar.current;
    const item = nav?.querySelectorAll<HTMLElement>(".gdock-item")[last];
    const text = word.current;
    if (!nav || !item || !text) return;
    /* offsetLeft is layout, so the glyph's own scale does not skew it. */
    const w = Math.ceil(text.scrollWidth) + 24;
    setPlace({ x: item.offsetLeft + item.offsetWidth / 2 - w / 2, w });
  }, [last, bar]);

  useLayoutEffect(() => {
    if (!place || ready) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [place, ready]);

  return (
    <span
      className="gdock-tip"
      aria-hidden="true"
      data-on={at !== null && !!place}
      data-ready={ready || undefined}
      style={place ? { width: place.w, transform: `translateX(${place.x}px)` } : undefined}
    >
      <span ref={word}>{LINKS[last].label}</span>
    </span>
  );
}
