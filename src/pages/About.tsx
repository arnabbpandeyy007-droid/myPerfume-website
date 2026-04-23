import { useEffect, useRef } from 'react';

export default function About() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    refs.current[index] = el;
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/about-hero.jpg" alt="Perfume workshop" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white mb-4">
            Our Story
          </h1>
          <p className="text-[#999] text-base sm:text-lg max-w-xl mx-auto">
            From a small atelier in Mumbai to India's most loved luxury perfume house.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto" ref={setRef(0)} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-gold font-medium mb-4 block">
              Our Origin
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Born from Passion
            </h2>
            <div className="space-y-4 text-[#999] text-sm sm:text-base leading-relaxed">
              <p>
                AURA was founded in 2019 with a singular vision: to bring world-class luxury perfumery to India. 
                We noticed a gap in the market — while international brands were available, none truly understood 
                the Indian climate, culture, and olfactory preferences.
              </p>
              <p>
                Our founder, Arjun Mehta, spent three years traveling across Grasse, Dubai, and Kannauj — 
                the perfume capitals of the world — learning from master perfumers and sourcing the finest ingredients.
              </p>
              <p>
                Today, AURA stands as a testament to that journey. Every fragrance is crafted with meticulous attention 
                to detail, blending international expertise with Indian sensibilities.
              </p>
            </div>
            <p className="font-display text-xl text-gold italic mt-6">— Arjun Mehta, Founder</p>
          </div>
          <div className="aspect-[4/5] rounded overflow-hidden">
            <img src="/images/founder.jpg" alt="Founder" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8" ref={setRef(1)} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black border-t-2 border-gold p-8 sm:p-12 rounded">
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-4 text-center">
              Our Vision
            </h3>
            <p className="text-[#999] text-center leading-relaxed">
              To redefine luxury fragrance in India, making world-class perfumery accessible to every Indian 
              who seeks to express themselves through scent.
            </p>
          </div>
          <div className="bg-black border-t-2 border-gold p-8 sm:p-12 rounded">
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-4 text-center">
              Our Mission
            </h3>
            <p className="text-[#999] text-center leading-relaxed">
              Craft each fragrance with the finest ingredients, honoring both international expertise 
              and Indian olfactory traditions.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto" ref={setRef(2)} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease' }}>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white text-center mb-14">
          The Art of Perfumery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { num: '01', title: 'Sourcing', desc: 'We travel to Grasse, Dubai, and Kannauj to find the world\'s finest ingredients.' },
            { num: '02', title: 'Blending', desc: 'Our master perfumers spend months perfecting each accord.' },
            { num: '03', title: 'Maturing', desc: 'Every batch rests for 45 days to achieve harmony.' },
          ].map((step) => (
            <div key={step.num} className="text-center">
              <span className="font-display text-5xl sm:text-6xl text-gold/30">{step.num}</span>
              <h3 className="font-display text-xl sm:text-2xl text-white mt-4 mb-3">{step.title}</h3>
              <p className="text-[#999] text-sm sm:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-24 sm:py-32 bg-gold px-4 sm:px-6 lg:px-8" ref={setRef(3)} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-black leading-snug mb-8">
            "We believe that scent is the most powerful form of self-expression. Every AURA fragrance is a chapter in your story."
          </p>
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-black/10">
            <img src="/images/founder.jpg" alt="Founder" className="w-full h-full object-cover" />
          </div>
          <p className="text-black font-semibold">Arjun Mehta</p>
          <p className="text-black/60 text-sm">Founder & CEO, AURA Perfumes</p>
        </div>
      </section>
    </main>
  );
}
