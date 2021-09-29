import React from "react";
import { Switch } from "react-router-dom";
import {
  REQUEST_FOR_QUOTATION_MASTER_ROUTE,
  REQUEST_FOR_QUOTATION_DETAIL_ROUTE,
} from "config/route-consts";
import "./RequestForQuotationView.scss";
import RequestForQuotationDetail from "./RequestForQuotationDetail/RequestForQuotationDetail";
import RequestForQuotationMaster from "./RequestForQuotationMaster/RequestForQuotationMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function RequestForQuotationView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={REQUEST_FOR_QUOTATION_MASTER_ROUTE}
        key={REQUEST_FOR_QUOTATION_MASTER_ROUTE}
        component={RequestForQuotationMaster}
        auth={auth(REQUEST_FOR_QUOTATION_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={REQUEST_FOR_QUOTATION_DETAIL_ROUTE}
        key={REQUEST_FOR_QUOTATION_DETAIL_ROUTE}
        component={RequestForQuotationDetail}
        auth={auth(REQUEST_FOR_QUOTATION_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { RequestForQuotationMaster, RequestForQuotationDetail };
export default RequestForQuotationView;
