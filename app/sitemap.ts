import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://matchiq-ai.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://matchiq-ai.vercel.app/scan",
      lastModified: new Date(),
    },
    {
      url: "https://matchiq-ai.vercel.app/login",
      lastModified: new Date(),
    },
    {
      url: "https://matchiq-ai.vercel.app/signup",
      lastModified: new Date(),
    }
  ];
}