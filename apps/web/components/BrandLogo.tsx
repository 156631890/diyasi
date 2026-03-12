import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
  href?: string;
  className?: string;
};

export default function BrandLogo({ compact = false, href = "/", className = "" }: BrandLogoProps) {
  const content = (
    <span className={`brand-logo ${compact ? "brand-logo-compact" : ""} ${className}`.trim()}>
      <img
        src="/diyasi-logo.svg"
        alt="DiYaSi Underwear"
        className={compact ? "brand-logo-image brand-logo-image-compact" : "brand-logo-image"}
      />
    </span>
  );

  return href ? (
    <Link href={href} className="brand-logo-link" aria-label="DiYaSi Underwear">
      {content}
    </Link>
  ) : (
    content
  );
}
