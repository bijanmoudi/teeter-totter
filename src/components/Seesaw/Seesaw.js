import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Element } from '../../components';
import { getBending, insertRightElement } from '../../actions';
import { SEESAW_MAX_BENDING_PERCENTAGE } from '../../constants';
import './index.scss';

const Seesaw = ({ className, ...restProps }) => {
	const state = useSelector(state => state.Seesaw);
	const dispatch = useDispatch();
	const bending = getBending(state);
	useEffect(() => {
		dispatch(insertRightElement());
		// eslint-disable-next-line
	}, []);
	return (
		<div
			className={classnames('seesaw', { [className]: className })}
			{...restProps}
		>
			<div className="wrapper seesaw__wrapper">
				<div className="seesaw__container">
					<div
						className="seesaw__beam"
						style={{
							transform: `rotate(${Math.min(
								Math.abs(bending / 2),
								SEESAW_MAX_BENDING_PERCENTAGE
							) * (bending > 0 ? 1 : -1)}deg)`
						}}
					>
						{state.leftElements
							? state.leftElements.map(element => (
									<Element
										side="left"
										type={element.type}
										size={element.size}
										weight={element.weight}
										offset={element.offset}
										key={element.id}
									/>
							  ))
							: null}
						{state.rightElements
							? state.rightElements.map(element => (
									<Element
										side="right"
										type={element.type}
										size={element.size}
										weight={element.weight}
										offset={element.offset}
										key={element.id}
									/>
							  ))
							: null}
					</div>
					<div className="seesaw__fulcrum" />
				</div>
			</div>
		</div>
	);
};

export default Seesaw;
