// import React from "react";
import {APP_USER_ROUTE, BRAND_ROUTE, ORGANIZATION_ROUTE, ROLE_ROUTE } from "config/route-consts";
import BrandView from "views/BrandView/BrandView";

import { CATEGORY_ROUTE } from "config/route-consts";
import CategoryTreeView from "views/CategoryTreeView/CategoryTreeView";

import { CURRENCY_ROUTE } from "config/route-consts";
import CurrencyView from "views/CurrencyView/CurrencyView";

import { PRODUCT_ROUTE } from "config/route-consts";
import ProductView from "views/ProductView/ProductView";

import { PRODUCT_GROUPING_ROUTE } from "config/route-consts";
import ProductGroupingTreeView from "views/ProductGroupingTreeView/ProductGroupingTreeView";

import { PRODUCT_TYPE_ROUTE } from "config/route-consts";
import ProductTypeView from "views/ProductTypeView/ProductTypeView";

import { SUPPLIER_ROUTE } from "config/route-consts";
import SupplierView from "views/SupplierView/SupplierView";

import { TAX_TYPE_ROUTE } from "config/route-consts";
import TaxTypeView from "views/TaxTypeView/TaxTypeView";

import { UNIT_OF_MEASURE_ROUTE } from "config/route-consts";
import UnitOfMeasureView from "views/UnitOfMeasureView/UnitOfMeasureView";

import { UNIT_OF_MEASURE_GROUPING_ROUTE } from "config/route-consts";
import UnitOfMeasureGroupingView from "views/UnitOfMeasureGroupingView/UnitOfMeasureGroupingView";

import AppUserView from "views/AppUserView/AppUserView";

import RoleView from "views/RoleView/RoleView";

import OrganizationTreeView from "views/OrganizationTreeView/OrganizationTreeView";


import { CUSTOMER_ROUTE } from 'config/route-consts';
import CustomerView from 'views/CustomerView/CustomerView';


import { CUSTOMER_SALES_ORDER_ROUTE } from 'config/route-consts';
import CustomerSalesOrderView from 'views/CustomerSalesOrderView/CustomerSalesOrderView';


export interface Route {
  path: string;
  component: () => JSX.Element;
}

export const routes: Route[] = [
  {
    path: BRAND_ROUTE,
    component: BrandView,
  },

  {
    path: CATEGORY_ROUTE,
    component: CategoryTreeView,
  },

  {
    path: CURRENCY_ROUTE,
    component: CurrencyView,
  },

  {
    path: PRODUCT_ROUTE,
    component: ProductView,
  },

  {
    path: PRODUCT_GROUPING_ROUTE,
    component: ProductGroupingTreeView,
  },

  {
    path: PRODUCT_TYPE_ROUTE,
    component: ProductTypeView,
  },

  {
    path: SUPPLIER_ROUTE,
    component: SupplierView,
  },

  {
    path: TAX_TYPE_ROUTE,
    component: TaxTypeView,
  },

  {
    path: UNIT_OF_MEASURE_ROUTE,
    component: UnitOfMeasureView,
  },

  {
    path: UNIT_OF_MEASURE_GROUPING_ROUTE,
    component: UnitOfMeasureGroupingView,
  },
  {
    path: APP_USER_ROUTE,
    component: AppUserView,
  },
  {
    path: ROLE_ROUTE,
    component: RoleView,
  },
  {
    path: ORGANIZATION_ROUTE,
    component: OrganizationTreeView,
  },
  {
    path: CUSTOMER_ROUTE,
    component: CustomerView,
  },
  {
    path: CUSTOMER_SALES_ORDER_ROUTE,
    component: CustomerSalesOrderView,
  },
];
