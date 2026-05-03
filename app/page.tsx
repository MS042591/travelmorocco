import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import FeaturedTours from '@/components/FeaturedTours';
import SensoryPalette from '@/components/SensoryPalette';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';
import { getAllTours } from '@/lib/tours';

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
      <Navbar />
      <main>
        <Hero />
        <FeaturedTours tours={tours} totalToursCount={getAllTours().length} />
        <SensoryPalette />
        <BlogPreview posts={posts} />
      </main>
      <Footer />
    </>
  );
}
