import { expect, test } from "vitest";
import { parseSampleIds, SAMPLE_LIMIT } from "@/lib/sample-list";

test("sample storage restores unique approved ids and drops stale or malformed data", () => {
  const approved = ["style-a", "style-b"];
  expect(parseSampleIds('["style-b","retired","style-b",42,"style-a"]', approved)).toEqual(["style-b", "style-a"]);
  for (const raw of ["broken", "null", "{}", '"style-a"']) expect(parseSampleIds(raw, approved)).toEqual([]);
  const many = Array.from({ length: 25 }, (_, i) => `style-${i}`);
  expect(parseSampleIds(JSON.stringify(many), many)).toHaveLength(SAMPLE_LIMIT);
});
