import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaArrowRight } from 'react-icons/fa';

// Internal header that hides on scroll down and shows on scroll up
function HideOnScrollHeader() {
  const [hidden, setHidden] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  const lastY = React.useRef(0);
  const [locOpen, setLocOpen] = React.useState(false);
  const locRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setAtTop(y < 4);
      setHidden(y > lastY.current && y > 24);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close location dropdown when clicking outside
  React.useEffect(() => {
    const onDocClick = (e) => {
      if (locRef.current && !locRef.current.contains(e.target)) {
        setLocOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div
      className={
        `fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`
      }
    >
      <div className={`mx-auto px-6 py-4 flex items-center justify-between ${atTop ? 'bg-transparent' : 'bg-black/50 backdrop-blur'} text-white`}>
          <div className="flex items-center gap-4">
          <button aria-label="Menu" className="p-2 rounded hover:bg-white/10 text-white"><FaBars /></button>
          <Link to="/">
            <img src="/ANA%20logo.jpg" alt="AAN logo" className="h-12 md:h-14 w-auto rounded-xl ring-2 ring-blue-500/60 drop-shadow-[14px_0_0_rgba(37,99,235,0.55)]" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/services"
            className="relative group inline-flex items-center px-2 py-1 rounded-md text-blue-300 hover:text-blue-100 font-semibold tracking-wide transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:bg-blue-300 after:opacity-0 after:transform after:scale-x-0 after:transition-all after:duration-300 group-hover:after:opacity-100 group-hover:after:scale-x-100"
          >
            Services
          </Link>
          <Link
            to="/sectors"
            className="relative group inline-flex items-center px-2 py-1 rounded-md text-blue-300 hover:text-blue-100 font-semibold tracking-wide transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:bg-blue-300 after:opacity-0 after:transform after:scale-x-0 after:transition-all after:duration-300 group-hover:after:opacity-100 group-hover:after:scale-x-100"
          >
            Sectors
          </Link>
          <Link
            to="/profile"
            className="relative group inline-flex items-center px-2 py-1 rounded-md text-blue-300 hover:text-blue-100 font-semibold tracking-wide transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:bg-blue-300 after:opacity-0 after:transform after:scale-x-0 after:transition-all after:duration-300 group-hover:after:opacity-100 group-hover:after:scale-x-100"
          >
            Profile
          </Link>
          <Link
            to="/contact-us"
            className="relative group inline-flex items-center px-2 py-1 rounded-md text-blue-300 hover:text-blue-100 font-semibold tracking-wide transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:bg-blue-300 after:opacity-0 after:transform after:scale-x-0 after:transition-all after:duration-300 group-hover:after:opacity-100 group-hover:after:scale-x-100"
          >
            Contact
          </Link>
        </div>
        {/* Location selector (Kenya default) */}
        <div ref={locRef} className="relative">
          <button
            onClick={() => setLocOpen(o => !o)}
            aria-expanded={locOpen}
            className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold"
          >
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm">🇰🇪</span>
            <span className="hidden sm:inline">Kenya</span>
          </button>

          {locOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-gray-100 text-gray-900 rounded-xl p-2 shadow-lg ring-1 ring-black/5 space-y-2">
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm"
                onClick={() => { /* placeholder action */ setLocOpen(false); }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center">🇺🇬</span>
                Uganda
              </button>
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm"
                onClick={() => { /* placeholder action */ setLocOpen(false); }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center">🇿🇼</span>
                Zimbabwe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Provide both a named and default export to avoid resolution issues
export { HideOnScrollHeader };
export default HideOnScrollHeader;


