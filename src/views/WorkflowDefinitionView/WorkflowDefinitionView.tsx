import React from "react";
import { Switch } from "react-router-dom";
import { WORKFLOW_DEFINITION_MASTER_ROUTE, WORKFLOW_DEFINITION_PREVIEW_ROUTE } from "config/route-consts";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

import "./WorkflowDefinitionView.scss";
import WorkflowDefinitionMaster from "./WorkflowDefinitionMaster/WorkflowDefinitionMaster";
import WorkflowDefinitionPreview from "./WorkflowDefinitionMaster/WorkflowDefinitionPreview";

function WorkflowDefinitionView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={WORKFLOW_DEFINITION_MASTER_ROUTE}
        key={WORKFLOW_DEFINITION_MASTER_ROUTE}
        component={WorkflowDefinitionMaster}
        auth={auth(WORKFLOW_DEFINITION_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={WORKFLOW_DEFINITION_PREVIEW_ROUTE}
        key={WORKFLOW_DEFINITION_PREVIEW_ROUTE}
        component={WorkflowDefinitionPreview}
        auth={auth(WORKFLOW_DEFINITION_PREVIEW_ROUTE)}
      />
    </Switch>
  );
}

export { WorkflowDefinitionMaster, WorkflowDefinitionPreview };
export default WorkflowDefinitionView;
