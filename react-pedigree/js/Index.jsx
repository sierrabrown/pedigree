import React from 'react';

import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {ReduxRouter} from 'redux-router';
import {_} from 'underscore';

class Filter extends React.Component {

	render() {
		return (
			<div className="filter-container">
				<h3>Filter</h3>
				<ul className="filter-list">
					{
						this.props.reports.map(
							(report) => (
								<li 
									key={report} 
									onClick={this.props.onChange.bind(null, report)}
								>
									{report}
								</li>
							)
						)
					}
					<li key="clearReport" onClick={this.props.onChange.bind(null, null)}>clear</li>
				</ul>
			</div>
		);
	}

}
Filter.propTypes = {
	reports: React.PropTypes.array.isRequired,
	currentReport: React.PropTypes.string,
	onChange: React.PropTypes.func.isRequired
}

class Pedigree extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentReport: props.intialReport
		}

		this.onReportChange = this.onReportChange.bind(this);
	}

	onReportChange(report) {
		this.setState({'currentReport': report});
	}

	render() {
		return (
			<div className="pedigree">
				<FamilyTree 
				nodes={this.props.nodes} 
				selfNode={this.props.selfNode} 
				currentReport={this.state.currentReport}/>
				<Filter
				reports={this.props.reports}
				currentReport={this.state.currentReport}
				onChange={this.onReportChange}/>
			</div>
		);
	}
}

class FamilyTree extends React.Component {

	render() {
		var node = _.find(this.props.nodes, (x) => {
			if (x.id === this.props.selfNode) {
				return x;
			};
		})
		console.log('TREE')
		console.log(this.props.currentReport)
		return (
			<div className="tree">
				<h2>Pedigree</h2>
				<div className="subtree-container">
					<Subtree node={node} nodes={this.props.nodes} className="baseSubtree" currentReport={this.props.currentReport}/>
				</div>
			</div>
		)
	}
}

class Subtree extends React.Component {

	render() {
		var subtrees = _.map(this.props.node.children, (child) => {
			var child_node = _.find(this.props.nodes, function(node) {
				if (child === node.id) {
					return node;
				}
			})
			return (
				<Subtree node={child_node} nodes={this.props.nodes} currentReport={this.props.currentReport} key={child_node.id}/>
			);
		})
		return (
			<div className="subtree">
				<Node name={this.props.node.name} currentReport={this.props.currentReport} reports={this.props.node.reports} key={this.props.node.id}/>
				<div className="subtree-container">
					{subtrees}
				</div>
			</div>
		);
	}
}

class Node extends React.Component {

	isHighlighted() {
		return this.props.reports[this.props.currentReport]
	}

	render() {
		return (
			<div className={`nodey ${this.isHighlighted() ? 'highlighted' : ''}`}>
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
var intialReport = null;

ReactDom.render(
	<Pedigree nodes={data} selfNode={selfNode} intialReport={intialReport} reports={reports}/>,
	document.getElementById('react-app')
);