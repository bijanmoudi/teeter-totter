import React from 'react';
import { Provider } from 'react-redux';
import { Header, Content } from './components';
import './index.scss';

const Root = ({ store }) => {
	return (
		<Provider store={store}>
			<div className="container">
				<Header />
				<Content />
			</div>
		</Provider>
	);
};

export default Root;
