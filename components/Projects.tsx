import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-10 font-heading text-4xl font-bold text-text">Projects</h2>
      <div className="pills flex flex-col gap-4 lg:h-[30rem] lg:flex-row">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
