import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// 2. Konfigurasi Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // --- PENTING: Fix Warning Metadata & SEO Image ---
  metadataBase: new URL("https://0x5zen.vercel.app"),
  // -----------------------------------------------

  title: "0x5zen",
  description:
    "Portfolio of 0x5zen - 3D Artist, NFT Creator, and Computer Science Student.",
  icons: {
    icon: "/icon.svg", // Pastikan file icon.svg ada di folder app/ atau public/
  },
  openGraph: {
    title: "0x5zen",
    description: "Check out my 3D Art and Coding Projects.",
    images: [
      {
        url: "/avatar.webp", // Next.js bakal otomatis gabungin ini sama URL di atas
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
