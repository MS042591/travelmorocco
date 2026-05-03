import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DestinationData } from './destinations-shared';

const destinationsDirectory = path.join(process.cwd(), 'content/destinations');

const BASE_PATH = '/travelmorocco';

function fixPath(p: string): string {
  if (!p) return p;
  if (p.startsWith('http')) return p;
  if (p.startsWith(BASE_PATH)) return p;
  return `${BASE_PATH}${p.startsWith('/') ? '' : '/'}${p}`;
}

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
    const data = matterResult.data;

    return {
      slug,
      title: data.title,
      image: fixPath(data.image),
      description: data.description,
      gallery: (data.gallery || []).map((img: string) => fixPath(img)),
      highlights: data.highlights || [],
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
    const data = matterResult.data;

    return {
      slug,
      title: data.title,
      image: fixPath(data.image),
      description: data.description,
      gallery: (data.gallery || []).map((img: string) => fixPath(img)),
      highlights: data.highlights || [],
      content: matterResult.content,
    };
  } catch (e) {
    return null;
  }
}
