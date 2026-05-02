import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BlogPreview from '@/components/BlogPreview';
import FeaturedTours from '@/components/FeaturedTours';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';
import { getAllTours } from '@/lib/tours';

export default function Home() {
  const posts = getAllPosts();
  const tours = getAllTours();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedTours tours={tours} />
        <Features />
        <BlogPreview posts={posts} />
      </main>
      <Footer />
    </>
  );
}
