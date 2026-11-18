import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BrandMark from "@/components/BrandMark";

describe("BrandMark", () => {
  it("renders the shared mascot as a decorative image at the requested size", () => {
    const { container } = render(<BrandMark className="sample-mark" size={40} />);
    const image = container.querySelector("img");

    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("aria-hidden", "true");
    expect(image?.getAttribute("src")).toContain("mosdev-mascot.png");
    expect(image).toHaveAttribute("width", "40");
    expect(image).toHaveAttribute("height", "40");
  });
});
