import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllDestinations } from '@/lib/destinations';
import DestinationCard from '@/components/DestinationCard';
import SectionReveal from '@/components/SectionReveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Morocco | Iconic Cities & Hidden Gems',
  description: 'A curated guide to Morocco\'s most iconic destinations. From the blue streets of Chefchaouen to the red dunes of Merzouga.',
  openGraph: {
    title: 'Explore Morocco | Iconic Cities & Hidden Gems',
    description: 'A curated guide to Morocco\'s most iconic destinations. From the blue streets of Chefchaouen to the red dunes of Merzouga.',
  }
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <>
      <Navbar />
      <main className="bg-canvas min-h-screen pt-40 pb-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          {/* Refined Minimalist Header */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <SectionReveal>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 block">The Collection</span>
              <h1 className="text-5xl md:text-8xl font-bold text-ink tracking-tighter font-heading leading-none mb-10">
                Explore Morocco: <br />
                <span className="text-muted-soft italic font-serif">Iconic Destinations</span>
              </h1>
              <div className="w-20 h-1 bg-primary/20 mx-auto mb-10 rounded-full" />
              <p className="text-muted text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
                From the imperial grandeur of Fes to the blue-washed tranquility of Chefchaouen. 
                A curated guide to the Kingdom&apos;s most iconic destinations.
              </p>
            </SectionReveal>
          </div>

          {/* Clean 3-Column Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {destinations.map((city, index) => (
              <DestinationCard 
                key={city.slug} 
                destination={city} 
                index={index}
                priority={index < 3}
              />
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="mt-32 p-16 rounded-[4rem] bg-surface-soft border border-hairline text-center overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6 font-heading">Not sure where to start?</h2>
              <p className="text-muted mb-10 max-w-xl mx-auto">Our travel curators can help you design a multi-city journey that captures the perfect balance of discovery and relaxation.</p>
              <button className="bg-primary text-white px-12 py-5 rounded-full font-bold hover:bg-primary-active transition-all hover:scale-105 shadow-xl shadow-primary/20">
                Talk to a Curator
              </button>
            </div>
            {/* Decorative Moroccan Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-ink">
                <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
              </svg>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
