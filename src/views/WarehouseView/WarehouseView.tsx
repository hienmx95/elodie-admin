import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';
import { WAREHOUSE_DETAIL_ROUTE, WAREHOUSE_MASTER_ROUTE } from 'config/route-consts';
import React from 'react';
import { Switch } from 'react-router-dom';
import WarehouseDetail from './WarehouseDetail/WarehouseDetail';
import WarehouseMaster from './WarehouseMaster/WarehouseMaster';
import './WarehouseView.scss';


function WarehouseView() {
  const { auth } = useCheckAuthorized();
  return (
    <Switch>
      <ProtectedRoute path={WAREHOUSE_MASTER_ROUTE} key={WAREHOUSE_MASTER_ROUTE} component={WarehouseMaster} auth={auth(WAREHOUSE_MASTER_ROUTE)} />
      <ProtectedRoute path={WAREHOUSE_DETAIL_ROUTE} key={WAREHOUSE_DETAIL_ROUTE} component={WarehouseDetail} auth={auth(WAREHOUSE_DETAIL_ROUTE)} />
    </Switch>
  );
}

export { WarehouseMaster, WarehouseDetail };
export default WarehouseView;
