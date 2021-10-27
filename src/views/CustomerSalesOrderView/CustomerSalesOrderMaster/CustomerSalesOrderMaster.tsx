import {
  IdFilter,
  NumberFilter,
  StringFilter,
} from "@react3l/advanced-filters";
import { Col, Row, Tooltip, Dropdown, Menu } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceNumberRangeFilter from "components/Utility/AdvanceFilter/AdvanceNumberRangeFilter/AdvanceNumberRangeFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { CUSTOMER_SALES_ORDER_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { renderMasterIndex } from "helpers/table";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Customer, CustomerFilter } from "models/Customer";
import {
  CustomerSalesOrder,
  CustomerSalesOrderFilter,
} from "models/CustomerSalesOrder";
import { EditedPriceStatusFilter } from "models/EditedPriceStatus";
import {
  OrderPaymentStatus,
  OrderPaymentStatusFilter,
} from "models/OrderPaymentStatus";
import { RequestState, RequestStateFilter } from "models/RequestState";
import { Moment } from "moment";
import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import Breadcrumb from "../../../layout/breadcrumb";
import "./CustomerSalesOrderMaster.scss";
import CustomerSalesOrderPreview from "./CustomerSalesOrderPreview";
function CustomerSalesOrderMaster() {
  const [translate] = useTranslation();

  const master: UseMaster = masterService.useMaster<
    CustomerSalesOrder,
    CustomerSalesOrderFilter
  >(
    CustomerSalesOrderFilter,
    CUSTOMER_SALES_ORDER_ROUTE,
    customerSalesOrderRepository.list,
    customerSalesOrderRepository.count,
    customerSalesOrderRepository.delete,
    customerSalesOrderRepository.bulkDelete
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Customer>(CustomerSalesOrder, customerSalesOrderRepository.get);

  const handleChangeDateFilter = React.useCallback(
    (fieldName) => {
      return (dateMoment: [Moment, Moment]) => {
        const newFilter = { ...master.filter };
        newFilter[`${fieldName}`]["lessEqual"] = dateMoment[1];
        newFilter[`${fieldName}`]["greaterEqual"] = dateMoment[0];
        master.handleUpdateNewFilter(newFilter);
      };
    },
    [master]
  );
  const menu = React.useCallback(
    (id: number, customerSalesOrder: CustomerSalesOrder) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {!customerSalesOrder.used && (
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
        )}
        {!customerSalesOrder.used && (
          <Menu.Item key="32">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(customerSalesOrder)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
          
        )}
      </Menu>
    ),
    [handleOpenPreview, master, translate]
  );

  const columns: ColumnProps<CustomerSalesOrder>[] = useMemo(
    () => [
      {
        title: translate("general.columns.index"),
        key: "index",
        width: 100,
        align: "center",
        render: renderMasterIndex<CustomerSalesOrder>(master.pagination),
      },
      {
        title: translate("customerSalesOrders.code"),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        ellipsis: true,
        sorter: true,
        sortOrder: getAntOrderType<
          CustomerSalesOrder,
          CustomerSalesOrderFilter
        >(master.filter, nameof(master.list[0].code)),
      },
      {
        title: translate("customerSalesOrders.customer"),
        key: nameof(master.list[0].customer),
        dataIndex: nameof(master.list[0].customer),
        render(customer: Customer) {
          return customer?.name !== null
            ? customer?.name
            : customer?.company?.name;
        },
      },
      {
        title: translate("customerSalesOrders.total"),
        key: nameof(master.list[0].total),
        dataIndex: nameof(master.list[0].total),
        sorter: true,
        sortOrder: getAntOrderType<
          CustomerSalesOrder,
          CustomerSalesOrderFilter
        >(master.filter, nameof(master.list[0].total)),
        align: "right",
        render(total: number) {
          return <>{formatNumber(total)}</>;
        },
      },
      {
        title: translate("customerSalesOrders.requestState"),
        key: nameof(master.list[0].requestState),
        dataIndex: nameof(master.list[0].requestState),
        render(requestState: RequestState) {
          return requestState?.name;
        },
        align: "center",
      },
      {
        title: translate("customerSalesOrders.orderPaymentStatus"),
        key: nameof(master.list[0].orderPaymentStatus),
        dataIndex: nameof(master.list[0].orderPaymentStatus),
        render(orderPaymentStatus: OrderPaymentStatus) {
          return orderPaymentStatus?.name;
        },
        align: "center",
      },
      {
        title: translate("customerSalesOrders.orderDate"),
        key: nameof(master.list[0].orderDate),
        dataIndex: nameof(master.list[0].orderDate),
        sorter: true,
        sortOrder: getAntOrderType<
          CustomerSalesOrder,
          CustomerSalesOrderFilter
        >(master.filter, nameof(master.list[0].orderDate)),
        render(...[orderDate]) {
          return formatDate(orderDate);
        },
        align: "center",
      },
      {
        title: translate("customerSalesOrders.salesEmployee"),
        key: nameof(master.list[0].salesEmployee),
        dataIndex: nameof(master.list[0].salesEmployee),
        render(salesEmployee: AppUser) {
          return salesEmployee?.displayName;
        },
      },
      {
        title: translate("customerSalesOrders.isEditedPrice"),
        key: nameof(master.list[0].id),
        dataIndex: nameof(master.list[0].id),
        align: "center",
        render(id, customerSalesOrder: CustomerSalesOrder) {
          return (
            <></>
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
        render(id, customerSalesOrder: CustomerSalesOrder) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, customerSalesOrder)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [master.filter, master.list, master.pagination, menu, translate]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container">
        <Row justify="space-between">
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.code")}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("Shared.write", {
                value: translate("customerSalesOrders.code").toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col>
          {/* <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.customerSalesOrderType")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].customerSalesOrderTypeId)][
                  "equal"
                ]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].customerSalesOrderTypeId),
                "equal" as any,
                IdFilter
              )}
              classFilter={CustomerSalesOrderFilter}
              getList={
                customerSalesOrderRepository.filterListCustomerSalesOrderType
              }
              placeHolder={translate("Shared.choose", {
                value: translate(
                  "customerSalesOrders.customerSalesOrderType"
                ).toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col> */}
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.salesEmployee")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].salesEmployeeId)]["equal"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].salesEmployeeId),
                "equal" as any,
                IdFilter
              )}
              classFilter={AppUserFilter}
              searchProperty={nameof(master.list[0].salesEmployee.displayName)}
              getList={customerSalesOrderRepository.singleListAppUser}
              placeHolder={translate("Shared.choose", {
                value: translate(
                  "customerSalesOrders.salesEmployee"
                ).toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.total")}
            </label>
            <AdvanceNumberRangeFilter
              valueRange={[
                master.filter["total"]["greaterEqual"],
                master.filter["total"]["lessEqual"],
              ]}
              onChangeRange={master.handleChangeFilter(
                nameof(master.list[0].total),
                ["greaterEqual", "lessEqual"],
                NumberFilter
              )}
              isMaterial={true}
            />
          </Col>
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.paymentStatus")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].orderPaymentStatusId)][
                  "equal"
                ]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].orderPaymentStatusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={OrderPaymentStatusFilter}
              getList={
                customerSalesOrderRepository.singleListOrderPaymentStatus
              }
              placeHolder={translate("Shared.choose", {
                value: translate(
                  "customerSalesOrders.paymentStatus"
                ).toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col>
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.requestState")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].requestStateId)]["equal"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].requestStateId),
                "equal" as any,
                IdFilter
              )}
              classFilter={RequestStateFilter}
              getList={customerSalesOrderRepository.singleListRequestState}
              placeHolder={translate("Shared.choose", {
                value: translate(
                  "customerSalesOrders.requestState"
                ).toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.orderDate")}
            </label>
            <AdvanceDateRangeFilter
              value={[
                master.filter["orderDate"]["greaterEqual"]
                  ? master.filter["orderDate"]["greaterEqual"]
                  : null,
                master.filter["orderDate"]["lessEqual"]
                  ? master.filter["orderDate"]["lessEqual"]
                  : null,
              ]}
              onChange={handleChangeDateFilter(nameof(master.filter.orderDate))}
              isMaterial={true}
            />
          </Col>
          {/* <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.contract")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].contractId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].contractId),
                "equal" as any,
                IdFilter
              )}
              classFilter={ContractFilter}
              getList={customerSalesOrderRepository.filterListContract}
              placeHolder={translate("Shared.choose", {
                value: translate("customerSalesOrders.contract").toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col> */}
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.customer")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].customerId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].customerId),
                "equal" as any,
                IdFilter
              )}
              classFilter={CustomerFilter}
              getList={customerSalesOrderRepository.singleListCustomer}
              placeHolder={translate("Shared.choose", {
                value: translate("customerSalesOrders.customer").toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          {/* <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.opportunity")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].opportunityId)]["equal"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].opportunityId),
                "equal" as any,
                IdFilter
              )}
              classFilter={OpportunityFilter}
              getList={customerSalesOrderRepository.filterListOpportunity}
              placeHolder={translate("Shared.choose", {
                value: translate(
                  "customerSalesOrders.opportunity"
                ).toLowerCase(),
              })}
              isMaterial={true}
            />
          </Col> */}
          <Col span={7}>
            <label className="label">
              {translate("customerSalesOrders.isEditedPrice")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].editedPriceStatusId)][
                  "equal"
                ]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].editedPriceStatusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={EditedPriceStatusFilter}
              getList={customerSalesOrderRepository.singleListEditedPriceStatus}
              placeHolder={translate("general.placeholder.all")}
              isMaterial={true}
            />
          </Col>
          <Col span={7}></Col>
        </Row>
        <div className="d-flex justify-content-end btn-filter">
          <button
            className="btn btn-sm btn-reset mr-2"
            onClick={master.handleResetFilter}
          >
            <i className="icon-Reload mr-2" />
            {translate("Shared.reload")}
          </button>
          <button
            className="btn btn-sm component__btn-filter"
            onClick={() => master.handleUpdateNewFilter(master.filter)}
          >
            <i className="icon-Filter-2 mr-2" />
            {translate("Shared.filter")}
          </button>
        </div>
      </div>
    ),
    [handleChangeDateFilter, master, translate]
  );

  return (
    <>
      <div>
        <Fragment>
          <Breadcrumb
            parent={[translate("menu.salesOrder")]}
            title={translate("customerSalesOrders.master.title")}
          />
        </Fragment>
      </div>
      <div className="page page__master">
        <AppMainMasterFilter
          {...master}
          repository={customerSalesOrderRepository}
          translate={translate}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          isDragable={true}
        ></AppMainMasterTable>
      </div>
      <CustomerSalesOrderPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
        customerSalesOrderContent={previewModel?.customerSalesOrderContent}
      />
    </>
  );
}

export default CustomerSalesOrderMaster;
