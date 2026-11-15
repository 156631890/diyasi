import { afterEach, expect, test, vi } from "vitest";
import { safeAnalyticsContext } from "@/lib/analytics";
import { inquiryPageContext } from "@/lib/inquiry-context";
import { indexableContent } from "@/lib/indexable-content";
import { isPublicPath, getPublicProduct } from "@/lib/public-routing";
import { indexableProducts } from "@/lib/indexable-products";
import sitemap from "@/app/sitemap";
import { buildMetadata } from "@/lib/seo";

afterEach(() => vi.unstubAllGlobals());
test("client manifest covers the exact public routing and product contract", () => {
  for (const path of indexableContent.paths) expect(isPublicPath(path)).toBe(true);
  for (const product of indexableProducts) expect(getPublicProduct(product.id)).toMatchObject({id:product.id,title:product.title,route:product.route});
  expect(isPublicPath('/admin')).toBe(false);
  expect(isPublicPath('/contact/person@example.com')).toBe(false);
});
test.each(['es','fr','de','it'])("%s sourcing traffic retains its actual language", locale => {
  expect(safeAnalyticsContext(`/${locale}/manufacturers/private-label-underwear-manufacturer`)?.language).toBe(locale);
});
test("quotation attribution accepts only public source paths", () => {
  const path='/manufacturers/private-label-underwear-manufacturer';
  expect(safeAnalyticsContext('/contact', `?from=${encodeURIComponent(path)}`)?.source_path).toBe(path);
  for (const value of ['/contact/person@example.com','https://example.com/','/admin','/contact?email=private@example.com']) {
    expect(safeAnalyticsContext('/contact', `?from=${encodeURIComponent(value)}`)).not.toHaveProperty('source_path');
  }
  vi.stubGlobal('window', {location:{href:`https://www.yiwudiyasidress.com/contact?from=${encodeURIComponent(path)}&productId=private@example.com`}});
  vi.stubGlobal('document', {referrer:'https://www.yiwudiyasidress.com/contact/private@example.com'});
  expect(inquiryPageContext()).toMatchObject({related_path:path,product_id:''});
});
test("sitemap describes original product images and actual alternate pages", () => {
  const entries=sitemap();
  const product=entries.find(p=>p.url.endsWith('/products/everyday-cotton-boyshort-dys214'))!;
  expect(product.images?.length).toBeGreaterThan(0);
  expect(product.images?.every(src=>src.startsWith('https://www.yiwudiyasidress.com/media/catalog/'))).toBe(true);
  const french=entries.find(p=>p.url.endsWith('/fr/manufacturers/private-label-underwear-manufacturer'))!;
  expect(french.alternates?.languages?.fr).toBe(french.url);
  expect(french.alternates?.languages?.en).toBe('https://www.yiwudiyasidress.com/manufacturers/private-label-underwear-manufacturer');
  expect(entries.some(p=>/\?|admin|checkout/.test(p.url))).toBe(false);
});
test("social previews retain language and the chosen collection image", () => {
  const meta=buildMetadata({title:'Test',description:'Test',path:'/fr/manufacturers/private-label-underwear-manufacturer',image:{url:'/media/catalog/photo.jpg',alt:'Style photograph'}});
  expect(meta.openGraph).toMatchObject({locale:'fr_FR',images:[{url:'https://www.yiwudiyasidress.com/media/catalog/photo.jpg',alt:'Style photograph'}]});
});
