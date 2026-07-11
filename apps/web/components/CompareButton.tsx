"use client";

import { useEffect, useState } from "react";

type CompareButtonProps = {
  productId: string;
  addLabel: string;
  removeLabel: string;
  limitMessage: string;
};

export default function CompareButton({
  productId,
  addLabel,
  removeLabel,
  limitMessage
}: CompareButtonProps) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Rendering only after hydration prevents a localStorage-dependent SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem("diyasi_compare_ids");
      if (saved) {
        setCompareIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load comparison list", e);
    }
  }, []);

  const inCompare = compareIds.includes(productId);

  function onClick() {
    let next: string[];
    if (inCompare) {
      next = compareIds.filter((id) => id !== productId);
    } else {
      if (compareIds.length >= 4) {
        alert(limitMessage);
        return;
      }
      next = [...compareIds, productId];
    }
    setCompareIds(next);
    try {
      localStorage.setItem("diyasi_compare_ids", JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save comparison list", e);
    }
  }

  if (!mounted) {
    return (
      <button className="btn btn-soft flex-1 opacity-50 cursor-not-allowed" disabled>
        {addLabel}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn flex-1 transition ${
        inCompare
          ? "bg-[#fff2e8] text-[#df7c44] border border-[#df7c44]/40 hover:bg-[#ffe6d3]"
          : "btn-soft"
      }`}
    >
      {inCompare ? removeLabel : addLabel}
    </button>
  );
}
