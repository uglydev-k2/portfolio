import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Section } from "@/components/ui/Section";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="02 · Projects"
      title={
        <>
          A few things I&apos;ve <b className="font-bold">shipped</b>
        </>
      }
      intro="Filter the work, then open a card for the case study."
    >
      <ProjectGrid />
    </Section>
  );
}
