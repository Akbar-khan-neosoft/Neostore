import axios from 'axios';
import {
	POPULAR_PRODUCT_DATA_FAILURE,
	POPULAR_PRODUCT_DATA_REQUEST,
	POPULAR_PRODUCT_DATA_SUCCESS,
	URL,
} from '../Constants';

const popularProductDataRequest = () => ({ type: POPULAR_PRODUCT_DATA_REQUEST });
const popularProductDataSuccess = data => ({ type: POPULAR_PRODUCT_DATA_SUCCESS, payload: data });
const popularProductDataFailure = error => ({ type: POPULAR_PRODUCT_DATA_FAILURE, error: error });

export const fetchPopularProductData = () => async dispatch => {
	dispatch(popularProductDataRequest());
	try {
		const res = await axios.get(URL + 'defaultTopRatingProduct');
		dispatch(popularProductDataSuccess(res.data.product_details));
	} catch (error) {
		dispatch(popularProductDataFailure({ error }));
	}
};
