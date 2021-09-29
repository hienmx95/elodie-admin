import React from "react";
import { Switch } from "react-router-dom";
import { WORKFLOW_STEP_MASTER_ROUTE } from "config/route-consts";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

import "./WorkflowStepView.scss";
import WorkflowStepMaster from "./WorkflowStepMaster/WorkflowStepMaster";

function WorkflowStepView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={WORKFLOW_STEP_MASTER_ROUTE}
        key={WORKFLOW_STEP_MASTER_ROUTE}
        component={WorkflowStepMaster}
        auth={auth(WORKFLOW_STEP_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { WorkflowStepMaster };
export default WorkflowStepView;
