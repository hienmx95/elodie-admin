/* begin general import */
import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber, {
  DECIMAL,
} from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { Status } from "models/Status";
import { TaxType } from "models/TaxType";
import React from "react";
import { useTranslation } from "react-i18next";
import { taxTypeRepository } from "repositories/tax-type-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

interface TaxTypeDetailModalProps extends ModalProps {
  model: TaxType;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<TaxType>>;
  loading?: boolean;
}

function TaxTypeDetailModal(props: TaxTypeDetailModalProps) {
  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;

  const [translate] = useTranslation();
  const [statusList] = enumService.useEnumList<Status>(
    taxTypeRepository.singleListStatus
  );

  return (
    <Modal {...props} visibleFooter={!loading} width={765}>
      {loading && (
        <div className="loading-block">
          <Spin size="large" />
        </div>
      )}
      <div className="page page__detail">
        <div className="page__modal-header w-100">
          <div className="page__modal-header-block"></div>
          <Row className="d-flex">
            <Col lg={24} className="page__modal-header-title">
              {model?.id ? (
                <div className="page__title mr-1">
                  {translate("taxTypes.detail.title")}
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
                <Row>
                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("taxTypes.code")}
                      validateStatus={formService.getValidationStatus<TaxType>(
                        model.errors,
                        nameof(model.code)
                      )}
                      message={model.errors?.code}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        placeHolder={translate("taxTypes.placeholder.code")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.code))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("taxTypes.percentage")}
                      validateStatus={formService.getValidationStatus<TaxType>(
                        model.errors,
                        nameof(model.percentage)
                      )}
                      message={model.errors?.percentage}
                      isRequired={true}
                    >
                      <InputNumber
                        isMaterial={true}
                        value={model.percentage}
                        placeHolder={translate(
                          "taxTypes.placeholder.percentage"
                        )}
                        onChange={onChangeSimpleField(nameof(model.percentage))}
                        numberType={DECIMAL}
                        className="tio-receipt_outlined"
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} className="pr-3 mt-3">
                    <FormItem
                      label={translate("taxTypes.name")}
                      validateStatus={formService.getValidationStatus<TaxType>(
                        model.errors,
                        nameof(model.name)
                      )}
                      message={model.errors?.name}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate(
                          "taxTypes.placeholder.name"
                        )}
                        className={"tio-comment_vs_outlined"}
                        onChange={onChangeSimpleField(
                          nameof(model.name)
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      validateStatus={formService.getValidationStatus<TaxType>(
                        model.errors,
                        nameof(model.status)
                      )}
                      message={model.errors?.status}
                    >
                      <SwitchStatus
                        checked={
                          model.statusId === statusList[1]?.id ? true : false
                        }
                        list={statusList}
                        onChange={onChangeObjectField(nameof(model.status))}
                      />
                      <span className="component__title ml-2">
                        {translate("taxTypes.status")}
                      </span>
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

export default TaxTypeDetailModal;
