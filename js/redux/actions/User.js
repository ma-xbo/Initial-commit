import { LOAD_USER } from "../actionTypes.js";

export function loadUser(userData) {
  return {
    type: LOAD_USER,
    payload: userData,
  };
}
