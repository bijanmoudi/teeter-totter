import {
	SEESAW_RESET,
	SEESAW_ENDED,
	SEESAW_TOGGLE,
	SEESAW_MOVE_LEFT,
	SEESAW_MOVE_RIGHT,
	SEESAW_INSERT_LEFT_ELEMENT,
	SEESAW_INSERT_RIGHT_ELEMENT,
	SEESAW_INSERT_FALLING_ELEMENT,
	SEESAW_INITIALIZE_FALLING_ELEMENTS
} from '../../types';
import {
	SEESAW_MAX_POWER_DIFF,
	SEESAW_MAX_BENDING_PERCENTAGE
} from '../../constants';

export const getPower = elements => {
	return elements.reduce((total, element) => {
		return (total += element.weight * element.offset);
	}, 0);
};

export const getTotalLeft = state => {
	return getPower(state.leftElements);
};

export const getTotalRight = state => {
	return getPower(state.rightElements);
};

export const getBending = state => {
	const totalLeft = getTotalLeft(state);
	const totalRight = getTotalRight(state);
	if (!totalLeft) {
		return SEESAW_MAX_BENDING_PERCENTAGE;
	} else {
		return totalLeft > totalRight
			? ((totalLeft - totalRight) / totalLeft) * -100
			: ((totalRight - totalLeft) / totalRight) * 100;
	}
};

export const getStatus = state => {
	const totalLeft = getTotalLeft(state);
	const totalRight = getTotalRight(state);
	const bending = getBending(state);
	return (
		bending > SEESAW_MAX_BENDING_PERCENTAGE ||
		bending < -1 * SEESAW_MAX_BENDING_PERCENTAGE ||
		Math.abs(totalLeft - totalRight) > SEESAW_MAX_POWER_DIFF
	);
};

export const fallEnded = () => {
	return (dispatch, getState) => {
		dispatch(insertLeftElement());
		setTimeout(() => {
			const { Seesaw: state } = getState();
			if (getStatus(state)) {
				setTimeout(() => {
					dispatch(seesawToggle());
					dispatch(seesawEnded());
				}, 0);
			} else {
				dispatch(insertFallingElement());
				if (
					state.leftElements &&
					state.leftElements.length !== state.rightElements.length
				) {
					dispatch(insertRightElement());
				}
			}
		}, 250);
	};
};

export const initializeFallingElements = () => {
	return { type: SEESAW_INITIALIZE_FALLING_ELEMENTS };
};

export const seesawReset = () => {
	return { type: SEESAW_RESET };
};

export const seesawRestart = () => {
	return (dispatch, getState) => {
		dispatch(seesawReset());
		dispatch(insertRightElement());
		dispatch(initializeFallingElements());
	};
};

export const seesawMoveLeft = () => {
	return { type: SEESAW_MOVE_LEFT };
};

export const seesawMoveRight = () => {
	return { type: SEESAW_MOVE_RIGHT };
};

export const insertLeftElement = () => {
	return { type: SEESAW_INSERT_LEFT_ELEMENT };
};

export const insertRightElement = () => {
	return { type: SEESAW_INSERT_RIGHT_ELEMENT };
};

export const insertFallingElement = () => {
	return { type: SEESAW_INSERT_FALLING_ELEMENT };
};

export const seesawToggle = () => {
	return { type: SEESAW_TOGGLE };
};

export const seesawEnded = () => {
	return { type: SEESAW_ENDED };
};
