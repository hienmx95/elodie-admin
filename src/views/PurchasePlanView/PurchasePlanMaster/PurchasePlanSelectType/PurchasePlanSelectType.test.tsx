import React from "react";
import { MemoryRouter } from "react-router-dom";
import PurchasePlanSelectType from "./PurchasePlanSelectType";

describe("PurchasePlanMaster", () => {
  it("renders without crashing", async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchasePlanSelectType />
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
