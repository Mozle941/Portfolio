import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "@/components/Contact";

describe("Contact", () => {
  it("is the #contact section", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("section#contact")).not.toBeNull();
  });

  it("links the email with mailto", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: "mose_dev@proton.me" })).toHaveAttribute(
      "href",
      "mailto:mose_dev@proton.me",
    );
  });

  it("links GitHub as an external link", () => {
    render(<Contact />);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("href", "https://github.com/Mozle941");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("omits LinkedIn and has no form", () => {
    render(<Contact />);
    expect(screen.queryByRole("link", { name: /LinkedIn/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });
});
