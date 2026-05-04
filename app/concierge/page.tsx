import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConciergeHero from '@/components/ConciergeHero';
import SectionReveal from '@/components/SectionReveal';
import PlannerButton from '@/components/PlannerButton';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Concierge & Custom Planning | Travel Morocco',
  description: 'Design your perfect, bespoke Moroccan journey. Our private concierge service handles everything from curated Riads to exclusive desert experiences.',
};

export default function ConciergePage() {
  const processSteps = [
    {
      title: "The Consultation",
      desc: "We begin with a deep dive into your travel style, interests, and dreams. Whether it's a culinary obsession, an architectural passion, or a need for pure desert silence.",
      icon: "🗣️"
    },
    {
      title: "The Curation",
      desc: "Our expert curators design a draft itinerary. We select the specific riads, private guides, and exclusive experiences that align with your unique vision.",
      icon: "🎨"
    },
    {
      title: "The Coordination",
      desc: "Once perfected, we handle every detail—from luxury transport and logistics to securing the best tables in hidden Medina restaurants.",
      icon: "⚙️"
    },
    {
      title: "The Celebration",
      desc: "From the moment you land, your private concierge is on-call 24/7. You simply travel, while we ensure every mile is seamless and magical.",
      icon: "✨"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <ConciergeHero />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-32">
            <SectionReveal>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Bespoke Excellence</h2>
              <p className="text-3xl md:text-5xl font-bold text-ink mb-10 tracking-tight font-heading leading-tight">
                We don&apos;t just book tours. <br />
                We curate <span className="italic font-serif text-muted-soft">unforgettable chapters</span> of your life story.
              </p>
              <div className="w-24 h-px bg-primary/30 mx-auto mb-10" />
              <p className="text-muted text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                Our Private Concierge service is designed for the traveler who seeks the exceptional. 
                Everything is tailor-made. Everything is private. Everything is perfect.
              </p>
            </SectionReveal>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-40">
            {processSteps.map((step, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="p-10 bg-white rounded-[3rem] border border-hairline shadow-sm hover:shadow-xl transition-all h-full group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                  <h3 className="text-xl font-bold text-ink mb-4 font-heading">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Featured Experiences Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <SectionReveal>
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-ink tracking-tight font-heading">Access to the Inaccessible</h2>
                <p className="text-muted text-lg leading-relaxed">
                  Through our deep local roots, we open doors that are closed to others. 
                  Private dinners in ancient palace ruins, meetings with master artisans in their private studios, or a solitary sunrise breakfast in the middle of the Erg Chebbi dunes.
                </p>
                <p className="text-muted text-lg leading-relaxed">
                  Your concierge isn&apos;t just a planner; they are your key to the true, unfiltered soul of the Kingdom.
                </p>
                <div className="pt-6">
                  <PlannerButton>Start the Conversation</PlannerButton>
                </div>
              </div>
            </SectionReveal>

            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/tours/amazing-traditional-handmade-turkish-lamps-in-souvenir-shop.webp" 
                alt="Bespoke Experiences" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-ink p-16 md:p-32 rounded-[5rem] text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 font-heading">Ready to design your <br /><span className="italic font-serif text-primary">masterpiece?</span></h2>
              <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto font-medium italic">Our curators are currently accepting new journey designs for the 2026/2027 season.</p>
              <PlannerButton>Talk to a Curator</PlannerButton>
            </div>
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <Image 
                src="/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp" 
                alt="Pattern" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
