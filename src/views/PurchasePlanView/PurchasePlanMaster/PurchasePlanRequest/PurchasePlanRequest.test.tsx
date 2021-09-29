import React from "react";
import { MemoryRouter } from "react-router-dom";
import PurchasePlanRequest from "./PurchasePlanRequest";

describe("PurchasePlanMaster", () => {
  it("renders without crashing", async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchasePlanRequest />
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
