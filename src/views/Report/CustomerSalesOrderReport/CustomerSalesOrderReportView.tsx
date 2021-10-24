import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import {
    CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE
} from "config/route-consts";
import React from "react";
import { Switch } from "react-router-dom";
import CustomerSalesOrderItemReportView from "./CustomerSalesOrderItemReportView/CustomerSalesOrderItemReport";

function CustomerSalesOrderReportView() {
    const { auth } = useCheckAuthorized();
    return (
        <Switch>
            <ProtectedRoute
                path={CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE}
                key={CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE}
                component={CustomerSalesOrderItemReportView}
                auth={auth(CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE)}
            />
        </Switch>
    );
}
export { CustomerSalesOrderItemReportView };
export default CustomerSalesOrderReportView;
