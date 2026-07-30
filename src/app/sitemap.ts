import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/interpreter", "/cube-surfer", "/fitness"];

  return routes.map((route) => ({
    url: `https://mahmoudhilani.com${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
