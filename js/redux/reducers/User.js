import { LOAD_USER } from "../actionTypes.js";

const currentUser = (state = initialUserInfo, action) => {
  switch (action.type) {
    case LOAD_USER: {
      const userId = action.payload;

      console.log("Inside User reducer");
      //get Account Info from Firestore
      //TODO -> Api call to update the database

      const user = {
        userId: userId,
        name: "test",
      };

      return user;
    }
    default:
      return state;
  }
};

export default currentUser;

const initialUserInfo = {
  userId: "",
  name: "",
};
