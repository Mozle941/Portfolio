"use client";

import { useId, useState } from "react";
import type { Project } from "@/data/projects";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { title, summary, tags, details, repoUrl, liveUrl } = project;
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="pill project-card">
      <div className="project-card-topline">
        <span className="project-number">{String(index).padStart(2, "0")}</span>
        <span className="project-mark" aria-hidden="true">↗</span>
      </div>
      <div className="pill-body project-card-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-summary">{summary}</p>
        <button
          type="button"
          className="project-details-toggle"
          aria-label={`${isExpanded ? "Hide" : "Show"} details for ${title}`}
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span>{isExpanded ? "Hide details" : "More details"}</span>
          <span className="project-details-mark" aria-hidden="true">+</span>
        </button>
        <div
          id={detailsId}
          className={`project-details${isExpanded ? " is-open" : ""}`}
          aria-hidden={!isExpanded}
          inert={!isExpanded}
        >
          <div className="project-details-inner">
            <ul className="project-detail-list">
              {details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>
        </div>
        <ul className="project-tags">
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project-links">
          {repoUrl && (
            <a href={repoUrl} {...ext}>
              Repo <span aria-hidden="true">↗</span>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} {...ext}>
              Live <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
