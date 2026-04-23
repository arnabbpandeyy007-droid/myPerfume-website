import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const children = section.querySelectorAll('.animate-item');
    children.forEach((child, i) => {
      const el = child as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 200);
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury perfume"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="animate-item text-gold text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-6">
          India's Finest Crafted Perfumes
        </p>
        <h1 className="animate-item font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.1] tracking-tight mb-2">
          Scent is the Voice
        </h1>
        <h2 className="animate-item font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold font-normal leading-[1.1] tracking-tight mb-6">
          of Memory
        </h2>
        <p className="animate-item text-[#999] text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Luxury fragrances crafted for the modern Indian soul.
        </p>
        <div className="animate-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="bg-gold text-black px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-cream transition-colors duration-300"
          >
            Explore Collection
          </Link>
          <Link
            to="/shop"
            className="border border-gold text-gold px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-gold hover:text-black transition-colors duration-300"
          >
            Shop Bestsellers
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-[#999]" />
      </div>
    </section>
  );
}
