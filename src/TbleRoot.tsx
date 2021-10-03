import React, { useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";

interface TbleProps {
  data: Array<Record<string, any>>;
  columns: Array<Record<string, any>>;
  paginate?: boolean;
  resultsPerPage?: number;
}

// Tble has
// 1. Table -> Just draws the table with the data and column specs
// 2. DataManager -> takes in filters and spits out data array
// 3. Pagination -> Takes number of pages and creates a ui that says this is the page i want.

const TbleRoot: React.FC<TbleProps> = ({
  data,
  columns,
  paginate = false,
  resultsPerPage = 20,
}) => {
  // Decides on number of pages

  return (
    <>
      <Table data={[]} columns={{}} />
      {paginate && (
        <Pagination onPageUpdated={(pageNumber) => console.log(pageNumber)} />
      )}
    </>
  );
};

export default TbleRoot;
