/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as homeReducer from './homeReducer';

export default Object.assign(loginReducer, loadingReducer,homeReducer);
