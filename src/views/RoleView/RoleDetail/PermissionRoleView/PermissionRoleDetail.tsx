/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Dropdown, Menu as MenuAntd, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import Pagination from "components/Utility/Pagination/Pagination";
import { renderMasterIndex } from "helpers/table";
import { Menu, MenuFilter } from "models/Menu";
import { Permission, PermissionFilter } from "models/Permission";
import { Status } from "models/Status";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { roleRepository } from "repositories/role-repository";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import detailService from "services/pages/detail-service";
import { queryStringService } from "services/query-string-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import { usePermissionRoleMappingHook } from "../RoleDetailHook/PermissionRoleMappingHook";
import './PermissionRoleDetail.scss';
import PermissionDetailModal from "./PermissionRoleDetailModal";
/* end individual import */

function PermissionRoleDetail() {
    const [translate] = useTranslation();
    const { id }: any = queryStringService.useGetQueryString(
        "id"
    );

    const {
        list,
        total,
        loading,
        filter,
        handleChangeFilter,
        handleTableChange,
        handleServerDelete,
        handleSearch,
        pagination,
        handlePagination,
    } = usePermissionRoleMappingHook(
        PermissionFilter,
        roleRepository.listPermission,
        roleRepository.countPermission,
        roleRepository.deletePermission,
        id,
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
        handleSearch,
    );
    const handleSave = React.useCallback(() => {
        model.roleId = id;
        handleSaveModel();
    }, [handleSaveModel, id, model]);


    const handleGoCreate = React.useCallback(() => {

        handleOpenDetailModal(null);
    }, [handleOpenDetailModal]);
    const handleGoDetail = React.useCallback((id: number) => () => {

        handleOpenDetailModal(id);
    }, [handleOpenDetailModal]);

    const menuAction = React.useCallback((id: number, permission: Permission) => (
        <MenuAntd>
            <MenuAntd.Item key="1">
                <Tooltip title={translate("general.actions.edit")}>
                    <div className="ant-action-menu"

                        onClick={handleGoDetail(id)}
                    >
                        {translate("general.actions.edit")}
                    </div>
                </Tooltip>
            </MenuAntd.Item>
            <MenuAntd.Item key="2">
                <Tooltip title={translate("general.actions.delete")}>
                    <div className="ant-action-menu"
                        onClick={() => handleServerDelete(permission)}>
                        {translate("general.actions.delete")}
                    </div>
                </Tooltip>
            </MenuAntd.Item>
        </MenuAntd>
    ), [handleGoDetail, handleServerDelete, translate]);
    const {
        RenderStringFilter,
        RenderIdFilter,
    } = componentFactoryService;

    const columns: ColumnProps<Permission>[] = useMemo(
        () => [
            {
                title: (<div className='text-center gradient-text mb-5'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 70,
                align: 'center',
                render: renderMasterIndex<Permission>(pagination),
            },

            {
                title: (() => (
                    <div style={{ width: "300px" }}>
                        <div
                            className='text-left gradient-text  mb-2'>
                            {translate('permissions.code')}
                        </div>
                        {  RenderStringFilter(
                            filter[nameof(list[0].code)]["contain"],
                            handleChangeFilter(
                                nameof(list[0].code),
                                "contain" as any,
                                StringFilter,
                            ),
                            translate("permissions.placeholder.code"),
                        )}
                    </div>
                )),
                key: nameof(list[0].code),
                dataIndex: nameof(list[0].code),
                width: 300,
                sortOrder: getAntOrderType<Permission, PermissionFilter>
                    (
                        filter,
                        nameof(list[0].code),
                    ),
            },

            {
                title: (() => (
                    < div style={{ width: "300px" }}>
                        <div
                            className='text-left gradient-text  mb-2'>{translate('permissions.name')}
                        </div>
                        {
                            RenderStringFilter(
                                filter[nameof(list[0].name)]["contain"],
                                handleChangeFilter(
                                    nameof(list[0].name),
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("permissions.placeholder.name"),
                            )
                        }
                    </div >
                )),
                width: 300,
                key: nameof(list[0].name),
                dataIndex: nameof(list[0].name),
                sortOrder: getAntOrderType<Permission, PermissionFilter>
                    (
                        filter,
                        nameof(list[0].name),
                    ),
            },

            {
                title: (() => (
                    <div style={{ width: "300px" }}>
                        <div className='text-left gradient-text mb-2'>
                            {translate('permissions.menu')}
                        </div>

                        {RenderIdFilter(
                            filter[nameof(list[0].menuId)]["equal"],

                            handleChangeFilter(
                                nameof(list[0].menuId),
                                'equal' as any,
                                IdFilter,
                            ),
                            MenuFilter,
                            roleRepository.singleListMenu,
                            translate('permissions.placeholder.menu')
                        )}
                    </div>
                )
                ),
                width: 300,
                key: nameof(list[0].menu),
                dataIndex: nameof(list[0].menu),
                sortOrder: getAntOrderType<Permission, PermissionFilter>
                    (
                        filter,
                        nameof(list[0].menu),
                    ),
                render(menu: Menu) {
                    return menu.name; //fill the render field after generate code;
                },
            },

            {
                title: (
                    <div className='text-left gradient-text mb-5'>
                        {translate('permissions.status')}
                    </div>),
                key: nameof(list[0].status),
                dataIndex: nameof(list[0].status),
                sortOrder: getAntOrderType<Permission, PermissionFilter>
                    (
                        filter,
                        nameof(list[0].status),
                    ),
                align: 'center',
                width: 200,
                render(status: Status) {
                    return (
                        <div className={status?.id === 1 ? "tag--active" : "tag--inactive"}>
                            {status?.name}
                        </div>
                    );
                },
            },

            {
                title: (<div className='text-center gradient-text mb-5'>{translate("general.actions.label")}</div>),
                key: "action",
                dataIndex: nameof(list[0].id),
                fixed: "right",
                width: 150,
                align: "center",
                render(id: number, permission: Permission) {
                    return (
                        <div className='d-flex justify-content-center button-action-table'>
                            <Dropdown overlay={menuAction(id, permission)} trigger={["click"]} placement="bottomCenter" arrow>
                                <span className="action__dots">...</span>
                            </Dropdown>
                        </div>
                    );
                },
            },
        ], [
        translate,
        pagination,
        list,
        filter,
        RenderStringFilter,
        handleChangeFilter,
        RenderIdFilter,
        menuAction,
    ]);

    return (
        <>
            <div className='page page__master permission-role-detail'>
                <button
                    className="btn component__btn-toggle grow-animate-1 ml-3"
                    onClick={handleGoCreate}
                >
                    <i className="tio-add mr-2"></i>
                    <span className="component_btn-text">
                        {translate("general.button.add")}
                    </span>
                </button>
                <Table
                    rowKey={nameof(list[0].id)}
                    columns={columns}
                    pagination={false}
                    dataSource={list}
                    loading={loading}
                    onChange={handleTableChange}
                    className='mt-5 ml-3'
                    title={() => (
                        <div className="d-flex justify-content-end">
                            <Pagination
                                skip={filter.skip}
                                take={filter.take}
                                total={total}
                                onChange={handlePagination}
                                style={{ margin: "10px" }}
                            />
                        </div>

                    )}

                />
                <PermissionDetailModal
                    model={model}
                    visible={isOpenDetailModal}
                    handleSave={handleSave}
                    handleCancel={handleCloseDetailModal}
                    onChangeSimpleField={handleChangeSimpleField}
                    onChangeObjectField={handleChangeObjectField}
                    dispatchModel={dispatch}
                    loading={loadingModel}
                    visibleFooter={true}
                    setModel={handleUpdateNewModel}
                />
            </div>
        </>
    );
}

export default PermissionRoleDetail;
