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
import tableService, { mappingToMapper } from "services/table-service";
import { getAntOrderType } from "services/table-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
    AdvanceFilterAction,
    advanceFilterReducer,
    advanceFilterService,
} from "services/advance-filter-service";
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import Select from "components/Utility/Select/Select";
/* end general import */

/* begin individual import */
import { RequestForQuotation } from 'models/RequestForQuotation';
import { RequestForQuotationFileMapping, RequestForQuotationFileMappingFilter } from 'models/RequestForQuotationFileMapping';
import { requestForQuotationRepository } from "repositories/request-for-quotation-repository";
import { File, FileFilter } from 'models/File';
/* end individual import */

export function useRequestForQuotationFileMappingTable(
    model: RequestForQuotation,
    setModel: (data: RequestForQuotation) => void,
) {
    const [translate] = useTranslation();
    const {
        content: requestForQuotationFileMappingContents,
        setContent: setRequestForQuotationFileMappingContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.requestForQuotationFileMappings),
    );
    const {
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        requestForQuotationFileMappingFilter,
        dispatchRequestForQuotationFileMappingFilter,
    ] = React.useReducer<React.Reducer<RequestForQuotationFileMappingFilter, AdvanceFilterAction<RequestForQuotationFileMappingFilter>>>(advanceFilterReducer, new RequestForQuotationFileMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<RequestForQuotationFileMappingFilter>
            (
                requestForQuotationFileMappingFilter,
                dispatchRequestForQuotationFileMappingFilter,
                RequestForQuotationFileMappingFilter,
            );

    const { list, total, loadingList } = listService.useLocalList(
        requestForQuotationFileMappingFilter,
        requestForQuotationFileMappingContents?.length > 0 ? requestForQuotationFileMappingContents.map(requestForQuotationFileMappingContentMapper) : requestForQuotationFileMappingContents,
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
                RequestForQuotationFileMapping,
                File
                ,
                RequestForQuotationFileMappingFilter
            >
            (
                requestForQuotationFileMappingFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                requestForQuotationFileMappingContents,
                setRequestForQuotationFileMappingContents,
                RequestForQuotationFileMapping,
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

    const requestForQuotationFileMappingContentColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.columns.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("index")
                        .Width(120)
                        .Render(masterTableIndex<RequestForQuotationFileMapping, RequestForQuotationFileMappingFilter>
                            (requestForQuotationFileMappingFilter),
                        ),
                ),



            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationFileMapping.file")}</div>)
                .Key(nameof(requestForQuotationFileMappingContents[0].file))
                .DataIndex(nameof(requestForQuotationFileMappingContents[0].file))
                .Sorter(true)
                .SortOrder(getAntOrderType<RequestForQuotationFileMapping, RequestForQuotationFileMappingFilter>
                    (
                        requestForQuotationFileMappingFilter,
                        nameof(requestForQuotationFileMappingContents[0].file),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                requestForQuotationFileMappingFilter["fileId"]["equal"],
                                handleChangeFilter("fileId", "equal" as any, IdFilter),
                                FileFilter,
                                requestForQuotationRepository.singleListFile,
                            ),
                        )
                        .Render((...params: [File, RequestForQuotationFileMapping, number]) => {
                            return <Select
                                classFilter={FileFilter}
                                placeHolder={translate("requestForQuotations.placeholder.file")}
                                getList={requestForQuotationRepository.singleListFile}
                                onChange={handleChangeOneCell(params[2], nameof(requestForQuotationFileMappingContents[0].file))}
                                model={params[1].file} />;
                        })
                        .Key(nameof(requestForQuotationFileMappingContents[0].file))
                        .DataIndex(nameof(requestForQuotationFileMappingContents[0].file)),
                ),

            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.actions.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("actions") // key
                        .Width(120)
                        .DataIndex(nameof(requestForQuotationFileMappingContents[0].key))
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
            requestForQuotationFileMappingFilter,
            requestForQuotationFileMappingContents,
            RenderIdFilter,
            handleChangeFilter,
            RenderActionColumn,
            translate,
            handleLocalDelete,
            handleChangeOneCell,
        ]);

    return {
        requestForQuotationFileMappingFilter,
        requestForQuotationFileMappingList: list,
        loadRequestForQuotationFileMappingList: loadingList,
        requestForQuotationFileMappingTotal: total,
        handleAddRequestForQuotationFileMapping: handleAddContent,
        handleRequestForQuotationFileMappingTableChange: handleTableChange,
        handleRequestForQuotationFileMappingPagination: handlePagination,
        requestForQuotationFileMappingRowSelection: rowSelection,
        canBulkDeleteRequestForQuotationFileMapping: canBulkDelete,
        handleResetRequestForQuotationFileMappingFilter: handleResetFilter,
        handleLocalBulkDeleteRequestForQuotationFileMapping: handleLocalBulkDelete,
        requestForQuotationFileMappingRef: ref,
        handleClickRequestForQuotationFileMapping: handleClick,
        handleImportRequestForQuotationFileMapping: handleImportContentList,
        handleExportRequestForQuotationFileMapping: handleContentExport,
        handleExportTemplateRequestForQuotationFileMapping: handleContentExportTemplate,
        requestForQuotationFileMappingContents,
        setRequestForQuotationFileMappingContents,
        requestForQuotationFileMappingContentColumns,
        handleSearchRequestForQuotationFileMapping: handleSearch,
    };
};

export function useRequestForQuotationFileMappingModal(source: RequestForQuotationFileMapping[], handleSource?: () => void) {

    const [translate] = useTranslation();
    const [fileFilter, dispatchFileFilter] = React.useReducer<
        React.Reducer<FileFilter, AdvanceFilterAction<FileFilter>>>(advanceFilterReducer, new FileFilter());

    const {
        RenderStringFilter,
    } = componentFactoryService;

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<FileFilter>(
        fileFilter,
        dispatchFileFilter,
        FileFilter,
        false,
    );

    const selectedFileList = React.useMemo(
        () => (source?.length > 0 ? source.map(mappingToMapper("file")) : []),
        [source],
    );

    const fileModalFilters = React.useMemo(
        () => [


            RenderStringFilter(
                fileFilter["name"]["contain"],
                handleChangeFilter("name", "contain" as any, StringFilter),
                translate("files.filter.name"),
            ),


            RenderStringFilter(
                fileFilter["url"]["contain"],
                handleChangeFilter("url", "contain" as any, StringFilter),
                translate("files.filter.url"),
            ),

        ],
        [
            handleChangeFilter,
            fileFilter,
            RenderStringFilter,
            translate,
        ]);

    const fileColumns = React.useMemo(
        () =>
            CreateTableColumns(
                CreateColumn()
                    .Title(translate("general.columns.index"))
                    .Key("index")
                    .Render(masterTableIndex<File, FileFilter>(fileFilter)),


                CreateColumn()
                    .Title(translate("requestForQuotations.file.name"))
                    .Key("name")
                    .DataIndex("name"),


                CreateColumn()
                    .Title(translate("requestForQuotations.file.url"))
                    .Key("url")
                    .DataIndex("url"),










            ),
        [fileFilter, translate],
    );

    const {
        visible,
        loadControl,
        handleEndControl,
        handleOpenModal,
        handleCloseModal,
        handleSaveModal,
    } = tableService.useContenModal(handleSource);

    React.useEffect(() => {
        if (loadControl) {
            handleSearch();
            handleEndControl();
        }
    }, [handleSearch, loadControl, handleEndControl]);

    return {
        fileModalFilters,
        visibleFile: visible,
        handleOpenFileModal: handleOpenModal,
        handleCloseFileModal: handleCloseModal,
        handleSaveFileModal: handleSaveModal,
        selectedFileList,
        fileFilter,
        dispatchFileFilter,
        fileColumns,
        loadFileList: loadList,
        setLoadFileList: setLoadList,
        handleSearchFile: handleSearch,
        handleUpdateNewFileFilter: handleUpdateNewFilter,
        handleResetFileFilter: handleResetFilter,
    };

};

export const requestForQuotationFileMappingContentMapper = (model: RequestForQuotationFileMapping | File): RequestForQuotationFileMapping => {
    if (model.hasOwnProperty("file")) {
        const { file } = model;
        return {
            ...model,
            fileId: file?.id,
            fileName: file?.name,
            fileUrl: file?.url,
            fileAppUserId: file?.appUserId,
            fileCreatedAt: file?.createdAt,
            fileUpdatedAt: file?.updatedAt,
            fileDeletedAt: file?.deletedAt,
            fileRowId: file?.rowId,
            fileAppUser: file?.appUser,
            filePrincipalContractFileMappings: file?.principalContractFileMappings,
            filePurchaseRequestFileMappings: file?.purchaseRequestFileMappings,
            fileRequestForQuotationFileMappings: file?.requestForQuotationFileMappings,
        };
    }

    return requestForQuotationFileMappingContentMapper({
        ...new RequestForQuotationFileMapping(),
        file: model as File,
    });
};

