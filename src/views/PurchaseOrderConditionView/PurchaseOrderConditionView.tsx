import React from "react";
import { Switch } from "react-router-dom";
import { PURCHASE_ORDER_CONDITION_MASTER_ROUTE } from "config/route-consts";

import "./PurchaseOrderConditionView.scss";
import PurchaseOrderConditionMaster from "./PurchaseOrderConditionMaster/PurchaseOrderConditionMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function PurchaseOrderConditionView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_ORDER_CONDITION_MASTER_ROUTE}
        key={PURCHASE_ORDER_CONDITION_MASTER_ROUTE}
        component={PurchaseOrderConditionMaster}
        auth={auth(PURCHASE_ORDER_CONDITION_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { PurchaseOrderConditionMaster };
export default PurchaseOrderConditionView;
