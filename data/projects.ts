/**
 * Projects shown on the homepage.
 * Edit this list, then replace the matching image in public/projects/.
 * The homepage grid filters these by All, Web, and Design.
 * Swap example.com and yourusername for your real demo and repository links.
 */

export type ProjectCategory = "Web" | "Design";

export type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  /** Used by the project filter. */
  category: ProjectCategory;
  role: string;
  year: string;
  /** Short case-study note shown in the overlay. Replace with your own. */
  outcome: string;
};

export const projects: Project[] = [
  {
    title: "Harbor",
    description:
      "An operations dashboard for a small logistics team. Dispatchers can scan shipments, delays, and the day's routes without hunting through tables.",
    image: "/projects/harbor.png",
    imageAlt:
      "Placeholder screenshot of Harbor, a dark dashboard with a sidebar, two summary cards, and a wide chart.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/harbor",
    featured: true,
    category: "Web",
    role: "Interface design and frontend",
    year: "2025",
    outcome:
      "Dispatchers stopped paging through spreadsheets. The day's routes, delays, and shipments sit on one screen.",
  },
  {
    title: "Kente Market",
    description:
      "A storefront for an independent retailer, built so product browsing stays clear on a phone and usable with a keyboard.",
    image: "/projects/kente-market.png",
    imageAlt:
      "Placeholder screenshot of Kente Market, a storefront with a top bar and a grid of product tiles.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/kente-market",
    featured: true,
    category: "Design",
    role: "UI design and frontend",
    year: "2025",
    outcome:
      "Product browsing stays readable on a phone, and every control works from the keyboard.",
  },
  {
    title: "Tema Transit",
    description:
      "A schedule board for local bus routes, with large type, high contrast, and a layout that still makes sense on a small screen.",
    image: "/projects/tema-transit.png",
    imageAlt:
      "Placeholder screenshot of Tema Transit, a schedule board made of stacked route rows.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/tema-transit",
    category: "Web",
    role: "Frontend",
    year: "2024",
    outcome: "Route times stay legible in sunlight and on a small screen.",
  },
  {
    title: "Noteleaf",
    description:
      "A quiet markdown notes app. The editor stays out of the way, and notes stay readable in both light and dark themes.",
    image: "/projects/noteleaf.png",
    imageAlt:
      "Placeholder screenshot of Noteleaf, a notes app with a narrow sidebar and a large writing area.",
    tags: ["Next.js", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/noteleaf",
    category: "Web",
    role: "Product design and frontend",
    year: "2024",
    outcome: "Writing stays the focus. Light and dark themes share the same reading measure.",
  },
  {
    title: "Aperture",
    description:
      "A photography portfolio template with a restrained gallery, fast image loading, and room for long captions.",
    image: "/projects/aperture.png",
    imageAlt:
      "Placeholder screenshot of Aperture, a photography gallery laid out as a grid of image tiles.",
    tags: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/aperture",
    category: "Design",
    role: "Visual design and frontend",
    year: "2024",
    outcome: "Galleries load quickly and captions have room to breathe.",
  },
  {
    title: "Clinic Queue",
    description:
      "A waiting-room display for a neighborhood clinic. The current patient, the next few names, and a clock stay readable from across the room.",
    image: "/projects/clinic-queue.png",
    imageAlt:
      "Placeholder screenshot of Clinic Queue, a waiting-room board with three large status panels.",
    tags: ["React", "CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/clinic-queue",
    category: "Web",
    role: "Interface design",
    year: "2023",
    outcome: "The current patient and the next names can be read from across the room.",
  },
];
