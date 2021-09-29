import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import {
  PURCHASE_REQUEST_PLAN_APPROVE_ROUTE,
  PURCHASE_REQUEST_PLAN_DETAIL_ROUTE,
  PURCHASE_REQUEST_PLAN_MASTER_ROUTE,
  PURCHASE_REQUEST_PLAN_PREVIEW_ROUTE,
} from "config/route-consts";
import React from "react";
import { Switch } from "react-router-dom";
import PurchaseRequestPlanApprove from "./PurchaseRequestPlanDetail/PurchaseRequestPlanApprove";
import PurchaseRequestPlanDetail from "./PurchaseRequestPlanDetail/PurchaseRequestPlanDetail";
import PurchaseRequestPlanMaster from "./PurchaseRequestPlanMaster/PurchaseRequestPlanMaster";
import PurchaseRequestPlanPreview from "./PurchaseRequestPlanMaster/PurchaseRequestPlanPreview";
import "./PurchaseRequestPlanView.scss";

function PurchaseRequestPlanView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_REQUEST_PLAN_MASTER_ROUTE}
        key={PURCHASE_REQUEST_PLAN_MASTER_ROUTE}
        component={PurchaseRequestPlanMaster}
        auth={auth(PURCHASE_REQUEST_PLAN_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PLAN_DETAIL_ROUTE}
        key={PURCHASE_REQUEST_PLAN_DETAIL_ROUTE}
        component={PurchaseRequestPlanDetail}
        auth={auth(PURCHASE_REQUEST_PLAN_DETAIL_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PLAN_APPROVE_ROUTE}
        key={PURCHASE_REQUEST_PLAN_APPROVE_ROUTE}
        component={PurchaseRequestPlanApprove}
        auth={auth(PURCHASE_REQUEST_PLAN_APPROVE_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PLAN_PREVIEW_ROUTE}
        key={PURCHASE_REQUEST_PLAN_PREVIEW_ROUTE}
        component={PurchaseRequestPlanPreview}
        auth={auth(PURCHASE_REQUEST_PLAN_PREVIEW_ROUTE)}
      />
    </Switch>
  );
}

export { PurchaseRequestPlanMaster, PurchaseRequestPlanDetail };
export default PurchaseRequestPlanView;
