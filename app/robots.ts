import type { MetadataRoute } from "next";
import { seo } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", seo.canonicalUrl).toString(),
    host: seo.canonicalUrl,
  };
}
