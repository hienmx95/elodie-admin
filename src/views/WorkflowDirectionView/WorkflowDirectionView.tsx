import React from "react";
import { Switch } from "react-router-dom";
import {
  WORKFLOW_DIRECTION_MASTER_ROUTE,
  WORKFLOW_DIRECTION_DETAIL_ROUTE,
} from "config/route-consts";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

import "./WorkflowDirectionView.scss";
import WorkflowDirectionMaster from "./WorkflowDirectionMaster/WorkflowDirectionMaster";
import WorkflowDirectionDetail from "./WorkflowDirectionDetail/WorkflowDirectionDetail";

function WorkflowDirectionView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={WORKFLOW_DIRECTION_MASTER_ROUTE}
        key={WORKFLOW_DIRECTION_MASTER_ROUTE}
        component={WorkflowDirectionMaster}
        auth={auth(WORKFLOW_DIRECTION_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={WORKFLOW_DIRECTION_DETAIL_ROUTE}
        key={WORKFLOW_DIRECTION_DETAIL_ROUTE}
        component={WorkflowDirectionDetail}
        auth={auth(WORKFLOW_DIRECTION_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { WorkflowDirectionMaster, WorkflowDirectionDetail };
export default WorkflowDirectionView;
