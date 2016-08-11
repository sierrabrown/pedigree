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
		this._renderNode = this._renderNode.bind(this);
	}

	render() {
		return (
			<div>
				{ this._renderNodes(this.props.selfNode) }
			</div>
		)
	}

	_renderNodes(current_id) {
		return this._renderNode(current_id);
	}

	_renderNode(current_id) {
		var current_node = _.find(this.state.nodes, function(x) {
			if (x.id === current_id) {
				return x
			};
		}, this);
		if (current_node.children.length < 1) {
			return (
				<Node
					key={current_node.id}
					name={current_node.name} 
				/>
			);
		} else {
			var children = current_node.children.map(
				function(node) {
					return this._renderNode(node)
				},
				this
			)
			var parents = current_node.parents.map(
				function(node) {
					return this._renderNode(node)
				},
				this
			)
			return (
				<div>
					{parents}
					<Node
						key={current_node.id}
						name={current_node.name} 
					/>
					{children}
				</div>
			)
		}
	}
}

class Node extends React.Component {
	constructor(props) {
		super(props)
		this.setState({
			'parents': props.parents,
			'children': props.children,
			'name': props.name
		})
	}
	render() {
		return (
			<div class="node">
				<span><strong>{this.props.name}</strong></span>
			</div>
		)
	}
}

var data = [
	{
		'parents': [3], 
		'children': [2, 4
		], 
		'name': 'Self',
		'id': 1
	},
	{
		'parents': [], 
		'children': [5], 
		'name': 'Son',
		'id': 2
	},
	{
		'parents': [],
		'children': [],
		'name': 'Father',
		'id': 3
	},
	{
		'parents': [],
		'children': [],
		'name': 'Daughter',
		'id': 4
	},
	{
		'parents': [],
		'children': [],
		'name': 'Grandson (Son\'s son)',
		'id': 5
	}
]

var selfNode = 1;

ReactDom.render(
	<FamilyTree nodes={data} selfNode={selfNode}/>,
	document.getElementById('react-app')
);