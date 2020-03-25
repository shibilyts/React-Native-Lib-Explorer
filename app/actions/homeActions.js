/*
 * Reducer actions related with home
 */
import * as types from './types';




export function addFavToReducer(data) {

  return {
    type: types.ADD_FAV,
    data,
  };
}
export function deleteFavToReducer(data) {
  
  return {
    type: types.DEL_FAV,
    data,
  };
}
export function setDarkMode(data) {
  
  return {
    type: types.DARK_MODE,
    data,
  };
}
export function skipIntro() {
  
  return {
    type: types.APPINTRO_SKIP,
  };
}
