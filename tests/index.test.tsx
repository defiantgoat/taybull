import React from "react";
import { render } from "@testing-library/react";
import { Tble } from "../index";
import {DATA1, COLUMNS1} from './test_helper';

describe("Tble", () => {
  it("creates a table with no data", () => {
    const component = render(<Tble data={[]} columns={[]} />);

    expect(component).not.toBeUndefined();
  });

  it("creates a table with data", () => {
    const component = render(
      <Tble
        data={DATA1}
        columns={COLUMNS1}
      />
    );

    expect(component).not.toBeUndefined();

    component.debug();
  });
});
