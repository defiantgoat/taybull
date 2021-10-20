import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Tble } from "../index";
import { DATA1, COLUMNS1 } from "./test_helper";

describe("Tble", () => {
  it("creates a table with no data", () => {
    const component = render(<Tble data={[]} columns={{}} />);

    expect(component).not.toBeUndefined();
  });

  it("creates a table with data", async () => {
    const { container, findAllByText, debug } = render(
      <Tble
        data={DATA1}
        columns={COLUMNS1}
        className="my-table wd100"
        paginate={true}
      />
    );

    expect(container).not.toBeUndefined();
    debug();

    const [sortButton] = await findAllByText("N");

    act(() => {
      fireEvent.click(sortButton);
    });

    debug();

    const [descButton] = await findAllByText("D");

    act(() => {
      fireEvent.click(descButton);
    });

    debug();

    const [ascButton] = await findAllByText("A");

    act(() => {
      fireEvent.click(ascButton);
    });

    debug();
  });
});
