import { CUSTOMIZE_UPDATE } from './types';

export const customizeUpdate = ({ prop, value }) => {
	return {
		type: CUSTOMIZE_UPDATE,
		payload: {prop, value}
	};
};