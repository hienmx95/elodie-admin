/* begin general import */
import { Col, Row, Spin } from "antd";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
// import { ASSETS_SVG } from "config/consts";
import { OrganizationFilter } from "models/Organization";
import { Status } from "models/Status";
import { WorkflowDefinition } from "models/WorkflowDefinition";
import { WorkflowTypeFilter } from "models/WorkflowType";
import React from "react";
import { useTranslation } from "react-i18next";
import { workflowDefinitionRepository } from "repositories/workflow-definition-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

interface WorkflowDefinitionDetailModalProps extends ModalProps {
  model: WorkflowDefinition;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<WorkflowDefinition>>;
  loading?: boolean;
}

function WorkflowDefinitionDetailModal(
  props: WorkflowDefinitionDetailModalProps
) {
  const [translate] = useTranslation();

  const {
    model,
    onChangeSimpleField,
    onChangeObjectField,
    onChangeTreeObjectField,
    loading,
  } = props;
  const [statusList] = enumService.useEnumList<Status>(
    workflowDefinitionRepository.singleListStatus
  );

  return (
    <Modal {...props} visibleFooter={!loading} width={1200}>
      {loading ? (
        <div className="loading-block">
          <Spin size="large" />
        </div>
      ) : (
        <div className="page page__detail">
          <div className="page__modal-header w-100">
            <div className="page__modal-header-block"></div>
            <Row className="d-flex">
              <Col lg={24}>
                {model?.id ? (
                  <div className="page__title mr-1">
                    {translate("workflowDefinitions.detail.title")}
                  </div>
                ) : (
                  translate("general.actions.create")
                )}
              </Col>
            </Row>
          </div>
          <div className="w-100 page__detail-tabs">
            <Row>
              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  label={translate("workflowDefinitions.code")}
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
                  >(model.errors, nameof(model.code))}
                  message={model.errors?.code}
                  isRequired={true}
                >
                  <InputText
                    isMaterial={true}
                    value={model.code}
                    placeHolder={translate(
                      "workflowDefinitions.placeholder.code"
                    )}
                    className={"tio-account_square_outlined"}
                    onChange={onChangeSimpleField(nameof(model.code))}
                  />
                </FormItem>
              </Col>
              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  label={translate("workflowDefinitions.workflowType")}
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
                  >(model.errors, nameof(model.workflowType))}
                  message={model.errors?.workflowType}
                  isRequired={true}
                >
                  <Select
                    isMaterial={true}
                    classFilter={WorkflowTypeFilter}
                    placeHolder={translate(
                      "workflowDefinitions.placeholder.workflowType"
                    )}
                    getList={
                      workflowDefinitionRepository.singleListWorkflowType
                    }
                    onChange={onChangeObjectField(nameof(model.workflowType))}
                    model={model.workflowType}
                  />
                </FormItem>
              </Col>

              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  label={translate("workflowDefinitions.name")}
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
                  >(model.errors, nameof(model.name))}
                  message={model.errors?.name}
                  isRequired={true}
                >
                  <InputText
                    isMaterial={true}
                    value={model.name}
                    placeHolder={translate(
                      "workflowDefinitions.placeholder.name"
                    )}
                    className={"tio-account_square_outlined"}
                    onChange={onChangeSimpleField(nameof(model.name))}
                  />
                </FormItem>
              </Col>
              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  label={translate("workflowDefinitions.organization")}
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
                  >(model.errors, nameof(model.organization))}
                  message={model.errors?.organization}
                  isRequired={true}
                >
                  <TreeSelect
                    isMaterial={true}
                    placeHolder={translate(
                      "workflowDefinitions.placeholder.organization"
                    )}
                    selectable={true}
                    classFilter={OrganizationFilter}
                    onChange={onChangeTreeObjectField(
                      nameof(model.organization)
                    )}
                    checkStrictly={true}
                    getTreeData={
                      workflowDefinitionRepository.singleListOrganization
                    }
                    item={model.organization}
                  />
                </FormItem>
              </Col>
              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  label={translate("workflowDefinitions.startDate")}
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
                  >(model.errors, nameof(model.startDate))}
                  message={model.errors?.startDate}
                  isRequired={true}
                >
                  <DatePicker
                    isMaterial={true}
                    value={model.startDate}
                    placeholder={translate(
                      "workflowDefinitions.placeholder.startDate"
                    )}
                    onChange={onChangeSimpleField(nameof(model.startDate))}
                  />
                </FormItem>
              </Col>

              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  label={translate("workflowDefinitions.endDate")}
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
                  >(model.errors, nameof(model.endDate))}
                  message={model.errors?.endDate}
                >
                  <DatePicker
                    isMaterial={true}
                    value={model.endDate}
                    placeholder={translate(
                      "workflowDefinitions.placeholder.endDate"
                    )}
                    onChange={onChangeSimpleField(nameof(model.endDate))}
                  />
                </FormItem>
              </Col>

              <Col lg={12} className="pr-3 mt-3">
                <FormItem
                  validateStatus={formService.getValidationStatus<
                    WorkflowDefinition
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
                    {translate("workflowDefinitions.status")}
                  </span>
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>
      )
      }
    </Modal >
  );
}

export default WorkflowDefinitionDetailModal;
