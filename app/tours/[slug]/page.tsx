import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourBySlug, getAllTours } from '@/lib/tours';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import TourBookingButton from '@/components/TourBookingButton';
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

  const allTours = getAllTours();
  const relatedTours = allTours
    .filter(t => t.category === tour.category && t.slug !== tour.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <article className="pt-24 pb-32">
        {/* Title and Stats */}
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-ink mb-2 tracking-tight">
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink font-medium">
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-ink"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z"></path></svg>
              <span>4.95</span>
              <span className="text-muted font-normal underline">(128 reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="text-muted font-normal">{tour.category}</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery - Airbnb Style Grid */}
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] md:h-[500px] w-full overflow-hidden rounded-airbnb-md">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
              />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="hidden md:block relative group overflow-hidden">
                <img 
                  src={tour.gallery?.[i + 1] || tour.image} 
                  alt={`${tour.title} gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            <div className="lg:col-span-8 space-y-12">
              <div className="pb-8 border-b border-hairline">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-ink"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.014 12.014 0 0 1 -12 12zm1-13h6a1 1 0 0 1 0 2h-7a1 1 0 0 1 -1-1v-8a1 1 0 0 1 2 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Duration</h4>
                      <p className="text-sm text-muted">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-ink"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.015c-6.191 0-11.209 4.28-11.209 9.556 0 .556.452 1.006 1.008 1.006h20.402c.556 0 1.008-.45 1.008-1.006 0-5.276-5.018-9.556-11.209-9.556z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Group Size</h4>
                      <p className="text-sm text-muted">Up to 6 people</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="pb-12 border-b border-hairline">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-ink">Experience Overview</h2>
                  {tour.itinerary && tour.itinerary.length > 0 && (
                    <a href="#itinerary" className="text-sm font-bold text-primary hover:underline transition-all">
                      Skip to itinerary ↓
                    </a>
                  )}
                </div>
                <div className="space-y-6">
                  <p className="text-lg font-semibold text-ink leading-relaxed">
                    {tour.excerpt}
                  </p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-hairline">
                <div>
                  <h3 className="text-xl font-bold text-ink mb-6">What&apos;s included</h3>
                  <ul className="space-y-3">
                    {tour.included?.map(item => (
                      <li key={item} className="flex items-center gap-3 text-body text-sm">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-6">What&apos;s not included</h3>
                  <ul className="space-y-3">
                    {tour.excluded?.map(item => (
                      <li key={item} className="flex items-center gap-3 text-muted-soft text-sm">
                        <svg className="w-5 h-5 text-muted-soft flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meet Your Guide */}
              <div className="pb-12 border-b border-hairline">
                <h3 className="text-xl font-bold text-ink mb-8">Meet your lead guide</h3>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <img src="https://ui-avatars.com/api/?name=Youssef&background=000&color=fff&size=128" alt="Youssef" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-ink">Youssef El Mansouri</h4>
                      <p className="text-sm text-muted">Lead Cultural Guide • 12 years experience</p>
                    </div>
                      <p className="text-body text-sm leading-relaxed max-w-xl">
                      &quot;I was born and raised in the High Atlas mountains. My passion is showing visitors the hidden side of Morocco that you won&apos;t find in guidebooks—the authentic family tea ceremonies and the ancient stories of our ancestors.&quot;
                    </p>
                    <div className="flex gap-4 pt-2">
                      <div className="px-3 py-1 bg-surface-soft rounded-full text-[11px] font-bold text-ink uppercase tracking-wider">English</div>
                      <div className="px-3 py-1 bg-surface-soft rounded-full text-[11px] font-bold text-ink uppercase tracking-wider">French</div>
                      <div className="px-3 py-1 bg-surface-soft rounded-full text-[11px] font-bold text-ink uppercase tracking-wider">Arabic</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* FAQ Section */}
              <div className="pb-12">
                <h3 className="text-xl font-bold text-ink mb-8">Good to know</h3>
                <FAQAccordion 
                  items={[
                    { q: "What should I pack?", a: "We recommend comfortable walking shoes, a sun hat, and layers for the cool desert nights. A small daypack for water and camera gear is also essential." },
                    { q: "Is Wi-Fi available during the tour?", a: "Wi-Fi is available in most Riads and hotels. In the Sahara desert camp, connectivity is limited, allowing you to fully immerse in the experience." },
                    { q: "Can the tour be customized?", a: "Absolutely. All our tours are private and can be adjusted to your pace, interests, and dietary requirements." }
                  ]} 
                />
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="bg-white rounded-airbnb-md p-6 shadow-airbnb border border-hairline">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-xl font-bold text-ink">{tour.price}</span>
                      <span className="text-muted text-sm ml-1">per person</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 border border-hairline rounded-airbnb-sm">
                      <div className="p-3 flex flex-col hover:bg-surface-soft cursor-pointer transition-colors border-b border-hairline">
                        <span className="text-[10px] font-extrabold uppercase text-ink">Preferred Dates</span>
                        <span className="text-sm text-ink">Add date range</span>
                      </div>
                      <div className="p-3 flex flex-col hover:bg-surface-soft cursor-pointer transition-colors">
                        <span className="text-[10px] font-extrabold uppercase text-ink">Guests</span>
                        <span className="text-sm text-ink font-medium">1 guest</span>
                      </div>
                    </div>
                  </div>
                  <TourBookingButton tourTitle={tour.title} />
                  <p className="text-center text-[12px] text-muted mt-4 font-medium">No payment required yet</p>
                  <div className="mt-6 pt-6 border-t border-hairline space-y-4">
                    <div className="flex justify-between text-ink text-sm">
                      <span className="underline">{tour.price} x 1 guest</span>
                      <span>{tour.price}</span>
                    </div>
                    <div className="flex justify-between font-bold text-ink text-lg pt-4 border-t border-hairline">
                      <span>Total</span>
                      <span>{tour.price}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-airbnb-md border border-hairline bg-surface-soft/30">
                  <h4 className="text-sm font-bold text-ink mb-2">Need a custom route?</h4>
                  <p className="text-xs text-muted mb-4">Our Morocco experts can tailor this itinerary to your specific interests and dates.</p>
                  <Link href="mailto:curator@travelmorocco.com" className="text-sm font-bold text-ink flex items-center gap-2 group">
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
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
