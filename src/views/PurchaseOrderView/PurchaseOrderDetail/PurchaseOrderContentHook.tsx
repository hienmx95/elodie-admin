/* begin general import */
import { IdFilter, NumberFilter, StringFilter } from "@react3l/advanced-filters";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { masterTableIndex } from "helpers/table";
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
/* end general import */
/* begin individual import */
import { PurchaseOrder } from 'models/PurchaseOrder';
import { PurchaseOrderContent, PurchaseOrderContentFilter } from 'models/PurchaseOrderContent';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import React from "react";
import { useTranslation } from "react-i18next";
import { purchaseOrderRepository } from "repositories/purchase-order-repository";
import {
    AdvanceFilterAction,
    advanceFilterReducer,
    advanceFilterService
} from "services/advance-filter-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
    CreateColumn,
    CreateTableAction,
    CreateTableColumns
} from "services/component-factory/table-column-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService, { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

export function usePurchaseOrderContentTable(
    model: PurchaseOrder,
    setModel: (data: PurchaseOrder) => void,
) {
    const [translate] = useTranslation();
    const {
        content: purchaseOrderContentContents,
        setContent: setPurchaseOrderContentContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.purchaseOrderContents),
    );
    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderNumberFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        purchaseOrderContentFilter,
        dispatchPurchaseOrderContentFilter,
    ] = React.useReducer<React.Reducer<PurchaseOrderContentFilter, AdvanceFilterAction<PurchaseOrderContentFilter>>>(advanceFilterReducer, new PurchaseOrderContentFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PurchaseOrderContentFilter>
            (
                purchaseOrderContentFilter,
                dispatchPurchaseOrderContentFilter,
                PurchaseOrderContentFilter,
            );

    const { list, total, loadingList } = listService.useLocalList(
        purchaseOrderContentFilter,
        purchaseOrderContentContents,
        loadList,
        setLoadList,
    );

    const {
        handleTableChange,
        handlePagination,
        rowSelection,
        canBulkDelete,
        handleLocalDelete,
        handleLocalBulkDelete,
        handleChangeOneCell,
        handleAddContent,
    } = tableService.useLocalTable
            <
                PurchaseOrderContent,
                any
                ,
                PurchaseOrderContentFilter
            >
            (
                purchaseOrderContentFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                purchaseOrderContentContents,
                setPurchaseOrderContentContents,
                PurchaseOrderContent,
            );

    const {
        ref,
        handleClick,
        handleImportContentList,
    } = importExportDataService.useImport();

    const {
        handleContentExport,
        handleContentExportTemplate,
    } = importExportDataService.useExport();

    const purchaseOrderContentContentColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.columns.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("index")
                        .Width(120)
                        .Render(masterTableIndex<PurchaseOrderContent, PurchaseOrderContentFilter>
                            (purchaseOrderContentFilter),
                        ),
                ),



            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.description")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].description)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].description))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].description),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderStringFilter(
                                purchaseOrderContentFilter["description"]["contain"],
                                handleChangeFilter(
                                    "description",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("purchaseOrders.filter.description"),
                            ),
                        )
                        .Render((...params: [string, PurchaseOrderContent, number]) => {
                            return <InputText
                                value={params[0]}
                                placeHolder={translate("purchaseOrders.placeholder.description")}
                                onBlur={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].description))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].description)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.isReceiveAll")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].isReceiveAll)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].isReceiveAll))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].isReceiveAll),
                        ),
                )
            ,





            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.unitPrice")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].unitPrice)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].unitPrice))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].unitPrice),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["unitPrice"]["equal"],
                                translate("purchaseOrders.filter.unitPrice"),
                                handleChangeFilter(
                                    "unitPrice",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.unitPrice")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].unitPrice))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].unitPrice)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.quantity")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].quantity)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].quantity))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].quantity),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["quantity"]["equal"],
                                translate("purchaseOrders.filter.quantity"),
                                handleChangeFilter(
                                    "quantity",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.quantity")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].quantity))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].quantity)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.price")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].price)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].price))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].price),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["price"]["equal"],
                                translate("purchaseOrders.filter.price"),
                                handleChangeFilter(
                                    "price",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.price")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].price))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].price)),
                )
            ,



            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.taxAmount")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].taxAmount)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].taxAmount))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].taxAmount),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["taxAmount"]["equal"],
                                translate("purchaseOrders.filter.taxAmount"),
                                handleChangeFilter(
                                    "taxAmount",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.taxAmount")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].taxAmount))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].taxAmount)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.total")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].total)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].total))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].total),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["total"]["equal"],
                                translate("purchaseOrders.filter.total"),
                                handleChangeFilter(
                                    "total",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.total")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].total))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].total)),
                )
            ,




            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.exchangeRate")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].exchangeRate)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].exchangeRate))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].exchangeRate),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["exchangeRate"]["equal"],
                                translate("purchaseOrders.filter.exchangeRate"),
                                handleChangeFilter(
                                    "exchangeRate",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.exchangeRate")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].exchangeRate))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].exchangeRate)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.exchangedPrice")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].exchangedPrice)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].exchangedPrice))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].exchangedPrice),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["exchangedPrice"]["equal"],
                                translate("purchaseOrders.filter.exchangedPrice"),
                                handleChangeFilter(
                                    "exchangedPrice",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.exchangedPrice")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].exchangedPrice))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].exchangedPrice)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.exchangedTaxAmount")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].exchangedTaxAmount)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].exchangedTaxAmount))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].exchangedTaxAmount),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["exchangedTaxAmount"]["equal"],
                                translate("purchaseOrders.filter.exchangedTaxAmount"),
                                handleChangeFilter(
                                    "exchangedTaxAmount",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.exchangedTaxAmount")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].exchangedTaxAmount))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].exchangedTaxAmount)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.exchangedTotal")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].exchangedTotal)) //Key
                .DataIndex(nameof(purchaseOrderContentContents[0].exchangedTotal))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                        (
                            purchaseOrderContentFilter,
                            nameof(purchaseOrderContentContents[0].exchangedTotal),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseOrderContentFilter["exchangedTotal"]["equal"],
                                translate("purchaseOrders.filter.exchangedTotal"),
                                handleChangeFilter(
                                    "exchangedTotal",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseOrderContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseOrders.placeholder.exchangedTotal")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].exchangedTotal))} />;
                        })
                        .DataIndex(nameof(purchaseOrderContentContents[0].exchangedTotal)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.category")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].category))
                .DataIndex(nameof(purchaseOrderContentContents[0].category))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                    (
                        purchaseOrderContentFilter,
                        nameof(purchaseOrderContentContents[0].category),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseOrderContentFilter["categoryId"]["equal"],
                                handleChangeFilter("categoryId", "equal" as any, IdFilter),
                                CategoryFilter,
                                purchaseOrderRepository.singleListCategory,
                            ),
                        )
                        .Render((...params: [Category, PurchaseOrderContent, number]) => {
                            return <Select
                                classFilter={CategoryFilter}
                                placeHolder={translate("purchaseOrders.placeholder.category")}
                                getList={purchaseOrderRepository.singleListCategory}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].category))}
                                model={params[1].category} />;
                        })
                        .Key(nameof(purchaseOrderContentContents[0].category))
                        .DataIndex(nameof(purchaseOrderContentContents[0].category)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.exchangeCurrency")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].exchangeCurrency))
                .DataIndex(nameof(purchaseOrderContentContents[0].exchangeCurrency))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                    (
                        purchaseOrderContentFilter,
                        nameof(purchaseOrderContentContents[0].exchangeCurrency),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseOrderContentFilter["exchangeCurrencyId"]["equal"],
                                handleChangeFilter("exchangeCurrencyId", "equal" as any, IdFilter),
                                CurrencyFilter,
                                purchaseOrderRepository.singleListCurrency,
                            ),
                        )
                        .Render((...params: [Currency, PurchaseOrderContent, number]) => {
                            return <Select
                                classFilter={CurrencyFilter}
                                placeHolder={translate("purchaseOrders.placeholder.exchangeCurrency")}
                                getList={purchaseOrderRepository.singleListCurrency}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].exchangeCurrency))}
                                model={params[1].exchangeCurrency} />;
                        })
                        .Key(nameof(purchaseOrderContentContents[0].exchangeCurrency))
                        .DataIndex(nameof(purchaseOrderContentContents[0].exchangeCurrency)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.item")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].item))
                .DataIndex(nameof(purchaseOrderContentContents[0].item))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                    (
                        purchaseOrderContentFilter,
                        nameof(purchaseOrderContentContents[0].item),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseOrderContentFilter["itemId"]["equal"],
                                handleChangeFilter("itemId", "equal" as any, IdFilter),
                                ItemFilter,
                                purchaseOrderRepository.singleListItem,
                            ),
                        )
                        .Render((...params: [Item, PurchaseOrderContent, number]) => {
                            return <Select
                                classFilter={ItemFilter}
                                placeHolder={translate("purchaseOrders.placeholder.item")}
                                getList={purchaseOrderRepository.singleListItem}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].item))}
                                model={params[1].item} />;
                        })
                        .Key(nameof(purchaseOrderContentContents[0].item))
                        .DataIndex(nameof(purchaseOrderContentContents[0].item)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.mainCurrency")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].mainCurrency))
                .DataIndex(nameof(purchaseOrderContentContents[0].mainCurrency))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                    (
                        purchaseOrderContentFilter,
                        nameof(purchaseOrderContentContents[0].mainCurrency),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseOrderContentFilter["mainCurrencyId"]["equal"],
                                handleChangeFilter("mainCurrencyId", "equal" as any, IdFilter),
                                CurrencyFilter,
                                purchaseOrderRepository.singleListCurrency,
                            ),
                        )
                        .Render((...params: [Currency, PurchaseOrderContent, number]) => {
                            return <Select
                                classFilter={CurrencyFilter}
                                placeHolder={translate("purchaseOrders.placeholder.mainCurrency")}
                                getList={purchaseOrderRepository.singleListCurrency}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].mainCurrency))}
                                model={params[1].mainCurrency} />;
                        })
                        .Key(nameof(purchaseOrderContentContents[0].mainCurrency))
                        .DataIndex(nameof(purchaseOrderContentContents[0].mainCurrency)),
                ),


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.taxType")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].taxType))
                .DataIndex(nameof(purchaseOrderContentContents[0].taxType))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                    (
                        purchaseOrderContentFilter,
                        nameof(purchaseOrderContentContents[0].taxType),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseOrderContentFilter["taxTypeId"]["equal"],
                                handleChangeFilter("taxTypeId", "equal" as any, IdFilter),
                                TaxTypeFilter,
                                purchaseOrderRepository.singleListTaxType,
                            ),
                        )
                        .Render((...params: [TaxType, PurchaseOrderContent, number]) => {
                            return <Select
                                classFilter={TaxTypeFilter}
                                placeHolder={translate("purchaseOrders.placeholder.taxType")}
                                getList={purchaseOrderRepository.singleListTaxType}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].taxType))}
                                model={params[1].taxType} />;
                        })
                        .Key(nameof(purchaseOrderContentContents[0].taxType))
                        .DataIndex(nameof(purchaseOrderContentContents[0].taxType)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderContent.unitOfMeasure")}</div>)
                .Key(nameof(purchaseOrderContentContents[0].unitOfMeasure))
                .DataIndex(nameof(purchaseOrderContentContents[0].unitOfMeasure))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseOrderContent, PurchaseOrderContentFilter>
                    (
                        purchaseOrderContentFilter,
                        nameof(purchaseOrderContentContents[0].unitOfMeasure),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseOrderContentFilter["unitOfMeasureId"]["equal"],
                                handleChangeFilter("unitOfMeasureId", "equal" as any, IdFilter),
                                UnitOfMeasureFilter,
                                purchaseOrderRepository.singleListUnitOfMeasure,
                            ),
                        )
                        .Render((...params: [UnitOfMeasure, PurchaseOrderContent, number]) => {
                            return <Select
                                classFilter={UnitOfMeasureFilter}
                                placeHolder={translate("purchaseOrders.placeholder.unitOfMeasure")}
                                getList={purchaseOrderRepository.singleListUnitOfMeasure}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseOrderContentContents[0].unitOfMeasure))}
                                model={params[1].unitOfMeasure} />;
                        })
                        .Key(nameof(purchaseOrderContentContents[0].unitOfMeasure))
                        .DataIndex(nameof(purchaseOrderContentContents[0].unitOfMeasure)),
                ),
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.actions.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("actions") // key
                        .Width(120)
                        .DataIndex(nameof(purchaseOrderContentContents[0].key))
                        .Render(
                            RenderActionColumn(
                                CreateTableAction()
                                    .Title(translate("general.delete.content"))
                                    .Icon("tio-delete_outlined text-danger")
                                    .Action(handleLocalDelete)
                                    .HasConfirm(true),
                            ),
                        ),
                ),
        );
    },
        [
            purchaseOrderContentFilter,
            purchaseOrderContentContents,
            RenderStringFilter,
            RenderIdFilter,
            RenderNumberFilter,
            handleChangeFilter,
            translate,
            RenderActionColumn,
            handleLocalDelete,
            handleChangeOneCell,
        ]);

    return {
        purchaseOrderContentFilter,
        purchaseOrderContentList: list,
        loadPurchaseOrderContentList: loadingList,
        purchaseOrderContentTotal: total,
        handleAddPurchaseOrderContent: handleAddContent,
        handlePurchaseOrderContentTableChange: handleTableChange,
        handlePurchaseOrderContentPagination: handlePagination,
        purchaseOrderContentRowSelection: rowSelection,
        canBulkDeletePurchaseOrderContent: canBulkDelete,
        handleResetPurchaseOrderContentFilter: handleResetFilter,
        handleLocalBulkDeletePurchaseOrderContent: handleLocalBulkDelete,
        purchaseOrderContentRef: ref,
        handleClickPurchaseOrderContent: handleClick,
        handleImportPurchaseOrderContent: handleImportContentList,
        handleExportPurchaseOrderContent: handleContentExport,
        handleExportTemplatePurchaseOrderContent: handleContentExportTemplate,
        purchaseOrderContentContents,
        setPurchaseOrderContentContents,
        purchaseOrderContentContentColumns,
        handleSearchPurchaseOrderContent: handleSearch,
    };
};


