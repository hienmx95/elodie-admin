import React from "react";
import { Switch } from "react-router-dom";
import {
  SUPPLIER_DETAIL_ROUTE,
  SUPPLIER_MASTER_ROUTE,
} from "config/route-consts";

import "./SupplierView.scss";
import SupplierMaster from "./SupplierMaster/SupplierMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import SupplierDetail from "./SupplierDetail/SupplierDetail";

function SupplierView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={SUPPLIER_MASTER_ROUTE}
        key={SUPPLIER_MASTER_ROUTE}
        component={SupplierMaster}
        auth={auth(SUPPLIER_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={SUPPLIER_DETAIL_ROUTE}
        key={SUPPLIER_DETAIL_ROUTE}
        component={SupplierDetail}
        auth={auth(SUPPLIER_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { SupplierMaster, SupplierDetail };
export default SupplierView;
