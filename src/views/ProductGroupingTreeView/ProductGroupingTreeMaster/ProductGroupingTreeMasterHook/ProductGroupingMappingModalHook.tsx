/* begin general import */
import { commonService } from '@react3l/react3l/services/common-service';
import { Col, Row, Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { AxiosError } from 'axios';
import AdvanceStringFilter from 'components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter';
import Modal from 'components/Utility/Modal/Modal';
import Pagination from 'components/Utility/Pagination/Pagination';
import { masterTableIndex } from 'helpers/table';
import { TFunction } from 'i18next';
import { Product, ProductFilter } from 'models/Product';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductProductGroupingMapping } from 'models/ProductProductGroupingMapping';
import React, { useCallback, useState } from "react";
import { productGroupingRepository } from 'repositories/product-grouping-repository';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { finalize } from 'rxjs/operators';
import { ActionFilterEnum, AdvanceFilterAction, advanceFilterReducer } from 'services/advance-filter-service';
import appMessageService from 'services/app-message-service';
import { CreateColumn, CreateTableColumns } from 'services/component-factory/table-column-service';
import tableService from 'services/table-service';
import nameof from "ts-nameof.macro";
import './ProductGroupingMappingModalHook.scss';
/* end individual import */

export function useProductGroupingMappingModalHook(
    model: ProductGrouping,
    setModel: (data: ProductGrouping) => void,
    idList: number[],
    getList: (filter: ProductFilter) => Observable<Product[]>,
    getTotal: (filter: ProductFilter) => Observable<number>,
    handleSeach?: () => void,

) {
    const [productList, setProductList] = useState<Product[]>([]);
    const [productFilter, dispatchProductFilter] = React.useReducer<
        React.Reducer<ProductFilter, AdvanceFilterAction<ProductFilter>>
    >(advanceFilterReducer, new ProductFilter());
    const [productTotal, setTotal] = useState<number>(undefined);
    const [isOpenProductModal, setOpenModal] = useState<boolean>(false);
    const [loadingProductModal, setLoading] = useState<boolean>(false);
    const [subscription] = commonService.useSubscription();
    const [selectedList, setSelectedList] = useState<Product[]>([]);
    const { rowSelection } = tableService.useContentRowSelection(
        selectedList,
        setSelectedList
    );

    const handleLoadList = useCallback((filterValue) => {
        const newFilter = { ...filterValue };
        newFilter['id']['notIn'] = idList;
        setLoading(true);
        subscription.add(
            forkJoin([getList(newFilter), getTotal(newFilter)])
                .pipe(
                    finalize(() => setLoading(false))
                )
                .subscribe((results: [Product[], number]) => {
                    setProductList([...results[0]]);
                    setTotal(results[1]);
                })
        );
    }, [getList, getTotal, idList, subscription]);
    const handleOpenProductModal = useCallback(() => {
        setOpenModal(true);
        handleLoadList(productFilter);
    }, [handleLoadList, productFilter]);
    const handleCloseProductModal = React.useCallback(() => {
        setOpenModal(false);
        setSelectedList([]);
    }, []);

    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();

    const handleSaveProduct = useCallback(
        list => {
            const arr = model.productProductGroupingMappings ? model.productProductGroupingMappings : [];
            const mappingList = list.map(item => {
                const mapping = new ProductProductGroupingMapping();
                mapping.product = item;
                mapping.productId = item.id;
                mapping.productGroupingId = model.id;
                return mapping;
            });
            model.productProductGroupingMappings = [...arr, ...mappingList];
            setModel({ ...model });
            productGroupingRepository.update(model)

                .subscribe(
                    (item => {
                        setTimeout(() => {
                            notifyUpdateItemSuccess();
                        }, 0);
                        setOpenModal(false);
                        handleSeach();
                        setSelectedList([]);
                    }),
                    ((error: AxiosError<ProductGrouping>) => {
                        notifyUpdateItemError();
                    })
                );


        }, [handleSeach, model, notifyUpdateItemError, notifyUpdateItemSuccess, setModel]);

    const handleChangePagination = React.useCallback(
        (skip: number, take: number) => {
            const filterValue = { ...productFilter };
            filterValue["skip"] = skip;
            filterValue["take"] = take;
            dispatchProductFilter({
                type: ActionFilterEnum.ChangeAllField,
                data: filterValue,
            });
            handleLoadList(filterValue);
        },
        [productFilter, handleLoadList]
    );

    const handleChangeSearch = React.useCallback(
        (fieldName: string, filterType: string) => (value: any) => {
            const filterValue = { ...productFilter };
            filterValue[fieldName][filterType] = value;
            filterValue["skip"] = 0;
            filterValue["take"] = 10;
            dispatchProductFilter({
                type: ActionFilterEnum.ChangeAllField,
                data: filterValue,
            });
            handleLoadList(filterValue);
        },
        [productFilter, handleLoadList]
    );
    return {
        loadingProductModal,
        handleOpenProductModal,
        handleCloseProductModal,
        handleSaveProduct,
        productList,
        productTotal,
        isOpenProductModal,
        handleChangePagination,
        handleChangeSearch,
        productFilter,
        rowSelection,
        selectedList,

    };
};

interface ProductProductGroupingMappingViewProps {
    model?: ProductGrouping;
    list?: Product[];
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    translate?: TFunction;
    handleSave?: (selectedList: ProductGrouping[]) => void;
    handleChangePagination?: (skip: number, take: number) => void;
    handleChangeSearch?: (
        fieldName: string,
        filterType: string
    ) => (value: any) => void;
    productFilter?: ProductFilter;
    rowSelection?: TableRowSelection<Product>;
    selectedList?: Product[];
    total?: number,

};

export function ProductProductGroupingMappingView(props: ProductProductGroupingMappingViewProps) {

    const {
        isOpenPreview,
        handleClosePreview,
        handleChangeSearch,
        handleSave,
        list,
        translate,
        productFilter,
        rowSelection,
        selectedList,
        handleChangePagination,
        total
    } = props;



    const productColumns = React.useMemo(
        () =>
            CreateTableColumns(
                CreateColumn()
                    .Title(translate("general.columns.index"))
                    .Key("index")
                    .Width(70)
                    .Render(masterTableIndex<Product, ProductFilter>(productFilter)),

                CreateColumn()
                    .Title(translate("productGroupings.products.code"))
                    .Key("code")
                    .DataIndex("code"),

                CreateColumn()
                    .Title(translate("productGroupings.products.name"))
                    .Key("name")
                    .DataIndex("name"),
                CreateColumn()
                    .Title(translate("productGroupings.products.productGrouping"))
                    .Key("productProductGroupingMappings")
                    .DataIndex("productProductGroupingMappings")
                    .Render((...[productProductGroupingMappings]) => {
                        return (
                            <div>
                                {productProductGroupingMappings &&
                                    productProductGroupingMappings?.length > 0
                                    ? productProductGroupingMappings.map(
                                        (productGrouping, index) => {
                                            return (
                                                <div key={index}>
                                                    {productGrouping?.productGrouping &&
                                                        productGrouping?.productGrouping?.name}
                                                    {index <
                                                        productProductGroupingMappings.length - 1 && (
                                                            <span>, </span>
                                                        )}
                                                </div>
                                            );
                                        }
                                    )
                                    : " "}
                            </div>
                        );
                    }),

                CreateColumn()
                    .Title(translate("productGroupings.products.productType"))
                    .Key("productType")
                    .DataIndex("productType")
                    .Render((...[productType]) => {
                        return productType?.name;
                    }),

                CreateColumn()
                    .Title(translate("productGroupings.products.supplier"))
                    .Key("supplier")
                    .DataIndex("supplier")
                    .Render((...[supplier]) => {
                        return supplier?.name;
                    }),

            ),
        [productFilter, translate],
    );

    return <>
        <Modal

            title={null}
            visible={isOpenPreview}
            handleCancel={handleClosePreview}
            width={1200}

            visibleFooter={false}>
            <div className="preview__containter">
                <div className="preview__left-side">
                    <div className="preview__header">
                        <div className="preview__vertical-bar"></div>
                        <div className="preview__header-info">
                            <div className="preview__header-text">
                                <span className="preview__header-title mt-2">{translate('productGroupings.addProduct')}</span>
                            </div>

                        </div>
                    </div>
                    <div className="preview__body">
                        <div className="preview__content product-grouping__product">
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col className="gutter-row" span={8}>
                                    <AdvanceStringFilter
                                        value={productFilter[nameof(list[0].code)]["contain"]}
                                        onEnter={handleChangeSearch("code", "contain")}
                                        isMaterial={true}
                                        className={"tio-search"}
                                        title='Mã sản phẩm'
                                        placeHolder={"Tìm kiếm mã sản phẩm..."}
                                    />
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <AdvanceStringFilter
                                        value={
                                            productFilter[nameof(list[0].name)]["contain"]
                                        }
                                        onEnter={handleChangeSearch("name", "contain")}
                                        isMaterial={true}
                                        className={"tio-search"}
                                        title={"Tên sản phẩm"}
                                        placeHolder={"Tìm kiếm tên sản phẩm..."}
                                    />
                                </Col>
                            </Row>
                            <Row>

                                <Table
                                    key={list[0]?.id}
                                    tableLayout="fixed"
                                    columns={productColumns}
                                    dataSource={list}
                                    pagination={false}
                                    rowKey={nameof(list[0].id)}
                                    className=" mt-4"
                                    rowSelection={rowSelection}
                                    title={() => (
                                        <div className="d-flex justify-content-end">
                                            <Pagination
                                                skip={productFilter.skip}
                                                take={productFilter.take}
                                                total={total}
                                                onChange={handleChangePagination}
                                                style={{ margin: "10px" }}
                                            />
                                        </div>
                                    )}

                                />
                            </Row>

                        </div>
                    </div>
                    <div className="preview__footer d-flex justify-content-between">
                        <button className="btn btn-sm component__btn-primary mr-2"
                            onClick={() => handleSave(selectedList)}
                        >
                            <span>
                                <i className="tio-save mr-2"></i>{" "}
                                {translate("general.actions.save")}
                            </span>
                        </button>
                        <button
                            className="btn btn-cancel"
                            onClick={handleClosePreview}
                        >
                            <span>
                                <i className="tio-clear_circle_outlined"></i> Đóng
                                    </span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </>;
}

export default ProductProductGroupingMappingView;
