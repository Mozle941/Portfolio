import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Contact from "@/components/Contact";

describe("Contact", () => {
  it("is the #contact section and preserves the existing contact links", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("section#contact")).not.toBeNull();
    expect(screen.getByRole("link", { name: "mose_dev@proton.me" })).toHaveAttribute(
      "href",
      "mailto:mose_dev@proton.me",
    );

    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/Mozle941");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("link", { name: /LinkedIn/i })).not.toBeInTheDocument();
  });

  it("shows inline validation errors for missing required fields", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: "Prepare email" }));

    expect(screen.getByText("Add your name.")).toBeInTheDocument();
    expect(screen.getByText("Add your email address.")).toBeInTheDocument();
    expect(screen.getByText("Add a message.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /your name/i })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox", { name: /your email/i })).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByRole("link", { name: /open email draft/i })).not.toBeInTheDocument();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByRole("textbox", { name: /your name/i }), "Moses");
    await user.type(screen.getByRole("textbox", { name: /your email/i }), "not-an-email");
    await user.type(screen.getByRole("textbox", { name: /message/i }), "I would like to discuss a project.");
    await user.click(screen.getByRole("button", { name: "Prepare email" }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /open email draft/i })).not.toBeInTheDocument();
  });

  it("creates a prefilled email draft after valid submission", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByRole("textbox", { name: /your name/i }), "Moses Example");
    await user.type(screen.getByRole("textbox", { name: /your email/i }), "visitor@example.com");
    await user.type(screen.getByRole("textbox", { name: /message/i }), "Hello, I would like to discuss a project.");
    await user.click(screen.getByRole("button", { name: "Prepare email" }));

    expect(screen.getByText("Message checked. Open the email draft below to review and send.")).toBeInTheDocument();
    const toast = screen.getByRole("status");
    expect(toast).toHaveTextContent("Email draft ready");
    expect(within(toast).getByRole("link", { name: "Open draft" })).toBeInTheDocument();
    const draftLink = screen.getByRole("link", { name: "Open email draft" });
    expect(draftLink.getAttribute("href")).toContain("mailto:mose_dev@proton.me?subject=");
    expect(within(toast).getByRole("link", { name: "Open draft" })).toHaveAttribute(
      "href",
      draftLink.getAttribute("href"),
    );
    const decodedDraft = decodeURIComponent(draftLink.getAttribute("href") ?? "");
    expect(decodedDraft).toContain("Portfolio message from Moses Example");
    expect(decodedDraft).toContain("Email: visitor@example.com");
    expect(decodedDraft).toContain("Hello, I would like to discuss a project.");

    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
