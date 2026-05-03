import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { getDestinationBySlug, getAllDestinations } from '@/lib/destinations';
import { notFound } from 'next/navigation';
import SectionReveal from '@/components/SectionReveal';
import { getAllTours } from '@/lib/tours';
import TourCard from '@/components/TourCard';
import DestinationGallery from '@/components/DestinationGallery';
import InquiryButton from '@/components/InquiryButton';

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  // Find related tours (basic keyword match)
  const allTours = getAllTours();
  const relatedTours = allTours.filter(tour => 
    tour.title.toLowerCase().includes(destination.title.toLowerCase()) ||
    tour.category.toLowerCase().includes(destination.title.toLowerCase()) ||
    tour.excerpt.toLowerCase().includes(destination.title.toLowerCase())
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image 
            src={destination.image} 
            alt={destination.title} 
            fill 
            className="object-cover brightness-[0.7]"
            priority
          />
          <div className="relative z-10 text-center px-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-4 block">Destination</span>
            <h1 className="text-6xl md:text-8xl font-bold !text-white tracking-tighter font-heading drop-shadow-2xl">
              {destination.title}
            </h1>
          </div>
          
          {/* Curvy Section Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] scale-y-[-1]">
            <svg 
              className="relative block w-[calc(100%+1.3px)] h-[80px]" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                className="fill-canvas"
              />
            </svg>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <SectionReveal>
                  <div className="prose prose-lg max-w-none text-muted leading-relaxed">
                    <p className="text-2xl text-ink font-medium leading-snug mb-8">
                      {destination.description}
                    </p>
                    <div className="whitespace-pre-line">
                      {destination.content}
                    </div>
                  </div>
                </SectionReveal>

                {/* Gallery Grid */}
                <DestinationGallery images={destination.gallery} title={destination.title} />
              </div>

              <div className="space-y-12">
                <div className="bg-surface-soft p-10 rounded-[2.5rem] sticky top-32">
                  <h3 className="text-xl font-bold text-ink mb-6 uppercase tracking-wider">Don't Miss</h3>
                  <ul className="space-y-6">
                    {destination.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        </div>
                        <span className="text-ink font-medium">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-12 pt-12 border-t border-hairline">
                    <p className="text-xs text-muted-soft font-bold uppercase tracking-widest mb-4">Start your journey</p>
                    <InquiryButton destinationTitle={destination.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <section className="py-24 bg-surface-soft">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-ink mb-2">Expeditions through {destination.title}</h2>
                  <p className="text-sm text-muted">Hand-picked journeys that feature this incredible destination.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {relatedTours.map((tour, index) => (
                  <TourCard key={tour.slug} tour={tour} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
