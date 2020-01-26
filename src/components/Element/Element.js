import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SEESAW_WIDTH } from '../../constants';
import './index.scss';

const Element = ({
	top,
	type,
	side,
	size,
	weight,
	offset,
	setBottom,
	style,
	className,
	...restProps
}) => {
	let element = null;
	const styles = {
		left: `${
			side === 'right'
				? Math.min(50 + offset * 10, 100)
				: Math.max(50 - offset * 10, 0)
		}%`,
		fontSize: `${size}em`
	};
	useEffect(() => {
		setBottom(element && element.getBoundingClientRect().bottom);
		// eslint-disable-next-line
	}, [top]);
	return (
		<div
			className={classnames(
				'element',
				`element--${type}`,
				{ [`element--${side}`]: side },
				{
					[className]: className
				}
			)}
			style={{ ...style, ...styles }}
			ref={ref => (element = ref)}
			{...restProps}
		>
			<span className="element__inner">{weight}</span>
		</div>
	);
};

Element.propTypes = {
	top: PropTypes.number,
	type: PropTypes.string.isRequired,
	side: PropTypes.string,
	size: PropTypes.number.isRequired,
	weight: PropTypes.number.isRequired,
	offset: PropTypes.number.isRequired,
	setBottom: PropTypes.func
};

Element.defaultProps = {
	top: 0,
	type: 'sqaure',
	side: null,
	size: 30,
	weight: 3,
	offset: SEESAW_WIDTH / 2 - 1,
	setBottom: () => {}
};

export default Element;
