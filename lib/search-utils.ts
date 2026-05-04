import { TourData } from "./tours-shared";
import { PostData } from "./posts-shared";

export interface SearchData {
  tours: Partial<TourData>[];
  destinations: any[];
  posts: Partial<PostData>[];
}

/**
 * Performs a client-side search against the provided search index.
 * This function is safe to use in Client Components.
 */
export function performSearch(query: string, data: SearchData) {
  if (!query || query.length < 2) return { tours: [], destinations: [], posts: [] };

  const normalizedQuery = query.toLowerCase();

  const tours = data.tours.filter(t => 
    t.title?.toLowerCase().includes(normalizedQuery) || 
    t.category?.toLowerCase().includes(normalizedQuery) ||
    t.excerpt?.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5);

  const destinations = data.destinations.filter(d => 
    d.title?.toLowerCase().includes(normalizedQuery) || 
    d.description?.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const posts = data.posts.filter(p => 
    p.title?.toLowerCase().includes(normalizedQuery) || 
    p.excerpt?.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  return { tours, destinations, posts };
}
