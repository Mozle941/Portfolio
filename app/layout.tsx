import type { Metadata } from "next";
import type { ReactNode } from "react";
import AssistantWidget from "@/components/AssistantWidget";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const title = "Moses (Mos_dev) | DevOps & Cloud Portfolio";
const description =
  "Explore Moses’s portfolio of software projects, technical skills, testimonials, and contact details, with a focus on DevOps and cloud engineering.";
const socialImage = "/opengraph-image.png";
const socialImageAlt =
  "Moses (Mos_dev) portfolio — student developer focused on DevOps and cloud engineering";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Mos_dev Portfolio",
  authors: [{ name: "Moses" }],
  keywords: [
    "Moses",
    "Mos_dev",
    "developer portfolio",
    "DevOps",
    "cloud engineering",
    "Python",
    "TypeScript",
    "Next.js",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mos_dev Portfolio",
    url: siteUrl,
    title,
    description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: socialImage, alt: socialImageAlt }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <AssistantWidget />
      </body>
    </html>
  );
}
