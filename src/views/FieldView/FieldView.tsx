import React from 'react';
import { Switch } from 'react-router-dom';
import { FIELD_MASTER_ROUTE, } from 'config/route-consts';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';

import './FieldView.scss';
import FieldMaster from './FieldMaster/FieldMaster';

function FieldView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute path={FIELD_MASTER_ROUTE} key={FIELD_MASTER_ROUTE} component={FieldMaster} auth={auth(FIELD_MASTER_ROUTE)} />
    </Switch>
  );
}

export { FieldMaster, };
export default FieldView;
