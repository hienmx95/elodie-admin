import React from "react";
import { Switch } from "react-router-dom";
import { PRODUCT_GROUPING_MASTER_ROUTE } from "config/route-consts";

import "./ProductGroupingView.scss";
import ProductGroupingTreeMaster from "./ProductGroupingTreeMaster/ProductGroupingTreeMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function ProductGroupingTreeView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={PRODUCT_GROUPING_MASTER_ROUTE}
        key={PRODUCT_GROUPING_MASTER_ROUTE}
        component={ProductGroupingTreeMaster}
        auth={auth(PRODUCT_GROUPING_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { ProductGroupingTreeMaster };
export default ProductGroupingTreeView;
