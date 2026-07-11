import { NextRequest } from "next/server";
import { expect, test } from "vitest";

import { config, proxy } from "../proxy";

function request(pathname: string, cookie?: string): NextRequest {
  return new NextRequest(`https://www.yiwudiyasidress.com${pathname}`, {
    headers: cookie ? { cookie } : undefined
  });
}

function forwardedLocale(pathname: string, cookie?: string): string | null {
  return proxy(request(pathname, cookie)).headers.get("x-middleware-request-x-site-locale");
}

test("proxy sets Spanish locale only for Spanish acquisition routes", () => {
  expect(forwardedLocale("/es", "site_lang=en")).toBe("es");
  expect(forwardedLocale("/es/contacto", "site_lang=en")).toBe("es");
});

test("proxy makes English public routes independent of the site language cookie", () => {
  expect(forwardedLocale("/products", "site_lang=es")).toBe("en");
  expect(forwardedLocale("/contact", "site_lang=zh")).toBe("en");
});

test("proxy matcher includes public routes and excludes internal or asset routes", () => {
  expect(config.matcher).toEqual(["/((?!api|_next/static|_next/image|favicon.ico).*)"]);
});
