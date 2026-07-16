import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Spotlight from "@/components/Spotlight";
import Diary from "@/components/Diary";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import Toaster from "@/components/Toaster";
import { profile } from "@/data/resume";
import { site } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vintageSerif = Playfair_Display({
  variable: "--font-vintage-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: profile.name,
    images: ["/og.png"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Data Scientist & AI Engineer",
  email: `mailto:${profile.email}`,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressCountry: "Australia",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Computer Vision",
    "Deep Learning",
    "Data Analysis",
  ],
};

// Runs before paint to apply the saved theme and avoid a flash of the wrong palette.
const themeScript = `(function(){try{var t=localStorage.getItem('gp-theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${vintageSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          {/* Reveal-animated content stays visible without JS */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ScrollProgress />
        <Spotlight />
        {children}
        <CommandPalette />
        <BackToTop />
        <Diary />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
