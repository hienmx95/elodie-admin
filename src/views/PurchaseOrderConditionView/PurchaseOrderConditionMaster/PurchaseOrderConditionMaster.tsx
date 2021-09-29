/* begin general import */
import React, { useMemo } from "react";
import { Col, Row, Tooltip, Menu, Dropdown } from "antd";
import { ColumnProps } from "antd/lib/table";
import { renderMasterIndex } from "helpers/table";
import { useTranslation } from "react-i18next";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import PurchaseOrderConditionPreview from "./PurchaseOrderConditionPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { purchaseOrderConditionRepository } from "repositories/purchase-order-condition-repository";
import { PurchaseOrderCondition, PurchaseOrderConditionFilter } from "models/PurchaseOrderCondition";
import { PurchaseOrder, PurchaseOrderFilter } from "models/PurchaseOrder";
import PurchaseOrderConditionDetailModal from "../PurchaseOrderConditionDetail/PurchaseOrderConditionDetailModal";
import detailService from "services/pages/detail-service";
/* end individual import */

function PurchaseOrderConditionMaster() {
    const [translate] = useTranslation();

    const master: UseMaster = masterService.useMaster<PurchaseOrderCondition, PurchaseOrderConditionFilter>
        (
            PurchaseOrderConditionFilter,
            '',
            purchaseOrderConditionRepository.list,
            purchaseOrderConditionRepository.count,
            purchaseOrderConditionRepository.delete,
            purchaseOrderConditionRepository.bulkDelete,
        );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<PurchaseOrderCondition>
            (
                PurchaseOrderCondition,
                purchaseOrderConditionRepository.get,
            );

    const {
        model,
        isOpenDetailModal,
        handleOpenDetailModal,
        handleCloseDetailModal,
        handleSaveModel,
        loadingModel,
        handleChangeSimpleField,
        handleChangeObjectField,
        dispatch,
    } = detailService.useDetailModal(
        PurchaseOrderCondition,
        purchaseOrderConditionRepository.get,
        purchaseOrderConditionRepository.save,
        master.handleSearch,
    );

    master.handleGoCreate = React.useCallback(() => {
        handleClosePreview();
        handleOpenDetailModal(null);
    }, [handleClosePreview, handleOpenDetailModal]);

    master.handleGoDetail = React.useCallback((id: number) => () => {
        handleClosePreview();
        handleOpenDetailModal(id);
    }, [handleClosePreview, handleOpenDetailModal]);

    const menu = React.useCallback((id: number, purchaseOrderCondition: PurchaseOrderCondition) => (
        <Menu>
            <Menu.Item key="1">
                <Tooltip title={translate("general.actions.view")}>
                    <button className="btn gradient-btn-icon"
                        onClick={handleOpenPreview(id)}>
                        <i className="tio-visible" />
                    </button>
                </Tooltip>
            </Menu.Item>
            <Menu.Item key="2">
                <Tooltip title={translate("general.actions.edit")}>
                    <button className="btn gradient-btn-icon"
                        onClick={master.handleGoDetail(id)}>
                        <i className="tio-edit" />
                    </button>
                </Tooltip>
            </Menu.Item>
            <Menu.Item key="3">
                <Tooltip title={translate("general.actions.delete")}>
                    <button className="btn btn-sm component__btn-delete"
                        onClick={() => master.handleServerDelete(purchaseOrderCondition)}>
                        <i className="tio-delete" />
                    </button>
                </Tooltip>
            </Menu.Item>
        </Menu>
    ), [handleOpenPreview, master, translate]);

    const columns: ColumnProps<PurchaseOrderCondition>[] = useMemo(
        () => [
            {
                title: (<div className='text-center gradient-text'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 100,
                render: renderMasterIndex<PurchaseOrderCondition>(master.pagination),
            },






            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrderConditions.code')}</div>),
                key: nameof(master.list[0].code),
                dataIndex: nameof(master.list[0].code),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                    (
                        master.filter,
                        nameof(master.list[0].code),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrderConditions.description')}</div>),
                key: nameof(master.list[0].description),
                dataIndex: nameof(master.list[0].description),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                    (
                        master.filter,
                        nameof(master.list[0].description),
                    ),
            },











            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrderConditions.used')}</div>),
                key: nameof(master.list[0].used),
                dataIndex: nameof(master.list[0].used),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrderConditions.purchaseOrder')}</div>),
                key: nameof(master.list[0].purchaseOrder),
                dataIndex: nameof(master.list[0].purchaseOrder),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaseOrder),
                    ),
                render(purchaseOrder: PurchaseOrder) {
                    return purchaseOrder; //fill the render field after generate code;
                },
            },

            {
                title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
                key: "action",
                dataIndex: nameof(master.list[0].id),
                fixed: "right",
                width: 150,
                align: "center",
                render(id: number, purchaseOrderCondition: PurchaseOrderCondition) {
                    return (
                        <div className='d-flex justify-content-center button-action-table'>
                            <Dropdown overlay={menu(id, purchaseOrderCondition)} trigger={["click"]}>
                                <span className="action__dots">...</span>
                            </Dropdown>
                        </div>
                    );
                },
            },
        ], [translate, master.pagination, master.list, master.filter, menu]);

    const filterChildren = React.useMemo(() => (
        <Row className='mt-4'>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrderConditions.code')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].code)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].code),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrderConditions.placeholder.code')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrderConditions.description')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].description)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].description),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrderConditions.placeholder.description')} />
            </Col>






            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrderConditions.used')}
                </label>
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrderConditions.purchaseOrder')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchaseOrderId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchaseOrderId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={PurchaseOrderFilter}
                    getList={purchaseOrderConditionRepository.singleListPurchaseOrder}
                    placeHolder={translate('purchaseOrderConditions.placeholder.purchaseOrder')} />
            </Col>
        </Row>
    ), [master, translate]);

    return (
        <>
            <div className='page page__master'>
                <AppMainMasterTitle {...master}>
                    {translate('purchaseOrderConditions.master.title')}
                </AppMainMasterTitle>
                <AppMainMasterFilter {...master}
                    repository={purchaseOrderConditionRepository}
                    translate={translate}>
                    {filterChildren}
                </AppMainMasterFilter>
                <AppMainMasterTable {...master}
                    translate={translate}
                    columns={columns}>
                    {translate('purchaseOrderConditions.table.title')}
                </AppMainMasterTable>
            </div>
            <PurchaseOrderConditionPreview
                previewModel={previewModel}
                isOpenPreview={isOpenPreview}
                isLoadingPreview={isLoadingPreview}
                handleClosePreview={handleClosePreview}
                handleGoDetail={master.handleGoDetail}
                translate={translate} />
            <PurchaseOrderConditionDetailModal
                model={model}
                visible={isOpenDetailModal}
                handleSave={handleSaveModel}
                handleCancel={handleCloseDetailModal}
                onChangeSimpleField={handleChangeSimpleField}
                onChangeObjectField={handleChangeObjectField}

                dispatchModel={dispatch}
                loading={loadingModel}
                visibleFooter={true}
            />
        </>
    );
}

export default PurchaseOrderConditionMaster;
