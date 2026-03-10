import { writeFileSync } from 'fs'
const d = process.env.COMP

writeFileSync(d + '/Footer.tsx', `import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ background: '#1a1714', color: '#a89279' }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'repeating-linear-gradient(90deg, #a63d2f 0px, #a63d2f 12px, #c5973e 12px, #c5973e 16px, #2c5282 16px, #2c5282 28px, #c5973e 28px, #c5973e 32px)' }} />
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8"><path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" stroke="#c5973e" strokeWidth="1.5" fill="none" /><path d="M18 8L26 13V23L18 28L10 23V13L18 8Z" stroke="#c5973e" strokeWidth="1" fill="none" opacity="0.5" /><path d="M18 14L22 16.5V21.5L18 24L14 21.5V16.5L18 14Z" fill="#c5973e" opacity="0.3" /></svg>
              <span className="text-[1.5rem]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#f5f0e6' }}>Magaru<span style={{ color: '#c5973e' }}>Law</span></span>
            </div>
            <p className="text-[0.88rem] leading-[1.7] max-w-[320px] opacity-70">Avar k\u00fclt\u00fcr\u00fcn\u00fc dijital ortamda ya\u015fatmak, korumak ve gelecek nesillere aktarmak amac\u0131yla kurulan ba\u011f\u0131ms\u0131z k\u00fclt\u00fcrel platform.</p>
          </div>
          {/* Kesfet */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#e8dcc8' }}>Ke\u015ffet</h4>
            <ul className="flex flex-col gap-2">
              {['Makaleler', 'S\u00f6zl\u00fck', 'Galeri', 'Dersler', 'Haberler'].map((l) => <li key={l}><span className="text-[0.85rem] opacity-60 cursor-pointer transition-all duration-200 hover:opacity-100 hover:text-[#ddb866] inline-block hover:translate-x-[3px]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{l}</span></li>)}
            </ul>
          </div>
          {/* Topluluk */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#e8dcc8' }}>Topluluk</h4>
            <ul className="flex flex-col gap-2">
              {['Hakk\u0131m\u0131zda', 'Katk\u0131da Bulun', '\u0130leti\u015fim', 'Gizlilik Politikas\u0131'].map((l) => <li key={l}><span className="text-[0.85rem] opacity-60 cursor-pointer transition-all duration-200 hover:opacity-100 hover:text-[#ddb866] inline-block hover:translate-x-[3px]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{l}</span></li>)}
            </ul>
          </div>
          {/* Diller */}
          <div>
            <h4 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#e8dcc8' }}>Diller</h4>
            <ul className="flex flex-col gap-2">
              {['T\u00fcrk\u00e7e', '\u0410\u0432\u0430\u0440 \u043c\u0430\u0446I (Avarca)', '\u0420\u0443\u0441\u0441\u043a\u0438\u0439 (Rus\u00e7a)', 'English'].map((l) => <li key={l}><span className="text-[0.85rem] opacity-60 cursor-pointer transition-all duration-200 hover:opacity-100 hover:text-[#ddb866] inline-block hover:translate-x-[3px]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{l}</span></li>)}
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[0.75rem] opacity-40" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>&copy; {year} MagaruLaw. {t('rights')}</span>
          <div className="flex gap-4">
            <a href="#" aria-label="Telegram" className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:border-[#c5973e] hover:text-[#c5973e]" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#a89279' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.855.076 1.752.324 1.961.263.22.558.34.753.405l4.13 1.382c.204.06.426.05.624-.028l.008-.004 7.126-4.77a.438.438 0 0 1 .555.064.423.423 0 0 1-.012.6L10.45 14.01l-.215.209a.606.606 0 0 0-.17.397v.003l-.003.045-.008.087-.049.57-.066.79-.136 1.607c.14-.04.31-.104.489-.225l2.071-1.456 4.093 3.093c.561.423 1.283.482 1.836.188.554-.294.87-.812.986-1.404l2.698-13.77c.186-.947.04-1.663-.428-2.084a1.668 1.668 0 0 0-1.05-.445z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:border-[#c5973e] hover:text-[#c5973e]" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#a89279' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:border-[#c5973e] hover:text-[#c5973e]" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#a89279' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
`)
console.log('Footer.tsx written')
