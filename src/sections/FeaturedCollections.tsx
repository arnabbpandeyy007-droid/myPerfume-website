import { Link } from 'react-router';
import { categories } from '@/data/products';
import { useEffect, useRef } from 'react';

export default function FeaturedCollections() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.collection-card');
            cards.forEach((card, i) => {
              const el = card as HTMLElement;
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto" ref={sectionRef}>
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Curated Collections
        </h2>
        <p className="text-[#999] text-base sm:text-lg max-w-lg mx-auto">
          Discover fragrances that define your presence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className="collection-card group relative aspect-[4/5] overflow-hidden rounded bg-[#0A0A0A] opacity-0 translate-y-10 transition-all duration-700"
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">
                {cat.name}
              </h3>
              <span className="text-gold text-sm font-medium flex items-center gap-2 group-hover:underline">
                Explore
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
