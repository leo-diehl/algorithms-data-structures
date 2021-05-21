const checkIsValidNode = (node) => node instanceof TreeNode;

export function Tree(root) {
  if (!checkIsValidNode(root)) {
    throw new Error('The root must be a TreeNode.');
  }
  this.root = root;
}

export function TreeNode(parent = null) {
  this.data = null;
  this.parent = parent
  this.children = new Set();

  this.addChild = function (child) {
    if (!checkIsValidNode(child)) {
      throw new Error('The child must be a TreeNode.');
    }
    this.children.add(child);
  };

  this.removeChild = function (child) {
    if (!checkIsValidNode(child)) {
      throw new Error('The child must be a TreeNode.');
    }
    this.children.remove(child);
  };
}
