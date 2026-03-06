def answer_question(question: str, language: str) -> str:
    q = question.lower()

    if "moq" in q:
        base = "Our typical MOQ is 300-500 pcs per style per color, with pilot order flexibility for new brands."
    elif "sample" in q:
        base = "Sample lead time is usually 5-7 working days after design and fabric confirmation."
    elif "production" in q or "lead time" in q:
        base = "Bulk production typically takes 20-30 days based on quantity and material availability."
    elif "fabric" in q:
        base = "We support nylon/spandex and polyamide/elastane blends, with custom GSM and compression options."
    else:
        base = "We provide OEM/ODM for seamless underwear and activewear, including development, sampling, and bulk production."

    language = language.lower()
    if language == "spanish":
        return f"[ES] {base}"
    if language == "french":
        return f"[FR] {base}"
    if language == "german":
        return f"[DE] {base}"
    return base
