import React from "react";
import { Switch } from "react-router-dom";
import { TAX_TYPE_MASTER_ROUTE } from "config/route-consts";

import "./TaxTypeView.scss";
import TaxTypeMaster from "./TaxTypeMaster/TaxTypeMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function TaxTypeView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={TAX_TYPE_MASTER_ROUTE}
        key={TAX_TYPE_MASTER_ROUTE}
        component={TaxTypeMaster}
        auth={auth(TAX_TYPE_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { TaxTypeMaster };
export default TaxTypeView;
