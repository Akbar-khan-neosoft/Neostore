import { combineReducers } from 'redux';
import sliderReducer from './sliderReducer';
import popularProductReducer from './popularProductReducer';

export default combineReducers({ sliderReducer, popularProductReducer });
