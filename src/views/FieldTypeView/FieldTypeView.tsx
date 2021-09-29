import React from 'react';
import { Switch } from 'react-router-dom';
import { FIELD_TYPE_MASTER_ROUTE,  } from 'config/route-consts';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';

import './FieldTypeView.scss';
import FieldTypeMaster from './FieldTypeMaster/FieldTypeMaster';

function FieldTypeView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
        <ProtectedRoute path={ FIELD_TYPE_MASTER_ROUTE } key={ FIELD_TYPE_MASTER_ROUTE } component={ FieldTypeMaster } auth={auth(FIELD_TYPE_MASTER_ROUTE)} />
    </Switch>
  );
}

export { FieldTypeMaster,  };
export default FieldTypeView;
