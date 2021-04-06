"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphNode = void 0;
class GraphNode {
    constructor() {
        this.children = [];
        this.parents = [];
    }
    getHash() {
        if (this.hash) {
            return this.hash;
        }
        else
            return undefined;
    }
    setHash(hash) {
        this.hash = hash;
    }
}
exports.GraphNode = GraphNode;
//# sourceMappingURL=GraphNode.js.map