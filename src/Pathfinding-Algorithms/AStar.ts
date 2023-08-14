import { MapNode } from "../types/PathfindingVisualizerTypes";
import { CustomPriorityQueue } from "./CustomPriorityQueue";

export default function aStarSearch(startNode: MapNode, endNode: MapNode) {
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

    //Prevent adding duplicate nodes
    if (!processedNodes.has(currentNode)) {
      visitedNodesInOrder.push(currentNode);
    }
    processedNodes.add(currentNode);

    if (currentNode === endNode) {
      //Retrace shortest path
      console.log(distances.get(endNode));
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
      const heuristic = totalCostToReachNeighbor + distance(neighbor, endNode);

      //Update distance value & parent if cost to reach neighbor is lower than currently stored
      if (
        !distances.has(neighbor) ||
        totalCostToReachNeighbor < distances.get(neighbor)!
      ) {
        distances.set(neighbor, totalCostToReachNeighbor);
        nodeToParent.set(neighbor, currentNode);

        //add to priority queue
        pq.add(neighbor, heuristic);
      }
    });
  }
  return [[], visitedNodesInOrder];
}
//calculates the "manhatten distance" from a node to the end node
function distance(currNode: MapNode, endNode: MapNode) {
  //return Math.abs(currNode.x - endNode.x) + Math.abs(currNode.y - endNode.y);
  const xDiff = currNode.x - endNode.x;
  const yDiff = currNode.y - endNode.y;
  const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
  return distance;
}
