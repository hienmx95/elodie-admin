import { join } from "path";

export const ROOT_ROUTE: string = process.env.PUBLIC_URL;

export const LOGIN_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/login"
  : "/login"; // login route, dont delete

export const FORBIDENT_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/403"
  : "/403"; // forbident route, add project prefix if necessary
export const NOT_FOUND_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/404"
  : "/404"; // notFounded route, add project prefix if necessary
export const CATEGORY_ROOT_ROUTE = ROOT_ROUTE
  ? ROOT_ROUTE + "/product-category"
  : "/product-category";
export const CATEGORY_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "category"
);
export const CATEGORY_MASTER_ROUTE: string = join(
  CATEGORY_ROUTE,
  "category-master"
);

export const PRODUCT_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "product"
);
export const PRODUCT_MASTER_ROUTE: string = join(
  PRODUCT_ROUTE,
  "product-master"
);
export const PRODUCT_DETAIL_ROUTE: string = join(
  PRODUCT_ROUTE,
  "product-detail"
);

// export const PRODUCT_ROUTE: string = ROOT_ROUTE
//   ? ROOT_ROUTE + "/product"
//   : "/product";
// export const PRODUCT_MASTER_ROUTE: string = join(
//   PRODUCT_ROUTE,
//   "product-master"
// );
// export const PRODUCT_DETAIL_ROUTE: string = join(
//     PRODUCT_ROUTE,
//   "product-detail"
// );

export const PRODUCT_GROUPING_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "product-grouping"
);
export const PRODUCT_GROUPING_MASTER_ROUTE: string = join(
  PRODUCT_GROUPING_ROUTE,
  "product-grouping-master"
);

export const PRODUCT_TYPE_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "product-type"
);
export const PRODUCT_TYPE_MASTER_ROUTE: string = join(
  PRODUCT_TYPE_ROUTE,
  "product-type-master"
);

export const UNIT_OF_MEASURE_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "unit-of-measure"
);
export const UNIT_OF_MEASURE_MASTER_ROUTE: string = join(
  UNIT_OF_MEASURE_ROUTE,
  "unit-of-measure-master"
);

export const UNIT_OF_MEASURE_GROUPING_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "unit-of-measure-grouping"
);
export const UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE: string = join(
  UNIT_OF_MEASURE_GROUPING_ROUTE,
  "unit-of-measure-grouping-master"
);
export const UNIT_OF_MEASURE_GROUPING_DETAIL_ROUTE: string = join(
  UNIT_OF_MEASURE_GROUPING_ROUTE,
  "unit-of-measure-grouping-detail"
);

export const TAX_TYPE_ROUTE: string = join(
  CATEGORY_ROOT_ROUTE,
  "tax-type"
);
export const TAX_TYPE_MASTER_ROUTE: string = join(
  TAX_TYPE_ROUTE,
  "tax-type-master"
);

export const BRAND_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/partner/brand"
  : "/partner/brand";
export const BRAND_MASTER_ROUTE: string = join(BRAND_ROUTE, "brand-master");

export const SUPPLIER_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/supplier"
  : "/supplier";
export const SUPPLIER_MASTER_ROUTE: string = join(
  SUPPLIER_ROUTE,
  "supplier-master"
);
export const SUPPLIER_DETAIL_ROUTE: string = join(
  SUPPLIER_ROUTE,
  "supplier-detail"
);

export const CRITERION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/criterion"
  : "/criterion";
export const CRITERION_MASTER_ROUTE: string = join(
  CRITERION_ROUTE,
  "criterion-master"
);

export const TRADE_CONDITION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/trade-condition"
  : "/trade-condition";
export const TRADE_CONDITION_MASTER_ROUTE: string = join(
  TRADE_CONDITION_ROUTE,
  "trade-condition-master"
);

export const CURRENCY_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/currency"
  : "/currency";
export const CURRENCY_MASTER_ROUTE: string = join(
  CURRENCY_ROUTE,
  "currency-master"
);

export const REQUEST_FOR_QUOTATION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/request-for-quotation"
  : "/request-for-quotation";
export const REQUEST_FOR_QUOTATION_MASTER_ROUTE: string = join(
  REQUEST_FOR_QUOTATION_ROUTE,
  "request-for-quotation-master"
);
export const REQUEST_FOR_QUOTATION_DETAIL_ROUTE: string = join(
  REQUEST_FOR_QUOTATION_ROUTE,
  "request-for-quotation-detail"
);

export const PURCHASE_REQUEST_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-request"
  : "/purchase-request";
export const PURCHASE_REQUEST_MASTER_ROUTE: string = join(
  PURCHASE_REQUEST_ROUTE,
  "purchase-request-master"
);
export const PURCHASE_REQUEST_DETAIL_ROUTE: string = join(
  PURCHASE_REQUEST_ROUTE,
  "purchase-request-detail"
);
export const PURCHASE_REQUEST_PREVIEW_ROUTE: string = join(
  PURCHASE_REQUEST_ROUTE,
  "purchase-request-preview"
);
export const PURCHASE_REQUEST_APPROVE_ROUTE: string = join(
  PURCHASE_REQUEST_ROUTE,
  "purchase-request-approve"
);

export const PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-request-pc"
  : "/purchase-request-pc";
export const PURCHASE_REQUEST_PRINCIPAL_CONTRACT_MASTER_ROUTE: string = join(
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE,
  "purchase-request-pc-master"
);
export const PURCHASE_REQUEST_PRINCIPAL_CONTRACT_DETAIL_ROUTE: string = join(
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE,
  "purchase-request-pc-detail"
);
export const PURCHASE_REQUEST_PRINCIPAL_CONTRACT_PREVIEW_ROUTE: string = join(
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE,
  "purchase-request-pc-preview"
);
export const PURCHASE_REQUEST_PRINCIPAL_CONTRACT_APPROVE_ROUTE: string = join(
  PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE,
  "purchase-request-pc-approve"
);

export const PRINCIPAL_CONTRACT_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/principal-contract"
  : "/principal-contract";
export const PRINCIPAL_CONTRACT_MASTER_ROUTE: string = join(
  PRINCIPAL_CONTRACT_ROUTE,
  "principal-contract-master"
);
export const PRINCIPAL_CONTRACT_DETAIL_ROUTE: string = join(
  PRINCIPAL_CONTRACT_ROUTE,
  "principal-contract-detail"
);
export const PRINCIPAL_CONTRACT_PREVIEW_ROUTE: string = join(
  PRINCIPAL_CONTRACT_ROUTE,
  "principal-contract-preview"
);

export const PRINCIPAL_CONTRACT_APPROVE_ROUTE: string = join(
  PRINCIPAL_CONTRACT_ROUTE,
  "principal-contract-approve"
);


export const PURCHASE_REQUEST_PLAN_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-request-plan"
  : "/purchase-request-plan";
export const PURCHASE_REQUEST_PLAN_MASTER_ROUTE: string = join(
  PURCHASE_REQUEST_PLAN_ROUTE,
  "purchase-request-plan-master"
);
export const PURCHASE_REQUEST_PLAN_DETAIL_ROUTE: string = join(
  PURCHASE_REQUEST_PLAN_ROUTE,
  "purchase-request-plan-detail"
);

export const PURCHASE_REQUEST_PLAN_PREVIEW_ROUTE: string = join(
  PURCHASE_REQUEST_PLAN_ROUTE,
  "purchase-request-plan-preview"
);
export const PURCHASE_REQUEST_PLAN_APPROVE_ROUTE: string = join(
  PURCHASE_REQUEST_PLAN_ROUTE,
  "purchase-request-plan-approve"
);

export const PURCHASE_ORDER_CONDITION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-order-condition"
  : "/purchase-order-condition";
export const PURCHASE_ORDER_CONDITION_MASTER_ROUTE: string = join(
  PURCHASE_ORDER_CONDITION_ROUTE,
  "purchase-order-condition-master"
);

export const PURCHASE_ORDER_CONTENT_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-order-content"
  : "/purchase-order-content";
export const PURCHASE_ORDER_CONTENT_MASTER_ROUTE: string = join(
  PURCHASE_ORDER_CONTENT_ROUTE,
  "purchase-order-content-master"
);

export const PURCHASE_ORDER_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-order"
  : "/purchase-order";
export const PURCHASE_ORDER_MASTER_ROUTE: string = join(
  PURCHASE_ORDER_ROUTE,
  "purchase-order-master"
);
export const PURCHASE_ORDER_DETAIL_ROUTE: string = join(
  PURCHASE_ORDER_ROUTE,
  "purchase-order-detail"
);

export const PURCHASE_PLAN_CRITERION_SCORE_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-plan-criterion-score"
  : "/purchase-plan-criterion-score";
export const PURCHASE_PLAN_CRITERION_SCORE_MASTER_ROUTE: string = join(
  PURCHASE_PLAN_CRITERION_SCORE_ROUTE,
  "purchase-plan-criterion-score-master"
);

export const PURCHASE_PLAN_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/purchase-plan"
  : "/purchase-plan";
export const PURCHASE_PLAN_MASTER_ROUTE: string = join(
  PURCHASE_PLAN_ROUTE,
  "purchase-plan-master"
);
export const PURCHASE_PLAN_DETAIL_ROUTE: string = join(
  PURCHASE_PLAN_ROUTE,
  "purchase-plan-detail"
);

export const PURCHASE_PLAN_WAITING_ROUTE: string = join(
  PURCHASE_PLAN_ROUTE,
  "purchase-plan-waiting"
);

export const PURCHASE_PLAN_APPROVE_ROUTE: string = join(
  PURCHASE_PLAN_ROUTE,
  "purchase-plan-approve"
);

export const PURCHASE_PLAN_PREVIEW_ROUTE: string = join(
  PURCHASE_PLAN_ROUTE,
  "purchase-plan-preview"
);

export const WORKFLOW_DEFINITION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/workflow-definition"
  : "/workflow-definition";
export const WORKFLOW_DEFINITION_MASTER_ROUTE: string = join(
  WORKFLOW_DEFINITION_ROUTE,
  "workflow-definition-master"
);
export const WORKFLOW_DEFINITION_PREVIEW_ROUTE: string = join(
  WORKFLOW_DEFINITION_ROUTE,
  "workflow-definition-preview"
);

export const WORKFLOW_DIRECTION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/workflow-direction"
  : "/workflow-direction";
export const WORKFLOW_DIRECTION_MASTER_ROUTE: string = join(
  WORKFLOW_DIRECTION_ROUTE,
  "workflow-direction-master"
);

export const WORKFLOW_DIRECTION_DETAIL_ROUTE: string = join(
  WORKFLOW_DIRECTION_ROUTE,
  "workflow-direction-detail"
);

export const WORKFLOW_PARAMETER_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/workflow-parameter"
  : "/workflow-parameter";
export const WORKFLOW_PARAMETER_MASTER_ROUTE: string = join(
  WORKFLOW_PARAMETER_ROUTE,
  "workflow-parameter-master"
);
export const WORKFLOW_STEP_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/workflow-step"
  : "/workflow-step";
export const WORKFLOW_STEP_MASTER_ROUTE: string = join(
  WORKFLOW_STEP_ROUTE,
  "workflow-step-master"
);

export const WORKFLOW_PARAMETER_TYPE_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/workflow-parameter-type"
  : "/workflow-parameter-type";
export const WORKFLOW_PARAMETER_TYPE_MASTER_ROUTE: string = join(
  WORKFLOW_PARAMETER_TYPE_ROUTE,
  "workflow-parameter-type-master"
);

export const WORKFLOW_STATE_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/workflow-state"
  : "/workflow-state";
export const WORKFLOW_STATE_MASTER_ROUTE: string = join(
  WORKFLOW_STATE_ROUTE,
  "workflow-state-master"
);

export const APP_USER_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/app-user"
  : "/app-user";
export const APP_USER_MASTER_ROUTE: string = join(
  APP_USER_ROUTE,
  "app-user-master"
);

export const ACTION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/action"
  : "/action";
export const ACTION_MASTER_ROUTE: string = join(ACTION_ROUTE, "action-master");

export const ROLE_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + "/role" : "/role";
export const ROLE_MASTER_ROUTE: string = join(ROLE_ROUTE, "role-master");

export const ROLE_DETAIL_ROUTE: string = join(ROLE_ROUTE, "role-detail");

export const FIELD_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/field"
  : "/field";
export const FIELD_MASTER_ROUTE: string = join(FIELD_ROUTE, "field-master");

export const FIELD_TYPE_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/field-type"
  : "/field-type";
export const FIELD_TYPE_MASTER_ROUTE: string = join(
  FIELD_TYPE_ROUTE,
  "field-type-master"
);

export const MENU_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + "/menu" : "/menu";
export const MENU_MASTER_ROUTE: string = join(MENU_ROUTE, "menu-master");

export const PAGE_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + "/page" : "/page";
export const PAGE_MASTER_ROUTE: string = join(PAGE_ROUTE, "page-master");

export const PERMISSION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/permission"
  : "/permission";
export const PERMISSION_MASTER_ROUTE: string = join(
  PERMISSION_ROUTE,
  "permission-master"
);

export const ORGANIZATION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/organization"
  : "/organization";
export const ORGANIZATION_MASTER_ROUTE: string = join(
  ORGANIZATION_ROUTE,
  "organization-master"
);
