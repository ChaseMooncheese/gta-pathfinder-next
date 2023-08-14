"use client";
//Provides consumers with an object containing currentAlgorithm and setCurrentAlgorithm

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Algorithm } from "../types/PathfindingVisualizerTypes";

interface AlgorithmContextProps {
  children: React.ReactNode;
}

interface iAlgorithmProvider {
  currentAlgorithm: Algorithm;
  setCurrentAlgorithm: Dispatch<SetStateAction<Algorithm>>;
}

export const AlgorithmContext = createContext<iAlgorithmProvider>({
  currentAlgorithm: "Dijkstra's",
  setCurrentAlgorithm: () => {},
});

export function AlgorithmProvider({ children }: AlgorithmContextProps) {
  const [currentAlgorithm, setCurrentAlgorithm] =
    useState<Algorithm>("Dijkstra's");

  return (
    <AlgorithmContext.Provider
      value={{ currentAlgorithm, setCurrentAlgorithm }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
}
