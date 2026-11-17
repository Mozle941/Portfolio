import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "Student developer building toward DevOps and cloud engineering.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Moses (Mos_dev) | Student developer",
  description,
  openGraph: {
    title: "Moses (Mos_dev) | Student developer",
    description,
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
