export type MapNode = {
  x: number;
  y: number;
  z: number;
  edges: Array<[MapNode, number]>; //The number is the weight of the edge
};

export type MapEdge = {
  //Just used for data parsing
  node1: number;
  node2: number;
};

export type MapData = {
  //Just used for data parsing
  Nodes: MapNode[];
  Edges: MapEdge[];
};

export const AlgorithmOptions = [
  "Dijkstra's",
  "Breadth-First Search",
  "A* Search",
] as const;
export type Algorithm = (typeof AlgorithmOptions)[number];
// export type Algorithm = "Dijkstra's" | "Breadth-First Search" | "A* Search";

export const SpeedOptions = ["Slow", "Normal", "Fast"] as const;
export type Speed = (typeof SpeedOptions)[number];
