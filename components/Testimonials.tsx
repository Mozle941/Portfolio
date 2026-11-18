"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { testimonials } from "@/data/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="testimonial-rating" role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="testimonial-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>{index < rating ? "★" : "☆"}</span>
        ))}
      </span>
      <span className="testimonial-score">{rating} / 5</span>
    </span>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = useId();
  const active = testimonials[activeIndex];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % testimonials.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + testimonials.length) % testimonials.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = testimonials.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="testimonials" className="section-shell content-section testimonials-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Testimonials <span className="eyebrow-divider">/</span> 0{testimonials.length}</p>
          <h2>Kind words<span className="hero-period" aria-hidden="true">.</span></h2>
        </div>
        <p className="section-aside">Thoughtful work,<br />remembered by people.</p>
      </div>

      <div className="testimonial-deck">
        <article
          id={panelId}
          className="testimonial-feature"
          role="tabpanel"
          aria-labelledby={`${panelId}-tab-${active.id}`}
        >
          <div className="testimonial-feature-content" key={active.id}>
            <span className="testimonial-quote-mark" aria-hidden="true">“</span>
            <blockquote className="testimonial-quote">{active.quote}</blockquote>
            <div className="testimonial-footer">
              <div className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">{active.initials}</span>
                <span className="testimonial-author-copy">
                  <span className="testimonial-author-name">{active.author}</span>
                  {active.role && <span className="testimonial-author-role">{active.role}</span>}
                </span>
              </div>
              <StarRating rating={active.rating} />
            </div>
          </div>
        </article>

        <div className="testimonial-selectors" role="tablist" aria-label="Client testimonials">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${panelId}-tab-${testimonial.id}`}
              type="button"
              role="tab"
              className="testimonial-selector"
              aria-selected={index === activeIndex}
              aria-controls={panelId}
              aria-label={`${testimonial.author}, rated ${testimonial.rating} out of 5 stars`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className="testimonial-selector-avatar" aria-hidden="true">{testimonial.initials}</span>
              <span className="testimonial-selector-copy">
                <span className="testimonial-selector-name">{testimonial.author}</span>
                {testimonial.role && <span className="testimonial-selector-role">{testimonial.role}</span>}
              </span>
              <span className="testimonial-selector-score" aria-hidden="true">{testimonial.rating}<span>★</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
