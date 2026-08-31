"use client";

import { GOALS, INDUSTRIES } from "@/lib/styleBrief";
import type { BusinessInfo, StyleBrief } from "@/lib/types";

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStepInfoValid(info: BusinessInfo, brief: StyleBrief) {
  return (
    info.name.trim().length > 0 &&
    info.description.trim().length > 0 &&
    isEmailValid(info.email) &&
    brief.industry !== "" &&
    brief.goal !== ""
  );
}

const inputBase =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 ";
const inputOk = "border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100";
const inputError = "border-red-400 focus:border-red-500 focus:ring-red-100";

function FieldError({ children }: { children: string }) {
  return <p className="mt-1 text-xs font-medium text-red-600">{children}</p>;
}

export default function StepInfo({
  info,
  onChange,
  brief,
  onBriefChange,
  showErrors,
}: {
  info: BusinessInfo;
  onChange: (info: BusinessInfo) => void;
  brief: StyleBrief;
  onBriefChange: (brief: StyleBrief) => void;
  showErrors: boolean;
}) {
  const nameMissing = showErrors && info.name.trim().length === 0;
  const descMissing = showErrors && info.description.trim().length === 0;
  const emailInvalid = showErrors && !isEmailValid(info.email);
  const industryMissing = showErrors && brief.industry === "";
  const goalMissing = showErrors && brief.goal === "";
  const hasAnyError = nameMissing || descMissing || emailInvalid || industryMissing || goalMissing;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">פרטי העסק</h2>
        <p className="mt-1 text-sm text-neutral-500">בואו נכיר את העסק שלכם</p>
      </div>

      {hasAnyError && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
          יש להשלים או לתקן את השדות המסומנים באדום למטה כדי להמשיך
        </p>
      )}

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">שם העסק</span>
        <input
          type="text"
          value={info.name}
          onChange={(e) => onChange({ ...info, name: e.target.value })}
          placeholder="לדוגמה: מספרת דן"
          className={inputBase + (nameMissing ? inputError : inputOk)}
        />
        {nameMissing && <FieldError>נא להזין את שם העסק</FieldError>}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">תיאור קצר של העסק</span>
        <textarea
          value={info.description}
          onChange={(e) => onChange({ ...info, description: e.target.value })}
          placeholder="במה אתם עוסקים, למי אתם פונים ומה מייחד אתכם"
          rows={4}
          className={inputBase + "resize-none " + (descMissing ? inputError : inputOk)}
        />
        {descMissing && <FieldError>נא להזין תיאור קצר של העסק</FieldError>}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">אימייל ליצירת קשר</span>
        <input
          type="email"
          dir="ltr"
          value={info.email}
          onChange={(e) => onChange({ ...info, email: e.target.value })}
          placeholder="you@business.co.il"
          className={inputBase + "text-right " + (emailInvalid ? inputError : inputOk)}
        />
        {emailInvalid && (
          <FieldError>{info.email.trim() === "" ? "נא להזין כתובת אימייל" : "כתובת האימייל לא תקינה"}</FieldError>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">באיזה תחום העסק שלכם?</span>
        <select
          value={brief.industry}
          onChange={(e) => onBriefChange({ ...brief, industry: e.target.value })}
          className={inputBase + "bg-white " + (industryMissing ? inputError : inputOk)}
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
        {industryMissing && <FieldError>נא לבחור תחום עיסוק</FieldError>}
      </label>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">מה המטרה העיקרית של האתר?</p>
        <div
          className={
            "grid grid-cols-1 gap-3 rounded-xl sm:grid-cols-3 " +
            (goalMissing ? "outline outline-2 outline-offset-4 outline-red-400" : "")
          }
        >
          {GOALS.map((goal) => {
            const selected = brief.goal === goal.value;
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => onBriefChange({ ...brief, goal: goal.value })}
                className={
                  "flex touch-manipulation flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-all " +
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
        {goalMissing && <FieldError>נא לבחור מטרה עיקרית לאתר</FieldError>}
      </div>
    </div>
  );
}
