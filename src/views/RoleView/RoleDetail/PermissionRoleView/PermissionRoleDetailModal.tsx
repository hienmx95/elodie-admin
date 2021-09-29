/* begin general import */
import { Card, Col, Row, Spin, Tabs } from "antd";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { MenuFilter } from 'models/Menu';
import { Permission } from 'models/Permission';
import { Role } from "models/Role";
import { Status } from 'models/Status';
import React from "react";
import { useTranslation } from "react-i18next";
import { roleRepository } from "repositories/role-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
import { usePermisionActionMappingHook, usePermisionContentHook } from "../RoleDetailHook/PermssionContentHook";
/* end individual import */

const { TabPane } = Tabs;

interface PermissionRoleDetailModalProps extends ModalProps {
    model: Permission;
    setModel?: (data: Permission) => void,
    onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
    onChangeObjectField?: (
        fieldName: string,
    ) => (fieldIdValue: number, fieldValue?: any) => void;
    onChangeTreeObjectField?: (
        fieldName: string,
        callback?: (id: number) => void,
    ) => (list: any[]) => void;
    dispatchModel?: React.Dispatch<FormDetailAction<Permission>>;
    loading?: boolean;
    role?: Role;
}

function PermissionRoleDetailModal(props: PermissionRoleDetailModalProps) {

    const [translate] = useTranslation();
    const [statusList] = enumService.useEnumList<Status>(
        roleRepository.singleListStatus
    );
    const {
        model,
        onChangeSimpleField,
        onChangeObjectField,
        loading,
        setModel,
        dispatchModel,
    } = props;
    const {
        filter: permissionActionFilter,
        permissionActionMappingList,
        loadPermissionActionMappingList,
        permissionActioMappingTotal,
        permissionActionMappingRowSelection,
        canBulkDeletePermissionActionMapping,
        permissionActionMappingRef,
        handleClickPermissionActionMapping,
        handleImportPermissionActionMapping,
        handleExportPermissionActionMapping,
        handleExportTemplatePermissionActionMapping,
        permissionActionMappingColumns,
    } = usePermisionActionMappingHook(model, dispatchModel);
    const permissionActionMappingTable = React.useMemo(() => (
        <ContentTable
            model={model}
            filter={permissionActionFilter}
            list={permissionActionMappingList}
            loadingList={loadPermissionActionMappingList}
            total={permissionActioMappingTotal}
            handleTableChange={null}
            rowSelection={permissionActionMappingRowSelection}
            handleLocalBulkDelete={null}
            canBulkDelete={canBulkDeletePermissionActionMapping}
            handleExportContent={handleExportPermissionActionMapping}
            handleExportTemplateContent={handleExportTemplatePermissionActionMapping}
            handlePagination={null}
            handleAddContent={null}
            ref={permissionActionMappingRef}
            handleClick={handleClickPermissionActionMapping}
            handleImportContentList={handleImportPermissionActionMapping}
            columns={permissionActionMappingColumns}
            isShowTitle={false}
        />
    ), [canBulkDeletePermissionActionMapping,
        handleClickPermissionActionMapping,
        handleExportPermissionActionMapping,
        handleExportTemplatePermissionActionMapping,
        handleImportPermissionActionMapping,
        loadPermissionActionMappingList,
        model,
        permissionActioMappingTotal,
        permissionActionFilter,
        permissionActionMappingColumns,
        permissionActionMappingList,
        permissionActionMappingRef,
        permissionActionMappingRowSelection,
    ]); const {
        permissionContentFilter,
        permissionContentList,
        loadPermissionContentList,
        permissionContentTotal,
        handleAddPermissionContent,
        handlePermissionContentTableChange,
        handlePermissionContentPagination,
        canBulkDeletePermissionContent,
        handleLocalBulkDeletePermissionContent,
        permissionContentRef,
        handleClickPermissionContent,
        handleImportPermissionContent,
        handleExportPermissionContent,
        handleExportTemplatePermissionContent,
        permissionContentColumns,
    } = usePermisionContentHook(model, setModel);

    const permissionContentTable = React.useMemo(
        () => (
            <ContentTable
                model={model}
                filter={permissionContentFilter}
                list={permissionContentList}
                loadingList={loadPermissionContentList}
                total={permissionContentTotal}
                handleTableChange={handlePermissionContentTableChange}
                rowSelection={null}
                handleLocalBulkDelete={
                    handleLocalBulkDeletePermissionContent
                }
                canBulkDelete={canBulkDeletePermissionContent}
                handleExportContent={handleExportPermissionContent}
                handleExportTemplateContent={
                    handleExportTemplatePermissionContent
                }
                handlePagination={handlePermissionContentPagination}
                handleAddContent={handleAddPermissionContent}
                ref={permissionContentRef}
                handleClick={handleClickPermissionContent}
                handleImportContentList={handleImportPermissionContent}
                columns={permissionContentColumns}
                hasAddContentInline={true}
                isShowTitle={false}
                isShowFooter={false}
            />
        ),
        [
            canBulkDeletePermissionContent,
            handleAddPermissionContent,
            handleClickPermissionContent,
            handleExportTemplatePermissionContent,
            handleExportPermissionContent,
            handleImportPermissionContent,
            handleLocalBulkDeletePermissionContent,
            handlePermissionContentPagination,
            handlePermissionContentTableChange,
            loadPermissionContentList,
            model,
            permissionContentColumns,
            permissionContentFilter,
            permissionContentList,
            permissionContentRef,
            permissionContentTotal,
        ]
    );
    return (
        <Modal
            {...props}
            width={1200}>
            {loading && (
                <div className="loading-block">
                    <Spin size="large" />
                </div>
            )}

            <div className='page page__detail'>
                <div className='page__modal-header w-100'>
                    <div className="page__modal-header-block"></div>
                    <Row className='d-flex'>
                        <Col lg={24} className="page__modal-header-title">
                            {model?.id ? (
                                <div className='page__title mr-1'>
                                    {translate("permissions.detail.title")}
                                </div>
                            ) : (
                                translate("permissions.detail.create")
                            )}
                        </Col>
                    </Row>
                </div>
                <div className='w-100 page__detail-tabs'>
                    <Row className='d-flex'>
                        <Col lg={24} >
                            <Card>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                                    <Col lg={12} className='pr-3'>
                                        <FormItem label={translate("permissions.code")}
                                            validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.code))}
                                            message={model.errors?.code}>
                                            <InputText isMaterial={true}
                                                value={model.code}
                                                placeHolder={translate("permissions.placeholder.code")}
                                                className={"tio-account_square_outlined"}
                                                onChange={onChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    <Col lg={12} className='pr-3'>
                                        <FormItem label={translate("permissions.name")}
                                            validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.name))}
                                            message={model.errors?.name}>
                                            <InputText isMaterial={true}
                                                value={model.name}
                                                placeHolder={translate("permissions.placeholder.name")}
                                                className={"tio-account_square_outlined"}
                                                onChange={onChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>

                                    <Col lg={12} className='pr-3'>
                                        <FormItem label={translate("permissions.menu")}
                                            validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.menu))}
                                            message={model.errors?.menu} >
                                            <Select isMaterial={true}
                                                classFilter={MenuFilter}
                                                placeHolder={translate("permissions.placeholder.menu")}
                                                getList={roleRepository.singleListMenu}
                                                onChange={onChangeObjectField(nameof(model.menu))}
                                                model={model.menu} />
                                        </FormItem>
                                    </Col>
                                    <Col lg={12} className='pl-3 mt-4'>
                                        <FormItem >
                                            <span className="component__title mr-3">
                                                {translate("permissions.status")}
                                            </span>
                                            <SwitchStatus
                                                checked={
                                                    model.statusId === statusList[1]?.id ? true : false
                                                }
                                                list={statusList}
                                                onChange={onChangeObjectField(nameof(model.status))}
                                            />

                                        </FormItem>
                                    </Col>
                                </Row>
                                {model.menuId &&
                                    <Row>
                                        <Tabs defaultActiveKey="1" >
                                            <TabPane key="1" tab={translate('permissions.action')}>
                                                <Row>
                                                    {permissionActionMappingTable}
                                                </Row>

                                            </TabPane>
                                            <TabPane key="2" tab={translate('permissions.field')}>
                                                <Row>{permissionContentTable}</Row>
                                                <Row>
                                                    <div className="action__container">
                                                        <div
                                                            className="button__add"
                                                            onClick={handleAddPermissionContent}
                                                        >
                                                            <span className="text-primary">
                                                                <i className="tio-add_circle_outlined mr-2"></i>
                                                                {translate("general.button.add")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </TabPane>
                                        </Tabs>
                                    </Row>
                                }
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal >
    );
}

export default PermissionRoleDetailModal;