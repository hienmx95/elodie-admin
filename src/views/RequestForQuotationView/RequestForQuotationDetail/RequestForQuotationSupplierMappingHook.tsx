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
import { RequestForQuotationSupplierMapping, RequestForQuotationSupplierMappingFilter } from 'models/RequestForQuotationSupplierMapping';
import { requestForQuotationRepository } from "repositories/request-for-quotation-repository";
import { Supplier, SupplierFilter } from 'models/Supplier';
/* end individual import */

export function useRequestForQuotationSupplierMappingTable(
    model: RequestForQuotation,
    setModel: (data: RequestForQuotation) => void,
) {
    const [translate] = useTranslation();
    const {
        content: requestForQuotationSupplierMappingContents,
        setContent: setRequestForQuotationSupplierMappingContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.requestForQuotationSupplierMappings),
    );
    const {
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        requestForQuotationSupplierMappingFilter,
        dispatchRequestForQuotationSupplierMappingFilter,
    ] = React.useReducer<React.Reducer<RequestForQuotationSupplierMappingFilter, AdvanceFilterAction<RequestForQuotationSupplierMappingFilter>>>(advanceFilterReducer, new RequestForQuotationSupplierMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<RequestForQuotationSupplierMappingFilter>
            (
                requestForQuotationSupplierMappingFilter,
                dispatchRequestForQuotationSupplierMappingFilter,
                RequestForQuotationSupplierMappingFilter,
            );

    const { list, total, loadingList } = listService.useLocalList(
        requestForQuotationSupplierMappingFilter,
        requestForQuotationSupplierMappingContents?.length > 0 ? requestForQuotationSupplierMappingContents.map(requestForQuotationSupplierMappingContentMapper) : requestForQuotationSupplierMappingContents,
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
                RequestForQuotationSupplierMapping,
                Supplier
                ,
                RequestForQuotationSupplierMappingFilter
            >
            (
                requestForQuotationSupplierMappingFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                requestForQuotationSupplierMappingContents,
                setRequestForQuotationSupplierMappingContents,
                RequestForQuotationSupplierMapping,
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

    const requestForQuotationSupplierMappingContentColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.columns.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("index")
                        .Width(120)
                        .Render(masterTableIndex<RequestForQuotationSupplierMapping, RequestForQuotationSupplierMappingFilter>
                            (requestForQuotationSupplierMappingFilter),
                        ),
                ),




            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("requestForQuotations.requestForQuotationSupplierMapping.supplier")}</div>)
                .Key(nameof(requestForQuotationSupplierMappingContents[0].supplier))
                .DataIndex(nameof(requestForQuotationSupplierMappingContents[0].supplier))
                .Sorter(true)
                .SortOrder(getAntOrderType<RequestForQuotationSupplierMapping, RequestForQuotationSupplierMappingFilter>
                    (
                        requestForQuotationSupplierMappingFilter,
                        nameof(requestForQuotationSupplierMappingContents[0].supplier),
                    ),
                )
                .AddChild(
                    CreateColumn()
                        .Title(
                            RenderIdFilter(
                                requestForQuotationSupplierMappingFilter["supplierId"]["equal"],
                                handleChangeFilter("supplierId", "equal" as any, IdFilter),
                                SupplierFilter,
                                requestForQuotationRepository.singleListSupplier,
                            ),
                        )
                        .Render((...params: [Supplier, RequestForQuotationSupplierMapping, number]) => {
                            return <Select
                                classFilter={SupplierFilter}
                                placeHolder={translate("requestForQuotations.placeholder.supplier")}
                                getList={requestForQuotationRepository.singleListSupplier}
                                onChange={handleChangeOneCell(params[2], nameof(requestForQuotationSupplierMappingContents[0].supplier))}
                                model={params[1].supplier} />;
                        })
                        .Key(nameof(requestForQuotationSupplierMappingContents[0].supplier))
                        .DataIndex(nameof(requestForQuotationSupplierMappingContents[0].supplier)),
                ),
            CreateColumn()
                .Title(() => <div className='text-center gradient-text'>{translate("general.actions.index")}</div>)
                .AddChild(
                    CreateColumn()
                        .Key("actions") // key
                        .Width(120)
                        .DataIndex(nameof(requestForQuotationSupplierMappingContents[0].key))
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
            requestForQuotationSupplierMappingFilter,
            requestForQuotationSupplierMappingContents,
            RenderIdFilter,
            handleChangeFilter,
            RenderActionColumn,
            translate,
            handleLocalDelete,
            handleChangeOneCell,
        ]);

    return {
        requestForQuotationSupplierMappingFilter,
        requestForQuotationSupplierMappingList: list,
        loadRequestForQuotationSupplierMappingList: loadingList,
        requestForQuotationSupplierMappingTotal: total,
        handleAddRequestForQuotationSupplierMapping: handleAddContent,
        handleRequestForQuotationSupplierMappingTableChange: handleTableChange,
        handleRequestForQuotationSupplierMappingPagination: handlePagination,
        requestForQuotationSupplierMappingRowSelection: rowSelection,
        canBulkDeleteRequestForQuotationSupplierMapping: canBulkDelete,
        handleResetRequestForQuotationSupplierMappingFilter: handleResetFilter,
        handleLocalBulkDeleteRequestForQuotationSupplierMapping: handleLocalBulkDelete,
        requestForQuotationSupplierMappingRef: ref,
        handleClickRequestForQuotationSupplierMapping: handleClick,
        handleImportRequestForQuotationSupplierMapping: handleImportContentList,
        handleExportRequestForQuotationSupplierMapping: handleContentExport,
        handleExportTemplateRequestForQuotationSupplierMapping: handleContentExportTemplate,
        requestForQuotationSupplierMappingContents,
        setRequestForQuotationSupplierMappingContents,
        requestForQuotationSupplierMappingContentColumns,
        handleSearchRequestForQuotationSupplierMapping: handleSearch,
    };
};

export function useRequestForQuotationSupplierMappingModal(source: RequestForQuotationSupplierMapping[], handleSource?: () => void) {

    const [translate] = useTranslation();
    const [supplierFilter, dispatchSupplierFilter] = React.useReducer<
        React.Reducer<SupplierFilter, AdvanceFilterAction<SupplierFilter>>>(advanceFilterReducer, new SupplierFilter());

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
    } = advanceFilterService.useChangeAdvanceFilter<SupplierFilter>(
        supplierFilter,
        dispatchSupplierFilter,
        SupplierFilter,
        false,
    );

    const selectedSupplierList = React.useMemo(
        () => (source?.length > 0 ? source.map(mappingToMapper("supplier")) : []),
        [source],
    );

    const supplierModalFilters = React.useMemo(
        () => [


            RenderStringFilter(
                supplierFilter["code"]["contain"],
                handleChangeFilter("code", "contain" as any, StringFilter),
                translate("suppliers.filter.code"),
            ),


            RenderStringFilter(
                supplierFilter["name"]["contain"],
                handleChangeFilter("name", "contain" as any, StringFilter),
                translate("suppliers.filter.name"),
            ),


            RenderStringFilter(
                supplierFilter["taxCode"]["contain"],
                handleChangeFilter("taxCode", "contain" as any, StringFilter),
                translate("suppliers.filter.taxCode"),
            ),


            RenderStringFilter(
                supplierFilter["phone"]["contain"],
                handleChangeFilter("phone", "contain" as any, StringFilter),
                translate("suppliers.filter.phone"),
            ),


            RenderStringFilter(
                supplierFilter["email"]["contain"],
                handleChangeFilter("email", "contain" as any, StringFilter),
                translate("suppliers.filter.email"),
            ),


            RenderStringFilter(
                supplierFilter["address"]["contain"],
                handleChangeFilter("address", "contain" as any, StringFilter),
                translate("suppliers.filter.address"),
            ),





            RenderStringFilter(
                supplierFilter["ownerName"]["contain"],
                handleChangeFilter("ownerName", "contain" as any, StringFilter),
                translate("suppliers.filter.ownerName"),
            ),




            RenderStringFilter(
                supplierFilter["description"]["contain"],
                handleChangeFilter("description", "contain" as any, StringFilter),
                translate("suppliers.filter.description"),
            ),

        ],
        [
            RenderStringFilter,
            supplierFilter,
            handleChangeFilter,
            translate,
        ]);

    const supplierColumns = React.useMemo(
        () =>
            CreateTableColumns(
                CreateColumn()
                    .Title(translate("general.columns.index"))
                    .Key("index")
                    .Render(masterTableIndex<Supplier, SupplierFilter>(supplierFilter)),


                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.code"))
                    .Key("code")
                    .DataIndex("code"),


                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.name"))
                    .Key("name")
                    .DataIndex("name"),


                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.taxCode"))
                    .Key("taxCode")
                    .DataIndex("taxCode"),


                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.phone"))
                    .Key("phone")
                    .DataIndex("phone"),


                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.email"))
                    .Key("email")
                    .DataIndex("email"),


                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.address"))
                    .Key("address")
                    .DataIndex("address"),





                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.ownerName"))
                    .Key("ownerName")
                    .DataIndex("ownerName"),




                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.description"))
                    .Key("description")
                    .DataIndex("description"),






                CreateColumn()
                    .Title(translate("requestForQuotations.supplier.used"))
                    .Key("used")
                    .DataIndex("used"),

















            ),
        [supplierFilter, translate],
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
        supplierModalFilters,
        visibleSupplier: visible,
        handleOpenSupplierModal: handleOpenModal,
        handleCloseSupplierModal: handleCloseModal,
        handleSaveSupplierModal: handleSaveModal,
        selectedSupplierList,
        supplierFilter,
        dispatchSupplierFilter,
        supplierColumns,
        loadSupplierList: loadList,
        setLoadSupplierList: setLoadList,
        handleSearchSupplier: handleSearch,
        handleUpdateNewSupplierFilter: handleUpdateNewFilter,
        handleResetSupplierFilter: handleResetFilter,
    };

};

export const requestForQuotationSupplierMappingContentMapper = (model: RequestForQuotationSupplierMapping | Supplier): RequestForQuotationSupplierMapping => {
    if (model.hasOwnProperty("supplier")) {
        const { supplier } = model;
        return {
            ...model,
            supplierId: supplier?.id,
            supplierCode: supplier?.code,
            supplierName: supplier?.name,
            supplierTaxCode: supplier?.taxCode,
            supplierPhone: supplier?.phone,
            supplierEmail: supplier?.email,
            supplierAddress: supplier?.address,
            supplierProvinceId: supplier?.provinceId,
            supplierDistrictId: supplier?.districtId,
            supplierWardId: supplier?.wardId,
            supplierOwnerName: supplier?.ownerName,
            supplierPersonInChargeId: supplier?.personInChargeId,
            supplierStatusId: supplier?.statusId,
            supplierDescription: supplier?.description,
            supplierCreatedAt: supplier?.createdAt,
            supplierUpdatedAt: supplier?.updatedAt,
            supplierDeletedAt: supplier?.deletedAt,
            supplierNationId: supplier?.nationId,
            supplierUsed: supplier?.used,
            supplierRowId: supplier?.rowId,
            supplierDistrict: supplier?.district,
            supplierNation: supplier?.nation,
            supplierPersonInCharge: supplier?.personInCharge,
            supplierProvince: supplier?.province,
            supplierStatus: supplier?.status,
            supplierWard: supplier?.ward,
            supplierDeliveryOrderSupplierPoints: supplier?.deliveryOrderSupplierPoints,
            supplierPrincipalContracts: supplier?.principalContracts,
            supplierProducts: supplier?.products,
            supplierPurchaseOrders: supplier?.purchaseOrders,
            supplierPurchasePlanSupplierMappings: supplier?.purchasePlanSupplierMappings,
            supplierPurchasePlans: supplier?.purchasePlans,
            supplierQuotations: supplier?.quotations,
            supplierRequestForQuotationSupplierMappings: supplier?.requestForQuotationSupplierMappings,
            supplierSupplierUsers: supplier?.supplierUsers,
        };
    }

    return requestForQuotationSupplierMappingContentMapper({
        ...new RequestForQuotationSupplierMapping(),
        supplier: model as Supplier,
    });
};

