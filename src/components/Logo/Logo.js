import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import logoImage from '../../assets/images/logo@2x.png';

import './index.scss';

const Logo = ({ width, className, ...restProps }) => {
	return (
		<span
			className={classnames('logo', { [className]: className })}
			{...restProps}
		>
			<img
				src={logoImage}
				alt="Insider. Logo"
				className="logo__image"
				width={width}
				height={(width * 41) / 90}
			/>
		</span>
	);
};

Logo.propTypes = {
	width: PropTypes.oneOfType([() => null, PropTypes.number])
};

Logo.defaultProps = {
	width: 90
};

export default Logo;
