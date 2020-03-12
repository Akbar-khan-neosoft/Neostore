import axios from 'axios';
import { POPULAR_PRODUCT_DATA_FAILURE, POPULAR_PRODUCT_DATA_REQUEST, POPULAR_PRODUCT_DATA_SUCCESS } from '../Constants';

const popularProductDataRequest = () => ({ type: POPULAR_PRODUCT_DATA_REQUEST });
const popularProductDataSuccess = data => ({ type: POPULAR_PRODUCT_DATA_SUCCESS, payload: data });
const popularProductDataFailure = error => ({ type: POPULAR_PRODUCT_DATA_FAILURE, error: error });

export const fetchPopularProductData = () => async dispatch => {
	dispatch(popularProductDataRequest());
	try {
		await axios.get('http://180.149.241.208:3022/defaultTopRatingProduct').then(result => {
			return dispatch(popularProductDataSuccess(result.data.product_details));

			// axios.get('http://180.149.241.208:3022/getAllCategories').then(result => {
			// return dispatch(popularProductDataSuccess(result.data));
		});
	} catch (error) {
		dispatch(popularProductDataFailure({ error }));
	}
};
