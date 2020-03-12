import { POPULAR_PRODUCT_DATA_FAILURE, POPULAR_PRODUCT_DATA_REQUEST, POPULAR_PRODUCT_DATA_SUCCESS } from '../Constants';
const initialState = {
	isFetching: false,
	data: [],
	error: {},
};

function popularProductReducer(state = initialState, action) {
	switch (action.type) {
		case POPULAR_PRODUCT_DATA_REQUEST:
			return { ...state, isFetching: true };
		case POPULAR_PRODUCT_DATA_SUCCESS:
			return { ...state, data: action.payload };
		case POPULAR_PRODUCT_DATA_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default popularProductReducer;
