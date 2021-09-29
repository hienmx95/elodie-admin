import { commonService } from '@react3l/react3l/services/common-service';
import { Modal, PaginationProps } from 'antd';
import { Permission, PermissionFilter } from 'models/Permission';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdvanceFilterAction, advanceFilterReducer, advanceFilterService } from 'services/advance-filter-service';
import tableService from 'services/table-service';
export function usePermissionRoleMappingHook(
    modelFilterClass: new () => PermissionFilter,
    getList: (filter: PermissionFilter) => Observable<Permission[]>,
    getTotal: (filter: PermissionFilter) => Observable<number>,
    deleteItem?: (t: Permission) => Observable<Permission>, // pass repo.delete here
    id?: number,
) {

    const [subscription] = commonService.useSubscription();
    const [toggle, setToggle] = useState<boolean>(false);
    const [translate] = useTranslation();

    // toggle search method, expose this
    const handleToggleSearch = useCallback(() => {
        const toggleTmp = !toggle;
        setToggle(toggleTmp);
    }, [toggle, setToggle]);
    const [list, setList] = useState<Permission[]>([]);
    const [total, setTotal] = useState<number>(undefined);

    const [
        filter,
        setFilter,
    ] = React.useReducer<React.Reducer<
        PermissionFilter,
        AdvanceFilterAction<PermissionFilter>>
    >(advanceFilterReducer, new PermissionFilter());
    const [loading, setLoading] = useState<boolean>(false);
    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PermissionFilter>(
        filter,
        setFilter,
        modelFilterClass
    );
    useEffect(() => {
        if (id) {
            if (loadList) {
                filter['roleId']['equal'] = id;
                setLoading(true);
                const getNCountItems = forkJoin([
                    getList(filter),
                    getTotal(filter),
                ]).pipe(finalize(() => {
                    setLoading(false);
                })).subscribe(
                    (results: [Permission[], number]) => {
                        setList([...results[0]]);
                        setTotal(Number(results[1]));
                        setLoading(false);
                        setLoadList(false);
                    },
                    (errors: any) => { }
                );
                subscription.add(getNCountItems);
            }
        }
    },
        [filter, getList, getTotal, id, loadList, setLoadList, subscription]
    );

    const pagination: PaginationProps = tableService.usePagination<PermissionFilter>(
        filter,
        total
    );
    const handleServerDelete = React.useCallback((item) => {
        Modal.confirm({
            title: translate("general.delete.content"),
            content: translate("general.delete.title"),
            okType: "danger",
            onOk() {
                deleteItem(item).pipe(finalize(() => {
                    setLoading(false);
                })).subscribe(
                    (res) => {
                        setLoading(false);
                        setLoadList(true);
                    },
                    (errors: any) => { }
                );
            },
        });

    }, [deleteItem, setLoadList, translate]);

    const {
        handleTableChange,
        handlePagination,
    } = tableService.useTable<Permission, PermissionFilter>
            (
                filter,
                handleUpdateNewFilter,
                handleSearch,
                null,
                null,
                null,
            );


    return {
        list,
        total,
        loading,
        filter,
        toggle,
        handleUpdateNewFilter,
        handleChangeFilter,
        handleResetFilter,
        handleToggleSearch,
        handleTableChange,
        handleServerDelete,
        handleSearch,
        pagination,
        handlePagination, // optional using
    };
}
