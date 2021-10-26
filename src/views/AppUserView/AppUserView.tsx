import React from "react";
import { Switch } from "react-router-dom";
import { APP_USER_DETAIL_ROUTE, APP_USER_MASTER_ROUTE } from "config/route-consts";
import { ProtectedRoute, useCheckAuthorized } from "config/protected-route";

import "./AppUserView.scss";
import AppUserMaster from "./AppUserMaster/AppUserMaster";
import AppUserDetail from "./AppUserDetail/AppUserDetail";

function AppUserView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={APP_USER_MASTER_ROUTE}
        key={APP_USER_MASTER_ROUTE}
        component={AppUserMaster}
        auth={auth(APP_USER_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={APP_USER_DETAIL_ROUTE}
        key={APP_USER_DETAIL_ROUTE}
        component={AppUserDetail}
        auth={auth(APP_USER_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { AppUserMaster };
export default AppUserView;
