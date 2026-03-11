type PageShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <main className="container-shell py-10">
      <section className="card mb-6 p-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-[#7d4f3e]">{subtitle}</p>
      </section>
      <section className="card p-6">{children}</section>
    </main>
  );
}
