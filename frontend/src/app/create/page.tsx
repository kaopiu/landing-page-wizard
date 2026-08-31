"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WizardNav, WizardProgress } from "@/components/wizard/WizardShell";
import StepInfo, { isStepInfoValid } from "@/components/wizard/StepInfo";
import StepStyleAndColors, { isStepStyleAndColorsValid } from "@/components/wizard/StepStyleAndColors";
import StepSections, { isStepSectionsValid } from "@/components/wizard/StepSections";
import StepContent from "@/components/wizard/StepContent";
import StepReview from "@/components/wizard/StepReview";
import type { BusinessInfo, ColorScheme, SectionInstance, StyleBrief, SubmissionPayload } from "@/lib/types";

// "שמנת וטרקוטה" — the same palette suggested under the warm style preset,
// used as the wizard's starting point before the client picks their own.
const DEFAULT_COLORS: ColorScheme = {
  primary: "#c2703d",
  secondary: "#e8ddd3",
  accent: "#8b5e3c",
  extra1: "#2b2320",
  extra2: "#faf6f1",
};

const DEFAULT_STYLE_BRIEF: StyleBrief = {
  stylePreset: "",
  customStyleDescription: "",
  industry: "",
  goal: "",
  referenceUrl: "",
  flexibleColors: false,
};

const LAST_STEP = 4;

export default function CreatePage() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<BusinessInfo>({ name: "", description: "", email: "" });
  const [styleBrief, setStyleBrief] = useState<StyleBrief>(DEFAULT_STYLE_BRIEF);
  const [colors, setColors] = useState<ColorScheme>(DEFAULT_COLORS);
  const [sections, setSections] = useState<SectionInstance[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const payload: SubmissionPayload = useMemo(
    () => ({
      client_name: info.name,
      client_email: info.email,
      site_config: {
        colors,
        style_brief: styleBrief,
        sections: sections.map((s) => ({ type: s.type, fields: s.fields })),
      },
    }),
    [info, colors, styleBrief, sections],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [step]);

  const canProceed = [
    isStepInfoValid(info, styleBrief),
    isStepStyleAndColorsValid(styleBrief, colors),
    isStepSectionsValid(sections),
    true,
    true,
  ][step];

  function next() {
    if (!canProceed) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, LAST_STEP));
  }
  function back() {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-neutral-800">
            ← חזרה לעמוד הבית
          </Link>
          <span className="text-sm font-medium text-neutral-400">בניית האתר שלך</span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6">
        <WizardProgress step={step} />

        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
          {step === 0 && (
            <StepInfo
              info={info}
              onChange={setInfo}
              brief={styleBrief}
              onBriefChange={setStyleBrief}
              showErrors={showErrors}
            />
          )}
          {step === 1 && (
            <StepStyleAndColors
              brief={styleBrief}
              onBriefChange={setStyleBrief}
              colors={colors}
              onColorsChange={setColors}
              businessName={info.name}
            />
          )}
          {step === 2 && <StepSections sections={sections} onChange={setSections} />}
          {step === 3 && <StepContent sections={sections} onChange={setSections} />}
          {step === 4 && <StepReview payload={payload} />}

          {step < LAST_STEP && (
            <WizardNav onBack={back} onNext={next} nextDisabled={!canProceed} hideBack={step === 0} />
          )}
          {step === LAST_STEP && <WizardNav onBack={back} />}
        </div>
      </div>
    </main>
  );
}
