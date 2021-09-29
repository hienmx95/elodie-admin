/* begin general import */
import { IdFilter, NumberFilter } from "@react3l/advanced-filters";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { masterTableIndex } from "helpers/table";
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
/* end general import */
/* begin individual import */
import { PurchaseRequestPlan } from 'models/PurchaseRequestPlan';
import { PurchaseRequestPlanContent, PurchaseRequestPlanContentFilter } from 'models/PurchaseRequestPlanContent';
import React from "react";
import { useTranslation } from "react-i18next";
import { purchaseRequestPlanRepository } from "repositories/purchase-request-plan-repository";
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

export function usePurchaseRequestPlanContentTable(
    model: PurchaseRequestPlan,
    setModel: (data: PurchaseRequestPlan) => void,
) {
    const [translate] = useTranslation();
    const {
        content: purchaseRequestPlanContentContents,
        setContent: setPurchaseRequestPlanContentContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.purchaseRequestPlanContents),
    );
    const {
        RenderIdFilter,
        RenderNumberFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        purchaseRequestPlanContentFilter,
        dispatchPurchaseRequestPlanContentFilter,
    ] = React.useReducer<React.Reducer<PurchaseRequestPlanContentFilter, AdvanceFilterAction<PurchaseRequestPlanContentFilter>>>(advanceFilterReducer, new PurchaseRequestPlanContentFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PurchaseRequestPlanContentFilter>
            (
                purchaseRequestPlanContentFilter,
                dispatchPurchaseRequestPlanContentFilter,
                PurchaseRequestPlanContentFilter,
            );

    const { list, total, loadingList } = listService.useLocalList(
        purchaseRequestPlanContentFilter,
        purchaseRequestPlanContentContents,
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
                PurchaseRequestPlanContent,
                any
                ,
                PurchaseRequestPlanContentFilter
            >
            (
                purchaseRequestPlanContentFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                purchaseRequestPlanContentContents,
                setPurchaseRequestPlanContentContents,
                PurchaseRequestPlanContent,
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

    const purchaseRequestPlanContentContentColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.columns.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("index")
                        .Width(120)
                        .Render(masterTableIndex<PurchaseRequestPlanContent, PurchaseRequestPlanContentFilter>
                            (purchaseRequestPlanContentFilter),
                        ),
                ),





            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseRequestPlans.purchaseRequestPlanContent.quota")}</div>)
                .Key(nameof(purchaseRequestPlanContentContents[0].quota)) //Key
                .DataIndex(nameof(purchaseRequestPlanContentContents[0].quota))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseRequestPlanContent, PurchaseRequestPlanContentFilter>
                        (
                            purchaseRequestPlanContentFilter,
                            nameof(purchaseRequestPlanContentContents[0].quota),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                purchaseRequestPlanContentFilter["quota"]["equal"],
                                translate("purchaseRequestPlans.filter.quota"),
                                handleChangeFilter(
                                    "quota",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, PurchaseRequestPlanContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("purchaseRequestPlans.placeholder.quota")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseRequestPlanContentContents[0].quota))} />;
                        })
                        .DataIndex(nameof(purchaseRequestPlanContentContents[0].quota)),
                )
            ,





            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseRequestPlans.purchaseRequestPlanContent.category")}</div>)
                .Key(nameof(purchaseRequestPlanContentContents[0].category))
                .DataIndex(nameof(purchaseRequestPlanContentContents[0].category))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseRequestPlanContent, PurchaseRequestPlanContentFilter>
                    (
                        purchaseRequestPlanContentFilter,
                        nameof(purchaseRequestPlanContentContents[0].category),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseRequestPlanContentFilter["categoryId"]["equal"],
                                handleChangeFilter("categoryId", "equal" as any, IdFilter),
                                CategoryFilter,
                                purchaseRequestPlanRepository.singleListCategory,
                            ),
                        )
                        .Render((...params: [Category, PurchaseRequestPlanContent, number]) => {
                            return <Select
                                classFilter={CategoryFilter}
                                placeHolder={translate("purchaseRequestPlans.placeholder.category")}
                                getList={purchaseRequestPlanRepository.singleListCategory}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseRequestPlanContentContents[0].category))}
                                model={params[1].category} />;
                        })
                        .Key(nameof(purchaseRequestPlanContentContents[0].category))
                        .DataIndex(nameof(purchaseRequestPlanContentContents[0].category)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseRequestPlans.purchaseRequestPlanContent.mainCurrency")}</div>)
                .Key(nameof(purchaseRequestPlanContentContents[0].mainCurrency))
                .DataIndex(nameof(purchaseRequestPlanContentContents[0].mainCurrency))
                .Sorter(true)
                .SortOrder(getAntOrderType<PurchaseRequestPlanContent, PurchaseRequestPlanContentFilter>
                    (
                        purchaseRequestPlanContentFilter,
                        nameof(purchaseRequestPlanContentContents[0].mainCurrency),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                purchaseRequestPlanContentFilter["mainCurrencyId"]["equal"],
                                handleChangeFilter("mainCurrencyId", "equal" as any, IdFilter),
                                CurrencyFilter,
                                purchaseRequestPlanRepository.singleListCurrency,
                            ),
                        )
                        .Render((...params: [Currency, PurchaseRequestPlanContent, number]) => {
                            return <Select
                                classFilter={CurrencyFilter}
                                placeHolder={translate("purchaseRequestPlans.placeholder.mainCurrency")}
                                getList={purchaseRequestPlanRepository.singleListCurrency}
                                onChange={handleChangeOneCell(params[2], nameof(purchaseRequestPlanContentContents[0].mainCurrency))}
                                model={params[1].mainCurrency} />;
                        })
                        .Key(nameof(purchaseRequestPlanContentContents[0].mainCurrency))
                        .DataIndex(nameof(purchaseRequestPlanContentContents[0].mainCurrency)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.actions.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("actions") // key
                        .Width(120)
                        .DataIndex(nameof(purchaseRequestPlanContentContents[0].key))
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
            purchaseRequestPlanContentFilter,
            purchaseRequestPlanContentContents,
            RenderIdFilter,
            RenderNumberFilter,
            handleChangeFilter,
            translate,
            RenderActionColumn,
            handleLocalDelete,
            handleChangeOneCell,
        ]);

    return {
        purchaseRequestPlanContentFilter,
        purchaseRequestPlanContentList: list,
        loadPurchaseRequestPlanContentList: loadingList,
        purchaseRequestPlanContentTotal: total,
        handleAddPurchaseRequestPlanContent: handleAddContent,
        handlePurchaseRequestPlanContentTableChange: handleTableChange,
        handlePurchaseRequestPlanContentPagination: handlePagination,
        purchaseRequestPlanContentRowSelection: rowSelection,
        canBulkDeletePurchaseRequestPlanContent: canBulkDelete,
        handleResetPurchaseRequestPlanContentFilter: handleResetFilter,
        handleLocalBulkDeletePurchaseRequestPlanContent: handleLocalBulkDelete,
        purchaseRequestPlanContentRef: ref,
        handleClickPurchaseRequestPlanContent: handleClick,
        handleImportPurchaseRequestPlanContent: handleImportContentList,
        handleExportPurchaseRequestPlanContent: handleContentExport,
        handleExportTemplatePurchaseRequestPlanContent: handleContentExportTemplate,
        purchaseRequestPlanContentContents,
        setPurchaseRequestPlanContentContents,
        purchaseRequestPlanContentContentColumns,
        handleSearchPurchaseRequestPlanContent: handleSearch,
    };
};


