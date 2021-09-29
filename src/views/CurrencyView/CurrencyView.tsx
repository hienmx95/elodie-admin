import React from "react";
import { Switch } from "react-router-dom";
import { CURRENCY_MASTER_ROUTE } from "config/route-consts";

import "./CurrencyView.scss";
import CurrencyMaster from "./CurrencyMaster/CurrencyMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function CurrencyView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={CURRENCY_MASTER_ROUTE}
        key={CURRENCY_MASTER_ROUTE}
        component={CurrencyMaster}
        auth={auth(CURRENCY_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { CurrencyMaster };
export default CurrencyView;
