import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
};

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
      <body className="min-h-full bg-background text-foreground">
        <Sidebar />
        <main className="lg:ml-[380px] px-6 sm:px-10 lg:pr-20 lg:pl-16">
          {children}
        </main>
      </body>
    </html>
  );
}
