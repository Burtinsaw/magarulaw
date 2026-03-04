"""
News Pipeline: Fetches articles from FreshRSS and translates RU->TR/EN
then creates draft articles in Payload CMS via REST API.
"""
import os
import json
import time
import requests
import schedule
from datetime import datetime, timezone

FRESHRSS_URL = os.getenv("FRESHRSS_URL", "http://freshrss:80")
FRESHRSS_USER = os.getenv("FRESHRSS_USER", "admin")
FRESHRSS_API_KEY = os.getenv("FRESHRSS_API_KEY", "")
PAYLOAD_URL = os.getenv("PAYLOAD_URL", "http://app:3000")
PAYLOAD_API_KEY = os.getenv("PAYLOAD_API_KEY", "")
GOOGLE_TRANSLATE_API_KEY = os.getenv("GOOGLE_TRANSLATE_API_KEY", "")
CATEGORY_ID = os.getenv("NEWS_CATEGORY_ID", "")


def translate_text(text: str, target_lang: str) -> str:
    """Translate text using Google Cloud Translation API."""
    if not text or not GOOGLE_TRANSLATE_API_KEY:
        return text

    url = "https://translation.googleapis.com/language/translate/v2"
    params = {
        "q": text,
        "target": target_lang,
        "source": "ru",
        "key": GOOGLE_TRANSLATE_API_KEY,
        "format": "text",
    }
    try:
        resp = requests.post(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()["data"]["translations"][0]["translatedText"]
    except Exception as e:
        print(f"Translation error: {e}")
        return text


def fetch_freshrss_entries():
    """Fetch unread entries from FreshRSS Google Reader API."""
    try:
        url = f"{FRESHRSS_URL}/api/greader.php/reader/api/0/stream/contents/reading-list"
        headers = {"Authorization": f"GoogleLogin auth={FRESHRSS_API_KEY}"}
        params = {"n": 20, "xt": "user/-/state/com.google/read"}
        resp = requests.get(url, headers=headers, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json().get("items", [])
    except Exception as e:
        print(f"FreshRSS fetch error: {e}")
        return []


def create_payload_article(title_tr: str, content_tr: str, title_en: str,
                           content_en: str, source: str, source_url: str):
    """Create a draft article in Payload CMS."""
    slug = title_tr[:80].lower().replace(" ", "-").replace("'", "")

    headers = {"Content-Type": "application/json"}
    if PAYLOAD_API_KEY:
        headers["Authorization"] = f"users API-Key {PAYLOAD_API_KEY}"

    data = {
        "title": title_tr,
        "slug": slug,
        "excerpt": content_tr[:200] + "..." if len(content_tr) > 200 else content_tr,
        "source": source,
        "sourceUrl": source_url,
        "publishedAt": datetime.now(timezone.utc).isoformat(),
        "status": "published",
        "isAutoTranslated": True,
    }

    if CATEGORY_ID:
        data["category"] = CATEGORY_ID

    try:
        resp = requests.post(
            f"{PAYLOAD_URL}/api/articles?locale=tr",
            json=data,
            headers=headers,
            timeout=30,
        )
        resp.raise_for_status()
        article_id = resp.json().get("doc", {}).get("id")

        if article_id and title_en:
            requests.patch(
                f"{PAYLOAD_URL}/api/articles/{article_id}?locale=en",
                json={"title": title_en, "excerpt": content_en[:200] + "..."},
                headers=headers,
                timeout=30,
            )

        print(f"Created article: {title_tr[:60]}...")
        return article_id
    except Exception as e:
        print(f"Payload create error: {e}")
        return None


def run_pipeline():
    """Main pipeline: fetch -> translate -> create."""
    print(f"[{datetime.now()}] Running news pipeline...")
    entries = fetch_freshrss_entries()
    print(f"Found {len(entries)} new entries")

    for entry in entries:
        title_ru = entry.get("title", "")
        content_ru = entry.get("summary", {}).get("content", "")
        source_url = entry.get("alternate", [{}])[0].get("href", "")
        source = entry.get("origin", {}).get("title", "Unknown")

        if not title_ru:
            continue

        title_tr = translate_text(title_ru, "tr")
        content_tr = translate_text(content_ru[:3000], "tr")
        title_en = translate_text(title_ru, "en")
        content_en = translate_text(content_ru[:3000], "en")

        create_payload_article(title_tr, content_tr, title_en, content_en,
                               source, source_url)
        time.sleep(1)

    print(f"[{datetime.now()}] Pipeline complete.")


if __name__ == "__main__":
    print("Starting news pipeline scheduler...")
    run_pipeline()
    schedule.every(2).hours.do(run_pipeline)

    while True:
        schedule.run_pending()
        time.sleep(60)
