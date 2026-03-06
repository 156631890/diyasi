from models import Lead


def calculate_lead_score(lead: Lead) -> float:
    score = 20.0

    category = lead.product_category.lower()
    if any(token in category for token in ["underwear", "seamless", "yoga", "activewear", "sports"]):
        score += 25

    if lead.website.startswith("http"):
        score += 10

    if lead.instagram:
        score += 10

    if lead.linkedin:
        score += 10

    priority_countries = {"united states", "usa", "united kingdom", "uk", "germany", "france", "spain"}
    if lead.country.lower() in priority_countries:
        score += 15

    if len(lead.brand_name.split()) >= 2:
        score += 10

    return round(min(score, 100), 1)


def suggested_status(score: float) -> str:
    return "new" if score < 70 else "contacted"
