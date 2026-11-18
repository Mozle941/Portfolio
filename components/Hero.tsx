import BrandMark from "./BrandMark";
import EyeButton from "./EyeButton";
import FluidRibbon from "./FluidRibbon";

export default function Hero() {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-motto">Felix qui potuit rerum cognoscere causas</p>
        <p className="eyebrow hero-kicker"><span className="status-dot" aria-hidden="true" /> Independent portfolio <span className="eyebrow-divider">/</span> 01</p>
        <h1 id="hero-title">Moses<span className="hero-period">.</span></h1>
        <p className="hero-description">
          Student developer building toward DevOps and cloud engineering.
        </p>
        <EyeButton href="#projects">View projects</EyeButton>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="hero-orbit hero-orbit-outer" />
        <div className="hero-orbit hero-orbit-inner" />
        <FluidRibbon />
        <div className="hero-sun"><BrandMark className="hero-mascot" size={320} /></div>
        <span className="hero-coordinate hero-coordinate-top">
          <BrandMark className="coordinate-mascot" size={24} />
          <span>/ 01</span>
        </span>
        <span className="hero-coordinate hero-coordinate-bottom">DEV / CLOUD</span>
      </div>
      <a className="scroll-cue" href="#projects"><span className="scroll-cue-line" aria-hidden="true" /> Scroll to explore</a>
    </section>
  );
}
