"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PostData } from '@/lib/posts-shared';
import { motion } from 'framer-motion';

interface BlogPreviewProps {
  posts: PostData[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Moroccan Travel Journal</h2>
            <p className="text-sm text-muted">Deep dives into culture, hidden gems, and local tips.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-ink underline hover:text-muted transition-colors">
            View all stories
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.slice(0, 2).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="relative h-72 md:h-80 overflow-hidden rounded-airbnb-md mb-4 shadow-sm group-hover:shadow-airbnb transition-all">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{post.date}</span>
                  <h3 className="text-lg font-bold text-ink leading-tight group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
