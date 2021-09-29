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
import { WorkflowDirection } from "models/WorkflowDirection";
import { appUserRepository } from "repositories/app-user-repository";
import { workflowDirectionRepository } from "repositories/workflow-direction-repository";
import { WorkflowStepFilter } from "models/WorkflowStep";
import { StatusFilter } from "models/Status";
import { WorkflowDefinitionFilter } from "models/WorkflowDefinition";
/* end individual import */

const { TabPane } = Tabs;

interface WorkflowDirectionDetailModalProps extends ModalProps {
  model: WorkflowDirection;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<WorkflowDirection>>;
  loading?: boolean;
}

function WorkflowDirectionDetailModal(
  props: WorkflowDirectionDetailModalProps
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
                  {translate("workflowDirections.detail.title")}
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
                          label={translate(
                            "workflowDirections.subjectMailForCreator"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.subjectMailForCreator))}
                          message={model.errors?.subjectMailForCreator}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.subjectMailForCreator}
                            placeHolder={translate(
                              "workflowDirections.placeholder.subjectMailForCreator"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.subjectMailForCreator)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirections.subjectMailForCurrentStep"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(
                            model.errors,
                            nameof(model.subjectMailForCurrentStep)
                          )}
                          message={model.errors?.subjectMailForCurrentStep}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.subjectMailForCurrentStep}
                            placeHolder={translate(
                              "workflowDirections.placeholder.subjectMailForCurrentStep"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.subjectMailForCurrentStep)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirections.subjectMailForNextStep"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.subjectMailForNextStep))}
                          message={model.errors?.subjectMailForNextStep}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.subjectMailForNextStep}
                            placeHolder={translate(
                              "workflowDirections.placeholder.subjectMailForNextStep"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.subjectMailForNextStep)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirections.bodyMailForCreator"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.bodyMailForCreator))}
                          message={model.errors?.bodyMailForCreator}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.bodyMailForCreator}
                            placeHolder={translate(
                              "workflowDirections.placeholder.bodyMailForCreator"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.bodyMailForCreator)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirections.bodyMailForCurrentStep"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.bodyMailForCurrentStep))}
                          message={model.errors?.bodyMailForCurrentStep}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.bodyMailForCurrentStep}
                            placeHolder={translate(
                              "workflowDirections.placeholder.bodyMailForCurrentStep"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.bodyMailForCurrentStep)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirections.bodyMailForNextStep"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.bodyMailForNextStep))}
                          message={model.errors?.bodyMailForNextStep}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.bodyMailForNextStep}
                            placeHolder={translate(
                              "workflowDirections.placeholder.bodyMailForNextStep"
                            )}
                            className={"tio-account_square_outlined"}
                            onChange={onChangeSimpleField(
                              nameof(model.bodyMailForNextStep)
                            )}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("workflowDirections.fromStep")}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.fromStep))}
                          message={model.errors?.fromStep}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={WorkflowStepFilter}
                            placeHolder={translate(
                              "workflowDirections.placeholder.fromStep"
                            )}
                            getList={
                              workflowDirectionRepository.singleListWorkflowStep
                            }
                            onChange={onChangeObjectField(
                              nameof(model.fromStep)
                            )}
                            model={model.fromStep}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("workflowDirections.status")}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.status))}
                          message={model.errors?.status}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={StatusFilter}
                            placeHolder={translate(
                              "workflowDirections.placeholder.status"
                            )}
                            getList={
                              workflowDirectionRepository.singleListStatus
                            }
                            onChange={onChangeObjectField(nameof(model.status))}
                            model={model.status}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate("workflowDirections.toStep")}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.toStep))}
                          message={model.errors?.toStep}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={WorkflowStepFilter}
                            placeHolder={translate(
                              "workflowDirections.placeholder.toStep"
                            )}
                            getList={
                              workflowDirectionRepository.singleListWorkflowStep
                            }
                            onChange={onChangeObjectField(nameof(model.toStep))}
                            model={model.toStep}
                          />
                        </FormItem>
                      </Col>

                      <Col lg={12} className="pr-3">
                        <FormItem
                          label={translate(
                            "workflowDirections.workflowDefinition"
                          )}
                          validateStatus={formService.getValidationStatus<
                            WorkflowDirection
                          >(model.errors, nameof(model.workflowDefinition))}
                          message={model.errors?.workflowDefinition}
                        >
                          <Select
                            isMaterial={true}
                            classFilter={WorkflowDefinitionFilter}
                            placeHolder={translate(
                              "workflowDirections.placeholder.workflowDefinition"
                            )}
                            getList={
                              workflowDirectionRepository.singleListWorkflowDefinition
                            }
                            onChange={onChangeObjectField(
                              nameof(model.workflowDefinition)
                            )}
                            model={model.workflowDefinition}
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

export default WorkflowDirectionDetailModal;
