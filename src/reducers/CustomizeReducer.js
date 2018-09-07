import { CUSTOMIZE_UPDATE } from '../actions/types';
import { SHORT_TERM } from '../constants';

const INITIAL_STATE = {
	selection: false,
	sliderLength: SHORT_TERM,
	limit: "10"
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CUSTOMIZE_UPDATE: 
			return {...state, [action.payload.prop]: action.payload.value};
		default:
			return state;
	}
};