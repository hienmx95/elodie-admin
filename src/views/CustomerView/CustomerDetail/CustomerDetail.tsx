import { CaretRightOutlined } from "@ant-design/icons";
import { Checkbox, Col, Collapse, Row, Steps, Table, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import { DECIMAL } from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import CategorySelect from "components/Utility/CategorySelect/CategorySelect";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import UploadFile, { UPLOADTYPE } from "components/Utility/UploadFile/UploadFile";
import { CUSTOMER_MASTER_ROUTE } from "config/route-consts";
import { BrandFilter } from "models/Brand";
import { CategoryFilter } from "models/Category/CategoryFilter";
import { Customer } from "models/Customer";
import { ProductGroupingFilter } from "models/ProductGrouping";
import { ProductImageMapping } from "models/ProductImageMapping";
import { ProductProductGroupingMapping } from "models/ProductProductGroupingMapping";
import { ProductTypeFilter } from "models/ProductType";
import { TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { UnitOfMeasureGroupingFilter } from "models/UnitOfMeasureGrouping/UnitOfMeasureGroupingFilter";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { customerRepository } from "repositories/customer-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import "./ProductDetail.scss";
import { useCustomerDetailHook } from "./CustomerDetailHook/CustomerDetailHook";
import { useCustomerFooter } from "./CustomerDetailHook/CustomerFooterHook";
import { CustomerGroupingFilter } from "models/CustomerGrouping";
import { CustomerSourceFilter } from "models/CustomerSource";
import { DistrictFilter } from "models/District";
import { NationFilter } from "models/Nation";
import { ProfessionFilter } from "models/Profession";
import { ProvinceFilter } from "models/Province";
import { SexFilter } from "models/Sex";
import { StatusFilter } from "models/Status";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import { AppUser, AppUserFilter } from "models/AppUser";

const { Panel } = Collapse;

function CustomerDetail() {
  const [translate] = useTranslation();
  const {
    model,
    isDetail,
    handleUpdateNewModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<Customer>(
    Customer,
    customerRepository.get,
    customerRepository.save,
    CUSTOMER_MASTER_ROUTE
  );
  
  const {
    display,
    dropdownOpen,
    onChangeCurrency,
    toggleDropDown,
    dropdownOpen1,
    toggleDropDown1,
    handleToggleOpenCompany,
    isOpenCompany,
    handleChangeNation,
    handleChangeProvince,
    provinceFilter,
    districtFilter,
  } = useCustomerDetailHook(model, handleUpdateNewModel);


  const { childrenAction } = useCustomerFooter(
    translate,
    model,
    handleSave,
    handleGoBase
  );

  return (
    <>
      <div className="w-100 mt-3 page__detail-tabs">
          <Row className="d-flex">
            <Col lg={24}>
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Panel
                  header={translate("Thông tin chung")}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.namesex")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.name))}
                        message={model.errors?.name}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customer.edit.name"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.name)
                          )}
                        />
                        <Col span={8}>
                          <Select
                            isMaterial={true}
                            classFilter={SexFilter}
                            placeHolder={translate("Shared.choose", {
                              value: translate(
                                "customer.edit.sex"
                              ).toLowerCase(),
                            })}
                            getList={customerRepository.singleListSex}
                            onChange={handleChangeObjectField(
                              nameof(model.sex)
                            )}
                            model={model.sex}
                          />
                        </Col>
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.phone")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.phone))}
                        message={model.errors?.phone}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.phone}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customer.edit.phone"
                            ).toLowerCase(),
                          })}
                          className={"tio-layers"}
                          onBlur={handleChangeSimpleField(
                            nameof(model.phone)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.nation")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.nation))}
                        message={model.errors?.nation}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={NationFilter}
                          placeHolder={translate("customer.master.placeholder.nation")}
                          getList={customerRepository.singleListNation}
                          onChange={handleChangeNation()}
                          model={model.nation}
                        />
                      </FormItem>
                    </Col>
                    
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.dayofBirth")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.birthday))}
                        message={model.errors?.birthday}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.birthday}
                          disabledDate={(d) => d.isAfter(new Date(new Date().setDate(new Date().getDate()-1)))}
                          placeholder={translate("Shared.choose", {
                            value: translate(
                              "customer.edit.dayofBirth"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.birthday)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.email")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.email))}
                        message={model.errors?.email}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.email}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customer.edit.email"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.email)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.province")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.province))}
                        message={model.errors?.province}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={ProvinceFilter}
                          placeHolder={translate(
                            "customer.master.placeholder.province"
                          )}
                          getList={customerRepository.singleListProvince}
                          onChange={handleChangeProvince()}
                          model={model.province}
                          disabled={model.nationId ? false : true}
                          modelFilter={provinceFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.professtion")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.profession))}
                        message={model.errors?.profession}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={ProfessionFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customer.edit.professtion"
                            ).toLowerCase(),
                          })}
                          getList={customerRepository.singleListProfession}
                          onChange={handleChangeObjectField(
                            nameof(model.profession)
                          )}
                          model={model.profession}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.customerResource")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.customerSource))}
                        message={model.errors?.customerSource}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={CustomerSourceFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customer.edit.customerResource"
                            ).toLowerCase(),
                          })}
                          getList={
                            customerRepository.singleListCustomerSource
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.customerSource)
                          )}
                          model={model.customerSource}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.district")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.district))}
                        message={model.errors?.district}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={DistrictFilter}
                          placeHolder={translate(
                            "customer.master.placeholder.district"
                          )}
                          modelFilter={districtFilter}
                          getList={customerRepository.singleListDistrict}
                          onChange={handleChangeObjectField(
                            nameof(model.district)
                          )}
                          model={model.district}
                          disabled={
                            model.nationId && model.provinceId ? false : true
                          }
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                   
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.appUser")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.appUser))}
                        message={model.errors?.appUser}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={AppUserFilter}
                          searchProperty={nameof(model.appUser.displayName)}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customer.edit.appUser"
                            ).toLowerCase(),
                          })}
                          getList={customerRepository.singleListAppUser}
                          onChange={handleChangeObjectField(
                            nameof(model.appUser)
                          )}
                          model={model.appUser}
                          render={(user: AppUser) => user?.displayName}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.statusCustomer")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.status))}
                        message={model.errors?.status}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={StatusFilter}
                          placeHolder={translate("Shared.choose", {
                            value: translate(
                              "customer.edit.statusCustomer"
                            ).toLowerCase(),
                          })}
                          getList={customerRepository.singleListStatus}
                          onChange={handleChangeObjectField(
                            nameof(model.status)
                          )}
                          model={model.status}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("customer.edit.address")}
                        validateStatus={formService.getValidationStatus<
                          Customer
                        >(model.errors, nameof(model.address))}
                        message={model.errors?.address}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.address}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customer.edit.address"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(model.address)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                        
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default CustomerDetail;
