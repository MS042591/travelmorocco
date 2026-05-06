import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CATEGORY_METADATA } from '@/lib/categories';
import { getAllTours } from '@/lib/tours';
import TourCard from '@/components/TourCard';
import SectionReveal from '@/components/SectionReveal';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = CATEGORY_METADATA[slug];
  
  if (!metadata) return { title: 'Category Not Found' };

  return {
    title: `${metadata.title} | Travel Morocco`,
    description: metadata.description,
    keywords: metadata.keywords.join(', '),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [metadata.heroImage],
    },
    alternates: {
      canonical: `/tours/category/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_METADATA).map((slug) => ({ slug }));
}

export default async function CategoryLandingPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const metadata = CATEGORY_METADATA[slug];
  
  if (!metadata) notFound();

  const allTours = getAllTours();
  const categoryTours = allTours.filter(t => t.category === metadata.displayName);

  return (
    <>
      <div className="bg-canvas min-h-screen">
        {/* Authority Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          <Image 
            src={metadata.heroImage} 
            alt={metadata.title} 
            fill 
            className="object-cover brightness-[0.5] grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-ink/40" />
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <MotionDivWrapper>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80 mb-6 block drop-shadow-lg">
                Exclusive Collection
              </span>
              <h1 className="text-5xl md:text-8xl font-bold !text-white tracking-tighter font-heading mb-8 drop-shadow-2xl leading-none">
                {metadata.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                {metadata.description}
              </p>
            </MotionDivWrapper>
          </div>

          {/* Curvy Section Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] -scale-y-100">
            <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-canvas" />
            </svg>
          </div>
        </section>

        {/* Content & Tour Listing */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-ink tracking-tight font-heading mb-4">
                  Curated Itineraries for {metadata.displayName}
                </h2>
                <p className="text-muted leading-relaxed">
                  Every journey we craft is private, customizable, and focused on genuine cultural connection. Discover our most popular experiences for this region.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-ink/40 uppercase tracking-widest">{categoryTours.length} Experiences Found</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {categoryTours.map((tour, index) => (
                <TourCard key={tour.slug} tour={tour} index={index} priority={index < 3} />
              ))}
            </div>

            {/* Trust Footer for Landing Page */}
            <div className="mt-32 p-12 rounded-[3rem] bg-ink text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 font-heading">Ready to start your journey?</h3>
                    <p className="text-white/70 text-lg">Our Morocco experts are ready to customize any of these itineraries to your exact preferences.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                    <Link href="/contact" className="bg-white text-ink px-10 py-4 rounded-full font-bold text-center hover:bg-primary hover:text-white transition-all">
                      Inquire Now
                    </Link>
                    <Link href="/why-choose-us" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-center hover:bg-white/20 transition-all">
                      Why Choose Us
                    </Link>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// Simple wrapper for motion since this is a server component
function MotionDivWrapper({ children }: { children: React.ReactNode }) {
  return <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">{children}</div>;
}
