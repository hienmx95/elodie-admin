import React from 'react';
import { Switch } from 'react-router-dom';
import { PAGE_MASTER_ROUTE, } from 'config/route-consts';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';

import './PageView.scss';
import PageMaster from './PageMaster/PageMaster';

function PageView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute path={PAGE_MASTER_ROUTE} key={PAGE_MASTER_ROUTE} component={PageMaster} auth={auth(PAGE_MASTER_ROUTE)} />
    </Switch>
  );
}

export { PageMaster, };
export default PageView;
