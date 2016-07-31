import React from 'react';

import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {ReduxRouter} from 'redux-router';
import configureStore from './store/configureStore';
const store = configureStore();

const AppRoot = require('./AppRoot');

class RootElement extends React.Component {
	static displayName == 'RootElement';
	render() {
		return (
			<Provider store={store}>
				<ReduxRouter routes = {AppRoot} />
			</Provider>
		);
	}
}

ReactDom.render(<RootElement />,
	document.getElementById('react-app');
)