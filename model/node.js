"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor() {
        this.children = [];
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
exports.Node = Node;
//# sourceMappingURL=node.js.map