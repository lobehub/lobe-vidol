import { MetadataRoute } from 'next';

import { getCanonicalUrl } from '@/server/utils/url';

const robots = (): MetadataRoute.Robots => {
  return {
    host: getCanonicalUrl(),
    rules: [
      {
        userAgent: ['Googlebot', 'Applebot', 'Bingbot'],
        allow: ['/discover/*'],
        disallow: ['/'],
      },
      {
        allow: ['/discover/*'],
        disallow: [],
        userAgent: ['Facebot', 'facebookexternalhit'],
      },
      {
        allow: ['/discover/*'],
        disallow: [],
        userAgent: 'LinkedInBot',
      },
      {
        allow: ['/discover/*'],
        disallow: [],
        userAgent: 'Twitterbot',
      },
      {
        allow: ['/'],
        disallow: ['/api/*'],
        userAgent: '*',
      },
    ],
    sitemap: [getCanonicalUrl('/sitemap.xml')],
  };
};

export default robots;
