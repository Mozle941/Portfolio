import EyeButton from "./EyeButton";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[85svh] max-w-6xl flex-col justify-center gap-8 px-6 py-24">
      <p className="font-heading text-lg italic text-muted">Felix qui potuit rerum cognoscere causas</p>
      <h1 className="font-heading text-[clamp(4.5rem,20vw,13rem)] font-bold leading-[0.9] tracking-tight text-text">
        Moses
      </h1>
      <p className="max-w-xl text-xl text-muted">
        Student developer building toward DevOps and cloud engineering.
      </p>
      <div>
        <EyeButton href="#projects">View projects</EyeButton>
      </div>
    </section>
  );
}
