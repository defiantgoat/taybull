import React, { useState } from "react";

interface PaginationProps {
  onPageUpdated: (arg0: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageUpdated }) => {
  return <div>pagination</div>;
};

export default Pagination;
