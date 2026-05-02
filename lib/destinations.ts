import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const destinationsDirectory = path.join(process.cwd(), 'content/destinations');

export interface DestinationData {
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  highlights: string[];
  content: string;
}

export function getAllDestinations(): DestinationData[] {
  if (!fs.existsSync(destinationsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(destinationsDirectory);
  const allDestinationsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(destinationsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        image: data.image,
        gallery: data.gallery || [],
        highlights: data.highlights || [],
        content,
      } as DestinationData;
    });

  return allDestinationsData;
}

export function getDestinationBySlug(slug: string): DestinationData | null {
  try {
    const fullPath = path.join(destinationsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      image: data.image,
      gallery: data.gallery || [],
      highlights: data.highlights || [],
      content,
    } as DestinationData;
  } catch (error) {
    return null;
  }
}
