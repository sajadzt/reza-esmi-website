import "./globals.scss";

import HolographicWall from "@/components/ui/HolographicWall/HolographicWall";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://esmiarchitecture.com"),

  title: {
    default: "Esmi Architecture | Industrial, Office & Residential Architecture",
    template: "%s | Esmi Architecture",
  },

  description:
    "Esmi Architecture is an architectural firm with over 20 years of experience in industrial, office, residential, and villa design, from concept and feasibility through construction documentation and construction support.",

  keywords: [
    "Esmi Architecture",
    "industrial architecture",
    "factory design",
    "office architecture",
    "residential architecture",
    "villa architecture",
    "architectural design",
  ],

  authors: [{ name: "Esmi Architecture" }],

  creator: "Esmi Architecture",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Esmi Architecture | Industrial, Office & Residential Architecture",
    description:
      "Architectural design services for industrial, office, residential, and villa projects.",
    url: "https://esmiarchitecture.com",
    siteName: "Esmi Architecture",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* GLOBAL BACKGROUND — ALWAYS BEHIND THE WEBSITE */}
        <HolographicWall />

        {/* EVERYTHING ELSE SITS ABOVE THE BACKGROUND */}
        <div className="site-content">
          <Navbar />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}