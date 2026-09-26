import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Star, ArrowRight, Quote, Play, ChevronLeft, ChevronRight, Images,
} from 'lucide-react';
import { api, type GalleryItem, type Testimonial } from '@/lib/api';
import { services } from '@/lib/services';
import Reveal from '@/components/Reveal';

const heroSlides = [
  '/hero1.jpeg',
  '/hero2.jpeg',
  '/hero3.jpeg',
];

const reelThumbnails = [
  {
    img: '/reel1.png',
    title: 'Grand Wedding Reception',
    video: 'https://res.cloudinary.com/ilclii09/video/upload/v1790337118/SnapReels.Net_AQN_b-hyg_Y55-tMtkaHbuyi357-2ftW-srX5XYraaVr8ET0Wmw0SC9M3JlZ_7InSpWu7m3a7DVzdmQcndlyAWvRIMJHnGENWyKSbAI.mp4',
  },
  {
    img: '/reel2.png',
    title: 'Wide Range Buffet',
    video: 'https://res.cloudinary.com/ilclii09/video/upload/v1790346417/snapsave-app_3934366461061466511_73757398262.mp4',
  },
  {
    img: '/reel3.png',
    title: 'Magnificent Catering Setup',
    video: 'https://res.cloudinary.com/ilclii09/video/upload/v1790347064/SnapReels.Net_AQNBWWu6XYxzlO256fKtMaWBardhRLycyfO0N7EWUshjSHPwApCouNRVxLq5KYabTyIudkBvWEMN36m2noUn3uGy_6dC6dG7bbkniO0.mp4',
  },
  {
    img: '/reel4.png',
    title: 'Client Review & Feedback',
    video: 'https://res.cloudinary.com/ilclii09/video/upload/v1790346647/SnapReels.Net_AQN8nJWTlAMSefKaNLLWQ9I8nbU4fKVwZ3fLfzXbwn1WYOVHG_DfEuUIuz-mjVFZ38lPI0TqoOtmpnPHN-EMsUMlYQ.mp4',
  },
  {
    img: '/reel5.png',
    title: 'Birthday Celebration',
    video: 'https://res.cloudinary.com/ilclii09/video/upload/v1790346747/snapsave-app_3985754532557955440_73767349326.mp4',
  },
  {
    img: '/reel6.png',
    title: 'Wedding Review & Feedback',
    video: 'https://res.cloudinary.com/ilclii09/video/upload/v1790346766/SnapReels.Net_AQOvIngK6s30f4_KGF9lWVMnBt7oCVgNjZtoyeph84QoSJgK2Exn1kXjCLeShMhuGczsCVPgL00oDTwwJOcwWJej.mp4',
  },
];

const stats = [
  { value: '500+', label: 'Events Delivered' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '50K+', label: 'Guests Served' },
  { value: '100%', label: 'Happy Clients' },
];

const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'fallback-1',
    name: 'Priya & Arjun',
    event_type: 'Wedding Celebration',
    rating: 5,
    message: 'GS Events turned our wedding into the celebration we had always imagined. Every detail felt personal, beautiful, and effortless.',
    created_at: '',
  },
  {
    _id: 'fallback-2',
    name: 'Rahul Mehta',
    event_type: 'Corporate Gala',
    rating: 5,
    message: 'The team was incredibly professional from planning through execution. Our guests loved the food, decor, and attention to detail.',
    created_at: '',
  },
  {
    _id: 'fallback-3',
    name: 'Ananya Sharma',
    event_type: 'Birthday Celebration',
    rating: 5,
    message: 'Everything was beautifully organised and full of thoughtful touches. GS Events made the whole day feel truly special.',
    created_at: '',
  },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredReel, setHoveredReel] = useState<number | null>(null);
  const [playingReels, setPlayingReels] = useState<Record<number, boolean>>({});
  const reelVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const toggleReelPlayback = (index: number) => {
    const video = reelVideoRefs.current[index];

    if (!video) return;

    if (video.paused) {
      video.play();
      setPlayingReels((prev) => ({ ...prev, [index]: true }));
    } else {
      video.pause();
      setPlayingReels((prev) => ({ ...prev, [index]: false }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.testimonials().then((data) => {
      if (data.length > 0) setTestimonials(data);
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    api.gallery().then((data) => setGalleryItems(data.slice(0, 6))).catch(() => undefined);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide} alt="" className={`h-full w-full object-cover ${i === heroIndex ? 'ken-burns' : ''}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
        ))}

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container-max px-4 sm:px-6 md:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary-300" />
              <span className="text-xs font-medium uppercase tracking-widest text-white/90">India's Premier Event & Catering Service</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto animate-fade-in-up">
              Crafting Unforgettable <span className="text-gradient bg-gradient-to-r from-primary-300 via-primary-200 to-accent-300">Celebrations</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              From grand weddings to corporate galas, we bring your vision to life with stunning decorations and catering that delights every palate.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/contact" className="btn-primary">
                Book Your Event <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/gallery" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50">
                View Gallery
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === heroIndex ? 'w-10 bg-primary-400' : 'w-4 bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <Reveal>
      <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 py-10">
        <div className="container-max px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/70 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      {/* Services Section */}
      <Reveal>
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">What We Do</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
              Our Signature Services
            </h2>
            <p className="mt-4 text-neutral-600">
              We handle every detail of your celebration, from concept to execution, ensuring an experience your guests will remember for years.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  to="/services"
                  key={i}
                  className="group relative bg-white rounded-2xl shadow-sm border border-neutral-100 card-hover overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-neutral-600 leading-relaxed">{service.shortDesc}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      </Reveal>

      {/* Instagram Reels Section */}
      <Reveal>
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Follow Us</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
                Latest from Instagram
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Catch a glimpse of our recent events and behind-the-scenes moments.
              </p>
            </div>
            <a href="https://www.instagram.com/gs_events_catering/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-primary-600 text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </span>
              @gs_events_catering
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {reelThumbnails.map((reel, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredReel(i)}
                onMouseLeave={() => setHoveredReel((current) => (current === i ? null : current))}
                className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer bg-neutral-100"
              >
                {reel.video ? (
                  <video
                    ref={(element) => {
                      reelVideoRefs.current[i] = element;
                    }}
                    src={reel.video}
                    poster={reel.img}
                    muted={false}
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                    onPlay={() => setPlayingReels((prev) => ({ ...prev, [i]: true }))}
                    onPause={() => setPlayingReels((prev) => ({ ...prev, [i]: false }))}
                    onEnded={() => setPlayingReels((prev) => ({ ...prev, [i]: false }))}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={reel.img}
                    alt={reel.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />

                {reel.video && hoveredReel === i && (
                  <button
                    type="button"
                    aria-label={playingReels[i] ? 'Pause video' : 'Play video'}
                    onClick={() => toggleReelPlayback(i)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-transform duration-200 hover:scale-105">
                      {playingReels[i] ? (
                        <span className="flex items-center gap-1">
                          <span className="h-4 w-1.5 rounded-full bg-white" />
                          <span className="h-4 w-1.5 rounded-full bg-white" />
                        </span>
                      ) : (
                        <Play className="h-5 w-5 text-white fill-white" />
                      )}
                    </div>
                  </button>
                )}

                {!reel.video && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <Play className="h-5 w-5 text-white fill-white" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-medium text-white">{reel.title}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm rounded px-1.5 py-0.5">REEL</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      {/* Gallery Preview */}
      <Reveal>
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Our Work</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
                Moments We Have Crafted
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                A glimpse into the celebrations, details, and memories created by our team.
              </p>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              View Full Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <Link
                  to="/gallery"
                  key={item.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-300">{item.category}</span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-white">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary-200 bg-white px-6 py-14 text-center">
              <Images className="h-10 w-10 text-primary-400" />
              <h3 className="mt-4 font-serif text-2xl font-bold text-neutral-900">Your celebrations belong here</h3>
              <p className="mt-2 max-w-md text-sm text-neutral-600">Explore our full gallery to see the kinds of moments we bring to life.</p>
              <Link to="/gallery" className="btn-primary mt-6">Explore Gallery <ArrowRight className="h-4 w-4" /></Link>
            </div>
          )}
        </div>
      </section>
      </Reveal>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-900 via-neutral-900 to-primary-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />

        <div className="container-max relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Client Love</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3">
              What Our Clients Say
            </h2>
          </div>

          {testimonials.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
                <Quote className="absolute top-6 left-6 h-12 w-12 text-primary-500/30" />
                <div className="relative">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial]?.rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning-400 fill-warning-400" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                    "{testimonials[activeTestimonial]?.message}"
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-lg">
                      {testimonials[activeTestimonial]?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonials[activeTestimonial]?.name}</p>
                      <p className="text-sm text-white/60">{testimonials[activeTestimonial]?.event_type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'w-8 bg-primary-400' : 'w-2 bg-white/30'}`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary-600 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-10 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  Ready to Plan Your Event?
                </h2>
                <p className="mt-3 text-white/80 max-w-xl">
                  Let's create something extraordinary together. Get in touch today for a free consultation.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 whitespace-nowrap">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
