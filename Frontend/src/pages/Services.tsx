import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChefHat } from 'lucide-react';
import { services } from '@/lib/services';

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/15 rounded-full blur-3xl" />
        <div className="container-max relative px-4 sm:px-6 md:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Best Event Management & Catering Services</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            Best Event Management in Berhampur, Brahmapur & Odisha
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto">
            From grand weddings to intimate private ceremonies, we offer the best event management in Berhampur, Brahmapur, and across Odisha with luxury decor, professional planning, and the best catering services in Odisha for every celebration.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      <section className="bg-white">
        {services.map((service, i) => {
          const Icon = service.icon;
          const reversed = i % 2 === 1;
          return (
            <div
              key={i}
              className={`section-padding ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
            >
              <div className="container-max">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`relative ${reversed ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className={`absolute -bottom-5 ${reversed ? '-left-5' : '-right-5'} flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-xl shadow-primary-500/30 hidden md:flex`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={reversed ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30 md:hidden">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">
                        Service {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {service.longDesc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-100 mt-0.5">
                            <Check className="h-3 w-3 text-success-600" />
                          </span>
                          <span className="text-sm text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="btn-primary">
                      Enquire Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Catering Showcase */}
      <section className="section-padding bg-neutral-950 text-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="mt-6 block text-xs font-semibold uppercase tracking-widest text-primary-400">The Catering Experience</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">Food That Becomes a Memory</h2>
              <p className="mt-5 leading-relaxed text-white/70">
                From a beautifully styled plated course to the energy of a live counter, our chefs bring flavour, theatre, and thoughtful hospitality to every celebration.
              </p>
              <Link to="/contact" className="btn-primary mt-8">
                Plan Your Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group relative col-span-2 aspect-[16/8] overflow-hidden rounded-2xl">
                <img src="/catering-buffet.png" alt="Elegant catering buffet spread" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">Elegant buffet spreads</span>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <img src="/catering-live-counters.jpeg" alt="Live catering counter" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">Live counters</span>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <img src="/catering-plated.png" alt="Plated catering dish" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">Plated service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-10 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  Don't See What You Need?
                </h2>
                <p className="mt-3 text-white/80 max-w-xl">
                  We customize every service to fit your unique requirements. Tell us about your event and we'll make it happen.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 whitespace-nowrap">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
