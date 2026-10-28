/**
 * Personal details.
 * Edit this file to change your name, bio, skills, and contact links.
 * The rest of the site reads from here.
 */

export const profile = {
  name: "Daniel Bassaw",
  role: "Frontend Developer",
  heroLine: "Frontend Developer based in Tema, Ghana",
  tagline: "I build fast, accessible, polished interfaces.",
  locationLine: "Tema, Greater Accra, Ghana · GMT · Open to remote work worldwide",
  availability: "Available for work",
  seoDescription:
    "Frontend developer in Tema, Ghana. I build fast, accessible, polished interfaces with React and Next.js, and I am open to remote work worldwide.",
  bio: [
    "I build interfaces that are fast to load, accessible to use, and polished in the details people actually notice.",
    "I care about semantic HTML, clear visual hierarchy, and shipping work that feels calm on a phone as well as a large screen.",
    "I am looking for a frontend role, remote or based in Ghana, where I can contribute to a product team and keep learning in public.",
  ],
  /** Public email. Used for the mailto link and the form error fallback. */
  email: "danielbassaw590@gmail.com",
  /**
   * WhatsApp number, digits only, country code included.
   * Ghana numbers start with 233. Example: 233201234567
   */
  phoneE164: "233599980960",
  socials: {
    github: "https://github.com/uglydev-k2",
  },
  /**
   * Formspree form id: the part after /f/ in https://formspree.io/f/your_form_id.
   * NEXT_PUBLIC_FORMSPREE_ID in .env.local overrides this value.
   */
  formspreeId: "your_form_id",
  /** Drop your PDF at public/cv.pdf. This path is the public URL. */
  cvPath: "/cv.pdf",
} as const;

/** Add or remove skills here. `icon` must match a case in components/icons/TechIcon.tsx. */
export const skills = [
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Git/GitHub", icon: "git" },
  { name: "Figma", icon: "figma" },
] as const;

export type SkillIcon = (typeof skills)[number]["icon"];

export const socialLinks = [
  {
    label: "GitHub",
    href: profile.socials.github,
    icon: "github",
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "email",
    external: false,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${profile.phoneE164}`,
    icon: "whatsapp",
    external: true,
  },
] as const;

export type SocialIconName = (typeof socialLinks)[number]["icon"];
