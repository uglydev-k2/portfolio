import { HeroField } from "@/components/sections/HeroField";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function Hero() {
  const parts = profile.name.trim().split(/\s+/);
  const last = parts.length > 1 ? parts.pop() : null;

  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      <HeroField />
      <Container>
        <Reveal immediate>
          <p className="eyebrow">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
            {profile.availability}
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.25rem,8vw,7.25rem)] leading-[0.94] font-light tracking-[-0.052em] text-balance">
            {parts.join(" ")}
            {last ? (
              <>
                {" "}
                <b className="font-bold">{last}</b>
              </>
            ) : null}
          </h1>
          <p className="mt-6 max-w-[33ch] text-lg leading-snug text-muted sm:text-xl">{profile.heroLine}</p>
          <p className="mt-4 max-w-xl text-pretty text-muted">{profile.tagline}</p>
          <p className="mt-7 font-mono text-[13px] text-muted">{profile.locationLine}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
            <Button href={profile.cvPath} download variant="secondary">
              Download CV
            </Button>
          </div>
          <p className="scroll-cue">
            Scroll
            <i aria-hidden="true" />
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
