import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LocalizedLandingPage from "@/components/LocalizedLandingPage";
import { getLocalizedPage, spanishStaticParams } from "@/lib/localized-pages";
import { buildMetadata } from "@/lib/seo";

type SpanishPageProps = {
  params: Promise<{ slug: string[] }>;
};

function pathFromSlug(slug: string[]): string {
  return `/es/${slug.join("/")}`;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string[] }> {
  return spanishStaticParams;
}

export async function generateMetadata({ params }: SpanishPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalizedPage(pathFromSlug(slug));
  if (!page) {
    return {};
  }

  return buildMetadata({ title: page.title, description: page.description, path: page.path });
}

export default async function SpanishLandingPage({ params }: SpanishPageProps) {
  const { slug } = await params;
  const page = getLocalizedPage(pathFromSlug(slug));
  if (!page) {
    notFound();
  }

  return <LocalizedLandingPage page={page} />;
}
