import firebase from "../../Firebase";
import { LOAD_USER } from "../actionTypes.js";

const currentUser = (state = initialUserInfo, action) => {
  switch (action.type) {
    case LOAD_USER: {
      const userData = action.payload;
      
      return userData;
    }
    default:
      return state;
  }
};

export default currentUser;

const initialUserInfo = {
  userId: "",
  name: "",
  email: "",
  config: {
    categories: [],
    stores: [],
  },
};
