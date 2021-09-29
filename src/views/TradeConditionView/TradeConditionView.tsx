import React from "react";
import { Switch } from "react-router-dom";
import { TRADE_CONDITION_MASTER_ROUTE } from "config/route-consts";

import "./TradeConditionView.scss";
import TradeConditionMaster from "./TradeConditionMaster/TradeConditionMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function TradeConditionView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={TRADE_CONDITION_MASTER_ROUTE}
        key={TRADE_CONDITION_MASTER_ROUTE}
        component={TradeConditionMaster}
        auth={auth(TRADE_CONDITION_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { TradeConditionMaster };
export default TradeConditionView;
