import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Heart } from 'lucide-react';

const whatsappLink = 'https://wa.me/917978512963?text=Hi%20GS%20Events%20and%20Catering%2C%20I%20want%20to%20book%20an%20event.';
const instagramLink = 'https://www.instagram.com/gs_events_catering/';
const callLink = 'tel:+919937078889';
const emailLink = 'mailto:rozexeventmanagement@gmail.com';

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-neutral-400 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-transparent to-accent-950/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/50 to-transparent" />

      <div className="container-max relative px-4 sm:px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-5">
              <img src="/logo%20(2).png" alt="GS Events and Catering" className="h-32 w-72 object-contain object-left transition-transform hover:scale-105" />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              Creating unforgettable moments through the best event management in Brahmapur and Odisha, along with premium decorations and the best catering services in Odisha for weddings, corporate events, and celebrations.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={instagramLink} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-all hover:bg-primary-600 hover:text-white" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-all hover:bg-primary-600 hover:text-white" aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="transition-colors hover:text-primary-400">Home</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-primary-400">About Us</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary-400">Services</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-primary-400">Gallery</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-primary-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Our Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="transition-colors hover:text-primary-400">Grand Weddings</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary-400">Thread Ceremonies</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary-400">Birthday Parties</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary-400">Corporate Events</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary-400">Catering Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary-500 shrink-0" />
                <a href={callLink} className="transition-colors hover:text-primary-400">+91 99370 78889</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary-500 shrink-0" />
                <a href={emailLink} className="transition-colors hover:text-primary-400">rozexeventmanagement@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-500 shrink-0" />
                <span>Gandhinagar 5th Lane West, Berhampur</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} GS Events and Catering. All rights reserved.
          </p>
          <a
            href="https://deepak-kumar-sahu.pages.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-neutral-500 flex items-center gap-1.5 transition-colors hover:text-primary-400"
          >
            Designed by Deepak Kumar Sahu
          </a>
          <Link
            to="/admin-login"
            className="text-[11px] text-neutral-700 hover:text-neutral-500 transition-colors"
            aria-label="Admin login"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
