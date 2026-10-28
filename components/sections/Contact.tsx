import { SocialIcon } from "@/components/icons/SocialIcon";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { profile, socialLinks } from "@/data/profile";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="04 · Contact"
      title={
        <>
          Let&apos;s <b className="font-bold">talk</b>
        </>
      }
      intro="Tell me about a role or a project. I usually reply within a couple of days."
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <ul className="flex flex-col gap-2" aria-label="Social and contact links">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-cursor="pointer"
                  className="inline-flex min-h-11 items-center gap-3 rounded-lg px-2 text-sm font-medium hover:bg-hover"
                  {...(link.external ? { target: "_blank", rel: "noreferrer me" } : {})}
                >
                  <SocialIcon name={link.icon} />
                  <span>{link.label}</span>
                  {link.external ? <span className="sr-only"> (opens in new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href={profile.cvPath} download variant="secondary">
              Download CV
            </Button>
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
