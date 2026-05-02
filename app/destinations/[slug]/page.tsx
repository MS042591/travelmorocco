import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getAllDestinations } from '@/lib/destinations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return {
    title: `${destination.title} | Travel Morocco Destinations`,
    description: destination.description,
  };
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-canvas min-h-screen pt-24 pb-32">
        {/* Title and Quick Stats */}
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2 tracking-tight">
            {destination.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted font-medium">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-ink"><path d="M16 31a15 15 0 1 1 15-15 15.017 15.017 0 0 1 -15 15zm0-28a13 13 0 1 0 13 13 13.015 13.015 0 0 0 -13-13zm1 17h-2v-10h2zm0-12h-2v-2h2z"></path></svg>
              Destination Guide
            </span>
            <span>•</span>
            <span>Morocco</span>
          </div>
        </div>

        {/* Photo Gallery - Airbnb Style Grid */}
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] md:h-[500px] w-full overflow-hidden rounded-airbnb-md shadow-sm">
            {/* Main large image */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
              <Image 
                src={destination.image} 
                alt={destination.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                priority
              />
            </div>
            {/* Smaller images */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="hidden md:block relative group overflow-hidden">
                <Image 
                  src={destination.gallery?.[i + 1] || destination.image} 
                  alt={`${destination.title} gallery ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-hairline">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted">Vibe</h4>
                  <p className="text-sm font-bold text-ink">Bustling & Cultural</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted">Best Time</h4>
                  <p className="text-sm font-bold text-ink">March - May</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted">Access</h4>
                  <p className="text-sm font-bold text-ink">International Airport</p>
                </div>
              </div>

              {/* Description */}
              <div className="pb-12 border-b border-hairline">
                <h2 className="text-2xl font-bold text-ink mb-6">Explore {destination.title.split(':')[0]}</h2>
                <div className="prose prose-lg prose-slate max-w-none text-body leading-relaxed">
                  <ReactMarkdown>{destination.content}</ReactMarkdown>
                </div>
              </div>
              
              {/* Highlights */}
              <div className="pb-12">
                <h3 className="text-xl font-bold text-ink mb-8">What makes it special</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-ink"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm6.707 10.707-8 8a1 1 0 0 1 -1.414 0l-4-4a1 1 0 1 1 1.414-1.414l3.293 3.293 7.293-7.293a1 1 0 0 1 1.414 1.414z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-ink mb-1">{highlight}</h4>
                        <p className="text-sm text-muted">Discover the unique charm and history of this iconic Moroccan landmark.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / CTA */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white rounded-airbnb-md p-6 shadow-airbnb border border-hairline">
                  <h3 className="text-xl font-bold text-ink mb-4">Interested in visiting?</h3>
                  <p className="text-sm text-body mb-8 leading-relaxed">
                    Our curators can design a private, tailor-made journey to {destination.title.split(':')[0]} and surrounding areas.
                  </p>
                  
                  <div className="space-y-3">
                    <Link 
                      href="#contact" 
                      className="block text-center bg-primary hover:bg-primary-active text-white py-3.5 rounded-airbnb-sm font-bold transition-all shadow-sm active:scale-95"
                    >
                      Start Planning
                    </Link>
                    <p className="text-[11px] text-center text-muted">Free consultation • No commitment</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-hairline">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">Included in Custom Trips:</h4>
                    <ul className="space-y-3">
                      {['Luxury Riads', 'Private Drivers', 'Licensed Guides', 'Custom Routes'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-xs text-ink font-medium">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 rounded-airbnb-md border border-hairline bg-surface-soft/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Explore More</p>
                  <div className="space-y-4">
                     {['Marrakech', 'Chefchaouen', 'Sahara Desert'].map(dest => (
                       <Link key={dest} href={`/destinations/${dest.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-between group">
                         <span className="text-sm font-bold text-ink group-hover:underline">{dest}</span>
                         <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-ink group-hover:translate-x-1 transition-transform"><path d="m12 1 12 12-12 12-1.414-1.414L21.172 13 10.586 2.414z"></path></svg>
                       </Link>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
