import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import {
  CUSTOMER_SALES_ORDER_DETAIL_ROUTE,
  CUSTOMER_SALES_ORDER_MASTER_ROUTE
} from "config/route-consts";
import React from "react";
import { Switch } from "react-router-dom";
import CustomerSalesOrderDetail from "./CustomerSalesOrderDetail/CustomerSalesOrderDetail";
import CustomerSalesOrderMaster from "./CustomerSalesOrderMaster/CustomerSalesOrderMaster";
import "./CustomerSalesOrderView.scss";


function CustomerSalesOrderView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={CUSTOMER_SALES_ORDER_MASTER_ROUTE}
        key={CUSTOMER_SALES_ORDER_MASTER_ROUTE} 
        component={CustomerSalesOrderMaster}
        auth={auth(CUSTOMER_SALES_ORDER_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={CUSTOMER_SALES_ORDER_DETAIL_ROUTE}
        key={CUSTOMER_SALES_ORDER_DETAIL_ROUTE}
        component={CustomerSalesOrderDetail}
        auth={auth(CUSTOMER_SALES_ORDER_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { CustomerSalesOrderMaster };
export default CustomerSalesOrderView;
