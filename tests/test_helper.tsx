import React from "react";

export const DATA1 = [
  {
    id: 1,
    company_name: "Big Top",
    profits: 12000,
    homepage: "http://www.defiantgoat.com",
  },
  {
    id: 2,
    company_name: "Jim Jam",
    profits: 12000,
    homepage: "http://www.google.com",
  },
  {
    id: 3,
    company_name: "One Big Long Title For A Goofy Company",
    profits: 132000,
    homepage: "http://www.yahoo.com",
  },
];

export const COLUMNS1 = {
  id: {
    title: "ID",
    field: "id",
  },
  company_name: {
    title: "Company Name",
    field: "company_name",
    render: (rowData: any) => <p>{rowData["company_name"]}</p>,
    sortable: true
  },
  profits: {
    title: "Profits",
    field: "profits",
    render: (rowData: any) => <p>{`$${rowData["profits"]}`}</p>,
    sortable: true
  },
  homepage: {
    title: "Website",
    field: "homepage",
    render: (rowData: any) => (
      <a style={{ backgroundColor: "blue" }} href={rowData["homepage"]}>
        {rowData["company_name"]}
      </a>
    ),
    sortable: true
  },
};

export const seedTableData = (
  numberOfRows: number
): Array<Record<string, any>> => {
  const data: Array<Record<string, any>> = [];

  for (let i = 0; i < numberOfRows; i++) {
    data.push({
      id: i,
      company_name: `Company ${i}`,
      profits: Math.random() * 100000,
      homepage: "http:://random.random",
    });
  }

  return data;
};

export const seedPageLookup = (
  numberOfRows: number,
  resultsPerPage = 20
): Record<number, number[]> => {
  const pageLookup = {};
  const numPages = Math.ceil(numberOfRows / resultsPerPage);

  for (let x = 0; x < numPages; x++) {
    const start = x * resultsPerPage;
    let end = start + resultsPerPage - 1;

    if (x === numPages - 1) {
      end = numberOfRows - 1;
    }

    pageLookup[x + 1] = [start, end];
  }

  return pageLookup;
};
