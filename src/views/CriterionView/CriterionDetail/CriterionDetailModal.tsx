/* begin general import */
import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber, {
  DECIMAL,
} from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { Criterion } from "models/Criterion";
import { CriterionTypeFilter } from "models/CriterionType";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { criterionRepository } from "repositories/criterion-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

interface CriterionDetailModalProps extends ModalProps {
  model: Criterion;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Criterion>>;
  loading?: boolean;
}

function CriterionDetailModal(props: CriterionDetailModalProps) {
  const [translate] = useTranslation();

  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;
  const [statusList] = enumService.useEnumList<Status>(
    criterionRepository.singleListStatus
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
                  {translate("criterions.detail.title")}
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
                      label={translate("criterions.name")}
                      validateStatus={formService.getValidationStatus<
                        Criterion
                      >(model.errors, nameof(model.name))}
                      message={model.errors?.name}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate("criterions.placeholder.name")}
                        className={"tio-filter_list"}
                        onChange={onChangeSimpleField(nameof(model.name))}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("criterions.description")}
                      validateStatus={formService.getValidationStatus<
                        Criterion
                      >(model.errors, nameof(model.description))}
                      message={model.errors?.description}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.description}
                        placeHolder={translate(
                          "criterions.placeholder.description"
                        )}
                        className={"tio-comment_text_outlined"}
                        onChange={onChangeSimpleField(
                          nameof(model.description)
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("criterions.criterionType")}
                      validateStatus={formService.getValidationStatus<
                        Criterion
                      >(model.errors, nameof(model.criterionType))}
                      message={model.errors?.criterionTypeId}
                      isRequired={true}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={CriterionTypeFilter}
                        placeHolder={translate(
                          "criterions.placeholder.criterionType"
                        )}
                        getList={criterionRepository.singleListCriterionType}
                        onChange={onChangeObjectField(
                          nameof(model.criterionType)
                        )}
                        model={model.criterionType}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3 mt-5">
                    <FormItem
                      validateStatus={formService.getValidationStatus<
                        Criterion
                      >(model.errors, nameof(model.status))}
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
                        {translate("criterions.status")}
                      </span>
                    </FormItem>
                  </Col>
                  {model.criterionTypeId === 2 && (
                    <Col lg={12} className="pr-3">
                      <FormItem
                        label={translate("criterions.maxScore")}
                        validateStatus={formService.getValidationStatus<
                          Criterion
                        >(model.errors, nameof(model.maxScore))}
                        message={model.errors?.maxScore}
                      >
                        <InputNumber
                          isMaterial={true}
                          value={model.maxScore}
                          placeHolder={translate(
                            "criterions.placeholder.maxScore"
                          )}
                          onChange={onChangeSimpleField(nameof(model.maxScore))}
                          numberType={DECIMAL}
                        />
                      </FormItem>
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export default CriterionDetailModal;
