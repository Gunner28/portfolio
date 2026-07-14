import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Spotlight from "@/components/Spotlight";
import Diary from "@/components/Diary";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import Toaster from "@/components/Toaster";
import { profile } from "@/data/resume";

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

const siteUrl = "https://portfolio-kappa-teal-68.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gagan Purushotham — Data Scientist & AI Engineer",
  description:
    "Portfolio of Gagan Purushotham — data science, machine learning, and computer vision projects. Based in Melbourne, Australia.",
  openGraph: {
    title: "Gagan Purushotham — Data Scientist & AI Engineer",
    description:
      "Portfolio of Gagan Purushotham — data science, machine learning, and computer vision projects.",
    url: siteUrl,
    siteName: "Gagan Purushotham",
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
  url: siteUrl,
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
        <div className="lg:mx-auto lg:flex lg:max-w-6xl lg:justify-between lg:gap-12 lg:px-12 xl:px-16">
          <Sidebar />
          <main className="relative z-10 px-6 sm:px-10 lg:px-0 lg:w-[54%]">
            {children}
          </main>
        </div>
        <CommandPalette />
        <BackToTop />
        <Diary />
        <Toaster />
      </body>
    </html>
  );
}
