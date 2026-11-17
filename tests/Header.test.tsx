import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "@/components/Header";

describe("Header", () => {
  it("is sticky", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveClass("sticky");
  });

  it("has a Main nav landmark", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it.each([
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ])("links %s to %s", (name, href) => {
    render(<Header />);
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  });
});
