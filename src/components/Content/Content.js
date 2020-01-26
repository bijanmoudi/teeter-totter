import React from 'react';
import classnames from 'classnames';
import { Canvas } from '../../components';
import './index.scss';

const Content = ({ className, ...restProps }) => {
	return (
		<main
			className={classnames('content', { [className]: className })}
			{...restProps}
		>
			<Canvas />
		</main>
	);
};

export default Content;
