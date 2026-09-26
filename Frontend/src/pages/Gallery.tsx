import { useEffect, useState } from 'react';
import { X, Loader2, Filter } from 'lucide-react';
import { api, GALLERY_CATEGORIES, type GalleryItem } from '@/lib/api';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    api.gallery().then(setItems).catch(() => undefined).finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory);

  const categories = ['All', ...GALLERY_CATEGORIES];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/15 rounded-full blur-3xl" />
        <div className="container-max relative px-4 sm:px-6 md:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Our Work</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            Gallery
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto">
            A glimpse into the celebrations we've brought to life. Browse by category to see our work.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <Filter className="h-4 w-4 text-neutral-400 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-neutral-400">
              <p>No photos in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-neutral-100 shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary-300 mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <div className="mt-4 text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-300 mb-1">
                {lightbox.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-white">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
