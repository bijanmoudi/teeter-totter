import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Logo, Button } from '../../components';
import { seesawToggle, seesawRestart } from '../../actions';
import './index.scss';

const Header = ({ className, ...restProps }) => {
	const state = useSelector(state => state.Seesaw);
	const dispatch = useDispatch();
	const handleToggle = () => {
		dispatch(seesawToggle());
	};
	const handleRestart = () => {
		dispatch(seesawRestart());
	};
	return (
		<header
			className={classnames('header', { [className]: className })}
			{...restProps}
		>
			<div className="wrapper">
				<div className="header__inner">
					<div className="header__column">
						<a
							href="//useinsider.com"
							target="_blank"
							rel="noopener noreferrer nofollow"
							title="Insider."
							className="header__logo"
							itemScope="itemscope"
							itemType="https://schema.org/Organization"
						>
							<Logo />
						</a>
					</div>
					<div className="header__column column--full">
						<Button color="red" onClick={handleRestart}>
							Restart
						</Button>
						<Button
							color="green"
							disabled={state.ended}
							onClick={handleToggle}
							autoFocus={true}
						>
							{state.paused ? 'Play' : 'Pause'}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
