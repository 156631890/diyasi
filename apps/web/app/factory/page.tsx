import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

type MediaAsset = {
  id: number;
  title: string;
  image_url: string;
};

const fallbackFactoryImages: MediaAsset[] = [
  {
    id: -1,
    title: "Factory Capability Panorama",
    image_url: "/media/generated/factory-capability-panorama.png"
  },
  {
    id: -2,
    title: "Quality Check Fabric Detail",
    image_url: "/media/generated/factory/quality-check-fabric-detail.png"
  },
  {
    id: -3,
    title: "Seamless Machine Detail",
    image_url: "/media/generated/factory/seamless-machine-detail.png"
  },
  {
    id: -4,
    title: "Inspection and Finishing Table",
    image_url: "/media/generated/factory/inspection-and-finishing-table.png"
  }
];

const factoryWideImage = "/media/generated/wide/factory-wide-production-line.png";

async function getFactoryImages(): Promise<MediaAsset[]> {
  const assets = await safeFetchJson<MediaAsset[]>("/media/assets?asset_type=factory&limit=6", []);
  if (assets.length === 0) {
    return fallbackFactoryImages;
  }
  const existingTitles = new Set(assets.map((item) => item.title));
  const extraFallbacks = fallbackFactoryImages.filter((item) => !existingTitles.has(item.title));
  return [...assets, ...extraFallbacks].slice(0, 4);
}

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    gallery: string;
    noVisual: string;
    capabilities: Array<{ label: string; value: string }>;
  }
> = {
  en: {
    kicker: "Factory",
    title: "A disciplined production system built for reliability",
    desc: "Our factory combines seamless machinery, process control, and quality checkpoints to deliver stable output for global buyers.",
    gallery: "Factory Visual Gallery",
    noVisual: "No factory visuals yet. Generate in Admin Creative Studio.",
    capabilities: [
      { label: "Sampling Lead Time", value: "5-7 days" },
      { label: "Bulk Production Lead Time", value: "20-30 days" },
      { label: "MOQ per style/color", value: "300-500 pcs" },
      { label: "Core Product Scope", value: "Underwear / Yoga / Activewear" }
    ]
  },
  zh: {
    kicker: "工厂",
    title: "以稳定交付为目标的制造体系",
    desc: "工厂将无缝设备、工艺控制与质检节点协同运作，确保面对全球买家时依然保持稳定产出。",
    gallery: "工厂视觉图库",
    noVisual: "暂时还没有工厂视觉素材，请在后台创意中心生成。",
    capabilities: [
      { label: "打样周期", value: "5-7 天" },
      { label: "大货周期", value: "20-30 天" },
      { label: "单款单色 MOQ", value: "300-500 件" },
      { label: "核心品类", value: "内衣 / 瑜伽 / 运动服" }
    ]
  },
  es: {
    kicker: "Fabrica",
    title: "Sistema de produccion disciplinado y confiable",
    desc: "La fabrica integra maquinaria seamless, control de proceso y puntos de calidad para mantener entregas estables.",
    gallery: "Galeria Visual de Fabrica",
    noVisual: "Aun no hay visuales de fabrica. Generalos desde Admin.",
    capabilities: [
      { label: "Tiempo de Muestra", value: "5-7 dias" },
      { label: "Tiempo de Produccion Masiva", value: "20-30 dias" },
      { label: "MOQ por estilo/color", value: "300-500 pcs" },
      { label: "Categorias Principales", value: "Underwear / Yoga / Activewear" }
    ]
  }
};

export default async function FactoryPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const images = await getFactoryImages();
  return (
    <main className="container-shell py-10">
      <section className="dark-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(16,30,52,0.18)] md:px-10 lg:px-12">
        <p className="kicker text-[#f3d7a1]">{t.kicker}</p>
        <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
        <p className="mt-3 max-w-3xl leading-8 text-[#cfdbef]">{t.desc}</p>
      </section>

      <section className="mt-10 factory-metrics">
        {t.capabilities.map((item) => (
          <article key={item.label} className="factory-metric">
            <p className="text-sm uppercase tracking-wide text-[#8b6a2c]">{item.label}</p>
            <p className="heading-font mt-2 text-3xl font-semibold text-[#102949]">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <p className="kicker">{t.gallery}</p>
        <h2 className="heading-font mt-2 text-4xl font-semibold text-[#122744]">Production Visual Library</h2>
        <div className="mt-6 wide-visual-shell">
          <img src={factoryWideImage} alt="Wide production line view" className="wide-visual" />
        </div>
        <div className="mt-6 factory-gallery">
          {images.map((img) => (
            <article key={img.id} className="factory-gallery-item">
              <img src={img.image_url} alt={img.title} className="h-full w-full object-cover" />
              <div className="split-gallery-caption">
                <p>{img.title}</p>
              </div>
            </article>
          ))}
          {images.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">{t.noVisual}</div> : null}
        </div>
      </section>
    </main>
  );
}
