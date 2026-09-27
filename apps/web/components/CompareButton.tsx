"use client";
import { useComparison } from "./ProductComparison";
export default function CompareButton({ productId }: { productId: string }) {
  const { ids, toggle } = useComparison();
  const selected = ids.includes(productId);
  return (
    <button
      type="button"
      className="d-compare-add"
      aria-pressed={selected}
      onClick={() => toggle(productId)}
    >
      {selected ? "✓ Added to comparison" : "+ Compare this style"}
    </button>
  );
}
