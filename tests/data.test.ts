import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

describe("projects data", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a non-empty title, summary and at least one tag per project", () => {
    for (const p of projects) {
      expect(p.title.trim()).not.toBe("");
      expect(p.summary.trim()).not.toBe("");
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it("links every repo to the Mozle941 GitHub account", () => {
    for (const p of projects) {
      expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/Mozle941\//);
    }
  });
});

describe("skills data", () => {
  it("has labelled, non-empty groups", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) {
      expect(g.label.trim()).not.toBe("");
      expect(g.items.length).toBeGreaterThan(0);
    }
  });
});
