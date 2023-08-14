import { CustomPriorityQueue } from "./CustomPriorityQueue";
import { MapNode } from "../types/PathfindingVisualizerTypes";

export default function dijkstras(startNode: MapNode, endNode: MapNode) {
  const visitedNodesInOrder: MapNode[] = [];
  const nodeToParent = new Map<MapNode, MapNode>();
  const processedNodes = new Set<MapNode>();
  const distances = new Map<MapNode, number>();
  const pq = new CustomPriorityQueue();

  if (startNode != undefined) {
    pq.add(startNode, 0);
    distances.set(startNode, 0);
  }

  while (pq.length() !== 0) {
    const currentNode = pq.dequeue();

    if (processedNodes.has(currentNode)) {
      //Skip, we have already checked this node
      continue;
    }
    visitedNodesInOrder.push(currentNode);
    processedNodes.add(currentNode);

    if (currentNode === endNode) {
      console.log(distances.get(endNode));
      //Retrace shortest path
      const shortestPathNodes: MapNode[] = [];
      let curr: MapNode | undefined =
        visitedNodesInOrder[visitedNodesInOrder.length - 1];
      while (curr !== startNode && curr !== undefined) {
        shortestPathNodes.push(curr);
        curr = nodeToParent.get(curr);
      }
      shortestPathNodes.push(startNode);
      return [shortestPathNodes.reverse(), visitedNodesInOrder];
    }

    //Add all neighbors of currentNode to pq with estimated priority
    currentNode.edges.forEach((edge) => {
      const neighbor = edge[0];
      const edgeWeight = edge[1];
      const totalCostToReachNeighbor = distances.get(currentNode)! + edgeWeight;

      //Update distance value if cost to reach neighbor is lower than currently stored
      if (
        !distances.has(neighbor) ||
        totalCostToReachNeighbor < distances.get(neighbor)!
      ) {
        distances.set(neighbor, totalCostToReachNeighbor);
        nodeToParent.set(neighbor, currentNode);

        //add to priority queue
        pq.add(neighbor, totalCostToReachNeighbor);
      }
    });
  }
  return [[], visitedNodesInOrder];
}
