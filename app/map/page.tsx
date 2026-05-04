import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionReveal from '@/components/SectionReveal';
import { Metadata } from 'next';
import UniversalHero from '@/components/UniversalHero';
import Link from 'next/link';
import MapClientWrapper from '@/components/MapClientWrapper';

export const metadata: Metadata = {
  title: 'Discovery Map | Explore Morocco Interactively',
  description: 'Use our interactive map to discover key Moroccan destinations and plan your perfect journey from the Atlas to the Sahara.',
  alternates: {
    canonical: '/map',
  },
};

export default function MapPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <UniversalHero 
          subtitle="Spatial Discovery"
          title="The Discovery Map"
          image="/images/tours/high-view-of-old-city-medina-in-fez-morocco.webp"
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          {/* Page Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-32">
            <SectionReveal>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Spatial Discovery</h2>
              <p className="text-3xl md:text-5xl font-bold text-ink mb-10 tracking-tight font-heading leading-tight">
                Morocco is a tapestry of <span className="italic font-serif text-muted-soft">diverse landscapes</span>. 
                Locate your dream destination.
              </p>
              <div className="w-24 h-px bg-primary/30 mx-auto mb-10" />
              <p className="text-muted text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                Our interactive map helps you visualize the distances and proximity of Morocco&apos;s most iconic hubs. 
                Whether you&apos;re starting in the north or exploring the deep south, see where your journey takes you.
              </p>
            </SectionReveal>
          </div>

          {/* Interactive Map Component */}
          <SectionReveal>
            <MapClientWrapper />
          </SectionReveal>

          {/* Map Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-40 mb-32">
            <SectionReveal>
              <div className="p-10 bg-white rounded-[3rem] border border-hairline shadow-sm h-full">
                <h3 className="text-xl font-bold text-ink mb-6 font-heading flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">01</span>
                  The Imperial North
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  The gateway between Europe and Africa. From the cosmopolitan energy of Tangier to the spiritual heart of Fes, the North is defined by its deep history and the iconic blue-washed streets of the Rif Mountains.
                </p>
                <ul className="text-[10px] font-black uppercase tracking-widest text-primary/60 space-y-2">
                  <li>• Chefchaouen</li>
                  <li>• Fes Medina</li>
                  <li>• Volubilis Ruins</li>
                </ul>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="p-10 bg-white rounded-[3rem] border border-hairline shadow-sm h-full">
                <h3 className="text-xl font-bold text-ink mb-6 font-heading flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">02</span>
                  The Heart & Coast
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Where the vibrant energy of Marrakech meets the Atlantic breeze. This region blends the artistic soul of Essaouira with the modern leadership of Casablanca and Rabat, offering a perfect balance of heritage and comfort.
                </p>
                <ul className="text-[10px] font-black uppercase tracking-widest text-primary/60 space-y-2">
                  <li>• Marrakech Jemaa el-Fna</li>
                  <li>• Essaouira Port</li>
                  <li>• Hassan II Mosque</li>
                </ul>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="p-10 bg-white rounded-[3rem] border border-hairline shadow-sm h-full">
                <h3 className="text-xl font-bold text-ink mb-6 font-heading flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">03</span>
                  The Deep South
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  The cinematic landscapes of the Sahara and the Draa Valley. Home to the legendary golden dunes of Merzouga and the ancient mud-brick Kasbahs that have stood as sentinels of the desert for centuries.
                </p>
                <ul className="text-[10px] font-black uppercase tracking-widest text-primary/60 space-y-2">
                  <li>• Erg Chebbi Dunes</li>
                  <li>• Ait Benhaddou</li>
                  <li>• Skoura Palmaries</li>
                </ul>
              </div>
            </SectionReveal>
          </div>

          {/* Final CTA */}
          <SectionReveal>
            <div className="bg-ink p-20 rounded-[5rem] text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 font-heading tracking-tight">Need help mapping your <br /><span className="italic font-serif text-primary">ideal route?</span></h2>
              <p className="text-white/60 mb-12 max-w-lg mx-auto italic font-medium leading-relaxed">Our curators specialize in optimizing routes to maximize discovery and minimize travel time.</p>
              <Link href="/concierge" className="text-[11px] font-black uppercase tracking-[0.3em] bg-primary text-white px-10 py-5 rounded-full hover:scale-105 transition-all shadow-2xl inline-block">
                Consult a Curator
              </Link>
            </div>
          </SectionReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
