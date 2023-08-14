import { MapNode } from "../types/PathfindingVisualizerTypes";

export default function breadthFirstSearch(
  startNode: MapNode,
  endNode: MapNode
) {
  const nodeToParent = new Map<MapNode, MapNode>(); //Basically a linked list to trace back the shortest path
  const visitedNodes = new Set<MapNode>();
  const visitedNodesInOrder: MapNode[] = [];
  const q: MapNode[] = [];
  let endNodeHasBeenFound = false;

  visitedNodes.add(startNode);
  visitedNodesInOrder.push(startNode);
  q.push(startNode);

  let numIters = 0;

  while (q.length !== 0 && !endNodeHasBeenFound && numIters < 300000) {
    //Visit node at front of queue
    numIters++;
    const currentNode = q[0];

    q.shift(); //Pops currentNode from queue
    const edges = currentNode.edges;
    if (edges === undefined) {
      continue;
    }

    //Add all adjacent nodes to queue if they havent been visited
    edges.every((edge) => {
      const neighbor = edge[0];

      if (!visitedNodes.has(neighbor)) {
        q.push(neighbor);
        visitedNodes.add(neighbor);
        visitedNodesInOrder.push(neighbor);
        nodeToParent.set(neighbor, currentNode); //keep track of parent to trace back
      }

      if (neighbor === endNode) {
        endNodeHasBeenFound = true;
        return false; //break
      }
      return true;
    });
  }

  //Trace back steps to get nodes visited in order
  let curr: MapNode = endNode;
  let parent = nodeToParent.get(curr);

  const nodesBackwards: MapNode[] = [];
  while (parent !== undefined) {
    nodesBackwards.push(curr);
    curr = parent;
    parent = nodeToParent.get(parent);
  }

  //Returns a pair. The first item is the shortest path in order, the 2nd is the order that all nodes were visited in
  return [nodesBackwards.reverse(), visitedNodesInOrder];
}
