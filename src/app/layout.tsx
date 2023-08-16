import "leaflet/dist/leaflet.css";
import "./globals.css";
import thumbnail from "../../public/thumbnail.jpg";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTA V Pathfinding Visualizer",
  description: "Visualizes shortest path algorithms on the GTA V Map",
  openGraph: {
    images: thumbnail.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
