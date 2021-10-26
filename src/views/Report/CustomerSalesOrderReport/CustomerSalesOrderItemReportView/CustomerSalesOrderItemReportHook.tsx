import { Model, ModelFilter } from "@react3l/react3l/core";
import classNames from "classnames";
import { INFINITE_SCROLL_TAKE } from "config/consts";
import { formatDateTime } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { CustomerSalesOrderItemReport } from "models/CustomerSalesOrderItemReport";
import React, { useCallback } from "react";
import { customerSalesOrderItemReportRepository } from "repositories/customer-sales-order-item-report-repository";
import { v4 as uuidv4 } from "uuid";
import { uniqueArray } from "views/Report/ReportHook";

export class DataTable extends Model {
    revenue?: number;
    discount?: number;
    itemName?: string;
    unitOfMeasureName?: string;
    saleStock?: number;
    promotionStock?: number;
    salesOrderCounter?: number;
    itemCode?: string
}

export const transformData = (item: CustomerSalesOrderItemReport) => {
    const datalist = [];
    // fist record is title record
    // datalist[0] = {
    //     ...new DataTable(),
    //     title: item.itemName,
    //     key: uuidv4(),
    //     rowSpan: 1,
    //     colSpan: 6,
    //     isColspan: true
    // };
    item.itemDetails?.forEach((s: any) => {
        const {
            id,
            itemName,
            unitOfMeasureName,
            itemCode,
            revenue,
            discount,
            saleStock,
            promotionStock,
            salesOrderCounter,
        } = s;
        datalist.push({
            ...new DataTable(),
            key: uuidv4(),
            id,
            itemName,
            unitOfMeasureName,
            itemCode,
            revenue,
            discount,
            saleStock,
            promotionStock,
            salesOrderCounter
        });
    });
    return datalist;
};


export function useCustomerSalesOrderItemReport<T extends Model, TFilter extends ModelFilter>(
    master?: any,
) {

    const [dataSource, setDataSource] = React.useState<T[]>([]);
    React.useEffect(() => {
        if (master?.loadingData) {
            let tableData = [];
            tableData =
                master?.list && master?.list.length
                    ? master?.list.map((itemList: any) => transformData(itemList))
                    : [];
            let index = 0;
            /* [[], [], []] => [] */
            const dataList =
                tableData.length > 0
                    ? tableData.flat(1).map(data => {
                        if (!data.title) {
                            if (data.rowSpan !== 0) {
                                index = index + 1;
                            }
                        }
                        return { ...data, indexInTable: index };
                    })
                    : [];
            setDataSource([...dataList]);
            master?.setLoadingData(false);
        }

    }, [master]);

    const handleInfiniteOnLoad = useCallback(() => {
        if (master?.filter?.skip >= master?.total) {
            return;
        }

        master?.setLoadingList(true);
        if (!master?.reset) {
            customerSalesOrderItemReportRepository
                .list({
                    ...master?.filter,
                    skip: master?.filter.skip + INFINITE_SCROLL_TAKE,
                    take: INFINITE_SCROLL_TAKE,
                })
                .subscribe((newList: T[]) => {
                    const filteredArr = uniqueArray([...master?.list, ...newList], "supplierId", 'purchaseOrders');
                    master?.setList([...filteredArr]);
                    const newFilter = { ...master?.filter };
                    newFilter.skip = newFilter.skip + 20;
                    newFilter.take = 20;
                    master?.setLoadingList(false);
                    master?.handleUpdateNewFilter(newFilter);
                    master?.setLoadingData(true);
                });
        }

    }, [master]);


    return [dataSource, handleInfiniteOnLoad];

}

export const renderCell = (
    value: any,
    record: any,
    colIndex: number,
    firstColNumber?: number,
) => {
    // check if record has title or not
    // if (record.title) {
    //     let colSpan = 0;
    //     // if colIndex = 0; set colSpan = number of column
    //     if (colIndex === 0) {
    //         colSpan = colNumber ? colNumber : 1;
    //     }
    //     return {
    //         children: <div className="table-title-row table-row">{value}</div>,
    //         props: {
    //             rowSpan: 1,
    //             colSpan,
    //         },
    //     };
    // }
    // base on type of value, we align text right, left or center
    if (record.title) {
        // if typeof value === number, format it
        if (typeof value === 'number') {
            value = formatNumber(value);
        }

        if (typeof value === 'object') {
            value = formatDateTime(value);
        }
        return {
            children: (
                <div className="table-title-row ant-cell-master__container">
                    <div
                        className={classNames("cell-master__first-row", {
                            "first-row--ellipsis":
                                value &&
                                value.length >= 30,
                        })}
                    >
                        {value}
                    </div>
                </div>
            ),
            // <span className={`${alignText} table-row`}>{value}</span>,
            props: {
                rowSpan: 1,
                colSpan: firstColNumber,
            },
        };
    }
    // if typeof value === number, format it
    if (typeof value === 'number') {
        value = formatNumber(value);
    }
    if (typeof value === 'object') {
        value = formatDateTime(value);
    }

    return {
        children: (
            <div className="ant-cell-master__container">
                <div
                    className={classNames("cell-master__first-row", {
                        "first-row--ellipsis":
                            value &&
                            value.length >= 30,
                    })}
                >
                    {value}
                </div>
            </div>
        ),
        props: {
            rowSpan: 1,
            colSpan: 1,
        },
    };
};
