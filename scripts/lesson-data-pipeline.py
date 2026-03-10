"""
MagaruLaw Ders Verisi Pipeline
================================
avarsky.ru'dan toplanan Avarca-Rusça verileri Google Translate ile Türkçe'ye çevirir.
Çıktı: src/data/lessons.json — Next.js Dersler sayfası için yapılandırılmış veri.

Kullanım:
    python scripts/lesson-data-pipeline.py
"""

import json
import time
import os
from deep_translator import GoogleTranslator

# --- Çevirmen ---
ru_to_tr = GoogleTranslator(source='ru', target='tr')

def translate_ru_tr(text: str) -> str:
    """Rusça→Türkçe çeviri, rate limit korumalı."""
    if not text:
        return ""
    try:
        result = ru_to_tr.translate(text)
        time.sleep(0.3)  # rate limit
        return result or text
    except Exception as e:
        print(f"  [!] Çeviri hatası: {text[:30]}... → {e}")
        return text

# ============================================================
# HAM VERİ: avarsky.ru'dan toplanan Avarca-Rusça içerik
# ============================================================

RAW_LESSONS = [
    # ── DERS 1: Alfabe ──
    {
        "id": "alfabe",
        "order": 1,
        "level": "A1",
        "title_ru": "Аварский алфавит",
        "title_av": "Авар алфавит",
        "description_ru": "46 букв аварского алфавита с произношением и примерами",
        "content": {
            "intro_ru": "Аварский алфавит состоит из 46 букв — 33 стандартные русские буквы плюс 13 специальных двухбуквенных комбинаций для кавказских звуков.",
            "alphabet": [
                "А а", "Б б", "В в", "Г г", "Гъ гъ", "Гь гь", "ГI гI",
                "Д д", "Е е", "Ё ё", "Ж ж", "З з", "И и", "Й й",
                "К к", "Къ къ", "Кь кь", "КI кI", "Л л", "Лъ лъ",
                "М м", "Н н", "О о", "П п", "Р р", "С с", "Т т", "ТI тI",
                "У у", "Ф ф", "Х х", "Хъ хъ", "Хь хь", "ХI хI",
                "Ц ц", "ЦI цI", "Ч ч", "ЧI чI", "Ш ш", "Щ щ",
                "Ъ ъ", "Ы ы", "Ь ь", "Э э", "Ю ю", "Я я"
            ],
            "special_sounds_ru": [
                {"letters": "Гъ, Къ, Хъ", "description_ru": "Гортанные звуки, произносимые в горле"},
                {"letters": "Гь, Кь, Хь", "description_ru": "Мягкие варианты с особой артикуляцией"},
                {"letters": "КI, ТI, ЦI, ЧI", "description_ru": "Абруптивные (смычногортанные) согласные"},
                {"letters": "ГI, ХI", "description_ru": "Фарингальные звуки"},
                {"letters": "Лъ", "description_ru": "Глухой боковой звук (глухое л)"}
            ]
        }
    },

    # ── DERS 2: Selamlaşma ──
    {
        "id": "selamlasma",
        "order": 2,
        "level": "A1",
        "title_ru": "Приветствие, прощание и ответы",
        "title_av": "Салам, гьит1ин ва жавабал",
        "description_ru": "Основные приветствия, прощания и вежливые выражения на аварском языке",
        "content": {
            "intro_ru": "Аварские приветствия различаются по полу собеседника. Для мужчин используется классный показатель «в», для женщин — «й», для множественного числа — «р».",
            "sections": [
                {
                    "title_ru": "Приветствия",
                    "phrases": [
                        {"av": "Салам", "ru": "Привет / Здравствуйте"},
                        {"av": "АсаламгIалайкум", "ru": "Мир вам (исламское приветствие)"},
                        {"av": "ВагIалайкум салам", "ru": "И вам мир (ответ)"},
                        {"av": "ВорчIами", "ru": "Здравствуй / Доброе утро (к мужчине)"},
                        {"av": "ЙорчIами", "ru": "Здравствуй / Доброе утро (к женщине)"},
                        {"av": "РорчIами", "ru": "Здравствуйте (ко многим)"},
                    ]
                },
                {
                    "title_ru": "Приезд и возвращение",
                    "phrases": [
                        {"av": "ЛъикI щварав", "ru": "С приездом! (к мужчине)"},
                        {"av": "ЛъикI щварай", "ru": "С приездом! (к женщине)"},
                        {"av": "ЛъикI щварал", "ru": "С приездом! (ко многим)"},
                        {"av": "ЛъикI вуссарав", "ru": "С возвращением! (к мужчине)"},
                        {"av": "ЛъикI ватарав", "ru": "Рад застать в здравии! (к мужчине)"},
                    ]
                },
                {
                    "title_ru": "Прощание",
                    "phrases": [
                        {"av": "Нахъа лъикI рихьаги", "ru": "До свидания"},
                        {"av": "Къо-мех лъикI", "ru": "Прощайте"},
                        {"av": "Сордо лъикI", "ru": "Спокойной ночи"},
                        {"av": "Нух битIаги", "ru": "Счастливого пути (одному)"},
                        {"av": "Нухал ритIаги", "ru": "Счастливого пути (многим)"},
                    ]
                }
            ]
        }
    },

    # ── DERS 3: Sayılar ──
    {
        "id": "sayilar",
        "order": 3,
        "level": "A1",
        "title_ru": "Как считать на аварском",
        "title_av": "Авар мацIалда гьисаб",
        "description_ru": "Числа от 1 до 1000 на аварском языке",
        "content": {
            "intro_ru": "Аварская числовая система основана на двадцатеричной системе (как в грузинском и баскском языках).",
            "sections": [
                {
                    "title_ru": "Числа от 1 до 10",
                    "words": [
                        {"av": "цо", "ru": "один", "num": 1},
                        {"av": "кIиго", "ru": "два", "num": 2},
                        {"av": "лъабго", "ru": "три", "num": 3},
                        {"av": "ункъо", "ru": "четыре", "num": 4},
                        {"av": "щуго", "ru": "пять", "num": 5},
                        {"av": "анлъго", "ru": "шесть", "num": 6},
                        {"av": "анкьго", "ru": "семь", "num": 7},
                        {"av": "микьго", "ru": "восемь", "num": 8},
                        {"av": "ичIго", "ru": "девять", "num": 9},
                        {"av": "анцIго", "ru": "десять", "num": 10},
                    ]
                },
                {
                    "title_ru": "Числа от 11 до 20",
                    "words": [
                        {"av": "анцIила цо", "ru": "одиннадцать", "num": 11},
                        {"av": "анцIила кIиго", "ru": "двенадцать", "num": 12},
                        {"av": "анцIила лъабго", "ru": "тринадцать", "num": 13},
                        {"av": "анцIила ункъго", "ru": "четырнадцать", "num": 14},
                        {"av": "анцIила щуго", "ru": "пятнадцать", "num": 15},
                        {"av": "къого", "ru": "двадцать", "num": 20},
                    ]
                },
                {
                    "title_ru": "Десятки и больше",
                    "words": [
                        {"av": "лъеберго", "ru": "тридцать", "num": 30},
                        {"av": "нусго", "ru": "сто", "num": 100},
                        {"av": "азарго", "ru": "тысяча", "num": 1000},
                    ]
                }
            ]
        }
    },

    # ── DERS 4: Temel Fiiller ──
    {
        "id": "temel-fiiller",
        "order": 4,
        "level": "A1",
        "title_ru": "Основные глаголы аварского языка",
        "title_av": "Авар мацIалъул хIалтIи гIадамал",
        "description_ru": "Самые употребительные глаголы аварского языка с примерами",
        "content": {
            "intro_ru": "Аварские глаголы изменяются по грамматическим классам (мужской, женский, вещественный) и временам.",
            "sections": [
                {
                    "title_ru": "Бытие и существование",
                    "words": [
                        {"av": "буго", "ru": "есть, имеется", "example_av": "Дир вац буго", "example_ru": "У меня есть брат"},
                        {"av": "гьечIо", "ru": "нет, не имеется", "example_av": "Дир яц гьечIо", "example_ru": "У меня нет сестры"},
                        {"av": "букIине", "ru": "быть", "example_av": "", "example_ru": ""},
                    ]
                },
                {
                    "title_ru": "Движение",
                    "words": [
                        {"av": "ине", "ru": "идти", "example_av": "", "example_ru": ""},
                        {"av": "бачIине", "ru": "прийти", "example_av": "", "example_ru": ""},
                        {"av": "боржине", "ru": "летать", "example_av": "", "example_ru": ""},
                        {"av": "лъутизе", "ru": "убегать", "example_av": "", "example_ru": ""},
                        {"av": "бекеризе", "ru": "бегать", "example_av": "", "example_ru": ""},
                        {"av": "бусс-ине", "ru": "возвращаться", "example_av": "", "example_ru": ""},
                    ]
                },
                {
                    "title_ru": "Действия",
                    "words": [
                        {"av": "цIализе", "ru": "читать", "example_av": "Дун жуз цIализе", "example_ru": "Я читаю книгу"},
                        {"av": "хъвазе", "ru": "писать", "example_av": "", "example_ru": ""},
                        {"av": "гъабизе", "ru": "делать", "example_av": "", "example_ru": ""},
                        {"av": "бокъизе", "ru": "любить", "example_av": "", "example_ru": ""},
                        {"av": "бихьизе", "ru": "видеть", "example_av": "", "example_ru": ""},
                    ]
                },
                {
                    "title_ru": "Чувства",
                    "words": [
                        {"av": "гIодизе", "ru": "плакать", "example_av": "", "example_ru": ""},
                        {"av": "ахIизе", "ru": "кричать", "example_av": "", "example_ru": ""},
                        {"av": "боххизе", "ru": "радоваться", "example_av": "", "example_ru": ""},
                    ]
                }
            ]
        }
    },

    # ── DERS 5: İsimler ve Çoğullar ──
    {
        "id": "isimler-cogullar",
        "order": 5,
        "level": "A2",
        "title_ru": "Существительные и множественное число",
        "title_av": "ЦIарал ва жамагIат гьисаб",
        "description_ru": "Образование множественного числа существительных в аварском языке",
        "content": {
            "intro_ru": "В аварском языке множественное число образуется с помощью различных суффиксов: -ал/-ял, -(а)би, -заби и других.",
            "sections": [
                {
                    "title_ru": "Суффикс -ал / -ял",
                    "description_ru": "Самый распространённый суффикс для образования множественного числа",
                    "words": [
                        {"av": "квер", "av_plural": "кверал", "ru": "рука", "ru_plural": "руки"},
                        {"av": "къо", "av_plural": "къоял", "ru": "день", "ru_plural": "дни"},
                        {"av": "лъар", "av_plural": "лъарал", "ru": "река", "ru_plural": "реки"},
                        {"av": "чу", "av_plural": "чуял", "ru": "лошадь", "ru_plural": "лошади"},
                        {"av": "вац", "av_plural": "вацал", "ru": "брат", "ru_plural": "братья"},
                        {"av": "ци", "av_plural": "циял", "ru": "медведь", "ru_plural": "медведи"},
                    ]
                },
                {
                    "title_ru": "Суффикс -(а)би",
                    "description_ru": "Используется для слов на гласную и слов с окончанием -ен",
                    "words": [
                        {"av": "маргьа", "av_plural": "маргьаби", "ru": "сказка", "ru_plural": "сказки"},
                        {"av": "школа", "av_plural": "школаби", "ru": "школа", "ru_plural": "школы"},
                        {"av": "ца", "av_plural": "цаби", "ru": "зуб", "ru_plural": "зубы"},
                        {"av": "росу", "av_plural": "росаби", "ru": "село", "ru_plural": "сёла"},
                    ]
                },
                {
                    "title_ru": "Суффикс -заби",
                    "description_ru": "Для профессий и терминов родства",
                    "words": [
                        {"av": "устар", "av_plural": "устарзаби", "ru": "мастер", "ru_plural": "мастера"},
                        {"av": "учитель", "av_plural": "учительзаби", "ru": "учитель", "ru_plural": "учителя"},
                    ]
                }
            ]
        }
    },

    # ── DERS 6: Temel Kelimeler (Doğa, Ev, Aile) ──
    {
        "id": "temel-kelimeler",
        "order": 6,
        "level": "A1",
        "title_ru": "Основные слова: природа, дом, семья",
        "title_av": "ТIабигIат, хан, тIагъур",
        "description_ru": "Повседневные слова для описания природы, дома и семейных отношений",
        "content": {
            "intro_ru": "Базовые слова аварского языка, необходимые для повседневного общения.",
            "sections": [
                {
                    "title_ru": "Природа",
                    "words": [
                        {"av": "мега", "ru": "солнце"},
                        {"av": "моцI", "ru": "луна"},
                        {"av": "ракь", "ru": "звезда"},
                        {"av": "гIор", "ru": "река"},
                        {"av": "мехед", "ru": "гора"},
                        {"av": "росу", "ru": "село, деревня"},
                        {"av": "хIур", "ru": "поле"},
                        {"av": "рохь", "ru": "лес"},
                        {"av": "лъим", "ru": "вода"},
                        {"av": "цIа", "ru": "огонь"},
                        {"av": "ракь", "ru": "земля"},
                        {"av": "гьури", "ru": "ветер"},
                    ]
                },
                {
                    "title_ru": "Дом",
                    "words": [
                        {"av": "хан", "ru": "дом"},
                        {"av": "рукъ", "ru": "комната"},
                        {"av": "нуцI", "ru": "дверь"},
                        {"av": "гор", "ru": "окно"},
                        {"av": "тахта", "ru": "кровать"},
                        {"av": "стол", "ru": "стол"},
                    ]
                },
                {
                    "title_ru": "Семья",
                    "words": [
                        {"av": "эмен", "ru": "отец"},
                        {"av": "эбел", "ru": "мать"},
                        {"av": "вац", "ru": "брат"},
                        {"av": "яц", "ru": "сестра"},
                        {"av": "лъимер", "ru": "ребёнок"},
                        {"av": "чи", "ru": "человек, мужчина"},
                        {"av": "хIинчI", "ru": "женщина"},
                        {"av": "бабай", "ru": "дедушка"},
                        {"av": "бабу", "ru": "бабушка"},
                    ]
                }
            ]
        }
    },
]


def translate_lesson(lesson: dict) -> dict:
    """Bir dersi Rusça'dan Türkçe'ye çevirir."""
    print(f"\n{'='*60}")
    print(f"Ders {lesson['order']}: {lesson['title_ru']}")
    print(f"{'='*60}")

    result = {
        "id": lesson["id"],
        "order": lesson["order"],
        "level": lesson["level"],
        "title_av": lesson.get("title_av", ""),
        "title_tr": translate_ru_tr(lesson["title_ru"]),
        "title_ru": lesson["title_ru"],
        "description_tr": translate_ru_tr(lesson["description_ru"]),
        "description_ru": lesson["description_ru"],
        "content": {}
    }

    content = lesson["content"]

    # Intro
    if "intro_ru" in content:
        result["content"]["intro_tr"] = translate_ru_tr(content["intro_ru"])
        result["content"]["intro_ru"] = content["intro_ru"]
        print(f"  intro: ✓")

    # Alphabet (özel yapı)
    if "alphabet" in content:
        result["content"]["alphabet"] = content["alphabet"]

    # Special sounds
    if "special_sounds_ru" in content:
        result["content"]["special_sounds"] = []
        for sound in content["special_sounds_ru"]:
            result["content"]["special_sounds"].append({
                "letters": sound["letters"],
                "description_tr": translate_ru_tr(sound["description_ru"]),
                "description_ru": sound["description_ru"]
            })
        print(f"  special_sounds: ✓ ({len(content['special_sounds_ru'])} öğe)")

    # Sections (phrases veya words)
    if "sections" in content:
        result["content"]["sections"] = []
        for section in content["sections"]:
            s = {
                "title_tr": translate_ru_tr(section["title_ru"]),
                "title_ru": section["title_ru"],
            }

            if "description_ru" in section:
                s["description_tr"] = translate_ru_tr(section["description_ru"])
                s["description_ru"] = section["description_ru"]

            # Phrases (selamlaşma gibi)
            if "phrases" in section:
                s["phrases"] = []
                for phrase in section["phrases"]:
                    s["phrases"].append({
                        "av": phrase["av"],
                        "tr": translate_ru_tr(phrase["ru"]),
                        "ru": phrase["ru"],
                    })
                print(f"  section '{section['title_ru']}': ✓ ({len(section['phrases'])} ifade)")

            # Words (sayılar, kelimeler gibi)
            if "words" in section:
                s["words"] = []
                for word in section["words"]:
                    w = {
                        "av": word["av"],
                        "tr": translate_ru_tr(word["ru"]),
                        "ru": word["ru"],
                    }
                    # Opsiyonel alanlar
                    if "num" in word:
                        w["num"] = word["num"]
                    if "av_plural" in word:
                        w["av_plural"] = word["av_plural"]
                        w["tr_plural"] = translate_ru_tr(word["ru_plural"])
                        w["ru_plural"] = word["ru_plural"]
                    if "example_av" in word and word["example_av"]:
                        w["example_av"] = word["example_av"]
                        w["example_tr"] = translate_ru_tr(word["example_ru"])
                        w["example_ru"] = word["example_ru"]
                    s["words"].append(w)
                print(f"  section '{section['title_ru']}': ✓ ({len(section['words'])} kelime)")

            result["content"]["sections"].append(s)

    return result


def main():
    print("MagaruLaw Ders Verisi Pipeline")
    print("=" * 60)
    print(f"Toplam {len(RAW_LESSONS)} ders işlenecek")
    print(f"Çeviri yönü: Rusça → Türkçe (Google Translate)")
    print()

    translated_lessons = []
    for lesson in RAW_LESSONS:
        translated = translate_lesson(lesson)
        translated_lessons.append(translated)

    # Çıktı dizini
    output_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "lessons.json")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(translated_lessons, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"✓ {len(translated_lessons)} ders başarıyla çevrildi")
    print(f"✓ Çıktı: {output_path}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
