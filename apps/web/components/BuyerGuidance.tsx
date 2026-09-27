import Link from "next/link";
import type { BuyingGuide } from "@/lib/buyer-guidance";

export default function BuyerGuidance({ guide }: { guide: BuyingGuide }) {
  return (
    <section id="buying-guidance" className="d-buyer-guidance">
      <div>
        <p className="d-eyebrow">Before you request samples</p>
        <h2>{guide.heading}</h2>
        <p>{guide.intro}</p>
      </div>
      <div>
        <ul>{guide.checks.map((check) => <li key={check}>{check}</li>)}</ul>
        <nav aria-label="Related buying guidance">
          {guide.links.map((link) => <Link key={link.href} className="d-text-link" href={link.href}>{link.label} ↗</Link>)}
        </nav>
      </div>
    </section>
  );
}
