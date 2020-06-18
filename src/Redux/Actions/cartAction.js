import axios from 'axios';
import { CART_DATA_FAILURE, CART_DATA_REQUEST, CART_DATA_SUCCESS, URL } from '../Constants';

const cartDataRequest = () => ({ type: CART_DATA_REQUEST });
const cartDataSuccess = data => ({ type: CART_DATA_SUCCESS, payload: data });
const cartDataFailure = error => ({ type: CART_DATA_FAILURE, error: error });

export const fetchCartData = () => async dispatch => {
    const localData = JSON.parse(localStorage.getItem("loginData"));
    dispatch(cartDataRequest());
    try {
        const res = await axios.get(URL + 'getCartData', { headers: { "Authorization": 'Bearer ' + localData.token } });
        dispatch(cartDataSuccess(res.data.product_details));
    } catch (error) {
        dispatch(cartDataFailure({ error }));
    }
};
