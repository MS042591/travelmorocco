import { MetadataRoute } from 'next';
import { getAllTours } from '@/lib/tours';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travelmorocco.co';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/destinations',
    '/tours',
    '/why-choose-us',
    '/concierge',
    '/faq',
    '/gallery',
    '/traveler-essentials',
    '/testimonials',
    '/sustainability',
    '/map',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic tour routes
  const tours = getAllTours();
  const tourRoutes = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(tour.date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
