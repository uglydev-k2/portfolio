import { SocialIcon } from "@/components/icons/SocialIcon";
import { Container } from "@/components/ui/Container";
import { profile, socialLinks } from "@/data/profile";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await copyrightYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span>
            © {year} {profile.name}
          </span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <a
            href={profile.cvPath}
            download
            data-cursor="pointer"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Download CV
          </a>
        </p>
        <ul className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-label={link.external ? `${link.label} (opens in new tab)` : link.label}
                data-cursor="pointer"
                className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-foreground hover:bg-hover"
                {...(link.external ? { target: "_blank", rel: "noreferrer me" } : {})}
              >
                <SocialIcon name={link.icon} />
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-muted">Built with Next.js & Tailwind</p>
      </Container>
    </footer>
  );
}
