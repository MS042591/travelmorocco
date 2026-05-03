import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TourData } from './tours-shared';

const toursDirectory = path.join(process.cwd(), 'content/tours');

function getRecursiveFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getRecursiveFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

export function getAllTours(): TourData[] {
  if (!fs.existsSync(toursDirectory)) {
    return [];
  }
  
  const allFiles = getRecursiveFiles(toursDirectory);
  const allToursData = allFiles
    .filter((file) => file.endsWith('.md'))
    .map((fullPath) => {
      const fileName = path.basename(fullPath);
      const slug = fileName.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Tour",
        category: data.category || "General",
        duration: data.duration || "Contact for duration",
        price: data.price || "Price on request",
        image: data.image || "/images/placeholder.webp",
        gallery: data.gallery || [],
        excerpt: data.excerpt || "Discover the magic of Morocco on this curated journey.",
        description: data.description || "",
        date: data.date || "2024-01-01",
        content,
        bestSeller: data.bestSeller || false,
        highlights: data.highlights || [],
        itinerary: data.itinerary || [],
        included: data.included || [],
        excluded: data.excluded || [],
        essentials: data.essentials || null,
        faqs: data.faqs || [],
        route: data.route || [],
      } as TourData;
    });

  return allToursData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getTourBySlug(slug: string): TourData | null {
  try {
    const allFiles = getRecursiveFiles(toursDirectory);
    const fullPath = allFiles.find(file => path.basename(file) === `${slug}.md`);
    
    if (!fullPath || !fs.existsSync(fullPath)) return null;
    
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
      essentials: data.essentials || null,
      faqs: data.faqs || [],
      route: data.route || [],
    } as TourData;
  } catch (error) {
    return null;
  }
}

export function getToursByCategory(category: string): TourData[] {
  return getAllTours().filter(tour => tour.category === category);
}

