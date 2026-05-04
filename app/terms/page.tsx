import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionReveal from '@/components/SectionReveal';
import { Metadata } from 'next';
import UniversalHero from '@/components/UniversalHero';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Travel Morocco',
  description: 'The legal framework for our travel services. Understanding our booking, cancellation, and liability policies.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <UniversalHero 
          title="Terms & Conditions"
          subtitle="Legal Framework"
          image="/images/tours/a-stunning-mosque-in-koutoubia.webp"
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-24">
          <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-hairline">
            <SectionReveal>
              <div className="prose prose-lg prose-ink max-w-none">
                <p className="text-muted italic mb-8">Last Updated: May 2026</p>
                
                <p className="text-xl text-ink font-medium leading-relaxed mb-12 border-l-4 border-primary pl-8 py-2">
                  Every great journey needs a clear map. These terms and conditions provide the framework for our collaboration, ensuring transparency, safety, and mutual respect from the moment you book until your return home.
                </p>
                
                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">1. Introduction</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  These Terms and Conditions govern the relationship between Travel Morocco (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) and the traveler (&quot;you&quot;, &quot;your&quot;). By booking a tour with us, you agree to be bound by these terms.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">2. Booking & Deposit</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  A non-refundable deposit of 25% of the total tour price is required at the time of booking to secure your reservation. The remaining balance is due 45 days before the tour start date. For bookings made within 45 days of departure, full payment is required immediately.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">3. Cancellation Policy</h2>
                <ul className="list-disc pl-6 text-muted mb-8 space-y-3">
                  <li>Cancellations more than 60 days before departure: Loss of deposit only.</li>
                  <li>Cancellations 30–59 days before departure: 50% of total tour price.</li>
                  <li>Cancellations less than 30 days before departure: 100% of total tour price.</li>
                </ul>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">4. Travel Insurance</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  Travel insurance is **mandatory** for all our travelers. Your insurance must cover personal accident, medical expenses, emergency repatriation, and personal liability. We also strongly recommend coverage for trip cancellation and loss of luggage.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">5. Liability</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  Travel Morocco acts as an agent for transport companies, hotels, and other contractors. We are not liable for any injury, damage, loss, delay, or irregularity which may be occasioned by reason of any defect in any vehicle or through the acts or default of any company or person engaged in conveying the passenger.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">6. Force Majeure</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  We are not responsible for changes or cancellations caused by &quot;Force Majeure&quot; events, including but not limited to war, threat of war, riot, civil strife, industrial dispute, terrorist activity, natural or nuclear disaster, fire, or adverse weather conditions.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
