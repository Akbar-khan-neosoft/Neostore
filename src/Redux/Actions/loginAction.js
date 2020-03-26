import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, URL,LOGIN_AUTHENTICATION,LOGOUT_REQUEST } from '../Constants';

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = data => ({ type: LOGIN_SUCCESS, payload: data });
const loginFailure = error => ({ type: LOGIN_FAILURE, error: error });
const loginAuthetication = () => ({ type: LOGIN_AUTHENTICATION });
const logoutRequest = () => ({ type: LOGOUT_REQUEST });


export const fetchlogout = () => dispatch => {
	dispatch(logoutRequest());
};

export const fetchlogin = data => async dispatch => {
	dispatch(loginRequest());
	try {
		const res = await axios.post(URL + 'login', data);
		alert(res.data.message);
		// dispatch(loginSuccess({}));
		 dispatch(loginSuccess(res.data,));
		dispatch(loginAuthetication());
	} catch (error) {
		dispatch(loginFailure({ error }));
	}
};


