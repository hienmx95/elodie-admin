// import React from "react";
import { ACTION_ROUTE, APP_USER_ROUTE, BRAND_ROUTE, FIELD_ROUTE, FIELD_TYPE_ROUTE, ORGANIZATION_ROUTE, PAGE_ROUTE, ROLE_ROUTE } from "config/route-consts";
import BrandView from "views/BrandView/BrandView";

import { CATEGORY_ROUTE } from "config/route-consts";
import CategoryTreeView from "views/CategoryTreeView/CategoryTreeView";

import { CRITERION_ROUTE } from "config/route-consts";
import CriterionView from "views/CriterionView/CriterionView";

import { CURRENCY_ROUTE } from "config/route-consts";
import CurrencyView from "views/CurrencyView/CurrencyView";

import { PRINCIPAL_CONTRACT_ROUTE } from "config/route-consts";
import PrincipalContractView from "views/PrincipalContractView/PrincipalContractView";

import { PRODUCT_ROUTE } from "config/route-consts";
import ProductView from "views/ProductView/ProductView";

import { PRODUCT_GROUPING_ROUTE } from "config/route-consts";
import ProductGroupingTreeView from "views/ProductGroupingTreeView/ProductGroupingTreeView";

import { TRADE_CONDITION_ROUTE } from "config/route-consts";
import TradeConditionView from "views/TradeConditionView/TradeConditionView";

import { PRODUCT_TYPE_ROUTE } from "config/route-consts";
import ProductTypeView from "views/ProductTypeView/ProductTypeView";

import { PURCHASE_ORDER_CONDITION_ROUTE } from "config/route-consts";
import PurchaseOrderConditionView from "views/PurchaseOrderConditionView/PurchaseOrderConditionView";

import { PURCHASE_ORDER_ROUTE } from "config/route-consts";
import PurchaseOrderView from "views/PurchaseOrderView/PurchaseOrderView";

import { PURCHASE_PLAN_CRITERION_SCORE_ROUTE } from "config/route-consts";
import PurchasePlanCriterionScoreView from "views/PurchasePlanCriterionScoreView/PurchasePlanCriterionScoreView";

import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import PurchasePlanView from "views/PurchasePlanView/PurchasePlanView";

import { PURCHASE_REQUEST_ROUTE } from "config/route-consts";
import PurchaseRequestView from "views/PurchaseRequestView/PurchaseRequestView";

import { PURCHASE_REQUEST_PLAN_ROUTE } from "config/route-consts";
import PurchaseRequestPlanView from "views/PurchaseRequestPlanView/PurchaseRequestPlanView";

import { REQUEST_FOR_QUOTATION_ROUTE } from "config/route-consts";
import RequestForQuotationView from "views/RequestForQuotationView/RequestForQuotationView";

import { SUPPLIER_ROUTE } from "config/route-consts";
import SupplierView from "views/SupplierView/SupplierView";

import { TAX_TYPE_ROUTE } from "config/route-consts";
import TaxTypeView from "views/TaxTypeView/TaxTypeView";

import { UNIT_OF_MEASURE_ROUTE } from "config/route-consts";
import UnitOfMeasureView from "views/UnitOfMeasureView/UnitOfMeasureView";

import { UNIT_OF_MEASURE_GROUPING_ROUTE } from "config/route-consts";
import UnitOfMeasureGroupingView from "views/UnitOfMeasureGroupingView/UnitOfMeasureGroupingView";

import { PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE } from "config/route-consts";
import PurchaseRequestPrincipalContractView from "views/PurchaseRequestPrincipalContractView/PurchaseRequestPrincipalContractView";

import { WORKFLOW_DIRECTION_ROUTE } from "config/route-consts";
import WorkflowDirectionView from "views/WorkflowDirectionView/WorkflowDirectionView";
import { WORKFLOW_DEFINITION_ROUTE } from "config/route-consts";
import WorkflowDefinitionView from "views/WorkflowDefinitionView/WorkflowDefinitionView";

import { WORKFLOW_STEP_ROUTE } from "config/route-consts";
import WorkflowStepView from "views/WorkflowStepView/WorkflowStepView";

import { WORKFLOW_PARAMETER_ROUTE } from "config/route-consts";
import WorkflowParameterView from "views/WorkflowParameterView/WorkflowParameterView";
import AppUserView from "views/AppUserView/AppUserView";
import ActionView from "views/ActionView/ActionView";
import RoleView from "views/RoleView/RoleView";
import FieldView from "views/FieldView/FieldView";
import FieldTypeView from "views/FieldTypeView/FieldTypeView";
import PageView from "views/PageView/PageView";
import OrganizationTreeView from "views/OrganizationTreeView/OrganizationTreeView";

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
    path: CRITERION_ROUTE,
    component: CriterionView,
  },

  {
    path: CURRENCY_ROUTE,
    component: CurrencyView,
  },

  {
    path: PRINCIPAL_CONTRACT_ROUTE,
    component: PrincipalContractView,
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
    path: PURCHASE_ORDER_CONDITION_ROUTE,
    component: PurchaseOrderConditionView,
  },

  {
    path: PURCHASE_ORDER_ROUTE,
    component: PurchaseOrderView,
  },

  {
    path: PURCHASE_PLAN_CRITERION_SCORE_ROUTE,
    component: PurchasePlanCriterionScoreView,
  },

  {
    path: PURCHASE_PLAN_ROUTE,
    component: PurchasePlanView,
  },

  {
    path: PURCHASE_REQUEST_ROUTE,
    component: PurchaseRequestView,
  },

  {
    path: PURCHASE_REQUEST_PLAN_ROUTE,
    component: PurchaseRequestPlanView,
  },

  {
    path: TRADE_CONDITION_ROUTE,
    component: TradeConditionView,
  },

  {
    path: REQUEST_FOR_QUOTATION_ROUTE,
    component: RequestForQuotationView,
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
    path: PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE,
    component: PurchaseRequestPrincipalContractView,
  },
  {
    path: WORKFLOW_DEFINITION_ROUTE,
    component: WorkflowDefinitionView,
  },
  {
    path: WORKFLOW_DIRECTION_ROUTE,
    component: WorkflowDirectionView,
  },
  {
    path: WORKFLOW_STEP_ROUTE,
    component: WorkflowStepView,
  },
  {
    path: WORKFLOW_PARAMETER_ROUTE,
    component: WorkflowParameterView,
  },
  {
    path: APP_USER_ROUTE,
    component: AppUserView,
  },
  {
    path: ACTION_ROUTE,
    component: ActionView,
  },
  {
    path: ROLE_ROUTE,
    component: RoleView,
  },
  {
    path: FIELD_ROUTE,
    component: FieldView,
  },
  {
    path: FIELD_TYPE_ROUTE,
    component: FieldTypeView,
  },
  {
    path: PAGE_ROUTE,
    component: PageView,
  },
  {
    path: ORGANIZATION_ROUTE,
    component: OrganizationTreeView,
  },

];
