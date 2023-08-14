"use client";

import { LatLng } from "leaflet";
import { MapNode } from "../types/PathfindingVisualizerTypes";
import { Polyline } from "react-leaflet";

const lineOptions = {
  color: "purple",
  weight: 10,
};

export default function ShortestPathLine(props: { nodes: MapNode[] }) {
  const positions = props.nodes.map((node) => {
    const pos = getLatLngFromCoords(node);
    return pos;
  });

  return <Polyline positions={positions} pathOptions={lineOptions} />;
}

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}
