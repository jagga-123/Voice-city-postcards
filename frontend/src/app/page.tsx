import { HeroSection } from '@/features/landing/components/HeroSection';
import { FeaturesSection } from '@/features/landing/components/FeaturesSection';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { GallerySection } from '@/features/landing/components/GallerySection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <GallerySection />
    </div>
  );
}
