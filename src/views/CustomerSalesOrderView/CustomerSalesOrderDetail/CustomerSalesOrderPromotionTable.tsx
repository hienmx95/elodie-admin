/* begin general import */
import { PaginationProps, Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { formatNumber } from "helpers/number";
import { renderMasterIndex } from "helpers/table";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import { CustomerSalesOrderPromotion } from "models/CustomerSalesOrderPromotion";
import { CustomerSalesOrderPromotionFilter } from "models/CustomerSalesOrderPromotion/CustomerSalesOrderPromotionFilter";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import { formService } from "services/form-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import {
  CustomerSalesOrderItemModal,
  useCustomerSalesOrderItem,
} from "./CustomerSalesOrderItem";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "services/component-factory/table-column-service";
/* end individual import */

export function useCustomerSalesOrderPromotionTable(
  model: CustomerSalesOrder,
  setModel: (data: CustomerSalesOrder) => void,
  setCalculateTotal?: Dispatch<SetStateAction<boolean>>
) {
  const [translate] = useTranslation();
  const {
    content: customerSalesOrderPromotions,
    setContent: setCustomerSalesOrderPromotions,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.customerSalesOrderPromotions)
  );
  const [
    customerSalesOrderPromotionFilter,
    dispatchCustomerSalesOrderPromotionFilter,
  ] = React.useReducer<
    React.Reducer<
      CustomerSalesOrderPromotionFilter,
      AdvanceFilterAction<CustomerSalesOrderPromotionFilter>
    >
  >(advanceFilterReducer, new CustomerSalesOrderPromotionFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    // handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<
    CustomerSalesOrderPromotionFilter
  >(
    customerSalesOrderPromotionFilter,
    dispatchCustomerSalesOrderPromotionFilter,
    CustomerSalesOrderPromotionFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    customerSalesOrderPromotionFilter,
    customerSalesOrderPromotions,
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
    // handleLocalDelete,
    handleLocalBulkDelete,
    handleAddContent,
    handleChangeAllRow,
  } = tableService.useLocalTable<
    CustomerSalesOrderPromotion,
    any,
    CustomerSalesOrderPromotionFilter
  >(
    customerSalesOrderPromotionFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    customerSalesOrderPromotions,
    setCustomerSalesOrderPromotions,
    CustomerSalesOrderPromotion
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
  const pagination: PaginationProps = tableService.usePagination<
    CustomerSalesOrderPromotionFilter
  >(customerSalesOrderPromotionFilter, total);
  const handleDelete = React.useCallback(
    (index: number) => {
      return () => {
        customerSalesOrderPromotions.splice(index, 1);
        setCustomerSalesOrderPromotions([...customerSalesOrderPromotions]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [
      customerSalesOrderPromotions,
      setCalculateTotal,
      setCustomerSalesOrderPromotions,
    ]
  );
  const handleChangeUOMInContent = React.useCallback(
    (...[, index]) => {
      return (id: number | string | null, t: UnitOfMeasure) => {
        const requestedQuantitys = Number(
          customerSalesOrderPromotions[index].quantity * t?.factor
        );
        const newSalePrice =
          customerSalesOrderPromotions[index]?.item?.salePrice * t?.factor;
        customerSalesOrderPromotions[index] = {
          ...customerSalesOrderPromotions[index],
          unitOfMeasure: t,
          unitOfMeasureId: +id,
          requestedQuantity: requestedQuantitys,
          salePrice: newSalePrice,
          factor: t?.factor,
        };
        setCustomerSalesOrderPromotions([...customerSalesOrderPromotions]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [
      setCalculateTotal,
      customerSalesOrderPromotions,
      setCustomerSalesOrderPromotions,
    ]
  );
  const handleChangeQuantity = React.useCallback(
    (index) => {
      return (event) => {
        if (
          customerSalesOrderPromotions[index] &&
          customerSalesOrderPromotions[index].unitOfMeasure
        ) {
          let requestedQuantitys = 0;
          if (event === undefined || event === null) {
            requestedQuantitys = 0;
          } else if (customerSalesOrderPromotions[index].factor) {
            requestedQuantitys = Number(
              Number(event) * customerSalesOrderPromotions[index].factor
            );
          }
          customerSalesOrderPromotions[index] = {
            ...customerSalesOrderPromotions[index],
            quantity: Number(event),
            requestedQuantity: requestedQuantitys,
          };
        }
        setCustomerSalesOrderPromotions([...customerSalesOrderPromotions]);
        if (setCalculateTotal) {
          setCalculateTotal(true);
        }
      };
    },
    [
      customerSalesOrderPromotions,
      setCalculateTotal,
      setCustomerSalesOrderPromotions,
    ]
  );
  // const handleChangeSalePrice = React.useCallback(
  //   (index, event) => {
  //     customerSalesOrderPromotions[index] = {
  //       ...customerSalesOrderPromotions[index],
  //       salePrice: Number(event),
  //     };
  //     setCustomerSalesOrderPromotions([...customerSalesOrderPromotions,

  //     ]);
  //   },
  //   [customerSalesOrderPromotions, setCustomerSalesOrderPromotions],
  // );

  // const customerSalesOrderPromotionColumns: ColumnsType<CustomerSalesOrderPromotion> = React.useMemo(
  //   () => [
  //     {
  //       title: translate("general.columns.index"),
  //       key: nameof(generalLanguageKeys.index),
  //       width: generalColumnWidths.index,
  //       align: "center",
  //       render: renderMasterIndex<CustomerSalesOrderPromotion>(pagination),
  //     },
  //     {
  //       title: translate("customerSalesOrderPromotions.items.code"),
  //       key: nameof(customerSalesOrderPromotions[0].code),
  //       dataIndex: nameof(customerSalesOrderPromotions[0].item),
  //       render(item: Item) {
  //         return item?.code;
  //       },
  //     },
  //     {
  //       title: translate("customerSalesOrderPromotions.items.name"),
  //       key: nameof(customerSalesOrderPromotions[0].name),
  //       dataIndex: nameof(customerSalesOrderPromotions[0].item),
  //       render(item: Item) {
  //         return item?.name;
  //       },
  //       width: 250,
  //     },
  //     {
  //       title: translate("customerSalesOrderPromotions.orderQuote"),
  //       className: "orderQuote",
  //       children: [
  //         {
  //           title: translate("customerSalesOrderPromotions.unitOfMeasure"),
  //           key: nameof(customerSalesOrderPromotions[0].unitOfMeasure),
  //           dataIndex: nameof(customerSalesOrderPromotions[0].unitOfMeasure),
  //           width: 130,
  //           align: "center",
  //           className: "orderQuote",
  //           render(
  //             unitOfMeasure: UnitOfMeasure,
  //             content: CustomerSalesOrderPromotion,
  //             index: number
  //           ) {
  //             const defaultFilter = new UnitOfMeasureFilter();
  //             defaultFilter.productId.equal = content.item?.productId;
  //             return (
  //               <>
  //                 <FormItem
  //                   validateStatus={formService.getValidationStatus<
  //                     CustomerSalesOrderPromotion
  //                   >(content.errors, nameof(content.unitOfMeasure))}
  //                   message={content.errors?.unitOfMeasure}
  //                 >
  //                   <Select
  //                     classFilter={UnitOfMeasureFilter}
  //                     modelFilter={defaultFilter}
  //                     placeHolder={translate("Chọn đơn vị tính")}
  //                     getList={
  //                       customerSalesOrderRepository.singleListUnitOfMeasure
  //                     }
  //                     onChange={handleChangeUOMInContent(
  //                       unitOfMeasure,
  //                       index,
  //                       content
  //                     )}
  //                     model={content.unitOfMeasure}
  //                     isMaterial={true}
  //                   />
  //                 </FormItem>
  //                 {/* )} */}
  //               </>
  //             );
  //           },
  //         },
  //         {
  //           title: translate("customerSalesOrderPromotions.quantity"),
  //           key: nameof(customerSalesOrderPromotions[0].quantity),
  //           dataIndex: nameof(customerSalesOrderPromotions[0].quantity),
  //           className: "orderQuote",
  //           render(quantity: any, content: CustomerSalesOrderPromotion, index) {
  //             return (
  //               <>
  //                 <FormItem
  //                   validateStatus={formService.getValidationStatus<
  //                     CustomerSalesOrderPromotion
  //                   >(content.errors, nameof(content.quantity))}
  //                   message={content.errors?.quantity}
  //                 >
  //                   <InputNumber
  //                     // min={0}
  //                     isMaterial={true}
  //                     value={quantity}
  //                     onChange={handleChangeQuantity(index)}
  //                   />
  //                 </FormItem>
  //               </>
  //             );
  //           },
  //         },
  //         {
  //           title: translate("customerSalesOrderPromotions.salePrice"),
  //           key: nameof(customerSalesOrderPromotions[0].salePrice),
  //           dataIndex: nameof(customerSalesOrderPromotions[0].salePrice),
  //           align: "center",
  //           className: "orderQuote",
  //           render(...[salePrice]) {
  //             return formatNumber(salePrice);
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       title: translate("customerSalesOrderPromotions.storage"),
  //       className: "storage",
  //       children: [
  //         {
  //           title: translate(
  //             "customerSalesOrderPromotions.primaryUnitOfMeasure"
  //           ),
  //           key: nameof(customerSalesOrderPromotions[0].primaryUnitOfMeasure),
  //           dataIndex: nameof(
  //             customerSalesOrderPromotions[0].primaryUnitOfMeasure
  //           ),
  //           align: "center",
  //           className: "storage",
  //           render(primaryUnitOfMeasure: UnitOfMeasure) {
  //             return primaryUnitOfMeasure?.name;
  //           },
  //         },
  //         {
  //           title: translate("customerSalesOrderPromotions.requestedQuantity"),
  //           key: nameof(customerSalesOrderPromotions[0].requestedQuantity),
  //           dataIndex: nameof(
  //             customerSalesOrderPromotions[0].requestedQuantity
  //           ),
  //           align: "center",
  //           className: "storage",
  //           render(...[requestedQuantity]) {
  //             return formatNumber(requestedQuantity);
  //           },
  //         },
  //         {
  //           title: translate("Đơn giá"),
  //           className: "storage",
  //           key: nameof(customerSalesOrderPromotions[0].primaryPrice),
  //           dataIndex: nameof(customerSalesOrderPromotions[0].primaryPrice),
  //           align: "center",
  //           render(...[primaryPrice, , index]) {
  //             return (
  //               <>
  //                 <div className="action-table action-product">
  //                   <div>{formatNumber(primaryPrice)}</div>
  //                   <div className="d-flex button-action-table">
  //                     <Popconfirm
  //                       placement="left"
  //                       title={translate("general.delete.content")}
  //                       onConfirm={handleDelete(index)}
  //                       okText={translate("general.actions.delete")}
  //                       cancelText={translate("general.actions.cancel")}
  //                     >
  //                       <button className="btn btn-delete mr-2 ant-action-menu">
  //                         <i className="icon-Trash"></i>
  //                       </button>
  //                     </Popconfirm>
  //                   </div>
  //                 </div>
  //               </>
  //             );
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   [
  //     translate,
  //     customerSalesOrderPromotions,
  //     handleChangeUOMInContent,
  //     handleChangeQuantity,
  //     handleDelete,
  //     pagination,
  //   ]
  // );

  const customerSalesOrderPromotionColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.item")}
          </div>
        ))
        .Width(180)
        .Key(nameof(customerSalesOrderPromotions[0].item))
        .DataIndex(nameof(customerSalesOrderPromotions[0].item))
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
        .Key(nameof(customerSalesOrderPromotions[0].unitOfMeasure))
        .DataIndex(nameof(customerSalesOrderPromotions[0].unitOfMeasure))
        .Render((unitOfMeasure: UnitOfMeasure,
          content: CustomerSalesOrderPromotion,
          index: number) => {
          const defaultFilter = new UnitOfMeasureFilter();
          defaultFilter.productId.equal = content.item?.productId;
          return (
            <>
              <FormItem
                validateStatus={formService.getValidationStatus<
                  CustomerSalesOrderPromotion
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
        .Key(nameof(customerSalesOrderPromotions[0].quantity))
        .DataIndex(nameof(customerSalesOrderPromotions[0].quantity))
        .Render((quantity: any, content: CustomerSalesOrderPromotion, index) => {
          return (
            <>
              <FormItem
                  validateStatus={formService.getValidationStatus<
                    CustomerSalesOrderPromotion
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
        .Key(nameof(customerSalesOrderPromotions[0].requestedQuantity))
        .DataIndex(nameof(customerSalesOrderPromotions[0].requestedQuantity))
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
        .Key(nameof(customerSalesOrderPromotions[0].primaryUnitOfMeasure))
        .DataIndex(nameof(customerSalesOrderPromotions[0].primaryUnitOfMeasure))
        .Render((primaryUnitOfMeasure: UnitOfMeasure) => {
          return primaryUnitOfMeasure?.name;
        }),
        
        CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.actions.delete")}
          </div>
        ))
        .Width(150)
        .Key(nameof(customerSalesOrderPromotions[0].quantity))
        .DataIndex(nameof(customerSalesOrderPromotions[0].quantity))
        .Render((...params: [
          CustomerSalesOrderPromotion,
          CustomerSalesOrderPromotion,
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
    customerSalesOrderPromotions,
    translate,
    model,
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
    model.customerSalesOrderPromotions,
    "customerSalesOrderPromotion",
    setCalculateTotal
  );
  const customerSalesOrderPromotionTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={customerSalesOrderPromotionFilter}
        list={list}
        loadingList={loadingList}
        total={total || 0}
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
        handleLocalBulkDelete={handleLocalBulkDelete}
        canBulkDelete={canBulkDelete}
        handleExportContent={handleContentExport}
        handleExportTemplateContent={handleContentExportTemplate}
        handlePagination={handlePagination}
        handleAddContent={handleAddContent}
        ref={ref}
        handleClick={handleClick}
        handleImportContentList={handleImportContentList}
        columns={customerSalesOrderPromotionColumns}
        hasAddContentInline={true}
        isShowFooter={false}
        isShowTitle={false}
      />
    ),
    [
      model,
      customerSalesOrderPromotionFilter,
      list,
      loadingList,
      total,
      handleTableChange,
      rowSelection,
      handleLocalBulkDelete,
      canBulkDelete,
      handleContentExport,
      handleContentExportTemplate,
      handlePagination,
      handleAddContent,
      ref,
      handleClick,
      handleImportContentList,
      customerSalesOrderPromotionColumns,
    ]
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
    ),
    [
      checkedAll,
      handleCancelItem,
      handleChangePaginationItem,
      handleChangeSearchItem,
      handleChangeSelectItem,
      handleCheckAllItem,
      handleCheckItem,
      handleSaveItem,
      itemFilter,
      itemList,
      loadingItem,
      openItemDialog,
      totalList,
      translate,
    ]
  );
  return {
    customerSalesOrderPromotionTable,
    customerSalesOrderPromotionItem: customerSalesOrderItem,
    handleOpenPromotion: handleOpenItem,
  };
}
