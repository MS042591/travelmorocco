"use client";

import dynamic from 'next/dynamic';

const MapWrapper = dynamic(() => import('@/components/MapWrapper'), { 
  ssr: false, 
  loading: () => <div className="h-96 w-full bg-surface-soft animate-pulse rounded-3xl" /> 
});

const MoroccoLiveWidget = dynamic(() => import('@/components/MoroccoLiveWidget'), { ssr: false });
const FAQAccordion = dynamic(() => import('@/components/FAQAccordion'));
const TourItinerary = dynamic(() => import('@/components/TourItinerary'));

interface TourClientDetailsProps {
  tour: any;
}

export default function TourClientDetails({ tour }: TourClientDetailsProps) {
  const defaultFaqs = [
    { q: "What should I pack?", a: "We recommend comfortable walking shoes, a sun hat, and layers for the cool desert nights. A small daypack for water and camera gear is also essential." },
    { q: "Is Wi-Fi available during the tour?", a: "Wi-Fi is available in most Riads and hotels. In the Sahara desert camp, connectivity is limited, allowing you to fully immerse in the experience." },
    { q: "Can the tour be customized?", a: "Absolutely. All our tours are private and can be adjusted to your pace, interests, and dietary requirements." }
  ];

  return (
    <div className="space-y-16">
      {/* Itinerary Section */}
      <div id="itinerary" className="pb-12 border-b border-hairline">
        <TourItinerary itinerary={tour.itinerary || []} duration={tour.duration} />
      </div>

      {/* Map Section */}
      <div id="map" className="pb-12 border-b border-hairline">
        <h3 className="text-xl font-bold text-ink mb-6 font-heading">Route Map</h3>
        <MapWrapper tourTitle={tour.title} route={tour.route} itinerary={tour.itinerary} />
      </div>

      {/* FAQ Section */}
      <div id="faq" className="pb-12 border-b border-hairline">
        <h3 className="text-xl font-bold text-ink mb-8 font-heading">Good to know</h3>
        <FAQAccordion items={tour.faqs && tour.faqs.length > 0 ? tour.faqs : defaultFaqs} />
      </div>

      {/* Policies */}
      <div className="pb-12">
        <h3 className="text-xl font-bold text-ink mb-6 font-heading">Cancellation Policy</h3>
        <div className="flex gap-4 items-start p-6 bg-surface-soft/30 rounded-2xl border border-hairline">
          <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-primary shadow-sm">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><path d="M16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12.014 12.014 0 0 1 -12 12zm1-18h-2v8.414l4.293 4.293 1.414-1.414L17 16.586V10z"></path></svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink mb-1">Free cancellation</h4>
            <p className="text-xs text-muted leading-relaxed">
              Cancel up to 7 days before your experience starts for a full refund. No refunds for cancellations made within 7 days of the start date.
            </p>
          </div>
        </div>
      </div>
      {/* Live Widget */}
      <MoroccoLiveWidget />
    </div>
  );
}
