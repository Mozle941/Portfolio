import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Testimonials from "@/components/Testimonials";
import { testimonials } from "@/data/testimonials";

describe("Testimonials", () => {
  it("renders all supplied reviews and ratings", () => {
    render(<Testimonials />);
    expect(screen.getByRole("heading", { level: 2, name: "Kind words" })).toBeInTheDocument();
    expect(screen.getByText(testimonials[0].quote)).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(5);
    expect(screen.getByRole("img", { name: "5 out of 5 stars" })).toBeInTheDocument();
  });

  it("changes the featured testimonial when a reviewer is selected", () => {
    render(<Testimonials />);
    const sarahTab = screen.getByRole("tab", { name: /Sarah Jenkins/ });
    fireEvent.click(sarahTab);
    expect(sarahTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(testimonials[3].quote)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "5 out of 5 stars" })).toBeInTheDocument();
  });

  it("supports arrow-key navigation between testimonials", () => {
    render(<Testimonials />);
    const firstTab = screen.getByRole("tab", { name: /David Chen/ });
    fireEvent.keyDown(firstTab, { key: "ArrowRight" });
    const secondTab = screen.getByRole("tab", { name: /Anonymous User/ });
    expect(secondTab).toHaveAttribute("aria-selected", "true");
    expect(secondTab).toHaveFocus();
    expect(screen.getByText(testimonials[1].quote)).toBeInTheDocument();
  });
});
