"use client";

import Link from "next/link";

type BuyNowButtonProps = {
  title: string;
  unitAmountUsd: number;
  quantity?: number;
  shippingFeeUsd?: number;
  className?: string;
  label?: string;
};

export default function BuyNowButton({
  title,
  unitAmountUsd,
  quantity = 1,
  shippingFeeUsd = 0,
  className = "btn btn-primary",
  label = "Continue to Payment"
}: BuyNowButtonProps) {
  const href = `/payments?product_title=${encodeURIComponent(title)}&product_amount=${encodeURIComponent(String(unitAmountUsd))}&product_qty=${encodeURIComponent(String(quantity))}&product_shipping_usd=${encodeURIComponent(String(shippingFeeUsd))}`;

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
