import ProductCard from '@/components/ProductCard';
import { getBestsellers } from '@/data/products';
import { Link } from 'react-router';
import { useEffect, useRef } from 'react';

export default function BestsellersSection() {
  const bestsellers = getBestsellers();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.product-card');
            cards.forEach((card, i) => {
              const el = card as HTMLElement;
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            Bestsellers
          </h2>
          <p className="text-[#999] text-base sm:text-lg">
            India's most loved fragrances.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="product-card opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionProperty: 'opacity, transform' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block border border-gold text-gold px-8 py-3 rounded-full text-sm font-medium hover:bg-gold hover:text-black transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
