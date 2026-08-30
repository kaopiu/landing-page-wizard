"use client";

import { useMemo } from "react";
import { assignRoles } from "@/lib/colorRoles";
import type { ColorScheme } from "@/lib/types";
import HeroMockup from "./HeroMockup";
import BrandMockup from "./BrandMockup";

export default function PalettePreview({ colors, businessName }: { colors: ColorScheme; businessName: string }) {
  const roles = useMemo(() => assignRoles(colors), [colors]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="mb-3 text-sm font-medium text-neutral-700">ככה זה ייראה על האתר שלכם 👀</p>

      <HeroMockup roles={roles} businessName={businessName} />

      <div className="mt-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="shrink-0 text-xs font-medium text-neutral-400">
          עוד כמה שילובי צבעים לבדיקה, לא עיצוב סופי
        </span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <div className="mt-3">
        <BrandMockup roles={roles} businessName={businessName} />
      </div>
    </div>
  );
}
