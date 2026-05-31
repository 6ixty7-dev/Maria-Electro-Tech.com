import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mariaelectrotech.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/dashboard',
        '/admin/unauthorized',
        '/_next/',
        '/api/'
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
