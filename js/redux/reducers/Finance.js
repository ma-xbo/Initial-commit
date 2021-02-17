import { LOAD_FINANCEDATA, ADD_FINANCEDP } from "../actionTypes.js";

const financeData = (state = initialFinanceData, action) => {
  switch (action.type) {
    case LOAD_FINANCEDATA: {
      const dataArray = action.payload;
      //TODO
      return dataArray;
    }

    case ADD_FINANCEDP: {
      const datapoint = action.payload;
      return [...state, datapoint];
    }

    default:
      return state;
  }
};

export default financeData;

const initialFinanceData = [];
