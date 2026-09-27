import type { Metadata } from "next";
import CatalogPage, {
  catalogMetadata,
  type CatalogSearch,
} from "@/components/CatalogPage";
type Props = { searchParams: Promise<CatalogSearch> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return catalogMetadata(await searchParams);
}
export default async function ProductsPage({ searchParams }: Props) {
  return <CatalogPage search={await searchParams} />;
}
