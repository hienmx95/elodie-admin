import {
  DateFilter,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "@react3l/advanced-filters";
import { Filter } from "@react3l/advanced-filters/Filter";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { commonService } from "@react3l/react3l/services";
import { INFINITE_SCROLL_TAKE } from "config/consts";
import { useCallback, useEffect, useRef, useState } from "react";
import { forkJoin, Observable } from "rxjs";
import {
  ActionFilterEnum,
  advanceFilterService,
} from "services/advance-filter-service";
import { importExportDataService } from "services/import-export-data-service";
import { queryStringService } from "services/query-string-service";

export function uniqueArray(array: any[], field, field2) {
  return array.reduce((acc, current) => {
    const x = acc.find((item) => item[field] === current[field]);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc.map((item) => {
        if (item[field] === current[field]) {
          item[field2] = [...item[field2], ...current[field2]];
        }
        return item;
      });
    }
  }, []);
}

export function useMaster<T extends Model, TFilter extends ModelFilter>(
  modelFilterClass: new () => TFilter,
  getList: (filter: TFilter) => Observable<T[]>,
  getCount: (filter: TFilter) => Observable<number>,
  getTotal?: (filter: TFilter) => Observable<any>
) {
  // toggle search state
  const [toggle, setToggle] = useState<boolean>(false);

  // toggle search method, expose this
  const handleToggleSearch = useCallback(() => {
    const toggleTmp = !toggle;
    setToggle(toggleTmp);
  }, [toggle, setToggle]);

  const [filter, dispatch] = queryStringService.useQueryString<TFilter>(
    modelFilterClass
  );

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<TFilter>(
    filter,
    dispatch,
    modelFilterClass
  );

  const [reset, setReset] = useState<boolean>(true);
  const [subscription] = commonService.useSubscription();
  const [list, setList] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalList, setTotalList] = useState<any>(null);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const handleLoadList = useCallback(
    (filter) => {
      setLoadingList(true);
      //
      if (typeof getTotal === "function") {
        getTotal(filter).subscribe((total) => {
          setTotalList(total);
        });
        subscription.add(
          forkJoin([
            getList(filter),
            getCount(filter),
            getTotal(filter),
          ]).subscribe((results: [T[], number, any]) => {
            setList([...results[0]]);
            setTotal(results[1]);
            setTotalList(results[2]);
            setLoadingList(false);
            setLoadingData(true);
          })
        );
      } else {
        subscription.add(
          forkJoin([getList(filter), getCount(filter)]).subscribe(
            (results: [any[], number]) => {
              setList([...results[0]]);
              setTotal(results[1]);
              setLoadingList(false);
              setLoadingData(true);
            }
          )
        );
      }

      // );
    },
    [getTotal, subscription, getList, getCount]
  );

  useEffect(() => {
    let scrollFilter = {
      ...filter,
      take: INFINITE_SCROLL_TAKE,
    };
    if (reset) {
      scrollFilter = { ...scrollFilter, skip: 0 };
      handleUpdateNewFilter(scrollFilter);
      handleLoadList(scrollFilter);
      setReset(false);
    }
  }, [
    filter,
    getList,
    getCount,
    handleLoadList,
    handleUpdateNewFilter,
    loadList,
    reset,
    setLoadList,
  ]);

  const handleChangeFilter = useCallback(
    (
      fieldName: string,
      fieldType: keyof Filter | (keyof Filter)[],
      ClassSubFilter: new (partial?: any) =>
        | StringFilter
        | NumberFilter
        | DateFilter
        | IdFilter
    ) => (value: any) => {
      if (fieldType instanceof Array) {
        dispatch({
          type: ActionFilterEnum.ChangeAllField,
          data: {
            ...filter,
            skip: 0,
            [fieldName]: new ClassSubFilter({
              [nameof("greaterEqual")]: value[0],
              [nameof("lessEqual")]: value[1],
            }),
          },
        });
      } else {
        if (value instanceof Array) {
          if (moment.isMoment(value[0])) {
            dispatch({
              type: ActionFilterEnum.ChangeAllField,
              data: {
                ...filter,
                skip: 0,
                [fieldName]: new ClassSubFilter({
                  [nameof("greater")]: value[0],
                  [nameof("less")]: value[1],
                }),
              },
            });
          } else {
            const ids = value.map((item) => item?.id);
            if (ids && typeof ids[0] !== "undefined") {
              dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: {
                  ...filter,
                  skip: 0,
                  [fieldName]: new ClassSubFilter({
                    [nameof("in")]: ids,
                  }),
                },
              });
            } else {
              dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: {
                  ...filter,
                  skip: 0,
                  [fieldName]: {
                    [nameof(NumberFilter.prototype.greaterEqual)]: value[0],
                    [nameof(NumberFilter.prototype.lessEqual)]: value[1],
                  },
                },
              });
            }
          }
        } else {
          dispatch({
            type: ActionFilterEnum.ChangeOneField,
            fieldName: fieldName,
            fieldType: fieldType,
            fieldValue: value,
            classFilter: ClassSubFilter,
          });
        }
      }
      setReset(true);
      handleSearch();
    },
    [dispatch, filter, handleSearch]
  );

  const handleResetFilter = useCallback(() => {
    const newFilter = new modelFilterClass();
    newFilter.skip = 0;
    newFilter.take = 20;

    dispatch({
      type: ActionFilterEnum.ChangeAllField,
      data: newFilter,
    });
    setReset(true);
    handleSearch();
  }, [modelFilterClass, dispatch, handleSearch]);

  // handle server delete nhận vào on server delete

  const {
    handleListExport,
    handleExportTemplateList,
  } = importExportDataService.useExport();

  const importButtonRef: React.LegacyRef<HTMLInputElement> = useRef<
    HTMLInputElement
  >();
  return {
    list,
    total,
    loadingList,
    filter,
    toggle,
    handleUpdateNewFilter,
    handleChangeFilter,
    handleResetFilter,
    handleToggleSearch,
    handleSearch,
    handleListExport,
    handleExportTemplateList,
    importButtonRef,
    dispatch,
    setList,
    setLoadingList,
    reset,
    setReset,
    loadingData,
    setLoadingData,
    loadList,
    setLoadList,
    totalList,
  };
}
