import React from "react";
import { Switch } from "react-router-dom";
import {
  CUSTOMER_MASTER_ROUTE,
  CUSTOMER_DETAIL_ROUTE,
} from "config/route-consts";

import "./ProductView.scss";
import CustomerMaster from "./CustomerMaster/CustomerMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import CustomerDetail from "./CustomerDetail/CustomerDetail";

function CustomerView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={CUSTOMER_MASTER_ROUTE}
        key={CUSTOMER_MASTER_ROUTE}
        component={CustomerMaster}
        auth={auth(CUSTOMER_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={CUSTOMER_DETAIL_ROUTE}
        key={CUSTOMER_DETAIL_ROUTE}
        component={CustomerDetail}
        auth={auth(CUSTOMER_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { CustomerMaster };
export default CustomerView;
