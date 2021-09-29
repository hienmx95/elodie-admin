/* begin general import */
import { DECIMAL } from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import Select from "components/Utility/Select/Select";
import { masterTableIndex } from "helpers/table";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
/* end general import */
/* begin individual import */
import { UnitOfMeasureGrouping } from "models/UnitOfMeasureGrouping";
import {
  UnitOfMeasureGroupingContent,
  UnitOfMeasureGroupingContentFilter,
} from "models/UnitOfMeasureGroupingContent";
import React from "react";
import { useTranslation } from "react-i18next";
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
import { v4 as uuidv4 } from "uuid";
/* end individual import */

export function useUnitOfMeasureGroupingContentTable(
  model: UnitOfMeasureGrouping,
  setModel: (data: UnitOfMeasureGrouping) => void
) {
  const [translate] = useTranslation();

  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<
    UnitOfMeasureFilter
  >(new UnitOfMeasureFilter());
  const [loadContent, setLoadContent] = React.useState<boolean>(false);

  const {
    content: unitOfMeasureGroupingContents,
    setContent: setUnitOfMeasureGroupingContents,
  } = detailService.useContentList(
    model,
    setModel,
    nameof(model.unitOfMeasureGroupingContents)
  );
  const { RenderActionColumn } = componentFactoryService;

  const [
    unitOfMeasureGroupingContentFilter,
    dispatchUnitOfMeasureGroupingContentsFilter,
  ] = React.useReducer<
    React.Reducer<
      UnitOfMeasureGroupingContentFilter,
      AdvanceFilterAction<UnitOfMeasureGroupingContentFilter>
    >
  >(advanceFilterReducer, new UnitOfMeasureGroupingContentFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<
    UnitOfMeasureGroupingContentFilter
  >(
    unitOfMeasureGroupingContentFilter,
    dispatchUnitOfMeasureGroupingContentsFilter,
    UnitOfMeasureGroupingContentFilter
  );

  const { list, total, loadingList } = listService.useLocalList(
    unitOfMeasureGroupingContentFilter,
    unitOfMeasureGroupingContents,
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
    handleChangeOneRow,
  } = tableService.useLocalTable<
    UnitOfMeasureGroupingContent,
    any,
    UnitOfMeasureGroupingContentFilter
  >(
    unitOfMeasureGroupingContentFilter,
    handleUpdateNewFilter,
    setLoadList,
    handleSearch,
    total,
    unitOfMeasureGroupingContents,
    setUnitOfMeasureGroupingContents,
    UnitOfMeasureGroupingContent
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

  React.useEffect(() => {
    if (model) {
      const Ids = [];
      if (model.unitOfMeasure) {
        Ids.push(model.unitOfMeasure.id);
      }
      if (model?.unitOfMeasureGroupingContents?.length > 0) {
        model.unitOfMeasureGroupingContents.forEach((content) => {
          if (content.unitOfMeasure?.id) {
            Ids.push(content.unitOfMeasure?.id);
          }
        });
      }
      setSelectedIds([...Ids]);
      const newFilter = new UnitOfMeasureFilter();
      newFilter.id.notIn = Ids;
      setUnitOfMeasureFilter({
        ...newFilter,
      });
    }
  }, [
    model,
    setUnitOfMeasureFilter,
    setUnitOfMeasureGroupingContents,
    unitOfMeasureGroupingContents,
  ]);

  React.useEffect(() => {
    if (model && model.unitOfMeasure && loadContent) {
      const list = [...model.unitOfMeasureGroupingContents];
      if (list.length > 0) {
        const staticContent = list
          .filter((item) => item.unitOfMeasure)
          .find((item) => item.unitOfMeasure.id === model.unitOfMeasure.id);
        if (staticContent) {
          list[0] = staticContent;
        } else {
          const defaultContent = {
            ...new UnitOfMeasureGroupingContent(),
            key: uuidv4(),
            factor: 1,
            unitOfMeasureId: model.unitOfMeasureId,
            unitOfMeasure: model.unitOfMeasure
          };
          list.splice(0, 0, defaultContent);
        }
      } else {
        const defaultContent = {
          ...new UnitOfMeasureGroupingContent(),
          key: uuidv4(),
          factor: 1,
          unitOfMeasureId: model.unitOfMeasureId,
          unitOfMeasure: model.unitOfMeasure,
        };
        list.splice(0, 0, defaultContent);
      }
      setUnitOfMeasureGroupingContents([...list]);
      setLoadList(true);
      setLoadContent(false);
    }
  }, [
    model,
    unitOfMeasureGroupingContents,
    setUnitOfMeasureGroupingContents,
    setLoadList,
    loadContent,
  ]);

  const handleChangeUOMBase = React.useCallback(
    (unitOfMeasureId: number, unitOfMeasure: UnitOfMeasure) => {
      const unitOfMeasureList: number[] = [unitOfMeasureId];
      unitOfMeasureGroupingContentFilter.id.notIn = unitOfMeasureList;
      if (model?.unitOfMeasureId !== unitOfMeasureId) {
        model.unitOfMeasureGroupingContents = [];
        setModel(
          UnitOfMeasureGrouping.clone<UnitOfMeasureGrouping>({
            ...model,
            unitOfMeasureId,
            unitOfMeasure,
            errors: {
              ...model.errors,
              unitOfMeasure: null,
              unitOfMeasureId: null,
            },
          })
        );
        setLoadContent(true);
      }
    },
    [model, setModel, unitOfMeasureGroupingContentFilter.id.notIn]
  );

  const handleChanngeUOM = React.useCallback(
    (
      unitOfMeasureGroupingContent: UnitOfMeasureGroupingContent,
      index: number
    ) => (unitOfMeasureId: number, unitOfMeasure: any) => {
      const content = { ...unitOfMeasureGroupingContent };
      content["unitOfMeasure"] = { ...unitOfMeasure };
      content["unitOfMeasureId"] = unitOfMeasureId;
      handleChangeOneRow(index)(content);

      selectedIds.push(unitOfMeasureId);
      setSelectedIds([...selectedIds]);
      // update filter
      unitOfMeasureFilter.id.notIn = [...selectedIds];
      setUnitOfMeasureFilter(unitOfMeasureFilter);
    },
    [handleChangeOneRow, selectedIds, unitOfMeasureFilter]
  );

  const unitOfMeasureGroupingContentColumns = React.useMemo(() => {
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
            UnitOfMeasureGroupingContent,
            UnitOfMeasureGroupingContentFilter
          >(unitOfMeasureGroupingContentFilter)
        ),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "unitOfMeasureGroupings.unitOfMeasureGroupingContent.number"
            )}
          </div>
        ))
        .Key("number")
        .Width(230)
        .Render(() => {
          return <div className="text-center">1</div>;
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "unitOfMeasureGroupings.unitOfMeasureGroupingContent.unitOfMeasure"
            )}
          </div>
        ))
        .Width(200)
        .Key(nameof(unitOfMeasureGroupingContents[0].unitOfMeasure))
        .DataIndex(nameof(unitOfMeasureGroupingContents[0].unitOfMeasure))
        .Render(
          (
            ...params: [UnitOfMeasure, UnitOfMeasureGroupingContent, number]
          ) => {
            return (
              <div className="table-cell__container">
                <Select
                  classFilter={UnitOfMeasureFilter}
                  modelFilter={unitOfMeasureFilter}
                  isMaterial={true}
                  placeHolder={"Đơn vị..."}
                  //getList={purchaseRequestRepository.singleListUnitOfMeasure}
                  onChange={handleChanngeUOM(params[1], params[2])}
                  model={params[1].unitOfMeasure}
                  disabled={params[2] === 0 ? true : false}
                />
              </div>
            );
          }
        ),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "unitOfMeasureGroupings.unitOfMeasureGroupingContent.equal"
            )}
          </div>
        ))
        .Width(50)
        .Key("equal")
        .Align("center")
        .Render(() => {
          return <> = </>;
        }),

      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "unitOfMeasureGroupings.unitOfMeasureGroupingContent.factor"
            )}
          </div>
        ))
        .Width(170)
        .Key(nameof(unitOfMeasureGroupingContents[0].factor))
        .DataIndex(nameof(unitOfMeasureGroupingContents[0].factor))
        .Render((...params: [number, UnitOfMeasureGroupingContent, number]) => {
          return (
            <div className="table-cell__container">
              <InputNumber
                isMaterial={true}
                value={params[1].factor}
                placeHolder={translate(
                  "unitOfMeasureGroupings.unitOfMeasureGroupingContent.placeholder.factor"
                )}
                onChange={handleChangeOneCell(
                  params[2],
                  nameof(unitOfMeasureGroupingContents[0].factor)
                )}
                numberType={DECIMAL}
                disabled={params[2] === 0 ? true : false}
              />
            </div>
          );
        }),
      CreateColumn()
        .Title(() => (
          <div className="table-cell__header">
            {translate(
              "unitOfMeasureGroupings.unitOfMeasureGroupingContent.unitOfMeasure"
            )}
          </div>
        ))
        .Width(200)
        .Key(nameof(unitOfMeasureGroupingContents[0].factor))
        .Render(() => {
          return (
            <div className="table-cell__container">
              {model?.unitOfMeasure?.name}
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
        .DataIndex(nameof(unitOfMeasureGroupingContents[0].key))
        .Render(
          (...params: [any, any, number]) => {
            if(params[2] === 0) {
              return null;
            }
            return RenderActionColumn(
              CreateTableAction()
                .Title(translate("general.delete.content"))
                .Icon("tio-delete_outlined text-danger")
                .Action(handleLocalDelete)
                .HasConfirm(true)
            )(...params);
          }
        )
    );
  }, [
    unitOfMeasureGroupingContentFilter,
    unitOfMeasureGroupingContents,
    RenderActionColumn,
    translate,
    handleLocalDelete,
    unitOfMeasureFilter,
    handleChanngeUOM,
    handleChangeOneCell,
    model,
  ]);

  return {
    unitOfMeasureGroupingContentFilter,
    unitOfMeasureGroupingContentList: list,
    loadUnitOfMeasureGroupingContentList: loadingList,
    unitOfMeasureGroupingContentTotal: total,
    handleAddUnitOfMeasureGroupingContent: handleAddContent,
    handleUnitOfMeasureGroupingContentTableChange: handleTableChange,
    handleUnitOfMeasureGroupingContentPagination: handlePagination,
    canBulkDeleteUnitOfMeasureGroupingContent: canBulkDelete,
    handleLocalBulkDeleteUnitOfMeasureGroupingContent: handleLocalBulkDelete,
    unitOfMeasureGroupingContentRef: ref,
    handleClickUnitOfMeasureGroupingContent: handleClick,
    handleImportUnitOfMeasureGroupingContent: handleImportContentList,
    handleExportUnitOfMeasureGroupingContent: handleContentExport,
    handleExportTemplateUnitOfMeasureGroupingContent: handleContentExportTemplate,
    unitOfMeasureGroupingContents,
    setUnitOfMeasureGroupingContents,
    unitOfMeasureGroupingContentColumns,
    handleChangeUOMBase,
  };
}
