/* begin general import */
import { IdFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { API_WORKFLOW_DIRECTION_PREFIX } from "config/api-consts";
import { WORKFLOW_DIRECTION_ROUTE } from "config/route-consts";
import { Status, StatusFilter } from "models/Status";
import {
  WorkflowDefinition,
  WorkflowDefinitionFilter,
} from "models/WorkflowDefinition";
import {
  WorkflowDirection,
  WorkflowDirectionFilter,
} from "models/WorkflowDirection";
import { WorkflowStep, WorkflowStepFilter } from "models/WorkflowStep";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { workflowDirectionRepository } from "repositories/workflow-direction-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import WorkflowDirectionPreview from "./WorkflowDirectionPreview";
/* end individual import */

function WorkflowDirectionMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('workflowDirection', API_WORKFLOW_DIRECTION_PREFIX);

  const master: UseMaster = masterService.useMaster<
    WorkflowDirection,
    WorkflowDirectionFilter
  >(
    WorkflowDirectionFilter,
    WORKFLOW_DIRECTION_ROUTE,
    workflowDirectionRepository.list,
    workflowDirectionRepository.count,
    workflowDirectionRepository.delete,
    workflowDirectionRepository.bulkDelete
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);
  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<WorkflowDirection>(
    WorkflowDirection,
    workflowDirectionRepository.get
  );

  const menuAction = React.useCallback(
    (id: number, workflowDirection: WorkflowDirection) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction('update') &&
          <Menu.Item key="2">
            <Tooltip title={translate("general.actions.edit")}>
              <div
                className="ant-action-menu"
                onClick={master.handleGoDetail(id)}
              >
                {translate("general.actions.edit")}
              </div>
            </Tooltip>
          </Menu.Item>
        }
        {!workflowDirection.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(workflowDirection)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [handleOpenPreview, master, translate, validAction]
  );

  const columns: ColumnProps<WorkflowDirection>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDirections.workflowDefinition")}
          </div>
        ),
        key: nameof(master.list[0].workflowDefinition),
        dataIndex: nameof(master.list[0].workflowDefinition),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowDirection, WorkflowDirectionFilter>(
          master.filter,
          nameof(master.list[0].workflowDefinition)
        ),
        ellipsis: true,
        render(workflowDefinition: WorkflowDefinition) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    workflowDefinition.name &&
                    workflowDefinition.name.length >= 30,
                })}
              >
                {workflowDefinition.name.length >= 30 ?
                  <Tooltip title={workflowDefinition.name}>
                    {workflowDefinition.name}
                  </Tooltip> :
                  <> {workflowDefinition.name}</>
                }

              </div>
              <div className="cell-master__second-row">
                {translate("workflowDirections.workflowDefinition")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDirections.fromStep")}
          </div>
        ),
        key: nameof(master.list[0].fromStep),
        dataIndex: nameof(master.list[0].fromStep),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowDirection, WorkflowDirectionFilter>(
          master.filter,
          nameof(master.list[0].fromStep)
        ),
        render(fromStep: WorkflowStep) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    fromStep.name && fromStep.name.length >= 30,
                })}
              >
                {fromStep.name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDirections.fromStep")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDirections.toStep")}
          </div>
        ),
        key: nameof(master.list[0].toStep),
        dataIndex: nameof(master.list[0].toStep),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowDirection, WorkflowDirectionFilter>(
          master.filter,
          nameof(master.list[0].toStep)
        ),
        render(toStep: WorkflowStep) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    toStep.name && toStep.name.length >= 30,
                })}
              >
                {toStep.name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDirections.toStep")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDirections.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowDirection, WorkflowDirectionFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        align: "center",
        render(status: Status) {
          return (
            <div className="d-flex justify-content-center">
              <div
                className={status.id === 1 ? "tag--active" : "tag--inactive"}
              >
                {status?.name}
              </div>
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
        dataIndex: nameof(master.list[0].id),
        fixed: "right",
        width: 150,
        align: "center",
        render(id: number, workflowDirection: WorkflowDirection) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menuAction(id, workflowDirection)}
                trigger={["click"]}
                placement="bottomCenter"
                arrow
              >
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master.list, master.filter, menuAction]
  );
  const filterChildren = React.useMemo(
    () => (
      <div className="mt-4 search__container">
        <Row justify="space-between">
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDirections.workflowDefinition")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].workflowDefinitionId)][
                "equal"
                ]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].workflowDefinitionId),
                "equal" as any,
                IdFilter
              )}
              classFilter={WorkflowDefinitionFilter}
              getList={workflowDirectionRepository.singleListWorkflowDefinition}
              placeHolder={translate(
                "workflowDirections.placeholder.workflowDefinition"
              )}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDirections.fromStep")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].fromStepId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].fromStepId),
                "equal" as any,
                IdFilter
              )}
              classFilter={WorkflowStepFilter}
              getList={workflowDirectionRepository.singleListWorkflowStep}
              placeHolder={translate("workflowDirections.placeholder.fromStep")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDirections.toStep")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].toStepId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].toStepId),
                "equal" as any,
                IdFilter
              )}
              classFilter={WorkflowStepFilter}
              getList={workflowDirectionRepository.singleListWorkflowStep}
              placeHolder={translate("workflowDirections.placeholder.toStep")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDirections.status")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={workflowDirectionRepository.singleListStatus}
              placeHolder={translate("workflowDirections.placeholder.status")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} />
        </Row>
      </div>
    ),
    [master, translate]
  );
  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("workflowDirections.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={workflowDirectionRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          rowSelection={rowSelection}>
          {translate("workflowDirections.table.title")}
        </AppMainMasterTable>
      </div>

      <WorkflowDirectionPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
    </>
  );
}

export default WorkflowDirectionMaster;
