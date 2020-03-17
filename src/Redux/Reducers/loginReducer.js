import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../Constants';
const initialState = {
	isFetching: false,
	data: [],
	error: {},
};

function loginReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, isFetching: true };
		case LOGIN_SUCCESS:
			return { ...state, data: action.payload };
		case LOGIN_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default loginReducer;
