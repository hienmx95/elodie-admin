import React from "react";
import { Switch } from "react-router-dom";
import {
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_MASTER_ROUTE,
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_DETAIL_ROUTE,
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_APPROVE_ROUTE,
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_PREVIEW_ROUTE,
} from "config/route-consts";

import "./PurchaseRequestPrincipalContractView.scss";
import PurchaseRequestPrincipalContractDetail from "./PurchaseRequestPrincipalContractDetail/PurchaseRequestPrincipalContractDetail";
import PurchaseRequestPrincipalContractMaster from "./PurchaseRequestPrincipalContractMaster/PurchaseRequestPrincipalContractMaster";
import PurchaseRequestPrincipalContractPreview from "./PurchaseRequestPrincipalContractMaster/PurchaseRequestPrincipalContractPreview";
import PurchaseRequestPrincipalContractApprove from "./PurchaseRequestPrincipalContractDetail/PurchaseRequestPrincipalContractApprove";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function PurchaseRequestPrincipalContractView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_MASTER_ROUTE}
        key={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_MASTER_ROUTE}
        component={PurchaseRequestPrincipalContractMaster}
        auth={auth(PURCHASE_REQUEST_PRINCIPAL_CONTRACT_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_DETAIL_ROUTE}
        key={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_DETAIL_ROUTE}
        component={PurchaseRequestPrincipalContractDetail}
        auth={auth(PURCHASE_REQUEST_PRINCIPAL_CONTRACT_DETAIL_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_PREVIEW_ROUTE}
        key={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_PREVIEW_ROUTE}
        component={PurchaseRequestPrincipalContractPreview}
        auth={auth(PURCHASE_REQUEST_PRINCIPAL_CONTRACT_PREVIEW_ROUTE)}
      />
      <ProtectedRoute
        path={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_APPROVE_ROUTE}
        key={PURCHASE_REQUEST_PRINCIPAL_CONTRACT_APPROVE_ROUTE}
        component={PurchaseRequestPrincipalContractApprove}
        auth={auth(PURCHASE_REQUEST_PRINCIPAL_CONTRACT_APPROVE_ROUTE)}
      />
    </Switch>
  );
}

export {
  PurchaseRequestPrincipalContractMaster,
  PurchaseRequestPrincipalContractDetail,
};
export default PurchaseRequestPrincipalContractView;
