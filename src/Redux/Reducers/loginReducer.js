import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_AUTHENTICATION } from '../Constants';
const initialState = {
	isFetching: false,
	isAuthenticated :false,
	data: [],
	error: {},
};

function loginReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, isFetching: true };
		case LOGIN_AUTHENTICATION:
			return { ...state, isAuthenticated: true };
		case LOGIN_SUCCESS:
			return { ...state, data: action.payload,isFetching: false };
		case LOGIN_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default loginReducer;
