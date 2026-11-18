import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section-shell content-section projects-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work <span className="eyebrow-divider">/</span> 0{projects.length}</p>
          <h2>Projects<span className="hero-period" aria-hidden="true">.</span></h2>
        </div>
        <p className="section-aside">A growing collection<br />of things I’ve built.</p>
      </div>
      <div className="pills projects-grid flex flex-col gap-4 lg:flex-row">
        {projects.map((p, index) => (
          <ProjectCard key={p.slug} project={p} index={index + 1} />
        ))}
      </div>
    </section>
  );
}
