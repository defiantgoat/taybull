import { State, Reducer, Data } from "../interfaces";

const initialState: State = {
  rawData: [],
  filteredData: [],
  pageLookup: {},
  currentPage: 1
};

export const initStore = (data: Data): State => {
  return {
    rawData: data,
    filteredData: data,
    pageLookup: {  },
    currentPage: 1
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
    case "UPDATE_PAGE_LOOKUP": 
      return {
        ...state,
        pageLookup: payload
      };
    default:
      return initialState;
  }
};
