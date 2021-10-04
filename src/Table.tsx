import React from "react";
import {TableProps} from "../interfaces";

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.values(columns).map((column) => {
              return <th key={`th-${column["field"]}`}>{column["title"]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((record, i) => {
            return (
              <tr key={`row-${i}`}>
                {Object.entries(record).map(([key, value]) => {
                  const rowData = data[i];
                  const render = columns[key]["render"] || null;
                  return (
                    <td key={`row-${i}-${key}`}>
                      {render ? render(rowData) : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
