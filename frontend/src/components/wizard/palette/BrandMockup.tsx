"use client";

import { useMemo, type CSSProperties } from "react";
import type { PaletteRoles } from "@/lib/colorRoles";
import { pickMockupIcon } from "./icons";

const tint = (varName: string, pct: number) => `color-mix(in srgb, var(${varName}) ${pct}%, white)`;
const shade = (varName: string, pct: number) => `color-mix(in srgb, var(${varName}) ${pct}%, black)`;

export default function BrandMockup({ roles, businessName }: { roles: PaletteRoles; businessName: string }) {
  const name = businessName.trim() || "העסק שלי";
  const { Icon } = useMemo(() => pickMockupIcon(name), [name]);

  const tiles = [
    { bg: tint("--primary", 78), fg: shade("--primary", 65) },
    { bg: "var(--primary)", fg: "var(--bg)" },
    { bg: tint("--secondary", 70), fg: shade("--secondary", 65) },
    { bg: shade("--accent", 25), fg: tint("--accent", 55) },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-1.5"
      style={
        {
          "--bg": roles.background,
          "--text": roles.text,
          "--primary": roles.primary,
          "--secondary": roles.secondary,
          "--accent": roles.accent,
        } as CSSProperties
      }
    >
      {tiles.map((tile, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-4 shadow-sm"
          style={{ background: tile.bg, color: tile.fg }}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="max-w-full truncate text-[10px] font-extrabold leading-tight">{name}</span>
        </div>
      ))}
    </div>
  );
}
