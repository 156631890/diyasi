import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const routePath = fileURLToPath(new URL("../app/checkout/mock/page.tsx", import.meta.url));

test("checkout mock awaits Next 16 search params before reading query values", () => {
  const source = readFileSync(routePath, "utf8");

  expect(source).toMatch(/searchParams:\s*Promise<\s*{/);
  expect(source).toMatch(/export default async function CheckoutMockPage/);
  expect(source.match(/await searchParams/g)).toHaveLength(1);
  expect(source).toMatch(/const\s*{\s*ref:\s*queryRef,\s*title:\s*queryTitle,\s*amount:\s*queryAmount,\s*qty:\s*queryQty\s*}\s*=\s*await searchParams/);
  expect(source).not.toMatch(/searchParams\s*\./);
});
