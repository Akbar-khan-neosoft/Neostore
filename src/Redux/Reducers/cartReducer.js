import { CART_DATA_FAILURE, CART_DATA_REQUEST, CART_DATA_SUCCESS } from '../Constants';
const initialState = {
	isFetching: false,
	data: [],
	error: {},
};

function cartReducer(state = initialState, action) {
	switch (action.type) {
		case CART_DATA_REQUEST:
			return { ...state, isFetching: true };
		case CART_DATA_SUCCESS:
			return { ...state, data: action.payload };
		case CART_DATA_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default cartReducer;
