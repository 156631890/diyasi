import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { servicePages } from "@/lib/service-pages";
import { buildMetadata } from "@/lib/seo";
const page = servicePages["oem-odm"];
export const metadata: Metadata = buildMetadata({
  title: page.metaTitle,
  description: page.description,
  path: "/oem-odm",
});
export default function Page() {
  return <ServicePage page={page} path="/oem-odm" />;
}
