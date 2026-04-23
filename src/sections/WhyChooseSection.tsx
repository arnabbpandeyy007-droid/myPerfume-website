import { Leaf, Globe, Truck, RefreshCw } from 'lucide-react';
import { useEffect, useRef } from 'react';

const features = [
  {
    icon: Leaf,
    title: 'Premium Ingredients',
    description: 'Sourced from the finest perfume houses in France and the Middle East',
  },
  {
    icon: Globe,
    title: 'Made for India',
    description: 'Formulated for Indian climate and olfactory preferences',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on orders above ₹2,999',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy',
  },
];

export default function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.feature-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          The AURA Promise
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="feature-item text-center opacity-0 translate-y-10 transition-all duration-700"
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center">
              <feature.icon className="w-10 h-10 text-gold stroke-[1.5]" />
            </div>
            <h3 className="text-cream font-medium text-base mb-2">{feature.title}</h3>
            <p className="text-[#999] text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
