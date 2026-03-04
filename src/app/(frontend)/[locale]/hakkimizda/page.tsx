import { setRequestLocale } from 'next-intl/server'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{"Hakk\u0131m\u0131zda / About"}</h1>
      <div className="prose prose-lg">
        <p>
          <strong>MagaruLaw</strong>{", Da\u011F\u0131stan\u2019\u0131n kadim halk\u0131 olan Avarlar\u0131n k\u00FClt\u00FCr\u00FCn\u00FC, dilini ve tarihini korumak ve yaymak amac\u0131yla kurulmu\u015F ba\u011F\u0131ms\u0131z bir dijital platformdur."}
        </p>
        <h2>Misyonumuz</h2>
        <p>
          {"D\u00FCnya genelinde da\u011F\u0131n\u0131k ya\u015Fayan Avar diasporas\u0131n\u0131 tek bir dijital \u00E7at\u0131 alt\u0131nda bulu\u015Fturmak, Avarca dilinin \u00F6\u011Frenilmesini ve korunmas\u0131n\u0131 desteklemek, Da\u011F\u0131stan\u2019dan g\u00FCncel haberleri T\u00FCrk\u00E7e, \u0130ngilizce ve Avarca olarak sunmak."}
        </p>
        <h2>{"Avar Halk\u0131 Hakk\u0131nda"}</h2>
        <p>
          {"Avarlar (\u0410\u0432\u0430\u0440, \u041C\u0430\u0433\u0406\u0430\u0440\u0443\u043B\u0430\u043B), Da\u011F\u0131stan Cumhuriyeti\u2019nin en kalabal\u0131k etnik grubudur. Yakla\u015F\u0131k 1 milyon ki\u015Filik n\u00FCfusuyla Kuzey Kafkasya\u2019n\u0131n en b\u00FCy\u00FCk halklar\u0131ndan biridir."}
        </p>
        <h2>{"Katk\u0131da Bulunun"}</h2>
        <p>
          {"Bu platform topluluk katk\u0131s\u0131yla b\u00FCy\u00FCmektedir. Yazar olmak, s\u00F6zl\u00FC\u011Fe kelime eklemek veya foto\u011Fraf payla\u015Fmak isterseniz bizimle ileti\u015Fime ge\u00E7in."}
        </p>
      </div>
    </div>
  )
}
