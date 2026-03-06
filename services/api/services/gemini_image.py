from dataclasses import dataclass

import httpx

from config import settings


class GeminiImageError(RuntimeError):
    pass


@dataclass
class GeminiImageResult:
    mime_type: str
    base64_data: str
    model: str


def normalize_aspect_ratio(raw: str) -> str:
    allowed = {"1:1", "3:4", "4:3", "9:16", "16:9", "21:9"}
    value = raw.strip()
    return value if value in allowed else "16:9"


async def generate_image(prompt: str, aspect_ratio: str = "16:9", model: str | None = None) -> GeminiImageResult:
    if not settings.gemini_api_key:
        raise GeminiImageError("Missing GEMINI_API_KEY.")

    selected_model = model or settings.gemini_model
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{selected_model}:generateContent?key={settings.gemini_api_key}"
    )
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": normalize_aspect_ratio(aspect_ratio)},
        },
    }

    async with httpx.AsyncClient(timeout=90) as client:
        response = await client.post(url, json=payload)

    if response.status_code >= 400:
        raise GeminiImageError(f"Gemini API error {response.status_code}: {response.text}")

    data = response.json()
    candidates = data.get("candidates", [])
    if not candidates:
        raise GeminiImageError("Gemini returned no candidates.")

    parts = candidates[0].get("content", {}).get("parts", [])
    for part in parts:
        inline = part.get("inlineData") or part.get("inline_data")
        if inline and inline.get("data"):
            return GeminiImageResult(
                mime_type=inline.get("mimeType", "image/png"),
                base64_data=inline["data"],
                model=selected_model,
            )

    raise GeminiImageError("Gemini response did not include image binary data.")
