/* eslint-disable @typescript-eslint/no-unused-vars */
/* begin general import */
import { Modal, notification, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import { formatNumber } from "helpers/number";
import { renderMasterIndex } from "helpers/table";
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import {
  CustomerSalesOrderPaymentHistory,
  CustomerSalesOrderPaymentHistoryFilter,
} from "models/CustomerSalesOrderPaymentHistory";
/* end general import */
/* begin individual import */
import { PaymentType } from "models/PaymentType";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService, { ContentTableActionEnum } from "services/table-service";
import nameof from "ts-nameof.macro";
import PaymentStatusHistoryModal from "./PaymentStatusHistoryModal";
import { commonWebService } from "services/common-web-service";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "services/component-factory/table-column-service";
import { importExportDataService } from "services/import-export-data-service";
/* end individual import */

export function useCustomerSalesOrderPaymentHistoryTable(
  model: CustomerSalesOrder,
  setModel: (data: CustomerSalesOrder) => void,
) {
  const [translate] = useTranslation();
  const {
    content: customerSalesOrderPaymentHistories,
    setContent: setCustomerSalesOrderPaymentHistorys,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.customerSalesOrderPaymentHistories)
  );

  const [
    customerSalesOrderPaymentHistoryFilter,
    dispatchCustomerSalesOrderPaymentHistoryFilter,
  ] = React.useReducer<
    React.Reducer<
      CustomerSalesOrderPaymentHistoryFilter,
      AdvanceFilterAction<CustomerSalesOrderPaymentHistoryFilter>
    >
  >(advanceFilterReducer, {
    ...new CustomerSalesOrderPaymentHistoryFilter(),
    take: 5,
  });

  const {
    loadList,
    setLoadList,
    handleSearch,
    // handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<CustomerSalesOrderPaymentHistoryFilter>(
    customerSalesOrderPaymentHistoryFilter,
    dispatchCustomerSalesOrderPaymentHistoryFilter,
    CustomerSalesOrderPaymentHistoryFilter
  );

  const {
    ref,
    handleClick,
    handleImportContentList,
  } = importExportDataService.useImport();

  const [percentTotal, setPercentTotal] = React.useState<number>(0);
  const [valueTotal, setValueTotal] = React.useState<number>(0);

  const { list, total, loadingList } = listService.useLocalList(
    customerSalesOrderPaymentHistoryFilter,
    customerSalesOrderPaymentHistories,
    loadList,
    setLoadList
  );
  const {
    pagination,
    handleTableChange,
    handlePagination,
    rowSelection,
    canBulkDelete,
    selectedContent,
    resetTableFilter,
    filterContentNotInList,
    getIdsFromContent,
    dispatch,
    handleAddContent
  } = tableService.useLocalTable<
    CustomerSalesOrderPaymentHistory,
    any,
    CustomerSalesOrderPaymentHistoryFilter
  >(
    customerSalesOrderPaymentHistoryFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    customerSalesOrderPaymentHistories,
    setCustomerSalesOrderPaymentHistorys,
    CustomerSalesOrderPaymentHistory
  );
  const [isSetPaymentTotal, setIsSetPaymentTotal] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (isSetPaymentTotal) {
      let percentage = 0;
      let amount = 0;
      if (customerSalesOrderPaymentHistories?.length >= 0) {
        customerSalesOrderPaymentHistories.forEach(
          (content: CustomerSalesOrderPaymentHistory, index: number) => {
            percentage += content.paymentPercentage;
            amount += content.paymentAmount;

          });
        setPercentTotal(percentage);
        setValueTotal(amount);
      };
      setIsSetPaymentTotal(false);
    }
  }, [customerSalesOrderPaymentHistories, isSetPaymentTotal]);
  const handleLocalBulkDelete = React.useCallback(
    () => {
      Modal.confirm({
        title: translate("general.delete.content"),
        content: translate("general.delete.title"),
        okType: "danger",
        onOk() {
          setCustomerSalesOrderPaymentHistorys(
            customerSalesOrderPaymentHistories.filter(
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
          setIsSetPaymentTotal(true);
        },
      });
    },
    [customerSalesOrderPaymentHistories, dispatch, filterContentNotInList, getIdsFromContent, resetTableFilter, selectedContent, setCustomerSalesOrderPaymentHistorys, translate],
  );
  const countPayment = React.useCallback(() => {
    let totalValue = 0;
    let totalPercent = 0;
    if (
      model.customerSalesOrderPaymentHistories &&
      model.customerSalesOrderPaymentHistories.length > 0
    ) {
      model.customerSalesOrderPaymentHistories.forEach((item) => {
        totalValue += +item.paymentAmount;
        totalPercent += +item.paymentPercentage;
      });
      switch (true) {
        case totalPercent === 0:
          setModel({
            ...model,
            paymentStatusId: 1,
            paymentStatus: { id: 1, name: "Chưa thanh toán" },
          });
          break;
        case totalPercent < 100:
          setModel({
            ...model,
            orderPaymentStatusId: 2,
            orderPaymentStatus: { id: 2, name: "Thanh toán một phần" },
          });
          break;
        case totalPercent === 100:
          setModel({
            ...model,
            orderPaymentStatusId: 3,
            orderPaymentStatus: { id: 3, name: "Đã thanh toán" },
          });
          break;
      }
      setValueTotal(totalValue);
      setPercentTotal(totalPercent);
    } else {
      setModel({
        ...model,
        orderPaymentStatusId: 1,
        orderPaymentStatus: { id: 1, name: "Chưa thanh toán" },
      });
    }
  }, [setModel, model, customerSalesOrderPaymentHistories]);

  const [first, setFirst] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (first && model?.id) {
      countPayment();
      setFirst(false);
    }
  }, [first, model, countPayment]);

  const customerSalesOrderPaymentHistoryColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("customerSalesOrderPaymentHistorys.paymentMilestone")}
          </div>  
        ))
        .Width(180)
        .Key(nameof(customerSalesOrderPaymentHistories[0].paymentMilestone))
        .DataIndex(nameof(customerSalesOrderPaymentHistories[0].paymentMilestone))
        .Render((paymentMilestone: any) => {
          return paymentMilestone;
        }),
      CreateColumn()
      .Title(() => (
        <div className="table-cell__header">
          {translate("customerSalesOrderPaymentHistorys.paymentPercentage")}
        </div>  
      ))
      .Width(180)
      .Key(nameof(customerSalesOrderPaymentHistories[0].paymentPercentage))
      .DataIndex(nameof(customerSalesOrderPaymentHistories[0].paymentPercentage))
      .Render((...[paymentPercentage]) => {
        return formatNumber(paymentPercentage);
      }),

      CreateColumn()
      .Title(() => (
        <div className="table-cell__header">
          {translate("customerSalesOrderPaymentHistorys.paymentAmount")}
        </div>  
      ))
      .Width(180)
      .Key(nameof(customerSalesOrderPaymentHistories[0].paymentAmount))
      .DataIndex(nameof(customerSalesOrderPaymentHistories[0].paymentAmount))
      .Render((...[paymentAmount]) => {
        return formatNumber(+paymentAmount);
      }),

      CreateColumn()
      .Title(() => (
        <div className="table-cell__header">
          {translate("customerSalesOrderPaymentHistorys.paymentMethod")}
        </div>  
      ))
      .Width(180)
      .Key(nameof(customerSalesOrderPaymentHistories[0].paymentType))
      .DataIndex(nameof(customerSalesOrderPaymentHistories[0].paymentType))
      .Render((paymentType: PaymentType) => {
        return paymentType?.name;
      }),
    );
  },[
    translate, customerSalesOrderPaymentHistories, pagination
  ]);

  const customerSalesOrderPaymentHistoryTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={customerSalesOrderPaymentHistoryFilter}
        list={list}
        loadingList={loadingList}
        total={total || 0}
        handleTableChange={handleTableChange}
        rowSelection={{ ...rowSelection }}
        handleLocalBulkDelete={handleLocalBulkDelete}
        canBulkDelete={canBulkDelete}
        handleExportContent={null}
        handleExportTemplateContent={null}
        handlePagination={handlePagination}
        handleAddContent={handleAddContent}
        ref={ref}
        handleClick={handleClick}
        handleImportContentList={handleImportContentList}
        columns={customerSalesOrderPaymentHistoryColumns}
        hasAddContentInline={true}
        isShowFooter={false}
        isShowTitle={false}
      />
    ),
    [
      model,
      customerSalesOrderPaymentHistoryFilter,
      list,
      loadingList,
      total,
      handleTableChange,
      rowSelection,
      handleLocalBulkDelete,
      canBulkDelete,
      handlePagination,
      handleAddContent,
      customerSalesOrderPaymentHistoryColumns,
    ]
  );

  //ModalPayment
  const [orderPaymentStatus, setOrderPaymentStatus] = React.useState<
    CustomerSalesOrderPaymentHistory
  >(new CustomerSalesOrderPaymentHistory());

  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
  const handleSaveModel = React.useCallback(() => {
    if (!model.customerSalesOrderPaymentHistories) {
      model.customerSalesOrderPaymentHistories = [];
    }
    if (
      !orderPaymentStatus.paymentTypeId ||
      !orderPaymentStatus.paymentAmount ||
      !orderPaymentStatus.paymentMilestone ||
      !orderPaymentStatus.paymentPercentage
    ) {
      let errors = {
        paymentType: undefined,
        paymentAmount: undefined,
        paymentMilestone: undefined,
        paymentPercentage: undefined,
      };
      if (!orderPaymentStatus.paymentTypeId) {
        errors.paymentType = translate("Shared.require.error", {
          value: translate("customerSalesOrderPaymentHistorys.paymentMethod"),
        });
      }
      if (!orderPaymentStatus.paymentAmount) {
        errors.paymentAmount = translate("Shared.require.error", {
          value: translate("customerSalesOrderPaymentHistorys.paymentAmount"),
        });
      }
      if (!orderPaymentStatus.paymentMilestone) {
        errors.paymentMilestone = translate("Shared.require.error", {
          value: translate(
            "customerSalesOrderPaymentHistorys.paymentMilestone"
          ),
        });
      }
      if (!orderPaymentStatus.paymentPercentage) {
        errors.paymentPercentage = translate("Shared.require.error", {
          value: translate(
            "customerSalesOrderPaymentHistorys.paymentPercentage"
          ),
        });
      }
      setOrderPaymentStatus({ ...orderPaymentStatus, errors: errors });
    } else {
      setIsOpenDetailModal(false);
      model.customerSalesOrderPaymentHistories.push(orderPaymentStatus);
      setModel({ ...model });
      countPayment();
      setLoadList(true);
    }
  }, [countPayment, translate, setLoadList, model, orderPaymentStatus, setModel]);

  const handleOpenDetailModal = useCallback(() => {
    if (percentTotal === 100) {
      notification.error({
        message: translate('Đã đủ thanh toán'),
        description: 'Hết nợ',
      });
      return false;
    } else {
      setIsOpenDetailModal(true);
      setOrderPaymentStatus({ ...new CustomerSalesOrderPaymentHistory() });
    }
  }, [percentTotal, translate]);

  const handleCloseDetailModal = useCallback(() => {
    setIsOpenDetailModal(false);
    setLoadList(true);
    countPayment();
  }, [countPayment, setLoadList]);

  const handleChangeSimpleField = React.useCallback(
    (fieldName: string) => {
      return (fieldValue: any) => {
        let value: any = fieldValue;
        if (typeof fieldValue?.target?.checked === "boolean") {
          value = fieldValue?.target?.checked;
        }
        setOrderPaymentStatus({ ...orderPaymentStatus, [fieldName]: value });
      };
    },
    [orderPaymentStatus]
  );

  const handleChangeObjectField = React.useCallback(
    (fieldName: string) => {
      return (fieldIdValue: number, fieldValue?: any) => {
        setOrderPaymentStatus({
          ...orderPaymentStatus,
          [fieldName]: fieldValue,
          [fieldName + "Id"]: fieldIdValue,
        });
      };
    },
    [orderPaymentStatus]
  );

  const handleLocalBulkDeletePayment = React.useCallback(() => {
    handleLocalBulkDelete();
    countPayment();
  }, [countPayment, handleLocalBulkDelete]);

  const paymentStatusHistoryModal = React.useMemo(
    () => (
      <>
        <PaymentStatusHistoryModal
          model={orderPaymentStatus}
          setModel={setOrderPaymentStatus}
          visible={isOpenDetailModal}
          handleSave={handleSaveModel}
          handleCancel={handleCloseDetailModal}
          onChangeSimpleField={handleChangeSimpleField}
          onChangeObjectField={handleChangeObjectField}
          // isDetail={isDetail}
          visibleFooter={true}
          totalAmount={model.total}
          valueTotal={valueTotal}
          percentTotal={percentTotal}
        />
      </>
    ),
    [orderPaymentStatus, isOpenDetailModal, handleSaveModel, handleCloseDetailModal, handleChangeSimpleField, handleChangeObjectField, model.total, valueTotal, percentTotal]
  );

  return {
    percentTotal,
    valueTotal,
    canBulkDeletePayment: canBulkDelete,
    handleLocalBulkDeletePayment,
    customerSalesOrderPaymentHistoryTable,
    handleOpenDetailModal,
    paymentStatusHistoryModal,
  };
}
