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
import { SEESAW_FALLING_ELEMENTS } from '../../constants';
import { generateRandomElement } from '../../utils';

const initialState = {
	ended: false,
	paused: true,
	leftElements: [],
	rightElements: [],
	fallingElements: []
};

const SeesawReducer = (state = initialState, action) => {
	let randomElement = {};
	let fallingElements = [];
	switch (action.type) {
		case SEESAW_TOGGLE:
			return {
				...state,
				paused: !state.paused
			};
		case SEESAW_INSERT_RIGHT_ELEMENT:
			randomElement = generateRandomElement();
			return {
				...state,
				rightElements: [...state.rightElements, randomElement]
			};
		case SEESAW_INSERT_LEFT_ELEMENT:
			fallingElements = [...state.fallingElements];
			const leftElement = fallingElements.shift();
			return {
				...state,
				fallingElements,
				leftElements: [...state.leftElements, leftElement]
			};
		case SEESAW_MOVE_RIGHT:
			if (
				state.paused ||
				(state.fallingElements &&
					state.fallingElements.length &&
					state.fallingElements[0].offset - 1 <= 0)
			)
				return state;
			fallingElements = [...state.fallingElements];
			if (fallingElements.length) fallingElements[0].offset -= 1;
			return {
				...state,
				fallingElements
			};
		case SEESAW_MOVE_LEFT:
			if (
				state.paused ||
				(state.fallingElements &&
					state.fallingElements.length &&
					state.fallingElements[0].offset + 1 <= 0)
			)
				return state;
			fallingElements = [...state.fallingElements];
			if (fallingElements.length) fallingElements[0].offset += 1;
			return {
				...state,
				fallingElements
			};
		case SEESAW_RESET:
			fallingElements = [...state.fallingElements];
			if (fallingElements.length) fallingElements[0].offset += 1;
			return initialState;
		case SEESAW_INSERT_FALLING_ELEMENT:
			randomElement = generateRandomElement();
			return {
				...state,
				fallingElements: [...state.fallingElements, randomElement]
			};
		case SEESAW_INITIALIZE_FALLING_ELEMENTS:
			fallingElements = [];
			for (let i = 0; i < SEESAW_FALLING_ELEMENTS; i++) {
				randomElement = generateRandomElement();
				fallingElements.push(randomElement);
			}
			return {
				...state,
				fallingElements
			};
		case SEESAW_ENDED:
			return {
				...state,
				ended: true
			};
		default:
			return state;
	}
};

export default SeesawReducer;
