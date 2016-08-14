import React from 'react';

import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {ReduxRouter} from 'redux-router';
import {_} from 'underscore';

class FamilyTree extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			'nodes': this.props.nodes,
		}
	}

	render() {
		var node = _.find(this.props.nodes, (x) => {
			if (x.id === this.props.selfNode) {
				return x;
			};
		})
		return (
			<div className="tree">
				<Subtree node={node} nodes={this.props.nodes} className="baseSubtree"/>
			</div>
		)
	}
}

class Subtree extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var subtrees = _.map(this.props.node.children, (child) => {
			var child_node = _.find(this.props.nodes, function(node) {
				if (child === node.id) {
					return node;
				}
			})
			return (
				<Subtree node={child_node} nodes={this.props.nodes}/>
			);
		})
		return (
			<div className="subtree">
				<Node name={this.props.node.name}/>
				<div className="subtree-container">
					{subtrees}
				</div>
			</div>
		);
	}
}

class Node extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		var divStyle = {
			"width": "100px",
			"height": "100px",
			"border": "solid black 5px",
			"margin": "0 auto",
			"text-align": "center"
		}
		return (
			<div class="node" className="nodey">
				<span><strong>{this.props.name}</strong></span>
			</div>
		)
	}
}

var data = [
	{
		'children': [2, 4], 
		'name': 'Self',
		'id': 1
	},
	{
		'children': [5, 6], 
		'name': 'Son',
		'id': 2
	},
	{
		'children': [],
		'name': 'Daughter',
		'id': 4
	},
	{
		'children': [7],
		'name': 'Grandson',
		'id': 5
	},
	{
		'children': [],
		'name': 'Granddaughter',
		'id': 6
	},
	{	'children': [],
		'name': 'Great granddaughter',
		'id': 7
	}
]

var selfNode = 1;

ReactDom.render(
	<FamilyTree nodes={data} selfNode={selfNode} className="tree"/>,
	document.getElementById('react-app')
);