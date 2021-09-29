import React from "react";
import { Switch } from "react-router-dom";
import {
  PURCHASE_ORDER_MASTER_ROUTE,
  PURCHASE_ORDER_DETAIL_ROUTE,
} from "config/route-consts";
import "./PurchaseOrderView.scss";
import PurchaseOrderDetail from "./PurchaseOrderDetail/PurchaseOrderDetail";
import PurchaseOrderMaster from "./PurchaseOrderMaster/PurchaseOrderMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function PurchaseOrderView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_ORDER_MASTER_ROUTE}
        key={PURCHASE_ORDER_MASTER_ROUTE}
        component={PurchaseOrderMaster}
        auth={auth(PURCHASE_ORDER_MASTER_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PURCHASE_ORDER_DETAIL_ROUTE}
        key={PURCHASE_ORDER_DETAIL_ROUTE}
        component={PurchaseOrderDetail}
        auth={auth(PURCHASE_ORDER_DETAIL_ROUTE)}
      ></ProtectedRoute>
    </Switch>
  );
}

export { PurchaseOrderMaster, PurchaseOrderDetail };
export default PurchaseOrderView;
