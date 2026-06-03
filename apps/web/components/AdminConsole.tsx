"use client";

import { API_BASE } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

type Tab = "products" | "blog" | "media" | "orders" | "growth";

type Notice = {
  type: "ok" | "error";
  text: string;
};

type ProductForm = {
  product_id: string;
  product_name: string;
  category: string;
  fabric: string;
  color: string;
  size: string;
  moq: string;
  sample_time: string;
  production_time: string;
  description: string;
};

type ProductUpdateForm = Omit<ProductForm, "product_id"> & {
  image_url: string;
};

type ArticleForm = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  is_published: boolean;
};

type MediaForm = {
  asset_type: string;
  title: string;
  aspect_ratio: string;
  prompt: string;
};

type AdminConsoleProps = {
  lang: SiteLang;
};

type OrderRow = {
  ref: string;
  title: string;
  status: string;
  total: number;
  unit: number;
  quantity: number;
  notes: string;
  customerName: string;
  customerEmail: string;
  source: string;
  updatedAt: string;
  createdAt: string;
};

const ORDER_STATUS_OPTIONS = ["pending", "paid", "cancelled", "failed", "refunded", "in_progress", "production", "shipped", "delivered"] as const;

const tabs: Record<SiteLang, Record<Tab, string>> = {
  en: {
    products: "Products",
    blog: "Blog",
    media: "Media",
    orders: "Orders",
    growth: "Growth"
  },
  zh: {
    products: "产品",
    blog: "博客",
    media: "素材",
    orders: "订单",
    growth: "增长"
  },
  es: {
    products: "Productos",
    blog: "Blog",
    media: "Media",
    orders: "Pedidos",
    growth: "Crecimiento"
  }
};

const emptyProduct: ProductForm = {
  product_id: "",
  product_name: "",
  category: "",
  fabric: "",
  color: "",
  size: "",
  moq: "",
  sample_time: "",
  production_time: "",
  description: ""
};

const emptyProductUpdate: ProductUpdateForm = {
  product_name: "",
  category: "",
  fabric: "",
  color: "",
  size: "",
  moq: "",
  sample_time: "",
  production_time: "",
  description: "",
  image_url: ""
};

const emptyArticle: ArticleForm = {
  title: "",
  slug: "",
  category: "manufacturer",
  excerpt: "",
  body: "",
  is_published: true
};

const emptyMedia: MediaForm = {
  asset_type: "poster",
  title: "",
  aspect_ratio: "16:9",
  prompt: ""
};

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function orderStatusClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === "paid") return "bg-emerald-100 text-emerald-700";
  if (normalized === "pending") return "bg-amber-100 text-amber-700";
  if (normalized === "cancelled" || normalized === "failed") return "bg-rose-100 text-rose-700";
  if (normalized === "refunded") return "bg-slate-200 text-slate-700";
  if (normalized === "shipped" || normalized === "delivered") return "bg-sky-100 text-sky-700";
  if (normalized === "production" || normalized === "in_progress") return "bg-indigo-100 text-indigo-700";
  return "bg-slate-100 text-slate-700";
}

function asError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers || {});
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`;
    try {
      const json = (await response.json()) as { detail?: string };
      detail = json.detail || detail;
    } catch {
      const text = await response.text();
      if (text.trim()) {
        detail = text;
      }
    }
    throw new Error(detail);
  }
  const text = await response.text();
  return (text ? (JSON.parse(text) as T) : (undefined as T));
}

function parseJsonArray<T>(value: string): T[] {
  const parsed = JSON.parse(value) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("Expected JSON array.");
  }
  return parsed as T[];
}

export default function AdminConsole({ lang }: AdminConsoleProps) {
  const t = tabs[lang] || tabs.en;
  const [active, setActive] = useState<Tab>("products");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Array<Record<string, unknown>>>([]);
  const [categories, setCategories] = useState<Array<Record<string, unknown>>>([]);
  const [articles, setArticles] = useState<Array<Record<string, unknown>>>([]);
  const [media, setMedia] = useState<Array<Record<string, unknown>>>([]);
  const [orders, setOrders] = useState<Array<Record<string, unknown>>>([]);
  const [leads, setLeads] = useState<Array<Record<string, unknown>>>([]);
  const [inquiries, setInquiries] = useState<Array<Record<string, unknown>>>([]);
  const [outreach, setOutreach] = useState<Array<Record<string, unknown>>>([]);
  const [analytics, setAnalytics] = useState<Record<string, unknown>>({});

  const [productForm, setProductForm] = useState<ProductForm>(emptyProduct);
  const [productImportText, setProductImportText] = useState("[]");
  const [productUpdateId, setProductUpdateId] = useState("");
  const [productUpdate, setProductUpdate] = useState<ProductUpdateForm>(emptyProductUpdate);
  const [imagePrompt, setImagePrompt] = useState("");
  const [renameCategory, setRenameCategory] = useState({ old_category: "", new_category: "" });
  const [deleteCategory, setDeleteCategory] = useState({ category: "", fallback_category: "uncategorized" });

  const [articleCreate, setArticleCreate] = useState<ArticleForm>(emptyArticle);
  const [articleImportText, setArticleImportText] = useState("[]");
  const [articleSlug, setArticleSlug] = useState("");
  const [articleEdit, setArticleEdit] = useState<ArticleForm>(emptyArticle);

  const [mediaCreate, setMediaCreate] = useState<MediaForm>(emptyMedia);
  const [mediaEditId, setMediaEditId] = useState("");
  const [mediaEdit, setMediaEdit] = useState({
    asset_type: "poster",
    title: "",
    is_featured: false,
    is_active: true,
    sort_order: 0
  });
  const [brandPack, setBrandPack] = useState({
    brand_name: "YiWu DiYaSi Dress CO., LTD",
    brand_story:
      "Founded on the belief that sustainability and high-quality manufacturing go hand in hand, YiWu DiYaSi Dress CO., LTD has spent over 23 years helping brands bring their dream underwear lines to life."
  });

  const [orderRef, setOrderRef] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [orderStatusInput, setOrderStatusInput] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [leadId, setLeadId] = useState("");
  const [leadStatus, setLeadStatus] = useState("new");
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");

  const summary = useMemo(
    () => ({
      products: products.length,
      categories: categories.length,
      articles: articles.length,
      media: media.length,
      orders: orders.length,
      leads: leads.length,
      inquiries: inquiries.length,
      outreach: outreach.length
    }),
    [products, categories, articles, media, orders, leads, inquiries, outreach]
  );

  const recentOrders = useMemo<OrderRow[]>(() => {
    const normalized = orders.map((entry) => {
      const row = entry as Record<string, unknown>;
      return {
        ref: asString(row.order_ref),
        title: asString(row.title),
        status: asString(row.status) || "pending",
        total: asNumber(row.total_amount_usd),
        unit: asNumber(row.unit_amount_usd),
        quantity: Math.max(1, Math.floor(asNumber(row.quantity) || 1)),
        notes: asString(row.notes),
        customerName: asString(row.customer_name),
        customerEmail: asString(row.customer_email),
        source: asString(row.source),
        updatedAt: asString(row.updated_at),
        createdAt: asString(row.created_at)
      };
    });

    return normalized
      .sort((left, right) => {
        const leftStamp = Date.parse(left.updatedAt || left.createdAt || "") || 0;
        const rightStamp = Date.parse(right.updatedAt || right.createdAt || "") || 0;
        return rightStamp - leftStamp;
      })
      .slice(0, 12);
  }, [orders]);

  async function refreshAll(): Promise<void> {
    const [p, c, a, m, o, l, i, out, an] = await Promise.all([
      request<Array<Record<string, unknown>>>("/products/"),
      request<Array<Record<string, unknown>>>("/products/categories"),
      request<Array<Record<string, unknown>>>("/seo/articles?include_draft=true"),
      request<Array<Record<string, unknown>>>("/media/assets?limit=200"),
      request<Array<Record<string, unknown>>>("/orders/"),
      request<Array<Record<string, unknown>>>("/leads/"),
      request<Array<Record<string, unknown>>>("/inquiries/"),
      request<Array<Record<string, unknown>>>("/outreach/events"),
      request<Record<string, unknown>>("/analytics/overview")
    ]);
    setProducts(p);
    setCategories(c);
    setArticles(a);
    setMedia(m);
    setOrders(o);
    setLeads(l);
    setInquiries(i);
    setOutreach(out);
    setAnalytics(an);
  }

  async function run(message: string, fn: () => Promise<void>): Promise<void> {
    try {
      await fn();
      await refreshAll();
      setNotice({ type: "ok", text: message });
    } catch (error) {
      setNotice({ type: "error", text: asError(error) });
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        await refreshAll();
      } catch (error) {
        setNotice({ type: "error", text: asError(error) });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function applyProductFile(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    void (async () => {
      try {
        const text = await file.text();
        setProductImportText(text);
        setNotice({ type: "ok", text: `Loaded ${file.name}` });
      } catch (error) {
        setNotice({ type: "error", text: asError(error) });
      } finally {
        event.target.value = "";
      }
    })();
  }

  function applyArticleFile(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    void (async () => {
      try {
        const text = await file.text();
        setArticleImportText(text);
        setNotice({ type: "ok", text: `Loaded ${file.name}` });
      } catch (error) {
        setNotice({ type: "error", text: asError(error) });
      } finally {
        event.target.value = "";
      }
    })();
  }

  return (
    <section className="container-shell pb-16">
      <div className="card p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(t) as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                active === tab ? "border-[#102949] bg-[#102949] text-white" : "border-slate-300 text-slate-700"
              }`}
            >
              {t[tab]}
            </button>
          ))}
          <button className="btn btn-soft ml-auto" type="button" onClick={() => void run("Dashboard refreshed.", refreshAll)}>
            Refresh All
          </button>
        </div>

        {notice ? (
          <p
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              notice.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {notice.text}
          </p>
        ) : null}
        {loading ? <p className="mt-4 text-sm text-slate-500">Loading...</p> : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(summary).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">{key}</p>
              <p className="heading-font mt-2 text-3xl font-semibold text-[#102949]">{value}</p>
            </div>
          ))}
        </div>

        {active === "products" ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <form className="space-y-3 rounded-2xl border border-slate-200 p-5" onSubmit={(event) => {
              event.preventDefault();
              void run("Product created.", async () => {
                await request("/products/", { method: "POST", body: JSON.stringify(productForm) });
                setProductForm(emptyProduct);
              });
            }}>
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Create Product</h2>
              <input className="input" placeholder="product_id" value={productForm.product_id} onChange={(e) => setProductForm({ ...productForm, product_id: e.target.value })} required />
              <input className="input" placeholder="product_name" value={productForm.product_name} onChange={(e) => setProductForm({ ...productForm, product_name: e.target.value })} required />
              <input className="input" placeholder="category" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required />
              <textarea className="input min-h-20" placeholder="description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
              <button className="btn btn-primary" type="submit">Create</button>
            </form>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-5">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Bulk Import Products</h2>
              <input type="file" accept=".json" onChange={applyProductFile} />
              <textarea className="input min-h-40 font-mono text-xs" value={productImportText} onChange={(e) => setProductImportText(e.target.value)} />
              <button className="btn btn-primary" type="button" onClick={() => {
                void run("Products imported.", async () => {
                  const payload = parseJsonArray<Record<string, unknown>>(productImportText);
                  await request("/products/import-list", { method: "POST", body: JSON.stringify(payload) });
                });
              }}>Import List</button>
            </div>

            <form className="space-y-3 rounded-2xl border border-slate-200 p-5" onSubmit={(event) => {
              event.preventDefault();
              if (!productUpdateId) {
                setNotice({ type: "error", text: "product_id required for update." });
                return;
              }
              void run("Product updated.", async () => {
                await request(`/products/${encodeURIComponent(productUpdateId)}`, { method: "PATCH", body: JSON.stringify(productUpdate) });
              });
            }}>
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Update/Delete/Generate Image</h2>
              <input className="input" placeholder="product_id" value={productUpdateId} onChange={(e) => setProductUpdateId(e.target.value)} />
              <input className="input" placeholder="new product_name" value={productUpdate.product_name} onChange={(e) => setProductUpdate({ ...productUpdate, product_name: e.target.value })} />
              <input className="input" placeholder="new category" value={productUpdate.category} onChange={(e) => setProductUpdate({ ...productUpdate, category: e.target.value })} />
              <textarea className="input min-h-20" placeholder="new description" value={productUpdate.description} onChange={(e) => setProductUpdate({ ...productUpdate, description: e.target.value })} />
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary" type="submit">Update</button>
                <button className="btn btn-soft" type="button" onClick={() => {
                  if (!productUpdateId) {
                    setNotice({ type: "error", text: "product_id required for delete." });
                    return;
                  }
                  void run("Product deleted.", async () => {
                    await request(`/products/${encodeURIComponent(productUpdateId)}`, { method: "DELETE" });
                  });
                }}>Delete</button>
              </div>
              <input className="input" placeholder="optional image prompt" value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />
              <button className="btn btn-primary" type="button" onClick={() => {
                if (!productUpdateId) {
                  setNotice({ type: "error", text: "product_id required for image generation." });
                  return;
                }
                void run("Product image generated.", async () => {
                  await request(`/products/${encodeURIComponent(productUpdateId)}/generate-image`, { method: "POST", body: JSON.stringify(imagePrompt ? { prompt: imagePrompt } : {}) });
                });
              }}>Generate Image</button>
            </form>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-5">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Category Management</h2>
              <p className="text-sm text-slate-600">Current categories: {categories.map((c) => String(c.category || "")).join(", ")}</p>
              <input className="input" placeholder="old_category" value={renameCategory.old_category} onChange={(e) => setRenameCategory({ ...renameCategory, old_category: e.target.value })} />
              <input className="input" placeholder="new_category" value={renameCategory.new_category} onChange={(e) => setRenameCategory({ ...renameCategory, new_category: e.target.value })} />
              <button className="btn btn-primary" type="button" onClick={() => void run("Category renamed.", async () => {
                await request("/products/categories/rename", { method: "POST", body: JSON.stringify(renameCategory) });
              })}>Rename</button>
              <input className="input" placeholder="delete category" value={deleteCategory.category} onChange={(e) => setDeleteCategory({ ...deleteCategory, category: e.target.value })} />
              <input className="input" placeholder="fallback category" value={deleteCategory.fallback_category} onChange={(e) => setDeleteCategory({ ...deleteCategory, fallback_category: e.target.value })} />
              <button className="btn btn-soft" type="button" onClick={() => void run("Category reassigned.", async () => {
                await request("/products/categories/delete", { method: "POST", body: JSON.stringify(deleteCategory) });
              })}>Delete Category</button>
            </div>
          </div>
        ) : null}

        {active === "blog" ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <form className="space-y-3 rounded-2xl border border-slate-200 p-5" onSubmit={(event) => {
              event.preventDefault();
              void run("Article created.", async () => {
                await request("/seo/articles", { method: "POST", body: JSON.stringify(articleCreate) });
                setArticleCreate(emptyArticle);
              });
            }}>
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Create Blog</h2>
              <input className="input" placeholder="title" value={articleCreate.title} onChange={(e) => setArticleCreate({ ...articleCreate, title: e.target.value })} required />
              <input className="input" placeholder="slug (optional)" value={articleCreate.slug} onChange={(e) => setArticleCreate({ ...articleCreate, slug: e.target.value })} />
              <input className="input" placeholder="category" value={articleCreate.category} onChange={(e) => setArticleCreate({ ...articleCreate, category: e.target.value })} />
              <textarea className="input min-h-40" placeholder="body" value={articleCreate.body} onChange={(e) => setArticleCreate({ ...articleCreate, body: e.target.value })} required />
              <button className="btn btn-primary" type="submit">Create</button>
            </form>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-5">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Bulk Import Blog</h2>
              <input type="file" accept=".json" onChange={applyArticleFile} />
              <textarea className="input min-h-40 font-mono text-xs" value={articleImportText} onChange={(e) => setArticleImportText(e.target.value)} />
              <button className="btn btn-primary" type="button" onClick={() => {
                void run("Blog import completed.", async () => {
                  const payload = parseJsonArray<Record<string, unknown>>(articleImportText);
                  for (const row of payload) {
                    await request("/seo/articles", { method: "POST", body: JSON.stringify(row) });
                  }
                });
              }}>Import Articles</button>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-5 lg:col-span-2">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Edit/Publish/Delete Blog</h2>
              <input className="input" placeholder="article slug" value={articleSlug} onChange={(e) => setArticleSlug(e.target.value)} />
              <input className="input" placeholder="new title" value={articleEdit.title} onChange={(e) => setArticleEdit({ ...articleEdit, title: e.target.value })} />
              <input className="input" placeholder="new category" value={articleEdit.category} onChange={(e) => setArticleEdit({ ...articleEdit, category: e.target.value })} />
              <textarea className="input min-h-40" placeholder="new body" value={articleEdit.body} onChange={(e) => setArticleEdit({ ...articleEdit, body: e.target.value })} />
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary" type="button" onClick={() => void run("Article updated.", async () => {
                  await request(`/seo/articles/${encodeURIComponent(articleSlug)}`, { method: "PATCH", body: JSON.stringify(articleEdit) });
                })}>Update</button>
                <button className="btn btn-soft" type="button" onClick={() => void run("Article published.", async () => {
                  await request(`/seo/articles/${encodeURIComponent(articleSlug)}/publish`, { method: "POST" });
                })}>Publish</button>
                <button className="btn btn-soft" type="button" onClick={() => void run("Article unpublished.", async () => {
                  await request(`/seo/articles/${encodeURIComponent(articleSlug)}/unpublish`, { method: "POST" });
                })}>Unpublish</button>
                <button className="btn btn-soft" type="button" onClick={() => void run("Article deleted.", async () => {
                  await request(`/seo/articles/${encodeURIComponent(articleSlug)}`, { method: "DELETE" });
                })}>Delete</button>
              </div>
            </div>
          </div>
        ) : null}

        {active === "media" ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <form className="space-y-3 rounded-2xl border border-slate-200 p-5" onSubmit={(event) => {
              event.preventDefault();
              void run("Media generated.", async () => {
                await request("/media/generate", { method: "POST", body: JSON.stringify(mediaCreate) });
                setMediaCreate(emptyMedia);
              });
            }}>
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Generate Media</h2>
              <select className="input" value={mediaCreate.asset_type} onChange={(e) => setMediaCreate({ ...mediaCreate, asset_type: e.target.value })}>
                <option value="poster">poster</option>
                <option value="hero_banner">hero_banner</option>
                <option value="factory">factory</option>
                <option value="product">product</option>
                <option value="social">social</option>
              </select>
              <input className="input" placeholder="title" value={mediaCreate.title} onChange={(e) => setMediaCreate({ ...mediaCreate, title: e.target.value })} />
              <input className="input" placeholder="aspect_ratio" value={mediaCreate.aspect_ratio} onChange={(e) => setMediaCreate({ ...mediaCreate, aspect_ratio: e.target.value })} />
              <textarea className="input min-h-24" placeholder="prompt" value={mediaCreate.prompt} onChange={(e) => setMediaCreate({ ...mediaCreate, prompt: e.target.value })} />
              <button className="btn btn-primary" type="submit">Generate</button>
              <button className="btn btn-soft" type="button" onClick={() => void run("Brand pack generated.", async () => {
                await request("/media/generate-brand-pack", { method: "POST", body: JSON.stringify(brandPack) });
              })}>Generate Brand Pack</button>
            </form>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-5">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Edit/Delete Media Asset</h2>
              <input className="input" placeholder="asset_id" value={mediaEditId} onChange={(e) => setMediaEditId(e.target.value)} />
              <select className="input" value={mediaEdit.asset_type} onChange={(e) => setMediaEdit({ ...mediaEdit, asset_type: e.target.value })}>
                <option value="poster">poster</option>
                <option value="hero_banner">hero_banner</option>
                <option value="factory">factory</option>
                <option value="product">product</option>
                <option value="social">social</option>
              </select>
              <input className="input" placeholder="title" value={mediaEdit.title} onChange={(e) => setMediaEdit({ ...mediaEdit, title: e.target.value })} />
              <input className="input" type="number" placeholder="sort_order" value={mediaEdit.sort_order} onChange={(e) => setMediaEdit({ ...mediaEdit, sort_order: Number(e.target.value || 0) })} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={mediaEdit.is_featured} onChange={(e) => setMediaEdit({ ...mediaEdit, is_featured: e.target.checked })} />featured</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={mediaEdit.is_active} onChange={(e) => setMediaEdit({ ...mediaEdit, is_active: e.target.checked })} />active</label>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary" type="button" onClick={() => void run("Asset updated.", async () => {
                  await request(`/media/assets/${encodeURIComponent(mediaEditId)}`, { method: "PATCH", body: JSON.stringify(mediaEdit) });
                })}>Save</button>
                <button className="btn btn-soft" type="button" onClick={() => void run("Asset deleted.", async () => {
                  await request(`/media/assets/${encodeURIComponent(mediaEditId)}`, { method: "DELETE" });
                })}>Delete</button>
              </div>
            </div>
          </div>
        ) : null}

        {active === "orders" ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="heading-font text-3xl font-semibold text-[#122744]">Recent Orders</h2>
                  <p className="mt-2 text-sm text-slate-600">Showing the most recent {recentOrders.length} orders.</p>
                </div>
                <button className="btn btn-soft" type="button" onClick={() => void run("Orders refreshed.", refreshAll)}>
                  Refresh
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">No orders yet.</p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {recentOrders.map((order) => (
                    <button
                      key={order.ref || `${order.title}-${order.createdAt}`}
                      type="button"
                      onClick={() => {
                        setOrderRef(order.ref);
                        setOrderStatus(order.status || "pending");
                        setOrderStatusInput("");
                        setOrderNotes(order.notes || "");
                      }}
                      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-slate-300"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Order Ref</p>
                          <p className="mt-1 text-lg font-semibold text-[#102949]">{order.ref || "-"}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${orderStatusClass(order.status)}`}>
                          {order.status || "pending"}
                        </span>
                      </div>
                      <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Title</p>
                          <p className="mt-1 text-slate-700">{order.title || "-"}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Total</p>
                          <p className="mt-1 text-slate-700">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-slate-500">
                            ${order.unit.toFixed(2)} x {order.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Customer</p>
                          <p className="mt-1 text-slate-700">{order.customerName || "-"}</p>
                          <p className="text-xs text-slate-500">{order.customerEmail || ""}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                        <span>Source: {order.source || "-"}</span>
                        <span>{order.updatedAt || order.createdAt || ""}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Order Status Update</h2>
              <p className="mt-2 text-sm text-slate-600">Select a recent order to prefill or enter the order reference manually.</p>
              <div className="mt-4 grid gap-3">
                <input
                  className="input"
                  placeholder="ORD-..."
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value)}
                />
                <select className="input" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                  {ORDER_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <input
                  className="input"
                  placeholder="custom status (optional)"
                  value={orderStatusInput}
                  onChange={(e) => setOrderStatusInput(e.target.value)}
                />
                <textarea
                  className="input min-h-24"
                  placeholder="Add internal notes (optional)"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    void run("Order updated.", async () => {
                      const status = orderStatusInput.trim() || orderStatus;
                      if (!orderRef.trim()) {
                        throw new Error("Order ref is required.");
                      }
                      await request(`/orders/${encodeURIComponent(orderRef)}/status`, {
                        method: "PATCH",
                        body: JSON.stringify({ status, notes: orderNotes })
                      });
                      setOrderStatusInput("");
                    })
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {active === "growth" ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-slate-200 p-5">
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Lead/Outreach</h2>
              <button className="btn btn-primary" type="button" onClick={() => void run("Demo leads imported.", async () => { await request("/leads/import-demo", { method: "POST" }); })}>Import Demo Leads</button>
              <button className="btn btn-soft" type="button" onClick={() => void run("Lead scores analyzed.", async () => { await request("/leads/analyze", { method: "POST" }); })}>Analyze Leads</button>
              <button className="btn btn-soft" type="button" onClick={() => void run("Outreach sequence scheduled.", async () => { await request("/outreach/run", { method: "POST" }); })}>Schedule Outreach</button>
              <button className="btn btn-soft" type="button" onClick={() => void run("Due outreach dispatched.", async () => { await request("/outreach/dispatch-due", { method: "POST" }); })}>Dispatch Due</button>
              <input className="input" placeholder="lead_id" value={leadId} onChange={(e) => setLeadId(e.target.value)} />
              <select className="input" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="qualified">qualified</option>
                <option value="won">won</option>
                <option value="lost">lost</option>
              </select>
              <button className="btn btn-primary" type="button" onClick={() => void run("Lead status updated.", async () => {
                await request(`/crm/leads/${encodeURIComponent(leadId)}/status`, { method: "PATCH", body: JSON.stringify({ status: leadStatus, notes: "" }) });
              })}>Update Lead Status</button>
            </div>

            <form className="space-y-3 rounded-2xl border border-slate-200 p-5" onSubmit={(event) => {
              event.preventDefault();
              void run("Chatbot answered.", async () => {
                const response = await request<{ answer: string }>("/chatbot/ask", { method: "POST", body: JSON.stringify({ question: chatQuestion, language: "English" }) });
                setChatAnswer(response.answer);
              });
            }}>
              <h2 className="heading-font text-3xl font-semibold text-[#122744]">Chatbot QA</h2>
              <input className="input" placeholder="question" value={chatQuestion} onChange={(e) => setChatQuestion(e.target.value)} />
              <button className="btn btn-primary" type="submit">Ask</button>
              <textarea className="input min-h-32" readOnly value={chatAnswer} />
            </form>
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600">
          <p>Analytics: {JSON.stringify(analytics)}</p>
          <p className="mt-2">Sample products: {products.slice(0, 2).map((p) => String(p.product_id || "")).join(", ") || "none"}</p>
          <p className="mt-2">Sample orders: {orders.slice(0, 2).map((o) => String(o.order_ref || "")).join(", ") || "none"}</p>
        </div>
      </div>
    </section>
  );
}
