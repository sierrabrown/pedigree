import React from 'react';

import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {ReduxRouter} from 'redux-router';
import {_} from 'underscore';

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
}

class FamilyTree extends React.Component {

	render() {
		return (
			<div className="tree">
				<h2>Pedigree</h2>
				<div className="subtree-container">
					<Subtree node={this.props.selfNode} currentReport={this.props.currentReport}/>
				</div>
			</div>
		)
	}
}
FamilyTree.propTypes = {
	selfNode: React.PropTypes.object.isRequired
}

class Subtree extends React.Component {

	render() {
		var subtrees = _.map(this.props.node.children, (childNode) => {
			return (
				<Subtree node={childNode} currentReport={this.props.currentReport} key={childNode.id}/>
			);
		})
		return (
			<div className="subtree">
				<Node
					name={this.props.node.name}
					currentReport={this.props.currentReport}
					reports={this.props.node.reports}
					key={this.props.node.id}
				/>
				<div className="subtree-container">
					{subtrees}
				</div>
			</div>
		);
	}
}
Subtree.propTypes = {
	node: React.PropTypes.object.isRequired,
	currentReport: React.PropTypes.string
}

class Node extends React.Component {

	isHighlighted() {
		return this.props.reports[this.props.currentReport]
	}

	render() {
		return (
			<div className={`node ${this.isHighlighted() ? 'highlighted' : ''}`}>
				<span><strong>{this.props.name}</strong></span>
			</div>
		)
	}

}
Node.propTypes = {
	name: React.PropTypes.string.isRequired,
	currentReport: React.PropTypes.string,
	reports: React.PropTypes.object.isRequired
}

var data = [
	{
		'children': [2, 4], 
		'name': 'Self',
		'id': 1,
		'reports': {
			'cheek_dimples': true,
			'bald_spot': false,
			'blonde': true
		}
	},
	{
		'children': [5, 6], 
		'name': 'Son',
		'id': 2,
		'reports': {
			'cheek_dimples': true,
			'bald_spot': true,
			'blonde': true
		}
	},
	{
		'children': [],
		'name': 'Daughter',
		'id': 4,
		'reports': {
			'cheek_dimples': true,
			'bald_spot': false,
			'blonde': true
		}
	},
	{
		'children': [7],
		'name': 'Grandson',
		'id': 5,
		'reports': {
			'cheek_dimples': false,
			'bald_spot': true,
			'blonde': true
		}
	},
	{
		'children': [],
		'name': 'Granddaughter',
		'id': 6,
		'reports': {
			'cheek_dimples': true,
			'bald_spot': false,
			'blonde': true
		}
	},
	{	'children': [],
		'name': 'Great granddaughter',
		'id': 7,
		'reports': {
			'cheek_dimples': true,
			'bald_spot': false,
			'blonde': true
		},
		'highlighted': false,
	}
]

var reports = ['cheek_dimples', 'bald_spot', 'blonde']

var selfNode = 1;
var initialReport = null;

function populateChildren(nodes) {
	nodes.forEach(function(node)  {
		node.children = node.children.map((childId, idx) => {
			return nodes.find(({ id }) => id === childId);
		});
	});
}

// This is mutative!
populateChildren(data);

var selfNode = data.find(({ id }) => id === 1);

ReactDom.render(
	<Pedigree selfNode={selfNode} reports={reports}/>,
	document.getElementById('react-app')
);
