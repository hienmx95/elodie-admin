import { IdFilter } from '@react3l/advanced-filters';
import { Col, Row, Spin } from 'antd';
import { InfinityTable as Table } from 'antd-table-infinity';
import AppMainMasterFilter from 'components/AppMain/MasterPage/AppMainMasterFilter';
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceDateRangeFilter from 'components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter';
import AdvanceIdFilter from 'components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter';
import AdvanceTreeFilter from 'components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter';
import { API_CUSTOMER_SALES_ORDER_ITEM_REPORT_PREFIX } from 'config/api-consts';
import { CustomerSalesOrderItemReport, CustomerSalesOrderItemReportFilter } from "models/CustomerSalesOrderItemReport";
import { ItemFilter } from 'models/Item';
import { OrganizationFilter } from 'models/Organization';
import { Moment } from 'moment';
import React from "react";
import { useTranslation } from "react-i18next";
import { customerSalesOrderItemReportRepository } from 'repositories/customer-sales-order-item-report-repository';
import authenticationService from 'services/authentication-service';
import masterService from "services/pages/master-service";
import nameof from "ts-nameof.macro";
import { useMaster } from 'views/Report/ReportHook';
// import '../../ReportView.scss';
import { renderCell, useCustomerSalesOrderItemReport } from "./CustomerSalesOrderItemReportHook";

function MaterialPurchaseBySupplierReportView() {
    const [translate] = useTranslation();

    const { validAction } = authenticationService.useAction(
        "materialPurchaseBySupplierReport",
        API_CUSTOMER_SALES_ORDER_ITEM_REPORT_PREFIX
    );

    const { repo } = masterService.useRepository(
        customerSalesOrderItemReportRepository
    );

    const master: any = useMaster<
        CustomerSalesOrderItemReport,
        CustomerSalesOrderItemReportFilter
    >(
        CustomerSalesOrderItemReportFilter,
        repo.list,
        repo.count,
    );

    const [dataSource, handleInfiniteOnLoad] = useCustomerSalesOrderItemReport(master);

    const handleChangeDateFilter = React.useCallback(
        (fieldName) => {
            return (dateMoment: [Moment, Moment]) => {
                const newFilter = { ...master.filter };
                newFilter[`${fieldName}`]["lessEqual"] = dateMoment[1];
                newFilter[`${fieldName}`]["greaterEqual"] = dateMoment[0];
                master.handleUpdateNewFilter(newFilter);
                master.setReset(true);
            };
        },
        [master]
    );

    const filterChildren = React.useMemo(
        () => (
            <div className="search__container mt-4">
                <Row justify="space-between">

                    <Col lg={4}>
                        <label className="label">
                            {translate("customerSalesOrderItemReport.organizationName")}
                        </label>
                        <AdvanceTreeFilter
                            classFilter={OrganizationFilter}
                            onChangeSingleItem={master.handleChangeFilter(
                                nameof(master.list[0].organizationId),
                                "equal" as any,
                                IdFilter
                            )}
                            checkStrictly={true}
                            getTreeData={customerSalesOrderItemReportRepository.filterListOrganization}
                            isMaterial={true}
                            placeHolder={translate("customerSalesOrderItemReport.placeholder.organizationName")}
                            value={
                                master.filter[nameof(master.list[0].organizationId)]["equal"]
                            }
                        />
                    </Col>

                    <Col lg={4}>
                        <label className="label">
                            {translate("customerSalesOrderItemReport.productFilter")}
                        </label>
                        <AdvanceIdFilter
                            isMaterial={true}
                            value={
                                master.filter[nameof(master.list[0].itemId)]["equal"]
                            }
                            onChange={master.handleChangeFilter(
                                nameof(master.list[0].itemId),
                                "equal" as any,
                                IdFilter
                            )}
                            classFilter={ItemFilter}
                            getList={customerSalesOrderItemReportRepository.filterListItem}
                            placeHolder={translate("customerSalesOrderItemReport.placeholder.productFilter")}
                            searchProperty="search"
                            searchType={null}
                        />
                    </Col>
                    <Col lg={4}>
                        <label className="label">
                            {translate("customerSalesOrderItemReport.orderedAt")}
                        </label>
                        <AdvanceDateRangeFilter
                            onChange={handleChangeDateFilter(
                                nameof(master.filter.date)
                            )}
                            value={[
                                master.filter["date"]["lessEqual"]
                                    ? master.filter["date"]["lessEqual"]
                                    : null,
                                master.filter["date"]["greaterEqual"]
                                    ? master.filter["date"]["greaterEqual"]
                                    : null,
                            ]}
                            isMaterial={true}
                        />
                    </Col>
                    <Col lg={4}></Col>
                    <Col lg={4}></Col>
                    <Col lg={4}></Col>



                </Row>

            </div>
        ),
        [handleChangeDateFilter, master, translate]
    );
    const columns: any = React.useMemo(
        () => [
            {
                title: (<div className='gradient-text'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 60,
                // render: renderMasterIndex<DataTable>(),
                render(...[, record]) {
                    let value = record.title ? record.title : record.indexInTable;
                    // if (index === 0) {
                    //     value = translate('general.total');
                    // }
                    return renderCell(value, record, 0, 6);
                },
            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.code")}
                    </div>
                ),
                key: nameof(dataSource[0].itemCode),
                dataIndex: nameof(dataSource[0].itemCode),
                render(...[value, record]) {
                    return renderCell(value, record, 1, 0);
                },
            },

            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.name")}
                    </div>
                ),
                key: nameof(dataSource[0].itemName),
                dataIndex: nameof(dataSource[0].itemName),
                render(...[value, record]) {
                    return renderCell(value, record, 2, 0);
                },
            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.unitOfMeasureName")}
                    </div>
                ),
                key: nameof(dataSource[0].unitOfMeasureName),
                dataIndex: nameof(dataSource[0].unitOfMeasureName),
                render(...[value, record]) {
                    return renderCell(value, record, 3, 0);
                },
            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.quantity")}
                    </div>
                ),
                key: nameof(dataSource[0].saleStock),
                dataIndex: nameof(dataSource[0].saleStock),
                render(...[value, record]) {
                    return renderCell(value, record, 4, 0);
                },
                align: "right",

            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.quantityPromotion")}
                    </div>
                ),
                key: nameof(dataSource[0].saleStock),
                dataIndex: nameof(dataSource[0].promotionStock),
                render(...[value, record]) {
                    return renderCell(value, record, 4, 0);
                },
                align: "right",

            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.discount")}
                    </div>
                ),
                align: "right",
                key: nameof(dataSource[0].discount),
                dataIndex: nameof(dataSource[0].discount),
                render(...[value, record]) {
                    return renderCell(value, record, 5, 0);
                },

            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.orderCounter")}
                    </div>
                ),
                align: "right",
                key: nameof(dataSource[0].salesOrderCounter),
                dataIndex: nameof(dataSource[0].salesOrderCounter),
                render(...[value, record]) {
                    return renderCell(value, record, 6, 2);
                },

            },
            {
                title: (
                    <div className="gradient-text">
                        {translate("customerSalesOrderItemReport.orderRevenue")}
                    </div>
                ),
                align: "right",
                key: nameof(dataSource[0].revenue),
                dataIndex: nameof(dataSource[0].revenue),
                render(...[value, record]) {
                    return renderCell(value, record, 6, 2);
                },

            },
        ],
        [translate, dataSource]
    );



    return (
        <>
            <div className="page page__master">
                <AppMainMasterTitle {...master}>
                    {translate("customerSalesOrderItemReport.master.title")}
                </AppMainMasterTitle>

                <AppMainMasterFilter
                    {...master}
                    repository={customerSalesOrderItemReportRepository}
                    translate={translate}
                    isShowDelete={false}
                    isMaterialAction={false}
                    isMaterialActionAdvance={true}
                    validAction={validAction}
                >
                    {filterChildren}
                </AppMainMasterFilter>
                <div className="page__master-table custom-scrollbar">
                    <Spin spinning={false}>
                    {/* <Spin spinning={master.loadingList}> */}
                        <Table
                            key="key"
                            onFetch={handleInfiniteOnLoad}
                            pageSize={100}
                            columns={columns}
                            scroll={{ y: 450 }}
                            dataSource={dataSource}
                            className="table-merge"
                            debug
                        />
                    </Spin>

                </div>
            </div>

        </>

    );
}

export default MaterialPurchaseBySupplierReportView;

