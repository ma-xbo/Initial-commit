import {
  LOAD_USER,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_STORE,
  DELETE_STORE,
} from "../actionTypes.js";

const currentUser = (state = initialUserInfo, action) => {
  switch (action.type) {
    case LOAD_USER: {
      const userData = action.payload;
      return userData;
    }

    case ADD_CATEGORY: {
      const categoryName = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories, categoryName],
          stores: [...state.config.stores],
        },
      };
    }

    case ADD_STORE: {
      const storeName = action.payload;
      return {
        ...state,
        config: {
          categories: [...state.config.categories],
          stores: [...state.config.stores, storeName],
        },
      };
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
