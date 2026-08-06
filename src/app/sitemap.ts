import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bnytechnologies.com';

  const routes = ['', '/services', '/portfolio', '/about', '/careers', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  try {
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api/v1/portfolio");
    if (res.ok) {
      const projects = await res.json();
      const projectRoutes = projects.map((project: { id: string, title: string }) => ({
        url: `${baseUrl}/portfolio/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
      return [...routes, ...projectRoutes];
    }
  } catch (_e) {
    console.error("Could not fetch portfolio for sitemap");
  }

  return routes;
}
