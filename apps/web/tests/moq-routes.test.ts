import { expect, test } from "vitest";
import { moqRoutes } from "@/lib/moq-routes";
import { moqTiers } from "@/lib/site-info";
import { GET } from "@/app/llms.txt/route";
test("catalogue quantity is qualified and custom routes require confirmation", () => {
  expect(moqRoutes.map((r) => r.id)).toEqual([
    "ready-stock",
    "private-label",
    "custom-color",
    "full-oem",
  ]);
  expect(moqRoutes[0].value).toContain("120");
  expect(moqRoutes[0].value).toContain("subject to confirmation");
  expect(moqRoutes.slice(1).every((r) => !/[0-9]/.test(r.value))).toBe(true);
  expect(moqTiers).toEqual(
    moqRoutes.map(({ label, value }) => ({ label, value })),
  );
});
test("machine-readable guide covers new catalogue and avoids obsolete categories", async () => {
  const text = await (await GET()).text();
  expect(text).toContain("45 distinct underwear styles");
  expect(text).toContain("https://www.yiwudiyasidress.com/products/");
  expect(text).toContain("https://www.diyasiunderwear.com/products");
  expect(text).not.toContain("/products/bras");
  expect(text).not.toContain("from 100 pcs");
  expect(text).toContain("private-label-underwear-moq-guide");
});
