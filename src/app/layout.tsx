import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Interactive World",
  description:
    "An explorable portfolio where every project is a place you can discover and walk into. Move through the world to find my work.",
  keywords: ["portfolio", "product design", "UX design", "interactive"],
  openGraph: {
    title: "Portfolio — Interactive World",
    description: "An explorable portfolio. Use arrow keys to discover projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
