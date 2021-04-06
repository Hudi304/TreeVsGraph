export class GraphNode {
  id: number | undefined;
  children: GraphNode[];
  parents: GraphNode[];
  name: string | undefined;
  value: string | undefined;
  hash: number | undefined;

  constructor() {
    this.children = [];
    this.parents = [];
  }

  getHash(): number | undefined {
    if (this.hash!) {
      return this.hash;
    } else return undefined;
  }

  setHash(hash: number) {
    this.hash = hash;
  }
}
