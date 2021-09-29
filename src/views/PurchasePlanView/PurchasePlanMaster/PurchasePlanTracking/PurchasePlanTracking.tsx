/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tabs } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import Pagination from "components/Utility/Pagination/Pagination";
import { API_PURCHASE_PLAN_PREFIX } from "config/api-consts";
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { AppUser, AppUserFilter } from "models/AppUser";
import { OrganizationFilter } from "models/Organization";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
import { PurchasePlanType } from "models/PurchasePlanType";
import { PurchaseRequest } from "models/PurchaseRequest/PurchaseRequest";
import { StatusFilter } from "models/Status";
import { Moment } from "moment";
import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import authenticationService from "services/authentication-service";
import masterService from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import PurchasePlanPreview from "./PurchasePlanPreview";
/* end individual import */
import "./PurchasePlanTracking.scss";
import { usePurchasePlanTracking } from "./PurchasePlanTrackingHook/PurchasePlanTrackingHook";

const { TabPane } = Tabs;

export interface PurchasePlanTrackingProps {
  setViewIndex?: Dispatch<SetStateAction<string>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

function PurchasePlanTracking(props: PurchasePlanTrackingProps) {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction(
    "purchasePlan",
    API_PURCHASE_PLAN_PREFIX
  );

  const { setViewIndex, setLoading } = props;
  const { repo, handleTabChange: handleClickTab } = masterService.useRepository(
    purchasePlanRepository
  );

  const master = usePurchasePlanTracking(
    PurchasePlanFilter,
    PURCHASE_PLAN_ROUTE,
    repo.list,
    repo.count,
    purchasePlanRepository.delete
  );

  const handleGoCreate = useCallback(() => {
    setViewIndex("3");
    setLoading(true);
  }, [setLoading, setViewIndex]);

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

  const handleTabChange = React.useCallback(
    (activeKey: string) => {
      handleClickTab(activeKey);
      const filter = { ...master.filter };
      filter["tabNumber"] = activeKey;
      master.handleUpdateNewFilter(filter);
    },
    [master, handleClickTab]
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

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleClosePreview,
  } = masterService.usePreview<PurchasePlan>(
    PurchasePlan,
    purchasePlanRepository.get
  );

  const menu = React.useCallback(
    (id: number, purchasePlan: PurchasePlan) => (
      <Menu>
        {(purchasePlan?.purchasePlanStatusId === 5 ||
          purchasePlan?.requestStateId === 2 ||
          purchasePlan?.requestStateId === 3 ||
          typeof master.filter["tabNumber"] === "undefined" ||
          master.filter["tabNumber"] === "1") && (
            <Menu.Item key="1">
              <div
                className="ant-action-menu"
                onClick={master.handleGoPreview(purchasePlan)}
              >
                {translate("general.actions.view")}
              </div>
            </Menu.Item>
          )}
        {purchasePlan?.purchasePlanStatusId !== 1 &&
          purchasePlan?.purchasePlanStatusId !== 5 &&
          purchasePlan?.requestStateId === 1 &&
          typeof master.filter["tabNumber"] !== "undefined" &&
          master.filter["tabNumber"] !== "1" && (
            <Menu.Item key="2">
              <div
                className="ant-action-menu"
                onClick={master.handleGoWaiting(purchasePlan)}
              >
                {translate("general.actions.view")}
              </div>
            </Menu.Item>
          )}
        {purchasePlan?.purchasePlanStatusId === 2 &&
          typeof master.filter["tabNumber"] !== "undefined" &&
          master.filter["tabNumber"] !== "1" && (
            <Menu.Item key="3">
              <div
                className="ant-action-menu"
                onClick={master.handleGoApprove(purchasePlan)}
              >
                {translate("general.actions.approve")}
              </div>
            </Menu.Item>
          )}

        {purchasePlan?.purchasePlanStatusId === 1 &&
          purchasePlan?.requestStateId === 1 &&
          typeof master.filter["tabNumber"] !== "undefined" &&
          master.filter["tabNumber"] !== "1" && (
            <Menu.Item key="4">
              <div
                className="ant-action-menu"
                onClick={master.handleGoDetail(purchasePlan)}
              >
                {translate("general.actions.edit")}
              </div>
            </Menu.Item>
          )}
        {purchasePlan?.purchasePlanStatusId === 1 && (
          <Menu.Item key="5">
            <div
              className="ant-action-menu"
              onClick={() => master.handleServerDelete(purchasePlan)}
            >
              {translate("general.actions.delete")}
            </div>
          </Menu.Item>
        )}
      </Menu>
    ),
    [master, translate]
  );

  const classNameRequestState = React.useMemo(() => {
    return (id, isRequestState) => {
      switch (id) {
        case 1:
          return "draft-state";
        case 2:
          return isRequestState ? "pending-state" : "waiting-quotation-state";
        case 3:
          return isRequestState ? "approved-state" : "has-quotation-state";
        case 4:
          return isRequestState ? "reject-state" : "chosen-supplier-state";
        case 5:
          return "cancelled-state";
        default:
          break;
      }
    };
  }, []);

  const columns: ColumnProps<PurchasePlan>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(code: string, purchasePlan: PurchasePlan) {
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
                <span onClick={master.handleGoPreview(purchasePlan)}>
                  {code}
                </span>
              </div>
              <div className="cell-master__second-row">
                {translate("purchasePlans.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.creator")}
          </div>
        ),
        key: nameof(master.list[0].creator),
        dataIndex: nameof(master.list[0].creator),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].creator)
        ),
        render(creator: AppUser) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames(
                  "cell-master__first-row",

                  {
                    "first-row--ellipsis":
                      creator?.displayName && creator?.displayName.length >= 30,
                  }
                )}
              >
                {creator?.displayName}
              </div>
              <div className="cell-master__second-row">{creator?.email}</div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.prCode")}
          </div>
        ),
        key: nameof(master.list[0].purchaseRequest),
        dataIndex: nameof(master.list[0].purchaseRequest),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].purchaseRequest)
        ),
        render(pr: PurchaseRequest) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row first-row--link")}
              >
                <span onClick={master.handleGoPreviewPurchaseRequest(pr?.id)}>{pr?.code}</span>

              </div>
              <div className="cell-master__second-row">
                {translate("purchasePlans.prCode")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.requestOrganization")}
          </div>
        ),
        key: nameof(master.list[0].requestOrganization),
        dataIndex: nameof(master.list[0].requestOrganization),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          "requestOrganization"
        ),
        render(...[, content]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {content?.purchaseRequest?.requestOrganization.name}
              </div>
              <div className="cell-master__second-row">
                {translate("purchasePlans.requestOrganization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.createdAt")}
          </div>
        ),
        key: nameof(master.list[0].createdAt),
        dataIndex: nameof(master.list[0].createdAt),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].createdAt)
        ),
        render(...params: [Moment, PurchasePlan, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatDate(params[0])}
              </div>
              <div className="cell-master__second-row">
                {translate("purchasePlans.createdAt")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.description")}
          </div>
        ),
        key: nameof(master.list[0].description),
        dataIndex: nameof(master.list[0].description),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].description)
        ),
        render(desc: string) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>{desc}</div>
              <div className="cell-master__second-row">
                {translate("purchasePlans.description")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.ppType")}
          </div>
        ),
        key: nameof(master.list[0].purchasePlanType),
        dataIndex: nameof(master.list[0].purchasePlanType),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].purchasePlanType)
        ),
        align: "right",
        render(ppType: PurchasePlanType) {
          return (
            <div
              className={classNames("pp-type", {
                "pp-type-1": ppType.id === 1,
                "pp-type-2": ppType.id === 2,
                "pp-type-3": ppType.id === 3,
                "pp-type-4": ppType.id === 4,
              })}
            >
              {ppType?.name}
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchasePlans.status")}
          </div>
        ),
        key: nameof(master.list[0].purchasePlanStatus),
        dataIndex: nameof(master.list[0].purchasePlanStatus),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].purchasePlanStatus)
        ),
        width: 200,
        render(...[purchasePlanStatus, content]) {
          if (content?.requestStateId === 1) {
            return (
              <div
                className={classNames(
                  "result-cell__state",
                  classNameRequestState(purchasePlanStatus.id, false)
                )}
              >
                {purchasePlanStatus?.name}
              </div>
            );
          } else {
            return (
              <div
                className={classNames(
                  "result-cell__state",
                  classNameRequestState(content.requestStateId, true)
                )}
              >
                {content?.requestState?.name}
              </div>
            );
          }
        },
        align: "right",
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
        render(id: number, purchasePlan: PurchasePlan) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, purchasePlan)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master, classNameRequestState, menu]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchasePlans.filter.prCode")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].purchaseRequestCode)][
                "contain"
                ]
              }
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].purchaseRequestCode),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate("purchasePlans.placeholder.prCode")}
            />
          </Col>

          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchasePlans.creator")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].creatorId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].creatorId),
                "equal" as any,
                StringFilter
              )}
              classFilter={AppUserFilter}
              getList={purchasePlanRepository.filterListAppUser}
              render={(requestor: AppUser) => requestor?.displayName}
              placeHolder={translate("purchasePlans.placeholder.creator")}
              searchProperty="search"
              searchType={null}
            />
          </Col>

          <Col lg={4}>
            <AdvanceTreeFilter
              title={translate("purchasePlans.requestOrganization")}
              placeHolder={translate(
                "purchasePlans.placeholder.requestOrganization"
              )}
              classFilter={OrganizationFilter}
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].requestOrganizationId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={purchasePlanRepository.filterListOrganization}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].requestOrganizationId)][
                "equal"
                ]
              }
              searchType="contain"
            />
          </Col>

          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchasePlans.code")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate("purchasePlans.placeholder.code")}
            />
          </Col>

          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchasePlans.ppType")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].purchasePlanTypeId)][
                "equal"
                ]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].purchasePlanTypeId),
                "equal" as any,
                IdFilter
              )}
              classFilter={PurchasePlanFilter}
              getList={purchasePlanRepository.filterListPurchasePlanType}
              placeHolder={translate("purchasePlans.placeholder.ppType")}
            />
          </Col>
        </Row>

        <Row justify="space-between" className="mt-3">
          <Col lg={4}>
            <AdvanceDateRangeFilter
              title={translate("purchasePlans.createdAt")}
              onChange={handleChangeDateFilter(nameof(master.filter.createdAt))}
              value={[
                master.filter["createdAt"]["lessEqual"]
                  ? master.filter["createdAt"]["lessEqual"]
                  : null,
                master.filter["createdAt"]["greaterEqual"]
                  ? master.filter["createdAt"]["greaterEqual"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <AdvanceDateRangeFilter
              title={translate("purchasePlans.quotationExpectedAt")}
              onChange={handleChangeDateFilter(
                nameof(master.filter.quotationExpectedAt)
              )}
              value={[
                master.filter["quotationExpectedAt"]["lessEqual"]
                  ? master.filter["quotationExpectedAt"]["lessEqual"]
                  : null,
                master.filter["quotationExpectedAt"]["greaterEqual"]
                  ? master.filter["quotationExpectedAt"]["greaterEqual"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <label className="label">{translate("purchasePlans.status")}</label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].purchasePlanStatusId)][
                "equal"
                ]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].purchasePlanStatusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={purchasePlanRepository.filterListPurchasePlanStatus}
              placeHolder={translate("products.placeholder.status")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} />
          <Col lg={4} />
        </Row>
      </div>
    ),
    [handleChangeDateFilter, master, translate]
  );

  return (
    <>
      <AppMainMasterFilter
        {...master}
        repository={purchasePlanRepository}
        translate={translate}
        isShowDelete={false}
        validAction={validAction}
        handleGoCreate={handleGoCreate}
        isMaterialActionAdvance={true}
      >
        {filterChildren}
      </AppMainMasterFilter>
      <div className="tab-container purchase-plan__tracking">
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
      <PurchasePlanPreview
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

export default PurchasePlanTracking;
