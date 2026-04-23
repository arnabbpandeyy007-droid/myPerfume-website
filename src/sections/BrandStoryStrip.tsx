import { useEffect, useRef } from 'react';

export default function BrandStoryStrip() {
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gold py-16 sm:py-20 px-4" ref={ref} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease' }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-display text-2xl sm:text-3xl md:text-4xl text-black leading-snug">
          "Every bottle holds a story. Every spritz, a memory."
        </p>
        <p className="mt-4 text-black/60 text-sm sm:text-base font-medium">
          — AURA, Since 2019
        </p>
      </div>
    </section>
  );
}
