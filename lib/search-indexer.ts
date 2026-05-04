import { getAllTours } from "./tours";
import { getAllDestinations } from "./destinations";
import { getAllPosts } from "./posts";
import { SearchData } from "./search-utils";

/**
 * Builds the search index at build-time. 
 * This should ONLY be called from Server Components or build scripts.
 */
export function getSearchIndex(): SearchData {
  const tours = getAllTours().map(t => ({
    slug: t.slug,
    title: t.title,
    category: t.category,
    excerpt: t.excerpt,
    image: t.image,
    duration: t.duration
  }));

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
  }));

  return { tours, destinations, posts };
}
