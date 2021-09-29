/* begin general import */
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { PurchasePlan } from "models/PurchasePlan";
import {
  PurchasePlanContent,
  PurchasePlanContentFilter,
} from "models/PurchasePlanContent";
import { UnitOfMeasure } from "models/UnitOfMeasure";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "services/component-factory/table-column-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

export function usePurchasePlanContentTable(
  model: PurchasePlan,
  setModel: (data: PurchasePlan) => void
) {
  const [translate] = useTranslation();
  const {
    content: purchasePlanContentContents,
    setContent: setPurchasePlanContentContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.purchasePlanContents)
  );
  const { RenderActionColumn } = componentFactoryService;

  const [
    purchasePlanContentFilter,
    dispatchPurchasePlanContentFilter,
  ] = React.useReducer<
    React.Reducer<
      PurchasePlanContentFilter,
      AdvanceFilterAction<PurchasePlanContentFilter>
    >
  >(advanceFilterReducer, new PurchasePlanContentFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<PurchasePlanContentFilter>(
    purchasePlanContentFilter,
    dispatchPurchasePlanContentFilter,
    PurchasePlanContentFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    purchasePlanContentFilter,
    purchasePlanContentContents,
    loadList,
    setLoadList
  );

  const {
    handleTableChange,
    handlePagination,
    rowSelection,
    canBulkDelete,
    handleLocalDelete,
    handleLocalBulkDelete,
    handleChangeAllRow,
    handleChangeOneCell,
    handleChangeOneRow,
    handleAddContent,
  } = tableService.useLocalTable<
    PurchasePlanContent,
    any,
    PurchasePlanContentFilter
  >(
    purchasePlanContentFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    purchasePlanContentContents,
    setPurchasePlanContentContents,
    PurchasePlanContent
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

  const handleChangeQuantity = React.useCallback(
    (content: PurchasePlanContent, index) => (value: any) => {
      const purchasePlanContent = { ...content };
      if (value === null) {
        purchasePlanContent.quantity = undefined;
        handleChangeOneRow(index)(purchasePlanContent);
      } else {
        purchasePlanContent.quantity = value;
        handleChangeOneRow(index)(purchasePlanContent);
      }
    },
    [handleChangeOneRow]
  );

  const purchasePlanContentContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchasePlans.purchasePlanContent.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(purchasePlanContentContents[0].item))
        .DataIndex(nameof(purchasePlanContentContents[0].item))
        .Render((...params: [Item, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__item">
              <div className="item-code__image">
                {params[0]?.image?.url && (
                  <img src={params[0]?.image?.url} alt="" />
                )}
                {!params[0]?.image?.url && (
                  <img
                    src={require("../../../../assets/images/default-category.svg")}
                    alt=""
                  />
                )}
              </div>
              <div className="ml-3">
                <span className="item-code__text">{params[0]?.name}</span>
                {/* <span className="item-name__text">{params[0].code}</span> */}
                <span className="item-description__text">
                  {params[0]?.description}
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate("purchasePlans.purchasePlanContent.quantity")}
          </div>
        ))
        .Key(nameof(purchasePlanContentContents[0].quantity)) //Key
        .DataIndex(nameof(purchasePlanContentContents[0].quantity))

        .Render((...params: [number, PurchasePlanContent, number]) => {
          return (
            <>
              <InputNumber
                placeHolder={translate("purchasePlans.placeholder.quantity")}
                value={params[0]}
                onChange={handleChangeQuantity(params[1], params[2])}
                allowPositive={true}
                isMaterial={true}
              />
              {params[1].errors?.quantity && (
                <div className="text-danger mt-1">
                  {params[1].errors?.quantity}
                </div>
              )}
            </>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate("purchasePlans.purchasePlanContent.unitOfMeasure")}
          </div>
        ))
        .Key(nameof(purchasePlanContentContents[0].unitOfMeasure)) //Key
        .DataIndex(nameof(purchasePlanContentContents[0].unitOfMeasure))

        .Render((...params: [UnitOfMeasure, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {params[1]?.unitOfMeasure?.name}{" "}
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate("purchasePlans.purchasePlanContent.note")}
          </div>
        ))
        .Key(nameof(purchasePlanContentContents[0].note)) //Key
        .DataIndex(nameof(purchasePlanContentContents[0].note))
        .Render((...params: [string, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <InputText
                placeHolder={translate(
                  "purchasePlans.purchasePlanContent.placeholder.note"
                )}
                value={params[0]}
                onChange={handleChangeOneCell(
                  params[2],
                  nameof(purchasePlanContentContents[0].note)
                )}
                isMaterial={true}
              />
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
        .DataIndex(nameof(purchasePlanContentContents[0].key))
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
    purchasePlanContentContents,
    RenderActionColumn,
    translate,
    handleLocalDelete,
    handleChangeQuantity,
    handleChangeOneCell,
  ]);

  return {
    purchasePlanContentFilter,
    purchasePlanContentList: list,
    loadPurchasePlanContentList: loadingList,
    purchasePlanContentTotal: total,
    handleChangeAllRowContent: handleChangeAllRow,
    handleAddPurchasePlanContent: handleAddContent,
    handlePurchasePlanContentTableChange: handleTableChange,
    handlePurchasePlanContentPagination: handlePagination,
    purchasePlanContentRowSelection: rowSelection,
    canBulkDeletePurchasePlanContent: canBulkDelete,
    handleResetPurchasePlanContentFilter: handleResetFilter,
    handleLocalBulkDeletePurchasePlanContent: handleLocalBulkDelete,
    purchasePlanContentRef: ref,
    handleClickPurchasePlanContent: handleClick,
    handleImportPurchasePlanContent: handleImportContentList,
    handleExportPurchasePlanContent: handleContentExport,
    handleExportTemplatePurchasePlanContent: handleContentExportTemplate,
    purchasePlanContentContents,
    setPurchasePlanContentContents,
    purchasePlanContentContentColumns,
    handleSearchPurchasePlanContent: handleSearch,
  };
}
