import type { MetadataRoute } from "next";

const baseUrl = "https://esmiarchitecture.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/projects",
    "/projects/industrial",
    "/projects/office",
    "/projects/villa",
    "/projects/residential",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.7,
  }));
}
