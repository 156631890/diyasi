import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog-source";
import CompareButton from "./CompareButton";
import { SampleButton } from "./SampleList";
export default function ProductCard({
  product,
  priority = false,
}: {
  product: CatalogProduct;
  priority?: boolean;
}) {
  return (
    <article className="d-product-card">
      <Link
        href={`/products/${product.slug}`}
        className="d-product-photo"
        aria-label={`View ${product.product_name}`}
      >
        <Image
          src={product.image_url}
          alt={`${product.product_name}, style ${product.model_number}, original product image`}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
          priority={priority}
        />
        {product.gallery_images[1] && (
          <Image
            className="d-product-hover"
            src={product.gallery_images[1]}
            alt=""
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
          />
        )}
      </Link>
      <div className="d-product-meta">
        <span>{product.material_label}</span>
        <span>{product.model_number}</span>
      </div>
      <h3>
        <Link href={`/products/${product.slug}`}>{product.product_name}</Link>
      </h3>
      <p className="d-product-caption">
        {product.rise} <span aria-hidden="true">·</span> Private label available
      </p>
      <div className="d-product-actions"><SampleButton productId={product.slug} /><CompareButton productId={product.slug} /></div>
    </article>
  );
}
