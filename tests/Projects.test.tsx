import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Projects from "@/components/Projects";
import { projects } from "@/data/projects";

describe("Projects", () => {
  it("is the #projects section with an h2", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("section#projects")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Projects" })).toBeInTheDocument();
  });

  it("renders one card per project", () => {
    render(<Projects />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });

  it("stacks on small screens and expands as pills on lg", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector(".pills")).toHaveClass("flex-col", "lg:flex-row");
  });
});
