import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
