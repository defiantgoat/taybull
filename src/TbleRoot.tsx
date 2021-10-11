import React, { useEffect, useReducer } from "react";
import Pagination from "./Pagination";
import Table from "./Table";
import DataManager from "./DataManager";
import { TbleProps } from "../interfaces";
import {reducer, initStore} from "./store";

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

    for (let x = 0; x < numPages; x++) {
      const start = x * resultsPerPage;
      let end = start + resultsPerPage - 1;

      if (x === (numPages - 1)) {
        end = data.length - 1;
      }

      pageLookup[x+1] = [start, end];
    };

    dispatch({type: "UPDATE_PAGE_LOOKUP", payload: pageLookup});
    const [start, end] = pageLookup["1"];
    const newData = data.slice(start, end+1);
    dispatch({type: "SET_DATA", payload: newData});
  }, [data, paginate, resultsPerPage]);

  const filterData = (page: string) => {
    const [start, end] = state.pageLookup[page];
    const newData = data.slice(start, end+1);
    dispatch({type: "SET_DATA", payload: newData});
  };

  return (
    <div className={`tble${className > "" ? " "+className : ""}`}>
      <div className="tble_container">
        <Table data={state.filteredData} columns={columns} />
      </div>
      {paginate && (
        <div className="tble_pagination_container">
          <Pagination pages={state.pageLookup} onPageUpdated={filterData} />
        </div>
      )}
    </div>
  );
};

export default TbleRoot;
