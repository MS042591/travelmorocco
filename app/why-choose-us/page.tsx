import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionReveal from '@/components/SectionReveal';
import Link from 'next/link';
import { Metadata } from 'next';
import { WhyHero, ValueItem, FeatureImage } from '@/components/WhyChooseUsClient';
import PlannerButton from '@/components/PlannerButton';

export const metadata: Metadata = {
  title: 'Why Choose Us | Travel Morocco - The Standard of Excellence',
  description: 'Slow travel, deep immersion, and Moroccan heritage. Discover why Authentic Moroccan Adventures is the preferred choice for discerning travelers.',
  openGraph: {
    title: 'Why Choose Us | Travel Morocco - The Standard of Excellence',
    description: 'Slow travel, deep immersion, and Moroccan heritage. Discover why Authentic Moroccan Adventures is the preferred choice for discerning travelers.',
  },
  alternates: {
    canonical: '/why-choose-us',
  },
};

const features = [
  {
    tag: "Philosophy",
    title: "Slow Travel, Deep Immersion",
    desc: "We don&apos;t believe in rushed itineraries or &apos;checking boxes&apos;. Our journeys are designed to let you breathe, to sit for a third glass of mint tea, and to truly connect with the rhythm of Moroccan life.",
    image: "/images/tours/moroccan-man-preparing-maghrebi-mint-tea.webp",
    align: "left"
  },
  {
    tag: "Expertise",
    title: "Born in Marrakech, Vetted for Excellence",
    desc: "Our founders are Moroccans who have spent decades exploring every corner of the Kingdom. We personally stay at every Riad and vet every guide to ensure they meet our rigorous standards of hospitality and knowledge.",
    image: "/images/tours/riad-in-marrakesh-medina.webp",
    align: "right"
  },
  {
    tag: "Access",
    title: "Beyond the Velvet Rope",
    desc: "Because of our deep local roots, we open doors that are closed to others. Private dinners in hidden palaces, workshops with master artisans, and exclusive desert camps far from the tourist trails.",
    image: "/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp",
    align: "left"
  }
];

const values = [
  {
    title: "Tailor-Made Integrity",
    desc: "Every itinerary is built from scratch. No templates, no compromise.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Ethical Impact",
    desc: "We prioritize local suppliers and ensure your travel spend supports heritage preservation.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: "24/7 Concierge",
    desc: "From landing to departure, our team is a WhatsApp message away.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  }
];

export default function WhyChooseUsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <WhyHero />

        {/* Core Values Strip */}
        <section className="py-16 bg-surface-soft border-b border-hairline">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((v, i) => (
                <ValueItem key={v.title} v={v} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Editorial Sections */}
        <section className="py-32 space-y-40">
          {features.map((f, i) => (
            <div key={f.title} className="container mx-auto px-4 md:px-8 lg:px-20">
              <div className={`flex flex-col ${f.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                <FeatureImage image={f.image} title={f.title} />
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <SectionReveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-soft block">{f.tag}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight font-heading leading-tight">
                      {f.title}
                    </h2>
                    <p className="text-muted text-lg md:text-xl leading-relaxed">
                      {f.desc}
                    </p>
                    <div className="pt-4">
                       <div className="w-20 h-1 bg-primary/20 rounded-full" />
                    </div>
                  </SectionReveal>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Trust Stats Section */}
        <section className="py-32 bg-ink text-white overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-8 lg:px-20 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Hand-picked Riads", value: "150+" },
                { label: "Expert Local Guides", value: "45" },
                { label: "Custom Itineraries", value: "2k+" },
                { label: "Years of Heritage", value: "15" }
              ].map((stat, i) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-6xl font-bold mb-2 font-heading text-primary">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/images/pattern.webp')] opacity-5 mix-blend-overlay" />
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-canvas text-center">
          <div className="container mx-auto px-4">
             <SectionReveal>
                <h2 className="text-4xl md:text-6xl font-bold text-ink mb-10 font-heading tracking-tight">Your story is waiting. <br />Shall we write the first chapter?</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <PlannerButton className="bg-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-primary-active transition-all hover:scale-105 shadow-xl shadow-primary/20">
                    Plan Your Journey
                  </PlannerButton>
                  <Link href="/tours" className="text-ink font-bold group flex items-center gap-2">
                    Browse Signature Tours
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:translate-x-1 transition-transform" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
             </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
