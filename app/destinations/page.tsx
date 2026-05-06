import { getAllDestinations } from '@/lib/destinations';
import DestinationCard from '@/components/DestinationCard';
import PlannerButton from '@/components/PlannerButton';
import UniversalHero from '@/components/UniversalHero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Morocco | Iconic Cities & Hidden Gems',
  description: 'A curated guide to Morocco\'s most iconic destinations. From the blue streets of Chefchaouen to the red dunes of Merzouga.',
  openGraph: {
    title: 'Explore Morocco | Iconic Cities & Hidden Gems',
    description: 'A curated guide to Morocco\'s most iconic destinations. From the blue streets of Chefchaouen to the red dunes of Merzouga.',
  },
  alternates: {
    canonical: 'https://travelmorocco.co/destinations/',
  },
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <>
      <div className="bg-canvas">
        <UniversalHero 
          subtitle="The Collection"
          title="Explore Morocco: Iconic Destinations"
          image="/images/tours/blue-stairway-with-colourful-flowerpots.webp"
        />
        
        <div className="container mx-auto px-4 md:px-8 lg:px-20 pt-24">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6 font-heading tracking-tight">The Tapestry of the Kingdom</h2>
            <p className="text-muted text-xl leading-relaxed font-medium">
              From the Atlantic breezes of Essaouira to the golden silence of the Sahara. 
              Discover our curated guide to Morocco&apos;s most iconic hubs and hidden sanctuaries.
            </p>
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
              <PlannerButton>
                Talk to a Curator
              </PlannerButton>
            </div>
            {/* Decorative Moroccan Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-ink">
                <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
