import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it("includes a decorative fluid contour in the hero artwork", () => {
    const { container } = render(<Hero />);
    const ribbon = container.querySelector("svg.fluid-ribbon");
    expect(ribbon).toHaveAttribute("aria-hidden", "true");
    expect(ribbon?.querySelectorAll("path[fill=none]")).toHaveLength(6);
  });

  it("has exactly one h1 with the name", () => {
    render(<Hero />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent("Moses");
  });

  it("shows the subline", () => {
    render(<Hero />);
    expect(
      screen.getByText("Student developer building toward DevOps and cloud engineering."),
    ).toBeInTheDocument();
  });

  it("shows the tagline verbatim", () => {
    render(<Hero />);
    expect(screen.getByText("Felix qui potuit rerum cognoscere causas")).toBeInTheDocument();
  });

  it("links the CTA to #projects", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "#projects");
  });
});
