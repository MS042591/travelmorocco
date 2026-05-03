import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllTours } from '@/lib/tours';
import TourListing from '@/components/TourListing';

export const metadata = {
  title: 'Luxury Morocco Tour Packages | Curated Journeys',
  description: 'Experience the magic of Morocco with our curated collection of premium tours.',
};

export default function ToursPage() {
  const allTours = getAllTours();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas pt-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2 tracking-tight font-heading">
            Moroccan Expeditions
          </h1>
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
