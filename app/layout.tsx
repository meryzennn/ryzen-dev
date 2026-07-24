import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { loadContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Load content for metadata
const content = loadContent();

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: {
    type: "website",
    title: content.seo.title,
    description: content.seo.description,
    images: content.seo.ogImage ? [content.seo.ogImage] : [],
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.title,
    description: content.seo.description,
    images: content.seo.ogImage ? [content.seo.ogImage] : [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
