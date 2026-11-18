"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { PricingNote } from "./ProductPricing";
import {downloadCsv, makeCsv} from "@/lib/buyer-export";
import {SITE_ORIGIN} from "@/lib/site-config";
import Link from "next/link";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type ComparisonProduct = {
  slug: string;
  product_name: string;
  model_number: string;
  image_url: string;
  fabric: string;
  fit: string;
  rise: string;
  size: string;
  moq: string;
  price_text: string;
  price_checked_at: string;
};
const uiLabels: Record<string,[string,string]> = {"Reference price": ["Precio de referencia", "Ориентировочная цена"], "Price checked": ["Precio verificado", "Цена проверена"], "Selected styles": ["Modelos seleccionados", "Выбранные модели"], "Compare styles": ["Comparar modelos", "Сравнить модели"], "Clear": ["Vaciar", "Очистить"], "Your shortlist.": ["Su selección.", "Ваш выбор."], "Close comparison": ["Cerrar comparación", "Закрыть сравнение"], "Show different values only": ["Mostrar solo diferencias", "Показать только различия"], "Download comparison (CSV)": ["Descargar comparación (CSV, EN)", "Скачать сравнение (CSV, EN)"], "Product specification comparison": ["Comparación de especificaciones (EN)", "Сравнение характеристик (EN)"], "The details": ["Características (EN)", "Характеристики (EN)"], "Selection": ["Selección", "Выбор"], "Remove": ["Eliminar", "Удалить"], "Fabric": ["Tejido", "Ткань"], "Fit": ["Corte", "Фасон"], "Rise": ["Tiro", "Посадка"], "Sizes": ["Tallas", "Размеры"], "Starting quantity": ["Cantidad inicial", "Начальное количество"], "You can compare up to four styles. Remove one to add another.": ["Puede comparar hasta cuatro modelos. Elimine uno para añadir otro.", "Можно сравнить до четырех моделей. Удалите одну, чтобы добавить другую."]};
const key = "diyasi_compare_ids";
const eventName = "diyasi-compare-changed";
let memory = "[]";
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(eventName, listener);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(key) ?? memory;
  } catch {
    return memory;
  }
}
function save(next: string[]) {
  memory = JSON.stringify(next);
  try {
    localStorage.setItem(key, memory);
  } catch {
    // Keep the external store available when persistent storage is blocked.
  }
  window.dispatchEvent(new Event(eventName));
}
const ComparisonContext = createContext<{
  ids: string[];
  toggle: (id: string) => void;
}>({ ids: [], toggle: () => {} });
export const useComparison = () => useContext(ComparisonContext);

export default function ProductComparison({
  products,
  children,
}: {
  products: ComparisonProduct[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const t = (text:string) => uiLabels[text]?.[locale === "ru" ? 1 : 0] && ["es","ru"].includes(locale) ? uiLabels[text][locale === "ru" ? 1 : 0] : text;
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const [notice, setNotice] = useState("");
  const [differences, setDifferences] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const ids = useMemo(() => {
    try {
      const saved: unknown = JSON.parse(raw);
      return Array.isArray(saved)
        ? [
            ...new Set(
              saved.filter(
                (id): id is string =>
                  typeof id === "string" && products.some((p) => p.slug === id),
              ),
            ),
          ].slice(0, 4)
        : [];
    } catch {
      return [];
    }
  }, [raw, products]);
  const selected = products.filter((p) => ids.includes(p.slug));
  function toggle(id: string) {
    if (ids.includes(id)) {
      save(ids.filter((x) => x !== id));
      setNotice("");
      return;
    }
    if (ids.length === 4) {
      setNotice(
        t("You can compare up to four styles. Remove one to add another."),
      );
      return;
    }
    save([...ids, id]);
    setNotice("");
  }
  return (
    <ComparisonContext.Provider value={{ ids, toggle }}>
      {children}
      {ids.length > 0 && (
        <div className="d-compare-tray" aria-label={t("Selected styles")}>
          <div>
            <span>{ids.length} / 4 · {t("Selected styles")}</span>
            <p role="status">
              {notice || selected.map((p) => p.model_number).join(" · ")}
            </p>
          </div>
          <button
            type="button"
            className="d-button"
            onClick={() => dialog.current?.showModal()}
          >
            {t("Compare styles")}
          </button>
          <button
            type="button"
            className="d-text-link"
            onClick={() => {
              save([]);
              setNotice("");
            }}
          >
            {t("Clear")}
          </button>
        </div>
      )}
      <dialog ref={dialog} className="d-compare-dialog">
        <div className="d-section-heading">
          <h2>{t("Your shortlist.")}</h2>
          <button
            type="button"
            className="d-text-link"
            onClick={() => dialog.current?.close()}
          >
            {t("Close comparison")}
          </button>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "1rem"}}>
          <label><input type="checkbox" checked={differences} onChange={e=>setDifferences(e.target.checked)}/> {t("Show different values only")}</label>
          <button type="button" className="d-button" disabled={!selected.length} onClick={()=>downloadCsv(makeCsv([["Model", "Product", "Fabric", "Fit", "Rise", "Listed sizes", "Listed starting quantity", "Reference unit price (USD)", "Price checked", "Product URL", "Status"], ...selected.map(p=>[p.model_number, p.product_name, p.fabric, p.fit, p.rise, p.size, p.moq, p.price_text, p.price_checked_at, `${SITE_ORIGIN}/products/${p.slug}`, "Comparison draft; confirm final unit price, measurements, sample costs, size/color mix, MOQ, customization, shipping and taxes; no enquiry submitted"])]), "diyasi-style-comparison.csv")}>{t("Download comparison (CSV)")} ↓</button>
        </div>
        <div
          className="d-table-scroll"
          role="region"
          aria-label={t("Product specification comparison")}
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{t("The details")}</th>
                {selected.map((p) => (
                  <th key={p.slug} scope="col">
                    <Image
                      src={p.image_url}
                      alt={p.product_name}
                      width={180}
                      height={180}
                    />
                    <Link
                      href={"/products/" + p.slug}
                      onClick={() => dialog.current?.close()}
                    >
                      {p.product_name}
                    </Link>
                    <span>{p.model_number}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Fabric", "fabric"],
                  ["Fit", "fit"],
                  ["Rise", "rise"],
                  ["Sizes", "size"],
                  ["Starting quantity", "moq"],
                  ["Reference price", "price_text"],
                  ["Price checked", "price_checked_at"],
                ] as const
              ).filter(([,field]) => !differences || selected.length < 2 || new Set(selected.map(p=>p[field].trim())).size > 1).map(([label, field]) => (
                <tr key={field}>
                  <th scope="row">{t(label)}</th>
                  {selected.map((p) => (
                    <td key={p.slug}>{p[field]}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">{t("Selection")}</th>
                {selected.map((p) => (
                  <td key={p.slug}>
                    <button
                      type="button"
                      className="d-text-link"
                      onClick={() => {
                        toggle(p.slug);
                        if (ids.length === 1) dialog.current?.close();
                      }}
                    >
                      {t("Remove")} {p.model_number}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <PricingNote locale={locale === "es" || locale === "ru" ? locale : "en"} />
        <p className="d-fineprint">
          {locale === "ru" ? "Характеристики и CSV — из английского каталога. Уточните размеры, цвета и минимумы компонентов в запросе образцов." : locale === "es" ? "Especificaciones y CSV del catálogo en inglés. Confirme tallas, colores y mínimos de componentes al solicitar muestras." : "Confirm the size/color mix and any custom-component minimums with your sample brief."}
        </p>
      </dialog>
    </ComparisonContext.Provider>
  );
}
