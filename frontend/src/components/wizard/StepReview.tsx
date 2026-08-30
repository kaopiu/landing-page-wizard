"use client";

import { useState } from "react";
import { submitSite } from "@/lib/api";
import type { SubmissionPayload } from "@/lib/types";

export default function StepReview({ payload }: { payload: SubmissionPayload }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const json = JSON.stringify(payload, null, 2);

  async function handleSubmit() {
    setStatus("sending");
    setMessage(null);
    const result = await submitSite(payload);
    if (result.ok) {
      setStatus("sent");
      setMessage(`הבקשה נשלחה בהצלחה! מספר בקשה: ${result.id}`);
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">סיכום ושליחה</h2>
        <p className="mt-1 text-sm text-neutral-500">
          זהו ה-JSON שיישלח לשרת. בדקו שהכול נראה טוב ולחצו על שליחה
        </p>
      </div>

      <pre dir="ltr" className="max-h-96 overflow-auto rounded-xl bg-neutral-900 p-4 text-left text-xs leading-relaxed text-neutral-100">
        {json}
      </pre>

      {message && (
        <p
          className={
            "rounded-lg p-3 text-sm " +
            (status === "sent" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")
          }
        >
          {message}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "sending" || status === "sent"}
        className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "שולח..." : status === "sent" ? "נשלח ✓" : "שליחת הבקשה"}
      </button>
    </div>
  );
}
