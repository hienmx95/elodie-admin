import React from 'react';
import { Switch } from 'react-router-dom';
import { ROLE_MASTER_ROUTE, ROLE_DETAIL_ROUTE } from 'config/route-consts';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';

import './RoleView.scss';
import RoleMaster from './RoleMaster/RoleMaster';
import RoleDetail from './RoleDetail/RoleDetail';

function RoleView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute
        path={ROLE_MASTER_ROUTE}
        key={ROLE_MASTER_ROUTE}
        component={RoleMaster}
        auth={auth(ROLE_MASTER_ROUTE)}
      />
      <ProtectedRoute
        path={ROLE_DETAIL_ROUTE}
        key={ROLE_DETAIL_ROUTE}
        component={RoleDetail}
        auth={auth(ROLE_DETAIL_ROUTE)}
      />
    </Switch>
  );
}

export { RoleMaster, RoleDetail };
export default RoleView;
