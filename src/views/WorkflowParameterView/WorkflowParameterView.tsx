import React from "react";
import { Switch } from "react-router-dom";
import { WORKFLOW_PARAMETER_MASTER_ROUTE } from "config/route-consts";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

import "./WorkflowParameterView.scss";
import WorkflowParameterMaster from "./WorkflowParameterMaster/WorkflowParameterMaster";

function WorkflowParameterView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={WORKFLOW_PARAMETER_MASTER_ROUTE}
        key={WORKFLOW_PARAMETER_MASTER_ROUTE}
        component={WorkflowParameterMaster}
        auth={auth(WORKFLOW_PARAMETER_MASTER_ROUTE)}
      />
    </Switch>
  );
}

export { WorkflowParameterMaster };
export default WorkflowParameterView;
