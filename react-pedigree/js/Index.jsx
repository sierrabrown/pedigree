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
		this._renderNodes = this._renderNodes.bind(this);
	}

	render() {
		return (
			<div>
				{ this._renderNodes([this.props.selfNode]) }
			</div>
		)
	}

	_renderNodes(current_ids) {
		return this._renderNode(current_ids);
	}

	_renderNodes(current_ids) {
		if (current_ids.length === 0) {
			return;
		}

		var current_nodes = _.filter(this.state.nodes, function(x) {
			if (_.includes(current_ids, x.id)) {
				return x
			};
			return false;
		}, this);

		var current_rendered_nodes = _.map(current_nodes, function(node) {
			return (
				<Node
					key={node.id}
					name={node.name} 
				/>
			)
		})

		var children = _.flatten(_.map(current_nodes, function(node) { return node.children } ))
		var parents = _.flatten(_.map(current_nodes, function(node) { return node.parents }))

		var children_nodes = this._renderNodes(children)

		var parent_nodes = this._renderNodes(parents)

		return (
			<div>
				{parent_nodes}
				<div class="generation">{current_rendered_nodes}</div>
				{children_nodes}
			</div>
		)
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
		'children': [2, 4], 
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
		'parents': [6],
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
	},
	{
		'parents': [],
		'children': [],
		'name': 'Grandfather (Father\'s father)',
		'id': 6
	}
]

var selfNode = 1;

ReactDom.render(
	<FamilyTree nodes={data} selfNode={selfNode}/>,
	document.getElementById('react-app')
);