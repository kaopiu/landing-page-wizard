"use client";

const STEP_LABELS = ["פרטי העסק", "סגנון וצבעים", "בחירת מקטעים", "תוכן", "סיום ושליחה"];

export function WizardProgress({ step }: { step: number }) {
  const total = STEP_LABELS.length;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-semibold text-neutral-800">{STEP_LABELS[step]}</span>
        <span className="shrink-0 text-neutral-400">
          שלב {step + 1} מתוך {total}
        </span>
      </div>

      <ol className="mt-3 flex items-center">
        {STEP_LABELS.map((label, i) => {
          const state = i === step ? "current" : i < step ? "done" : "upcoming";
          const isLast = i === STEP_LABELS.length - 1;
          return (
            <li key={label} className={"flex items-center" + (isLast ? "" : " flex-1")}>
              <span
                className={
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-colors " +
                  (state === "current"
                    ? "bg-indigo-600 text-white"
                    : state === "done"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-neutral-200 text-neutral-500")
                }
                title={label}
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              {!isLast && (
                <span
                  className={
                    "mx-1.5 h-0.5 flex-1 rounded-full transition-colors " +
                    (state === "done" ? "bg-emerald-300" : "bg-neutral-200")
                  }
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WizardNav({
  onBack,
  onNext,
  backLabel = "הקודם",
  nextLabel = "הבא",
  nextDisabled = false,
  hideBack = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideBack?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {!hideBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
