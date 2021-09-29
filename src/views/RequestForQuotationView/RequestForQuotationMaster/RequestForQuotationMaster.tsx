/* begin general import */
import { DateFilter, IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { REQUEST_FOR_QUOTATION_DETAIL_ROUTE } from "config/route-consts";
import { formatDateTime } from "helpers/date-time";
import { renderMasterIndex } from "helpers/table";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import { RequestForQuotation, RequestForQuotationFilter } from "models/RequestForQuotation";
import { Status, StatusFilter } from "models/Status";
import { Moment } from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { requestForQuotationRepository } from "repositories/request-for-quotation-repository";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import RequestForQuotationPreview from "./RequestForQuotationPreview";
/* end individual import */

function RequestForQuotationMaster() {
    const [translate] = useTranslation();

    const master: UseMaster = masterService.useMaster<RequestForQuotation, RequestForQuotationFilter>
        (
            RequestForQuotationFilter,
            REQUEST_FOR_QUOTATION_DETAIL_ROUTE,
            requestForQuotationRepository.list,
            requestForQuotationRepository.count,
            requestForQuotationRepository.delete,
            requestForQuotationRepository.bulkDelete,
        );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<RequestForQuotation>
            (
                RequestForQuotation,
                requestForQuotationRepository.get,
            );


    const menu = React.useCallback((id: number, requestForQuotation: RequestForQuotation) => (
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
                        onClick={() => master.handleServerDelete(requestForQuotation)}>
                        <i className="tio-delete" />
                    </button>
                </Tooltip>
            </Menu.Item>
        </Menu>
    ), [handleOpenPreview, master, translate]);

    const columns: ColumnProps<RequestForQuotation>[] = useMemo(
        () => [
            {
                title: (<div className='text-center gradient-text'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 100,
                render: renderMasterIndex<RequestForQuotation>(master.pagination),
            },




            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.code')}</div>),
                key: nameof(master.list[0].code),
                dataIndex: nameof(master.list[0].code),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].code),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.description')}</div>),
                key: nameof(master.list[0].description),
                dataIndex: nameof(master.list[0].description),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].description),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.quotationExpectedAt')}</div>),
                key: nameof(master.list[0].quotationExpectedAt),
                dataIndex: nameof(master.list[0].quotationExpectedAt),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].quotationExpectedAt),
                    ),
                render(...params: [Moment, RequestForQuotation, number]) {
                    return <div className='text-center'>{formatDateTime(params[0])}</div>;
                },
            },





            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.requestDepartmentName')}</div>),
                key: nameof(master.list[0].requestDepartmentName),
                dataIndex: nameof(master.list[0].requestDepartmentName),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].requestDepartmentName),
                    ),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.recipientAddress')}</div>),
                key: nameof(master.list[0].recipientAddress),
                dataIndex: nameof(master.list[0].recipientAddress),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].recipientAddress),
                    ),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.sendToPRC')}</div>),
                key: nameof(master.list[0].sendToPRC),
                dataIndex: nameof(master.list[0].sendToPRC),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.note')}</div>),
                key: nameof(master.list[0].note),
                dataIndex: nameof(master.list[0].note),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].note),
                    ),
            },









            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.used')}</div>),
                key: nameof(master.list[0].used),
                dataIndex: nameof(master.list[0].used),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.buyer')}</div>),
                key: nameof(master.list[0].buyer),
                dataIndex: nameof(master.list[0].buyer),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].buyer),
                    ),
                render(buyer: AppUser) {
                    return buyer; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.requestOrganization')}</div>),
                key: nameof(master.list[0].requestOrganization),
                dataIndex: nameof(master.list[0].requestOrganization),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].requestOrganization),
                    ),
                render(requestOrganization: Organization) {
                    return requestOrganization; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.requestor')}</div>),
                key: nameof(master.list[0].requestor),
                dataIndex: nameof(master.list[0].requestor),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].requestor),
                    ),
                render(requestor: AppUser) {
                    return requestor; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('requestForQuotations.status')}</div>),
                key: nameof(master.list[0].status),
                dataIndex: nameof(master.list[0].status),
                sorter: true,
                sortOrder: getAntOrderType<RequestForQuotation, RequestForQuotationFilter>
                    (
                        master.filter,
                        nameof(master.list[0].status),
                    ),
                render(status: Status) {
                    return status; //fill the render field after generate code;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
                key: "action",
                dataIndex: nameof(master.list[0].id),
                fixed: "right",
                width: 150,
                align: "center",
                render(id: number, requestForQuotation: RequestForQuotation) {
                    return (
                        <div className='d-flex justify-content-center button-action-table'>
                            <Dropdown overlay={menu(id, requestForQuotation)} trigger={["click"]}>
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
                    {translate('requestForQuotations.code')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].code)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].code),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('requestForQuotations.placeholder.code')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.description')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].description)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].description),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('requestForQuotations.placeholder.description')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.quotationExpectedAt')}
                </label>
                <AdvanceDateFilter value={master.filter[nameof(master.list[0].quotationExpectedAt)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].quotationExpectedAt),
                        'equal' as any,
                        DateFilter,
                    )}
                    placeholder={translate('requestForQuotations.placeholder.quotationExpectedAt')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.requestDepartmentName')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].requestDepartmentName)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].requestDepartmentName),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('requestForQuotations.placeholder.requestDepartmentName')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.recipientAddress')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].recipientAddress)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].recipientAddress),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('requestForQuotations.placeholder.recipientAddress')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.sendToPRC')}
                </label>
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.note')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].note)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].note),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('requestForQuotations.placeholder.note')} />
            </Col>





            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.used')}
                </label>
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.buyer')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].buyerId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].buyerId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={AppUserFilter}
                    getList={requestForQuotationRepository.singleListAppUser}
                    placeHolder={translate('requestForQuotations.placeholder.buyer')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.requestOrganization')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].requestOrganizationId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].requestOrganizationId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={OrganizationFilter}
                    getList={requestForQuotationRepository.singleListOrganization}
                    placeHolder={translate('requestForQuotations.placeholder.requestOrganization')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.requestor')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].requestorId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].requestorId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={AppUserFilter}
                    getList={requestForQuotationRepository.singleListAppUser}
                    placeHolder={translate('requestForQuotations.placeholder.requestor')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('requestForQuotations.status')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].statusId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].statusId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={StatusFilter}
                    getList={requestForQuotationRepository.singleListStatus}
                    placeHolder={translate('requestForQuotations.placeholder.status')} />
            </Col>




        </Row>
    ), [master, translate]);

    return (
        <>
            <div className='page page__master'>
                <AppMainMasterTitle {...master}>
                    {translate('requestForQuotations.master.title')}
                </AppMainMasterTitle>
                <AppMainMasterFilter {...master}
                    repository={requestForQuotationRepository}
                    translate={translate}>
                    {filterChildren}
                </AppMainMasterFilter>
                <AppMainMasterTable {...master}
                    translate={translate}
                    columns={columns}>
                    {translate('requestForQuotations.table.title')}
                </AppMainMasterTable>
            </div>
            <RequestForQuotationPreview
                previewModel={previewModel}
                isOpenPreview={isOpenPreview}
                isLoadingPreview={isLoadingPreview}
                handleClosePreview={handleClosePreview}
                handleGoDetail={master.handleGoDetail}
                translate={translate} />
        </>
    );
}

export default RequestForQuotationMaster;
