import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import { ContentTable } from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import FroalaEditor from "components/Utility/FroalaEditor/FroalaEditor";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { WORKFLOW_DIRECTION_MASTER_ROUTE } from "config/route-consts";
import { Status } from "models/Status";
import { WorkflowDefinitionFilter } from "models/WorkflowDefinition";
import { WorkflowDirection } from "models/WorkflowDirection";
import { WorkflowStepFilter } from "models/WorkflowStep";
import React from "react";
import { useTranslation } from "react-i18next";
import { workflowDirectionRepository } from "repositories/workflow-direction-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import { queryStringService } from "services/query-string-service";
import nameof from "ts-nameof.macro";
import "./WorkflowDirectionDetail.scss";
import { useWorkflowDirectionConditionTable } from "./WorkflowDirectionDetailHook/WorkflowDirectionConditionHook";
import { useWorkflowDirectionFooterHook } from "./WorkflowDirectionDetailHook/WorkflowDirectionFooterHook";

const { Panel } = Collapse;

function WorkflowDirectionDetail() {
  const [translate] = useTranslation();
  const [workflowStepFilter, setWorkflowStepFilter] = React.useState<
    WorkflowStepFilter
  >(new WorkflowStepFilter());

  const { id }: any = queryStringService.useGetQueryString(
    "workflowDefinitionId"
  );
  const [initData, SetData] = React.useState<WorkflowDirection>(new WorkflowDirection());
  const [loadList, setLoadList] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (id) {
      if (loadList) {
        const filter = new WorkflowDefinitionFilter();
        filter.id.equal = id;
        workflowDirectionRepository.singleListWorkflowDefinition(filter)
          .subscribe((res) => {
            initData.workflowDefinition = res[0];
            initData.workflowDefinitionId = res[0].id;
            SetData(initData);
            setLoadList(false);
          });
      }
    }
  }, [id, initData, loadList]);

  const {
    model,
    handleUpdateNewModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<WorkflowDirection>(
    WorkflowDirection,
    workflowDirectionRepository.get,
    workflowDirectionRepository.save,
    WORKFLOW_DIRECTION_MASTER_ROUTE,
    initData,
  );
  const [statusList] = enumService.useEnumList<Status>(
    workflowDirectionRepository.singleListStatus
  );
  const {
    workflowDirectionConditionFilter,
    workflowDirectionConditionList,
    loadWorkflowDirectionConditionList,
    workflowDirectionConditionTotal,
    handleAddWorkflowDirectionConditionContent,
    handleWorkflowDirectionConditionTableChange,
    handleWorkflowDirectionConditionPagination,
    canBulkDeleteWorkflowDirectionConditionContent,
    handleLocalBulkDeleteWorkflowDirectionConditionContent,
    workflowDirectionConditionRef,
    handleClickWorkflowDirectionConditionContent,
    handleImportWorkflowDirectionConditionContent,
    handleExportWorkflowDirectionConditionContent,
    handleExportTemplateWorkflowDirectionConditionContent,
    workflowDirectionConditionColumns,
  } = useWorkflowDirectionConditionTable(model, handleUpdateNewModel);
  const workflowDirectionConditionTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={workflowDirectionConditionFilter}
        list={workflowDirectionConditionList}
        loadingList={loadWorkflowDirectionConditionList}
        total={workflowDirectionConditionTotal}
        handleTableChange={handleWorkflowDirectionConditionTableChange}
        rowSelection={null}
        handleLocalBulkDelete={
          handleLocalBulkDeleteWorkflowDirectionConditionContent
        }
        canBulkDelete={canBulkDeleteWorkflowDirectionConditionContent}
        handleExportContent={handleExportWorkflowDirectionConditionContent}
        handleExportTemplateContent={
          handleExportTemplateWorkflowDirectionConditionContent
        }
        handlePagination={handleWorkflowDirectionConditionPagination}
        handleAddContent={handleAddWorkflowDirectionConditionContent}
        ref={workflowDirectionConditionRef}
        handleClick={handleClickWorkflowDirectionConditionContent}
        handleImportContentList={handleImportWorkflowDirectionConditionContent}
        columns={workflowDirectionConditionColumns}
        hasAddContentInline={true}
        isShowTitle={false}
        isShowFooter={false}
        hasWriteContentPermission={true}
      />
    ),
    [
      canBulkDeleteWorkflowDirectionConditionContent,
      handleAddWorkflowDirectionConditionContent,
      handleClickWorkflowDirectionConditionContent,
      handleExportTemplateWorkflowDirectionConditionContent,
      handleExportWorkflowDirectionConditionContent,
      handleImportWorkflowDirectionConditionContent,
      handleLocalBulkDeleteWorkflowDirectionConditionContent,
      handleWorkflowDirectionConditionPagination,
      handleWorkflowDirectionConditionTableChange,
      loadWorkflowDirectionConditionList,
      model,
      workflowDirectionConditionColumns,
      workflowDirectionConditionFilter,
      workflowDirectionConditionList,
      workflowDirectionConditionRef,
      workflowDirectionConditionTotal,
    ]
  );
  const { childrenAction } = useWorkflowDirectionFooterHook(
    translate,
    model,
    handleGoBase,
    handleSave
  );
  const handleChangeWorkflowDefinition = React.useCallback(
    (value, object) => {
      const newModel = { ...model };
      newModel.workflowDefinition = object;
      newModel.workflowDefinitionId = value;
      if (workflowStepFilter.workflowDefinitionId.equal !== value) {
        newModel.fromStep = undefined;
        newModel.fromStepId = undefined;
        newModel.toStepId = undefined;
        newModel.toStep = undefined;
      }
      workflowStepFilter.workflowDefinitionId.equal = value;
      setWorkflowStepFilter(workflowStepFilter);
      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model, workflowStepFilter]
  );
  return (
    <>
      <div className="page__detail-tabs workflow-direction-detail">
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={12} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
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
                  style={{ height: '500px' }}

                >
                  <Row>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate(
                          "workflowDirections.workflowDefinition"
                        )}
                        validateStatus={formService.getValidationStatus<
                          WorkflowDirection
                        >(model.errors, nameof(model.workflowDefinition))}
                        message={model.errors?.workflowDefinition}
                        isRequired={true}
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
                          onChange={handleChangeWorkflowDefinition}
                          model={model.workflowDefinition}
                          disabled={id ? true : false}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-5">
                      <FormItem
                        validateStatus={formService.getValidationStatus<
                          WorkflowDirection
                        >(model.errors, nameof(model.status))}
                        message={model.errors?.status}
                      >
                        <SwitchStatus
                          checked={
                            model.statusId === statusList[1]?.id ? true : false
                          }
                          list={statusList}
                          onChange={handleChangeObjectField(
                            nameof(model.status)
                          )}
                        />
                        <span className="component__title ml-2">
                          {translate("workflowDirections.status")}
                        </span>
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowDirections.fromStep")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowDirection
                        >(model.errors, nameof(model.fromStep))}
                        message={model.errors?.fromStep}
                        isRequired={true}
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
                          onChange={handleChangeObjectField(
                            nameof(model.fromStep)
                          )}
                          model={model.fromStep}
                          disabled={
                            model.workflowDefinitionId === undefined
                              ? true
                              : false
                          }
                          modelFilter={workflowStepFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowDirections.toStep")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowDirection
                        >(model.errors, nameof(model.toStep))}
                        message={model.errors?.toStep}
                        isRequired={true}
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
                          onChange={handleChangeObjectField(
                            nameof(model.toStep)
                          )}
                          model={model.toStep}
                          disabled={
                            model.workflowDefinitionId === undefined
                              ? true
                              : false
                          }
                          modelFilter={workflowStepFilter}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
            <Col lg={12} className="gutter-row">
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse "
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    expandIconPosition="right"
                  >
                    <Panel
                      header={translate(
                        "workflowDirections.titles.mailForCurrentStep"
                      )}
                      key="1"
                      className="site-collapse-custom-panel "
                      style={{ height: '500px' }}

                    >
                      <Row>
                        <Col lg={12} className="pr-3 mt-3">
                          <FormItem
                            label={translate("workflowDirections.subjectMail")}
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
                                "workflowDirections.placeholder.subjectMail"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={handleChangeSimpleField(
                                nameof(model.subjectMailForCurrentStep)
                              )}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={24} className="mt-3">
                          <FormItem
                            label={translate("workflowDirections.bodyMail")}
                            validateStatus={formService.getValidationStatus<
                              WorkflowDirection
                            >(
                              model.errors,
                              nameof(model.bodyMailForCurrentStep)
                            )}
                            message={model.errors?.bodyMailForCurrentStep}
                          >
                            <FroalaEditor
                              value={model.bodyMailForCurrentStep}
                              onChange={handleChangeSimpleField(nameof(model.bodyMailForCurrentStep))}
                              placeholder="Nhập nội dung"
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
            <Col lg={12} className="gutter-row">
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    expandIconPosition="right"
                  >
                    <Panel
                      header={translate(
                        "workflowDirections.titles.mailForCreator"
                      )}
                      key="1"
                      className="site-collapse-custom-panel "
                    >
                      <Row>
                        <Col lg={12} className="pr-3 mt-3">
                          <FormItem
                            label={translate("workflowDirections.subjectMail")}
                            validateStatus={formService.getValidationStatus<
                              WorkflowDirection
                            >(
                              model.errors,
                              nameof(model.subjectMailForCreator)
                            )}
                            message={model.errors?.subjectMailForCreator}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.subjectMailForCreator}
                              placeHolder={translate(
                                "workflowDirections.placeholder.subjectMail"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={handleChangeSimpleField(
                                nameof(model.subjectMailForCreator)
                              )}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={24} className="pr-3 mt-3">
                          <FormItem
                            label={translate("workflowDirections.bodyMail")}
                            validateStatus={formService.getValidationStatus<
                              WorkflowDirection
                            >(model.errors, nameof(model.bodyMailForCreator))}
                            message={model.errors?.bodyMailForCreator}
                          >
                            <FroalaEditor
                              value={model.bodyMailForCreator}
                              onChange={handleChangeSimpleField(nameof(model.bodyMailForCreator))}
                              placeholder="Nhập nội dung"
                            />

                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                className="site-collapse-custom-collapse"
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                expandIconPosition="right"
              >
                <Panel
                  header={translate(
                    "workflowDirections.titles.mailForNextStep"
                  )}
                  key="1"
                  className="site-collapse-custom-panel"

                >
                  <Row>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowDirections.subjectMail")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowDirection
                        >(model.errors, nameof(model.subjectMailForNextStep))}
                        message={model.errors?.subjectMailForNextStep}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.subjectMailForNextStep}
                          placeHolder={translate(
                            "workflowDirections.placeholder.subjectMail"
                          )}
                          className={"tio-account_square_outlined"}
                          onChange={handleChangeSimpleField(
                            nameof(model.subjectMailForNextStep)
                          )}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={24} className="pr-3 mt-3">
                      <FormItem
                        label={translate("workflowDirections.bodyMail")}
                        validateStatus={formService.getValidationStatus<
                          WorkflowDirection
                        >(model.errors, nameof(model.bodyMailForNextStep))}
                        message={model.errors?.bodyMailForNextStep}
                      >
                        <FroalaEditor
                          value={model.bodyMailForNextStep}
                          onChange={handleChangeSimpleField(nameof(model.bodyMailForNextStep))}
                          placeholder="Nhập nội dung"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <Row>
            <Col lg={24}>
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                className="site-collapse-custom-collapse"
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                expandIconPosition="right"
              >
                <Panel
                  header={translate(
                    "workflowDirections.titles.workflowDirectionCondition"
                  )}
                  key="1"
                  className="site-collapse-custom-panel"
                  style={{ height: "500px" }}
                >
                  <Row className="condition-table">
                    {workflowDirectionConditionTable}
                  </Row>
                  <Row>
                    <div className="action__container">
                      <div
                        className="button__add mr-2"
                        onClick={handleAddWorkflowDirectionConditionContent}
                      >
                        <span className="text-primary">
                          <i className="tio-add_circle_outlined mr-2"></i>
                          {translate("workflowDirections.button.addCondition")}
                        </span>
                      </div>
                    </div>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </>
      </div>

      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default WorkflowDirectionDetail;
