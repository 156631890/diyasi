export default function ContentFaq({ title = "Buyer questions", items }: { title?: string; items: readonly (readonly string[])[] }) {
  return (
    <section className="d-section d-service-faq">
      <h2>{title}</h2>
      <div className="d-accordions">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
