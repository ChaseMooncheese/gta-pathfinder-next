import "leaflet/dist/leaflet.css";
import "./globals.css";
import thumbnail from "../../public/thumbnail.jpg";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const title = "GTA V Pathfinding Visualizer";
const description = "Visualizes shortest path algorithms on the GTA V Map";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    images: thumbnail.src,
    title: title,
    description: description,
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
