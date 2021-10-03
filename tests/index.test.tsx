import React from "react";
import { render } from "@testing-library/react";
import { Tble } from "../index";

describe("Tble", () => {
  it("creates a table with no data", () => {
    const component = render(<Tble data={[]} columns={[]} />);

    expect(component).not.toBeUndefined();
  });

  it("creates a table with data", () => {
    const component = render(
      <Tble
        data={[{ id: 1 }, { id: 2 }]}
        columns={[{ id: { render: () => <div>d</div> } }]}
      />
    );

    expect(component).not.toBeUndefined();
  });
});