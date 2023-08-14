"use client";
//Provides consumers with an object containing currentAlgorithm and setCurrentAlgorithm

import { LatLng } from "leaflet";
import { Dispatch, SetStateAction, createContext, useState } from "react";

// const initialStartPos = new LatLng(2000, 6000);
const initialStartPos = new LatLng(2690, 5790);

const initialEndPos = new LatLng(3000, 5000);

interface StartEndNodeContextProps {
  children: React.ReactNode;
}

interface iStartEndNodeContext {
  startPos: LatLng;
  setStartPos: Dispatch<SetStateAction<LatLng>>;
  endPos: LatLng;
  setEndPos: Dispatch<SetStateAction<LatLng>>;
}

export const StartEndNodeContext = createContext<iStartEndNodeContext>({
  startPos: initialStartPos,
  setStartPos: () => {},
  endPos: initialEndPos,
  setEndPos: () => {},
});

export function StartEndNodeProvider(props: StartEndNodeContextProps) {
  const [startPos, setStartPos] = useState(initialStartPos);
  const [endPos, setEndPos] = useState(initialEndPos);

  return (
    <StartEndNodeContext.Provider
      value={{ startPos, setStartPos, endPos, setEndPos }}
    >
      {props.children}
    </StartEndNodeContext.Provider>
  );
}
