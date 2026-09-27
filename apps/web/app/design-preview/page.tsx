import type { Metadata } from "next";
import { productByModel } from "@/lib/collections";
import CollectionPreview from "./CollectionPreview";

export const metadata: Metadata = {
  title: "Collection concept — Design preview",
  description: "A private-label collection design concept for DIYASI.",
  robots: { index: false, follow: false },
};

export default function DesignPreviewPage() {
  return <CollectionPreview products={["LS006", "DYS201", "DYS323", "DYS219", "LS005", "DYS314", "DYS224", "M001"].map(productByModel)} />;
}
