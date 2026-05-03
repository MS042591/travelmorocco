"use client";

import Image from 'next/image';
import Link from 'next/link';
import chefchaouenImg from '../src/assets/images/chefchaouen.webp';
import ouzoudImg from '../src/assets/images/ouzoud.webp';
import atlasImg from '../src/assets/images/ait-ben-haddou.webp';
import { useModal } from '@/lib/ModalContext';
import { motion } from 'framer-motion';

const features = [
  {
    title: "The Blue Pearl",
    description: "Wander through the enchanting blue-washed streets of Chefchaouen, a photographer's dream in the Rif Mountains.",
    image: chefchaouenImg,
    tag: "City",
    slug: "chefchaouen"
  },
  {
    title: "Sahara Sands",
    description: "Experience the magic of the dunes. Camel treks and luxury camps await in the heart of the Sahara.",
    image: ouzoudImg,
    tag: "Nature",
    slug: "sahara"
  },
  {
    title: "Marrakech Magic",
    description: "Discover the Red City, from the historic Medina to the vibrant Jemaa el-Fnaa square.",
    image: atlasImg,
    tag: "Heritage",
    slug: "marrakech"
  }
];

export default function Features() {
  const { openBooking } = useModal();

  return (
    <section id="destinations" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/destinations/${feature.slug}`} className="group cursor-pointer block">
                <div className="relative aspect-square overflow-hidden rounded-airbnb-md mb-3">
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-ink shadow-sm">
                      Guest favorite
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-2 text-white/90 hover:scale-110 transition-transform">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-white fill-black/30 stroke-2"><path d="m16 28c7-4.733 14-10 14-17 0-3.86599325-3.1340068-7-7-7-2.2666524 0-4.302302 1.08756041-5.6021876 2.81881682l-.3978124.52836636-.3978124-.52836636c-1.2998856-1.73125641-3.33553515-2.81881682-5.6021876-2.81881682-3.86599325 0-7 3.13400675-7 7 0 7 7 12.267 14 17z"></path></svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-ink group-hover:underline">{feature.title}, Morocco</h3>
                    <div className="flex items-center space-x-1 text-sm text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-ink"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z"></path></svg>
                      <span>4.92</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted">Stay with local host</p>
                  <p className="text-sm text-muted">Oct 22 – 27</p>
                  <p className="text-sm text-ink mt-2"><span className="font-bold">$124</span> night</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
