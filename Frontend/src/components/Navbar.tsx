import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-max px-4 sm:px-6 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 group">
          <img src="/logo%20(2).png" alt="GS Events and Catering" className="h-12 w-36 sm:h-16 sm:w-52 object-contain transition-transform group-hover:scale-105" />
          <span className={`whitespace-nowrap font-serif text-xs sm:text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-primary-700' : 'text-white'}`}>
            GS Events &amp; Catering
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors ${
                    scrolled
                      ? active
                        ? 'text-primary-600'
                        : 'text-neutral-700 hover:text-primary-600'
                      : active
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className={`absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full ${scrolled ? 'bg-primary-500' : 'bg-white'}`} />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <Link to="/contact" className="btn-primary !py-2.5 !px-6 text-sm">
              Book Now
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${scrolled ? 'text-primary-700' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl bg-white shadow-2xl border border-neutral-100 overflow-hidden animate-scale-in">
          <ul className="flex flex-col p-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="p-2">
              <Link to="/contact" className="btn-primary w-full">
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
