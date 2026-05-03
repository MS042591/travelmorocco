import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DestinationData } from './destinations-shared';

const destinationsDirectory = path.join(process.cwd(), 'content/destinations');

export function getAllDestinations(): DestinationData[] {
  if (!fs.existsSync(destinationsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(destinationsDirectory);
  const allDestinationsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(destinationsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { 
        title: string; 
        image: string; 
        description: string; 
        gallery: string[]; 
        highlights: string[] 
      }),
      content: matterResult.content,
    };
  });

  return allDestinationsData;
}

export function getDestinationBySlug(slug: string): DestinationData | null {
  try {
    const fullPath = path.join(destinationsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { 
        title: string; 
        image: string; 
        description: string; 
        gallery: string[]; 
        highlights: string[] 
      }),
      content: matterResult.content,
    };
  } catch (e) {
    return null;
  }
}
