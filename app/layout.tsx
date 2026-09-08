import "./globals.scss";

import HolographicWall from "@/components/ui/HolographicWall/HolographicWall";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reza Esmi Architecture",
  description:
    "Industrial Architecture, Office Design and Human Experience.",
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