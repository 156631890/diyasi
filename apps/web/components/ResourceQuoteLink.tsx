"use client";

import Link from "next/link";

import { buildResourceQuoteHref, trackConversionEvent } from "@/lib/conversion-events";

type ResourceQuoteLinkProps = {
  resourceSlug: string;
};

export default function ResourceQuoteLink({ resourceSlug }: ResourceQuoteLinkProps) {
  return (
    <Link
      href={buildResourceQuoteHref(resourceSlug)}
      className="btn btn-primary"
      onClick={() => trackConversionEvent("resource_to_quote")}
    >
      Start a Project
    </Link>
  );
}
