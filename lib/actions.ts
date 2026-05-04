import { TourData } from "./tours-shared";
import { PostData } from "./posts-shared";

export interface SearchData {
  tours: TourData[];
  destinations: any[];
  posts: PostData[];
}

export function performSearch(query: string, data: SearchData) {
  if (!query || query.length < 2) return { tours: [], destinations: [], posts: [] };

  const normalizedQuery = query.toLowerCase();

  const tours = data.tours.filter(t => 
    t.title.toLowerCase().includes(normalizedQuery) || 
    t.category.toLowerCase().includes(normalizedQuery) ||
    t.excerpt.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5);

  const destinations = data.destinations.filter(d => 
    d.title.toLowerCase().includes(normalizedQuery) || 
    d.description.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const posts = data.posts.filter(p => 
    p.title.toLowerCase().includes(normalizedQuery) || 
    p.excerpt.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  return { tours, destinations, posts };
}

import { getAllTours } from "./tours";
import { getAllDestinations } from "./destinations";
import { getAllPosts } from "./posts";

export function getSearchIndex(): SearchData {
  const tours = getAllTours().map(t => ({
    slug: t.slug,
    title: t.title,
    category: t.category,
    excerpt: t.excerpt,
    image: t.image,
    duration: t.duration
  })) as any;

  const destinations = getAllDestinations().map(d => ({
    slug: d.slug,
    title: d.title,
    image: d.image,
    description: d.description
  }));

  const posts = getAllPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    date: p.date
  })) as any;

  return { tours, destinations, posts };
}
