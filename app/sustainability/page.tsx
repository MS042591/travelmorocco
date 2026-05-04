import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UniversalHero from '@/components/UniversalHero';
import SectionReveal from '@/components/SectionReveal';

export const metadata = {
  title: 'Sustainability & Impact | Travel Morocco',
  description: 'Our commitment to ethical travel, local empowerment, and environmental preservation in the Kingdom of Morocco.',
};

export default function SustainabilityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <UniversalHero 
          subtitle="Ethical Travel"
          title="Sustainability & Impact"
          image="/images/tours/beautiful-moroccan-mountain-landscape-in-desert-with-blue-sky.webp"
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          <div className="max-w-3xl mx-auto">
            <SectionReveal>
              <h2 className="text-3xl font-bold text-ink mb-8 font-heading">Our Commitment</h2>
              <p className="text-muted text-lg leading-relaxed mb-12">
                At Travel Morocco, we believe that travel should be a force for good. We are committed to preserving the natural beauty of the Kingdom and empowering the local communities that make every journey unique.
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
              <SectionReveal>
                <h3 className="text-xl font-bold text-ink mb-4 font-heading">Supporting Local Communities</h3>
                <p className="text-sm text-muted leading-relaxed">
                  We prioritize locally-owned Riads, traditional artisans, and Berber guides. By keeping tourism revenue within the communities, we help preserve ancestral ways of life.
                </p>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h3 className="text-xl font-bold text-ink mb-4 font-heading">Environmental Stewardship</h3>
                <p className="text-sm text-muted leading-relaxed">
                  From desert camps with minimal footprints to plastic-reduction initiatives, we strive to minimize our impact on Morocco&apos;s fragile ecosystems.
                </p>
              </SectionReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
