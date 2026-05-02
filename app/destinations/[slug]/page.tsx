import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getAllDestinations } from '@/lib/destinations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import ModalWrapper from '@/components/ModalWrapper';

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
      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src={destination.image} 
              alt={destination.title} 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {destination.title}
            </h1>
            <p className="text-xl max-w-2xl mx-auto font-medium text-white/90">
              {destination.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg prose-slate max-w-none mb-12">
                  <ReactMarkdown>{destination.content}</ReactMarkdown>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-slate mb-6">Key Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-terracotta mr-3 text-xl">✦</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar / CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 bg-slate text-white p-8 rounded-3xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4">Plan Your Trip</h3>
                  <p className="text-white/70 mb-8">
                    Interested in visiting {destination.title.split(':')[0]}? Let us create a custom itinerary for you.
                  </p>
                  <Link 
                    href="#contact" 
                    className="block text-center bg-terracotta hover:bg-[#d1624b] text-white py-4 rounded-full font-bold transition-all"
                  >
                    Get a Quote
                  </Link>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Other Destinations</p>
                    <div className="space-y-4">
                       <Link href="/destinations/marrakech" className="block hover:text-terracotta transition-colors">Marrakech</Link>
                       <Link href="/destinations/chefchaouen" className="block hover:text-terracotta transition-colors">Chefchaouen</Link>
                       <Link href="/destinations/sahara" className="block hover:text-terracotta transition-colors">Sahara Desert</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
