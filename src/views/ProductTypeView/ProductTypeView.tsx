import React from "react";
import { Switch } from "react-router-dom";
import { PRODUCT_TYPE_MASTER_ROUTE } from "config/route-consts";

import "./ProductTypeView.scss";
import ProductTypeMaster from "./ProductTypeMaster/ProductTypeMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function ProductTypeView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={PRODUCT_TYPE_MASTER_ROUTE}
        key={PRODUCT_TYPE_MASTER_ROUTE}
        component={ProductTypeMaster}
        auth={auth(PRODUCT_TYPE_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { ProductTypeMaster };
export default ProductTypeView;
