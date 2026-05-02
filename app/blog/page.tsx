import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "The Travel Morocco Journal | Stories & Guides",
  description: "Read the latest stories, tips, and guides from our adventures across Morocco.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate mb-6">The Journal</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, guides, and stories from the heart of the Kingdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-video relative rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-terracotta font-bold text-xs uppercase">{post.date}</span>
                <h2 className="text-2xl font-bold text-slate mt-2 mb-4 group-hover:text-terracotta transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
