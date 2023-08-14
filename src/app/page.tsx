import "leaflet/dist/leaflet.css";
// import PathfindingVisualizer from "@/components/PathfindingVisualizer";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";

export const PathfindingVisualizer = dynamic(
  () => import("../components/PathfindingVisualizer"),
  {
    ssr: false,
    loading: () => {
      return <div>loading map...</div>;
    },
  }
);

export default function Home() {
  return (
    <main>
      <PathfindingVisualizer />
    </main>
  );
}
