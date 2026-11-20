import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MagnifyingDock from "@/components/MagnifyingDock";

describe("MagnifyingDock", () => {
  it("keeps the portfolio's labeled section navigation accessible", () => {
    render(<MagnifyingDock />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mos_dev, back to top" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Reviews" })).toHaveAttribute("href", "#testimonials");
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("href", "#skills");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
  });

  it("responds to pointer movement with a distance-based magnification state", () => {
    render(<MagnifyingDock />);
    const bar = screen.getByRole("navigation", { name: "Main" }).querySelector(".gdock-items");
    const projects = screen.getByRole("link", { name: "Projects" });
    fireEvent.pointerMove(bar!, { clientX: 1, pointerType: "mouse" });
    expect(projects).toHaveAttribute("data-near", "0");
    expect(projects.querySelector(".gdock-glyph")).toHaveStyle({ transform: "translateY(-8px) scale(1.32)" });
  });

  it("marks the chosen section as active", () => {
    render(<MagnifyingDock />);
    const contact = screen.getByRole("link", { name: "Contact" });
    fireEvent.click(contact);
    expect(contact).toHaveAttribute("aria-current", "location");
    expect(contact).toHaveAttribute("data-active", "true");
  });
});
