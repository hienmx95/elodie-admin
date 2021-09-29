import React from "react";
import { Switch } from "react-router-dom";
import { CRITERION_MASTER_ROUTE } from "config/route-consts";

import "./CriterionView.scss";
import CriterionMaster from "./CriterionMaster/CriterionMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function CriterionView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute
        path={CRITERION_MASTER_ROUTE}
        key={CRITERION_MASTER_ROUTE}
        component={CriterionMaster}
        auth={auth(CRITERION_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { CriterionMaster };
export default CriterionView;
