/* begin general import */
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Model } from "@react3l/react3l/core/model";
import { Col, Row } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import TextArea from "components/Utility/TextArea/TextArea";
import { TFunction } from "i18next";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Customer } from "models/Customer";
import { CustomerGroupingFilter } from "models/CustomerGrouping";
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import { CustomerSource, CustomerSourceFilter } from "models/CustomerSource";
import { DistrictFilter } from "models/District";
import { NationFilter } from "models/Nation";
import { ProfessionFilter } from "models/Profession";
import { ProvinceFilter } from "models/Province";
import { SexFilter } from "models/Sex";
import { StatusFilter } from "models/Status";
import React, { Dispatch, SetStateAction } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupButtonDropdown } from "reactstrap";
import { customerRepository } from "repositories/customer-repository";
import { formService } from "services/form-service";
import nameof from "ts-nameof.macro";
import DatePicker from "../../../../components/Utility/Calendar/DatePicker/DatePicker";
import { useObjectModalHook } from "./AddCustomerModalHook";
/* end individual import */

interface AddObjectModalProps<T extends Model> {
  isOpenPreview: boolean;
  handleClosePreview: () => void;
  modelLocal: CustomerSalesOrder;
  setModelLocal: Dispatch<SetStateAction<CustomerSalesOrder>>;
  translate: TFunction;
  isSet?: boolean;
  setIsSet?: Dispatch<SetStateAction<boolean>>;
}

function AddObjectCustomerModal(props: AddObjectModalProps<any>) {
  const {
    isOpenPreview,
    handleClosePreview,
    modelLocal,
    setModelLocal,
    translate,
    isSet,
    setIsSet
  } = props;
  const {
    customer,
    display,
    displayBlock,
    toggle,
    handleChangeObjectField,
    handleChangeSimpleField,
    onClickhandleSave,
    onclickCLoseModal,
    onChangeCurrency,
    toggleDropDown,
    dropdownOpen,
    dropdownOpen1,
    toggleDropDown1,
    handleChangeNation,
    handleChangeProvince,
    provinceFilter,
    districtFilter,
    customerGroupingFilter,
  } = useObjectModalHook(modelLocal, setModelLocal, handleClosePreview, isSet, setIsSet);

  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={948}
        visibleFooter={false}
      >
        <div className="preview__containter">
          <div className="preview__left-side">
            <div className="preview__body page">
              <div className="preview-title">
                {translate("customer.add.title")}
              </div>
              <div className="preview-content">
                <Row className="pt-3 justify-space-between">
                  <Col lg={11}>
                    <FormItem
                      label={translate("customer.edit.namesex")}
                      validateStatus={formService.getValidationStatus<
                        Customer
                      >(customer.errors, nameof(customer.phone))}
                      message={customer.errors?.phone}
                      isRequired={true}
                    >
                      <Col span={16} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={customer.name}
                          placeHolder={translate("Shared.write", {
                            value: translate(
                              "customer.edit.name"
                            ).toLowerCase(),
                          })}
                          onChange={handleChangeSimpleField(
                            nameof(customer.name)
                          )}
                        />
                      </Col>
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
                            nameof(customer.sex)
                          )}
                          model={customer.sex}
                        />
                      </Col>
                    </FormItem>
                  </Col>
                  <Col lg={2}></Col>
                  <Col lg={11}>
                        <FormItem
                          label={translate("customer.edit.customerResource")}
                          validateStatus={formService.getValidationStatus<
                            Customer
                          >(customer.errors, nameof(customer.customerSource))}
                          message={customer.errors?.customerSource}
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
                              nameof(customer.customerSource)
                            )}
                            model={customer.customerSource}
                          />
                        </FormItem>
                      </Col>
                </Row>
                <Row className="pt-3 justify-space-between">
                  <Col lg={11}>
                    <FormItem
                      label={translate("customer.edit.phone")}
                      validateStatus={formService.getValidationStatus<
                        Customer
                      >(customer.errors, nameof(customer.phone))}
                      message={customer.errors?.phone}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={customer.phone}
                        //maxLength={11}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "customer.edit.phone"
                          ).toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(
                          nameof(customer.phone)
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={2}></Col>
                  <Col lg={11}>
                    <FormItem
                      label={translate("customer.edit.appUser")}
                      validateStatus={formService.getValidationStatus<
                        Customer
                      >(customer.errors, nameof(customer.appUser))}
                      message={customer.errors?.appUser}
                      isRequired={true}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={AppUserFilter}
                        placeHolder={translate("Shared.choose", {
                          value: translate(
                            "customer.edit.appUser"
                          ).toLowerCase(),
                        })}
                        getList={customerRepository.singleListAppUser}
                        onChange={handleChangeObjectField(
                          nameof(customer.appUser)
                        )}
                        model={customer.appUser}
                        render={(user: AppUser) => user?.displayName}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row className="mt-3 mb-4">
                  <div className="w-100 app-footer__actions d-flex justify-content-between">
                    {/* <div>
                      <button
                        className="btn component__btn-primary"
                        onClick={toggle}
                      >
                        <span>
                          {display
                            ? translate("general.collapse")
                            : translate("general.display")}
                          {display ? <UpOutlined className="pl-2" /> : <DownOutlined className="pl-2" />}
                        </span>
                      </button>
                    </div> */}
                    <div>
                      <button
                        className="btn component__btn-cancel mr-2"
                        onClick={onclickCLoseModal}
                      >
                        <span>
                          <i className="tio-clear_circle_outlined mr-2"></i>{" "}
                          {translate("general.button.cancel")}
                        </span>
                      </button>
                      <button
                        className="btn component__btn-primary"
                        onClick={() => onClickhandleSave()}
                      >
                        <span>
                          <i className="tio-save mr-2" />{" "}
                          {translate("general.actions.save")}
                        </span>
                      </button>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddObjectCustomerModal;
