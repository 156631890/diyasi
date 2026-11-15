import { expect, test } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";
import { allLocalizedPages } from "@/lib/localized-pages";
import { alternatesFor, localeHref, localeSwitchHref, spanishRoutes, russianRoutes } from "@/lib/locale-routes";
import { indexableContent } from "@/lib/indexable-content";
import { safeAnalyticsContext } from "@/lib/analytics";
import { validateInquiry } from "@/lib/inquiry-validation";
import { buildMetadata } from "@/lib/seo";
import { catalogProducts } from "@/lib/catalog-source";
import { localizedFabric } from "@/lib/catalog-locales";

test("every published Spanish and Russian core route exists and reciprocal alternates agree", () => {
  for (const [locale, routes] of [["es",spanishRoutes],["ru",russianRoutes]] as const) {
    expect(Object.keys(routes)).toHaveLength(16);
    for (const [english,path] of Object.entries(routes)) {
      expect(allLocalizedPages[path]?.englishPath).toBe(english);
      expect(indexableContent.paths).toContain(path);
      expect(localeSwitchHref(locale, english)).toBe(path);
      if (english === "/low-moq") {
        expect(alternatesFor(path)).toBeUndefined();
        expect(localeSwitchHref("en",path)).toBe("/products");
      } else {
        const alternates = alternatesFor(path)!;
        expect(alternates.en).toBe(english);
        for (const target of Object.values(alternates)) {
          expect(indexableContent.paths).toContain(target);
          expect(alternatesFor(target)).toEqual(alternates);
        }
      }
    }
  }
  expect(localeHref("ru","/about")).toBeUndefined();
  expect(localeSwitchHref("en","/ru/not-a-page")).toBeUndefined();
});
test("Russian HTML, metadata and analytics derive language from the public URL", () => {
  const response = proxy(new NextRequest("https://www.yiwudiyasidress.com/ru/contact", {headers:{cookie:"site_lang=es"}}));
  expect(response.headers.get("x-middleware-request-x-site-locale")).toBe("ru");
  expect(buildMetadata({title:"Контакт",description:"Запрос",path:"/ru/contact"}).openGraph).toMatchObject({locale:"ru_RU"});
  expect(safeAnalyticsContext("/ru/contact","?from=/ru/products")).toMatchObject({language:"ru",source_path:"/ru/products"});
});
test("inquiry language cannot be spoofed and Russian product selection survives validation", () => {
  const product=catalogProducts[0].slug;
  const {details} = validateInquiry({name:"Покупатель",email:"buyer@example.com",message:"Запрос образцов для новой коллекции",source_path:"/ru/contact",related_path:"/ru/products",product_ids:[product],sample_quantities:{[product]:"120"},locale:"es"});
  expect(details).toMatchObject({locale:"ru",related_path:"/ru/products",product_ids:[product],sample_quantities:{[product]:"120"}});
});
test("catalogue translations preserve every model's component percentages", () => {
  for (const product of catalogProducts) for (const locale of ["ru","es"] as const) {
    expect(localizedFabric(product.fabric,locale).match(/\d+%/g)).toEqual(product.fabric.match(/\d+%/g));
    expect(localizedFabric(product.fabric,locale)).not.toMatch(/\b(?:body|gusset|spandex|cotton|polyamide|polyester)\b/i);
  }
});
