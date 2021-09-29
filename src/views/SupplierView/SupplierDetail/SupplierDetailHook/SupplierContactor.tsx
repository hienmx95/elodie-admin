/* begin general import */
import InputText from "components/Utility/Input/InputText/InputText";
import { masterTableIndex } from "helpers/table";
import { Supplier } from "models/Supplier";
import React from "react";
import { useTranslation } from "react-i18next";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "services/component-factory/table-column-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import listService from "services/list-service";
import {
  SupplierContactor,
  SupplierContactorFilter,
} from "models/SupplierContactor";
import { importExportDataService } from "services/import-export-data-service";
/* end individual import */

export function useSupplierContractorTable(
  model: Supplier,
  setModel: (data: Supplier) => void
) {
  const [translate] = useTranslation();

  const {
    content: supplierContactors,
    setContent: setSupplierContactors,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.supplierContactors)
  );
  const { RenderActionColumn } = componentFactoryService;

  const [
    supplierContactorFilter,
    dispatSupplierContactorFilter,
  ] = React.useReducer<
    React.Reducer<
      SupplierContactorFilter,
      AdvanceFilterAction<SupplierContactorFilter>
    >
  >(advanceFilterReducer, new SupplierContactorFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<SupplierContactorFilter>(
    supplierContactorFilter,
    dispatSupplierContactorFilter,
    SupplierContactorFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    supplierContactorFilter,
    supplierContactors,
    loadList,
    setLoadList
  );

  const {
    handleTableChange,
    handlePagination,
    canBulkDelete,
    handleLocalDelete,
    handleLocalBulkDelete,
    handleAddContent,
    handleChangeOneCell,
  } = tableService.useLocalTable<
    SupplierContactor,
    any,
    SupplierContactorFilter
  >(
    supplierContactorFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    supplierContactors,
    setSupplierContactors,
    SupplierContactor
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
  const supplierContractorColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.columns.index")}
          </div>
        ))
        .Key("index")
        .Width(70)
        .Align("center")
        .Render(
          masterTableIndex<SupplierContactor, SupplierContactorFilter>(
            supplierContactorFilter
          )
        ),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("suppliers.supplierContactors.name")}
          </div>
        ))
        .Key("name")
        .Key(nameof(supplierContactors[0].name)) //Key
        .DataIndex(nameof(supplierContactors[0].name))
        .Sorter(true)
        .Render((...params: [string, SupplierContactor, number]) => {
          return (
            <InputText
              value={params[0]}
              placeHolder={translate(
                "suppliers.supplierContactors.placeholder.name"
              )}
              onBlur={handleChangeOneCell(
                params[2],
                nameof(supplierContactors[0].name)
              )}
              isMaterial={true}
            />
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("suppliers.supplierContactors.phone")}
          </div>
        ))
        .Key("phone")
        .Key(nameof(supplierContactors[0].phone)) //Key
        .DataIndex(nameof(supplierContactors[0].phone))
        .Sorter(true)
        .Render((...params: [string, SupplierContactor, number]) => {
          return (
            <InputText
              value={params[0]}
              placeHolder={translate(
                "suppliers.supplierContactors.placeholder.phone"
              )}
              onBlur={handleChangeOneCell(
                params[2],
                nameof(supplierContactors[0].phone)
              )}
              isMaterial={true}
            />
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("suppliers.supplierContactors.email")}
          </div>
        ))
        .Key("email")
        .Key(nameof(supplierContactors[0].email)) //Key
        .DataIndex(nameof(supplierContactors[0].email))
        .Sorter(true)
        .Render((...params: [string, SupplierContactor, number]) => {
          return (
            <InputText
              value={params[0]}
              placeHolder={translate(
                "suppliers.supplierContactors.placeholder.email"
              )}
              onBlur={handleChangeOneCell(
                params[2],
                nameof(supplierContactors[0].email)
              )}
              isMaterial={true}
            />
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.actions.action")}
          </div>
        ))
        .Key("actions") // key
        .Width(100)
        .Align("center")
        .DataIndex(nameof(supplierContactors[0].key))
        .Render(
          RenderActionColumn(
            CreateTableAction()
              .Title(translate("general.delete.content"))
              .Icon("tio-delete_outlined text-danger")
              .Action(handleLocalDelete)
              .HasConfirm(true)
          )
        )
    );
  }, [
    supplierContactorFilter,
    supplierContactors,
    RenderActionColumn,
    translate,
    handleLocalDelete,
    handleChangeOneCell,
  ]);

  return {
    supplierContactorFilter,
    supplierContactorList: list,
    loadSupplierContactorList: loadingList,
    supplierContactorTotal: total,
    handleAddSupplierContactorContent: handleAddContent,
    handleSupplierContactorTableChange: handleTableChange,
    handleSupplierContactorPagination: handlePagination,
    canBulkDeleteSupplierContactorContent: canBulkDelete,
    handleLocalBulkDeleteSupplierContactorContent: handleLocalBulkDelete,
    supplierContactorRef: ref,
    handleClickSupplierContactorContent: handleClick,
    handleImportSupplierContactorContent: handleImportContentList,
    handleExportSupplierContactorContent: handleContentExport,
    handleExportTemplateSupplierContactorContent: handleContentExportTemplate,
    supplierContractorColumns,
  };
}
