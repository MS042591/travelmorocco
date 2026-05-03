export interface Review {
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

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
  essentials?: {
    groupSize?: string;
    activityLevel?: string;
    transport?: string;
    groupType?: string;
  };
  faqs?: { q: string; a: string }[];
  route?: string[];
  reviews?: Review[];
}

export const TOUR_CATEGORIES = [
  "Desert Tours",
  "Tours from Marrakech",
  "Tours from Casablanca",
  "Tours from Tangier",
  "From Fes Tours",
  "Luxury Tours"
];
