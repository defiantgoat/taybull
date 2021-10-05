import React, { useReducer } from "react";
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

  return (
    <div className={`tble${className > "" ? " "+className : ""}`}>
      <div className="tble_container">
        <Table data={state.filteredData} columns={columns} />
      </div>
      {paginate && (
        <div className="tble_pagination_container">
          <Pagination onPageUpdated={(pageNumber) => console.log(pageNumber)} />
        </div>
      )}
    </div>
  );
};

export default TbleRoot;
