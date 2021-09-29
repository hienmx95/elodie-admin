/* begin general import */
import {
  IdFilter,
  NumberFilter,
  StringFilter,
} from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tabs } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceNumberRangeFilter from "components/Utility/AdvanceFilter/AdvanceNumberRangeFilter/AdvanceNumberRangeFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import Pagination from "components/Utility/Pagination/Pagination";
import { API_PURCHASE_REQUEST_PREFIX } from "config/api-consts";
import { PURCHASE_REQUEST_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import { RequestState, RequestStateFilter } from "models/RequestState";
import { Moment } from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { purchaseRequestRepository } from "repositories/purchase-request-repository";
import { advanceFilterService } from "services/advance-filter-service";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import {
  PurchaseRequestTemplateModal,
  usePurchaseRequestTemplate,
} from "../PurchaseRequestDetail/PurchaseRequestDetailHook/CreateFromTemplateHook";
import "./PurchaseRequestMaster.scss";
/* end individual import */

const { TabPane } = Tabs;

function PurchaseRequestMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('purchaseRequest', API_PURCHASE_REQUEST_PREFIX);

  const { repo, handleTabChange: handleClickTab } = masterService.useRepository(
    purchaseRequestRepository
  );

  const master: UseMaster = masterService.useMaster<
    PurchaseRequest,
    PurchaseRequestFilter
  >(
    PurchaseRequestFilter,
    PURCHASE_REQUEST_ROUTE,
    repo.list,
    repo.count,
    purchaseRequestRepository.delete,
    purchaseRequestRepository.bulkDelete
  );

  master.rowSelection = null;

  const tabExtra = React.useMemo(() => {
    return (
      <Pagination
        skip={master.filter.skip}
        take={master.filter.take}
        total={master.total}
        onChange={master.handlePagination}
        style={{ margin: "10px" }}
      />
    );
  }, [master]);

  const [numberRange] = advanceFilterService.useNumberRangeFilter(
    master.filter,
    master.dispatch,
    "total"
  );
  const classRequestState = React.useMemo(() => {
    return (purchaseRequestId) => {
      switch (purchaseRequestId) {
        case 1: {
          return "draft-state";
        }
        case 2: {
          return "pending-state";
        }
        case 3: {
          return "approved-state";
        }

        case 4: {
          return "reject-state";
        }
      }
    };
  }, []);

  const handleTabChange = React.useCallback(
    (
      activeKey: string,
      e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
    ) => {
      handleClickTab(activeKey);
      const filter = { ...master.filter };
      filter["tabNumber"] = activeKey;
      master.handleUpdateNewFilter(filter);
    },
    [handleClickTab, master]
  );

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
    (id: number, purchaseRequest: PurchaseRequest) => (
      <Menu>
        <Menu.Item key="1">
          <div className="ant-action-menu" onClick={master.handleGoPreview(id)}>
            {translate("general.actions.view")}
          </div>
        </Menu.Item>
        {purchaseRequest.requestStateId === 1 && (
          <Menu.Item key="2">
            <div
              className="ant-action-menu"
              onClick={master.handleGoDetail(id)}
            >
              {translate("general.actions.edit")}
            </div>
          </Menu.Item>
        )}
        {purchaseRequest.requestStateId === 2 &&
          typeof master.filter["tabNumber"] !== "undefined" &&
          master.filter["tabNumber"] !== "1" && (
            <Menu.Item key="3">
              <div
                className="ant-action-menu"
                onClick={master.handleGoApproval(id)}
              >
                {translate("general.actions.approve")}
              </div>
            </Menu.Item>
          )}
        {purchaseRequest.requestStateId === 1 && !purchaseRequest?.used && (
          <Menu.Item key="4">
            <div
              className="ant-action-menu"
              onClick={() => master.handleServerDelete(purchaseRequest)}
            >
              {translate("general.actions.delete")}
            </div>
          </Menu.Item>
        )}
      </Menu>
    ),
    [master, translate]
  );
  const {
    openItemDialog,
    templateList,
    templateFilter,
    handleOpenMenuCreate,
    handleChangeSearchItem,
    handleGoCreateFormTemplate,
    handleFilterDate,
    handleCancel,
  } = usePurchaseRequestTemplate();

  const columns: ColumnProps<PurchaseRequest>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.code")}
          </div>
        ),
        width: 150,
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(code: string, purchaseRequest: PurchaseRequest) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames(
                  "cell-master__first-row",
                  "first-row--link",
                  {
                    "first-row--ellipsis": code && code.length >= 30,
                  }
                )}
              >
                <span onClick={master.handleGoPreview(purchaseRequest.id)}>
                  {code}
                </span>
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestor")}
          </div>
        ),
        width: 170,
        key: nameof(master.list[0].requestor),
        dataIndex: nameof(master.list[0].requestor),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].requestor)
        ),
        render(requestor: AppUser) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    requestor?.displayName &&
                    requestor?.displayName.length >= 30,
                })}
              >
                {requestor?.displayName}
              </div>
              <div className="cell-master__second-row">{requestor?.email}</div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestOrganization")}
          </div>
        ),
        width: 170,
        key: nameof(master.list[0].requestOrganization),
        dataIndex: nameof(master.list[0].requestOrganization),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].requestOrganization)
        ),
        render(requestOrganization: Organization) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    requestOrganization?.name &&
                    requestOrganization?.name.length >= 30,
                })}
              >
                {requestOrganization?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.requestOrganization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestedAt")}
          </div>
        ),
        width: 150,
        key: nameof(master.list[0].requestedAt),
        dataIndex: nameof(master.list[0].requestedAt),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].requestedAt)
        ),
        render(...params: [Moment, PurchaseRequest, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatDate(params[0])}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.requestedAt")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.description")}
          </div>
        ),
        width: 200,
        key: nameof(master.list[0].description),
        dataIndex: nameof(master.list[0].description),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].description)
        ),
        render(description: string) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    description && description.length >= 50,
                })}
              >
                {description}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.description")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.total")}
          </div>
        ),
        width: 120,
        key: nameof(master.list[0].total),
        dataIndex: nameof(master.list[0].total),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].total)
        ),
        render(total: number) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatNumber(total)}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.total")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestState")}
          </div>
        ),
        width: 150,
        key: nameof(master.list[0].requestState),
        dataIndex: nameof(master.list[0].requestState),
        sorter: true,
        sortOrder: getAntOrderType<PurchaseRequest, PurchaseRequestFilter>(
          master.filter,
          nameof(master.list[0].requestState)
        ),
        render(...params: [RequestState, PurchaseRequest, number]) {
          return params[1].purchaseRequestStatusId === 2 ? (
            <div className="created-purchase-plan">
              {params[1].purchaseRequestStatus.name}
            </div>
          ) : (
            <div className={classRequestState(params[1].requestStateId)}>
              {params[0]?.name}
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
        width: 120,
        align: "center",
        render(id: number, purchaseRequest: PurchaseRequest) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, purchaseRequest)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [classRequestState, master, menu, translate]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequests.code")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate("purchaseRequests.placeholder.code")}
            />
          </Col>

          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchaseRequests.requestor")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].requestorId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].requestorId),
                "equal" as any,
                IdFilter
              )}
              classFilter={AppUserFilter}
              getList={purchaseRequestRepository.filterListAppUser}
              placeHolder={translate("purchaseRequests.placeholder.requestor")}
              render={(user: AppUser) => user?.displayName}
            />
          </Col>

          <Col lg={4}>
            <AdvanceTreeFilter
              title={translate("purchaseRequests.requestOrganization")}
              classFilter={OrganizationFilter}
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].requestOrganizationId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={purchaseRequestRepository.filterListOrganization}
              isMaterial={true}
              placeHolder={translate(
                "purchaseRequests.placeholder.requestOrganization"
              )}
              value={
                master.filter[nameof(master.list[0].requestOrganizationId)][
                "equal"
                ]
              }
            />
          </Col>

          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchaseRequests.recipient")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].recipientId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].recipientId),
                "equal" as any,
                IdFilter
              )}
              classFilter={AppUserFilter}
              getList={purchaseRequestRepository.filterListAppUser}
              placeHolder={translate("purchaseRequests.placeholder.recipient")}
              render={(user: AppUser) => user?.displayName}
            />
          </Col>

          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequests.recipientPhoneNumber")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].recipientPhoneNumber)][
                "contain"
                ]
              }
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].recipientPhoneNumber),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate(
                "purchaseRequests.placeholder.recipientPhoneNumber"
              )}
            />
          </Col>
        </Row>
        <Row justify="space-between" className="mt-3">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequests.recipientAddress")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].recipientAddress)][
                "contain"
                ]
              }
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].recipientAddress),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate(
                "purchaseRequests.placeholder.recipientAddress"
              )}
            />
          </Col>

          <Col lg={4}>
            <AdvanceDateRangeFilter
              title={translate("purchaseRequests.requestedAt")}
              onChange={handleChangeDateFilter(
                nameof(master.filter.requestedAt)
              )}
              value={[
                master.filter["requestedAt"]["lessEqual"]
                  ? master.filter["requestedAt"]["lessEqual"]
                  : null,
                master.filter["requestedAt"]["greaterEqual"]
                  ? master.filter["requestedAt"]["greaterEqual"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <AdvanceDateRangeFilter
              title={translate("purchaseRequests.expectedAt")}
              onChange={handleChangeDateFilter(
                nameof(master.filter.expectedAt)
              )}
              value={[
                master.filter["expectedAt"]["lessEqual"]
                  ? master.filter["expectedAt"]["lessEqual"]
                  : null,
                master.filter["expectedAt"]["greaterEqual"]
                  ? master.filter["expectedAt"]["greaterEqual"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <AdvanceNumberRangeFilter
              placeHolderRange={["Từ...", "Đến..."]}
              isMaterial={true}
              title={translate("purchaseRequests.total")}
              valueRange={numberRange}
              onChangeRange={master.handleChangeFilter(
                nameof(master.list[0].total),
                null,
                NumberFilter
              )}
              decimalDigit={2}
              numberType="DECIMAL"
            />
          </Col>
          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchaseRequests.requestState")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].requestStateId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].requestStateId),
                "equal" as any,
                IdFilter
              )}
              classFilter={RequestStateFilter}
              getList={purchaseRequestRepository.filterListRequestState}
              placeHolder={translate("purchaseRequests.placeholder.requestState")}

            />
          </Col>
        </Row>
      </div>
    ),
    [handleChangeDateFilter, master, numberRange, translate]
  );
  return (
    <>
      <div className="page page__master purchase-request-master">
        <AppMainMasterTitle {...master}>
          {translate("purchaseRequests.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={purchaseRequestRepository}
          translate={translate}
          isShowDelete={false}
          isMaterialAction={true}
          handleGoCreateTemplate={handleOpenMenuCreate}
          validAction={validAction}

        >
          {filterChildren}
        </AppMainMasterFilter>
        <div className="tab-container">
          <Tabs
            activeKey={
              master.filter["tabNumber"] ? master.filter["tabNumber"] : "1"
            }
            tabBarExtraContent={tabExtra}
            onTabClick={handleTabChange}
          >
            <TabPane tab={"Tất cả"} key={"1"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequests.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Của tôi"} key={"2"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequests.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Tôi duyệt"} key={"3"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequests.table.title")}
              </AppMainMasterTable>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <PurchaseRequestTemplateModal
        itemList={templateList}
        itemFilter={templateFilter}
        visibleDialog={openItemDialog}
        handleChangeSearchItem={handleChangeSearchItem}
        translate={translate}
        handleGoCreateFormTemplate={handleGoCreateFormTemplate}
        onCancelDialog={handleCancel}
        handleFilterDate={handleFilterDate}
      />
    </>
  );
}

export default PurchaseRequestMaster;
