import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { AxiosResponse } from "axios";
import { API_DASHBOARD_ORDER_PREFIX } from "config/api-consts";
import { BASE_API_URL } from "config/consts";
import { httpConfig } from "config/http";
import { InternalOrder, InternalOrderFilter } from "models/InternalOrder";
// import {
//   InternalOrderReport,
//   InternalOrderReportFilter,
// } from "models/InternalOrderReport";
import { Item, ItemFilter } from "models/Item";
import { Organization, OrganizationFilter } from "models/Organization";
import { Warehouse, WarehouseFilter } from "models/Warehouse";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";
// import { TimeOption, TimeOptionFilter } from "../models/TimeOption";
import { DashboardOrderAndTicketFilter } from 'models/Dashboard/DashboardOrderAndTicketFilter';

export class InternalOrderReportRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_DASHBOARD_ORDER_PREFIX);
  }
  public countItem = (
    internalOrderFilter?: InternalOrderFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countItem)), internalOrderFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  public listItem = (
    internalOrderReportFilter?: InternalOrderFilter
  ): Observable<InternalOrder[]> => {
    return this.httpObservable
      .post<InternalOrder[]>(
        kebabCase(nameof(this.listItem)),
        internalOrderReportFilter
      )
      .pipe(
        map((response: AxiosResponse<InternalOrder[]>) => response.data)
      );
  };
  public listOrderItem = (
    internalOrderReportFilter?: InternalOrderFilter
  ): Observable<InternalOrder[]> => {
    return this.httpObservable
      .post<InternalOrder[]>(
        kebabCase(nameof(this.listOrderItem)),
        internalOrderReportFilter
      )
      .pipe(map((response: AxiosResponse<InternalOrder[]>) => response.data));
  };

  // public filterListTime = (): Observable<TimeOption[]> => {
  //   return this.httpObservable
  //     .post<TimeOption[]>(
  //       kebabCase(nameof(this.filterListTime)),
  //       new TimeOptionFilter()
  //     )
  //     .pipe(map((response: AxiosResponse<TimeOption[]>) => response.data));
  // };

  public filterListOrganization = (
    organizationFilter: OrganizationFilter
  ): Observable<Organization[]> => {
    return this.httpObservable
      .post<Organization[]>(
        kebabCase(nameof(this.filterListOrganization)),
        organizationFilter
      )
      .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
  };
  public filterListWarehouse = (
    warehouseFilter: WarehouseFilter
  ): Observable<Warehouse[]> => {
    return this.httpObservable
      .post<Warehouse[]>(
        kebabCase(nameof(this.filterListWarehouse)),
        warehouseFilter
      )
      .pipe(map((response: AxiosResponse<Warehouse[]>) => response.data));
  };

  public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
    return this.httpObservable
      .post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
      .pipe(map((response: AxiosResponse<Item[]>) => response.data));
  };

  public orderCounter = (filter?: DashboardOrderAndTicketFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.orderCounter)), filter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public totalRevenue = (filter?: DashboardOrderAndTicketFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.totalRevenue)), filter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public completedOrderCounter = (filter?: DashboardOrderAndTicketFilter): Observable<number> => {
    return this.httpObservable
        .post<number>(kebabCase(nameof(this.completedOrderCounter)), filter)
        .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public processingOrderCounter = (filter?: DashboardOrderAndTicketFilter): Observable<number> => {
    return this.httpObservable
        .post<number>(kebabCase(nameof(this.processingOrderCounter)), filter)
        .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  
}

export const internalOrderReportRepository = new InternalOrderReportRepository();
