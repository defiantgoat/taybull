import React from "react";
import { TableProps } from "../interfaces";

const Table: React.FC<TableProps> = ({ data, columns, onSort }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.values(columns).map((column) => {
              const {field, title, sortable} = column;
              return (
                <th
                  key={`th-${field}`}
                  onClick={(e) => sortable && onSort(field, 'asc')}
                >
                  {sortable && "v"}
                  {title}
                </th>
              );
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
