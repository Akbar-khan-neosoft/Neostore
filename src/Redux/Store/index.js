import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducers from '../Reducers';

const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
// 	middleware.push(createLogger());
// }

export default createStore(reducers, {}, applyMiddleware(...middleware));
