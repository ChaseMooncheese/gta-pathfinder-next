import Image from "next/image";
import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";
import PathfindingVisualizer from "@/components/PathfindingVisualizer";

export default function Home() {
  return (
    <main>
      <PathfindingVisualizer />
    </main>
  );
}
