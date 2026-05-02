import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
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
        <BlogPreview posts={posts} />
      </main>
      <Footer />
    </>
  );
}
