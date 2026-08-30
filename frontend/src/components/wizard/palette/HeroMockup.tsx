"use client";

import type { CSSProperties } from "react";
import type { PaletteRoles } from "@/lib/colorRoles";

const tint = (varName: string, pct: number) => `color-mix(in srgb, var(${varName}) ${pct}%, white)`;
const shade = (varName: string, pct: number) => `color-mix(in srgb, var(${varName}) ${pct}%, black)`;

/**
 * Fixed at a real website's 16:10 hero ratio via `aspect-[16/10]` and never
 * reflows — its content is sized in container-query width units (cqw) off
 * that same box, so at any screen size the whole thing just scales up or
 * down like a screenshot instead of restacking or distorting.
 *
 * Color usage is deliberately restrained: primary anchors just the CTA and
 * one accent shape (the two spots a real site would actually use a strong
 * brand color), while secondary/accent carry the rest of the shape cluster
 * and tints/shades soften everything else — so no single color floods the
 * whole preview.
 */
export default function HeroMockup({ roles, businessName }: { roles: PaletteRoles; businessName: string }) {
  const name = businessName.trim() || "העסק שלי";

  const stats = [
    { value: "300+", label: "לקוחות", color: "var(--text)" },
    { value: "50+", label: "פרויקטים", color: "var(--secondary)" },
    { value: "1000+", label: "שעות עבודה", color: "var(--accent)" },
  ];

  return (
    <div
      className="aspect-[16/10] w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/5"
      style={
        {
          "--bg": roles.background,
          "--text": roles.text,
          "--primary": roles.primary,
          "--secondary": roles.secondary,
          "--accent": roles.accent,
          containerType: "inline-size",
        } as CSSProperties
      }
    >
      <div className="h-full bg-[var(--bg)] p-[5cqw] text-[var(--text)]">
        {/* nav */}
        <div className="mb-[5cqw] flex items-center justify-between">
          <div className="flex items-center gap-[1.3cqw]">
            <span
              className="flex h-[3.6cqw] w-[3.6cqw] items-center justify-center rounded-[1cqw] text-[1.8cqw] font-bold"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              ✦
            </span>
            <span className="text-[2.2cqw] font-extrabold">{name}</span>
          </div>
          <div className="flex items-center gap-[1.5cqw]">
            <span className="hidden text-[1.8cqw] font-medium opacity-60 sm:inline">מוצר</span>
            <span className="hidden text-[1.8cqw] font-medium opacity-60 sm:inline">מחירים</span>
            <span
              className="rounded-[0.8cqw] border px-[1.8cqw] py-[0.8cqw] text-[1.8cqw] font-semibold"
              style={{ borderColor: "currentColor", opacity: 0.85 }}
            >
              כניסה
            </span>
            <span
              className="rounded-[0.8cqw] px-[1.8cqw] py-[0.8cqw] text-[1.8cqw] font-semibold"
              style={{ background: "var(--primary)", color: "var(--bg)" }}
            >
              הרשמה
            </span>
          </div>
        </div>

        {/* hero */}
        <div className="grid grid-cols-2 items-center gap-[5cqw]">
          <div>
            <h3 className="text-[4.25cqw] font-extrabold leading-[1.3]">
              שדרגו את <span style={{ color: "var(--primary)" }}>הנוכחות הדיגיטלית</span> שלכם
            </h3>
            <p className="mt-[2.5cqw] text-[2.5cqw] leading-relaxed opacity-70">
              דף נחיתה מקצועי שמותאם בדיוק לצבעים ולסגנון של העסק שלכם.
            </p>
            <div className="mt-[4cqw] flex gap-[4cqw]">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[3.25cqw] font-extrabold" style={{ color: s.color }}>
                    {s.value}
                  </p>
                  <p className="text-[2.1cqw] opacity-60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* geometric shape cluster */}
          <div className="relative aspect-square w-full">
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[1.5cqw] overflow-hidden rounded-[3cqw]">
              <div className="flex items-center justify-center" style={{ background: tint("--primary", 20) }}>
                <span
                  className="h-[6cqw] w-[6cqw] rotate-45 rounded-[1cqw]"
                  style={{ background: shade("--primary", 65) }}
                />
              </div>
              <div className="flex items-center justify-center" style={{ background: tint("--secondary", 25) }}>
                <span className="h-[7cqw] w-[7cqw] rounded-full" style={{ background: shade("--secondary", 60) }} />
              </div>
              <div className="flex items-center justify-center" style={{ background: tint("--accent", 25) }}>
                <span
                  className="h-0 w-0 border-b-[5cqw] border-s-[2.75cqw] border-e-[2.75cqw] border-s-transparent border-e-transparent"
                  style={{ borderBottomColor: shade("--accent", 55) }}
                />
              </div>
              <div className="flex items-center justify-center" style={{ background: "var(--primary)" }}>
                <span className="h-[6.5cqw] w-[6.5cqw] rounded-full" style={{ background: "var(--bg)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
