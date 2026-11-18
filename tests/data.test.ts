import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

describe("projects data", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has non-empty titles, summaries, tags, and interactive details", () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe("");
      expect(project.summary.trim()).not.toBe("");
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.details.length).toBeGreaterThan(0);
    }
  });

  it("links every repo to the Mozle941 GitHub account", () => {
    for (const project of projects) {
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/Mozle941\//);
    }
  });

  it("contains exactly the four requested repositories in order", () => {
    expect(projects.map((project) => project.repoUrl)).toEqual([
      "https://github.com/Mozle941/Album__Wall",
      "https://github.com/Mozle941/url_shortener",
      "https://github.com/Mozle941/e-commerce-web-app-development",
      "https://github.com/Mozle941/distributed-system",
    ]);
  });
});

describe("skills data", () => {
  it("has labelled, non-empty groups", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const group of skillGroups) {
      expect(group.label.trim()).not.toBe("");
      expect(group.items.length).toBeGreaterThan(0);
    }
  });
});
