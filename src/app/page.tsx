import dynamic from "next/dynamic";

const PathfindingVisualizer = dynamic(
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
