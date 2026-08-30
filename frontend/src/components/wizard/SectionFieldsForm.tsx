"use client";

import type { FieldDef, FieldValue, RepeaterItem, SectionDef } from "@/lib/types";

/**
 * What "Fill with AI" writes into empty fields right now. It's deliberately
 * NOT realistic-looking example copy — Phase 0 has no real AI integration,
 * so inserting plausible sentences would look like finished content. This
 * marker makes it obvious the field is a placeholder the AI will replace
 * when the site is actually built.
 */
const AI_FILL_MARKER = "✨ ה-AI ימלא את זה עבורכם";

function TextField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const common = "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={3}
        className={common + " resize-none"}
      />
    );
  }
  return (
    <input
      type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={common}
    />
  );
}

function CheckboxField({
  field,
  checked,
  onChange,
}: {
  field: FieldDef;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-neutral-200 p-3 hover:border-indigo-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
      />
      <span className="text-sm text-neutral-700">{field.label}</span>
    </label>
  );
}

function RepeaterField({
  field,
  items,
  onChange,
}: {
  field: FieldDef;
  items: RepeaterItem[];
  onChange: (items: RepeaterItem[]) => void;
}) {
  const itemFields = field.itemFields ?? [];

  function addItem() {
    onChange([...items, Object.fromEntries(itemFields.map((f) => [f.key, ""]))]);
  }

  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, key: string, val: string) {
    onChange(items.map((it, i) => (i === idx ? { ...it, [key]: val } : it)));
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-lg border border-neutral-200 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">
              {field.itemLabel ?? "פריט"} {idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-xs font-medium text-red-600 hover:underline"
            >
              הסרה
            </button>
          </div>
          <div className="space-y-2">
            {itemFields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-xs text-neutral-500">{f.label}</span>
                <TextField field={f} value={item[f.key] ?? ""} onChange={(v) => updateItem(idx, f.key, v)} />
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="w-full rounded-lg border border-dashed border-neutral-300 py-2 text-sm font-medium text-neutral-500 hover:border-indigo-300 hover:text-indigo-600"
      >
        + הוספת {field.itemLabel ?? "פריט"}
      </button>
    </div>
  );
}

export default function SectionFieldsForm({
  def,
  values,
  onChange,
}: {
  def: SectionDef;
  values: Record<string, FieldValue>;
  onChange: (values: Record<string, FieldValue>) => void;
}) {
  function setField(key: string, value: FieldValue) {
    onChange({ ...values, [key]: value });
  }

  function fillWithAI() {
    const filled: Record<string, FieldValue> = { ...values };
    for (const f of def.fields) {
      if (f.type === "checkbox" || f.noAiFill) continue;
      if (f.type === "repeater") {
        const existing = (values[f.key] as RepeaterItem[] | undefined) ?? [];
        const base = existing.length > 0 ? existing : [{}];
        filled[f.key] = base.map((item) =>
          Object.fromEntries((f.itemFields ?? []).map((sf) => [sf.key, item[sf.key] || AI_FILL_MARKER])),
        );
      } else {
        const current = values[f.key];
        if (!current || (typeof current === "string" && current.trim() === "")) {
          filled[f.key] = AI_FILL_MARKER;
        }
      }
    }
    onChange(filled);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            {def.icon}
          </span>
          <h3 className="text-base font-semibold text-neutral-800">{def.label}</h3>
        </div>
        <button
          type="button"
          onClick={fillWithAI}
          className="flex shrink-0 items-center gap-1 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-200"
        >
          ✨ תנו ל-AI למלא עבורי
        </button>
      </div>
      <p className="-mt-2 text-xs text-neutral-400">
        זה רק מסמן אילו שדות ה-AI ימלא — כשנבנה את האתר, הוא יכתוב שם תוכן מלא ומותאם אישית לעסק שלכם.
      </p>

      <div className="space-y-4">
        {def.fields.map((f) => (
          <div key={f.key}>
            {f.type !== "checkbox" && (
              <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                {f.label}
                {f.noAiFill && (
                  <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-normal text-neutral-500">
                    פרט עסקי אמיתי — לא ימולא ע&quot;י AI
                  </span>
                )}
              </span>
            )}
            {f.type === "repeater" ? (
              <RepeaterField
                field={f}
                items={(values[f.key] as RepeaterItem[] | undefined) ?? []}
                onChange={(items) => setField(f.key, items)}
              />
            ) : f.type === "checkbox" ? (
              <CheckboxField
                field={f}
                checked={(values[f.key] as boolean | undefined) ?? false}
                onChange={(v) => setField(f.key, v)}
              />
            ) : (
              <TextField field={f} value={(values[f.key] as string | undefined) ?? ""} onChange={(v) => setField(f.key, v)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
