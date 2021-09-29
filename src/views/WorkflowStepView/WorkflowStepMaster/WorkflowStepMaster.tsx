/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { API_WORKFLOW_STEP_PREFIX } from "config/api-consts";
import { Role } from "models/Role";
import { Status, StatusFilter } from "models/Status";
import {
  WorkflowDefinition,
  WorkflowDefinitionFilter,
} from "models/WorkflowDefinition";
import { WorkflowStep, WorkflowStepFilter } from "models/WorkflowStep";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { workflowStepRepository } from "repositories/workflow-step-repository";
import authenticationService from "services/authentication-service";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import WorkflowStepDetailModal from "../WorkflowStepDetail/WorkflowStepDetailModal";
import WorkflowStepPreview from "./WorkflowStepPreview";
/* end individual import */

function WorkflowStepMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('workflowStep', API_WORKFLOW_STEP_PREFIX);

  const master: UseMaster = masterService.useMaster<
    WorkflowStep,
    WorkflowStepFilter
  >(
    WorkflowStepFilter,
    "",
    workflowStepRepository.list,
    workflowStepRepository.count,
    workflowStepRepository.delete,
    workflowStepRepository.bulkDelete
  );


  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<WorkflowStep>(
    WorkflowStep,
    workflowStepRepository.get
  );

  const {
    model,
    isOpenDetailModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleSaveModel,
    loadingModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    dispatch,
  } = detailService.useDetailModal(
    WorkflowStep,
    workflowStepRepository.get,
    workflowStepRepository.save,
    master.handleSearch
  );

  master.handleGoCreate = React.useCallback(() => {
    handleClosePreview();
    handleOpenDetailModal(null);
  }, [handleClosePreview, handleOpenDetailModal]);

  master.handleGoDetail = React.useCallback(
    (id: number) => () => {
      handleClosePreview();
      handleOpenDetailModal(id);
    },
    [handleClosePreview, handleOpenDetailModal]
  );

  const menu = React.useCallback(
    (id: number, workflowStep: WorkflowStep) => (
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
        {!workflowStep.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(workflowStep)}
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

  const columns: ColumnProps<WorkflowStep>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowSteps.workflowDefinition")}
          </div>
        ),
        key: nameof(master.list[0].workflowDefinition),
        dataIndex: nameof(master.list[0].workflowDefinition),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowStep, WorkflowStepFilter>(
          master.filter,
          nameof(master.list[0].workflowDefinition)
        ),
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
                {translate("workflowSteps.workflowDefinition")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowSteps.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowStep, WorkflowStepFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(...[code]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": code && code.length >= 30,
                })}
              >
                {code}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowSteps.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowSteps.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowStep, WorkflowStepFilter>(
          master.filter,
          nameof(master.list[0].name)
        ),
        render(...[name]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": name && name.length >= 30,
                })}
              >
                {name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowSteps.name")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowSteps.role")}
          </div>
        ),
        key: nameof(master.list[0].role),
        dataIndex: nameof(master.list[0].role),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowStep, WorkflowStepFilter>(
          master.filter,
          nameof(master.list[0].role)
        ),
        render(role: Role) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": role.name && role.name.length >= 30,
                })}
              >
                {role.name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowSteps.role")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowSteps.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowStep, WorkflowStepFilter>(
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
        render(id: number, workflowStep: WorkflowStep) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menu(id, workflowStep)}
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
    [translate, master.list, master.filter, menu]
  );
  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowSteps.workflowDefinition")}
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
              getList={workflowStepRepository.filterListWorkflowDefinition}
              placeHolder={translate(
                "workflowSteps.placeholder.workflowDefinition"
              )}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">{translate("workflowSteps.role")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].roleId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].roleId),
                "equal" as any,
                IdFilter
              )}
              classFilter={WorkflowDefinitionFilter}
              getList={workflowStepRepository.filterListRole}
              placeHolder={translate("workflowSteps.placeholder.role")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">{translate("workflowSteps.code")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("workflowSteps.placeholder.code")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">{translate("workflowSteps.name")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("workflowSteps.placeholder.name")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">{translate("workflowSteps.status")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={workflowStepRepository.filterListStatus}
              placeHolder={translate("workflowSteps.placeholder.status")}
              isMaterial={true}
            />
          </Col>
        </Row>
      </div>
    ),
    [master, translate]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("workflowSteps.master.title")}
        </AppMainMasterTitle>

        <AppMainMasterFilter
          {...master}
          repository={workflowStepRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          rowSelection={null}
        >
          {translate("workflowSteps.table.title")}
        </AppMainMasterTable>
      </div>
      <WorkflowStepPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      <WorkflowStepDetailModal
        model={model}
        visible={isOpenDetailModal}
        handleSave={handleSaveModel}
        handleCancel={handleCloseDetailModal}
        onChangeSimpleField={handleChangeSimpleField}
        onChangeObjectField={handleChangeObjectField}
        dispatchModel={dispatch}
        loading={loadingModel}
        visibleFooter={true}
      />
    </>
  );
}

export default WorkflowStepMaster;
