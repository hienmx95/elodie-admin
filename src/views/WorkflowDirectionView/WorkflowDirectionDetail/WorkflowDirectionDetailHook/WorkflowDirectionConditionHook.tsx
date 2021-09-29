import Select from "components/Utility/Select/Select";
import { masterTableIndex } from "helpers/table";
import { WorkflowDirection } from "models/WorkflowDirection";
import {
  WorkflowDirectionCondition,
  WorkflowDirectionConditionFilter,
} from "models/WorkflowDirectionCondition";
import { WorkflowOperatorFilter } from "models/WorkflowOperator";
import { WorkflowParameterFilter } from "models/WorkflowParameter";
import React from "react";
import { useTranslation } from "react-i18next";
import { workflowDirectionRepository } from "repositories/workflow-direction-repository";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "services/component-factory/table-column-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
import FieldInput from "../FieldInput";

export function useWorkflowDirectionConditionTable(
  model: WorkflowDirection,
  setModel: (data: WorkflowDirection) => void
) {
  const [translate] = useTranslation();

  const {
    content: workflowDirectionConditions,
    setContent: setWorkflowDirectionConditions,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.workflowDirectionConditions)
  );
  const { RenderActionColumn } = componentFactoryService;
  const [
    workflowDirectionConditionFilter,
    dispatWorkflowDirectionConditionFilter,
  ] = React.useReducer<
    React.Reducer<
      WorkflowDirectionConditionFilter,
      AdvanceFilterAction<WorkflowDirectionConditionFilter>
    >
  >(advanceFilterReducer, new WorkflowDirectionConditionFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<
    WorkflowDirectionConditionFilter
  >(
    workflowDirectionConditionFilter,
    dispatWorkflowDirectionConditionFilter,
    WorkflowDirectionConditionFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    workflowDirectionConditionFilter,
    workflowDirectionConditions,
    loadList,
    setLoadList
  );

  const {
    handleTableChange,
    handlePagination,
    canBulkDelete,
    handleLocalDelete,
    handleLocalBulkDelete,
    handleAddContent,
    handleChangeOneCell,
  } = tableService.useLocalTable<
    WorkflowDirectionCondition,
    any,
    WorkflowDirectionConditionFilter
  >(
    workflowDirectionConditionFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    workflowDirectionConditions,
    setWorkflowDirectionConditions,
    WorkflowDirectionCondition
  );

  const {
    ref,
    handleClick,
    handleImportContentList,
  } = importExportDataService.useImport();

  const {
    handleContentExport,
    handleContentExportTemplate,
  } = importExportDataService.useExport();
  const workflowDirectionConditionColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.columns.index")}
          </div>
        ))
        .Key("index")
        .Width(70)
        .Align("center")
        .Render(
          masterTableIndex<
            WorkflowDirectionCondition,
            WorkflowDirectionConditionFilter
          >(workflowDirectionConditionFilter)
        ),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "workflowDirections.workflowDirectionConditions.workflowParameter"
            )}
          </div>
        ))
        .Key("workflowParameter")
        .Key(nameof(workflowDirectionConditions[0].workflowParameter)) //Key
        .DataIndex(nameof(workflowDirectionConditions[0].workflowParameter))
        .Sorter(true)
        .Render((...params: [string, WorkflowDirectionCondition, number]) => {
          const workflowParameterFilter = new WorkflowParameterFilter();
          workflowParameterFilter.workflowTypeId.equal =
            model?.workflowDefinition?.workflowTypeId;
          return (
            <Select
              isMaterial={true}
              classFilter={WorkflowParameterFilter}
              placeHolder={translate(
                "workflowDirections.workflowDirectionConditions.placeholder.workflowParameter"
              )}
              getList={workflowDirectionRepository.singleListWorkflowParameter}
              onChange={handleChangeOneCell(
                params[2],
                nameof(workflowDirectionConditions[0].workflowParameter)
              )}
              model={params[1].workflowParameter}
              disabled={model.workflowDefinitionId ? false : true}
              modelFilter={workflowParameterFilter}
            />
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "workflowDirections.workflowDirectionConditions.workflowOperator"
            )}
          </div>
        ))
        .Key("workflowOperator")
        .Key(nameof(workflowDirectionConditions[0].workflowOperator)) //Key
        .DataIndex(nameof(workflowDirectionConditions[0].workflowOperator))
        .Sorter(true)
        .Render((...params: [string, WorkflowDirectionCondition, number]) => {
          const workflowOperatorFilter = new WorkflowOperatorFilter();
          workflowOperatorFilter.workflowParameterTypeId.equal =
            params[1]?.workflowParameter?.workflowParameterTypeId;
          return (
            <Select
              isMaterial={true}
              classFilter={WorkflowOperatorFilter}
              modelFilter={workflowOperatorFilter}
              placeHolder={translate(
                "workflowDirections.workflowDirectionConditions.placeholder.workflowOperator"
              )}
              getList={workflowDirectionRepository.singleListWorkflowOperator}
              onChange={handleChangeOneCell(
                params[2],
                nameof(workflowDirectionConditions[0].workflowOperator)
              )}
              model={params[1].workflowOperator}
              disabled={model.workflowDefinitionId ? false : true}
            />
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("workflowDirections.workflowDirectionConditions.value")}
          </div>
        ))
        .Key("value")
        .Key(nameof(workflowDirectionConditions[0].value)) //Key
        .DataIndex(nameof(workflowDirectionConditions[0].value))
        .Sorter(true)
        .Render((...params: [string, WorkflowDirectionCondition, number]) => {
          return (
            <div >
              <FieldInput
                value={params[0]}
                index={params[2]}
                contents={workflowDirectionConditions}
                setContents={setWorkflowDirectionConditions}
                disabled={
                  params[1].workflowOperatorId === undefined ||
                  params[1].workflowOperatorId === 0 ||
                  typeof params[1].errors?.workflowOperatorId === "string" ||
                  model.used
                }
              />
            </div>
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate("general.actions.action")}
          </div>
        ))
        .Key("actions") // key
        .Width(100)
        .Align("center")
        .DataIndex(nameof(workflowDirectionConditions[0].key))
        .Render(
          RenderActionColumn(
            CreateTableAction()
              .Title(translate("general.delete.content"))
              .Icon("tio-delete_outlined text-danger")
              .Action(handleLocalDelete)
              .HasConfirm(true)
          )
        )
    );
  }, [
    workflowDirectionConditionFilter,
    workflowDirectionConditions,
    RenderActionColumn,
    translate,
    handleLocalDelete,
    model,
    handleChangeOneCell,
    setWorkflowDirectionConditions,
  ]);

  return {
    workflowDirectionConditionFilter,
    workflowDirectionConditionList: list,
    loadWorkflowDirectionConditionList: loadingList,
    workflowDirectionConditionTotal: total,
    handleAddWorkflowDirectionConditionContent: handleAddContent,
    handleWorkflowDirectionConditionTableChange: handleTableChange,
    handleWorkflowDirectionConditionPagination: handlePagination,
    canBulkDeleteWorkflowDirectionConditionContent: canBulkDelete,
    handleLocalBulkDeleteWorkflowDirectionConditionContent: handleLocalBulkDelete,
    workflowDirectionConditionRef: ref,
    handleClickWorkflowDirectionConditionContent: handleClick,
    handleImportWorkflowDirectionConditionContent: handleImportContentList,
    handleExportWorkflowDirectionConditionContent: handleContentExport,
    handleExportTemplateWorkflowDirectionConditionContent: handleContentExportTemplate,
    workflowDirectionConditionColumns,
  };
}
