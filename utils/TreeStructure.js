import { vec } from "@shopify/react-native-skia";
// a module for tree data structure

// a node in the tree
class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

// a tree data structure
class TreeStructure {
  constructor(root = null) {
    this.root = root;
  }

  // add a node to the tree
  add(data, toNode) {
    const node = new Node(data);
    const parent = toNode ? this.findBFS(toNode) : null;
    if (parent) {
      parent.children.push(node);
    } else {
      if (!this.root) {
        this.root = node;
      } else {
        return "Root node is already assigned";
      }
    }
  }

  findBFS(data) {
    const queue = [this.root];
    let _node = null;

    this.traverseBFS((node) => {
      if (node.data === data) {
        _node = node;
      }
    });

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];
    if (cb) {
      while (queue.length) {
        const node = queue.shift();
        cb(node);
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
    }
  }

  getAllNodes() {
    const nodes = [];
    this.traverseBFS((node) => nodes.push(node));
    return nodes;
  }

  getLeafNodes() {
    const leafNodes = [];
    this.traverseBFS((node) => {
      if (!node.children.length) {
        leafNodes.push(node);
      }
    });
    return leafNodes;
  }
}

// export the module
export { TreeStructure, Node }