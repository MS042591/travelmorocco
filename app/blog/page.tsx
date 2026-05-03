import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import SectionReveal from '@/components/SectionReveal';

export const metadata = {
  title: 'Journal | Travel Morocco - Stories of the Kingdom',
  description: 'Deep dives into Moroccan culture, travel guides, and hidden gems from our local experts.',
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  return (
    <>
      <Navbar />
      <main className="bg-canvas pt-40 pb-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          {/* Editorial Header */}
          <div className="max-w-4xl mb-24">
            <SectionReveal>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 block">The Journal</span>
              <h1 className="text-5xl md:text-8xl font-bold text-ink tracking-tighter font-heading leading-none mb-10">
                Stories from <br />
                <span className="text-muted-soft italic font-serif">The Kingdom</span>
              </h1>
              <p className="text-muted text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
                Deep dives into Moroccan culture, secret Riads, and the legends carved into the landscape.
              </p>
            </SectionReveal>
          </div>

          {/* Featured Post */}
          {featured && (
            <SectionReveal>
              <Link href={`/blog/${featured.slug}`} className="group block mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                    <Image 
                      src={featured.image} 
                      alt={featured.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-soft">
                      <span>{featured.date}</span>
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span>Featured Story</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight font-heading leading-tight group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted text-lg leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-ink font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      <span>Read Story</span>
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          )}

          {/* Grid of Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {rest.map((post, index) => (
              <SectionReveal key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-soft">{post.date}</span>
                    <h3 className="text-2xl font-bold text-ink font-heading tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
