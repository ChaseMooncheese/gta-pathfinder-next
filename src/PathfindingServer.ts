import { LatLng } from "leaflet";
import NodeData from "../public/nodes.json";
import SafeNodeData from "../public/safe-nodes.json";
import {
  MapNode,
  MapEdge,
  MapData,
  Algorithm,
} from "./types/PathfindingVisualizerTypes";
import dijkstras from "./Pathfinding-Algorithms/Dijkstras";
import breadthFirstSearch from "./Pathfinding-Algorithms/BreadthFirstSearch";
import aStarSearch from "./Pathfinding-Algorithms/AStar";

export default class PathfindingServer {
  nodes: MapNode[];
  edges: MapEdge[];
  safeNodes: MapNode[];

  constructor() {
    //Read data
    // @ts-ignore
    const nodeData: MapData = NodeData; //Reads the json file
    const safeNodeIndexes = SafeNodeData;

    this.nodes = nodeData.Nodes; //This creates all the node objects. Each node has an empty "edges" property
    this.edges = nodeData.Edges; //Reads in all the edges
    this.safeNodes = [];

    //Initialize nodes with empty edges
    this.nodes.forEach((node) => {
      node.edges = [];
    });

    //Add edges to node objects
    this.edges.forEach((edge) => {
      const fromNode = this.nodes[edge.node1];
      const destinationNode = this.nodes[edge.node2];

      if (fromNode.edges == undefined) {
        fromNode.edges = [];
      }

      const weight = distance(
        fromNode.x,
        fromNode.y,
        destinationNode.x,
        destinationNode.y
      );

      fromNode.edges.push([destinationNode, weight]);
    });

    //create safe nodes
    safeNodeIndexes.forEach((idx) => {
      this.safeNodes.push(this.nodes[idx]);
    });
  }

  getClosestNodeToLatLng(loc: LatLng) {
    const [x, y] = convertLatLngToXY(loc);
    return this.getClosestNodeToCoords(x, y);
  }

  getClosestNodeToCoords(x: number, y: number) {
    let min = 1000;
    let closeNodes = [];
    let closestNode = null;

    //loop through all nodes and store closeish ones
    for (let i = 0; i < this.safeNodes.length; i++) {
      if (
        Math.abs(x - this.safeNodes[i].x) + Math.abs(y - this.safeNodes[i].y) <
        min
      ) {
        //if (x + y - (nodes[i].x + nodes[i].y) < min) {
        closeNodes.push(this.safeNodes[i]);
      }
    }

    //reset min
    min = Number.MAX_SAFE_INTEGER;
    //if empty return null saves time i think
    if (closeNodes.length === 0) {
      return null;
    } else {
      //loop through the closeish nodes and now use distance formula to find the closest
      for (let i = 0; i < closeNodes.length; i++) {
        if (distance(x, y, closeNodes[i].x, closeNodes[i].y) < min) {
          min = distance(x, y, closeNodes[i].x, closeNodes[i].y);
          closestNode = closeNodes[i];
        }
      }
    }

    return closestNode;
  }

  search(startLoc: LatLng, endLoc: LatLng, algorithm: Algorithm) {
    const startNode = this.getClosestNodeToLatLng(startLoc);
    const endNode = this.getClosestNodeToLatLng(endLoc);

    if (startNode == null || endNode == null) {
      return [[], []];
    }

    if (algorithm == "Dijkstra's") {
      return dijkstras(startNode, endNode);
    } else if (algorithm == "Breadth-First Search") {
      return breadthFirstSearch(startNode, endNode);
    } else if (algorithm == "A* Search") {
      return aStarSearch(startNode, endNode);
    } else {
      return [[], []];
    }
  }
}

//Utility Functions
function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function convertLatLngToXY(loc: LatLng) {
  const x = loc.lng - 5700;
  const y = loc.lat - 4045;
  return [x, y];
}
