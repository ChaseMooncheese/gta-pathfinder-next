import PriorityQueue from "js-priority-queue";
import { MapNode } from "../types/PathfindingVisualizerTypes";

export class CustomPriorityQueue {
  priorities: Map<MapNode, number>;
  pq: PriorityQueue<MapNode>;

  constructor() {
    this.priorities = new Map<MapNode, number>();

    this.pq = new PriorityQueue({
      comparator: (a: MapNode, b: MapNode) => {
        const priorityA = this.priorities.get(a);
        const priorityB = this.priorities.get(b);

        if (priorityA === undefined || priorityB === undefined) {
          return 0;
        }

        return priorityA - priorityB;
      },
    });
  }

  add(node: MapNode, priority: number) {
    this.priorities.set(node, priority);
    this.pq.queue(node);
  }

  length() {
    return this.pq.length;
  }

  dequeue() {
    return this.pq.dequeue();
  }
}
