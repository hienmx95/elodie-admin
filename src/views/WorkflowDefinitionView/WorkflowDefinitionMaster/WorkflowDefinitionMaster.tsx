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
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import { formatDate } from "helpers/date-time";
import { Organization, OrganizationFilter } from "models/Organization";
import { Status, StatusFilter } from "models/Status";
import {
  WorkflowDefinition,
  WorkflowDefinitionFilter,
} from "models/WorkflowDefinition";
import { WorkflowType, WorkflowTypeFilter } from "models/WorkflowType";
import { Moment } from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { workflowDefinitionRepository } from "repositories/workflow-definition-repository";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import WorkflowDefinitionDetailModal from "../WorkflowDefinitionDetail/WorkflowDefinitionDetailModal";
import notification from "antd/lib/notification";
import { useHistory } from "react-router";
import {
  WORKFLOW_DEFINITION_ROUTE,
  WORKFLOW_DIRECTION_MASTER_ROUTE,
  WORKFLOW_STEP_MASTER_ROUTE,
} from "config/route-consts";
import { API_WORKFLOW_DEFINITION_PREFIX } from "config/api-consts";
import authenticationService from "services/authentication-service";

/* end individual import */
notification.config({
  placement: "bottomRight",
});

function WorkflowDefinitionMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('workflowDefinition', API_WORKFLOW_DEFINITION_PREFIX);

  const history = useHistory();
  const master: UseMaster = masterService.useMaster<
    WorkflowDefinition,
    WorkflowDefinitionFilter
  >(
    WorkflowDefinitionFilter,
    WORKFLOW_DEFINITION_ROUTE,
    workflowDefinitionRepository.list,
    workflowDefinitionRepository.count,
    workflowDefinitionRepository.delete,
    workflowDefinitionRepository.bulkDelete
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);

  const {
    handleClosePreview,
  } = masterService.usePreview<WorkflowDefinition>(
    WorkflowDefinition,
    workflowDefinitionRepository.get
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
    handleChangeTreeObjectField,
    dispatch,
  } = detailService.useDetailModal(
    WorkflowDefinition,
    workflowDefinitionRepository.get,
    workflowDefinitionRepository.save,
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
  const handleClone = React.useCallback(
    (id: number) => {
      workflowDefinitionRepository.clone(id).subscribe(() => {
        master.handleSearch();
        notification.success({
          message: translate("workflowDefinitions.notifications.cloneSuccess"),
        });
      });
    },
    [master, translate]
  );
  const handleOpenViewWorkflowStep = React.useCallback(
    (id: number) => {
      history.push(
        `${WORKFLOW_STEP_MASTER_ROUTE}?skip=0&take=10&workflowDefinitionId%5Bequal%5D=${id}`
      );
    },
    [history]
  );
  const handleOpenViewWorkflowDirection = React.useCallback(
    (id: number) => {
      history.push(
        `${WORKFLOW_DIRECTION_MASTER_ROUTE}?skip=0&take=10&workflowDefinitionId%5Bequal%5D=${id}`
      );
    },
    [history]
  );

  const menuAction = React.useCallback(
    (id: number, workflowDefinition: WorkflowDefinition) => (
      <Menu>
        {validAction('clone') &&
          <Menu.Item key="1">
            <Tooltip title={translate("workflowDefinitions.actions.clone")}>
              <div className="ant-action-menu" onClick={() => handleClone(id)}>
                {translate("workflowDefinitions.actions.clone")}
              </div>
            </Tooltip>
          </Menu.Item>
        }
        <Menu.Item key="2">
          <Tooltip
            title={translate("workflowDefinitions.actions.viewWorkflowStep")}
          >
            <div
              className="ant-action-menu"
              onClick={() => handleOpenViewWorkflowStep(id)}
            >
              {translate("workflowDefinitions.actions.viewWorkflowStep")}
            </div>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="3">
          <Tooltip
            title={translate(
              "workflowDefinitions.actions.viewWorkflowDirection"
            )}
          >
            <div
              className="ant-action-menu"
              onClick={() => handleOpenViewWorkflowDirection(id)}
            >
              {translate("workflowDefinitions.actions.viewWorkflowDirection")}
            </div>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="4">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={master.handleGoPreview(id)} >
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction('update') &&
          <Menu.Item key="5">
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
        {!workflowDefinition.used && validAction('delete') && (
          <Menu.Item key="6">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(workflowDefinition)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [
      translate,
      master,
      handleClone,
      handleOpenViewWorkflowStep,
      handleOpenViewWorkflowDirection,
      validAction,
    ]
  );

  const columns: ColumnProps<WorkflowDefinition>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].code)),
        width: 200,
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
                {translate("workflowDefinitions.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].name)),
        width: 200,
        render(...[name]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": name && name.length >= 20,
                })}
              >
                {name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDefinitions.name")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.workflowType")}
          </div>
        ),
        key: nameof(master.list[0].workflowType),
        dataIndex: nameof(master.list[0].workflowType),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].workflowType)),
        width: 200,
        render(workflowType: WorkflowType) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    workflowType.name && workflowType.name.length >= 30,
                })}
              >
                {workflowType.name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDefinitions.workflowType")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.organization")}
          </div>
        ),
        key: nameof(master.list[0].organization),
        dataIndex: nameof(master.list[0].organization),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].organization)),
        width: 200,
        render(organization: Organization) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    organization.name && organization.name.length >= 20,
                })}
              >
                {organization.name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDefinitions.organization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.date")}
          </div>
        ),
        key: nameof(master.list[0].startDate),
        dataIndex: nameof(master.list[0].startDate),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].startDate)),
        width: 200,
        render(...params: [Moment, WorkflowDefinition, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row", {})}>
                <div>
                  {formatDate(params[0])} - {formatDate(params[1].endDate)}
                </div>
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDefinitions.date")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.createdAt")}
          </div>
        ),
        key: nameof(master.list[0].createdAt),
        dataIndex: nameof(master.list[0].createdAt),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].createdAt)),
        width: 150,
        render(...params: [Moment, WorkflowDefinition, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row", {})}>
                <div>{formatDate(params[0])}</div>
              </div>
              <div className="cell-master__second-row">
                {translate("workflowDefinitions.createdAt")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowDefinitions.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<
          WorkflowDefinition,
          WorkflowDefinitionFilter
        >(master.filter, nameof(master.list[0].status)),
        align: "center",
        width: 200,
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
        render(id: number, workflowDefinition: WorkflowDefinition) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menuAction(id, workflowDefinition)}
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
              {translate("workflowDefinitions.code")}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("workflowDefinitions.placeholder.code")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDefinitions.name")}
            </label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("workflowDefinitions.placeholder.name")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDefinitions.organization")}
            </label>
            <AdvanceTreeFilter
              placeHolder={translate(
                "workflowDefinitions.placeholder.organization"
              )}
              classFilter={OrganizationFilter}
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].organizationId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={workflowDefinitionRepository.filterListOrganization}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDefinitions.workflowType")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].workflowTypeId)]["equal"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].workflowTypeId),
                "equal" as any,
                IdFilter
              )}
              classFilter={WorkflowTypeFilter}
              getList={workflowDefinitionRepository.filterListWorkflowType}
              placeHolder={translate(
                "workflowDefinitions.placeholder.workflowType"
              )}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="pr-4">
            <label className="label">
              {translate("workflowDefinitions.status")}
            </label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={workflowDefinitionRepository.filterListStatus}
              placeHolder={translate("workflowDefinitions.placeholder.status")}
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
          {translate("workflowDefinitions.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={workflowDefinitionRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          rowSelection={rowSelection}
        >
          {translate("workflowDefinitions.table.title")}
        </AppMainMasterTable>
      </div>
      <WorkflowDefinitionDetailModal
        model={model}
        visible={isOpenDetailModal}
        handleSave={handleSaveModel}
        handleCancel={handleCloseDetailModal}
        onChangeSimpleField={handleChangeSimpleField}
        onChangeObjectField={handleChangeObjectField}
        onChangeTreeObjectField={handleChangeTreeObjectField}
        dispatchModel={dispatch}
        loading={loadingModel}
        visibleFooter={true}
      />
    </>
  );
}

export default WorkflowDefinitionMaster;
