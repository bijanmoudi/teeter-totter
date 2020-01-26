import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Sky, Seesaw } from '../../components';
import './index.scss';

const Canvas = ({ className, ...restProps }) => {
	const state = useSelector(state => state.Seesaw);
	return (
		<div
			data-gameover-text="Game Over!"
			className={classnames(
				'canvas',
				{ [className]: className },
				{ 'is--ended': state.ended }
			)}
			{...restProps}
		>
			<Sky />
			<Seesaw />
		</div>
	);
};

export default Canvas;
