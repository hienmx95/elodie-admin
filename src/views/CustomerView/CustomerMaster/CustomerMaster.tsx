/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import { CUSTOMER_ROUTE, PRODUCT_ROUTE } from "config/route-consts";
import { Category, CategoryFilter } from "models/Category";
import { Customer, CustomerFilter } from "models/Customer";
import { ProductProductGroupingMapping } from "models/ProductProductGroupingMapping";
import { ProductType, ProductTypeFilter } from "models/ProductType";
import { Status, StatusFilter } from "models/Status";
import { UsedVariationFilter } from "models/UsedVariation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { customerRepository } from "repositories/customer-repository";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import CustomerPreview from "./CustomerPreview";
import "./ProductMaster.scss";
import classNames from "classnames";
import authenticationService from "services/authentication-service";
import { API_CUSTOMER_PREFIX } from "config/api-consts";
/* end individual import */

function CustomerMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('customer', API_CUSTOMER_PREFIX);

  const master: UseMaster = masterService.useMaster<Customer, CustomerFilter>(
    CustomerFilter,
    CUSTOMER_ROUTE,
    customerRepository.list,
    customerRepository.count,
    customerRepository.delete,
    customerRepository.bulkDelete
  );
  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Customer>(Customer, customerRepository.get);
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);

  const menu = React.useCallback(
    (id: number, product: Customer) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div
              className="ant-action-menu"
              onClick={handleOpenPreview(id)}
            >
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction('update') &&
          <Menu.Item key="2">
            <Tooltip title={translate("general.actions.edit")}>
              <div
                className="ant-action-menu"
                onClick={master.handleGoDetail(id)}
              >
                {translate("general.actions.edit")}
              </div>
            </Tooltip>
          </Menu.Item>
        }
        {!product.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(product)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [handleOpenPreview, master, translate, validAction]
  );

  const columns: ColumnProps<Customer>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("customers.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<Customer, CustomerFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(...[code]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": code && code.length >= 30,
                })}
              >
                {code}
              </div>
              <div className="cell-master__second-row">
                {translate("customers.code")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("customers.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<Customer, CustomerFilter>(
          master.filter,
          nameof(master.list[0].name)
        ),
        render(...[name]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": name && name.length >= 30,
                })}
              >
                {name}
              </div>
              <div className="cell-master__second-row">
                {translate("customers.name")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("customers.phone")}
          </div>
        ),
        key: nameof(master.list[0].phone),
        dataIndex: nameof(master.list[0].phone),
        sorter: true,
        sortOrder: getAntOrderType<Customer, CustomerFilter>(
          master.filter,
          nameof(master.list[0].phone)
        ),
        render(...[phone]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": phone && phone.length >= 30,
                })}
              >
                {phone}
              </div>
              <div className="cell-master__second-row">
                {translate("customers.phone")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("customers.email")}
          </div>
        ),
        key: nameof(master.list[0].email),
        dataIndex: nameof(master.list[0].email),
        sorter: true,
        sortOrder: getAntOrderType<Customer, CustomerFilter>(
          master.filter,
          nameof(master.list[0].email)
        ),
        render(...[email]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": email && email.length >= 30,
                })}
              >
                {email}
              </div>
              <div className="cell-master__second-row">
                {translate("customers.email")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("general.actions.label")}
          </div>
        ),
        key: "action",
        dataIndex: nameof(master.list[0].id),
        fixed: "right",
        width: 150,
        align: "center",
        render(id: number, customer: Customer) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, customer)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [master, translate, menu]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <label className="label">{translate("customers.code")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("customers.placeholder.code")}
              isMaterial={true}
            />
          </Col>
        </Row>
      </div>
    ),
    [master, translate]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("customers.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={customerRepository}
          translate={translate}
          isMaterialActionAdvance={true}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          isDragable={true}
          rowSelection={rowSelection}
        >
          {translate("products.table.title")}
        </AppMainMasterTable>
      </div>
      <CustomerPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
    </>
  );
}

export default CustomerMaster;
