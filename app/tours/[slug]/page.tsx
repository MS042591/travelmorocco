import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getTourBySlug, getAllTours } from '@/lib/tours';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import TourBookingButton from '@/components/TourBookingButton';
import PhotoGallery from '@/components/PhotoGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import BookingCard from '@/components/BookingCard';
import SmartImage from '@/components/SmartImage';

// Dynamic Imports for Performance
import MapWrapper from '@/components/MapWrapper';
import MoroccoLiveWidget from '@/components/MoroccoLiveWidget';
import FAQAccordion from '@/components/FAQAccordion';
import TourItinerary from '@/components/TourItinerary';

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: 'Tour Not Found' };
  return {
    title: `${tour.title} | ${tour.category}`,
    description: tour.excerpt,
    alternates: {
      canonical: `/tours/${slug}`,
    },
    openGraph: {
      images: [
        {
          url: tour.image,
          width: 1200,
          height: 800,
          alt: tour.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const tours = getAllTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tour.title,
    "description": tour.excerpt,
    "image": tour.image,
    "offers": {
      "@type": "Offer",
      "price": tour.price.replace(/[^\d]/g, ''),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  const allTours = getAllTours();
  const relatedTours = allTours
    .filter(t => t.category === tour.category && t.slug !== tour.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-canvas">
      <link 
        rel="preload" 
        as="image" 
        href={tour.image}
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <article className="pt-40 pb-32">
        {/* Title and Stats */}
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-8">
          <Breadcrumbs items={[
            { label: 'Tours', href: '/tours' },
            { label: tour.category, href: `/tours?category=${encodeURIComponent(tour.category)}` },
            { label: tour.title, href: `#` }
          ]} />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3 tracking-tight font-heading">
                {tour.title}
              </h1>
            </div>
          </div>
        </div>

        <PhotoGallery 
          mainImage={tour.image} 
          gallery={tour.gallery || []} 
          title={tour.title} 
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            <div className="lg:col-span-8 space-y-12">
              {/* Traveler's Essential Grid */}
              <div className="pb-12 border-b border-hairline">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-surface-soft rounded-full flex items-center justify-center text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.014 12.014 0 0 1 -12 12zm1-13h6a1 1 0 0 1 0 2h-7a1 1 0 0 1 -1-1v-8a1 1 0 0 1 2 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-muted tracking-wider">Duration</h4>
                      <p className="text-sm font-bold text-ink">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-surface-soft rounded-full flex items-center justify-center text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><path d="M21 2a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm-9 14.5a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 12 16.5zM21 4a2 2 0 1 1-2 2 2 2 0 0 1 2-2zM9.5 14a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm14.5 5.5a3.5 3.5 0 1 0-3.5-3.5 3.5 3.5 0 0 0 3.5 3.5zM24 16a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 24 16zM6 19a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4.5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 6 23.5z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-muted tracking-wider">Activity Level</h4>
                      <p className="text-sm font-bold text-ink">{tour.essentials?.activityLevel || "Moderate Walking"}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-surface-soft rounded-full flex items-center justify-center text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><path d="M28 6h-4.2a6 6 0 0 0-11.6 0H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.2a6 6 0 0 0 11.6 0H28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM18 6a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm-8 18H4V8h5.2a6 6 0 0 0 0 4H8v8h1.2a6 6 0 0 0 0 4zm8 2a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm10-2h-5.2a6 6 0 0 0 0-4H24v-8h-1.2a6 6 0 0 0 0-4H28z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-muted tracking-wider">Transport</h4>
                      <p className="text-sm font-bold text-ink">{tour.essentials?.transport || "Private 4x4"}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-surface-soft rounded-full flex items-center justify-center text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.015c-6.191 0-11.209 4.28-11.209 9.556 0 .556.452 1.006 1.008 1.006h20.402c.556 0 1.008-.45 1.008-1.006 0-5.276-5.018-9.556-11.209-9.556z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-muted tracking-wider">Group Size</h4>
                      <p className="text-sm font-bold text-ink">{tour.essentials?.groupSize || "Up to 6 people"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="pb-12 border-b border-hairline">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-ink">Experience Overview</h2>
                </div>
                <div className="space-y-6">
                  {tour.description && (
                    <div className="prose prose-sm max-w-none text-body leading-relaxed">
                      <ReactMarkdown>{tour.description}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              <TourItinerary itinerary={tour.itinerary || []} duration={tour.duration} />

              <div className="pb-12 border-b border-hairline">
                <h3 className="text-xl font-bold text-ink mb-6">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.highlights?.map(h => (
                    <div key={h} className="flex items-center gap-4">
                      <div className="w-6 h-6 flex-shrink-0">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-ink"><path d="m16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm6.707 10.707-8 8a1 1 0 0 1 -1.414 0l-4-4a1 1 0 1 1 1.414-1.414l3.293 3.293 7.293-7.293a1 1 0 0 1 1.414 1.414z"></path></svg>
                      </div>
                      <span className="text-sm md:text-base text-ink">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Map */}
              <div className="pb-12 border-b border-hairline">
                <h3 className="text-xl font-bold text-ink mb-6 font-heading">Route Map</h3>
                <MapWrapper tourTitle={tour.title} route={tour.route} itinerary={tour.itinerary} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-hairline">
                <div>
                  <h3 className="text-xl font-bold text-ink mb-6 font-heading">What&apos;s included</h3>
                  <ul className="space-y-4">
                    {tour.included?.map(item => (
                      <li key={item} className="flex items-start gap-3 text-body text-sm leading-relaxed">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-6 font-heading">What&apos;s not included</h3>
                  <ul className="space-y-4">
                    {tour.excluded?.map(item => (
                      <li key={item} className="flex items-start gap-3 text-muted-soft text-sm leading-relaxed">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trust Section */}
              <div className="pb-12 border-b border-hairline">
                <div className="bg-surface-soft/50 rounded-2xl p-8 border border-hairline">
                  <h3 className="text-xl font-bold text-ink mb-8 font-heading text-center">Why choose Travel Morocco?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-primary">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.014 12.014 0 0 1 -12 12zm1-13h6a1 1 0 0 1 0 2h-7a1 1 0 0 1 -1-1v-8a1 1 0 0 1 2 0z"></path></svg>
                      </div>
                      <h4 className="font-bold text-sm text-ink">Bespoke Itineraries</h4>
                      <p className="text-xs text-muted leading-relaxed">Tailored to your pace and specific interests.</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-primary">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.015c-6.191 0-11.209 4.28-11.209 9.556 0 .556.452 1.006 1.008 1.006h20.402c.556 0 1.008-.45 1.008-1.006 0-5.276-5.018-9.556-11.209-9.556z"></path></svg>
                      </div>
                      <h4 className="font-bold text-sm text-ink">Expert Local Guides</h4>
                      <p className="text-xs text-muted leading-relaxed">Professional, passionate storytellers born in Morocco.</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-primary">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.014 12.014 0 0 1 -12 12zm1-13h6a1 1 0 0 1 0 2h-7a1 1 0 0 1 -1-1v-8a1 1 0 0 1 2 0z"></path></svg>
                      </div>
                      <h4 className="font-bold text-sm text-ink">Handpicked Hotels</h4>
                      <p className="text-xs text-muted leading-relaxed">The finest authentic Riads and boutique experiences.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ & Policies Section */}
              <div className="pb-12 border-b border-hairline">
                <h3 className="text-xl font-bold text-ink mb-8 font-heading">Good to know</h3>
                <FAQAccordion 
                  items={tour.faqs && tour.faqs.length > 0 ? tour.faqs : [
                    { q: "What should I pack?", a: "We recommend comfortable walking shoes, a sun hat, and layers for the cool desert nights. A small daypack for water and camera gear is also essential." },
                    { q: "Is Wi-Fi available during the tour?", a: "Wi-Fi is available in most Riads and hotels. In the Sahara desert camp, connectivity is limited, allowing you to fully immerse in the experience." },
                    { q: "Can the tour be customized?", a: "Absolutely. All our tours are private and can be adjusted to your pace, interests, and dietary requirements." }
                  ]} 
                />
              </div>

              <div className="pb-12">
                <h3 className="text-xl font-bold text-ink mb-6 font-heading">Cancellation Policy</h3>
                <div className="flex gap-4 items-start p-6 bg-surface-soft/30 rounded-2xl border border-hairline">
                  <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-primary shadow-sm">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.014 12.014 0 0 1 -12 12zm1-18h-2v8.414l4.293 4.293 1.414-1.414L17 16.586V10z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink mb-1">Free cancellation</h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Cancel up to 7 days before your experience starts for a full refund. No refunds for cancellations made within 7 days of the start date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <BookingCard price={tour.price} tourTitle={tour.title} />

                <MoroccoLiveWidget />

                <div className="p-6 rounded-airbnb-md border border-hairline bg-surface-soft/30">
                  <h4 className="text-sm font-bold text-ink mb-2">Need a custom route?</h4>
                  <p className="text-xs text-muted mb-4">Our Morocco experts can tailor this itinerary to your specific interests and dates.</p>
                  <Link href="mailto:contact@travelmorocco.co" className="text-sm font-bold text-ink flex items-center gap-2 group">
                    Contact an expert
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-ink group-hover:translate-x-1 transition-transform"><path d="m12 1 12 12-12 12-1.414-1.414L21.172 13 10.586 2.414z"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedTours.length > 0 && (
          <div className="container mx-auto px-4 md:px-8 lg:px-20 mt-32">
            <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">Similar experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map(t => (
                <Link key={t.slug} href={`/tours/${t.slug}`} className="group block">
                  <div className="relative aspect-square rounded-airbnb-md overflow-hidden mb-3 shadow-sm">
                    <SmartImage 
                      src={t.image} 
                      alt={t.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-ink">{t.title}</h3>
                    <p className="text-sm text-muted">{t.duration} experience</p>
                    <p className="text-sm text-ink"><span className="font-bold">{t.price}</span> per person</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Sticky Mobile Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-hairline p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div>
          <p className="text-lg font-bold text-ink">{tour.price}</p>
          <p className="text-[10px] font-bold underline text-ink">View availability</p>
        </div>
        <div className="w-40">
          <TourBookingButton tourTitle={tour.title} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
