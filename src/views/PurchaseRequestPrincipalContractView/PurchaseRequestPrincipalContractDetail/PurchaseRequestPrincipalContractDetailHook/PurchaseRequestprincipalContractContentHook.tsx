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
  CreateTableColumns,
} from "services/component-factory/table-column-service";
import tableService from "services/table-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import InputNumber, { DECIMAL } from "components/Utility/Input/InputNumber/InputNumber";
/* end general import */

/* begin individual import */
import { PurchaseRequest } from "models/PurchaseRequest";
import {
  PurchaseRequestContent,
  PurchaseRequestContentFilter,
} from "models/PurchaseRequestContent";
import Select from "components/Utility/Select/Select";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { CurrencyFilter } from "models/Currency/CurrencyFilter";
import { TaxTypeFilter } from "models/TaxType";
import { Item } from "models/Item";
import { formatNumber } from "helpers/number";
import { purchaseRequestPrincipalContractRepository } from "repositories/purchase-request-principal-contract-repository";
/* end individual import */

export function usePurchaseRequestPrincipalContractContentTable(
  model: PurchaseRequest,
  setModel: (data: PurchaseRequest) => void
) {
  const [translate] = useTranslation();
  const {
    content: purchaseRequestContentContents,
    setContent: setPurchaseRequestContentContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.purchaseRequestContents)
  );
  const { RenderActionColumn } = componentFactoryService;

  const [
    purchaseRequestContentFilter,
    dispatchPurchaseRequestContentFilter,
  ] = React.useReducer<
    React.Reducer<
      PurchaseRequestContentFilter,
      AdvanceFilterAction<PurchaseRequestContentFilter>
    >
  >(advanceFilterReducer, new PurchaseRequestContentFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<PurchaseRequestContentFilter>(
    purchaseRequestContentFilter,
    dispatchPurchaseRequestContentFilter,
    PurchaseRequestContentFilter
  );

  const totalNumber = React.useMemo(() => {
    let subTotalNumber = 0;
    let taxAmountNumber = 0;
    let totalNumber = 0;
    if (
      purchaseRequestContentContents &&
      purchaseRequestContentContents.length > 0
    ) {

      const purchaseRequestContents = [...purchaseRequestContentContents];
      subTotalNumber = purchaseRequestContents.reduce(
        (accumulator, currentValue: PurchaseRequestContent): number => {
          return (
            accumulator + (currentValue.subTotal ? currentValue.subTotal : 0)
          );
        },
        0
      );
      taxAmountNumber = purchaseRequestContents.reduce(
        (accumulator, currentValue: PurchaseRequestContent): number => {
          return (
            accumulator + (currentValue.taxAmount ? currentValue.taxAmount : 0)
          );
        },
        0
      );
      totalNumber = purchaseRequestContents.reduce(
        (accumulator, currentValue: PurchaseRequestContent): number => {
          return accumulator + (currentValue.total ? currentValue.total : 0);
        },
        0
      );
    }
    return {
      totalNumber,
      subTotalNumber,
      taxAmountNumber,
    };
  }, [purchaseRequestContentContents]);

  const { list, total, loadingList } = listService.useLocalList(
    purchaseRequestContentFilter,
    purchaseRequestContentContents,
    loadList,
    setLoadList,
    {
      skip: 0,
      take: 1000000
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
    handleAddContent,
    handleChangeOneRow,
    handleChangeOneCell,
  } = tableService.useLocalTable<
    PurchaseRequestContent,
    any,
    PurchaseRequestContentFilter
  >(
    purchaseRequestContentFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    purchaseRequestContentContents,
    setPurchaseRequestContentContents,
    PurchaseRequestContent
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
      purchaseRequestContent: PurchaseRequestContent,
      fieldName: string,
      index: number
    ) => (value: any) => {
      const purchaseRequestContentValue = { ...purchaseRequestContent };

      purchaseRequestContentValue[fieldName] = value;
      purchaseRequestContentValue["unitPrice"] = purchaseRequestContentValue[
        "exchangeRate"
      ]
        ? purchaseRequestContentValue["exchangedUnitPrice"]
          ? purchaseRequestContentValue["exchangeRate"] *
          purchaseRequestContentValue["exchangedUnitPrice"]
          : 0
        : 0;

      purchaseRequestContentValue["subTotal"] = purchaseRequestContentValue[
        "quantity"
      ]
        ? purchaseRequestContentValue["unitPrice"]
          ? purchaseRequestContentValue["unitPrice"] *
          purchaseRequestContentValue["quantity"]
          : 0
        : 0;
      purchaseRequestContentValue[
        "exchangedSubTotal"
      ] = purchaseRequestContentValue["quantity"]
          ? purchaseRequestContentValue["exchangedUnitPrice"]
            ? purchaseRequestContentValue["exchangedUnitPrice"] *
            purchaseRequestContentValue["quantity"]
            : 0
          : 0;

      purchaseRequestContentValue["taxAmount"] = purchaseRequestContentValue[
        "taxType"
      ]
        ? Math.round(
          ((purchaseRequestContentValue["taxType"]["percentage"] *
            purchaseRequestContentValue["subTotal"]) /
            100) *
          100
        ) / 100
        : 0;
      purchaseRequestContentValue[
        "exchangedTaxAmount"
      ] = purchaseRequestContentValue["taxType"]
          ? Math.round(
            ((purchaseRequestContentValue["taxType"]["percentage"] *
              purchaseRequestContentValue["exchangedSubTotal"]) /
              100) *
            100
          ) / 100
          : 0;

      purchaseRequestContentValue["total"] =
        purchaseRequestContentValue["subTotal"] +
        purchaseRequestContentValue["taxAmount"];
      purchaseRequestContentValue["exchangedTotal"] =
        purchaseRequestContentValue["exchangedSubTotal"] +
        purchaseRequestContentValue["exchangedTaxAmount"];

      handleChangeOneRow(index)(purchaseRequestContentValue);
    },
    [handleChangeOneRow]
  );

  const handleChangeObjectField = React.useCallback(
    (
      purchaseRequestContent: PurchaseRequestContent,
      fieldName: string,
      index: number
    ) => (value: any, objectValue: any) => {
      const purchaseRequestContentValue = { ...purchaseRequestContent };
      switch (fieldName) {
        case "exchangeCurrency":
          purchaseRequestContentValue["exchangeCurrency"] = { ...objectValue };
          purchaseRequestContentValue["exchangeCurrencyId"] = value;
          purchaseRequestContentValue["exchangeRate"] =
            purchaseRequestContentValue["exchangeCurrency"]["exchangeRate"];
          purchaseRequestContentValue[
            "unitPrice"
          ] = purchaseRequestContentValue["exchangedUnitPrice"]
              ? purchaseRequestContentValue["exchangedUnitPrice"] *
              purchaseRequestContentValue["exchangeRate"]
              : 0;
          purchaseRequestContentValue["subTotal"] = purchaseRequestContentValue[
            "quantity"
          ]
            ? purchaseRequestContentValue["quantity"] *
            purchaseRequestContentValue["unitPrice"]
            : 0;
          purchaseRequestContentValue[
            "taxAmount"
          ] = purchaseRequestContentValue["taxType"]
              ? Math.round(
                ((purchaseRequestContentValue["taxType"]["percentage"] *
                  purchaseRequestContentValue["subTotal"]) /
                  100) *
                100
              ) / 100
              : 0;
          purchaseRequestContentValue["total"] =
            purchaseRequestContentValue["subTotal"] +
            purchaseRequestContentValue["taxAmount"];
          break;
        case "taxType":
          purchaseRequestContentValue["taxType"] = { ...objectValue };
          purchaseRequestContentValue["taxTypeId"] = value;
          purchaseRequestContentValue[
            "exchangedTaxAmount"
          ] = purchaseRequestContentValue["taxType"]
              ? Math.round(
                ((purchaseRequestContentValue["taxType"]["percentage"] *
                  purchaseRequestContentValue["exchangedSubTotal"]) /
                  100) *
                100
              ) / 100
              : 0;
          purchaseRequestContentValue[
            "taxAmount"
          ] = purchaseRequestContentValue["taxType"]
              ? Math.round(
                ((purchaseRequestContentValue["taxType"]["percentage"] *
                  purchaseRequestContentValue["subTotal"]) /
                  100) *
                100
              ) / 100
              : 0;
          purchaseRequestContentValue["exchangedTotal"] =
            purchaseRequestContentValue["exchangedSubTotal"] +
            purchaseRequestContentValue["exchangedTaxAmount"];
          purchaseRequestContentValue["total"] =
            purchaseRequestContentValue["subTotal"] +
            purchaseRequestContentValue["taxAmount"];
          break;
        default:
          break;
      }
      handleChangeOneRow(index)(purchaseRequestContentValue);
    },
    [handleChangeOneRow]
  );

  const purchaseRequestContentContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "purchaseRequestPrincipalContracts.purchaseRequestContent.item"
            )}
          </div>
        ))
        .Width(180)
        .Key(nameof(purchaseRequestContentContents[0].item))
        .DataIndex(nameof(purchaseRequestContentContents[0].item))
        .Render((...params: [Item, PurchaseRequestContent, number]) => {
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
            {translate(
              "purchaseRequestPrincipalContracts.purchaseRequestContent.quantity"
            )}
          </div>
        ))
        .Width(150)
        .Key(nameof(purchaseRequestContentContents[0].quantity))
        .DataIndex(nameof(purchaseRequestContentContents[0].quantity))
        .Render((...params: [number, PurchaseRequestContent, number]) => {
          const unitOfMeasureFilter = new UnitOfMeasureFilter();
          unitOfMeasureFilter.itemId.equal = params[1].itemId;

          return (
            <div className="table-cell__container">
              <InputNumber
                isMaterial={true}
                placeHolder={"Nhập số lượng..."}
                value={params[0]}
                onChange={handleChangeSimpleField(
                  params[1],
                  nameof(purchaseRequestContentContents[0].quantity),
                  params[2]
                )}
              />
              <Select
                classFilter={UnitOfMeasureFilter}
                modelFilter={unitOfMeasureFilter}
                isMaterial={true}
                placeHolder={"Đơn vị..."}
                getList={
                  purchaseRequestPrincipalContractRepository.singleListUnitOfMeasure
                }
                onChange={handleChangeOneCell(
                  params[2],
                  nameof(purchaseRequestContentContents[0].unitOfMeasure)
                )}
                model={params[1].unitOfMeasure}
              />
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
            {translate(
              "purchaseRequestPrincipalContracts.purchaseRequestContent.unitPrice"
            )}
          </div>
        ))
        .Width(170)
        .Key(nameof(purchaseRequestContentContents[0].unitPrice))
        .DataIndex(nameof(purchaseRequestContentContents[0].unitPrice))
        .Render((...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container">
              <InputNumber
                isMaterial={true}
                placeHolder={"Nhập đơn giá..."}
                value={params[1].exchangedUnitPrice}
                onChange={handleChangeSimpleField(
                  params[1],
                  nameof(purchaseRequestContentContents[0].exchangedUnitPrice),
                  params[2]
                )}
                numberType={DECIMAL}
              />
              <div className="table-cell__row">
                <div className="row__left">
                  <Select
                    classFilter={CurrencyFilter}
                    placeHolder={"Tiền tệ..."}
                    isMaterial={true}
                    getList={
                      purchaseRequestPrincipalContractRepository.singleListCurrency
                    }
                    onChange={handleChangeObjectField(
                      params[1],
                      nameof(
                        purchaseRequestContentContents[0].exchangeCurrency
                      ),
                      params[2]
                    )}
                    model={params[1].exchangeCurrency}
                  />
                </div>
                <div className="row__right">
                  <InputNumber
                    isMaterial={true}
                    placeHolder={"Tỉ giá..."}
                    value={params[1].exchangeRate}
                    onChange={handleChangeSimpleField(
                      params[1],
                      nameof(purchaseRequestContentContents[0].exchangeRate),
                      params[2]
                    )}
                  />
                </div>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].unitPrice)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
                {/* <span className="cell-number">23,000,000 <span>VNĐ</span></span> */}
              </div>
            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "purchaseRequestPrincipalContracts.purchaseRequestContent.subTotal"
            )}
          </div>
        ))
        .Width(170)
        .Key(nameof(purchaseRequestContentContents[0].subTotal))
        .DataIndex(nameof(purchaseRequestContentContents[0].subTotal))
        .Render((...params: [number, PurchaseRequestContent, number]) => {
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
            {translate(
              "purchaseRequestPrincipalContracts.purchaseRequestContent.taxAmount"
            )}
          </div>
        ))
        .Width(170)
        .Key(nameof(purchaseRequestContentContents[0].taxAmount))
        .DataIndex(nameof(purchaseRequestContentContents[0].taxAmount))
        .Render((...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__header">
              <Select
                classFilter={TaxTypeFilter}
                isMaterial={true}
                placeHolder={"Thuế..."}
                getList={
                  purchaseRequestPrincipalContractRepository.singleListTaxType
                }
                onChange={handleChangeObjectField(
                  params[1],
                  nameof(purchaseRequestContentContents[0].taxType),
                  params[2]
                )}
                model={params[1].taxType}
              />
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
            {translate(
              "purchaseRequestPrincipalContracts.purchaseRequestContent.total"
            )}
          </div>
        ))
        .Width(180)
        .Key(nameof(purchaseRequestContentContents[0].total))
        .DataIndex(nameof(purchaseRequestContentContents[0].total))
        .Render((...params: [number, PurchaseRequestContent, number]) => {
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
          <div className="table-cell__header">
            {translate("general.actions.action")}
          </div>
        ))
        .Key("actions")
        .Width(100)
        .Align("center")
        .DataIndex(nameof(purchaseRequestContentContents[0].key))
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
    purchaseRequestContentContents,
    translate,
    RenderActionColumn,
    handleLocalDelete,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeOneCell,
    model,
  ]);

  return {
    purchaseRequestContentFilter,
    purchaseRequestContentList: list,
    loadPurchaseRequestContentList: loadingList,
    purchaseRequestContentTotal: total,
    handleChangeAllRowPurchaseRequestContent: handleChangeAllRow,
    handleAddPurchaseRequestContent: handleAddContent,
    handlePurchaseRequestContentTableChange: handleTableChange,
    handlePurchaseRequestContentPagination: handlePagination,
    purchaseRequestContentRowSelection: rowSelection,
    canBulkDeletePurchaseRequestContent: canBulkDelete,
    handleResetPurchaseRequestContentFilter: handleResetFilter,
    handleLocalBulkDeletePurchaseRequestContent: handleLocalBulkDelete,
    purchaseRequestContentRef: ref,
    handleClickPurchaseRequestContent: handleClick,
    handleImportPurchaseRequestContent: handleImportContentList,
    handleExportPurchaseRequestContent: handleContentExport,
    handleExportTemplatePurchaseRequestContent: handleContentExportTemplate,
    purchaseRequestContentContents,
    setPurchaseRequestContentContents,
    purchaseRequestContentContentColumns,
    handleSearchPurchaseRequestContent: handleSearch,
    totalItemValue: totalNumber,
  };
}
