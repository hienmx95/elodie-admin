import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

import SelectAddOption from "./SelectAddOption";

describe("Select", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <SelectAddOption />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
