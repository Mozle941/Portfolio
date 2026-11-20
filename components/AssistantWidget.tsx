"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowUp, X } from "lucide-react";
import BrandMark from "./BrandMark";
import EyeTracker from "./EyeTracker";

type Reply = { text: string; href?: string; link?: string };

const suggestions = [
  "Show me the projects",
  "What technologies does Moses use?",
  "How can I get in touch?",
];

function answerFor(question: string): Reply {
  const query = question.toLowerCase();
  if (/contact|email|reach|hire|message/.test(query)) {
    return {
      text: "You can contact Moses directly by email. The contact section also has a message form.",
      href: "mailto:mose_dev@proton.me",
      link: "Email Moses",
    };
  }
  if (/album|wallpaper/.test(query)) {
    return {
      text: "Album__Wall turns your images into wallpapers for iOS, Android, macOS, Windows, and Linux. It preserves the full image with padding instead of cropping.",
      href: "#projects",
      link: "Explore projects",
    };
  }
  if (/url|short|redis|postgres|cache/.test(query)) {
    return {
      text: "The URL shortener is built with Flask, PostgreSQL, and Redis, with Docker Compose to run its services together.",
      href: "#projects",
      link: "Explore projects",
    };
  }
  if (/distributed|replicat|partition|cp\/ap/.test(query)) {
    return {
      text: "The distributed-systems project explores a replicated key-value store, simulated network partitions, and CP/AP trade-offs.",
      href: "#projects",
      link: "Explore projects",
    };
  }
  if (/e.?commerce|shop|store/.test(query)) {
    return {
      text: "The e-commerce project is a responsive landing page deployed on Vercel, with deployment steps documented in its repository.",
      href: "#projects",
      link: "Explore projects",
    };
  }
  if (/skill|stack|technology|technolog|python|typescript|docker/.test(query)) {
    return {
      text: "The portfolio highlights Python, TypeScript, React, Next.js, Flask, Docker, PostgreSQL, Redis, and Vercel across its projects.",
      href: "#skills",
      link: "See the skills section",
    };
  }
  if (/project|work|portfolio|built|build/.test(query)) {
    return {
      text: "There are four featured projects: Album__Wall, a URL shortener, an e-commerce landing page, and a distributed key-value system.",
      href: "#projects",
      link: "Explore projects",
    };
  }
  return {
    text: "I can help you explore Moses’s projects, technologies, or contact details. Try asking about Album__Wall, the URL shortener, distributed systems, or how to get in touch.",
    href: "#projects",
    link: "Browse the portfolio",
  };
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [reply, setReply] = useState<Reply | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function ask(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setLastQuestion(clean);
    setReply(answerFor(clean));
    setQuestion("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <div className="portfolio-assistant" aria-label="Mos_dev portfolio assistant">
      {open && (
        <section id="assistant-panel" className="assistant-panel" aria-labelledby="assistant-title">
          <header className="assistant-panel-header">
            <span className="assistant-panel-avatar"><BrandMark className="assistant-panel-mascot" size={30} /></span>
            <span className="assistant-panel-heading">
              <strong id="assistant-title">Mos_dev assistant</strong>
              <span>Portfolio guide</span>
            </span>
            <button className="assistant-close" type="button" aria-label="Close assistant" onClick={() => setOpen(false)}>
              <X size={17} aria-hidden="true" />
            </button>
          </header>

          <div className="assistant-conversation" aria-live="polite" aria-atomic="false">
            <p className="assistant-greeting">Hi, I can help you explore the projects, skills, and ways to contact Moses.</p>
            {reply && lastQuestion && (
              <div className="assistant-exchange" key={lastQuestion}>
                <p className="assistant-question"><span>You</span>{lastQuestion}</p>
                <div className="assistant-answer">
                  <p>{reply.text}</p>
                  {reply.href && <a href={reply.href}>{reply.link}<ArrowUpRight size={14} aria-hidden="true" /></a>}
                </div>
              </div>
            )}
          </div>

          <div className="assistant-suggestions" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => ask(suggestion)}>{suggestion}</button>
            ))}
          </div>

          <form className="assistant-form" aria-label="Ask the portfolio assistant" onSubmit={submit}>
            <input
              ref={input}
              type="text"
              value={question}
              maxLength={160}
              placeholder="Ask about the portfolio…"
              aria-label="Ask a question about the portfolio"
              onChange={(event) => setQuestion(event.currentTarget.value)}
            />
            <button type="submit" aria-label="Send question" disabled={!question.trim()}>
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="assistant-note">Quick portfolio answers · nothing is sent or stored</p>
        </section>
      )}

      <button
        className="assistant-toggle"
        type="button"
        aria-label={open ? "Close Mos_dev assistant" : "Open Mos_dev assistant"}
        aria-expanded={open}
        aria-controls={open ? "assistant-panel" : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        <EyeTracker size={64} />
        <span className="assistant-presence" aria-hidden="true" />
        <span className="sr-only">{open ? "Close assistant" : "Ask the portfolio assistant"}</span>
      </button>
    </div>
  );
}
