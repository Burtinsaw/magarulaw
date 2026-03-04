# MagaruLaw.com — Avar Kültür Platformu Tasarım Belgesi

**Tarih:** 2026-03-04
**Domain:** www.magarulaw.com
**Durum:** Onaylandı

---

## 1. Vizyon ve Hedef

Dağıstan'daki Avar halkı (Аварский народ) için global diasporayı kapsayan, çok dilli bir kültürel platform. Türkiye, Dağıstan ve dünya genelindeki Avar kökenli insanları ve konuyla ilgilenen araştırmacıları hedefler.

### Hedef Kitle
- Global Avar diasporası (~50.000+ Türkiye'de, Dağıstan'da ~1M, dünya genelinde dağınık)
- Konuyla ilgilenen araştırmacılar, tarihçiler, dilbilimciler

### Temel Değer Önerisi
- **Dijital Avarca-Türkçe sözlük yok** — ilk olacak
- **Türkiye Avar diasporası için web sitesi yok** — dolduracağız
- **Dağıstan haberlerinin Türkçe kaynağı yok** — otomatik çeviri ile çözeceğiz
- **Avarca dil kaybı ciddi** — dil öğrenme araçları ile mücadele

---

## 2. Desteklenen Diller

| Kod | Dil | Alfabe | Öncelik |
|-----|-----|--------|---------|
| `tr` | Türkçe | Latin | Birincil |
| `av` | Avarca (Авар мацӀ) | Kiril + Palochka (Ӏ/ӏ) | İkincil |
| `ru` | Rusça | Kiril | İkincil |
| `en` | İngilizce | Latin | Üçüncül |

**Font:** Noto Sans (Türkçe + Kiril + Palochka tam destek)

---

## 3. Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Runtime | Node.js 20 LTS |
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS 3.x (Next.js içinde çalışır) |
| Veritabanı | PostgreSQL 16 |
| Stil | Tailwind CSS 4 |
| i18n | next-intl |
| Medya CDN | Cloudinary (Free tier) |
| Haber toplama | FreshRSS (self-hosted) |
| Çeviri | Google Cloud Translation API v3 |
| Reverse Proxy | Caddy (Auto SSL) |
| Container | Docker + Docker Compose |

### Neden Payload CMS + Next.js?
- Field-level localization (alan bazında çok dilli)
- Tek uygulama (frontend + admin + API)
- Ücretsiz ve açık kaynak (MIT lisansı)
- Modern, yüksek performans (SSR/SSG)

---

## 4. İçerik Modelleri

### 4.1 Articles (Makaleler)
- title (localized), slug (localized), content (localized, rich text)
- excerpt (localized), coverImage, category, tags (localized)
- author (relation → users), source, sourceUrl
- publishedAt, status (draft|published|review), isAutoTranslated

### 4.2 Dictionary (Sözlük Girişleri)
- wordAvar, wordTurkish, wordRussian, wordEnglish
- pronunciation, audioFile, partOfSpeech
- exampleAvar, exampleTurkish
- category (Günlük, Aile, Yemek, Doğa...), difficulty
- relatedWords (self-relation)

### 4.3 Lessons (Dil Dersleri)
- title (localized), description (localized), level (A1-B2), order
- vocabularyWords (relation → dictionary)
- content (localized, rich text)
- exercises (array: flashcard, multiple_choice, fill_blank, matching)
- audioLesson

### 4.4 Gallery (Fotoğraf Galerisi)
- title (localized), description (localized)
- images (array: image, caption, location)
- album, photographer, dateTaken, tags

### 4.5 Users (Kullanıcılar)
- name, email, avatar, bio (localized)
- role (admin|editor|author|contributor)
- socialLinks, language

### 4.6 Categories (Kategoriler)
- name (localized), slug (localized), description (localized)
- icon, parent (self-relation)

### Varsayılan Kategoriler:
- Tarih & Kültür
- Haberler (Dağıstan)
- Diaspora
- Dil & Eğitim
- Sanat & Müzik
- Yemek Kültürü
- Kişiler
- Fotoğraf & Video

---

## 5. Sayfa Yapısı

### MVP Sayfaları
| Sayfa | URL Örneği | Açıklama |
|-------|------------|----------|
| Ana Sayfa | `/tr/` | Hero + son haberler + günün kelimesi + makaleler + galeri |
| Haberler | `/tr/haberler` | Dağıstan haberleri, otomatik çeviri |
| Makaleler | `/tr/makaleler` | Blog, kategori filtresi |
| Sözlük | `/tr/sozluk` | Arama + kategori bazlı kelime listesi |
| Galeri | `/tr/galeri` | Masonry fotoğraf galerisi + albümler |
| Hakkımızda | `/tr/hakkimizda` | Proje ve Avar halkı tanıtımı |

### Faz 2 Sayfaları
- Dil Dersleri (`/tr/dersler`)
- Yazarlar (`/tr/yazarlar`)
- Yazar Ol (`/tr/yazar-ol`)

### Faz 3 Sayfaları
- Etkinlikler (`/tr/etkinlikler`)
- Forum (Discourse entegrasyonu)

---

## 6. Haber Çekme Pipeline

### Kaynaklar
| Kaynak | Yöntem | Dil |
|--------|--------|-----|
| РИА Дагестан (riadagestan.ru) | RSS | Rusça |
| Черновик (chernovik.net) | Web scraping (XPath) | Rusça |
| Кавказский Узел (kavkaz-uzel.eu) | RSS | Rusça |
| "Истина" gazetesi | Web scraping | Avarca |
| РГВК Дагестан | RSS | Rusça |

### Pipeline Akışı
1. **FreshRSS** her 2 saatte kaynakları tarar (RSS + XPath scraping)
2. **Python cron job** yeni haberleri FreshRSS API'den çeker
3. **Google Cloud Translation API** ile Rusça → Türkçe/İngilizce çeviri
4. **Payload CMS REST API** üzerinden taslak makale olarak kaydeder
5. `isAutoTranslated: true` işaretlenir
6. Otomatik yayınlanır (editör sonradan düzenleyebilir)

### Maliyet: Google Translate API
- Ücretsiz: 500.000 karakter/ay
- Tahmini günlük haber hacmi: ~5-10 haber × ~3.000 karakter = ~15.000-30.000 karakter/gün
- Aylık: ~450K-900K karakter → Ücretsiz tier'da kalır veya minimal maliyet

---

## 7. Sözlük ve Dil Öğrenme

### Avarca-Türkçe Sözlük
- Maarulal.ru'nun 5 dilli sözlüğünden başlangıç verisi toplanabilir
- Google Play'deki "Аварский Словарь" uygulamasında 14.000 kelime var (referans)
- Topluluk katkısıyla büyüyecek

### Flash Kart Sistemi
- **ts-fsrs** kütüphanesi (FSRS algoritması, Anki'den daha iyi)
- React bileşenleri: FlashcardViewer, QuizEngine, ProgressTracker
- Sesli telaffuz: Pre-recorded MP3 (Avarca) + TTS API (Türkçe/Rusça)

---

## 8. Deployment

### Docker Compose Yapısı
```
services:
  app:        # Next.js + Payload CMS (Port 3000)
  db:         # PostgreSQL 16 (Port 5432)
  freshrss:   # FreshRSS (Port 8080)
  caddy:      # Reverse Proxy + Auto SSL (Port 80, 443)
```

### Kullanıcının Kendi Sunucusu
- Docker + Docker Compose kurulumu yeterli
- Minimum: 2 vCPU, 4GB RAM, 40GB SSD
- Caddy ile otomatik SSL (Let's Encrypt)
- CloudFlare DNS (ücretsiz DDoS koruması)
- PostgreSQL otomatik yedekleme (cron + pg_dump)

---

## 9. Tahmini Maliyet

| Kalem | Aylık | Yıllık |
|-------|-------|--------|
| Domain (magarulaw.com) | — | ~$12 |
| Cloudinary (Free tier) | $0 | $0 |
| Google Translate API (Free tier) | $0 | $0 |
| SMTP - Resend (Free tier) | $0 | $0 |
| Sunucu | Mevcut | $0 |
| **Toplam** | **~$1/ay** | **~$12/yıl** |

---

## 10. MVP Zaman Çizelgesi

| Hafta | İş Paketi |
|-------|-----------|
| Hafta 1 | Proje kurulumu, Payload config, i18n, temel koleksiyonlar |
| Hafta 2 | Ana sayfa, makale sayfaları, galeri, sözlük UI |
| Hafta 3 | Haber pipeline (FreshRSS + çeviri), deployment, domain |
| Hafta 4 | Test, içerik girişi, lansman |

---

## 11. Mevcut Avar Dijital Kaynaklar (Referans)

| Kaynak | URL | Açıklama |
|--------|-----|----------|
| maarulal.ru | http://maarulal.ru/ | Avar kültür portalı + 5 dilli sözlük |
| avar.me | https://avar.me/ | Avarca-Rusça sözlük |
| avar.rocks | https://avar.rocks/ | Açık kaynak dil kaynakları |
| av.wikipedia.org | https://av.wikipedia.org/ | Avarca Wikipedia (~2.400 makale) |
| Omniglot Avar | https://www.omniglot.com/writing/avar.htm | Avar alfabesi referansı |

---

## 12. Gelecek Geliştirmeler (Post-MVP)

- Mobil uygulama (React Native / PWA)
- Topluluk forumu (Discourse entegrasyonu)
- Avarca klavye aracı (web-based)
- Video içerik platformu (YouTube entegrasyonu)
- Podcast / sesli içerik
- Soy ağacı / genealoji araçları
- AI destekli Avarca-Türkçe çeviri modeli (uzun vadeli)
