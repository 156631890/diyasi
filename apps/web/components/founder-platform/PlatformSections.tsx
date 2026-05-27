import Link from "next/link";
import type { AcademyCard, ComparisonRow, ProofModule, StarterKit, WorkflowStep } from "@/lib/founder-platform";

type Cta = {
  href: string;
  label: string;
  tone?: "dark" | "light";
};

export function PlatformHero({
  label,
  title,
  body,
  image,
  imageAlt,
  ctas = [],
  reverse = false
}: {
  label?: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  ctas?: Cta[];
  reverse?: boolean;
}) {
  return (
    <section className={`platform-hero ${reverse ? "platform-hero-reverse" : ""}`}>
      <div className="platform-hero-copy">
        {label ? <p className="platform-label">{label}</p> : null}
        <h1>{title}</h1>
        <p>{body}</p>
        {ctas.length ? (
          <div className="platform-actions">
            {ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className={`platform-btn platform-btn-${cta.tone || "dark"}`}>
                {cta.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {image ? (
        <div className="platform-hero-media">
          <img src={image} alt={imageAlt || title} />
        </div>
      ) : null}
    </section>
  );
}

export function SectionHeader({ label, title, body }: { label?: string; title: string; body?: string }) {
  return (
    <div className="platform-section-head">
      {label ? <p className="platform-label">{label}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

export function WorkflowGrid({ items }: { items: WorkflowStep[] }) {
  return (
    <div className="platform-grid platform-grid-4">
      {items.map((item, index) => (
        <article key={item.title} className="platform-card">
          <span className="platform-index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function StarterKitGrid({ kits }: { kits: StarterKit[] }) {
  return (
    <div className="platform-grid platform-grid-4">
      {kits.map((kit) => (
        <article key={kit.slug} className="platform-card platform-image-card">
          <img src={kit.image} alt={`${kit.name} starter kit`} />
          <div>
            <p className="platform-card-label">{kit.audience}</p>
            <h3>{kit.name}</h3>
            <p>{kit.description}</p>
            <ul>
              {kit.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AcademyGrid({ cards }: { cards: AcademyCard[] }) {
  return (
    <div className="platform-grid platform-grid-4">
      {cards.map((card) => (
        <article key={card.title} className="platform-card platform-image-card">
          <img src={card.image} alt={card.title} />
          <div>
            <p className="platform-card-label">{card.category}</p>
            <h3>{card.title}</h3>
            <p>{card.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProofGrid({ items }: { items: ProofModule[] }) {
  return (
    <div className="platform-grid platform-grid-proof">
      {items.map((item) => (
        <article key={item.title} className="platform-card platform-image-card">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="platform-table-wrap">
      <table className="platform-table">
        <thead>
          <tr>
            <th>Traditional Factory</th>
            <th>Diyasi Founder System</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.factory}>
              <td>{row.factory}</td>
              <td>{row.founderSystem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ImageTextBand({
  label,
  title,
  body,
  image,
  imageAlt,
  reverse = false
}: {
  label?: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <section className={`platform-band ${reverse ? "platform-band-reverse" : ""}`}>
      <div>
        {label ? <p className="platform-label">{label}</p> : null}
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <img src={image} alt={imageAlt} />
    </section>
  );
}

export function CtaBand({
  title,
  body,
  primaryHref = "/contact",
  primaryLabel = "Get Starter Kit Recommendation",
  secondaryHref,
  secondaryLabel
}: {
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="platform-cta">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="platform-actions">
        <Link href={primaryHref} className="platform-btn platform-btn-light">
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link href={secondaryHref} className="platform-btn platform-btn-outline">
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
