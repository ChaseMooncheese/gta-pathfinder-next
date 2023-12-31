"use client";

import { LatLngBounds, CRS } from "leaflet";
import { ImageOverlay, MapContainer, MapContainerProps } from "react-leaflet";
// import mapImgURL from "../../public/GTAMap.png";
// import mapImgURL from "../../public/GTAMap.jpg";
import mapImgURL from "../../public/GTAMapSmall.jpg";
import VisualLayer from "./VisualLayer";
import { MapNode } from "../types/PathfindingVisualizerTypes";
import MovableMarker from "./MovableMarker";
import { StartEndNodeContext } from "../context/StartEndNodeProvider";
import { Suspense, useContext } from "react";

export default function Map(props: {
  visitedNodes: MapNode[];
  shortestPathNodes: MapNode[];
}) {
  const bottomLeft: [number, number] = [0, 0];
  const topRight: [number, number] = [12437, 12442];
  const bounds = new LatLngBounds(bottomLeft, topRight);

  const mapProperties: MapContainerProps = {
    center: [3000, 6000],
    bounds: bounds,
    zoom: -2,
    minZoom: -3,
    crs: CRS.Simple,
    preferCanvas: true,
    scrollWheelZoom: true,
    markerZoomAnimation: false,
  };

  return (
    <Suspense fallback={<p>loading map...</p>}>
      <MapContainer {...mapProperties}>
        <ImageOverlay url={mapImgURL.src} bounds={bounds} />
        <VisualLayer
          visitedNodes={props.visitedNodes}
          shortestPathNodes={props.shortestPathNodes}
        ></VisualLayer>

        <StartAndEndNodes />
      </MapContainer>
    </Suspense>
  );
}

//Displays markers for the start and end nodes
function StartAndEndNodes() {
  const { startPos, setStartPos, endPos, setEndPos } =
    useContext(StartEndNodeContext);

  const startNodeMarker = (
    <MovableMarker
      position={startPos}
      setPosition={setStartPos}
      type="start"
    ></MovableMarker>
  );
  const endNodeMarker = (
    <MovableMarker position={endPos} setPosition={setEndPos} type="end" />
  );

  return (
    <>
      {startNodeMarker}
      {endNodeMarker}
    </>
  );
}
