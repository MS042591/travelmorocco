import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsHero from '@/components/TestimonialsHero';
import SectionReveal from '@/components/SectionReveal';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Traveler Stories & Reviews',
  description: 'Read first-hand accounts of journeys through Morocco. Our guests share their experiences of desert camps, mountain treks, and medina magic.',
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah & Mark Thompson",
      location: "London, UK",
      text: "The 8-day Imperial Cities tour was beyond anything we imagined. Our driver, Omar, wasn't just a guide; he was a gatekeeper to the real Morocco. Every Riad was more stunning than the last, and the private dinner in the Agafay desert was a highlight of our lives.",
      image: "/images/tours/beautiful-tourist-couple-smiling-and-taking-photo-selfie-with-cityscape-of-essaouira-a-unesco-world-heritage-site-in-morocco-north-africa.webp"
    },
    {
      name: "Julianna Rodriguez",
      location: "Miami, USA",
      text: "As a solo female traveler, I was initially nervous, but Travel Morocco handled everything with such care and professionalism. I felt safe, respected, and completely immersed. The Atlas mountain hike was challenging but so rewarding. The berber hospitality is something I will never forget.",
      image: "/images/tours/amazing-and-peaceful-photo-of-sunset-at-desert-with-rear-view-of-a-young-woman-looking-at-it.webp"
    },
    {
      name: "The Chen Family",
      location: "Singapore",
      text: "Traveling with three children is usually stressful, but the logistics were flawless. The kids loved the camel trek and the fossil hunting in Erfoud. Thank you for making our family dream trip a reality.",
      image: "/images/tours/cheerful-mother-and-son-admiring-an-old-kasbah.webp"
    },
    {
      name: "David & Elena",
      location: "Madrid, Spain",
      text: "We wanted a honeymoon that was both adventurous and romantic. The 'Luxury Riad Experience' hit every note. From the rooftop breakfasts in Fes to the private spa in Marrakech—it was pure magic.",
      image: "/images/tours/young-couple-in-riad-making-a-toast-in-archway-marrakesh-morocco.webp"
    },
    {
      name: "Dr. James Wilson",
      location: "Sydney, Australia",
      text: "The attention to detail is what sets this team apart. They understood my interest in history and architecture and paired me with guides who were true scholars. I've traveled all over the world, and this was top-tier service.",
      image: "/images/tours/caucasian-man-standing-by-ornate-temple.webp"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <TestimonialsHero />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          {/* Intro Section */}
          <div className="max-w-4xl mb-32">
            <SectionReveal>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Voices of the Kingdom</h2>
              <p className="text-4xl md:text-6xl font-bold text-ink mb-10 tracking-tighter font-heading leading-tight">
                Don&apos;t just take our word for it. <br />
                <span className="italic font-serif text-muted-soft">Listen to our travelers.</span>
              </p>
              <p className="text-muted text-xl leading-relaxed max-w-2xl font-medium">
                Every journey we curate is a collaboration. These are the stories of those who have walked the red sands and blue alleys with us.
              </p>
            </SectionReveal>
          </div>

          {/* Testimonials Masonry-ish List */}
          <div className="space-y-24">
            {testimonials.map((t, i) => (
              <SectionReveal key={i}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`lg:col-span-5 relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <Image 
                      src={t.image} 
                      alt={t.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="lg:col-span-7 py-12">
                    <div className="mb-8">
                      <div className="flex text-primary mb-4">
                        {[...Array(5)].map((_, star) => (
                          <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-ink italic font-serif leading-relaxed mb-10">
                        &quot;{t.text}&quot;
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-ink font-heading">{t.name}</h4>
                      <p className="text-primary text-xs font-black uppercase tracking-[0.2em]">{t.location}</p>
                    </div>
                  </div>
                </div>
                {i < testimonials.length - 1 && (
                  <div className="w-full h-px bg-hairline mt-24" />
                )}
              </SectionReveal>
            ))}
          </div>

          {/* Final Social CTA */}
          <div className="mt-40 p-20 bg-surface-soft rounded-[5rem] text-center border border-hairline">
            <SectionReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-ink mb-10 font-heading">Be our next story.</h2>
              <p className="text-muted text-lg mb-12 italic max-w-xl mx-auto">Your Moroccan adventure is waiting to be written. Let&apos;s start the first chapter today.</p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                <a href="/tours" className="text-[11px] font-black uppercase tracking-[0.3em] bg-ink text-white px-10 py-5 rounded-full hover:bg-primary transition-all shadow-xl">Browse Journeys</a>
                <a href="/contact" className="text-[11px] font-black uppercase tracking-[0.3em] bg-white text-ink border border-hairline px-10 py-5 rounded-full hover:bg-canvas transition-all">Contact Us</a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
