"""Apply reviewed editorial copy and build the single published catalogue."""
import json
import re
from pathlib import Path
from urllib.parse import unquote
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/diyasi-source-products.json"
OUTPUT = ROOT / "apps/web/data/catalog.json"

# Copy is written against each source product's specification table.
# Medical, antibacterial, recycled-content and performance claims are omitted
# unless suitable product-level evidence is available.
COPY = {
    "LS006": ("Lace-Trim Cotton Brazilian Brief", "lace-underwear", "A combed-cotton Brazilian brief framed by a delicate lace waistband and lace leg openings. The mid-low rise and stitched cotton gusset bring an everyday foundation to a lingerie collection.", "Brazilian", "Mid-low rise"),
    "LS005-142": ("V-Waist Lace & Cotton Brief", "lace-underwear", "A low V-shaped lace waistband meets a soft combed-cotton body in this everyday brief. A useful direction for brands building a coordinated cotton-and-lace collection with a little more coverage.", "Brief", "Low rise"),
    "LS005": ("V-Waist Lace & Cotton Thong", "lace-underwear", "A low-rise thong with a combed-cotton body and stretch-lace waistband. The V-shaped front creates a light, feminine silhouette for private-label lingerie and everyday underwear collections.", "Thong", "Low rise"),
    "DYS323": ("Bonded Brazilian Seamless Brief", "seamless-underwear", "A Brazilian brief with laser-cut edges and a bonded cotton gusset. The one-piece construction offers a clean starting point for a minimal, no-show underwear collection.", "Brazilian", "Low rise"),
    "DYS322": ("Bonded Seamless Low-Rise Thong", "seamless-underwear", "A low-rise thong in stretch polyamide with a bonded cotton gusset and one-piece construction. Designed for collections that call for discreet edges and a pared-back shape.", "Thong", "Low rise"),
    "DYS314": ("Seamless High-Waist Full Brief", "seamless-underwear", "A full-coverage brief with a high waist, laser-cut edges and a stitched cotton gusset. It balances a generous silhouette with the smooth finish of stretch polyamide.", "Full brief", "High rise"),
    "DYS311": ("Seamless Low-Rise Brazilian Brief", "seamless-underwear", "A low-rise Brazilian brief with laser-cut edges, a two-panel back and a stitched cotton gusset. Review this cheeky-cut option when developing an understated everyday collection.", "Brazilian", "Low rise"),
    "DYS306": ("Seamless Mid-Low Brazilian Brief", "seamless-underwear", "A mid-low-rise Brazilian brief combining a stretch-polyamide body with a stitched cotton gusset. Shaped back panels and a clean edge finish distinguish it from the low-rise options.", "Brazilian", "Mid-low rise"),
    "DYS302": ("Invisible-Edge Cotton-Gusset Thong", "seamless-underwear", "A minimal thong with a seamless waist finish, split back panels and a stitched cotton gusset. A versatile silhouette for private-label collections built around close-fitting clothing.", "Thong", "Low rise"),
    "DYS301": ("Seamless V-Waist Low-Rise Thong", "seamless-underwear", "A V-shaped waist gives this seamless low-rise thong its distinctive line. Stretch polyamide and a stitched cotton gusset form a practical base for a custom color or label program.", "Thong", "Low rise"),
    "DYS229": ("Everyday Cotton Mid-Rise Thong", "cotton-underwear", "A mid-rise cotton thong finished with a zigzag-stitched waistband. Its combed-cotton stretch fabric and simple outline make it a useful everyday style for a core underwear range.", "Thong", "Mid rise"),
    "DYS230": ("Cotton Low-Rise T-String", "cotton-underwear", "A compact low-rise T-string with a minimal Y-shaped back. The specification lists a combed-cotton and spandex blend; confirm the final fabric and coverage on a physical sample.", "T-string", "Low rise"),
    "DYS228": ("Cotton Mid-Rise T-Back Thong", "cotton-underwear", "A mid-rise T-back thong in combed cotton with added stretch. This style includes an extended source size range through XXL for brands planning a broader fit assortment.", "Thong", "Mid rise"),
    "DYS227": ("Wide-Waistband Cotton Tanga Thong", "cotton-underwear", "A high-waisted tanga thong defined by a wide elastic waistband. Pair the combed-cotton body with a reviewed waistband artwork to develop a recognizable branded essential.", "Tanga", "High rise"),
    "DYS226": ("High-Waist Cotton T-String", "cotton-underwear", "A high-waisted T-string in soft combed-cotton stretch fabric. Its minimal back coverage offers a distinct alternative to full briefs within the same cotton collection.", "T-string", "High rise"),
    "DYS225": ("Cotton High-Waist Thong", "cotton-underwear", "A high-waisted thong combining more front coverage with a minimal back. The cotton-rich stretch blend and listed sizes through 2XL support a considered everyday assortment.", "Thong", "High rise"),
    "DYS224": ("Essential Cotton Thong", "cotton-underwear", "A simple cotton thong for everyday underwear collections. The combed-cotton stretch blend creates a straightforward base for your chosen logo treatment, color mix and packaging.", "Thong", "Regular rise"),
    "DYS223": ("Signature Cotton Brief", "cotton-underwear", "A cotton-rich brief intended for custom branding and coordinated everyday collections. Review label placement, the available size mix and packaging together when developing your sample.", "Brief", "Regular rise"),
    "DYS219": ("High-Leg Cotton High-Waist Brief", "cotton-underwear", "A high-waisted cotton brief with a high-cut leg. The source size range spans XXS to 2XL, giving brands a starting point for fit development across a wider assortment.", "High-leg brief", "High rise"),
    "DYS218": ("Lettered-Waist Cotton Tanga", "cotton-underwear", "A cotton tanga with a lettered waistband detail. Discuss the waistband artwork and letter placement alongside fit samples to make the design consistent with your brand.", "Tanga", "Regular rise"),
    "DYS215": ("Wide-Waistband Cotton Boxer", "cotton-underwear", "A women's cotton boxer with a wide waistband and a fuller silhouette. The combed-cotton stretch blend is a practical option for an everyday or lounge-inspired underwear range.", "Boxer", "Regular rise"),
    "DYS214": ("Everyday Cotton Boyshort", "cotton-underwear", "A combed-cotton boyshort with added stretch and a fuller leg opening. Choose this shape when your collection needs an alternative to bikini briefs and thongs.", "Boyshort", "Regular rise"),
    "DYS210": ("Long-Leg High-Waist Cotton Brief", "cotton-underwear", "A high-waisted cotton brief with an extended leg. The longer silhouette offers more coverage for brands developing comfortable everyday foundations.", "Long-leg brief", "High rise"),
    "DYS208": ("Everyday Cotton Tanga", "cotton-underwear", "A cotton-rich tanga that sits between a classic brief and a minimal thong in visual coverage. Use the source photos and a fit sample to confirm the silhouette for your collection.", "Tanga", "Regular rise"),
    "DYS206": ("Classic Cotton Bikini Brief", "cotton-underwear", "A classic bikini-shaped brief in combed cotton with stretch. Its clean outline provides a versatile foundation for a coordinated everyday underwear range.", "Bikini", "Regular rise"),
    "DYS205": ("Extra-High-Waist Cotton Thong", "cotton-underwear", "An extra-high-waisted thong that combines a taller front with minimal back coverage. A distinctive cotton-rich silhouette for a collection with a range of rises.", "Thong", "Extra-high rise"),
    "DYS204": ("Cotton Stretch G-String", "cotton-underwear", "A minimal G-string silhouette with a narrow back. The product specification lists combed cotton and spandex; sample the fabric before confirming your production brief.", "G-string", "Regular rise"),
    "DYS202": ("Essential Cotton Bikini Brief", "cotton-underwear", "A plain cotton bikini brief with a simple, everyday shape. The combed-cotton and spandex blend is suited to building a consistent assortment of colors and branded essentials.", "Bikini", "Regular rise"),
    "DYS201": ("Low-Rise Cotton Bikini Brief", "cotton-underwear", "A low-rise bikini brief made from a cotton-rich stretch blend. Develop the understated shape with your choice of approved colors, logo placement and packaging.", "Bikini", "Low rise"),
    "M008 Print": ("Printed Low-Rise Men's Brief", "mens-underwear", "A low-rise men's brief with a printed stretch body and modal-lined pouch. Coordinate the print artwork and waistband branding for a cohesive private-label collection.", "Brief", "Low rise"),
    "M007 Print": ("Printed Mid-Rise Men's Trunk", "mens-underwear", "A printed men's trunk with a mid-rise fit, contrast waistband and modal-lined pouch. Review print placement and leg measurements during sampling.", "Trunk", "Mid rise"),
    "M006 Print": ("Contrast-Waist Printed Men's Trunk", "mens-underwear", "A printed men's trunk pairing a contrast elastic waistband with a modal-lined pouch. A collection-building option for custom artwork and repeat color programs.", "Trunk", "Mid rise"),
    "M005 Print": ("Printed Mid-Leg Men's Boxer Brief", "mens-underwear", "A mid-rise boxer brief with a mid-length leg, custom print direction and modal pouch lining. The contrast waistband provides another area for brand coordination.", "Boxer brief", "Mid rise"),
    "M004 Print": ("Printed Modal-Pouch Boxer Brief", "mens-underwear", "A men's printed boxer brief with a contrast waistband and modal-lined pouch. Review repeat scale, waistband color and the finished fit together before production.", "Boxer brief", "Mid rise"),
    "M003 Print": ("Everyday Printed Men's Boxer Brief", "mens-underwear", "A mid-rise printed boxer brief with a stretch body and modal-lined pouch. Listed sizes through 3XL allow fit discussions across a broader men's assortment.", "Boxer brief", "Mid rise"),
    "M002 Print": ("Printed High-Waist Long-Leg Boxer", "mens-underwear", "A high-waisted men's boxer brief with an extended leg and printed stretch fabric. The modal-lined pouch and colored waistband complete this fuller-coverage option.", "Long-leg boxer", "High rise"),
    "M001 Print": ("Printed Low-Rise Modal-Pouch Trunk", "mens-underwear", "A low-rise printed trunk with a modal-lined pouch and a customizable waistband. A compact men's silhouette for a coordinated private-label underwear program.", "Trunk", "Low rise"),
    "M008": ("Men's Low-Rise Bikini Brief", "mens-underwear", "A low-rise men's bikini brief with a no-fly front and covered elastic waistband. The stretch body and modal-lined pouch are listed in sizes through 3XL.", "Bikini brief", "Low rise"),
    "M007": ("Men's 4-Inch Stretch Boxer Brief", "mens-underwear", "A men's boxer brief with a listed four-inch inseam and contour pouch. The stretch body and modal lining provide a starting point for a fit-led basics collection.", "Boxer brief", "Regular rise"),
    "M006": ("Men's 5-Inch Pouch-Support Trunk", "mens-underwear", "A five-inch men's trunk with pouch support, a stretch-polyester body and modal lining. Confirm the fabric specification and any recycled-content documentation with the factory.", "Trunk", "Mid rise"),
    "M005": ("Men's 5-Inch Modal-Pouch Boxer", "mens-underwear", "A five-inch boxer brief with a modal-lined pouch and a polyester stretch body. The source lists a recycled-polyester option; request composition and traceability records for your order.", "Boxer brief", "Mid rise"),
    "M004": ("Men's Mid-Rise No-Fly Trunk", "mens-underwear", "A mid-rise men's trunk with a no-fly front, soft waistband and modal-lined pouch. A clean base style for custom logo and size-assortment planning.", "Trunk", "Mid rise"),
    "M003": ("Men's Modal-Pouch Everyday Trunk", "mens-underwear", "An everyday men's trunk with a stretch-polyester body and a shaped modal-lined pouch. The source offers a size range through 3XL for broader fit planning.", "Trunk", "Regular rise"),
    "M002": ("Men's Long-Leg Stretch Boxer Brief", "mens-underwear", "An extended-leg men's boxer brief with a shaped support pouch and modal lining. Compare leg length and waistband tension on a physical sample before setting your size specification.", "Long-leg boxer", "Regular rise"),
    "M001": ("Men's Tagless Low-Rise Brief", "mens-underwear", "A low-rise men's brief with a tagless design and no-fly pouch. Stretch polyester and a modal lining form a simple everyday style for custom underwear programs.", "Brief", "Low rise"),
}


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("'", "")).strip("-")


def main():
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    products = []
    duplicate = None
    for raw in source["products"]:
        model = raw["specifications"].get("Model Number", "")
        if not model:
            if raw["source_title"].startswith("Low V-Waist Lace Thong"):
                duplicate = raw
                continue
            raise ValueError(f"Missing model: {raw['source_url']}")
        title, collection, description, fit, rise = COPY[model]
        specs = raw["specifications"]
        slug = slugify(title + " " + model)
        fabric = specs.get("Material", "Composition to be confirmed")
        cotton = "95%" in fabric and "cotton" in fabric.lower()
        material_label = "Cotton & lace" if collection == "lace-underwear" else "Stretch polyamide" if collection == "seamless-underwear" else "Cotton stretch" if cotton else "Stretch fabric · modal lining"
        # Conflicting 100/120-pc source copy is resolved in favor of the specific
        # product information table. M005 has no fixed numerical specification.
        moq = "120 pieces per style; mixed sizes and colors subject to confirmation" if re.search(r"120\s*pcs", specs.get("MOQ", ""), re.I) else "Confirm quantity for the selected fabric and branding"
        products.append({
            "product_id": slug, "slug": slug, "model_number": model,
            "product_name": title, "category": "Men's Underwear" if collection == "mens-underwear" else "Women's Panties / " + {"lace-underwear": "Lace", "cotton-underwear": "Cotton", "seamless-underwear": "Seamless"}[collection],
            "collection": collection, "gender": "men" if collection == "mens-underwear" else "women",
            "description": description, "fabric": fabric, "material_label": material_label,
            "fit": fit, "rise": rise, "size": specs.get("Size", "Confirm available sizes"),
            "color": (
                "Current stock colors to be confirmed against the selected palette"
                if model == "DYS201"
                else specs.get("Color", "Confirm available colors")
            ), "moq": moq,
            "sample_time": "Typically 5–7 days; confirm against the sample brief",
            "production_time": "Timing confirmed after materials, quantity and artwork approval",
            "image_url": raw["gallery_images"][0], "gallery_images": raw["gallery_images"],
            "size_chart_image": next((image for url, image in zip(raw["gallery_source_urls"], raw["gallery_images"]) if "尺寸" in unquote(url) or "size" in unquote(url).lower()), ""),
            "detail_images": raw["detail_images"], "source_urls": [raw["source_url"]],
            "detail_url": raw["source_url"], "price_text": "Request a quotation", "price_from": "",
            "seo_title": title + " " + model + " | DIYASI",
            "meta_description": f"Explore {model}, {title.lower()}, for private label and wholesale. Review fabric, fit, source photographs and sampling options with DIYASI.",
            "reviewed_at": "2026-09-18",
        })
    if duplicate:
        target = next(p for p in products if p["model_number"] == "LS005")
        target["source_urls"].append(duplicate["source_url"])
        target["detail_images"] = list(dict.fromkeys(target["detail_images"] + [i for i in duplicate["detail_images"] if i not in target["gallery_images"]]))
    for product in products:
        usable = []
        for image in product["detail_images"]:
            with Image.open(ROOT / "apps/web/public" / image.lstrip("/")) as asset:
                if min(asset.size) >= 64:
                    usable.append(image)
        product["detail_images"] = usable
    assert len(products) == len(COPY) == 45
    assert len(set(p["slug"] for p in products)) == len(products)
    assert len(set(p["product_name"] for p in products)) == len(products)
    assert sum(len(p["source_urls"]) for p in products) == source["sitemap_count"]
    redirects = {}
    old_path = ROOT / "data/alibaba-products.json"
    if old_path.exists():
        old_products = json.loads(old_path.read_text(encoding="utf-8"))
        by_model = {p["model_number"].casefold(): p["slug"] for p in products}
        for old in old_products:
            target = by_model.get(old.get("model_number", "").strip().casefold())
            if target:
                redirects[old["product_id"]] = target
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps({"updated_at": "2026-09-17", "source_url_count": 46, "products": products, "legacy_redirects": redirects}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    backend_path = ROOT / "services/api/data/diyasi-catalog.json"
    backend_path.parent.mkdir(parents=True, exist_ok=True)
    fields = ["product_id", "model_number", "product_name", "category", "fabric", "color", "size", "moq", "sample_time", "production_time", "description", "image_url", "gallery_images", "detail_url", "price_text", "price_from"]
    backend_path.write_text(json.dumps([{key: p[key] for key in fields} for p in products], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Published {len(products)} unique products from 46 source URLs; {len(redirects)} exact-model legacy mappings")


if __name__ == "__main__":
    main()
