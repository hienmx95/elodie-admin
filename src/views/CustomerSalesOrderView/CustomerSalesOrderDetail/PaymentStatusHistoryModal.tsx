import { Card, Col, Row } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import { CustomerSalesOrderPaymentHistory } from "models/CustomerSalesOrderPaymentHistory";
import { PaymentTypeFilter } from "models/PaymentType";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import { formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

interface PaymentStatusHistoryModalProps extends ModalProps {
  model: CustomerSalesOrderPaymentHistory;
  setModel: Dispatch<SetStateAction<CustomerSalesOrderPaymentHistory>>;
  onChangeSimpleField?: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  isDetail?: boolean;
  totalAmount?: number;
  valueTotal?: number;
  percentTotal?: number;
}

function PaymentStatusHistoryModal(props: PaymentStatusHistoryModalProps) {

  const {
    model,
    onChangeSimpleField,
    onChangeObjectField,
    setModel,
    totalAmount,
  } = props;

  const [translate] = useTranslation();
  const onChangePercent = React.useCallback(() => {
    return (value) => {
      setModel({
        ...model,
        paymentPercentage: value,
        paymentAmount: Number((+(value / 100) * totalAmount).toFixed(2)),
      });
    };
  }, [setModel, model, totalAmount]);

  const onChangeAmount = React.useCallback(() => {
    return (value) => {
      setModel({
        ...model,
        paymentPercentage: Number((+(value / totalAmount) * 100).toFixed(2)),
        paymentAmount: value,
      });
    };
  }, [setModel, model, totalAmount]);
  return (
    <Modal {...props} width={576}>
      <div className="page page__detail">
        <div className="page__modal-header w-100">
          <Row className="d-flex">
            <Col lg={24} className="page__modal-header-title">
              {model?.id ? (
                <div className="page__title mr-1">
                  {translate("customerSalesOrderPaymentHistorys.edit.title")}
                </div>
              ) : (
                translate("customerSalesOrderPaymentHistorys.create.title")
              )}
            </Col>
          </Row>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row className="">
            <Col lg={24}>
              <Card>
                <Row>
                  <Col lg={24} className="pt-3">
                    <FormItem
                      label={translate("customerSalesOrderPaymentHistorys.paymentMilestone")}
                      validateStatus={formService.getValidationStatus<
                        CustomerSalesOrderPaymentHistory
                      >(model.errors, nameof(model.paymentMilestone))}
                      message={model.errors?.paymentMilestone}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.paymentMilestone}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "customerSalesOrderPaymentHistorys.paymentMilestone"
                          ).toLowerCase(),
                        })}
                        onChange={onChangeSimpleField(nameof(model.paymentMilestone))}
                        //maxLength={255}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} className="pt-3">
                    <FormItem
                      label={translate("customerSalesOrderPaymentHistorys.paymentPercentage")}
                      validateStatus={formService.getValidationStatus<
                        CustomerSalesOrderPaymentHistory
                      >(model.errors, nameof(model.paymentPercentage))}
                      message={model.errors?.paymentPercentage}
                      isRequired={true}
                    >
                      <InputNumber
                        isMaterial={true}
                        value={model.paymentPercentage}
                        onChange={onChangePercent()}
                        //max={100 - percentTotal}
                        //min={0}
                        decimalDigit={2}
                        numberType={"DECIMAL"}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "customerSalesOrderPaymentHistorys.paymentPercentage"
                          ).toLowerCase(),
                        })}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} className="pt-3">
                    <FormItem
                      label={translate("customerSalesOrderPaymentHistorys.paymentAmount")}
                      validateStatus={formService.getValidationStatus<
                        CustomerSalesOrderPaymentHistory
                      >(model.errors, nameof(model.paymentAmount))}
                      message={model.errors?.paymentAmount}
                      isRequired={true}
                    >
                      <InputNumber
                        isMaterial={true}
                        value={model.paymentAmount}
                        numberType={"DECIMAL"}
                        decimalDigit={2}
                        // max={totalAmount - valueTotal}
                        onChange={onChangeAmount()}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "customerSalesOrderPaymentHistorys.paymentAmount"
                          ).toLowerCase(),
                        })}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} className="pt-3">
                    <FormItem
                      label={translate("customerSalesOrderPaymentHistorys.paymentMethod")}
                      validateStatus={formService.getValidationStatus<
                        CustomerSalesOrderPaymentHistory
                      >(model.errors, nameof(model.paymentType))}
                      message={model.errors?.paymentType}
                      isRequired={true}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={PaymentTypeFilter}
                        placeHolder={translate("Shared.choose", {
                          value: translate(
                            "customerSalesOrderPaymentHistorys.paymentMethod"
                          ).toLowerCase(),
                        })}
                        getList={
                          customerSalesOrderRepository.singleListPaymentType
                        }
                        onChange={onChangeObjectField(
                          nameof(model.paymentType)
                        )}
                        model={model.paymentType}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} className="pt-3">
                    <FormItem
                      label={translate("customerSalesOrderPaymentHistorys.description")}
                      validateStatus={formService.getValidationStatus<
                        CustomerSalesOrderPaymentHistory
                      >(model.errors, nameof(model.description))}
                      message={model.errors?.description}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.description}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "customerSalesOrderPaymentHistorys.description"
                          ).toLowerCase(),
                        })}
                        onChange={onChangeSimpleField(nameof(model.description))}
                        //maxLength={500}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export default PaymentStatusHistoryModal;
