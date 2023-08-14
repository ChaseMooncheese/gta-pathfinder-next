"use client";

import { LatLng } from "leaflet";
import * as L from "leaflet";
import { Marker } from "react-leaflet";
import { useMemo, useRef, useEffect } from "react";
import startIcon from "../../public/cursor-purple.png";
import endIcon from "leaflet/dist/images/marker-icon-2x.png";

function getIcon(type: "start" | "end") {
  const iconUrl = type === "start" ? startIcon : endIcon;
  const iconSize: [number, number] = type === "start" ? [25, 25] : [25, 41];
  const icon = L.icon({
    iconUrl: iconUrl.src,
    iconSize: iconSize,
  });
  return icon;
}

export default function MovableMarker(props: {
  position: LatLng;
  setPosition: (p: LatLng) => void;
  type: "start" | "end";
}) {
  const markerRef = useRef<any>(null);
  const initialPosition = props.position;

  useEffect(() => {
    let p: LatLng;
    if (markerRef.current !== null) {
      p = markerRef.current.getLatLng();
    } else {
      p = initialPosition;
    }
    props.setPosition(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          props.setPosition(marker.getLatLng());
          // const p = marker.getLatLng();
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Marker
      draggable={true}
      // icon={getIcon(props.type)}
      position={initialPosition}
      ref={markerRef}
      eventHandlers={eventHandlers}
    />
  );
}
