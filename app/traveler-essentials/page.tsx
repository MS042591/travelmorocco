import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EssentialsHero from '@/components/EssentialsHero';
import SectionReveal from '@/components/SectionReveal';
import ClimateChart from '@/components/ClimateChart';
import BudgetChart from '@/components/BudgetChart';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Traveler's Essentials | Prepare for Morocco",
  description: 'Everything you need to know before you land. Packing lists, cultural etiquette, and practical logistics for your Moroccan journey.',
  alternates: {
    canonical: '/traveler-essentials',
  },
};

export default function EssentialsPage() {
  const sections = [
    {
      title: "Packing for the Kingdom",
      desc: "Morocco's climate varies wildly between the Atlantic coast, the Atlas Mountains, and the Sahara desert.",
      items: [
        "Light, breathable linen and cotton for cities.",
        "A warm jacket for mountain evenings and desert nights.",
        "Comfortable, closed-toe walking shoes for Medina cobbles.",
        "Modest clothing (covering shoulders and knees) for rural visits."
      ]
    },
    {
      title: "Cultural Etiquette",
      desc: "Understanding local customs is the key to a deeper connection with the people of Morocco.",
      items: [
        "Ask permission before taking photos of people.",
        "Use your right hand for eating and greeting.",
        "Learn a few words of Arabic or Berber—it goes a long way.",
        "Friday is the holy day; some shops may close for afternoon prayer."
      ]
    },
    {
      title: "Practical Logistics",
      desc: "The small details that make for a seamless transition upon arrival.",
      items: [
        "Currency: Moroccan Dirham (MAD). Closed currency.",
        "Electricity: Type C and Type E (European standard 220V).",
        "Connectivity: Purchase a local SIM (Inwi or Maroc Telecom) at the airport.",
        "Water: Stick to bottled water for drinking and brushing teeth."
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <EssentialsHero />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          {/* Intro */}
          <div className="max-w-3xl mb-24">
            <SectionReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-8 font-heading tracking-tight">The Pre-Departure Guide</h2>
              <p className="text-muted text-xl leading-relaxed font-medium">
                We believe the best journeys are the well-prepared ones. This guide is curated to ensure you arrive with confidence and leave with only the best memories.
              </p>
            </SectionReveal>
          </div>

          {/* Data Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            <SectionReveal>
              <div className="bg-white p-12 rounded-[3rem] border border-hairline shadow-sm h-full">
                <h3 className="text-2xl font-bold text-ink mb-2 font-heading">Climate & Timing</h3>
                <p className="text-muted text-sm mb-8">Average high temperatures in Marrakech by month.</p>
                <ClimateChart />
                <p className="text-xs text-muted mt-6 italic">Tip: Spring (Mar-May) and Autumn (Sep-Nov) are the most comfortable for exploring.</p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="bg-white p-12 rounded-[3rem] border border-hairline shadow-sm h-full flex flex-col">
                <h3 className="text-2xl font-bold text-ink mb-2 font-heading">Typical Daily Budget</h3>
                <p className="text-muted text-sm mb-8">Allocation of expenses for a mid-range traveler.</p>
                <div className="flex-grow flex items-center justify-center">
                  <BudgetChart />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-[#C17767]" />
                    <span className="text-ink/70">Stay (40%)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-[#9D5A4D]" />
                    <span className="text-ink/70">Food (30%)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-[#3E3A37]" />
                    <span className="text-ink/70">Transpo (15%)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-[#D4A373]" />
                    <span className="text-ink/70">Activities (15%)</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Grid of Essentials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-40">
            {sections.map((section, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="h-full p-12 bg-white rounded-[3rem] border border-hairline shadow-sm hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-ink mb-6 font-heading">{section.title}</h3>
                  <p className="text-muted text-sm mb-8 leading-relaxed italic">{section.desc}</p>
                  <ul className="space-y-4">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start space-x-3 text-sm text-ink/80">
                        <span className="text-primary mt-1">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Key Phrases Section */}
          <div className="bg-surface-soft p-12 md:p-24 rounded-[4rem] border border-hairline mb-40">
            <SectionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-3xl font-bold text-ink mb-8 font-heading">Key Phrases</h2>
                  <p className="text-muted mb-10 leading-relaxed">A little bit of Darija (Moroccan Arabic) opens many doors and hearts.</p>
                  
                  <div className="space-y-6">
                    {[
                      { ar: "As-salamu alaykum", en: "Peace be upon you (Greeting)" },
                      { ar: "Shukran", en: "Thank you" },
                      { ar: "Insha'Allah", en: "God willing (Used constantly!)" },
                      { ar: "La bas?", en: "How are you? / Everything okay?" },
                      { ar: "Safi", en: "Enough / Finished" }
                    ].map((phrase, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-hairline pb-4 group">
                        <span className="text-xl font-bold text-ink font-heading group-hover:text-primary transition-colors">{phrase.ar}</span>
                        <span className="text-sm text-muted italic">{phrase.en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image 
                    src="/images/tours/man-with-traditional-kaftan-dress-in-the-blue-city-of-chefchaouen-morocco.webp" 
                    alt="Moroccan Hospitality" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Downloadable PDF CTA (Placeholder feel but premium) */}
          <SectionReveal>
            <div className="text-center bg-ink text-white p-20 rounded-[4rem]">
              <h3 className="text-3xl font-bold mb-6 font-heading">The Comprehensive PDF Guide</h3>
              <p className="text-white/60 mb-10 max-w-xl mx-auto italic leading-relaxed">
                Booked your journey? Our full 40-page immersive pre-departure guide is sent to all guests 60 days before travel.
              </p>
              <button className="text-[11px] font-black uppercase tracking-[0.3em] bg-primary text-white px-10 py-5 rounded-full hover:scale-105 transition-all shadow-2xl">
                Request a Sample Guide
              </button>
            </div>
          </SectionReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
