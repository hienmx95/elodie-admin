import React from "react";
import { Switch } from "react-router-dom";
import { PURCHASE_PLAN_CRITERION_SCORE_MASTER_ROUTE } from "config/route-consts";

import "./PurchasePlanCriterionScoreView.scss";
import PurchasePlanCriterionScoreMaster from "./PurchasePlanCriterionScoreMaster/PurchasePlanCriterionScoreMaster";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

function PurchasePlanCriterionScoreView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={PURCHASE_PLAN_CRITERION_SCORE_MASTER_ROUTE}
        key={PURCHASE_PLAN_CRITERION_SCORE_MASTER_ROUTE}
        component={PurchasePlanCriterionScoreMaster}
        auth={auth(PURCHASE_PLAN_CRITERION_SCORE_MASTER_ROUTE)}
      ></ProtectedRoute>
    </Switch>
  );
}

export { PurchasePlanCriterionScoreMaster };
export default PurchasePlanCriterionScoreView;
