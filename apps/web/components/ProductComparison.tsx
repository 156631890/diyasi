"use client";

import Image from "next/image";
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
};
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
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const [notice, setNotice] = useState("");
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
        "You can compare up to four styles. Remove one to add another.",
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
        <div className="d-compare-tray" aria-label="Selected styles">
          <div>
            <span>{ids.length} / 4 styles selected</span>
            <p role="status">
              {notice || selected.map((p) => p.model_number).join(" · ")}
            </p>
          </div>
          <button
            type="button"
            className="d-button"
            onClick={() => dialog.current?.showModal()}
          >
            Compare styles
          </button>
          <button
            type="button"
            className="d-text-link"
            onClick={() => {
              save([]);
              setNotice("");
            }}
          >
            Clear
          </button>
        </div>
      )}
      <dialog ref={dialog} className="d-compare-dialog">
        <div className="d-section-heading">
          <h2>Your shortlist.</h2>
          <button
            type="button"
            className="d-text-link"
            onClick={() => dialog.current?.close()}
          >
            Close comparison
          </button>
        </div>
        <div
          className="d-table-scroll"
          role="region"
          aria-label="Product specification comparison"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">The details</th>
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
                ] as const
              ).map(([label, field]) => (
                <tr key={field}>
                  <th scope="row">{label}</th>
                  {selected.map((p) => (
                    <td key={p.slug}>{p[field]}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Selection</th>
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
                      Remove {p.model_number}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="d-fineprint">
          Confirm the size/color mix and any custom-component minimums with your
          sample brief.
        </p>
      </dialog>
    </ComparisonContext.Provider>
  );
}
