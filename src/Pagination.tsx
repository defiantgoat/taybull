import React, { useState, useEffect } from "react";

interface PaginationProps {
  onPageRequested: (arg0: string) => void;
  pages: Record<number, number[]>;
}

const pageStrToInt = (pageStr: string): number => parseInt(pageStr, 10);
const MAX_PAGE_BUTTONS = 10;

const Pagination: React.FC<PaginationProps> = ({ onPageRequested, pages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(-1);
  const [currentButtonRange, setCurrentButtonRange] = useState([1,-1]);

  const handlePageRequest = (page: string) => {
    const pageInt = pageStrToInt(page);
    const numKeys = Object.keys(pages).length + 1;

    if (pageInt < 1) {
      onPageRequested("1");
      setCurrentPage(1);
      return;
    }
    if (pageInt > numKeys) {
      onPageRequested(`${endPage}`);
      setCurrentPage(endPage);
      return;
    }

    onPageRequested(page);
    setCurrentPage(pageInt);
  };

  const handleButtonRangeIncrease = (step: number) => {
    const keys = Object.keys(pages);

    if (keys.length <= MAX_PAGE_BUTTONS) {
      return;
    }

    const newPageNumber = currentPage + step;
    const [curStart, curEnd] = currentButtonRange;
    
    // Do nothing if the page is in the current range.
    if (newPageNumber >= curStart && newPageNumber <= curEnd) {
      return;
    }

    if (newPageNumber > curEnd) {
      let start = curStart + MAX_PAGE_BUTTONS;
      let end = start + MAX_PAGE_BUTTONS - 1;
      if (end > keys.length) {
        end = keys.length;
      }
      setCurrentButtonRange([start, end]);
    }
  };

  const handleButtonRangeDecrease = (step: number) => {
    const keys = Object.keys(pages);

    const newPageNumber = currentPage - step;
    const [curStart, curEnd] = currentButtonRange;

    // Do nothing if you have 
    if (keys.length <= MAX_PAGE_BUTTONS) {
      return;
    }

    // Do nothing if the page is in the current range.
    if (newPageNumber >= curStart && newPageNumber <= curEnd) {
      return;
    }

    if (newPageNumber < curStart) {
      let start = curStart - MAX_PAGE_BUTTONS;
      let end = start + MAX_PAGE_BUTTONS - 1;
      if (start < 1) {
        start = 1;
        end = MAX_PAGE_BUTTONS - 1;
      }
      setCurrentButtonRange([start, end]);
    }
  };

  useEffect(() => {
    const keys = Object.keys(pages);
    const start = pageStrToInt(keys[0]);
    const end = pageStrToInt(keys[keys.length-1]);
    
    setStartPage(start);
    setEndPage(end);
    setCurrentPage(1);

    if (keys.length < MAX_PAGE_BUTTONS) {
      setCurrentButtonRange([1, keys.length]);
    } else {
      setCurrentButtonRange([1, MAX_PAGE_BUTTONS]);
    }

  }, [pages]);

  const renderPageButtons = (): JSX.Element[] => {
    const buttons = [] as JSX.Element[];
    const [start, end] = currentButtonRange;

    for (let x = start; x <= end; x++) {
      buttons.push(
        <button
          key={`button-page-${x}`}
          onClick={() => handlePageRequest(`${x}`)}
          disabled={currentPage === x}
        >
          {x}
        </button>
      )
    }

    return buttons;
  };

  return (<>
    {
      endPage > MAX_PAGE_BUTTONS && 
      <>
        <button
          data-testid="tble-pagination-express-decrease"
          onClick={() => {
            handlePageRequest(`${currentButtonRange[0] - MAX_PAGE_BUTTONS}`);
            handleButtonRangeDecrease(MAX_PAGE_BUTTONS);
          }}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          data-testid="tble-pagination-decrease-by-one"
          onClick={() => {
            handlePageRequest(`${currentPage - 1}`);
            handleButtonRangeDecrease(1);
          }}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
      </>
    }
    {
      renderPageButtons()
    }
    {
      endPage > MAX_PAGE_BUTTONS && 
      <>
        <button
          data-testid="tble-pagination-increase-by-one"
          onClick={() => {
            handlePageRequest(`${currentPage + 1}`);
            handleButtonRangeIncrease(1);
          }}
          disabled={currentPage === endPage}   
        >
          {">"}
        </button>
        <button
            data-testid="tble-pagination-express-increase"
            onClick={() => {
              handlePageRequest(`${currentButtonRange[0] + MAX_PAGE_BUTTONS}`);
              handleButtonRangeIncrease(MAX_PAGE_BUTTONS);
            }}
            disabled={currentPage === endPage || (currentButtonRange[1] - currentButtonRange[0] < MAX_PAGE_BUTTONS - 1)}    
        >
          {">>"}
        </button>
      </>
    }
  </>);
};

export default Pagination;
