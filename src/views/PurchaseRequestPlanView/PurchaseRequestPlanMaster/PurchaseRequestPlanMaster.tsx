/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tabs } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import Pagination from "components/Utility/Pagination/Pagination";
import { API_PURCHASE_REQUEST_PLAN_PREFIX } from "config/api-consts";
import { PURCHASE_REQUEST_PLAN_ROUTE } from "config/route-consts";
import { AppUser } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import {
  PurchaseRequestPlan,
  PurchaseRequestPlanFilter,
} from "models/PurchaseRequestPlan";
import { Status, StatusFilter } from "models/Status";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { purchaseRequestPlanRepository } from "repositories/purchase-request-plan-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

const { TabPane } = Tabs;

function PurchaseRequestPlanMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction(' purchaseRequestPlan', API_PURCHASE_REQUEST_PLAN_PREFIX);


  const { repo, handleTabChange: handleClickTab } = masterService.useRepository(
    purchaseRequestPlanRepository
  );

  const master: UseMaster = masterService.useMaster<
    PurchaseRequestPlan,
    PurchaseRequestPlanFilter
  >(
    PurchaseRequestPlanFilter,
    PURCHASE_REQUEST_PLAN_ROUTE,
    repo.list,
    repo.count,
    purchaseRequestPlanRepository.delete,
    purchaseRequestPlanRepository.bulkDelete
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
    [master, handleClickTab]
  );

  const menu = React.useCallback(
    (id: number, purchaseRequestPlan: PurchaseRequestPlan) => (
      <Menu>
        <Menu.Item key="1">
          <div className="ant-action-menu" onClick={master.handleGoPreview(id)}>
            {translate("general.actions.view")}
          </div>
        </Menu.Item>
        <Menu.Item key="2">
          <div className="ant-action-menu" onClick={master.handleGoDetail(id)}>
            {translate("general.actions.edit")}
          </div>
        </Menu.Item>
        <Menu.Item key="3">
          <div
            className="ant-action-menu"
            onClick={() => master.handleServerDelete(purchaseRequestPlan)}
          >
            {translate("general.actions.delete")}
          </div>
        </Menu.Item>
      </Menu>
    ),
    [master, translate]
  );

  const columns: ColumnProps<PurchaseRequestPlan>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequestPlans.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<
          PurchaseRequestPlan,
          PurchaseRequestPlanFilter
        >(master.filter, nameof(master.list[0].name)),
        render(name: string, purchaseRequestPlan: PurchaseRequestPlan) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames(
                  "cell-master__first-row",
                  "first-row--link",
                  {
                    "first-row--ellipsis": name && name.length >= 30,
                  }
                )}
              >
                <span onClick={master.handleGoDetail(purchaseRequestPlan.id)}>
                  {name}
                </span>
              </div>
              <div className="cell-master__second-row">
                {purchaseRequestPlan?.code}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequestPlans.creator")}
          </div>
        ),
        key: nameof(master.list[0].creator),
        dataIndex: nameof(master.list[0].creator),
        sorter: true,
        sortOrder: getAntOrderType<
          PurchaseRequestPlan,
          PurchaseRequestPlanFilter
        >(master.filter, nameof(master.list[0].creator)),
        render(creator: AppUser) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    creator?.displayName && creator?.displayName.length >= 30,
                })}
              >
                <span>{creator?.displayName}</span>
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequestPlans.creator")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequestPlans.organization")}
          </div>
        ),
        key: nameof(master.list[0].organization),
        dataIndex: nameof(master.list[0].organization),
        sorter: true,
        sortOrder: getAntOrderType<
          PurchaseRequestPlan,
          PurchaseRequestPlanFilter
        >(master.filter, nameof(master.list[0].organization)),
        render(organization: Organization) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    organization?.name && organization?.name.length >= 30,
                })}
              >
                <span>{organization?.name}</span>
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequestPlans.organization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequestPlans.year")}
          </div>
        ),
        key: nameof(master.list[0].yearKey),
        dataIndex: nameof(master.list[0].yearKey),
        sorter: true,
        sortOrder: getAntOrderType<
          PurchaseRequestPlan,
          PurchaseRequestPlanFilter
        >(master.filter, nameof(master.list[0].yearKey)),
        // render(...params: [number, PurchaseRequestPlan, number]) {
        //   return <div className="text-right">{formatNumber(params[0])}</div>;
        // },
        render(...params: [Status, PurchaseRequestPlan, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                <span className="text-right">{params[0]?.name}</span>
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequestPlans.year")}
              </div>
            </div>
          );
        },
      },

      //   {
      //     title: (
      //       <div className="text-center gradient-text">
      //         {translate("purchaseRequestPlans.status")}
      //       </div>
      //     ),
      //     key: nameof(master.list[0].status),
      //     dataIndex: nameof(master.list[0].status),
      //     sorter: true,
      //     sortOrder: getAntOrderType<
      //       PurchaseRequestPlan,
      //       PurchaseRequestPlanFilter
      //     >(master.filter, nameof(master.list[0].status)),
      //     render(status: Status) {
      //       return status; //fill the render field after generate code;
      //     },
      //   },

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
        render(id: number, purchaseRequestPlan: PurchaseRequestPlan) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menu(id, purchaseRequestPlan)}
                trigger={["click"]}
              >
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master, menu]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequestPlans.name")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate("purchaseRequestPlans.placeholder.name")}
            />
          </Col>
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequestPlans.code")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate("purchaseRequestPlans.placeholder.code")}
            />
          </Col>

          <Col lg={4}>
            <AdvanceTreeFilter
              title={translate("purchaseRequestPlans.organization")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].organizationId)]["equal"]
              }
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].organizationId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              classFilter={OrganizationFilter}
              getTreeData={purchaseRequestPlanRepository.singleListOrganization}
              placeHolder={translate(
                "purchaseRequestPlans.placeholder.organization"
              )}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <AdvanceIdFilter
              title={translate("purchaseRequestPlans.year")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].yearKeyId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].yearKeyId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={purchaseRequestPlanRepository.singleListYearKey}
              placeHolder={translate("purchaseRequestPlans.placeholder.year")}
            />
          </Col>
        </Row>
      </div>
    ),
    [master, translate]
  );

  return (
    <Row>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("purchaseRequestPlans.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={purchaseRequestPlanRepository}
          translate={translate}
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
                {translate("purchaseRequestPlans.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Chờ duyệt"} key={"2"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequestPlans.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Đã duyệt"} key={"3"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequestPlans.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Từ chối"} key={"4"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequestPlans.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Nháp"} key={"5"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("purchaseRequestPlans.table.title")}
              </AppMainMasterTable>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Row>
  );
}

export default PurchaseRequestPlanMaster;
