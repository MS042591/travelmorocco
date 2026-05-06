import { Metadata } from 'next';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import FeaturedTours from '@/components/FeaturedTours';
import SensoryPalette from '@/components/SensoryPalette';
import { getAllPosts } from '@/lib/posts';
import { getAllTours } from '@/lib/tours';

export const metadata: Metadata = {
  title: 'Authentic Moroccan Adventures | Premium Custom Travel & Tours 2026',
  description: 'Curating the Kingdom\'s most exclusive experiences. From private Sahara glamping to expert-led Medina discoveries, begin your bespoke Moroccan odyssey here.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const posts = getAllPosts().sort(() => Math.random() - 0.5).slice(0, 3);
  const tours = getAllTours().sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <>
      <link 
        rel="preload" 
        as="image" 
        href="/images/hero-sahara-opt.jpg"
        fetchPriority="high"
      />
      <Hero />
      <FeaturedTours tours={tours} totalToursCount={getAllTours().length} />
      <SensoryPalette />
      <BlogPreview posts={posts} />
    </>
  );
}
