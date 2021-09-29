/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import { masterTableIndex } from "helpers/table";
import { AppUser, AppUserFilter } from 'models/AppUser';
import { AppUserRoleMapping, AppUserRoleMappingFilter } from 'models/AppUserRoleMapping';
import { OrganizationFilter } from "models/Organization";
/* end general import */
/* begin individual import */
import { Role } from 'models/Role';
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
import tableService, { mappingToMapper } from "services/table-service";
import nameof from "ts-nameof.macro";
/* end individual import */

export function useAppUserRoleMappingTable(
    model: Role,
    setModel: (data: Role) => void,
) {
    const [translate] = useTranslation();

    const {
        content: appUserRoleMappings,
        setContent: setAppUserRoleMappings,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.appUserRoleMappings),
    );

    const [appUsers, setAppUsers] = React.useState<AppUser[]>([]);


    React.useEffect(() => {
        if (appUserRoleMappings && appUserRoleMappings.length > 0) {
            const list = appUserRoleMappings.map(item => {
                let user = new AppUser();
                user = item.appUser;
                user.key = item.key;

                return user;
            });
            setAppUsers([...list]);
        }
    }, [appUserRoleMappings]);



    const {
        RenderStringFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        appUserFilter,
        dispatchAppUserFilter,
    ] = React.useReducer<React.Reducer<
        AppUserRoleMappingFilter,
        AdvanceFilterAction<AppUserFilter>>
    >(advanceFilterReducer, new AppUserFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<AppUserRoleMappingFilter>
            (
                appUserFilter,
                dispatchAppUserFilter,
                AppUserFilter,

            );


    const { list, total, loadingList } = listService.useLocalList(
        appUserFilter,
        appUsers,
        loadList,
        setLoadList,
    );


    const handleDeleteAppUser = React.useCallback((user) => {
        const listAppUser = appUsers.filter((i: AppUser) => i.key !== user.key);
        setAppUsers([...listAppUser]);
        const list = listAppUser.map(item => {
            const maping = new AppUserRoleMapping();
            maping.appUser = item;
            maping.appUserId = item.id;
            return maping;
        });
        setAppUserRoleMappings([...list]);

    }, [appUsers, setAppUserRoleMappings]);
    const {
        handleTableChange,
        handlePagination,
        rowSelection,
        canBulkDelete,
        handleLocalBulkDelete,
        handleAddContent,
    } = tableService.useLocalTable
            <
                AppUser,
                any,
                AppUserFilter
            >
            (
                appUserFilter,
                handleUpdateNewFilter,
                setLoadList,
                handleSearch,
                total,
                appUsers,
                setAppUsers,
                AppUserRoleMapping,
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
    const appUserRoleMappingColumns = React.useMemo(() => {
        return CreateTableColumns(

            CreateColumn()
                .Title(
                    () => (
                        <>
                            <div className='text-center gradient-text mb-5 '>
                                {translate("general.columns.index")}
                            </div>
                        </>
                    )
                )
                .Align("center")
                .Key("index")
                .Width(70)
                .Render(masterTableIndex<AppUserRoleMapping, AppUserRoleMappingFilter>
                    (appUserFilter),
                ),

            CreateColumn()
                .Title(
                    () => (
                        <>
                            <div className='text-left gradient-text mb-2'>
                                {translate("roles.appUsers.displayName")}
                            </div>
                            { RenderStringFilter(
                                appUserFilter["displayName"]["contain"],
                                handleChangeFilter(
                                    "displayName",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("roles.appUsers.placeholder.displayName"),
                            )}
                        </>
                    )
                )
                .Key(nameof(appUsers[0].displayName)) //Key
                .DataIndex(nameof(appUsers[0].displayName))

            ,


            CreateColumn()
                .Title(
                    () => (
                        <>
                            <div className='text-left gradient-text mb-2'>
                                {translate("roles.appUsers.username")}
                            </div>
                            { RenderStringFilter(
                                appUserFilter["username"]["contain"],
                                handleChangeFilter(
                                    "username",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("roles.appUsers.placeholder.username"),
                                // translate("roles.appUsers.username"),
                            )}
                        </>
                    )
                )
                .Key(nameof(appUsers[0].username))
                .DataIndex(nameof(appUsers[0].username))

            ,
            CreateColumn()
                .Title(
                    () => (
                        <>
                            <div className='text-left gradient-text mb-2'>
                                {translate("roles.appUsers.phone")}
                            </div>
                            { RenderStringFilter(
                                appUserFilter["phone"]["contain"],
                                handleChangeFilter(
                                    "phone",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("roles.appUsers.placeholder.phone"),
                            )}
                        </>
                    )
                )
                .Key(nameof(appUsers[0].phone))
                .DataIndex(nameof(appUsers[0].phone))

            ,
            CreateColumn()
                .Title(
                    () => (
                        <>
                            <div className='text-left gradient-text mb-2'>
                                {translate("roles.appUsers.email")}
                            </div>
                            { RenderStringFilter(
                                appUserFilter["email"]["contain"],
                                handleChangeFilter(
                                    "email",
                                    "contain" as any,
                                    StringFilter,
                                ),
                                translate("roles.appUsers.placeholder.email"),
                            )}
                        </>
                    ))
                .Key(nameof(appUsers[0].email))
                .DataIndex(nameof(appUsers[0].email))
            ,


            CreateColumn()
                .Title(() =>
                    <div className='text-center gradient-text mb-5'>
                        {translate("general.actions.label")}
                    </div>)
                .Key("actions") // key
                .Width(120)
                .DataIndex(nameof(appUsers[0].id))
                .Render(
                    RenderActionColumn(
                        CreateTableAction()
                            .Title(translate("general.delete.content"))
                            .Icon("tio-delete_outlined text-danger")
                            .Action(handleDeleteAppUser)
                            .HasConfirm(true),
                    ),
                ),

        );
    },
        [appUserFilter, appUsers, RenderActionColumn, translate, handleDeleteAppUser, RenderStringFilter, handleChangeFilter]);

    return {
        appUserContentFilter: appUserFilter,
        appUserRoleMappingList: list,
        loadAppUserRoleMappingList: loadingList,
        appUserRoleMappingTotal: total,
        handleAddAppUserRoleMapping: handleAddContent,
        handleAppUserRoleMappingTableChange: handleTableChange,
        handleAppUserRoleMappingPagination: handlePagination,
        appUserRoleMappingRowSelection: rowSelection,
        canBulkDeleteAppUserRoleMapping: canBulkDelete,
        handleResetAppUserRoleMappingFilter: handleResetFilter,
        handleLocalBulkDeleteAppUserRoleMapping: handleLocalBulkDelete,
        appUserRoleMappingRef: ref,
        handleClickAppUserRoleMapping: handleClick,
        handleImportAppUserRoleMapping: handleImportContentList,
        handleExportAppUserRoleMapping: handleContentExport,
        handleExportTemplateAppUserRoleMapping: handleContentExportTemplate,
        appUserRoleMappings,
        setAppUserRoleMappings,
        appUserRoleMappingColumns,
        handleSearchAppUserRoleMapping: handleSearch,
    };
};

export function useAppUserRoleMappingModal(
    source: AppUserRoleMapping[],
    handleSource?: () => void
) {

    const [translate] = useTranslation();
    const [appUserFilter, dispatchAppUserFilter] = React.useReducer<
        React.Reducer<AppUserFilter, AdvanceFilterAction<AppUserFilter>>>
        (advanceFilterReducer, new AppUserFilter());


    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<AppUserFilter>(
        appUserFilter,
        dispatchAppUserFilter,
        AppUserFilter,
        false,
    );

    const selectedAppUserList = React.useMemo(
        () => (source?.length > 0 ? source.map(mappingToMapper("appUser")) : []),
        [source],
    );

    const appUserModalFilters = React.useMemo(
        () => [
            <AdvanceStringFilter
                value={appUserFilter['username']["contain"]}
                onEnter={handleChangeFilter("username", "contain" as any, StringFilter)}
                isMaterial={true}
                className={"tio-search"}
                title={translate('roles.appUsers.username')}
                placeHolder={translate('roles.appUsers.placeholder.username')}
            />,

            <AdvanceStringFilter
                value={appUserFilter['displayName']["contain"]}
                onEnter={handleChangeFilter("displayName", "contain" as any, StringFilter)}
                isMaterial={true}
                className={"tio-search"}
                title={translate('roles.appUsers.displayName')}
                placeHolder={translate('roles.appUsers.placeholder.displayName')}
            />,
            <AdvanceTreeFilter
                title={translate("purchaseRequests.requestOrganization")}
                classFilter={OrganizationFilter}
                onChangeSingleItem={handleChangeFilter("organizationId", "equal" as any, IdFilter)}
                checkStrictly={true}
                getTreeData={roleRepository.singleListOrganization}
                isMaterial={true}
                placeHolder={translate(
                    "purchaseRequests.placeholder.requestOrganization"
                )}
            />,
            <AdvanceStringFilter
                value={appUserFilter['phone']["contain"]}
                onEnter={handleChangeFilter("phone", "contain" as any, StringFilter)}
                isMaterial={true}
                className={"tio-search"}
                title={translate('roles.appUsers.phone')}
                placeHolder={translate('roles.appUsers.placeholder.phone')}
            />,
            <AdvanceStringFilter
                value={appUserFilter['email']["contain"]}
                onEnter={handleChangeFilter("email", "contain" as any, StringFilter)}
                isMaterial={true}
                className={"tio-search"}
                title={translate('roles.appUsers.email')}
                placeHolder={translate('roles.appUsers.placeholder.email')}
            />,
        ],
        [handleChangeFilter, appUserFilter, translate]);

    const appUserColumns = React.useMemo(
        () =>
            CreateTableColumns(
                CreateColumn()
                    .Title(translate("general.columns.index"))
                    .Key("index")
                    .Width(70)
                    .Render(masterTableIndex<AppUser, AppUserFilter>(appUserFilter)),

                CreateColumn()
                    .Title(translate("roles.appUsers.username"))
                    .Key("username")
                    .DataIndex("username"),

                CreateColumn()
                    .Title(translate("roles.appUsers.displayName"))
                    .Key("displayName")
                    .DataIndex("displayName"),
                CreateColumn()
                    .Title(translate("roles.appUsers.organization"))
                    .Key("organization")
                    .DataIndex("organization")
                    .Render((...[organization]) => {
                        return organization?.name;
                    }),

                CreateColumn()
                    .Title(translate("roles.appUsers.phone"))
                    .Key("phone")
                    .DataIndex("phone"),

                CreateColumn()
                    .Title(translate("roles.appUsers.email"))
                    .Key("email")
                    .DataIndex("email"),

            ),
        [appUserFilter, translate],
    );

    const {
        visible,
        loadControl,
        handleEndControl,
        handleOpenModal,
        handleCloseModal,
        handleSaveModal,
    } = tableService.useContenModal(handleSource);

    React.useEffect(() => {
        if (loadControl) {
            handleSearch();
            handleEndControl();
        }
    }, [handleSearch, loadControl, handleEndControl]);

    return {
        appUserModalFilters,
        visibleAppUser: visible,
        handleOpenAppUserModal: handleOpenModal,
        handleCloseAppUserModal: handleCloseModal,
        handleSaveAppUserModal: handleSaveModal,
        selectedAppUserList,
        appUserFilter,
        dispatchAppUserFilter,
        appUserColumns,
        loadAppUserList: loadList,
        setLoadAppUserList: setLoadList,
        handleSearchAppUser: handleSearch,
        handleUpdateNewAppUserFilter: handleUpdateNewFilter,
        handleResetAppUserFilter: handleResetFilter,
    };

};

export const appUserRoleMappingContentMapper =
    (model: AppUserRoleMapping | AppUser): AppUserRoleMapping => {
        if (model.hasOwnProperty("appUser")) {
            const { appUser } = model;
            return {
                ...model,
                appUserId: appUser?.id,
                appUser: appUser,
            };
        }

        return appUserRoleMappingContentMapper({
            ...new AppUserRoleMapping(),
            appUser: model as AppUser,
        });
    };

