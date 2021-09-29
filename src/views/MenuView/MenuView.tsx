import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MENU_MASTER_ROUTE,  } from 'config/route-consts';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';

import './MenuView.scss';
import MenuMaster from './MenuMaster/MenuMaster';

function MenuView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
        <ProtectedRoute path={ MENU_MASTER_ROUTE } key={ MENU_MASTER_ROUTE } component={ MenuMaster } auth={auth(MENU_MASTER_ROUTE)} />
    </Switch>
  );
}

export { MenuMaster,  };
export default MenuView;
