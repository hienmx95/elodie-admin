/* begin general import */
import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import FroalaEditor from "components/Utility/FroalaEditor/FroalaEditor";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
// import { ASSETS_SVG } from "config/consts";
import { Status } from "models/Status";
import { WorkflowDefinitionFilter } from "models/WorkflowDefinition";
import { WorkflowStep } from "models/WorkflowStep";
import React from "react";
import { useTranslation } from "react-i18next";
import { workflowStepRepository } from "repositories/workflow-step-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
import './WorkflowStepDetailModal.scss';
/* end individual import */

interface WorkflowStepDetailModalProps extends ModalProps {
  model: WorkflowStep;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<WorkflowStep>>;
  loading?: boolean;
}

function WorkflowStepDetailModal(props: WorkflowStepDetailModalProps) {
  const [translate] = useTranslation();

  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;
  const [statusList] = enumService.useEnumList<Status>(
    workflowStepRepository.singleListStatus
  );

  return (
    <Modal {...props} visibleFooter={!loading} width={1200}>
      {loading ? (
        <div className="loading-block">
          <Spin size="large" />
        </div>
      ) : (
        <div className="page page__detail workflow-step-detail">
          <div className="page__modal-header w-100">
            <div className="page__modal-header-block"></div>
            <Row className="d-flex">
              <Col lg={24}>
                {model?.id ? (
                  <div className="page__title mr-1">
                    {translate("workflowSteps.detail.title")}
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
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowSteps.code")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate(
                            "workflowSteps.placeholder.code"
                          )}
                          className={"tio-account_square_outlined"}
                          onChange={onChangeSimpleField(nameof(model.code))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowSteps.workflowDefinition")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
                        >(model.errors, nameof(model.workflowDefinition))}
                        message={model.errors?.workflowDefinition}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={WorkflowDefinitionFilter}
                          placeHolder={translate(
                            "workflowSteps.placeholder.workflowDefinition"
                          )}
                          getList={
                            workflowStepRepository.singleListWorkflowDefinition
                          }
                          onChange={onChangeObjectField(
                            nameof(model.workflowDefinition)
                          )}
                          model={model.workflowDefinition}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowSteps.name")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
                        >(model.errors, nameof(model.name))}
                        message={model.errors?.name}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate(
                            "workflowSteps.placeholder.name"
                          )}
                          className={"tio-account_square_outlined"}
                          onChange={onChangeSimpleField(nameof(model.name))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowSteps.role")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
                        >(model.errors, nameof(model.role))}
                        message={model.errors?.role}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={WorkflowDefinitionFilter}
                          placeHolder={translate(
                            "workflowSteps.placeholder.role"
                          )}
                          getList={workflowStepRepository.singleListRole}
                          onChange={onChangeObjectField(nameof(model.role))}
                          model={model.role}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
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
                          {translate("unitOfMeasures.status")}
                        </span>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowSteps.subjectMailForReject")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
                        >(model.errors, nameof(model.subjectMailForReject))}
                        message={model.errors?.subjectMailForReject}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.subjectMailForReject}
                          placeHolder={translate(
                            "workflowSteps.placeholder.subjectMailForReject"
                          )}
                          className={"tio-account_square_outlined"}
                          onChange={onChangeSimpleField(
                            nameof(model.subjectMailForReject)
                          )}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={24} className=" mt-3 workflow-step__text-input">
                      <FormItem
                        label={translate("workflowSteps.bodyMailForReject")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowStep
                        >(model.errors, nameof(model.bodyMailForReject))}
                        message={model.errors?.bodyMailForReject}
                      >
                        <FroalaEditor
                          value={model.bodyMailForReject}
                          onChange={onChangeSimpleField(nameof(model.bodyMailForReject))}
                          placeholder="Nhập nội dung"

                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default WorkflowStepDetailModal;
