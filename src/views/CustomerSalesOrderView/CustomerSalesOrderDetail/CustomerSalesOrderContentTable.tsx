/* begin general import */
import { Modal, Popconfirm } from "antd";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { formatNumber } from "helpers/number";
/* end general import */
/* begin individual import */
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import { CustomerSalesOrderContent } from "models/CustomerSalesOrderContent";
import { CustomerSalesOrderContentFilter } from "models/CustomerSalesOrderContent/CustomerSalesOrderContentFilter";
import { Item } from "models/Item";
import { Status } from 'models/Status';
import { TaxType, TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService
} from "services/advance-filter-service";
import {
  CreateColumn, CreateTableColumns
} from "services/component-factory/table-column-service";
import { formService } from "services/form-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService, { ContentTableActionEnum } from "services/table-service";
import nameof from "ts-nameof.macro";
import { CustomerSalesOrderItemModal, useCustomerSalesOrderItem } from "./CustomerSalesOrderItem";
/* end individual import */

export function useCustomerSalesOrderContentTable(
  model: CustomerSalesOrder,
  setModel: (data: CustomerSalesOrder) => void,
  setCalculateTotal?: Dispatch<SetStateAction<boolean>>,
  changeEditPrice?: boolean,
  setChangeEditPrice?: Dispatch<SetStateAction<boolean>>,
  // currentEmployee?: any,
) {
  const [translate] = useTranslation();
  const {
    content: customerSalesOrderContents,
    setContent: setCustomerSalesOrderContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.customerSalesOrderContents)
  );

  const [
    customerSalesOrderContentFilter,
    dispatchCustomerSalesOrderContentFilter,
  ] = React.useReducer<
    React.Reducer<
      CustomerSalesOrderContentFilter,
      AdvanceFilterAction<CustomerSalesOrderContentFilter>
    >
  >(advanceFilterReducer, new CustomerSalesOrderContentFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    // handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<CustomerSalesOrderContentFilter>(
    customerSalesOrderContentFilter,
    dispatchCustomerSalesOrderContentFilter,
    CustomerSalesOrderContentFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    customerSalesOrderContentFilter,
    customerSalesOrderContents,
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
    selectedContent,
    filterContentNotInList,
    getIdsFromContent,
    dispatch,
    resetTableFilter,
    handleAddContent,
    handleChangeAllRow,
  } = tableService.useLocalTable<CustomerSalesOrderContent, any, CustomerSalesOrderContentFilter>(
    customerSalesOrderContentFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    customerSalesOrderContents,
    setCustomerSalesOrderContents,
    CustomerSalesOrderContent
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
  // const pagination: PaginationProps = tableService.usePagination<CustomerSalesOrderContentFilter>(
  //   customerSalesOrderContentFilter,
  //   total
  // );
  const handleBulkDelete = React.useCallback(
    () => {
      Modal.confirm({
        title: translate("general.delete.content"),
        content: translate("general.delete.title"),
        okType: "danger",
        onOk() {
          setCustomerSalesOrderContents(
            customerSalesOrderContents.filter(
              filterContentNotInList(
                getIdsFromContent(selectedContent, `key`),
                `key`
              )
            )
          ); // update source
          dispatch({
            type: ContentTableActionEnum.BULK_DELETE,
          });
          resetTableFilter();
          if (setCalculateTotal) {
            setCalculateTotal(true);
          }
        },
      });
    },
    [customerSalesOrderContents, dispatch, filterContentNotInList, getIdsFromContent, resetTableFilter, selectedContent, setCalculateTotal, setCustomerSalesOrderContents, translate],
  );
  const handleDelete = React.useCallback(
    (index: number) => {
      return () => {
        customerSalesOrderContents.splice(index, 1);
        setCustomerSalesOrderContents([...customerSalesOrderContents]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [customerSalesOrderContents, setCalculateTotal, setCustomerSalesOrderContents],
  );

  const calculateTotal = React.useMemo(() => {
    return (quantity: number, salePrice: number, disCount: number) => {
      return Number.parseFloat(
        (quantity * salePrice * ((100 - disCount) / 100)).toFixed(2),
      );
    };
  }, []);

  const handleChangeUOMInContent = React.useCallback(
    (...[, index]) => {
      return (id: number | string | null, t: UnitOfMeasure) => {
        if (customerSalesOrderContents[index].editedPriceStatusId === 1) {
          const requestedQuantitys = Number(
            customerSalesOrderContents[index].quantity * t?.factor,
          );
          const newSalePrice =
            customerSalesOrderContents[index]?.primaryPrice * requestedQuantitys;
          const total = calculateTotal(
            customerSalesOrderContents[index].quantity,
            newSalePrice,
            customerSalesOrderContents[index].discountPercentage,
          );
          customerSalesOrderContents[index] = {
            ...customerSalesOrderContents[index],
            unitOfMeasure: t,
            unitOfMeasureId: +id,
            salePrice: newSalePrice,
            amount: total,
            factor: t?.factor,
            requestedQuantity: requestedQuantitys,
          };
        } else {
          const newSalePrice =
            customerSalesOrderContents[index]?.item?.salePrice * t?.factor;
          const total = calculateTotal(
            customerSalesOrderContents[index].quantity,
            newSalePrice,
            customerSalesOrderContents[index].discountPercentage
          );
          const requestedQuantitys = Number(
            customerSalesOrderContents[index].quantity * t?.factor,
          );

          customerSalesOrderContents[index] = {
            ...customerSalesOrderContents[index],
            unitOfMeasure: t,
            unitOfMeasureId: +id,
            salePrice: newSalePrice,
            amount: total,
            factor: t?.factor,
            requestedQuantity: requestedQuantitys,
          };
        }
        setCustomerSalesOrderContents([...customerSalesOrderContents]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [
      setCalculateTotal,
      customerSalesOrderContents,
      calculateTotal,
      setCustomerSalesOrderContents,
    ],
  );
  const handleChangeQuantity = React.useCallback(
    index => {
      return event => {
        if (
          customerSalesOrderContents[index] &&
          customerSalesOrderContents[index].unitOfMeasure
        ) {
          let requestedQuantity = 0;
          let total = calculateTotal(
            Number(event),
            customerSalesOrderContents[index].salePrice,
            customerSalesOrderContents[index].discountPercentage,
          );
          if (event === undefined || event === null) {
            requestedQuantity = 0;
            total = 0;
          } else if (customerSalesOrderContents[index].factor) {
            requestedQuantity = Number(
              Number(event) * customerSalesOrderContents[index].factor,
            );
          }

          customerSalesOrderContents[index] = {
            ...customerSalesOrderContents[index],
            quantity: Number(event),
            requestedQuantity,
            amount: total,
          };
        }
        setCustomerSalesOrderContents([...customerSalesOrderContents]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [
      calculateTotal,
      customerSalesOrderContents,
      setCalculateTotal,
      setCustomerSalesOrderContents,
    ],
  );
  const handleChangePrimaryPrice = React.useCallback(
    (index, event) => {
      const primaryPrice = Number(event);
      customerSalesOrderContents[index].salePrice =
        primaryPrice * customerSalesOrderContents[index].factor;
      if (event !== customerSalesOrderContents[index].primaryPrice) {
        customerSalesOrderContents[index].editedPriceStatusId = 1;
      }
      const total = calculateTotal(
        customerSalesOrderContents[index].quantity,
        customerSalesOrderContents[index].salePrice,
        customerSalesOrderContents[index].discountPercentage,
      );
      customerSalesOrderContents[index] = {
        ...customerSalesOrderContents[index],
        primaryPrice: Number(event),
        salePrice: customerSalesOrderContents[index].salePrice,
        amount: Number(total),
      };
      setCustomerSalesOrderContents([...customerSalesOrderContents]);
      if (setCalculateTotal) {
        setCalculateTotal(true);
      }
    },
    [
      customerSalesOrderContents,
      setCustomerSalesOrderContents,
      calculateTotal,
      setCalculateTotal,
    ],
  );
  const handleChangeDiscountPercentage = React.useCallback(
    index => {
      return event => {
        const total = calculateTotal(
          customerSalesOrderContents[index].quantity,
          customerSalesOrderContents[index].salePrice,
          Number(event),
        );
        customerSalesOrderContents[index] = {
          ...customerSalesOrderContents[index],
          discountPercentage: Number(event),
          amount: Number(total),
        };
        setCustomerSalesOrderContents([...customerSalesOrderContents]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [
      calculateTotal,
      customerSalesOrderContents,
      setCalculateTotal,
      setCustomerSalesOrderContents,
    ],
  );
  const handleChangeTaxType = React.useCallback(
    (...[, index]) => {
      return (id: number | string | null, t: TaxType) => {
        customerSalesOrderContents[index] = {
          ...customerSalesOrderContents[index],
          taxType: t,
          taxTypeId: Number(id),
          taxPercentage: t?.percentage,
        };
        setCustomerSalesOrderContents([...customerSalesOrderContents]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [customerSalesOrderContents, setCustomerSalesOrderContents, setCalculateTotal],
  );

  React.useEffect(() => {
    let newSalePrice = 0;
    if (changeEditPrice === true && customerSalesOrderContents.length > 0) {
      customerSalesOrderContents.forEach(
        (content: CustomerSalesOrderContent, index: number) => {
          newSalePrice = content.item.salePrice * content.factor;
          const amount = calculateTotal(
            customerSalesOrderContents[index].quantity,
            newSalePrice,
            customerSalesOrderContents[index].discountPercentage,
          );
          customerSalesOrderContents[index] = {
            ...customerSalesOrderContents[index],
            salePrice: newSalePrice,
            amount,
          };
        },
      );
      setCustomerSalesOrderContents([...customerSalesOrderContents]);
      setChangeEditPrice(false);
      if (setCalculateTotal) {
        setCalculateTotal(true);
      }
    }
  }, [
    changeEditPrice,
    customerSalesOrderContents,
    setCalculateTotal,
    setChangeEditPrice,
    setCustomerSalesOrderContents,
    calculateTotal,
  ]);

  const customerSalesOrderContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(customerSalesOrderContents[0].item))
        .DataIndex(nameof(customerSalesOrderContents[0].item))
        .Render((...params: [Item]) => {
          return (
            <div className="table-cell__container table-cell__item">
              <span className="item-code__text">{params[0].name}</span>
              <span className="item-name__text">{params[0].code}</span>
            </div>
          );
        }),
        
        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.unitOfMeasure")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].unitOfMeasure))
        .DataIndex(nameof(customerSalesOrderContents[0].unitOfMeasure))
        .Render((unitOfMeasure: UnitOfMeasure,
          content: CustomerSalesOrderContent,
          index: number) => {
          const defaultFilter = new UnitOfMeasureFilter();
          defaultFilter.productId.equal = content.item?.productId;
          return (
            <>
              <FormItem
                validateStatus={formService.getValidationStatus<
                  CustomerSalesOrderContent
                >(content.errors, nameof(content.unitOfMeasure))}
                message={content.errors?.unitOfMeasure}
              >
                <Select
                  classFilter={UnitOfMeasureFilter}
                  modelFilter={defaultFilter}
                  placeHolder={translate(
                    "customerSalesOrderContents.placeholder.unitOfMeasure"
                  )}
                  getList={customerSalesOrderRepository.singleListUnitOfMeasure}
                  onChange={handleChangeUOMInContent(unitOfMeasure, index, content)}
                  model={content.unitOfMeasure}
                  isMaterial={true}
                />
              </FormItem>
            </>
          );
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.quantity")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].quantity))
        .DataIndex(nameof(customerSalesOrderContents[0].quantity))
        .Render((quantity: any, content: CustomerSalesOrderContent, index) => {
          return (
            <>
              <FormItem
                  validateStatus={formService.getValidationStatus<
                    CustomerSalesOrderContent
                  >(content.errors, nameof(content.quantity))}
                  message={content.errors?.quantity}
                >
                  <InputNumber
                    isMaterial={true}
                    value={quantity}
                    onChange={handleChangeQuantity(index)}
                  />
              </FormItem>
            </>
          );
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.requestedQuantity")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].requestedQuantity))
        .DataIndex(nameof(customerSalesOrderContents[0].requestedQuantity))
        .Render((...[requestedQuantity]) => {
          return formatNumber(requestedQuantity);
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.primaryUnitOfMeasure")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].primaryUnitOfMeasure))
        .DataIndex(nameof(customerSalesOrderContents[0].primaryUnitOfMeasure))
        .Render((primaryUnitOfMeasure: UnitOfMeasure) => {
          return primaryUnitOfMeasure?.name;
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.primarySalePrice")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].primaryPrice))
        .DataIndex(nameof(customerSalesOrderContents[0].primaryPrice))
        .Render((primaryPrice: any, content: CustomerSalesOrderContent, index: number) => {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<
                CustomerSalesOrderContent
              >(content.errors, nameof(content.primaryPrice))}
              message={content.errors?.primaryPrice}
            >
              <InputNumber
                isMaterial={true}
                value={primaryPrice}
                onChange={value => handleChangePrimaryPrice(index, value)}
                disabled={
                  model?.editedPriceStatusId === 1 && content?.unitOfMeasure?.id
                    ? false
                    : true
                }
              />
            </FormItem>
          );
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.salePrice")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].salePrice))
        .DataIndex(nameof(customerSalesOrderContents[0].salePrice))
        .Render((...[salePrice]) => {
          return formatNumber(salePrice);
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.discountPercentage")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].discountPercentage))
        .DataIndex(nameof(customerSalesOrderContents[0].discountPercentage))
        .Render((discountPercentage: any,
          content: CustomerSalesOrderContent,
          index: number,) => {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<
                CustomerSalesOrderContent
              >(content.errors, nameof(content.discountPercentage))}
              message={content.errors?.discountPercentage}
            >

              <InputNumber
                isMaterial={true}
                value={discountPercentage}
                onChange={handleChangeDiscountPercentage(index)}
                decimalDigit={2}
              />
            </FormItem>
          );
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.taxPercentage")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].taxPercentage))
        .DataIndex(nameof(customerSalesOrderContents[0].item))
        .Render((taxPercentage: any, content: CustomerSalesOrderContent, index: number) => {
          const defaultFilter = new TaxTypeFilter();
          return (
            <>
              <FormItem
                validateStatus={formService.getValidationStatus<
                  CustomerSalesOrderContent
                >(content.errors, nameof(content.taxType))}
                message={content.errors?.taxType}
              >
                <Select
                  model={content.taxType}
                  onChange={handleChangeTaxType(taxPercentage, index)}
                  getList={customerSalesOrderRepository.singleListTaxType}
                  modelFilter={defaultFilter}
                  classFilter={TaxTypeFilter}
                  placeHolder={translate('customerSalesOrderContents.placeholder.taxPercentage')}
                  isMaterial={true}
                  disabled={
                    model.requestStateId === 2 || model.requestStateId === 3
                  }
                />
              </FormItem>
            </>
          );
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.amount")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].amount))
        .DataIndex(nameof(customerSalesOrderContents[0].amount))
        .Render((...[amount]) => {
          return formatNumber(amount);
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderContents.isEditedPrice")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].editedPriceStatus))
        .DataIndex(nameof(customerSalesOrderContents[0].editedPriceStatus))
        .Render((editedPriceStatus: Status) => {
          return (
            <div className={editedPriceStatus?.id === 1 ? 'active' : ''}>
              <i className="fa fa-check-circle d-flex justify-content-center"></i>
            </div>
          );
        }),

        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.actions.delete")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderContents[0].quantity))
        .DataIndex(nameof(customerSalesOrderContents[0].quantity))
        .Render((...params: [
          CustomerSalesOrderContent,
          CustomerSalesOrderContent,
          number,
        ]) => {
          return (
            <div className="button-action-table">
              <Popconfirm
                  placement="left"
                  title={translate('general.delete.content')}
                  onConfirm={handleDelete(params[2])}
                  okText={translate('general.actions.delete')}
                  cancelText={translate('general.actions.cancel')}
                >
                  <button className="btn btn-link mr-2">
                    <i className="tio-delete_outlined text-danger" />
                  </button>
                </Popconfirm>
            </div>
          );
        }),
        
    );
  }, [
    customerSalesOrderContents,
    translate,
    model,
    handleChangeDiscountPercentage,
    handleChangePrimaryPrice,
    handleChangeQuantity,
    handleChangeTaxType,
    handleChangeUOMInContent,
    handleDelete,
  ]);
  const {
    openItemDialog,
    itemList,
    itemFilter,
    totalList,
    checkedAll,
    loadingItem,
    handleOpenItem,
    handleCheckItem,
    handleCheckAllItem,
    handleSaveItem,
    handleCancelItem,
    handleChangePaginationItem,
    handleChangeSearchItem,
    handleChangeSelectItem,
  } = useCustomerSalesOrderItem(
    handleChangeAllRow,
    model.customerSalesOrderContents,
    'customerSalesOrderContent',
    setCalculateTotal,
    model
  );
  const customerSalesOrderContentTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={customerSalesOrderContentFilter}
        list={list}
        loadingList={loadingList}
        total={total || 0}
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
        handleLocalBulkDelete={handleBulkDelete}
        canBulkDelete={canBulkDelete}
        handleExportContent={handleContentExport}
        handleExportTemplateContent={handleContentExportTemplate}
        handlePagination={handlePagination}
        handleAddContent={handleAddContent}
        ref={ref}
        handleClick={handleClick}
        handleImportContentList={handleImportContentList}
        columns={customerSalesOrderContentColumns}
        hasAddContentInline={true}
        isShowFooter={false}
        isShowTitle={false}
      />
    ),
    [model, customerSalesOrderContentFilter, list, loadingList, total, handleTableChange, rowSelection, handleBulkDelete, canBulkDelete, handleContentExport, handleContentExportTemplate, handlePagination, handleAddContent, ref, handleClick, handleImportContentList, customerSalesOrderContentColumns]
  );
  const customerSalesOrderItem = React.useMemo(
    () => (
      <>
        <CustomerSalesOrderItemModal
          itemList={itemList}
          itemFilter={itemFilter}
          total={totalList}
          visibleDialog={openItemDialog}
          isCheckedAll={checkedAll}
          loadingItem={loadingItem}
          onSaveDialog={handleSaveItem}
          onCancelDialog={handleCancelItem}
          handleChangeSearchItem={handleChangeSearchItem}
          handleCheckItem={handleCheckItem}
          handleCheckAllItem={handleCheckAllItem}
          handleChangePaginationItem={handleChangePaginationItem}
          handleChangeSelectItem={handleChangeSelectItem}
          translate={translate}
        />
      </>
    ), [checkedAll, handleCancelItem, handleChangePaginationItem, handleChangeSearchItem, handleChangeSelectItem, handleCheckAllItem, handleCheckItem, handleSaveItem, itemFilter, itemList, loadingItem, openItemDialog, totalList, translate]);
  return {
    customerSalesOrderContentTable,
    customerSalesOrderItem,
    handleOpenContent: handleOpenItem,
    canBulkDeleteItem: canBulkDelete,
    handleLocalBulkDeleteItem: handleBulkDelete,
  };
}