/* begin general import */
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber, { DECIMAL } from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { CurrencyFilter } from "models/Currency";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { PrincipalContract } from "models/PrincipalContract";
import {
  PrincipalContractContent,
  PrincipalContractContentFilter,
} from "models/PrincipalContractContent";
import { TaxType, TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import React from "react";
import { useTranslation } from "react-i18next";
import { principalContractRepository } from "repositories/principal-contract-repository";
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
import { formService } from "services/form-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

export function usePrincipalContractContentTable(
  model: PrincipalContract,
  setModel: (data: PrincipalContract) => void
) {
  const [translate] = useTranslation();
  const {
    content: principalContractContentContents,
    setContent: setPrincipalContractContentContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.principalContractContents)
  );
  const { RenderActionColumn } = componentFactoryService;

  const [
    principalContractContentFilter,
    dispatchPrincipalContractContentFilter,
  ] = React.useReducer<
    React.Reducer<
      PrincipalContractContentFilter,
      AdvanceFilterAction<PrincipalContractContentFilter>
    >
  >(advanceFilterReducer, new PrincipalContractContentFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<
    PrincipalContractContentFilter
  >(
    principalContractContentFilter,
    dispatchPrincipalContractContentFilter,
    PrincipalContractContentFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    principalContractContentFilter,
    principalContractContentContents,
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
    handleChangeOneCell,
    handleAddContent,
    handleChangeAllRow,
  } = tableService.useLocalTable<
    PrincipalContractContent,
    any,
    PrincipalContractContentFilter
  >(
    principalContractContentFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    principalContractContentContents,
    setPrincipalContractContentContents,
    PrincipalContractContent
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

  const principalContractContentContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("principalContracts.principalContractContent.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(principalContractContentContents[0].item))
        .DataIndex(nameof(principalContractContentContents[0].item))
        .Render((...params: [Item, PrincipalContractContent, number]) => {
          return (
            <div className="table-cell__container table-cell__item">
              <span className="item-code__text">{params[0]?.name}</span>
              <span className="item-name__text">{params[0]?.code}</span>
              <span className="item-description__text">
                {params[0]?.description}
              </span>
            </div>
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate(
              "principalContracts.principalContractContent.unitOfMeasure"
            )}
          </div>
        ))
        .Key(nameof(principalContractContentContents[0].unitOfMeasure))
        .DataIndex(nameof(principalContractContentContents[0].unitOfMeasure))

        .Render(
          (...params: [UnitOfMeasure, PrincipalContractContent, number]) => {
            const unitOfMeasureFilter = new UnitOfMeasureFilter();
            unitOfMeasureFilter.itemId.equal = params[1].itemId;
            return (
              <FormItem
                validateStatus={formService.getValidationStatus<
                  PrincipalContractContent
                >(params[1].errors, nameof(params[1].unitOfMeasure))}
                message={params[1].errors?.unitOfMeasureId}
              >
                <Select
                  classFilter={UnitOfMeasureFilter}
                  modelFilter={unitOfMeasureFilter}
                  placeHolder={translate(
                    "principalContracts.principalContractContent.placeholder.unitOfMeasure"
                  )}
                  getList={principalContractRepository.singleListUnitOfMeasure}
                  onChange={handleChangeOneCell(
                    params[2],
                    nameof(principalContractContentContents[0].unitOfMeasure)
                  )}
                  model={params[1].unitOfMeasure}
                  isMaterial={true}
                />
              </FormItem>
            );
          }
        ),
      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate("principalContracts.principalContractContent.price")}
          </div>
        ))
        .Key(nameof(principalContractContentContents[0].unitPrice)) //Key
        .DataIndex(nameof(principalContractContentContents[0].unitPrice))
        .Width(200)
        .Render((...params: [number, PrincipalContractContent, number]) => {
          return (
            <div className="d-flex justify-content-between">

              <FormItem
                validateStatus={formService.getValidationStatus<
                  PrincipalContractContent
                >(params[1].errors, nameof(params[1].unitPrice))}
                message={params[1].errors?.unitPrice}
              >
                <InputNumber
                  placeHolder={translate(
                    "principalContracts.principalContractContent.placeholder.price"
                  )}
                  value={params[0]}
                  onChange={handleChangeOneCell(
                    params[2],
                    nameof(principalContractContentContents[0].unitPrice)
                  )}
                  isMaterial={true}
                  numberType={DECIMAL}

                />
              </FormItem>
              <div className='ml-2'>
                <FormItem
                  validateStatus={formService.getValidationStatus<
                    PrincipalContractContent
                  >(params[1].errors, nameof(params[1].currency))}
                  message={params[1].errors?.currencyId}
                >
                  <Select
                    classFilter={CurrencyFilter}
                    placeHolder={translate(
                      "principalContracts.principalContractContent.placeholder.currency"
                    )}
                    getList={principalContractRepository.singleListCurrency}
                    onChange={handleChangeOneCell(
                      params[2],
                      nameof(principalContractContentContents[0].currency)
                    )}
                    model={params[1].currency}
                    isMaterial={true}
                  />
                </FormItem>
              </div>

            </div>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate("principalContracts.principalContractContent.taxType")}
          </div>
        ))
        .Key(nameof(principalContractContentContents[0].taxType))
        .DataIndex(nameof(principalContractContentContents[0].taxType))
        .Render((...params: [TaxType, PrincipalContractContent, number]) => {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<
                PrincipalContractContent
              >(params[1].errors, nameof(params[1].taxType))}
              message={params[1].errors?.taxTypeId}
            >
              <Select
                classFilter={TaxTypeFilter}
                placeHolder={translate(
                  "principalContracts.principalContractContent.placeholder.taxType"
                )}
                getList={principalContractRepository.singleListTaxType}
                onChange={handleChangeOneCell(
                  params[2],
                  nameof(principalContractContentContents[0].taxType)
                )}
                model={params[1].taxType}
                isMaterial={true}
              />
            </FormItem>
          );
        }),

      CreateColumn()
        .Title(() => (
          <div className="text-center gradient-text">
            {translate("general.actions.label")}
          </div>
        ))

        .Key("actions") // key
        .Width(120)
        .DataIndex(nameof(principalContractContentContents[0].key))
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
    principalContractContentContents,
    translate,
    RenderActionColumn,
    handleLocalDelete,
    handleChangeOneCell,
  ]);

  return {
    principalContractContentFilter,
    principalContractContentList: list,
    loadPrincipalContractContentList: loadingList,
    principalContractContentTotal: total,
    handleAddPrincipalContractContent: handleAddContent,
    handlePrincipalContractContentTableChange: handleTableChange,
    handlePrincipalContractContentPagination: handlePagination,
    principalContractContentRowSelection: rowSelection,
    canBulkDeletePrincipalContractContent: canBulkDelete,
    handleResetPrincipalContractContentFilter: handleResetFilter,
    handleLocalBulkDeletePrincipalContractContent: handleLocalBulkDelete,
    principalContractContentRef: ref,
    handleClickPrincipalContractContent: handleClick,
    handleImportPrincipalContractContent: handleImportContentList,
    handleExportPrincipalContractContent: handleContentExport,
    handleExportTemplatePrincipalContractContent: handleContentExportTemplate,
    principalContractContentContents,
    setPrincipalContractContentContents,
    principalContractContentContentColumns,
    handleSearchPrincipalContractContent: handleSearch,
    handleChangeAllRowPrincipalContractContent: handleChangeAllRow,
  };
}
