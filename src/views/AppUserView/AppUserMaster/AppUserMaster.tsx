/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
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
import { API_APP_USER_PREFIX } from "config/api-consts";
import { APP_USER_ROUTE } from "config/route-consts";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import { Status, StatusFilter } from "models/Status";
import React, { useMemo } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { appUserRepository } from "repositories/app-user-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import AppUserChangePassword from "./AppUserChangePassword";
import "./AppUserMaster.scss";
import AppUserPreview from "./AppUserPreview";
import AppUserRoleMappingView, {
  appUserRoleMappingHook,
} from "./AppUserRoleMappingHook";

/* end individual import */

function AppUserMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction(
    "appUser",
    API_APP_USER_PREFIX
  );

  const [isOpenChangePassword, setIsOpenChangePassword] = React.useState<
    boolean
  >(false);

  const [idChangePassword, setIdChangePassword] = React.useState<number>(null);

  const handleOpenChangePassword = React.useCallback((value) => {
    setIdChangePassword(value);
    setIsOpenChangePassword(true);
  }, []);

  const handleCloseChangePassword = React.useCallback(() => {
    setIsOpenChangePassword(false);
  }, []);

  const master: UseMaster = masterService.useMaster<AppUser, AppUserFilter>(
    AppUserFilter,
    APP_USER_ROUTE,
    appUserRepository.list,
    appUserRepository.count,
    appUserRepository.delete,
    appUserRepository.bulkDelete
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<AppUser>(AppUser, appUserRepository.get);

  const {
    visible,
    appUser,
    handleOpenRoleView,
    handleCloseRoleView,
    handleSaveRole,
  } = appUserRoleMappingHook(master.handleSearch);

  const menuAction = React.useCallback(
    (id: number, appUser: AppUser) => (
      <Menu>
        {validAction("listRole") && (
          <Menu.Item key="1">
            <Tooltip title={translate("appUsers.actions.addRole")}>
              <div
                className="ant-action-menu"
                onClick={() => handleOpenRoleView(id)}
              >
                {translate("appUsers.actions.addRole")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
        <Menu.Item key="2">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction("update") && (
          <Menu.Item key="3">
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
        <Menu.Item key="5">
          <Tooltip title={translate("appUsers.changePassword")}>
            <div
              className="ant-action-menu"
              onClick={() => handleOpenChangePassword(id)}
            >
              {translate("appUsers.changePassword")}
            </div>
          </Tooltip>
        </Menu.Item>
        {appUser.statusId === 0 && validAction("delete") && (
          <Menu.Item key="4">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(appUser)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [validAction, translate, handleOpenPreview, master, handleOpenRoleView, handleOpenChangePassword]
  );

  const columns: ColumnProps<AppUser>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.avatar")}
          </div>
        ),
        key: nameof(master.list[0].avatar),
        dataIndex: nameof(master.list[0].avatar),
        align: "center",
        width: 100,
        render(...params: [string, AppUser, number]) {
          return (
            <div className="button-hover">
              {params[0] && <img src={params[0]} className="image" alt="" />}
              {!params[0] && (
                <ConfigProvider colors={["#ef5e5e", "#6fde6f", "#3c3c5f38"]}>
                  <Avatar
                    maxInitials={1}
                    round={true}
                    size="40"
                    name={params[1]?.displayName}
                  />
                </ConfigProvider>
              )}
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.username")}
          </div>
        ),
        key: nameof(master.list[0].username),
        dataIndex: nameof(master.list[0].username),
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          master.filter,
          nameof(master.list[0].username)
        ),
        render(...[username]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": username && username.length >= 30,
                })}
              >
                {username}
              </div>
              <div className="cell-master__second-row">
                {translate("appUsers.username")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.displayName")}
          </div>
        ),
        key: nameof(master.list[0].displayName),
        dataIndex: nameof(master.list[0].displayName),
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          master.filter,
          nameof(master.list[0].displayName)
        ),
        render(...[displayName]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    displayName && displayName.length >= 30,
                })}
              >
                {displayName}
              </div>
              <div className="cell-master__second-row">
                {translate("appUsers.displayName")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.organization")}
          </div>
        ),
        key: nameof(master.list[0].organization),
        dataIndex: nameof(master.list[0].organization),
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
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
                {translate("appUsers.organization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.phone")}
          </div>
        ),
        key: nameof(master.list[0].phone),
        dataIndex: nameof(master.list[0].phone),
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          master.filter,
          nameof(master.list[0].phone)
        ),
        render([...phone]) {
          return (
            <div className="ant-cell-master__container">
              <div className="cell-master__first-row">{phone}</div>
              <div className="cell-master__second-row">
                {translate("appUsers.phone")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.email")}
          </div>
        ),
        key: nameof(master.list[0].email),
        dataIndex: nameof(master.list[0].email),
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          master.filter,
          nameof(master.list[0].email)
        ),
        render([...email]) {
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
                {translate("appUsers.email")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("appUsers.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        align: "center",
        width: 150,
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        render(status: Status) {
          return (
            <div className={status.id === 1 ? "tag--active" : "tag--inactive"}>
              {status?.name}
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
        render(id: number, appUser: AppUser) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menuAction(id, appUser)}
                trigger={["click"]}
                placement="bottomCenter"
                arrow
              >
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master.list, master.filter, menuAction]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4} className="pr-4">
            <label className="label">{translate("appUsers.username")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].username)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].username),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("appUsers.placeholder.username")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">{translate("appUsers.displayName")}</label>
            <AdvanceStringFilter
              value={
                master.filter[nameof(master.list[0].displayName)]["contain"]
              }
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].displayName),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("appUsers.placeholder.displayName")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("appUsers.organization")}
            </label>
            <AdvanceTreeFilter
              placeHolder={translate("appUsers.placeholder.organization")}
              classFilter={OrganizationFilter}
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].organizationId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={appUserRepository.singleListOrganization}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">{translate("appUsers.email")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].email)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].email),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("appUsers.placeholder.email")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">{translate("appUsers.phone")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].phone)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].phone),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("appUsers.placeholder.phone")}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="pr-4 mt-3">
            <label className="label">{translate("appUsers.status")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={appUserRepository.singleListStatus}
              placeHolder={translate("appUsers.placeholder.status")}
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
          {translate("appUsers.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={appUserRepository}
          translate={translate}
          canBulkDelete={false}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          rowSelection={null}
        >
          {translate("appUsers.table.title")}
        </AppMainMasterTable>
      </div>
      <AppUserPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        translate={translate}
      />
      <AppUserChangePassword
        id={idChangePassword}
        isOpenPreview={isOpenChangePassword}
        isLoadingPreview={isLoadingPreview}
        handleClosePanel={handleCloseChangePassword}
        translate={translate}
      />
      <AppUserRoleMappingView
        model={appUser}
        isOpenPreview={visible}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleCloseRoleView}
        onSave={handleSaveRole}
        translate={translate}
      />
    </>
  );
}

export default AppUserMaster;
