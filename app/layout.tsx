import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { personJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#101315" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = JSON.stringify(personJsonLd()).replace(/</g, "\\u003c");

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hanken.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-[17px] leading-relaxed text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <MotionProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
