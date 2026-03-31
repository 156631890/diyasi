"use client";

import Link from "next/link";

type BuyNowButtonProps = {
  title: string;
  unitAmountUsd: number;
  quantity?: number;
  className?: string;
  label?: string;
};

export default function BuyNowButton({
  title,
  unitAmountUsd,
  quantity = 1,
  className = "btn btn-primary",
  label = "Continue to Payment"
}: BuyNowButtonProps) {
  const href = `/payments?product_title=${encodeURIComponent(title)}&product_amount=${encodeURIComponent(
    String(unitAmountUsd)
  )}&product_qty=${encodeURIComponent(String(quantity))}`;

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
