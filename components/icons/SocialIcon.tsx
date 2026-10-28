import type { SocialIconName } from "@/data/profile";

export function SocialIcon({ name }: { name: SocialIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "github" ? <GitHub /> : null}
      {name === "linkedin" ? <LinkedIn /> : null}
      {name === "x" ? <XIcon /> : null}
      {name === "email" ? <Email /> : null}
      {name === "whatsapp" ? <WhatsApp /> : null}
    </svg>
  );
}

function GitHub() {
  return (
    <path d="M9 19c-4 1.2-4-2.2-5.5-2.6M15 21v-3.2a2.6 2.6 0 0 0-.7-2c2.4-.3 4.9-1.2 4.9-5.3a4.1 4.1 0 0 0-1.1-2.8 3.8 3.8 0 0 0-.1-2.8s-.9-.3-3 1.1a10 10 0 0 0-5.4 0c-2.1-1.4-3-1.1-3-1.1a3.8 3.8 0 0 0-.1 2.8 4.1 4.1 0 0 0-1.1 2.8c0 4.1 2.5 5 4.9 5.3a2.6 2.6 0 0 0-.7 2V21" />
  );
}

function LinkedIn() {
  return (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8h.01M12 16v-3a2 2 0 1 1 4 0v3" />
    </>
  );
}

function XIcon() {
  return <path d="M6 6l12 12M18 6 6 18" />;
}

function Email() {
  return (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  );
}

function WhatsApp() {
  return (
    <>
      <path d="M6.2 17.2 5 20.2l3.1-1A7.8 7.8 0 1 0 6.2 17.2z" />
      <path d="M9.2 10.2c.3 2 2 3.4 3.8 3.6" />
    </>
  );
}
