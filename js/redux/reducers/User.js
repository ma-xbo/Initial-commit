import { LOAD_USER } from "../actionTypes.js";

const currentUser = (state = initialUserInfo, action) => {
  switch (action.type) {
    //TODO
    //Api call to update the database

    // return value --> it is NOT allowed to return "state". Therefore you have to create a new Array
    // https://daveceddia.com/react-redux-immutability-guide/

    case LOAD_USER: {
      // get the payload
      const userId = action.payload;

      //get Account Info from Firestore
      const user = {};

      /*       if (newTask) {
        newTask.name = task.name;
        newTask.description = task.description;
        newTask.priority = task.priority;
      } */

      return user;
    }
    default:
      return state;
  }
};

export default currentUser;

const initialUserInfo = {
  userId: "test",
  name: "test",
};
