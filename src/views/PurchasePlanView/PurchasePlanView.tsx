import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import {
  PURCHASE_PLAN_APPROVE_ROUTE,
  PURCHASE_PLAN_DETAIL_ROUTE,
  PURCHASE_PLAN_MASTER_ROUTE,
  PURCHASE_PLAN_PREVIEW_ROUTE,
  PURCHASE_PLAN_WAITING_ROUTE,
} from "config/route-consts";
import React from "react";
import { Switch } from "react-router-dom";
import PurchasePlanMaster from "./PurchasePlanMaster/PurchasePlanMaster";
import PurchasePlanQueryApprove from "./PurchasePlanQuery/PurchasePlanQueryApprove";
import {
  default as PurchasePlanDetail,
  default as PurchasePlanQueryDetail,
} from "./PurchasePlanQuery/PurchasePlanQueryDetail";
import PurchasePlanQueryWaiting from "./PurchasePlanQuery/PurchasePlanQueryWaiting";
import PurchasePlanQueryPreview from "./PurchasePlanQuery/PurchasePlanQueryPreview";
import "./PurchasePlanView.scss";

function PurchasePlanView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_PLAN_MASTER_ROUTE}
        key={PURCHASE_PLAN_MASTER_ROUTE}
        component={PurchasePlanMaster}
        auth={auth(PURCHASE_PLAN_MASTER_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PURCHASE_PLAN_DETAIL_ROUTE}
        key={PURCHASE_PLAN_DETAIL_ROUTE}
        component={PurchasePlanQueryDetail}
        auth={auth(PURCHASE_PLAN_DETAIL_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PURCHASE_PLAN_WAITING_ROUTE}
        key={PURCHASE_PLAN_WAITING_ROUTE}
        component={PurchasePlanQueryWaiting}
        auth={auth(PURCHASE_PLAN_WAITING_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PURCHASE_PLAN_APPROVE_ROUTE}
        key={PURCHASE_PLAN_APPROVE_ROUTE}
        component={PurchasePlanQueryApprove}
        auth={auth(PURCHASE_PLAN_APPROVE_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PURCHASE_PLAN_PREVIEW_ROUTE}
        key={PURCHASE_PLAN_PREVIEW_ROUTE}
        component={PurchasePlanQueryPreview}
        auth={auth(PURCHASE_PLAN_PREVIEW_ROUTE)}
      ></ProtectedRoute>
    </Switch>
  );
}

export { PurchasePlanMaster, PurchasePlanDetail };
export default PurchasePlanView;
