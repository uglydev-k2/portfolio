/**
 * Experience and education timeline.
 * Replace these sample entries with your own freelance work, internships,
 * bootcamps, and certifications before you publish.
 */

export type ExperienceItem = {
  kind: string;
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    kind: "Freelance",
    role: "Frontend Developer",
    org: "Self-employed",
    location: "Remote",
    start: "2024",
    end: "Present",
    summary:
      "Design and build marketing sites and product interfaces for small teams. Most of the work is React or Next.js, with accessible UI and a Figma handoff.",
  },
  {
    kind: "Internship",
    role: "Frontend Engineering Intern",
    org: "Example Studio",
    location: "Accra, Ghana",
    start: "2023",
    end: "2023",
    summary:
      "Shipped interface fixes and a small component page alongside a senior developer. Learned code review, Git, and how a design spec becomes production CSS.",
  },
  {
    kind: "Bootcamp",
    role: "Frontend Development",
    org: "Example Bootcamp",
    location: "Online",
    start: "2023",
    end: "2023",
    summary:
      "Intensive practice in HTML, CSS, JavaScript, and React, with weekly projects and feedback from mentors and peers.",
  },
  {
    kind: "Certification",
    role: "Responsive Web Design",
    org: "Example Certification",
    location: "Online",
    start: "2022",
    end: "2022",
    summary: "Coursework in semantic HTML, layout, and accessible forms.",
  },
];
