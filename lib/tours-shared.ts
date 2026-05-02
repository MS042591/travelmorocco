export interface TourData {
  slug: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  image: string;
  gallery?: string[];
  excerpt: string;
  description?: string;
  date: string;
  content: string;
  bestSeller?: boolean;
  highlights?: string[];
  itinerary?: { day: number; title: string; description: string; image?: string }[];
  included?: string[];
  excluded?: string[];
}

export const TOUR_CATEGORIES = [
  "Tour from Casablanca",
  "Tours from Marrakech",
  "Tours from Tangier",
  "Tours from Fes",
  "Morocco Luxury Tours"
];
