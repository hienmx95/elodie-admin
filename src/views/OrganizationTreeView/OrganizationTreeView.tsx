import React from "react";
import { Switch } from "react-router-dom";
import { ORGANIZATION_MASTER_ROUTE } from "config/route-consts";

import "./OrganizationTreeView.scss";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import OrganizationTreeMaster from "./OrganizationTreeMaster/OrganizationTreeMaster";

function OrganizationTreeView() {
    const { auth } = useCheckAuthorized();

    return (
        <Switch>
            <ProtectedRoute
                path={ORGANIZATION_MASTER_ROUTE}
                key={ORGANIZATION_MASTER_ROUTE}
                component={OrganizationTreeMaster}
                auth={auth(ORGANIZATION_MASTER_ROUTE)}
            />
        </Switch>
    );
}

export { OrganizationTreeMaster };
export default OrganizationTreeView;
