import dynamic from 'next/dynamic';
import { HeroSection } from '@/features/landing/components/HeroSection';

// Everything below the hero is split into its own chunks, so the first paint
// only ships the hero's JavaScript. The sections are still server-rendered.
const StorySection = dynamic(() => import('@/features/landing/components/StorySection').then((m) => m.StorySection));
const DemoSection = dynamic(() => import('@/features/landing/components/DemoSection').then((m) => m.DemoSection));
const FeaturesSection = dynamic(() => import('@/features/landing/components/FeaturesSection').then((m) => m.FeaturesSection));
const HowItWorksSection = dynamic(() => import('@/features/landing/components/HowItWorksSection').then((m) => m.HowItWorksSection));
const GallerySection = dynamic(() => import('@/features/landing/components/GallerySection').then((m) => m.GallerySection));

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <StorySection />
      <DemoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <GallerySection />
    </div>
  );
}
