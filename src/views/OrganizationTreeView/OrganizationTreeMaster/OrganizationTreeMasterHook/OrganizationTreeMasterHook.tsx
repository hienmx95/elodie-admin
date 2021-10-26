import { commonService } from "@react3l/react3l/services";
import { Modal } from "antd";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization } from "models/Organization";
import React, { Reducer, useCallback, useReducer, useState } from "react";
import { forkJoin, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AdvanceFilterAction, advanceFilterReducer, advanceFilterService } from "services/advance-filter-service";
import appMessageService from "services/app-message-service";
import { importExportDataService } from "services/import-export-data-service";
import listService, { ActionOfList, StateOfList } from "services/list-service";
import { UseMaster } from "services/pages/master-service";
import tableService from "services/table-service";
export const SET_LIST: string = "SET_LIST";
export const INIT_FETCH: string = "INIT_FETCH";
export const END_FETCH: string = "END_FETCH";
export const END_LOAD: string = "END_LOAD";
export const INIT_SEARCH: string = "INIT_SEARCH";

function listReducer<T>(
    state: StateOfList<T>,
    action: ActionOfList<T>
): StateOfList<T> {
    switch (action.type) {
        case SET_LIST: {
            const { list, total } = action.payload;
            return {
                ...state,
                list,
                total,
            };
        }
        case INIT_FETCH: {
            return {
                ...state,
                loadingList: true,
            };
        }
        case END_FETCH: {
            return {
                ...state,
                loadingList: false,
            };
        }
        case END_LOAD: {
            return {
                ...state,
                isLoadList: false,
            };
        }
        case INIT_SEARCH: {
            return {
                ...state,
                isLoadList: true,
            };
        }
    }
}

export function useOrganizationTreeMasterHook(
    updateIsDisplay: (t: Organization) => Observable<Organization>,
    getList: (filter: AppUserFilter) => Observable<AppUser[]>,
    getTotal: (filter: AppUserFilter) => Observable<number>,
    handleSeach?: () => void, //trigger updateList
    translate?: TFunction,
    validAction?: TFunction,
    master?: UseMaster,
) {
    const [currentNode, setCurrentNode] = useState<Organization>(new Organization());
    const [
        appUserFilter,
        dispatchAppUserFilter,
    ] = React.useReducer<React.Reducer<AppUserFilter, AdvanceFilterAction<AppUserFilter>>>
            (advanceFilterReducer, new AppUserFilter());

    const [isActive, setActive] = useState<boolean>(false);
    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();
    const [subscription] = commonService.useSubscription();

    const [{ list, total, loadingList }, dispatchList] = useReducer<
        Reducer<StateOfList<AppUser>, ActionOfList<AppUser>>
    >(listReducer, {
        list: [],
        total: 0,
        loadingList: false,
    });
    const { handleFetchInit, handleFetchEnd } = listService.useFetchEffect(dispatchList);
    const {
        handleSearch,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<AppUserFilter>(
        appUserFilter,
        dispatchAppUserFilter,
        AppUserFilter,
    );
    const handleLoadList = useCallback((filterValue) => {
        handleFetchInit();
        subscription.add(
            forkJoin([getList(filterValue), getTotal(filterValue)])
                .pipe(
                    finalize(handleFetchEnd)
                )
                .subscribe((results: [AppUser[], number]) => {
                    dispatchList({
                        type: SET_LIST,
                        payload: {
                            list: results[0],
                            total: results[1],
                        },
                    });

                })
        );
    }, [getList, getTotal, handleFetchEnd, handleFetchInit, subscription]);
    const {
        handleTableChange,
        handlePagination,
    } = tableService.useTable<AppUser, AppUserFilter>
            (
                appUserFilter,
                handleUpdateNewFilter,
                handleSearch,
                null,
                null,
                null,
            );

    const handleClick = useCallback((node) => {
        setCurrentNode(node);
        const newFilter = { ...appUserFilter };
        newFilter.organizationId.equal = node.id;
        if (validAction('listAppUser')) {
            handleLoadList(newFilter);
            setActive(true);
        }


    }, [appUserFilter, handleLoadList, validAction]);

    const handleChangeSearch = React.useCallback(
        (fieldName: string) => (value: any) => {
            const filterValue = { ...appUserFilter };
            filterValue[fieldName] = value;
            filterValue["skip"] = 0;
            filterValue["take"] = 10;
            handleLoadList(filterValue);
        },
        [appUserFilter, handleLoadList]
    );

    const handleChangeIsDisplay = React.useCallback(
        (node: Organization) => {
            if (node?.parent && !node?.parent?.isDisplay) {
                Modal.warning({
                    title: '',
                    content: translate('organizations.errors.changeDisplay'),
                });
            } else {
                const newOrganization = { ...node };
                node.isDisplay = !newOrganization.isDisplay;
                updateIsDisplay(node)
                    .subscribe(
                        () => {
                            notifyUpdateItemSuccess();
                            handleSeach();
                        },
                        (error: AxiosError<Organization>) => {
                            notifyUpdateItemError();
                        }
                    );
            }
        },
        [
            translate,
            updateIsDisplay,
            notifyUpdateItemSuccess,
            handleSeach,
            notifyUpdateItemError,
        ],
    );
  const handleDelete = React.useCallback(
    (node: any) => () => {
      master.handleServerDelete(node);
    },
    [master]
  );
    const {
        handleListExport: handleExportAppUser,
    } = importExportDataService.useExport();


    return {
        isActive,
        total,
        list,
        loadingList,
        appUserFilter,
        currentNode,
        handleClick,
        handleTableChange,
        handlePagination,
        handleChangeIsDisplay,
        handleChangeSearch,
        handleExportAppUser,
        handleDelete
    };


}