import React from "react";
import { Switch } from "react-router-dom";
import { UNIT_OF_MEASURE_MASTER_ROUTE } from "config/route-consts";

import "./UnitOfMeasureView.scss";
import UnitOfMeasureMaster from "./UnitOfMeasureMaster/UnitOfMeasureMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function UnitOfMeasureView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={UNIT_OF_MEASURE_MASTER_ROUTE}
        key={UNIT_OF_MEASURE_MASTER_ROUTE}
        component={UnitOfMeasureMaster}
        auth={auth(UNIT_OF_MEASURE_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { UnitOfMeasureMaster };
export default UnitOfMeasureView;
