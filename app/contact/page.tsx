import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Plan Your Custom Morocco Journey',
  description: 'Ready to start your adventure? Contact our Morocco travel experts for custom itineraries, private tours, and local insights.',
  openGraph: {
    title: 'Contact Us | Plan Your Custom Morocco Journey',
    description: 'Ready to start your adventure? Contact our Morocco travel experts for custom itineraries, private tours, and local insights.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-canvas pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
            
            {/* Contact Info Column */}
            <div className="lg:w-1/3 space-y-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Get in Touch</span>
                <h1 className="text-5xl font-bold text-ink tracking-tight font-heading leading-tight mb-8">
                  Contact Our <br />
                  <span className="text-muted-soft italic font-serif">Morocco Experts</span>
                </h1>
                <p className="text-muted text-lg leading-relaxed">
                  Whether you have a specific itinerary in mind or just a spark of inspiration, 
                  our experts are ready to weave your dreams into reality.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-surface-soft rounded-2xl flex items-center justify-center flex-shrink-0 border border-hairline">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-soft mb-1">WhatsApp & Phone</h3>
                    <p className="text-lg font-bold text-ink">+212 699 048 087</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-surface-soft rounded-2xl flex items-center justify-center flex-shrink-0 border border-hairline">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-soft mb-1">Email Inquiry</h3>
                    <p className="text-lg font-bold text-ink">contact@travelmorocco.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-surface-soft rounded-2xl flex items-center justify-center flex-shrink-0 border border-hairline">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-soft mb-1">Our Base</h3>
                    <p className="text-lg font-bold text-ink">Marrakech, Morocco</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-hairline">
                <p className="text-sm font-medium text-muted-soft italic">
                  &quot;Moroccan hospitality isn&apos;t just a tradition; it&apos;s our promise.&quot;
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:w-2/3">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
