import React from "react";
import { TableProps } from "../interfaces";
import { ACTIONS, SORT_DIRECTIONS } from "./store";

const Table: React.FC<TableProps> = ({
  data,
  columns,
  range,
  sort,
  dispatch,
}) => {
  const renderRows = (): JSX.Element[] => {
    const [start, end] = range;
    const rows = [] as JSX.Element[];
    for (let x = start; x <= end; x++) {
      const record = data[x];
      rows.push(
        <tr key={`row-${x}`}>
          {Object.entries(record).map(([key, value]) => {
            const rowData = data[x];
            const render = columns[key]?.render || null;
            return (
              <td key={`row-${x}-${key}`}>
                {render ? render(rowData) : value}
              </td>
            );
          })}
        </tr>
      );
    }
    return rows;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.values(columns).map((column) => {
              const { field, title, sortable } = column;
              const [sortField, sortDirection] = sort;
              return (
                <th key={`th-${field}`}>
                  {sortable && (
                    <button
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.SET_SORT_FIELD,
                          payload: { field },
                        })
                      }
                    >
                      {sortField === field
                        ? sortDirection === SORT_DIRECTIONS.ASC
                          ? "A"
                          : "D"
                        : "N"}
                    </button>
                  )}
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </>
  );
};

export default Table;
