import {
  ADD_CATEGORY,
  ADD_STORE,
  DELETE_CATEGORY,
  DELETE_STORE,
  LOAD_USER,
} from "../actionTypes.js";

export function loadUser(userData) {
  return {
    type: LOAD_USER,
    payload: userData,
  };
}

export function addCategory(categoryName) {
  return {
    type: ADD_CATEGORY,
    payload: categoryName,
  };
}

export function deleteCategory(categoryName) {
  return {
    type: DELETE_CATEGORY,
    payload: categoryName,
  };
}

export function addStore(storeName) {
  return {
    type: ADD_STORE,
    payload: storeName,
  };
}

export function deleteStore(storeName) {
  return {
    type: DELETE_STORE,
    payload: storeName,
  };
}
