/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tabs, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import Pagination from "components/Utility/Pagination/Pagination";
import { API_PRINCIPAL_CONTRACT_PREFIX } from "config/api-consts";
import { PRINCIPAL_CONTRACT_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { AppUser } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import {
  PrincipalContract,
  PrincipalContractFilter,
} from "models/PrincipalContract";
import { RequestState } from "models/RequestState";
import { Supplier, SupplierFilter } from "models/Supplier";
import { Moment } from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { principalContractRepository } from "repositories/principal-contract-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import {
  PrincipalContractTemplateModal,
  usePrincipalContractTemplate,
} from "../PrincipalContractDetail/PrincipalContractDetailHook/PrincipalContractTemplateHook";
/* end individual import */
const { TabPane } = Tabs;
function PrincipalContractMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('principalContract', API_PRINCIPAL_CONTRACT_PREFIX);

  const { repo, handleTabChange: handleClickTab } = masterService.useRepository(
    principalContractRepository
  );

  const master: UseMaster = masterService.useMaster<
    PrincipalContract,
    PrincipalContractFilter
  >(
    PrincipalContractFilter,
    PRINCIPAL_CONTRACT_ROUTE,
    repo.list,
    repo.count,
    principalContractRepository.delete,
    principalContractRepository.bulkDelete
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

  const handleChangeDateFilter = React.useCallback(
    (dateMoment: [Moment, Moment]) => {
      const newFilter = { ...master.filter };
      newFilter["startedAt"]["less"] = dateMoment[1];
      newFilter["endedAt"]["greater"] = dateMoment[0];
      master.handleUpdateNewFilter(newFilter);
    },
    [master]
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

  const menu = React.useCallback(
    (id: number, principalContract: PrincipalContract) => (
      <Menu>
        <Menu.Item key="1">
          <div className="ant-action-menu" onClick={master.handleGoPreview(id)}>
            {translate("general.actions.view")}
          </div>
        </Menu.Item>
        {principalContract.requestStateId === 1 &&
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
        {principalContract.requestStateId === 2 &&
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
        {!principalContract.used && principalContract.requestStateId === 1 && (
          <Menu.Item key="4">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(principalContract)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
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
    handleCancel,
    handleFilterDate,
  } = usePrincipalContractTemplate();
  const columns: ColumnProps<PrincipalContract>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("principalContracts.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(code: string, principalContract: PrincipalContract) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames(
                  "cell-master__first-row",
                  "first-row--link",
                  {
                    "first-row--ellipsis":
                      principalContract?.name &&
                      principalContract?.name.length >= 30,
                  }
                )}
              >
                <span onClick={master.handleGoDetail(principalContract.id)}>
                  {principalContract?.name}
                </span>
              </div>
              <div className="cell-master__second-row">{code}</div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("principalContracts.manager")}
          </div>
        ),
        key: nameof(master.list[0].manager),
        dataIndex: nameof(master.list[0].manager),
        sorter: true,
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].manager)
        ),
        render(manager: AppUser) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    manager?.displayName && manager?.displayName.length >= 30,
                })}
              >
                {manager?.displayName}
              </div>
              <div className="cell-master__second-row">
                {translate("principalContracts.manager")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("principalContracts.organization")}
          </div>
        ),
        key: nameof(master.list[0].organization),
        dataIndex: nameof(master.list[0].organization),
        sorter: true,
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].organization)
        ),
        render(organization: Organization) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    organization?.name && organization?.name.length >= 30,
                })}
              >
                {organization?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("principalContracts.organization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("principalContracts.supplier")}
          </div>
        ),
        key: nameof(master.list[0].supplier),
        dataIndex: nameof(master.list[0].supplier),
        sorter: true,
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].supplier)
        ),
        render(supplier: Supplier) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    supplier?.name && supplier?.name.length >= 30,
                })}
              >
                {supplier?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("principalContracts.supplier")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("principalContracts.startedAt")}
          </div>
        ),
        key: nameof(master.list[0].startedAt),
        dataIndex: nameof(master.list[0].startedAt),
        sorter: true,
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].startedAt)
        ),
        render(...params: [Moment, PrincipalContract, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatDate(params[0])}
              </div>
              <div className="cell-master__second-row">
                {translate("principalContracts.startedAt")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("principalContracts.endedAt")}
          </div>
        ),
        key: nameof(master.list[0].endedAt),
        dataIndex: nameof(master.list[0].endedAt),
        sorter: true,
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].endedAt)
        ),
        render(...params: [Moment, PrincipalContract, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatDate(params[0])}
              </div>
              <div className="cell-master__second-row">
                {translate("principalContracts.endedAt")}
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
        sortOrder: getAntOrderType<PrincipalContract, PrincipalContractFilter>(
          master.filter,
          nameof(master.list[0].requestState)
        ),
        render(...params: [RequestState, PrincipalContract, number]) {
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
        width: 100,
        align: "center",
        render(id: number, principalContract: PrincipalContract) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menu(id, principalContract)}
                trigger={["click"]}
              >
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master, classRequestState, menu]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("principalContracts.name")}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("principalContracts.placeholder.name")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("principalContracts.code")}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("principalContracts.placeholder.code")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("principalContracts.supplier")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].supplierId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].supplierId),
                "equal" as any,
                IdFilter
              )}
              classFilter={SupplierFilter}
              getList={principalContractRepository.filterListSupplier}
              placeHolder={translate("principalContracts.placeholder.supplier")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("principalContracts.organization")}
            </label>
            <AdvanceTreeFilter
              value={
                master.filter[nameof(master.list[0].organizationId)]["equal"]
              }
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].organizationId),
                "equal" as any,
                IdFilter
              )}
              classFilter={OrganizationFilter}
              getTreeData={principalContractRepository.filterListOrganization}
              placeHolder={translate(
                "principalContracts.placeholder.organization"
              )}
              isMaterial={true}
              checkStrictly={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("principalContracts.date")}
            </label>
            <AdvanceDateRangeFilter
              onChange={handleChangeDateFilter}
              value={[
                master.filter["startedAt"]["less"]
                  ? master.filter["startedAt"]["less"]
                  : null,
                master.filter["endedAt"]["greater"]
                  ? master.filter["endedAt"]["greater"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>
        </Row>
      </div>
    ),
    [master, translate, handleChangeDateFilter]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("principalContracts.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={principalContractRepository}
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
                {translate("principalContracts.table.title")}
              </AppMainMasterTable>
            </TabPane>
            <TabPane tab={"Tôi duyệt"} key={"3"}>
              <AppMainMasterTable
                {...master}
                isShowTitle={false}
                translate={translate}
                columns={columns}
              >
                {translate("principalContracts.table.title")}
              </AppMainMasterTable>
            </TabPane>

          </Tabs>
        </div>
      </div>
      <PrincipalContractTemplateModal
        itemList={templateList}
        templateFilter={templateFilter}
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

export default PrincipalContractMaster;
