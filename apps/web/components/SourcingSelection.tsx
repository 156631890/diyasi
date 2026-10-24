import Link from "next/link";
import { productByModel } from "@/lib/collections";
import type { SourcingSelection as Selection } from "@/lib/sourcing-selections";

export default function SourcingSelection({ selection }: { selection: Selection }) {
  return (
    <section className="d-sourcing-selection" aria-labelledby="sourcing-selection-title">
      <h2 id="sourcing-selection-title">{selection.heading}</h2>
      <p>{selection.intro}</p>
      <div className="d-table-scroll" tabIndex={0} role="region" aria-label="Catalogue sample selection comparison">
        <table>
          <thead><tr><th scope="col">Model and specifications</th><th scope="col">Fit and rise</th><th scope="col">What to approve</th></tr></thead>
          <tbody>
            {selection.models.map(({ model, check }) => {
              const product = productByModel(model);
              return <tr key={model}>
                <th scope="row"><Link href={`/products/${product.slug}`}>{model}: {product.product_name}</Link></th>
                <td>{product.fit}<br />{product.rise}</td>
                <td>{check}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <p>{selection.note}</p>
      <Link href="/contact#quote-form" className="d-button">Request Samples &amp; a Wholesale Quote ↗</Link>
    </section>
  );
}
