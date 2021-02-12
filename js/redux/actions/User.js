import { LOAD_USER } from "../actionTypes.js";

export function loadUser(userId) {
  return {
    type: LOAD_USER,
    payload: userId,
  };
}
