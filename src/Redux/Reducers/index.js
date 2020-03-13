import { combineReducers } from 'redux';
import sliderReducer from './sliderReducer';
import popularProductReducer from './popularProductReducer';
import productReducer from './productReducer';

export default combineReducers({ sliderReducer, popularProductReducer, productReducer });
