"use server";

import { getAllTours } from "./tours";
import { getAllDestinations } from "./destinations";
import { getAllPosts } from "./posts";

export async function getSearchResults(query: string) {
  if (!query || query.length < 2) return { tours: [], destinations: [], posts: [] };

  const normalizedQuery = query.toLowerCase();

  const allTours = getAllTours();
  const allDestinations = getAllDestinations();
  const allPosts = getAllPosts();

  const tours = allTours.filter(t => 
    t.title.toLowerCase().includes(normalizedQuery) || 
    t.category.toLowerCase().includes(normalizedQuery) ||
    t.excerpt.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5);

  const destinations = allDestinations.filter(d => 
    d.title.toLowerCase().includes(normalizedQuery) || 
    d.description.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const posts = allPosts.filter(p => 
    p.title.toLowerCase().includes(normalizedQuery) || 
    p.excerpt.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  return { tours, destinations, posts };
}
