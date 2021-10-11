import React, { useState } from "react";

interface PaginationProps {
  onPageUpdated: (arg0: string) => void;
  pages: Record<number, number[]>;
}

const Pagination: React.FC<PaginationProps> = ({ onPageUpdated, pages }) => {
  return <div>{
    Object.entries(pages).map(([key, value]) => <button onClick={() => onPageUpdated(key)}>{key}</button>)
  }</div>;
};

export default Pagination;
