import React from "react";

import ReactDom from "react-dom";

import { _ } from "underscore";

class Pedigree extends React.Component {

  render() {
    return (
      <div className="pedigree">
        <FamilyTree
          selfNode={this.props.selfNode}
        />
      </div>
    );
  }
}
Pedigree.propTypes = {
  selfNode: React.PropTypes.object.isRequired,
};

class FamilyTree extends React.Component {

  render() {
    return (
      <div className="tree">
        <h2>Pedigree</h2>
        <div className="subtree-container">
          <Subtree node={this.props.selfNode}/>
        </div>
      </div>
    );
  }
}
FamilyTree.propTypes = {
  selfNode: React.PropTypes.object.isRequired,
};

class Subtree extends React.Component {

  renderSubtrees() {
    return _.map(this.props.node.children, (childNode) => {
      return (
        <Subtree node={childNode} key={childNode.id} />
      );
    });
  }

  render() {
    return (
      <div className="subtree">
        <Node
          name={this.props.node.name}
          key={this.props.node.id}
        />
        <div className="subtree-container">
          {this.renderSubtrees()}
        </div>
      </div>
    );
  }
}
Subtree.propTypes = {
  node: React.PropTypes.object.isRequired,
};

class Node extends React.Component {

  render() {
    return (
      <div className="node">
        <span><strong>{this.props.name}</strong></span>
      </div>
    );
  }

}
Node.propTypes = {
  name: React.PropTypes.string.isRequired,
};

const data = [
  {
    children: [2, 4],
    name: "Self",
    id: 1,
    reports: {
      cheek_dimples: true,
      bald_spot: false,
      blonde: true,
    },
  },
  {
    children: [5, 6],
    name: "Son",
    id: 2,
    reports: {
      cheek_dimples: true,
      bald_spot: true,
      blonde: true,
    },
  },
  {
    children: [],
    name: "Daughter",
    id: 4,
    reports: {
      cheek_dimples: true,
      bald_spot: false,
      blonde: true,
    },
  },
  {
    children: [7],
    name: "Grandson",
    id: 5,
    reports: {
      cheek_dimples: false,
      bald_spot: true,
      blonde: true,
    },
  },
  {
    children: [],
    name: "Granddaughter",
    id: 6,
    reports: {
      cheek_dimples: true,
      bald_spot: false,
      blonde: true,
    },
  },
  { children: [],
    name: "Great granddaughter",
    id: 7,
    reports: {
      cheek_dimples: true,
      bald_spot: false,
      blonde: true,
    },
  },
];

let reports = ["cheek_dimples", "bald_spot", "blonde"];

function populateChildren(nodes) {
  nodes.forEach(function(node)  {
    node.children = node.children.map((childId) => {
      return nodes.find(({ id }) => id === childId);
    });
  });
}

// This is mutative!
populateChildren(data);

let selfNode = data.find(({ id }) => id === 1);
ReactDom.render(
  <Pedigree selfNode={selfNode} />,
  document.getElementById("react-app-1")
);
