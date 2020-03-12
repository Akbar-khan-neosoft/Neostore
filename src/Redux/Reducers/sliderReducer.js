import { SLIDER_DATA_FAILURE, SLIDER_DATA_REQUEST, SLIDER_DATA_SUCCESS } from '../Constants';
const initialState = {
	isFetching: false,
	data: [],
	error: {},
};

function sliderReducer(state = initialState, action) {
	switch (action.type) {
		case SLIDER_DATA_REQUEST:
			return { ...state, isFetching: true };
		case SLIDER_DATA_SUCCESS:
			return { ...state, data: action.payload };
		case SLIDER_DATA_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default sliderReducer;
