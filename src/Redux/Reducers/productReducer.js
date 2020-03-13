import { PRODUCT_DATA_FAILURE, PRODUCT_DATA_REQUEST, PRODUCT_DATA_SUCCESS } from '../Constants';
const initialState = {
	isFetching: false,
	data: [],
	error: {},
};

function productReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_DATA_REQUEST:
			return { ...state, isFetching: true };
		case PRODUCT_DATA_SUCCESS:
			return { ...state, data: action.payload };
		case PRODUCT_DATA_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default productReducer;
