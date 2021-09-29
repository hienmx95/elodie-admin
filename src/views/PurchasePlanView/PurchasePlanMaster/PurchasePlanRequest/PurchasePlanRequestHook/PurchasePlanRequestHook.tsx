import { useState, useCallback } from "react";
import { Observable } from "rxjs";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import { routerService } from "services/route-service";
import { queryStringService } from "services/query-string-service";
import { advanceFilterService } from "services/advance-filter-service";
import { PaginationProps } from "antd";
import tableService from "services/table-service";
import listService from "services/list-service";

export function usePurchasePlanRequest(
  modelFilterClass: new () => PurchaseRequestFilter,
  routePrefix: string,
  getList: (filter: PurchaseRequestFilter) => Observable<PurchaseRequest[]>,
  getTotal: (filter: PurchaseRequestFilter) => Observable<number>
) {
  const [
    handleGoCreate,
    handleGoDetail,
    ,
    ,
    handleGoPreview,
    handleGoApproval,
  ] = routerService.useMasterNavigation(
    routePrefix // should replace to pricelist detail route base on rbac
  );
  // toggle search state
  const [toggle, setToggle] = useState<boolean>(false);

  // toggle search method, expose this
  const handleToggleSearch = useCallback(() => {
    const toggleTmp = !toggle;
    setToggle(toggleTmp);
  }, [toggle, setToggle]);

  const [filter, dispatch] = queryStringService.useQueryString<
    PurchaseRequestFilter
  >(modelFilterClass);

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleChangeFilter,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useChangeAdvanceFilter<PurchaseRequestFilter>(
    filter,
    dispatch,
    modelFilterClass
  );

  const { list, total, loadingList } = listService.useList(
    filter,
    handleUpdateNewFilter,
    loadList,
    setLoadList,
    handleSearch,
    getList,
    getTotal
  );

  const pagination: PaginationProps = tableService.usePagination<
    PurchaseRequestFilter
  >(filter, total);

  const { handleTableChange, handlePagination } = tableService.useTable<
    PurchaseRequest,
    PurchaseRequestFilter
  >(filter, handleUpdateNewFilter, handleSearch, null, null, null);

  return {
    list,
    total,
    loadingList,
    filter,
    dispatch,
    toggle,
    handleUpdateNewFilter,
    handleChangeFilter,
    handleResetFilter,
    handleGoCreate,
    handleGoDetail,
    handleGoPreview,
    handleGoApproval,
    handleToggleSearch,
    handleTableChange,
    handlePagination,
    handleSearch,
    pagination, // optional using
  };
}

export function usePurchaseMaster(
  modelFilterClass: new () => PurchaseRequestFilter
) {
  // toggle search state

  const [filter, dispatch] = queryStringService.useQueryString<
    PurchaseRequestFilter
  >(modelFilterClass);

  const {
    handleChangeFilter,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useChangeAdvanceFilter<PurchaseRequestFilter>(
    filter,
    dispatch,
    modelFilterClass
  );

  return {
    filter,
    dispatch,
    handleUpdateNewFilter,
    handleChangeFilter,
    handleResetFilter,
  };
}
