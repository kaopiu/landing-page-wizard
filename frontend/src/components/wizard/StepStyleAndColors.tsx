"use client";

import { COLOR_RECOMMENDATIONS } from "@/lib/colorRecommendations";
import { STYLE_PRESETS } from "@/lib/styleBrief";
import type { ColorScheme, StyleBrief } from "@/lib/types";
import PalettePreview from "./palette/PalettePreview";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

const COLOR_FIELDS: { key: keyof ColorScheme; label: string }[] = [
  { key: "primary", label: "ראשי" },
  { key: "secondary", label: "משני" },
  { key: "accent", label: "הדגשה" },
  { key: "extra1", label: "נוסף 1" },
  { key: "extra2", label: "נוסף 2" },
];

export function isStepStyleAndColorsValid(brief: StyleBrief, colors: ColorScheme) {
  const styleOk =
    brief.stylePreset !== "" &&
    (brief.stylePreset !== "custom" || brief.customStyleDescription.trim() !== "");
  const colorsOk = COLOR_FIELDS.every((f) => HEX_RE.test(colors[f.key]));
  return styleOk && colorsOk;
}

export default function StepStyleAndColors({
  brief,
  onBriefChange,
  colors,
  onColorsChange,
  businessName,
}: {
  brief: StyleBrief;
  onBriefChange: (brief: StyleBrief) => void;
  colors: ColorScheme;
  onColorsChange: (colors: ColorScheme) => void;
  businessName: string;
}) {
  const recommended = brief.stylePreset ? COLOR_RECOMMENDATIONS[brief.stylePreset] : undefined;
  const selectedPresetLabel = STYLE_PRESETS.find((p) => p.value === brief.stylePreset)?.label;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">הופכים אתכם ל-Brief חכם 🧠✨</h2>
        <p className="mt-1 text-sm text-neutral-500">
          כמה שאלות קטנות שעוזרות למעצב/ת ה-AI שלנו לקלוע בדיוק לטעם שלכם
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-neutral-700">איזה סגנון הכי &quot;אתם&quot;?</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STYLE_PRESETS.map((preset) => {
            const selected = brief.stylePreset === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onBriefChange({ ...brief, stylePreset: preset.value })}
                className={
                  "flex items-start gap-3 rounded-xl border p-4 text-right transition-all " +
                  (selected
                    ? "border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-200"
                    : "border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/30")
                }
              >
                <span className="text-2xl" aria-hidden>
                  {preset.emoji}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-800">{preset.label}</span>
                    {selected && <span className="text-xs font-medium text-indigo-600">נבחר ✓</span>}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500">{preset.vibe}</span>
                </span>
              </button>
            );
          })}
        </div>

        {brief.stylePreset === "custom" && (
          <div className="mt-3 rounded-xl border border-dashed border-neutral-300 p-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">
                ספרו לנו על הסגנון שאתם מדמיינים
              </span>
              <span className="mb-2 block text-xs text-neutral-500">
                כמה משפטים על התחושה, ההשראה או הסגנון שתרצו שהאתר ישדר
              </span>
              <textarea
                value={brief.customStyleDescription}
                onChange={(e) => onBriefChange({ ...brief, customStyleDescription: e.target.value })}
                placeholder="לדוגמה: משהו נקי ומודרני בהשראת מותגי טבע, עם המון רווח לבן ותחושת רגיעה"
                rows={3}
                className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-dashed border-neutral-300 p-4">
        <label className="block">
          <span className="mb-1 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
            🔍 יש אתר שאתם מתים עליו? <span className="font-normal text-neutral-400">(רשות)</span>
          </span>
          <span className="mb-2 block text-xs text-neutral-500">
            שתפו קישור לאתר שהעיצוב שלו מדבר אליכם — זה עוזר לנו לתפוס את הכיוון הרבה יותר מהר
          </span>
          <input
            type="url"
            dir="ltr"
            value={brief.referenceUrl}
            onChange={(e) => onBriefChange({ ...brief, referenceUrl: e.target.value })}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-right outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
      </div>

      <hr className="border-neutral-200" />

      <div>
        <h3 className="text-lg font-bold text-neutral-900">ועכשיו — הצבעים 🎨</h3>
        <p className="mt-1 text-sm text-neutral-500">בחרו חמישה צבעים שיגדירו את המראה של האתר</p>
      </div>

      {recommended && (
        <div>
          <p className="mb-2 text-sm font-medium text-neutral-700">
            פלטות מומלצות לסגנון &quot;{selectedPresetLabel}&quot; ✨
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {recommended.map((rec) => (
              <button
                key={rec.label}
                type="button"
                onClick={() => onColorsChange(rec.colors)}
                className="flex items-center gap-2.5 rounded-xl border border-neutral-200 p-3 text-right transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <span className="flex shrink-0 -space-x-2 rtl:space-x-reverse">
                  {COLOR_FIELDS.map((f) => (
                    <span
                      key={f.key}
                      className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                      style={{ background: rec.colors[f.key] }}
                    />
                  ))}
                </span>
                <span className="truncate text-xs font-medium text-neutral-700">{rec.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-5">
        {COLOR_FIELDS.map((f) => {
          const value = colors[f.key];
          const valid = HEX_RE.test(value);
          return (
            <div key={f.key} className="flex flex-col items-center gap-1.5">
              <label className="group relative cursor-pointer">
                <input
                  type="color"
                  value={valid ? value : "#000000"}
                  onChange={(e) => onColorsChange({ ...colors, [f.key]: e.target.value })}
                  className="h-16 w-16 cursor-pointer appearance-none rounded-2xl border border-black/10 bg-transparent p-0 shadow-sm transition-transform group-hover:scale-105 [&::-moz-color-swatch]:rounded-2xl [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-2xl [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:rounded-2xl [&::-webkit-color-swatch-wrapper]:p-0"
                />
              </label>
              <p className="text-xs font-medium text-neutral-700">{f.label}</p>
              <input
                type="text"
                dir="ltr"
                value={value}
                onChange={(e) => onColorsChange({ ...colors, [f.key]: e.target.value })}
                placeholder="#000000"
                className={
                  "w-20 border-none bg-transparent text-center text-[11px] font-mono outline-none " +
                  (valid ? "text-neutral-400 focus:text-neutral-700" : "text-red-400")
                }
              />
            </div>
          );
        })}
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-neutral-200 p-3.5 hover:border-indigo-300">
        <input
          type="checkbox"
          checked={brief.flexibleColors}
          onChange={(e) => onBriefChange({ ...brief, flexibleColors: e.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
        />
        <span>
          <span className="block text-sm font-medium text-neutral-800">אני לא קפדני/ת לגבי הגוונים המדויקים 🎨</span>
          <span className="mt-0.5 block text-xs text-neutral-500">
            תרגישו חופשי לכוונן את הצבעים כדי שיתאימו טוב יותר לסגנון שבחרתי — לא צריך להיצמד בדיוק לצבעים שבחרתי כאן
          </span>
        </span>
      </label>

      <PalettePreview colors={colors} businessName={businessName} />
    </div>
  );
}
