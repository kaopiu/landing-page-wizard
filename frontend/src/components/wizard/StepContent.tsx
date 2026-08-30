"use client";

import { useState } from "react";
import { getSectionDef } from "@/lib/sections";
import type { FieldValue, SectionInstance } from "@/lib/types";
import SectionFieldsForm from "./SectionFieldsForm";

export default function StepContent({
  sections,
  onChange,
}: {
  sections: SectionInstance[];
  onChange: (sections: SectionInstance[]) => void;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === activeId));
  const active = sections[activeIndex] ?? sections[0];
  const def = active ? getSectionDef(active.type) : undefined;

  function updateActiveFields(values: Record<string, FieldValue>) {
    onChange(sections.map((s) => (s.id === active.id ? { ...s, fields: values } : s)));
  }

  if (!active || !def) {
    return (
      <p className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-400">
        לא נבחרו מקטעים. חזרו לשלב הקודם כדי להוסיף מקטעים.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">תוכן המקטעים</h2>
        <p className="mt-1 text-sm text-neutral-500">מלאו את התוכן לכל מקטע, או תנו למילוי האוטומטי לעזור</p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex min-w-max gap-2 border-b border-neutral-200 pb-2">
          {sections.map((s) => {
            const d = getSectionDef(s.type);
            const isActive = s.id === active.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={
                  "flex touch-manipulation items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                  (isActive ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")
                }
              >
                <span aria-hidden>{d?.icon}</span>
                {d?.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 p-4 sm:p-5">
        <SectionFieldsForm key={active.id} def={def} values={active.fields} onChange={updateActiveFields} />
      </div>
    </div>
  );
}
