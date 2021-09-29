/* begin general import */
import { Card, Col, Row, Spin, Switch, Tabs } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import { AppUserFilter } from "models/AppUser";
import { NationFilter } from "models/Nation";
import { StatusFilter } from "models/Status";
import { Supplier } from "models/Supplier";
import React from "react";
import { useTranslation } from "react-i18next";
import { supplierRepository } from "repositories/supplier-repository";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

const { TabPane } = Tabs;

interface SupplierDetailModalProps extends ModalProps {
  model: Supplier;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Supplier>>;
  loading?: boolean;
}

function SupplierDetailModal(props: SupplierDetailModalProps) {
  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;

  const [translate] = useTranslation();

  return (
    <Modal {...props} visibleFooter={!loading} width={1200}>
      {loading && (
        <div className="loading-block">
          <Spin size="large" />
        </div>
      )}
      <div className="page page__detail">
        <div className="page__modal-header w-100">
          <Row className="d-flex">
            <Col lg={24}>
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
          <Row className="d-flex">
            <Col lg={24}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={translate("general.detail.generalInfomation")}
                    key="1"
                  >
                    <Row>
                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("suppliers.email")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.email))}
                          message={model.errors?.email}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.email}
                            placeHolder={translate(
                              "suppliers.placeholder.email"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(nameof(model.email))}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("suppliers.ownerName")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.ownerName))}
                          message={model.errors?.ownerName}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.ownerName}
                            placeHolder={translate(
                              "suppliers.placeholder.ownerName"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.ownerName)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("suppliers.used")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.used))}
                          message={model.errors?.used}
                        >
                          <Switch
                            size="small"
                            onChange={onChangeSimpleField(nameof(model.used))}
                            checked={model.used}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("suppliers.nation")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.nation))}
                          message={model.errors?.nation}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={NationFilter}
                            placeHolder={translate(
                              "suppliers.placeholder.nation"
                            )}
                            getList={supplierRepository.singleListNation}
                            onChange={onChangeObjectField(nameof(model.nation))}
                            model={model.nation}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("suppliers.personInCharge")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.personInCharge))}
                          message={model.errors?.personInCharge}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={AppUserFilter}
                            placeHolder={translate(
                              "suppliers.placeholder.personInCharge"
                            )}
                            getList={supplierRepository.singleListAppUser}
                            onChange={onChangeObjectField(
                              nameof(model.personInCharge)
                            )}
                            model={model.personInCharge}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("suppliers.status")}
                          validateStatus={formService.getValidationStatus<
                            Supplier
                          >(model.errors, nameof(model.status))}
                          message={model.errors?.status}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={StatusFilter}
                            placeHolder={translate(
                              "suppliers.placeholder.status"
                            )}
                            getList={supplierRepository.singleListStatus}
                            onChange={onChangeObjectField(nameof(model.status))}
                            model={model.status}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export default SupplierDetailModal;
