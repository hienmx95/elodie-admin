/* begin general import */
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { formatNumber } from "helpers/number";
import { Item } from "models/Item";
import { PurchasePlan } from "models/PurchasePlan";
import {
  PurchasePlanContent,
  PurchasePlanContentFilter,
} from "models/PurchasePlanContent";
/* end general import */
/* begin individual import */
import { Quotation } from "models/Quotation";
import {
  QuotationContent,
  QuotationContentFilter,
} from "models/QuotationContent";
import { SavingType, SavingTypeFilter } from "models/SavingType";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import React from "react";
import { useTranslation } from "react-i18next";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import {
  CreateColumn,
  CreateTableColumns,
} from "services/component-factory/table-column-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

export function useContentTable(
  model: Quotation,
  setModel: (data: Quotation) => void
) {
  const [translate] = useTranslation();
  const {
    content: quotationContentContents,
    setContent: setQuotationContentContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.quotationContents)
  );

  const [
    quotationContentFilter,
    dispatchQuotationContentFilter,
  ] = React.useReducer<
    React.Reducer<
      QuotationContentFilter,
      AdvanceFilterAction<QuotationContentFilter>
    >
  >(advanceFilterReducer, new QuotationContentFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<QuotationContentFilter>(
    quotationContentFilter,
    dispatchQuotationContentFilter,
    QuotationContentFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    quotationContentFilter,
    quotationContentContents,
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
    handleLocalBulkDelete,
    handleChangeAllRow,
    handleAddContent,
  } = tableService.useLocalTable<QuotationContent, any, QuotationContentFilter>(
    quotationContentFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    quotationContentContents,
    setQuotationContentContents,
    QuotationContent
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

  const quotationContentContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(quotationContentContents[0].item))
        .DataIndex(nameof(quotationContentContents[0].item))
        .Render((...params: [Item, QuotationContent, number]) => {
          return (
            <div className="table-cell__container table-cell__item">
              <span className="item-code__text">{params[0].name}</span>
              <span className="item-name__text">{params[0].code}</span>
              <span className="item-description__text">
                {params[0].description}
              </span>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.quantity")}
          </div>
        ))
        .Width(150)
        .Key(nameof(quotationContentContents[0].quantity))
        .DataIndex(nameof(quotationContentContents[0].quantity))
        .Render((...params: [number, QuotationContent, number]) => {
          const unitOfMeasureFilter = new UnitOfMeasureFilter();
          unitOfMeasureFilter.itemId.equal = params[1].itemId;

          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].quantity)}{" "}
                  {params[1].unitOfMeasure?.name}
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.unitPrice")}
          </div>
        ))
        .Width(180)
        .Key(nameof(quotationContentContents[0].unitPrice))
        .DataIndex(nameof(quotationContentContents[0].unitPrice))
        .Render((...params: [number, QuotationContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="table-cell__row">
                <div className="row__left">
                  <div className="result-cell">
                    <span>
                      {formatNumber(params[1].unitPrice)}
                      {params[1].mainCurrency?.code}~
                    </span>
                    {params[1].exchangeRate}
                  </div>
                </div>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].unitPrice)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.subTotal")}
          </div>
        ))
        .Width(170)
        .Key(nameof(quotationContentContents[0].subTotal))
        .DataIndex(nameof(quotationContentContents[0].subTotal))
        .Render((...params: [number, QuotationContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].exchangedSubTotal)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].subTotal)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.taxAmount")}
          </div>
        ))
        .Width(170)
        .Key(nameof(quotationContentContents[0].taxAmount))
        .DataIndex(nameof(quotationContentContents[0].taxAmount))
        .Render((...params: [number, QuotationContent, number]) => {
          return (
            <div className="table-cell__header">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].taxAmount)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.total")}
          </div>
        ))
        .Width(180)
        .Key(nameof(quotationContentContents[0].total))
        .DataIndex(nameof(quotationContentContents[0].total))
        .Render((...params: [number, QuotationContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].exchangedTotal)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].total)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        })
    );
  }, [quotationContentContents, translate, model]);

  return {
    quotationContentFilter,
    quotationContentList: list,
    loadQuotationContentList: loadingList,
    quotationContentTotal: total,
    handleChangeAllRowQuotationContent: handleChangeAllRow,
    handleAddQuotationContent: handleAddContent,
    handleQuotationContentTableChange: handleTableChange,
    handleQuotationContentPagination: handlePagination,
    quotationContentRowSelection: rowSelection,
    canBulkDeleteQuotationContent: canBulkDelete,
    handleResetQuotationContentFilter: handleResetFilter,
    handleLocalBulkDeleteQuotationContent: handleLocalBulkDelete,
    quotationContentRef: ref,
    handleClickQuotationContent: handleClick,
    handleImportQuotationContent: handleImportContentList,
    handleExportQuotationContent: handleContentExport,
    handleExportTemplateQuotationContent: handleContentExportTemplate,
    quotationContentContents,
    setQuotationContentContents,
    quotationContentContentColumns,
    handleSearchQuotationContent: handleSearch,
  };
}

export function usePurchasePlanQuotationContentTable(
  model: PurchasePlan,
  setModel: (data: PurchasePlan) => void,
  mode?: string
) {
  const [translate] = useTranslation();
  const {
    content: purchasePlanContentContents,
    setContent: setPurchasePlanContentContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.purchasePlanClosingContents)
  );

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
    handleLocalBulkDelete,
    handleChangeAllRow,
    handleAddContent,
    handleChangeOneRow,
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

  const handleChangeSimpleField = React.useCallback(
    (
      purchasePlanContent: PurchasePlanContent,
      fieldName: string,
      index: number
    ) => (value: any) => {
      const purchasePlanContentValue = { ...purchasePlanContent };
      purchasePlanContentValue[fieldName] = value;
      handleChangeOneRow(index)(purchasePlanContentValue);
    },
    [handleChangeOneRow]
  );

  const handleChangeObjectField = React.useCallback(
    (
      purchasePlanContent: PurchasePlanContent,
      fieldName: string,
      index: number
    ) => (value: any, objectValue: any) => {
      const purchasePlanContentValue = { ...purchasePlanContent };
      purchasePlanContentValue["savingType"] = { ...objectValue };
      purchasePlanContentValue["savingTypeId"] = value;
      switch (value) {
        case 2:
          const body = {
            itemId: purchasePlanContentValue?.itemId,
            supplierId: model?.selectedSupplierId,
            unitOfMeasureId: purchasePlanContentValue?.unitOfMeasureId,
          };
          purchasePlanRepository.getLowestPrice(body).subscribe((res) => {
            const savingCost =
              (res?.lowestPrice - purchasePlanContentValue?.unitPrice) *
              purchasePlanContentValue?.quantity;
            purchasePlanContentValue["lowestUnitPrice"] = res?.lowestPrice;
            purchasePlanContentValue["savingCost"] = savingCost;
            handleChangeOneRow(index)(purchasePlanContentValue);
          });
          break;
        default:
          handleChangeOneRow(index)(purchasePlanContentValue);
          break;
      }
    },
    [handleChangeOneRow, model]
  );

  const purchasePlanContentContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(purchasePlanContentContents[0].item))
        .DataIndex(nameof(purchasePlanContentContents[0].item))
        .Render((...params: [Item, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container table-cell__item">
              <span className="item-code__text">{params[0].name}</span>
              <span className="item-name__text">{params[0].code}</span>
              <span className="item-description__text">
                {params[0].description}
              </span>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.quantity")}
          </div>
        ))
        .Width(150)
        .Key(nameof(purchasePlanContentContents[0].quantity))
        .DataIndex(nameof(purchasePlanContentContents[0].quantity))
        .Render((...params: [number, PurchasePlanContent, number]) => {
          const unitOfMeasureFilter = new UnitOfMeasureFilter();
          unitOfMeasureFilter.itemId.equal = params[1].itemId;

          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].quantity)}{" "}
                  {params[1].unitOfMeasure?.name}
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.unitPrice")}
          </div>
        ))
        .Width(180)
        .Key(nameof(purchasePlanContentContents[0].unitPrice))
        .DataIndex(nameof(purchasePlanContentContents[0].unitPrice))
        .Render((...params: [number, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="table-cell__row">
                <div className="row__left">
                  <div className="result-cell">
                    <span>
                      {formatNumber(params[1].unitPrice)}
                      {params[1].mainCurrency?.code}~
                    </span>
                    {params[1].exchangeRate}
                  </div>
                </div>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].unitPrice)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.subTotal")}
          </div>
        ))
        .Width(170)
        .Key(nameof(purchasePlanContentContents[0].subTotal))
        .DataIndex(nameof(purchasePlanContentContents[0].subTotal))
        .Render((...params: [number, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].exchangedSubTotal)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].subTotal)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.taxAmount")}
          </div>
        ))
        .Width(170)
        .Key(nameof(purchasePlanContentContents[0].taxAmount))
        .DataIndex(nameof(purchasePlanContentContents[0].taxAmount))
        .Render((...params: [number, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__header">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].taxAmount)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.total")}
          </div>
        ))
        .Width(180)
        .Key(nameof(purchasePlanContentContents[0].total))
        .DataIndex(nameof(purchasePlanContentContents[0].total))
        .Render((...params: [number, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].exchangedTotal)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].total)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">{translate("Loại Saving")}</div>
        ))
        .Width(180)
        .Key(nameof(purchasePlanContentContents[0].savingType))
        .DataIndex(nameof(purchasePlanContentContents[0].savingType))
        .Render((...params: [SavingType, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              {mode === "edit" ? (
                <Select
                  classFilter={SavingTypeFilter}
                  placeHolder={"Chọn loại..."}
                  isMaterial={true}
                  getList={purchasePlanRepository.singleListSavingType}
                  onChange={handleChangeObjectField(
                    params[1],
                    nameof(purchasePlanContentContents[0].savingType),
                    params[2]
                  )}
                  model={params[1].savingType}
                />
              ) : (
                <div className="result-cell">{params[1]?.savingType?.name}</div>
              )}
            </div>
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">{translate("Saving Cost")}</div>
        ))
        .Width(150)
        .Key(nameof(purchasePlanContentContents[0].savingCost))
        .DataIndex(nameof(purchasePlanContentContents[0].savingCost))
        .Render((...params: [number, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              {mode === "edit" ? (
                <>
                  {params[1]?.savingTypeId === 1 && (
                    <>
                      <InputNumber
                        isMaterial={true}
                        placeHolder={"Nhập lịch sửa giá..."}
                        value={params[1]?.lowestUnitPrice}
                        onChange={handleChangeSimpleField(
                          params[1],
                          nameof(
                            purchasePlanContentContents[0].lowestUnitPrice
                          ),
                          params[2]
                        )}
                      />
                      <div className="text-danger">
                        {purchasePlanContentContents[0]?.errors?.savingCost}
                      </div>
                    </>
                  )}
                  {params[1]?.savingTypeId !== 2 && (
                    <InputNumber
                      isMaterial={true}
                      placeHolder={"Nhập saving cost..."}
                      value={params[0]}
                      onChange={handleChangeSimpleField(
                        params[1],
                        nameof(purchasePlanContentContents[0].savingCost),
                        params[2]
                      )}
                    />
                  )}
                  {params[1]?.savingTypeId === 2 && (
                    <>
                      <div className="result-cell">
                        <span className="cell-number">
                          {formatNumber(params[1]?.lowestUnitPrice)}{" "}
                          <span>{model.mainCurrency?.code}</span>
                        </span>
                      </div>
                      <div className="result-cell-active">
                        <span className="cell-number">
                          {formatNumber(params[0])}{" "}
                          <span>{model.mainCurrency?.code}</span>
                        </span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {params[1]?.savingTypeId === 3 && (
                    <div className="result-cell-active">
                      <span className="cell-number">
                        {formatNumber(params[0])}{" "}
                        <span>{model.mainCurrency?.code}</span>
                      </span>
                    </div>
                  )}
                  {params[1]?.savingTypeId !== 3 && (
                    <>
                      <div className="result-cell">
                        <span className="cell-number">
                          {formatNumber(params[1]?.lowestUnitPrice)}{" "}
                          <span>{model.mainCurrency?.code}</span>
                        </span>
                      </div>
                      <div className="result-cell-active">
                        <span className="cell-number">
                          {formatNumber(params[0])}{" "}
                          <span>{model.mainCurrency?.code}</span>
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })
    );
  }, [
    purchasePlanContentContents,
    translate,
    model.mainCurrency,
    mode,
    handleChangeObjectField,
    handleChangeSimpleField,
  ]);

  return {
    purchasePlanContentFilter,
    purchasePlanContentList: list,
    loadPurchasePlanContentList: loadingList,
    purchasePlanContentTotal: total,
    handleChangeAllRowPurchasePlanContent: handleChangeAllRow,
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
