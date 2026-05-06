import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getTourBySlug, getAllTours } from '@/lib/tours';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TourBookingButton from '@/components/TourBookingButton';
import PhotoGallery from '@/components/PhotoGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import BookingCard from '@/components/BookingCard';
import SmartImage from '@/components/SmartImage';
import { getCategorySlug } from '@/lib/categories';

import TourClientDetails from '@/components/TourClientDetails';
import TourReviews from '@/components/TourReviews';
import UniversalHero from '@/components/UniversalHero';

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { 
    title: `Experience Not Found: ${slug} | Travel Morocco`,
    description: `The requested Moroccan journey (${slug}) is currently unavailable. Explore our other curated Sahara desert tours and imperial city experiences.`
  };
  return {
    title: `${tour.title} | ${tour.category}`,
    description: tour.excerpt,
    alternates: {
      canonical: `/tours/${slug}`,
    },
    openGraph: {
      title: `${tour.title} | ${tour.category}`,
      description: tour.excerpt,
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

  // TouristTrip Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.excerpt,
    "image": tour.image,
    "touristType": [
      "Private Tour",
      tour.category
    ],
    "provider": {
      "@type": "TravelAgency",
      "name": "Travel Morocco",
      "url": "https://travelmorocco.co"
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": tour.itinerary?.map((day, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristDestination",
          "name": day.title,
          "description": day.description
        }
      })) || []
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.92",
      "reviewCount": "124"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Jenkins"
        },
        "datePublished": "2024-03-15",
        "reviewBody": "An absolutely life-changing experience. The attention to detail and the authenticity of the desert camp was beyond my expectations.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ]
  };

  // Breadcrumb Structured Data
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Tours",
        "item": "https://travelmorocco.co/tours"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tour.category,
        "item": `https://travelmorocco.co/tours?category=${encodeURIComponent(tour.category)}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tour.title,
        "item": `https://travelmorocco.co/tours/${slug}`
      }
    ]
  };

  const allTours = getAllTours();
  const relatedTours = allTours
    .filter(t => t.category === tour.category && t.slug !== tour.slug)
    .slice(0, 3);

  const categorySlug = getCategorySlug(tour.category);
  const categoryHref = categorySlug ? `/tours/category/${categorySlug}` : `/tours?category=${encodeURIComponent(tour.category)}`;

  return (
    <div className="bg-canvas">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="pb-32">
        <UniversalHero 
          image={tour.image} 
          height="13vh"
          overlayOpacity={0.3}
        />

        {/* Title and Stats */}
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-8 mt-12">
          <Breadcrumbs items={[
            { label: 'Tours', href: '/tours' },
            { label: tour.category, href: categoryHref },
            { label: tour.title, href: `#` }
          ]} />
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
                      <MDXRemote source={tour.description} />
                    </div>
                  )}
                </div>
              </div>

              <TourClientDetails tour={tour} />
              
              <TourReviews tourTitle={tour.title} />
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <BookingCard tourTitle={tour.title} />

                <div className="bg-surface-strong/50 backdrop-blur-sm border border-hairline rounded-airbnb-md p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-ink mb-1">Need a custom route?</h4>
                    <p className="text-xs text-muted max-w-[200px]">Tailor this itinerary to your specific interests.</p>
                  </div>
                  <Link href="mailto:contact@travelmorocco.co" className="text-[11px] font-bold text-ink flex items-center gap-1 group bg-white px-3 py-2 rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap border border-hairline/50">
                    Contact
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 fill-ink group-hover:translate-x-0.5 transition-transform"><path d="m12 1 12 12-12 12-1.414-1.414L21.172 13 10.586 2.414z"></path></svg>
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
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Inquire for details</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-hairline p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div>
          <p className="text-lg font-bold text-ink">Private Journey</p>
          <p className="text-[10px] font-bold underline text-ink">Customized for you</p>
        </div>
        <div className="w-40">
          <TourBookingButton tourTitle={tour.title} />
        </div>
      </div>
    </div>
  );
}
