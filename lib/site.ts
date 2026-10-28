import type { Metadata } from "next";
import { profile } from "@/data/profile";

const FALLBACK_URL = "http://localhost:3000";

/** Origin used for canonical, Open Graph, sitemap, and JSON-LD. */
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return FALLBACK_URL;
  try {
    return new URL(value).origin;
  } catch {
    return FALLBACK_URL;
  }
}

export const navItems = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export function createMetadata(): Metadata {
  const url = siteUrl();
  const title = `${profile.name} — Frontend Developer`;

  return {
    metadataBase: new URL(url),
    title,
    description: profile.seoDescription,
    applicationName: profile.name,
    authors: [{ name: profile.name, url }],
    creator: profile.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_GH",
      url,
      title,
      description: profile.seoDescription,
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.seoDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
