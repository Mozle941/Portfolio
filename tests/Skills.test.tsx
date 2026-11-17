import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skills from "@/components/Skills";
import { skillGroups } from "@/data/skills";

describe("Skills", () => {
  it("is the #skills section", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("section#skills")).not.toBeNull();
  });

  it("renders one h3 and one ul per group", () => {
    render(<Skills />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(skillGroups.length);
    expect(screen.getAllByRole("list")).toHaveLength(skillGroups.length);
  });

  it("lists every item under its group", () => {
    render(<Skills />);
    for (const g of skillGroups) {
      const h3 = screen.getByRole("heading", { level: 3, name: g.label });
      const list = within(h3.parentElement as HTMLElement).getByRole("list");
      expect(within(list).getAllByRole("listitem").map((li) => li.textContent)).toEqual(g.items);
    }
  });
});
