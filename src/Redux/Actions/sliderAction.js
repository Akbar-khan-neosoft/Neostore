import axios from 'axios';
import { SLIDER_DATA_FAILURE, SLIDER_DATA_REQUEST, SLIDER_DATA_SUCCESS } from '../Constants';

const sliderDataRequest = () => ({ type: SLIDER_DATA_REQUEST });
const sliderDataSuccess = data => ({ type: SLIDER_DATA_SUCCESS, payload: data });
const sliderDataFailure = error => ({ type: SLIDER_DATA_FAILURE, error: error });

export const fetchSliderData = () => async dispatch => {
	dispatch(sliderDataRequest());
	try {
		const { data } = await axios.get('http://180.149.241.208:3022/getAllCategories');
		dispatch(sliderDataSuccess(data));
	} catch (error) {
		dispatch(sliderDataFailure({ error }));
	}
};
