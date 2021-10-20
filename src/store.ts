import { State, Reducer, Data, SortDirection } from "../interfaces";

export const ACTIONS = {
  UPDATE_DATA: "UPDATE_DATA",
  SET_DATA: "SET_DATA",
  UPDATE_PAGE_LOOKUP: "UPDATE_PAGE_LOOKUP",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_SORT_FIELD: "SET_SORT_FIELD",
  SET_COLUMNS: "SET_COLUMNS",
  UPDATE_COLUMN_SORT: "UPDATE_COLUMN_SORT",
  SET_CURRENT_RANGE: "SET_CURRENT_RANGE"
}

export const SORT_DIRECTIONS: Record<string, SortDirection>  = {
  ASC: "ASC",
  DESC: "DESC",
  NONE: "NONE"
};

const initialState: State = {
  rawData: [],
  filteredData: [],
  pageLookup: {},
  currentPage: 1,
  currentRange: [0, -1],
  sort: ["", SORT_DIRECTIONS.NONE]
};

export const initStore = (data: Data): State => {
  return {
    rawData: data,
    filteredData: data,
    pageLookup: {},
    currentPage: 1,
    currentRange: [0, -1],
    sort: ["", SORT_DIRECTIONS.NONE]
  };
};

export const reducer: Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.UPDATE_DATA:
      return {
        ...state,
        rawData: payload,
      };
    case ACTIONS.SET_DATA:
      return {
        ...state,
        filteredData: payload,
      };
    case ACTIONS.UPDATE_PAGE_LOOKUP: 
      return {
        ...state,
        pageLookup: payload
      };
    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload
      };
    case ACTIONS.SET_CURRENT_RANGE: 
      return {
        ...state,
        currentRange: payload
      };
    case ACTIONS.SET_SORT_FIELD:
      let {field} = payload;
      const [curField, curDir] = state.sort;
      const sort = [field, SORT_DIRECTIONS.DESC] as [string, SortDirection];
      if (field == curField) {
        switch (curDir) {
          case SORT_DIRECTIONS.NONE: 
            sort[1] = SORT_DIRECTIONS.DESC;
            break;
          case SORT_DIRECTIONS.DESC:
            sort[1] = SORT_DIRECTIONS.ASC;
            break;
          case SORT_DIRECTIONS.ASC:
            sort[0] = "";
            sort[1] = SORT_DIRECTIONS.NONE;
            break;
        }
      } 
      return {
        ...state,
        sort
      };
    default:
      return initialState;
  }
};
