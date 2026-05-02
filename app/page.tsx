import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
