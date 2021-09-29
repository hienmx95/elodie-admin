import React from "react";
import { MemoryRouter } from "react-router-dom";
import PurchasePlanTracking from "./PurchasePlanTracking";

describe("PurchasePlanMaster", () => {
  it("renders without crashing", async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PurchasePlanTracking />
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
