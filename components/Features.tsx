"use client";

import Image from 'next/image';
import Link from 'next/link';
import chefchaouenImg from '../src/assets/images/chefchaouen.jpg';
import ouzoudImg from '../src/assets/images/ouzoud.jpg';
import atlasImg from '../src/assets/images/ait-ben-haddou.jpg';
import { useModal } from '@/lib/ModalContext';

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
    <section id="tours" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-terracotta font-bold tracking-widest text-sm uppercase mb-4">Curated Experiences</h2>
          <p className="text-4xl md:text-5xl font-bold text-slate mb-6">Discover the Heart of Morocco</p>
          <div className="w-24 h-1 bg-terracotta mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-72 overflow-hidden">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-slate">
                  {feature.tag}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/destinations/${feature.slug}`}
                    className="text-terracotta font-bold flex items-center group-hover:gap-2 transition-all"
                  >
                    Learn More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </Link>
                  <button 
                    onClick={openBooking}
                    className="text-slate text-sm font-bold border-b-2 border-transparent hover:border-terracotta transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
