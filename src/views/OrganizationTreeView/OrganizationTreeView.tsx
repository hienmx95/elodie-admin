import React from "react";
import { Switch } from "react-router-dom";
import { ORGANIZATION_DETAIL_ROUTE, ORGANIZATION_MASTER_ROUTE } from "config/route-consts";

import "./OrganizationTreeView.scss";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";
import OrganizationTreeMaster from "./OrganizationTreeMaster/OrganizationTreeMaster";
import OrganizationTreeDetail from "./OrganizationTreeDetail/OrganizationTreeDetail";

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
            <ProtectedRoute
                path={ORGANIZATION_DETAIL_ROUTE}
                key={ORGANIZATION_DETAIL_ROUTE}
                component={OrganizationTreeDetail}
                auth={auth(ORGANIZATION_DETAIL_ROUTE)}
            />
        </Switch>
    );
}

export { OrganizationTreeMaster, OrganizationTreeDetail};
export default OrganizationTreeView;
