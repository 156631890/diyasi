export const SAMPLE_STORAGE_KEY = "diyasi-sample-list-v1";
export const SAMPLE_LIMIT = 20;

export function parseSampleIds(raw: string, approvedIds: readonly string[]): string[] {
  try {
    const saved: unknown = JSON.parse(raw);
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter((id): id is string => typeof id === "string" && approvedIds.includes(id)))].slice(0, SAMPLE_LIMIT);
  } catch { return []; }
}
