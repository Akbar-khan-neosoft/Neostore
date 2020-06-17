import axios from 'axios';
import { PRODUCT_DATA_FAILURE, PRODUCT_DATA_REQUEST, PRODUCT_DATA_SUCCESS, URL } from '../Constants';

const ProductDataRequest = () => ({ type: PRODUCT_DATA_REQUEST });
const ProductDataSuccess = data => ({ type: PRODUCT_DATA_SUCCESS, payload: data });
const ProductDataFailure = error => ({ type: PRODUCT_DATA_FAILURE, error: error });

export const fetchProductData = () => async dispatch => {
	dispatch(ProductDataRequest());
	try {
		const res = await axios.get(URL + 'commonProducts');		
		dispatch(ProductDataSuccess(res.data.product_details));
	} catch (error) {
		dispatch(ProductDataFailure({ error }));
	}
};
