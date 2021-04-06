import { Node } from "./model/node";
import { GraphNode } from "./model/GraphNode";
import { DBNode } from "./model/dbNode";
import { text } from "./databaseGraph";

// * de terminat asta pentru treee

//! de transformat asta in graph din tree

let F: Node = new Node();

let E: Node = new Node();
E.value = "E";
E.hash = 0;
E.children = [];

let G: Node = new Node();
G.value = "G";
G.hash = 0;
G.children = [];

let D: Node = new Node();
D.value = "D";
D.hash = 0;
D.children = [F];

let C: Node = new Node();
C.value = "C";
C.hash = 0;
C.children = [D, E];

let B: Node = new Node();
B.value = "B";
B.hash = 0;
B.children = [D, F];

F.value = "F";
F.hash = 0;
F.children = [B];

let A: Node = new Node();
A.hash = 0;
A.value = "A";
A.children = [B, C, D, G];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function treePassing(root: Node, hash: number) {
  if (root.hash != hash) {
    root.hash = hash;
    console.log(root.name);
    root.children?.forEach((child) => {
      treePassing(child, hash);
    });
  }
}

//? am folosit un hashmap cu cheia Id-ul nodului
//? si valuarea referint la Node
//? timpul de accesare este O(c) in loc de O(n)
let nodesTreeMap = new Map([]);

function initTreeNodes() {
  text.nodes.forEach((node) => {
    let newNode = new Node();
    newNode.name = node.name;
    newNode.id = node.id;
    newNode.value = node.value;
    newNode.children = [];
    nodesTreeMap.set(newNode.id, newNode);
  });
}

function initTreeEdges() {
  text.edges.forEach((edge) => {
    let parent = nodesTreeMap.get(edge.from);
    let child = nodesTreeMap.get(edge.to);
    if (parent instanceof Node && child instanceof Node) {
      if (parent.children.length > 0) {
        parent.children?.push(child);
      } else {
        parent.children = [];
        parent.children?.push(child);
      }
    }
  });
}

function buildAndPassTree() {
  initTreeNodes();
  initTreeEdges();
  let newHash = getRandomInt(10000);
  let root = nodesTreeMap.get(1);
  if (root instanceof Node) {
    treePassing(root, newHash);
  }
}

let nodesGraphMap = new Map([]);

function initGraphNodes() {
  text.nodes.forEach((node) => {
    let newNode = new GraphNode();
    newNode.name = node.name;
    newNode.id = node.id;
    newNode.value = node.value;
    newNode.children = [];
    newNode.parents = [];
    nodesGraphMap.set(newNode.id, newNode);
  });
}

function initGraphEdges() {
  text.edges.forEach((edge) => {
    let parent = nodesGraphMap.get(edge.from);
    let child = nodesGraphMap.get(edge.to);
    if (parent instanceof GraphNode && child instanceof GraphNode) {
      if (parent.children.length > 0) {
        parent.children?.push(child);
      } else {
        parent.children = [];
        parent.children?.push(child);
      }
      if (parent.children.length > 0) {
        child.parents.push(parent);
      } else {
        child.parents = [];
        child.parents.push(parent);
      }
    }
  });
}

function graphPassing(root: GraphNode, hash: number) {
  if (root.hash != hash) {
    root.hash = hash;
    console.log(root.name);
    let neighbours = root.children.concat(root.parents);
    neighbours?.forEach((child) => {
        graphPassing(child, hash);
    });
  }
}

function buildAndPassGraph() {
  initGraphNodes();
  initGraphEdges();
    let newHash = getRandomInt(10000);
    let rootA = nodesGraphMap.get(1)
    let rootB = nodesGraphMap.get(7)
    
    if (rootA instanceof GraphNode) {
        graphPassing(rootA, newHash);
    }
    console.log("----------------------")
    newHash = getRandomInt(10000);
    if (rootB instanceof GraphNode) {
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
