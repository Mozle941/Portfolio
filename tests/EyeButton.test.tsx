import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EyeButton from "@/components/EyeButton";

describe("EyeButton", () => {
  it("renders an accessible link", () => {
    render(<EyeButton href="#projects">View projects</EyeButton>);
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "#projects");
  });

  it("moves pupils toward the pointer", () => {
    render(<EyeButton href="#projects">View projects</EyeButton>);
    fireEvent.pointerMove(window, { clientX: 100, clientY: 0 });
    const pupils = screen.getAllByTestId("pupil");
    expect(pupils).toHaveLength(2);
    for (const p of pupils) expect(p.style.transform).toMatch(/^translate\(5px(, 0px)?\)$/);
  });
});
