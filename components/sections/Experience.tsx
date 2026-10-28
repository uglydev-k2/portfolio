import { Section } from "@/components/ui/Section";
import { experience } from "@/data/experience";
import { cn } from "@/lib/cn";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 · Experience"
      title={
        <>
          Work, study, and <b className="font-bold">credentials</b>
        </>
      }
      intro="Freelance work, an internship, a bootcamp, and a certification."
    >
      <ol className="m-0 list-none border-t border-border p-0">
        {experience.map((item) => (
          <li
            key={`${item.kind}-${item.role}`}
            className="grid gap-2 border-b border-border py-7 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
          >
            <p className="font-mono text-[13px] text-dim">
              {item.start} – {item.end}
            </p>
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.015em]">{item.role}</h3>
              <p className="mt-1.5 font-mono text-[12.5px] text-accent">
                {item.org} · {item.location}
              </p>
              <p className="mt-2.5 max-w-[64ch] text-muted">{item.summary}</p>
            </div>
            <p className={cn("font-mono text-xs", item.end === "Present" ? "text-ok" : "text-muted")}>{item.kind}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
