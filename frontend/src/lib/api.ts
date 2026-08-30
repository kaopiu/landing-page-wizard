import type { SubmissionPayload } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type SubmitResult =
  | { ok: true; id: number; status: string }
  | { ok: false; error: string };

export async function submitSite(payload: SubmissionPayload): Promise<SubmitResult> {
  try {
    const res = await fetch(`${API_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `שגיאת שרת (${res.status}): ${body}` };
    }
    const data = await res.json();
    return { ok: true, id: data.id, status: data.status };
  } catch {
    return { ok: false, error: "לא ניתן להתחבר לשרת. ודאו שה-API רץ ונסו שוב." };
  }
}
