import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Travel Morocco Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <header className="mb-12">
            <span className="text-terracotta font-bold text-sm uppercase tracking-widest block mb-4">
              {post.date}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>
          
          <div className="prose prose-lg prose-slate max-w-none leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <div className="mt-16 pt-10 border-t border-gray-100">
            <Link href="/" className="text-slate font-bold inline-flex items-center hover:text-terracotta transition-colors">
              <span className="mr-2">←</span> Back to Journal
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
