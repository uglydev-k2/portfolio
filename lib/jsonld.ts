import { profile, skills } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export function personJsonLd() {
  const url = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.seoDescription,
    url,
    image: `${url}/portrait.png`,
    email: `mailto:${profile.email}`,
    telephone: `+${profile.phoneE164}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tema",
      addressRegion: "Greater Accra",
      addressCountry: "GH",
    },
    knowsAbout: skills.map((skill) => skill.name),
    sameAs: [profile.socials.github],
  };
}
