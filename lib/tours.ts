import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TourData } from './tours-shared';

const toursDirectory = path.join(process.cwd(), 'content/tours');

export function getAllTours(): TourData[] {
  if (!fs.existsSync(toursDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(toursDirectory);
  const allToursData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(toursDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        category: data.category,
        duration: data.duration,
        price: data.price,
        image: data.image,
        gallery: data.gallery || [],
        excerpt: data.excerpt,
        description: data.description || "",
        date: data.date,
        content,
        bestSeller: data.bestSeller || false,
        highlights: data.highlights || [],
        itinerary: data.itinerary || [],
        included: data.included || [],
        excluded: data.excluded || [],
      } as TourData;
    });

  return allToursData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getTourBySlug(slug: string): TourData | null {
  try {
    const fullPath = path.join(toursDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      category: data.category,
      duration: data.duration,
      price: data.price,
      image: data.image,
      gallery: data.gallery || [],
      excerpt: data.excerpt,
      description: data.description || "",
      date: data.date,
      content,
      bestSeller: data.bestSeller || false,
      highlights: data.highlights || [],
      itinerary: data.itinerary || [],
      included: data.included || [],
      excluded: data.excluded || [],
    } as TourData;
  } catch (error) {
    return null;
  }
}

export function getToursByCategory(category: string): TourData[] {
  return getAllTours().filter(tour => tour.category === category);
}
