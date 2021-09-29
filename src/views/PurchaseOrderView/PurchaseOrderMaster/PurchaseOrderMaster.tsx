/* begin general import */
import { DateFilter, IdFilter, NumberFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { PURCHASE_ORDER_DETAIL_ROUTE } from "config/route-consts";
import { formatDateTime } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { renderMasterIndex } from "helpers/table";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import { Project, ProjectFilter } from "models/Project";
import { ProjectBudget, ProjectBudgetFilter } from "models/ProjectBudget";
import { PurchaseOrder, PurchaseOrderFilter } from "models/PurchaseOrder";
import { PurchaseOrderType, PurchaseOrderTypeFilter } from "models/PurchaseOrderType";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import { Status, StatusFilter } from "models/Status";
import { Supplier, SupplierFilter } from "models/Supplier";
import { Moment } from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { purchaseOrderRepository } from "repositories/purchase-order-repository";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import PurchaseOrderPreview from "./PurchaseOrderPreview";
/* end individual import */

function PurchaseOrderMaster() {
    const [translate] = useTranslation();

    const master: UseMaster = masterService.useMaster<PurchaseOrder, PurchaseOrderFilter>
        (
            PurchaseOrderFilter,
            PURCHASE_ORDER_DETAIL_ROUTE,
            purchaseOrderRepository.list,
            purchaseOrderRepository.count,
            purchaseOrderRepository.delete,
            purchaseOrderRepository.bulkDelete,
        );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<PurchaseOrder>
            (
                PurchaseOrder,
                purchaseOrderRepository.get,
            );


    const menu = React.useCallback((id: number, purchaseOrder: PurchaseOrder) => (
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
                        onClick={() => master.handleServerDelete(purchaseOrder)}>
                        <i className="tio-delete" />
                    </button>
                </Tooltip>
            </Menu.Item>
        </Menu>
    ), [handleOpenPreview, master, translate]);

    const columns: ColumnProps<PurchaseOrder>[] = useMemo(
        () => [
            {
                title: (<div className='text-center gradient-text'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 100,
                render: renderMasterIndex<PurchaseOrder>(master.pagination),
            },




            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.description')}</div>),
                key: nameof(master.list[0].description),
                dataIndex: nameof(master.list[0].description),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].description),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.pOCode')}</div>),
                key: nameof(master.list[0].pOCode),
                dataIndex: nameof(master.list[0].pOCode),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].pOCode),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.pONumber')}</div>),
                key: nameof(master.list[0].pONumber),
                dataIndex: nameof(master.list[0].pONumber),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].pONumber),
                    ),
                render(...params: [number, PurchaseOrder, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },

















            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchaserAddress')}</div>),
                key: nameof(master.list[0].purchaserAddress),
                dataIndex: nameof(master.list[0].purchaserAddress),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaserAddress),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchaserPhoneNumber')}</div>),
                key: nameof(master.list[0].purchaserPhoneNumber),
                dataIndex: nameof(master.list[0].purchaserPhoneNumber),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaserPhoneNumber),
                    ),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.supplierEmail')}</div>),
                key: nameof(master.list[0].supplierEmail),
                dataIndex: nameof(master.list[0].supplierEmail),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].supplierEmail),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.supplierPhoneNumber')}</div>),
                key: nameof(master.list[0].supplierPhoneNumber),
                dataIndex: nameof(master.list[0].supplierPhoneNumber),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].supplierPhoneNumber),
                    ),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.recipientAddress')}</div>),
                key: nameof(master.list[0].recipientAddress),
                dataIndex: nameof(master.list[0].recipientAddress),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].recipientAddress),
                    ),
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.recipientPhoneNumber')}</div>),
                key: nameof(master.list[0].recipientPhoneNumber),
                dataIndex: nameof(master.list[0].recipientPhoneNumber),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].recipientPhoneNumber),
                    ),
            },





            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.expectedAt')}</div>),
                key: nameof(master.list[0].expectedAt),
                dataIndex: nameof(master.list[0].expectedAt),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].expectedAt),
                    ),
                render(...params: [Moment, PurchaseOrder, number]) {
                    return <div className='text-center'>{formatDateTime(params[0])}</div>;
                },
            },





            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.subTotal')}</div>),
                key: nameof(master.list[0].subTotal),
                dataIndex: nameof(master.list[0].subTotal),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].subTotal),
                    ),
                render(...params: [number, PurchaseOrder, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.commission')}</div>),
                key: nameof(master.list[0].commission),
                dataIndex: nameof(master.list[0].commission),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].commission),
                    ),
                render(...params: [number, PurchaseOrder, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.generalDiscountPercentage')}</div>),
                key: nameof(master.list[0].generalDiscountPercentage),
                dataIndex: nameof(master.list[0].generalDiscountPercentage),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].generalDiscountPercentage),
                    ),
                render(...params: [number, PurchaseOrder, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.generalDiscountAmount')}</div>),
                key: nameof(master.list[0].generalDiscountAmount),
                dataIndex: nameof(master.list[0].generalDiscountAmount),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].generalDiscountAmount),
                    ),
                render(...params: [number, PurchaseOrder, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.total')}</div>),
                key: nameof(master.list[0].total),
                dataIndex: nameof(master.list[0].total),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].total),
                    ),
                render(...params: [number, PurchaseOrder, number]) {
                    return <div className='text-right'>{formatNumber(params[0])}</div>;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.used')}</div>),
                key: nameof(master.list[0].used),
                dataIndex: nameof(master.list[0].used),
            },



















            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.creator')}</div>),
                key: nameof(master.list[0].creator),
                dataIndex: nameof(master.list[0].creator),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].creator),
                    ),
                render(creator: AppUser) {
                    return creator; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.project')}</div>),
                key: nameof(master.list[0].project),
                dataIndex: nameof(master.list[0].project),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].project),
                    ),
                render(project: Project) {
                    return project; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.projectBudget')}</div>),
                key: nameof(master.list[0].projectBudget),
                dataIndex: nameof(master.list[0].projectBudget),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].projectBudget),
                    ),
                render(projectBudget: ProjectBudget) {
                    return projectBudget; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.projectOrganization')}</div>),
                key: nameof(master.list[0].projectOrganization),
                dataIndex: nameof(master.list[0].projectOrganization),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].projectOrganization),
                    ),
                render(projectOrganization: Organization) {
                    return projectOrganization; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchaseOrderType')}</div>),
                key: nameof(master.list[0].purchaseOrderType),
                dataIndex: nameof(master.list[0].purchaseOrderType),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaseOrderType),
                    ),
                render(purchaseOrderType: PurchaseOrderType) {
                    return purchaseOrderType; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchaseOrganization')}</div>),
                key: nameof(master.list[0].purchaseOrganization),
                dataIndex: nameof(master.list[0].purchaseOrganization),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaseOrganization),
                    ),
                render(purchaseOrganization: Organization) {
                    return purchaseOrganization; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchasePlan')}</div>),
                key: nameof(master.list[0].purchasePlan),
                dataIndex: nameof(master.list[0].purchasePlan),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchasePlan),
                    ),
                render(purchasePlan: PurchasePlan) {
                    return purchasePlan; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchaseRequest')}</div>),
                key: nameof(master.list[0].purchaseRequest),
                dataIndex: nameof(master.list[0].purchaseRequest),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaseRequest),
                    ),
                render(purchaseRequest: PurchaseRequest) {
                    return purchaseRequest; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.purchaser')}</div>),
                key: nameof(master.list[0].purchaser),
                dataIndex: nameof(master.list[0].purchaser),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].purchaser),
                    ),
                render(purchaser: AppUser) {
                    return purchaser; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.receiveOrganization')}</div>),
                key: nameof(master.list[0].receiveOrganization),
                dataIndex: nameof(master.list[0].receiveOrganization),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].receiveOrganization),
                    ),
                render(receiveOrganization: Organization) {
                    return receiveOrganization; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.recipient')}</div>),
                key: nameof(master.list[0].recipient),
                dataIndex: nameof(master.list[0].recipient),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].recipient),
                    ),
                render(recipient: AppUser) {
                    return recipient; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.status')}</div>),
                key: nameof(master.list[0].status),
                dataIndex: nameof(master.list[0].status),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].status),
                    ),
                render(status: Status) {
                    return status; //fill the render field after generate code;
                },
            },


            {
                title: (<div className='text-center gradient-text'>{translate('purchaseOrders.supplier')}</div>),
                key: nameof(master.list[0].supplier),
                dataIndex: nameof(master.list[0].supplier),
                sorter: true,
                sortOrder: getAntOrderType<PurchaseOrder, PurchaseOrderFilter>
                    (
                        master.filter,
                        nameof(master.list[0].supplier),
                    ),
                render(supplier: Supplier) {
                    return supplier; //fill the render field after generate code;
                },
            },



            {
                title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
                key: "action",
                dataIndex: nameof(master.list[0].id),
                fixed: "right",
                width: 150,
                align: "center",
                render(id: number, purchaseOrder: PurchaseOrder) {
                    return (
                        <div className='d-flex justify-content-center button-action-table'>
                            <Dropdown overlay={menu(id, purchaseOrder)} trigger={["click"]}>
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
                    {translate('purchaseOrders.description')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].description)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].description),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.description')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.pOCode')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].pOCode)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].pOCode),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.pOCode')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.pONumber')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].pONumber)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].pONumber),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.pONumber')} />
            </Col>









            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchaserAddress')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].purchaserAddress)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].purchaserAddress),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.purchaserAddress')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchaserPhoneNumber')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].purchaserPhoneNumber)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].purchaserPhoneNumber),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.purchaserPhoneNumber')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.supplierEmail')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].supplierEmail)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].supplierEmail),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.supplierEmail')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.supplierPhoneNumber')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].supplierPhoneNumber)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].supplierPhoneNumber),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.supplierPhoneNumber')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.recipientAddress')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].recipientAddress)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].recipientAddress),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.recipientAddress')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.recipientPhoneNumber')}
                </label>
                <AdvanceStringFilter value={master.filter[nameof(master.list[0].recipientPhoneNumber)]["contain"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].recipientPhoneNumber),
                        'contain' as any,
                        StringFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.recipientPhoneNumber')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.expectedAt')}
                </label>
                <AdvanceDateFilter value={master.filter[nameof(master.list[0].expectedAt)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].expectedAt),
                        'equal' as any,
                        DateFilter,
                    )}
                    placeholder={translate('purchaseOrders.placeholder.expectedAt')} />
            </Col>



            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.subTotal')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].subTotal)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].subTotal),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.subTotal')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.commission')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].commission)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].commission),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.commission')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.generalDiscountPercentage')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].generalDiscountPercentage)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].generalDiscountPercentage),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.generalDiscountPercentage')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.generalDiscountAmount')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].generalDiscountAmount)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].generalDiscountAmount),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.generalDiscountAmount')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.total')}
                </label>
                <AdvanceNumberFilter value={master.filter[nameof(master.list[0].total)]["equal"]}
                    onEnter={master.handleChangeFilter(
                        nameof(master.list[0].total),
                        'equal' as any,
                        NumberFilter,
                    )}
                    placeHolder={translate('purchaseOrders.placeholder.total')} />
            </Col>


            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.used')}
                </label>
            </Col>










            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.creator')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].creatorId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].creatorId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={AppUserFilter}
                    getList={purchaseOrderRepository.singleListAppUser}
                    placeHolder={translate('purchaseOrders.placeholder.creator')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.project')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].projectId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].projectId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={ProjectFilter}
                    getList={purchaseOrderRepository.singleListProject}
                    placeHolder={translate('purchaseOrders.placeholder.project')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.projectBudget')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].projectBudgetId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].projectBudgetId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={ProjectBudgetFilter}
                    getList={purchaseOrderRepository.singleListProjectBudget}
                    placeHolder={translate('purchaseOrders.placeholder.projectBudget')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.projectOrganization')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].projectOrganizationId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].projectOrganizationId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={OrganizationFilter}
                    getList={purchaseOrderRepository.singleListOrganization}
                    placeHolder={translate('purchaseOrders.placeholder.projectOrganization')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchaseOrderType')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchaseOrderTypeId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchaseOrderTypeId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={PurchaseOrderTypeFilter}
                    getList={purchaseOrderRepository.singleListPurchaseOrderType}
                    placeHolder={translate('purchaseOrders.placeholder.purchaseOrderType')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchaseOrganization')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchaseOrganizationId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchaseOrganizationId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={OrganizationFilter}
                    getList={purchaseOrderRepository.singleListOrganization}
                    placeHolder={translate('purchaseOrders.placeholder.purchaseOrganization')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchasePlan')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchasePlanId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchasePlanId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={PurchasePlanFilter}
                    getList={purchaseOrderRepository.singleListPurchasePlan}
                    placeHolder={translate('purchaseOrders.placeholder.purchasePlan')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchaseRequest')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchaseRequestId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchaseRequestId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={PurchaseRequestFilter}
                    getList={purchaseOrderRepository.singleListPurchaseRequest}
                    placeHolder={translate('purchaseOrders.placeholder.purchaseRequest')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.purchaser')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].purchaserId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].purchaserId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={AppUserFilter}
                    getList={purchaseOrderRepository.singleListAppUser}
                    placeHolder={translate('purchaseOrders.placeholder.purchaser')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.receiveOrganization')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].receiveOrganizationId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].receiveOrganizationId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={OrganizationFilter}
                    getList={purchaseOrderRepository.singleListOrganization}
                    placeHolder={translate('purchaseOrders.placeholder.receiveOrganization')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.recipient')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].recipientId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].recipientId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={AppUserFilter}
                    getList={purchaseOrderRepository.singleListAppUser}
                    placeHolder={translate('purchaseOrders.placeholder.recipient')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.status')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].statusId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].statusId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={StatusFilter}
                    getList={purchaseOrderRepository.singleListStatus}
                    placeHolder={translate('purchaseOrders.placeholder.status')} />
            </Col>

            <Col lg={4} className='pr-4'>
                <label className='label'>
                    {translate('purchaseOrders.supplier')}
                </label>
                <AdvanceIdFilter value={master.filter[nameof(master.list[0].supplierId)]["equal"]}
                    onChange={master.handleChangeFilter(
                        nameof(master.list[0].supplierId),
                        'equal' as any,
                        IdFilter,
                    )}
                    classFilter={SupplierFilter}
                    getList={purchaseOrderRepository.singleListSupplier}
                    placeHolder={translate('purchaseOrders.placeholder.supplier')} />
            </Col>



        </Row>
    ), [master, translate]);

    return (
        <>
            <div className='page page__master'>
                <AppMainMasterTitle {...master}>
                    {translate('purchaseOrders.master.title')}
                </AppMainMasterTitle>
                <AppMainMasterFilter {...master}
                    repository={purchaseOrderRepository}
                    translate={translate}>
                    {filterChildren}
                </AppMainMasterFilter>
                <AppMainMasterTable {...master}
                    translate={translate}
                    columns={columns}>
                    {translate('purchaseOrders.table.title')}
                </AppMainMasterTable>
            </div>
            <PurchaseOrderPreview
                previewModel={previewModel}
                isOpenPreview={isOpenPreview}
                isLoadingPreview={isLoadingPreview}
                handleClosePreview={handleClosePreview}
                handleGoDetail={master.handleGoDetail}
                translate={translate} />
        </>
    );
}

export default PurchaseOrderMaster;
