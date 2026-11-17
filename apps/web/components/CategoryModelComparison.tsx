import Link from "next/link";
import { catalogProducts } from "@/lib/catalog-source";
import { localizedFabric, localizedProductName, type CatalogLocale } from "@/lib/catalog-locales";
const examples:Record<string,string[]>={
 "womens-panties":["DYS201","LS006","DYS323","DYS214"],
 "cotton-underwear":["DYS201","DYS219","DYS224"],
 "cotton-thongs":["DYS224","DYS230","DYS204"],
 "lace-underwear":["LS005","LS005-142","LS006"],
 "seamless-underwear":["DYS323","DYS314","DYS322"],
 "thongs":["DYS224","LS005","DYS322"],
 "high-waist":["DYS219","DYS225","DYS314"],
 "mens-underwear":["M001","M006","M005"],
 "mens-boxer-briefs":["M005","M007","M005 Print"],
};
const rise:Record<string,[string,string]>={
 "Low rise":["Tiro bajo","Низкая посадка"],"Mid-low rise":["Tiro medio-bajo","Средне-низкая посадка"],
 "Mid rise":["Tiro medio","Средняя посадка"],"Regular rise":["Tiro regular","Стандартная посадка"],
 "High rise":["Tiro alto","Высокая посадка"],"Extra-high rise":["Tiro extraalto","Очень высокая посадка"]
};
export default function CategoryModelComparison({slug,locale="en"}:{slug:string;locale?:"en"|CatalogLocale}){
 const models=(examples[slug]??[]).map(model=>catalogProducts.find(p=>p.model_number===model)!);
 if(!models.length)return null;
 const es=locale==="es",ru=locale==="ru";
 return <section className={locale==="en"?"d-section":"page-section"}>
   <h2 className="card-title-standard">{es?"Compare referencias concretas":ru?"Сравните конкретные модели":"Compare actual model references"}</h2>
   <p className="page-reference-body mt-3">{es?"Compare cobertura y materiales por separado. Las tallas son las etiquetas del catálogo, no conversiones US/EU verificadas. Las fichas enlazadas conservan las fotografías, los gráficos originales y sus limitaciones.":ru?"Сравнивайте покрытие и материалы отдельно. Размеры — обозначения каталога, а не проверенная таблица соответствия US/EU. В карточках сохранены фотографии, исходные таблицы и ограничения.":"Compare coverage and components separately. Sizes are catalogue labels, not verified US/EU conversions. The linked model pages retain photographs, original charts and source limitations."}</p>
   <div className="d-table-scroll mt-5" tabIndex={0} role="region" aria-label={es?"Comparación de modelos":ru?"Сравнение моделей":"Model comparison"}>
    <table><thead><tr>{(es?["Modelo / corte","Tiro","Composición","Tallas del catálogo"]:ru?["Модель / фасон","Посадка","Состав","Размеры каталога"]:["Model / fit","Rise","Composition","Catalogue sizes"]).map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
    <tbody>{models.map(p=><tr key={p.slug}><th scope="row"><Link href={"/products/"+p.slug}>{locale==="en"?p.model_number+" · "+p.fit:localizedProductName(p,locale)}{locale!=="en"?" (EN)":""} ↗</Link></th><td>{locale==="en"?p.rise:rise[p.rise]?.[ru?1:0]??p.rise}</td><td>{locale==="en"?p.fabric:localizedFabric(p.fabric,locale)}</td><td>{p.size.replace(/^Standard American \/ European [Ss]ize\s*-\s*/,"")}</td></tr>)}</tbody>
    </table>
   </div>
 </section>;
}
