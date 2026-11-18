import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

const base: Project = {
  slug: "demo",
  title: "Demo",
  summary: "A demo project",
  tags: ["Python", "Redis"],
  details: ["An example project detail", "A second detail"],
};

describe("ProjectCard", () => {
  it("renders article, h3 title, summary and tag list", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Demo" })).toBeInTheDocument();
    expect(screen.getByText("A demo project")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Python", "Redis"]);
  });

  it("reveals and hides project-specific details with an accessible disclosure", () => {
    const { container } = render(<ProjectCard project={base} />);
    const toggle = screen.getByRole("button", { name: "Show details for Demo" });
    const panel = container.querySelector(".project-details");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", panel?.id);
    expect(panel).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Hide details for Demo" })).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("An example project detail")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide details for Demo" }));
    expect(screen.getByRole("button", { name: "Show details for Demo" })).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the Repo link when repoUrl is present", () => {
    render(<ProjectCard project={{ ...base, repoUrl: "https://github.com/Mozle941/demo" }} />);
    const link = screen.getByRole("link", { name: /Repo/ });
    expect(link).toHaveAttribute("href", "https://github.com/Mozle941/demo");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides the Repo link when repoUrl is absent", () => {
    render(<ProjectCard project={base} />);
    expect(screen.queryByRole("link", { name: /Repo/ })).not.toBeInTheDocument();
  });

  it("shows the Live link only when liveUrl is present", () => {
    const { rerender } = render(<ProjectCard project={base} />);
    expect(screen.queryByRole("link", { name: /Live/ })).not.toBeInTheDocument();
    rerender(<ProjectCard project={{ ...base, liveUrl: "https://example.com" }} />);
    expect(screen.getByRole("link", { name: /Live/ })).toHaveAttribute("href", "https://example.com");
  });
});
