// import PriorityQueue from "js-priority-queue";
import { MapNode } from "../PathfindingVisualizerTypes";
import { CustomPriorityQueue } from "./CustomPriorityQueue";
//value for the chart, holds parent and distance from start
// type pairValue = {
//   first: MapNode;
//   second: number;
// };

// export default function aStarSearch(startNode: MapNode, endNode: MapNode) {
//   const visitedNodes = new Set<MapNode>(); //set to know what is already checked
//   const allVisited = []; //visited in order array
//   const searchChart = new Map<MapNode, pairValue>(); //unordered map with dijkstras esc chart
//   const priorities = new Map<MapNode, number>();
//   const shortestPath = Array<MapNode>(); //shortest path to return

//   const customComparator = (a: MapNode, b: MapNode) => {
//     const priorityA = priorities.get(a);
//     const priorityB = priorities.get(b);

//     if (priorityA === undefined || priorityB === undefined) {
//       return 0;
//     }

//     return priorityA - priorityB;
//   };

//   const pq = new PriorityQueue({
//     //min heap of nodes based on distances
//     comparator: customComparator,
//   });

//   const addToPriorityQueue = (node: MapNode, priority: number) => {
//     priorities.set(node, priority);
//     pq.queue(node);
//   };
//   //pq.queue(startNode); //place starting node in the pq
//   addToPriorityQueue(startNode, 0);
//   searchChart.set(startNode, { first: startNode, second: 0 }); //add in the chart with a weight of 0, its parent doesnt rlly matter
//   //as long as pq is not empty
//   while (pq.length > 0) {
//     let currNode = pq.dequeue(); //remove from pq and store it in the current node
//     allVisited.push(currNode); //put current node in the set to mark as visited already

//     //if endNode is reached and is at the top of the pq
//     if (currNode === endNode) {
//       //backtrack from the end node through all the parents in the chart and add the parents to the path array
//       while (currNode != startNode) {
//         shortestPath.push(currNode);
//         currNode = searchChart.get(currNode)!.first;
//       }
//       shortestPath.push(currNode);
//       //return the shortest path reversed and every node visited in order
//       return [shortestPath.reverse(), allVisited];
//     }
//     //skip if visited
//     if (visitedNodes.has(currNode)) {
//       continue;
//     }
//     //add to visited set
//     visitedNodes.add(currNode);
//     //skip if it doesnt have any edges
//     if (currNode.edges === undefined) {
//       continue;
//     }
//     //loop through edges

//     for (let i = 0; i < currNode.edges.length; i++) {
//       //the cost of the current edge is that edges weight + parent nodes weight + the manhattan distance from the edge node to the end
//       const edge = currNode.edges[i];
//       const totalCostToReachChild = searchChart.get(currNode)!.second + edge[1];
//       const heuristic = manhattanDistance(edge[0], endNode);
//       const estimatedCostOfPathThroughNode = totalCostToReachChild + heuristic;
//       //const weight = currNode.edges[i][1];
//       //if the neighbor is not yet in the chart (hasnt been checked yet) or if the current cost to it is less then the previous cost to it
//       if (
//         !searchChart.has(currNode.edges[i][0]) ||
//         totalCostToReachChild < searchChart.get(currNode.edges[i][0])!.second
//       ) {
//         //update it with the new cost and parent node and put it in pq
//         //searchChart.set(currNode.edges[i][0], {first: currNode, second: estimatedCostOfPathThroughNode});
//         searchChart.set(currNode.edges[i][0], {
//           first: currNode,
//           second: totalCostToReachChild,
//         });

//         //pq.queue(currNode.edges[i][0]);
//         addToPriorityQueue(
//           currNode.edges[i][0],
//           estimatedCostOfPathThroughNode
//         );
//       }
//     }
//   }
//   //if end node wasnt reached return the empty shortest path and all nodes visited in order
//   return [shortestPath, allVisited];
// }

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
