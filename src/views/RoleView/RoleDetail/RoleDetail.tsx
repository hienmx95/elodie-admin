/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { ROLE_ROUTE } from 'config/route-consts';
import { Role } from 'models/Role';
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { roleRepository } from "repositories/role-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import PermissionRoleDetail from "./PermissionRoleView/PermissionRoleDetail";
import {
    appUserRoleMappingContentMapper,
    useAppUserRoleMappingModal,
    useAppUserRoleMappingTable,
} from "./RoleDetailHook/AppUserRoleMappingHook";
import { useRoleFooterHook } from "./RoleDetailHook/RoleFooterHook";
/* end individual import */


const { Panel } = Collapse;
function RoleDetail() {
    const [translate] = useTranslation();
    const [statusList] = enumService.useEnumList<Status>(
        roleRepository.singleListStatus
    );
    const url = document.URL;
    const isLinkAssginAppUser = React.useMemo(() => {
        let isCheck: boolean = false;
        if (url.includes('assign-app-user')) {
            isCheck = true;
        }
        return isCheck;
    }, [url]);

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeObjectField,
        handleSave,
        handleGoBase,
    } = detailService.useDetail<Role>
            (
                Role,
                roleRepository.get,
                roleRepository.save,
                ROLE_ROUTE,
            );

    const {
        appUserContentFilter,
        appUserRoleMappings,
        setAppUserRoleMappings,
        appUserRoleMappingColumns,
        appUserRoleMappingList,
        loadAppUserRoleMappingList,
        appUserRoleMappingTotal,
        handleAddAppUserRoleMapping,
        handleAppUserRoleMappingTableChange,
        handleAppUserRoleMappingPagination,
        appUserRoleMappingRowSelection,
        canBulkDeleteAppUserRoleMapping,
        handleLocalBulkDeleteAppUserRoleMapping,
        appUserRoleMappingRef,
        handleClickAppUserRoleMapping,
        handleImportAppUserRoleMapping,
        handleExportAppUserRoleMapping,
        handleExportTemplateAppUserRoleMapping,
        handleSearchAppUserRoleMapping,
    } = useAppUserRoleMappingTable(model, handleUpdateNewModel);

    const {
        visibleAppUser,
        appUserFilter,
        handleUpdateNewAppUserFilter,
        handleSearchAppUser,
        handleResetAppUserFilter,
        loadAppUserList,
        setLoadAppUserList,
        appUserModalFilters,
        handleOpenAppUserModal,
        handleCloseAppUserModal,
        handleSaveAppUserModal,
        selectedAppUserList,
        appUserColumns,
    } = useAppUserRoleMappingModal(appUserRoleMappings, handleSearchAppUserRoleMapping);
    const appUserRoleMappingModal = React.useMemo(() => (
        <ContentModal
            content={appUserRoleMappings}
            width={1200}
            setContent={setAppUserRoleMappings}
            visible={visibleAppUser}
            filter={appUserFilter}
            onUpdateNewFilter={handleUpdateNewAppUserFilter}
            onResetFilter={handleResetAppUserFilter}
            onSearch={handleSearchAppUser}
            getList={roleRepository.listAppUser}
            getTotal={roleRepository.countAppUser}
            loadList={loadAppUserList}
            setLoadList={setLoadAppUserList}
            selectedList={selectedAppUserList}
            columns={appUserColumns}
            filterList={appUserModalFilters}
            mapperField={nameof(model.appUserRoleMappings[0].appUser)}
            mapper={appUserRoleMappingContentMapper}
            onClose={handleCloseAppUserModal}
            onSave={handleSaveAppUserModal}
            title={translate('roles.titles.filterAppUser')} />
    ), [
        appUserRoleMappings,
        setAppUserRoleMappings,
        visibleAppUser,
        appUserFilter,
        handleUpdateNewAppUserFilter,
        handleResetAppUserFilter,
        handleSearchAppUser,
        loadAppUserList,
        setLoadAppUserList,
        selectedAppUserList,
        appUserColumns,
        appUserModalFilters,
        model,
        handleCloseAppUserModal,
        handleSaveAppUserModal,
        translate,
    ]);

    const appUserRoleMappingTable = React.useMemo(() => (
        <ContentTable
            model={model}
            filter={appUserContentFilter}
            list={appUserRoleMappingList}
            loadingList={loadAppUserRoleMappingList}
            total={appUserRoleMappingTotal}
            handleTableChange={handleAppUserRoleMappingTableChange}
            rowSelection={appUserRoleMappingRowSelection}
            handleLocalBulkDelete={handleLocalBulkDeleteAppUserRoleMapping}
            canBulkDelete={canBulkDeleteAppUserRoleMapping}
            handleExportContent={handleExportAppUserRoleMapping}
            handleExportTemplateContent={handleExportTemplateAppUserRoleMapping}
            handlePagination={handleAppUserRoleMappingPagination}
            handleAddContent={handleAddAppUserRoleMapping}
            ref={appUserRoleMappingRef}
            handleClick={handleClickAppUserRoleMapping}
            handleImportContentList={handleImportAppUserRoleMapping}
            columns={appUserRoleMappingColumns}
            onOpenModal={handleOpenAppUserModal}
            isShowTitle={false}
        />
    ), [
        model,
        appUserContentFilter,
        appUserRoleMappingList,
        loadAppUserRoleMappingList,
        appUserRoleMappingTotal,
        handleAppUserRoleMappingTableChange,
        appUserRoleMappingRowSelection,
        handleLocalBulkDeleteAppUserRoleMapping,
        canBulkDeleteAppUserRoleMapping,
        handleExportAppUserRoleMapping,
        handleExportTemplateAppUserRoleMapping,
        handleAppUserRoleMappingPagination,
        handleAddAppUserRoleMapping,
        appUserRoleMappingRef,
        handleClickAppUserRoleMapping,
        handleImportAppUserRoleMapping,
        appUserRoleMappingColumns,
        handleOpenAppUserModal
    ]);

    const { childrenAction } = useRoleFooterHook(
        translate,
        model,
        handleGoBase,
        handleSave,
        isLinkAssginAppUser,
    );
    return (
        <>
            <div className='page page__detail'>
                <div className="page__header d-flex align-items-center">
                    {isDetail ? (
                        <div className="page__title mr-1">
                            {translate("roles.detail.title")}
                        </div>
                    ) : (
                        translate("general.actions.create")
                    )}
                </div>

                <div className="page__detail-tabs">
                    <>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col lg={24}>
                                <Collapse
                                    defaultActiveKey={["1"]}
                                    onChange={() => { }}
                                    expandIcon={({ isActive }) => (
                                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                    )}
                                    className="site-collapse-custom-collapse"
                                    expandIconPosition="right"
                                >
                                    <Panel
                                        header={translate('roles.titles.generalInformation')}
                                        key="1"
                                        className="site-collapse-custom-panel"
                                    >
                                        <Row>
                                            <Col lg={6} className='pl-3 mt-3'>
                                                <FormItem label={translate("roles.code")}
                                                    validateStatus={formService.getValidationStatus<Role>(model.errors, nameof(model.code))}
                                                    message={model.errors?.code}>
                                                    <InputText
                                                        isMaterial={true}
                                                        value={model.code}
                                                        placeHolder={translate("roles.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onBlur={handleChangeSimpleField(nameof(model.code))}
                                                        disabled={isLinkAssginAppUser ? true : false}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} className='pl-3 mt-3'>
                                                <FormItem label={translate("roles.name")}
                                                    validateStatus={formService.getValidationStatus<Role>(model.errors, nameof(model.name))}
                                                    message={model.errors?.name}>
                                                    <InputText
                                                        isMaterial={true}
                                                        value={model.name}
                                                        placeHolder={translate("roles.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onBlur={handleChangeSimpleField(nameof(model.name))}
                                                        disabled={isLinkAssginAppUser ? true : false}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} className='pl-3 mt-3'>
                                                <FormItem >
                                                    <span className="component__title mr-3">
                                                        {translate("roles.status")}
                                                    </span>
                                                    <SwitchStatus
                                                        checked={
                                                            model.statusId === statusList[1]?.id ? true : false
                                                        }
                                                        list={statusList}
                                                        onChange={handleChangeObjectField(
                                                            nameof(model.status)
                                                        )}
                                                        disabled={isLinkAssginAppUser ? true : false}
                                                    />

                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                        {isLinkAssginAppUser ?
                            <Row>
                                <Col lg={24}>
                                    <Collapse
                                        defaultActiveKey={["1"]}
                                        onChange={() => { }}
                                        expandIcon={({ isActive }) => (
                                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                        )}
                                        className="site-collapse-custom-collapse"
                                        expandIconPosition="right"
                                    >
                                        <Panel
                                            header={translate('roles.titles.appUserInformation')}
                                            key="1"
                                            className="site-collapse-custom-panel"
                                        >
                                            {isDetail && (
                                                <>
                                                    <Row>

                                                        {appUserRoleMappingTable}
                                                        {appUserRoleMappingModal}

                                                    </Row>
                                                    <Row>
                                                        <div className="action__container">
                                                            <div
                                                                className="button__add mr-2"
                                                                onClick={handleOpenAppUserModal}
                                                            >
                                                                <span className="text-primary">
                                                                    <i className="tio-add_circle_outlined mr-2"></i>
                                                                    {translate("roles.buttons.addAppUser")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </>
                                            )}

                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                            : (
                                isDetail &&

                                <Collapse
                                    defaultActiveKey={["1"]}
                                    onChange={() => { }}
                                    expandIcon={({ isActive }) => (
                                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                    )}
                                    className="site-collapse-custom-collapse"
                                    expandIconPosition="right">
                                    <Panel
                                        header={translate('roles.titles.permissionInformation')}
                                        key="1"
                                        className="site-collapse-custom-panel">
                                        <PermissionRoleDetail />

                                    </Panel>
                                </Collapse>
                            )
                        }
                    </>
                </div>
                <AppFooter
                    childrenAction={childrenAction}
                />
            </div>
        </>
    );
}

export default RoleDetail;
