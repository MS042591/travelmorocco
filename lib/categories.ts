export interface CategoryMetadata {
  slug: string;
  title: string;
  displayName: string;
  description: string;
  heroImage: string;
  keywords: string[];
}

export const CATEGORY_METADATA: Record<string, CategoryMetadata> = {
  "desert-tours": {
    slug: "desert-tours",
    title: "Private Sahara Desert Tours",
    displayName: "Desert Tours",
    description: "Experience the magic of the dunes. Our private Sahara expeditions offer luxury glamping, camel trekking, and authentic Berber hospitality under the stars.",
    heroImage: "/images/hero-sahara-opt.jpg",
    keywords: ["Sahara Desert Tours", "Merzouga Luxury Camp", "Erg Chigaga Expedition", "Private Desert Safari"]
  },
  "marrakech-tours": {
    slug: "marrakech-tours",
    title: "Private Tours from Marrakech",
    displayName: "Tours from Marrakech",
    description: "The Red City is your gateway to the Atlas Mountains and the Sahara. Discover hand-crafted day trips and multi-day journeys starting from Marrakech.",
    heroImage: "/images/tours/beautiful-sunset-in-the-jemaa-el-fna-square-in-the-city-of-marrakech-with-bustle-activity-street-food-market-lights-and-colorful-sky-picture-taken-during-travel-vacations-in-morocco.webp",
    keywords: ["Marrakech Day Trips", "Atlas Mountains Tour", "Marrakech to Desert", "Private Guide Marrakech"]
  },
  "casablanca-tours": {
    slug: "casablanca-tours",
    title: "Private Tours from Casablanca",
    displayName: "Tours from Casablanca",
    description: "Begin your Moroccan odyssey in the economic heart of the Kingdom. Iconic coastal routes and imperial city tours departing from Casablanca.",
    heroImage: "/images/tours/the-royal-palace-golden-doors-fez-morocco.webp",
    keywords: ["Casablanca Tours", "Hassan II Mosque Visit", "Casablanca to Chefchaouen", "Imperial Cities Morocco"]
  },
  "fes-tours": {
    slug: "fes-tours",
    title: "Private Tours from Fes",
    displayName: "From Fes Tours",
    description: "Step back in time in the world's largest living medieval medina. Expert-led tours through Fes and beyond into the Middle Atlas.",
    heroImage: "/images/tours/the-royal-palace-golden-doors-fez-morocco.webp",
    keywords: ["Fes Medina Tour", "Fes to Merzouga", "Meknes and Volubilis", "Middle Atlas Guided Tour"]
  },
  "tangier-tours": {
    slug: "tangier-tours",
    title: "Private Tours from Tangier",
    displayName: "Tours from Tangier",
    description: "Where the Mediterranean meets the Atlantic. Explore the Blue City of Chefchaouen and the northern wonders departing from Tangier.",
    heroImage: "/images/tours/blue-wooden-rowboats-port-essaouira-harbor-morocco-north-africa.webp",
    keywords: ["Tangier to Chefchaouen", "Rif Mountains Tour", "Tangier Day Trips", "Northern Morocco Private Tour"]
  },
  "luxury-tours": {
    slug: "luxury-tours",
    title: "Luxury Morocco Experiences",
    displayName: "Luxury Tours",
    description: "For those who seek the extraordinary. Exclusive riads, private helicopters, and bespoke itineraries designed for total immersion in comfort.",
    heroImage: "/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp",
    keywords: ["Luxury Morocco Tour", "Private Jet Morocco", "Exclusive Riads", "Bespoke Travel Morocco"]
  }
};

export function getCategorySlug(displayName: string): string | null {
  for (const key in CATEGORY_METADATA) {
    if (CATEGORY_METADATA[key].displayName === displayName) {
      return CATEGORY_METADATA[key].slug;
    }
  }
  return null;
}
