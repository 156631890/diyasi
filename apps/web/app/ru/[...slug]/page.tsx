import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LocalizedLandingPage from "@/components/LocalizedLandingPage";
import { getLocalizedPage, allLocalizedPages } from "@/lib/localized-pages";
import { buildMetadata } from "@/lib/seo";

type RussianPageProps = {
  params: Promise<{ slug: string[] }>;
};

function pathFromSlug(slug: string[]): string {
  return `/ru/${slug.join("/")}`;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string[] }> {
  return Object.keys(allLocalizedPages).filter(path => path.startsWith("/ru/")).map(path => ({slug:path.slice(4).split("/")}));
}

export async function generateMetadata({ params }: RussianPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalizedPage(pathFromSlug(slug));
  if (!page) {
    return {};
  }

  return buildMetadata({ title: page.title, description: page.description, path: page.path });
}

export default async function RussianLandingPage({ params }: RussianPageProps) {
  const { slug } = await params;
  const page = getLocalizedPage(pathFromSlug(slug));
  if (!page) {
    notFound();
  }

  return <LocalizedLandingPage page={page} />;
}
