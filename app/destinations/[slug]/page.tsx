import { Metadata } from 'next';
import Image from 'next/image';
import { getDestinationBySlug, getAllDestinations } from '@/lib/destinations';
import { notFound } from 'next/navigation';
import SectionReveal from '@/components/SectionReveal';
import { getAllTours } from '@/lib/tours';
import TourCard from '@/components/TourCard';
import DestinationGallery from '@/components/DestinationGallery';
import InquiryButton from '@/components/InquiryButton';
import UniversalHero from '@/components/UniversalHero';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  
  if (!destination) return { title: 'Destination Not Found' };

  return {
    title: `${destination.title} | Travel Morocco Destinations`,
    description: destination.description,
    openGraph: {
      title: destination.title,
      description: destination.description,
      images: [destination.image],
    },
    alternates: {
      canonical: `/destinations/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

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
      <div className="bg-canvas">
        <UniversalHero 
          subtitle="Destination"
          title={destination.title}
          image={destination.image}
        />

        {/* Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="mb-12">
              <Breadcrumbs items={[
                { label: 'Destinations', href: '/destinations' },
                { label: destination.title, href: '#' }
              ]} />
            </div>

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
                <div className="bg-surface-soft p-10 rounded-[2.5rem] sticky top-32 border border-hairline shadow-sm">
                  <h3 className="text-xl font-bold text-ink mb-6 uppercase tracking-wider font-heading">Don&apos;t Miss</h3>
                  <ul className="space-y-6">
                    {destination.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-4 group">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        </div>
                        <span className="text-ink font-medium transition-colors group-hover:text-primary">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-12 pt-12 border-t border-hairline">
                    <p className="text-[10px] text-muted-soft font-black uppercase tracking-[0.2em] mb-6">Design your journey</p>
                    <InquiryButton destinationTitle={destination.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <section className="py-24 bg-surface-soft border-t border-hairline">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
              <div className="flex justify-between items-end mb-16">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 font-heading tracking-tight">Expeditions through {destination.title}</h2>
                  <p className="text-muted text-lg leading-relaxed">Hand-picked journeys that feature this incredible destination, curated for authentic discovery.</p>
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
      </div>
    </>
  );
}
