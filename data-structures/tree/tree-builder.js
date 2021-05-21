import { Tree, TreeNode } from './tree.js'

let isBinary = true
let count = 0

const lighten = (node) => new Promise(resolve => {
  node.domNodes.node.classList.add('lighten')
  setTimeout(() => {
    node.domNodes.node.classList.remove('lighten')
    resolve()
  }, 500)
})

const toggleHidden = (domNode) => {
  domNode.classList.toggle('hidden')
}

const addChild = (parent) => {
  if (parent.children.size === 2) {
    return
  }

  const child = new TreeNode(parent)
  parent.children.add(child)

  const childDomNodes = getNodeDOMRepresentation(child)
  child.domNodes = childDomNodes
  parent.domNodes.children.insertBefore(childDomNodes.wrapper, parent.domNodes.mockedChild)

  if (isBinary && parent.children.size === 2) {
    const { addButton } = parent.domNodes

    toggleHidden(addButton)

    for (const child of parent.children) {
      child.domNodes && child.domNodes.addSiblingButton && toggleHidden(child.domNodes.addSiblingButton)
    }
  }
}

const addSibling = (node) => {
  addChild(node.parent)
}

const removeNode = (node) => {
  node.parent.children.delete(node)

  const { children, addButton, addSiblingButton } = node.parent.domNodes
  children.removeChild(node.domNodes.wrapper)

  if (isBinary) {
    toggleHidden(addButton)
    for (const child of node.parent.children) {
      child.domNodes && child.domNodes.addSiblingButton && toggleHidden(child.domNodes.addSiblingButton)
    }
  }
}

const getMockedChild = () => {
  const nodeWrapper = document.createElement('div');
  nodeWrapper.className = 'node-wrapper mock'

  const nodeContainer = document.createElement('div');
  nodeContainer.className = 'node-container';

  const nodeEl = document.createElement('div');
  nodeEl.className = 'node';

  nodeContainer.appendChild(nodeEl);
  nodeWrapper.appendChild(nodeContainer);

  return nodeWrapper
}

const getChildrenContainer = () => {
  const childrenContainer = document.createElement('div');
  childrenContainer.className = 'children-container'

  const mockedChild = getMockedChild()
  childrenContainer.appendChild(mockedChild)
  childrenContainer.mockedChild = mockedChild

  return childrenContainer
}

const getNodeDOMRepresentation = (node) => {
  const nodeWrapper = document.createElement('div');
  nodeWrapper.className = 'node-wrapper'

  const nodeContainer = document.createElement('div');
  nodeContainer.className = 'node-container';

  const nodeDiv = document.createElement('div');
  nodeDiv.className = 'node';
  nodeDiv.innerText = count
  node.id = count
  count++

  nodeContainer.appendChild(nodeDiv);
  nodeWrapper.appendChild(nodeContainer);

  const childrenContainer = getChildrenContainer()
  nodeWrapper.appendChild(childrenContainer);

  const addButton = document.createElement('button')
  addButton.className = 'add-button'
  addButton.innerText = '+'
  addButton.onclick = addChild.bind(null, node)
  addButton.onmouseenter = () => childrenContainer.classList.toggle('mock-visible')
  addButton.onmouseleave = () => childrenContainer.classList.toggle('mock-visible')
  nodeContainer.appendChild(addButton)

  const result = {
    wrapper: nodeWrapper,
    container: nodeContainer,
    node: nodeDiv,
    children: childrenContainer,
    mockedChild: childrenContainer.mockedChild,
    addButton,
  }

  if (node.parent) {
    const removeButton = document.createElement('button')
    removeButton.className = 'remove-button'
    removeButton.innerText = '-'
    removeButton.onclick = removeNode.bind(null, node)
    nodeContainer.appendChild(removeButton)

    const addSiblingButton = document.createElement('button')
    addSiblingButton.className = 'add-sibling-button'
    addSiblingButton.innerText = '+'
    addSiblingButton.onclick = addSibling.bind(null, node)
    nodeContainer.appendChild(addSiblingButton)
    result.addSiblingButton = addSiblingButton
  }

  return result
};

const rootNode = new TreeNode();
const tree = new Tree(rootNode);

const render = () => {
  const rootDomNodes = getNodeDOMRepresentation(tree.root);
  tree.root.domNodes = rootDomNodes

  const treeContainer = document.getElementById('tree-container')
  treeContainer.appendChild(rootDomNodes.wrapper);
}

render()

const traverseLeft = async function (node, traverse) {
  if ([...node.children][0]) {
    await traverse([...node.children][0])
  }
}
const traverseRight = async function (node, traverse) {
  if ([...node.children][1]) {
    await traverse([...node.children][1])
  }
}
const inOrderTraversal = async function (node) {
  // left
  await traverseLeft(node, inOrderTraversal)
  // root
  await lighten(node)
  // right
  await traverseRight(node, inOrderTraversal)
}
const preOrderTraversal = async function (node) {
  // root
  await lighten(node)
  // left
  await traverseLeft(node, preOrderTraversal)
  // right
  await traverseRight(node, preOrderTraversal)
}
const postOrderTraversal = async function (node) {
  // left
  await traverseLeft(node, postOrderTraversal)
  // right
  await traverseRight(node, postOrderTraversal)
  // root
  await lighten(node)

}

const inOrderBtn = document.getElementById('inorder-btn')
inOrderBtn.onclick = inOrderTraversal.bind(null, tree.root)
const preOrderBtn = document.getElementById('preorder-btn')
preOrderBtn.onclick = preOrderTraversal.bind(null, tree.root)
const postOrderBtn = document.getElementById('postorder-btn')
postOrderBtn.onclick = postOrderTraversal.bind(null, tree.root)
