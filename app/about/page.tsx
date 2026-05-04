import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionReveal from '@/components/SectionReveal';
import AboutHero, { MissionCard } from '@/components/AboutClient';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Travel Morocco - Authentic Heritage',
  description: 'Discover the passion behind Travel Morocco. Founded in the alleys of Fes, we bridge the gap between curious travelers and the authentic soul of the Kingdom.',
  openGraph: {
    title: 'Our Story | Travel Morocco - Authentic Heritage',
    description: 'Discover the passion behind Travel Morocco. Founded in the alleys of Fes, we bridge the gap between curious travelers and the authentic soul of the Kingdom.',
  },
  alternates: {
    canonical: 'https://travelmorocco.co/about/',
  },
};

export default function AboutPage() {
  const missionValues = [
    { title: "Authenticity", desc: "We bypass the tourist traps to show you the real, unfiltered Morocco.", icon: "🏺" },
    { title: "Expertise", desc: "Our local guides are storytellers with decades of ancestral knowledge.", icon: "📖" },
    { title: "Impact", desc: "We support local artisans and communities to ensure sustainable tourism.", icon: "🤝" }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <AboutHero />

        {/* Narrative Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <SectionReveal>
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-ink tracking-tight font-heading">Born from a Passion for Discovery</h2>
                  <p className="text-muted text-lg leading-relaxed">
                    Travel Morocco was founded not as a business, but as a calling. It began in the winding alleys of the Fes Medina and the silent expanses of the Sahara, where we realized that the true magic of Morocco isn&apos;t found in guidebooks—it&apos;s found in the warmth of a Berber family&apos;s tea, the intricate stories carved into zellige tiles, and the rhythm of the Atlantic tides.
                  </p>
                  <p className="text-muted text-lg leading-relaxed">
                    Our mission is simple: to bridge the gap between the curious traveler and the authentic soul of the Kingdom. We don&apos;t just provide tours; we curate deep, immersive experiences that leave a lasting mark on your spirit.
                  </p>
                  <div className="pt-4">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-primary"></div>
                      <span className="text-sm font-bold text-ink uppercase tracking-widest">Hand-Crafted Since 2012</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/images/tours/traveling-by-morocco-happy-young-woman-in-traditional-riad-interior-in-medina.webp" 
                  alt="Exploring Morocco" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24 bg-surface-soft">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-ink mb-6 font-heading">Our Guided Principles</h2>
              <p className="text-muted">Every itinerary we build and every mile we travel is rooted in these four core values.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {missionValues.map((value, i) => (
                <MissionCard key={value.title} value={value} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
