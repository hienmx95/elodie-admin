/* begin general import */
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { Inventory, InventoryFilter } from "models/Inventory";
import { Item } from "models/Item";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { Warehouse } from "models/Warehouse";
import React from "react";
import { useTranslation } from "react-i18next";
import { warehouseRepository } from "repositories/warehouse-repository";
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
import { formService } from "services/form-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

export function useInventoryTable(
  model: Warehouse,
  setModel: (data: Warehouse) => void
) {
  const [translate] = useTranslation();
  const {
    content: inventoryContents,
    setContent: setInventoryContents,
  } = detailService.useContentList(model, setModel, nameof(model.inventories));
  const { RenderActionColumn } = componentFactoryService;

  const [inventoryFilter, dispatchInventoryFilter] = React.useReducer<
    React.Reducer<InventoryFilter, AdvanceFilterAction<InventoryFilter>>
  >(advanceFilterReducer, new InventoryFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<InventoryFilter>(
    inventoryFilter,
    dispatchInventoryFilter,
    InventoryFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    inventoryFilter,
    inventoryContents,
    loadList,
    setLoadList,
    {
      skip: 0,
      take: 1000000,
    }
  );

  const {
    handleTableChange,
    handlePagination,
    rowSelection,
    canBulkDelete,
    handleLocalDelete,
    handleLocalBulkDelete,
    handleChangeAllRow,
    // handleChangeOneCell,
    handleChangeOneRow,
    handleAddContent,
  } = tableService.useLocalTable<Inventory, any, InventoryFilter>(
    inventoryFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    inventoryContents,
    setInventoryContents,
    Inventory
  );

  const {
    ref,
    handleClick,
    handleImportContentList,
  } = importExportDataService.useImport(setModel, model, "inventories");

  const {
    handleContentExport,
    handleContentExportTemplate,
  } = importExportDataService.useExport();

  const handleChangeQuantity = React.useCallback(
    (content: Inventory, index) => (value: any) => {
      const inventory = { ...content };
      if (value === null) {
        inventory.alternateQuantity = undefined;
        handleChangeOneRow(index)(inventory);
      } else {
        inventory.alternateQuantity = value;
        handleChangeOneRow(index)(inventory);
      }
    },
    [handleChangeOneRow]
  );

  const handleChangeUOM = React.useCallback(
    (content: Inventory, index) => (
      unitOfMeasureId: any,
      alternateUnitOfMeasure: any
    ) => {
      const inventory = { ...content };
      if (unitOfMeasureId) {
        inventory.alternateUnitOfMeasure = alternateUnitOfMeasure;
        inventory.alternateUnitOfMeasureId = unitOfMeasureId;
        inventory.quantity =
          inventory?.alternateQuantity * alternateUnitOfMeasure?.factor;
        inventory.unitOfMeasure = alternateUnitOfMeasure?.mainUnitOfMeasure;
        inventory.unitOfMeasureId =
          alternateUnitOfMeasure?.mainUnitOfMeasure?.id;
      }

      handleChangeOneRow(index)(inventory);
    },
    [handleChangeOneRow]
  );

  const inventoryContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("warehouses.inventory.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(inventoryContents[0].item))
        .DataIndex(nameof(inventoryContents[0].item))
        .Render((...params: [Item, Inventory, number]) => {
          return (
            <div className="table-cell__item">
              <div className="ml-3">
                <div className="item-code__text">{params[0]?.name}</div>
                <div className="item-name__text">{params[0].code}</div>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="gradient-text">
            {translate("warehouses.inventory.alternateQuantity")}
          </div>
        ))
        .Key(nameof(inventoryContents[0].alternateQuantity)) //Key
        .DataIndex(nameof(inventoryContents[0].alternateQuantity))
        .Align("left")
        .Render((...params: [number, Inventory, number]) => {
          return (
            <>
              <InputNumber
                placeHolder={translate(
                  "warehouses.placeholder.alternateQuantity"
                )}
                value={params[0]}
                onChange={handleChangeQuantity(params[1], params[2])}
                allowPositive={true}
                isMaterial={true}
              />
              {params[1].errors?.alternateQuantity && (
                <div className="text-danger mt-1">
                  {params[1].errors?.alternateQuantity}
                </div>
              )}
            </>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="gradient-text">
            {translate("warehouses.inventory.alternateUnitOfMeasure")}
          </div>
        ))
        .Key(nameof(inventoryContents[0].alternateUnitOfMeasure)) //Key
        .DataIndex(nameof(inventoryContents[0].alternateUnitOfMeasure))
        .Align("left")
        .Render((...params: [UnitOfMeasure, Inventory, number]) => {
          const unitOfMeasureFilter = new UnitOfMeasureFilter();
          unitOfMeasureFilter.productId.equal = params[1].item?.productId;
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Inventory>(
                model.errors,
                nameof(model.alternateUnitOfMeasureId)
              )}
              message={model.errors?.alternateUnitOfMeasureId}
            >
              <Select
                classFilter={UnitOfMeasureFilter}
                modelFilter={unitOfMeasureFilter}
                isMaterial={true}
                placeHolder={translate(
                  "warehouses.placeholder.alternateUnitOfMeasure"
                )}
                getList={warehouseRepository.singleListUnitOfMeasure}
                onChange={handleChangeUOM(params[1], params[2])}
                model={params[1].alternateUnitOfMeasure}
              />
            </FormItem>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="gradient-text">
            {translate("warehouses.inventory.numberOfStocks")}
          </div>
        ))
        .Key(nameof(inventoryContents[0].note)) //Key
        .Align("center")
        .DataIndex(nameof(inventoryContents[0].note))
        .Render((...params: [string, Inventory, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <div>
                  <span className="cell-number">
                    {params[1]?.alternateQuantity}{" "}
                    {params[1]?.alternateUnitOfMeasure?.name}
                  </span>
                </div>
                {params[1]?.quantity && (
                  <div>
                    <span className="cell-number">
                      ~{params[1]?.quantity} {params[1]?.unitOfMeasure?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.actions.action")}
          </div>
        ))
        .Key("actions")
        .Width(100)
        .Align("center")
        .DataIndex(nameof(inventoryContents[0].key))
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
    inventoryContents,
    RenderActionColumn,
    translate,
    handleLocalDelete,
    handleChangeQuantity,
    model.errors,
    model.alternateUnitOfMeasureId,
    handleChangeUOM,
  ]);

  return {
    inventoryFilter,
    inventoryList: list,
    loadInventoryList: loadingList,
    inventoryTotal: total,
    handleChangeAllRowContent: handleChangeAllRow,
    handleAddInventory: handleAddContent,
    handleInventoryTableChange: handleTableChange,
    handleInventoryPagination: handlePagination,
    inventoryRowSelection: rowSelection,
    canBulkDeleteInventory: canBulkDelete,
    handleResetInventoryFilter: handleResetFilter,
    handleLocalBulkDeleteInventory: handleLocalBulkDelete,
    inventoryRef: ref,
    handleClickInventory: handleClick,
    handleImportInventory: handleImportContentList,
    handleExportInventory: handleContentExport,
    handleExportTemplateInventory: handleContentExportTemplate,
    inventoryContents,
    setInventoryContents,
    inventoryContentColumns,
    handleSearchInventory: handleSearch,
  };
}
