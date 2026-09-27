import Image from "next/image";
import Link from "next/link";
import { newsDate, type NewsArticle } from "@/lib/news-articles";

export default function NewsCard({ article }: { article: NewsArticle }) {
  const href = `/news/${article.slug}`;
  return (
    <article className="d-news-card">
      <Link href={href} className="d-news-image" aria-label={article.title}>
        <Image
          src={article.coverImage}
          alt={article.coverAlt}
          fill
          sizes="(max-width:600px) 88vw, (max-width:1000px) 44vw, 29vw"
        />
      </Link>
      <div className="d-news-meta">
        <span>{article.category}</span>
        <time dateTime={article.publishedAt}>{newsDate(article.publishedAt)}</time>
      </div>
      <h3><Link href={href}>{article.title}</Link></h3>
      <p>{article.description}</p>
      <Link href={href} className="d-text-link">Read the story ↗</Link>
    </article>
  );
}
