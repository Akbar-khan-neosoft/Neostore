import axios from 'axios';
import { SLIDER_DATA_FAILURE, SLIDER_DATA_REQUEST, SLIDER_DATA_SUCCESS, URL } from '../Constants';

const sliderDataRequest = () => ({
	type: SLIDER_DATA_REQUEST,
});
const sliderDataSuccess = data => ({ type: SLIDER_DATA_SUCCESS, payload: data });
const sliderDataFailure = error => ({ type: SLIDER_DATA_FAILURE, error: error });

export const fetchSliderData = () => async dispatch => {
	dispatch(sliderDataRequest());
	try {
		const res = await axios.get(URL + 'getAllCategories');
		dispatch(sliderDataSuccess(res.data));
	} catch (error) {
		dispatch(sliderDataFailure({ error }));
	}
};
