/* begin general import */
import Select from "components/Utility/Select/Select";
import { masterTableIndex } from "helpers/table";
import { Action } from "models/Action";
import { Field, FieldFilter } from "models/Field";
import { Menu } from 'models/Menu';
/* end general import */
/* begin individual import */
import { Permission } from 'models/Permission';
import { PermissionActionMappingFilter } from "models/PermissionActionMapping";
import { PermissionContent, PermissionContentFilter } from "models/PermissionContent";
import { PermissionOperatorFilter } from "models/PermissionOperator";
import React from "react";
import { useTranslation } from "react-i18next";
import { roleRepository } from "repositories/role-repository";
import {
    AdvanceFilterAction,
    advanceFilterReducer,
    advanceFilterService
} from "services/advance-filter-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import {
    CreateColumn,
    CreateTableAction,
    CreateTableColumns
} from "services/component-factory/table-column-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import detailService from "services/pages/detail-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";
import FieldInput from "../FieldInput/FieldInput";
/* end individual import */

export function usePermisionActionMappingHook(
    model: Permission,
    setModel?: (data: Permission) => void,
) {
    const [translate] = useTranslation();
    const [listAction, setListAction] = React.useState<Action[]>([]);
    const [load, setLoad] = React.useState<boolean>(true);
    const [selectedList, setSelectedList] = React.useState<Action[]>([]);

    const {
        rowSelection,
        canBulkDelete, // for UI
    } = tableService.useContentRowSelection(selectedList, setSelectedList);
    const {
        content: permissionActionMappings,
        setContent: setPermissionActionMappings,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.permissionActionMappings)
    );
    React.useEffect(() => {
        if (model.menuId) {
            roleRepository.getMenu(model.menuId).subscribe((res: Menu) => {
                const list = res.actions.map(item => {
                    item.key = item.id;
                    return item;
                });
                setListAction(list);
            });

        }
    }, [model.menuId]);
    React.useEffect(() => {
        if (load) {
            if (permissionActionMappings && permissionActionMappings.length > 0) {
                setSelectedList(permissionActionMappings.map(item => item.action));
                setLoad(false);
            }
        }
    }, [load, permissionActionMappings, rowSelection]);
    React.useEffect(() => {
        if (rowSelection) {
            const list = [];
            listAction.forEach(item => {
                if (rowSelection.selectedRowKeys.includes(item.id)) {
                    list.push({ acction: item, actionId: item.id, permissionId: model.id });
                }
            });
            setPermissionActionMappings(list);
            model.permissionActionMappings = [...list];
            setModel({
                ...model,
            });
        }
    }, [listAction, model, rowSelection, setModel, setPermissionActionMappings]);

    React.useEffect(() => {
        if (load) {
            if (permissionActionMappings && permissionActionMappings.length > 0) {
                setSelectedList(permissionActionMappings.map(item => item.action));
                setLoad(false);
            }
        }
    }, [load, permissionActionMappings, rowSelection]);
    React.useEffect(() => {
        if (rowSelection) {
            const list = [];
            listAction.forEach(item => {
                if (rowSelection.selectedRowKeys.includes(item.id)) {
                    list.push({ acction: item, actionId: item.id, permissionId: model.id });
                }
            });
            setPermissionActionMappings(list);
            model.permissionActionMappings = [...list];
            setModel({
                ...model,
            });
        }
    }, [listAction, model, rowSelection, setModel, setPermissionActionMappings]);

    const [
        actionFilter,
        dispatchActionFilter,
    ] = React.useReducer<React.Reducer<
        PermissionActionMappingFilter,
        AdvanceFilterAction<PermissionActionMappingFilter>>
    >(advanceFilterReducer, new PermissionActionMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PermissionActionMappingFilter>
            (
                actionFilter,
                dispatchActionFilter,
                PermissionActionMappingFilter,
            );


    const { list, total, loadingList } = listService.useLocalList(
        actionFilter,
        listAction,
        loadList,
        setLoadList,
        {
            skip: 0,
            take: 1000000
        }
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
    const permissionActionMappingColumns = React.useMemo(() => {
        return CreateTableColumns(
            CreateColumn()
                .Title(
                    () => (
                        <>
                            <div className='text-left gradient-text mb-2'>
                                {translate('permissions.actions')}
                            </div>
                        </>
                    ))
                .Key(nameof(listAction[0].name))
                .DataIndex(nameof(listAction[0].name))
                .Align('left'),
        );
    },
        [
            listAction,
            translate,
        ]);


    return {
        filter: actionFilter,
        permissionActionMappingList: list,
        loadPermissionActionMappingList: loadingList,
        permissionActioMappingTotal: total,
        permissionActionMappingRowSelection: rowSelection,
        canBulkDeletePermissionActionMapping: canBulkDelete,
        handleResetPermissionActionMappingFilter: handleResetFilter,
        permissionActionMappingRef: ref,
        handleClickPermissionActionMapping: handleClick,
        handleImportPermissionActionMapping: handleImportContentList,
        handleExportPermissionActionMapping: handleContentExport,
        handleExportTemplatePermissionActionMapping: handleContentExportTemplate,
        permissionActionMappings,
        setPermissionActionMappings,
        permissionActionMappingColumns,
        handleSearchPermissionActionMapping: handleSearch,
    };
};



export function usePermisionContentHook(
    model: Permission,
    setModel?: (data: Permission) => void,
) {
    const [translate] = useTranslation();

    const {
        content: permissionContents,
        setContent: setPermissionContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.permissionContents)
    );


    const [
        permissionContentFilter,
        dispatchPermissionContentFilter,
    ] = React.useReducer<
        React.Reducer<
            PermissionContentFilter,
            AdvanceFilterAction<PermissionContentFilter>
        >
    >(advanceFilterReducer, new PermissionContentFilter());

    const { RenderActionColumn } = componentFactoryService;

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<
        PermissionContentFilter
    >(
        permissionContentFilter,
        dispatchPermissionContentFilter,
        PermissionContentFilter
    );


    const { list, total, loadingList } = listService.useLocalList(
        permissionContentFilter,
        permissionContents,
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
        PermissionContent,
        any,
        PermissionContentFilter
    >(
        permissionContentFilter,
        handleUpdateNewFilter,
        setLoadList,
        handleSearch,
        total,
        permissionContents,
        setPermissionContents,
        PermissionContent
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

    const permissionContentColumns = React.useMemo(() => {
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
                        PermissionContent,
                        PermissionContentFilter
                    >(permissionContentFilter)
                ),

            CreateColumn()
                .Title(() => (
                    <div className="table-cell__header">
                        {translate("permissions.permissionContents.field")}
                    </div>
                ))
                .Width(200)
                .Key(nameof(permissionContents[0].field))
                .DataIndex(nameof(permissionContents[0].field))
                .Render(
                    (...params: [Field, PermissionContent, number]) => {
                        const filedFilter = new FieldFilter();
                        filedFilter.menuId.equal = model.menuId;

                        return (
                            <div className="table-cell__container">
                                <Select
                                    classFilter={FieldFilter}
                                    isMaterial={true}
                                    placeHolder={"Đơn vị..."}
                                    getList={roleRepository.singleListField}
                                    onChange={handleChangeOneCell(
                                        params[2],
                                        nameof(permissionContents[0].field)
                                    )}
                                    model={params[1].field}
                                    modelFilter={filedFilter}

                                />
                            </div>
                        );
                    }
                ),

            CreateColumn()
                .Title(() => (
                    <div className="table-cell__header">
                        {translate("permissions.permissionContents.permissionOperator")}
                    </div>
                ))
                .Width(170)
                .Key(nameof(permissionContents[0].permissionOperator))
                .DataIndex(nameof(permissionContents[0].permissionOperator))
                .Render((...params: [number, PermissionContent, number]) => {
                    const permissionOperatorFilter = new PermissionOperatorFilter();
                    permissionOperatorFilter.fieldTypeId.equal = params[1].field?.fieldTypeId;
                    return (
                        <div className="table-cell__container">
                            {params[1].permissionOperator?.name === 'UserId' &&
                                params[0] === 101 ? (
                                '='
                            ) : (
                                <Select
                                    classFilter={FieldFilter}
                                    isMaterial={true}
                                    placeHolder={"Đơn vị..."}
                                    getList={roleRepository.singleListPermissionOperator}
                                    onChange={handleChangeOneCell(
                                        params[2],
                                        nameof(permissionContents[0].permissionOperator)
                                    )}
                                    model={params[1].permissionOperator}
                                    modelFilter={permissionOperatorFilter}
                                />
                            )}
                        </div>
                    );
                }),
            CreateColumn()
                .Title(() => (
                    <div className="table-cell__header">
                        {translate("permissions.permissionContents.value")}
                    </div>
                ))
                .Width(200)
                .Key(nameof(permissionContents[0].value))
                .DataIndex(nameof(permissionContents[0].value))
                .Render((...params: [string, PermissionContent, number]) => {
                    return (
                        <div className='mt-4'>
                            <FieldInput
                                value={params[0]}
                                index={params[2]}
                                contents={permissionContents}
                                setContents={setPermissionContents}
                                disabled={
                                    params[1].fieldId === undefined ||
                                    typeof params[1].errors?.field === 'string'
                                }
                            />
                        </div>

                    );
                })
            ,
            CreateColumn()
                .Title(() => (
                    <div className="table-cell__header">
                        {translate("general.actions.action")}
                    </div>
                ))
                .Key("actions") // key
                .Width(100)
                .DataIndex(nameof(permissionContents[0].key))
                .Render(
                    (...params: [any, any, number]) => {
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
        permissionContentFilter,
        permissionContents,
        translate,
        handleChangeOneCell,
        handleLocalDelete,
        RenderActionColumn,
        model.menuId,
        setPermissionContents,
    ]);


    return {

        permissionContentFilter,
        permissionContentList: list,
        loadPermissionContentList: loadingList,
        permissionContentTotal: total,
        handleAddPermissionContent: handleAddContent,
        handlePermissionContentTableChange: handleTableChange,
        handlePermissionContentPagination: handlePagination,
        canBulkDeletePermissionContent: canBulkDelete,
        handleLocalBulkDeletePermissionContent: handleLocalBulkDelete,
        permissionContentRef: ref,
        handleClickPermissionContent: handleClick,
        handleImportPermissionContent: handleImportContentList,
        handleExportPermissionContent: handleContentExport,
        handleExportTemplatePermissionContent: handleContentExportTemplate,
        permissionContents,
        setPermissionContents,
        permissionContentColumns,
        handleSearchPermissionContent: handleSearch,
    };
};