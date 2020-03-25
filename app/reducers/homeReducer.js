/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
 fav:[],
 darkMode:false,
 skipAppIntro:false
};

export const homeReducer = createReducer(initialState, {
 
  [types.ADD_FAV](state, action) {
    return {
      ...state,
      fav: action.data,
    };
  },
  [types.DEL_FAV](state, action) {
    return {
      ...state,
      fav: action.data,
    };
  },
  [types.DARK_MODE](state, action) {
    return {
      ...state,
      darkMode: action.data,
    };
  },
  [types.APPINTRO_SKIP](state, action) {
    return {
      ...state,
      skipAppIntro: true,
    };
  },
});
