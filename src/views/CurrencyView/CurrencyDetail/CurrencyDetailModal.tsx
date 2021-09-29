/* begin general import */
import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { Currency } from "models/Currency";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { currencyRepository } from "repositories/currency-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

interface CurrencyDetailModalProps extends ModalProps {
  model: Currency;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Currency>>;
  loading?: boolean;
}

function CurrencyDetailModal(props: CurrencyDetailModalProps) {
  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;

  const [translate] = useTranslation();
  const [statusList] = enumService.useEnumList<Status>(
    currencyRepository.singleListStatus
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
                  {translate("currencys.detail.title")}
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
                      label={translate("currencys.code")}
                      validateStatus={formService.getValidationStatus<Currency>(
                        model.errors,
                        nameof(model.code)
                      )}
                      message={model.errors?.code}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        placeHolder={translate("currencys.placeholder.code")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.code))}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("currencys.name")}
                      validateStatus={formService.getValidationStatus<Currency>(
                        model.errors,
                        nameof(model.name)
                      )}
                      message={model.errors?.name}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate("currencys.placeholder.name")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.name))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      validateStatus={formService.getValidationStatus<Currency>(
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
                        {translate("currencys.status")}
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

export default CurrencyDetailModal;
