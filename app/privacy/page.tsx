import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionReveal from '@/components/SectionReveal';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Travel Morocco',
  description: 'How we protect and manage your personal data. Our commitment to your privacy and security.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* Simple Legal Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp" 
            alt="Privacy Policy" 
            fill 
            className="object-cover brightness-[0.6] grayscale-[0.1]"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-[5]" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold !text-white tracking-tight font-heading">
              Privacy <span className="italic font-serif text-white/90 text-primary">Policy</span>
            </h1>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-24">
          <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-hairline">
            <SectionReveal>
              <div className="prose prose-lg prose-ink max-w-none">
                <p className="text-muted italic mb-12">Last Updated: May 2026</p>
                
                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">1. Data Collection</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  We collect personal information that you provide to us directly when you book a tour, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, passport details, and dietary requirements.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">2. How We Use Your Data</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  We use your information exclusively to:
                </p>
                <ul className="list-disc pl-6 text-muted mb-8 space-y-3">
                  <li>Process your bookings and payments.</li>
                  <li>Communicate with you regarding your trip.</li>
                  <li>Provide necessary information to local partners (hotels, guides) to ensure your safety and comfort.</li>
                  <li>Improve our services and website experience.</li>
                </ul>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">3. Data Sharing</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  We **never** sell your personal data to third parties. We only share your information with trusted local partners who are essential to the execution of your tour. These partners are obligated to protect your data under our agreements.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">4. Cookies</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect certain site functionalities.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">5. Security</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. All financial transactions are processed through secure, encrypted gateways.
                </p>

                <h2 className="text-2xl font-bold text-ink mb-6 font-heading">6. Your Rights</h2>
                <p className="text-muted mb-8 leading-relaxed">
                  You have the right to access, correct, or delete your personal data at any time. If you wish to exercise these rights, please contact us at hello@travelmorocco.com.
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
