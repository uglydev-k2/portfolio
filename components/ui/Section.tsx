import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={`${id}-heading`}
            className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] font-light tracking-[-0.048em] text-balance"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-6 max-w-[52ch] text-pretty text-lg text-muted">{intro}</p>
          ) : null}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  );
}
