import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { seedPageLookup } from "./test_helper";
import Pagination from "../src/Pagination";

const pageRequestMock = jest.fn();

describe("Pagination", () => {
  it("creates pagination with less than 10 pages", () => {
    const lookup = seedPageLookup(55, 20);
    const {getByTestId, getByText} = render(<Pagination pages={lookup} onPageRequested={pageRequestMock} />);
    
    try {
      getByTestId("tble-pagination-express-increase");
    } catch (e) {
      expect(e).not.toBeUndefined();
    }

    try {
      getByTestId("tble-pagination-express-decrease");
    } catch (e) {
      expect(e).not.toBeUndefined();
    }

    const pageTwoBtn = getByText("2");
    act(() => {
      fireEvent.click(pageTwoBtn);
      expect(pageRequestMock).toHaveBeenCalledWith("2");
    });
  });

  it("creates pagination with more than 10 pages", () => {
    const lookup = seedPageLookup(661, 20);
    expect(Object.keys(lookup).length).toEqual(34);
    
    const {getByTestId} = render(<Pagination pages={lookup} onPageRequested={pageRequestMock} />);

    const expressIncreaseBtn = getByTestId("tble-pagination-express-increase");
    const increaseByOneBtn = getByTestId("tble-pagination-increase-by-one");
    const expressDecreaseBtn = getByTestId("tble-pagination-express-decrease");
    const decreaseByOneBtn = getByTestId("tble-pagination-decrease-by-one");
    
    act(() => {
      fireEvent.click(increaseByOneBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("2");
    });

    act(() => {
      fireEvent.click(increaseByOneBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("3");
    });

    act(() => {
      fireEvent.click(expressIncreaseBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("11");
    });

    act(() => {
      fireEvent.click(expressIncreaseBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("21");
    });

    act(() => {
      fireEvent.click(expressIncreaseBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("31");
    });

    expect(expressIncreaseBtn.getAttribute("disabled")).not.toBeUndefined();

    act(() => {
      fireEvent.click(decreaseByOneBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("30");
    });

    act(() => {
      fireEvent.click(decreaseByOneBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("29");
    });

    act(() => {
      fireEvent.click(expressDecreaseBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("11");
    });

    act(() => {
      fireEvent.click(expressDecreaseBtn);
      expect(pageRequestMock).toHaveBeenLastCalledWith("1");
    });
  });

});
