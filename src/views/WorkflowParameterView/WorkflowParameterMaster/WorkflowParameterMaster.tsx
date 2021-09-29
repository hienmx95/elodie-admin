/* begin general import */
import { IdFilter } from "@react3l/advanced-filters";
import { Col, Row } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { API_WORKFLOW_PARAMETER_PREFIX } from "config/api-consts";
import {
  WorkflowParameter,
  WorkflowParameterFilter,
} from "models/WorkflowParameter";
import {
  WorkflowParameterType,
  WorkflowParameterTypeFilter,
} from "models/WorkflowParameterType";
import { WorkflowType, WorkflowTypeFilter } from "models/WorkflowType";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { workflowParameterRepository } from "repositories/workflow-parameter-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

function WorkflowParameterMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('workflowParameter', API_WORKFLOW_PARAMETER_PREFIX);

  const master: UseMaster = masterService.useMaster<
    WorkflowParameter,
    WorkflowParameterFilter
  >(
    WorkflowParameterFilter,
    "",
    workflowParameterRepository.list,
    workflowParameterRepository.count,
    workflowParameterRepository.delete,
    workflowParameterRepository.bulkDelete
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);

  const columns: ColumnProps<WorkflowParameter>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowParameters.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowParameter, WorkflowParameterFilter>(
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
                {translate("workflowParameters.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowParameters.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowParameter, WorkflowParameterFilter>(
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
                {translate("workflowParameters.name")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowParameters.workflowParameterType")}
          </div>
        ),
        key: nameof(master.list[0].workflowParameterType),
        dataIndex: nameof(master.list[0].workflowParameterType),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowParameter, WorkflowParameterFilter>(
          master.filter,
          nameof(master.list[0].workflowParameterType)
        ),
        render(workflowParameterType: WorkflowParameterType) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    workflowParameterType.name &&
                    workflowParameterType.name.length >= 30,
                })}
              >
                {workflowParameterType.name}
              </div>
              <div className="cell-master__second-row">
                {translate("workflowParameters.workflowParameterType")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("workflowParameters.workflowType")}
          </div>
        ),
        key: nameof(master.list[0].workflowType),
        dataIndex: nameof(master.list[0].workflowType),
        sorter: true,
        sortOrder: getAntOrderType<WorkflowParameter, WorkflowParameterFilter>(
          master.filter,
          nameof(master.list[0].workflowType)
        ),
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
                {translate("workflowParameters.workflowType")}
              </div>
            </div>
          );
        },
      },
    ],
    [translate, master.list, master.filter]
  );
  const filterChildren = React.useMemo(
    () => (
      <Row className="mt-4 search__container">
        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("workflowParameters.workflowParameterType")}
          </label>
          <AdvanceIdFilter
            value={
              master.filter[nameof(master.list[0].workflowParameterTypeId)][
              "equal"
              ]
            }
            onChange={master.handleChangeFilter(
              nameof(master.list[0].workflowParameterTypeId),
              "equal" as any,
              IdFilter
            )}
            classFilter={WorkflowParameterTypeFilter}
            getList={
              workflowParameterRepository.filterListWorkflowParameterType
            }
            placeHolder={translate(
              "workflowParameters.placeholder.workflowParameterType"
            )}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("workflowParameters.workflowType")}
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
            getList={workflowParameterRepository.filterListWorkflowType}
            placeHolder={translate(
              "workflowParameters.placeholder.workflowType"
            )}
            isMaterial={true}
          />
        </Col>
      </Row>
    ),
    [master, translate]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("workflowParameters.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={workflowParameterRepository}
          translate={translate}
          isCreate={false}
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
          {translate("taxTypes.table.title")}
        </AppMainMasterTable>
      </div>
    </>
  );
}

export default WorkflowParameterMaster;
