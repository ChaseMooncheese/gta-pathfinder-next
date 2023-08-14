"use client";
//Provides consumers with an object containing currentAlgorithm and setCurrentAlgorithm

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Speed } from "../types/PathfindingVisualizerTypes";

interface SpeedContextProps {
  children: React.ReactNode;
}

interface iSpeedProvider {
  currentSpeed: Speed;
  setCurrentSpeed: Dispatch<SetStateAction<Speed>>;
}

export const SpeedContext = createContext<iSpeedProvider>({
  currentSpeed: "Normal",
  setCurrentSpeed: () => {},
});

export function SpeedProvider({ children }: SpeedContextProps) {
  const [currentSpeed, setCurrentSpeed] = useState<Speed>("Normal");

  return (
    <SpeedContext.Provider value={{ currentSpeed, setCurrentSpeed }}>
      {children}
    </SpeedContext.Provider>
  );
}
