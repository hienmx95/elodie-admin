/* begin general import */
import { StringFilter } from "@react3l/advanced-filters";
import InputText from "components/Utility/Input/InputText/InputText";
import { masterTableIndex } from "helpers/table";
/* end general import */
/* begin individual import */
import { PurchaseOrder } from 'models/PurchaseOrder';
import { PurchaseOrderCondition, PurchaseOrderConditionFilter } from 'models/PurchaseOrderCondition';
import React from "react";
import { useTranslation } from "react-i18next";
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

export function usePurchaseOrderConditionTable(
    model: PurchaseOrder,
    setModel: (data: PurchaseOrder) => void,
) {
    const [translate] = useTranslation();
    const {
        content: purchaseOrderConditionContents,
        setContent: setPurchaseOrderConditionContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.purchaseOrderConditions),
    );
    const {
        RenderStringFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        purchaseOrderConditionFilter,
        dispatchPurchaseOrderConditionFilter,
    ] = React.useReducer<React.Reducer<PurchaseOrderConditionFilter, AdvanceFilterAction<PurchaseOrderConditionFilter>>>(advanceFilterReducer, new PurchaseOrderConditionFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PurchaseOrderConditionFilter>
            (
                purchaseOrderConditionFilter,
                dispatchPurchaseOrderConditionFilter,
                PurchaseOrderConditionFilter,
            );

    const { list, total, loadingList } = listService.useLocalList(
        purchaseOrderConditionFilter,
        purchaseOrderConditionContents,
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
                PurchaseOrderCondition,
                any
                ,
                PurchaseOrderConditionFilter
            >
            (
                purchaseOrderConditionFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                purchaseOrderConditionContents,
                setPurchaseOrderConditionContents,
                PurchaseOrderCondition,
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

    const purchaseOrderConditionContentColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.columns.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("index")
                        .Width(120)
                        .Render(masterTableIndex<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                            (purchaseOrderConditionFilter),
                        ),
                ),



            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderCondition.code")}</div>)
                .Key(nameof(purchaseOrderConditionContents[0].code)) //Key
                .DataIndex(nameof(purchaseOrderConditionContents[0].code))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                        (
                            purchaseOrderConditionFilter,
                            nameof(purchaseOrderConditionContents[0].code),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderStringFilter(
                                purchaseOrderConditionFilter["code"]["contain"],
                                handleChangeFilter(
                                    "code",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("purchaseOrders.filter.code"),
                            ),
                        )
                        .Render((...params: [string, PurchaseOrderCondition, number]) => {
                            return <InputText
                                value={params[0]}
                                placeHolder={translate("purchaseOrders.placeholder.code")}
                                onBlur={handleChangeOneCell(params[2], nameof(purchaseOrderConditionContents[0].code))} />;
                        })
                        .DataIndex(nameof(purchaseOrderConditionContents[0].code)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderCondition.description")}</div>)
                .Key(nameof(purchaseOrderConditionContents[0].description)) //Key
                .DataIndex(nameof(purchaseOrderConditionContents[0].description))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                        (
                            purchaseOrderConditionFilter,
                            nameof(purchaseOrderConditionContents[0].description),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderStringFilter(
                                purchaseOrderConditionFilter["description"]["contain"],
                                handleChangeFilter(
                                    "description",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("purchaseOrders.filter.description"),
                            ),
                        )
                        .Render((...params: [string, PurchaseOrderCondition, number]) => {
                            return <InputText
                                value={params[0]}
                                placeHolder={translate("purchaseOrders.placeholder.description")}
                                onBlur={handleChangeOneCell(params[2], nameof(purchaseOrderConditionContents[0].description))} />;
                        })
                        .DataIndex(nameof(purchaseOrderConditionContents[0].description)),
                )
            ,






            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("purchaseOrders.purchaseOrderCondition.used")}</div>)
                .Key(nameof(purchaseOrderConditionContents[0].used)) //Key
                .DataIndex(nameof(purchaseOrderConditionContents[0].used))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<PurchaseOrderCondition, PurchaseOrderConditionFilter>
                        (
                            purchaseOrderConditionFilter,
                            nameof(purchaseOrderConditionContents[0].used),
                        ),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.actions.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("actions") // key
                        .Width(120)
                        .DataIndex(nameof(purchaseOrderConditionContents[0].key))
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
            purchaseOrderConditionFilter,
            purchaseOrderConditionContents,
            RenderStringFilter,
            handleChangeFilter,
            translate,
            RenderActionColumn,
            handleLocalDelete,
            handleChangeOneCell,
        ]);

    return {
        purchaseOrderConditionFilter,
        purchaseOrderConditionList: list,
        loadPurchaseOrderConditionList: loadingList,
        purchaseOrderConditionTotal: total,
        handleAddPurchaseOrderCondition: handleAddContent,
        handlePurchaseOrderConditionTableChange: handleTableChange,
        handlePurchaseOrderConditionPagination: handlePagination,
        purchaseOrderConditionRowSelection: rowSelection,
        canBulkDeletePurchaseOrderCondition: canBulkDelete,
        handleResetPurchaseOrderConditionFilter: handleResetFilter,
        handleLocalBulkDeletePurchaseOrderCondition: handleLocalBulkDelete,
        purchaseOrderConditionRef: ref,
        handleClickPurchaseOrderCondition: handleClick,
        handleImportPurchaseOrderCondition: handleImportContentList,
        handleExportPurchaseOrderCondition: handleContentExport,
        handleExportTemplatePurchaseOrderCondition: handleContentExportTemplate,
        purchaseOrderConditionContents,
        setPurchaseOrderConditionContents,
        purchaseOrderConditionContentColumns,
        handleSearchPurchaseOrderCondition: handleSearch,
    };
};


