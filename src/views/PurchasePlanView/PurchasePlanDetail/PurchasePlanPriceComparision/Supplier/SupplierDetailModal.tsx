/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import UploadFile from "components/Utility/UploadFile/UploadFile";
import { ASSETS_SVG } from "config/consts";
import { Status } from "models/Status";
import { Supplier } from "models/Supplier";
import React from "react";
import { useTranslation } from "react-i18next";
import { supplierRepository } from "repositories/supplier-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

const { Panel } = Collapse;

interface SupplierDetailModalProps extends ModalProps {
  model: Supplier;
  handleChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  handleChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  loading?: boolean;
}

function SupplierDetailModal(props: SupplierDetailModalProps) {
  const [translate] = useTranslation();

  const {
    model,
    handleChangeSimpleField,
    handleChangeObjectField,
    loading,
  } = props;

  const [statusList] = enumService.useEnumList<Status>(
    supplierRepository.singleListStatus
  );

  return (
    <Modal {...props} width={842}>
      {loading ? (
        <div className="loading-block">
          <img src={ASSETS_SVG + "/spinner.svg"} alt="Loading..." />
        </div>
      ) : (
        <div className="page page__detail">
          <div className="page__modal-header w-100">
            <div className="page__modal-header-block"></div>
            <Row className="d-flex">
              <Col lg={24} className="page__modal-header-title">
                {model?.id ? (
                  <div className="page__title mr-1">
                    {translate("suppliers.detail.title")}
                  </div>
                ) : (
                  translate("general.actions.create")
                )}
              </Col>
            </Row>
          </div>
          <div className="w-100 page__detail-tabs">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={24} className="gutter-row">
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={() => {}}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                  expandIconPosition="right"
                >
                  <Panel
                    header={"Thông tin chung"}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    <Row>
                      <Col lg={24}>
                        <div className="upload-file__container">
                          <UploadFile />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={24} className="pr-3 mt-3">
                        <FormItem
                          label={translate("suppliers.name")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.name))}
                          message={model.errors?.name}
                          isRequired={true}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.name}
                            placeHolder={translate(
                              "suppliers.placeholder.name"
                            )}
                            className={"tio-shopping"}
                            onChange={handleChangeSimpleField(
                              nameof(model.name)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={12} className="pr-3 mt-3">
                        <FormItem
                          label={translate("suppliers.code")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.code))}
                          message={model.errors?.code}
                          isRequired={true}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.code}
                            placeHolder={translate(
                              "suppliers.placeholder.code"
                            )}
                            className={"tio-format_bullets"}
                            onChange={handleChangeSimpleField(
                              nameof(model.code)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={12} className="pr-3 mt-3">
                        <FormItem
                          label={translate("suppliers.taxCode")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.taxCode))}
                          message={model.errors?.taxCode}
                          isRequired={true}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.taxCode}
                            placeHolder={translate(
                              "suppliers.placeholder.taxCode"
                            )}
                            className={"tio-receipt_outlined"}
                            onChange={handleChangeSimpleField(
                              nameof(model.taxCode)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={12} className="pr-3 mt-3">
                        <FormItem
                          label={translate("suppliers.phone")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.phone))}
                          message={model.errors?.phone}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.phone}
                            placeHolder={translate(
                              "suppliers.placeholder.phone"
                            )}
                            className={"tio-call"}
                            onChange={handleChangeSimpleField(
                              nameof(model.phone)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={12} className="mt-5">
                        <FormItem>
                          <SwitchStatus
                            checked={
                              model.statusId === statusList[1]?.id
                                ? true
                                : false
                            }
                            list={statusList}
                            onChange={handleChangeObjectField(
                              nameof(model.status)
                            )}
                          />
                          <span className="component__title ml-2">
                            {translate("suppliers.status")}
                          </span>
                        </FormItem>
                      </Col>
                      <Col lg={24} className="pr-3 mt-3">
                        <FormItem
                          label={translate("suppliers.description")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.description))}
                          message={model.errors?.description}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.description}
                            placeHolder={translate(
                              "suppliers.placeholder.description"
                            )}
                            className={"tio-comment_text_outlined"}
                            onChange={handleChangeSimpleField(
                              nameof(model.description)
                            )}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default SupplierDetailModal;
