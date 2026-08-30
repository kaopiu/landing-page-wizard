import type { ColorScheme } from "./types";

export type ColorRecommendation = {
  label: string;
  colors: ColorScheme;
};

/**
 * Three ready-made palettes per style preset, shown as suggestions once the
 * client picks a vibe on the style step — click one to apply it on the
 * colors step, still fully editable afterwards.
 *
 * Chosen from real, widely-used color-scheme families (not generated) so
 * each one actually looks intentional rather than a random hue rotation.
 */
export const COLOR_RECOMMENDATIONS: Record<string, ColorRecommendation[]> = {
  professional: [
    {
      label: "כחול ארגוני",
      colors: { primary: "#1e3a8a", secondary: "#3b82f6", accent: "#0ea5e9", extra1: "#0f172a", extra2: "#f1f5f9" },
    },
    {
      label: "טורקיז מקצועי",
      colors: { primary: "#0f766e", secondary: "#2dd4bf", accent: "#f59e0b", extra1: "#082f2b", extra2: "#f0fdfa" },
    },
    {
      label: "אינדיגו מודרני",
      colors: { primary: "#4338ca", secondary: "#818cf8", accent: "#f59e0b", extra1: "#1e1b4b", extra2: "#f5f5ff" },
    },
  ],
  minimalist: [
    {
      label: "מרווה עדינה",
      colors: { primary: "#6b7c5e", secondary: "#a3ad8e", accent: "#3f4a3c", extra1: "#232821", extra2: "#f6f5f1" },
    },
    {
      label: "כחול אבן וורוד אבק",
      colors: { primary: "#3b5166", secondary: "#90a4b7", accent: "#c1666b", extra1: "#1c2530", extra2: "#f4f6f8" },
    },
    {
      label: "לבנדר מאופק",
      colors: { primary: "#6b5b73", secondary: "#b8a9c9", accent: "#4a3f52", extra1: "#211c24", extra2: "#f7f5f8" },
    },
  ],
  bold: [
    {
      label: "אדום-צהוב",
      colors: { primary: "#dc2626", secondary: "#f59e0b", accent: "#fde047", extra1: "#111827", extra2: "#ffffff" },
    },
    {
      label: "סגול חשמלי",
      colors: { primary: "#7c3aed", secondary: "#a78bfa", accent: "#22d3ee", extra1: "#18181b", extra2: "#f5f3ff" },
    },
    {
      label: "כחול-כתום",
      colors: { primary: "#2563eb", secondary: "#1d4ed8", accent: "#f97316", extra1: "#0b1120", extra2: "#ffffff" },
    },
  ],
  warm: [
    {
      label: "שמנת וטרקוטה",
      colors: { primary: "#c2703d", secondary: "#e8ddd3", accent: "#8b5e3c", extra1: "#2b2320", extra2: "#faf6f1" },
    },
    {
      label: "אדמה-ורוד",
      colors: { primary: "#e07a5f", secondary: "#f2cc8f", accent: "#81b29a", extra1: "#3d405b", extra2: "#fdf6ec" },
    },
    {
      label: "אפרסק רך",
      colors: { primary: "#fb7185", secondary: "#fdba74", accent: "#f43f5e", extra1: "#431407", extra2: "#fff7ed" },
    },
  ],
  elegant: [
    {
      label: "שחור ושנהב",
      colors: { primary: "#1c1917", secondary: "#78716c", accent: "#a8a29e", extra1: "#0c0a09", extra2: "#faf8f5" },
    },
    {
      label: "בורדו עמוק",
      colors: { primary: "#5c1a33", secondary: "#9c4b62", accent: "#e8c4c4", extra1: "#1a0e12", extra2: "#faf5f5" },
    },
    {
      label: "ירוק אמרלד",
      colors: { primary: "#0b3d2e", secondary: "#3a6f5c", accent: "#e8ddd0", extra1: "#08211a", extra2: "#f5f3ee" },
    },
  ],
};
