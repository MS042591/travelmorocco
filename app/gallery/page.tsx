import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryHero from '@/components/GalleryHero';
import SectionReveal from '@/components/SectionReveal';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morocco Lookbook | A Visual Journey',
  description: 'Immerse yourself in the colors, textures, and landscapes of the Kingdom. A curated collection of photography from the Atlas to the Sahara.',
};

export default function GalleryPage() {
  const galleryImages = [
    { src: "/images/tours/blue-stairway-with-colourful-flowerpots.webp", alt: "Chefchaouen Blue Alleys", span: "row-span-2" },
    { src: "/images/tours/a-luxury-camp-in-the-moroccan-sahara-desert-near-erg-chebbi.webp", alt: "Sahara Luxury Camp", span: "col-span-2" },
    { src: "/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp", alt: "Intricate Tilework", span: "row-span-1" },
    { src: "/images/tours/ait-benhaddou-ancient-city-in-morocco-north-africa.webp", alt: "Ait Benhaddou Kasbah", span: "row-span-2" },
    { src: "/images/tours/beautiful-sunrise-in-essaouira-port-traditional-blue-fishing-boats.webp", alt: "Essaouira Fishing Boats", span: "col-span-1" },
    { src: "/images/tours/marrakesh-city-skyline-with-atlas-mountains-in-the-background.webp", alt: "Marrakech Skyline", span: "col-span-2" },
    { src: "/images/tours/amazing-traditional-handmade-turkish-lamps-in-souvenir-shop.webp", alt: "Moroccan Lanterns", span: "row-span-1" },
    { src: "/images/tours/beautiful-waterfall-in-morocco-back-woman-beautiful-dress-looking-fall-ouzoud-grand-atlas-exotic-nature-north-africa.webp", alt: "Ouzoud Waterfalls", span: "row-span-2" },
    { src: "/images/tours/berber-man-at-sunset-in-the-desert-of-merzouga-morocco.webp", alt: "Berber Man in Sahara", span: "col-span-1" },
    { src: "/images/tours/attarine-madrasa-fez-madressa.webp", alt: "Fes Madrasa Architecture", span: "col-span-1" },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <GalleryHero />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          {/* Gallery Header */}
          <div className="max-w-3xl mb-24">
            <SectionReveal>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Curated Moments</h2>
              <p className="text-muted text-xl md:text-2xl leading-relaxed font-medium">
                Morocco is a sensory masterpiece. This lookbook is a tribute to the light of the desert, the blue of the medinas, and the timeless heritage of the Kingdom.
              </p>
            </SectionReveal>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
            {galleryImages.map((img, i) => (
              <SectionReveal key={i} className={`${img.span} relative rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700`}>
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-10 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-bold tracking-tight text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-heading">
                    {img.alt}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Final Inspiration CTA */}
          <div className="mt-40 text-center max-w-2xl mx-auto">
            <SectionReveal>
              <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
              <h3 className="text-3xl md:text-4xl font-bold text-ink mb-8 font-heading">See it for yourself.</h3>
              <p className="text-muted mb-12 italic leading-relaxed">
                Photos can only capture a fraction of the magic. The scent of orange blossom in a riad courtyard, the sound of the call to prayer, and the warmth of the Sahara sun are waiting for you.
              </p>
              <div className="flex justify-center">
                <a href="/tours" className="text-[11px] font-black uppercase tracking-[0.3em] bg-ink text-white px-10 py-5 rounded-full hover:bg-primary transition-all hover:scale-105 shadow-xl">
                  Explore our Journeys
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
