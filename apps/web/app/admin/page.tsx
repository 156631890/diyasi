import AdminConsole from "@/components/AdminConsole";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false
  }
};

const copy: Record<SiteLang, { kicker: string; title: string; desc: string }> = {
  en: {
    kicker: "Admin",
    title: "Digital operations control center",
    desc: "Manage products, categories, blog, Gemini creatives, leads, outreach, and order framework in one panel."
  },
  zh: {
    kicker: "后台",
    title: "数字化运营控制中心",
    desc: "统一管理产品、分类、博客、Gemini 素材、线索触达与订单框架。"
  },
  es: {
    kicker: "Admin",
    title: "Centro de operaciones digitales",
    desc: "Gestiona productos, categorias, blog, creativos Gemini, leads y pedidos en un solo panel."
  }
};

function isAuthorized(): boolean {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const authorization = headers().get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  const decoded = Buffer.from(authorization.slice("Basic ".length), "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  const suppliedUsername = separator >= 0 ? decoded.slice(0, separator) : "";
  const suppliedPassword = separator >= 0 ? decoded.slice(separator + 1) : "";

  return suppliedUsername === username && suppliedPassword === password;
}

export default function AdminPage() {
  if (!isAuthorized()) {
    notFound();
  }

  const lang = getServerLang();
  const t = copy[lang];
  return (
    <main>
      <section className="container-shell py-8">
        <div className="hero-panel p-6 md:p-8">
          <p className="kicker">{t.kicker}</p>
          <h1 className="heading-font mt-2 text-5xl font-semibold text-[#122744]">{t.title}</h1>
          <p className="mt-3 max-w-3xl text-[#51627d]">{t.desc}</p>
        </div>
      </section>
      <AdminConsole lang={lang} />
    </main>
  );
}
