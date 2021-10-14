import { PlusOutlined } from "@ant-design/icons";
import { commonService } from "@react3l/react3l/services";
import { Card, Col, Row, Tabs } from "antd";
import { AxiosError } from "axios";
import AppFooter from "components/AppFooter/AppFooter";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TextArea from "components/Utility/TextArea/TextArea";
import { CUSTOMER_SALES_ORDER_MASTER_ROUTE } from "config/route-consts";
import { formatNumber } from "helpers/number";
import Breadcrumbs from "layout/breadcrumb";
import { AppUser, AppUserFilter } from "models/AppUser";
import { CustomerFilter } from "models/Customer";
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import { DistrictFilter } from "models/District";
import { NationFilter } from "models/Nation";
import { OrderPaymentStatusFilter } from "models/OrderPaymentStatus";
import { ProvinceFilter } from "models/Province";
import { RequestStateFilter } from "models/RequestState";
import React, { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import { routerService } from "services/route-service";
import nameof from "ts-nameof.macro";
import AddCustomerModal from "./AddCustomerComponent/AddCustomerModal";
import { useCustomerSalesOrderContentTable } from "./CustomerSalesOrderContentTable";
import "./CustomerSalesOrderDetail.scss";
import { useCustomerSalesOrderDetailHook } from "./CustomerSalesOrderDetailHook/CustomerSalesOrderDetailHook";
import { useCustomerSalesOrderPaymentHistoryTable } from "./PaymentStausHistoryTable";
import { useCustomerSalesOrderFooter } from "./CustomerSalesOrderDetailHook/CustomerSalesOrderFooterHook";

function CustomerSalesOrderDetail() {
  const [translate] = useTranslation();
  const { TabPane } = Tabs;
  const {
    model,
    handleUpdateNewModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    isDetail,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<CustomerSalesOrder>(
    CustomerSalesOrder,
    customerSalesOrderRepository.get,
    customerSalesOrderRepository.save,
    CUSTOMER_SALES_ORDER_MASTER_ROUTE
  );

  const {
    issetOpportunity,
    isOpenOpportunity,
    setIsSetOpportunity,
    handleToggleOpenOpportunity,
    issetCustomer,
    isOpenCustomer,
    setIsSetCustomer,
    handleToggleOpenCustomer,
    handleChangeCustomer,
    handleCopyInvoiceAddress,
    handleChangeInvoiceNation,
    handleChangeInvoiceProvince,
    invoiceProvinceFilter,
    invoiceDistrictFilter,
    handleChangeDeliveryNation,
    handleChangeDeliveryProvince,
    deliveryProvinceFilter,
    deliveryDistrictFilter,
    editedPriceStatus,
    handleChangeChangeEditPrice,
    handleChangeGeneralDiscountPercentage,
    setCalculateTotal,
    changeEditPrice,
    setChangeEditPrice,
    handleChangeOrderType,
    customerFilter,
    customerId,
  } = useCustomerSalesOrderDetailHook(model, handleUpdateNewModel, isDetail);

  const { childrenAction } = useCustomerSalesOrderFooter(
    translate,
    model,
    handleSave,
    handleGoBase
  );

  const [loading, setLoading] = useState<boolean>(false);

  // Save
  const [subscription] = commonService.useSubscription();
  const history = useHistory();
  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();
  const [handleGoBack] = routerService.useGoBack();
  // const handleSave = useCallback(
  //   (
  //     onSaveSuccess?: (item: CustomerSalesOrder) => void,
  //     onSaveError?: (item: CustomerSalesOrder) => void
  //   ) => {
  //     return () => {
  //       setLoading(true);
  //       subscription.add(
  //         customerSalesOrderRepository
  //           .save(model)
  //           .pipe(finalize(() => setLoading(false)))
  //           .subscribe(
  //             (item: CustomerSalesOrder) => {
  //               handleUpdateNewModel(item); // setModel
  //               history.goBack(); // go master
  //               notifyUpdateItemSuccess(); // global message service go here
  //               if (typeof onSaveSuccess === "function") {
  //                 onSaveSuccess(item); // trigger custom effect when updating success
  //               }
  //             },
  //             (error: AxiosError<CustomerSalesOrder>) => {
  //               if (error.response && error.response.status === 400) {
  //                 handleUpdateNewModel(error.response?.data); // setModel for catching error
  //               }
  //               notifyUpdateItemError(); // global message service go here
  //               if (typeof onSaveError === "function") {
  //                 onSaveError(error.response?.data); // trigger custom effect when updating success
  //               }
  //             }
  //           )
  //       );
  //     };
  //   },
  //   [
  //     handleUpdateNewModel,
  //     history,
  //     model,
  //     notifyUpdateItemError,
  //     notifyUpdateItemSuccess,
  //     setLoading,
  //     subscription,
  //   ]
  // );
  // sản phẩm bán
  const {
    customerSalesOrderContentTable,
    customerSalesOrderItem,
    handleOpenContent,
    canBulkDeleteItem,
    handleLocalBulkDeleteItem,
  } = useCustomerSalesOrderContentTable(
    model,
    handleUpdateNewModel,
    setCalculateTotal,
    changeEditPrice,
    setChangeEditPrice
  );
  //Tiến độ thanh toán
  const {
    percentTotal,
    valueTotal,
    canBulkDeletePayment,
    handleLocalBulkDeletePayment,
    customerSalesOrderPaymentHistoryTable,
    handleOpenDetailModal,
    paymentStatusHistoryModal,
  } = useCustomerSalesOrderPaymentHistoryTable(model, handleUpdateNewModel);
  return (
    <div className="page page__detail">
      <>
        <div className="page__detail-tabs">
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={24}>
                <Card title={translate("customerSalesOrders.detail.title")}>
                  <Row className="justify-content-between">
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.code")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          //maxLength={255}
                          value={model.code}
                          placeHolder={translate("customerSalesOrders.placeholder.code")}
                          onChange={handleChangeSimpleField(nameof(model.code))}
                          disabled
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.deliveryDate")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.deliveryDate))}
                        message={model.errors?.deliveryDate}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.deliveryDate}
                          placeholder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.deliveryDate"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.deliveryDate)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate(
                          "customerSalesOrders.orderPaymentStatus"
                        )}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.orderPaymentStatus))}
                        message={model.errors?.orderPaymentStatus}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={OrderPaymentStatusFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.orderPaymentStatus"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListOrderPaymentStatus
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.orderPaymentStatus)
                          )}
                          model={model.orderPaymentStatus}
                          disabled
                        />
                      </FormItem>
                    </Col>
                    {/* <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.contract")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.contract))}
                        message={model.errors?.contract}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={ContractFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.contract"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListContract
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.contract)
                          )}
                          model={model.contract}
                        />
                      </FormItem>
                    </Col> */}
                  </Row>
                  <Row className="justify-content-between">
                    {/* <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate(
                          "customerSalesOrders.customerSalesOrderType"
                        )}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.customerSalesOrderType))}
                        message={model.errors?.customerSalesOrderType}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={CustomerSalesOrderTypeFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.customerSalesOrderType"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListCustomersalesordertype
                          }
                          onChange={handleChangeOrderType()}
                          model={model.customerSalesOrderType}
                          disabled={customerId ? true : false}
                        />
                      </FormItem>
                    </Col> */}
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.orderDate")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.orderDate))}
                        message={model.errors?.orderDate}
                        isRequired={true}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.orderDate}
                          placeholder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.orderDate"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.orderDate)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.shippingName")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.shippingName))}
                        message={model.errors?.shippingName}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.shippingName}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customerSalesOrders.shippingName"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.shippingName)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.salesEmployee")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.salesEmployee))}
                        message={model.errors?.salesEmployee}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={AppUserFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.salesEmployee"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListAppUser
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.salesEmployee)
                          )}
                          model={model.salesEmployee}
                          render={(user: AppUser) => user?.displayName}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.customer")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.customer))}
                        message={model.errors?.customer}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={CustomerFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.customer"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListCustomer
                          }
                          onChange={handleChangeCustomer}
                          model={model.customer}
                          modelFilter={customerFilter}
                        />
                        <button
                          className="btn btn-primary btnInput ml-2"
                          onClick={handleToggleOpenCustomer}
                        >
                          <PlusOutlined></PlusOutlined>
                        </button>
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.phone")}
                      >
                        <InputText
                          isMaterial={true}
                          value={model?.customer?.phone}
                          placeHolder={translate("customerSalesOrders.phone")}
                          disabled
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.requestState")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.requestState))}
                        message={model.errors?.requestState}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={RequestStateFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.requestState"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListRequestState
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.requestState)
                          )}
                          model={model.requestState}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    {/* <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.opportunity")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.opportunity))}
                        message={model.errors?.opportunity}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={OpportunityFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.opportunity"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListOpportunity
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.opportunity)
                          )}
                          model={model.opportunity}
                        />
                        <button
                          className="btn btn-primary btnInput ml-2"
                          onClick={handleToggleOpenOpportunity}
                        >
                          <PlusOutlined></PlusOutlined>
                        </button>
                      </FormItem>
                    </Col> */}
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.orderSource")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.orderSource))}
                        message={model.errors?.orderSource}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={RequestStateFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.orderSource"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListOrderSource
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.orderSource)
                          )}
                          model={model.orderSource}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.note")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.note))}
                        message={model.errors?.note}
                      >
                        <TextArea
                          isMaterial={true}
                          value={model.note}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customerSalesOrders.note"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(nameof(model.note))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={7} className="labelDetail">
                      <FormItem>
                        <SwitchStatus
                          checked={model.editedPriceStatusId === 1}
                          list={editedPriceStatus}
                          onChange={handleChangeChangeEditPrice}
                        />
                        <span className="ml-3">
                          {translate("customerSalesOrders.editedPriceStatus")}
                        </span>
                      </FormItem>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={24} className="tableDetail">
                <Card className="tabPane">
                  <Tabs
                    defaultActiveKey="1"
                    className="tab mar-l-24 orderContent"
                  >
                    <TabPane
                      key="customerSalesOrderContents"
                      tab={translate("customerSalesOrders.master.product")}
                    >
                      <div>{customerSalesOrderContentTable}</div>
                      <div className="btnItem d-flex justify-content-between">
                        <div className=" d-flex">
                          <button
                            className="btn btn-danger mr-3"
                            onClick={handleLocalBulkDeleteItem}
                            disabled={!canBulkDeleteItem}
                          >
                            <span>
                              <i className="tio-delete" />{" "}
                              {translate('general.actions.delete')}
                            </span>
                          </button>
                          {/* <span>
                            <FormItem
                              label={translate("customerSalesOrders.note")}
                              validateStatus={formService.getValidationStatus<
                                CustomerSalesOrder
                              >(
                                model.errors,
                                nameof(model.customerSalesOrderContents)
                              )}
                              message={model.errors?.customerSalesOrderContents}
                            />
                          </span> */}
                        </div>
                        <div>
                          <button
                            className="btn btn-create"
                            onClick={handleOpenContent}
                          >
                            <span>
                              <i className="tio-add" />{" "}
                              {translate("items.detail.create")}
                            </span>
                          </button>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={8} className="tableDetail">
                <Card
                  title={translate("customerSalesOrders.master.invoiceAddress")}
                >
                  <Row>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.nation")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.invoiceNation))}
                        message={model.errors?.invoiceNation}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={NationFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.nation"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListNation
                          }
                          onChange={handleChangeInvoiceNation()}
                          model={model.invoiceNation}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.province")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.invoiceProvince))}
                        message={model.errors?.invoiceProvince}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={ProvinceFilter}
                          placeHolder={translate(
                            "customerSalesOrders.placeholder.province"
                          )}
                          getList={
                            customerSalesOrderRepository.singleListProvince
                          }
                          onChange={handleChangeInvoiceProvince()}
                          model={model.invoiceProvince}
                          disabled={model.invoiceNationId ? false : true}
                          modelFilter={invoiceProvinceFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.district")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.invoiceDistrict))}
                        message={model.errors?.invoiceDistrict}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={DistrictFilter}
                          placeHolder={translate(
                            "customerSalesOrders.placeholder.district"
                          )}
                          getList={
                            customerSalesOrderRepository.singleListDistrict
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.invoiceDistrict)
                          )}
                          model={model.invoiceDistrict}
                          disabled={
                            model.invoiceNationId && model.invoiceProvinceId
                              ? false
                              : true
                          }
                          modelFilter={invoiceDistrictFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.invoiceAddress")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.invoiceAddress))}
                        message={model.errors?.invoiceAddress}
                      >
                        <InputText
                          isMaterial={true}
                          //maxLength={100}
                          value={model.invoiceAddress}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customerSalesOrders.invoiceAddress"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.invoiceAddress)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.zipCode")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.invoiceZIPCode))}
                        message={model.errors?.invoiceZIPCode}
                      >
                        <InputText
                          isMaterial={true}
                          //maxLength={10}
                          value={model.invoiceZIPCode}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customerSalesOrders.zipCode"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.invoiceZIPCode)
                          )}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={8} className="tableDetail address">
                <Card
                  title={translate("customerSalesOrders.master.address")}
                  extra={
                    <button
                      className="btn btn-copy"
                      onClick={() => handleCopyInvoiceAddress()}
                    >
                      <span>
                        <i className="tio-copy" />{" "}
                        {translate("customerSalesOrders.detail.copy")}
                      </span>
                    </button>
                  }
                >
                  <Row>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.nation")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.deliveryNation))}
                        message={model.errors?.deliveryNation}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={NationFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customerSalesOrders.nation"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerSalesOrderRepository.singleListNation
                          }
                          onChange={handleChangeDeliveryNation()}
                          model={model.deliveryNation}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.province")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.deliveryProvince))}
                        message={model.errors?.deliveryProvince}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={ProvinceFilter}
                          placeHolder={translate(
                            "customerSalesOrders.placeholder.province"
                          )}
                          getList={
                            customerSalesOrderRepository.singleListProvince
                          }
                          onChange={handleChangeDeliveryProvince()}
                          model={model.deliveryProvince}
                          disabled={model.deliveryNationId ? false : true}
                          modelFilter={deliveryProvinceFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.district")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.deliveryDistrict))}
                        message={model.errors?.deliveryDistrict}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={DistrictFilter}
                          placeHolder={translate(
                            "customerSalesOrders.placeholder.district"
                          )}
                          getList={
                            customerSalesOrderRepository.singleListDistrict
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.deliveryDistrict)
                          )}
                          model={model.deliveryDistrict}
                          disabled={
                            model.deliveryNationId && model.deliveryProvinceId
                              ? false
                              : true
                          }
                          modelFilter={deliveryDistrictFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.address")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.deliveryAddress))}
                        message={model.errors?.deliveryAddress}
                      >
                        <InputText
                          isMaterial={true}
                          //maxLength={100}
                          value={model.deliveryAddress}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customerSalesOrders.address"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.deliveryAddress)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={24} className="labelDetail">
                      <FormItem
                        label={translate("customerSalesOrders.zipCode")}
                        validateStatus={formService.getValidationStatus<
                          CustomerSalesOrder
                        >(model.errors, nameof(model.deliveryZIPCode))}
                        message={model.errors?.deliveryZIPCode}
                      >
                        <InputText
                          isMaterial={true}
                          //maxLength={10}
                          value={model.deliveryZIPCode}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customerSalesOrders.zipCode"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.deliveryZIPCode)
                          )}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={8} className="tableDetail d-flex">
                <Card
                  title={translate("customerSalesOrders.master.payment")}
                  style={{ width: "100%" }}
                >
                  <Row className="labelDetail">
                    <FormItem
                      label={translate(
                        "customerSalesOrders.generalDiscountPercentage"
                      )}
                      validateStatus={formService.getValidationStatus<
                        CustomerSalesOrder
                      >(model.errors, nameof(model.generalDiscountPercentage))}
                      message={model.errors?.generalDiscountPercentage}
                    >
                      <InputNumber
                        isMaterial={true}
                        //max={100}
                        value={model.generalDiscountPercentage}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "customerSalesOrders.generalDiscountPercentage"
                          ).toLowerCase(),
                        })}
                        onChange={handleChangeGeneralDiscountPercentage}
                      />
                    </FormItem>
                  </Row>
                  <Row className="labelDetail justify-content-between paymentOrder">
                    <div>{translate("customerSalesOrders.subTotal")}</div>
                    <div className="payOrderQuote">
                      {formatNumber(model?.subTotal)}
                    </div>
                  </Row>
                  <Row className="labelDetail justify-content-between paymentOrder">
                    <div>
                      {translate("customerSalesOrders.generalDiscountAmount")}
                    </div>
                    <div className="payOrderQuote">
                      {formatNumber(model?.generalDiscountAmount)}
                    </div>
                  </Row>
                  <Row className="labelDetail justify-content-between paymentOrder">
                    <div>{translate("customerSalesOrders.totalTaxAmount")}</div>
                    <div className="payOrderQuote">
                      {formatNumber(model?.totalTax)}
                    </div>
                  </Row>
                  <Row className="labelDetail justify-content-between paymentOrder">
                    <div className="payAmountOrderQuote">
                      {translate("customerSalesOrders.newTotal")}
                    </div>
                    <div className="payAmountOrderQuote">
                      {formatNumber(model?.total)}
                    </div>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={24} className="tableDetail">
                <Card
                  title={translate("customerSalesOrders.master.paymentStatus")}
                >
                  <div>{customerSalesOrderPaymentHistoryTable}</div>
                  <div className="btnItem">
                    <Row className="w-100">
                      <Col lg={16}></Col>
                      <Col lg={5}>
                        <b>{translate("customerSalesOrders.edit.percentPayment")}:</b>
                      </Col>
                      <Col lg={3} className="d-flex justify-content-end">
                        <b>{percentTotal} %</b>
                      </Col>
                    </Row>
                    <Row className="w-100">
                      <Col lg={16}></Col>
                      <Col lg={5}>
                        <b style={{ fontSize: 16 }}>
                          {translate("customerSalesOrders.edit.totalPayment")}:
                        </b>
                      </Col>
                      <Col lg={3} className="d-flex justify-content-end">
                        <b style={{ fontSize: 16 }}>
                          {formatNumber(valueTotal)} {" VNĐ"}
                        </b>
                      </Col>
                    </Row>
                  </div>
                  <div className="btnItem d-flex justify-content-between">
                    <button
                      className="btn btn-danger"
                      onClick={handleLocalBulkDeletePayment}
                      disabled={canBulkDeletePayment ? false : true}
                    >
                      <span>
                        <i className="tio-delete" />{" "}
                        {translate('general.actions.delete')}
                      </span>
                    </button>
                    <button
                      className="btn btn-create"
                      onClick={handleOpenDetailModal}
                      disabled={model.total ? false : true}
                    >
                      <span>
                        <i className="tio-add" />{" "}
                        {translate("customerSalesOrders.create.paymentStatus")}
                      </span>
                    </button>
                  </div>
                </Card>
              </Col>
            </Row>
          </>
        </div>
      </>
      <AppFooter childrenAction={childrenAction}></AppFooter>
      {customerSalesOrderItem}
      {paymentStatusHistoryModal}
      <AddCustomerModal
        isOpenPreview={isOpenCustomer}
        handleClosePreview={handleToggleOpenCustomer}
        modelLocal={model}
        setModelLocal={handleUpdateNewModel}
        translate={translate}
        isSet={issetCustomer}
        setIsSet={setIsSetCustomer}
      />
    </div>
  );
}

export default CustomerSalesOrderDetail;
