import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AssistantWidget from "@/components/AssistantWidget";

describe("AssistantWidget", () => {
  it("opens a labeled assistant panel from the mascot avatar", () => {
    render(<AssistantWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Open Mos_dev assistant" }));
    expect(screen.getByRole("region", { name: "Mos_dev assistant" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Ask a question about the portfolio" })).toHaveFocus();
  });

  it("answers a suggested question about the featured projects", () => {
    render(<AssistantWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Open Mos_dev assistant" }));
    fireEvent.click(screen.getByRole("button", { name: "Show me the projects" }));
    expect(screen.getByText(/four featured projects/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore projects" })).toHaveAttribute("href", "#projects");
  });

  it("accepts a typed question and returns a curated contact answer", () => {
    render(<AssistantWidget />);
    fireEvent.click(screen.getByRole("button", { name: "Open Mos_dev assistant" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Ask a question about the portfolio" }), {
      target: { value: "How can I contact Moses?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send question" }));
    expect(screen.getByText(/contact Moses directly by email/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email Moses" })).toHaveAttribute("href", "mailto:mose_dev@proton.me");
  });
});
