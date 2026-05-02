import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPreview() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-terracotta font-bold tracking-widest text-sm uppercase mb-4 text-left">The Journal</h2>
            <p className="text-4xl font-bold text-slate">Latest from our Blog</p>
          </div>
          <Link href="/blog" className="border-2 border-slate text-slate hover:bg-slate hover:text-white px-8 py-3 rounded-full font-bold transition-all">
            View All Stories
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.slice(0, 2).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer">
              <div className="w-full md:w-1/2 aspect-video overflow-hidden rounded-2xl shadow-lg">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-terracotta font-bold text-xs uppercase">{post.date}</span>
                <h3 className="text-2xl font-bold text-slate mt-2 mb-4 group-hover:text-terracotta transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-500 mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-slate font-bold inline-flex items-center">
                  Read Article <span className="ml-2">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
