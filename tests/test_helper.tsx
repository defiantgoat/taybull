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
  },
  profits: {
    title: "Profits",
    field: "profits",
    render: (rowData: any) => <p>{`$${rowData["profits"]}`}</p>,
  },
  homepage: {
    title: "Website",
    field: "homepage",
    render: (rowData: any) => (
      <a style={{ backgroundColor: "blue" }} href={rowData["homepage"]}>
        {rowData["company_name"]}
      </a>
    ),
  },
};
