"use client";

import { GOALS, INDUSTRIES } from "@/lib/styleBrief";
import type { BusinessInfo, StyleBrief } from "@/lib/types";

export function isStepInfoValid(info: BusinessInfo, brief: StyleBrief) {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
  return (
    info.name.trim().length > 0 &&
    info.description.trim().length > 0 &&
    emailOk &&
    brief.industry !== "" &&
    brief.goal !== ""
  );
}

export default function StepInfo({
  info,
  onChange,
  brief,
  onBriefChange,
}: {
  info: BusinessInfo;
  onChange: (info: BusinessInfo) => void;
  brief: StyleBrief;
  onBriefChange: (brief: StyleBrief) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">פרטי העסק</h2>
        <p className="mt-1 text-sm text-neutral-500">בואו נכיר את העסק שלכם</p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">שם העסק</span>
        <input
          type="text"
          value={info.name}
          onChange={(e) => onChange({ ...info, name: e.target.value })}
          placeholder="לדוגמה: מספרת דן"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">תיאור קצר של העסק</span>
        <textarea
          value={info.description}
          onChange={(e) => onChange({ ...info, description: e.target.value })}
          placeholder="במה אתם עוסקים, למי אתם פונים ומה מייחד אתכם"
          rows={4}
          className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">אימייל ליצירת קשר</span>
        <input
          type="email"
          dir="ltr"
          value={info.email}
          onChange={(e) => onChange({ ...info, email: e.target.value })}
          placeholder="you@business.co.il"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-right outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">באיזה תחום העסק שלכם?</span>
        <select
          value={brief.industry}
          onChange={(e) => onBriefChange({ ...brief, industry: e.target.value })}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="" disabled>
            בחרו תחום
          </option>
          {INDUSTRIES.map((ind) => (
            <option key={ind.value} value={ind.value}>
              {ind.emoji} {ind.label}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">מה המטרה העיקרית של האתר?</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {GOALS.map((goal) => {
            const selected = brief.goal === goal.value;
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => onBriefChange({ ...brief, goal: goal.value })}
                className={
                  "flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-all " +
                  (selected
                    ? "border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-200"
                    : "border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/30")
                }
              >
                <span className="text-2xl" aria-hidden>
                  {goal.emoji}
                </span>
                <span className="text-sm font-semibold text-neutral-800">
                  {goal.label} {selected && <span className="text-indigo-600">✓</span>}
                </span>
                <span className="text-xs text-neutral-500">{goal.hint}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
