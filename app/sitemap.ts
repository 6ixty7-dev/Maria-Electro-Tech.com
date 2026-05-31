import { MetadataRoute } from 'next';
import { MASTER_SERVICES, KOCHI_LOCALITIES } from '@/lib/constants';
import { MOCK_BLOGS } from './blog/page';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mariaelectrotech.com';

  // 1. Core Public Routes
  const coreRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }
  ];

  // 2. Master Services Profiles
  const serviceRoutes = Object.keys(MASTER_SERVICES).map(serviceKey => ({
    url: `${baseUrl}/services/${serviceKey}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  // 3. Blog Articles
  const blogRoutes = MOCK_BLOGS.map(blog => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  // 4. Dynamic Service-Locality SEO Combinations (Infinite Scaling)
  const seoRoutes: any[] = [];
  const services = Object.keys(MASTER_SERVICES);
  
  services.forEach(sKey => {
    KOCHI_LOCALITIES.forEach(loc => {
      seoRoutes.push({
        url: `${baseUrl}/${sKey}-${loc.key}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8
      });
    });
    // Add general Kochi and Ernakulam variations
    seoRoutes.push(
      { url: `${baseUrl}/${sKey}-kochi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
      { url: `${baseUrl}/${sKey}-ernakulam`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }
    );
  });

  return [...coreRoutes, ...serviceRoutes, ...blogRoutes, ...seoRoutes];
}
