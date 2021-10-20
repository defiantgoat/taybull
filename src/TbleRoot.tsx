import React, { useEffect, useReducer } from "react";
import Pagination from "./Pagination";
import Table from "./Table";
import { TbleProps } from "../interfaces";
import {reducer, initStore, ACTIONS, SORT_DIRECTIONS} from "./store";

const TbleRoot: React.FC<TbleProps> = ({
  data = [],
  columns = {},
  paginate = false,
  resultsPerPage = 20,
  className = "",
}) => {
  const [state, dispatch] = useReducer(reducer, data, initStore);

  useEffect(() => {
    const pageLookup = {};
    const numPages = Math.ceil(data.length / resultsPerPage);

    if (data.length < 1) {
      // dispatch({type: ACTIONS.UPDATE_PAGE_LOOKUP, payload: pageLookup});
      // dispatch({type: ACTIONS.SET_DATA, payload: []});
      return;
    }

    if (!paginate) {
      dispatch({type: ACTIONS.SET_CURRENT_RANGE, payload: [0, data.length]});
      return;
    }

    for (let x = 0; x < numPages; x++) {
      const start = x * resultsPerPage;
      let end = start + resultsPerPage - 1;

      if (x === (numPages - 1)) {
        end = data.length - 1;
      }

      pageLookup[x+1] = [start, end];
    };

    const [start, end] = pageLookup["1"];

    dispatch({type: ACTIONS.UPDATE_PAGE_LOOKUP, payload: pageLookup});
    dispatch({type: ACTIONS.SET_DATA, payload: data});
    dispatch({type: ACTIONS.SET_CURRENT_RANGE, payload: [start, end]});
    dispatch({type: ACTIONS.SET_SORT_FIELD, payload: ["", SORT_DIRECTIONS.NONE]});
  }, [data, paginate, resultsPerPage, columns]);

  useEffect(() => {
    const [field, direction] = state.sort;
    
    if (direction === SORT_DIRECTIONS.NONE) {
      dispatch({type: ACTIONS.SET_DATA, payload: data});
      return;
    }

    const sortedData = [...data].sort((a, b) => {
      if (direction === SORT_DIRECTIONS.DESC) {
        return b[field] - a[field];
      }
      return a[field] - b[field];
    });
    dispatch({type: ACTIONS.SET_DATA, payload: sortedData});
}, [state.sort]);

  const getDataForPage = (page: string) => {
    const [start, end] = state.pageLookup[page];
    dispatch({type: ACTIONS.SET_CURRENT_RANGE, payload: [start, end]});
  };

  return (
    <div className={`tble${className > "" ? " "+className : ""}`}>
      <div className="tble_container">
        <Table data={state.filteredData} columns={columns} range={state.currentRange} sort={state.sort} dispatch={dispatch} />
      </div>
      {paginate && state.filteredData.length > 0 && (
        <div className="tble_pagination_container">
          <Pagination pages={state.pageLookup} onPageRequested={getDataForPage} />
        </div>
      )}
    </div>
  );
};

export default TbleRoot;
