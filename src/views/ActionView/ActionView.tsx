import React from 'react';
import { Switch } from 'react-router-dom';
import { ACTION_MASTER_ROUTE, } from 'config/route-consts';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';

import './ActionView.scss';
import ActionMaster from './ActionMaster/ActionMaster';

function ActionView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute path={ACTION_MASTER_ROUTE} key={ACTION_MASTER_ROUTE} component={ActionMaster} auth={auth(ACTION_MASTER_ROUTE)} />
    </Switch>
  );
}

export { ActionMaster, };
export default ActionView;
