"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PostData } from '@/lib/posts-shared';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';

interface BlogPreviewProps {
  posts: PostData[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section id="blog" className="pt-12 pb-24 bg-white overflow-hidden">
      <SectionReveal>
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-ink mb-2 tracking-tight font-heading">The Travel Journal</h2>
              <p className="text-sm text-muted">Deep dives into culture, hidden gems, and expert local tips.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1 
                }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden rounded-3xl mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-soft">{post.date}</span>
                    <h3 className="text-xl font-bold text-ink leading-tight group-hover:text-primary transition-colors font-heading">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
