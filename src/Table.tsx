import React, { useState } from "react";

interface TableProps {
  data: Array<Record<string, any>>;
  columns: Record<string, any>;
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
          {
            Object.values(columns).map((column) => {
              return <th key={`th-${column['field']}`}>{column['title']}</th>
            })
          }
          </tr>
        </thead>
        <tbody>
        {
          data.map((record, i) => {
            return (
              <tr>
                {
                  Object.entries(record).map(([key,value]) => {
                    const rowData = data[i];
                    const render = columns[key]['render'] || null;


                    return <td>{render ? render(rowData) : value}</td>
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  );
};

export default Table;
