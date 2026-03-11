import Link from "next/link";

type Props = {
  searchParams: {
    ref?: string;
    title?: string;
    amount?: string;
    qty?: string;
  };
};

export default function CheckoutMockPage({ searchParams }: Props) {
  const ref = searchParams.ref || "ORD-MOCK";
  const title = searchParams.title || "Service Order";
  const amount = Number(searchParams.amount || "0");
  const qty = Number(searchParams.qty || "1");
  const total = Math.max(0, amount * Math.max(1, qty));

  return (
    <main className="container-shell py-16">
      <section className="card max-w-2xl p-8">
        <p className="kicker">Payment Framework</p>
        <h1 className="heading-font mt-2 text-4xl font-semibold text-[#6a3524]">Mock Checkout</h1>
        <p className="mt-3 text-[#51627d]">
          Third-party payment is not connected yet. This page is the independent-site checkout framework.
        </p>

        <div className="mt-6 space-y-2 rounded-2xl border border-[rgba(191,144,118,0.26)] p-4 text-sm text-[#7d4f3e]">
          <p>
            <strong>Order Ref:</strong> {ref}
          </p>
          <p>
            <strong>Item:</strong> {title}
          </p>
          <p>
            <strong>Unit:</strong> ${amount.toFixed(2)}
          </p>
          <p>
            <strong>Qty:</strong> {qty}
          </p>
          <p>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/checkout/success?ref=${encodeURIComponent(ref)}`} className="btn btn-primary">
            Simulate Paid
          </Link>
          <Link href={`/checkout/cancel?ref=${encodeURIComponent(ref)}`} className="btn btn-soft">
            Simulate Cancel
          </Link>
        </div>
      </section>
    </main>
  );
}
