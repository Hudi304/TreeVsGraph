export class Node {
  id: number | undefined;
  children: Node[];
  name: string | undefined;
  value: string | undefined;
  hash: number | undefined;

  constructor() {
    this.children = [];
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
