/* begin general import */
import React, { useContext, Dispatch } from "react";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Spin, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { AppAction, AppState } from "app/app-store";
import { AppStoreContext } from "app/app-context";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import FormItem from "components/Utility/FormItem/FormItem";
import { FormDetailAction, formService } from "services/form-service";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { discussionRepository } from "repositories/discussion-repository";
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { WorkflowDirectionCondition } from "models/WorkflowDirectionCondition";
import { appUserRepository } from "repositories/app-user-repository";
import { workflowDirectionConditionRepository } from "repositories/workflow-direction-condition-repository";
import { WorkflowDirectionFilter } from "models/WorkflowDirection";
import { WorkflowOperatorFilter } from "models/WorkflowOperator";
import { WorkflowParameterFilter } from "models/WorkflowParameter";
/* end individual import */

const { TabPane } = Tabs;

interface WorkflowDirectionConditionDetailModalProps extends ModalProps {
  model: WorkflowDirectionCondition;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<WorkflowDirectionCondition>>;
  loading?: boolean;
}

function WorkflowDirectionConditionDetailModal(
  props: WorkflowDirectionConditionDetailModalProps
) {
  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const [translate] = useTranslation();

  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;

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
                  {translate("workflowDirectionConditions.detail.title")}
                </div>
              ) : (
                translate("general.actions.create")
              )}
            </Col>
          </Row>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row className="d-flex">
            <Col lg={16}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={translate("general.detail.generalInfomation")}
                    key="1"
                  >
                    <Row>
                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("workflowDirectionConditions.value")}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirectionCondition
                          >(model.errors, nameof(model.value))}
                          message={model.errors?.value}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.value}
                            placeHolder={translate(
                              "workflowDirectionConditions.placeholder.value"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(nameof(model.value))}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirectionConditions.workflowDirection"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirectionCondition
                          >(model.errors, nameof(model.workflowDirection))}
                          message={model.errors?.workflowDirection}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={WorkflowDirectionFilter}
                            placeHolder={translate(
                              "workflowDirectionConditions.placeholder.workflowDirection"
                            )}
                            getList={
                              workflowDirectionConditionRepository.singleListWorkflowDirection
                            }
                            onChange={onChangeObjectField(
                              nameof(model.workflowDirection)
                            )}
                            model={model.workflowDirection}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirectionConditions.workflowOperator"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirectionCondition
                          >(model.errors, nameof(model.workflowOperator))}
                          message={model.errors?.workflowOperator}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={WorkflowOperatorFilter}
                            placeHolder={translate(
                              "workflowDirectionConditions.placeholder.workflowOperator"
                            )}
                            getList={
                              workflowDirectionConditionRepository.singleListWorkflowOperator
                            }
                            onChange={onChangeObjectField(
                              nameof(model.workflowOperator)
                            )}
                            model={model.workflowOperator}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirectionConditions.workflowParameter"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirectionCondition
                          >(model.errors, nameof(model.workflowParameter))}
                          message={model.errors?.workflowParameter}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={WorkflowParameterFilter}
                            placeHolder={translate(
                              "workflowDirectionConditions.placeholder.workflowParameter"
                            )}
                            getList={
                              workflowDirectionConditionRepository.singleListWorkflowParameter
                            }
                            onChange={onChangeObjectField(
                              nameof(model.workflowParameter)
                            )}
                            model={model.workflowParameter}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
            <Col lg={8}>
              <Card>
                <ChatBox
                  getMessages={discussionRepository.list}
                  countMessages={discussionRepository.count}
                  postMessage={discussionRepository.create}
                  deleteMessage={discussionRepository.delete}
                  attachFile={discussionRepository.import}
                  suggestList={appUserRepository.list}
                  discussionId={model.rowId}
                  userInfo={state.user}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export default WorkflowDirectionConditionDetailModal;
