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
				{ this._renderNodes(this.props.parentNode) }
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
			return (
				<Node
					key={current_node.id}
					name={current_node.name} 
				/>
				children[0]
			)
		}
	}
}

class Node extends React.Component {
	constructor(props) {
		super(props)
		this.setState({
			'parent': props.parent,
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
	'parent': null, 
	'children': [2], 
	'name': 'Joey',
	'id': 1
},
{
	'parent': 1, 
	'children': [], 
	'name': 'Monica',
	'id': 2
}]

var parentNode = 1;

ReactDom.render(
	<FamilyTree nodes={data} parentNode={parentNode}/>,
	document.getElementById('react-app')
);