import type { Project } from "@/data/projects";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const linkClass = "rounded-full border border-line px-4 py-1.5 text-sm text-text hover:bg-bg";

export default function ProjectCard({ project }: { project: Project }) {
  const { title, summary, tags, repoUrl, liveUrl } = project;
  return (
    <article className="pill rounded-[2rem] border border-line bg-surface p-6 lg:relative lg:overflow-hidden lg:p-0">
      <span aria-hidden="true" className="pill-label hidden font-heading text-lg text-muted lg:block">
        {title}
      </span>
      <div className="pill-body flex flex-col gap-4 lg:w-[26rem] lg:p-8">
        <h3 className="font-heading text-2xl font-semibold text-text">{title}</h3>
        <p className="text-muted">{summary}</p>
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          {repoUrl && (
            <a href={repoUrl} className={linkClass} {...ext}>
              Repo
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className={linkClass} {...ext}>
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
