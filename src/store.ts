import { State, Reducer, Data } from "../interfaces";

const initialState: State = {
  rawData: [],
  filteredData: [],
  pageLookup: {},
};

export const initStore = (data: Data): State => {
  return {
    rawData: data,
    filteredData: data,
    pageLookup: { 1: [0, data.length - 1] },
  };
};

export const reducer: Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DATA":
      return {
        ...state,
        rawData: payload,
      };
    case "SET_DATA":
      return {
        ...state,
        filteredData: payload,
      };
    default:
      return initialState;
  }
};
