"use client";

import QuoteFlow from "@/components/QuoteFlow";

type ProductInquiryFormProps = {
  productName: string;
  category: string;
};

export default function ProductInquiryForm({ productName, category }: ProductInquiryFormProps) {
  return <QuoteFlow page="product detail" source="product" product={productName} category={category} />;
}
