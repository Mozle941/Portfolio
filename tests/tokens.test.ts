import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "..");
const css = readFileSync(path.join(root, "styles/tokens.css"), "utf8");

const token = (name: string): string => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`missing token ${name}`);
  return m[1];
};

const lum = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string): number => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("tokens", () => {
  it.each(["bg", "surface", "text", "muted", "accent", "line"])("defines %s", (n) => {
    expect(token(n)).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it.each([
    ["text", "bg"],
    ["muted", "bg"],
    ["accent", "bg"],
    ["text", "surface"],
    ["muted", "surface"],
    ["bg", "accent"],
  ])("%s on %s meets WCAG AA 4.5:1", (fg, bg) => {
    expect(ratio(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
  });

  it("hardcodes no colors outside tokens.css", () => {
    const files = [...walk(path.join(root, "app")), ...walk(path.join(root, "components"))]
      .filter((f) => /\.(tsx?|css)$/.test(f));
    const bad = files.filter((f) =>
      /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\(|hsla?\(/.test(readFileSync(f, "utf8")),
    );
    expect(bad).toEqual([]);
  });

  it("is imported by globals.css", () => {
    expect(readFileSync(path.join(root, "app/globals.css"), "utf8")).toContain("tokens.css");
  });
});
