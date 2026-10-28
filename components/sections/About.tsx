import Image from "next/image";
import { TechIcon } from "@/components/icons/TechIcon";
import { Section } from "@/components/ui/Section";
import { profile, skills } from "@/data/profile";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · About"
      title={
        <>
          Interfaces with <b className="font-bold">care</b>
        </>
      }
    >
      <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="space-y-4">
          {profile.bio.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed sm:text-lg">
              {paragraph}
            </p>
          ))}
          <p className="font-mono text-xs tracking-wide text-muted sm:text-sm">{profile.locationLine}</p>
        </div>
        <figure className="overflow-hidden rounded-[18px] border border-border bg-card">
          <Image
            src="/portrait.png"
            alt="Abstract illustrated portrait used as a photo placeholder"
            width={800}
            height={1000}
            sizes="(min-width: 768px) 420px, 100vw"
            className="aspect-[4/5] h-auto w-full object-cover"
          />
        </figure>
      </div>
      <div className="mt-14 sm:mt-16">
        <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Tech I use</h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-3 py-2 font-mono text-[12.5px] text-foreground"
            >
              <TechIcon icon={skill.icon} />
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
