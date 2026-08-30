export type PaletteRoles = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) return [0, 0, 0];
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `#${[clamp(r), clamp(g), clamp(b)].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

/** WCAG relative luminance, 0 (black) .. 1 (white) */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colors, 1 (no contrast) .. 21 (max) */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((c) => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    default:
      h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  if (s === 0) {
    const v = l * 255;
    return rgbToHex(v, v, v);
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hh = h / 360;
  const r = hue2rgb(p, q, hh + 1 / 3);
  const g = hue2rgb(p, q, hh);
  const b = hue2rgb(p, q, hh - 1 / 3);
  return rgbToHex(r * 255, g * 255, b * 255);
}

/**
 * Darkens `text` in HSL-lightness steps against `background` until it clears
 * `minRatio` contrast (default WCAG AA-ish 4.5:1), or bottoms out at black.
 */
export function ensureReadable(text: string, background: string, minRatio = 4.5): string {
  if (contrastRatio(text, background) >= minRatio) return text;

  const [h, s, l] = hexToHsl(text);
  let lightness = l;
  for (let i = 0; i < 40 && lightness > 0; i++) {
    lightness = Math.max(0, lightness - 0.025);
    const candidate = hslToHex(h, s, lightness);
    if (contrastRatio(candidate, background) >= minRatio) return candidate;
  }
  return "#000000";
}

const HEX_RE = /^#[0-9a-f]{6}$/i;
const FALLBACK: PaletteRoles = {
  background: "#ffffff",
  text: "#111111",
  primary: "#4f46e5",
  secondary: "#0ea5e9",
  accent: "#f97316",
};

/**
 * Assigns mockup roles from the client's 5 named colors. Primary/secondary/
 * accent map straight through — literally, so editing "primary" always
 * changes the same, widely-used spots in the mockup instead of silently
 * landing on a different role depending on how light or dark it happens to
 * be. Only the two support tones (extra1/extra2) are luminance-sorted into
 * background/text, since that pair specifically needs a contrast guarantee:
 * the lighter one becomes the background, the darker one becomes body text,
 * nudged darker if needed until it clears WCAG-ish 4.5:1 against it.
 */
export function assignRoles(colors: {
  primary: string;
  secondary: string;
  accent: string;
  extra1: string;
  extra2: string;
}): PaletteRoles {
  const e1 = colors.extra1?.trim();
  const e2 = colors.extra2?.trim();
  const e1Valid = HEX_RE.test(e1 ?? "");
  const e2Valid = HEX_RE.test(e2 ?? "");

  let background: string;
  let rawText: string;
  if (e1Valid && e2Valid) {
    const lighterFirst = relativeLuminance(e1) >= relativeLuminance(e2);
    background = lighterFirst ? e1 : e2;
    rawText = lighterFirst ? e2 : e1;
  } else if (e1Valid) {
    background = e1;
    rawText = FALLBACK.text;
  } else if (e2Valid) {
    background = e2;
    rawText = FALLBACK.text;
  } else {
    background = FALLBACK.background;
    rawText = FALLBACK.text;
  }

  return {
    background,
    text: ensureReadable(rawText, background),
    primary: HEX_RE.test(colors.primary) ? colors.primary : FALLBACK.primary,
    secondary: HEX_RE.test(colors.secondary) ? colors.secondary : FALLBACK.secondary,
    accent: HEX_RE.test(colors.accent) ? colors.accent : FALLBACK.accent,
  };
}
