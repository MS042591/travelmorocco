import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ReadingProgress from '@/components/ReadingProgress';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllTours } from '@/lib/tours';
import BlogRelatedTours from '@/components/BlogRelatedTours';
import PlannerButton from '@/components/PlannerButton';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: `Journal Entry Not Found: ${slug} | Travel Morocco`,
      description: `The requested story (${slug}) could not be found in our journal. Discover more Moroccan travel guides and cultural insights on our blog.`
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
    alternates: {
      canonical: `/blog/${slug}`,
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

  // Breadcrumb Structured Data
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Journal",
        "item": "https://travelmorocco.co/blog"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": post.title,
        "item": `https://travelmorocco.co/blog/${slug}`
      }
    ]
  };

  // BlogPosting Structured Data
  const blogPostLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Travel Morocco Curators",
      "url": "https://travelmorocco.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Travel Morocco",
      "logo": {
        "@type": "ImageObject",
        "url": "https://travelmorocco.co/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://travelmorocco.co/blog/${slug}`
    }
  };

  // Find related tours based on tags or category
  const allTours = getAllTours();
  const relatedTours = allTours.filter(tour => {
    // Match by category
    const matchesCategory = post.category && tour.category.toLowerCase().includes(post.category.toLowerCase());
    if (matchesCategory) return true;
    
    // Match by tags
    if (post.tags) {
      return post.tags.some(tag => 
        tour.title.toLowerCase().includes(tag.toLowerCase()) || 
        tour.excerpt.toLowerCase().includes(tag.toLowerCase()) ||
        tour.category.toLowerCase().includes(tag.toLowerCase())
      );
    }
    return false;
  }).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ReadingProgress />
      <div className="bg-canvas">
        {/* Immersive Blog Hero */}
        <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            className="object-cover brightness-[0.4] grayscale-[0.1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 md:px-8 lg:px-20 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog" className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 hover:bg-white/20 transition-all">
                The Journal
              </Link>
              <h1 className="text-4xl md:text-[3rem] font-bold !text-white tracking-tighter font-heading leading-tight mb-10 drop-shadow-2xl">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-white/70 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <span>Travel Morocco Curators</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <span>{post.date}</span>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section - More structured reading width */}
        <article className="py-24 relative">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="mb-16">
               <Breadcrumbs items={[
                 { label: 'Journal', href: '/blog' },
                 { label: post.title, href: '#' }
               ]} />
            </div>

            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-ink
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-hairline prose-h2:pb-4
              prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6
              prose-p:text-body prose-p:leading-[1.9] prose-p:mb-10 prose-p:text-lg
              prose-strong:text-ink prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface-soft/50 prose-blockquote:p-12 prose-blockquote:rounded-r-[3rem] prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-3xl prose-blockquote:text-ink prose-blockquote:my-16 prose-blockquote:not-italic prose-blockquote:leading-snug
              prose-img:rounded-[3rem] prose-img:shadow-2xl prose-img:my-20
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-bold
              prose-table:w-full prose-table:my-16 prose-table:border-collapse prose-table:text-sm
              prose-th:bg-ink prose-th:text-white prose-th:p-6 prose-th:text-[10px] prose-th:font-black prose-th:uppercase prose-th:tracking-[0.2em] prose-th:text-left
              prose-td:p-6 prose-td:border-b prose-td:border-hairline prose-td:text-body
              prose-ul:my-10 prose-li:mb-5
              first-letter-cap
            ">
              <MDXRemote 
                source={post.content} 
                components={{
                  PlannerButton,
                  Image: (props: any) => <Image alt={props.alt || "Blog image"} {...props} className="rounded-airbnb-md shadow-lg my-10" />
                }} 
              />
            </div>
            
            <div className="mt-24 pt-16 border-t border-hairline flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-surface-soft flex items-center justify-center text-primary mb-6 text-3xl">
                🇲🇦
              </div>
              <h3 className="text-2xl font-bold text-ink mb-4 font-heading">Inspired to see it for yourself?</h3>
              <p className="text-muted mb-10 max-w-md">Our curators can weave the experiences mentioned in this post into your personalized Moroccan itinerary.</p>
              <PlannerButton>
                Plan Your Journey
              </PlannerButton>
            </div>

            <BlogRelatedTours tours={relatedTours} postTitle={post.title} />
          </div>
        </article>
      </div>
    </>
  );
}
