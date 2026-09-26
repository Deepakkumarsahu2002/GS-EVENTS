import { Link } from 'react-router-dom';
import { Award, ArrowRight, Calendar, CheckCircle2, Users, UtensilsCrossed } from 'lucide-react';
import Reveal from '@/components/Reveal';

const values = [
  { icon: Award, title: 'Excellence', desc: 'Every event is executed to perfection, down to the smallest detail.' },
  { icon: Users, title: 'Client-First', desc: 'Your vision is our blueprint. We listen, understand, and deliver exactly what you dreamed of.' },
  { icon: UtensilsCrossed, title: 'Culinary Mastery', desc: 'Authentic flavors, fresh ingredients, and presentation that wows.' },
  { icon: Calendar, title: 'Reliability', desc: '15+ years of flawless execution. We deliver on every promise.' },
];

const milestones = [
  ['2009', 'GS Events founded with a small team and big dreams'],
  ['2013', 'Expanded to full-service catering across Karnataka'],
  ['2017', 'Crossed 200+ successful events milestone'],
  ['2021', 'Launched premium decor and theme services'],
  ['2024', '500+ events delivered and growing stronger'],
];

const highlights = [
  'Multi-cuisine catering — North Indian, South Indian, Chinese, Continental',
  'Custom theme decorations for any event type',
  'Dedicated event coordinator for every booking',
  'On-time delivery and setup, guaranteed',
  'Flexible packages to fit any budget',
  'Trusted by 500+ families across India',
];

const recognitions = [
  'FSSAI Certified Kitchen',
  'Best Wedding Caterer, Odisha Hospitality Awards 2023',
  'HACCP Food Safety Compliant',
  'Featured — WeddingSutra Favourites 2024',
];

export default function AboutRedesigned() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 pt-32 pb-20">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-600/15 blur-3xl" />
        <div className="container-max relative px-4 text-center sm:px-6 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Our Story</span>
          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">Years of celebrations, one obsession with detail</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">For over 15 years, GS Events and Catering has been turning ordinary moments into extraordinary memories.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal><div className="flex h-[420px] w-full items-center justify-center overflow-visible rounded-3xl bg-white p-3 shadow-2xl lg:h-[560px]"><img src="/founder.png" alt="Gopal Subudhi, founder of GS Events and Catering" loading="lazy" className="max-h-full max-w-full object-contain" /></div></Reveal>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Founder</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">K. Gopal Subudhi</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
            <div className="mt-5 space-y-4 leading-relaxed text-neutral-600">
              <p>For the past 15 years, I have dedicated myself to creating meaningful celebrations and unforgettable dining experiences. What began as a humble dream has grown into a journey shaped by passion, perseverance, and countless cherished memories.</p>
              <p>For me, this is more than a business—it is my heart, my purpose, and a dream I have nurtured from the very beginning. Starting from the ground up, I built this journey with hard work, commitment, and a single guiding principle: client satisfaction above all else.</p>
              <p>Every event I serve is an opportunity to transform a special moment into a memory that lasts a lifetime. Today, I am proud of how far this journey has come, while staying true to the values that inspired me 15 years ago—excellence, quality, and heartfelt service.</p>
              <p className="font-serif text-xl text-neutral-900">“Luxury is not gold on everything. It is a guest who never has to ask for anything.”</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl" />
        <Reveal className="container-max relative mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Our Approach</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">Design first, hospitality always</h2>
          <p className="mt-5 leading-relaxed text-white/70">We start with your story, not a package. Every mood board, run sheet, and tasting is built around the people in the room, then executed with a crew that has done it five hundred times.</p>
        </Reveal>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <Reveal><div className="mx-auto max-w-2xl text-center"><span className="text-xs font-semibold uppercase tracking-widest text-primary-600">The Team</span><h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Members, Planners & Workers</h2><p className="mt-4 text-neutral-600">A permanent core team, working together to make every event feel effortless.</p></div></Reveal>
          <Reveal className="mt-10"><img src="/team.png" alt="GS Events team preparing a celebration" loading="lazy" className="h-[360px] w-full rounded-3xl object-cover shadow-2xl md:h-[480px]" /></Reveal>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">{[{ src: '/team-2.png', alt: 'Chef preparing appetizers at a live counter' }, { src: '/team-3.jpeg', alt: 'Stylist preparing a celebration tablescape' }, { src: '/team-4.jpeg', alt: 'Planners preparing a wedding ceremony aisle' }].map((member) => <Reveal key={member.alt}><img src={member.src} alt={member.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg" /></Reveal>)}</div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <Reveal><div className="mx-auto max-w-2xl text-center"><span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Why Choose Us</span><h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Four Promises</h2></div></Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{values.map((value) => { const Icon = value.icon; return <Reveal key={value.title}><div className="card-hover h-full rounded-2xl border border-neutral-100 bg-white p-8 text-center shadow-sm"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30"><Icon className="h-7 w-7 text-white" /></div><h3 className="mb-3 font-serif text-lg font-bold text-neutral-900">{value.title}</h3><p className="text-sm leading-relaxed text-neutral-600">{value.desc}</p></div></Reveal>; })}</div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-5xl">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Authenticity</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Legally registered food & beverage caterers with valid food license</h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                We are legally registered food beverage caterers with a valid food license, backed by quality standards, hygiene-first practices, and a commitment to memorable hospitality.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl">
                <img src="/license1.png" alt="GS Events food licence document" loading="lazy" className="h-[320px] w-full object-contain bg-white md:h-[420px]" />
              </div>
            </Reveal>
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl">
                <img src="/license2.png" alt="GS Events food licence document" loading="lazy" className="h-[320px] w-full object-contain bg-white md:h-[420px]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-max grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal><img src="/service-corporate.jpg" alt="GS Events corporate venue setup" loading="lazy" className="h-[360px] w-full rounded-3xl object-cover shadow-2xl" /></Reveal>
          <Reveal><span className="text-xs font-semibold uppercase tracking-widest text-primary-600">The GS Advantage</span><h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Crafted with care, trusted by families</h2><ul className="mt-6 space-y-4">{highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success-500" /><span className="text-neutral-700">{highlight}</span></li>)}</ul><Link to="/contact" className="btn-primary mt-8">Work With Us <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl"><Reveal><div className="text-center"><span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Recognition</span><h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Certifications & Awards</h2></div></Reveal><div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">{recognitions.map((recognition) => <Reveal key={recognition}><p className="rounded-xl border border-neutral-100 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm">{recognition}</p></Reveal>)}</div></div>
      </section>
    </div>
  );
}