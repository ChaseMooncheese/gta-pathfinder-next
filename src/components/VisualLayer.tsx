"use client";

import { useState, useMemo, useEffect, useRef, useContext } from "react";
import { MapNode, Speed } from "../types/PathfindingVisualizerTypes";
import { Circle } from "react-leaflet";
import { LatLng } from "leaflet";
import ShortestPathLine from "./ShortestPathLine";
import { SpeedContext } from "../context/SpeedProvider";

export default function VisualLayer(props: {
  visitedNodes: MapNode[];
  shortestPathNodes: MapNode[];
}) {
  const [progress, setProgress] = useState(0);
  const speed = useContext(SpeedContext).currentSpeed;
  let nodesPerSecond = useNodesPerSecond(speed);

  const lastUpdateTime = useRef(performance.now());

  const gameLoop = () => {
    const currentTime = performance.now();
    const deltaT = currentTime - lastUpdateTime.current;
    lastUpdateTime.current = currentTime;

    const nodesToAdd = Math.round((deltaT / 1000) * nodesPerSecond.current);

    setProgress((oldProgress) => {
      if (oldProgress + nodesToAdd >= props.visitedNodes.length) {
        return props.visitedNodes.length;
      }
      return oldProgress + nodesToAdd;
    });
  };

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      gameLoop();
    }, 20);

    lastUpdateTime.current = performance.now();
    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [props.visitedNodes]);

  const doneAnimating = progress >= props.visitedNodes.length;
  return (
    <>
      <NodeLayer visitedNodes={props.visitedNodes} progress={progress} />
      {doneAnimating && <ShortestPathLine nodes={props.shortestPathNodes} />}
    </>
  );
}

//Layer of circular node markers. Only shown when map is zoomed in
function NodeLayer(props: { visitedNodes: MapNode[]; progress: number }) {
  const display = useMemo<Array<JSX.Element>>(() => [], [props.visitedNodes]); //reset display when algorithm is first run

  useEffect(() => {
    const numDisplayed = display.length;
    const progress =
      props.progress > props.visitedNodes.length
        ? props.visitedNodes.length
        : props.progress;

    //Add new nodes to the display
    for (let i = numDisplayed; i < progress; i++) {
      // display.push(getVisual(props.visitedNodes[i]));
      const c = getVisual(props.visitedNodes[i]);
      display.push(c);
      // c.addTo(map);
    }
  }, [props.progress]);

  return <>{display}</>;
}

//Utility function to map a node object to a Circle that can be displayed
function getVisual(node: MapNode) {
  const position = getLatLngFromCoords(node);
  return (
    <Circle
      center={position}
      key={position.toString()}
      radius={3}
      color={"red"}
      weight={1}
    ></Circle>
  );
}

function getLatLngFromCoords(node: MapNode) {
  const x = node.x;
  const y = node.y;
  return new LatLng(y + 4045, x + 5700); //add offsets to make nodes line up with the map
}

function useNodesPerSecond(speed: Speed) {
  const nodesPerSecond = useRef(1);
  if (speed === "Slow") {
    nodesPerSecond.current = 70;
  } else if (speed === "Normal") {
    nodesPerSecond.current = 300;
  } else if (speed === "Fast") {
    nodesPerSecond.current = 1100;
  }
  return nodesPerSecond;
}
