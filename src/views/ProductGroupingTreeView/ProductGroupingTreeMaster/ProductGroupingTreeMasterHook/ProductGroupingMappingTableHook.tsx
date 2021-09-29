
import { commonService } from "@react3l/react3l/services";
import { Descriptions, PaginationProps, Row } from "antd";
import Modal from "components/Utility/Modal/Modal";
import { formatNumber } from "helpers/number";
import { TFunction } from "i18next";
import { Product, ProductFilter } from "models/Product";
import { ProductGrouping } from "models/ProductGrouping/ProductGrouping";
import React, { Dispatch, Reducer, SetStateAction, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { forkJoin, Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { ActionFilterEnum, AdvanceFilterAction, advanceFilterReducer, advanceFilterService } from "services/advance-filter-service";
import { importExportDataService } from "services/import-export-data-service";
import listService, { ActionOfList, StateOfList } from "services/list-service";
import tableService from "services/table-service";
export const SET_LIST: string = "SET_LIST";
export const INIT_FETCH: string = "INIT_FETCH";
export const END_FETCH: string = "END_FETCH";
export const END_LOAD: string = "END_LOAD";
export const INIT_SEARCH: string = "INIT_SEARCH";

function listReducer<T>(
    state: StateOfList<T>,
    action: ActionOfList<T>
): StateOfList<T> {
    switch (action.type) {
        case SET_LIST: {
            const { list, total } = action.payload;
            return {
                ...state,
                list,
                total,
            };
        }
        case INIT_FETCH: {
            return {
                ...state,
                loadingList: true,
            };
        }
        case END_FETCH: {
            return {
                ...state,
                loadingList: false,
            };
        }
        case END_LOAD: {
            return {
                ...state,
                isLoadList: false,
            };
        }
        case INIT_SEARCH: {
            return {
                ...state,
                isLoadList: true,
            };
        }
    }
}

export function useProductGroupingMappingHook(
    modelFilterClass: new () => ProductFilter,
    getList: (filter: ProductFilter) => Observable<Product[]>,
    getTotal: (filter: ProductFilter) => Observable<number>,
    deleteItem?: (t: Product) => Observable<Product>, // pass repo.delete here
    bulkDeleteItems?: (t: KeyType[]) => Observable<void>,
    onUpdateListSuccess?: (item?: Product) => void,
    onImportSuccess?: (list: Product[]) => void,
    model?: ProductGrouping,
    setModel?: Dispatch<SetStateAction<ProductGrouping>>,
    validAction?: TFunction,

) {


    const [toggle, setToggle] = useState<boolean>(false);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [idList, setIdList] = useState<number[]>([]);
    const [filter, dispatch] = React.useReducer<
        React.Reducer<ProductFilter, AdvanceFilterAction<ProductFilter>>
    >(advanceFilterReducer, new ProductFilter());
    const [isOpenProductPrewiew, setOpenProductPreview] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>(new Product());
    const [subscription] = commonService.useSubscription();

    const [{ list, total, loadingList }, dispatchList] = useReducer<
        Reducer<StateOfList<Product>, ActionOfList<Product>>
    >(listReducer, {
        list: [],
        total: 0,
        loadingList: false,
    });
    const { handleFetchInit, handleFetchEnd } = listService.useFetchEffect(dispatchList);

    const handleOpenModelProduct = React.useCallback(() => {
        setOpenModal(true);
    }, []);

    const handleToggleSearch = useCallback(() => {
        const toggleTmp = !toggle;
        setToggle(toggleTmp);
    }, [toggle, setToggle]);

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<ProductFilter>(
        filter,
        dispatch,
        modelFilterClass
    );

    const {
        rowSelection,
        selectedRowKeys,
        setSelectedRowKeys,
        canBulkDelete,
    } = tableService.useRowSelection();

    const handleLoadList = useCallback((filterValue) => {
        handleFetchInit();
        subscription.add(
            forkJoin([getList(filterValue), getTotal(filterValue)])
                .pipe(
                    finalize(handleFetchEnd)
                )
                .subscribe((results: [Product[], number]) => {
                    dispatchList({
                        type: SET_LIST,
                        payload: {
                            list: results[0],
                            total: results[1],
                        },
                    });
                    setIdList(results[0].map(item => item.id));
                })
        );
    }, [getList, getTotal, handleFetchEnd, handleFetchInit, subscription]);

    const handleDelete = useCallback(
        (item: Product) => {
            if (typeof deleteItem === "function") {
                subscription.add(
                    deleteItem(item)
                        .pipe(
                            tap(handleFetchInit),
                            finalize(handleFetchEnd)
                        )
                        .subscribe((item: Product) => {
                            if (typeof onUpdateListSuccess === "function") {
                                onUpdateListSuccess(item); // sideEffect when update list successfully
                            }
                            setSelectedRowKeys(
                                (selectedRowKeys as number[]).filter((id) => id !== item.id) // filter selectedRowKeys
                            );
                            handleLoadList(filter);

                        })
                );
            }
        },
        [
            deleteItem,
            subscription,
            handleFetchInit,
            handleFetchEnd,
            onUpdateListSuccess,
            setSelectedRowKeys,
            selectedRowKeys,
            handleLoadList,
            filter,
        ]
    );

    const handleBulkDelete = useCallback(
        (keys: any[]) => {
            if (typeof bulkDeleteItems === "function") {
                subscription.add(
                    bulkDeleteItems(keys)
                        .pipe(tap(handleFetchInit), finalize(handleFetchEnd))
                        .subscribe(() => {
                            if (typeof onUpdateListSuccess === "function") {
                                onUpdateListSuccess(); // sideEffect when update list successfully
                            }
                            // handleLoadList(filter)
                            setSelectedRowKeys([]); // empty selectedRowKeys for disabling button
                            // update filter to default skip, take
                            handleLoadList(filter);
                        })
                );
            }
        },
        [
            bulkDeleteItems,
            filter,
            handleFetchEnd,
            handleFetchInit,
            handleLoadList,
            onUpdateListSuccess,
            setSelectedRowKeys,
            subscription,
        ]
    );
    useEffect(() => {
        if (validAction('update')) {
            if (loadList) {
                if (model.id !== null) {
                    handleLoadList(filter); // trigger loadList only isLoadList == true
                    dispatchList({ type: END_LOAD }); // end loading internally
                    setLoadList(false);
                }
            }
        }

    }, [filter, handleLoadList, loadList, model, setLoadList, validAction]);

    const {
        handleTableChange,
        handlePagination,
        handleServerDelete: handleDeleteProduct,
        handleServerBulkDelete: handleBulkDeleteProduct,
    } = tableService.useTable<Product, ProductFilter>(
        filter,
        handleUpdateNewFilter,
        handleSearch,
        selectedRowKeys,
        handleDelete,
        handleBulkDelete,
    );
    const handleChangeSearch = React.useCallback(
        (fieldName: string, filterType: string) => (value: any) => {
            const filterValue = { ...filter };
            filterValue[fieldName][filterType] = value;
            filterValue["skip"] = 0;
            filterValue["take"] = 10;
            dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: filterValue,
            });
            handleLoadList(filterValue);
        },
        [filter, handleLoadList]
    );


    const pagination: PaginationProps = tableService.usePagination<ProductFilter>(
        filter,
        total
    );
    const { handleImportList } = importExportDataService.useImport(
        onImportSuccess
    );

    const {
        handleListExport,
        handleExportTemplateList,
    } = importExportDataService.useExport();

    const importButtonRef: React.LegacyRef<HTMLInputElement> = useRef<
        HTMLInputElement
    >();
    const handleOpenProductPreview = useCallback((model) => {
        setOpenProductPreview(true);
        setProduct(model);
    }, []);

    const handleCloseProductPreview = useCallback(() => {
        setOpenProductPreview(false);
        setProduct(new Product());
    }, []);
    return {
        list,
        total,
        loadingList,
        filter,
        toggle,
        handleUpdateNewFilter,
        handleChangeFilter,
        handleResetFilter,
        handleToggleSearch,
        handleDeleteProduct,
        handleBulkDeleteProduct,
        handleSearch,
        handleImportList,
        handleListExport,
        handleExportTemplateList,
        importButtonRef,
        rowSelection,
        canBulkDelete,
        pagination,
        handleChangeSearch,
        handleTableChange,
        handlePagination,
        handleOpenModelProduct,
        isOpenModal,
        idList,
        isOpenProductPrewiew,
        product,
        handleOpenProductPreview,
        handleCloseProductPreview,
    };
}


interface ProductPreviewProps {
    previewModel?: Product;
    isOpenPreview?: boolean;
    handleClosePreview?: () => void;
    translate?: TFunction;
}

export function ProductPreview(props: ProductPreviewProps) {
    const {
        previewModel,
        isOpenPreview,
        handleClosePreview,
        translate,
    } = props;


    return (
        <>
            <Modal
                title={null}
                visible={isOpenPreview}
                handleCancel={handleClosePreview}
                width={1200}
                visibleFooter={false}
            >
                <div className="preview__containter">
                    <div className="preview__left-side">
                        <div className="preview__body product-preview">
                            <div className="btn-cancel" onClick={handleClosePreview}>
                                <i className="tio-clear_circle" />
                            </div>
                            <div className="product-preview__content">
                                <Row className="product-preview__header">
                                    <div className="product-preview__image" >
                                        {previewModel?.productImageMappings &&
                                            previewModel?.productImageMappings.length > 0 &&
                                            previewModel?.productImageMappings.map(
                                                (productImageMapping, index) => {
                                                    return (
                                                        <img
                                                            key={index}
                                                            src={productImageMapping?.image?.url}
                                                            width="104"
                                                            height="104"
                                                            alt=""
                                                        />
                                                    );
                                                }
                                            )}
                                    </div>

                                    <div className="name mt-2">{previewModel?.name && previewModel?.name}</div>
                                    <div className="code mt-2">
                                        <span className="mr-2">{previewModel?.code && previewModel?.code}</span>
                                        {previewModel?.statusId && (
                                            <i
                                                className="tio-checkmark_circle"
                                                style={{ color: "#6DD230" }}
                                            />
                                        )}
                                    </div>

                                </Row>
                                <Row className="w-100">
                                    <Descriptions>
                                        {previewModel?.items &&
                                            previewModel?.items.length > 0 &&
                                            previewModel?.items.map((item) => {
                                                return (
                                                    <div className="list_item">
                                                        <div className="d-flex ">
                                                            <div className="item-image mr-3">
                                                                {item?.itemImageMappings.length > 0 && (
                                                                    <img
                                                                        src={
                                                                            item?.itemImageMappings[0]?.image?.url
                                                                        }
                                                                        alt="no data"
                                                                        className="item-image"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="ant-cell-master__container">
                                                                <div className="cell-master__first-row">
                                                                    {item?.name}
                                                                </div>
                                                                <div className="cell-master__second-row">
                                                                    {item?.code}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ant-cell-master__container">
                                                            <div className="cell-master__first-row">
                                                                {item?.scanCode}
                                                            </div>
                                                            <div className="cell-master__second-row">
                                                                {translate("items.scanCode")}
                                                            </div>
                                                        </div>
                                                        <div className="ant-cell-master__container">
                                                            <div className="cell-master__first-row">
                                                                {formatNumber(item?.salePrice)}
                                                            </div>
                                                            <div className="cell-master__second-row">
                                                                {translate("items.price")}
                                                            </div>
                                                        </div>
                                                        <div className="ant-cell-master__container">
                                                            <div className="cell-master__first-row">
                                                                {formatNumber(item?.retailPrice)}
                                                            </div>
                                                            <div className="cell-master__second-row">
                                                                {translate("items.retailPrice")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </Descriptions>
                                </Row>
                                <Row className="mt-3">
                                    <Descriptions
                                        title={translate("products.title.generalInfor")}
                                        column={1}
                                    >
                                        <Descriptions.Item label={translate("products.category")}>
                                            <span className="gradient-text">
                                                {previewModel?.category && previewModel?.category?.name}
                                            </span>
                                        </Descriptions.Item>

                                        <Descriptions.Item
                                            label={translate("products.productType")}
                                        >
                                            <span className="gradient-text">
                                                {previewModel?.productType && previewModel?.productType?.name}
                                            </span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={translate("products.scanCode")}>
                                            <span className="gradient-text">
                                                {previewModel?.scanCode && previewModel?.scanCode}
                                            </span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={translate("products.brand")}>
                                            <span className="gradient-text">
                                                {previewModel?.brand && previewModel?.brand?.name}
                                            </span>
                                        </Descriptions.Item>

                                        <Descriptions.Item
                                            label={translate("products.otherName")}
                                        >
                                            <span className="gradient-text">
                                                {previewModel?.otherName}
                                            </span>
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={translate("products.unitOfMeasure")}
                                        >
                                            <span className="gradient-text">
                                                {previewModel?.unitOfMeasure && previewModel?.unitOfMeasure?.name}
                                            </span>
                                        </Descriptions.Item>

                                        <Descriptions.Item
                                            label={translate("products.unitOfMeasureGrouping")}
                                        >
                                            <span className="gradient-text">
                                                {previewModel?.unitOfMeasureGrouping && previewModel?.unitOfMeasureGrouping?.name}
                                            </span>
                                        </Descriptions.Item>

                                        <Descriptions.Item label={translate("products.eRPCode")}>
                                            <span className="gradient-text">
                                                {previewModel?.eRPCode}
                                            </span>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Row>
                                <Descriptions title={translate("products.productGrouping")} >

                                    <div className="d-flex justify-content-start align-items-center">
                                        {previewModel?.productProductGroupingMappings &&
                                            previewModel?.productProductGroupingMappings.length >
                                            0 &&
                                            previewModel?.productProductGroupingMappings.map(
                                                (content, index) => {
                                                    return (
                                                        <span className="product-grouping" key={index}>
                                                            {content?.productGrouping?.name}
                                                        </span>
                                                    );
                                                }
                                            )}
                                    </div>
                                </Descriptions>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
