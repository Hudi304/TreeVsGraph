"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./model/node");
const GraphNode_1 = require("./model/GraphNode");
const databaseGraph_1 = require("./databaseGraph");
// * de terminat asta pentru treee
//! de transformat asta in graph din tree
let F = new node_1.Node();
let E = new node_1.Node();
E.value = "E";
E.hash = 0;
E.children = [];
let G = new node_1.Node();
G.value = "G";
G.hash = 0;
G.children = [];
let D = new node_1.Node();
D.value = "D";
D.hash = 0;
D.children = [F];
let C = new node_1.Node();
C.value = "C";
C.hash = 0;
C.children = [D, E];
let B = new node_1.Node();
B.value = "B";
B.hash = 0;
B.children = [D, F];
F.value = "F";
F.hash = 0;
F.children = [B];
let A = new node_1.Node();
A.hash = 0;
A.value = "A";
A.children = [B, C, D, G];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function treePassing(root, hash) {
    var _a;
    if (root.hash != hash) {
        root.hash = hash;
        console.log(root.name);
        (_a = root.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
            treePassing(child, hash);
        });
    }
}
//? am folosit un hashmap cu cheia Id-ul nodului
//? si valuarea referint la Node
//? timpul de accesare este O(c) in loc de O(n)
let nodesTreeMap = new Map([]);
function initTreeNodes() {
    databaseGraph_1.text.nodes.forEach((node) => {
        let newNode = new node_1.Node();
        newNode.name = node.name;
        newNode.id = node.id;
        newNode.value = node.value;
        newNode.children = [];
        nodesTreeMap.set(newNode.id, newNode);
    });
}
function initTreeEdges() {
    databaseGraph_1.text.edges.forEach((edge) => {
        var _a, _b;
        let parent = nodesTreeMap.get(edge.from);
        let child = nodesTreeMap.get(edge.to);
        if (parent instanceof node_1.Node && child instanceof node_1.Node) {
            if (parent.children.length > 0) {
                (_a = parent.children) === null || _a === void 0 ? void 0 : _a.push(child);
            }
            else {
                parent.children = [];
                (_b = parent.children) === null || _b === void 0 ? void 0 : _b.push(child);
            }
        }
    });
}
function buildAndPassTree() {
    initTreeNodes();
    initTreeEdges();
    let newHash = getRandomInt(10000);
    let root = nodesTreeMap.get(1);
    if (root instanceof node_1.Node) {
        treePassing(root, newHash);
    }
}
let nodesGraphMap = new Map([]);
function initGraphNodes() {
    databaseGraph_1.text.nodes.forEach((node) => {
        let newNode = new GraphNode_1.GraphNode();
        newNode.name = node.name;
        newNode.id = node.id;
        newNode.value = node.value;
        newNode.children = [];
        newNode.parents = [];
        nodesGraphMap.set(newNode.id, newNode);
    });
}
function initGraphEdges() {
    databaseGraph_1.text.edges.forEach((edge) => {
        var _a, _b;
        let parent = nodesGraphMap.get(edge.from);
        let child = nodesGraphMap.get(edge.to);
        if (parent instanceof GraphNode_1.GraphNode && child instanceof GraphNode_1.GraphNode) {
            if (parent.children.length > 0) {
                (_a = parent.children) === null || _a === void 0 ? void 0 : _a.push(child);
            }
            else {
                parent.children = [];
                (_b = parent.children) === null || _b === void 0 ? void 0 : _b.push(child);
            }
            if (parent.children.length > 0) {
                child.parents.push(parent);
            }
            else {
                child.parents = [];
                child.parents.push(parent);
            }
        }
    });
}
function graphPassing(root, hash) {
    if (root.hash != hash) {
        root.hash = hash;
        console.log(root.name);
        let neighbours = root.children.concat(root.parents);
        neighbours === null || neighbours === void 0 ? void 0 : neighbours.forEach((child) => {
            graphPassing(child, hash);
        });
    }
}
function buildAndPassGraph() {
    initGraphNodes();
    initGraphEdges();
    let newHash = getRandomInt(10000);
    let rootA = nodesGraphMap.get(1);
    let rootB = nodesGraphMap.get(7);
    if (rootA instanceof GraphNode_1.GraphNode) {
        graphPassing(rootA, newHash);
    }
    console.log("----------------------");
    newHash = getRandomInt(10000);
    if (rootB instanceof GraphNode_1.GraphNode) {
        graphPassing(rootB, newHash);
    }
    //console.log(nodesGraphMap)
    //console.log(nodesGraphMap.get(1))
}
function appLogic() {
    //buildAndPassTree()
    buildAndPassGraph();
}
appLogic();
//# sourceMappingURL=treeVsGraph.js.map