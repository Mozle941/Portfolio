import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "@/app/page";
import sitemap from "@/app/sitemap";
import { metadata } from "@/app/layout";

describe("page", () => {
  it("renders all sections inside main#top", () => {
    const { container } = render(<Page />);
    const main = container.querySelector("main#top");
    expect(main).not.toBeNull();
    for (const id of ["projects", "skills", "contact"]) {
      expect(main?.querySelector(`section#${id}`)).not.toBeNull();
    }
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});

describe("metadata", () => {
  it("sets title, description and openGraph", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBe("Student developer building toward DevOps and cloud engineering.");
    expect(metadata.openGraph?.title).toBeTruthy();
    expect(metadata.openGraph?.description).toBeTruthy();
  });

  it("exposes a sitemap with the home page", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toMatch(/^https?:\/\//);
  });
});
