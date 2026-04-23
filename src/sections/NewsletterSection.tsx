import { Instagram } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto" ref={ref} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Newsletter */}
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
            Join the AURA Inner Circle
          </h3>
          <p className="text-[#999] text-sm sm:text-base mb-8 leading-relaxed">
            Exclusive previews, early access to new launches, and member-only offers delivered to your inbox.
          </p>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-b border-[#333] text-white placeholder-[#666] py-3 px-1 focus:outline-none focus:border-gold transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-gold text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-cream transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Instagram */}
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
            Follow Our Journey
          </h3>
          <p className="text-[#999] text-sm sm:text-base mb-8">
            @aura.perfumes
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              '/images/product-midnight-oud.jpg',
              '/images/product-rose-nectar.jpg',
              '/images/product-mystic-sandalwood.jpg',
              '/images/product-oud-royale.jpg',
            ].map((img, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded group"
              >
                <img
                  src={img}
                  alt={`Instagram ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
