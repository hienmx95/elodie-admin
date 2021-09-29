/* begin general import */
import React from "react";
import nameof from "ts-nameof.macro";
import { useTranslation } from "react-i18next";
import detailService from "services/pages/detail-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import {
    CreateColumn,
    CreateTableAction,
    CreateTableColumns
} from "services/component-factory/table-column-service";
import { masterTableIndex } from "helpers/table";
import tableService from "services/table-service";
import { getAntOrderType } from "services/table-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
    AdvanceFilterAction,
    advanceFilterReducer,
    advanceFilterService,
} from "services/advance-filter-service";
import { IdFilter, StringFilter, NumberFilter } from "@react3l/advanced-filters";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";

/* end general import */

/* begin individual import */
import { RequestForQuotation } from 'models/RequestForQuotation';
import { RequestForQuotationContent, RequestForQuotationContentFilter } from 'models/RequestForQuotationContent';
import { requestForQuotationRepository } from "repositories/request-for-quotation-repository";
import { Category, CategoryFilter } from 'models/Category';
import { Item, ItemFilter } from 'models/Item';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
/* end individual import */

export function useRequestForQuotationContentTable(
    model: RequestForQuotation,
    setModel: (data: RequestForQuotation) => void,
) {
    const [translate] = useTranslation();
    const {
        content: requestForQuotationContentContents,
        setContent: setRequestForQuotationContentContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.requestForQuotationContents),
    );
    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderNumberFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        requestForQuotationContentFilter,
        dispatchRequestForQuotationContentFilter,
    ] = React.useReducer<React.Reducer<RequestForQuotationContentFilter, AdvanceFilterAction<RequestForQuotationContentFilter>>>(advanceFilterReducer, new RequestForQuotationContentFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<RequestForQuotationContentFilter>
            (
                requestForQuotationContentFilter,
                dispatchRequestForQuotationContentFilter,
                RequestForQuotationContentFilter,
            );

    const { list, total, loadingList } = listService.useLocalList(
        requestForQuotationContentFilter,
        requestForQuotationContentContents,
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
                RequestForQuotationContent,
                any
                ,
                RequestForQuotationContentFilter
            >
            (
                requestForQuotationContentFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                requestForQuotationContentContents,
                setRequestForQuotationContentContents,
                RequestForQuotationContent,
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

    const requestForQuotationContentContentColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.columns.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("index")
                        .Width(120)
                        .Render(masterTableIndex<RequestForQuotationContent, RequestForQuotationContentFilter>
                            (requestForQuotationContentFilter),
                        ),
                ),


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.description")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].description)) //Key
                .DataIndex(nameof(requestForQuotationContentContents[0].description))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                        (
                            requestForQuotationContentFilter,
                            nameof(requestForQuotationContentContents[0].description),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderStringFilter(
                                requestForQuotationContentFilter["description"]["contain"],
                                handleChangeFilter(
                                    "description",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("requestForQuotations.filter.description"),
                            ),
                        )
                        .Render((...params: [string, RequestForQuotationContent, number]) => {
                            return <InputText
                                value={params[0]}
                                placeHolder={translate("requestForQuotations.placeholder.description")}
                                onBlur={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].description))} />;
                        })
                        .DataIndex(nameof(requestForQuotationContentContents[0].description)),
                )
            ,






            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.quantity")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].quantity)) //Key
                .DataIndex(nameof(requestForQuotationContentContents[0].quantity))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                        (
                            requestForQuotationContentFilter,
                            nameof(requestForQuotationContentContents[0].quantity),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderNumberFilter(
                                requestForQuotationContentFilter["quantity"]["equal"],
                                translate("requestForQuotations.filter.quantity"),
                                handleChangeFilter(
                                    "quantity",
                                    "equal" as any,
                                    NumberFilter,
                                ),
                                'single'
                            )
                        )
                        .Render((...params: [number, RequestForQuotationContent, number]) => {
                            return <InputNumber
                                placeHolder={translate("requestForQuotations.placeholder.quantity")}
                                value={params[0]}
                                onChange={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].quantity))} />;
                        })
                        .DataIndex(nameof(requestForQuotationContentContents[0].quantity)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.note")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].note)) //Key
                .DataIndex(nameof(requestForQuotationContentContents[0].note))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                        (
                            requestForQuotationContentFilter,
                            nameof(requestForQuotationContentContents[0].note),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderStringFilter(
                                requestForQuotationContentFilter["note"]["contain"],
                                handleChangeFilter(
                                    "note",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("requestForQuotations.filter.note"),
                            ),
                        )
                        .Render((...params: [string, RequestForQuotationContent, number]) => {
                            return <InputText
                                value={params[0]}
                                placeHolder={translate("requestForQuotations.placeholder.note")}
                                onBlur={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].note))} />;
                        })
                        .DataIndex(nameof(requestForQuotationContentContents[0].note)),
                )
            ,


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.noteForSupplier")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].noteForSupplier)) //Key
                .DataIndex(nameof(requestForQuotationContentContents[0].noteForSupplier))
                .Sorter(true)
                .SortOrder(
                    getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                        (
                            requestForQuotationContentFilter,
                            nameof(requestForQuotationContentContents[0].noteForSupplier),
                        ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderStringFilter(
                                requestForQuotationContentFilter["noteForSupplier"]["contain"],
                                handleChangeFilter(
                                    "noteForSupplier",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("requestForQuotations.filter.noteForSupplier"),
                            ),
                        )
                        .Render((...params: [string, RequestForQuotationContent, number]) => {
                            return <InputText
                                value={params[0]}
                                placeHolder={translate("requestForQuotations.placeholder.noteForSupplier")}
                                onBlur={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].noteForSupplier))} />;
                        })
                        .DataIndex(nameof(requestForQuotationContentContents[0].noteForSupplier)),
                )
            ,






            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.category")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].category))
                .DataIndex(nameof(requestForQuotationContentContents[0].category))
                .Sorter(true)
                .SortOrder(getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                    (
                        requestForQuotationContentFilter,
                        nameof(requestForQuotationContentContents[0].category),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                requestForQuotationContentFilter["categoryId"]["equal"],
                                handleChangeFilter("categoryId", "equal" as any, IdFilter),
                                CategoryFilter,
                                requestForQuotationRepository.singleListCategory,
                            ),
                        )
                        .Render((...params: [Category, RequestForQuotationContent, number]) => {
                            return <Select
                                classFilter={CategoryFilter}
                                placeHolder={translate("requestForQuotations.placeholder.category")}
                                getList={requestForQuotationRepository.singleListCategory}
                                onChange={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].category))}
                                model={params[1].category} />;
                        })
                        .Key(nameof(requestForQuotationContentContents[0].category))
                        .DataIndex(nameof(requestForQuotationContentContents[0].category)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.item")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].item))
                .DataIndex(nameof(requestForQuotationContentContents[0].item))
                .Sorter(true)
                .SortOrder(getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                    (
                        requestForQuotationContentFilter,
                        nameof(requestForQuotationContentContents[0].item),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                requestForQuotationContentFilter["itemId"]["equal"],
                                handleChangeFilter("itemId", "equal" as any, IdFilter),
                                ItemFilter,
                                requestForQuotationRepository.singleListItem,
                            ),
                        )
                        .Render((...params: [Item, RequestForQuotationContent, number]) => {
                            return <Select
                                classFilter={ItemFilter}
                                placeHolder={translate("requestForQuotations.placeholder.item")}
                                getList={requestForQuotationRepository.singleListItem}
                                onChange={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].item))}
                                model={params[1].item} />;
                        })
                        .Key(nameof(requestForQuotationContentContents[0].item))
                        .DataIndex(nameof(requestForQuotationContentContents[0].item)),
                ),


            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationContent.unitOfMeasure")}</div>)
                .Key(nameof(requestForQuotationContentContents[0].unitOfMeasure))
                .DataIndex(nameof(requestForQuotationContentContents[0].unitOfMeasure))
                .Sorter(true)
                .SortOrder(getAntOrderType<RequestForQuotationContent, RequestForQuotationContentFilter>
                    (
                        requestForQuotationContentFilter,
                        nameof(requestForQuotationContentContents[0].unitOfMeasure),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                requestForQuotationContentFilter["unitOfMeasureId"]["equal"],
                                handleChangeFilter("unitOfMeasureId", "equal" as any, IdFilter),
                                UnitOfMeasureFilter,
                                requestForQuotationRepository.singleListUnitOfMeasure,
                            ),
                        )
                        .Render((...params: [UnitOfMeasure, RequestForQuotationContent, number]) => {
                            return <Select
                                classFilter={UnitOfMeasureFilter}
                                placeHolder={translate("requestForQuotations.placeholder.unitOfMeasure")}
                                getList={requestForQuotationRepository.singleListUnitOfMeasure}
                                onChange={handleChangeOneCell(params[2], nameof(requestForQuotationContentContents[0].unitOfMeasure))}
                                model={params[1].unitOfMeasure} />;
                        })
                        .Key(nameof(requestForQuotationContentContents[0].unitOfMeasure))
                        .DataIndex(nameof(requestForQuotationContentContents[0].unitOfMeasure)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.actions.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("actions") // key
                        .Width(120)
                        .DataIndex(nameof(requestForQuotationContentContents[0].key))
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
            requestForQuotationContentFilter,
            requestForQuotationContentContents,
            RenderStringFilter,
            handleChangeFilter,
            translate,
            RenderNumberFilter,
            RenderIdFilter,
            RenderActionColumn,
            handleLocalDelete,
            handleChangeOneCell,
        ]);

    return {
        requestForQuotationContentFilter,
        requestForQuotationContentList: list,
        loadRequestForQuotationContentList: loadingList,
        requestForQuotationContentTotal: total,
        handleAddRequestForQuotationContent: handleAddContent,
        handleRequestForQuotationContentTableChange: handleTableChange,
        handleRequestForQuotationContentPagination: handlePagination,
        requestForQuotationContentRowSelection: rowSelection,
        canBulkDeleteRequestForQuotationContent: canBulkDelete,
        handleResetRequestForQuotationContentFilter: handleResetFilter,
        handleLocalBulkDeleteRequestForQuotationContent: handleLocalBulkDelete,
        requestForQuotationContentRef: ref,
        handleClickRequestForQuotationContent: handleClick,
        handleImportRequestForQuotationContent: handleImportContentList,
        handleExportRequestForQuotationContent: handleContentExport,
        handleExportTemplateRequestForQuotationContent: handleContentExportTemplate,
        requestForQuotationContentContents,
        setRequestForQuotationContentContents,
        requestForQuotationContentContentColumns,
        handleSearchRequestForQuotationContent: handleSearch,
    };
};


