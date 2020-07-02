import Swal from "sweetalert2"
import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, URL, LOGIN_AUTHENTICATION, LOGOUT_REQUEST } from '../Constants';
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = data => ({ type: LOGIN_SUCCESS, payload: data });
const loginFailure = error => ({ type: LOGIN_FAILURE, error: error });
const loginAuthetication = () => ({ type: LOGIN_AUTHENTICATION });
const logoutRequest = () => ({ type: LOGOUT_REQUEST });


export const fetchlogout = () => async dispatch => {
	const localData = JSON.parse(localStorage.getItem("loginData"));
	const localcart = JSON.parse(localStorage.getItem("cart"));
	const data = localcart ? localcart : []
		data.push({ flag: "logout" })
		try {
			await axios.post(URL + 'addProductToCartCheckout', data, { headers: { "Authorization": "Brearer " + localData.token } });
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: error,
				showConfirmButton: false,
				timer: 2000
			})
		}
	dispatch(logoutRequest());
};

export const fetchlogin = data => async dispatch => {
	dispatch(loginRequest());
	try {
		const res = await axios.post(URL + 'login', data);
		Swal.fire({
			icon: 'success',
			title: res.data.message,
			showConfirmButton: false,
			timer: 2000
		})
		dispatch(loginSuccess(res.data));
		dispatch(loginAuthetication());
	} catch (error) {
		dispatch(loginFailure(error.response.data));
	}
};


