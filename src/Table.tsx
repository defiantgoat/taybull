import React, { useState } from "react";

interface TableProps {
  data: Array<Record<string, any>>;
  columns: Record<string, any>;
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return <div>table</div>;
};

export default Table;
