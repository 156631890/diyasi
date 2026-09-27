export type TeamNotificationStatus = "accepted" | "failed" | "pending_setup" | "unknown";

export type InquirySubmissionResult =
  | { kind: "saved"; id: string; teamNotification: TeamNotificationStatus }
  | { kind: "rejected"; status: number }
  | { kind: "unknown" };

// A network timeout cannot tell the buyer whether a durable write happened.
// The caller must reuse its submission ID when checking the same request.
export async function postInquiry(
  payload: Record<string, unknown>,
  submissionId: string,
  fetcher: typeof fetch = fetch,
  timeoutMs = 15000,
): Promise<InquirySubmissionResult> {
  try {
    const response = await fetcher("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submission_id: submissionId }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return { kind: "rejected", status: response.status };
    const result = await response.json();
    if (result?.ok === true && (typeof result.id === "string" || typeof result.id === "number") && String(result.id)) {
      const notification = result.team_notification;
      return {
        kind: "saved",
        id: String(result.id),
        teamNotification: notification === "accepted" || notification === "failed" || notification === "pending_setup" ? notification : "unknown",
      };
    }
    return { kind: "unknown" };
  } catch {
    return { kind: "unknown" };
  }
}
