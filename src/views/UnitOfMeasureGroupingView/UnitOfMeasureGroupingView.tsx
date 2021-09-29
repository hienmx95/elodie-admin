import React from "react";
import { Switch } from "react-router-dom";
import {
  UNIT_OF_MEASURE_GROUPING_DETAIL_ROUTE,
  UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE,
} from "config/route-consts";

import "./UnitOfMeasureGroupingView.scss";
import UnitOfMeasureGroupingMaster from "./UnitOfMeasureGroupingMaster/UnitOfMeasureGroupingMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import UnitOfMeasureGroupingDetail from "./UnitOfMeasureGroupingDetail/UnitOfMeasureGroupingDetail";

function UnitOfMeasureGroupingView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE}
        key={UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE}
        component={UnitOfMeasureGroupingMaster}
        auth={auth(UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={UNIT_OF_MEASURE_GROUPING_DETAIL_ROUTE}
        key={UNIT_OF_MEASURE_GROUPING_DETAIL_ROUTE}
        component={UnitOfMeasureGroupingDetail}
        auth={auth(UNIT_OF_MEASURE_GROUPING_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { UnitOfMeasureGroupingMaster, UnitOfMeasureGroupingDetail };
export default UnitOfMeasureGroupingView;
