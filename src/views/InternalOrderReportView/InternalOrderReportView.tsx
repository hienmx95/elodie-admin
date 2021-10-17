import React from "react";
import { Switch } from "react-router-dom";
import { INTERNAL_ORDER_REPORT_MASTER_ROUTE } from "config/route-consts";

import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import InternalOrderReportMaster from "./InternalOrderReportMaster";

function InternalOrderReportView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={INTERNAL_ORDER_REPORT_MASTER_ROUTE}
        key={INTERNAL_ORDER_REPORT_MASTER_ROUTE}
        component={InternalOrderReportMaster}
        auth={auth(INTERNAL_ORDER_REPORT_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { InternalOrderReportMaster };
export default InternalOrderReportView;
