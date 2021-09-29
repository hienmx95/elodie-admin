import React from "react";
import { Switch } from "react-router-dom";
import {
  PURCHASE_REQUEST_MASTER_ROUTE,
  PURCHASE_REQUEST_DETAIL_ROUTE,
  PURCHASE_REQUEST_PREVIEW_ROUTE,
  PURCHASE_REQUEST_APPROVE_ROUTE,
} from "config/route-consts";

import "./PurchaseRequestView.scss";
import PurchaseRequestDetail from "./PurchaseRequestDetail/PurchaseRequestDetail";
import PurchaseRequestMaster from "./PurchaseRequestMaster/PurchaseRequestMaster";
import PurchaseRequestPreview from "./PurchaseRequestMaster/PurchaseRequestPreview";
import PurchaseRequestApprove from "./PurchaseRequestDetail/PurchaseRequestApprove";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function PurchaseRequestView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_REQUEST_MASTER_ROUTE}
        key={PURCHASE_REQUEST_MASTER_ROUTE}
        component={PurchaseRequestMaster}
        auth={auth(PURCHASE_REQUEST_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_DETAIL_ROUTE}
        key={PURCHASE_REQUEST_DETAIL_ROUTE}
        component={PurchaseRequestDetail}
        auth={auth(PURCHASE_REQUEST_DETAIL_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PREVIEW_ROUTE}
        key={PURCHASE_REQUEST_PREVIEW_ROUTE}
        component={PurchaseRequestPreview}
        auth={auth(PURCHASE_REQUEST_PREVIEW_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_APPROVE_ROUTE}
        key={PURCHASE_REQUEST_APPROVE_ROUTE}
        component={PurchaseRequestApprove}
        auth={auth(PURCHASE_REQUEST_APPROVE_ROUTE)}
      />
    </Switch>
  );
}

export { PurchaseRequestMaster, PurchaseRequestDetail };
export default PurchaseRequestView;
