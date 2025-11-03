import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const countryMeta = {
  uganda: { name: 'Uganda', flag: '🇺🇬' },
  zimbabwe: { name: 'Zimbabwe', flag: '🇿🇼' },
  rwanda: { name: 'Rwanda', flag: '🇷🇼' },
  malawi: { name: 'Malawi', flag: '🇲🇼' },
  zambia: { name: 'Zambia', flag: '🇿🇲' },
  nigeria: { name: 'Nigeria', flag: '🇳🇬' },
  ghana: { name: 'Ghana', flag: '🇬🇭' },
}

function CountryHeader({ slug }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])
  const meta = countryMeta[slug] || { name: 'Country', flag: '🌍' }
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src="/ANA%20logo.jpg" alt="AAN logo" className="h-10 w-auto rounded-lg ring-2 ring-blue-500/60" />
          <span className="sr-only">Home</span>
        </Link>
        <div ref={ref} className="relative">
          <button onClick={() => setOpen(o => !o)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20">
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm">{meta.flag}</span>
            <span className="font-semibold hidden sm:inline">{meta.name}</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded-xl p-2 shadow-lg ring-1 ring-black/5 space-y-2">
              {Object.entries(countryMeta).map(([key, m]) => (
                <Link key={key} to={`/country/${key}`} className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm" onClick={() => setOpen(false)}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center">{m.flag}</span>
                  {m.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function CountryFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Access Africa Networks — Regional Sites
      </div>
    </footer>
  )
}

export default function CountryLanding() {
  const { slug } = useParams()
  const meta = countryMeta[slug] || { name: 'Country', flag: '🌍' }
  return (
    <div className="min-h-screen bg-white">
      <CountryHeader slug={slug} />
      <main className="pt-24">
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-100 text-yellow-600 shadow mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path d="M11.257 3.099c.366-.732 1.42-.732 1.786 0l8.25 16.5A1 1 0 0 1 20.422 21H3.578a1 1 0 0 1-.871-1.401l8.55-16.5zM12 9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1zm1 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/></svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{meta.flag} {meta.name}</h1>
            <p className="mt-4 text-gray-600 text-lg">oops! you walked in during renovations... come back later.</p>
            <div className="mt-8 relative">
              <div className="rounded-2xl border border-gray-200 p-8 bg-gradient-to-br from-gray-50 to-white shadow-sm">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="rounded-xl overflow-hidden bg-gray-100 h-40">
                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#9ca3af,#9ca3af_10px,#e5e7eb_10px,#e5e7eb_20px)] opacity-60" />
                  </div>
                  <div className="rounded-xl overflow-hidden bg-gray-100 h-40">
                    <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,#9ca3af,#9ca3af_10px,#e5e7eb_10px,#e5e7eb_20px)] opacity-60" />
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-500">We’re preparing localized content, services, and contact information for this region.</p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Back to main site</Link>
            </div>
          </div>
        </section>
      </main>
      <CountryFooter />
    </div>
  )
}
