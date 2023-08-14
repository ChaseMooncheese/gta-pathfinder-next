"use client";

import Map from "./Map";
import { Algorithm, MapNode } from "../types/PathfindingVisualizerTypes";
import { useState } from "react";
import PathfindingServer from "../PathfindingServer";
import { AlgorithmProvider } from "../context/AlgorithmProvider";
import { StartEndNodeProvider } from "../context/StartEndNodeProvider";
import { LatLng } from "leaflet";
import Navbar from "./Navbar";
import { SpeedProvider } from "../context/SpeedProvider";

const server = new PathfindingServer();

export default function PathfindingVisualizer() {
  const [visitedNodes, setVisitedNodes] = useState<MapNode[]>([]);
  const [shortedPathNodes, setShortestPathNodes] = useState<MapNode[]>([]);

  const visualizeFunction = (
    algorithm: Algorithm,
    startPos: LatLng,
    endPos: LatLng
  ) => {
    setVisitedNodes([]);
    setShortestPathNodes([]);
    const [shortest_path, visited_nodes] = server.search(
      startPos,
      endPos,
      algorithm
    );

    setTimeout(() => {
      setShortestPathNodes(shortest_path);
      setVisitedNodes(visited_nodes);
    }, 10);
  };

  return (
    <>
      <AlgorithmProvider>
        <SpeedProvider>
          <StartEndNodeProvider>
            <Navbar visualizeFunction={visualizeFunction}></Navbar>
            <Map
              visitedNodes={visitedNodes}
              shortestPathNodes={shortedPathNodes}
            ></Map>
          </StartEndNodeProvider>
        </SpeedProvider>
      </AlgorithmProvider>
    </>
  );
}
