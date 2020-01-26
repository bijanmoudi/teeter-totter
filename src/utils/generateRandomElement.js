import { v4 } from 'uuid';
import {
	SEESAW_ELEMENT_WEIGHT_RANGE,
	SEESAW_WIDTH,
	SEESAW_SHAPES
} from '../constants';

const generateRandomElement = (input = '') => {
	const id = v4();
	const type = SEESAW_SHAPES[Math.floor(Math.random() * SEESAW_SHAPES.length)];
	const weight =
		Math.floor(Math.random() * SEESAW_ELEMENT_WEIGHT_RANGE[1]) +
		SEESAW_ELEMENT_WEIGHT_RANGE[0];
	const offset = Math.floor((Math.random() * SEESAW_WIDTH) / 2) + 1;
	const size = weight;

	return {
		id,
		type,
		size,
		weight,
		offset
	};
};

export default generateRandomElement;
