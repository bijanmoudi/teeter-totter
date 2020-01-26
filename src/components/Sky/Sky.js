import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { FallingElement } from '../../components';
import {
	getPower,
	getBending,
	seesawMoveLeft,
	seesawMoveRight,
	initializeFallingElements
} from '../../actions';
import {
	SEESAW_MOVEMENT_DELAY,
	SEESAW_MOVEMENT_DELAY_DESCREASE,
	SEESAW_MOVEMENT_DELAY_DESCREASE_AFTER
} from '../../constants';
import './index.scss';

const Sky = ({ className, ...restProps }) => {
	const [fallingTimeout, setFallingTimeout] = useState(SEESAW_MOVEMENT_DELAY);
	const [iterationCounter, setIterationCounter] = useState(0);
	const state = useSelector(state => state.Seesaw);
	const dispatch = useDispatch();
	const leftPower = getPower(state.leftElements);
	const rightPower = getPower(state.rightElements);
	const bending = getBending(state);
	const handleKeyDown = e => {
		if (e.keyCode === 37) dispatch(seesawMoveLeft());
		if (e.keyCode === 39) dispatch(seesawMoveRight());
	};
	const onFallEnd = () => {
		setIterationCounter(iterationCounter + 1);
		if (iterationCounter === SEESAW_MOVEMENT_DELAY_DESCREASE_AFTER) {
			setFallingTimeout(fallingTimeout - SEESAW_MOVEMENT_DELAY_DESCREASE);
			setIterationCounter(0);
		}
	};
	useEffect(() => {
		dispatch(initializeFallingElements());
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
		// eslint-disable-next-line
	}, []);
	return (
		<div
			className={classnames('sky', { [className]: className })}
			{...restProps}
		>
			<div className="wrapper">
				{state.fallingElements
					? state.fallingElements.map((element, index) => (
							<FallingElement
								element={element}
								index={index}
								timeout={fallingTimeout}
								onFallEnd={onFallEnd}
								key={element.id}
							/>
					  ))
					: null}
				<div className="sky__status">
					<ul>
						<li>
							<div>
								<em>Left Count: </em>
								<span>{state.leftElements.length}</span>
							</div>
							<div>
								<em>Right Count: </em>
								<span>{state.rightElements.length}</span>
							</div>
						</li>
						<li>
							<div>
								<em>Left Power: </em>
								<span>{leftPower}</span>
							</div>
							<div>
								<em>Right Power: </em>
								<span>{rightPower}</span>
							</div>
						</li>
						<li>
							<div>
								<em>Power Diff: </em>
								<span>{Math.abs(leftPower - rightPower)}</span>
							</div>
							<div>
								<em>Bending: </em>
								<span>{Math.ceil(bending)}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sky;
