import { combineReducers } from 'redux';
import sliderReducer from './sliderReducer';
import popularProductReducer from './popularProductReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';

export default combineReducers({ sliderReducer, popularProductReducer, productReducer, loginReducer,cartReducer });
