import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Element } from '../../components';
import { getBending, fallEnded } from '../../actions';
import {
	SEESAW_WIDTH,
	SEESAW_MOVEMENT_DISTANCE,
	SEESAW_MAX_BENDING_PERCENTAGE
} from '../../constants';
import './index.scss';

const beamClass = 'seesaw__beam';
const FallingElement = ({
	index,
	element,
	timeout,
	onFallEnd,
	className,
	...restProps
}) => {
	const [timer, setTimer] = useState(0);
	const [elementTop, setElementTop] = useState(element && element.size);
	const [elementBottom, setElementBottom] = useState(0);
	const state = useSelector(state => state.Seesaw);
	const dispatch = useDispatch();
	const bending = getBending(state);
	const getFinalPosition = () => {
		const { top, bottom } = document
			.querySelector(`.${beamClass}`)
			.getBoundingClientRect();
		return bending >= 0
			? top + ((bottom - top) / 2) * (1 - element.offset / (SEESAW_WIDTH / 2))
			: bottom -
					((bottom - top) / 2) * (1 - element.offset / (SEESAW_WIDTH / 2));
	};
	useEffect(() => {
		if (state.paused) return clearTimeout(timer);
		if (index !== 0) return;
		setTimer(
			setTimeout(() => {
				if (
					elementBottom >=
					getFinalPosition() - SEESAW_MOVEMENT_DISTANCE * 1.5
				) {
					clearTimeout(timer);
					dispatch(fallEnded());
					onFallEnd();
					return;
				}
				setElementTop(elementTop + SEESAW_MOVEMENT_DISTANCE);
			}, timeout)
		);
		return () => {
			clearTimeout(timer);
			setTimer(null);
		};
		// eslint-disable-next-line
	}, [state.paused, elementTop]);
	return (
		<div
			className="element-wrapper"
			style={{
				top: elementTop,
				transform: `rotate(${Math.min(
					Math.abs(bending / 2),
					SEESAW_MAX_BENDING_PERCENTAGE
				) * (bending > 0 ? 1 : -1)}deg)`
			}}
		>
			<Element
				className={classnames('element--falling', { [className]: className })}
				side="left"
				top={elementTop}
				setBottom={setElementBottom}
				{...element}
				{...restProps}
			/>
		</div>
	);
};

FallingElement.propTypes = {
	index: PropTypes.number,
	element: PropTypes.object.isRequired,
	timeout: PropTypes.number,
	onFallEnd: PropTypes.func
};

FallingElement.defaultProps = {
	index: 0,
	element: null,
	timeout: 0,
	onFallEnd: () => {}
};

export default FallingElement;
