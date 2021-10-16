import React, { useState, useEffect } from "react";

interface PaginationProps {
  onPageRequested: (arg0: string) => void;
  pages: Record<number, number[]>;
}

const pageStrToInt = (pageStr: string): number => parseInt(pageStr, 10);

const Pagination: React.FC<PaginationProps> = ({ onPageRequested, pages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(-1)

  const handlePageRequest = (page: string) => {
    onPageRequested(page);
    setCurrentPage(parseInt(page, 10));
  };

  useEffect(() => {
    const keys = Object.keys(pages);
    const start = pageStrToInt(keys[0]);
    const end = pageStrToInt(keys[keys.length-1]);
    setStartPage(start);
    setEndPage(end);
    setCurrentPage(1);
  }, [pages]);

  return (<>
    <button
      onClick={() => handlePageRequest("1")}
      disabled={currentPage === startPage}
    >
      {"<<"}
    </button>
    <button
      onClick={() => handlePageRequest(`${currentPage - 1}`)}
      disabled={currentPage === 1}
    >
      {"<"}
    </button>
    {
      Object.keys(pages).map((pageNumber) => (
        <button
          onClick={() => handlePageRequest(pageNumber)}
          disabled={currentPage === pageStrToInt(pageNumber)}
        >
          {pageNumber}
        </button>
      ))
    }
    <button
      onClick={() => handlePageRequest(`${currentPage + 1}`)}
      disabled={currentPage === endPage}   
    >
      {">"}
    </button>
    <button
        onClick={() => handlePageRequest(`${endPage}`)}
        disabled={currentPage === endPage}    
    >
      {">>"}
    </button>
  </>);
};

export default Pagination;
