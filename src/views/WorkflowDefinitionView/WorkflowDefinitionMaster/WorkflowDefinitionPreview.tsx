/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Model } from "@react3l/react3l/core/model";
import { Col, Collapse, Row, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import AppFooter from "components/AppFooter/AppFooter";
import { WORKFLOW_DEFINITION_ROUTE, WORKFLOW_DIRECTION_DETAIL_ROUTE } from "config/route-consts";
import { formatDateTime } from "helpers/date-time";
import { renderMasterIndex } from "helpers/table";
// import { ASSETS_IMAGE } from "config/consts";
import { TFunction } from "i18next";
import { Status } from "models/Status";
/* end general import */
/* begin individual import */
import { WorkflowDefinition } from "models/WorkflowDefinition";
import { WorkflowDirection } from "models/WorkflowDirection";
import { WorkflowStep } from "models/WorkflowStep";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { workflowDefinitionRepository } from "repositories/workflow-definition-repository";
import masterService from "services/pages/master-service";
import { routerService } from "services/route-service";
import nameof from "ts-nameof.macro";
import WorkflowDirectionPreview from "views/WorkflowDirectionView/WorkflowDirectionMaster/WorkflowDirectionPreview";
/* end individual import */

interface WorkflowDefinitionPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function WorkflowDefinitionPreview() {
  const [translate] = useTranslation();
  const history = useHistory();
  const [, , , handleGoBase] = routerService.useMasterNavigation(
    WORKFLOW_DEFINITION_ROUTE
  );
  const [workflowDirection, setWorkflowDirection] = React.useState<WorkflowDirection>(new WorkflowDirection());
  const [visile, setVisible] = React.useState<boolean>(false);

  const { model } = masterService.usePreviewPage(
    WorkflowDefinition,
    workflowDefinitionRepository.get
  );
  const handleGoCreateWorkflowDirection = React.useCallback((id) => {
    history.push(
      `${WORKFLOW_DIRECTION_DETAIL_ROUTE}?workflowDefinitionId=${id}`
    );
  }, [history]);
  const handleGoPreviewDirection = React.useCallback((workflowDirection) => {
    setWorkflowDirection(workflowDirection);
    setVisible(true);
  }, []);
  const handleClosePreviewDirection = React.useCallback(() => {
    setVisible(false);
  }, []);

  const columns: ColumnProps<WorkflowDirection>[] = React.useMemo(
    () => {
      return [
        {
          title: (<div className='text-center gradient-text'>{translate("general.columns.index")}</div>),
          key: "index",
          width: 100,
          align: "center",
          render: renderMasterIndex<WorkflowDirection>(),
        },
        {
          title: (
            <div className="text-center gradient-text">
              {translate('workflowDefinitions.workflowDirections.fromStep')}
            </div>
          ),
          key: nameof(model.workflowDirections[0].fromStep),
          dataIndex: nameof(model.workflowDirections[0].fromStep),
          ellipsis: true,
          align: "center",
          render(fromStep: WorkflowDirection) {
            return fromStep?.name;
          },
        },
        {
          title: (
            <div className="text-center gradient-text">
              {translate('workflowDefinitions.workflowDirections.role')}
            </div>
          ),
          key: 'RoleFromStep',
          align: "center",
          dataIndex: nameof(model.workflowDirections[0].fromStep),
          ellipsis: true,
          render(fromStep: WorkflowStep) {
            return fromStep?.role?.name;
          },
        },
        {
          title: (
            <div className="text-center gradient-text">
              {translate('workflowDefinitions.workflowDirections.toStep')}
            </div>
          ),
          align: "center",
          key: nameof(model.workflowDirections[0].toStep),
          dataIndex: nameof(model.workflowDirections[0].toStep),
          ellipsis: true,
          render(toStep: WorkflowDirection) {
            return toStep?.name;
          },
        },
        {
          title: (
            <div className="text-center gradient-text">
              {translate('workflowDefinitions.workflowDirections.role')}
            </div>
          ),
          align: "center",
          key: 'RoleToStep',
          dataIndex: nameof(model.workflowDirections[0].toStep),
          ellipsis: true,
          render(toStep: WorkflowStep) {
            return toStep?.role?.name;
          },
        },
        {
          title: (
            <div className="text-center gradient-text">
              {translate("workflowDefinitions.status")}
            </div>
          ),
          key: nameof(model.workflowDirections[0].status),
          dataIndex: nameof(model.workflowDirections[0].status),
          align: 'center',
          width: 200,
          render(status: Status) {
            return (
              <div className={status.id === 1 ? "tag--active" : "tag--inactive"}>
                {status?.name}
              </div>
            );
          },
        },
        {
          title: (
            <div className="text-center gradient-text">
              {translate("general.actions.label")}
            </div>
          ),
          key: "action",
          dataIndex: nameof(model.workflowDirections[0].id),
          fixed: "right",
          width: 80,
          align: "center",
          render(id: number, workflowDirections: WorkflowDirection) {
            return (
              <div className="d-flex justify-content-center button-action-table">
                <Tooltip title={translate("general.actions.view")}>
                  <button
                    className="btn btn-sm "
                    onClick={() => handleGoPreviewDirection(workflowDirections)}
                  >
                    <i className="tio-visible_outlined text-primary" />
                  </button>
                </Tooltip>
              </div>
            );
          },
        },
      ];
    }, [handleGoPreviewDirection, model.workflowDirections, translate],
  );
  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button className="btn btn__cancel mr-2" onClick={handleGoBase}>
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [translate, handleGoBase]);
  React.useEffect(() => {
    console.log('model.workflowDirections', model.workflowDirections)
  }, [model.workflowDirections])
  return (
    <>
      <div className="page page__detail page__detail--preview">
        <div className="page__header d-flex align-items-center">
          <div className="page__title mr-1">
            {translate("workflowDefinitions.detail.title")}
          </div>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
            <Col lg={24} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Thông tin chi tiết"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row justify="space-between">
                    <Col span={8} >
                      <div className="general-field__container pl-3" >
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.code")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.code}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={8} >
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.name")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.name}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="general-field__container  ">
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.organization")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.organization?.name}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="general-field__container pl-3 mt-3">
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.workflowType")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.workflowType?.name}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="general-field__container pl-3 mt-3">
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.startDate")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.startDate
                            ? moment(model.startDate).format("DD/MM/YYYY")
                            : null}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="general-field__container  mt-3">
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.endDate")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.endDate
                            ? moment(model.endDate).format("DD/MM/YYYY")
                            : null}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="general-field__container mt-3 ml-3">
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.status")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.status?.name}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
            <Col lg={24} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Các luồng thực hiện"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <button
                    className="btn btn-primary ml-3 mb-3"
                    onClick={() => handleGoCreateWorkflowDirection(model.id)}
                  >
                    <i className="fa mr-2 fa-plus" />
                    {translate('workflowDefinitions.create')}
                  </button>
                  <Table
                    rowKey={nameof(model.workflowDirections[0].id)}
                    dataSource={model.workflowDirections}
                    columns={columns}
                    size="small"
                    tableLayout="fixed"
                    scroll={{ y: 500 }}
                    className="ml-3 mt-2"
                    pagination={false}

                  />

                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
            <Col lg={24} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Thông tin chỉnh sửa"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row justify="space-between">
                    <Col span={6} >
                      <div className="general-field__container pl-3" >
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.createdAt")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{formatDateTime(model?.createdAt)}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={6} >
                      <div className="general-field__container pl-3" >
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.creator")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model?.creator?.displayName}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={6} >
                      <div className="general-field__container pl-3" >
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.updatedAt")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{formatDateTime(model?.updatedAt)}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={6} >
                      <div className="general-field__container pl-3" >
                        <div className="general-field__first-row">
                          <span>{translate("workflowDefinitions.modifier")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model?.modifier?.displayName}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>

                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
      <AppFooter
        childrenAction={childrenAction}
      ></AppFooter>
      <WorkflowDirectionPreview
        previewModel={workflowDirection}
        isOpenPreview={visile}
        handleClosePreview={handleClosePreviewDirection}
        translate={translate}
      />
    </>
  );
}

export default WorkflowDefinitionPreview;
