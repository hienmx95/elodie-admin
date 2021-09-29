/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AxiosError } from "axios";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { API_ROLE_PREFIX } from "config/api-consts";
import { ROLE_DETAIL_ROUTE, ROLE_ROUTE } from "config/route-consts";
import { Permission } from "models/Permission";
import { Role, RoleFilter } from "models/Role";
import { Status, StatusFilter } from "models/Status";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
/* end filter import */
/* begin individual import */
import { roleRepository } from "repositories/role-repository";
import appMessageService from "services/app-message-service";
import authenticationService from "services/authentication-service";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import PermissionRoleDetailModal from "../RoleDetail/PermissionRoleView/PermissionRoleDetailModal";
import RolePreview from "./RolePreview";
/* end individual import */

function RoleMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('role', API_ROLE_PREFIX);

  const history = useHistory();
  const { notifyUpdateItemSuccess, notifyUpdateItemError } =
    appMessageService.useCRUDMessage();
  const [currentRole, setCurrentRole] = React.useState<Role>(new Role());

  const master: UseMaster = masterService.useMaster<Role, RoleFilter>(
    RoleFilter,
    ROLE_ROUTE,
    roleRepository.list,
    roleRepository.count,
    roleRepository.delete,
    roleRepository.bulkDelete
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);
  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Role>
      (
        Role,
        roleRepository.get,
      );

  const {
    model,
    isOpenDetailModal,
    handleUpdateNewModel,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleSaveModel,
    loadingModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    dispatch,
  } = detailService.useDetailModal(
    Permission,
    roleRepository.getPermission,
    roleRepository.savePermission,
  );
  const handleAssignPermission = React.useCallback((role: Role) => {
    setCurrentRole(role);
    handleOpenDetailModal(null);
  }, [handleOpenDetailModal]);

  const handleSavePermission = React.useCallback((role: Role) => {
    model.roleId = currentRole.id;
    handleSaveModel();
  }, [currentRole.id, handleSaveModel, model]);
  const handleGoAssignAppuser = React.useCallback((id) => {
    history.push(
      `${ROLE_DETAIL_ROUTE}/assign-app-user?id=${id}`
    );
  }, [history]);
  const handleClone = React.useCallback((id) => {
    roleRepository.clone(id).subscribe(
      (item: Role) => {
        notifyUpdateItemSuccess();
        master.handleSearch();
      },
      (error: AxiosError<Role>) => {
        notifyUpdateItemError();
      });

  }, [master, notifyUpdateItemError, notifyUpdateItemSuccess]);
  const menuAction = React.useCallback((id: number, role: Role) => (
    <Menu>
      {validAction('clone') &&
        <Menu.Item key="1">
          <Tooltip title={translate("roles.actions.clone")}>
            <div className="ant-action-menu" onClick={() => handleClone(id)}>
              {translate("roles.actions.clone")}
            </div>
          </Tooltip>
        </Menu.Item>
      }
      {validAction('listAppUser') &&
        <Menu.Item key="2">
          <Tooltip title={translate("roles.actions.assignAppUser")}>
            <div
              className="ant-action-menu"
              onClick={() => handleGoAssignAppuser(id)}
            >
              {translate("roles.actions.assignAppUser")}
            </div>
          </Tooltip>
        </Menu.Item>
      }
      {validAction('createPermission') &&
        <Menu.Item key="3">
          <Tooltip title={translate("roles.actions.assignPermission")}>
            <div
              className="ant-action-menu"
              onClick={() => handleAssignPermission(role)}
            >
              {translate("roles.actions.assignPermission")}
            </div>
          </Tooltip>
        </Menu.Item>
      }
      <Menu.Item key="4">
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
        <Menu.Item key="5">
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
      {!role.used && validAction('delete') && (
        <Menu.Item key="6">
          <Tooltip title={translate("general.actions.delete")}>
            <div
              className="ant-action-menu"
              onClick={() => master.handleServerDelete(role)}
            >
              {translate("general.actions.delete")}
            </div>
          </Tooltip>
        </Menu.Item>
      )}
    </Menu >
  ), [
    handleAssignPermission,
    handleClone,
    handleGoAssignAppuser,
    handleOpenPreview,
    master,
    translate,
    validAction,
  ]);

  const columns: ColumnProps<Role>[] = useMemo(
    () => [
      {
        title: (<div className='text-center gradient-text'>{translate('roles.code')}</div>),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<Role, RoleFilter>
          (
            master.filter,
            nameof(master.list[0].code),
          ),
      },

      {
        title: (<div className='text-center gradient-text'>{translate('roles.name')}</div>),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<Role, RoleFilter>
          (
            master.filter,
            nameof(master.list[0].name),
          ),
      },
      {
        title: (<div className='text-center gradient-text'>{translate('roles.status')}</div>),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<Role, RoleFilter>
          (
            master.filter,
            nameof(master.list[0].status),
          ),
        render(status: Status) {
          return (
            <div className={status.id === 1 ? "tag--active" : "tag--inactive"}>
              {status?.name}
            </div>
          );
        },
        width: 200,
        align: "center",
      },
      {
        title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
        key: "action",
        dataIndex: nameof(master.list[0].id),
        fixed: "right",
        width: 150,
        align: "center",
        render(id: number, role: Role) {
          return (
            <div className='d-flex justify-content-center button-action-table'>
              <Dropdown overlay={menuAction(id, role)} trigger={["click"]} placement="bottomCenter" arrow>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ], [translate, master.list, master.filter, menuAction]);
  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4} className='pr-4'>
            <label className='label'>
              {translate('roles.code')}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                'contain' as any,
                StringFilter,
              )}
              placeHolder={translate('roles.placeholder.code')}
              isMaterial={true} />
          </Col>


          <Col lg={4} className='pr-4'>
            <label className='label'>
              {translate('roles.name')}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                'contain' as any,
                StringFilter,
              )}
              placeHolder={translate('roles.placeholder.name')}
              isMaterial={true} />
          </Col>
          <Col lg={4} className='pr-4'>
            <label className='label'>
              {translate('roles.status')}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                'equal' as any,
                IdFilter,
              )}
              classFilter={StatusFilter}
              getList={roleRepository.singleListStatus}
              placeHolder={translate('roles.placeholder.status')}
              isMaterial={true} />
          </Col>
          <Col lg={4} />
          <Col lg={4} />
        </Row>
      </div>

    ), [master, translate]);

  return (
    <>
      <div className='page page__master'>
        <AppMainMasterTitle {...master}>
          {translate('roles.master.title')}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={roleRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          rowSelection={rowSelection}
        >
          {translate("roles.table.title")}
        </AppMainMasterTable>
      </div>
      <RolePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate} />

      <PermissionRoleDetailModal
        model={model}
        visible={isOpenDetailModal}
        handleSave={handleSavePermission}
        handleCancel={handleCloseDetailModal}
        onChangeSimpleField={handleChangeSimpleField}
        onChangeObjectField={handleChangeObjectField}
        dispatchModel={dispatch}
        loading={loadingModel}
        visibleFooter={true}
        setModel={handleUpdateNewModel}

      />

    </>
  );
}

export default RoleMaster;
