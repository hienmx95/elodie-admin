import { PaginationProps } from "antd";
import { PURCHASE_REQUEST_PREVIEW_ROUTE } from "config/route-consts";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
import { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Observable } from "rxjs";
import { advanceFilterService } from "services/advance-filter-service";
import { importExportDataService } from "services/import-export-data-service";
import listService from "services/list-service";
import { queryStringService } from "services/query-string-service";
import { routerService } from "services/route-service";
import tableService from "services/table-service";

export function usePurchasePlanTracking(
  modelFilterClass: new () => PurchasePlanFilter,
  routePrefix: string,
  getList: (filter: PurchasePlanFilter) => Observable<PurchasePlan[]>,
  getTotal: (filter: PurchasePlanFilter) => Observable<number>,
  deleteItem?: (t: PurchasePlan) => Observable<PurchasePlan>,
  // onUpdateListSuccess?: (item?: PurchasePlan) => void,
  onImportSuccess?: (list: PurchasePlan[]) => void
) {
  const [handleGoCreate] = routerService.useMasterNavigation(
    routePrefix // should replace to pricelist detail route base on rbac
  );

  const history = useHistory();

  const baseRoute = useMemo(() => {
    let listPath = routePrefix.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, [routePrefix]);

  const handleGoDetail = useCallback(
    (purchasePlan: any) => {
      return () => {
        history.push(
          `${routePrefix}${baseRoute}-detail?id=${purchasePlan?.id}&purchasePlanTypeId=${purchasePlan?.purchasePlanTypeId}`
        );
      };
    },
    [routePrefix, baseRoute, history]
  );

  const handleGoWaiting = useCallback(
    (purchasePlan: any) => {
      return () => {
        history.push(
          `${routePrefix}${baseRoute}-waiting?id=${purchasePlan?.id}&purchasePlanTypeId=${purchasePlan?.purchasePlanTypeId}`
        );
      };
    },
    [routePrefix, baseRoute, history]
  );

  const handleGoApprove = useCallback(
    (purchasePlan: any) => {
      return () => {
        history.push(
          `${routePrefix}${baseRoute}-approve?id=${purchasePlan?.id}&purchasePlanTypeId=${purchasePlan?.purchasePlanTypeId}`
        );
      };
    },
    [routePrefix, baseRoute, history]
  );

  const handleGoPreview = useCallback(
    (purchasePlan: any) => {
      return () => {
        history.push(
          `${routePrefix}${baseRoute}-preview?id=${purchasePlan?.id}&purchasePlanTypeId=${purchasePlan?.purchasePlanTypeId}`
        );
      };
    },
    [routePrefix, baseRoute, history]
  );
  const handleGoPreviewPurchaseRequest = useCallback(
    (id: any) => {
      return () => {
        history.push(
          `${PURCHASE_REQUEST_PREVIEW_ROUTE}?id=${id}`
        );
      };
    },
    [history]
  );

  // toggle search state
  const [toggle, setToggle] = useState<boolean>(false);

  // toggle search method, expose this
  const handleToggleSearch = useCallback(() => {
    const toggleTmp = !toggle;
    setToggle(toggleTmp);
  }, [toggle, setToggle]);

  const [filter, dispatch] = queryStringService.useQueryString<
    PurchasePlanFilter
  >(modelFilterClass);

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleChangeFilter,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useChangeAdvanceFilter<PurchasePlanFilter>(
    filter,
    dispatch,
    modelFilterClass
  );

  const {
    list,
    total,
    loadingList,
    handleDelete: onServerDelete,
  } = listService.useList(
    filter,
    handleUpdateNewFilter,
    loadList,
    setLoadList,
    handleSearch,
    getList,
    getTotal,
    deleteItem
  );

  const pagination: PaginationProps = tableService.usePagination<
    PurchasePlanFilter
  >(filter, total);

  const {
    handleTableChange,
    handlePagination,
    handleServerDelete,
  } = tableService.useTable<PurchasePlan, PurchasePlanFilter>(
    filter,
    handleUpdateNewFilter,
    handleSearch,
    null,
    onServerDelete,
    null
  );

  const { handleImportList } = importExportDataService.useImport(
    onImportSuccess
  );

  const {
    handleListExport,
    handleExportTemplateList,
  } = importExportDataService.useExport();

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
    handleGoApprove,
    handleGoWaiting,
    handleToggleSearch,
    handleTableChange,
    handlePagination,
    handleSearch,
    handleServerDelete,
    handleListExport,
    handleImportList,
    handleExportTemplateList,
    handleGoPreviewPurchaseRequest,
    pagination, // optional using
  };
}
