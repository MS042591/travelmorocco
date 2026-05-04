import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllTours } from '@/lib/tours';
import TourListing from '@/components/TourListing';
import UniversalHero from '@/components/UniversalHero';

export const metadata = {
  title: 'Luxury Morocco Tour Packages | Premium Curated Journeys 2026',
  description: 'Experience the magic of Morocco with our curated collection of premium tours. From desert expeditions to imperial city explorations.',
  openGraph: {
    title: 'Luxury Morocco Tour Packages | Premium Curated Journeys 2026',
    description: 'Experience the magic of Morocco with our curated collection of premium tours. From desert expeditions to imperial city explorations.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://travelmorocco.co/tours/',
  },
};

export default function ToursPage() {
  const allTours = getAllTours();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas">
        <UniversalHero 
          image="/images/tours/caravan-going-through-the-sand-dunes-in-the-sahara-desert-morocco-merzuga-tourist-visit-the-desert-on-camels-during-the-holidays-adventure-and-freedom-during-a-trip-safari-organized-travel.webp"
          height="13vh"
          overlayOpacity={0.4}
        />
        
        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-12">
          <p className="text-sm text-muted">
            {allTours.length > 0 
              ? `Discover our curated selection of ${allTours.length} journeys across the Kingdom.`
              : "Loading our curated journeys..."
            }
          </p>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-20 pb-20">
          <TourListing initialTours={allTours} />
        </div>
      </main>
      <Footer />
    </>
  );
}
