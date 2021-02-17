import { LOAD_FINANCEDATA, ADD_FINANCEDP } from "../actionTypes.js";

export function loadFinanceData(dataArray) {
  return {
    type: LOAD_FINANCEDATA,
    payload: dataArray,
  };
}

export function addFinanceItem(datapoint) {
  return {
    type: ADD_FINANCEDP,
    payload: datapoint,
  };
}
