import { appTranslation } from "app/app-translation";
import {
  APP_USER_MASTER_ROUTE,
  BRAND_MASTER_ROUTE,
  CATEGORY_MASTER_ROUTE,
  CRITERION_MASTER_ROUTE,
  CURRENCY_MASTER_ROUTE,
  ORGANIZATION_MASTER_ROUTE,
  PRODUCT_GROUPING_MASTER_ROUTE,
  PRODUCT_MASTER_ROUTE,
  PRODUCT_TYPE_MASTER_ROUTE,
  SUPPLIER_MASTER_ROUTE,
  TAX_TYPE_MASTER_ROUTE,
  TRADE_CONDITION_MASTER_ROUTE,
  UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE,
  UNIT_OF_MEASURE_MASTER_ROUTE,
  WORKFLOW_DEFINITION_MASTER_ROUTE,
  WORKFLOW_DIRECTION_MASTER_ROUTE,
  WORKFLOW_PARAMETER_MASTER_ROUTE,
  WORKFLOW_STEP_MASTER_ROUTE,
  PRODUCT_ROUTE,
  ROLE_ROUTE,
  ROLE_MASTER_ROUTE,
  CUSTOMER_MASTER_ROUTE,
  CUSTOMER_SALES_ORDER_MASTER_ROUTE,
  WAREHOUSE_MASTER_ROUTE,
  INTERNAL_ORDER_REPORT_MASTER_ROUTE,
  CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE
} from "config/route-consts";
import React, { ReactNode } from "react";
export interface MenuItem {
  title?: string;
  icon?: ReactNode;
  type?: string;
  badge?: string;
  badgetxt?: string;
  active?: boolean;
  path?: string;
  children?: MenuItem[];
  bookmark?: boolean;
  isShow?: boolean;
}

export interface Menu {
  menutitle?: string;
  menucontent?: string;
  isShow?: boolean;
  Items?: MenuItem[];
  checkVisible?: (mapper: Record<string, number>) => boolean;
}

const translate = appTranslation.translate;

export const menu: Menu[] = [
  {
    menutitle: "Dashboard",
    menucontent: "Đơn hàng",
    isShow: true,
    checkVisible: checkVisible(
      INTERNAL_ORDER_REPORT_MASTER_ROUTE
    ),
    Items: [
      {
        title: "Đơn hàng",
        path: INTERNAL_ORDER_REPORT_MASTER_ROUTE,
        icon: <i className="tio-user_outlined"></i>,
        type: "link",
        active: false,
        isShow: true,
      },
    ],
  },
  {
    menutitle: "Bán hàng",
    menucontent: "Khách hàng, đơn hàng, tồn kho",
    isShow: true,
    checkVisible: checkVisible(
      CUSTOMER_MASTER_ROUTE,
      CUSTOMER_SALES_ORDER_MASTER_ROUTE,
      WAREHOUSE_MASTER_ROUTE
    ),
    Items: [
      {
        title: "Khách hàng",
        path: CUSTOMER_MASTER_ROUTE,
        icon: <i className="tio-user_outlined"></i>,
        type: "link",
        active: false,
        isShow: true,
      },
      {
        title: "Đơn hàng",
        path: CUSTOMER_SALES_ORDER_MASTER_ROUTE,
        icon: <i className="tio-user_outlined"></i>,
        type: "link",
        active: false,
        isShow: true,
      },
      {
        title: "Quản lý kho",
        path: WAREHOUSE_MASTER_ROUTE,
        icon: <i className="tio-user_outlined"></i>,
        type: "link",
        active: false,
        isShow: true,
      },
    ],
  },
  {
    menutitle: "Cài đặt và quản trị",
    menucontent: "Khởi tạo dữ liệu, thiết lập hệ thống",
    isShow: true,
    checkVisible: checkVisible(
      WORKFLOW_DEFINITION_MASTER_ROUTE,
      WORKFLOW_DIRECTION_MASTER_ROUTE,
      WORKFLOW_STEP_MASTER_ROUTE,
      WORKFLOW_PARAMETER_MASTER_ROUTE,
      CATEGORY_MASTER_ROUTE,
      PRODUCT_MASTER_ROUTE,
      ROLE_MASTER_ROUTE,
      PRODUCT_GROUPING_MASTER_ROUTE,
      PRODUCT_TYPE_MASTER_ROUTE,
      UNIT_OF_MEASURE_MASTER_ROUTE,
      UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE,
      TAX_TYPE_MASTER_ROUTE,
      ORGANIZATION_MASTER_ROUTE,
      APP_USER_MASTER_ROUTE,
      CURRENCY_MASTER_ROUTE,
      BRAND_MASTER_ROUTE,
      SUPPLIER_MASTER_ROUTE,
      CRITERION_MASTER_ROUTE,
      TRADE_CONDITION_MASTER_ROUTE,
    ),
    Items: [
      {
        title: "Danh mục dữ liệu",
        icon: <i className="tio-menu_left"></i>,
        type: "sub",
        active: false,
        isShow: true,
        children: [
          {
            title: translate("menu.products"),
            type: "sub",
            active: false,
            isShow: true,
            path: PRODUCT_ROUTE,
            children: [
              {
                title: translate("menu.categories"),
                path: CATEGORY_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.products"),
                path: PRODUCT_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.productGroupings"),
                path: PRODUCT_GROUPING_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.productTypes"),
                path: PRODUCT_TYPE_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.unitOfMeasures"),
                path: UNIT_OF_MEASURE_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.unitOfMeasureGroupings"),
                path: UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.taxTypes"),
                path: TAX_TYPE_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
            ],
          },

          {
            title: "Đối tác",
            path: BRAND_MASTER_ROUTE,
            type: "sub",
            active: false,
            isShow: true,
            children: [
              {
                title: translate("menu.brands"),
                path: BRAND_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },

              {
                title: translate("menu.suppliers"),
                path: SUPPLIER_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.criterions"),
                path: CRITERION_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
              {
                title: translate("menu.tradeConditions"),
                path: TRADE_CONDITION_MASTER_ROUTE,
                type: "link",
                active: false,
                isShow: true,
              },
            ],
          },

          {
            title: translate("menu.currencies"),
            path: CURRENCY_MASTER_ROUTE,
            type: "link",
            active: false,
            isShow: true,
          },
        ],
      },
      {
        title: "Người dùng",
        type: "sub",
        icon: <i className="tio-user_outlined"></i>,
        active: false,
        isShow: true,
        path: ROLE_ROUTE,
        children: [
          {
            title: translate("menu.roles"),
            path: ROLE_MASTER_ROUTE,
            icon: <i className="tio-group_equal"></i>,
            type: "link",
            active: false,
            isShow: true,
          },
          {
            title: translate("menu.appUsers"),
            path: APP_USER_MASTER_ROUTE,
            icon: <i className="tio-user_add"></i>,
            type: "link",
            active: false,
            isShow: true,
          },
          {
            title: translate("menu.organizations"),
            path: ORGANIZATION_MASTER_ROUTE,
            icon: <i className="tio-category_outlined"></i>,
            type: "link",
            active: false,
            isShow: true,
          },
        ],
      },

    ],
  },
  {
    menutitle: "Báo cáo",
    menucontent: "Báo cáo đơn hàng",
    isShow: true,
    checkVisible: checkVisible(
      CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE
    ),
    Items: [
      {
        title: "Đơn hàng theo sản phẩm",
        path: CUSTOMER_SALES_ORDER_ITEM_REPORT_ROUTE,
        icon: <i className="tio-user_outlined"></i>,
        type: "link",
        active: false,
        isShow: true,
      },
    ],
  },
];

function checkVisible(
  ...urls: string[]
): (object: Record<string, number>) => boolean {
  return (object: Record<string, number>) => {
    let display = false;
    if (urls.length > 0) {
      urls.forEach((item) => {
        if (object.hasOwnProperty(item)) display = true;
      });
    }
    return display;
  };
}

