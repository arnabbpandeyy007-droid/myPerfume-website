import HeroSection from '@/sections/HeroSection';
import FeaturedCollections from '@/sections/FeaturedCollections';
import BestsellersSection from '@/sections/BestsellersSection';
import BrandStoryStrip from '@/sections/BrandStoryStrip';
import WhyChooseSection from '@/sections/WhyChooseSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import FestivalBanner from '@/sections/FestivalBanner';
import NewsletterSection from '@/sections/NewsletterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCollections />
      <BestsellersSection />
      <BrandStoryStrip />
      <WhyChooseSection />
      <TestimonialsSection />
      <FestivalBanner />
      <NewsletterSection />
    </main>
  );
}
