import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import {
  PRINCIPAL_CONTRACT_APPROVE_ROUTE,
  PRINCIPAL_CONTRACT_DETAIL_ROUTE,
  PRINCIPAL_CONTRACT_MASTER_ROUTE,
  PRINCIPAL_CONTRACT_PREVIEW_ROUTE,
} from "config/route-consts";
import React from "react";
import { Switch } from "react-router-dom";
import PrincipalContractDetail from "./PrincipalContractDetail/PrincipalContractDetail";
import PrincipalContractMaster from "./PrincipalContractMaster/PrincipalContractMaster";
import PrincipalContractPreview from "./PrincipalContractMaster/PrincipalContractPreview";
import PrincipalContractApprove from "./PrincipalContractDetail/PrincipalContractApprove";
import "./PrincipalContractView.scss";

function PrincipalContractView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PRINCIPAL_CONTRACT_MASTER_ROUTE}
        key={PRINCIPAL_CONTRACT_MASTER_ROUTE}
        component={PrincipalContractMaster}
        auth={auth(PRINCIPAL_CONTRACT_MASTER_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PRINCIPAL_CONTRACT_DETAIL_ROUTE}
        key={PRINCIPAL_CONTRACT_DETAIL_ROUTE}
        component={PrincipalContractDetail}
        auth={auth(PRINCIPAL_CONTRACT_DETAIL_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PRINCIPAL_CONTRACT_PREVIEW_ROUTE}
        key={PRINCIPAL_CONTRACT_PREVIEW_ROUTE}
        component={PrincipalContractPreview}
        auth={auth(PRINCIPAL_CONTRACT_PREVIEW_ROUTE)}
      ></ProtectedRoute>
      <ProtectedRoute
        path={PRINCIPAL_CONTRACT_APPROVE_ROUTE}
        key={PRINCIPAL_CONTRACT_APPROVE_ROUTE}
        component={PrincipalContractApprove}
        auth={auth(PRINCIPAL_CONTRACT_APPROVE_ROUTE)}
      ></ProtectedRoute>
    </Switch>
  );
}

export { PrincipalContractMaster, PrincipalContractDetail };
export default PrincipalContractView;
