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
import PurchasePlanCriterionScorePreview from "./PurchasePlanCriterionScorePreview";
/* end general import */

/* begin filter import */
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import { NumberFilter } from "@react3l/advanced-filters";
import { formatNumber } from "helpers/number";
/* end filter import */

/* begin individual import */
import { purchasePlanCriterionScoreRepository } from "repositories/purchase-plan-criterion-score-repository";
import { PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter } from "models/PurchasePlanCriterionScore";
import { Criterion, CriterionFilter } from "models/Criterion";
import { CriterionType, CriterionTypeFilter } from "models/CriterionType";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
import PurchasePlanCriterionScoreDetailModal from "../PurchasePlanCriterionScoreDetail/PurchasePlanCriterionScoreDetailModal";
import detailService from "services/pages/detail-service";
/* end individual import */

function PurchasePlanCriterionScoreMaster() {
    const [translate] = useTranslation();

    const master: UseMaster = masterService.useMaster<PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter>
        (
            PurchasePlanCriterionScoreFilter,
            '',
            purchasePlanCriterionScoreRepository.list,
            purchasePlanCriterionScoreRepository.count,
            purchasePlanCriterionScoreRepository.delete,
            purchasePlanCriterionScoreRepository.bulkDelete,
        );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<PurchasePlanCriterionScore>
            (
                PurchasePlanCriterionScore,
                purchasePlanCriterionScoreRepository.get,
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
        PurchasePlanCriterionScore,
        purchasePlanCriterionScoreRepository.get,
        purchasePlanCriterionScoreRepository.save,
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

    const menu = React.useCallback((id: number, purchasePlanCriterionScore: PurchasePlanCriterionScore) => (
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
                        onClick={() => master.handleServerDelete(purchasePlanCriterionScore)}>
                        <i className="tio-delete" />
                    </button>
                </Tooltip>
            </Menu.Item>
        </Menu>
    ), [handleOpenPreview, master, translate]);

    const columns: ColumnProps<PurchasePlanCriterionScore>[] = useMemo(
        () => [
            {
                title: (<div className='text-center gradient-text'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 100,
                render: renderMasterIndex<PurchasePlanCriterionScore>(master.pagination),
            },












            {
                title: (<div className='text-center gradient-text'>{translate('purchasePlanCriterionScores.score')}</div>),
                key: nameof(master.list[0].score),
                dataIndex: nameof(master.list[0].score),
                sorter: true,
                sortOrder: getAntOrderType<PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter>
                    (
                        master.filter,
                        nameof(master.list[0].score),
                    ),
                render(...params: [number, PurchasePlanCriterionScore, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },





            {
                title: (<div className='text-center gradient-text'>{translate('purchasePlanCriterionScores.criterion')}</div>),
                key: nameof(master.list[0].criterion),
                dataIndex: nameof(master.list[0].criterion),
                sorter: true,
                sortOrder: getAntOrderType<PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter>
                    (
                        master.filter,
                        nameof(master.list[0].criterion),
                    ),
                render(criterion: Criterion) {
                    return criterion; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchasePlanCriterionScores.criterionType')}</div>),
                key: nameof(master.list[0].criterionType),
                dataIndex: nameof(master.list[0].criterionType),
                sorter: true,
                sortOrder: getAntOrderType<PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter>
                    (
                        master.filter,
                        nameof(master.list[0].criterionType),
                    ),
                render(criterionType: CriterionType) {
                    return criterionType; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchasePlanCriterionScores.purchasePlan')}</div>),
                key: nameof(master.list[0].purchasePlan),
                dataIndex: nameof(master.list[0].purchasePlan),
                sorter: true,
                sortOrder: getAntOrderType<PurchasePlanCriterionScore, PurchasePlanCriterionScoreFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchasePlan),
                    ),
                render(purchasePlan: PurchasePlan) {
                    return purchasePlan; //fill the render field after generate code;
                },
            },

            {
                title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
                key: "action",
                dataIndex: nameof(master.list[0].id),
                fixed: "right",
                width: 150,
                align: "center",
                render(id: number, purchasePlanCriterionScore: PurchasePlanCriterionScore) {
                    return (
                        <div className='d-flex justify-content-center button-action-table'>
                            <Dropdown overlay={menu(id, purchasePlanCriterionScore)} trigger={["click"]}>
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
                    {translate('purchasePlanCriterionScores.score')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].score)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].score),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchasePlanCriterionScores.placeholder.score')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchasePlanCriterionScores.criterion')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].criterionId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].criterionId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={CriterionFilter}
                    getList={purchasePlanCriterionScoreRepository.singleListCriterion}
                    placeHolder={translate('purchasePlanCriterionScores.placeholder.criterion')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchasePlanCriterionScores.criterionType')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].criterionTypeId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].criterionTypeId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={CriterionTypeFilter}
                    getList={purchasePlanCriterionScoreRepository.singleListCriterionType}
                    placeHolder={translate('purchasePlanCriterionScores.placeholder.criterionType')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchasePlanCriterionScores.purchasePlan')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchasePlanId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchasePlanId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={PurchasePlanFilter}
                    getList={purchasePlanCriterionScoreRepository.singleListPurchasePlan}
                    placeHolder={translate('purchasePlanCriterionScores.placeholder.purchasePlan')} />
            </Col>
        </Row>
    ), [master, translate]);

    return (
        <>
            <div className='page page__master'>
                <AppMainMasterTitle {...master}>
                    {translate('purchasePlanCriterionScores.master.title')}
                </AppMainMasterTitle>
                <AppMainMasterFilter {...master}
                    repository={purchasePlanCriterionScoreRepository}
                    translate={translate}>
                    {filterChildren}
                </AppMainMasterFilter>
                <AppMainMasterTable {...master}
                    translate={translate}
                    columns={columns}>
                    {translate('purchasePlanCriterionScores.table.title')}
                </AppMainMasterTable>
            </div>
            <PurchasePlanCriterionScorePreview
                previewModel={previewModel}
                isOpenPreview={isOpenPreview}
                isLoadingPreview={isLoadingPreview}
                handleClosePreview={handleClosePreview}
                handleGoDetail={master.handleGoDetail}
                translate={translate} />
            <PurchasePlanCriterionScoreDetailModal
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

export default PurchasePlanCriterionScoreMaster;
